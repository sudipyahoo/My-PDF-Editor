'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  MousePointer2, Type, Eraser, Highlighter, Square, 
  Image as ImageIcon, ArrowRight, Pencil, X, Check, 
  MoreHorizontal, Undo2, Redo2, FileEdit, Signature,
  Upload, Printer, Download, ArrowLeftRight, CheckCircle2,
  StickyNote, Search, LayoutGrid, ChevronUp, ChevronDown, FitToScreen
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import * as pdfjs from 'pdfjs-dist';
import { fabric } from 'fabric';

// Configure pdfjs worker
if (typeof window !== 'undefined') {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
}

interface PDFEditorProps {
  file: File;
  onBack: () => void;
}

type Tool = 'selection' | 'edit' | 'sign' | 'text' | 'erase' | 'highlight' | 'redact' | 'image' | 'arrow' | 'draw' | 'cross' | 'check' | 'more';

export function PDFEditor({ file, onBack }: PDFEditorProps) {
  const [activeTool, setActiveTool] = useState<Tool>('selection');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [zoom, setZoom] = useState(100);
  const [isRendering, setIsRendering] = useState(true);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricCanvasRef = useRef<fabric.Canvas | null>(null);
  const pdfRef = useRef<pdfjs.PDFDocumentProxy | null>(null);

  // Initialize Fabric Canvas
  useEffect(() => {
    if (!canvasRef.current) return;

    const fabricCanvas = new fabric.Canvas(canvasRef.current, {
      width: 800,
      height: 1100,
      backgroundColor: 'white'
    });

    fabricCanvasRef.current = fabricCanvas;

    return () => {
      fabricCanvas.dispose();
    };
  }, []);

  // Load PDF and render initial page
  useEffect(() => {
    const loadPdf = async () => {
      const arrayBuffer = await file.arrayBuffer();
      const loadingTask = pdfjs.getDocument(arrayBuffer);
      const pdf = await loadingTask.promise;
      pdfRef.current = pdf;
      setTotalPages(pdf.numPages);
      renderPage(1);
    };

    loadPdf();
  }, [file]);

  const renderPage = async (pageNum: number) => {
    if (!pdfRef.current || !fabricCanvasRef.current) return;
    setIsRendering(true);
    
    try {
      const page = await pdfRef.current.getPage(pageNum);
      const viewport = page.getViewport({ scale: 2 }); // High res rendering
      
      const tempCanvas = document.createElement('canvas');
      const context = tempCanvas.getContext('2d');
      tempCanvas.height = viewport.height;
      tempCanvas.width = viewport.width;

      if (context) {
        await page.render({ canvasContext: context, viewport }).promise;
        
        const imgData = tempCanvas.toDataURL('image/png');
        
        fabric.Image.fromURL(imgData, (img) => {
          if (!fabricCanvasRef.current) return;
          
          fabricCanvasRef.current.clear();
          fabricCanvasRef.current.setDimensions({
            width: viewport.width / 2,
            height: viewport.height / 2
          });
          
          img.set({
            selectable: false,
            evented: false,
            scaleX: 0.5,
            scaleY: 0.5,
          });
          
          fabricCanvasRef.current.add(img);
          fabricCanvasRef.current.sendToBack(img);
          fabricCanvasRef.current.renderAll();
          setIsRendering(false);
        });
      }
    } catch (error) {
      console.error('Error rendering page:', error);
      setIsRendering(false);
    }
  };

  const changePage = (offset: number) => {
    const newPage = Math.max(1, Math.min(totalPages, currentPage + offset));
    if (newPage !== currentPage) {
      setCurrentPage(newPage);
      renderPage(newPage);
    }
  };

  const handleToolSelection = (tool: Tool) => {
    setActiveTool(tool);
    if (!fabricCanvasRef.current) return;

    fabricCanvasRef.current.isDrawingMode = tool === 'draw';
    
    // Reset selection based on tool
    if (tool !== 'selection') {
      fabricCanvasRef.current.discardActiveObject().renderAll();
    }
  };

  return (
    <div className="fixed inset-0 bg-slate-100 z-[60] flex flex-col h-screen overflow-hidden">
      {/* Top Navbar */}
      <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center space-x-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-50 rounded-lg transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-brand-red rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm italic">G</span>
            </div>
            <span className="font-display font-bold text-lg hidden md:block">Files Editor</span>
          </div>
          <div className="h-6 w-px bg-slate-200 mx-2" />
          <div className="flex items-center space-x-2 text-sm text-slate-500">
             <div className="w-4 h-4 bg-emerald-50 rounded-full flex items-center justify-center">
                <Check className="w-3 h-3 text-emerald-500" />
             </div>
             <span className="truncate max-w-[200px]">{file.name}</span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 hover:bg-slate-50 rounded-lg text-sm font-bold text-slate-700 transition-colors">
            <Upload className="w-4 h-4" />
            <span className="hidden sm:inline">Upload New</span>
          </button>
          <div className="flex items-center space-x-1">
             <button className="p-2 hover:bg-slate-50 rounded-lg transition-colors">
                <Printer className="w-5 h-5 text-slate-600" />
             </button>
             <button className="p-2 hover:bg-slate-50 rounded-lg transition-colors">
                <Download className="w-5 h-5 text-slate-600" />
             </button>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 hover:bg-slate-50 rounded-lg text-sm font-bold text-slate-700 border border-slate-200 transition-colors">
             <ArrowLeftRight className="w-4 h-4" />
             <span>Convert</span>
          </button>
          <button className="bg-brand-red text-white px-6 py-2 rounded-lg font-bold shadow-lg shadow-brand-red/20 hover:bg-brand-dark transition-all flex items-center space-x-2 active:scale-95">
             <CheckCircle2 className="w-4 h-4" />
             <span>DONE</span>
          </button>
        </div>
      </header>

      {/* Toolbar */}
      <div className="bg-white border-b border-slate-200 py-2 px-6 flex items-center justify-between shrink-0 overflow-x-auto no-scrollbar">
        <div className="flex items-center space-x-2 pr-6 border-r border-slate-100">
          <button className="flex flex-col items-center p-2 text-slate-400 hover:text-slate-600">
            <Undo2 className="w-5 h-5" />
            <span className="text-[10px] font-bold">Undo</span>
          </button>
          <button className="flex flex-col items-center p-2 text-slate-400 hover:text-slate-600">
            <Redo2 className="w-5 h-5" />
            <span className="text-[10px] font-bold">Redo</span>
          </button>
        </div>

        <div className="flex items-center space-x-1 px-4">
          <ToolButton 
            active={activeTool === 'selection'} 
            onClick={() => handleToolSelection('selection')}
            icon={MousePointer2} 
            label="Selection"
            variant="ghost"
          />
          <ToolButton 
            active={activeTool === 'edit'} 
            onClick={() => handleToolSelection('edit')}
            icon={FileEdit} 
            label="Edit PDF" 
            variant="ghost"
          />
          <ToolButton 
            active={activeTool === 'sign'} 
            onClick={() => handleToolSelection('sign')}
            icon={Signature} 
            label="Sign" 
            variant="ghost"
          />
          
          <div className="h-10 w-px bg-slate-100 mx-2" />

          <ToolButton 
            active={activeTool === 'text'} 
            onClick={() => handleToolSelection('text')}
            icon={Type} 
            label="Text" 
          />
          <ToolButton 
            active={activeTool === 'erase'} 
            onClick={() => handleToolSelection('erase')}
            icon={Eraser} 
            label="Erase" 
          />
          <ToolButton 
            active={activeTool === 'highlight'} 
            onClick={() => handleToolSelection('highlight')}
            icon={Highlighter} 
            label="Highlight" 
          />
          <ToolButton 
            active={activeTool === 'redact'} 
            onClick={() => handleToolSelection('redact')}
            icon={Square} 
            label="Redact" 
            isRedact
          />

          <div className="h-10 w-px bg-slate-100 mx-2" />

          <ToolButton 
            active={activeTool === 'image'} 
            onClick={() => handleToolSelection('image')}
            icon={ImageIcon} 
            label="Image" 
          />
          <ToolButton 
            active={activeTool === 'arrow'} 
            onClick={() => handleToolSelection('arrow')}
            icon={ArrowRight} 
            label="Arrow" 
          />
          <ToolButton 
            active={activeTool === 'draw'} 
            onClick={() => handleToolSelection('draw')}
            icon={Pencil} 
            label="Draw" 
          />
          <ToolButton 
            active={activeTool === 'cross'} 
            onClick={() => handleToolSelection('cross')}
            icon={X} 
            label="Cross" 
          />
          <ToolButton 
            active={activeTool === 'check'} 
            onClick={() => handleToolSelection('check')}
            icon={Check} 
            label="Check" 
          />
          <ToolButton 
            active={activeTool === 'more'} 
            onClick={() => handleToolSelection('more')}
            icon={MoreHorizontal} 
            label="More" 
            hasDropdown
          />
        </div>

        <div className="flex items-center space-x-4 pl-6 border-l border-slate-100">
           <div className="text-center group cursor-pointer">
              <StickyNote className="w-5 h-5 text-slate-400 mx-auto group-hover:text-emerald-500 transition-colors" />
              <span className="text-[10px] font-bold text-slate-400 group-hover:text-slate-600">Sticky</span>
           </div>
           <div className="text-center group cursor-pointer">
              <Search className="w-5 h-5 text-slate-400 mx-auto group-hover:text-brand-red transition-colors" />
              <span className="text-[10px] font-bold text-slate-400 group-hover:text-slate-600">Search</span>
           </div>
           <div className="text-center group cursor-pointer">
              <LayoutGrid className="w-5 h-5 text-slate-400 mx-auto group-hover:text-blue-500 transition-colors" />
              <span className="text-[10px] font-bold text-slate-400 group-hover:text-slate-600">More tools</span>
           </div>
        </div>
      </div>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Sidebar */}
        <aside className="w-16 bg-white border-r border-slate-200 flex flex-col items-center py-6 space-y-6">
           <button className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:text-brand-red transition-colors">
              <LayoutGrid className="w-6 h-6" />
           </button>
           <button className="p-2 text-slate-400 rounded-lg hover:text-brand-red transition-colors">
              <CheckCircle2 className="w-6 h-6" />
           </button>
           <button className="p-2 text-slate-400 rounded-lg hover:text-brand-red transition-colors">
              <Type className="w-6 h-6" />
           </button>
        </aside>

        {/* Editor Area */}
        <div className="flex-1 bg-slate-100 flex flex-col items-center overflow-y-auto p-12 relative h-full">
           <AnimatePresence>
             {isRendering && (
               <motion.div 
                 initial={{ opacity: 0 }} 
                 animate={{ opacity: 1 }} 
                 exit={{ opacity: 0 }}
                 className="absolute inset-0 z-50 flex items-center justify-center bg-white/50 backdrop-blur-sm"
               >
                 <div className="flex flex-col items-center">
                   <div className="w-12 h-12 border-4 border-brand-red border-t-transparent rounded-full animate-spin mb-4" />
                   <p className="font-bold text-slate-900">Rendering Page...</p>
                 </div>
               </motion.div>
             )}
           </AnimatePresence>

           <div className="bg-white shadow-2xl rounded-sm relative" id="canvas-container">
             <canvas ref={canvasRef} />
           </div>

           {/* Pagination and Zoom Controls */}
           <div className="fixed bottom-10 left-1/2 -translate-x-1/2 glass px-6 py-3 rounded-2xl shadow-2xl border border-slate-200 flex items-center space-x-8 z-[70]">
              <div className="flex items-center space-x-3 bg-white rounded-xl px-4 py-2 border border-slate-100 shadow-sm">
                <button onClick={() => changePage(-1)} disabled={currentPage <= 1} className="p-1 hover:bg-slate-50 rounded-md text-slate-500 disabled:opacity-30">
                  <ChevronUp className="w-5 h-5" />
                </button>
                <div className="flex items-center space-x-2 text-sm font-bold">
                   <span className="text-slate-900">{currentPage}</span>
                   <span className="text-slate-300">/</span>
                   <span className="text-slate-500">{totalPages}</span>
                </div>
                <button onClick={() => changePage(1)} disabled={currentPage >= totalPages} className="p-1 hover:bg-slate-50 rounded-md text-slate-500 disabled:opacity-30">
                  <ChevronDown className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center space-x-4">
                 <div className="flex items-center bg-white rounded-xl px-4 py-2 border border-slate-100 shadow-sm">
                    <button className="p-1 hover:bg-slate-50 rounded-md text-slate-500">
                      <X className="w-4 h-4" /> {/* Zoom out placeholder */}
                    </button>
                    <span className="mx-3 text-sm font-bold w-12 text-center">{zoom}%</span>
                    <button className="p-1 hover:bg-slate-50 rounded-md text-slate-500">
                      <Check className="w-4 h-4" /> {/* Zoom in placeholder */}
                    </button>
                 </div>
                 <button className="flex items-center bg-white rounded-xl px-4 py-2 border border-slate-100 shadow-sm text-sm font-bold text-slate-700 hover:bg-slate-50">
                    <FitToScreen className="w-4 h-4 mr-2" />
                    <span>Fit</span>
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

function ToolButton({ 
  active, 
  onClick, 
  icon: Icon, 
  label, 
  hasDropdown, 
  isRedact, 
  variant = 'normal' 
}: any) {
  return (
    <button 
      onClick={onClick}
      className={`
        flex flex-col items-center px-4 py-2 rounded-xl transition-all relative
        ${active ? (variant === 'ghost' ? 'bg-brand-red/10 text-brand-red' : 'bg-slate-100 text-slate-900 border border-slate-200 shadow-sm') : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'}
        ${isRedact && active ? 'bg-slate-900 text-white' : ''}
      `}
    >
      <div className="relative">
        <Icon className={`w-6 h-6 mb-1 ${active && !isRedact && variant === 'ghost' ? 'text-brand-red' : ''}`} />
        {hasDropdown && <ChevronDown className="w-3 h-3 absolute -right-3 top-1/2 -translate-y-1/2 opacity-50" />}
      </div>
      <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
      {active && (
        <motion.div 
          layoutId="tool-active" 
          className="absolute -bottom-1 left-4 right-4 h-0.5 bg-brand-red rounded-full" 
        />
      )}
    </button>
  );
}
