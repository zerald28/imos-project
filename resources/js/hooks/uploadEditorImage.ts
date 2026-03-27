import axios from "axios";

export async function uploadEditorImage(file: File): Promise<string> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await axios.post('/cms/posts/upload-image', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
    withCredentials: true,
  });

  return response.data.url; // this is the public URL for the uploaded image
}
