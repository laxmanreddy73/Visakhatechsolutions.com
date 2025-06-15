import { ShieldCheck, Award, FileText, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const certifications = [
  {
    title: "ISO 9001:2015 Certified",
    description: "Quality Management System certification for our processes and services",
    image: "https://i.postimg.cc/9Fh9r9Zk/engineer-team.jpg"
  },
  {
    title: "NABL Accreditation",
    description: "National Accreditation Board for Testing and Calibration Laboratories",
    image: "https://i.postimg.cc/9Fh9r9Zk/engineer-team.jpg"
  }
];

const complianceStandards = [
  {
    standard: "DNV GL Standards",
    scope: "Maritime and offshore classification standards",
    icon: <ShieldCheck className="w-6 h-6 text-[#00D1D1]" />
  },
  {
    standard: "IEC 60092",
    scope: "Electrical installations in ships",
    icon: <FileText className="w-6 h-6 text-[#00D1D1]" />
  }
];

export default function Certifications() {
  const [ref, inView] = useInView({ triggerOnce: true });

  return (
    <div className="pt-16 md:pt-20 font-archivo">
      <Helmet>
        <title>Certifications | Visakhatech Solutions - Quality Standards & Compliance</title>
        <meta name="description" content="Explore Visakhatech Solutions' certifications, accreditations, and compliance with international quality and safety standards." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Certifications",
            "description": "Our quality certifications and compliance standards",
            "url": "https://visakhatechsolutions.com/certifications"
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
              Our <span className="text-[#00D1D1]">Certifications</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              Committed to excellence through rigorous quality standards
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Certifications */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Accreditations & Certifications</h2>
            <div className="w-20 h-1 bg-[#00D1D1] mx-auto mb-6" />
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="h-48 bg-gray-100 overflow-hidden">
                  <img 
                    src={cert.image} 
                    alt={cert.title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center mb-3">
                    <Award className="w-6 h-6 text-[#00D1D1] mr-3" />
                    <h3 className="text-xl font-semibold">{cert.title}</h3>
                  </div>
                  <p className="text-gray-600">{cert.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance Standards */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Compliance Standards</h2>
            <div className="w-20 h-1 bg-[#00D1D1] mx-auto mb-6" />
            <p className="text-gray-600 max-w-3xl mx-auto">
              Our work adheres to the highest international standards and regulations
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {complianceStandards.map((standard, index) => (
              <motion.div
                key={index}
                initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                className="flex items-start mb-6 p-4 border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="mr-4 mt-1">
                  {standard.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{standard.standard}</h3>
                  <p className="text-gray-600">{standard.scope}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quality Commitment */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-xl p-8 md:p-12 shadow-lg max-w-5xl mx-auto">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-center mb-8"
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Quality Commitment</h2>
              <div className="w-20 h-1 bg-[#00D1D1] mx-auto mb-6" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="prose max-w-none"
            >
              <p className="text-gray-600 mb-6">
                At Visakhatech Solutions, quality isn't just a certification - it's embedded in our culture. 
                Our ISO 9001:2015 certified Quality Management System ensures consistent excellence across all operations.
              </p>
              
              <ul className="space-y-4 mb-6">
                <li className="flex items-start">
                  <ShieldCheck className="w-5 h-5 text-[#00D1D1] mr-3 mt-0.5" />
                  <span>Rigorous quality control at every project phase</span>
                </li>
                <li className="flex items-start">
                  <ShieldCheck className="w-5 h-5 text-[#00D1D1] mr-3 mt-0.5" />
                  <span>Continuous improvement through regular audits</span>
                </li>
                <li className="flex items-start">
                  <ShieldCheck className="w-5 h-5 text-[#00D1D1] mr-3 mt-0.5" />
                  <span>Employee training programs to maintain standards</span>
                </li>
              </ul>

              <Link 
                to="/quality"
                className="inline-flex items-center text-[#00D1D1] hover:underline"
              >
                Learn more about our quality processes
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}