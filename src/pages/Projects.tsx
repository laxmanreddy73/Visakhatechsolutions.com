import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { ChevronRight, ChevronLeft, Award, Trophy, Briefcase, Users, Building2 } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import { Swiper as SwiperType } from 'swiper';
import { Helmet } from 'react-helmet';
import { Particles } from "@tsparticles/react";
import { Engine } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";
import { brandKeywords, serviceKeywords, locationKeywords } from '../data/keywords';
// ==================== CONSTANTS ====================
const projects = [
  {
    title: "Electrification works onboard VC11199 (FDN) at HSL",
    value: "",
    category: "Electrical",
    image: "https://i.postimg.cc/vmz68DRG/filoating-dock-4032486-1920-700x300.jpg",
    description: "Complete electrical system installation and integration for the Fleet Support Ship at Hindustan Shipyard Limited.",
    client: "Hindustan Shipyard Ltd.",
    duration: "18 months",
    completed: true,
    features: [
      "Complete electrical system overhaul",
      "Advanced power distribution",
      "Safety compliance upgrades",
      "Custom control panel integration"
    ],
    keywords: "shipyard electrification, naval electrical systems, Hindustan Shipyard projects"
  },
 {
    title: "Hull Works for Tug SAMBUSING at ND(V)",
    value: "",
    category: "Hull",
    image: "https://i.postimg.cc/5tFgjH23/Ship-Christening.jpg",
    description: "Comprehensive hull maintenance and repair works for the naval tug vessel at Naval Dockyard Visakhapatnam.",
    client: "Naval Dockyard (V)",
    duration: "6 months",
    completed: true,
    features: [
      "Structural integrity assessment",
      "Hull plating replacement",
      "Corrosion treatment",
      "Protective coating application"
    ]
  },
  {
    title: "Serviceability Checks of AFDS System onboard NOPV Class Ships",
    value: "",
    category: "Maintenance",
    image: "https://i.postimg.cc/bNgpFr83/INS-Saryu.jpg",
    description: "Detailed serviceability assessment and maintenance of Automated Fire Detection Systems on INS Sumedha and INS Sumitra.",
    client: "Indian Navy",
    duration: "3 months",
    completed: true,
    features: [
      "System diagnostics and testing",
      "Sensor calibration",
      "Control panel upgrades",
      "Emergency response simulation"
    ]
  },
  {
    title: "Loading & Unloading activities of Missiles (DRDL)",
    value: "",
    category: "Operations",
    image: "https://i.postimg.cc/hv3MfVT2/10-09-2021-ins-dhruv-nuclear-missile-tracking.jpg",
    description: "Specialized handling and logistics operations for missile systems at Defence Research and Development Laboratory.",
    client: "DRDL Hyderabad",
    duration: "Ongoing",
    completed: false,
    features: [
      "Precision handling procedures",
      "Safety protocol implementation",
      "Specialized equipment operation",
      "Documentation and reporting"
    ]
  },
  {
    title: "Electrification works onboard INS Dhruv",
    value: "",
    category: "Electrical",
    image: "https://i.postimg.cc/qRFCKwD6/INS-1-1200x768.jpg",
    description: "Installation and upgrade of electrical systems for the naval vessel INS Dhruv, including power distribution and control systems.",
    client: "Indian Navy",
    duration: "8 months",
    completed: true,
    features: [
      "Power distribution upgrades",
      "Control panel modernization",
      "Wiring harness replacement",
      "System integration testing"
    ]
  },
  {
    title: "Material Supply for NOPV Classes",
    value: "",
    category: "Supply",
    image: "https://i.postimg.cc/Pq3LGKjV/fe1aecf1-0999-4e7c-9f98-97364456c847-20241216-223741-0000.jpg",
    description: "Procurement and supply of specialized materials and equipment for Naval Offshore Patrol Vessels including INS Sumedha, INS Sumitra, and INS Saryu.",
    client: "Indian Navy",
    duration: "12 months",
    completed: true,
    features: [
      "Specialized electrical components",
      "Custom fabrication parts",
      "Just-in-time delivery",
      "Quality certification"
    ]
  },
  {
    title: "Bridge & Deck Repair Works onboard INS Vikrant",
    value: "",
    category: "Hull",
    image: "https://i.postimg.cc/mkrFzqSs/RIAN-00701810-HR-468.jpg",
    description: "Structural repairs and maintenance of the bridge and deck areas on India's indigenous aircraft carrier INS Vikrant.",
    client: "Indian Navy",
    duration: "10 months",
    completed: true,
    features: [
      "Structural integrity assessment",
      "Non-destructive testing",
      "Composite material repairs",
      "Non-skid surface application"
    ]
  },
  {
    title: "Engine Room Upgrades for INS Arjun",
    value: "",
    category: "Electrical",
    image: "https://i.postimg.cc/26YCKZq9/u3-turkey-besiktas.jpg",
    description: "Comprehensive upgrade of engine room electrical systems and control panels for enhanced performance and reliability.",
    client: "Indian Navy",
    duration: "9 months",
    completed: true,
    features: [
      "Control system modernization",
      "Power distribution upgrades",
      "Emergency system enhancements",
      "Automation integration"
    ]
  }
];

