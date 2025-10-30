/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
  experimental: {
    optimizePackageImports: ["geist"],
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
