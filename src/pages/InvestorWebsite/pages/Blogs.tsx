import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ArrowRight, Search, Filter } from 'lucide-react';
import { useState } from 'react';

export default function Blogs() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const blogPosts = [
    {
      title: 'The Future of EV Logistics in India',
      excerpt: 'Exploring the rapid growth of electric vehicle adoption in the delivery sector and its impact on investors.',
      date: '2025-01-15',
      category: 'EV Trends',
      author: 'Priya Sharma',
      readTime: '5 min',
      image: 'https://images.unsplash.com/photo-1593941707874-ef25b8b4a92b?w=600&h=400&fit=crop',
      link: '/pages/blog/How IoT and Telematics are Changing the Fleet Management Game'
    },
    {
      title: 'Understanding the FOCO Investment Model',
      excerpt: 'A deep dive into Franchise-Owned, Company-Operated model and why it works for passive investors.',
      date: '2025-01-10',
      category: 'Investment Strategy',
      author: 'Rajesh Kumar',
      readTime: '7 min',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop',
      link: '/blog/foco-investment-model'
    },
    {
      title: 'EV vs Petrol: Cost Comparison for Delivery Fleets',
      excerpt: 'Detailed analysis of operational costs, maintenance, and profitability of electric vs petrol bikes.',
      date: '2025-01-05',
      category: 'Cost Analysis',
      author: 'Ananya Singh',
      readTime: '8 min',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop',
      link: '/blog/ev-vs-petrol-cost-comparison'
    },
    {
      title: 'Government EV Subsidies: What Changed in 2025',
      excerpt: 'Breaking down the latest government incentives and how they affect your investment returns in the EV delivery space.',
      date: '2025-01-12',
      category: 'EV Trends',
      author: 'Vikram Patel',
      readTime: '6 min',
      image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop',
      link: '/blog/government-ev-subsidies-2025'
    },
    {
      title: 'How to Scale Your EV Fleet: A Founder\'s Guide',
      excerpt: 'Step-by-step approach to growing your delivery fleet profitably while maintaining operational efficiency.',
      date: '2025-01-08',
      category: 'Operations',
      author: 'Deepak Mehta',
      readTime: '9 min',
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=400&fit=crop',
      link: '/blog/scale-ev-fleet-founders-guide'
    },
    {
      title: 'Battery Technology Breakthroughs in 2025',
      excerpt: 'Latest advancements in lithium-ion and solid-state battery technology impacting EV range and profitability.',
      date: '2025-01-03',
      category: 'Technology',
      author: 'Dr. Neha Gupta',
      readTime: '7 min',
      image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=400&fit=crop',
      link: '/blog/battery-technology-breakthroughs-2025'
    },
    {
      title: 'Passive Income from EV Fleet Investments',
      excerpt: 'Real numbers: How much can you earn passively by investing in franchised EV delivery fleets?',
      date: '2025-01-01',
      category: 'Investment Strategy',
      author: 'Sanjay Chopra',
      readTime: '6 min',
      image: 'https://images.unsplash.com/photo-1444427169347-20277e38f6da?w=600&h=400&fit=crop',
      link: '/blog/passive-income-ev-fleet-investments'
    },
    {
      title: 'Last-Mile Delivery Revolution: EVs vs Traditional Models',
      excerpt: 'Comparative study of how electric vehicles are transforming the last-mile delivery ecosystem in urban India.',
      date: '2024-12-28',
      category: 'EV Trends',
      author: 'Priya Sharma',
      readTime: '8 min',
      image: 'https://images.unsplash.com/photo-1586528116311-a57f35a0d5d5?w=600&h=400&fit=crop',
      link: '/blog/last-mile-delivery-revolution'
    },
    {
      title: 'Risk Management in EV Fleet Investments',
      excerpt: 'Understanding operational, financial, and regulatory risks when investing in EV delivery franchises.',
      date: '2024-12-25',
      category: 'Investment Strategy',
      author: 'Arjun Desai',
      readTime: '7 min',
      image: 'https://images.unsplash.com/photo-1554224311-beee415c201f?w=600&h=400&fit=crop',
      link: '/blog/risk-management-ev-investments'
    },
    {
      title: 'Charging Infrastructure: The Missing Link in EV Growth',
      excerpt: 'Exploring the challenges and opportunities in building a robust charging network for commercial EV fleets.',
      date: '2024-12-20',
      category: 'Technology',
      author: 'Vikram Patel',
      readTime: '6 min',
      image: 'https://images.unsplash.com/photo-1487754180144-351b8e29f7ff?w=600&h=400&fit=crop',
      link: '/blog/charging-infrastructure-ev-growth'
    }
  ];

  const categories = ['all', 'EV Trends', 'Investment Strategy', 'Cost Analysis', 'Operations', 'Technology'];

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-blue-700 to-indigo-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              Blog & Insights
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Stay updated on EV trends, investment insights, and industry news from experts in the electric vehicle delivery ecosystem
            </p>
          </div>
        </div>
      </section>

      {/* Search & Filter Section */}
      <section className="py-12 bg-white border-b border-slate-200">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col gap-6">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                  <Filter className="h-4 w-4" />
                  Categories:
                </div>
                <div className="flex flex-wrap gap-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full font-medium transition-all ${
                        selectedCategory === category
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Result Count */}
              <p className="text-sm text-slate-600">
                Showing {filteredPosts.length} of {blogPosts.length} articles
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {filteredPosts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post, index) => (
                  <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group">
                    {/* Image Container */}
                    <div className="relative h-48 overflow-hidden bg-slate-200">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 right-4">
                        <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-medium">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    {/* Content Container */}
                    <div className="p-6 flex flex-col h-full">
                      {/* Meta Info */}
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-3 pb-3 border-b border-slate-100">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{new Date(post.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                        </div>
                        <span className="font-medium">{post.readTime}</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-bold mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </h3>

                      {/* Excerpt */}
                      <p className="text-slate-600 text-sm mb-4 line-clamp-3 flex-grow">
                        {post.excerpt}
                      </p>

                      {/* Author */}
                      <p className="text-xs text-slate-500 mb-4">by {post.author}</p>

                      {/* CTA Button */}
                      <a href={post.link} className="w-full">
                        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                          Read More <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </a>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-slate-600 mb-4">No articles found matching your criteria</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('all');
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Stay in the Loop</h2>
            <p className="text-blue-100 mb-8">
              Get the latest EV investment insights and industry trends delivered to your inbox
            </p>
            <div className="flex gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <Button className="bg-white text-blue-600 hover:bg-blue-50">Subscribe</Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}