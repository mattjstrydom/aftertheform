import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // browsers probe /favicon.ico regardless of <link rel=icon>
  async rewrites() {
    return [{ source: "/favicon.ico", destination: "/icon" }];
  },
};

export default nextConfig;
