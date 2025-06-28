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
  const [capturedImage, setCapturedImage] = useState(null); // Para guardar la foto capturada

  const videoRef = useRef(null);
  const canvasRef = useRef(null); // Nuestro canvas para dibujar la foto

  // Función que se llama al hacer clic en "Comenzar"
  const handleStartClick = () => {
    setCurrentScreen('camera');
  };

  // Efecto para manejar el encendido y apagado de la cámara
  useEffect(() => {
    let stream;
    let videoElement = videoRef.current;

    const setupCamera = async () => {
      // Solo activamos la cámara si estamos en la pantalla correcta
      if (currentScreen === 'camera' && videoElement) {
        try {
          stream = await navigator.mediaDevices.getUserMedia({
            video: { width: 1280, height: 720, facingMode: 'user' }
          });
          videoElement.srcObject = stream;
        } catch (err) {
          console.error("Error al acceder a la cámara:", err);
          setCurrentScreen('error');
        }
      }
    };

    setupCamera();

    // Función de limpieza para apagar la cámara
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [currentScreen]); // Se ejecuta cuando currentScreen cambia

  // --- ¡NUEVA FUNCIÓN PARA EL BOTÓN! ---
  const handleCapturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      // Ajustamos el tamaño del canvas al del video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Dibujamos el fotograma actual del video en el canvas
      const context = canvas.getContext('2d');
      // Lo dibujamos invertido (como un espejo) para que coincida con la vista previa
      context.translate(canvas.width, 0);
      context.scale(-1, 1);
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Obtenemos la imagen del canvas como una URL de datos (formato PNG)
      const photoURL = canvas.toDataURL('image/png');
      setCapturedImage(photoURL); // Guardamos la foto en el estado
      setCurrentScreen('analysis'); // Cambiamos a una nueva pantalla para mostrar la foto
    }
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
            <button onClick={handleStartClick} className="start-button">
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
              {/* Canvas oculto que usaremos para la captura */}
              <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
            </div>
            <div className="status-indicators">
              <p>Apunta la cámara a tu rostro.</p>
            </div>
            {/* El botón ahora llama a nuestra nueva función */}
            <button onClick={handleCapturePhoto} className="capture-button">Capturar Foto</button>
          </div>
        )}

        {/* --- ¡NUEVA PANTALLA PARA MOSTRAR LA FOTO! --- */}
        {currentScreen === 'analysis' && (
          <div className="analysis-screen">
            <h2>Foto Capturada</h2>
            <p>Ahora analizaremos esta imagen.</p>
            <img src={capturedImage} alt="Foto capturada" style={{ maxWidth: '100%' }} />
            {/* Aquí irían los botones para "Analizar" o "Volver a tomar" */}
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

export default App;import React, { useState, useRef, useEffect } from 'react';
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
  const [capturedImage, setCapturedImage] = useState(null); // Para guardar la foto capturada

  const videoRef = useRef(null);
  const canvasRef = useRef(null); // Nuestro canvas para dibujar la foto

  // Función que se llama al hacer clic en "Comenzar"
  const handleStartClick = () => {
    setCurrentScreen('camera');
  };

  // Efecto para manejar el encendido y apagado de la cámara
  useEffect(() => {
    let stream;
    let videoElement = videoRef.current;

    const setupCamera = async () => {
      // Solo activamos la cámara si estamos en la pantalla correcta
      if (currentScreen === 'camera' && videoElement) {
        try {
          stream = await navigator.mediaDevices.getUserMedia({
            video: { width: 1280, height: 720, facingMode: 'user' }
          });
          videoElement.srcObject = stream;
        } catch (err) {
          console.error("Error al acceder a la cámara:", err);
          setCurrentScreen('error');
        }
      }
    };

    setupCamera();

    // Función de limpieza para apagar la cámara
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [currentScreen]); // Se ejecuta cuando currentScreen cambia

  // --- ¡NUEVA FUNCIÓN PARA EL BOTÓN! ---
  const handleCapturePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      // Ajustamos el tamaño del canvas al del video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Dibujamos el fotograma actual del video en el canvas
      const context = canvas.getContext('2d');
      // Lo dibujamos invertido (como un espejo) para que coincida con la vista previa
      context.translate(canvas.width, 0);
      context.scale(-1, 1);
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      
      // Obtenemos la imagen del canvas como una URL de datos (formato PNG)
      const photoURL = canvas.toDataURL('image/png');
      setCapturedImage(photoURL); // Guardamos la foto en el estado
      setCurrentScreen('analysis'); // Cambiamos a una nueva pantalla para mostrar la foto
    }
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
            <button onClick={handleStartClick} className="start-button">
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
              {/* Canvas oculto que usaremos para la captura */}
              <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
            </div>
            <div className="status-indicators">
              <p>Apunta la cámara a tu rostro.</p>
            </div>
            {/* El botón ahora llama a nuestra nueva función */}
            <button onClick={handleCapturePhoto} className="capture-button">Capturar Foto</button>
          </div>
        )}

        {/* --- ¡NUEVA PANTALLA PARA MOSTRAR LA FOTO! --- */}
        {currentScreen === 'analysis' && (
          <div className="analysis-screen">
            <h2>Foto Capturada</h2>
            <p>Ahora analizaremos esta imagen.</p>
            <img src={capturedImage} alt="Foto capturada" style={{ maxWidth: '100%' }} />
            {/* Aquí irían los botones para "Analizar" o "Volver a tomar" */}
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