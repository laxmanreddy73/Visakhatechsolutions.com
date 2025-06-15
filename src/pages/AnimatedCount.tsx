import React, { useEffect, useState } from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface AnimatedCounterProps {
  end: number;
  label: string;
  icon: LucideIcon;
  description: string;
  prefix?: string;
  suffix?: string;
}

export function AnimatedCounter({ 
  end, 
  label, 
  icon: Icon, 
  description, 
  prefix = '', 
  suffix = '' 
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const increment = end / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [end]);

  return (
    <div className="relative group">
      <div className="flex flex-col items-center p-8 bg-white rounded-2xl shadow-lg transform transition-all duration-300 hover:translate-y-[-10px] hover:shadow-xl border border-gray-100">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-t-2xl"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="relative">
          <div className="p-4 rounded-full bg-gradient-to-br from-blue-100 to-purple-100 mb-6 group-hover:scale-110 transform transition-transform duration-300">
            <Icon className="w-8 h-8 text-blue-600" />
          </div>
          <div className="text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-3">
            {prefix}{count}{suffix}
          </div>
          <div className="text-xl font-semibold text-gray-800 mb-3">{label}</div>
          <div className="text-sm text-gray-600 text-center max-w-[200px]">{description}</div>
        </div>
      </div>
    </div>
  );
}