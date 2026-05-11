'use client';

import React from 'react';
import { Search, Shield, Zap, Lock, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function Hero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background blobs */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-red-50 rounded-full blur-3xl -z-10 translate-x-1/2 -translate-y-1/2 opacity-50" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-50 rounded-full blur-3xl -z-10 -translate-x-1/2 translate-y-1/2 opacity-50" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16">
          {/* Left Side */}
          <div className="flex-1 text-center lg:text-left space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl lg:text-7xl font-display font-black leading-[1.1] text-slate-900">
                We help with your <span className="text-gradient-red">PDF</span> tasks
              </h1>
              <p className="mt-6 text-xl text-slate-500 max-w-2xl mx-auto lg:mx-0">
                All the tools you need to work with PDFs in one place. Your documents simplified, secured and transformed.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="max-w-md mx-auto lg:mx-0 relative group"
            >
              <div className="absolute inset-0 bg-brand-red/10 blur-xl rounded-full group-focus-within:bg-brand-red/20 transition-all" />
              <div className="relative flex items-center bg-white rounded-full shadow-xl border border-slate-100 p-2 group-focus-within:border-brand-red/50 transition-all">
                <Search className="w-6 h-6 text-slate-400 ml-4" />
                <input 
                  type="text" 
                  placeholder="Search tools (e.g. merge, compress, edit...)"
                  className="w-full bg-transparent border-none focus:ring-0 px-4 py-3 text-lg outline-none"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4"
            >
              <button className="bg-brand-red text-white px-8 py-4 rounded-2xl font-bold shadow-2xl shadow-brand-red/30 hover:bg-brand-dark transition-all transform hover:-translate-y-1 active:scale-95 flex items-center space-x-2">
                <span>Explore All Tools</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              <button className="bg-white text-slate-900 border border-slate-200 px-8 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl hover:bg-slate-50 transition-all transform hover:-translate-y-1 active:scale-95">
                How It Works
              </button>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="flex flex-wrap justify-center lg:justify-start gap-8 pt-4"
            >
              <div className="flex items-center space-x-3 text-slate-600">
                <Zap className="w-5 h-5 text-brand-red" />
                <span className="font-medium">100% Free To Use</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-600">
                <Shield className="w-5 h-5 text-brand-red" />
                <span className="font-medium">50+ Powerful Tools</span>
              </div>
              <div className="flex items-center space-x-3 text-slate-600">
                <Lock className="w-5 h-5 text-brand-red" />
                <span className="font-medium">Secure Your Files Safe</span>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Animated Sphere */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.5, type: 'spring' }}
            className="hidden lg:block relative"
          >
            <div className="w-[450px] h-[450px] rounded-full sphere-gradient animate-rotate-sphere relative overflow-hidden">
               {/* Glossy highlights */}
               <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/20 rounded-full blur-2xl" />
               <div className="absolute bottom-1/4 right-1/4 w-24 h-24 bg-red-400/30 rounded-full blur-2xl" />
            </div>
            
            {/* Glow blur behind */}
            <div className="absolute inset-0 bg-brand-red/40 rounded-full blur-[100px] -z-10 animate-pulse-glow" />
            
            {/* Floating assets around sphere */}
            <motion.div 
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 glass p-6 rounded-3xl shadow-2xl"
            >
              <Zap className="w-10 h-10 text-brand-red" />
            </motion.div>
            
            <motion.div 
              animate={{ y: [0, 20, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 1 }}
              className="absolute -bottom-10 -left-10 glass p-6 rounded-3xl shadow-2xl"
            >
              <Lock className="w-10 h-10 text-blue-500" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
