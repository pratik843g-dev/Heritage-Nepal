import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Camera, X, AlertCircle } from 'lucide-react';

function QRScanner({ onScanSuccess, onClose }) {
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState('');
  const scannerRef = useRef(null);
  const html5QrCodeRef = useRef(null);

  useEffect(() => {
    startScanner();
    
    return () => {
      stopScanner();
    };
  }, []);

  const startScanner = async () => {
    try {
      setError('');
      const html5QrCode = new Html5Qrcode("qr-reader");
      html5QrCodeRef.current = html5QrCode;

      const config = {
        fps: 10,
        qrbox: { width: 250, height: 250 },
        aspectRatio: 1.0
      };

      await html5QrCode.start(
        { facingMode: "environment" },
        config,
        (decodedText) => {
          console.log("QR Code scanned successfully:", decodedText);
          onScanSuccess(decodedText);
          stopScanner();
        },
        (errorMessage) => {
          // Ignore scanning errors (they're frequent when no QR is visible)
        }
      );

      setScanning(true);
    } catch (err) {
      console.error("Error starting scanner:", err);
      setError('Unable to access camera. Please grant camera permissions.');
    }
  };

  const stopScanner = async () => {
    if (html5QrCodeRef.current && scanning) {
      try {
        await html5QrCodeRef.current.stop();
        html5QrCodeRef.current = null;
      } catch (err) {
        console.error("Error stopping scanner:", err);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-white">
            <Camera className="w-6 h-6" />
            <h2 className="text-xl font-semibold">Scan QR Code</h2>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/10 p-2 rounded-lg transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Scanner */}
        <div className="bg-white rounded-2xl overflow-hidden">
          <div id="qr-reader" className="w-full" ref={scannerRef}></div>
        </div>

        {/* Instructions */}
        <div className="mt-4 text-center text-white">
          <p className="text-sm">
            Position the QR code within the frame to scan
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mt-4 bg-red-500/20 border border-red-500 rounded-lg p-4 flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
            <p className="text-sm text-red-200">{error}</p>
          </div>
        )}

        {/* Help Text */}
        <div className="mt-6 bg-white/10 rounded-lg p-4">
          <p className="text-sm text-white/80">
            <strong className="text-white">Tip:</strong> Make sure there's good lighting and hold your device steady for best results.
          </p>
        </div>
      </div>
    </div>
  );
}

export default QRScanner;
