// hooks/use-upload-file.ts
import * as React from 'react';
import axios from 'axios';
import { toast } from 'sonner';

interface UploadedFile {
  name: string;
  url: string;
  key?: string; 
  size?: number;
  type?: string;
  appUrl?: string;
}

// Extract the core upload logic into an exportable function
export async function uploadFileToLaravel(file: File): Promise<UploadedFile> {
  const formData = new FormData();
  formData.append('file', file); 

  try {
    const response = await axios.post('/cms/uploads', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      withCredentials: true,
      // We ignore onUploadProgress here if we use this standalone function
    });

    return {
      name: file.name,
      url: response.data.url, 
      size: file.size,
      type: file.type,
    };

  } catch (error) {
    const errorMessage = getErrorMessage(error);
    toast.error(errorMessage);
    throw error; // Propagate the error up
  }
}


export function useUploadFile() {
  const [uploadedFile, setUploadedFile] = React.useState<UploadedFile | undefined>(undefined);
  const [uploadingFile, setUploadingFile] = React.useState<File | undefined>(undefined);
  const [progress, setProgress] = React.useState<number>(0);
  const [isUploading, setIsUploading] = React.useState(false);

  // This hook function now wraps the exportable function
  const uploadFile = React.useCallback(async (file: File) => {
    setIsUploading(true);
    setUploadingFile(file);
    setProgress(0);

    try {
        // Use the common function
        const result = await uploadFileToLaravel(file);
        setUploadedFile(result);

        // Simulate progress for UI feedback if needed within the hook context
        let currentProgress = 0;
        const simulateProgress = async () => {
            while (currentProgress < 100) {
                await new Promise((resolve) => setTimeout(resolve, 30));
                currentProgress += 5;
                setProgress(Math.min(currentProgress, 100));
            }
        };
        await simulateProgress();

        return result;
    } catch (error) {
        // Error handling handled within uploadFileToLaravel via toast
    } finally {
        setIsUploading(false);
        // setUploadingFile(undefined);
    }
  }, []);

  return {
    isUploading,
    progress,
    uploadedFile,
    uploadFile, 
    uploadingFile,
  };
}

// ... keep getErrorMessage and showErrorToast ...


// Keep utility functions for error handling if you still use zod elsewhere
export function getErrorMessage(err: unknown): string {
  // You might want to parse axios errors differently here if they return specific JSON error formats from Laravel
  if (axios.isAxiosError(err) && err.response?.data?.message) {
      return err.response.data.message;
  }
  if (err instanceof Error) {
    return err.message;
  }
  return 'Something went wrong, please try again later.';
}

export function showErrorToast(err: unknown) {
  const errorMessage = getErrorMessage(err);
  return toast.error(errorMessage);
}
