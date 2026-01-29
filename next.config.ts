import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/viral-distribution-dashboard',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
