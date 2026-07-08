/** @type {import('next').NextConfig} */
const fs = require('fs');
const https = require('https');

const agent = new https.Agent({
  rejectUnauthorized: false,
});

module.exports = {
  async rewrites() {
    return [
      {
        source: '/api/wp/:path*',
        destination: 'https://anidisc-cms.test:8443/index.php?rest_route=/:path*',
      },
    ];
  },
};