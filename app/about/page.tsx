'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Shield, Target, Users, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-display font-black text-slate-900 mb-6">About Us</h1>
          <p className="text-xl text-slate-500">The story behind the world&apos;s favorite free PDF web toolkit.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold font-display">Our Mission</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                At Gopdfeditor, our mission is simple: to make document management accessible to everyone. We believe that professional PDF tools shouldn&apos;t be locked behind expensive subscriptions or complex installations.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                We&apos;ve built a suite of over 50 tools that run entirely in your browser, ensuring that your data stays private and your tasks get done in seconds.
              </p>
            </div>
            <div className="bg-brand-red/5 p-12 rounded-[50px] transform -rotate-2">
                <div className="grid grid-cols-2 gap-6">
                    {[
                        { icon: Users, label: '12K+ Users', color: 'text-brand-red' },
                        { icon: Zap, label: '50+ Tools', color: 'text-blue-500' },
                        { icon: Shield, label: '100% Private', color: 'text-emerald-500' },
                        { icon: Target, label: 'Global Reach', color: 'text-orange-500' }
                    ].map((item, i) => (
                        <div key={i} className="bg-white p-6 rounded-3xl shadow-sm flex flex-col items-center space-y-3">
                            <item.icon className={`w-8 h-8 ${item.color}`} />
                            <span className="font-bold whitespace-nowrap">{item.label}</span>
                        </div>
                    ))}
                </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-slate-900 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-8">
              <h2 className="text-4xl font-display font-black">Why Trust Us?</h2>
              <p className="text-slate-400 text-lg">
                  We take privacy seriously. All file transfers are encrypted with SSL (Secure Sockets Layer) and we automatically delete your files from our servers within 1 hour of processing. Your documents are yours alone.
              </p>
              <div className="flex justify-center space-x-12">
                  <div className="text-center">
                      <h3 className="text-3xl font-display font-black text-brand-red">99.9%</h3>
                      <p className="text-sm text-slate-500">Uptime</p>
                  </div>
                  <div className="text-center">
                      <h3 className="text-3xl font-display font-black text-brand-red">Secured</h3>
                      <p className="text-sm text-slate-500">Environment</p>
                  </div>
                  <div className="text-center">
                      <h3 className="text-3xl font-display font-black text-brand-red">Fast</h3>
                      <p className="text-sm text-slate-500">Processing</p>
                  </div>
              </div>
          </div>
      </section>

      <Footer />
    </main>
  );
}
