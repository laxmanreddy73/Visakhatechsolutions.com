import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronRight, Phone, Mail, MapPin, Linkedin, Twitter, Youtube, Instagram } from 'lucide-react';

// ===== SEO MEGA CONFIG =====
const SEO_CONFIG = {
  company: {
    name: "Visakha Tech Solutions",
    url: "https://visakhatechsolutions.com",
    logo: "https://i.postimg.cc/wTyYPFSf/Screenshot-2025-01-28-235821-removebg-preview.png",
    sameAs: [
      "https://linkedin.com/company/visakhatechsolutions",
      "https://twitter.com/visakhatechsol",
      "https://youtube.com/@visakhatechsolutions"
    ]
  },
  patents: [
    {
      name: "",
      description: "Proprietary electrical system design for naval vessels",
      url: "/patents/naval-electrical-systems"
    }
  ],
  technicalSpecs: {
    responseTime: "",
    compatibility: "47 PLC brands supported",
    certifications: ["ISO 9001:2015", "IEC 62443"]
  }
};

// ===== PRELOAD ASSETS =====
const PRELOAD_ASSETS = [
  { href: "/hero-video.mp4", as: "video", fetchpriority: "high" },
  { href: "/fonts/Inter.woff2", as: "font", type: "font/woff2", crossorigin: true },
  { href: "/critical-module.js", as: "script", type: "module" }
];

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/services', label: 'Services' },
  { path: '/projects', label: 'Projects' },
  { path: '/about', label: 'About' },
  { path: '/contact', label: 'Contact' },
];

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  // ===== NUCLEAR PRELOADING =====
  useEffect(() => {
    // HTTP/3 detection
    if ('connection' in navigator && (navigator.connection as any).protocol?.includes('h3')) {
      console.log('HTTP/3 active - enabling QUIC optimization');
    }

    // Preload critical assets
    PRELOAD_ASSETS.forEach(asset => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = asset.as;
      link.href = asset.href;
      if (asset.type) link.type = asset.type;
      if (asset.fetchpriority) link.setAttribute('fetchpriority', asset.fetchpriority);
      if (asset.crossorigin) link.setAttribute('crossorigin', '');
      document.head.appendChild(link);
    });

    // Priority crawling trigger
    if (navigator.sendBeacon) {
      navigator.sendBeacon(
        'https://indexing.googleapis.com/v3/urlNotifications:publish',
        JSON.stringify({
          url: window.location.href,
          type: 'URL_UPDATED'
        })
      );
    }
  }, []);

  // ===== SCHEMA MARKUP GENERATION =====
  const generateSchemaMarkup = () => {
    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "TechCompany",
          "@id": `${SEO_CONFIG.company.url}#organization`,
          "name": SEO_CONFIG.company.name,
          "url": SEO_CONFIG.company.url,
          "logo": SEO_CONFIG.company.logo,
          "sameAs": SEO_CONFIG.company.sameAs,
          "potentialAction": {
            "@type": "SearchAction",
            "target": `${SEO_CONFIG.company.url}/search?q={search_term}`,
            "query-input": "required name=search_term"
          }
        },
        ...SEO_CONFIG.patents.map(patent => ({
          "@type": "TechArticle",
          "headline": patent.name,
          "description": patent.description,
          "url": `${SEO_CONFIG.company.url}${patent.url}`,
          "author": { "@id": `${SEO_CONFIG.company.url}#organization` }
        }))
      ]
    };
  };

  // Scroll and mobile menu handlers
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const footerSections = [
    {
      title: 'Our Services',
      links: [
        { name: 'Electrical Solutions', path: '/services/electrical' },
        { name: 'Mechanical Solutions', path: '/services/mechanical' },
        { name: 'Automation', path: '/services/automation' },
        { name: 'Maintenance', path: '/services/maintenance' }
      ]
    },
    {
      title: 'Quick Links',
      links: [
        { name: 'Home', path: '/' },
        { name: 'About Us', path: '/about' },
        { name: 'Our Projects', path: '/projects' },
        { name: 'Contact Us', path: '/contact' }
      ]
    },
    {
      title: 'Industries',
      links: [
        { name: 'Naval', path: '/industries/naval' },
        { name: 'Defense', path: '/industries/defense' },
        { name: 'Shipyard', path: '/industries/shipyard' },
        { name: 'Industrial', path: '/industries/industrial' }
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Case Studies', path: '/resources/case-studies' },
        { name: 'Technical Blog', path: '/resources/blog' },
        { name: 'Certifications', path: '/about/certifications' },
        { name: 'Careers', path: '/careers' }
      ]
    }
  ];

  const socialLinks = [
    { icon: <Linkedin className="w-5 h-5" />, name: 'LinkedIn', href: SEO_CONFIG.company.sameAs[0] },
    { icon: <Twitter className="w-5 h-5" />, name: 'Twitter', href: SEO_CONFIG.company.sameAs[1] },
    { icon: <Youtube className="w-5 h-5" />, name: 'YouTube', href: SEO_CONFIG.company.sameAs[2] },
    { icon: <Instagram className="w-5 h-5" />, name: 'Instagram', href: '#' }
  ];

  const contactInfo = [
    { icon: <Mail className="w-4 h-4" />, text: 'Visakhatechsolutions@gmail.com' },
    { icon: <Phone className="w-4 h-4" />, text: '+91 7702119852, +91 9121419852' },
    { text: <span className="w-4 h-4 text-cyan-400 font-semibold pl-4">Branch Address</span> },
    { 
      icon: <MapPin className="w-4 h-4" />, 
      text: '65-1-208/C, Pilakavanipalem, Coromandel, Sriharipuram, Visakhapatnam - 530011' 
    },
    { text: <span className="w-4 h-4 text-cyan-400 font-semibold pl-4">Registered Address</span> },
    {
      icon: <MapPin className="w-4 h-4" />,
      text: 'Branch: #5-19-26/258, Chukkavanipalem Colony, Tungalam, Gajuwaka, Visakhapatnam – 530012',
    }
  ];

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white" itemScope itemType="https://schema.org/WebPage">
      {/* Schema Markup */}
      <script type="application/ld+json">{JSON.stringify(generateSchemaMarkup())}</script>

      {/* ===== HEADER ===== */}
      <header className="bg-white border-b border-gray-100 fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            <Link to="/" className="flex items-center gap-3" itemProp="url">
              <div 
                className="w-12 h-12 bg-cover bg-center rounded-full"
                style={{ backgroundImage: `url('${SEO_CONFIG.company.logo}')` }}
                itemProp="logo"
                role="img"
                aria-label="Company logo"
              />
              <span className="text-l font-semibold text-teal-600" itemProp="name">
                {SEO_CONFIG.company.name.toUpperCase()}
              </span>
            </Link>

            <nav className="hidden md:flex items-center space-x-6" aria-label="Primary navigation">
              {navLinks.filter(item => item.path !== '/contact').map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`text-[14px] font-medium uppercase tracking-wider ${
                    location.pathname === item.path
                      ? 'text-[#333333] font-bold'
                      : 'text-[#333333] hover:opacity-80'
                  } px-3 py-2`}
                  aria-current={location.pathname === item.path ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                to="/contact"
                className="ml-4 px-5 py-2.5 rounded-md bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition-all duration-200 uppercase tracking-wider"
                aria-label="Contact Us"
              >
                Contact
              </Link>
            </nav>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-4 md:hidden focus:outline-none"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <div className="space-y-1.5 w-6">
                <span className="block h-[3px] w-full bg-[#000000] rounded-[10px]"></span>
                <span className="block h-[3px] w-full bg-[#000000] rounded-[10px]"></span>
                <span className="block h-[3px] w-1/2 bg-[#000000] ml-auto rounded-[10px]"></span>
              </div>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              id="mobile-menu"
              className="md:hidden fixed inset-x-0 top-20 bg-white shadow-lg z-50"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <div className="px-4 py-3 space-y-3">
                {navLinks.filter(item => item.path !== '/contact').map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block px-3 py-3 rounded-md text-base font-medium ${
                      location.pathname === item.path
                        ? 'bg-gray-100 text-[#000000]'
                        : 'text-[#000000] hover:bg-gray-50'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  to="/contact"
                  className="block px-3 py-3 rounded-md text-base font-medium bg-gray-900 text-white hover:bg-gray-800 text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ===== MAIN CONTENT ===== */}
      <main className="flex-grow pt-20">
        {/* SGE-OPTIMIZED CONTENT BLOCK */}
        {SEO_CONFIG.patents[0].name && (
          <div className="sge-answer" data-answer-type="technical_specification">
            <h3>{SEO_CONFIG.patents[0].name}</h3>
            <ul>
              <li data-feature="latency">{SEO_CONFIG.technicalSpecs.responseTime}</li>
              <li data-feature="compatibility">{SEO_CONFIG.technicalSpecs.compatibility}</li>
            </ul>
          </div>
        )}
        
        {children}
      </main>

      {/* ===== FOOTER ===== */}
      <footer className="bg-black pt-16 pb-12 relative overflow-hidden" itemScope itemType="https://schema.org/LocalBusiness">
        {/* Background effects */}
        <motion.div 
          className="absolute inset-0 overflow-hidden pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.05 }}
        >
          <div className="absolute top-1/3 left-1/4 w-64 h-64 rounded-full bg-[#FF3BFF] opacity-20 blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-[#00F0FF] opacity-20 blur-3xl" />
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* CTA Section */}
          <motion.div 
            className="bg-gradient-to-b from-white/5 to-transparent p-8 sm:p-12 rounded-3xl border border-gray-400 border-opacity-50 mb-12 sm:mb-20 backdrop-blur-sm relative overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="absolute inset-0 rounded-3xl pointer-events-none overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200/30 to-transparent opacity-30 animate-shine"></div>
            </div>
            
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
              <div className="text-center md:text-left">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">Start Your Project With Us</h3>
                <p className="text-gray-300 sm:text-lg max-w-md">
                  Get expert electrical and mechanical solutions tailored to your needs
                </p>
              </div>
              <Link
                to="/contact"
                onClick={handleScrollToTop}
                className="group bg-gradient-to-r from-[#FF3BFF] to-[#00F0FF] text-black px-6 py-3 sm:px-8 sm:py-4 rounded-full hover:shadow-lg hover:shadow-[#FF3BFF]/30 transition-all duration-300 flex items-center gap-2 font-medium whitespace-nowrap lg:mx-0 max-w-fit mt-8"
              >
                Get a Free Quote
                <ChevronRight className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>

          {/* Footer columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">{SEO_CONFIG.company.name}</h3>
              <p className="text-sm text-gray-400 mb-4">
                Bridging the gap between electrical and mechanical engineering for smarter, future-ready systems.
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.href}
                    className="text-gray-400 hover:text-white transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2 }}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Footer sections */}
            {footerSections.map((section, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <h3 className="text-lg font-semibold text-white mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link
                        to={link.path}
                        onClick={handleScrollToTop}
                        className="text-sm text-gray-400 hover:text-white transition-colors hover:underline hover:underline-offset-4"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}

            {/* Contact info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              viewport={{ once: true }}
              className="mb-6"
            >
              <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
              <div className="space-y-3">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <span className="text-[#00F0FF] mt-0.5">{item.icon}</span>
                    <span className="text-sm text-gray-400">{item.text}</span>
                  </div>
                ))}
              </div>
              {/* Schema address */}
              <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress" className="hidden">
                <span itemProp="streetAddress">65-1-208/C, Pilakavanipalem</span>
                <span itemProp="addressLocality">Visakhapatnam</span>
                <span itemProp="postalCode">530011</span>
              </div>
            </motion.div>
          </div>

          {/* Footer bottom */}
          <div className="border-t border-white/10 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-3">
                <Link 
                  to="/" 
                  onClick={handleScrollToTop}
                  className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#FF3BFF] to-[#00F0FF]"
                >
                  {SEO_CONFIG.company.name}
                </Link>
                <span className="text-xs text-gray-500 hidden sm:block">
                  {SEO_CONFIG.technicalSpecs.certifications.join(' | ')}
                </span>
              </div>
              
              <div className="text-center md:text-right">
                <p className="text-xs text-gray-400">
                  © {new Date().getFullYear()} {SEO_CONFIG.company.name}. All rights reserved.
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Partnered with top companies across India
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-RZ67L9F4E1"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-RZ67L9F4E1');
          `
        }} />
      </footer>
    </div>
  );
};

export default Layout;