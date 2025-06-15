import React from 'react';
import { Clock, ExternalLink, Bookmark } from 'lucide-react';
import { Post } from '../../types/blog';
import { formatDate } from '../../utils/formatters';

interface FeaturedPostProps {
  post: Post;
}

const FeaturedPost: React.FC<FeaturedPostProps> = ({ post }) => {
  return (
    <div className="relative mb-12 group animate-fadeIn">
      <div className="rounded-xl overflow-hidden bg-gray-100 h-[28rem] relative">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
        
        <img 
          src={post.coverImage} 
          alt={post.title}
          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
        />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-20 transform transition-transform duration-300">
          <div className="flex items-center space-x-2 mb-3">
            <span className="px-3 py-1 bg-blue-600 rounded-full text-xs text-white font-medium">
              {post.category}
            </span>
            <span className="text-white/80 text-sm">{formatDate(post.publishedAt)}</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-white mb-3 leading-tight">
            {post.title}
          </h2>
          
          <p className="text-white/90 mb-4 max-w-3xl line-clamp-2 sm:line-clamp-3">
            {post.excerpt}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 text-white/80 text-sm">
                <Clock size={16} />
                <span>{post.readingTime} min read</span>
              </div>
              
              <div className="flex items-center space-x-1 text-white/80 text-sm">
                <ExternalLink size={16} />
                <span>{post.source}</span>
              </div>
            </div>
            
            <button className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors">
              <Bookmark size={18} />
            </button>
          </div>
        </div>
      </div>
      
      <a 
        href={post.url} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="absolute inset-0 z-30 cursor-pointer"
        aria-label={`Read ${post.title}`}
      />
    </div>
  );
};

export default FeaturedPost;