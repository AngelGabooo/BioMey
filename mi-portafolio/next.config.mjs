import bundleAnalyzer from '@next/bundle-analyzer';

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

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
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  reactStrictMode: true,
  swcMinify: true,
  compress: true,
  poweredByHeader: false,

  // Optimizaciones experimentales
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', 'gsap', 'framer-motion'],
    scrollRestoration: true,
  },

  // Headers para caching
  async headers() {
    return [
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },

  // Webpack optimizations
  webpack: (config, { isServer }) => {
    // Optimizar chunks
    config.optimization = {
      ...config.optimization,
      splitChunks: {
        chunks: 'all',
        cacheGroups: {
          // Librerías principales
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
          },
          // GSAP - librería de animaciones
          gsap: {
            test: /[\\/]node_modules[\\/](gsap)[\\/]/,
            name: 'gsap',
            chunks: 'all',
            priority: 20,
          },
          // Lucide - iconos
          lucide: {
            test: /[\\/]node_modules[\\/](lucide-react)[\\/]/,
            name: 'lucide',
            chunks: 'all',
            priority: 20,
          },
          // Framer Motion - animaciones
          framer: {
            test: /[\\/]node_modules[\\/](framer-motion)[\\/]/,
            name: 'framer',
            chunks: 'all',
            priority: 20,
          },
          // Radix UI - componentes UI
          radix: {
            test: /[\\/]node_modules[\\/](@radix-ui)[\\/]/,
            name: 'radix',
            chunks: 'all',
            priority: 15,
          },
          // React Hook Form + Zod
          forms: {
            test: /[\\/]node_modules[\\/](react-hook-form|zod|@hookform)[\\/]/,
            name: 'forms',
            chunks: 'all',
            priority: 15,
          },
          // Embla Carousel
          carousel: {
            test: /[\\/]node_modules[\\/](embla-carousel)[\\/]/,
            name: 'carousel',
            chunks: 'all',
            priority: 15,
          },
        },
      },
    };

    // Ignorar advertencias de dependencias
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };

    return config;
  },
};

export default withBundleAnalyzer(nextConfig);