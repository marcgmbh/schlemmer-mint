/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [], // Add image domains if using external images
    unoptimized: false, // Make sure optimization is enabled
    remotePatterns: []
  },
};

export default nextConfig;
