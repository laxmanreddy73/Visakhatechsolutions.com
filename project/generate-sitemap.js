import { SitemapStream, streamToPromise } from 'sitemap';
import { createWriteStream } from 'fs';
import { Readable } from 'stream';

const links = [
  { url: '/', changefreq: 'daily', priority: 1.0, lastmod: new Date().toISOString() },
  { url: '/about', changefreq: 'weekly', priority: 0.8, lastmod: new Date().toISOString() },
  { url: '/services', changefreq: 'weekly', priority: 0.8, lastmod: new Date().toISOString() },
  { url: '/projects', changefreq: 'weekly', priority: 0.9, lastmod: new Date().toISOString() },
  { url: '/contact', changefreq: 'monthly', priority: 0.7, lastmod: new Date().toISOString() },
  // Service pages with variations
  { url: '/services/electrical-solutions', changefreq: 'weekly', priority: 0.8, lastmod: new Date().toISOString() },
  { url: '/services/mechanical-solutions', changefreq: 'weekly', priority: 0.8, lastmod: new Date().toISOString() },
  { url: '/services/automation', changefreq: 'weekly', priority: 0.8, lastmod: new Date().toISOString() },
  { url: '/services/maintenance', changefreq: 'weekly', priority: 0.8, lastmod: new Date().toISOString() },
  // Project categories
  { url: '/projects/naval', changefreq: 'weekly', priority: 0.8, lastmod: new Date().toISOString() },
  { url: '/projects/industrial', changefreq: 'weekly', priority: 0.8, lastmod: new Date().toISOString() },
  { url: '/projects/automation', changefreq: 'weekly', priority: 0.8, lastmod: new Date().toISOString() },
  // Location-specific pages
  { url: '/locations/visakhapatnam', changefreq: 'weekly', priority: 0.7, lastmod: new Date().toISOString() },
  { url: '/locations/vizag', changefreq: 'weekly', priority: 0.7, lastmod: new Date().toISOString() },
  // Industry-specific pages
  { url: '/industries/naval', changefreq: 'weekly', priority: 0.8, lastmod: new Date().toISOString() },
  { url: '/industries/defense', changefreq: 'weekly', priority: 0.8, lastmod: new Date().toISOString() },
  { url: '/industries/shipyard', changefreq: 'weekly', priority: 0.8, lastmod: new Date().toISOString() }
];

const hostname = 'https://visakhatechsolutions.com';

const stream = new SitemapStream({ hostname });

streamToPromise(Readable.from(links).pipe(stream))
  .then((data) => {
    createWriteStream('./public/sitemap.xml').write(data.toString());
    console.log('Sitemap generated successfully!');
  })
  .catch(console.error);