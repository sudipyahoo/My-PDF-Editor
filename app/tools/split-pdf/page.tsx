'use client';

import React from 'react';
import { ToolPage } from '@/components/ToolPage';
import { PDF_TOOLS } from '@/lib/tools-data';
import { splitPDF } from '@/lib/pdf-utils';

export default function SplitPdfPage() {
  const tool = PDF_TOOLS.find(t => t.id === 'split')!;

  const handleProcess = async (files: File[]) => {
    if (files.length === 0) return new Uint8Array();
    return await splitPDF(files[0]);
  };

  return (
    <ToolPage 
      tool={tool}
      onProcess={handleProcess}
      multiple={false}
    />
  );
}
