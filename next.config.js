/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: [],
  },
  // Explicitly set to use App Router
  experimental: {
    appDir: true,
  },
};

module.exports = nextConfig; 