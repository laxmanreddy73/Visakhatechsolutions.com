import { Wrench, PenTool as Tool, Settings, Truck, Shield, Cpu, ChevronRight, Quote, Building2, Target, Users, Award, Trophy, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { brandKeywords, serviceKeywords, locationKeywords } from '../data/keywords';

// Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
      })
      .catch(error => {
        console.log('ServiceWorker registration failed: ', error);
      });
  });
}

// Structured Data Generator
const generateServiceSchema = (services) => {
  return services.map(service => ({
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": service.title,
    "provider": {
      "@type": "Organization",
      "name": "Visakhatechsolutions",
      "url": "https://visakhatechsolutions.com"
    },
    "description": service.description,
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": service.title + " Features",
      "itemListElement": service.features.map((feature, i) => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": feature
        }
      }))
    }
  }));
};

const partners = [
  {
    name: "DRDL Hyderabad",
    logo: "https://www.drdo.gov.in/sites/default/files/inline-images/DRDL_Logo.png"
  },
  {
    name: "Hindustan Shipyard Ltd.",
    logo: "https://upload.wikimedia.org/wikipedia/en/thumb/7/7e/Hindustan_Shipyard_Limited_Logo.svg/1200px-Hindustan_Shipyard_Limited_Logo.svg.png"
  },
  {
    name: "Naval Dockyard (V)",
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cb/Naval_dockyard_Entrance.jpg/800px-Naval_dockyard_Entrance.jpg"
  },
  {
    name: "NSRY Cochin",
    logo: "https://cochinshipyard.in/uploads/gallery/7b58a64c022b91acc20a6970102fd3f7.jpg"
  }
];

const services = [
  {
    icon: Wrench,
    title: "Electrical Consultancy",
    description: "Expert guidance for efficient and safe electrical systems, including layout design, load analysis, and compliance.",
    features: [
      "Load analysis and system design",
      "Compliance with standards",
      "Custom solutions for projects",
      "Energy cost optimization",
      "Risk assessment and mitigation",
      "Sustainable energy integration",
      "System optimization strategies"
    ],
    stats: [
      { value: "50+", label: "Projects Completed" },
      { value: "100%", label: "Client Satisfaction" },
      { value: "24/7", label: "Support Available" }
    ]
  },
  {
    icon: Tool,
    title: "Turnkey Projects",
    description: "End-to-end solutions for electrical, fabrication, and welding projects, ensuring quality and on-time delivery.",
    features: [
      "Complete project management",
      "High-quality fabrication",
      "Electrical system integration",
      "Timely delivery with cost control",
      "Multi-disciplinary coordination",
      "Quality assurance protocols",
      "Commissioning and handover"
    ],
    stats: [
      { value: "30+", label: "Turnkey Projects" },
      { value: "98%", label: "On-Time Delivery" },
      { value: "₹5Cr+", label: "Project Value" }
    ]
  },
  {
    icon: Settings,
    title: "Maintenance",
    description: "Reliable AMC services with 24/7 support to ensure system longevity and minimal downtime.",
    features: [
      "Comprehensive AMC",
      "24/7 breakdown support",
      "Preventive maintenance",
      "Certified technicians",
      "Predictive maintenance",
      "Asset management",
      "Performance optimization"
    ],
    stats: [
      { value: "99%", label: "Uptime Guarantee" },
      { value: "1hr", label: "Response Time" },
      { value: "50+", label: "Maintenance Contracts" }
    ]
  },
  {
    icon: Truck,
    title: "Supply Chain",
    description: "Supply of premium electrical equipment with timely delivery and adherence to industry standards.",
    features: [
      "Quality electrical equipment",
      "Trusted manufacturers",
      "Wide product range",
      "Custom bulk solutions",
      "Just-in-time delivery",
      "Vendor management",
      "Inventory optimization"
    ],
    stats: [
      { value: "100+", label: "Suppliers Network" },
      { value: "48hr", label: "Delivery Window" },
      { value: "0%", label: "Defect Rate" }
    ]
  },
  {
    icon: Shield,
    title: "Quality Assurance",
    description: "ISO-certified processes ensuring reliable, safe, and top-quality products and services.",
    features: [
      "ISO 9001:2015 certified",
      "Rigorous quality checks",
      "Safety compliance",
      "Dedicated QA team",
      "Process audits",
      "Continuous improvement",
      "Documentation control"
    ],
    stats: [
      { value: "100%", label: "Compliance" },
      { value: "0", label: "Major Non-Conformities" },
      { value: "50+", label: "Quality Protocols" }
    ]
  },
  {
    icon: Cpu,
    title: "Automation",
    description: "Advanced automation solutions for improved efficiency, seamless operations, and cost reduction.",
    features: [
      "Custom system design",
      "Integration with infrastructure",
      "Tech upgrades",
      "Enhanced monitoring",
      "IoT implementation",
      "AI-driven optimization",
      "Remote management"
    ],
    stats: [
      { value: "40%", label: "Efficiency Gain" },
      { value: "30+", label: "Automation Projects" },
      { value: "24/7", label: "System Monitoring" }
    ]
  }
];

