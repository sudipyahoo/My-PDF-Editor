'use client';

import React from 'react';
import { ToolPage } from '@/components/ToolPage';
import { PDF_TOOLS } from '@/lib/tools-data';
import { compressPDF } from '@/lib/pdf-utils';

export default function CompressPdfPage() {
  const tool = PDF_TOOLS.find(t => t.id === 'compress')!;

  const handleProcess = async (files: File[]) => {
    if (files.length === 0) return new Uint8Array();
    return await compressPDF(files[0]);
  };

  return (
    <ToolPage 
      tool={tool}
      onProcess={handleProcess}
      multiple={false}
    />
  );
}
