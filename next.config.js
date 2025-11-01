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
  // 레거시 브라우저 지원 제거
  swcMinify: true,
  experimental: {
    browsersListForSwc: true,
    legacyBrowsers: false,
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
