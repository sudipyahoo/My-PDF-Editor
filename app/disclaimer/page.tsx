'use client';

import React from 'react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-20 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-display font-black mb-6">Disclaimer</h1>
          <p className="text-xl text-slate-400">Important notices regarding the use of Gopdfeditor.</p>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate prose-lg">
          <h2>1. General Disclaimer</h2>
          <p>
            The information and tools provided by Gopdfeditor are for general informational purposes only. All tools on the site are provided &quot;as is&quot; and &quot;as available,&quot; without any warranties of any kind.
          </p>

          <h2>2. Tool Accuracy noticed</h2>
          <p>
            While we strive for 100% accuracy in document conversion and editing, Gopdfeditor cannot guarantee that every processed file will be a perfect representation of the original. Complexity in layouts, fonts, and embedded assets may lead to variations in the results.
          </p>

          <h2>3. Limitation of Liability</h2>
          <p>
            In no event shall Gopdfeditor, nor its directors, employees, partners, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, or other intangible losses, resulting from your use of the service.
          </p>

          <h2>4. External Links Disclaimer</h2>
          <p>
            Our service may contain links to third-party web sites or services that are not owned or controlled by Gopdfeditor. We assume no responsibility for the content, privacy policies, or practices of any third-party websites.
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