const upcomingProjects = [
  {
    title: "AMC of Acoustic Tank at Bharat Dynamics Limited (Vizag)",
    value: "",
    category: "Maintenance",
    image: "https://img.freepik.com/premium-photo/deck-cargo-ship-crew-members-conduct-routine-checks-maintenance-safety-equipment_216520-17429.jpg",
    description: "Annual Maintenance Contract for the specialized acoustic testing facility at BDL Visakhapatnam, including preventive maintenance and emergency support.",
    client: "Bharat Dynamics Limited",
    duration: "Annual Contract",
    startDate: "Q2 2025",
    features: [
      "Preventive maintenance scheduling",
      "Emergency response services",
      "System performance optimization",
      "Quarterly technical audits"
    ]
  },
  {
    title: "Overhaul and Maintenance of NOPV Class Engines",
    value: "",
    category: "Operations",
    image: "https://i.postimg.cc/zBTFq9GX/images-1.jpg",
    description: "Complete overhaul and maintenance of propulsion systems for Naval Offshore Patrol Vessels, including parts replacement and performance optimization.",
    client: "Indian Navy",
    duration: "6 months",
    startDate: "Q3 2025",
    features: [
      "Engine disassembly and inspection",
      "Wear parts replacement",
      "Performance tuning",
      "Sea trial validation"
    ]
  }
];

const categories = ["All", "Electrical", "Hull", "Maintenance", "Operations", "Supply"];

const clients = [
  {
    name: 'DLRL Hyderabad',
    logo: 'https://i.postimg.cc/t4K1pLsK/Adobe-Express-file-5.png',
    url: 'https://www.drdo.gov.in/labs-establishments/defence-electronics-research-laboratory-hyderabad'
  },
  {
    name: 'Hindustan Shipyard Ltd.',
    logo: 'https://i.postimg.cc/L8qyrppj/Adobe-Express-file.png',
  },
  {
    name: 'Naval Dockyard (V)',
    logo: 'https://i.postimg.cc/NjxGL4x0/ministry-of-defence-naval-dockyard-naval-base-visakhapatnam-visakhapatnam-government-organisations-0.png',
  },
  {
    name: 'NSRY Cochin',
    logo: 'https://i.postimg.cc/250VvP1X/Cochin-Shipyard-SVG-Logo-svg.png',
  },
  {
    name: 'Garden Reach Shipbuilders & Engineers',
    logo: 'https://i.postimg.cc/vB2ZKfMY/Adobe-Express-file-2.png',
  },
  {
    name: 'Larsen & Toubro',
    logo: 'https://i.postimg.cc/j5WdfC0L/Adobe-Express-file-4.png',
  },
  {
    name: 'Goa Shipyard Limited',
    logo: 'https://i.postimg.cc/T1HQh76z/Adobe-Express-file-1.png',
  },
  {
    name: 'Solas Marine Services',
    logo: 'https://solasmarine.com/wp-content/uploads/2020/09/Solas-New-Logo-with-Colour-Code-1.png',
  },
];

const stats = [
  {
    icon: Trophy,
    number: 12,
    label: 'Completed Projects',
    description: 'Delivered with excellence and client satisfaction',
    schemaType: 'CompletedAction'
  },
  {
    icon: Briefcase,
    number: 8,
    label: 'Ongoing Projects',
    description: 'Currently transforming client visions into reality',
  },
  {
    icon: Users,
    number: 15,
    label: 'Satisfied Clients',
    description: 'Leading organizations trust our expertise',
  },
  {
    icon: Building2,
    number: 6,
    label: 'Industry Sectors',
    description: 'Diverse experience across multiple domains',
  },
];

// ==================== SCHEMA MARKUP ====================
const generateProjectSchema = () => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "itemListElement": projects.map((project, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "item": {
      "@type": ["DefenseContractorProject", "CreativeWork"],
      "name": project.title,
      "description": project.description,
      "client": project.client,
      "duration": project.duration,
      "value": project.value,
      "image": project.image,
      "keywords": project.keywords,
      "dateCompleted": project.completed ? new Date().toISOString() : undefined,
      "mainEntityOfPage": {
        "@type": "WebPage",
        "@id": `https://visakhatechsolutions.com/projects#${project.title.replace(/\s+/g, '-').toLowerCase()}`
      }
    }
  }))
});

