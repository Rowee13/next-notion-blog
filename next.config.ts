import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    /* config options here */
    // experimental: {
    //     typedRoutes: true,
    // },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'lh3.googleusercontent.com',
            },
            {
                protocol: 'https',
                hostname: '*.googleusercontent.com',
            },
            {
                protocol: 'https',
                hostname: 'secure.notion-static.com',
            },
            {
                protocol: 'https',
                hostname: '*.notion.so',
            },
            {
                protocol: 'https',
                hostname: 'prod-files-secure.s3.us-west-2.amazonaws.com',
            },
            {
                protocol: 'https',
                hostname: 's3.us-west-2.amazonaws.com',
            },
        ],
    },
}

export default nextConfig
