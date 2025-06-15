import { Post } from '../types/blog';

// Simulating API call to fetch blog posts
export const fetchPosts = async (): Promise<Post[]> => {
  // In a real application, this would be an API call to your backend
  // which would handle fetching content from multiple sources
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockPosts);
    }, 1500);
  });
};

// Mock data for demonstration
const mockPosts: Post[] = [
  {
    id: '1',
    title: 'Visakhapatnam: Emerging Hub of Naval Defense Manufacturing',
    excerpt: 'How Visakhapatnam is transforming into India\'s premier naval defense manufacturing center, with state-of-the-art facilities and strategic partnerships.',
    content: 'Full article content here...',
    coverImage: 'https://i.postimg.cc/dQmS8RhS/fireman-fire-fighting-equipment-fire-drill-seaman-with-firefighter-s-outfits-breathing-apparatus-160.avif',
    publishedAt: '2025-01-15T10:30:00Z',
    url: 'https://example.com/vizag-naval-defense',
    source: 'Maritime Technology Review',
    category: 'technology',
    author: {
      name: 'Cmdr. Rajesh Kumar',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    },
    readingTime: 8,
    featured: true,
  },
  {
    id: '2',
    title: 'Advanced Propulsion Systems in Modern Warships',
    excerpt: 'An in-depth analysis of cutting-edge propulsion technologies being implemented in India\'s naval fleet, focusing on efficiency and stealth capabilities.',
    content: 'Full article content here...',
    coverImage: 'https://i.postimg.cc/7Ykmh5XM/panoramic-shot-oil-rigs-sea-with-beautiful-sunset.jpg',
    publishedAt: '2025-01-12T14:45:00Z',
    url: 'https://example.com/naval-propulsion',
    source: 'Defense Engineering Quarterly',
    category: 'technology',
    author: {
      name: 'Dr. Priya Sharma',
    },
    readingTime: 12,
    featured: false,
  },
  {
    id: '3',
    title: 'Sustainable Shipbuilding Practices in Coastal India',
    excerpt: 'How Indian shipyards are adopting eco-friendly manufacturing processes while maintaining world-class standards in vessel construction.',
    content: 'Full article content here...',
    coverImage: 'https://i.postimg.cc/x1CNYJqd/harbor-sunset-1359-1120-1.jpg',
    publishedAt: '2025-01-10T09:15:00Z',
    url: 'https://example.com/sustainable-shipbuilding',
    source: 'Marine Engineering Today',
    category: 'business',
    author: {
      name: 'Arun Patel',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
    },
    readingTime: 15,
    featured: false,
  },
  {
    id: '4',
    title: 'Innovation in Marine Electrical Systems',
    excerpt: 'Latest developments in marine electrical systems, focusing on power distribution, automation, and integration with renewable energy sources.',
    content: 'Full article content here...',
    coverImage: 'https://images.pexels.com/photos/1117210/pexels-photo-1117210.jpeg',
    publishedAt: '2025-01-08T16:00:00Z',
    url: 'https://example.com/marine-electrical',
    source: 'Electrical Engineering Digest',
    category: 'technology',
    author: {
      name: 'Sarah Wilson',
    },
    readingTime: 10,
    featured: false,
  },
  {
    id: '5',
    title: 'Coastal Defense Infrastructure Development',
    excerpt: 'A comprehensive look at India\'s coastal defense modernization program, including radar systems, surveillance networks, and response capabilities.',
    content: 'Full article content here...',
    coverImage: 'https://images.pexels.com/photos/1032650/pexels-photo-1032650.jpeg',
    publishedAt: '2025-01-05T11:20:00Z',
    url: 'https://example.com/coastal-defense',
    source: 'Defense Technology Review',
    category: 'technology',
    author: {
      name: 'Capt. Vikram Singh',
      avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
    },
    readingTime: 7,
    featured: false,
  },
  {
    id: '6',
    title: 'Digital Transformation in Indian Shipyards',
    excerpt: 'How digital technologies and Industry 4.0 principles are revolutionizing shipbuilding processes in Indian maritime facilities.',
    content: 'Full article content here...',
    coverImage: 'https://images.pexels.com/photos/2767815/pexels-photo-2767815.jpeg',
    publishedAt: '2025-01-03T13:40:00Z',
    url: 'https://example.com/digital-shipyards',
    source: 'Industrial Technology Magazine',
    category: 'technology',
    author: {
      name: 'Dr. Amit Kumar',
    },
    readingTime: 9,
    featured: false,
  },
  {
    id: '7',
    title: 'Maritime Cybersecurity Challenges',
    excerpt: 'Exploring the growing importance of cybersecurity in naval defense systems and strategies to protect critical maritime infrastructure.',
    content: 'Full article content here...',
    coverImage: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg',
    publishedAt: '2025-01-01T08:30:00Z',
    url: 'https://example.com/maritime-cybersecurity',
    source: 'Cybersecurity Insights',
    category: 'technology',
    author: {
      name: 'Maya Desai',
      avatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    },
    readingTime: 11,
    featured: false,
  },
  {
    id: '8',
    title: 'Autonomous Systems in Naval Operations',
    excerpt: 'The integration of autonomous systems and AI in modern naval operations, from surveillance to maintenance and combat support.',
    content: 'Full article content here...',
    coverImage: 'https://images.pexels.com/photos/2156/sky-earth-space-working.jpg',
    publishedAt: '2024-12-29T15:10:00Z',
    url: 'https://example.com/autonomous-naval',
    source: 'Defense Innovation Quarterly',
    category: 'technology',
    author: {
      name: 'Dr. James Chen',
    },
    readingTime: 6,
    featured: false,
  },
  {
    id: '9',
    title: 'Green Technologies in Shipbuilding',
    excerpt: 'Innovative approaches to reducing environmental impact in shipbuilding, from sustainable materials to zero-emission technologies.',
    content: 'Full article content here...',
    coverImage: 'https://images.pexels.com/photos/1435075/pexels-photo-1435075.jpeg',
    publishedAt: '2024-12-26T12:45:00Z',
    url: 'https://example.com/green-shipbuilding',
    source: 'Sustainable Engineering',
    category: 'technology',
    author: {
      name: 'Dr. Neha Gupta',
      avatar: 'https://randomuser.me/api/portraits/women/5.jpg',
    },
    readingTime: 8,
    featured: false,
  },
  {
    id: '10',
    title: 'Future of Naval Training Facilities',
    excerpt: 'Advanced simulation technologies and training methodologies being implemented in India\'s naval training centers.',
    content: 'Full article content here...',
    coverImage: 'https://images.pexels.com/photos/2833037/pexels-photo-2833037.jpeg',
    publishedAt: '2024-12-23T09:50:00Z',
    url: 'https://example.com/naval-training',
    source: 'Military Technology Review',
    category: 'technology',
    author: {
      name: 'Cmdr. Suresh Menon',
    },
    readingTime: 10,
    featured: false,
  },
];