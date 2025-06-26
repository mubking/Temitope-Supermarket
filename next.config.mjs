// next.config.mjs
import nextPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXTAUTH_URL:
      process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000'
        : 'https://www.temitope-supermarket.com', // ✅ use www here
  },
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'temitope-supermarket.com' }],
        permanent: true,
        destination: 'https://www.temitope-supermarket.com/:path*', // ✅ redirect to www
      },
    ];
  },
};

const withPWA = nextPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

export default withPWA(nextConfig);
