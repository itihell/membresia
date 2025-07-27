/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Durante el build, ESLint se ejecutará en estos directorios
    dirs: ['pages', 'components', 'lib', 'src', 'app'],
  },
  typescript: {
    // Durante el build, TypeScript se ejecutará
    ignoreBuildErrors: false,
  },
  experimental: {
    // Habilita características experimentales si las necesitas
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
};

export default nextConfig;