"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 22, stiffness: 280, mass: 0.5 };
  const x = useSpring(cursorX, springConfig);
  const y = useSpring(cursorY, springConfig);

  const trailX = useSpring(cursorX, { damping: 35, stiffness: 150, mass: 0.8 });
  const trailY = useSpring(cursorY, { damping: 35, stiffness: 150, mass: 0.8 });

  useEffect(() => {
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    setIsVisible(true);

    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const checkPointer = (e: MouseEvent) => {
      const target = e.target as Element;
      const isClickable =
        target.closest("a, button, [role='button'], input, textarea, select, label, [tabindex]") !== null;
      setIsPointer(isClickable);
    };

    const hide = () => setIsHidden(true);
    const show = () => setIsHidden(false);

    window.addEventListener("mousemove", move);
    window.addEventListener("mousemove", checkPointer);
    document.addEventListener("mouseleave", hide);
    document.addEventListener("mouseenter", show);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mousemove", checkPointer);
      document.removeEventListener("mouseleave", hide);
      document.removeEventListener("mouseenter", show);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Trail ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border"
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
          width: isPointer ? 44 : 36,
          height: isPointer ? 44 : 36,
          borderColor: isPointer ? "rgba(249,115,22,0.7)" : "rgba(249,115,22,0.35)",
          opacity: isHidden ? 0 : 1,
          transition: "width 0.2s, height 0.2s, border-color 0.2s, opacity 0.2s",
        }}
      />
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-accent"
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
          width: isPointer ? 6 : 5,
          height: isPointer ? 6 : 5,
          opacity: isHidden ? 0 : isPointer ? 1 : 0.9,
          backgroundColor: "#F97316",
          transition: "width 0.2s, height 0.2s, opacity 0.2s",
        }}
      />
    </>
  );
}