const companySchema = {
  "@context": "https://schema.org",
  "@type": ["LocalBusiness", "DefenseContractor", "EngineeringService"],
  "name": "Visakhatechsolutions",
  "description": "Leading provider of electro-mechanical solutions for naval and industrial applications in Visakhapatnam",
  "url": "https://visakhatechsolutions.com",
  "logo": "https://visakhatechsolutions.com/logo.png",
  "foundingDate": "2015",
  "founders": [{
    "@type": "Person",
    "name": "Founder Name"
  }],
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Address Line 1",
    "addressLocality": "Visakhapatnam",
    "addressRegion": "Andhra Pradesh",
    "postalCode": "530001",
    "addressCountry": "IN"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "17.6868",
    "longitude": "83.2185"
  },
  "telephone": "+91-XXXXXXXXXX",
  "openingHours": "Mo-Fr 09:00-18:00",
  "serviceArea": {
    "@type": "DefenseEstablishment",
    "name": "Eastern Naval Command"
  },
  "sameAs": [
    "https://www.linkedin.com/company/visakhatech-solutions",
    "https://twitter.com/visakhatech"
  ]
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What industries do you serve with your projects?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We specialize in naval, defense, and industrial sectors, providing electro-mechanical solutions for shipyards, naval bases, and defense research facilities including DRDO, Indian Navy, and Hindustan Shipyard Limited."
      }
    },
    {
      "@type": "Question",
      "name": "How can I inquire about upcoming projects?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Visit our contact page or call our project management team at +91-XXXXXXXXXX to discuss upcoming opportunities and requirements for naval and industrial electrical solutions."
      }
    },
    {
      "@type": "Question",
      "name": "What certifications do you hold for defense projects?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We are ISO 9001:2015 certified and approved vendor for multiple naval establishments with all necessary security clearances for defense-related projects."
      }
    }
  ]
};

// ==================== COMPONENTS ====================
const VideoPlayer = () => {
  const imageSrc = "https://i.postimg.cc/BvWbrW8J/construction-site-53876-14088.avif";

  return (
    <div className="absolute inset-0 w-full h-full flex items-start justify-center overflow-hidden pt-12 bg-custom-bg">
      <div className="relative w-full h-full max-w-[94%] max-h-[89%] md:max-h-[89%] rounded-[10px] overflow-hidden shadow-lg -mt-6 -mr-2 bg-custom-bg">
        <motion.img
          src={imageSrc}
          alt="Naval electrical projects at Visakhatech Solutions"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          loading="eager"
          decoding="async"
          itemProp="image"
        />
      </div>
    </div>
  );
};

const VideoSection = () => {
  return (
    <>
      <section 
        className="relative bg-custom-bg font-archivo bg-custom-bg" 
        style={{ height: '95vh' }}
        itemScope 
        itemType="https://schema.org/ImageObject"
      >
        <meta itemProp="name" content="Visakhatechsolutions Projects Showcase" />
        <meta itemProp="description" content="A snapshot of our latest electrical, automation and fabrication projects at Visakhatech Solutions." />
        <meta itemProp="thumbnailUrl" content="https://i.postimg.cc/BvWbrW8J/construction-site-53876-14088.avif" />
        <meta itemProp="uploadDate" content="2025-04-01T08:00:00+05:30" />
        
        <VideoPlayer />
        <div className="absolute inset-0 flex items-start justify-start z-30 pointer-events-none pt-32 px-8 sm:px-12 md:px-20 md:-mt-32">
          <div className="max-w-4xl text-left">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight -mt-4 md:mt-24"
              itemProp="headline"
            >
              Our
              <br />
              <span 
                className="text-[#00D1D1] drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]" 
                itemProp="keywords"
              >
                Projects
              </span>
              <br />
              Portfolio <span className="text-[#00D1D1]">Showcase</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-10 pointer-events-auto"
            >
              <button 
                className="bg-white text-black border-[6px] border-white text-sm sm:text-base md:text-lg font-semibold px-2 py-0.5 rounded-[8px] hover:bg-gray-200 transition"
                onClick={() => document.getElementById('projects-grid')?.scrollIntoView({ behavior: 'smooth' })}
                aria-label="View our projects portfolio"
              >
                View Projects ↓
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative bg-custom-bg font-archivo py-12 -mt-20 -pr-8">
        <div className="container mx-auto px-4">
          <div className="relative bg-white rounded-2xl shadow-lg border border-blue-100 px-6 sm:px-12 md:px-20 py-12 sm:py-16 md:py-20 text-center w-full max-w-[94%] mx-auto -mt-4">
            <div className="absolute top-2 sm:top-[-10px] left-4 sm:left-[10px] text-[#def0f0] text-[120px] sm:text-[160px] md:text-[200px] font-bold leading-none select-none">
              &ldquo;
            </div>
            <div className="absolute bottom-[-40px] sm:bottom-[-60px] right-4 sm:right-[10px] text-[#def0f0] text-[120px] sm:text-[160px] md:text-[200px] font-bold leading-none select-none">
              &rdquo;
            </div>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-teal-700 mb-6 tracking-wide -mt-4">
              Our Approach
            </h2>

            <h1 className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-light text-gray-900 leading-tight">
              Delivering <span className="font-medium">precision-engineered</span> solutions with <br />
              <span className="text-teal-600 font-semibold">quality and innovation</span>
            </h1>
          </div>
        </div>
      </section>
    </>
  );
};


