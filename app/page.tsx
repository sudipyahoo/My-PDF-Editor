'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Hero } from '@/components/Hero';
import { ToolGrid } from '@/components/ToolGrid';
import { RatingSection, FeatureSection, HowToGuides } from '@/components/Sections';
import { SeoContent } from '@/components/SeoContent';
import { PDF_TOOLS, ToolCategory } from '@/lib/tools-data';

export default function Home() {
  const categories: ToolCategory[] = [
    'Edit & Manage',
    'Convert From PDF',
    'Convert To PDF',
    'Optimize PDF',
    'Security & Sign',
    'Extract & Other',
    'View & Utility'
  ];

  return (
    <main className="min-h-screen">
      <Navbar />
      
      <Hero />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 divide-y divide-slate-100">
        {categories.map((category) => (
          <ToolGrid 
            key={category} 
            title={category} 
            tools={PDF_TOOLS.filter(t => t.category === category)} 
            className="pt-16 first:pt-0"
          />
        ))}
      </div>

      <RatingSection />
      
      <FeatureSection />
      
      <HowToGuides />
      
      <SeoContent />

      <Footer />
    </main>
  );
}
