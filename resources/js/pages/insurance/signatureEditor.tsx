// File: resources/js/Pages/veterinary/signatureEditor.tsx

import React, { useState, useRef, useEffect } from "react";
import { Rnd } from "react-rnd";
import axios from "axios";
import { Printer, X, ZoomIn, ZoomOut } from "lucide-react";

interface SignatureEditorProps {
  signaturePath: string;
  initialX: number;
  initialY: number;
  initialWidth: number;
  initialHeight: number;
  onSave: (x: number, y: number, width: number, height: number) => void;
  onClose?: () => void;
  pdfId: number;
  isModal?: boolean;
}

const SignatureEditor: React.FC<SignatureEditorProps> = ({
  signaturePath,
  initialX,
  initialY,
  initialWidth,
  initialHeight,
  onSave,
  onClose,
  pdfId,
  isModal = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pdfIframeRef = useRef<HTMLIFrameElement>(null);

  const [pos, setPos] = useState({ x: initialX, y: initialY });
  const [size, setSize] = useState({ width: initialWidth, height: initialHeight });
  const [pdfOffset, setPdfOffset] = useState({ top: 2074, left: 502, scale: 1 });
  const [iframeLoaded, setIframeLoaded] = useState(false);

  const detectPdfMetrics = () => {
    const iframe = pdfIframeRef.current;
    if (!iframe) return;

    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!iframeDoc) return;

    const pdfElement = iframeDoc.querySelector("img, canvas, svg");
    if (!pdfElement) return;

    const rect = pdfElement.getBoundingClientRect();
    const containerRect = iframe.getBoundingClientRect();

    const left = rect.left - containerRect.left;
    const top = rect.top - containerRect.top;
    const realWidth = 595;
    const scale = realWidth / rect.width;

    setPdfOffset({ top, left, scale });
    setIframeLoaded(true);
  };

  useEffect(() => {
    const iframe = pdfIframeRef.current;
    if (!iframe) return;

    const handleLoad = () => {
      // Add a small delay to ensure PDF content is rendered
      setTimeout(() => {
        detectPdfMetrics();
      }, 500);
    };
    
    iframe.addEventListener('load', handleLoad);
    
    // Also try to detect after a delay even if load event doesn't fire properly
    const timeoutId = setTimeout(() => {
      if (!iframeLoaded) {
        detectPdfMetrics();
      }
    }, 2000);
    
    return () => {
      iframe.removeEventListener('load', handleLoad);
      clearTimeout(timeoutId);
    };
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

  const adjustSize = (multiplier: number) => {
    setSize(prev => {
      const newWidth = prev.width * multiplier;
      return {
        width: newWidth,
        height: newWidth / aspectRatio,
      };
    });
  };

 // In veterinary signatureEditor.tsx - Replace the handleSaveWithAdjustments function

const handleSaveWithAdjustments = async (shouldPrint: boolean = false) => {
  const HORIZONTAL_ADJUST = -115;
  const VERTICAL_ADJUST = -49;

  const realX = (pos.x - pdfOffset.left + HORIZONTAL_ADJUST) * pdfOffset.scale;
  const realY = (pos.y - pdfOffset.top + VERTICAL_ADJUST) * pdfOffset.scale;
  const realWidth = size.width * pdfOffset.scale;
  const realHeight = size.height * pdfOffset.scale;

  if (shouldPrint) {
    try {
      // First save the signature position
      await axios.post(`/insurance/signature/${pdfId}/saves`, { 
        x: realX, 
        y: realY, 
        width: realWidth, 
        height: realHeight,
        veterinary_disease_report_id: pdfId,
      });
      
      alert("Signature saved successfully! Opening print dialog...");
      
      // Then fetch the PDF and trigger print
      const response = await axios.get(`/insurance/${pdfId}/pdf/downloadreport`, {
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
      alert("Failed to save signature or print document. Please try again.");
    }
  } else {
    // Save only without printing
    try {
      await axios.post(`/insurance/signature/${pdfId}/saves`, { 
        x: realX, 
        y: realY, 
        width: realWidth, 
        height: realHeight,
        veterinary_disease_report_id: pdfId,
      });
      alert("Signature position saved successfully!");
    } catch (error) {
      console.error("Failed to save signature:", error);
      alert("Failed to save signature!");
    }
  }
};

  // Inline mode content
  const renderContent = () => (
    <div 
      ref={containerRef}
      className="relative w-full h-full overflow-auto border rounded-lg bg-white"
      style={{ minHeight: '800px' }}
    >
      <div className="relative" style={{ width: "100%", height: "2500px" }}>
        {/* PDF Preview */}
        <iframe
          ref={pdfIframeRef}
          src={`/insurance/${pdfId}/pdf/previews`}
          width="100%"
          height="100%"
          style={{ border: "none" }}
          title="PDF Preview"
        />

        {/* Draggable Signature - Always show, but position updates when iframe loads */}
        <Rnd
          size={{ width: size.width, height: size.height }}
          position={{ x: pos.x, y: pos.y }}
          onDragStop={(e, d) => setPos({ x: d.x, y: d.y })}
          enableResizing={false}
          bounds="parent"
        >
          <div className="relative w-full h-full group">
            <div 
              className="absolute inset-0 bg-blue-100/20 border-2 border-blue-300/40 pointer-events-none group-hover:bg-blue-100/30 transition-colors"
              style={{ backdropFilter: 'blur(1px)' }}
            />
            
            <img
              src={signaturePath}
              alt="Signature"
              className="w-full h-full pointer-events-none select-none relative z-10"
              style={{ opacity: 0.95, mixBlendMode: 'multiply' }}
              onError={(e) => {
                console.error('Failed to load signature image:', signaturePath);
                // You could set a fallback here
              }}
            />

            {/* Resize Controls */}
            <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                className="px-2 py-1 bg-gray-600 text-white rounded hover:bg-gray-800 transition-colors"
                onClick={() => adjustSize(1.05)}
                title="Increase size"
              >
                <ZoomIn className="h-4 w-4" />
              </button>
              <button
                className="px-2 py-1 bg-gray-400 text-white rounded hover:bg-gray-600 transition-colors"
                onClick={() => adjustSize(0.95)}
                title="Decrease size"
              >
                <ZoomOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Rnd>

        {/* Loading indicator while iframe loads */}
        {!iframeLoaded && (
          <div className="absolute top-4 left-4 bg-white px-3 py-1 rounded shadow text-sm text-gray-600">
            Loading PDF...
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="sticky bottom-4 right-4 flex justify-end gap-2 mt-4 p-4">
        <button
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded shadow-lg flex items-center gap-2"
          onClick={() => handleSaveWithAdjustments(false)}
        >
          Save Signature
        </button>
        
        <button
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded shadow-lg flex items-center gap-2"
          onClick={() => handleSaveWithAdjustments(true)}
        >
          <Printer className="h-4 w-4" />
          Save & Print
        </button>
        
        {isModal && onClose && (
          <button
            className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded shadow-lg"
            onClick={onClose}
          >
            Close
          </button>
        )}
      </div>
    </div>
  );

  // Modal mode wrapper
  if (isModal) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="relative w-[90%] h-[90%] bg-white rounded-lg shadow-xl overflow-hidden">
          {/* Modal Header */}
          <div className="absolute top-0 left-0 right-0 bg-white border-b px-4 py-2 flex justify-between items-center z-10">
            <h3 className="font-semibold">Signature Editor</h3>
            {onClose && (
              <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
                <X className="h-5 w-5" />
              </button>
            )}
          </div>
          
          {/* Modal Content */}
          <div className="pt-12 h-full">
            {renderContent()}
          </div>
        </div>
      </div>
    );
  }

  // Inline mode - just return the content
  return renderContent();
};

export default SignatureEditor;