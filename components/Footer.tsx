'use client';

import React from 'react';
import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Youtube, Heart, ArrowUp } from 'lucide-react';

export function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-brand-dark text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-brand-red rounded-xl flex items-center justify-center shadow-lg transform rotate-3">
                <span className="text-white font-bold text-xl italic">G</span>
              </div>
              <span className="text-2xl font-display font-bold tracking-tight">
                Gopdf<span className="text-brand-red">editor</span>
              </span>
            </Link>
            <p className="text-slate-400 leading-relaxed max-w-xs">
              Gopdfeditor is your completely free online PDF editor toolkit. Convert, edit, compress, merge and secure your PDF files easily.
            </p>
            <div className="flex items-center space-x-4">
              <Link href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#1877F2] transition-colors group">
                <Facebook className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#1DA1F2] transition-colors group">
                <Twitter className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#0A66C2] transition-colors group">
                <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </Link>
              <Link href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#FF0000] transition-colors group">
                <Youtube className="w-5 h-5 group-hover:scale-110 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Column 2: Product */}
          <div className="space-y-6">
            <h3 className="text-lg font-display font-bold text-white">PRODUCT</h3>
            <ul className="space-y-4">
              {['All Tools', 'PDF Editor', 'Compress PDF', 'Merge PDF', 'Split PDF', 'PDF Converter'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-slate-400 hover:text-brand-red transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="space-y-6">
            <h3 className="text-lg font-display font-bold text-white">RESOURCES</h3>
            <ul className="space-y-4">
              {['How To Guides', 'Blog', 'FAQ', 'Help Center', 'Chrome Extension'].map((item) => (
                <li key={item}>
                  <Link href="#" className="text-slate-400 hover:text-brand-red transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Company */}
          <div className="space-y-6">
            <h3 className="text-lg font-display font-bold text-white">COMPANY</h3>
            <ul className="space-y-4">
              {['About Us', 'Contact Us', 'Privacy Policy', 'Disclaimer', 'Terms of Service'].map((item) => (
                <li key={item}>
                  <Link href={item.toLowerCase().replace(/ /g, '-')} className="text-slate-400 hover:text-brand-red transition-colors">{item}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-10 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Gopdfeditor. All rights reserved.
          </p>
          
          <div className="flex items-center space-x-2 text-slate-500 text-sm">
            <span>Made with</span>
            <Heart className="w-4 h-4 text-brand-red fill-brand-red" />
            <span>for everyone</span>
          </div>

          <button 
            onClick={scrollToTop}
            className="w-12 h-12 bg-brand-red rounded-xl flex items-center justify-center shadow-lg hover:bg-brand-red/80 active:scale-95 transition-all"
          >
            <ArrowUp className="w-6 h-6" />
          </button>
        </div>
      </div>
    </footer>
  );
}
