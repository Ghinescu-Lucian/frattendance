// import React, { useState, useCallback } from 'react';
// import Webcam from 'react-webcam';

// const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

// export const SelfieCapture: React.FC = () => {
//   const [showCamera, setShowCamera] = useState(false);
//   const [screenshot, setScreenshot] = useState<string | null>(null);
//   const webcamRef = React.useRef<Webcam>(null);

//   const capture = useCallback(() => {
//     const imageSrc = webcamRef.current?.getScreenshot();
//     setScreenshot(imageSrc || null);
//     setShowCamera(false);
//   }, []);

//   return (
//     <div className="flex flex-col items-center mt-6">
//       {isMobile && !showCamera && (
//         <button
//           onClick={() => setShowCamera(true)}
//           className="bg-blue-600 text-white px-4 py-2 rounded-lg"
//         >
//           Take Selfie
//         </button>
//       )}

//       {showCamera && (
//         <div className="relative">
//           <Webcam
//             audio={false}
//             ref={webcamRef}
//             screenshotFormat="image/jpeg"
//             videoConstraints={{ facingMode: 'user' }}
//             className="rounded-lg"
//           />
//           <div
//             className="absolute top-0 left-0 w-full h-full flex justify-center items-center pointer-events-none"
//             style={{
//               background: 'rgba(0, 0, 0, 0.4)',
//               maskImage: 'radial-gradient(circle at center, transparent 35%, black 36%)',
//               WebkitMaskImage: 'radial-gradient(circle at center, transparent 35%, black 36%)',
//             }}
//           />
//           <button
//             onClick={capture}
//             className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded-full"
//           >
//             Capture
//           </button>
//         </div>
//       )}

//       {screenshot && (
//         <div className="mt-4">
//           <img src={screenshot} alt="Selfie" className="rounded" />
//         </div>
//       )}
//     </div>
//   );
// };



import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';

interface SelfieCaptureProps {
  onCapture: (file: File) => void;
}

export const SelfieCapture: React.FC<SelfieCaptureProps> = ({ onCapture }) => {
  const [showCamera, setShowCamera] = useState(false);
  const webcamRef = useRef<Webcam>(null);

  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  const capture = useCallback(() => {
    const screenshot = webcamRef.current?.getScreenshot();
    if (screenshot) {
      fetch(screenshot)
        .then(res => res.blob())
        .then(blob => {
          const file = new File([blob], `selfie_${Date.now()}.jpg`, { type: 'image/jpeg' });
          onCapture(file);
          setShowCamera(false);
        });
    }
  }, [onCapture]);

  if (!isMobile) return null;

  return (
    <div style={{ marginTop: '1rem' }}>
      {!showCamera ? (
        <button
          onClick={() => setShowCamera(true)}
          style={{
            padding: '0.5rem 1rem',
            background: '#28a745',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            fontSize: '1rem',
          }}
        >
          Take Selfie
        </button>
      ) : (
        <div style={{ position: 'relative', maxWidth: '100%', aspectRatio: '3 / 4' }}>
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{ facingMode: 'user' }}
            style={{ width: '100%', borderRadius: '8px' }}
          />

          {/* Oval overlay */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.5)',
              pointerEvents: 'none',
              borderRadius: '8px',
              maskImage:
                'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,1) 36%)',
              WebkitMaskImage:
                'radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,1) 36%)',
            }}
          />

          {/* Capture button */}
          <button
            onClick={capture}
            style={{
              position: 'absolute',
              bottom: '1rem',
              left: '50%',
              transform: 'translateX(-50%)',
              padding: '0.5rem 1rem',
              background: '#007bff',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              fontSize: '1rem',
            }}
          >
            Capture Selfie
          </button>
        </div>
      )}
    </div>
  );
};

