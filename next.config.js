/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["172.28.240.1"],
  turbopack: {
    root: __dirname,
  },
};

module.exports = nextConfig;
