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
  compiler: {
    // SWC minify 활성화
    removeConsole: process.env.NEXT_PUBLIC_NEXT_APP_ENV === "production",
  },
  swcMinify: true,
  experimental: {
    browsersListForSwc: true,
    legacyBrowsers: false,
  },
  productionBrowserSourceMaps: false,
  images: {
    domains: ["~"],
    minimumCacheTTL: 86400,
    formats: ["image/avif", "image/webp"],
  },
  async rewrites() {
    return [
      {
        source: "/:path*",
        destination: "http://3.37.132.47:8080/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
