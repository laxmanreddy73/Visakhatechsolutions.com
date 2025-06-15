import React from 'react';
import { useScroll, useTransform, useCallback, motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import {
  Building2, Target, Users, ChevronRight, ChevronLeft, Award,
  Trophy, Briefcase, Wrench, Cpu, PenTool as Tool,
  Settings, Shield, Truck, Play
} from 'lucide-react';
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

const particlesInit = async (engine: Engine) => {
  await loadSlim(engine);
};

const particlesLoaded = async (container?: any) => {
  console.log("Particles loaded:", container);
};

// Data for alliances, services, work, and stats
const alliances = [
  {
    name: 'DRDL Hyderabad',
    image: 'https://i.postimg.cc/Fsh3WJ0Y/dlrl-internet-content-html-9b982ca707fcf3d2-1.jpg',
  },
  {
    name: 'Hindustan Shipyard Ltd.',
    image: 'https://i.postimg.cc/zG8NRqZZ/visakha-shipyard-1.jpg',
  },
  {
    name: 'Naval Dockyard (V)',
    image: 'https://i.postimg.cc/JhXSTgWc/Naval-dockyard-Entrance-1.jpg',
  },
  {
    name: 'NSRY Cochin',
    image: 'https://i.postimg.cc/vmWb1DDs/7b58a64c022b91acc20a6970102fd3f7-1.jpg',
  },
  {
  name: 'Garden Reach Shipbuilders & Engineers',
    image: 'https://i.postimg.cc/Xvn6GBw7/grse.jpg',
  },
  {
    name: 'Larsen & Toubro',
    image: 'https://i.postimg.cc/FzvZ9W8v/Screenshot-2025-04-29-102031.jpg',
  },
  {
    name: 'Goa Shipyard Limited',
    image: 'https://i.postimg.cc/gk8xycxg/Container-Cargo-ship-with-working-crane-in-shipyard-770x433.webp',
  },
  {
    name: 'Solas Marine Services',
    image: 'https://solasmarine.com/wp-content/uploads/2020/12/Solas-About-us-Banner-Image-e1603711087343.jpg',
  },
];

const services = [
  {
    icon: Wrench,
    title: 'Electrical Consultancy',
    description: 'Expert guidance for efficient and safe electrical systems, including layout design, load analysis, and compliance.',
    features: [
      'Load analysis and system design',
      'Compliance with standards',
      'Custom solutions for projects',
      'Energy cost optimization',
    ],
  },
  {
    icon: Tool,
    title: 'Turnkey Projects',
    description: 'End-to-end solutions for electrical, fabrication, and welding projects, ensuring quality and on-time delivery.',
    features: [
      'Complete project management',
      'High-quality fabrication',
      'Electrical system integration',
      'Timely delivery with cost control',
    ],
  },
  {
    icon: Settings,
    title: 'Maintenance',
    description: 'Reliable AMC services with 24/7 support to ensure system longevity and minimal downtime.',
    features: [
      'Comprehensive AMC',
      '24/7 breakdown support',
      'Preventive maintenance',
      'Certified technicians',
    ],
  },
  {
    icon: Truck,
    title: 'Supply Chain',
    description: 'Supply of premium electrical equipment with timely delivery and adherence to industry standards.',
    features: [
      'Quality electrical equipment',
      'Trusted manufacturers',
      'Wide product range',
      'Custom bulk solutions',
    ],
  },
  {
    icon: Shield,
    title: 'Quality Assurance',
    description: 'ISO-certified processes ensuring reliable, safe, and top-quality products and services.',
    features: [
      'ISO 9001:2015 certified',
      'Rigorous quality checks',
      'Safety compliance',
      'Dedicated QA team',
    ],
  },
  {
    icon: Cpu,
    title: 'Automation',
    description: 'Advanced automation solutions for improved efficiency, seamless operations, and cost reduction.',
    features: [
      'Custom system design',
      'Integration with infrastructure',
      'Tech upgrades',
      'Enhanced monitoring',
    ],
  },
];

const work = [
  {
    name: '',
    image: 'https://i.postimg.cc/5tttzHQZ/Whats-App-Image-2025-03-09-at-11-00-38-AM.jpg',
  },
  {
    name: '',
    image: 'https://i.postimg.cc/52VfnVyz/Whats-App-Image-2025-04-22-at-3-30-30-PM-1.jpg',
  },
  {
    name: '',
    image: 'https://i.postimg.cc/sXzqhq70/Whats-App-Image-2025-01-10-at-12-07-21-PM.jpg',
  },
  {
    name: '',
    image: 'https://i.postimg.cc/pdrgLFNc/Whats-App-Image-2025-01-10-at-12-08-04-PM.jpg',
  },
  {
    name: '',
    image: 'https://i.postimg.cc/1X8t0tNv/Whats-App-Image-2025-01-10-at-12-07-19-PM.jpg',
  },
  {
    name: '',
    image: 'https://i.postimg.cc/LX6tPwjK/Whats-App-Image-2025-04-22-at-3-30-30-PM.jpg',
  },
  {
    name: '',
    image: 'https://i.postimg.cc/MHPTnyMX/Whats-App-Image-2025-01-10-at-12-08-02-PM.jpg',
  },
  {
    name: '',
    image: 'https://i.postimg.cc/L6hgcb8c/Whats-App-Image-2025-03-09-at-11-00-39-AM-1.jpg',
  },
  {
    name: '',
    image: 'https://i.postimg.cc/0QJHXfJD/portrait-man-working-as-engineer-23-2151229981.jpg',
  },
  {
    name: '',
    image: 'https://i.postimg.cc/j2TXc8yt/Whats-App-Image-2025-03-11-at-2-30-21-AM.jpg',
  },
];

const civilwork = [
  {
    name: '',
    image: 'https://i.ibb.co/99Ycmgxf/Whats-App-Image-2025-04-23-at-9-20-14-AM-1.jpg',
  },
  {
    name: '',
    image: 'https://i.ibb.co/qqXMRYM/Whats-App-Image-2025-04-23-at-9-20-14-AM.jpg',
  },
  {
    name: '',
    image: 'https://i.ibb.co/BHBZpP4X/Whats-App-Image-2025-04-23-at-9-20-17-AM.jpg',
  },
  {
    name: '',
    image: 'https://i.ibb.co/DfpJyjF4/Whats-App-Image-2025-04-23-at-9-20-12-AM.jpg08-04-PM.jpg',
  },
  
];

const refwork = [
  {
    name: '',
    image: 'https://i.ibb.co/TBQMC3hp/Whats-App-Image-2025-04-23-at-9-23-10-AM.jpg',
  },
  {
    name: '',
    image: 'https://i.ibb.co/gphxcpj/Whats-App-Image-2025-04-22-at-3-30-30-PM.jpg',
  },
  {
    name: '',
    image: 'https://i.ibb.co/BK3hxzq4/Whats-App-Image-2025-04-23-at-9-34-28-AM.jpg',
  },
  {
    name: '',
    image: 'https://i.ibb.co/N6v4gdMK/Whats-App-Image-2025-04-23-at-9-34-28-AM-1.jpg',
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
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(false);

  const videoSources = [
    {
      src: "https://res.cloudinary.com/dcef7tarq/video/upload/v1747933313/b9j30va2plngjviw0na7.mp4",
      type: "video/webm"
    },
    {
      src: "https://res.cloudinary.com/dcef7tarq/video/upload/v1747933313/b9j30va2plngjviw0na7.mp4",
      type: "video/mp4"
    }
  ];

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleError = () => {
        console.error('Video loading error');
        setError(true);
      };

      video.addEventListener('error', handleError);
      return () => {
        video.removeEventListener('error', handleError);
      };
    }
  }, []);

  if (error) {
    return (
      <div className="-mt-20 absolute inset-0 w-full h-full flex items-center justify-center bg-gray-200">
        <p className="text-lg">Video could not be loaded</p>
      </div>
    );
  }

  return (
    <div className="-mt-20 absolute inset-0 w-full h-full flex items-start justify-center overflow-hidden pt-12 bg-custom-bg">
      <div className="relative w-full h-full max-w-[94%] max-h-[89%] md:max-h-[89%] rounded-[10px] overflow-hidden shadow-lg -mt-6 -mr-2 bg-custom-bg">
        <motion.video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          onLoadedData={() => setIsLoaded(true)}
          onError={() => setError(true)}
          loading="eager"
          aria-label="Visakhatechsolutions Homepage showcase video"
        >
          {videoSources.map((source) => (
            <source 
              key={source.type} 
              src={source.src} 
              type={source.type} 
            />
          ))}
          Your browser does not support the video tag.
        </motion.video>
        {!isLoaded && (
          <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
        )}
      </div>
    </div>
  );
};

