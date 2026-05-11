import { 
  FileText, Files, FileSearch, Trash2, RotateCw, Crop, Layout, 
  FileDown, FileUp, FileImage, Type, Hash, Globe, 
  Lock, Unlock, Signature, ShieldCheck, PenTool, 
  Eye, BookOpen, Settings, Diff, FileArchive
} from 'lucide-react';

export type ToolCategory = 
  | 'Edit & Manage' 
  | 'Convert From PDF' 
  | 'Convert To PDF' 
  | 'Optimize PDF' 
  | 'Security & Sign' 
  | 'Extract & Other' 
  | 'View & Utility';

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: ToolCategory;
  icon: any;
  href: string;
}

export const PDF_TOOLS: Tool[] = [
  // EDIT & MANAGE
  { id: 'edit', name: 'Edit PDF', description: 'Edit text, images, links in your PDF files', category: 'Edit & Manage', icon: FileText, href: '/tools/edit-pdf' },
  { id: 'delete', name: 'Delete Pages', description: 'Remove one or more pages from PDF', category: 'Edit & Manage', icon: Trash2, href: '/tools/delete-pages' },
  { id: 'rotate', name: 'Rotate PDF', description: 'Rotate pages in your PDF files', category: 'Edit & Manage', icon: RotateCw, href: '/tools/rotate-pdf' },
  { id: 'crop', name: 'Crop PDF', description: 'Crop PDF margins with ease', category: 'Edit & Manage', icon: Crop, href: '/tools/crop-pdf' },
  { id: 'organize', name: 'Organize PDF', description: 'Reorder, add or remove PDF pages', category: 'Edit & Manage', icon: Layout, href: '/tools/organize-pdf' },

  // CONVERT FROM PDF
  { id: 'pdf-to-word', name: 'PDF to Word', description: 'Convert PDF to DOCX files', category: 'Convert From PDF', icon: FileDown, href: '/tools/pdf-to-word' },
  { id: 'pdf-to-excel', name: 'PDF to Excel', description: 'Convert PDF to XLSX files', category: 'Convert From PDF', icon: FileDown, href: '/tools/pdf-to-excel' },
  { id: 'pdf-to-ppt', name: 'PDF to PPT', description: 'Convert PDF to PowerPoint', category: 'Convert From PDF', icon: FileDown, href: '/tools/pdf-to-ppt' },
  { id: 'pdf-to-jpg', name: 'PDF to JPG', description: 'Convert PDF pages to images', category: 'Convert From PDF', icon: FileImage, href: '/tools/pdf-to-jpg' },
  { id: 'pdf-to-png', name: 'PDF to PNG', description: 'Convert PDF pages to PNG images', category: 'Convert From PDF', icon: FileImage, href: '/tools/pdf-to-png' },

  // CONVERT TO PDF
  { id: 'word-to-pdf', name: 'Word to PDF', description: 'Convert Word docs to PDF', category: 'Convert To PDF', icon: FileUp, href: '/tools/word-to-pdf' },
  { id: 'excel-to-pdf', name: 'Excel to PDF', description: 'Convert Excel sheets to PDF', category: 'Convert To PDF', icon: FileUp, href: '/tools/excel-to-pdf' },
  { id: 'ppt-to-pdf', name: 'PPT to PDF', description: 'Convert PowerPoint to PDF', category: 'Convert To PDF', icon: FileUp, href: '/tools/ppt-to-pdf' },
  { id: 'jpg-to-pdf', name: 'JPG to PDF', description: 'Convert images to PDF', category: 'Convert To PDF', icon: FileImage, href: '/tools/jpg-to-pdf' },
  { id: 'png-to-pdf', name: 'PNG to PDF', description: 'Convert PNG images to PDF', category: 'Convert To PDF', icon: FileImage, href: '/tools/png-to-pdf' },

  // OPTIMIZE PDF
  { id: 'compress', name: 'Compress PDF', description: 'Reduce PDF file size', category: 'Optimize PDF', icon: FileArchive, href: '/tools/compress-pdf' },
  { id: 'merge', name: 'Merge PDF', description: 'Combine multiple PDFs into one', category: 'Optimize PDF', icon: Files, href: '/tools/merge-pdf' },
  { id: 'split', name: 'Split PDF', description: 'Split PDF into multiple files', category: 'Optimize PDF', icon: Files, href: '/tools/split-pdf' },
  { id: 'remove-password', name: 'Remove Password', description: 'Remove password protection', category: 'Optimize PDF', icon: Unlock, href: '/tools/remove-password' },
  { id: 'protect-pdf', name: 'Protect PDF', description: 'Add password protection', category: 'Optimize PDF', icon: Lock, href: '/tools/protect-pdf' },

  // SECURITY & SIGN
  { id: 'sign-pdf', name: 'Sign PDF', description: 'Add signature to your PDF', category: 'Security & Sign', icon: Signature, href: '/tools/sign-pdf' },
  { id: 'watermark', name: 'Watermark', description: 'Add text or image watermark', category: 'Security & Sign', icon: PenTool, href: '/tools/watermark' },
  { id: 'unlock-pdf', name: 'Unlock PDF', description: 'Unlock protected PDF files', category: 'Security & Sign', icon: Unlock, href: '/tools/unlock-pdf' },
  { id: 'redact-pdf', name: 'Redact PDF', description: 'Permanently remove sensitive content', category: 'Security & Sign', icon: Trash2, href: '/tools/redact-pdf' },
  { id: 'verify-pdf', name: 'Verify PDF', description: 'Verify authenticity of PDF', category: 'Security & Sign', icon: ShieldCheck, href: '/tools/verify-pdf' },

  // EXTRACT & OTHER
  { id: 'extract-pages', name: 'Extract Pages', description: 'Extract pages from PDF', category: 'Extract & Other', icon: Files, href: '/tools/extract-pages' },
  { id: 'extract-images', name: 'Extract Images', description: 'Extract images from PDF', category: 'Extract & Other', icon: FileImage, href: '/tools/extract-images' },
  { id: 'extract-text', name: 'Extract Text', description: 'Extract text from PDF', category: 'Extract & Other', icon: Type, href: '/tools/extract-text' },
  { id: 'page-numbers', name: 'Page Numbers', description: 'Add page numbers to PDF', category: 'Extract & Other', icon: Hash, href: '/tools/page-numbers' },
  { id: 'html-to-pdf', name: 'HTML to PDF', description: 'Convert HTML webpages to PDF', category: 'Extract & Other', icon: Globe, href: '/tools/html-to-pdf' },

  // VIEW & UTILITY
  { id: 'view-pdf', name: 'View PDF', description: 'Open and view PDF files', category: 'View & Utility', icon: Eye, href: '/tools/view-pdf' },
  { id: 'pdf-reader', name: 'PDF Reader', description: 'Read PDF files online', category: 'View & Utility', icon: BookOpen, href: '/tools/pdf-reader' },
  { id: 'metadata', name: 'Metadata', description: 'View and edit PDF metadata', category: 'View & Utility', icon: Settings, href: '/tools/metadata' },
  { id: 'pdf-to-pdfa', name: 'PDF to PDF/A', description: 'Convert PDF to PDF/A format', category: 'View & Utility', icon: FileArchive, href: '/tools/pdf-to-pdfa' },
  { id: 'compare-pdf', name: 'Compare PDF', description: 'Compare two PDF files', category: 'View & Utility', icon: Diff, href: '/tools/compare-pdf' },
];
