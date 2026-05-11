'use client';

import React, { useState } from 'react';
import { ToolPage } from '@/components/ToolPage';
import { PDF_TOOLS } from '@/lib/tools-data';
import { PDFEditor } from '@/components/editing/PDFEditor';

export default function EditPdfPage() {
  const [editingFile, setEditingFile] = useState<File | null>(null);
  const tool = PDF_TOOLS.find(t => t.id === 'edit')!;

  const handleFileUpload = async (files: File[]) => {
    if (files.length > 0) {
      setEditingFile(files[0]);
    }
    // Return empty as we are handling it in state
    return new Uint8Array();
  };

  if (editingFile) {
    return <PDFEditor file={editingFile} onBack={() => setEditingFile(null)} />;
  }

  return (
    <ToolPage 
      tool={tool}
      onProcess={handleFileUpload}
      multiple={false}
      autoProcess={true}
    />
  );
}
