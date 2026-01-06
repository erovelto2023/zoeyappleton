/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: []
    },
    experimental: {
        serverComponentsExternalPackages: ["mongoose"],
        serverActions: {
            bodySizeLimit: '10mb',
        },
    },
};

export default nextConfig;
