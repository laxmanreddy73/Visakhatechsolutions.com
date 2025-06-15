import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Trophy, Building2, Briefcase, Award } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

interface StatCardProps {
  icon: React.ElementType;
  number: number;
  label: string;
  description: string;
  delay: number;
}

const StatCard: React.FC<StatCardProps> = ({ icon: Icon, number, label, description, delay }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
      className="relative group"
    >
      <div className="flex flex-col items-center p-8 bg-white rounded-2xl shadow-lg transform transition-all duration-300 hover:translate-y-[-10px] hover:shadow-xl border border-gray-100">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-t-2xl"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-cyan-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative">
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : { scale: 0 }}
            transition={{ duration: 0.5, delay: delay + 0.2 }}
            className="p-4 rounded-full bg-gradient-to-br from-emerald-100 to-cyan-100 mb-6 group-hover:scale-110 transform transition-transform duration-300"
          >
            <Icon className="w-8 h-8 text-emerald-600" />
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
              className="text-6xl font-bold bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent mb-3"
            >
              {inView ? (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {number}+
                </motion.span>
              ) : (
                "0"
              )}
            </motion.div>
            <div className="text-xl font-semibold text-gray-800 mb-3">{label}</div>
            <div className="text-sm text-gray-600 text-center max-w-[200px]">{description}</div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export function GrowthStats() {
  const stats = [
    {
      icon: Trophy,
      number: 6,
      label: "Happy Clients",
      description: "Leading companies trust our expertise and innovative solutions"
    },
    {
      icon: Building2,
      number: 1,
      label: "Branch Office",
      description: "Strategic location serving our growing client base"
    },
    {
      icon: Briefcase,
      number: 6,
      label: "Major Projects",
      description: "Successfully delivered transformative solutions"
    },
    {
      icon: Award,
      number: 5,
      label: "Industry Awards",
      description: "Recognition for excellence and innovation"
    }
  ];

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  return (
    <section ref={ref} className="relative py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Our Growth in Numbers
          </h2>
          <motion.div
            initial={{ width: 0 }}
            animate={inView ? { width: "8rem" } : { width: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="h-1 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 mx-auto mb-6"
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
              }
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
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-emerald-50 to-cyan-50 rounded-xl">
            <p className="text-emerald-800 font-medium max-w-2xl">
              Every number represents a milestone in our journey towards excellence and innovation in technology solutions.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}