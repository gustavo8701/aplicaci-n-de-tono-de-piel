import React, { useState, useRef, useEffect } from 'react';
import {
  Camera,
  Sparkles,
  Palette,
  Heart,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  RotateCcw,
  Zap,
  Eye,
  Shield,
  Smartphone,
  AlertCircle,
  RefreshCw,
  Play
} from 'lucide-react';
import './App.css';

function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  // const [capturedImage, setCapturedImage] = useState(null); // Lo comentamos por ahora
  // const [analysisResult, setAnalysisResult] = useState(null); // Lo comentamos por ahora
  // const [isAnalyzing, setIsAnalyzing] = useState(false); // Lo comentamos por ahora

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const startCamera = async () => {
    setCurrentScreen('camera');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1280, height: 720, facingMode: 'user' }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("¡Error al acceder a la cámara!", err);
      setCurrentScreen('error'); 
    }
  };

  // Aquí iría la función para capturar la foto
  const capturePhoto = () => {
    console.log("¡Función para capturar foto pendiente!");
    // Lógica futura: dibujar el video en el canvas y obtener la imagen.
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Analizador de Tono de Piel</h1>
      </header>
      <main className="app-main">
        {currentScreen === 'welcome' && (
          <div className="welcome-screen">
            <h2>¡Bienvenida!</h2>
            <p>Prepárate para encontrar tu tono de piel perfecto.</p>
            <button onClick={startCamera} className="start-button">
              <Play style={{ marginRight: '8px' }} />
              Comenzar
            </button>
          </div>
        )}

        {currentScreen === 'camera' && (
          <div className="camera-screen">
            <div className="camera-view">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{ width: '100%', height: 'auto', transform: 'scaleX(-1)' }}
              ></video>
            </div>
            <div className="status-indicators">
              <p>Apunta la cámara a tu rostro.</p>
            </div>
            <button onClick={capturePhoto} className="capture-button">Capturar Foto</button>
          </div>
        )}

        {currentScreen === 'error' && (
          <div className="error-screen">
            <h2>¡Oh no!</h2>
            <p>No pudimos acceder a la cámara. Por favor, asegúrate de haberle dado permiso en el navegador.</p>
          </div>
        )}

      </main>
    </div>
  );
}

export default App;