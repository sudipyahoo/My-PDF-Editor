'use client';

import React from 'react';
import { Star, ShieldCheck, Laptop, Globe } from 'lucide-react';
import { motion } from 'framer-motion';

export function RatingSection() {
  return (
    <div className="py-20 text-center">
      <div className="flex justify-center space-x-1 mb-4">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} className="w-8 h-8 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <h2 className="text-4xl font-display font-black text-slate-900">4.5 <span className="text-slate-400 text-2xl font-bold">/ 5</span></h2>
      <p className="text-slate-500 font-medium mt-2">12K+ Happy Users worldwide</p>
      
      <div className="max-w-2xl mx-auto mt-16 px-4">
          <h3 className="text-3xl font-display font-bold mb-4">Works the way you work</h3>
          <p className="text-slate-500">Gopdfeditor is an all-in-one online PDF solution that empowers teams and individuals to handle documents with speed and privacy.</p>
      </div>
    </div>
  );
}

export function FeatureSection() {
  return (
    <section className="pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div 
            whileHover={{ y: -10 }}
            className="p-10 rounded-[40px] bg-slate-50 border border-slate-100 flex flex-col items-center text-center space-y-6 group"
          >
            <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Laptop className="w-10 h-10 text-emerald-600" />
            </div>
            <h3 className="text-2xl font-display font-bold">Works Offline</h3>
            <p className="text-slate-500 max-w-sm">Process files securely on your device. No uploads, no risks — total privacy for you and your sensitive documents.</p>
            <button className="text-brand-red font-bold flex items-center space-x-2 group/btn">
              <span>Get started</span>
              <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
            </button>
          </motion.div>

          <motion.div 
            whileHover={{ y: -10 }}
            className="p-10 rounded-[40px] bg-slate-50 border border-slate-100 flex flex-col items-center text-center space-y-6 group"
          >
            <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Globe className="w-10 h-10 text-blue-600" />
            </div>
            <h3 className="text-2xl font-display font-bold">Works Everywhere</h3>
            <p className="text-slate-500 max-w-sm">Access your tools anytime, anywhere. Works on all devices and browsers without any installation required.</p>
            <button className="text-brand-red font-bold flex items-center space-x-2 group/btn">
              <span>Discover tools</span>
              <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function HowToGuides() {
  return (
    <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-display font-black text-center mb-16">How-To PDF Guides</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <h3 className="text-2xl font-bold mb-6">How to edit PDF files</h3>
                    <ul className="space-y-4">
                        {[
                            'How to edit text in a PDF file',
                            'Add or insert images in a PDF',
                            'Add a link to a PDF (website or page)',
                            'Delete pages from a PDF document',
                            'Rotate or crop PDF pages',
                            'Rearrange pages in a PDF'
                        ].map((text) => (
                            <li key={text} className="flex items-start space-x-3 group cursor-pointer">
                                <div className="w-5 h-5 rounded-full border-2 border-emerald-500 flex items-center justify-center mt-0.5 group-hover:bg-emerald-500 transition-colors">
                                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 group-hover:bg-white" />
                                </div>
                                <span className="text-slate-600 group-hover:text-emerald-600 transition-colors">{text}</span>
                            </li>
                        ))}
                    </ul>
                    <button className="mt-10 text-emerald-600 font-bold hover:underline">View all guides →</button>
                </div>

                <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                    <h3 className="text-2xl font-bold mb-6">How to convert PDF files</h3>
                    <ul className="space-y-4">
                        {[
                            'Convert PDF to Word easily',
                            'Convert PDF to Excel in seconds',
                            'Convert PDF to JPG or PNG images',
                            'Convert Word to PDF',
                            'Convert Excel to PDF',
                            'Convert PowerPoint to PDF'
                        ].map((text) => (
                            <li key={text} className="flex items-start space-x-3 group cursor-pointer">
                                <div className="w-5 h-5 rounded-full border-2 border-brand-red flex items-center justify-center mt-0.5 group-hover:bg-brand-red transition-colors">
                                    <div className="w-1.5 h-1.5 rounded-full bg-brand-red group-hover:bg-white" />
                                </div>
                                <span className="text-slate-600 group-hover:text-brand-red transition-colors">{text}</span>
                            </li>
                        ))}
                    </ul>
                    <button className="mt-10 text-brand-red font-bold hover:underline">View all guides →</button>
                </div>
            </div>
        </div>
    </section>
  );
}
