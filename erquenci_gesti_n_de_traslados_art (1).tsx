import React, { useState, useEffect, useRef } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  addDoc, 
  updateDoc, 
  onSnapshot, 
  getDocs 
} from 'firebase/firestore';
import { 
  Ambulance, 
  UserCheck, 
  Navigation, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  Calendar, 
  Clock, 
  FileSignature, 
  CheckCircle2, 
  Plus, 
  Car, 
  User, 
  Building2, 
  Play, 
  RotateCcw, 
  Save, 
  Eye, 
  AlertCircle,
  ChevronRight,
  Activity,
  Award,
  MessageCircle,
  HeartPulse
} from 'lucide-react';

// --- COMPONENTE DEL LOGOTIPO OFICIAL DE ERQUENCI (SVG DE ALTA PRECISIÓN) ---
const LogoErquenci = ({ size = 'md', showTagline = false }) => {
  const scale = size === 'sm' ? 'h-9' : size === 'lg' ? 'h-14' : 'h-11';
  return (
    <div className="flex items-center gap-3 select-none">
      {/* Isotipo: Lazo infinito con 'E' verde a la izquierda y flecha azul a la derecha */}
      <svg viewBox="0 0 130 72" className={`${scale} w-auto shrink-0 drop-shadow-sm`} fill="none">
        <defs>
          <linearGradient id="erquenciRibbonGrad" x1="4" y1="36" x2="124" y2="36" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#42C186" />
            <stop offset="45%" stopColor="#34B37B" />
            <stop offset="70%" stopColor="#2A8496" />
            <stop offset="100%" stopColor="#1E588D" />
          </linearGradient>
          <linearGradient id="erquenciBlueLoop" x1="65" y1="10" x2="125" y2="62" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#2A8698" />
            <stop offset="100%" stopColor="#1B4D7E" />
          </linearGradient>
        </defs>

        {/* Bucle derecho azul profundo */}
        <path
          d="M 66 22 C 74 11, 86 8, 98 8 C 114 8, 124 20, 124 36 C 124 52, 114 64, 98 64 C 84 64, 73 56, 65 45"
          stroke="url(#erquenciBlueLoop)"
          strokeWidth="10.5"
          strokeLinecap="round"
        />

        {/* Bucle izquierdo verde ('E') que cruza en diagonal formando la flecha central */}
        <path
          d="M 56 17 C 49 11, 41 8, 32 8 C 16 8, 6 20, 6 36 C 6 52, 16 64, 32 64 C 45 64, 54 55, 64 42 C 71 33, 79 29, 91 29"
          stroke="url(#erquenciRibbonGrad)"
          strokeWidth="10.5"
          strokeLinecap="round"
        />

        {/* Barra central de la 'E' verde */}
        <path
          d="M 10 36 L 44 36"
          stroke="#38BA80"
          strokeWidth="10"
          strokeLinecap="round"
        />

        {/* Punta de flecha integrada en el centro del lazo */}
        <path
          d="M 84 19 L 101 29 L 84 39 Z"
          fill="#267A94"
        />
      </svg>

      {/* Tipografía Corporativa */}
      <div className="flex flex-col justify-center">
        <div className="flex items-baseline leading-none">
          <span
            className="text-2xl sm:text-[26px] font-extrabold tracking-tight bg-clip-text text-transparent"
            style={{
              backgroundImage: 'linear-gradient(90deg, #34B37B 0%, #34B37B 28%, #288296 52%, #1E588D 100%)'
            }}
          >
            Erquenci
          </span>
        </div>
        <span className="text-[11px] sm:text-xs font-bold tracking-wide text-[#1B4D7E] mt-0.5">
          Traslados Ambulatorios
        </span>
        {showTagline && (
          <span className="text-[10px] italic text-[#34B37B] font-medium mt-0.5">
            Tu salud en buenas manos
          </span>
        )}
      </div>
    </div>
  );
};

// --- FONDO DECORATIVO CON ONDAS Y NODOS DE RED MÉDICA (ESTILO TARJETA ERQUENCI) ---
const FondoOndasErquenci = () => (
  <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#F2F7FA]">
    <svg className="w-full h-full opacity-55" viewBox="0 0 1440 900" preserveAspectRatio="none">
      <defs>
        <linearGradient id="waveGreenBlue" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34B37B" stopOpacity="0.16" />
          <stop offset="50%" stopColor="#4CA6A8" stopOpacity="0.10" />
          <stop offset="100%" stopColor="#1E588D" stopOpacity="0.18" />
        </linearGradient>
        <linearGradient id="waveBlueSoft" x1="100%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1E588D" stopOpacity="0.14" />
          <stop offset="100%" stopColor="#34B37B" stopOpacity="0.08" />
        </linearGradient>
      </defs>

      {/* Onda superior fluida */}
      <path
        d="M -100 180 C 280 40, 560 320, 960 160 C 1220 55, 1380 120, 1540 60 L 1540 -50 L -100 -50 Z"
        fill="url(#waveGreenBlue)"
      />
      {/* Onda inferior fluida */}
      <path
        d="M -100 760 C 320 620, 740 880, 1180 710 C 1340 650, 1440 680, 1540 640 L 1540 950 L -100 950 Z"
        fill="url(#waveBlueSoft)"
      />

      {/* Red de nodos médicos sutiles (esquina superior derecha) */}
      <g stroke="#288296" strokeWidth="1" opacity="0.18">
        <line x1="1120" y1="110" x2="1210" y2="165" />
        <line x1="1210" y1="165" x2="1310" y2="120" />
        <line x1="1210" y1="165" x2="1260" y2="245" />
        <line x1="1120" y1="110" x2="1060" y2="195" />
        <circle cx="1120" cy="110" r="4" fill="#34B37B" />
        <circle cx="1210" cy="165" r="5" fill="#1E588D" />
        <circle cx="1310" cy="120" r="3.5" fill="#34B37B" />
        <circle cx="1260" cy="245" r="4" fill="#288296" />
        <circle cx="1060" cy="195" r="3.5" fill="#1E588D" />
      </g>
    </svg>
  </div>
);

// --- CONFIGURACIÓN DE AMBAS BASES DE DATOS FIREBASE ---
const firebaseConfigAdmin = {
  apiKey: "AIzaSyDfPrfYlQDDWBVssGFjlWpz71E7CB4ks3k",
  authDomain: "erquenci-dash.firebaseapp.com",
  projectId: "erquenci-dash",
  storageBucket: "erquenci-dash.firebasestorage.app",
  messagingSenderId: "974564343174",
  appId: "1:974564343174:web:1b4fe29a5e24f4a216c007"
};

const firebaseConfigChoferes = {
  apiKey: "AIzaSyA6LjY_QMMV02HBXxS5e5foDDsQqJlQggs",
  authDomain: "erquenci-choferes.firebaseapp.com",
  projectId: "erquenci-choferes",
  storageBucket: "erquenci-choferes.firebasestorage.app",
  messagingSenderId: "597039670080",
  appId: "1:597039670080:web:65e86ffdc2c80cbd7e90a5"
};

let appAdmin = null;
let authAdmin = null;
let dbAdmin = null;

let appChoferes = null;
let authChoferes = null;
let dbChoferes = null;

try {
  appAdmin = initializeApp(firebaseConfigAdmin, 'adminApp');
  authAdmin = getAuth(appAdmin);
  dbAdmin = getFirestore(appAdmin);
} catch (e) {
  console.warn("Firebase Admin init notice:", e);
}

try {
  appChoferes = initializeApp(firebaseConfigChoferes, 'choferesApp');
  authChoferes = getAuth(appChoferes);
  dbChoferes = getFirestore(appChoferes);
} catch (e) {
  console.warn("Firebase Choferes init notice:", e);
}

// Usamos dbChoferes / dbAdmin de forma combinada o prioritaria
const auth = authAdmin || authChoferes;
const db = dbAdmin || dbChoferes;

const appId = typeof __app_id !== 'undefined' ? __app_id : 'erquenci-art-san-rafael';

// --- CATÁLOGOS DE SAN RAFAEL, MENDOZA ---
const CHOFERES_DISPONIBLES = [
  { id: 'ch-1', nombre: 'Carlos Mendoza', telefono: '+54 9 260 451-2890', licencia: 'Cat. D2 - Sanitario', rating: '4.9', foto: 'CM' },
  { id: 'ch-2', nombre: 'Martín Quiroga', telefono: '+54 9 260 462-9914', licencia: 'Cat. D2 - Emergencias', rating: '5.0', foto: 'MQ' },
  { id: 'ch-3', nombre: 'Laura Giménez', telefono: '+54 9 260 433-7721', licencia: 'Cat. D2 - Traslados', rating: '4.9', foto: 'LG' },
  { id: 'ch-4', nombre: 'Roberto Sosa', telefono: '+54 9 260 440-1182', licencia: 'Cat. D2 - Sanitario', rating: '4.8', foto: 'RS' }
];

