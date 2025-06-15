import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Developer from './pages/Developer';

// Additional pages for better internal linking
import Industries from './pages/Industries';
import Resources from './pages/Resources';
import CaseStudies from './pages/CaseStudies';
import Blog from './pages/Blog';
import Certifications from './pages/Certifications';
import Careers from './pages/Careers';



function App() {
  return (
    <>
      <Helmet>
        <title>Visakha Tech Solutions | Leading Naval & Industrial Electrical Experts in Vizag</title>
        <meta name="description" content="Premier ISO 9001:2015 certified electrical & automation solutions provider in Visakhapatnam. Specialized in naval, defense, and industrial projects with 100+ successful implementations." />
        
        <link rel="canonical" href="https://visakhatechsolutions.com" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/fonts/archivo.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/critical-module.js" as="script" type="module" />
        
        {/* HTTP/3 and QUIC optimization hints */}
        <link rel="preconnect" href="https://www.googletagmanager.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </Helmet>
      
      <Layout>
        <main>
      
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services/*" element={<Services />} />
            <Route path="/projects/*" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/developer" element={<Developer />} />
            
            {/* Additional routes for better internal linking */}
            <Route path="/industries/*" element={<Industries />} />
            <Route path="/resources" element={<Resources />} />
            <Route path="/resources/case-studies" element={<CaseStudies />} />
            <Route path="/resources/blog" element={<Blog />} />
            <Route path="/about/certifications" element={<Certifications />} />
            <Route path="/careers" element={<Careers />} />
          </Routes>
        </main>
      </Layout>
    </>
  );
}

export default App;