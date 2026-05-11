'use client';

import React from 'react';
import { ToolPage } from '@/components/ToolPage';
import { PDF_TOOLS } from '@/lib/tools-data';
import { mergePDFs } from '@/lib/pdf-utils';

export default function MergePdfPage() {
  const tool = PDF_TOOLS.find(t => t.id === 'merge')!;

  const handleProcess = async (files: File[]) => {
    return await mergePDFs(files);
  };

  return (
    <ToolPage 
      tool={tool}
      onProcess={handleProcess}
      multiple={true}
    />
  );
}
