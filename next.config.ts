import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/wp/:path*',
        destination: 'https://anidisc-cms.test:8443/wp-json/:path*',
      },
    ];
  },
};

module.exports = nextConfig;

module.exports = nextConfig;

module.exports = nextConfig;

export default nextConfig;
