import { ChevronRight, BookOpen, Shield, Cpu, Ship, Factory } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const caseStudies = [
  {
    title: "Naval Vessel Electrical System Modernization",
    description: "Complete overhaul of power distribution systems for improved reliability and efficiency",
    client: "Indian Navy",
    industry: "Defense & Maritime",
    duration: "8 Months",
    value: "₹3.2 Crore",
    image: "https://i.postimg.cc/bNgpFr83/INS-Saryu.jpg",
    icon: <Ship className="w-6 h-6 text-[#00D1D1]" />,
    challenges: [
      "Aging electrical infrastructure",
      "Need for minimal downtime",
      "Strict naval compliance requirements"
    ],
    solutions: [
      "Modular upgrade approach",
      "Custom-designed power distribution panels",
      "Integrated monitoring system"
    ],
    results: [
      "40% improvement in system reliability",
      "30% reduction in maintenance costs",
      "Zero operational downtime during upgrade"
    ]
  },
  {
    title: "Industrial Automation for Shipyard Manufacturing",
    description: "Implementation of automated control systems for improved production efficiency",
    client: "Hindustan Shipyard Ltd.",
    industry: "Industrial Manufacturing",
    duration: "6 Months",
    value: "₹2.8 Crore",
    image: "https://i.postimg.cc/zGQ0Fst0/8-benefits-of-automation-in-manufacturing-and-how-to-unlock-them-6703e400c8fe0.webp",
    icon: <Factory className="w-6 h-6 text-[#00D1D1]" />,
    challenges: [
      "Manual processes causing bottlenecks",
      "High defect rates",
      "Difficulty in production tracking"
    ],
    solutions: [
      "Custom PLC-based automation",
      "Real-time monitoring dashboard",
      "Automated quality control checks"
    ],
    results: [
      "25% increase in production output",
      "15% reduction in material waste",
      "50% faster defect detection"
    ]
  },
  {
    title: "Automated Fire Detection System for Naval Base",
    description: "Installation of intelligent fire detection and suppression systems",
    client: "Naval Dockyard Visakhapatnam",
    industry: "Defense Infrastructure",
    duration: "4 Months",
    value: "₹1.5 Crore",
    image: "https://img.freepik.com/premium-photo/deck-cargo-ship-crew-members-conduct-routine-checks-maintenance-safety-equipment_216520-17429.jpg",
    icon: <Shield className="w-6 h-6 text-[#00D1D1]" />,
    challenges: [
      "Large facility area coverage",
      "Harsh marine environment",
      "Integration with existing systems"
    ],
    solutions: [
      "Zoned detection system",
      "Corrosion-resistant components",
      "Centralized monitoring station"
    ],
    results: [
      "99.9% detection accuracy",
      "60% faster response time",
      "Seamless integration with base systems"
    ]
  },
  {
    title: "Energy Management System for Industrial Complex",
    description: "Smart energy monitoring and optimization system implementation",
    client: "Larsen & Toubro",
    industry: "Industrial Energy",
    duration: "5 Months",
    value: "₹2.1 Crore",
    image: "https://i.postimg.cc/L5MHY0Fs/britannica-insights-Phil-the-Fixer-renewable-energy.webp",
    icon: <Cpu className="w-6 h-6 text-[#00D1D1]" />,
    challenges: [
      "High energy costs",
      "Peak demand penalties",
      "Lack of consumption visibility"
    ],
    solutions: [
      "IoT-enabled sensors network",
      "AI-powered load forecasting",
      "Automated peak shaving"
    ],
    results: [
      "22% reduction in energy costs",
      "30% decrease in peak demand",
      "Real-time consumption analytics"
    ]
  }
];

const industriesServed = [
  { name: "Defense & Aerospace", count: 12 },
  { name: "Maritime & Shipbuilding", count: 18 },
  { name: "Industrial Manufacturing", count: 9 },
  { name: "Energy & Utilities", count: 7 }
];