const testimonials = [
  {
    name: "Laxman Reddy",
    role: "CEO, ABC Corporation",
    quote: "Their expertise in electrical consultancy transformed our operations...",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    rating: 5,
    project: "Shipyard Electrification",
    date: "2023-05-15"
  },
  {
    name: "Puja Kusumuru",
    role: "Operations Manager, XYZ Industries",
    quote: "The turnkey project was delivered on time and within budget. Their project management skills and technical expertise made the entire process seamless.",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    rating: 5,
    project: "Industrial Automation"
  },
  {
    name: "Raghav Rao",
    role: "CTO, DEF Solutions",
    quote: "Their automation solutions have significantly improved our efficiency by 40%. The after-sales support is exceptional with quick response times.",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    rating: 5,
    project: "Smart Factory Implementation"
  },
  {
    name: "Sanjay Gupta",
    role: "Director, GHI Enterprises",
    quote: "The quality assurance processes are impeccable. We've had zero defects in all supplied equipment, which is remarkable in our industry.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    rating: 5,
    project: "Electrical Components Supply"
  }
];

const caseStudies = [
  {
    title: "Electrification of Naval Vessel VC11199",
    description: "Successfully delivered a complex electrification project...",
    image: "https://i.postimg.cc/bNgpFr83/INS-Saryu.jpg",
    imageBlur: "https://i.postimg.cc/bNgpFr83/INS-Saryu-blur.jpg",
    client: "Indian Navy",
    duration: "6 Months",
    value: "₹3 Crore",
    features: [
      "Complete electrical system overhaul",
      "Advanced power distribution network",
      "Safety compliance upgrades",
      "Automated monitoring systems"
    ],
    completionDate: "2022-11-30",
    location: "Visakhapatnam"
  },
  {
    title: "Automation in Shipbuilding Facility",
    description: "Implemented advanced automation solutions for a major shipbuilding facility, reducing downtime by 30% and improving production efficiency.",
    image: "https://i.postimg.cc/zGQ0Fst0/8-benefits-of-automation-in-manufacturing-and-how-to-unlock-them-6703e400c8fe0.webp",
    imageBlur: "https://i.postimg.cc/zGQ0Fst0/8-benefits-of-automation-in-manufacturing-blur.webp",
    client: "Hindustan Shipyard Ltd.",
    duration: "4 Months",
    value: "₹1.8 Crore",
    features: [
      "Custom automation system design",
      "Integration with existing infrastructure",
      "Real-time monitoring dashboard",
      "Predictive maintenance"
    ]
  },
  {
    title: "Energy Management System for Naval Base",
    description: "Designed and deployed a comprehensive energy management system for a large naval base, optimizing energy usage and reducing costs by 25%.",
    image: "https://i.postimg.cc/L5MHY0Fs/britannica-insights-Phil-the-Fixer-renewable-energy.webp",
    imageBlur: "https://i.postimg.cc/L5MHY0Fs/britannica-insights-Phil-the-Fixer-renewable-energy-blur.webp",
    client: "Naval Dockyard Visakhapatnam",
    duration: "5 Months",
    value: "₹2.2 Crore",
    features: [
      "Energy consumption monitoring",
      "Peak load management",
      "Renewable energy integration",
      "Automated reporting"
    ]
  },
  {
    title: "AFDS System Serviceability Checks",
    description: "Conducted comprehensive serviceability checks and maintenance for Automated Fire Detection Systems across multiple naval vessels.",
    image: "https://img.freepik.com/premium-photo/deck-cargo-ship-crew-members-conduct-routine-checks-maintenance-safety-equipment_216520-17429.jpg",
    imageBlur: "https://img.freepik.com/premium-photo/deck-cargo-ship-blur_216520-17429.jpg",
    client: "Indian Coast Guard",
    duration: "2 Months",
    value: "₹10 Lakhs",
    features: [
      "System diagnostics & calibration",
      "Preventive maintenance",
      "Performance optimization",
      "Compliance documentation"
    ]
  }
];

const clients = [
  {
    name: 'DLRL Hyderabad',
    logo: 'https://i.postimg.cc/t4K1pLsK/Adobe-Express-file-5.png',
    url: 'https://www.drdo.gov.in/labs-and-establishments/defence-electronics-research-laboratory-(derl)-hyderabad'
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
    number: 6,
    label: 'Happy Clients',
    description: 'Leading companies trust our expertise and innovative solutions',
  },
  {
    icon: Building2,
    number: 1,
    label: 'Branch Office',
    description: 'Strategic location serving our growing client base',
  },
  {
    icon: Briefcase,
    number: 6,
    label: 'Major Projects',
    description: 'Successfully delivered transformative solutions',
  },
  {
    icon: Users,
    number: 120,
    label: 'Manpower Count',
    description: 'Comprising top engineers driving innovation and excellence',
  },
];



