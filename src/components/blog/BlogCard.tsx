import React from 'react';
import { Clock, ExternalLink, Bookmark } from 'lucide-react';
import { Post } from '../../types/blog';
import { formatDate } from '../../utils/formatters';

interface BlogCardProps {
  post: Post;
  index: number;
}

const BlogCard: React.FC<BlogCardProps> = ({ post, index }) => {
  // Calculate staggered animation delay based on index
  const animationDelay = `${(index % 9) * 100}ms`;
  
  return (
    <div 
      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col animate-fadeIn"
      style={{ animationDelay }}
    >
      <div className="relative h-48 overflow-hidden">
        <img 
          src={post.coverImage} 
          alt={post.title}
          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute top-3 left-3">
          <span className="px-2 py-1 bg-blue-600 rounded-full text-xs text-white font-medium">
            {post.category}
          </span>
        </div>
      </div>
      
      <div className="p-5 flex-grow flex flex-col">
        <div className="text-gray-500 text-sm mb-2">
          {formatDate(post.publishedAt)}
        </div>
        
        <h3 className="text-xl font-serif font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {post.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
          {post.excerpt}
        </p>
        
        <div className="flex items-center justify-between text-gray-500 text-sm mt-auto">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Clock size={14} />
              <span>{post.readingTime} min read</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <ExternalLink size={14} />
              <span>{post.source}</span>
            </div>
          </div>
          
          <button className="p-1.5 rounded-full hover:bg-gray-100 transition-colors">
            <Bookmark size={16} />
          </button>
        </div>
      </div>
      
      <a 
        href={post.url} 
        target="_blank" 
        rel="noopener noreferrer" 
        className="absolute inset-0"
        aria-label={`Read ${post.title}`}
      />
    </div>
  );
};

export default BlogCard;