const VideoSection = () => {
  return (
    <>
      <section 
        className="relative bg-custom-bg font-archivo mt-20" 
        style={{ height: '95vh', minHeight: '600px' }}
        itemScope
        itemType="https://schema.org/VideoObject"
      >
        <meta itemProp="name" content="Visakhatechsolutions Homepage Overview" />
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
              className="text-white text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mt-16 -md:mt-12 lg:mt-32"
              itemProp="headline"
            >
              Innovative
              <br />
              <span className="text-[#00D1D1] drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">Automation</span>
              <br />
              Solutions <span className="text-[#00D1D1]">Provider</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mt-6 sm:mt-8 md:mt-10 pointer-events-auto"
            >
              <Link 
                to="/contact"
                className="bg-white text-black border-[4px] sm:border-[6px] border-white text-sm sm:text-base md:text-lg font-semibold px-3 py-1 sm:px-4 sm:py-2 rounded-[8px] hover:bg-gray-200 transition max-w-fit">
                Get in touch →
              </Link>            </motion.div>
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
              Our Vision
            </h2>

            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-gray-900 leading-tight">
              Enabling  <span className="font-medium">Industries</span> with <span className="font-medium">Smart, efficient</span><br />
              <span className="text-teal-600 font-semibold">Electrical systems</span>         
   </h1>
          </div>
        </div>
      </section>
    </>
  );
};