const VEHICULOS_DISPONIBLES = [
  { id: 'vh-1', modelo: 'Renault Kangoo Express Adaptada', patente: 'AF 842 KL', tipo: 'Traslado Ambulatorio / Silla', color: 'Blanco / Verde Erquenci' },
  { id: 'vh-2', modelo: 'Fiat Cronos Precision ART', patente: 'AG 304 MN', tipo: 'Traslado Ambulatorio Ejecutivo', color: 'Blanco / Azul' },
  { id: 'vh-3', modelo: 'Peugeot Partner Patagónica', patente: 'AF 319 ZQ', tipo: 'Traslado Ambulatorio ART', color: 'Gris Plata' },
  { id: 'vh-4', modelo: 'Mercedes-Benz Sprinter UTIM', patente: 'AE 551 MP', tipo: 'Unidad Móvil Compleja / Camilla', color: 'Blanco / Verde' }
];

const ASEGURADORAS_ART = [
  'Prevención ART',
  'Galeno ART',
  'La Segunda ART',
  'Asociart ART',
  'Provincia ART',
  'Swiss Medical ART',
  'Experta ART'
];

const CENTROS_MEDICOS_SR = [
  { nombre: 'Policlínica Privada San Rafael (Av. Mitre 154)', coords: { x: 68, y: 34 } },
  { nombre: 'Hospital Teodoro J. Schestakow (Comandante Torres 150)', coords: { x: 75, y: 62 } },
  { nombre: 'Centro de Rehabilitación KineMed (Av. Hipólito Yrigoyen 890)', coords: { x: 35, y: 42 } },
  { nombre: 'Clínica Ciudad San Rafael (Av. El Libertador 420)', coords: { x: 54, y: 48 } },
  { nombre: 'Consultorios Traumatológicos del Sur (Av. San Martín 310)', coords: { x: 60, y: 52 } }
];

const TIPOS_MOVILIDAD = [
  'Ambulatorio (Camina por sus medios)',
  'Silla de Ruedas / Muletas',
  'Camilla / Asistencia Especial'
];

const ESTADOS_VIAJE = {
  PENDIENTE: { id: 'PENDIENTE', label: 'Pendiente de Asignación', color: 'bg-amber-50 text-amber-800 border-amber-200', progreso: 0 },
  ASIGNADO: { id: 'ASIGNADO', label: 'Unidad Asignada', color: 'bg-[#E6F4F1] text-[#1B4D7E] border-[#34B37B]/30', progreso: 5 },
  EN_CAMINO_DOMICILIO: { id: 'EN_CAMINO_DOMICILIO', label: 'En camino al domicilio', color: 'bg-sky-50 text-[#1E588D] border-sky-200', progreso: 25 },
  EN_DOMICILIO: { id: 'EN_DOMICILIO', label: 'En puerta / Esperando paciente', color: 'bg-teal-50 text-teal-800 border-teal-200', progreso: 45 },
  PACIENTE_A_BORDO: { id: 'PACIENTE_A_BORDO', label: 'Paciente a bordo - Hacia centro médico', color: 'bg-[#34B37B]/15 text-[#1B6B48] border-[#34B37B]/40', progreso: 75 },
  FINALIZADO: { id: 'FINALIZADO', label: 'Traslado Finalizado y Firmado', color: 'bg-slate-100 text-slate-800 border-slate-300', progreso: 100 }
};

// --- COMPONENTE DE MAPA INTERACTIVO DE SAN RAFAEL ---
const MapaSanRafael = ({ viaje, isSimulating }) => {
  if (!viaje) return null;

  const baseErquenci = { x: 48, y: 74 }; // Base operativa Erquenci (Zona Av. Balloffet)
  const origen = viaje.origenCoords || { x: 24, y: 60 }; // Casa del paciente
  const destino = viaje.destinoCoords || { x: 70, y: 34 }; // Centro médico

  const progreso = viaje.progreso || 0;

  let carPos = { ...baseErquenci };
  if (viaje.estado === 'PENDIENTE' || viaje.estado === 'ASIGNADO') {
    carPos = { ...baseErquenci };
  } else if (viaje.estado === 'EN_CAMINO_DOMICILIO') {
    const t = Math.min(1, Math.max(0, (progreso - 5) / 40));
    carPos = {
      x: baseErquenci.x + (origen.x - baseErquenci.x) * t,
      y: baseErquenci.y + (origen.y - baseErquenci.y) * t
    };
  } else if (viaje.estado === 'EN_DOMICILIO') {
    carPos = { ...origen };
  } else if (viaje.estado === 'PACIENTE_A_BORDO') {
    const t = Math.min(1, Math.max(0, (progreso - 45) / 50));
    carPos = {
      x: origen.x + (destino.x - origen.x) * t,
      y: origen.y + (destino.y - origen.y) * t
    };
  } else if (viaje.estado === 'FINALIZADO') {
    carPos = { ...destino };
  }

  return (
    <div className="relative w-full h-72 sm:h-80 md:h-96 bg-[#0F2537] rounded-2xl overflow-hidden border border-[#288296]/40 shadow-inner select-none">
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
        <defs>
          <pattern id="gridErquenci" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(52, 179, 123, 0.09)" strokeWidth="0.3" />
          </pattern>
          <linearGradient id="rutaErquenciGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#34B37B" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>
          <filter id="glowErquenci" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="1.4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Base cartográfica azul marino corporativo */}
        <rect width="100" height="100" fill="#0F2537" />
        <rect width="100" height="100" fill="url(#gridErquenci)" />

        {/* Parque Hipólito Yrigoyen */}
        <ellipse cx="26" cy="44" rx="9" ry="6" fill="rgba(52, 179, 123, 0.16)" stroke="rgba(52, 179, 123, 0.35)" strokeWidth="0.3" />
        <text x="26" y="44.5" fontSize="2.1" fill="#4AC48E" textAnchor="middle" opacity="0.85">Parque Yrigoyen</text>

        {/* Avenidas principales de San Rafael */}
        <path d="M 5 48 L 54 48" stroke="#234563" strokeWidth="1.4" />
        <path d="M 54 48 L 95 26" stroke="#234563" strokeWidth="1.4" />
        <path d="M 54 5 L 54 48" stroke="#234563" strokeWidth="1.4" />
        <path d="M 54 48 L 46 95" stroke="#234563" strokeWidth="1.4" />
        <path d="M 15 72 L 88 58" stroke="#18344D" strokeWidth="0.9" />
        <path d="M 32 18 L 78 82" stroke="#18344D" strokeWidth="0.9" />

        {/* Etiquetas de Avenidas y Rotonda del Mapa */}
        <text x="16" y="46.5" fontSize="2" fill="#7FA6C9" fontWeight="bold">Av. H. Yrigoyen</text>
        <text x="76" y="34" fontSize="2" fill="#7FA6C9" fontWeight="bold" transform="rotate(-27 76 34)">Av. Mitre</text>
        <text x="55.5" y="18" fontSize="2" fill="#7FA6C9" fontWeight="bold">Av. San Martín</text>
        <text x="41" y="84" fontSize="2" fill="#7FA6C9" fontWeight="bold">Av. Balloffet</text>
        <circle cx="54" cy="48" r="1.4" fill="none" stroke="#4AC48E" strokeWidth="0.4" />
        <text x="54" y="51.8" fontSize="2" fill="#A5C8E4" textAnchor="middle">Km 0</text>

        {/* Tramo 1: Base Erquenci -> Domicilio Paciente */}
        <line
          x1={baseErquenci.x}
          y1={baseErquenci.y}
          x2={origen.x}
          y2={origen.y}
          stroke="#4A7396"
          strokeWidth="0.8"
          strokeDasharray="1.5,1.5"
        />

        {/* Tramo 2: Domicilio Paciente -> Centro Médico (Degradado Verde a Azul Erquenci) */}
        <line
          x1={origen.x}
          y1={origen.y}
          x2={destino.x}
          y2={destino.y}
          stroke="url(#rutaErquenciGrad)"
          strokeWidth="1.8"
          strokeLinecap="round"
          filter="url(#glowErquenci)"
        />

        {/* Marcador: Base Erquenci */}
        <circle cx={baseErquenci.x} cy={baseErquenci.y} r="1.6" fill="#34B37B" />
        <text x={baseErquenci.x} y={baseErquenci.y + 3.8} fontSize="2" fill="#A5C8E4" textAnchor="middle">Base Erquenci</text>

        {/* Marcador: Domicilio del Paciente */}
        <circle cx={origen.x} cy={origen.y} r="3.4" fill="rgba(52, 179, 123, 0.25)" />
        <circle cx={origen.x} cy={origen.y} r="1.9" fill="#34B37B" stroke="#fff" strokeWidth="0.45" />

        {/* Marcador: Centro Médico Destino */}
        <circle cx={destino.x} cy={destino.y} r="3.5" fill="rgba(56, 189, 248, 0.25)" />
        <circle cx={destino.x} cy={destino.y} r="2" fill="#23649E" stroke="#fff" strokeWidth="0.45" />
      </svg>

      {/* Etiquetas HTML flotantes */}
      <div 
        style={{ left: `${origen.x}%`, top: `${origen.y}%` }} 
        className="absolute -translate-x-1/2 -translate-y-full -mt-2 pointer-events-none z-10"
      >
        <div className="bg-[#34B37B] text-white text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full shadow-lg whitespace-nowrap flex items-center gap-1 border border-white/40">
          <MapPin className="w-3 h-3" /> Domicilio Paciente
        </div>
      </div>

      <div 
        style={{ left: `${destino.x}%`, top: `${destino.y}%` }} 
        className="absolute -translate-x-1/2 -translate-y-full -mt-2 pointer-events-none z-10"
      >
        <div className="bg-[#1E588D] text-white text-[10px] sm:text-xs font-bold px-2.5 py-0.5 rounded-full shadow-lg whitespace-nowrap flex items-center gap-1 border border-white/40">
          <Building2 className="w-3 h-3" /> Centro Médico
        </div>
      </div>

      {/* Vehículo Móvil Animado en Tiempo Real */}
      <div
        style={{ left: `${carPos.x}%`, top: `${carPos.y}%` }}
        className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-700 ease-out z-20"
      >
        <div className="relative flex flex-col items-center">
          {(isSimulating || viaje.estado === 'EN_CAMINO_DOMICILIO' || viaje.estado === 'PACIENTE_A_BORDO') && (
            <span className="animate-ping absolute inline-flex h-9 w-9 rounded-full bg-[#34B37B] opacity-65"></span>
          )}
          <div
            className="text-white p-1.5 sm:p-2 rounded-full shadow-xl border-2 border-white flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #34B37B 0%, #1E588D 100%)' }}
          >
            <Ambulance className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <span className="mt-1 bg-[#0A1926]/90 text-[#4AC48E] border border-[#34B37B]/50 text-[10px] font-mono px-1.5 py-0.2 rounded shadow">
            {viaje.vehiculoPatente || 'Móvil Erquenci'}
          </span>
        </div>
      </div>

      {/* Leyenda superior derecha */}
      <div className="absolute top-3 right-3 bg-[#0A1926]/85 backdrop-blur-md border border-[#288296]/50 rounded-xl px-3 py-1.5 text-xs text-slate-200 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-[#34B37B] animate-pulse"></span>
        <span>GPS San Rafael • En vivo</span>
      </div>
    </div>
  );
};

