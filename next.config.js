module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: '/',
        has: [
          {
            type: 'cookie',
            key: 'token',
          },
        ],
        destination: '/dashboard',
        permanent: false,
      },
    ];
  },
};
