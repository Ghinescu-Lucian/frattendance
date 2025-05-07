import React, { useState } from 'react';

const UploadPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string>('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUpload = () => {
    if (!selectedFile) {
      setUploadStatus('Please select a file first.');
      return;
    }

    // Replace this with actual API call
    setUploadStatus(`Uploading ${selectedFile.name}...`);

    // Simulate upload
    setTimeout(() => {
      setUploadStatus('Upload successful!');
      setSelectedFile(null);
    }, 1000);
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '2rem' }}>
      <h1>Upload Images</h1>
      <input type="file" onChange={handleFileChange} accept="image/*" />
      <div style={{ marginTop: '1rem' }}>
        <button onClick={handleUpload} style={{ padding: '0.5rem 1rem' }}>
          Upload
        </button>
      </div>
      {uploadStatus && <p>{uploadStatus}</p>}
    </div>
  );
};

export default UploadPage;
