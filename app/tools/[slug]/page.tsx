'use client';

import React, { use } from 'react';
import { ToolPage } from '@/components/ToolPage';
import { PDF_TOOLS } from '@/lib/tools-data';
import { notFound } from 'next/navigation';
import { mergePDFs, splitPDF, jpgToPdf, compressPDF, addWatermark } from '@/lib/pdf-utils';

export default function DynamicToolPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const tool = PDF_TOOLS.find(t => t.href.endsWith(slug));

  if (!tool) {
    return notFound();
  }

  // Smarter processing logic based on tool ID
  const handleProcess = async (files: File[]) => {
    if (files.length === 0) return new Uint8Array();

    const { PDFDocument } = await import('pdf-lib');

    switch (tool.id) {
      case 'merge':
        return await mergePDFs(files);
      case 'split':
        return await splitPDF(files[0]);
      case 'compress':
        return await compressPDF(files[0]);
      case 'jpg-to-pdf':
      case 'png-to-pdf':
        return await jpgToPdf(files);
      case 'watermark':
        return await addWatermark(files[0], "Gopdfeditor");
      default:
        // Default: just re-save it which works for view, etc.
        const bytes = await files[0].arrayBuffer();
        const pdf = await PDFDocument.load(bytes);
        pdf.setProducer('Gopdfeditor');
        return await pdf.save();
    }
  };

  return (
    <ToolPage 
      tool={tool}
      onProcess={handleProcess}
      multiple={tool.category === 'Optimize PDF' || tool.category === 'View & Utility' ? false : true}
    />
  );
}
