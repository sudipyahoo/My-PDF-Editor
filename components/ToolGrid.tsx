'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Tool } from '@/lib/tools-data';

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  const Icon = tool.icon;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
    >
      <Link href={tool.href} className="block p-6 bg-white rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-brand-red/20 transition-all duration-300">
        <div className="flex items-start space-x-5">
          <div className="w-14 h-14 bg-slate-50 group-hover:bg-brand-red/5 rounded-2xl flex items-center justify-center transition-colors">
            <Icon className="w-7 h-7 text-brand-red" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-brand-red transition-colors">{tool.name}</h3>
            <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">
              {tool.description}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export function ToolGrid({ title, tools, className = "" }: { title: string; tools: Tool[]; className?: string }) {
  return (
    <section className={`mb-12 ${className}`}>
      <h2 className="text-xs font-black uppercase tracking-[0.2em] text-brand-red mb-8 pl-1">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {tools.map((tool) => (
          <ToolCard key={tool.id} tool={tool} />
        ))}
      </div>
    </section>
  );
}