// --- COMPONENTE DE PAD DE FIRMA DIGITAL TÁCTIL ---
const PadFirmaDigital = ({ onGuardarFirma, firmaExistente }) => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasStrokes, setHasStrokes] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const resizeCanvas = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = 180;
      const ctx = canvas.getContext('2d');
      ctx.lineWidth = 3;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.strokeStyle = '#1B4D7E';
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    if (e.touches && e.touches.length > 0) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const startDrawing = (e) => {
    e.preventDefault();
    const { x, y } = getCoordinates(e);
    const ctx = canvasRef.current.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(x, y);
    setIsDrawing(true);
    setHasStrokes(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    e.preventDefault();
    const { x, y } = getCoordinates(e);
    const ctx = canvasRef.current.getContext('2d');
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const limpiarFirma = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasStrokes(false);
  };

  const confirmarFirma = () => {
    if (!hasStrokes) return;
    const dataUrl = canvasRef.current.toDataURL('image/png');
    onGuardarFirma(dataUrl);
  };

  if (firmaExistente) {
    return (
      <div className="bg-[#E6F4F1] border border-[#34B37B]/40 rounded-xl p-4 text-center">
        <div className="flex items-center justify-center gap-2 text-[#1B6B48] font-semibold mb-2">
          <CheckCircle2 className="w-5 h-5 text-[#34B37B]" />
          <span>Conformidad de Traslado Firmada</span>
        </div>
        <div className="bg-white border border-[#34B37B]/20 rounded-lg p-2 inline-block shadow-sm">
          <img src={firmaExistente} alt="Firma del paciente" className="h-24 object-contain" />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F2F7FA] border-2 border-dashed border-[#288296]/40 rounded-2xl p-4">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold text-[#1B4D7E] flex items-center gap-1.5">
          <FileSignature className="w-4 h-4 text-[#34B37B]" />
          Firma del Paciente o Acompañante (Con el dedo o mouse)
        </span>
        <span className="text-xs text-[#288296] font-medium">Conformidad ART</span>
      </div>

      <div className="w-full bg-white rounded-xl border border-slate-200 overflow-hidden touch-none shadow-inner">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className="w-full h-[180px] cursor-crosshair block"
        />
      </div>

      <div className="flex flex-wrap items-center justify-end gap-2 mt-3">
        <button
          type="button"
          onClick={limpiarFirma}
          className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-300 rounded-xl hover:bg-slate-100 flex items-center gap-1.5 transition"
        >
          <RotateCcw className="w-4 h-4" /> Limpiar
        </button>
        <button
          type="button"
          disabled={!hasStrokes}
          onClick={confirmarFirma}
          style={hasStrokes ? { background: 'linear-gradient(135deg, #34B37B 0%, #1E588D 100%)' } : {}}
          className={`px-5 py-2 text-sm font-semibold text-white rounded-xl flex items-center gap-1.5 shadow-sm transition ${
            hasStrokes 
              ? 'hover:opacity-95 cursor-pointer' 
              : 'bg-slate-300 cursor-not-allowed'
          }`}
        >
          <Save className="w-4 h-4" /> Guardar Firma y Finalizar Viaje
        </button>
      </div>
    </div>
  );
};

// --- COMPONENTE PRINCIPAL DE LA APLICACIÓN ERQUENCI ---
export default function App() {
  const [user, setUser] = useState(null);
  const [rolActivo, setRolActivo] = useState('EMPLEADOR'); // 'EMPLEADOR' | 'CHOFER' | 'PACIENTE'
  const [traslados, setTraslados] = useState([]);
  const [viajeSeleccionadoId, setViajeSeleccionadoId] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [notificacion, setNotificacion] = useState(null);
  const [simulandoGPS, setSimulandoGPS] = useState(false);

  // Estado del formulario de nuevo traslado (Empleador)
  const [mostrarFormNuevo, setMostrarFormNuevo] = useState(false);
  const [nuevoTraslado, setNuevoTraslado] = useState({
    pacienteNombre: '',
    pacienteDni: '',
    pacienteTelefono: '',
    aseguradoraArt: ASEGURADORAS_ART[0],
    numeroSiniestro: '',
    origenDireccion: '',
    destinoNombre: CENTROS_MEDICOS_SR[0].nombre,
    fecha: new Date().toISOString().split('T')[0],
    hora: '10:30',
    movilidad: TIPOS_MOVILIDAD[0],
    choferId: CHOFERES_DISPONIBLES[0].id,
    vehiculoId: VEHICULOS_DISPONIBLES[0].id,
    observaciones: ''
  });

  // Mostrar mensaje temporal no intrusivo
  const mostrarToast = (mensaje, tipo = 'success') => {
    setNotificacion({ mensaje, tipo });
    setTimeout(() => setNotificacion(null), 4000);
  };

  // 1. Autenticación Firebase (Regla 3)
  useEffect(() => {
    const initAuth = async () => {
      try {
        if (!auth) return;
        if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
          await signInWithCustomToken(auth, __initial_auth_token);
        } else {
          await signInAnonymously(auth);
        }
      } catch (err) {
        console.warn('Modo sin autenticación en nube o configuración pendiente:', err?.message || err);
        setUser({ uid: 'local-user-erquenci' });
      }
    };
    initAuth();
    if (!auth) {
      setUser({ uid: 'local-user-erquenci' });
      return;
    }
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        setUser({ uid: 'local-user-erquenci' });
      }
    }, (err) => {
      setUser({ uid: 'local-user-erquenci' });
    });
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  // 2. Suscripción en tiempo real a traslados y carga de datos de ejemplo si está vacío
  useEffect(() => {
    if (!user) return;

    const datosDemoIniciales = [
      {
        id: 'demo-1',
        pacienteNombre: 'Juan Carlos Pereyra',
        pacienteDni: '28.451.902',
        pacienteTelefono: '+54 9 260 458-1120',
        aseguradoraArt: 'Prevención ART',
        numeroSiniestro: 'ART-992841',
        origenDireccion: 'Av. Hipólito Yrigoyen 1420, San Rafael',
        origenCoords: { x: 22, y: 52 },
        destinoNombre: 'Policlínica Privada San Rafael (Av. Mitre 154)',
        destinoCoords: { x: 68, y: 34 },
        fecha: new Date().toISOString().split('T')[0],
        hora: '11:30',
        movilidad: 'Silla de Ruedas / Muletas',
        estado: 'EN_CAMINO_DOMICILIO',
        progreso: 28,
        etaMinutos: 7,
        choferId: 'ch-1',
        choferNombre: 'Carlos Mendoza',
        choferTelefono: '+54 9 260 451-2890',
        choferFoto: 'CM',
        vehiculoId: 'vh-1',
        vehiculoModelo: 'Renault Kangoo Express Adaptada',
        vehiculoPatente: 'AF 842 KL',
        observaciones: 'Paciente con bota ortopédica en pierna derecha.',
        firmaUrl: null,
        creadoEn: Date.now()
      },
      {
        id: 'demo-2',
        pacienteNombre: 'María Elena Rodríguez',
        pacienteDni: '33.109.445',
        pacienteTelefono: '+54 9 260 422-3391',
        aseguradoraArt: 'Galeno ART',
        numeroSiniestro: 'GAL-44019',
        origenDireccion: 'Calle Paula Albarracín 340, Barrio Unimev',
        origenCoords: { x: 30, y: 66 },
        destinoNombre: 'Centro de Rehabilitación KineMed (Av. Hipólito Yrigoyen 890)',
        destinoCoords: { x: 35, y: 42 },
        fecha: new Date().toISOString().split('T')[0],
        hora: '12:15',
        movilidad: 'Ambulatorio (Camina por sus medios)',
        estado: 'ASIGNADO',
        progreso: 5,
        etaMinutos: 14,
        choferId: 'ch-2',
        choferNombre: 'Martín Quiroga',
        choferTelefono: '+54 9 260 462-9914',
        choferFoto: 'MQ',
        vehiculoId: 'vh-2',
        vehiculoModelo: 'Fiat Cronos Precision ART',
        vehiculoPatente: 'AG 304 MN',
        observaciones: 'Sesión de kinesiología post-operatoria hombro.',
        firmaUrl: null,
        creadoEn: Date.now() - 10000
      }
    ];

    if (!db) {
      setTraslados(datosDemoIniciales);
      setViajeSeleccionadoId('demo-1');
      setCargando(false);
      return;
    }

    const colRef = collection(db, 'artifacts', appId, 'public', 'data', 'traslados_erquenci');

    // Sembrar datos iniciales de San Rafael si la colección está vacía
    const inicializarDatosDemo = async () => {
      try {
        const snapshot = await getDocs(colRef);
        if (snapshot.empty) {
          for (const d of datosDemoIniciales) {
            const { id, ...resto } = d;
            await addDoc(colRef, resto);
          }
        }
      } catch (e) {
        console.warn('Usando modo local por restricciones de permisos de Firebase:', e);
        setTraslados(datosDemoIniciales);
        setViajeSeleccionadoId('demo-1');
        setCargando(false);
      }
    };

    inicializarDatosDemo();

    let unsubscribe = () => {};
    try {
      unsubscribe = onSnapshot(
        colRef,
        (snapshot) => {
          const lista = snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            ...docSnap.data()
          }));
          if (lista.length > 0) {
            lista.sort((a, b) => (b.creadoEn || 0) - (a.creadoEn || 0));
            setTraslados(lista);
            if (!viajeSeleccionadoId) {
              setViajeSeleccionadoId(lista[0].id);
            }
          } else {
            setTraslados(datosDemoIniciales);
          }
          setCargando(false);
        },
        (error) => {
          console.warn('Error en snapshot, cargando respaldo local:', error);
          setTraslados(datosDemoIniciales);
          if (!viajeSeleccionadoId) setViajeSeleccionadoId('demo-1');
          setCargando(false);
        }
      );
    } catch (err) {
      setTraslados(datosDemoIniciales);
      if (!viajeSeleccionadoId) setViajeSeleccionadoId('demo-1');
      setCargando(false);
    }

    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, [user]);

  // Mantener actualizado el viaje seleccionado
  const viajeActivo = traslados.find((t) => t.id === viajeSeleccionadoId) || traslados[0] || null;

  // Simulación automática de avance GPS cuando el usuario activa el botón de demostración
  useEffect(() => {
    if (!simulandoGPS || !viajeActivo || !user) return;

    const interval = setInterval(async () => {
      const progActual = viajeActivo.progreso || 0;
      
      if (db) {
        try {
          const docRef = doc(db, 'artifacts', appId, 'public', 'data', 'traslados_erquenci', viajeActivo.id);
          if (viajeActivo.estado === 'EN_CAMINO_DOMICILIO') {
            if (progActual < 45) {
              const nuevoProg = Math.min(45, progActual + 5);
              const nuevoEta = Math.max(1, Math.round((45 - nuevoProg) / 5));
              await updateDoc(docRef, { progreso: nuevoProg, etaMinutos: nuevoEta });
            } else {
              await updateDoc(docRef, { estado: 'EN_DOMICILIO', progreso: 45, etaMinutos: 0 });
              setSimulandoGPS(false);
              mostrarToast('¡La unidad llegó al domicilio del paciente!');
            }
          } else if (viajeActivo.estado === 'PACIENTE_A_BORDO') {
            if (progActual < 95) {
              const nuevoProg = Math.min(95, progActual + 5);
              const nuevoEta = Math.max(1, Math.round((95 - nuevoProg) / 5));
              await updateDoc(docRef, { progreso: nuevoProg, etaMinutos: nuevoEta });
            } else {
              setSimulandoGPS(false);
              mostrarToast('Llegada al centro médico. Solicite la firma del paciente.');
            }
          } else {
            setSimulandoGPS(false);
          }
        } catch (e) {
          // Fallback actualización local en memoria si Firestore falla
          actualizarViajeLocal(viajeActivo.id, { progreso: progActual + 5 });
        }
      } else {
        // Modo local exclusivo
        actualizarViajeLocal(viajeActivo.id, { progreso: Math.min(95, progActual + 5) });
      }
    }, 1200);

    return () => clearInterval(interval);
  }, [simulandoGPS, viajeActivo, user]);

  const actualizarViajeLocal = (id, cambios) => {
    setTraslados((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...cambios } : t))
    );
  };

  // --- ACCIONES DE EMPLEADOR ---
  const handleCrearTraslado = async (e) => {
    e.preventDefault();
    if (!user) return;

    const chofer = CHOFERES_DISPONIBLES.find((c) => c.id === nuevoTraslado.choferId);
    const vehiculo = VEHICULOS_DISPONIBLES.find((v) => v.id === nuevoTraslado.vehiculoId);
    const centro = CENTROS_MEDICOS_SR.find((cm) => cm.nombre === nuevoTraslado.destinoNombre) || CENTROS_MEDICOS_SR[0];

    const randomOrigen = {
      x: Math.floor(15 + Math.random() * 32),
      y: Math.floor(35 + Math.random() * 40)
    };

    const payload = {
      pacienteNombre: nuevoTraslado.pacienteNombre,
      pacienteDni: nuevoTraslado.pacienteDni,
      pacienteTelefono: nuevoTraslado.pacienteTelefono || '+54 9 260 400-0000',
      aseguradoraArt: nuevoTraslado.aseguradoraArt,
      numeroSiniestro: nuevoTraslado.numeroSiniestro || `SIN-${Math.floor(10000 + Math.random() * 90000)}`,
      origenDireccion: nuevoTraslado.origenDireccion,
      origenCoords: randomOrigen,
      destinoNombre: centro.nombre,
      destinoCoords: centro.coords,
      fecha: nuevoTraslado.fecha,
      hora: nuevoTraslado.hora,
      movilidad: nuevoTraslado.movilidad,
      estado: chofer && vehiculo ? 'ASIGNADO' : 'PENDIENTE',
      progreso: chofer && vehiculo ? 5 : 0,
      etaMinutos: 15,
      choferId: chofer ? chofer.id : '',
      choferNombre: chofer ? chofer.nombre : '',
      choferTelefono: chofer ? chofer.telefono : '',
      choferFoto: chofer ? chofer.foto : '',
      vehiculoId: vehiculo ? vehiculo.id : '',
      vehiculoModelo: vehiculo ? vehiculo.modelo : '',
      vehiculoPatente: vehiculo ? vehiculo.patente : '',
      observaciones: nuevoTraslado.observaciones,
      firmaUrl: null,
      creadoEn: Date.now()
    };

    try {
      if (db) {
        const colRef = collection(db, 'artifacts', appId, 'public', 'data', 'traslados_erquenci');
        const docCreated = await addDoc(colRef, payload);
        setViajeSeleccionadoId(docCreated.id);
      } else {
        const newId = 'local-' + Date.now();
        setTraslados((prev) => [{ id: newId, ...payload }, ...prev]);
        setViajeSeleccionadoId(newId);
      }
      setMostrarFormNuevo(false);
      setNuevoTraslado({
        ...nuevoTraslado,
        pacienteNombre: '',
        pacienteDni: '',
        pacienteTelefono: '',
        numeroSiniestro: '',
        origenDireccion: '',
        observaciones: ''
      });
      mostrarToast('Traslado agendado y unidad asignada correctamente.');
    } catch (err) {
      console.warn('Error al crear en nube, guardando local:', err);
      const newId = 'local-' + Date.now();
      setTraslados((prev) => [{ id: newId, ...payload }, ...prev]);
      setViajeSeleccionadoId(newId);
      setMostrarFormNuevo(false);
      mostrarToast('Traslado agendado en modo local.');
    }
  };

  const handleReasignarUnidad = async (trasladoId, nuevoChoferId, nuevoVehiculoId) => {
    if (!user) return;
    const chofer = CHOFERES_DISPONIBLES.find((c) => c.id === nuevoChoferId);
    const vehiculo = VEHICULOS_DISPONIBLES.find((v) => v.id === nuevoVehiculoId);
    if (!chofer || !vehiculo) return;

    try {
      if (db) {
        const docRef = doc(db, 'artifacts', appId, 'public', 'data', 'traslados_erquenci', trasladoId);
        await updateDoc(docRef, {
          choferId: chofer.id,
          choferNombre: chofer.nombre,
          choferTelefono: chofer.telefono,
          choferFoto: chofer.foto,
          vehiculoId: vehiculo.id,
          vehiculoModelo: vehiculo.modelo,
          vehiculoPatente: vehiculo.patente,
          estado: 'ASIGNADO',
          progreso: 5
        });
      } else {
        actualizarViajeLocal(trasladoId, {
          choferId: chofer.id,
          choferNombre: chofer.nombre,
          choferTelefono: chofer.telefono,
          choferFoto: chofer.foto,
          vehiculoId: vehiculo.id,
          vehiculoModelo: vehiculo.modelo,
          vehiculoPatente: vehiculo.patente,
          estado: 'ASIGNADO',
          progreso: 5
        });
      }
      mostrarToast(`Unidad actualizada: ${chofer.nombre} (${vehiculo.patente})`);
    } catch (err) {
      actualizarViajeLocal(trasladoId, {
        choferId: chofer.id,
        choferNombre: chofer.nombre,
        choferTelefono: chofer.telefono,
        choferFoto: chofer.foto,
        vehiculoId: vehiculo.id,
        vehiculoModelo: vehiculo.modelo,
        vehiculoPatente: vehiculo.patente,
        estado: 'ASIGNADO',
        progreso: 5
      });
    }
  };

  // --- ACCIONES DE CHOFER ---
  const handleCambiarEstadoChofer = async (nuevoEstado) => {
    if (!user || !viajeActivo) return;
    setSimulandoGPS(false);

    const infoEstado = ESTADOS_VIAJE[nuevoEstado];
    let nuevoEta = 0;
    if (nuevoEstado === 'EN_CAMINO_DOMICILIO') nuevoEta = 9;
    if (nuevoEstado === 'PACIENTE_A_BORDO') nuevoEta = 12;

    try {
      if (db) {
        const docRef = doc(db, 'artifacts', appId, 'public', 'data', 'traslados_erquenci', viajeActivo.id);
        await updateDoc(docRef, {
          estado: nuevoEstado,
          progreso: infoEstado.progreso,
          etaMinutos: nuevoEta
        });
      } else {
        actualizarViajeLocal(viajeActivo.id, {
          estado: nuevoEstado,
          progreso: infoEstado.progreso,
          etaMinutos: nuevoEta
        });
      }
      mostrarToast(`Estado actualizado: ${infoEstado.label}`);
    } catch (err) {
      actualizarViajeLocal(viajeActivo.id, {
        estado: nuevoEstado,
        progreso: infoEstado.progreso,
        etaMinutos: nuevoEta
      });
      mostrarToast(`Estado actualizado: ${infoEstado.label}`);
    }
  };

  const handleGuardarFirmaDigital = async (firmaDataUrl) => {
    if (!user || !viajeActivo) return;
    const horaFin = new Date().toLocaleTimeString('es-AR', { hour: '2-digit', minute: '2-digit' });
    try {
      if (db) {
        const docRef = doc(db, 'artifacts', appId, 'public', 'data', 'traslados_erquenci', viajeActivo.id);
        await updateDoc(docRef, {
          firmaUrl: firmaDataUrl,
          estado: 'FINALIZADO',
          progreso: 100,
          etaMinutos: 0,
          horaFinalizacion: horaFin
        });
      } else {
        actualizarViajeLocal(viajeActivo.id, {
          firmaUrl: firmaDataUrl,
          estado: 'FINALIZADO',
          progreso: 100,
          etaMinutos: 0,
          horaFinalizacion: horaFin
        });
      }
      mostrarToast('¡Firma guardada! Traslado ART finalizado con éxito.');
    } catch (err) {
      actualizarViajeLocal(viajeActivo.id, {
        firmaUrl: firmaDataUrl,
        estado: 'FINALIZADO',
        progreso: 100,
        etaMinutos: 0,
        horaFinalizacion: horaFin
      });
      mostrarToast('¡Firma guardada con éxito!');
    }
  };

  return (
    <div className="min-h-screen text-slate-800 font-sans flex flex-col relative">
      {/* FONDO CORPORATIVO CON ONDAS Y RED MÉDICA DE ERQUENCI */}
      <FondoOndasErquenci />

      {/* NOTIFICACIÓN FLOTANTE */}
      {notificacion && (
        <div className="fixed bottom-5 right-5 z-50 animate-bounce">
          <div className={`px-4 py-3 rounded-xl shadow-xl border flex items-center gap-2.5 text-sm font-medium ${
            notificacion.tipo === 'error' 
              ? 'bg-red-600 text-white border-red-700' 
              : 'bg-[#123658] text-white border-[#34B37B]/50'
          }`}>
            <CheckCircle2 className="w-5 h-5 text-[#4AC48E] shrink-0" />
            <span>{notificacion.mensaje}</span>
          </div>
        </div>
      )}

      {/* BARRA SUPERIOR DE NAVEGACIÓN Y CAMBIO DE ROL */}
      <header className="bg-white/90 backdrop-blur-md border-b border-[#288296]/20 sticky top-0 z-40 shadow-sm">
        {/* Franja superior institucional */}
        <div
          className="text-white text-[11px] font-semibold tracking-wider text-center py-1 px-4"
          style={{ background: 'linear-gradient(90deg, #34B37B 0%, #268295 50%, #1B4D7E 100%)' }}
        >
          TRASLADOS AMBULATORIOS PROFESIONALES Y SEGUROS • SAN RAFAEL, MENDOZA • COBERTURA INTEGRAL 24/7
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Logo Oficial Erquenci */}
          <div className="flex items-center justify-between w-full md:w-auto">
            <LogoErquenci size="md" showTagline={true} />
          </div>

          {/* Selector de Vistas / Roles */}
          <div className="flex items-center bg-[#EBF3F7] p-1 rounded-xl border border-[#288296]/20 w-full md:w-auto overflow-x-auto">
            <button
              onClick={() => setRolActivo('EMPLEADOR')}
              className={`flex-1 md:flex-none px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition whitespace-nowrap ${
                rolActivo === 'EMPLEADOR'
                  ? 'bg-white text-[#1B4D7E] shadow-sm border border-[#34B37B]/30'
                  : 'text-slate-600 hover:text-[#1B4D7E]'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-[#34B37B]" />
              <span>1. Empleador (Despacho)</span>
            </button>

            <button
              onClick={() => setRolActivo('CHOFER')}
              className={`flex-1 md:flex-none px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition whitespace-nowrap ${
                rolActivo === 'CHOFER'
                  ? 'bg-white text-[#1B4D7E] shadow-sm border border-[#34B37B]/30'
                  : 'text-slate-600 hover:text-[#1B4D7E]'
              }`}
            >
              <Car className="w-4 h-4 text-[#23649E]" />
              <span>2. App Chofer</span>
            </button>

            <button
              onClick={() => setRolActivo('PACIENTE')}
              className={`flex-1 md:flex-none px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold flex items-center justify-center gap-1.5 transition whitespace-nowrap ${
                rolActivo === 'PACIENTE'
                  ? 'bg-white text-[#1B6B48] shadow-sm border border-[#34B37B]/30'
                  : 'text-slate-600 hover:text-[#1B6B48]'
              }`}
            >
              <Navigation className="w-4 h-4 text-[#34B37B]" />
              <span>3. Paciente / ART</span>
            </button>
          </div>
        </div>
      </header>

      {/* SELECTOR RÁPIDO DE TRASLADO ACTIVO */}
      {traslados.length > 0 && (
        <div className="bg-[#123658] text-slate-100 border-b border-[#288296]/30 relative z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 overflow-x-auto py-1">
              <span className="text-[#8EC5DF] font-medium whitespace-nowrap">Traslado activo:</span>
              {traslados.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    setSimulandoGPS(false);
                    setViajeSeleccionadoId(t.id);
                  }}
                  style={viajeActivo?.id === t.id ? { background: 'linear-gradient(90deg, #34B37B 0%, #23649E 100%)' } : {}}
                  className={`px-3 py-1 rounded-full font-medium transition whitespace-nowrap flex items-center gap-1.5 ${
                    viajeActivo?.id === t.id
                      ? 'text-white shadow border border-white/25'
                      : 'bg-[#1B4D7E]/70 text-slate-200 hover:bg-[#23649E]'
                  }`}
                >
                  <span>{t.pacienteNombre}</span>
                  <span className="opacity-80">({t.aseguradoraArt})</span>
                </button>
              ))}
            </div>
            <div className="hidden sm:flex items-center gap-1.5 text-[#4AC48E] font-medium">
              <Activity className="w-3.5 h-3.5" />
              <span>Atención Centrada en el Paciente</span>
            </div>
          </div>
        </div>
      )}

      {/* CONTENIDO PRINCIPAL SEGÚN EL ROL ELEGIDO */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 relative z-10">
        {cargando ? (
          <div className="flex flex-col items-center justify-center py-20 text-[#1B4D7E]">
            <div className="w-10 h-10 border-4 border-[#34B37B] border-t-[#1B4D7E] rounded-full animate-spin mb-3"></div>
            <p className="font-medium">Conectando con central operativa Erquenci...</p>
          </div>
        ) : (
          <>
            {/* ===================================================================== */}
            {/* VISTA 1: EMPLEADOR / DESPACHADOR DE ERQUENCI                          */}
            {/* ===================================================================== */}
            {rolActivo === 'EMPLEADOR' && (
              <div className="space-y-6">
                {/* Cabecera y KPIs */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-[#1B4D7E]">Panel de Despacho y Flota</h2>
                    <p className="text-sm text-slate-600">
                      Agendá pacientes de ART, asigná choferes y auditá traslados ambulatorios en San Rafael.
                    </p>
                  </div>
                  <button
                    onClick={() => setMostrarFormNuevo(!mostrarFormNuevo)}
                    style={{ background: 'linear-gradient(135deg, #34B37B 0%, #1E588D 100%)' }}
                    className="hover:opacity-95 text-white font-semibold px-5 py-2.5 rounded-xl shadow-md flex items-center justify-center gap-2 transition"
                  >
                    <Plus className="w-5 h-5" />
                    <span>{mostrarFormNuevo ? 'Cerrar Formulario' : 'Agendar Nuevo Traslado ART'}</span>
                  </button>
                </div>

                {/* Tarjetas de Resumen */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-[#288296]/20 shadow-sm">
                    <span className="text-xs font-semibold text-slate-500 uppercase">Traslados Hoy</span>
                    <div className="text-2xl font-bold text-[#1B4D7E] mt-1">{traslados.length}</div>
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-[#288296]/20 shadow-sm">
                    <span className="text-xs font-semibold text-[#23649E] uppercase">En Curso</span>
                    <div className="text-2xl font-bold text-[#23649E] mt-1">
                      {traslados.filter((t) => t.estado !== 'FINALIZADO' && t.estado !== 'PENDIENTE').length}
                    </div>
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-[#34B37B]/30 shadow-sm">
                    <span className="text-xs font-semibold text-[#34B37B] uppercase">Completados y Firmados</span>
                    <div className="text-2xl font-bold text-[#1B6B48] mt-1">
                      {traslados.filter((t) => t.estado === 'FINALIZADO').length}
                    </div>
                  </div>
                  <div className="bg-white/90 backdrop-blur-sm p-4 rounded-2xl border border-[#288296]/20 shadow-sm">
                    <span className="text-xs font-semibold text-slate-500 uppercase">Unidades Modernas</span>
                    <div className="text-2xl font-bold text-[#1B4D7E] mt-1">{VEHICULOS_DISPONIBLES.length}</div>
                  </div>
                </div>

                {/* FORMULARIO PARA AGENDAR NUEVO PACIENTE ART */}
                {mostrarFormNuevo && (
                  <form onSubmit={handleCrearTraslado} className="bg-white/95 backdrop-blur-md rounded-2xl border border-[#34B37B]/40 shadow-xl p-6 space-y-5">
                    <div className="border-b border-slate-100 pb-3 flex items-center justify-between">
                      <h3 className="text-lg font-bold text-[#1B4D7E] flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-[#34B37B]" />
                        Nueva Orden de Traslado Ambulatorio ART
                      </h3>
                      <span className="text-xs bg-[#E6F4F1] text-[#1B6B48] px-3 py-1 rounded-full font-semibold">
                        San Rafael, Mendoza
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Nombre Completo del Paciente *</label>
                        <input
                          type="text"
                          required
                          placeholder="Ej: Roberto Gómez"
                          value={nuevoTraslado.pacienteNombre}
                          onChange={(e) => setNuevoTraslado({ ...nuevoTraslado, pacienteNombre: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#34B37B] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">DNI del Paciente *</label>
                        <input
                          type="text"
                          required
                          placeholder="Ej: 30.123.456"
                          value={nuevoTraslado.pacienteDni}
                          onChange={(e) => setNuevoTraslado({ ...nuevoTraslado, pacienteDni: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#34B37B] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Teléfono del Paciente</label>
                        <input
                          type="text"
                          placeholder="Ej: +54 9 260 455-1234"
                          value={nuevoTraslado.pacienteTelefono}
                          onChange={(e) => setNuevoTraslado({ ...nuevoTraslado, pacienteTelefono: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#34B37B] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Aseguradora ART *</label>
                        <select
                          value={nuevoTraslado.aseguradoraArt}
                          onChange={(e) => setNuevoTraslado({ ...nuevoTraslado, aseguradoraArt: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-[#34B37B] outline-none"
                        >
                          {ASEGURADORAS_ART.map((art) => (
                            <option key={art} value={art}>{art}</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">N° Siniestro / Autorización</label>
                        <input
                          type="text"
                          placeholder="Ej: ART-88210"
                          value={nuevoTraslado.numeroSiniestro}
                          onChange={(e) => setNuevoTraslado({ ...nuevoTraslado, numeroSiniestro: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#34B37B] outline-none"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-xs font-semibold text-slate-600 mb-1">Fecha *</label>
                          <input
                            type="date"
                            required
                            value={nuevoTraslado.fecha}
                            onChange={(e) => setNuevoTraslado({ ...nuevoTraslado, fecha: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-600 mb-1">Hora *</label>
                          <input
                            type="time"
                            required
                            value={nuevoTraslado.hora}
                            onChange={(e) => setNuevoTraslado({ ...nuevoTraslado, hora: e.target.value })}
                            className="w-full px-3 py-2 rounded-xl border border-slate-300 text-sm outline-none"
                          />
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Domicilio de Origen (San Rafael) *</label>
                        <input
                          type="text"
                          required
                          placeholder="Ej: Av. Balloffet 850, San Rafael"
                          value={nuevoTraslado.origenDireccion}
                          onChange={(e) => setNuevoTraslado({ ...nuevoTraslado, origenDireccion: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-[#34B37B] outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Centro Médico / Rehabilitación *</label>
                        <select
                          value={nuevoTraslado.destinoNombre}
                          onChange={(e) => setNuevoTraslado({ ...nuevoTraslado, destinoNombre: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm bg-white focus:ring-2 focus:ring-[#34B37B] outline-none"
                        >
                          {CENTROS_MEDICOS_SR.map((c) => (
                            <option key={c.nombre} value={c.nombre}>{c.nombre}</option>
                          ))}
                        </select>
                      </div>

                      {/* ASIGNACIÓN DE CHOFER Y VEHÍCULO */}
                      <div className="bg-[#E6F4F1]/70 p-3.5 rounded-xl border border-[#34B37B]/30">
                        <label className="block text-xs font-bold text-[#1B4D7E] mb-1">Asignar Chofer Erquenci</label>
                        <select
                          value={nuevoTraslado.choferId}
                          onChange={(e) => setNuevoTraslado({ ...nuevoTraslado, choferId: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-[#34B37B]/30 text-sm bg-white outline-none"
                        >
                          {CHOFERES_DISPONIBLES.map((ch) => (
                            <option key={ch.id} value={ch.id}>{ch.nombre} ({ch.licencia})</option>
                          ))}
                        </select>
                      </div>

                      <div className="bg-[#E6F4F1]/70 p-3.5 rounded-xl border border-[#34B37B]/30">
                        <label className="block text-xs font-bold text-[#1B4D7E] mb-1">Asignar Vehículo / Unidad</label>
                        <select
                          value={nuevoTraslado.vehiculoId}
                          onChange={(e) => setNuevoTraslado({ ...nuevoTraslado, vehiculoId: e.target.value })}
                          className="w-full px-3 py-2 rounded-lg border border-[#34B37B]/30 text-sm bg-white outline-none"
                        >
                          {VEHICULOS_DISPONIBLES.map((vh) => (
                            <option key={vh.id} value={vh.id}>{vh.modelo} - [{vh.patente}]</option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">Tipo de Movilidad / Notas</label>
                        <select
                          value={nuevoTraslado.movilidad}
                          onChange={(e) => setNuevoTraslado({ ...nuevoTraslado, movilidad: e.target.value })}
                          className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm bg-white outline-none"
                        >
                          {TIPOS_MOVILIDAD.map((m) => (
                            <option key={m} value={m}>{m}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-2">
                      <button
                        type="button"
                        onClick={() => setMostrarFormNuevo(false)}
                        className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-xl"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        style={{ background: 'linear-gradient(135deg, #34B37B 0%, #1E588D 100%)' }}
                        className="hover:opacity-95 text-white font-semibold px-6 py-2 rounded-xl shadow-md"
                      >
                        Confirmar y Despachar Unidad
                      </button>
                    </div>
                  </form>
                )}

                {/* LISTADO DE TRASLADOS Y MONITOREO EN TIEMPO REAL */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* Columna Izquierda: Lista de Viajes */}
                  <div className="lg:col-span-2 space-y-4">
                    <h3 className="text-base font-bold text-[#1B4D7E]">Agenda de Traslados ART</h3>
                    {traslados.map((t) => {
                      const estadoObj = ESTADOS_VIAJE[t.estado] || ESTADOS_VIAJE.PENDIENTE;
                      const esSeleccionado = viajeActivo?.id === t.id;

                      return (
                        <div
                          key={t.id}
                          onClick={() => setViajeSeleccionadoId(t.id)}
                          className={`bg-white/95 backdrop-blur-sm rounded-2xl p-5 border transition cursor-pointer ${
                            esSeleccionado
                              ? 'border-[#34B37B] ring-2 ring-[#34B37B]/25 shadow-md'
                              : 'border-slate-200 hover:border-[#288296]/50 shadow-sm'
                          }`}
                        >
                          <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-base text-[#1B4D7E]">{t.pacienteNombre}</span>
                                <span className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-mono">
                                  DNI {t.pacienteDni}
                                </span>
                              </div>
                              <div className="text-xs font-semibold text-[#34B37B] mt-0.5">
                                {t.aseguradoraArt} • Siniestro: {t.numeroSiniestro}
                              </div>
                            </div>

                            <span className={`text-xs font-bold px-3 py-1 rounded-full border ${estadoObj.color}`}>
                              {estadoObj.label}
                            </span>
                          </div>

                          {/* Recorrido */}
                          <div className="space-y-1.5 text-sm text-slate-600 bg-[#F2F7FA] p-3 rounded-xl border border-slate-100 mb-3">
                            <div className="flex items-start gap-2">
                              <MapPin className="w-4 h-4 text-[#34B37B] shrink-0 mt-0.5" />
                              <span><strong className="text-[#1B4D7E]">Origen:</strong> {t.origenDireccion}</span>
                            </div>
                            <div className="flex items-start gap-2">
                              <Building2 className="w-4 h-4 text-[#23649E] shrink-0 mt-0.5" />
                              <span><strong className="text-[#1B4D7E]">Destino:</strong> {t.destinoNombre}</span>
                            </div>
                          </div>

                          {/* Asignación rápida de Chofer y Vehículo */}
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-semibold text-slate-500">Chofer:</span>
                              <select
                                value={t.choferId}
                                onClick={(e) => e.stopPropagation()}
                                onChange={(e) => handleReasignarUnidad(t.id, e.target.value, t.vehiculoId)}
                                className="bg-slate-100 border border-slate-200 rounded-lg px-2 py-1 font-medium text-slate-800"
                              >
                                {CHOFERES_DISPONIBLES.map((c) => (
                                  <option key={c.id} value={c.id}>{c.nombre}</option>
                                ))}
                              </select>

                              <span className="font-semibold text-slate-500">Móvil:</span>
                              <select
                                value={t.vehiculoId}
                                onClick={(e) => e.stopPropagation()}
                                onChange={(e) => handleReasignarUnidad(t.id, t.choferId, e.target.value)}
                                className="bg-slate-100 border border-slate-200 rounded-lg px-2 py-1 font-medium text-slate-800"
                              >
                                {VEHICULOS_DISPONIBLES.map((v) => (
                                  <option key={v.id} value={v.id}>{v.patente} ({v.modelo.split(' ')[0]})</option>
                                ))}
                              </select>
                            </div>

                            <div className="flex items-center gap-2">
                              {t.firmaUrl && (
                                <span className="text-[#1B6B48] bg-[#E6F4F1] border border-[#34B37B]/30 px-2 py-1 rounded-lg font-semibold flex items-center gap-1">
                                  <FileSignature className="w-3.5 h-3.5 text-[#34B37B]" /> Firmado
                                </span>
                              )}
                              <span className="text-slate-400 flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" /> {t.hora} hs
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Columna Derecha: Radar en Vivo y Auditoría de Firma */}
                  <div className="space-y-4">
                    <h3 className="text-base font-bold text-[#1B4D7E]">Monitoreo Satelital en Vivo</h3>
                    {viajeActivo && (
                      <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-[#288296]/25 p-4 shadow-sm space-y-4">
                        <MapaSanRafael viaje={viajeActivo} isSimulating={simulandoGPS} />

                        <div className="flex items-center justify-between text-xs text-slate-600 bg-[#F2F7FA] p-3 rounded-xl">
                          <div>
                            <div className="font-bold text-[#1B4D7E]">{viajeActivo.choferNombre}</div>
                            <div>{viajeActivo.vehiculoModelo} • <strong>{viajeActivo.vehiculoPatente}</strong></div>
                          </div>
                          <button
                            onClick={() => setRolActivo('PACIENTE')}
                            className="text-[#34B37B] hover:text-[#1B4D7E] font-bold flex items-center gap-1"
                          >
                            <Eye className="w-4 h-4" /> Ver como ART
                          </button>
                        </div>

                        {viajeActivo.firmaUrl && (
                          <div className="border-t border-slate-100 pt-3">
                            <span className="text-xs font-bold text-[#1B4D7E] block mb-2">
                              Comprobante Digital Auditado ({viajeActivo.aseguradoraArt}):
                            </span>
                            <div className="bg-[#F2F7FA] border border-[#34B37B]/30 rounded-xl p-3 flex flex-col items-center">
                              <img src={viajeActivo.firmaUrl} alt="Firma conformidad" className="h-20 object-contain" />
                              <span className="text-[11px] text-slate-500 mt-1">
                                Firmado por {viajeActivo.pacienteNombre} • {viajeActivo.horaFinalizacion || 'Hoy'}
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* ===================================================================== */}
            {/* VISTA 2: APP DEL CHOFER ERQUENCI                                      */}
            {/* ===================================================================== */}
            {rolActivo === 'CHOFER' && viajeActivo && (
              <div className="max-w-3xl mx-auto space-y-5">
                {/* Cabecera del Chofer con degradado institucional Erquenci */}
                <div
                  className="text-white rounded-2xl p-5 shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                  style={{ background: 'linear-gradient(135deg, #1B4D7E 0%, #24788F 60%, #34B37B 100%)' }}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center font-bold text-lg border-2 border-white/60">
                      {viajeActivo.choferFoto || 'CH'}
                    </div>
                    <div>
                      <span className="text-xs text-[#A7F3D0] font-semibold uppercase tracking-wider">Móvil Operativo Erquenci</span>
                      <h2 className="text-lg font-bold">{viajeActivo.choferNombre}</h2>
                      <p className="text-xs text-slate-100">
                        {viajeActivo.vehiculoModelo} • Patente <span className="font-mono bg-black/25 px-1.5 py-0.5 rounded">{viajeActivo.vehiculoPatente}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {(viajeActivo.estado === 'EN_CAMINO_DOMICILIO' || viajeActivo.estado === 'PACIENTE_A_BORDO') && (
                      <button
                        onClick={() => setSimulandoGPS(!simulandoGPS)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition shadow ${
                          simulandoGPS 
                            ? 'bg-amber-400 text-slate-950 animate-pulse' 
                            : 'bg-white text-[#1B4D7E] hover:bg-slate-100'
                        }`}
                      >
                        <Play className="w-4 h-4 text-[#34B37B]" />
                        {simulandoGPS ? 'Simulando Avance...' : 'Simular Recorrido GPS'}
                      </button>
                    )}
                  </div>
                </div>

                {/* Mapa de Navegación del Chofer */}
                <MapaSanRafael viaje={viajeActivo} isSimulating={simulandoGPS} />

                {/* Tarjeta de Datos del Paciente y Hoja de Ruta */}
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl border border-[#288296]/25 p-5 shadow-sm space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div>
                      <span className="text-xs font-bold text-[#34B37B] uppercase">{viajeActivo.aseguradoraArt}</span>
                      <h3 className="text-xl font-bold text-[#1B4D7E]">{viajeActivo.pacienteNombre}</h3>
                      <p className="text-xs text-slate-500">
                        DNI: {viajeActivo.pacienteDni} • Turno: {viajeActivo.hora} hs • {viajeActivo.movilidad || 'Ambulatorio'}
                      </p>
                    </div>
                    <a
                      href={`tel:${viajeActivo.pacienteTelefono}`}
                      className="bg-[#E6F4F1] hover:bg-[#34B37B]/20 text-[#1B4D7E] px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition"
                    >
                      <Phone className="w-4 h-4 text-[#34B37B]" /> Llamar Paciente
                    </a>
                  </div>

                  {viajeActivo.observaciones && (
                    <div className="bg-amber-50 border border-amber-200 text-amber-900 px-3.5 py-2.5 rounded-xl text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                      <span><strong>Nota médica:</strong> {viajeActivo.observaciones}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div className="p-3 rounded-xl bg-[#F2F7FA] border border-[#34B37B]/25">
                      <span className="text-xs font-bold text-[#34B37B] uppercase block mb-1">1. Buscar en Domicilio</span>
                      <p className="font-medium text-slate-800">{viajeActivo.origenDireccion}</p>
                    </div>
                    <div className="p-3 rounded-xl bg-[#F2F7FA] border border-[#23649E]/25">
                      <span className="text-xs font-bold text-[#23649E] uppercase block mb-1">2. Llevar a Tratamiento</span>
                      <p className="font-medium text-slate-800">{viajeActivo.destinoNombre}</p>
                    </div>
                  </div>

                  {/* BOTONERA DE ESTADOS DEL VIAJE PARA EL CHOFER */}
                  <div className="pt-2">
                    <span className="text-xs font-bold text-slate-500 uppercase block mb-2.5">
                      Actualizar Estado del Traslado (Notifica en vivo al Paciente y a la ART)
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      <button
                        onClick={() => handleCambiarEstadoChofer('EN_CAMINO_DOMICILIO')}
                        className={`p-3 rounded-xl text-sm font-bold border text-left flex items-center justify-between transition ${
                          viajeActivo.estado === 'EN_CAMINO_DOMICILIO'
                            ? 'bg-[#23649E] text-white border-[#1B4D7E] shadow'
                            : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
                        }`}
                      >
                        <span>1. En camino al domicilio</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleCambiarEstadoChofer('EN_DOMICILIO')}
                        className={`p-3 rounded-xl text-sm font-bold border text-left flex items-center justify-between transition ${
                          viajeActivo.estado === 'EN_DOMICILIO'
                            ? 'bg-[#288296] text-white border-[#1F6B7C] shadow'
                            : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
                        }`}
                      >
                        <span>2. En puerta / Esperando paciente</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleCambiarEstadoChofer('PACIENTE_A_BORDO')}
                        className={`p-3 rounded-xl text-sm font-bold border text-left flex items-center justify-between transition ${
                          viajeActivo.estado === 'PACIENTE_A_BORDO'
                            ? 'bg-[#34B37B] text-white border-[#279363] shadow'
                            : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
                        }`}
                      >
                        <span>3. Paciente a bordo - Hacia centro</span>
                        <ChevronRight className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => handleCambiarEstadoChofer('FINALIZADO')}
                        className={`p-3 rounded-xl text-sm font-bold border text-left flex items-center justify-between transition ${
                          viajeActivo.estado === 'FINALIZADO'
                            ? 'bg-[#123658] text-white border-[#0A1926] shadow'
                            : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-300'
                        }`}
                      >
                        <span>4. Llegada a destino (Solicitar Firma)</span>
                        <FileSignature className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* PAD DE FIRMA DIGITAL CON EL DEDO */}
                  <div className="pt-3 border-t border-slate-100">
                    <PadFirmaDigital
                      firmaExistente={viajeActivo.firmaUrl}
                      onGuardarFirma={handleGuardarFirmaDigital}
                    />
                  </div>
                </div>
              </div>
            )}

            {/* ===================================================================== */}
            {/* VISTA 3: PACIENTE / AUDITORÍA ART (TRACKING EN VIVO TIPO UBER)        */}
            {/* ===================================================================== */}
            {rolActivo === 'PACIENTE' && viajeActivo && (
              <div className="max-w-2xl mx-auto space-y-5">
                <div className="bg-white/95 backdrop-blur-md rounded-3xl border border-[#288296]/30 shadow-xl overflow-hidden">
                  {/* Encabezado de Estado y ETA con degradado oficial Erquenci */}
                  <div
                    className="text-white p-5"
                    style={{ background: 'linear-gradient(135deg, #1B4D7E 0%, #24788F 55%, #34B37B 100%)' }}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold uppercase tracking-wider bg-white/15 text-white border border-white/25 px-3 py-1 rounded-full">
                        Seguimiento en Vivo • {viajeActivo.aseguradoraArt}
                      </span>
                      {viajeActivo.estado !== 'FINALIZADO' && (
                        <div className="text-right">
                          <span className="text-xs text-slate-100 block">Llegada estimada</span>
                          <span className="text-xl font-extrabold text-[#A7F3D0]">
                            {viajeActivo.etaMinutos === 0 ? '¡En puerta!' : `${viajeActivo.etaMinutos} min`}
                          </span>
                        </div>
                      )}
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold">
                      {ESTADOS_VIAJE[viajeActivo.estado]?.label || 'Traslado Programado'}
                    </h2>
                    <p className="text-xs text-slate-100 mt-1">
                      Paciente: <strong>{viajeActivo.pacienteNombre}</strong> • Siniestro {viajeActivo.numeroSiniestro}
                    </p>

                    {/* Barra de progreso visual */}
                    <div className="w-full bg-black/25 h-2 rounded-full mt-4 overflow-hidden">
                      <div
                        className="bg-white h-full transition-all duration-700"
                        style={{ width: `${viajeActivo.progreso || 5}%` }}
                      />
                    </div>
                  </div>

                  {/* Mapa en vivo del recorrido */}
                  <div className="p-4 bg-[#F2F7FA]">
                    <MapaSanRafael viaje={viajeActivo} isSimulating={simulandoGPS} />
                  </div>

                  {/* Ficha del Chofer y Vehículo que lo busca (Estilo Uber) */}
                  <div className="p-5 border-t border-slate-100">
                    <span className="text-xs font-bold text-[#288296] uppercase tracking-wider block mb-3">
                      Unidad y Chofer Asignado por Erquenci
                    </span>

                    <div className="flex items-center justify-between bg-[#F2F7FA] p-4 rounded-2xl border border-[#288296]/20">
                      <div className="flex items-center gap-3.5">
                        <div
                          className="w-14 h-14 rounded-2xl text-white flex items-center justify-center font-bold text-xl shadow-sm"
                          style={{ background: 'linear-gradient(135deg, #34B37B 0%, #1B4D7E 100%)' }}
                        >
                          {viajeActivo.choferFoto || 'ER'}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-[#1B4D7E] text-base">{viajeActivo.choferNombre}</h3>
                            <span className="text-xs bg-amber-100 text-amber-800 font-bold px-1.5 py-0.5 rounded flex items-center gap-0.5">
                              ★ 4.9
                            </span>
                          </div>
                          <p className="text-sm text-slate-600 font-medium">{viajeActivo.vehiculoModelo}</p>
                          <div className="mt-1 inline-block bg-white border border-slate-300 px-2.5 py-0.5 rounded-md font-mono text-xs font-bold text-[#1B4D7E] shadow-xs">
                            {viajeActivo.vehiculoPatente}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <a
                          href={`tel:${viajeActivo.choferTelefono}`}
                          className="w-11 h-11 rounded-full bg-[#34B37B] hover:bg-[#2A9867] text-white flex items-center justify-center shadow-md transition"
                          title="Llamar al chofer"
                        >
                          <Phone className="w-5 h-5" />
                        </a>
                      </div>
                    </div>

                    {/* Detalle de Ruta */}
                    <div className="mt-5 space-y-3 pl-2 border-l-2 border-[#34B37B]/40 ml-2">
                      <div className="relative pl-4">
                        <span className="w-3 h-3 rounded-full bg-[#34B37B] absolute -left-[23px] top-1 ring-4 ring-white"></span>
                        <span className="text-xs text-slate-400 font-semibold block">Punto de Retiro (Domicilio)</span>
                        <span className="text-sm font-semibold text-slate-800">{viajeActivo.origenDireccion}</span>
                      </div>
                      <div className="relative pl-4">
                        <span className="w-3 h-3 rounded-full bg-[#1E588D] absolute -left-[23px] top-1 ring-4 ring-white"></span>
                        <span className="text-xs text-slate-400 font-semibold block">Destino Médico / Rehabilitación</span>
                        <span className="text-sm font-semibold text-slate-800">{viajeActivo.destinoNombre}</span>
                      </div>
                    </div>

                    {/* Comprobante firmado si el viaje ya finalizó */}
                    {viajeActivo.firmaUrl && (
                      <div className="mt-6 bg-[#E6F4F1] border border-[#34B37B]/40 rounded-2xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-bold text-[#1B4D7E] flex items-center gap-1.5">
                            <Award className="w-5 h-5 text-[#34B37B]" />
                            Comprobante Digital de Traslado ART
                          </span>
                          <span className="text-xs bg-white text-[#1B6B48] px-2 py-0.5 rounded-full font-bold">Validado</span>
                        </div>
                        <p className="text-xs text-slate-700 mb-3">
                          El traslado desde el domicilio hasta el centro médico se completó con conformidad firmada del paciente.
                        </p>
                        <div className="bg-white rounded-xl p-3 border border-[#34B37B]/25 flex flex-col items-center">
                          <img src={viajeActivo.firmaUrl} alt="Firma del paciente" className="h-20 object-contain" />
                          <span className="text-[11px] text-slate-400 mt-1">
                            Erquenci: Tu salud en buenas manos • San Rafael, Mendoza
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}