// utils/deleteImage.ts (create this file)
import axios from 'axios';
import { toast } from 'sonner';

/**
 * Sends a request to the Laravel backend to delete a file.
 * The 'path' should be the relative path used by the 'public' disk (e.g., 'uploads/filename.jpg').
 */
export const deleteImageFromLaravel = async (path: string) => {
  try {
    // Axios uses data property for DELETE body payload
    await axios.delete('/cms/uploads', {
      data: { path: path }, // Match the 'path' key expected by your Laravel controller
      withCredentials: true,
    });
    console.log(`Deleted file successfully: ${path}`);
  } catch (error) {
    console.error(`Failed to delete file at path ${path}:`, error);
    toast.error('Failed to delete image on the server.');
    // You can decide whether to block the local deletion if the server fails
  }
};
