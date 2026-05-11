'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-display font-black mb-6">Privacy Policy</h1>
          <p className="text-xl text-slate-400">Your privacy is our top priority. Learn how we handle your data.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate prose-lg">
          <p>
            Current version: May 2026
          </p>
          
          <h2>1. Information We Collect</h2>
          <p>
            Gopdfeditor is designed to process documents with minimal data retention. We collect:
          </p>
          <ul>
            <li>Files you upload for temporary processing.</li>
            <li>Basic usage analytics (anonymized).</li>
            <li>Communication data if you contact us.</li>
          </ul>

          <h2>2. How We Handle Your Files</h2>
          <p>
            When you upload a file to Gopdfeditor:
          </p>
          <ul>
            <li>Your file is encrypted during transit using SSL.</li>
            <li>Processing happens on secured servers or entirely within your browser (where possible).</li>
            <li>All uploaded files and their processed versions are <strong>automatically deleted</strong> from our servers after 1 hour.</li>
          </ul>

          <h2>3. Cookie Policy</h2>
          <p>
            We use &quot;cookies&quot; to collect information and improve our services. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
          </p>

          <h2>4. Data Security</h2>
          <p>
            The security of your data is important to us, but remember that no method of transmission over the Internet, or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your Personal Information, we cannot guarantee its absolute security.
          </p>

          <h2>5. GDPR Compliance</h2>
          <p>
            We respect your right to privacy and are committed to complying with the General Data Protection Regulation (GDPR). Users from the European Union have the right to access, delete, and correct their data.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
