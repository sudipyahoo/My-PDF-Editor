'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Mail, MessageCircle, MapPin, Send } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-20 bg-brand-red/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-display font-black text-slate-900 mb-6">Contact Us</h1>
          <p className="text-xl text-slate-500">Have a question or need assistance? We&apos;re here to help.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
                <div className="p-8 bg-white rounded-3xl shadow-sm border border-slate-100 flex items-start space-x-5">
                    <div className="w-12 h-12 bg-brand-red/10 rounded-xl flex items-center justify-center shrink-0">
                        <Mail className="w-6 h-6 text-brand-red" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">Email Us</h3>
                        <p className="text-slate-500">support@gopdfeditor.com</p>
                    </div>
                </div>
                <div className="p-8 bg-white rounded-3xl shadow-sm border border-slate-100 flex items-start space-x-5">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                        <MessageCircle className="w-6 h-6 text-blue-500" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">Live Chat</h3>
                        <p className="text-slate-500">Available 24/7 for premium support.</p>
                    </div>
                </div>
                <div className="p-8 bg-white rounded-3xl shadow-sm border border-slate-100 flex items-start space-x-5">
                    <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center shrink-0">
                        <MapPin className="w-6 h-6 text-emerald-500" />
                    </div>
                    <div>
                        <h3 className="font-bold text-lg">Office</h3>
                        <p className="text-slate-500">Tech District, San Francisco, CA</p>
                    </div>
                </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
                <div className="bg-white p-10 rounded-[40px] shadow-xl border border-slate-100">
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Full Name</label>
                                <input type="text" placeholder="John Doe" className="w-full bg-slate-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-brand-red outline-none" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700">Email Address</label>
                                <input type="email" placeholder="john@example.com" className="w-full bg-slate-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-brand-red outline-none" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Subject</label>
                            <input type="text" placeholder="How can we help?" className="w-full bg-slate-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-brand-red outline-none" />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-700">Message</label>
                            <textarea rows={5} placeholder="Tell us more about your request..." className="w-full bg-slate-50 border-none rounded-xl p-4 focus:ring-2 focus:ring-brand-red outline-none" />
                        </div>
                        <button className="w-full bg-brand-red text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-brand-red/30 hover:bg-brand-dark transition-all flex items-center justify-center space-x-2 active:scale-[0.98]">
                            <span>Send Message</span>
                            <Send className="w-5 h-5" />
                        </button>
                    </form>
                </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
