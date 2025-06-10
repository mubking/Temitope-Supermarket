/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXTAUTH_URL:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://temitope-supermarket.com",
  },
};

export default nextConfig;
