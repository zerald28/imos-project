import React, { useState, useRef,useEffect } from "react";
import { Rnd } from "react-rnd";
import axios from "axios";
import { Printer, X } from "lucide-react";

interface SignatureEditorProps {
    showSignature?: boolean; // <-- new prop
  signaturePath: string;
  initialX: number;
  initialY: number;
  initialWidth: number;
  initialHeight: number;
  onSave: (x: number, y: number, width: number, height: number) => void;
  onClose: () => void;
  pdfId: number;
}

const SignatureEditor: React.FC<SignatureEditorProps> = ({
  showSignature = true, // 👈 fallback
  signaturePath,
  initialX,
  initialY,
  initialWidth,
  initialHeight,
  onSave,
  onClose,
  pdfId,
}) => {

  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: initialX, y: initialY });
  const [size, setSize] = useState({ width: initialWidth, height: initialHeight });
  const [pdfOffset, setPdfOffset] = useState({ top: 0, left: 0, scale: 1 });
  const pdfIframeRef = useRef<HTMLIFrameElement>(null);
  const pdfImageRef = useRef<HTMLImageElement>(null);

  const detectPdfMetrics = () => {
    const iframe = pdfIframeRef.current;
    if (!iframe) return;

    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!iframeDoc) return;

    // Find the actual PDF element (Dompdf renders into a <img> or <canvas>)
    const pdfElement = iframeDoc.querySelector("img, canvas, svg");
    if (!pdfElement) return;

    const rect = pdfElement.getBoundingClientRect();
    const containerRect = iframe.getBoundingClientRect();

    const left = rect.left - containerRect.left;
    const top = rect.top - containerRect.top;

    // Real PDF size (A4)
    const realWidth = 595; // PDF width points
    const scale = realWidth / rect.width;

    setPdfOffset({ top, left, scale });
  };

  // Detect when iframe loads
  useEffect(() => {
    const iframe = pdfIframeRef.current;
    if (!iframe) return;

    iframe.onload = () => detectPdfMetrics();
  }, []);

  useEffect(() => {
    if (!pdfOffset.scale) return;

    setPos({
      x: (initialX / pdfOffset.scale) + pdfOffset.left,
      y: (initialY / pdfOffset.scale) + pdfOffset.top,
    });

    setSize({
      width: initialWidth / pdfOffset.scale,
      height: initialHeight / pdfOffset.scale,
    });
  }, [initialX, initialY, initialWidth, initialHeight, pdfOffset]);

  const aspectRatio = initialWidth / initialHeight;

  // Scale functions
  const increaseSize = () => {
    setSize(prev => {
      const newWidth = prev.width * 1.05;
      return {
        width: newWidth,
        height: newWidth / aspectRatio,
      };
    });
  };

  const decreaseSize = () => {
    setSize(prev => {
      const newWidth = prev.width * 0.95;
      return {
        width: newWidth,
        height: newWidth / aspectRatio,
      };
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="relative w-[80%] h-[90%] bg-white rounded-lg p-4">

        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-lg font-bold"
          onClick={onClose}
        >
          ✕
        </button>

        {/* Scrollable container */}
        <div
          ref={containerRef}
          className="relative w-full h-full overflow-scroll border"
        >
          {/* TALL CONTAINER - must match PDF height */}
          <div className="relative" style={{ width: "100%", height: "2500px" }}>
            
            {/* PDF */}
            <iframe
              ref={pdfIframeRef}
              src={`/insurance/${pdfId}/pdf/preview`}
              width="100%"
              height="100%"
              style={{ border: "none" }}
            />

            {/* Draggable Signature */}
            {showSignature && (
  <Rnd
    size={{ width: size.width, height: size.height }}
    position={{ x: pos.x, y: pos.y }}
    onDragStop={(e, d) => setPos({ x: d.x, y: d.y })}
    enableResizing={false}
    bounds="parent"
  >
    <div className="relative w-full h-full">
      <div 
        className="absolute inset-0 bg-blue-50/30 border-2 border-blue-300/50 rounded pointer-events-none"
        style={{ backdropFilter: 'blur(1px)' }}
      />
      <img
        src={signaturePath}
        alt="Signature"
        className="w-full h-full pointer-events-none select-none relative z-10"
        style={{ filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.1))' }}
      />
      <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex gap-1 z-20">
        <button onClick={increaseSize} className="px-2 py-1 bg-gray-400 text-white rounded">+</button>
        <button onClick={decreaseSize} className="px-2 py-1 bg-gray-300 text-white rounded">–</button>
      </div>
    </div>
  </Rnd>
)}


          </div>
        </div>

        {/* Save Button */}
        <div className="absolute bottom-4 right-4 flex gap-2">
          {/* Save */}
           <button
    className="px-4 py-2 bg-sidebar-primary hover:bg-sidebar-primary/90 text-white rounded flex items-center gap-2"
    onClick={async () => {
      const realX = (pos.x - pdfOffset.left) * pdfOffset.scale;
      const realY = (pos.y - pdfOffset.top) * pdfOffset.scale;
      const realWidth = size.width * pdfOffset.scale;
      const realHeight = size.height * pdfOffset.scale;

      try {
        // First save the signature position
        await axios.post(`/insurance/signature/${pdfId}/save`, { 
          x: realX, 
          y: realY, 
          width: realWidth, 
          height: realHeight 
        });
        
        // Then fetch the PDF as blob and print it
        const response = await axios.get(`/insurance/${pdfId}/pdf/download`, {
          responseType: 'blob'
        });
        
        // Create blob URL
        const blob = new Blob([response.data], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        
        // Open in new window and trigger print
        const printWindow = window.open(url, '_blank');
        if (printWindow) {
          printWindow.onload = () => {
            printWindow.print();
            // Optional: Close after print or keep open
            // printWindow.onafterprint = () => printWindow.close();
          };
        }
        
        // Call onSave callback if needed
        onSave(realX, realY, realWidth, realHeight);
        
      } catch (error) {
        console.error("Failed to save or print:", error);
        alert("Failed to save signature or print document");
      }
    }}
  >
    <Printer size={18} />
    <span>Save & Print</span>
  </button>
          
          {/* Save Only Button */}
          <button
            className="px-4 py-2 bg-green-300 hover:bg-sidebar-primary text-white rounded flex items-center gap-2 transition-colors"
            onClick={() => {
              const realX = (pos.x - pdfOffset.left) * pdfOffset.scale;
              const realY = (pos.y - pdfOffset.top) * pdfOffset.scale;
              const realWidth = size.width * pdfOffset.scale;
              const realHeight = size.height * pdfOffset.scale;

              // POST coordinates only
              axios.post(`/insurance/signature/${pdfId}/save`, { 
                x: realX, 
                y: realY, 
                width: realWidth, 
                height: realHeight 
              })
                .then(() => {
                  alert("Signature position saved successfully!");
                })
                .catch(() => {
                  alert("Failed to save signature!");
                });
            }}
          >
            Save Position
          </button>
        </div>

        <button
          className="absolute top-0 right-4 text-sidebar-primary/50 text-lg z-50 flex items-center gap-1 hover:text-sidebar-primary transition-colors"
          onClick={onClose}
        >
          <X className="h-10 w-10" />
          <span className="sm:block hidden">close</span>
        </button>

      </div>
    </div>
  );
};

export default SignatureEditor;