const VideoPlayer = () => {
  const imageSrc = "https://i.postimg.cc/y8DGczcZ/pexels-gabrielrissi-22863134.jpg";

  return (
    <div className="absolute inset-0 w-full h-full flex items-start justify-center overflow-hidden pt-12 bg-custom-bg -mt-20">
      <div className="relative w-full h-full max-w-[94%] max-h-[89%] md:max-h-[89%] rounded-[10px] overflow-hidden shadow-lg -mt-6 mx-auto bg-custom-bg">
        <motion.img
          src={imageSrc}
          alt="About Us Visakha Tech Solutions for electro-mechanical solutions"
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          loading="eager"
          decoding="async"
        />
      </div>
    </div>
  );
};

const VideoSection = () => {
  return (
    <>
      <section 
        className="relative bg-custom-bg font-archivo" 
        style={{ height: '95vh', minHeight: '600px' }}
        itemScope
        itemType="https://schema.org/VideoObject"
      >
        <meta itemProp="name" content="Visakhatechsolutions Services Overview" />
        <meta itemProp="description" content="Video showcasing our comprehensive electro-mechanical services for naval and industrial applications" />
        <meta itemProp="thumbnailUrl" content="https://visakhatechsolutions.com/services-preview.jpg" />
        <meta itemProp="uploadDate" content="2023-06-15T08:00:00+05:30" />
        
        <VideoPlayer />
        <div className="absolute inset-0 flex items-start justify-start z-30 pointer-events-none pt-32 px-4 sm:px-8 md:px-12 lg:px-20 md:-mt-32">
          <div className="max-w-4xl text-left -mt-16 px-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mt-16 md:mt-24 lg:mt-32"
              itemProp="headline"
            >
              Our
              <br />
              <span className="text-[#00D1D1] drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">Comprehensive</span>
              <br />
              Services <span className="text-[#00D1D1]">Portfolio</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-6 sm:mt-8 md:mt-10 pointer-events-auto"
            >
              <Link 
                to="#services" 
                className="bg-white text-black border-[4px] sm:border-[6px] border-white text-xs sm:text-sm md:text-base font-semibold px-3 py-1 sm:px-4 sm:py-2 rounded-[8px] hover:bg-gray-200 transition"
                aria-label="Explore our services"
              >
                Explore Services →
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="relative bg-custom-bg font-archivo py-8 sm:py-12 -mt-20">
        <div className="container mx-auto px-4">
          <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-lg border border-blue-100 px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16 text-center w-full max-w-[94%] mx-auto -mt-4">
            <div className="absolute top-0 sm:top-2 left-2 sm:left-4 text-[#def0f0] text-[80px] sm:text-[120px] md:text-[160px] lg:text-[200px] font-bold leading-none select-none">
              &ldquo;
            </div>
            <div className="absolute bottom-[-30px] sm:bottom-[-40px] right-2 sm:right-4 text-[#def0f0] text-[80px] sm:text-[120px] md:text-[160px] lg:text-[200px] font-bold leading-none select-none">
              &rdquo;
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-teal-700 mb-4 sm:mb-6 tracking-wide -mt-2">
              Our Service Philosophy
            </h2>

            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-gray-900 leading-tight">
              Delivering <span className="font-medium">Excellence</span> through <span className="font-medium">Innovation</span><br />
              <span className="text-teal-600 font-semibold">and Precision Engineering</span>
            </h1>
          </div>
        </div>
      </section>
    </>
  );
};

