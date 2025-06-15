import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CheckCircle, Target, Users, Phone, Mail, 
  Briefcase, ArrowRight, ShieldCheck, Clock,
  Globe, HardHat, Zap, Shield, MapPin, Send, Loader
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useInView } from 'react-intersection-observer';
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';

import { brandKeywords, serviceKeywords, locationKeywords } from '../data/keywords';

const ImageDisplay = () => {
  const imageSrc = "https://i.postimg.cc/6pGsX7GZ/hand-releases-paper-airplane-with-trail-sparkling-light-following-it-symbolizing-dreams-aspirations.jpg";

  return (
    <div className="absolute inset-0 w-full h-full flex items-start justify-center overflow-hidden pt-12 bg-custom-bg">
      <div className="relative w-full h-full max-w-[94%] max-h-[89%] md:max-h-[89%] rounded-[10px] overflow-hidden shadow-lg -mt-6 mx-auto bg-custom-bg">
        <motion.img
          src={imageSrc}
          alt="Contact Visakha Tech Solutions for electro-mechanical solutions"
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
    <section className="relative bg-custom-bg font-archivo bg-custom-bg" style={{ height: '95vh' }}>
      <ImageDisplay />
      <div className="absolute inset-0 flex items-start justify-start z-30 pointer-events-none pt-32 px-8 sm:px-12 md:px-20 md:-mt-32">
        <div className="max-w-4xl text-left">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-tight -mt-16 md:mt-16"
          >
            Get In
            <br />
            <span className="text-[#00D1D1] drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">Touch</span>
            <br />
            With Us
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-white text-lg md:text-xl mt-6 max-w-lg"
          >
            Let's discuss how we can help transform your operations
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-10 pointer-events-auto"
          >
            <a href="#contact-form" className="bg-white text-black border-[6px] border-white text-sm sm:text-base md:text-lg font-semibold px-2 py-0.5 rounded-[8px] hover:bg-gray-200 transition">
              Send a Message →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const DynamicMeta = () => {
  const [trend, setTrend] = useState('');
  
  useEffect(() => {
    const contactTrends = [
      "Electro-Mechanical Solutions Contact",
      "Industrial Automation Experts Vizag",
      "Naval Electrical Contractors",
      "Defense Sector Engineering Services"
    ];
    setTrend(contactTrends[Math.floor(Math.random() * contactTrends.length)]);
  }, []);

  return (
    <Helmet>
      <title>{`Contact Visakha Tech Solutions ${trend ? `| ${trend}` : ''}`}</title>
      <meta 
        name="description" 
        content={`${trend || 'Contact our team'} for industrial electrical solutions in Visakhapatnam. ISO 9001:2015 certified experts ready to assist with your project.`} 
      />
    </Helmet>
  );
};

export default function Contact() {
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const formRef = useRef<HTMLFormElement>(null);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const result = await emailjs.sendForm(
        'service_x8hgq7a',
        'template_d0onb9g',
        formRef.current!,
        'U6sokO4YKumTpO3l_'
      );

      if (result.text === 'OK') {
        setStatus('success');
        toast.success('Message sent successfully! We will get back to you soon.');
        setFormData({ name: '', email: '', message: '' });
        if (formRef.current) {
          formRef.current.reset();
        }
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
      toast.error('Failed to send message. Please try again later.');
    } finally {
      setTimeout(() => setStatus('idle'), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  return (
    <div className="relative w-full overflow-x-hidden font-archivo">
      <Toaster position="top-center" />
      
      {/* Enhanced SEO Meta Tags */}
      <DynamicMeta />
      <Helmet>
        <meta name="keywords" content="contact visakha tech, visakhatechsolutions contact, electro-mechanical solutions contact, industrial automation contact, naval electrical contractors, defense sector engineering services" />
        <meta name="keywords" content={`${[...brandKeywords, ...serviceKeywords, ...locationKeywords].join(', ')}`} />
        <link rel="canonical" href="https://visakhatechsolutions.com/contact" />
        <link rel="next" href="https://visakhatechsolutions.com/services" />
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
        
        {/* Local Business Schema with Contact Info */}
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
              "email": "visakhatechsolutions@gmail.com",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "65-1-208/C, Pilakavanipalem, Coromandel, Sriharipuram",
                "addressLocality": "Visakhapatnam",
                "addressRegion": "Andhra Pradesh",
                "postalCode": "530011",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": "17.6910054",
                "longitude": "83.2316226"
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
                  "name": "What areas do you serve?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "We primarily serve Visakhapatnam and surrounding areas, but we also take on projects across India depending on the scope and requirements."
                  }
                },
                {
                  "@type": "Question",
                  "name": "Do you provide free consultations?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes, we offer free initial consultations to understand your requirements and provide a tailored solution for your project needs."
                  }
                },
                {
                  "@type": "Question",
                  "name": "What is your typical project timeline?",
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Project timelines vary based on complexity and scope. We pride ourselves on timely execution and will provide a detailed timeline during the consultation phase."
                  }
                }
              ]
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

      {/* Hero Video Section */}
      <VideoSection />

      {/* Contact Form Section */}
<section id="contact-form" className="py-20 bg-white">
  <div className="container mx-auto px-4">
    <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-lg p-8 md:p-12">
      {/* Center the grid container */}
      <div className="grid md:grid-cols-2 gap-12 justify-center">
        {/* Contact Form - Centered */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-xl border border-gray-200"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center md:text-left">Send Us a Message</h2>
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Name
              </label>
              <input
                type="text"
                name="user_name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                type="email"
                name="user_email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className={`w-full py-3 px-6 rounded-lg text-white font-medium flex items-center justify-center space-x-2 ${
                status === 'loading'
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-blue-600 to-teal-600 hover:shadow-lg transition-all'
              }`}
            >
              {status === 'loading' ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>
        </motion.div>

        {/* Contact Information - Centered */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center md:text-left">Contact Information</h2>
            <div className="space-y-6">
              <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-xl">
                <div className="bg-blue-100 p-3 rounded-full">
                  <MapPin className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Branch Address</h3>
                  <p className="text-gray-600">
                    65-1-208/C, Pilakavanipalem, Coromandel, Sriharipuram, Visakhapatnam - 530011
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-xl">
                <div className="bg-blue-100 p-3 rounded-full">
                  <MapPin className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Registered Address</h3>
                  <p className="text-gray-600">
                    5-19-26/258, Chukkavanipalem Colony, Tungalam, Gajuwaka, Visakhapatnam – 530012
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-xl">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Phone className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Phone</h3>
                  <p className="text-gray-600">
                    <a href="tel:+917702119852" className="hover:text-teal-600">+91 7702119852</a>
                    <br />
                    <a href="tel:+919121419852" className="hover:text-teal-600">+91 9121419852</a>
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-xl">
                <div className="bg-blue-100 p-3 rounded-full">
                  <Mail className="w-6 h-6 text-teal-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Email</h3>
                  <p className="text-gray-600">
                    <a href="mailto:visakhatechsolutions@gmail.com" className="hover:text-teal-600">
                      visakhatechsolutions@gmail.com
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Business Hours */}
          <div className="p-4 bg-gray-50 rounded-xl">
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center md:text-left">Business Hours</h3>
            <div className="space-y-2 text-gray-600">
              <p className="flex justify-between"><span>Monday - Friday:</span> <span>9:00 AM - 6:00 PM</span></p>
              <p className="flex justify-between"><span>Saturday:</span> <span>9:00 AM - 2:00 PM</span></p>
              <p className="flex justify-between"><span>Sunday:</span> <span>Closed</span></p>
            </div>
          </div>

          {/* Emergency Support */}
          <div className="p-4 bg-red-50 rounded-xl border border-red-100">
            <h3 className="text-xl font-semibold text-red-800 mb-2 text-center md:text-left">24/7 Emergency Support</h3>
            <p className="text-red-700">
              For urgent matters, call: <br />
              <a href="tel:+917702119852" className="font-semibold hover:text-red-900">
                +91 7702119852
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  </div>
</section>

      {/* Map Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900">Our Location</h2>
            <div className="w-20 h-1 bg-teal-600 mx-auto mt-4"></div>
          </motion.div>
          <div className="aspect-video rounded-2xl overflow-hidden shadow-lg">
            <iframe
              title="Visakha Tech Solutions Location - Electro-Mechanical Solutions in Visakhapatnam"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3800.458485849!2d83.2316226!3d17.6910054!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3969005e6b1419%3A0x85b1dae5decdf198!2sVisakha%20Tech%20Solutions!5e0!3m2!1sen!2sin!4v1647856732345!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
<section className="py-20 bg-white">
  <div className="container mx-auto px-4">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center mb-16"
    >
      <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
      <div className="w-20 h-1 bg-gradient-to-r from-blue-600 to-teal-600 mx-auto mb-6"></div>
      <p className="text-gray-600 max-w-2xl mx-auto">
        Find answers to common questions about our services and operations
      </p>
    </motion.div>

    <div className="max-w-3xl mx-auto">
      {[
        {
          question: "What areas does Visakhatechsolutions serve?",
          answer: (
            <>
              We primarily serve <strong>Visakhapatnam (Vizag)</strong> and surrounding regions including 
              <strong> Anakapalli, Vizianagaram, and Srikakulam</strong>. For specialized projects, we extend 
              our electro-mechanical solutions across <strong>India</strong>, catering to naval, defense, and 
              industrial sectors nationwide.
            </>
          )
        },
        {
          question: "What services does Visakhatechsolutions offer in Visakhapatnam?",
          answer: (
            <>
              As a <strong>leading ISO 9001:2015 certified company</strong>, we provide comprehensive solutions:
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Electrical Consultancy:</strong> Design & feasibility studies</li>
                <li><strong>Automation Services:</strong> PLC, SCADA, and IoT integration</li>
                <li><strong>Turnkey Projects:</strong> From concept to commissioning</li>
                <li><strong>Maintenance Contracts:</strong> Preventive & breakdown support</li>
                <li><strong>Supply Chain Management:</strong> Certified components for defense applications</li>
              </ul>
            </>
          )
        },
        {
          question: "Why choose Visakhatechsolutions for naval electrical projects?",
          answer: (
            <>
              Our <strong>exclusive naval expertise</strong> includes:
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Defense-Compliant Solutions:</strong> Meeting Indian Navy & DGQA standards</li>
                <li><strong>Certified Team:</strong> Marine-grade electrical specialists</li>
                <li><strong>Proven Experience:</strong> Successful projects for shipyards and naval bases</li>
              </ul>
            </>
          )
        },
        {
          question: "How can I contact Visakhatechsolutions for project inquiries?",
          answer: (
            <>
              Reach our project team through multiple channels:
              <ul className="list-none pl-0 mt-2 space-y-1">
                <li><strong>Phone:</strong> <a href="tel:+917702119852" className="text-blue-600 hover:underline">+91 7702119852</a></li>
                <li><strong>Email:</strong> <a href="mailto:visakhatechsolutions@gmail.com" className="text-blue-600 hover:underline">visakhatechsolutions@gmail.com</a></li>
                <li><strong>Office:</strong> 65-1-208/C, Pilakavanipalem, Visakhapatnam – 530016</li>
              </ul>
              <p className="mt-2 font-medium">Free initial consultations available for all projects.</p>
            </>
          )
        },
        {
          question: "Does Visakhatechsolutions provide free consultations?",
          answer: "Yes! We offer no-obligation consultations to analyze your requirements and propose customized solutions for industrial automation, naval systems, or maintenance contracts."
        },
        {
          question: "What is Visakhatechsolutions' typical project timeline?",
          answer: (
            <>
              Project timelines vary by complexity:
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Small Projects:</strong> 2-4 weeks (e.g., electrical audits)</li>
                <li><strong>Large Installations:</strong> 3-6 months (e.g., shipyard automation)</li>
              </ul>
              We provide detailed milestone planning during the consultation phase.
            </>
          )
        },
        {
          question: "Does Visakhatechsolutions offer maintenance services?",
          answer: (
            <>
              Absolutely! Our comprehensive maintenance solutions include:
              <ul className="list-disc pl-5 mt-2 space-y-1">
                <li><strong>Annual Maintenance Contracts (AMCs)</strong></li>
                <li><strong>24/7 Emergency Support</strong></li>
                <li><strong>Predictive Maintenance Systems</strong></li>
                <li><strong>Genuine Spare Parts Management</strong></li>
              </ul>
            </>
          )
        }
      ].map((faq, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="mb-6 bg-blue-50 rounded-xl p-6 hover:shadow-md transition-all"
        >
          <h3 className="text-xl font-semibold text-teal-600 mb-3">{faq.question}</h3>
          <div className="text-gray-900">{faq.answer}</div>
        </motion.div>
      ))}
    </div>
  </div>
</section>

      {/* Call to Action Section */}
      <section className="w-full bg-[#f5f9ff] py-16 px-4 lg:px-20 flex flex-col lg:flex-row justify-center items-center gap-10">
        <div className="rounded-[15px] overflow-hidden w-full max-w-md">
          <img
            src="https://i.postimg.cc/x1CNYJqd/harbor-sunset-1359-1120-1.jpg"
            alt="Visakha Tech Solutions - Electro-Mechanical Experts"
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
            Ready to transform your <br />
            operations with our <br />
            <span className="text-teal-600 font-bold">electro-mechanical <br className="block sm:hidden" /> expertise</span>?
          </h2>

          <Link 
            to="/contact"
            className="mt-10 md:mt-32 bg-black text-white px-6 py-3 rounded-md hover:bg-gray-900 transition flex items-center gap-2 font-bold mx-auto lg:mx-0 max-w-fit"
          >
            Contact Us Now
            <span className="text-2xl font-bold">→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}