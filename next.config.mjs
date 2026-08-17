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
    ];
  },
};

export default nextConfig;
