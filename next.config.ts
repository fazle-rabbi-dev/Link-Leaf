import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
   devIndicators: false,
   reactCompiler: true,

   allowedDevOrigins: ['127.0.0.1'],
   typescript: {
      // ignoreBuildErrors: true,
   },
   // reactStrictMode: false,
   images: {
      remotePatterns: [
         {
            protocol: 'https',
            hostname: 'images.unsplash.com',
            pathname: '/**',
         },
         {
            protocol: 'https',
            hostname: 'encrypted-tbn0.gstatic.com',
            pathname: '/**',
         },
      ],
   },
};

export default nextConfig;