export default function CaseStudies() {
  const [activeCaseStudy, setActiveCaseStudy] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true });

  const generateCaseStudySchema = (study) => ({
    "@context": "https://schema.org",
    "@type": "CaseStudy",
    "name": study.title,
    "description": study.description,
    "about": {
      "@type": "Organization",
      "name": study.client
    },
    "industry": study.industry,
    "temporalCoverage": study.duration,
    "location": "India",
    "result": study.results.join(", ")
  });

  return (
    <div className="pt-16 md:pt-20 font-archivo">
      <Helmet>
        <title>Case Studies | Visakhatech Solutions - Project Success Stories</title>
        <meta name="description" content="Explore our portfolio of successful projects across defense, maritime, and industrial sectors showcasing our technical expertise and innovative solutions." />
        {caseStudies.map((study, index) => (
          <script key={index} type="application/ld+json">
            {JSON.stringify(generateCaseStudySchema(study))}
          </script>
        ))}
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gray-900">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-[url('https://i.postimg.cc/9Fh9r9Zk/engineer-team.jpg')] bg-cover bg-center opacity-50"
        />
        <div className="relative z-10 flex items-center justify-center h-full text-center px-4">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Our <span className="text-[#00D1D1]">Success Stories</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              Real-world examples of how we solve complex engineering challenges
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Case Studies</h2>
            <div className="w-20 h-1 bg-[#00D1D1] mx-auto mb-6" />
            <p className="text-gray-600 max-w-3xl mx-auto">
              Explore our portfolio of successful projects across industries
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((study, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
                onClick={() => setActiveCaseStudy(index)}
              >
                <div className="h-48 bg-gray-100 overflow-hidden relative">
                  <img 
                    src={study.image} 
                    alt={study.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <div className="mr-3">
                      {study.icon}
                    </div>
                    <span className="text-sm font-medium text-[#00D1D1]">{study.industry}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{study.title}</h3>
                  <p className="text-gray-600 mb-4">{study.description}</p>
                  <div className="flex justify-between items-center text-sm text-gray-500">
                    <span>{study.client}</span>
                    <span>{study.duration}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Case Study View */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-gray-50 rounded-xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <motion.div 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  className="mb-8"
                >
                  <div className="flex items-center mb-4">
                    {caseStudies[activeCaseStudy].icon}
                    <span className="ml-3 text-sm font-medium text-[#00D1D1]">
                      {caseStudies[activeCaseStudy].industry}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4">
                    {caseStudies[activeCaseStudy].title}
                  </h2>
                  <p className="text-gray-600 mb-6">
                    {caseStudies[activeCaseStudy].description}
                  </p>
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <p className="text-sm text-gray-500">Client</p>
                      <p className="font-medium">{caseStudies[activeCaseStudy].client}</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <p className="text-sm text-gray-500">Duration</p>
                      <p className="font-medium">{caseStudies[activeCaseStudy].duration}</p>
                    </div>
                    <div className="bg-white p-3 rounded-lg shadow-sm">
                      <p className="text-sm text-gray-500">Project Value</p>
                      <p className="font-medium">{caseStudies[activeCaseStudy].value}</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="mb-8"
                >
                  <h3 className="text-xl font-semibold mb-4">Challenges</h3>
                  <ul className="space-y-3">
                    {caseStudies[activeCaseStudy].challenges.map((challenge, i) => (
                      <li key={i} className="flex items-start">
                        <div className="bg-[#00D1D1]/10 text-[#00D1D1] p-1 rounded-full mr-3">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                        </div>
                        <span>{challenge}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              <div>
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="mb-8"
                >
                  <h3 className="text-xl font-semibold mb-4">Our Solutions</h3>
                  <ul className="space-y-3">
                    {caseStudies[activeCaseStudy].solutions.map((solution, i) => (
                      <li key={i} className="flex items-start">
                        <div className="bg-[#00D1D1]/10 text-[#00D1D1] p-1 rounded-full mr-3">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <span>{solution}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mb-8"
                >
                  <h3 className="text-xl font-semibold mb-4">Results Achieved</h3>
                  <ul className="space-y-3">
                    {caseStudies[activeCaseStudy].results.map((result, i) => (
                      <li key={i} className="flex items-start">
                        <div className="bg-[#00D1D1]/10 text-[#00D1D1] p-1 rounded-full mr-3">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <span>{result}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <Link 
                    to="/contact"
                    className="inline-flex items-center bg-[#00D1D1] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#00b3b3] transition"
                  >
                    Start Your Project
                  </Link>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries Served */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Industries We Serve</h2>
            <div className="w-20 h-1 bg-[#00D1D1] mx-auto mb-6" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {industriesServed.map((industry, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow text-center"
              >
                <BookOpen className="w-8 h-8 text-[#00D1D1] mx-auto mb-3" />
                <h3 className="text-lg font-semibold mb-1">{industry.name}</h3>
                <p className="text-sm text-gray-500">{industry.count} case studies</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Client Testimonials</h2>
            <div className="w-20 h-1 bg-[#00D1D1] mx-auto mb-6" />
          </motion.div>

          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 5000 }}
            pagination={{ clickable: true }}
            breakpoints={{ 768: { slidesPerView: 2 } }}
            className="pb-12"
          >
            <SwiperSlide>
              <div className="bg-gray-50 p-8 rounded-xl h-full">
                <p className="text-gray-600 mb-6 italic">"The electrical system modernization exceeded our expectations. Visakhatech's team demonstrated exceptional technical expertise and project management skills throughout the engagement."</p>
                <div className="flex items-center">
                  <div className="bg-[#00D1D1] w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mr-4">RS</div>
                  <div>
                    <h4 className="font-semibold">Rear Admiral Sanjay Verma</h4>
                    <p className="text-sm text-gray-500">Indian Navy</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-gray-50 p-8 rounded-xl h-full">
                <p className="text-gray-600 mb-6 italic">"Their automation solutions transformed our production line. The results speak for themselves - higher output with better quality at lower operating costs."</p>
                <div className="flex items-center">
                  <div className="bg-[#00D1D1] w-12 h-12 rounded-full flex items-center justify-center text-white font-bold mr-4">PK</div>
                  <div>
                    <h4 className="font-semibold">Pradeep Kumar</h4>
                    <p className="text-sm text-gray-500">Hindustan Shipyard Ltd.</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>
    </div>
  );
}