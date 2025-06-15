import { Linkedin, Globe, Clock, ShieldCheck, GraduationCap, Briefcase, ChevronRight, Quote, Users, Award, Trophy, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const benefits = [
  {
    icon: ShieldCheck,
    title: "Competitive Benefits",
    description: "Comprehensive health insurance, retirement plans, and performance bonuses",
  },
  {
    icon: Globe,
    title: "Global Projects",
    description: "Work on cutting-edge projects with international impact",
  },
  {
    icon: GraduationCap,
    title: "Learning Budget",
    description: "Annual stipend for professional development and certifications",
  },
  {
    icon: Clock,
    title: "Flexible Hours",
    description: "Adaptable work schedules and remote work options",
  },
];

const openings = [
  {
    title: "Senior Electrical Engineer",
    department: "Engineering",
    type: "Full-time",
    location: "Visakhapatnam",
    experience: "8+ years",
    description: "Lead complex electrical system designs for naval and industrial projects...",
  },
  {
    title: "Project Manager",
    department: "Operations",
    type: "Full-time",
    location: "Hyderabad",
    experience: "10+ years",
    description: "Oversee turnkey projects from conception to completion...",
  },
];

const testimonials = [
  {
    name: "Arjun Reddy",
    role: "Lead Automation Engineer",
    quote: "The opportunities for professional growth here are unparalleled...",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    tenure: "4 years",
  },
  {
    name: "Priya Sharma",
    role: "Senior Project Manager",
    quote: "Working on defense projects that impact national security gives real purpose to our work...",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    tenure: "6 years",
  },
];

const processSteps = [
  {
    title: "Application Review",
    duration: "3-5 days",
    icon: <Briefcase className="w-6 h-6 text-white" />,
  },
  {
    title: "Technical Interview",
    duration: "1-2 weeks",
    icon: <Users className="w-6 h-6 text-white" />,
  },
  {
    title: "Practical Assessment",
    duration: "1 week",
    icon: <Award className="w-6 h-6 text-white" />,
  },
  {
    title: "Culture Fit Interview",
    duration: "3-5 days",
    icon: <Trophy className="w-6 h-6 text-white" />,
  },
  {
    title: "Onboarding",
    duration: "1-2 weeks",
    icon: <Calendar className="w-6 h-6 text-white" />,
  },
];

export default function Careers() {
  const [activeOpening, setActiveOpening] = useState(0);
  const [ref, inView] = useInView({ triggerOnce: true });

  const generateJobSchema = () => ({
    "@context": "https://schema.org",
    "@type": "JobPosting",
    "title": openings[activeOpening].title,
    "description": openings[activeOpening].description,
    "datePosted": new Date().toISOString(),
    "employmentType": openings[activeOpening].type,
    "hiringOrganization": {
      "@type": "Organization",
      "name": "Visakhatech Solutions",
      "sameAs": "https://visakhatechsolutions.com"
    },
    "jobLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": openings[activeOpening].location
      }
    },
    "experienceRequirements": {
      "@type": "OccupationalExperienceRequirements",
      "monthsOfExperience": openings[activeOpening].experience
    }
  });

  return (
    <div className="pt-16 md:pt-20 font-archivo">
      <Helmet>
        <title>Careers at Visakhatech Solutions - Engineering Your Future</title>
        <meta name="description" content="Join our team of engineering innovators. Explore career opportunities in electrical engineering, project management, and technical consulting with competitive benefits and growth potential." />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            "name": "Careers",
            "description": "Career opportunities at Visakhatech Solutions",
            "url": "https://visakhatechsolutions.com/careers",
          })}
        </script>
        <script type="application/ld+json">{JSON.stringify(generateJobSchema())}</script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative h-[70vh] bg-gray-900">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-[url('https://i.postimg.cc/x1CNYJqd/harbor-sunset-1359-1120-1.jpg"
        />
        <div className="relative z-10 flex items-center justify-center h-full text-center px-4">
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Power Your Career with <span className="text-[#00D1D1]">Purpose</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-8">
              Shape the future of industrial technology while growing your expertise
            </p>
            <Link 
              to="#openings" 
              className="bg-[#00D1D1] text-white px-8 py-3 rounded-lg font-semibold hover:bg-[#00b3b3] transition"
            >
              View Open Positions
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Join Our Team?</h2>
            <div className="w-20 h-1 bg-[#00D1D1] mx-auto mb-6" />
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <benefit.icon className="w-12 h-12 text-[#00D1D1] mb-4" />
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Job Openings Section */}
      <section id="openings" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Current Opportunities</h2>
            <div className="w-20 h-1 bg-[#00D1D1] mx-auto mb-6" />
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {openings.map((opening, index) => (
              <motion.div
                key={index}
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                className="mb-6 border rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-semibold">{opening.title}</h3>
                    <div className="flex gap-4 mt-2 text-sm text-gray-600">
                      <span>{opening.department}</span>
                      <span>•</span>
                      <span>{opening.location}</span>
                    </div>
                  </div>
                  <Link 
                    to={`/careers/${opening.title.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-[#00D1D1] hover:underline"
                  >
                    View Details →
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              className="relative"
            >
              <img 
                src="https://i.postimg.cc/x1CNYJqd/harbor-sunset-1359-1120-1.jpg" 
                alt="Team Culture" 
                className="rounded-xl shadow-xl"
              />
            </motion.div>
            
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
            >
              <h2 className="text-3xl font-bold mb-6">Our Engineering Culture</h2>
              <p className="text-gray-600 mb-6">
                At Visakhatech, we foster innovation through collaboration. Our engineers enjoy:
              </p>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <Linkedin className="w-6 h-6 text-[#00D1D1] mr-3" />
                  <span>Professional development programs</span>
                </li>
                <li className="flex items-center">
                  <Briefcase className="w-6 h-6 text-[#00D1D1] mr-3" />
                  <span>Cutting-edge technology access</span>
                </li>
                <li className="flex items-center">
                  <Globe className="w-6 h-6 text-[#00D1D1] mr-3" />
                  <span>Global project exposure</span>
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Application Process Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Hiring Process</h2>
            <div className="w-20 h-1 bg-[#00D1D1] mx-auto mb-6" />
          </motion.div>

          <div className="grid md:grid-cols-5 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.2 }}
                className="text-center"
              >
                <div className="bg-[#00D1D1] w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  {step.icon}
                </div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.duration}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <Swiper
            modules={[Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 5000 }}
            breakpoints={{ 768: { slidesPerView: 2 } }}
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white p-8 rounded-xl shadow-lg">
                  <Quote className="w-8 h-8 text-[#00D1D1] mb-4" />
                  <p className="text-gray-600 mb-6">"{testimonial.quote}"</p>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-[#00D1D1] text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Engineer Tomorrow?</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Join a team where your work impacts national infrastructure and global engineering standards
          </p>
          <Link 
            to="/contact" 
            className="bg-white text-[#00D1D1] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
          >
            Apply Now
          </Link>
        </div>
      </section>
    </div>
  );
}