import { Anchor, Ship, Factory, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const industries = [
  {
    icon: <Ship className="w-8 h-8 text-[#00D1D1]" />,
    title: "Maritime & Shipbuilding",
    description: "Specialized solutions for naval and commercial vessels",
    image: "https://i.postimg.cc/x1CNYJqd/harbor-sunset-1359-1120-1.jpg"
  },
  {
    icon: <Anchor className="w-8 h-8 text-[#00D1D1]" />,
    title: "Defense & Aerospace",
    description: "Mission-critical systems for national security",
    image: "https://i.postimg.cc/7Ykmh5XM/panoramic-shot-oil-rigs-sea-with-beautiful-sunset.jpg       "
  },
  {
    icon: <Factory className="w-8 h-8 text-[#00D1D1]" />,
    title: "Industrial Manufacturing",
    description: "Automation and electrical systems for factories",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/55/What_is_Shipyard.jpg"
  },
  {
    icon: <Factory className="w-8 h-8 text-[#00D1D1]" />,
    title: "Energy & Utilities",
    description: "Sustainable power solutions for the future",
    image: "https://i.postimg.cc/j5WdfC0L/Adobe-Express-file-4.png"
  }
];

const caseStudies = [
  {
    industry: "Maritime",
    title: "Electrical System Modernization for Naval Vessels",
    description: "Upgraded power distribution systems for improved reliability",
    link: "#"
  },
  {
    industry: "Defense",
    title: "Automated Control Systems for Radar Installations",
    description: "Enhanced monitoring and control capabilities",
    link: "#"
  }
];

export default function Industries() {
  const [ref, inView] = useInView({ triggerOnce: true });

  return (
    <div className="pt-16 md:pt-20 font-archivo">
      <Helmet>
        <title>Industries | Visakhatech Solutions - Sector-Specific Solutions</title>
        <meta name="description" content="Discover how Visakhatech Solutions serves specialized industries including maritime, defense, industrial manufacturing, and energy sectors." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Industries",
            "description": "Industry sectors we serve",
            "url": "https://i.postimg.cc/BvWbrW8J/construction-site-53876-14088.avif"
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[60vh] bg-gray-900">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-[url('https://i.postimg.cc/BvWbrW8J/construction-site-53876-14088.avif"
        />
        <div className="relative z-10 flex items-center justify-center h-full text-center px-4">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Industries <span className="text-[#00D1D1]">We Serve</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              Specialized solutions tailored to your sector's unique challenges
            </p>
          </motion.div>
        </div>
      </section>

      {/* Industries Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Focus Industries</h2>
            <div className="w-20 h-1 bg-[#00D1D1] mx-auto mb-6" />
            <p className="text-gray-600 max-w-3xl mx-auto">
              We deliver specialized expertise to address the unique requirements of each sector
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {industries.map((industry, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow group"
              >
                <div className="h-40 bg-gray-100 overflow-hidden relative">
                  <img 
                    src={industry.image} 
                    alt={industry.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <div className="mr-3">
                      {industry.icon}
                    </div>
                    <h3 className="text-xl font-semibold">{industry.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-4">{industry.description}</p>
                  <Link 
                    to={`/industries/${industry.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-flex items-center text-[#00D1D1] hover:underline text-sm"
                  >
                    Explore solutions <ChevronRight className="w-4 h-4 ml-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Case Studies */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Industry Case Studies</h2>
            <div className="w-20 h-1 bg-[#00D1D1] mx-auto mb-6" />
            <p className="text-gray-600 max-w-3xl mx-auto">
              Real-world examples of how we've solved complex challenges across industries
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {caseStudies.map((study, index) => (
              <motion.div
                key={index}
                initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                className="border rounded-xl p-6 hover:shadow-md transition-shadow"
              >
                <span className="inline-block bg-[#00D1D1]/10 text-[#00D1D1] text-xs px-3 py-1 rounded-full mb-3">
                  {study.industry}
                </span>
                <h3 className="text-xl font-semibold mb-2">{study.title}</h3>
                <p className="text-gray-600 mb-4">{study.description}</p>
                <Link 
                  to={study.link}
                  className="inline-flex items-center text-[#00D1D1] hover:underline"
                >
                  Read case study <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industry Expertise */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl p-8 md:p-12 shadow-lg max-w-5xl mx-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Sector-Specific Expertise</h2>
              <div className="w-20 h-1 bg-[#00D1D1] mx-auto mb-6" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="prose max-w-none"
            >
              <p className="text-gray-600 mb-6">
                Our deep industry knowledge allows us to understand the unique regulatory, operational, 
                and technical challenges of each sector we serve. We combine this specialized expertise 
                with our cross-industry experience to deliver innovative solutions.
              </p>
              
              <div className="grid md:grid-cols-2 gap-6 mt-8">
                <div className="border-l-4 border-[#00D1D1] pl-4">
                  <h3 className="text-lg font-semibold mb-2">Regulatory Compliance</h3>
                  <p className="text-gray-600">
                    We stay current with all industry-specific regulations to ensure full compliance.
                  </p>
                </div>
                <div className="border-l-4 border-[#00D1D1] pl-4">
                  <h3 className="text-lg font-semibold mb-2">Custom Solutions</h3>
                  <p className="text-gray-600">
                    Tailored approaches that address your sector's unique requirements.
                  </p>
                </div>
              </div>

              <div className="mt-8 text-center">
                <Link 
                  to="/contact"
                  className="inline-flex items-center bg-[#00D1D1] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#00b3b3] transition"
                >
                  Discuss Your Industry Needs
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}