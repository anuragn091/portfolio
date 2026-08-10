"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";

const ROLES = [
  "Software Development Engineer II",
  "AI Engineer",
  "SDE-2 at SpotDraft",
  "AI Agent Builder",
  "Full Stack Developer",
  "Performance Engineer",
];

function useTypewriter(words: string[], speed = 80, pause = 2000) {
  const [displayed, setDisplayed] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">("typing");

  useEffect(() => {
    const current = words[wordIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (displayed.length < current.length) {
        timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), speed);
      } else {
        timeout = setTimeout(() => setPhase("pausing"), pause);
      }
    } else if (phase === "pausing") {
      timeout = setTimeout(() => setPhase("deleting"), 300);
    } else {
      if (displayed.length > 0) {
        timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), speed / 2);
      } else {
        setWordIndex((i) => (i + 1) % words.length);
        setPhase("typing");
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, phase, wordIndex, words, speed, pause]);

  return displayed;
}

/* ---------- Performance-tiered background ---------- */
type Tier = "high" | "mid" | "low";

function detectTier(): Tier {
  if (typeof window === "undefined") return "low";
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return "low";
  const mem = (navigator as { deviceMemory?: number }).deviceMemory;
  const cores = navigator.hardwareConcurrency;
  if (mem !== undefined && mem < 4) return "low";
  if (cores !== undefined && cores < 4) return "mid";
  const canvas = document.createElement("canvas");
  const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
  if (!gl) return "mid";
  return "high";
}

/* WebGL animated gradient noise shader */
function WebGLBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    if (!gl) return;

    const vert = `
      attribute vec2 a_pos;
      void main(){gl_Position=vec4(a_pos,0,1);}
    `;
    const frag = `
      precision mediump float;
      uniform float u_time;
      uniform vec2 u_res;

      float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
      float noise(vec2 p){
        vec2 i=floor(p); vec2 f=fract(p);
        vec2 u=f*f*(3.0-2.0*f);
        return mix(mix(hash(i),hash(i+vec2(1,0)),u.x),
                   mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),u.x),u.y);
      }
      float fbm(vec2 p){
        float v=0.;float a=0.5;
        for(int i=0;i<4;i++){v+=a*noise(p);p*=2.;a*=0.5;}
        return v;
      }

      void main(){
        vec2 uv=gl_FragCoord.xy/u_res;
        float t=u_time*0.15;
        float n=fbm(uv*2.5+vec2(t,t*0.7));
        float n2=fbm(uv*3.0-vec2(t*0.5,t*0.3));

        vec3 dark=vec3(0.035,0.035,0.043);
        vec3 orange=vec3(0.976,0.451,0.086);
        vec3 amber=vec3(0.984,0.751,0.141);

        float mask=smoothstep(0.42,0.72,n)*smoothstep(0.35,0.65,n2);
        mask*=smoothstep(0.0,0.4,uv.y)*smoothstep(1.0,0.5,uv.y);
        mask*=0.28;

        vec3 col=mix(dark,mix(orange,amber,n2),mask);
        gl_FragColor=vec4(col,1.0);
      }
    `;

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!;
      gl.shaderSource(sh, src); gl.compileShader(sh); return sh;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, vert));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(prog); gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "u_time");
    const uRes = gl.getUniformLocation(prog, "u_res");

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener("resize", resize);

    let fpsFrames = 0;
    let fpsLast = performance.now();
    let downgraded = false;

    const render = (t: number) => {
      if (downgraded) return;
      fpsFrames++;
      if (t - fpsLast > 2000) {
        if (fpsFrames / ((t - fpsLast) / 1000) < 28) { downgraded = true; return; }
        fpsFrames = 0; fpsLast = t;
      }
      gl.uniform1f(uTime, t * 0.001);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      rafRef.current = requestAnimationFrame(render);
    };
    const startTimeout = setTimeout(() => {
      rafRef.current = requestAnimationFrame(render);
    }, 200);

    return () => {
      clearTimeout(startTimeout);
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-90" />;
}

