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
  const [capturedImage, setCapturedImage] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);
  const [lightingQuality, setLightingQuality] = useState('good');
  const [isSimulatingCamera, setIsSimulatingCamera] = useState(false);

  const canvasRef = useRef(null);

  // Función para simular la cámara con una imagen generada
  const simulateCamera = () => {
    setIsSimulatingCamera(true);
    setCurrentScreen('camera');
  };

  useEffect(() => {
    let interval;
    if (isSimulatingCamera) {
      interval = setInterval(() => {
        setFaceDetected(Math.random() > 0.3);
        const qualities = ['good', 'dark', 'bright'];
        setLightingQuality(qualities[Math.floor(Math.random() * 3)]);
      }, 1500);
    }
    
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isSimulatingCamera]);

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
            <button onClick={simulateCamera} className="start-button">
              <Play style={{ marginRight: '8px' }} />
              Comenzar
            </button>
          </div>
        )}

        {currentScreen === 'camera' && (
          <div className="camera-screen">
            <div className="camera-view">
              <p>Simulación de Cámara Activada</p>
              <Camera size={48} />
            </div>
            <div className="status-indicators">
              <p>Detección de Rostro: {faceDetected ? <CheckCircle color="green" /> : <AlertCircle color="red" />}</p>
              <p>Calidad de Iluminación: {lightingQuality}</p>
            </div>
            <button className="capture-button">Capturar Foto</button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;