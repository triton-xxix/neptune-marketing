import React from 'react';
import { ArrowLeft, Calendar, Clock, ArrowRight } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'The £200K Lead Reactivation Playbook',
    excerpt: 'How we helped a client recover £200K+ from dormant leads using SMS + AI. Discover the exact strategy that turned cold leads into £200,000 in revenue.',
    date: 'Feb 8, 2026',
    readTime: '8 min read',
    category: 'Case Study'
  },
  {
    id: 2,
    title: 'Why Most Lead Gen Agencies Fail',
    excerpt: 'The hidden goldmine in existing leads vs chasing new ones. Learn why your current leads are worth more than you think and why agencies ignore them.',
    date: 'Feb 5, 2026',
    readTime: '6 min read',
    category: 'Strategy'
  },
  {
    id: 3,
    title: 'Performance-Based Pricing: A Better Model',
    excerpt: 'Why we only get paid when you win. Explore how our performance-based model aligns our success with yours and eliminates agency risk.',
    date: 'Feb 1, 2026',
    readTime: '5 min read',
    category: 'Business'
  }
];

const Blog: React.FC = () => {
  return (
    <div className="relative bg-[#0B0F1C] min-h-screen">
      {/* Noise overlay */}
      <div className="noise-overlay" />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Blog Hero */}
      <section className="relative pt-32 pb-20 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          {/* Back Link */}
          <a 
            href="/"
            className="inline-flex items-center gap-2 text-[#A9B3C5] hover:text-[#2EC3E5] transition-colors mb-8 group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-sm font-medium">Back to Home</span>
          </a>
          
          {/* Hero Content */}
          <div className="text-center max-w-3xl mx-auto">
            <span className="inline-block px-4 py-1.5 bg-[#2EC3E5]/10 text-[#2EC3E5] text-sm font-medium rounded-full mb-6">
              Our Blog
            </span>
            <h1 
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#F4F7FB] mb-6 leading-tight"
              style={{ fontFamily: 'Sora, sans-serif' }}
            >
              Insights & Strategies
            </h1>
            <p className="text-lg sm:text-xl text-[#A9B3C5] leading-relaxed">
              Actionable insights on lead reactivation, AI-powered sales, and performance marketing that actually works.
            </p>
          </div>
        </div>
      </section>
      
      {/* Blog Posts Grid */}
      <section className="relative pb-32 px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <article 
                key={post.id}
                className="group relative bg-[#F4F7FB]/5 border border-[#F4F7FB]/10 rounded-2xl overflow-hidden hover:border-[#2EC3E5]/30 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Card Header */}
                <div className="h-2 bg-gradient-to-r from-[#2EC3E5] to-[#2EC3E5]/50" />
                
                {/* Card Content */}
                <div className="p-6 sm:p-8">
                  {/* Category Badge */}
                  <span className="inline-block px-3 py-1 bg-[#2EC3E5]/10 text-[#2EC3E] text-xs font-semibold rounded-full mb-4">
                    {post.category}
                  </span>
                  
                  {/* Title */}
                  <h2 
                    className="text-xl font-bold text-[#F4F7FB] mb-3 leading-tight group-hover:text-[#2EC3E5] transition-colors"
                    style={{ fontFamily: 'Sora, sans-serif' }}
                  >
                    {post.title}
                  </h2>
                  
                  {/* Excerpt */}
                  <p className="text-[#A9B3C5] text-sm leading-relaxed mb-6">
                    {post.excerpt}
                  </p>
                  
                  {/* Meta Info */}
                  <div className="flex items-center gap-4 text-xs text-[#A9B3C5]/70 mb-6">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={14} />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={14} />
                      {post.readTime}
                    </span>
                  </div>
                  
                  {/* Read More Link */}
                  <button className="inline-flex items-center gap-2 text-[#2EC3E5] font-semibold text-sm group/btn">
                    Read Article
                    <ArrowRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </article>
            ))}
          </div>
          
          {/* Newsletter CTA */}
          <div className="mt-20 text-center">
            <div className="glass-card rounded-2xl p-8 sm:p-12 max-w-2xl mx-auto">
              <h3 
                className="text-2xl sm:text-3xl font-bold text-[#F4F7FB] mb-4"
                style={{ fontFamily: 'Sora, sans-serif' }}
              >
                Get Insights Delivered
              </h3>
              <p className="text-[#A9B3C5] mb-6">
                Join our newsletter for weekly strategies on lead reactivation and sales acceleration.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                <input 
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 bg-[#0B0F1C] border border-[#F4F7FB]/10 rounded-xl text-[#F4F7FB] placeholder:text-[#A9B3C5]/50 focus:outline-none focus:border-[#2EC3E5]/50"
                />
                <button className="px-6 py-3 bg-[#2EC3E5] text-[#0B0F1C] font-semibold rounded-xl hover:bg-[#2EC3E5]/90 transition-colors whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

import default Blog;
