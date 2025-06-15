import React from 'react';

const BlogLoading: React.FC = () => {
  return (
    <div className="animate-pulse">
      {/* Featured post skeleton */}
      <div className="mb-12">
        <div className="rounded-xl bg-gray-200 h-96 w-full"></div>
      </div>
      
      {/* Blog grid skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm h-full flex flex-col">
            <div className="h-48 bg-gray-200"></div>
            <div className="p-5 flex-grow flex flex-col space-y-4">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-4/5"></div>
              </div>
              <div className="flex items-center justify-between mt-auto">
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                <div className="h-4 bg-gray-200 rounded w-1/4"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogLoading;