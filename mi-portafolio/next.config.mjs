/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'localhost',
      'images.squarespace-cdn.com',
      'images.unsplash.com',
      'plus.unsplash.com',
      'static.wixstatic.com',
      'cdn.dribbble.com',
    ],
  },
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig;