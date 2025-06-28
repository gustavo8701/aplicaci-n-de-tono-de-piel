import { FaceMesh, FilesetResolver } from "@mediapipe/tasks-vision";
import './App.css'; // Asegúrate de tener tus estilos básicos

function App() {
  const [currentScreen, setCurrentScreen] = useState('welcome');
  const [faceMesh, setFaceMesh] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isModelLoading, setIsModelLoading] = useState(true);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const lastVideoTimeRef = useRef(-1);

  // --- PASO 2.1: Cargar el modelo de MediaPipe al iniciar la app ---
  useEffect(() => {
    const createFaceMesh = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.0/wasm"
        );
        const newFaceMesh = await FaceMesh.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task`,
            delegate: "GPU",
          },
          runningMode: "VIDEO",
          numFaces: 1,
        });
        setFaceMesh(newFaceMesh);
        setIsModelLoading(false);
        console.log("Modelo de Face Mesh cargado con éxito.");
      } catch(error) {
        console.error("Error al cargar el modelo de Face Mesh:", error);
      }
    };
    createFaceMesh();
  }, []);

  // --- PASO 2.2: Iniciar la cámara y el bucle de predicción ---
  const startCamera = async () => {
    setCurrentScreen('camera');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.addEventListener("loadeddata", predictWebcam);
      }
    } catch (err) {
      console.error("Error al acceder a la cámara:", err);
    }
  };

  // --- PASO 3: El "loop" de análisis en cada fotograma ---
  const predictWebcam = async () => {
    if (!faceMesh || !videoRef.current || videoRef.current.currentTime === lastVideoTimeRef.current) {
      requestAnimationFrame(predictWebcam);
      return;
    }

    lastVideoTimeRef.current = videoRef.current.currentTime;
    const results = faceMesh.detectForVideo(videoRef.current, Date.now());

    if (results.faceLandmarks.length > 0) {
      const landmarks = results.faceLandmarks[0];
      // --- PASO 4 y 5: Dibujar, extraer y calcular el color ---
      const skinColor = getAverageSkinColor(landmarks, videoRef.current);
      setAnalysisResult(skinColor); // Guardamos el resultado
    }
    
    requestAnimationFrame(predictWebcam);
  };
  
  // --- PASO 5.1: Función para calcular el color promedio ---
  const getAverageSkinColor = (landmarks, video) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Índices de puntos de la malla facial en la zona de las mejillas y frente
    const skinIndices = [109, 69, 104, 67, 10, 338, 297, 333, 299, 336]; 
    let r = 0, g = 0, b = 0;
    
    for (const index of skinIndices) {
      const point = landmarks[index];
      const x = Math.floor(point.x * canvas.width);
      const y = Math.floor(point.y * canvas.height);
      const [pixelR, pixelG, pixelB] = ctx.getImageData(x, y, 1, 1).data;
      r += pixelR;
      g += pixelG;
      b += pixelB;
    }
    
    const count = skinIndices.length;
    return {
      r: Math.round(r / count),
      g: Math.round(g / count),
      b: Math.round(b / count),
    };
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
            {isModelLoading ? (
              <p>Cargando modelo de IA...</p>
            ) : (
              <button onClick={startCamera} className="start-button">Comenzar</button>
            )}
          </div>
        )}

        {currentScreen === 'camera' && (
          <div className="camera-screen">
            <video ref={videoRef} autoPlay playsInline muted style={{ transform: 'scaleX(-1)' }}></video>
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
            
            {/* --- PASO 6: Mostrar el resultado --- */}
            {analysisResult && (
              <div className="result-display">
                <p>Tono de Piel Detectado:</p>
                <div 
                  className="color-box"
                  style={{ backgroundColor: `rgb(${analysisResult.r}, ${analysisResult.g}, ${analysisResult.b})` }}
                ></div>
                <span>{`RGB(${analysisResult.r}, ${analysisResult.g}, ${analysisResult.b})`}</span>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;