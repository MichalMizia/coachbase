/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: ["mongoose"],
  },
  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/oferty",
  //       permanent: true,
  //     },
  //   ];
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "drive.google.com",
      },
      {
        protocol: "https",
        hostname: "coachbase.s3.eu-central-1.amazonaws.com",
      },
    ],
    minimumCacheTTL: 31536000,
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: "/sitemap.xml",
  //       destination: "/api/sitemap",
  //     },
  //   ];
  // },
  webpack(config) {
    config.experiments = { ...config.experiments, topLevelAwait: true };
    return config;
  },
};

module.exports = nextConfig;
