'use client';

import React from 'react';
import { ToolPage } from '@/components/ToolPage';
import { PDF_TOOLS } from '@/lib/tools-data';
import { addWatermark } from '@/lib/pdf-utils';

export default function WatermarkPage() {
  const tool = PDF_TOOLS.find(t => t.id === 'watermark')!;

  const handleProcess = async (files: File[]) => {
    if (files.length === 0) return new Uint8Array();
    // Defaulting to "Gopdfeditor" as watermark text
    return await addWatermark(files[0], "Gopdfeditor");
  };

  return (
    <ToolPage 
      tool={tool}
      onProcess={handleProcess}
      multiple={false}
    />
  );
}