const ServiceStatCard = ({
  icon: Icon,
  number,
  label,
  delay,
}: {
  icon: React.ElementType;
  number: string;
  label: string;
  delay: number;
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
    rootMargin: '-50px 0px',
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col items-center p-2 sm:p-4"
      itemScope
      itemType="https://schema.org/QuantitativeValue"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.5, delay: delay + 0.2 }}
        className="p-2 sm:p-3 rounded-full bg-gradient-to-br from-blue-100 to-teal-100 mb-2 sm:mb-4 group-hover:scale-110 transform transition-transform duration-300"
      >
        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
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
          className="text-xl sm:text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-1 sm:mb-2"
          itemProp="value"
        >
          {number}
        </motion.div>
        <div className="text-xs sm:text-sm font-medium text-gray-600" itemProp="unitText">
          {label}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function Services() {
  const [activeService, setActiveService] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [searchTrend, setSearchTrend] = useState('');
  const swiperRef = useRef(null);

  useEffect(() => {
    const fetchSearchTrend = async () => {
      setTimeout(() => {
        setSearchTrend('Naval Electrification');
      }, 500);
    };
    fetchSearchTrend();
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const servicesSchema = generateServiceSchema(services);

  return (
    <div className="pt-16 md:pt-20 font-archivo" id="services">
      <Helmet>
        <title>VISAKHA TECH SOLUTIONS | Leading Naval & Industrial Electrical Experts in Visakhapatnam</title>
        <meta name="description" content="Premier ISO 9001:2015 certified electrical & automation solutions provider in Visakhapatnam. Specialized in naval, defense, and industrial projects with 100+ successful implementations." />
        <title>Visakha Tech | Naval, Industrial & Defense Automation Experts</title>
        <meta name="description" content="Premier ISO 9001:2015 certified electrical & automation solutions provider in Visakhapatnam. Visakha Tech Specialized in naval, defense, and industrial projects with 100+ successful implementations." />
        <title> Visakhatechsolutions | Naval, Industrial & Defense Automation Experts</title>
        <meta name="description" content="Premier ISO 9001:2015 certified electrical & automation solutions provider in Visakhapatnam. Visakhatechsolutions Specialized in naval, defense, and industrial projects with 100+ successful implementations." />
        <title>Visakhatechsolutions | Naval, Industrial & Defense Automation Experts</title>
        <title>VisakhaTechSolutions | Electrical Automation companies in Visakhapatnam</title>
        <title>VISAKHA TECH SOLUTIONS | Best naval electrical contractors India</title>
        <meta name="description" content="Explore ISO 9001:2015 certified services from Visakha Tech Solutions - Electrical consultancy, automation upgrades, turnkey naval electrification, mechanical fabrication, and industrial maintenance. Trusted defense and industry contractors." />
        <meta name="keywords" content="Electrical Consultancy, Automation Upgradation, Naval Electrical Systems, Turnkey Projects India, Industrial Maintenance Services, Defense Contracting, Shipyard Automation, Fabrication and Machining Works, Naval Ship Electrical Refurbishment" />
        <link rel="canonical" href="https://visakhatechsolutions.com/services" />
        <title>{`Visakhatechsolutions | ${searchTrend || 'Electro-Mechanical Experts for Naval and Industrial Solutions'}`}</title>
        <meta name="description" content={`Visakhatechsolutions, ISO 9001:2015 certified, delivers turnkey electrical, automation, and mechanical engineering services. ${searchTrend ? 'Specialists in ' + searchTrend + '.' : 'Explore our expertise across industries and defense sectors.'}`} />
        <meta name="keywords" content={`Visakhatechsolutions, Electrical Engineering, Automation Systems, Turnkey Industrial Solutions, Naval Electrification, Defense Projects, Marine Systems, Industrial Maintenance${searchTrend ? ', ' + searchTrend : ''}`} />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

        <meta property="og:type" content="website" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:title" content={`Visakhatechsolutions | ${searchTrend || 'Engineering Beyond Standards'}`} />
        <meta property="og:description" content={`Delivering excellence in electrical consultancy, industrial automation, and turnkey services. ${searchTrend ? 'Key expertise: ' + searchTrend + '.' : ''}`} />
        <meta property="og:url" content="https://visakhatechsolutions.com/services" />
        <meta property="og:image" content="https://visakhatechsolutions.com/services-preview.jpg" />
        <meta property="og:image:alt" content="Visakhatechsolutions Services Overview" />
        <meta property="og:site_name" content="Visakhatechsolutions" />
        <meta property="og:title" content="Electrical, Automation & Naval Services | Visakha Tech Solutions" />
        <meta property="og:description" content="Delivering certified services in electrical, automation, fabrication, piping, and maintenance for naval, defense, and industrial sectors." />
        <meta property="og:url" content="https://visakhatechsolutions.com/services" />
        <meta property="og:image" content="https://visakhatechsolutions.com/services-preview.jpg" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`Visakhatechsolutions | ${searchTrend || 'Electro-Mechanical Expertise'}`} />
        <meta name="twitter:description" content={`ISO-certified engineering, consultancy, and project delivery for naval and industrial sectors. ${searchTrend ? 'Specialization in ' + searchTrend + '.' : ''}`} />
        <meta name="twitter:image" content="https://visakhatechsolutions.com/services-preview.jpg" />
        <meta name="twitter:site" content="@Visakhatechsolutions" />
        <meta name="twitter:creator" content="@Visakhatechsolutions" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Top Electrical & Automation Experts | Visakha Tech Solutions" />
        <meta name="twitter:description" content="Turnkey Electro-Mechanical Services for Naval, Industrial, and Defense Sectors - ISO 9001:2015 Certified." />
        <meta name="twitter:image" content="https://visakhatechsolutions.com/services-preview.jpg" />
        <meta name="keywords" content={`${[...brandKeywords, ...serviceKeywords, ...locationKeywords].join(', ')}`} />

        <link rel="preload" href="https://media-hosting.imagekit.io//d51ea13ecfb04379/135849-764362069.mp4" as="video" type="video/mp4" />
        <link rel="preconnect" href="https://www.drdo.gov.in" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://cochinshipyard.in" />

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Services - Visakhatechsolutions",
            "description": "ISO 9001:2015 certified electrical, automation, and industrial service provider for naval and defense sectors.",
            "url": "https://visakhatechsolutions.com/services",
            "publisher": {
              "@type": "Organization",
              "name": "Visakhatechsolutions",
              "url": "https://visakhatechsolutions.com",
              "logo": {
                "@type": "ImageObject",
                "url": "https://visakhatechsolutions.com/logo.png",
                "width": 512,
                "height": 512
              }
            }
          })}
        </script>
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

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Visakhatechsolutions",
            "url": "https://visakhatechsolutions.com",
            "sameAs": [
              "https://www.linkedin.com/company/visakhatechsolutions",
              "https://twitter.com/Visakhatechsolutions",
              "https://www.facebook.com/Visakhatechsolutions"
            ],
            "logo": "https://visakhatechsolutions.com/logo.png",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+91-XXXXXXXXXX",
              "contactType": "Customer Support",
              "areaServed": "IN",
              "availableLanguage": "English"
            }
          })}
        </script>

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://visakhatechsolutions.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "Services",
                "item": "https://visakhatechsolutions.com/services"
              }
            ]
          })}
        </script>
      </Helmet>

      <VideoSection />

      {/* Enhanced Service Spectrum Section */}
      <section 
        className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white" 
        id="service-spectrum"
        itemScope
        itemType="https://schema.org/ItemList"
      >
        <meta itemProp="name" content="Our Service Spectrum" />
        <meta itemProp="numberOfItems" content={services.length} />
        <div className="container mx-auto px-4">
          <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16 w-full max-w-[94%] mx-auto">
            
            {/* Section Heading */}
            <motion.header
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8 sm:mb-12"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4" itemProp="name">Our Service Spectrum</h2>
              <div className="w-20 sm:w-24 h-1 bg-teal-500 mx-auto"></div>
              <p className="text-gray-600 mt-4 sm:mt-6 max-w-3xl mx-auto text-sm sm:text-base" itemProp="description">
                Explore a diverse portfolio of high-performance solutions tailored for modern industrial and defense applications.
              </p>
            </motion.header>

            {/* Service Selector */}
            <div className="mb-8 sm:mb-12 overflow-x-auto" role="tablist" aria-label="Service Categories">
              <div className="flex flex-nowrap sm:flex-wrap justify-start sm:justify-center gap-2 sm:gap-3 md:gap-4 pb-2 sm:pb-0">
                {services.map((service, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    onClick={() => setActiveService(index)}
                    className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all duration-300 whitespace-nowrap ${
                      activeService === index 
                        ? 'bg-teal-600 text-white shadow-lg' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                    aria-selected={activeService === index}
              aria-controls={`service-panel-${index}`}
                                  role="tab"
                    id={`service-tab-${index}`}
                    itemScope
                    itemProp="itemListElement"
                    itemType="https://schema.org/ListItem"
                  >
                    <meta itemProp="position" content={index + 1} />
                    <span itemProp="name">{service.title}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Service Details */}
            <div className="grid md:grid-cols-2 gap-6 sm:gap-8 md:gap-10 lg:gap-12" role="tabpanel" id={`service-panel-${activeService}`} aria-labelledby={`service-tab-${activeService}`}>
              
              {/* Left Content */}
              <motion.article
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-col justify-center"
                itemScope
                itemType="https://schema.org/Service"
              >
                <meta itemProp="serviceType" content={services[activeService].title} />
                <header className="flex items-center mb-4 sm:mb-6">
                  <div className="p-3 sm:p-4 bg-teal-100 rounded-full mr-3 sm:mr-4">
                    {(() => {
                      const Icon = services[activeService].icon;
                      return <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-teal-600" aria-hidden="true" />;
                    })()}
                  </div>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800" itemProp="name">
                    {services[activeService].title}
                  </h3>
                </header>
                
                <p className="text-gray-600 mb-6 sm:mb-8 text-sm sm:text-base md:text-lg leading-relaxed" itemProp="description">
                  {services[activeService].description}
                </p>

                {/* Key Features */}
                <div className="mb-6 sm:mb-8" itemScope itemType="https://schema.org/OfferCatalog" itemProp="hasOfferCatalog">
                  <meta itemProp="name" content={`${services[activeService].title} - Features`} />
                  <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4">Key Features:</h4>
                  <ul className="space-y-2 sm:space-y-3" role="list">
                    {services[activeService].features.map((feature, i) => (
                      <li key={i} className="flex items-start" itemScope itemType="https://schema.org/Offer" itemProp="itemListElement">
                        <meta itemProp="position" content={i + 1} />
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 text-teal-500 mr-2 sm:mr-3 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-700 text-sm sm:text-base" itemProp="name">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.article>

              {/* Right Content */}
              <motion.aside
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-gray-50 rounded-lg sm:rounded-xl p-4 sm:p-6 md:p-8 border border-gray-200"
              >
                <h4 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4 sm:mb-6 text-center">Service Highlights</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 sm:gap-3 md:gap-4 mb-6 sm:mb-8">
                  {services[activeService].stats.map((stat, i) => (
                    <ServiceStatCard
                      key={i}
                      icon={services[activeService].icon}
                      number={stat.value}
                      label={stat.label}
                      delay={i * 0.2}
                    />
                  ))}
                </div>
                <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-gray-100">
                  <h5 className="font-medium text-gray-700 mb-2 sm:mb-3 text-sm sm:text-base">Why Choose This Service?</h5>
                  <p className="text-gray-600 text-xs sm:text-sm">
                    Backed by ISO 9001:2015 certification, our {services[activeService].title.toLowerCase()} solutions ensure unmatched quality, efficiency, and innovation tailored to your specific needs.
                  </p>
                </div>
              </motion.aside>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Service Offerings with enhanced interactivity */}
      <section 
        className="py-12 sm:py-16 md:py-20 bg-white"
        onMouseMove={handleMouseMove}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 209, 209, 0.1), transparent 80%)`,
          }}
        ></div>

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-8 sm:mb-12 md:mb-16"
          >
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">Detailed Service Offerings</h2>
            <div className="w-20 sm:w-24 h-1 bg-teal-500 mx-auto"></div>
            <p className="text-gray-600 mt-4 sm:mt-6 max-w-3xl mx-auto text-sm sm:text-base">
              Explore our comprehensive range of specialized services designed to meet your industrial needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                viewport={{ once: true }}
                className="relative bg-white rounded-xl sm:rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 overflow-hidden group"
                itemScope
                itemType="https://schema.org/Service"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-teal-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10 p-4 sm:p-6 md:p-8 h-full flex flex-col">
                  <div className="flex items-center mb-4 sm:mb-6">
                    <div className="p-3 sm:p-4 bg-teal-100 rounded-full mr-3 sm:mr-4 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300">
                      <service.icon className="w-5 h-5 sm:w-6 sm:h-6 text-teal-600 group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-gray-800 group-hover:text-teal-600 transition-colors duration-300" itemProp="name">
                      {service.title}
                    </h3>
                  </div>

                  <p className="text-gray-600 mb-4 sm:mb-6 flex-grow text-sm sm:text-base" itemProp="description">
                    {service.description}
                  </p>

                  <div className="mb-4 sm:mb-6">
                    <h4 className="text-xs sm:text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2 sm:mb-3">
                      Key Features
                    </h4>
                    <ul className="space-y-1 sm:space-y-2" itemProp="hasOfferCatalog" itemScope itemType="https://schema.org/OfferCatalog">
                      {service.features.slice(0, 4).map((feature, i) => (
                        <li key={i} className="flex items-start" itemProp="itemListElement" itemScope itemType="https://schema.org/Offer">
                          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-teal-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-gray-700 text-xs sm:text-sm" itemProp="name">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-auto">
                    <Link
                      to={`/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                      className="inline-flex items-center text-teal-600 hover:text-teal-800 font-medium text-xs sm:text-sm"
                      aria-label={`Learn more about ${service.title}`}
                    >
                      Learn more about this service
                      <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies with rich schema */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16 w-full max-w-[94%] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8 sm:mb-12"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">Service Success Stories</h2>
              <div className="w-20 sm:w-24 h-1 bg-teal-500 mx-auto"></div>
              <p className="text-gray-600 mt-4 sm:mt-6 max-w-3xl mx-auto text-sm sm:text-base">
                Explore how our services have delivered measurable results for clients across industries
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
              {caseStudies.map((caseStudy, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="group relative overflow-hidden rounded-lg sm:rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                  itemScope
                  itemType="https://schema.org/CreativeWork"
                >
                  {/* Structured data for case study */}
                  <script type="application/ld+json">
                    {JSON.stringify({
                      "@context": "https://schema.org",
                      "@type": "CaseStudy",
                      "name": caseStudy.title,
                      "description": caseStudy.description,
                      "datePublished": caseStudy.completionDate,
                      "about": {
                        "@type": "Organization",
                        "name": caseStudy.client
                      },
                      "location": {
                        "@type": "Place",
                        "name": caseStudy.location
                      }
                    })}
                  </script>

                  {/* Mobile - Only Image */}
                  <div className="md:hidden aspect-video relative">
                    <img
                      src={caseStudy.image}
                      alt={caseStudy.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      itemProp="image"
                    />
                  </div>

                  {/* Desktop - Full Content */}
                  <div className="hidden md:block aspect-video relative">
                    <img
                      src={caseStudy.image}
                      alt={caseStudy.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                      itemProp="image"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                  </div>

                  <div className="hidden md:block absolute bottom-0 left-0 right-0 p-4 sm:p-6">
                    <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 sm:p-4 transform group-hover:translate-y-0 transition-transform duration-300">
                      <div className="flex justify-between items-start mb-1 sm:mb-2">
                        <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-800" itemProp="name">
                          {caseStudy.title}
                        </h3>
                        <span className="bg-teal-100 text-teal-800 text-xs font-medium px-2 py-1 rounded-full whitespace-nowrap">
                          {caseStudy.value}
                        </span>
                      </div>

                      <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3" itemProp="description">
                        {caseStudy.description}
                      </p>

                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-xs text-gray-500">Client</p>
                          <p className="text-xs sm:text-sm font-medium text-gray-700" itemProp="publisher">
                            {caseStudy.client}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Duration</p>
                          <p className="text-xs sm:text-sm font-medium text-gray-700">
                            {caseStudy.duration}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8 sm:mt-12">
              <Link
                to="/projects"
                className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-colors duration-300 text-sm sm:text-base"
                aria-label="View all case studies"
              >
                View All Case Studies <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 sm:ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section */}
      <section className="py-12 sm:py-16 md:py-20 bg-custom-bg">
        <div className="container mx-auto px-4">
          <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16 w-full max-w-[94%] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8 sm:mb-12"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">Client Testimonials</h2>
              <div className="w-20 sm:w-24 h-1 bg-teal-500 mx-auto"></div>
              <p className="text-gray-600 mt-4 sm:mt-6 max-w-3xl mx-auto text-sm sm:text-base">
                Hear what our clients say about our services and their experiences working with us
              </p>
            </motion.div>

            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={16}
              slidesPerView={1}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true, // Add this to prevent issues
                waitForTransition: true  // Add this for smoother transitions
              }}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 24,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
              className="pb-8 sm:pb-12"
            >
              {testimonials.map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="h-full"
                    itemScope
                    itemType="https://schema.org/Review"
                  >
                    {/* Testimonial structured data */}
                    <script type="application/ld+json">
                      {JSON.stringify({
                        "@context": "https://schema.org",
                        "@type": "Review",
                        "itemReviewed": {
                          "@type": "Organization",
                          "name": "Visakhatechsolutions"
                        },
                        "author": {
                          "@type": "Person",
                          "name": testimonial.name,
                          "jobTitle": testimonial.role
                        },
                        "reviewRating": {
                          "@type": "Rating",
                          "ratingValue": testimonial.rating,
                          "bestRating": "5"
                        },
                        "datePublished": testimonial.date,
                        "reviewBody": testimonial.quote
                      })}
                    </script>

                    <div className="bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col border border-gray-100">
                      <div className="flex items-center mb-3 sm:mb-4">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 sm:mr-4 object-cover"
                          itemProp="image"
                        />
                        <div>
                          <h3 className="text-sm sm:text-base md:text-lg font-semibold text-gray-800" itemProp="author">
                            {testimonial.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-500">{testimonial.role}</p>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm sm:text-base" itemProp="reviewBody">
                        "{testimonial.quote}"
                      </p>

                      <div className="flex justify-end mt-3 sm:mt-4">
                        <span className="text-teal-500 font-semibold" itemProp="reviewRating">
                          {testimonial.rating} / 5
                        </span>
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* Service Process with schema */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16 w-full max-w-[94%] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8 sm:mb-12"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">Our Service Process</h2>
              <div className="w-20 sm:w-24 h-1 bg-teal-500 mx-auto"></div>
              <p className="text-gray-600 mt-4 sm:mt-6 max-w-3xl mx-auto text-sm sm:text-base">
                A systematic approach to ensure quality, efficiency, and client satisfaction at every stage
              </p>
            </motion.div>

            <div className="relative" itemScope itemType="https://schema.org/HowTo">
              <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform -translate-x-1/2"></div>

              {[
                {
                  title: "Requirement Analysis",
                  description: "We begin with a thorough consultation to understand your specific needs, challenges, and objectives.",
                  icon: <Briefcase className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                },
                {
                  title: "Solution Design",
                  description: "Our experts design tailored solutions that address your unique requirements while optimizing for efficiency.",
                  icon: <Tool className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                },
                {
                  title: "Implementation Planning",
                  description: "We develop detailed project plans with clear milestones, timelines, and resource allocation.",
                  icon: <Settings className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                },
                {
                  title: "Execution & Monitoring",
                  description: "Our skilled team implements the solution with precision while continuously monitoring progress and quality.",
                  icon: <Wrench className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                },
                {
                  title: "Testing & Quality Assurance",
                  description: "Rigorous testing and quality checks ensure all deliverables meet our exacting standards and your expectations.",
                  icon: <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                },
                {
                  title: "Handover & Support",
                  description: "We provide comprehensive documentation, training, and ongoing support to ensure long-term success.",
                  icon: <Cpu className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                }
              ].map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative mb-8 sm:mb-12 ${index % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12 md:text-left'}`}
                >
                  <div className={`flex ${index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'} mb-3 sm:mb-4`}>
                    <div className="relative">
                      <div className="absolute inset-0 bg-teal-500/20 rounded-full blur-md animate-pulse"></div>
                      <div className="bg-teal-600 w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center relative z-10 shadow-lg">
                        {step.icon}
                      </div>
                    </div>
                  </div>
                  <div className={`bg-white p-4 sm:p-6 rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ${index % 2 === 0 ? 'md:mr-4 sm:md:mr-6' : 'md:ml-4 sm:md:ml-6'}`}>
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 sm:mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-sm sm:text-base">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Clients Section with schema */}
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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {clients.map((client, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl flex items-center justify-center h-48 hover:bg-gray-50 transition-colors overflow-hidden group relative border-2 border-gray-200"
                itemProp="knowsAbout"
                itemScope
                itemType="https://schema.org/Organization"
              >
                <a href={client.url} target="_blank" rel="noopener noreferrer" aria-label={`Visit ${client.name}`}>
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

      {/* Stats Section with schema */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 md:py-16 w-full max-w-[94%] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-8 sm:mb-12 md:mb-16"
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-4">By The Numbers</h2>
              <div className="w-20 sm:w-24 h-1 bg-teal-500 mx-auto"></div>
              <p className="text-gray-600 mt-4 sm:mt-6 max-w-3xl mx-auto text-sm sm:text-base">
                Measuring our impact through key metrics that demonstrate our commitment to excellence
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8" itemScope itemType="https://schema.org/ItemList">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg sm:rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 p-4 sm:p-6 md:p-8 text-center"
                  itemProp="itemListElement"
                  itemScope
                  itemType="https://schema.org/QuantitativeValue"
                >
                  <div className="flex justify-center mb-4 sm:mb-6">
                    <div className="p-3 sm:p-4 bg-teal-100 rounded-full">
                      <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-teal-600" />
                    </div>
                  </div>
                  <div className="text-3xl sm:text-4xl md:text-5xl font-bold text-teal-600 mb-1 sm:mb-2" itemProp="value">
                    {stat.number}+
                  </div>
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-1 sm:mb-2" itemProp="unitText">
                    {stat.label}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base" itemProp="description">
                    {stat.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Get In Touch Section */}
      <section 
        className="w-full bg-[#f5f9ff] py-16 px-4 lg:px-20 flex flex-col lg:flex-row justify-center items-center gap-10"
        itemScope
        itemType="https://schema.org/ContactPage"
      >
        {/* Image Box */}
        <div className="rounded-[15px] overflow-hidden w-full max-w-md">
          <img
            src="https://i.postimg.cc/x1CNYJqd/harbor-sunset-1359-1120-1.jpg"
            alt="Visakhatechsolutions services"
            className="w-full h-full object-cover rounded-[15px]"
            loading="lazy"
            itemProp="image"
          />
        </div>

        {/* Text Box */}
        <div className="bg-white rounded-[15px] p-6 md:p-10 w-full max-w-2xl shadow-md md:h-[440px] text-center lg:text-left">
          <h2
            className="text-[28px] md:text-4xl font-regular leading-snug"
            style={{ fontFamily: "'Archivo', sans-serif" }}
            itemProp="headline"
          >
            Are you <br />
            ready to drive the <br />
            future of{" "}
            <span className="text-teal-600 font-bold">sustainable <br className="block sm:hidden" /> electro-mechanical solutions</span>?
          </h2>

          <Link 
            to="/contact"
            className="mt-10 md:mt-32 bg-black text-white px-6 py-3 rounded-md hover:bg-gray-900 transition flex items-center gap-2 font-bold mx-auto lg:mx-0 max-w-fit"
            itemProp="url"
            aria-label="Contact Visakhatechsolutions"
          >
            Get in touch
            <span className="text-2xl font-bold">→</span>
          </Link>
        </div>
      </section>

      {/* Hidden FAQ Schema for SEO */}
      <div style={{ display: 'none' }}>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What industries does Visakhatechsolutions serve?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We specialize in naval, defense, shipbuilding, and industrial sectors, providing customized electro-mechanical solutions."
                }
              },
              {
                "@type": "Question",
                "name": "Are your services ISO certified?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, all our services follow ISO 9001:2015 certified processes for quality assurance."
                }
              }
            ]
          })}
        </script>
      </div>
    </div>
  );
}