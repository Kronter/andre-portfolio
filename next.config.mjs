/** @type {import('next').NextConfig} */ 

const nextConfig = { 
  output: 'export',
  // basePath and assetPrefix are removed for custom domain 
  images:
    { unoptimized: true, 
    }, 
}; 

export default nextConfig;