const StatCard = ({
  icon: Icon,
  number,
  label,
  description,
  delay,
  schemaType
}: {
  icon: React.ElementType;
  number: number;
  label: string;
  description: string;
  delay: number;
  schemaType: string;
}) => {
  const [count, setCount] = useState(0);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
    rootMargin: '-50px 0px',
  });

  useEffect(() => {
    let animationFrame: number;

    if (inView) {
      const startTime = performance.now();
      const duration = 2000;

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        const easeOutQuad = (t: number) => t * (2 - t);
        const easedProgress = easeOutQuad(progress);

        setCount(Math.floor(easedProgress * number));

        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };

      animationFrame = requestAnimationFrame(animate);
    } else {
      setCount(0);
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [inView, number]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
      className="relative group"
      itemScope
      itemType={`https://schema.org/${schemaType}`}
    >
      <div className="flex flex-col items-center p-8 bg-white rounded-2xl shadow-lg transform transition-all duration-300 hover:translate-y-[-10px] hover:shadow-xl border border-gray-100">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-teal-600 to-cyan-500 rounded-t-2xl"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-teal-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative">
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.5, delay: delay + 0.2 }}
            className="p-4 rounded-full bg-gradient-to-br from-blue-100 to-teal-100 mb-6 group-hover:scale-110 transform transition-transform duration-300"
            itemProp="image"
          >
            <Icon className="w-8 h-8 text-blue-600" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: delay + 0.4 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: delay + 0.6 }}
              className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-3"
              itemProp="result"
            >
              {count}+
            </motion.div>
            <div className="text-xl font-semibold text-gray-800 mb-3" itemProp="name">{label}</div>
            <div className="text-sm text-gray-600 text-center max-w-[200px]" itemProp="description">{description}</div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// ==================== MAIN COMPONENT ====================
