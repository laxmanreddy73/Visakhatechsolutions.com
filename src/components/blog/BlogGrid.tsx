import React from 'react';
import { Post } from '../../types/blog';
import BlogCard from './BlogCard';

interface BlogGridProps {
  posts: Post[];
  isFiltered: boolean;
}

const BlogGrid: React.FC<BlogGridProps> = ({ posts, isFiltered }) => {
  return (
    <div className="mt-8">
      {isFiltered && (
        <div className="mb-6">
          <h2 className="text-xl font-serif font-semibold text-gray-900">
            {posts.length} {posts.length === 1 ? 'result' : 'results'} found
          </h2>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {posts.map((post, index) => (
          <BlogCard 
            key={post.id} 
            post={post} 
            index={index} 
          />
        ))}
      </div>
    </div>
  );
};

export default BlogGrid;