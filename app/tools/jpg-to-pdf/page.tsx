'use client';

import React from 'react';
import { ToolPage } from '@/components/ToolPage';
import { PDF_TOOLS } from '@/lib/tools-data';
import { jpgToPdf } from '@/lib/pdf-utils';

export default function JpgToPdfPage() {
  const tool = PDF_TOOLS.find(t => t.id === 'jpg-to-pdf')!;

  const handleProcess = async (files: File[]) => {
    return await jpgToPdf(files);
  };

  return (
    <ToolPage 
      tool={tool}
      onProcess={handleProcess}
      accept="image/jpeg,image/png,image/jpg"
      multiple={true}
    />
  );
}
