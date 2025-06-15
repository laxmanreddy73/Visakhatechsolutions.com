import { BookOpen, FileText, Video, Globe, Download, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const resourceCategories = [
  {
    icon: BookOpen,
    title: "Technical Manuals",
    description: "Comprehensive guides for our products and solutions",
    count: "25+ manuals",
    color: "bg-blue-100 text-blue-600"
  },
  {
    icon: FileText,
    title: "Whitepapers",
    description: "In-depth technical analyses and industry insights",
    count: "15+ papers",
    color: "bg-green-100 text-green-600"
  },
  {
    icon: Video,
    title: "Video Tutorials",
    description: "Step-by-step instructional videos and webinars",
    count: "50+ videos",
    color: "bg-purple-100 text-purple-600"
  },
  {
    icon: Globe,
    title: "Industry Standards",
    description: "Compliance documents and regulatory guidelines",
    count: "10+ standards",
    color: "bg-orange-100 text-orange-600"
  }
];

const featuredResources = [
  {
    title: "Naval Electrical Systems Handbook",
    type: "PDF Guide",
    description: "Comprehensive reference for naval electrical system design and maintenance",
    downloadLink: "#",
    image: "https://i.postimg.cc/9Fh9r9Zk/engineer-team.jpg"
  },
  {
    title: "Automation in Shipbuilding",
    type: "Whitepaper",
    description: "Exploring the latest trends in shipyard automation technologies",
    downloadLink: "#",
    image: "https://i.postimg.cc/9Fh9r9Zk/engineer-team.jpg"
  }
];

const upcomingWebinars = [
  {
    title: "Sustainable Energy in Marine Applications",
    date: "June 15, 2023",
    speaker: "Dr. Sanjay Gupta",
    registrationLink: "#"
  },
  {
    title: "Advanced Automation for Naval Systems",
    date: "July 22, 2023",
    speaker: "Priya Sharma",
    registrationLink: "#"
  }
];

export default function Resources() {
  const [ref, inView] = useInView({ triggerOnce: true });

  return (
    <div className="pt-16 md:pt-20 font-archivo">
      <Helmet>
        <title>Resources | Visakhatechsolutions - Technical Documentation & Learning Materials</title>
        <meta name="description" content="Access technical manuals, whitepapers, video tutorials, and industry standards from Visakhatechsolutions. Download our latest resources for naval and industrial applications." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            "name": "Resources",
            "description": "Technical resources and educational materials from Visakhatechsolutions",
            "url": "https://visakhatechsolutions.com/resources"
          })}
        </script>
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
              Technical <span className="text-[#00D1D1]">Resources</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              Access our library of manuals, guides, and educational materials
            </p>
          </motion.div>
        </div>
      </section>

      {/* Resource Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Resource Categories</h2>
            <div className="w-20 h-1 bg-[#00D1D1] mx-auto mb-6" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {resourceCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className={`${category.color} w-12 h-12 rounded-full flex items-center justify-center mb-4`}>
                  <category.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <p className="text-sm font-medium text-gray-500">{category.count}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Resources */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Resources</h2>
            <div className="w-20 h-1 bg-[#00D1D1] mx-auto mb-6" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {featuredResources.map((resource, index) => (
              <motion.div
                key={index}
                initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                className="border rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="h-48 bg-gray-100 overflow-hidden">
                  <img 
                    src={resource.image} 
                    alt={resource.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-semibold">{resource.title}</h3>
                    <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                      {resource.type}
                    </span>
                  </div>
                  <p className="text-gray-600 mb-4">{resource.description}</p>
                  <Link 
                    to={resource.downloadLink}
                    className="inline-flex items-center text-[#00D1D1] hover:underline"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Resource
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Webinars */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Upcoming Webinars</h2>
            <div className="w-20 h-1 bg-[#00D1D1] mx-auto mb-6" />
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {upcomingWebinars.map((webinar, index) => (
              <motion.div
                key={index}
                initial={{ y: 30, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-6 rounded-xl shadow-sm mb-6 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{webinar.title}</h3>
                    <div className="flex items-center text-gray-500 text-sm mb-3">
                      <Calendar className="w-4 h-4 mr-2" />
                      {webinar.date}
                    </div>
                    <p className="text-gray-600">Speaker: {webinar.speaker}</p>
                  </div>
                  <Link 
                    to={webinar.registrationLink}
                    className="bg-[#00D1D1] text-white px-4 py-2 rounded-lg text-sm hover:bg-[#00b3b3] transition"
                  >
                    Register Now
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Resource Search */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-8 md:p-12 text-center">
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-2xl md:text-3xl font-bold text-gray-900 mb-4"
            >
              Can't Find What You Need?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-gray-600 mb-6 max-w-2xl mx-auto"
            >
              Search our complete resource library or request specific documentation
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="max-w-xl mx-auto"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search resources..."
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#00D1D1]"
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-[#00D1D1] text-white p-2 rounded-md">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
              <div className="mt-4">
                <Link 
                  to="/contact"
                  className="inline-flex items-center text-[#00D1D1] hover:underline"
                >
                  Request specific resources
                  <ChevronRight className="w-4 h-4 ml-1" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}