const Projects = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<null | (typeof projects[0])>(null);
  const projectsRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<SwiperType>(null);
  const [searchTrend, setSearchTrend] = useState('');
  const [voiceSearchQuery, setVoiceSearchQuery] = useState('');

  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Initialize voice search recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new webkitSpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      
      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setVoiceSearchQuery(transcript);
        // Implement search functionality based on transcript
      };
      
      recognition.onerror = (event) => {
        console.error('Voice recognition error', event.error);
      };
    }
  }, []);

  // Simulate fetching search trends
  useEffect(() => {
    const navalTrends = [
      'naval electrification projects',
      'shipyard electrical solutions',
      'defense contractor electrical work',
      'marine automation systems',
      'naval maintenance contracts'
    ];
    setSearchTrend(navalTrends[Math.floor(Math.random() * navalTrends.length)]);
  }, []);

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter((project) => project.category === activeCategory);

  return (
    <div className="bg-custom-bg font-archivo">
      <Helmet>
        <title>VISAKHA TECH SOLUTIONS | Leading Naval & Industrial Electrical Experts in Visakhapatnam</title>
        <meta name="description" content="Premier ISO 9001:2015 certified electrical & automation solutions provider in Visakhapatnam. Specialized in naval, defense, and industrial projects with 100+ successful implementations." />
        <title>Visakha Tech | Naval, Industrial & Defense Automation Experts</title>
        <meta name="description" content="Premier ISO 9001:2015 certified electrical & automation solutions provider in Visakhapatnam. Visakha Tech Specialized in naval, defense, and industrial projects with 100+ successful implementations." />
        <title> Visakhatechsolutions | Naval, Industrial & Defense Automation Experts</title>
        <meta name="description" content="Premier ISO 9001:2015 certified electrical & automation solutions provider in Visakhapatnam. Visakhatechsolutions Specialized in naval, defense, and industrial projects with 100+ successful implementations." />
        <title> Visakhatechsolutions Projects | Naval, Industrial & Defense Automation Experts</title>
        <title> VisakhaTechSolutions | Electrical Automation companies in Visakhapatnam</title>
        <title>VISAKHA TECH SOLUTIONS | Best naval electrical contractors India</title>
        <title>Completed Projects | Naval Electrification, Industrial Automation | Visakha Tech Solutions</title>

  <meta name="description" content="Showcasing major projects completed by Visakha Tech Solutions including naval ship electrification, industrial automation setups, shipyard retrofits, and defense sector electrical systems. Excellence in turnkey project execution." />

  <meta name="keywords" content="Visakha Tech Projects, Naval Electrical Projects India, Industrial Automation Solutions, Shipyard Electrical Upgrades, Defense Contract Turnkey Projects, Ship Electrical Systems India" />
        <meta name="keywords" content={`${[...brandKeywords, ...serviceKeywords, ...locationKeywords].join(', ')}`} />

  <link rel="canonical" href="https://visakhatechsolutions.com/projects" />
        <title>{`Naval Electrical Projects | ${searchTrend || 'Visakhatech Solutions Portfolio'}`}</title>
         {/* Open Graph */}
  <meta property="og:title" content="Project Portfolio | Visakha Tech Solutions" />
  <meta property="og:description" content="Explore turnkey projects across naval, shipyard, and industrial sectors by Visakha Tech Solutions." />
  <meta property="og:url" content="https://visakhatechsolutions.com/projects" />
  <meta property="og:image" content="https://visakhatechsolutions.com/projects-showcase.jpg" />
        <meta name="description" content={`${searchTrend ? 'Expert in ' + searchTrend : 'Comprehensive portfolio of naval and industrial electrical projects'} - ISO certified defense contractor serving Indian Navy, DRDO, and major shipyards`} />
        
        {/* Semantic Keywords */}
        <meta name="keywords" content={`naval projects, shipyard electrification, ${searchTrend}, defense electrical solutions, industrial automation, Visakhapatnam electrical contractors`} />
        
        {/* Canonical and Pagination */}
        <link rel="canonical" href="https://visakhatechsolutions.com/projects" />
        <link rel="next" href="https://visakhatechsolutions.com/projects?page=2" />
        
        {/* Open Graph */}
        <meta property="og:title" content={`Naval Electrical Projects | ${searchTrend || 'Visakhatech Solutions Portfolio'}`} />
        <meta property="og:description" content={`${searchTrend ? 'Specialists in ' + searchTrend : 'Explore our defense and naval electrical projects portfolio'} - Serving Indian Navy and major shipyards`} />
        <meta property="og:image" content="https://visakhatechsolutions.com/projects-og-image.jpg" />
        <meta property="og:url" content="https://visakhatechsolutions.com/projects" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Visakhatech Solutions" />
        
        {/* Twitter Card */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Our Projects - Visakha Tech Solutions" />
  <meta name="twitter:description" content="Electrical and Automation Project Execution for Navy Ships, Shipyards, and Industrial Plants." />
  <meta name="twitter:image" content="https://visakhatechsolutions.com/projects-showcase.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Naval Electrical Projects | ${searchTrend || 'Visakhatech Solutions'}`} />
        <meta name="twitter:description" content={`${searchTrend ? 'Experts in ' + searchTrend : 'Defense and naval electrical projects portfolio'} - ISO certified contractor`} />
        <meta name="twitter:image" content="https://visakhatechsolutions.com/projects-twitter-image.jpg" />
        <meta name="twitter:site" content="@visakhatech" />
        
        {/* Structured Data */}
        <script type="application/ld+json">
{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Visakha Tech Solutions",
  "alternateName": [
  "VTS",
  "Visakha Tech",
  "Visakha Solutions",
  "Visakhatechsolutions",
  "VISAKHA TECH SOLUTIONS",
  "VIZAG TECH SOLUTIONS",
  "vizagtechsolutions",
  "Visakha Technologies",
  "Visakha Tech Solutions Pvt Ltd",
  "Visakha Tech Vizag",
  "Vizag Naval Solutions",
  "Vizag Marine Tech",
  "Vizag Electrical Solutions",
  "Vizag Industrial Automation",
  "Visakhapatnam Tech Solutions",
  "Visakhapatnam Naval Tech",
  "Vizag Electro-Mechanical",
  "Vizag Defense Solutions",
  "Vizag Shipbuilding Tech",
  "Vizag Marine Engineering",
  "Vizag Automation Solutions",
  "Visakha Engineering Solutions",
  "Visakha Marine Tech",
  "Visakha Defense Tech",
  "Visakha Industrial Solutions",
  "Visakha Automation",
  "Vizag VTS",
  "Vizag Visakha Tech",
  "Visakhapatnam VTS",
  "VT Solutions",
  "Vizag Tech",
  "Vizag Solutions",
  "Vizag Engineering",
  "Vizag Automation",
  "Visakha Electro",
  "Visakha Mech",
  "Visakha EM Solutions",
  "Vizag EM Solutions",
  "Vizag Electrical Engineering",
  "Vizag Mechanical Solutions",
  "Vizag Industrial Tech",
  "Visakhapatnam Industrial Solutions",
  "Visakhapatnam Automation",
  "Visakhapatnam Engineering",
  "Vizag Naval Engineering",
  "Vizag Marine Solutions",
  "Vizag Defense Engineering",
  "Vizag Ship Tech",
  "Vizag Marine Automation",
  "Vizag Industrial Automation",
  "Vizag Tech Solutions",
  "Vizag Engineering Solutions",
  "Vizag Industrial Engineering",
  "Vizag Electro Tech",
  "Vizag Mechanical Engineering",
  "Vizag Electrical Tech",
  "Vizag Automation Engineering",
  "Visakha Naval Solutions",
  "Visakha Marine Solutions",
  "Visakha Defense Solutions",
  "Visakha Shipbuilding Solutions",
  "Visakha Industrial Automation",
  "Visakha Electro-Mechanical Engineering",
  "Visakha Electrical Solutions",
  "Visakha Mechanical Solutions",
  "Visakha Automation Engineering",
  "Visakha Industrial Engineering",
  "Visakha Electro Tech",
  "Visakha Electrical Engineering",
  "Visakha Mechanical Engineering",
  "Visakha Automation Solutions",
  "VTS Vizag",
  "VTS Visakhapatnam",
  "VTS Solutions",
  "VTS Technologies",
  "VTS Engineering",
  "VTS Automation",
  "VTS Naval",
  "VTS Marine",
  "VTS Defense",
  "VTS Industrial",
  "VTS Electro-Mechanical",
  "VTS Electrical",
  "VTS Mechanical",
  "VTS Electro",
  "VTS Mech",
  "VTS EM Solutions"
],
  "url": "https://visakhatechsolutions.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://visakhatechsolutions.com/blog?search={search_term_string}",
    "query-input": "required name=search_term_string"
  }
})}
</script>

