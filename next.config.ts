import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enhanced optimizations for cross-browser compatibility
  experimental: {
    // Removed optimizeCss to avoid critters dependency
    optimizeServerReact: true,
  },
  
  // Enhanced compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Enhanced performance optimizations
  poweredByHeader: false,
  compress: true,
  
  // Enhanced image optimization for better cross-browser support
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },
  
  // Headers for better browser compatibility
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Enhanced security headers
          // Note: Only setting frame-ancestors to avoid conflicts with other CSP headers
          // If you need a full CSP, ensure it doesn't conflict with existing headers
          {
            key: 'Content-Security-Policy',
            value: "frame-ancestors 'self' https://curlycloud.dev https://*.curlycloud.dev",
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          // Performance headers
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          // Cross-browser compatibility headers
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/api/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-store, must-revalidate',
          },
        ],
      },
    ];
  },
  
  // Enhanced webpack configuration for better browser support
  webpack: (config, { dev, isServer }) => {
    // Add polyfills for older browsers
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    
    // Enhanced CSS and JS optimization
    if (!dev) {
      // Improved code splitting for better browser compatibility
      config.optimization.splitChunks = {
        chunks: 'all',
        minSize: 20000,
        maxSize: 244000,
        cacheGroups: {
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true,
          },
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            priority: -10,
            chunks: 'all',
          },
          styles: {
            name: 'styles',
            test: /\.(css|scss)$/,
            chunks: 'all',
            enforce: true,
          },
        },
      };
      
      // Better minification for cross-browser compatibility
      config.optimization.minimizer = config.optimization.minimizer || [];
    }
    
    return config;
  },
};

export default nextConfig;
