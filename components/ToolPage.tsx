'use client';

import React, { useState, useRef } from 'react';
import { Upload, File, X, Download, Loader2, CheckCircle2, AlertCircle, ShieldCheck, Zap, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { Tool } from '@/lib/tools-data';

interface ToolPageProps {
  tool: Tool;
  onProcess: (files: File[]) => Promise<Uint8Array | Uint8Array[]>;
  accept?: string;
  multiple?: boolean;
  autoProcess?: boolean;
}

export function ToolPage({ tool, onProcess, accept = "application/pdf", multiple = true, autoProcess = false }: ToolPageProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [results, setResults] = useState<{ blob: Blob; name: string }[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFiles = multiple ? [...files, ...Array.from(e.target.files)] : [e.target.files[0]];
      setFiles(selectedFiles);
      if (autoProcess) {
        handleProcess(selectedFiles);
      }
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFiles = multiple ? [...files, ...Array.from(e.dataTransfer.files)] : [e.dataTransfer.files[0]];
      setFiles(droppedFiles);
      if (autoProcess) {
        handleProcess(droppedFiles);
      }
    }
  };

  const handleProcess = async (filesToProcess: File[] = files) => {
    if (filesToProcess.length === 0) return;
    setIsProcessing(true);
    setError(null);
    try {
      const data = await onProcess(files);
      if (Array.isArray(data)) {
        const res = data.map((d, i) => ({
          blob: new Blob([d as any], { type: 'application/pdf' }),
          name: `${tool.id}-part-${i + 1}.pdf`
        }));
        setResults(res);
      } else {
        setResults([{ 
          blob: new Blob([data as any], { type: 'application/pdf' }), 
          name: `${tool.id}-processed.pdf` 
        }]);
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred during processing. Please check if your files are valid.");
    } finally {
      setIsProcessing(false);
    }
  };

  const downloadFile = (blob: Blob, name: string) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = name;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      
      <div className="flex-1 pt-32 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <motion.div 
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="inline-flex p-4 bg-brand-red/10 rounded-2xl mb-4"
            >
              <tool.icon className="w-10 h-10 text-brand-red" />
            </motion.div>
            <h1 className="text-4xl font-display font-black text-slate-900">{tool.name}</h1>
            <p className="mt-4 text-lg text-slate-500">{tool.description}</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
            {/* Upload Area */}
            {files.length === 0 && !results && (
              <div 
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`p-16 text-center border-4 border-dashed m-6 rounded-2xl transition-all ${isDragging ? 'border-brand-red bg-brand-red/5 scale-[1.02]' : 'border-slate-100'}`}
              >
                <div className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                    <Upload className="w-10 h-10 text-slate-400" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Select files to upload</h3>
                  <p className="text-slate-500 mb-8">or drag and drop them here</p>
                  
                  <input 
                    type="file" 
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept={accept}
                    multiple={multiple}
                    className="hidden"
                  />
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-brand-red text-white px-10 py-4 rounded-xl font-bold shadow-xl shadow-brand-red/20 hover:bg-brand-dark transition-all active:scale-95"
                  >
                    Choose Files
                  </button>
                  <p className="mt-4 text-xs text-slate-400">Supported: {accept.split(',').join(', ')}</p>
                </div>
              </div>
            )}

            {/* File List */}
            {files.length > 0 && !results && !isProcessing && (
              <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold font-display">{files.length} Files Selected</h3>
                  <div className="flex space-x-2">
                    <button 
                       onClick={() => fileInputRef.current?.click()}
                       className="px-4 py-2 text-sm font-bold text-slate-600 hover:text-brand-red transition-colors"
                    >
                        Add more
                    </button>
                    <button 
                      onClick={() => setFiles([])}
                      className="px-4 py-2 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors"
                    >
                        Clear all
                    </button>
                  </div>
                </div>

                <div className="space-y-3 mb-8 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                  {files.map((file, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-between p-4 bg-slate-50 rounded-xl"
                    >
                      <div className="flex items-center space-x-4">
                        <File className="w-6 h-6 text-brand-red" />
                        <div>
                          <p className="text-sm font-bold text-slate-900 truncate max-w-[250px]">{file.name}</p>
                          <p className="text-xs text-slate-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                        </div>
                      </div>
                      <button onClick={() => removeFile(i)} className="p-2 hover:text-brand-red transition-colors">
                        <X className="w-5 h-5" />
                      </button>
                    </motion.div>
                  ))}
                </div>

                <button 
                  onClick={handleProcess}
                  disabled={isProcessing}
                  className="w-full bg-brand-red text-white py-5 rounded-2xl font-bold text-lg shadow-xl shadow-brand-red/30 hover:bg-brand-dark transition-all disabled:opacity-50"
                >
                  {isProcessing ? 'Processing...' : `Process ${tool.name}`}
                </button>
              </div>
            )}

            {/* Processing State */}
            {isProcessing && (
                <div className="p-20 flex flex-col items-center text-center">
                    <Loader2 className="w-16 h-16 text-brand-red animate-spin mb-6" />
                    <h3 className="text-2xl font-bold mb-2">Processing your files...</h3>
                    <p className="text-slate-500">This might take a moment depending on the file size.</p>
                </div>
            )}

            {/* Results State */}
            {results && !isProcessing && (
                <div className="p-10 text-center">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">Your files are ready!</h3>
                    <p className="text-slate-500 mb-10">You can now download your processed documents.</p>

                    <div className="grid grid-cols-1 gap-4 max-w-sm mx-auto">
                        {results.map((res, i) => (
                            <button 
                                key={i}
                                onClick={() => downloadFile(res.blob, res.name)}
                                className="flex items-center justify-between p-5 bg-emerald-50 rounded-2xl border border-emerald-100 hover:bg-emerald-100 transition-all group"
                            >
                                <span className="font-bold text-emerald-700 truncate mr-4">{res.name}</span>
                                <Download className="w-6 h-6 text-emerald-600 group-hover:scale-110 transition-transform" />
                            </button>
                        ))}
                    </div>

                    <button 
                        onClick={() => { setFiles([]); setResults(null); }}
                        className="mt-10 text-slate-400 font-bold hover:text-slate-600 hover:underline"
                    >
                        Process another file
                    </button>
                </div>
            )}

            {/* Error State */}
            {error && (
                <div className="p-8 bg-red-50 border-t border-red-100 flex items-start space-x-4">
                    <AlertCircle className="w-6 h-6 text-red-500 shrink-0" />
                    <p className="text-red-700 font-medium">{error}</p>
                </div>
            )}
          </div>

          {/* Social Proof & Info */}
          <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div className="space-y-4">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center mx-auto">
                      <ShieldCheck className="w-6 h-6 text-brand-red" />
                  </div>
                  <h4 className="font-bold">Total Privacy</h4>
                  <p className="text-sm text-slate-500">Your files are encrypted and automatically deleted from our servers.</p>
              </div>
              <div className="space-y-4">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center mx-auto">
                      <Zap className="w-6 h-6 text-brand-red" />
                  </div>
                  <h4 className="font-bold">Fast Processing</h4>
                  <p className="text-sm text-slate-500">Advanced algorithms ensure your PDF tasks are done in seconds.</p>
              </div>
              <div className="space-y-4">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-md flex items-center justify-center mx-auto">
                      <Star className="w-6 h-6 text-brand-red" />
                  </div>
                  <h4 className="font-bold">Free Forever</h4>
                  <p className="text-sm text-slate-500">Access all premium tools without any hidden costs or accounts.</p>
              </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
