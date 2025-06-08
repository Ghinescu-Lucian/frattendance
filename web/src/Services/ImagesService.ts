import axios from "axios";

const baseURL = "https://localhost:3000";
const userInfoURL = `${baseURL}/auth/user-info`;


export async function uploadImages(
  files: File[],
  collectionId: string
): Promise<any> {
  try {
    const formData = new FormData();
    files.forEach(file => formData.append('files', file));

    const response = await axios.post(
      `https://localhost:3000/upload?collectionId=${encodeURIComponent(collectionId)}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        withCredentials: true, // include cookies (especially access token)
      }
    );

    return response.data;
  } catch (error: any) {
    console.error('❌ Upload error:', error.response?.data || error.message);
    throw new Error('Upload failed');
  }
}
