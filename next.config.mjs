// next.config.mjs
import nextPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXTAUTH_URL:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : 'https://temitope-supermarket.com',
  },
};

const withPWA = nextPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

export default withPWA(nextConfig);
