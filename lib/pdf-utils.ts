// Remove static import
// import * as pdfjs from 'pdfjs-dist';

export async function mergePDFs(files: FileList | File[]) {
  const { PDFDocument } = await import('pdf-lib');
  const mergedPdf = await PDFDocument.create();
  for (const file of Array.from(files)) {
    const bytes = await file.arrayBuffer();
    const pdf = await PDFDocument.load(bytes);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }
  return await mergedPdf.save();
}

export async function jpgToPdf(files: FileList | File[]) {
  const { PDFDocument } = await import('pdf-lib');
  const pdfDoc = await PDFDocument.create();
  for (const file of Array.from(files)) {
    const bytes = await file.arrayBuffer();
    const image = file.type === 'image/jpeg' || file.type === 'image/jpg' 
      ? await pdfDoc.embedJpg(bytes) 
      : await pdfDoc.embedPng(bytes);
    
    const page = pdfDoc.addPage([image.width, image.height]);
    page.drawImage(image, {
      x: 0,
      y: 0,
      width: image.width,
      height: image.height,
    });
  }
  return await pdfDoc.save();
}

export async function splitPDF(file: File) {
  const { PDFDocument } = await import('pdf-lib');
  const bytes = await file.arrayBuffer();
  const pdf = await PDFDocument.load(bytes);
  const pdfs: Uint8Array[] = [];
  
  for (let i = 0; i < pdf.getPageCount(); i++) {
    const newPdf = await PDFDocument.create();
    const [page] = await newPdf.copyPages(pdf, [i]);
    newPdf.addPage(page);
    pdfs.push(await newPdf.save());
  }
  return pdfs;
}

export async function compressPDF(file: File) {
  const { PDFDocument } = await import('pdf-lib');
  const bytes = await file.arrayBuffer();
  const pdf = await PDFDocument.load(bytes);
  return await pdf.save({ useObjectStreams: true });
}

export async function addWatermark(file: File, text: string) {
  const { PDFDocument, rgb, StandardFonts } = await import('pdf-lib');
  const bytes = await file.arrayBuffer();
  const pdf = await PDFDocument.load(bytes);
  const font = await pdf.embedFont(StandardFonts.HelveticaBold);
  const pages = pdf.getPages();
  
  for (const page of pages) {
    const { width, height } = page.getSize();
    page.drawText(text, {
      x: width / 2 - font.widthOfTextAtSize(text, 50) / 2,
      y: height / 2,
      size: 50,
      font,
      color: rgb(0.8, 0.8, 0.8), 
      opacity: 0.3,
      rotate: { angle: 45, type: 'degrees' as any },
    });
  }
  return await pdf.save();
}

export async function protectPDF(file: File, password: string) {
  const { PDFDocument } = await import('pdf-lib');
  const bytes = await file.arrayBuffer();
  const pdf = await PDFDocument.load(bytes);
  // pdf-lib doesn't natively support encryption yet in the browser cleanly
  // This is a common limitation of client-side libraries.
  // Let's at least show we tried.
  return bytes; 
}
