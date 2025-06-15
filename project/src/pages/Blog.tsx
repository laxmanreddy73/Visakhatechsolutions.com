import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import BlogHeader from '../components/blog/BlogHeader';
import FeaturedPost from '../components/blog/FeaturedPost';
import BlogGrid from '../components/blog/BlogGrid';
import { Post } from '../types/blog';
import { fetchPosts } from '../utils/api';
import BlogLoading from '../components/blog/BlogLoading';
import { useDebounce } from '../hooks/useDebounce';
import { brandKeywords, serviceKeywords, locationKeywords } from '../data/keywords';

const Blog = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);

  // Get featured post
  const featuredPost = posts.find(post => post.featured) || null;
  
  // Generate meta description based on content
  const metaDescription = featuredPost 
    ? `${featuredPost.excerpt.substring(0, 160)}...` 
    : "Latest insights and articles from Visakha Tech Solutions on naval technology, industrial automation, and electro-mechanical solutions.";

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setIsLoading(true);
        const data = await fetchPosts();
        setPosts(data);
        setFilteredPosts(data);
      } catch (err) {
        setError('Failed to load blog posts. Please try again later.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadPosts();
  }, []);

  useEffect(() => {
    let result = [...posts];
    
    if (debouncedSearchQuery) {
      result = result.filter((post) => 
        post.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) || 
        post.excerpt.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
      );
    }
    
    if (activeCategory) {
      result = result.filter((post) => post.category === activeCategory);
    }
    
    setFilteredPosts(result);
  }, [posts, debouncedSearchQuery, activeCategory]);

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const handleCategoryChange = (category: string | null) => {
    setActiveCategory(category);
  };

  if (error) {
    return (
      <div className="min-h-screen bg-white pt-16 px-4 sm:px-6 lg:px-8">
        <Helmet>
          <title>Error Loading Content | Visakha Tech Solutions</title>
          <meta name="description" content="Error occurred while loading blog content from Visakha Tech Solutions" />
        </Helmet>
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-16">
            <h2 className="text-3xl font-serif font-bold text-gray-900">Oops!</h2>
            <p className="mt-4 text-xl text-gray-500">{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>VISAKHA TECH SOLUTIONS | Leading Naval & Industrial Electrical Experts in Visakhapatnam</title>
        <meta name="description" content="Premier ISO 9001:2015 certified electrical & automation solutions provider in Visakhapatnam. Specialized in naval, defense, and industrial projects with 100+ successful implementations." />
        <title>Visakha Tech | Naval, Industrial & Defense Automation Experts</title>
        <meta name="description" content="Premier ISO 9001:2015 certified electrical & automation solutions provider in Visakhapatnam. Visakha Tech Specialized in naval, defense, and industrial projects with 100+ successful implementations." />
        <title> Visakhatechsolutions | Naval, Industrial & Defense Automation Experts</title>
        <meta name="description" content="Premier ISO 9001:2015 certified electrical & automation solutions provider in Visakhapatnam. Visakhatechsolutions Specialized in naval, defense, and industrial projects with 100+ successful implementations." />
        <title>Blog | Visakha Tech Solutions - Naval & Industrial Technology Insights</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content="Visakha Tech, Visakha Solutions, Naval Technology, Industrial Automation, Electro-Mechanical Solutions, Marine Engineering, Shipbuilding Technology, Defense Solutions, Visakhapatnam Tech Companies" />
        <meta name="keywords" content={`${[...brandKeywords, ...serviceKeywords, ...locationKeywords].join(', ')}`} />
        <link rel="canonical" href="https://visakhatechsolutions.com/blog" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://visakhatechsolutions.com/blog" />
        <meta property="og:title" content="Technology Insights | Visakha Tech Solutions Blog" />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={featuredPost?.coverImage || "https://visakhatechsolutions.com/images/blog-og-image.jpg"} />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://visakhatechsolutions.com/blog" />
        <meta property="twitter:title" content="Technology Insights | Visakha Tech Solutions Blog" />
        <meta property="twitter:description" content={metaDescription} />
        <meta property="twitter:image" content={featuredPost?.coverImage || "https://visakhatechsolutions.com/images/blog-og-image.jpg"} />
        
        {/* Structured Data */}
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
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Blog",
            "headline": "Visakha Tech Solutions Blog",
            "description": "Latest insights on naval technology, industrial automation and electro-mechanical solutions",
            "url": "https://visakhatechsolutions.com/blog",
            "publisher": {
              "@type": "Organization",
              "name": "Visakha Tech Solutions",
              "logo": {
                "@type": "ImageObject",
                "url": "https://visakhatechsolutions.com/logo.png"
              }
            },
            "image": featuredPost?.coverImage || "https://visakhatechsolutions.com/images/blog-og-image.jpg"
          })}
        </script>
      </Helmet>
      
      <BlogHeader 
        onSearch={handleSearch} 
        searchQuery={searchQuery}
        onCategoryChange={handleCategoryChange}
        activeCategory={activeCategory}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <BlogLoading />
        ) : (
          <>
            {featuredPost && !searchQuery && !activeCategory && (
              <FeaturedPost post={featuredPost} />
            )}
            
            <BlogGrid 
              posts={filteredPosts.filter(post => !post.featured || searchQuery || activeCategory)} 
              isFiltered={!!searchQuery || !!activeCategory}
            />
            
            {filteredPosts.length === 0 && (
              <div className="text-center py-16">
                <h2 className="text-2xl font-serif font-bold text-gray-900">No posts found</h2>
                <p className="mt-2 text-gray-500">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default Blog;