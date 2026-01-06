import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  // Note: `output: 'export'` disabled to allow Server Actions during build
  // (static export does not support Server Actions). Set back to 'export'
  // when using static hosting / Capacitor if Server Actions are not used.
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
