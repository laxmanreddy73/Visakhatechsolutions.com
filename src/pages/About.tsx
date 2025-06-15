import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle, Target, Users, Phone, Calendar, 
  Briefcase, DollarSign, ArrowRight, AlignCenterVertical as Certificate,
  User, ChevronRight, Award, Trophy, Building, Wrench, 
  Cpu, Settings, Shield, Truck, Layers, Clock, Globe, 
  HardHat, Zap, ShieldCheck, Network
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { brandKeywords, serviceKeywords, locationKeywords } from '../data/keywords';

// Enhanced leadership team data
const leadershipTeam = [
  {
    name: 'Kusumuru Manideep',
    position: 'Managing Director',
    phone: '7702119852',
    expertise: 'Strategic Leadership & Business Development',
    years: '10+ years experience'
  },
  {
    name: 'Kalla Kannaya Naidu',
    position: 'In-Charge (Sites)',
    phone: '9676583193',
    expertise: 'On-site Operations & Project Execution',
    years: '10+ years experience'
  },
  {
    name: 'Pappala Chakradhar',
    position: 'Manager',
    phone: '9533266948',
    expertise: 'Client Relations & Team Coordination',
    years: '10+ years experience'
  },
  {
    name: 'Badiya Raju',
    position: 'Mechanical Engineer (In-Charge)',
    phone: '9032098607',
    expertise: 'Mechanical Systems & Fabrication',
    years: '15+ years experience'
  },
  {
    name: 'Uppuganti Suresh',
    position: 'Electrical Engineer (In-Charge)',
    phone: '7799100967',
    expertise: 'Electrical Systems & Automation',
    years: '25+ years experience'
  },
  {
    name: 'Muppana Narayana Rao',
    position: 'Accounts',
    phone: '8688011577',
    expertise: 'Financial Management & Compliance',
    years: '7+ years experience'
  },
  {
    name: 'Peela Vasu',
    position: 'Admin',
    phone: '9581820373',
    expertise: 'Administrative Operations',
    years: '5+ years experience'
  }
];

// Enhanced CLA steps with icons
const claSteps = [
  {
    title: 'Analysis',
    icon: Layers,
    steps: ['Briefing', 'Onsite Survey', 'Extensive Analysis', 'Customer Tailored Solution'],
    color: 'bg-blue-100 text-blue-600'
  },
  {
    title: 'Consulting',
    icon: Network,
    steps: ['Expert Guidance', 'Industry Best Practices', 'Strategic Planning', 'Risk Assessment'],
    color: 'bg-purple-100 text-purple-600'
  },
  {
    title: 'Project Management',
    icon: Clock,
    steps: ['Timeline Planning', 'Resource Allocation', 'Progress Monitoring', 'Quality Control'],
    color: 'bg-amber-100 text-amber-600'
  },
  {
    title: 'Implementation',
    icon: HardHat,
    steps: ['Systematic Execution', 'Quality Standards', 'Safety Protocols', 'Regular Updates'],
    color: 'bg-green-100 text-green-600'
  },
  {
    title: 'Support',
    icon: ShieldCheck,
    steps: ['24/7 Assistance', 'Maintenance Plans', 'Technical Support', 'Emergency Response'],
    color: 'bg-teal-100 text-teal-600'
  }
];

// Enhanced why choose us with icons
const whyChooseUs = [
  {
    title: 'Timely Execution',
    description: 'Versatile execution capability with strict adherence to timelines',
    icon: Clock,
    color: 'bg-blue-600'
  },
  {
    title: 'Expert Team',
    description: 'Qualified and experienced professionals dedicated to excellence',
    icon: Users,
    color: 'bg-purple-600'
  },
  {
    title: 'Quality Assured',
    description: 'Supreme quality products and services meeting international standards',
    icon: Shield,
    color: 'bg-amber-600'
  },
  {
    title: 'Quick Response',
    description: 'Priorities including economy, efficiency, and reliability',
    icon: Zap,
    color: 'bg-green-600'
  },
  {
    title: 'Business Approach',
    description: 'Focused approach ensuring customer satisfaction',
    icon: Briefcase,
    color: 'bg-teal-600'
  },
  {
    title: 'Wide Network',
    description: 'Extensive distribution network for better reach',
    icon: Globe,
    color: 'bg-indigo-600'
  }
];

