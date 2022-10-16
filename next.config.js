/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["candypay.fun", "images.unsplash.com"],
  },
};

module.exports = nextConfig;
