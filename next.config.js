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
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'http://3.37.132.47:8080/:path*',
      }
    ];
  }
};

module.exports = nextConfig;
