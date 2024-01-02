/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: "/ucak-bileti/rezervasyon/ic-hat-musaitlik",
        destination: "/list",
      },
    ];
  },
};

module.exports = nextConfig;
