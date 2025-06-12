import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /node_modules[\\/]pdfjs-dist[\\/]/,
      type: 'javascript/auto',
    });
    return config;
  },
};

export default nextConfig;