// Enhanced clients data
const clients = [
  {
    name: 'DLRL Hyderabad',
    logo: 'https://i.postimg.cc/t4K1pLsK/Adobe-Express-file-5.png',
    sector: 'Defense Research'
  },
  {
    name: 'Hindustan Shipyard Ltd.',
    logo: 'https://i.postimg.cc/L8qyrppj/Adobe-Express-file.png',
    sector: 'Shipbuilding'
  },
  {
    name: 'Naval Dockyard (V)',
    logo: 'https://i.postimg.cc/NjxGL4x0/ministry-of-defence-naval-dockyard-naval-base-visakhapatnam-visakhapatnam-government-organisations-0.png',
    sector: 'Naval Infrastructure'
  },
  {
    name: 'NSRY Cochin',
    logo: 'https://i.postimg.cc/250VvP1X/Cochin-Shipyard-SVG-Logo-svg.png',
    sector: 'Ship Repair'
  },
  {
    name: 'Garden Reach Shipbuilders & Engineers',
    logo: 'https://i.postimg.cc/vB2ZKfMY/Adobe-Express-file-2.png',
    sector: 'Naval Construction'
  },
  {
    name: 'Larsen & Toubro',
    logo: 'https://i.postimg.cc/j5WdfC0L/Adobe-Express-file-4.png',
    sector: 'Engineering Conglomerate'
  },
  {
    name: 'Goa Shipyard Limited',
    logo: 'https://i.postimg.cc/T1HQh76z/Adobe-Express-file-1.png',
    sector: 'Defense Shipbuilding'
  },
  {
    name: 'Solas Marine Services',
    logo: 'https://solasmarine.com/wp-content/uploads/2020/09/Solas-New-Logo-with-Colour-Code-1.png',
    sector: 'Marine Services'
  }
];

// Enhanced stats with more details
const stats = [
  {
    icon: Trophy,
    number: 6,
    label: 'Happy Clients',
    description: 'Leading companies trust our expertise and innovative solutions',
    suffix: '+'
  },
  {
    icon: Award,
    number: 1,
    label: 'Branch Office',
    description: 'Strategic location serving our growing client base',
    suffix: ''
  },
  {
    icon: Briefcase,
    number: 6,
    label: 'Major Projects',
    description: 'Successfully delivered transformative solutions',
    suffix: '+'
  },
  {
    icon: Users,
    number: 120,
    label: 'Manpower Count',
    description: 'Comprising top engineers driving innovation and excellence',
    suffix: '+'
  },
  {
    icon: Building,
    number: 4,
    label: 'Years Experience',
    description: 'Delivering quality since our inception',
    suffix: '+'
  },
  {
    icon: CheckCircle,
    number: 100,
    label: 'Projects Completed',
    description: 'With 100% client satisfaction',
    suffix: '%'
  }
];


