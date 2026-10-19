import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  devIndicators: false,
  turbopack: { root: process.cwd() },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/photo-*',
        search: '?auto=format&fit=crop&w=1600&q=80',
      },
    ],
    localPatterns: [
      { pathname: '**', search: '' },
      // Only these public, static photo files use content-version query strings.
      { pathname: '/images/projects/**' },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      {
        source: '/images/projects/:path*',
        has: [{ type: 'query', key: 'v', value: '[0-9a-f]{12}' }],
        headers: [
          {
            key: 'Cache-Control',
            // images:sync changes this content hash whenever the photo changes.
            // Set the upstream TTL; unversioned URLs keep default revalidation.
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
