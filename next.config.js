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
  webpack: (config, { isServer, dev, webpack }) => {
    if (isServer) {
      // Use IgnorePlugin to completely ignore heavy packages during build
      config.plugins = config.plugins || []

      config.plugins.push(
        new webpack.IgnorePlugin({
          resourceRegExp: /^(onnxruntime-node|chromadb|@prisma\/client|\.prisma|@tensorflow|@huggingface|sharp|canvas|puppeteer|playwright)$/,
        })
      )

      // Also add externals as fallback
      config.externals = config.externals || []
      config.externals.push(
        'onnxruntime-node',
        'chromadb',
        '@prisma/client',
        '.prisma/client',
        '@tensorflow/tfjs-node',
        '@huggingface/transformers',
        'sharp',
        'canvas',
        'puppeteer',
        'playwright'
      )
    }

    return config
  },
}

module.exports = nextConfig