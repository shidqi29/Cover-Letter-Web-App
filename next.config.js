/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      path: false,
      os: false,
    };
    return config;
  },
  experimental: {
    serverComponentsExternalPackages: ['tesseract.js', 'pdf-parse', 'mammoth'],
  },
};

module.exports = nextConfig;
