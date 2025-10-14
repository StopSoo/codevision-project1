/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
  experimental: {
    optimizePackageImports: ["geist"], // <-- geist 자동 최적화 막기
  },
  webpack(config) {
    return config;
  },
};

module.exports = nextConfig;
