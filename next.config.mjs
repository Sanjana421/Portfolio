/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',           // static export for GitHub Pages
  trailingSlash: true,
  images: { unoptimized: true },
  basePath: '/Portfolio',     // matches https://sanjana421.github.io/Portfolio/
  assetPrefix: '/Portfolio',
  env: {
    NEXT_PUBLIC_BASE_PATH: '/Portfolio',
  },
};

export default nextConfig;
