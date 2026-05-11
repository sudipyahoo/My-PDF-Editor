'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Chrome } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { PDF_TOOLS } from '@/lib/tools-data';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [toolsOpen, setToolsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact Us', href: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-brand-red rounded-xl flex items-center justify-center shadow-lg transform rotate-3 hover:rotate-0 transition-transform">
              <span className="text-white font-bold text-xl italic">G</span>
            </div>
            <span className="text-2xl font-display font-bold tracking-tight">
              Gopdf<span className="text-brand-red">editor</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-slate-700 hover:text-brand-red font-medium transition-colors">Home</Link>
            
            <div className="relative group">
              <button 
                onMouseEnter={() => setToolsOpen(true)}
                className="flex items-center space-x-1 text-slate-700 hover:text-brand-red font-medium transition-colors"
                onClick={() => setToolsOpen(!toolsOpen)}
              >
                <span>Tools</span>
                <ChevronDown className={`w-4 h-4 transform transition-transform ${toolsOpen ? 'rotate-180' : ''}`} />
              </button>
              
              <AnimatePresence>
                {toolsOpen && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    onMouseLeave={() => setToolsOpen(false)}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[600px] bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 z-50"
                  >
                    <div className="grid grid-cols-3 gap-6">
                      {['Edit & Manage', 'Convert From PDF', 'Convert To PDF', 'Optimize PDF', 'Security & Sign'].map((cat) => (
                        <div key={cat}>
                          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">{cat}</h3>
                          <ul className="space-y-2">
                            {PDF_TOOLS.filter(t => t.category === cat).slice(0, 4).map(tool => (
                              <li key={tool.id}>
                                <Link 
                                  href={tool.href}
                                  className="text-sm text-slate-600 hover:text-brand-red transition-colors block"
                                  onClick={() => setToolsOpen(false)}
                                >
                                  {tool.name}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/about" className="text-slate-700 hover:text-brand-red font-medium transition-colors">About Us</Link>
            <Link href="/contact" className="text-slate-700 hover:text-brand-red font-medium transition-colors">Contact Us</Link>
            
            <button className="bg-brand-red text-white px-6 py-2.5 rounded-full font-bold shadow-lg shadow-brand-red/30 hover:bg-brand-dark transition-all flex items-center space-x-2 active:scale-95">
              <Chrome className="w-4 h-4" />
              <span>Add to Chrome</span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-700 hover:text-brand-red transition-colors"
            >
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-slate-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              <Link href="/" className="block px-3 py-3 rounded-lg text-lg font-medium text-slate-700 hover:bg-brand-red hover:text-white transition-all">Home</Link>
              <Link href="/tools" className="block px-3 py-3 rounded-lg text-lg font-medium text-slate-700 hover:bg-brand-red hover:text-white transition-all">Tools</Link>
              <Link href="/about" className="block px-3 py-3 rounded-lg text-lg font-medium text-slate-700 hover:bg-brand-red hover:text-white transition-all">About Us</Link>
              <Link href="/contact" className="block px-3 py-3 rounded-lg text-lg font-medium text-slate-700 hover:bg-brand-red hover:text-white transition-all">Contact Us</Link>
              <div className="pt-4 px-3">
                <button className="w-full bg-brand-red text-white px-6 py-4 rounded-xl font-bold flex items-center justify-center space-x-2">
                  <Chrome className="w-5 h-5" />
                  <span>Add to Chrome</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
