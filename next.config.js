/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['page.tsx', 'page.ts'],
  images: { domains: ['localhost'] },
  httpAgentOptions: {
    keepAlive: false,
  },
};

module.exports = nextConfig;
