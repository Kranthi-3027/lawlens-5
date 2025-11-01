import React, { useRef, useState, useCallback } from 'react';

interface CameraComponentProps {
  onCapture: (image: string) => void;
  onClose: () => void;
}

const CameraComponent: React.FC<CameraComponentProps> = ({ onCapture, onClose }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  }, [stream]);

  const handleCapture = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const image = canvas.toDataURL('image/jpeg');
        onCapture(image);
        stopCamera();
      }
    }
  };

  React.useEffect(() => {
    startCamera();
    return () => {
      stopCamera();
    };
  }, [startCamera, stopCamera]);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex flex-col items-center justify-center z-50">
      <video ref={videoRef} autoPlay className="w-full max-w-lg h-auto" />
      <div className="flex mt-4">
        <button onClick={handleCapture} className="p-2 bg-blue-500 text-white rounded-full mr-4">
          Capture
        </button>
        <button onClick={() => { stopCamera(); onClose(); }} className="p-2 bg-red-500 text-white rounded-full">
          Close
        </button>
      </div>
    </div>
  );
};

export default CameraComponent;