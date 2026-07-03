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
    '/pricing',
    '/icon.png',
  ],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/login', '/dashboard'],
      },
    ],
    // Blog posts are added from the dashboard at any time, so they live in a
    // dynamic sitemap served by the app (app/blog/sitemap.ts) — always fresh.
    additionalSitemaps: [
      'https://www.mariestonservicecentre.co.uk/blog/sitemap.xml',
    ],
  },
  transform: async (config, path) => {
    // Higher priority for key pages
    const priorities = {
      '/':                        { priority: 1.0, changefreq: 'daily' },
      '/mot':                     { priority: 0.9, changefreq: 'weekly' },
      '/car-servicing':           { priority: 0.9, changefreq: 'weekly' },
      '/repairs':                 { priority: 0.9, changefreq: 'weekly' },
      '/online-booking':          { priority: 0.9, changefreq: 'weekly' },
      '/air-con':                 { priority: 0.8, changefreq: 'weekly' },
      '/diagnostics':             { priority: 0.8, changefreq: 'weekly' },
      '/battery-check':           { priority: 0.8, changefreq: 'weekly' },
      '/ev-battery':              { priority: 0.8, changefreq: 'weekly' },
      '/brake-fluid':             { priority: 0.8, changefreq: 'weekly' },
      '/car-servicing/interim':   { priority: 0.8, changefreq: 'weekly' },
      '/car-servicing/full':      { priority: 0.8, changefreq: 'weekly' },
      '/car-servicing/major':     { priority: 0.8, changefreq: 'weekly' },
      '/repairs/brakes':          { priority: 0.8, changefreq: 'weekly' },
      '/repairs/clutch-gearbox':  { priority: 0.8, changefreq: 'weekly' },
      '/repairs/electrical':      { priority: 0.8, changefreq: 'weekly' },
      '/repairs/engine-cooling':  { priority: 0.8, changefreq: 'weekly' },
      '/repairs/exhaust-emissions':{ priority: 0.8, changefreq: 'weekly' },
      '/repairs/suspension-steering':{ priority: 0.8, changefreq: 'weekly' },
      '/blog':                    { priority: 0.7, changefreq: 'weekly' },
      '/about':                   { priority: 0.7, changefreq: 'monthly' },
      '/contact':                 { priority: 0.7, changefreq: 'monthly' },
      '/areas':                   { priority: 0.7, changefreq: 'monthly' },
      '/faqs':                    { priority: 0.6, changefreq: 'monthly' },
      '/reviews':                 { priority: 0.6, changefreq: 'weekly' },
      '/services':                { priority: 0.6, changefreq: 'monthly' },
      '/privacy':                 { priority: 0.3, changefreq: 'yearly' },
      '/terms':                   { priority: 0.3, changefreq: 'yearly' },
    };

    const custom = priorities[path] || { priority: 0.6, changefreq: 'weekly' };

    return {
      loc: path,
      lastmod: new Date().toISOString(),
      changefreq: custom.changefreq,
      priority: custom.priority,
    };
  },
}
