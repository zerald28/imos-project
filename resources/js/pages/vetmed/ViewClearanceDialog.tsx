// resources/js/pages/vetmed/components/ViewClearanceDialog.tsx

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  FileText, 
  Download, 
  Calendar, 
  User, 
  Building, 
  FileSignature,
  X,
  Maximize2,
  ExternalLink
} from 'lucide-react';

interface VetmedClearance {
  id: number;
  clearance_number: string;
  document_type: string;
  veterinarian_name: string;
  license_number: string;
  issued_by: string;
  issue_date: string;
  expiry_date: string;
  remarks: string;
  status: string;
  file_path: string;
  file_name: string;
  mime_type: string;
  file_size: number;
  rejection_reason?: string;
  created_at: string;
}

interface Props {
  clearance: VetmedClearance | null;
  isOpen: boolean;
  onClose: () => void;
}

type ClearanceStatus = 'pending_review' | 'verified' | 'rejected' | 'expired' | 'needs_revision';

export default function ViewClearanceDialog({ clearance, isOpen, onClose }: Props) {
  if (!clearance) return null;

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<ClearanceStatus, { color: string; label: string }> = {
      pending_review: { color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400', label: 'Pending Review' },
      verified: { color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400', label: 'Verified' },
      rejected: { color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400', label: 'Rejected' },
      expired: { color: 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-400', label: 'Expired' },
      needs_revision: { color: 'bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400', label: 'Needs Revision' },
    };
    
    const config = statusConfig[status as ClearanceStatus] || statusConfig.pending_review;
    
    return (
      <Badge className={`${config.color} px-3 py-1 text-sm`}>
        {config.label}
      </Badge>
    );
  };

  const getImageUrl = (path: string) => {
    if (!path) return null;
    if (path.startsWith('http')) return path;
    return `/storage/${path}`;
  };

  const openFullScreenWindow = () => {
    const imageUrl = getImageUrl(clearance.file_path);
    if (imageUrl) {
      // Open in new window
      const newWindow = window.open();
      if (newWindow) {
        newWindow.document.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>${clearance.file_name}</title>
              <style>
                * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
                }
                body {
                  background: black;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                  min-height: 100vh;
                  margin: 0;
                  padding: 20px;
                }
                .container {
                  position: relative;
                  width: 100%;
                  height: 100vh;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                }
                img {
                  max-width: 100%;
                  max-height: 100vh;
                  object-fit: contain;
                  cursor: pointer;
                }
                .controls {
                  position: fixed;
                  bottom: 20px;
                  right: 20px;
                  display: flex;
                  gap: 10px;
                  z-index: 1000;
                }
                button {
                  padding: 10px 15px;
                  background: rgba(0,0,0,0.7);
                  color: white;
                  border: none;
                  border-radius: 5px;
                  cursor: pointer;
                  font-size: 14px;
                  transition: background 0.3s;
                }
                button:hover {
                  background: rgba(0,0,0,0.9);
                }
                .info {
                  position: fixed;
                  bottom: 20px;
                  left: 20px;
                  color: white;
                  background: rgba(0,0,0,0.7);
                  padding: 5px 10px;
                  border-radius: 5px;
                  font-size: 12px;
                  font-family: monospace;
                }
              </style>
            </head>
            <body>
              <div class="container">
                <img src="${imageUrl}" alt="${clearance.file_name}" />
                <div class="controls">
                  <button onclick="window.close()">Close</button>
                </div>
                <div class="info">
                  ${clearance.file_name} • Click image to zoom
                </div>
              </div>
              <script>
                const img = document.querySelector('img');
                let scale = 1;
                img.addEventListener('click', () => {
                  if (scale === 1) {
                    img.style.maxWidth = 'none';
                    img.style.maxHeight = 'none';
                    img.style.width = 'auto';
                    img.style.height = 'auto';
                    scale = 2;
                  } else {
                    img.style.maxWidth = '100%';
                    img.style.maxHeight = '100vh';
                    img.style.width = 'auto';
                    img.style.height = 'auto';
                    scale = 1;
                  }
                });
              </script>
            </body>
          </html>
        `);
        newWindow.document.close();
      }
    }
  };

  const isImage = clearance.mime_type?.startsWith('image/');
  const imageUrl = isImage ? getImageUrl(clearance.file_path) : null;

  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-PH', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl font-bold flex items-center gap-2">
              <FileText className="w-6 h-6 text-green-600" />
              Clearance Details
            </DialogTitle>
            {getStatusBadge(clearance.status)}
          </div>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Document Preview Section */}
          <div className="rounded-lg border-2 border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white">Document Preview</h3>
            </div>
            <div className="p-4">
              {isImage && imageUrl ? (
                <div className="relative group">
                  <img
                    src={imageUrl}
                    alt={clearance.file_name}
                    className="max-h-96 mx-auto rounded-lg cursor-pointer transition-transform hover:scale-105"
                    onClick={openFullScreenWindow}
                  />
                  <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={openFullScreenWindow}
                      className="p-2 bg-black/50 hover:bg-black/70 rounded-lg text-white transition flex items-center gap-2"
                      title="Open in as full screen"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="text-xs">Full Screen </span>
                    </button>
                  </div>
                  <p className="text-center text-xs text-gray-500 mt-2">
                    Click image to open in new window for full screen
                  </p>
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="w-20 h-20 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                    {clearance.file_name}
                  </p>
                  <p className="text-xs text-gray-500 mb-4">
                    {formatFileSize(clearance.file_size)}
                  </p>
                  <a
                    href={getImageUrl(clearance.file_path) || '#'}
                    download={clearance.file_name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      Download Document
                    </Button>
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Clearance Information */}
          <div className="rounded-lg border-2 border-gray-200 dark:border-gray-700">
            <div className="bg-gray-50 dark:bg-gray-800 px-4 py-2 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white">Clearance Information</h3>
            </div>
            <div className="p-4 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Clearance Number
                  </label>
                  <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
                    {clearance.clearance_number || 'N/A'}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Document Type
                  </label>
                  <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
                    {clearance.document_type}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase flex items-center gap-1">
                    <User className="w-3 h-3" />
                    Veterinarian Name
                  </label>
                  <p className="text-sm text-gray-900 dark:text-white mt-1">
                    {clearance.veterinarian_name || 'N/A'}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase flex items-center gap-1">
                    <FileSignature className="w-3 h-3" />
                    License Number
                  </label>
                  <p className="text-sm text-gray-900 dark:text-white mt-1">
                    {clearance.license_number || 'N/A'}
                  </p>
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase flex items-center gap-1">
                  <Building className="w-3 h-3" />
                  Issued By
                </label>
                <p className="text-sm text-gray-900 dark:text-white mt-1">
                  {clearance.issued_by || 'N/A'}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Issue Date
                  </label>
                  <p className="text-sm text-gray-900 dark:text-white mt-1">
                    {formatDate(clearance.issue_date)}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Expiry Date
                  </label>
                  <p className="text-sm text-gray-900 dark:text-white mt-1">
                    {formatDate(clearance.expiry_date)}
                  </p>
                </div>
              </div>

              {clearance.remarks && (
                <div>
                  <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                    Remarks
                  </label>
                  <p className="text-sm text-gray-900 dark:text-white mt-1">
                    {clearance.remarks}
                  </p>
                </div>
              )}

              {clearance.rejection_reason && (
                <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800">
                  <label className="text-xs font-medium text-red-600 dark:text-red-400 uppercase">
                    Rejection Reason
                  </label>
                  <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                    {clearance.rejection_reason}
                  </p>
                </div>
              )}

              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <label className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
                  Submission Details
                </label>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Submitted on {formatDate(clearance.created_at)}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            {isImage && imageUrl && (
              <Button variant="outline" onClick={openFullScreenWindow}>
                <ExternalLink className="w-4 h-4 mr-2" />
                Open Full Screen
              </Button>
            )}
            <a
              href={getImageUrl(clearance.file_path) || '#'}
              download={clearance.file_name}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Download Document
              </Button>
            </a>
            <Button onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}