/** @type {import('next').NextConfig} */
const nextConfig = {
  productionBrowserSourceMaps: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'scottradjusting.com',
      },
      {
        protocol: 'https',
        hostname: 'amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '10mb',
    },
  },
  // Turbopack configuration for Next.js 16
  turbopack: {
    // Empty config to silence webpack warning - Turbopack handles externals differently
  },
  serverExternalPackages: [
    'onnxruntime-node',
    'chromadb',
    '@prisma/client',
    '@tensorflow/tfjs-node',
    '@huggingface/transformers',
    'sharp',
    'canvas',
    'puppeteer',
    'playwright',
  ],
}

module.exports = nextConfig