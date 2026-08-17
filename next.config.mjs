/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion"],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
        pathname: "/media/**",
      },
    ],
  },
  async redirects() {
    return [
      { source: "/lander", destination: "/", permanent: true },
      {
        source: "/blog/angular-form-latency-5s-to-50ms",
        destination: "/blog/dependency-graph-frontend-performance",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