/* Canvas 2D particle system — mid tier */
function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };
    resize();
    window.addEventListener("resize", resize);

    const N = 40;
    const particles = Array.from({ length: N }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.5 + 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.4 + 0.1,
    }));

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x = (p.x + p.vx + canvas.width) % canvas.width;
        p.y = (p.y + p.vy + canvas.height) % canvas.height;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(249,115,22,${p.opacity})`;
        ctx.fill();
      });
      rafRef.current = requestAnimationFrame(render);
    };
    const t = setTimeout(() => { rafRef.current = requestAnimationFrame(render); }, 200);

    return () => { clearTimeout(t); cancelAnimationFrame(rafRef.current); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />;
}

/* Pure-CSS ambient orbs — low tier (and always rendered as base) */
function AmbientOrbs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="orb w-[500px] h-[500px] top-[-10%] right-[-5%] bg-[#F97316] opacity-[0.08] animate-float" />
      <div className="orb w-[400px] h-[400px] bottom-[10%] left-[-8%] bg-[#FBBF24] opacity-[0.06] animate-float-delayed" />
      <div className="orb w-[300px] h-[300px] top-[40%] left-[50%] bg-[#F97316] opacity-[0.05] animate-float" style={{ animationDelay: "5s" }} />
    </div>
  );
}

export default function Hero() {
  const [tier, setTier] = useState<Tier>("low");
  const prefersReduced = useReducedMotion();
  const role = useTypewriter(ROLES);

  useEffect(() => {
    setTier(prefersReduced ? "low" : detectTier());
  }, [prefersReduced]);

  return (
    <section className="relative min-h-[85vh] flex flex-col overflow-hidden bg-[#09090B]">
      {/* Layered backgrounds */}
      <AmbientOrbs />
      {tier === "mid" && <ParticleBackground />}
      {tier === "high" && <WebGLBackground />}

      {/* Radial vignette */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-[#09090B]/80 pointer-events-none" />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.025]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(249,115,22,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(249,115,22,0.6) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 flex-1 flex items-center w-full">
        <div className="max-w-6xl mx-auto px-6 pt-32 pb-8 w-full">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
          }}
        >
          {/* Eyebrow */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
            className="flex items-center gap-3 mb-6"
          >
            <span className="w-8 h-[2px] bg-[#F97316]" />
            <span className="text-[#F97316] text-sm font-semibold tracking-widest uppercase font-mono">
              Software &amp; AI Engineer
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 70, damping: 20 } } }}
            className="text-[clamp(3rem,9vw,7rem)] font-extrabold leading-[0.95] tracking-tight mb-6"
          >
            <span className="text-white">Anurag</span>
            <br />
            <span className="shimmer-text">Nigam</span>
          </motion.h1>

          {/* Role typewriter */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
            className="flex items-center gap-2 mb-8 h-8"
          >
            <span className="text-xl sm:text-2xl font-mono text-[#A1A1AA]">
              {">"} {role}
              <span className="cursor-blink text-[#F97316]">_</span>
            </span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } }}
            className="text-[#71717A] text-lg sm:text-xl max-w-xl leading-relaxed mb-12"
          >
            I build{" "}
            <span className="text-white font-medium">web applications</span>,{" "}
            <span className="text-white font-medium">AI agents</span>, and{" "}
            <span className="text-white font-medium">AI-powered tools</span> that are fast, elegant, and production-hardened. 4 years shipping at scale.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } }}
            className="flex flex-wrap items-center gap-4 mb-16"
          >
            <motion.button
              onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
              whileHover={{ scale: 1.04, boxShadow: "0 0 40px rgba(249,115,22,0.4)" }}
              whileTap={{ scale: 0.97 }}
              className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#F97316] to-[#FBBF24] text-black font-bold text-base hover:opacity-95 transition-opacity"
            >
              View My Work
            </motion.button>
            <motion.a
              href="mailto:me@anuragnigam.in"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-7 py-3.5 rounded-xl border border-white/10 text-white font-semibold text-base hover:bg-white/[0.04] hover:border-white/20 transition-all"
            >
              Let&apos;s Talk
            </motion.a>
          </motion.div>

          {/* Social links */}
          <motion.div
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { duration: 0.6 } } }}
            className="flex items-center gap-5"
          >
            {[
              { icon: GitHubIcon, href: "https://github.com/anuragn091", label: "GitHub" },
              { icon: LinkedInIcon, href: "https://www.linkedin.com/in/anuragn091/", label: "LinkedIn" },
              { icon: Mail, href: "mailto:me@anuragnigam.in", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                whileHover={{ scale: 1.15, color: "#F97316" }}
                className="text-[#52525B] hover:text-[#F97316] transition-colors"
              >
                <Icon size={20} />
              </motion.a>
            ))}
            <div className="w-px h-5 bg-white/10" />
            <span className="text-xs text-[#52525B] font-mono">Bengaluru, IN</span>
          </motion.div>
        </motion.div>
        </div>
      </div>

      {/* Scroll indicator - in flow at bottom, no dead gap */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="relative z-10 pb-8 flex flex-col items-center gap-2 text-[#52525B]"
      >
        <span className="text-xs font-mono tracking-wider uppercase">scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.div>
    </section>
  );
}