// StatCard Component
const StatCard = ({
  icon: Icon,
  number,
  label,
  description,
  delay,
}: {
  icon: React.ElementType;
  number: number;
  label: string;
  description: string;
  delay: number;
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
            >
              {count}+
            </motion.div>
            <div className="text-xl font-semibold text-gray-800 mb-3">{label}</div>
            <div className="text-sm text-gray-600 text-center max-w-[200px]">{description}</div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

// Home Component
function Home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const videoRef = useRef<HTMLVideoElement>(null);
  const swiperRef = useRef<SwiperType>(null);
  // Mouse-following gradient effect
  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Parallax effect for video section
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -50]);

  return (
    <div>
      <Helmet>
        
  {/* General Meta Tags */}
  <title>Visakhatech Solutions | Top Electro-Mechanical & Automation Experts in Visakhapatnam</title>
  {/* Primary Meta Tags */}
        <title>Visakhatech Solutions | Electro-Mechanical & Automation Experts in Visakhapatnam</title>
        <title> Visakhatechsolutions | Naval, Industrial & Defense Automation Experts</title>
        <title> VisakhaTechSolutions | Electrical Automation companies in Visakhapatnam</title>
        <title>VISAKHA TECH SOLUTIONS | Best naval electrical contractors India</title>
        <title>Electrical, Automation & Defense Solutions | Visakha Tech Solutions</title>
  <meta name="description" content="ISO 9001:2015 Certified Experts in Naval Electrification, Industrial Automation, and Turnkey Electro-Mechanical Projects. Serving India’s Defense and Industrial Sectors with precision and quality. Explore our services today." />
  <meta name="keywords" content="Naval Electrification, Industrial Automation, Defense Projects, Electrical Consultancy, Shipyard Electrical Systems, Electro-Mechanical Contractors, Automation Solutions Visakhapatnam, Defense Engineering India" />
        <meta name="keywords" content={`${[...brandKeywords, ...serviceKeywords, ...locationKeywords].join(', ')}`} />
  <link rel="canonical" href="https://visakhatechsolutions.com/" />
        <meta name="title" content="Visakhatech Solutions | Electro-Mechanical & Automation Experts in Visakhapatnam" />
        <meta name="description" content="ISO 9001:2015 certified electro-mechanical solutions provider in Vizag. Specializing in electrical consultancy, automation, and turnkey projects for defense and maritime sectors." />
        <meta name="keywords" content="Visakhatech Solutions, electro-mechanical solutions, electrical consultancy Vizag, automation services Visakhapatnam, industrial maintenance, defense contractors, maritime solutions" />
        
        {/* Open Graph / Facebook Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.visakhatechsolutions.com/" />
        <meta property="og:title" content="Visakhatech Solutions | Electro-Mechanical & Automation Experts in Visakhapatnam" />
        <meta property="og:description" content="ISO 9001:2015 certified electro-mechanical solutions provider in Vizag. Specializing in electrical consultancy, automation, and turnkey projects." />
        <meta property="og:image" content="https://www.visakhatechsolutions.com/images/social-preview.jpg" />
        <meta property="og:title" content="Electrical & Automation Solutions | Visakha Tech Solutions" />
  <meta property="og:description" content="Leading provider of Electrical, Automation, and Defense Solutions for industrial and naval sectors. ISO Certified." />
  <meta property="og:url" content="https://visakhatechsolutions.com/" />
  <meta property="og:image" content="https://visakhatechsolutions.com/og-image.jpg" />
        
        
        {/* Twitter Meta Tags */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.visakhatechsolutions.com/" />
        <meta property="twitter:title" content="Visakhatech Solutions | Electro-Mechanical & Automation Experts in Visakhapatnam" />
        <meta property="twitter:description" content="ISO 9001:2015 certified electro-mechanical solutions provider in Vizag. Specializing in electrical consultancy, automation, and turnkey projects." />
        <meta property="twitter:image" content="https://www.visakhatechsolutions.com/images/social-preview.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Electrical, Automation & Defense Experts | Visakha Tech Solutions" />
  <meta name="twitter:description" content="Leading ISO Certified Company specializing in Naval and Industrial Engineering Solutions." />
  <meta name="twitter:image" content="https://visakhatechsolutions.com/og-image.jpg" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://www.visakhatechsolutions.com/" />
        
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE" />
        
        {/* Bing Webmaster Verification */}
        <meta name="msvalidate.01" content="YOUR_BING_WEBMASTER_VERIFICATION_CODE" />
        
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
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Visakhatech Solutions",
              "url": "https://www.visakhatechsolutions.com",
              "logo": "https://www.visakhatechsolutions.com/logo.png",
              "description": "ISO 9001:2015 certified electro-mechanical and automation solutions provider in Visakhapatnam",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Your Street Address",
                "addressLocality": "Visakhapatnam",
                "addressRegion": "Andhra Pradesh",
                "postalCode": "530001",
                "addressCountry": "IN"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+91-XXXXXXXXXX",
                "contactType": "customer service",
                "email": "contact@visakhatechsolutions.com",
                "areaServed": "IN"
              },
              "sameAs": [
                "https://www.facebook.com/visakhatechsolutions",
                "https://www.linkedin.com/company/visakhatechsolutions",
                "https://twitter.com/visakhatech"
              ]
            }
          `}
        </script>
        
        {/* Local Business Schema */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Visakhatech Solutions",
              "image": "https://www.visakhatechsolutions.com/logo.png",
              "description": "Electro-mechanical and automation solutions provider in Visakhapatnam",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Your Street Address",
                "addressLocality": "Visakhapatnam",
                "addressRegion": "AP",
                "postalCode": "530001",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "17.6868",
                "longitude": "83.2185"
              },
              "telephone": "+91-XXXXXXXXXX",
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": [
                  "Monday",
                  "Tuesday",
                  "Wednesday",
                  "Thursday",
                  "Friday",
                  "Saturday"
                ],
                "opens": "09:00",
                "closes": "18:00"
              }
            }
          `}
        </script>
  <meta name="description" content="Visakhatech Solutions: ISO 9001:2015 certified leaders in electro-mechanical, electrical consultancy, and automation solutions in Visakhapatnam. Trusted by industry giants for innovative, reliable, and cost-effective tech solutions. Contact us today!" />
  <meta name="keywords" content="Visakhatech Solutions, VisakhatechSolutions, Visakha Tech Solutions, Visakhapatnam Tech Solutions, VisakhapatnamTechSolutions, Vizag Tech Solutions, VizagTechSolutions, Electro-Mechanical Solutions Visakhapatnam, Electrical Consultancy Vizag, Automation Solutions Visakhapatnam, Turnkey Projects Vizag, Industrial Maintenance Visakhapatnam, Tech Solutions in Visakhapatnam, Tech Solutions in Vizag, Visakhatech Solutions Contact, Visakhatech Solutions Reviews, Visakhatech Solutions Projects, Visakhatech Solutions Services, Visakhatech Solutions Careers" />
  <meta name="author" content="Visakhatech Solutions" />
  <meta name="robots" content="index, follow" />
  <meta name="revisit-after" content="7 days" />
  <meta name="language" content="English" />
  <meta name="geo.region" content="IN-AP" />
  <meta name="geo.placename" content="Visakhapatnam" />

  {/* Open Graph Tags */}
  <meta property="og:title" content="Visakhatech Solutions | Top Electro-Mechanical & Automation Experts in Visakhapatnam" />
  <meta property="og:description" content="Visakhatech Solutions: ISO 9001:2015 certified leaders in electro-mechanical, electrical consultancy, and automation solutions in Visakhapatnam. Trusted by industry giants for innovative, reliable, and cost-effective tech solutions. Contact us today!" />
  <meta property="og:image" content="https://visakhatechsolutions.com/logo.png" />
  <meta property="og:url" content="https://visakhatechsolutions.com" />
  <meta property="og:type" content="website" />

  {/* Twitter Card Tags */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Visakhatech Solutions | Top Electro-Mechanical & Automation Experts in Visakhapatnam" />
  <meta name="twitter:description" content="Visakhatech Solutions: ISO 9001:2015 certified leaders in electro-mechanical, electrical consultancy, and automation solutions in Visakhapatnam. Trusted by industry giants for innovative, reliable, and cost-effective tech solutions. Contact us today!" />
  <meta name="twitter:image" content="https://visakhatechsolutions.com/logo.png" />

  {/* Canonical URL */}
  <link rel="canonical" href="https://visakhatechsolutions.com" />

  {/* Structured Data (Schema Markup) */}
  <script type="application/ld+json">
    {`
      {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Visakhatech Solutions",
        "url": "https://visakhatechsolutions.com",
        "logo": "https://visakhatechsolutions.com/logo.png",
        "description": "Visakhatech Solutions offers ISO 9001:2015 certified electro-mechanical, electrical consultancy, and automation solutions in Visakhapatnam (Vizag).",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Your Street Address",
          "addressLocality": "Visakhapatnam",
          "postalCode": "530001",
          "addressCountry": "India"
        },
        "telephone": "+91-1234567890",
        "sameAs": [
          "https://facebook.com/visakhatechsolutions",
          "https://linkedin.com/company/visakhatechsolutions",
          "https://twitter.com/visakhatechsolutions",
          "https://instagram.com/visakhatechsolutions"
        ],
        "service": [
          {
            "@type": "Service",
            "name": "Electrical Consultancy",
            "description": "Expert guidance for efficient and safe electrical systems, including layout design, load analysis, and compliance.",
            "serviceType": "Electrical Consultancy",
            "offers": {
              "@type": "Offer",
              "itemOffered": [
                "Load analysis and system design",
                "Compliance with standards",
                "Custom solutions for projects",
                "Energy cost optimization"
              ]
            }
          },
          {
            "@type": "Service",
            "name": "Turnkey Projects",
            "description": "End-to-end solutions for electrical, fabrication, and welding projects, ensuring quality and on-time delivery.",
            "serviceType": "Turnkey Projects",
            "offers": {
              "@type": "Offer",
              "itemOffered": [
                "Complete project management",
                "High-quality fabrication",
                "Electrical system integration",
                "Timely delivery with cost control"
              ]
            }
          },
          {
            "@type": "Service",
            "name": "Maintenance",
            "description": "Reliable AMC services with 24/7 support to ensure system longevity and minimal downtime.",
            "serviceType": "Maintenance",
            "offers": {
              "@type": "Offer",
              "itemOffered": [
                "Comprehensive AMC",
                "24/7 breakdown support",
                "Preventive maintenance",
                "Certified technicians"
              ]
            }
          },
          {
            "@type": "Service",
            "name": "Supply Chain",
            "description": "Supply of premium electrical equipment with timely delivery and adherence to industry standards.",
            "serviceType": "Supply Chain",
            "offers": {
              "@type": "Offer",
              "itemOffered": [
                "Quality electrical equipment",
                "Trusted manufacturers",
                "Wide product range",
                "Custom bulk solutions"
              ]
            }
          },
          {
            "@type": "Service",
            "name": "Quality Assurance",
            "description": "ISO-certified processes ensuring reliable, safe, and top-quality products and services.",
            "serviceType": "Quality Assurance",
            "offers": {
              "@type": "Offer",
              "itemOffered": [
                "ISO 9001:2015 certified",
                "Rigorous quality checks",
                "Safety compliance",
                "Dedicated QA team"
              ]
            }
          },
          {
            "@type": "Service",
            "name": "Automation",
            "description": "Advanced automation solutions for improved efficiency, seamless operations, and cost reduction.",
            "serviceType": "Automation",
            "offers": {
              "@type": "Offer",
              "itemOffered": [
                "Custom system design",
                "Integration with infrastructure",
                "Tech upgrades",
                "Enhanced monitoring"
              ]
            }
          }
        ],
        "hasPart": [
          {
            "@type": "WebPage",
            "name": "About Us",
            "url": "https://visakhatechsolutions.com/about",
            "description": "Learn more about Visakhatech Solutions, our mission, vision, and values."
          },
          {
            "@type": "WebPage",
            "name": "Projects",
            "url": "https://visakhatechsolutions.com/projects",
            "description": "Explore our portfolio of innovative and impactful projects."
          },
          {
            "@type": "WebPage",
            "name": "Contact Us",
            "url": "https://visakhatechsolutions.com/contact",
            "description": "Get in touch with Visakhatech Solutions for inquiries and collaborations."
          }
        ]
      }
    `}
  </script>

  {/* Local Business Schema */}
  <script type="application/ld+json">
    {`
      {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        "name": "Visakhatech Solutions",
        "image": "https://visakhatechsolutions.com/logo.png",
        "description": "Visakhatech Solutions offers ISO 9001:2015 certified electro-mechanical, electrical consultancy, and automation solutions in Visakhapatnam (Vizag).",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Your Street Address",
          "addressLocality": "Visakhapatnam",
          "postalCode": "530001",
          "addressCountry": "India"
        },
        "telephone": "+91-1234567890",
        "openingHours": "Mo-Fr 09:00-18:00",
        "priceRange": "$$$",
        "sameAs": [
          "https://facebook.com/visakhatechsolutions",
          "https://linkedin.com/company/visakhatechsolutions",
          "https://twitter.com/visakhatechsolutions",
          "https://instagram.com/visakhatechsolutions"
        ]
      }
    `}
  </script>

  {/* Multilingual Support */}
  <link rel="alternate" hrefLang="en" href="https://visakhatechsolutions.com" />
  <link rel="alternate" hrefLang="hi" href="https://visakhatechsolutions.com/hi" />
  <link rel="alternate" hrefLang="te" href="https://visakhatechsolutions.com/te" />

  {/* Favicon */}
  <link rel="icon" type="image/png" href="https://visakhatechsolutions.com/favicon.png" />
  <link rel="apple-touch-icon" href="https://visakhatechsolutions.com/apple-touch-icon.png" />

  {/* Preconnect and Preload Critical Resources */}
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
  <link rel="preload" as="image" href="https://visakhatechsolutions.com/hero.webp" />
</Helmet>
      {/* Hero Section */}
      {/* Video Section */}
      <VideoSection />


{/* Company Snapshot Section */}
<section className="w-full py-20 lg:px-10 bg-custom-bg font-archivo">
  <div className="container mx-auto px-4 -mt-2">
    <div className="relative w-full h-full max-w-[100%] max-h-[87%] md:max-h-[85%] bg-white rounded-[12px] shadow-lg mx-auto p-8 -mt-20">
      {/* Top Heading */}
      <div className="mb-8">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Company Snapshot
        </h2>
        <div className="w-24 h-1 bg-teal-600 mt-4"></div>
      </div>

      {/* Snapshot Grid */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Map Image */}
        <div className="flex items-center justify-center">
          <img
            src="https://i.postimg.cc/C5JrthF9/aerial-view-cargo-ship-cargo-container-harbor.jpg" // replace this with your actual file path
            alt="Global Presence Map"
            className="w-full max-w-[600px] rounded-[10px] border border-blue-200"
          />
        </div>

        {/* Snapshot Details */}
        <div className="flex flex-col justify-center">
          {[
            {
              icon: Award,
              title: 'Founder: Kusumuru Manideep',
              description: 'Leader committed to global quality standards and customer satisfaction.',
            },
            {
              icon: Building2,
              title: 'Founded: 2023',
              description: 'ISO 9001:2015 Certified Company with a focus on operational excellence.',
            },
            {
              icon: Target,
              title: 'Annual Turnover: ₹4-5 Cr',
              description: 'Achieving consistent growth through innovative solutions.',
            },
            {
              icon: Users,
              title: 'Business Type',
              description: 'Leading Electro-Mechanical Consultants, Engineers & Contractors.',
            },
          ].map((item, index) => (
            <div 
              key={index}
              className="flex items-start space-x-4 p-4 rounded-[10px] bg-blue-50 border border-blue-100 mb-4"
            >
              <div className="p-3 bg-teal-600 rounded-full">
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">
                  {item.title}
                </h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </div>
</section>

{/* Alliances Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Alliances</h2>
            <div className="w-20 h-1 bg-teal-600 mx-auto"></div>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {alliances.map((alliance, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-xl shadow-lg"
              >
                <div className="aspect-square">
                  <img
                    src={alliance.image}
                    alt={alliance.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 p-6">
                    <h3 className="text-xl font-semibold text-white">{alliance.name}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services We Cover Section */}
<section className="py-20 bg-white">
  <div className="container mx-auto px-4 sm:px-6">
    {/* Section Header */}
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="text-center mb-12 md:mb-16"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-teal-600 mb-3">Sectors We Cover</h2>
      <div className="w-16 h-1 bg-teal-500 mx-auto rounded-full"></div>
    </motion.div>

    {/* Main Container */}
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          {
            title: "Electrical Consultancy",
            description: "Expert guidance for efficient and safe electrical systems, including layout design, load analysis, and compliance.",
            features: [
              "Load analysis and system design",
              "Compliance with standards",
              "Sustainable energy integration"
            ],
            icon: (
              <svg xmlns="https://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            )
          },
          {
            title: "Turnkey Projects",
            description: "End-to-end solutions for electrical, fabrication, and welding projects, ensuring quality and on-time delivery.",
            features: [
              "Complete project management",
              "High-quality fabrication",
              "Commissioning and handover"
            ],
            icon: (
              <svg xmlns="https://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            )
          },
          {
            title: "Maintenance",
            description: "Reliable AMC services with 24/7 support to ensure system longevity and minimal downtime.",
            features: [
              "Comprehensive AMC",
              "24/7 breakdown support",
              "Certified technicians"
            ],
            icon: (
              <svg xmlns="https://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            )
          },
          {
            title: "Supply Chain",
            description: "Supply of premium electrical equipment with timely delivery and adherence to industry standards.",
            features: [
              "Quality electrical equipment",
              "Trusted manufacturers",
              "Wide product range"
              
            ],
            icon: (
              <svg xmlns="https://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            )
          },
          {
            title: "Quality Assurance",
            description: "ISO-certified processes ensuring reliable, safe, and top-quality products and services.",
            features: [
              "ISO 9001:2015 certified",
              "Rigorous quality checks",
              "Vendor quality audits"
            ],
            icon: (
              <svg xmlns="https://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )
          },
          {
            title: "Automation",
            description: "Advanced automation solutions for improved efficiency, seamless operations, and cost reduction.",
            features: [
              
              "Enhanced monitoring",
              "IoT-enabled solutions",
              "AI-driven optimization"
            ],
            icon: (
              <svg xmlns="https://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )
          }
        ].map((sector, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: sector.delay }}
            viewport={{ once: true, margin: "0px 0px -100px 0px" }}
            className="bg-gray-50/50 hover:bg-gray-100/50 p-5 rounded-lg border border-gray-200 transition-colors duration-300"
          >
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center mr-4 text-teal-600">
                {sector.icon}
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-800">{sector.title}</h3>
            </div>
            <p className="text-gray-600 leading-relaxed pl-14 mb-4">{sector.description}</p>
            
            <div className="pl-14">
              <h4 className="font-semibold text-gray-700 mb-2">Key Features:</h4>
              <ul className="space-y-2">
                {sector.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <svg className="h-5 w-5 text-teal-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </div>
</section>

     <section className="py-10 bg-[#f2f7ff] font-archivo">
  <div className="max-w-6xl mx-auto px-4">
    <motion.div 
      className="bg-white rounded-[20px] shadow-xl p-6"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* ABOUT US ROW */}
      <div className="flex flex-col lg:flex-row gap-6 mb-6">
        {/* Text Box */}
        <Link 
          href="/about" 
          className="lg:w-[55%] h-[260px] bg-white border border-gray-300 rounded-xl shadow-xl p-6 hover:shadow-2xl transition-all flex flex-col justify-between"
        >
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-[#288f90]">About Us</h2>
              <ChevronRight className="w-5 h-5 text-[#288f90]" />
            </div>
            <p className="text-gray-800 text-sm leading-snug line-clamp-5">
              Visakha Tech Solutions is redefining the future of electro-mechanical engineering by delivering intelligent, reliable, and sustainable solutions. With deep expertise in electrical consultancy, automation, and turnkey projects, we seamlessly integrate innovation with industry standards to power smart infrastructures. Our commitment to quality, safety, and performance ensures long-term value for clients across defense, manufacturing, and energy sectors—driving progress through precision and trust.
            </p>
          </div>
          <div className="mt-3 text-sm text-[#288f90] hover:underline cursor-pointer">Learn more →</div>
        </Link>

        {/* Image */}
        {/* Image */}
<div className="lg:w-[55%] h-[260px] rounded-xl overflow-hidden border border-gray-300 shadow-xl flex items-center justify-center">
  <img 
    src="https://i.postimg.cc/7Ykmh5XM/panoramic-shot-oil-rigs-sea-with-beautiful-sunset.jpg"
    alt="Solutions"
    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
  />
</div>

      </div>

      {/* SOLUTIONS ROW */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Text Box */}
        <Link 
          href="/solutions" 
          className="lg:w-[55%] h-[260px] bg-white border border-gray-300 rounded-xl shadow-xl p-6 hover:shadow-2xl transition-all flex flex-col justify-between"
        >
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-[#288f90]">Solutions</h2>
              <ChevronRight className="w-5 h-5 text-[#288f90]" />
            </div>
            <p className="text-gray-800 text-sm leading-snug line-clamp-5">
              At Visakha Tech Solutions, our solutions are designed to enable profitable clean energy transitions through AI-driven optimization and intelligent energy management. We're actively developing sector-specific automation and AI solutions that power smart, sustainable urban ecosystems. By bridging clean energy, automation, and intelligent systems, we are shaping a future where technology and sustainability drive industrial innovation and environmental progress together.
            </p>
          </div>
          <div className="mt-3 text-sm text-[#288f90] hover:underline cursor-pointer">Learn more →</div>
        </Link>

        {/* Image */}
<div className="lg:w-[55%] h-[260px] rounded-xl overflow-hidden border border-gray-300 shadow-xl flex items-center justify-center">
  <img 
    src="https://i.postimg.cc/dQmS8RhS/fireman-fire-fighting-equipment-fire-drill-seaman-with-firefighter-s-outfits-breathing-apparatus-160.avif"
    alt="Solutions"
    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
  />
</div>

      </div>
    </motion.div>
  </div>
</section>

      
    {/* Trusted Companies Marquee */}
<section className="py-12 sm:py-16 bg-white overflow-hidden relative border-t border-gray-200 group">
  <div className="max-w-7xl mx-auto px-4 mb-8">
    <motion.div 
      className="text-center"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <p className="text-sm font-medium text-gray-500 tracking-wider">
        TRUSTED BY SHIPBUILDING & DEFENSE LEADERS
      </p>
    </motion.div>
  </div>

  {/* Top Row - Indian IT Companies */}
  <div className="relative h-24 overflow-hidden">
    <motion.div
      className="absolute top-0 left-0 flex items-center space-x-16"
      animate={{ x: ['-100%', '0%'] }}
      transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
    >
      {[...Array(3)].map((_, i) => (
        <React.Fragment key={`top-${i}`}>
          {[
            { name: 'Larsen & Toubro (L&T)', domain: 'larsentoubro.com' },

{ name: 'Hindustan Aeronautics Limited (HAL)', domain: 'hal-india.co.in' },
{ name: 'Mazagon Dock Shipbuilders', domain: 'mazagondock.in' },
{ name: 'Garden Reach Shipbuilders & Engineers', domain: 'grse.in' },
{ name: 'Goa Shipyard Limited', domain: 'goashipyard.in' },
{ name: 'Bharat Dynamics Limited', domain: 'bdl-india.in' },
{ name: 'Cochin Shipyard Limited', domain: 'cochinshipyard.in' },
{ name: 'Defence Research and Development Organisation (DRDO)', domain: 'drdo.gov.in' },

{ name: 'ABG Shipyard Limited', domain: 'abgindia.com' },
{ name: 'Shoft Shipyard Pvt Ltd', domain: 'shoft.in' },          
{ name: 'Solas Marine Services Group', domain: 'solasmarine.com' },
          ].map((item, j) => (
            <div key={`top-${i}-${j}`} className="flex-shrink-0">
              <div className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                <img 
                  src={`https://logo.clearbit.com/${item.domain}?size=256`}
                  alt={item.name}
                  className="h-12 sm:h-14 object-contain opacity-100 hover:opacity-80 transition duration-300"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `<span class="text-gray-700 font-medium">${item.name}</span>`;
                  }}
                />
              </div>
            </div>
          ))}
        </React.Fragment>
      ))}
    </motion.div>
  </div>

  {/* Bottom Row - Global Tech Companies */}
  <div className="relative h-24 overflow-hidden mt-8">
    <motion.div
      className="absolute top-0 left-0 flex items-center space-x-16"
      animate={{ x: ['0%', '-100%'] }}
      transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
    >
      {[...Array(3)].map((_, i) => (
        <React.Fragment key={`bottom-${i}`}>
          {[
{ name: 'Mazagon Dock Shipbuilders', domain: 'mazagondock.in' },
{ name: 'Garden Reach Shipbuilders & Engineers', domain: 'grse.in' },
{ name: 'Goa Shipyard Limited', domain: 'goashipyard.in' },         
{ name: 'ABG Shipyard Limited', domain: 'abgindia.com' },
{ name: 'Bharati Defence and Infrastructure Limited', domain: 'bdil.co.in' },
{ name: 'Shoft Shipyard Pvt Ltd', domain: 'shoft.in' },
{ name: 'Bharat Heavy Electricals Limited (BHEL)', domain: 'bhel.com' },
{ name: 'Defence Research and Development Organisation (DRDO)', domain: 'drdo.gov.in' },
{ name: 'Solas Marine Services Group', domain: 'solasmarine.com' },
           
          ].map((item, j) => (
            <div key={`bottom-${i}-${j}`} className="flex-shrink-0">
              <div className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                <img 
                  src={`https://logo.clearbit.com/${item.domain}?size=256`}
                  alt={item.name}
                  className="h-12 sm:h-14 object-contain opacity-100 hover:opacity-80 transition duration-300"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.parentElement.innerHTML = `<span class="text-gray-700 font-medium">${item.name}</span>`;
                  }}
                />
              </div>
            </div>
          ))}
        </React.Fragment>
      ))}
    </motion.div>
  </div>
</section>

     

      {/* Work Section */}
      <section className="py-20 bg-custom-bg font-archivo">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Work</h2>
            <div className="w-20 h-1 bg-teal-600 mx-auto"></div>
          </motion.div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {work.map((work, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative overflow-hidden rounded-xl shadow-lg"
              >
                <div className="aspect-square">
                  <img
                    src={work.image}
                    alt={work.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                  <div className="absolute bottom-0 p-6">
                    <h3 className="text-xl font-semibold text-white">{work.name}</h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Civil Work Section */}
<section className="py-20 bg-custom-bg font-archivo">
  <div className="container mx-auto px-6">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center mb-16"
    >
      <h2 className="text-4xl font-bold text-gray-900 mb-4">Civil Work</h2>
      <div className="w-20 h-1 bg-teal-600 mx-auto"></div>
    </motion.div>
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {civilwork.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group relative overflow-hidden rounded-xl shadow-lg"
        >
          <div className="aspect-square">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-0 p-6">
              <h3 className="text-xl font-semibold text-white">{item.name}</h3>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* Ref Work Section */}
<section className="py-20 bg-custom-bg font-archivo">
  <div className="container mx-auto px-6">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center mb-16"
    >
      <h2 className="text-4xl font-bold text-gray-900 mb-4">Refurbishment Work</h2>
      <div className="w-20 h-1 bg-teal-600 mx-auto"></div>
    </motion.div>
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
      {refwork.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="group relative overflow-hidden rounded-xl shadow-lg"
        >
          <div className="aspect-square">
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="absolute bottom-0 p-6">
              <h3 className="text-xl font-semibold text-white">{item.name}</h3>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

     {/* Featured Projects Section */}
<section className="py-20 bg-custom-bg font-archivo">
  <div className="container mx-auto px-4">
    <div className="relative bg-white rounded-2xl shadow-lg border border-gray-100 px-6 sm:px-12 md:px-20 py-12 sm:py-16 md:py-20 w-full max-w-[94%] mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Featured Projects</h2>
        <div className="w-24 h-1 bg-teal-500 mx-auto"></div>
        <p className="text-gray-600 mt-6 max-w-2xl mx-auto">
          Explore our portfolio of innovative and impactful projects.
        </p>
      </div>

      {/* Project Cards */}
      <div className="grid md:grid-cols-2 gap-8 mt-10">
        {[
          {
            title: 'Electrification works onboard VC11199 at HSL',
            value: '',
            image: 'https://i.postimg.cc/s2p1xq5s/floating-dock.jpg',
            description: 'Comprehensive electrification and system upgrades for enhanced operational efficiency.',
            features: [
              'Complete electrical system overhaul',
              'Advanced power distribution',
              'Safety compliance upgrades'
            ]
          },
          {
            title: 'AFDS System Serviceability Checks',
            value: '',
            image: 'https://i.postimg.cc/vmz68DRG/filoating-dock-4032486-1920-700x300.jpg',
            description: 'Routine checks and maintenance to ensure the reliability of the AFDS system.',
            features: [
              'System diagnostics',
              'Preventive maintenance',
              'Performance optimization'
            ]
          },
        ].map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden"
          >
            {/* Project Image */}
            <div className="h-64 relative overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
            </div>

            {/* Project Content */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-800">{project.title}</h3>
                <span className="bg-teal-100 text-teal-800 text-sm font-medium px-3 py-1 rounded-full">
                  {project.value}
                </span>
              </div>
              
              <p className="text-gray-600 mb-4">{project.description}</p>
              
              <div className="mt-4">
                <h4 className="font-semibold text-gray-700 mb-2">Key Features:</h4>
                <ul className="space-y-2">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex items-start">
                      <svg className="h-5 w-5 text-teal-500 mr-2 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-6">
                <Link
                  to="/projects"
                  className="inline-flex items-center text-teal-600 hover:text-teal-800 font-medium"
                >
                  Learn more <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* View All Button */}
      <div className="text-center mt-12">
        <Link
          to="/projects"
          className="inline-flex items-center px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-lg transition-colors duration-300"
        >
          View All Projects <ChevronRight className="w-4 h-4 ml-2" />
        </Link>
      </div>
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
              />
            ))}
          </div>

          <div className="lg:hidden">
            <Swiper
              modules={[Autoplay, Pagination]}
              spaceBetween={30}
              slidesPerView={1}
              centeredSlides={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
              }}
            >
              {stats.map((stat, index) => (
                <SwiperSlide key={index}>
                  <StatCard
                    icon={stat.icon}
                    number={stat.number}
                    label={stat.label}
                    description={stat.description}
                    delay={0.2}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-20 text-center"
          >
            <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl">
              <p className="text-blue-800 font-medium max-w-2xl">
                Every number represents a milestone in our journey towards excellence and innovation in technology solutions.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Get In Touch */}
<section className="w-full bg-[#f5f9ff] py-16 px-4 lg:px-20 flex flex-col lg:flex-row justify-center items-center gap-10">
  {/* Image Box */}
  <div className="rounded-[15px] overflow-hidden w-full max-w-md">
    <img
      src="https://i.postimg.cc/x1CNYJqd/harbor-sunset-1359-1120-1.jpg"
      alt="Clean Energy AI"
      className="w-full h-full object-cover rounded-[15px]"
    />
  </div>

  {/* Text Box */}
  <div className="bg-white rounded-[15px] p-6 md:p-10 w-full max-w-2xl shadow-md md:h-[440px] text-center lg:text-left">
    <h2
      className="text-[28px] md:text-4xl font-regular leading-snug"
      style={{ fontFamily: "'Archivo', sans-serif" }}
    >
      Are you <br />
      ready to drive the <br />
      future of{" "}
      <span className="text-teal-600 font-bold">sustainable <br className="block sm:hidden" /> electro-mechanical solutions</span>?
    </h2>

    <Link 
      to="/contact"
      className="mt-10 md:mt-32 bg-black text-white px-6 py-3 rounded-md hover:bg-gray-900 transition flex items-center gap-2 font-bold mx-auto lg:mx-0 max-w-fit"
    >
      Get in touch
      <span className="text-2xl font-bold">→</span>
    </Link>
  </div>
</section>



  
    </div>
  );
}

export default Home;