<script type="application/ld+json">
{JSON.stringify({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Visakha Tech Solutions",
  "alternateName": [
  "VTS",
  "Visakha Tech",
  "Visakha Solutions",
  "Visakhatechsolutions",
  "VISAKHA TECH SOLUTIONS",
  "VIZAG TECH SOLUTIONS",
  "vizagtechsolutions",
  "Visakha Technologies",
  "Visakha Tech Solutions Pvt Ltd",
  "Visakha Tech Vizag",
  "Vizag Naval Solutions",
  "Vizag Marine Tech",
  "Vizag Electrical Solutions",
  "Vizag Industrial Automation",
  "Visakhapatnam Tech Solutions",
  "Visakhapatnam Naval Tech",
  "Vizag Electro-Mechanical",
  "Vizag Defense Solutions",
  "Vizag Shipbuilding Tech",
  "Vizag Marine Engineering",
  "Vizag Automation Solutions",
  "Visakha Engineering Solutions",
  "Visakha Marine Tech",
  "Visakha Defense Tech",
  "Visakha Industrial Solutions",
  "Visakha Automation",
  "Vizag VTS",
  "Vizag Visakha Tech",
  "Visakhapatnam VTS",
  "VT Solutions",
  "Vizag Tech",
  "Vizag Solutions",
  "Vizag Engineering",
  "Vizag Automation",
  "Visakha Electro",
  "Visakha Mech",
  "Visakha EM Solutions",
  "Vizag EM Solutions",
  "Vizag Electrical Engineering",
  "Vizag Mechanical Solutions",
  "Vizag Industrial Tech",
  "Visakhapatnam Industrial Solutions",
  "Visakhapatnam Automation",
  "Visakhapatnam Engineering",
  "Vizag Naval Engineering",
  "Vizag Marine Solutions",
  "Vizag Defense Engineering",
  "Vizag Ship Tech",
  "Vizag Marine Automation",
  "Vizag Industrial Automation",
  "Vizag Tech Solutions",
  "Vizag Engineering Solutions",
  "Vizag Industrial Engineering",
  "Vizag Electro Tech",
  "Vizag Mechanical Engineering",
  "Vizag Electrical Tech",
  "Vizag Automation Engineering",
  "Visakha Naval Solutions",
  "Visakha Marine Solutions",
  "Visakha Defense Solutions",
  "Visakha Shipbuilding Solutions",
  "Visakha Industrial Automation",
  "Visakha Electro-Mechanical Engineering",
  "Visakha Electrical Solutions",
  "Visakha Mechanical Solutions",
  "Visakha Automation Engineering",
  "Visakha Industrial Engineering",
  "Visakha Electro Tech",
  "Visakha Electrical Engineering",
  "Visakha Mechanical Engineering",
  "Visakha Automation Solutions",
  "VTS Vizag",
  "VTS Visakhapatnam",
  "VTS Solutions",
  "VTS Technologies",
  "VTS Engineering",
  "VTS Automation",
  "VTS Naval",
  "VTS Marine",
  "VTS Defense",
  "VTS Industrial",
  "VTS Electro-Mechanical",
  "VTS Electrical",
  "VTS Mechanical",
  "VTS Electro",
  "VTS Mech",
  "VTS EM Solutions"
],
  "url": "https://visakhatechsolutions.com",
  "logo": "https://visakhatechsolutions.com/logo.png",
  "sameAs": [
    "https://www.linkedin.com/company/visakha-tech-solutions",
    "https://twitter.com/visakhatechsol",
    "https://www.facebook.com/visakhatechsolutions"
  ],
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Visakhapatnam",
    "addressRegion": "Andhra Pradesh",
    "postalCode": "530001",
    "addressCountry": "IN"
  },
  "description": "Leading provider of naval solutions, industrial automation and electro-mechanical engineering services in Visakhapatnam"
})}
</script>
        <script type="application/ld+json">{JSON.stringify(companySchema)}</script>
        <script type="application/ld+json">{JSON.stringify(generateProjectSchema())}</script>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        
        {/* Preload and Preconnect */}
        <link rel="preload" href="https://i.postimg.cc/BvWbrW8J/construction-site-53876-14088.avif" as="image" />
        <link rel="preconnect" href="https://i.postimg.cc" />
        <link rel="preconnect" href="https://img.freepik.com" />
        <link rel="dns-prefetch" href="https://i.postimg.cc" />
        <link rel="dns-prefetch" href="https://img.freepik.com" />
        
        {/* Voice Search Meta */}
        <meta name="voice-search-available" content="true" />
        <meta name="voice-search-query" content={voiceSearchQuery} />
        
        {/* Mobile Adaptation */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <meta name="theme-color" content="#00D1D1" />
        
        {/* PWA */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </Helmet>

      {/* Video Section */}
      <VideoSection />

      {/* Projects Section */}
      <section 
        ref={projectsRef} 
        className="py-20 relative overflow-hidden bg-custom-bg"
        itemScope
        itemType="https://schema.org/ItemList"
        id="projects-grid"
      >
        <motion.div
          className="absolute inset-0 opacity-5"
          style={{ y: parallaxY }}
        >
          <div className="absolute inset-0 bg-grid-pattern"></div>
        </motion.div>

        <div className="container mx-auto px-6 relative z-10">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl font-bold text-gray-900 mb-4" itemProp="name">Our Projects Portfolio</h1>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-teal-500 mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto" itemProp="description">
              Browse through our diverse range of successful implementations across naval, defense, and industrial sectors
            </p>
          </motion.div>

          {/* Category Filter */}
          <div className="flex justify-center mb-12 flex-wrap gap-4">
            {categories.map((category) => (
              <motion.button
                key={category}
                onClick={() => setActiveCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 md:px-6 py-2 rounded-full transition-colors shadow-md ${
                  activeCategory === category
                    ? "bg-gradient-to-r from-blue-600 to-teal-600 text-white"
                    : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
                }`}
                aria-label={`Filter projects by ${category}`}
              >
                {category}
              </motion.button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={index}
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 bg-white"
                onClick={() => setSelectedProject(project)}
              >
                <meta itemProp="position" content={String(index + 1)} />
                <motion.div
                  className="h-80 bg-cover bg-center cursor-pointer"
                  style={{ backgroundImage: `url(${project.image})` }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.5 }}
                  itemProp="image"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-blue-900/90 to-transparent" />
                  <div className="absolute bottom-0 p-6 text-white">
                    <span 
                      className="inline-block px-3 py-1 bg-gradient-to-r from-blue-600 to-teal-600 rounded-full text-sm mb-4"
                      itemProp="keywords"
                    >
                      {project.category}
                    </span>
                    <h3 
                      className="text-lg md:text-xl font-semibold mb-2"
                      itemProp="name"
                    >
                      {project.title}
                    </h3>
                    <p className="text-sm md:text-base mb-4" itemProp="value">Project Value: {project.value}</p>
                    <div 
                      className="inline-flex items-center text-blue-300 hover:text-white transition-colors"
                      itemProp="url"
                    >
                      View Details <ChevronRight className="ml-1 w-4 h-4" />
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Project Details Modal (same as before but with enhanced schema) */}
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
                itemScope
                itemType="https://schema.org/DefenseContractorProject"
              >
                {/* Modal content with schema markup */}
              </motion.div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Upcoming Projects Section */}
<section className="py-20 bg-white">
  <div className="container mx-auto px-6">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center mb-16"
    >
      <h2 className="text-4xl font-bold text-gray-900 mb-4">Upcoming Projects</h2>
      <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-teal-500 mx-auto mb-6"></div>
      <p className="text-gray-600 max-w-2xl mx-auto">
        A glimpse into our future endeavors and upcoming implementations
      </p>
    </motion.div>

    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
      {upcomingProjects.map((project, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group relative overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 bg-white"
          itemScope
          itemType="https://schema.org/DefenseContractorProject"
        >
          <div className="h-64 overflow-hidden">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              itemProp="image"
              loading="lazy"
            />
          </div>
          <div className="p-6">
            <div className="flex justify-between items-start mb-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                {project.category}
              </span>
              <span className="text-lg font-semibold text-gray-700">
                {project.value}
              </span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2" itemProp="name">
              {project.title}
            </h3>
            <p className="text-gray-600 mb-4" itemProp="description">
              {project.description}
            </p>
            <div className="mb-4">
              <p className="text-sm text-gray-500"><strong>Client:</strong> {project.client}</p>
              <p className="text-sm text-gray-500"><strong>Duration:</strong> {project.duration}</p>
              <p className="text-sm text-gray-500"><strong>Start Date:</strong> {project.startDate}</p>
            </div>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {project.features.map((feature, i) => (
                <li key={i} className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* Stats Section */}
      <section className="relative py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Our Growth in Numbers
            </h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '8rem' }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="h-1 bg-gradient-to-r from-blue-600 via-teal-600 to-cyan-500 mx-auto mb-6"
            ></motion.div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Measuring our success through impactful collaborations and innovative solutions
            </p>
          </motion.div>

          <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <StatCard
                key={index}
                icon={stat.icon}
                number={stat.number}
                label={stat.label}
                description={stat.description}
                delay={index * 0.2}
                schemaType={stat.schemaType}
              />
            ))}
          </div>

          {/* Mobile slider version */}
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Valued Clients
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-teal-500 mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Trusted by industry leaders across defense, maritime, and engineering sectors
            </p>
          </motion.div>

          <div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            itemScope
            itemType="https://schema.org/Organization"
          >
            {clients.map((client, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl flex items-center justify-center h-48 hover:bg-gray-50 transition-colors overflow-hidden group relative border-2 border-gray-200"
                itemProp="member"
              >
                <a href={client.url} target="_blank" rel="noopener noreferrer" itemProp="url">
                  <img 
                    src={client.logo} 
                    alt={client.name} 
                    className="max-h-28 max-w-full object-contain"
                    itemProp="logo"
                    loading="lazy"
                  />
                  <meta itemProp="name" content={client.name} />
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Get In Touch Section */}
      <section 
        className="w-full bg-[#f5f9ff] py-16 px-4 lg:px-20 flex flex-col lg:flex-row justify-center items-center gap-10"
        itemScope
        itemType="https://schema.org/LocalBusiness"
      >
        <div className="rounded-[15px] overflow-hidden w-full max-w-md">
          <img
            src="https://i.postimg.cc/x1CNYJqd/harbor-sunset-1359-1120-1.jpg"
            alt="Naval Electrical Solutions in Visakhapatnam"
            className="w-full h-full object-cover rounded-[15px]"
            itemProp="image"
            loading="lazy"
          />
        </div>

        <div className="bg-white rounded-[15px] p-6 md:p-10 w-full max-w-2xl shadow-md md:h-[440px] text-center lg:text-left">
          <h2
            className="text-[28px] md:text-4xl font-regular leading-snug"
            style={{ fontFamily: "'Archivo', sans-serif" }}
            itemProp="name"
          >
            Are you ready to drive the future of{" "}
            <span className="text-teal-600 font-bold">sustainable electro-mechanical solutions</span>?
          </h2>

          <Link 
            to="/contact"
            className="mt-10 md:mt-32 bg-black text-white px-6 py-3 rounded-md hover:bg-gray-900 transition flex items-center gap-2 font-bold mx-auto lg:mx-0 max-w-fit"
            itemProp="url"
          >
            Get in touch
            <span className="text-2xl font-bold">→</span>
          </Link>
          
          <meta itemProp="address" content="Visakhapatnam, Andhra Pradesh" />
          <meta itemProp="telephone" content="+91-XXXXXXXXXX" />
          <meta itemProp="email" content="contact@visakhatechsolutions.com" />
        </div>
      </section>

      {/* Service Worker Registration */}
      <script>
        {`
          if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
              navigator.serviceWorker.register('/sw.js').then(registration => {
                console.log('ServiceWorker registration successful');
              }).catch(err => {
                console.log('ServiceWorker registration failed: ', err);
              });
            });
          }
        `}
      </script>

      {/* Voice Search Button */}
      <button 
        className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors"
        onClick={() => {
          if ('webkitSpeechRecognition' in window) {
            const recognition = new webkitSpeechRecognition();
            recognition.start();
          } else {
            alert("Voice search not supported in your browser");
          }
        }}
        aria-label="Voice search"
      >
        <svg xmlns="https://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
        </svg>
      </button>
    </div>
  );
};

export default Projects;