const VideoPlayer = () => {
  const imageSrc = "https://i.postimg.cc/QtdxJtbb/pexels-matreding-12069481.jpg";

  return (
    <div className="absolute inset-0 w-full h-full flex items-start justify-center overflow-hidden pt-12 bg-custom-bg">
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
    <section 
      className="relative bg-custom-bg font-archivo bg-custom-bg" 
      style={{ height: '95vh' }}
    >
      <VideoPlayer />
      <div className="absolute inset-0 flex items-start justify-start z-30 pointer-events-none pt-32 px-8 sm:px-12 md:px-20 md:-mt-32">
        <div className="max-w-4xl text-left">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight -mt-24 md:mt-6"
          >
            Our
            <br />
            <span className="text-[#00D1D1] drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">Journey</span>
            <br />
            & Values
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-white text-lg md:text-xl mt-6 max-w-lg"
          >
            An ISO 9001:2015 Certified Company delivering excellence in electro-mechanical solutions
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-10 pointer-events-auto"
          >
            <Link 
              to="/contact" 
              className="bg-white text-black border-[6px] border-white text-sm sm:text-base md:text-lg font-semibold px-2 py-0.5 rounded-[8px] hover:bg-gray-200 transition"
            >
              Meet Our Team →
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};




const StatCard = ({
  icon: Icon,
  number,
  label,
  description,
  delay,
  suffix = ''
}: {
  icon: React.ElementType;
  number: number;
  label: string;
  description: string;
  delay: number;
  suffix?: string;
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
              {count}{suffix}
            </motion.div>
            <div className="text-xl font-semibold text-gray-800 mb-3">{label}</div>
            <div className="text-sm text-gray-600 text-center max-w-[200px]">{description}</div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const TimelineItem = ({ title, description, year, icon: Icon, color, index }: {
  title: string;
  description: string;
  year: string;
  icon: React.ElementType;
  color: string;
  index: number;
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.5,
    rootMargin: '-50px 0px',
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className={`relative pl-8 sm:pl-16 pb-8 border-l-2 ${color} border-opacity-30`}
    >
      <div className={`absolute -left-4 sm:-left-2 w-8 h-8 rounded-full flex items-center justify-center ${color} border-4 border-white`}>
        <Icon className="w-4 h-4 text-white" />
      </div>
      <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800">{title}</h3>
          <span className="text-sm font-medium px-2 py-1 rounded-full bg-gray-100 text-gray-600">{year}</span>
        </div>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
};

const DynamicMeta = () => {
  const [trend, setTrend] = useState('');
  
  useEffect(() => {
    const navalTrends = [
      "Naval Electrification",
      "Shipyard Automation",
      "Defense Contracting",
      "Electro-Mechanical Solutions"
    ];
    setTrend(navalTrends[Math.floor(Math.random() * navalTrends.length)]);
  }, []);

  return (
    <Helmet>
      <title>{`About Visakha Tech Solutions ${trend ? `| ${trend} Experts` : ''}`}</title>
      <meta 
        name="description" 
        content={`${trend || 'Electro-mechanical'} specialists serving Indian defense sector. ISO 9001:2015 certified with 120+ skilled professionals.`} 
      />
    </Helmet>
  );
};

export default function AboutUs() {
  const [activeStep, setActiveStep] = useState(0);
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % claSteps.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full overflow-x-hidden">
      {/* SEO Meta Tags and Structured Data */}
      <DynamicMeta />
      <Helmet>
        <title>VISAKHA TECH SOLUTIONS | Leading Naval & Industrial Electrical Experts in Visakhapatnam</title>
        <meta name="description" content="Premier ISO 9001:2015 certified electrical & automation solutions provider in Visakhapatnam. Specialized in naval, defense, and industrial projects with 100+ successful implementations." />
        <title>Visakha Tech | Naval, Industrial & Defense Automation Experts</title>
        <meta name="description" content="Premier ISO 9001:2015 certified electrical & automation solutions provider in Visakhapatnam. Visakha Tech Specialized in naval, defense, and industrial projects with 100+ successful implementations." />
        <title> Visakhatechsolutions | Naval, Industrial & Defense Automation Experts</title>
        <meta name="description" content="Premier ISO 9001:2015 certified electrical & automation solutions provider in Visakhapatnam. Visakhatechsolutions Specialized in naval, defense, and industrial projects with 100+ successful implementations." />
        <title>About VisakhaTechSolutions | Electrical Automation companies in Visakhapatnam</title>
        <meta name="description" content="Premier ISO 9001:2015 certified electrical & automation solutions provider in Visakhapatnam. Specialized in naval, defense, and industrial projects with 100+ successful implementations." />
        <title>VISAKHA TECH SOLUTIONS | Best naval electrical contractors India</title>
        <meta name="description" content="Premier ISO 9001:2015 certified electrical & automation solutions provider in Visakhapatnam.VISAKHA TECH SOLUTIONS is Specialized in naval, defense, and industrial projects with 100+ successful implementations." />
        
<title>Visakha solutions | Naval, Industrial & Defense Automation Experts</title>
  <meta name="description" content=" Visakha Solutions - ISO 9001:2015 certified specialists in naval electrical systems, industrial automation, and turnkey electro-mechanical projects across India. Trusted partner for defense and shipyard industries." />

  <meta name="keywords" content="About Visakha Tech Solutions, Naval Automation Experts India, Industrial Electrical Contractors, Defense Sector Solutions, Shipyard Electrical Maintenance, Automation Companies Visakhapatnam" />

  <link rel="canonical" href="https://visakhatechsolutions.com/about" />

          <meta property="og:title" content="About Visakha Tech Solutions | Electrical, Automation & Naval Experts" />
  <meta property="og:description" content="Leading ISO Certified Naval, Defense and Industrial Automation Service Providers in India." />
  <meta property="og:url" content="https://visakhatechsolutions.com/about" />
  <meta property="og:image" content="https://visakhatechsolutions.com/og-image.jpg" />
  
        <meta name="keywords" content="Visakha Tech Solutions, About Visakha Tech, Electro-Mechanical Experts, Electrical Consultancy Vizag, Automation Solutions Visakhapatnam" />
        <meta name="keywords" content={`${[...brandKeywords, ...serviceKeywords, ...locationKeywords].join(', ')}`} />
        
        <link rel="canonical" href="https://visakhatechsolutions.com/about" />
        <link rel="next" href="https://visakhatechsolutions.com/services" />
        <link rel="preload" href="/fonts/archivo.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
  <link rel="preload" href="https://media-hosting.imagekit.io//ab121d0a3bac4996/6815-196282555.mp4" as="video" />
  <link rel="preload" href="https://i.postimg.cc/x1CNYJqd/harbor-sunset-1359-1120-1.jpg" as="image" />
         {/* Twitter Card */}
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="About Us - Visakha Tech Solutions" />
  <meta name="twitter:description" content="Specialized Turnkey Electrical, Automation and Maintenance Solutions for Naval and Industrial sectors." />
  <meta name="twitter:image" content="https://visakhatechsolutions.com/og-image.jpg" />
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

        
        {/* Local Business Schema */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": ["LocalBusiness", "DefenseContractor"],
              "name": "Visakha Tech Solutions",
              "image": "https://visakhatechsolutions.com/logo.png",
              "@id": "https://visakhatechsolutions.com",
              "url": "https://visakhatechsolutions.com",
              "telephone": "+917702119852",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "47-9-34, Surya Bagh",
                "addressLocality": "Visakhapatnam",
                "addressRegion": "Andhra Pradesh",
                "postalCode": "530020",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "17.7286",
                "longitude": "83.3017"
              },
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
              },
              "serviceArea": {
                "@type": "DefenseEstablishment",
                "name": "Eastern Naval Command"
              },
              "sameAs": [
                "https://www.linkedin.com/company/visakha-tech-solutions",
                "https://twitter.com/visakhatechsol"
              ]
            }
          `}
        </script>

        {/* FAQ Schema */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": [
                {
                  "@type": "Question",
                  "name": "What certifications does Visakha Tech Solutions hold?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We are proud to be ISO 9001:2015 certified, meeting international quality management standards for our electro-mechanical solutions."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do you serve defense sector clients?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, we have successfully completed projects for DLRL Hyderabad, Hindustan Shipyard Ltd., Naval Dockyard Visakhapatnam, and other defense establishments."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What's your project delivery timeline?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Our closed-loop approach ensures on-time delivery, with 100% of projects completed within agreed timelines as per our ISO-certified processes."
                  }
                }
              ]
            }
          `}
        </script>

        {/* 3D Model Schema */}
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "3DModel",
              "name": "Shipyard Electrification System",
              "description": "3D model of our electro-mechanical solution for naval applications",
              "encodingFormat": "model/gltf-binary",
              "thumbnailUrl": "https://visakhatechsolutions.com/models/shipyard-thumbnail.jpg",
              "pronunciation": {
                "@type": "PronounceableText",
                "text": "Visakha Tech Solutions",
                "phoneticText": "vi-sha-kha tek so-lu-shuns",
                "inLanguage": "en-IN"
              }
            }
          `}
        </script>

        {/* Preload important resources */}
        <link rel="preload" href="/fonts/archivo.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.drdo.gov.in" />
        <link rel="prefetch" href="https://www.drdo.gov.in/vendor-portal" />
      </Helmet>

      {/* Service Worker Registration */}
      {typeof window !== 'undefined' && 'serviceWorker' in navigator && (
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js').then(registration => {
                  console.log('ServiceWorker registration successful');
                }).catch(err => {
                  console.log('ServiceWorker registration failed: ', err);
                });
              });
            `
          }}
        />
      )}

      <VideoSection />

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            >
              Our Story
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: '100px' }}
              transition={{ duration: 0.8 }}
              className="h-1 bg-gradient-to-r from-blue-600 to-teal-600 mx-auto mb-8"
            ></motion.div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-lg text-gray-600 leading-relaxed"
            >
              Founded in 2023, Visakha Tech Solutions has rapidly emerged as a trusted name in electro-mechanical solutions. Our journey began with a vision to bridge the gap between industrial needs and technological innovation, and today we stand proud as an ISO 9001:2015 certified company serving prestigious clients across India.
            </motion.p>
          </div>

          <div className="relative max-w-3xl mx-auto">
            <div className="absolute left-1/2 -ml-1 h-full w-0.5 bg-gradient-to-b from-blue-200 to-teal-200"></div>
            
            {[
              {
                title: 'Company Founded',
                description: 'Established with a vision to deliver quality electro-mechanical solutions',
                year: '2023',
                icon: Building,
                color: 'bg-blue-500'
              },
              {
                title: 'First Major Project',
                description: 'Successfully completed electrification works onboard VC11199',
                year: '2023',
                icon: HardHat,
                color: 'bg-purple-500'
              },
              {
                title: 'ISO Certification',
                description: 'Achieved ISO 9001:2015 certification for quality management',
                year: '2024',
                icon: ShieldCheck,
                color: 'bg-teal-500'
              },
              {
                title: 'Expansion',
                description: 'Expanded operations with new branch office and increased manpower',
                year: '2024',
                icon: Globe,
                color: 'bg-green-500'
              },
              {
                title: 'Current Operations',
                description: 'Serving 6+ major clients with 120+ skilled professionals',
                year: '2025',
                icon: Users,
                color: 'bg-amber-500'
              }
            ].map((item, index) => (
              <TimelineItem key={index} index={index} {...item} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 mb-20">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                To be a Company Committed to "ON TIME and ON BUDGET" delivery guaranteed performance 
                and offering end to end solutions to our customers.
              </p>
              <ul className="space-y-4">
                {['Exceed client expectations', 'Maintain highest quality standards', 'Foster employee growth', 'Drive sustainable innovation'].map((item, index) => (
                  <li key={index} className="flex items-center text-gray-700 group">
                    <CheckCircle className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="group-hover:text-blue-600 transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mr-4">
                  <Globe className="w-6 h-6 text-teal-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                To be recognized as a leading contractor company in India, through our service 
                and customer satisfaction.
              </p>
              <ul className="space-y-4">
                {['Build strong relationships', 'Deliver projects ahead of schedule', 'Maintain zero harm record', 'Expand to international markets'].map((item, index) => (
                  <li key={index} className="flex items-center text-gray-700 group">
                    <CheckCircle className="w-5 h-5 text-teal-500 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform" />
                    <span className="group-hover:text-teal-600 transition-colors">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <div className="max-w-4xl mx-auto">
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-2xl font-bold text-center text-gray-900 mb-12"
            >
              Our Core Values
            </motion.h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: 'Integrity',
                  description: 'We uphold the highest standards of honesty and ethical conduct',
                  icon: Shield,
                  color: 'bg-blue-100 text-blue-600'
                },
                {
                  title: 'Excellence',
                  description: 'We strive for superior quality in everything we do',
                  icon: Award,
                  color: 'bg-purple-100 text-purple-600'
                },
                {
                  title: 'Innovation',
                  description: 'We embrace creative solutions to complex challenges',
                  icon: Cpu,
                  color: 'bg-amber-100 text-amber-600'
                },
                {
                  title: 'Teamwork',
                  description: 'We collaborate to achieve shared success',
                  icon: Users,
                  color: 'bg-teal-100 text-teal-600'
                }
              ].map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100"
                >
                  <div className={`w-12 h-12 ${value.color} rounded-lg flex items-center justify-center mb-4`}>
                    <value.icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">{value.title}</h4>
                  <p className="text-gray-600">{value.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900">Our Closed Loop Approach</h2>
            <div className="w-20 h-1 bg-teal-600 mx-auto mt-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto mt-6">
              Our proven methodology ensures seamless project execution from conception to completion
            </p>
          </motion.div>

          <div className="relative">
            <div className="hidden lg:flex justify-center mb-12">
              <div className="relative w-full max-w-4xl">
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2"></div>
                <div className="flex justify-between">
                  {claSteps.map((step, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveStep(index)}
                      className={`relative z-10 flex flex-col items-center transition-all duration-300 ${activeStep === index ? 'scale-110' : ''}`}
                    >
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center ${step.color} border-4 border-white shadow-lg`}>
                        <step.icon className="w-6 h-6" />
                      </div>
                      <span className={`mt-3 font-medium ${activeStep === index ? 'text-gray-900' : 'text-gray-600'}`}>
                        {step.title}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="lg:hidden mb-8">
              <Swiper
                modules={[Pagination]}
                spaceBetween={20}
                slidesPerView={3}
                centeredSlides={true}
                pagination={{
                  clickable: true,
                }}
                onSlideChange={(swiper) => setActiveStep(swiper.activeIndex)}
              >
                {claSteps.map((step, index) => (
                  <SwiperSlide key={index}>
                    <div className="flex flex-col items-center py-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${step.color} border-4 border-white shadow-lg`}>
                        <step.icon className="w-5 h-5" />
                      </div>
                      <span className="mt-2 text-sm font-medium text-gray-700">
                        {step.title}
                      </span>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>

            <div className="bg-white rounded-xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500 border border-gray-100">
              <AnimatePresence mode="wait">
                <motion.div
  key={activeStep}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.5 }}
>
  <div className="flex items-center mb-6">
    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${claSteps[activeStep].color} mr-4`}>
      {(() => {
        const IconComponent = claSteps[activeStep].icon;
        return <IconComponent className="w-6 h-6" />;
      })()}
    </div>
    <h3 className="text-2xl font-bold text-gray-900">{claSteps[activeStep].title}</h3>
  </div>
  <div className="grid sm:grid-cols-2 gap-6">
    {claSteps[activeStep].steps.map((step, index) => (
      <div key={index} className="flex items-start">
        <div className="flex-shrink-0 mt-1">
          <div className={`w-5 h-5 rounded-full ${claSteps[activeStep].color} flex items-center justify-center`}>
            <ArrowRight className="w-3 h-3 text-white" />
          </div>
        </div>
        <p className="ml-3 text-gray-700">{step}</p>
      </div>
    ))}
  </div>
</motion.div>


</AnimatePresence>
</div>
</div>
</div>
</section>

  <section className="py-20 bg-gradient-to-b from-white to-gray-50">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl font-bold text-gray-900">Meet Our Leadership Team</h2>
        <div className="w-20 h-1 bg-teal-600 mx-auto mt-4"></div>
        <p className="text-gray-600 max-w-2xl mx-auto mt-6">
          Our experienced leaders drive innovation and excellence across all operations
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {leadershipTeam.map((member, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
          >
            <div className="relative h-48 bg-gray-100 overflow-hidden">
              <img 
                src="https://i.postimg.cc/Dw0bD4gK/poster-living-room-with-couch-chair-with-mountain-background-1239757-746.jpg" 
                alt={member.name}
                className="w-full h-full object-cover"
                loading="lazy"
                width={400}
                height={300}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-xl font-bold text-white">{member.name}</h3>
                <p className="text-blue-200">{member.position}</p>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                  <User className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Experience</p>
                  <p className="font-medium">{member.years}</p>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-500">Expertise</p>
                <p className="font-medium">{member.expertise}</p>
              </div>
              <div className="flex items-center text-blue-600 hover:text-blue-800 transition-colors">
                <Phone className="w-4 h-4 mr-2" />
                <a href={`tel:+91${member.phone}`} className="text-sm font-medium">{member.phone}</a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>

  <section className="py-20 bg-white">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl font-bold text-gray-900">Why Choose Visakha Tech Solutions?</h2>
        <div className="w-20 h-1 bg-teal-600 mx-auto mt-4"></div>
        <p className="text-gray-600 max-w-2xl mx-auto mt-6">
          We combine technical expertise with customer-centric approach to deliver exceptional results
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {whyChooseUs.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
          >
            <div className={`h-2 ${item.color}`}></div>
            <div className="p-6">
              <div className={`w-12 h-12 ${item.color} rounded-lg flex items-center justify-center mb-4 text-white`}>
                <item.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
              <p className="text-gray-600">{item.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>

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

      <div className="hidden lg:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {stats.map((stat, index) => (
          <StatCard
            key={index}
            icon={stat.icon}
            number={stat.number}
            label={stat.label}
            description={stat.description}
            delay={index * 0.2}
            suffix={stat.suffix}
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
                suffix={stat.suffix}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  </section>

  <section className="py-20 sm:py-28 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden border-t border-gray-200">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight tracking-tight">
          Trusted By <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-teal-500">Industry Leaders</span>
        </h2>
        <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto">
          We are proud to partner with prestigious organizations across various sectors
        </p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {clients.map((client, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            viewport={{ once: true }}
            className="flex justify-center"
          >
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100 w-full max-w-[220px] h-32 flex items-center justify-center relative group overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>
              <img 
                src={client.logo} 
                alt={client.name} 
                className="h-16 sm:h-20 object-contain opacity-90 group-hover:opacity-100 transition duration-300 z-10"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `<span class="text-gray-700 font-medium text-center">${client.name}</span>`;
                  }
                }}
              />
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-white bg-opacity-90 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                <p className="text-xs font-medium text-gray-700 truncate px-2">{client.sector}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        viewport={{ once: true }}
      >
        <Link 
          to="/clients"
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 transition-all duration-300 group"
          aria-label="View all our clients"
        >
          View All Clients
          <svg 
            className="ml-3 -mr-1 w-5 h-5 group-hover:translate-x-1 transition-transform" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </motion.div>
    </div>
  </section>

  <section className="w-full bg-[#f5f9ff] py-16 px-4 lg:px-20 flex flex-col lg:flex-row justify-center items-center gap-10">
    <div className="rounded-[15px] overflow-hidden w-full max-w-md">
      <img
        src="https://i.postimg.cc/x1CNYJqd/harbor-sunset-1359-1120-1.jpg"
        alt="Electro-Mechanical Solutions"
        className="w-full h-full object-cover rounded-[15px]"
        loading="lazy"
        width={600}
        height={400}
      />
    </div>

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