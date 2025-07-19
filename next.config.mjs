/** @type {import('next').NextConfig} */
const repo = 'andre-portfolio'; // IMPORTANT: Make sure this matches your repo name
const assetPrefix = `/${repo}/`;
const basePath = `/${repo}`;

const nextConfig = {
  output: 'export',
  assetPrefix: assetPrefix,
  basePath: basePath,
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
