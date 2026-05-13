/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.mariestonservicecentre.co.uk',
  generateRobotsTxt: true,
  exclude: [
    '/admin',
    '/admin/*',
    '/login',
    '/dashboard',
    '/dashboard/*',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/login', '/dashboard'],
      },
    ],
  },
}
