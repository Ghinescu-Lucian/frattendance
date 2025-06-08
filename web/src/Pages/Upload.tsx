// import React, { useState } from 'react';

// import { useDropzone } from 'react-dropzone';

// const UploadPage: React.FC = () => {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [uploadStatus, setUploadStatus] = useState<string>('');

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setSelectedFile(e.target.files[0]);
//     }
//   };

//   const handleUpload = () => {
//     if (!selectedFile) {
//       setUploadStatus('Please select a file first.');
//       return;
//     }

//     // Replace this with actual API call
//     setUploadStatus(`Uploading ${selectedFile.name}...`);

//     // Simulate upload
//     setTimeout(() => {
//       setUploadStatus('Upload successful!');
//       setSelectedFile(null);
//     }, 1000);
//   };

//   return (
//     <div style={{ maxWidth: '400px', margin: 'auto', padding: '2rem' }}>
//       <h1>Upload Images</h1>
//       <ImageUploader/>
//       <input type="file" onChange={handleFileChange} accept="image/*" />
//       <div style={{ marginTop: '1rem' }}>
//         <button onClick={handleUpload} style={{ padding: '0.5rem 1rem' }}>
//           Upload
//         </button>
//       </div>
//       {uploadStatus && <p>{uploadStatus}</p>}
//     </div>
//   );
// };


// function ImageUploader() {
//   const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
//     accept: { 'image/*': [] },
//   });

//   return (
//     <div {...getRootProps()} className="border p-4 rounded">
//       <input {...getInputProps()} />
//       <p>Drag & drop images here, or click to select</p>
//       <div className="grid grid-cols-3 gap-2 mt-4">
//         {acceptedFiles.map((file) => (
//           <img
//             key={file.name}
//             src={URL.createObjectURL(file)}
//             alt={file.name}
//             className="w-full h-32 object-cover rounded"
//           />
//         ))}
//       </div>
//     </div>
//   );
// }


// export default UploadPage;



import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { SelfieCapture } from '../Components/SelfieCapture';

const UploadPage: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setSelectedFiles((prev) => [...prev, ...acceptedFiles]);
    if (acceptedFiles.length > 0 && selectedFiles.length === 0) {
      setActiveImageIndex(0);
    }
  }, [selectedFiles.length]);

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setSelectedFiles((prev) => [...prev, ...files]);
      if (files.length > 0 && selectedFiles.length === 0) {
        setActiveImageIndex(0);
      }
    }
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      setUploadStatus('Please select at least one image.');
      return;
    }

    const formData = new FormData();
    selectedFiles.forEach((file) => formData.append('files', file));

    try {
      setUploadStatus('Uploading...');

      await axios.post('https://localhost:3000/upload/images?collectionId=my-gallery', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true,
      });

      setUploadStatus('Upload successful!');
      setSelectedFiles([]);
    } catch (error) {
      setUploadStatus('Upload failed.');
    }
  };

  const nextImage = () => {
    setActiveImageIndex((prev) => (prev + 1) % selectedFiles.length);
  };

  const prevImage = () => {
    setActiveImageIndex((prev) => (prev - 1 + selectedFiles.length) % selectedFiles.length);
  };

  return (
    <div style={{ maxWidth: '600px', margin: 'auto', padding: '2rem' }}>
      <h1>Upload Images</h1>

      {/* Dropzone + File input */}
      <ImageUploader onDrop={onDrop} />
      <div style={{ marginTop: '1rem' }}>
        <input type="file" multiple accept="image/*" onChange={handleFileInputChange} />
      </div> 
      <SelfieCapture onCapture={(file) => setSelectedFiles(prev => [...prev, file])} />

      {/* Upload button */}
      {selectedFiles.length > 0 && (
        <div style={{ marginTop: '1rem' }}>
          <button onClick={handleUpload} style={{ padding: '0.5rem 1rem' }}>
            Upload Images
          </button>
        </div>
      )}

      {uploadStatus && <p style={{ marginTop: '1rem' }}>{uploadStatus}</p>}

      {selectedFiles.length > 0 && (
  <div style={{ marginTop: '2rem', textAlign: 'center' }}>
    <h3>Preview</h3>

    {/* Image container with smooth transition */}
    <div
      style={{
        position: 'relative',
        height: '300px',
        width: '100%',
        overflow: 'hidden',
      }}
    >
      {selectedFiles.map((file, index) => (
        <img
          key={index}
          src={URL.createObjectURL(file)}
          alt={`Image ${index + 1}`}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            borderRadius: '8px',
            opacity: index === activeImageIndex ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out',
          }}
        />
      ))}
    </div>

    {/* Image index */}
    <div style={{ marginTop: '0.5rem', fontStyle: 'italic' }}>
      Image {activeImageIndex + 1} of {selectedFiles.length}
    </div>

    {/* Navigation */}
    <div style={{ marginTop: '1rem' }}>
      <button onClick={prevImage} style={{ marginRight: '1rem' }}>⟨ Prev</button>
      <button onClick={nextImage}>Next ⟩</button>
    </div>
  </div>
)}

  {/* ✅ Send button below slideshow */}
  <div style={{ marginTop: '1.5rem' }}>
      <button
        onClick={handleUpload}
        style={{
          padding: '0.5rem 1.5rem',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          fontSize: '1rem',
        }}
      >
        Send Images
      </button>
    </div>

    {uploadStatus && (
      <p style={{ marginTop: '1rem', color: uploadStatus.includes('failed') ? 'red' : 'green' }}>
        {uploadStatus}
      </p>
    )}


      </div>
  );
};

interface ImageUploaderProps {
  onDrop: (files: File[]) => void;
}

function ImageUploader({ onDrop }: ImageUploaderProps) {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: true,
  });

  return (
    <div {...getRootProps()} style={{ border: '2px dashed #aaa', padding: '2rem', borderRadius: '8px' }}>
      <input {...getInputProps()} />
      <p>Drag & drop images here, or click to select</p>
    </div>
  );
}

export default UploadPage;
