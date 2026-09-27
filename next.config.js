/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      { source: "/modules/module-1", destination: "/modules/1", permanent: true },
      { source: "/modules-dynamic/1", destination: "/modules/1", permanent: true },
    ];
  },
  // другие настройки можно добавить здесь
};

module.exports = nextConfig;
