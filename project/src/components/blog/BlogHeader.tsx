import React, { useState, useEffect } from 'react';
import { Search, Menu, X } from 'lucide-react';
import { categories } from '../../data/categories';

interface BlogHeaderProps {
  onSearch: (query: string) => void;
  searchQuery: string;
  onCategoryChange: (category: string | null) => void;
  activeCategory: string | null;
}

const BlogHeader: React.FC<BlogHeaderProps> = ({ 
  onSearch, 
  searchQuery, 
  onCategoryChange, 
  activeCategory 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-10 w-full transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4 border-b border-gray-100">
          <div className="flex-1">
            <h1 className="text-2xl font-serif font-bold text-gray-900">
              <span className="text-blue-600"></span>BLOGS
            </h1>
          </div>
          
          <div className="hidden md:flex items-center flex-1 justify-center">
            <div className="relative max-w-md w-full">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                className="w-full py-2 pl-10 pr-4 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>
          
          <div className="flex items-center justify-end flex-1">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="ml-3 md:hidden"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {/* Categories */}
        <div className="hidden md:block overflow-x-auto py-2">
          <div className="flex space-x-2">
            <button
              onClick={() => onCategoryChange(null)}
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-colors 
                ${activeCategory === null 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
            >
              All
            </button>
            
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => onCategoryChange(category.id)}
                className={`px-3 py-1 rounded-full text-sm whitespace-nowrap transition-colors 
                  ${activeCategory === category.id 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'}`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white p-4 shadow-lg rounded-b-lg">
            <div className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => onSearch(e.target.value)}
                  className="w-full py-2 pl-10 pr-4 bg-gray-100 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  onCategoryChange(null);
                  setIsMobileMenuOpen(false);
                }}
                className={`px-3 py-2 rounded-md text-sm text-center 
                  ${activeCategory === null 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-800'}`}
              >
                All
              </button>
              
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => {
                    onCategoryChange(category.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`px-3 py-2 rounded-md text-sm text-center 
                    ${activeCategory === category.id 
                      ? 'bg-blue-600 text-white' 
                      : 'bg-gray-100 text-gray-800'}`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default BlogHeader;