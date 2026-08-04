import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ChevronRight, GraduationCap, School, Baby, BookOpen, Calculator, Settings, Brain, Compass, Globe } from 'lucide-react';
import {
  NumberLineVisual, GridVisual, FractionVisual, FractionOpsVisual,
  BalanceVisual, ShapeVisual, TrainVisual,
  FactorialVisual, PermutationVisual, CombinationVisual as CombinationVisualComp, PercentVisual,
  CountingVisual, PlaceValueVisual, PrimeVisual, PitagorasVisual,
  StatsVisual, ProbabilityVisual, ConjuntosVisual, NumberSetsVisual, CriptografiaVisual,
  factorial, permutation, combination, reduceFraction, gcd, lcm, isPrime
} from '../helpers';
import { NumberInput, TopicCard } from './_shared';

// ==========================================
// 🧠 RAZONAMIENTO
// ==========================================

export const PolyaMethod: React.FC = () => {
  const [paso, setPaso] = useState(1);
  return (
    <TopicCard icon="📝" title="Método de Polya (Resolución de Problemas)" color="#3b82f6" desc="George Polya propuso 4 pasos infalibles para resolver cualquier problema matemático.">
      <div className="lab-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
          {[{id:1,name:'1. Entender',icon:'🧐'},{id:2,name:'2. Planear',icon:'💡'},{id:3,name:'3. Ejecutar',icon:'✍️'},{id:4,name:'4. Comprobar',icon:'✅'}].map(p => (
            <button key={p.id} onClick={()=>setPaso(p.id)} className={`p-3 rounded-xl font-black text-xs md:text-sm transition-all flex items-center justify-center gap-1.5 ${paso===p.id?'bg-blue-600 text-white scale-105 shadow-md':'bg-slate-200 dark:bg-slate-700'}`}><span>{p.icon}</span>{p.name}</button>
          ))}
        </div>
        <div className="p-6 bg-surface-color rounded-2xl shadow-inner border border-border-color">
          {paso===1&&<div><h3 className="font-black text-lg text-blue-600">🧐 Paso 1: Entender el Problema</h3><p className="text-sm font-bold opacity-80">Pregúntate: ¿Qué pide exactamente el problema? ¿Cuáles son los datos conocidos?</p></div>}
          {paso===2&&<div><h3 className="font-black text-lg text-amber-600">💡 Paso 2: Concebir un Plan</h3><p className="text-sm font-bold opacity-80">Elige la estrategia adecuada: diagrama, patrón, fórmula o problema más simple.</p></div>}
          {paso===3&&<div><h3 className="font-black text-lg text-emerald-600">✍️ Paso 3: Ejecutar el Plan</h3><p className="text-sm font-bold opacity-80">Lleva a cabo las operaciones con calma y precisión.</p></div>}
          {paso===4&&<div><h3 className="font-black text-lg text-purple-600">✅ Paso 4: Examinar la Solución (Comprobar)</h3><p className="text-sm font-bold opacity-80">Verifica si la respuesta tiene sentido y realiza la operación inversa.</p></div>}
        </div>
      </div>
    </TopicCard>
  );
};

export const LogicaAnalogias: React.FC = () => {
  const [acertijo, setAcertijo] = useState(0);
  const acertijos = [
    { q: 'Paradoja del Hotel Infinito (Hilbert): Si un hotel con infinitas habitaciones está lleno y llega un nuevo cliente, ¿se le puede alojar?', a: '¡SÍ! Pidiendo a cada huésped que se mude a la habitación N+1. La habitación 1 queda libre.' },
    { q: 'Silogismo: Todos los múltiplos de 4 son números pares. 12 es múltiplo de 4. Por lo tanto...', a: '12 es un número par por deducción lógica.' },
    { q: 'Acertijo: Un pato y medio pone un huevo y medio en día y medio. ¿Cuántos huevos pondrá un pato solo en tres días?', a: 'Pondrá 2 huevos. (Un pato pone 1 huevo cada día y medio, por lo que en 3 días pone 2 huevos).' },
    { q: 'Paradoja de Zenón (Aquiles y la Tortuga): ¿Puede Aquiles alcanzar a una tortuga si le da ventaja?', a: 'En la realidad sí la alcanza en segundos, aunque matemáticamente la serie infinita converge a un punto exacto.' }
  ];
  return (
    <TopicCard icon="🧠" title="Lógica, Acertijos y Silogismos" color="#8b5cf6" desc="El razonamiento lógico pone a prueba tus neuronas con desafíos y paradojas:">
      <div className="lab-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
          {acertijos.map((_,i) => (<button key={i} onClick={()=>setAcertijo(i)} className={`p-3 rounded-xl font-black text-xs transition-all ${acertijo===i?'bg-purple-600 text-white scale-105 shadow-md':'bg-slate-200 dark:bg-slate-700'}`}>Desafío #{i+1}</button>))}
        </div>
        <div className="p-5 bg-surface-color rounded-2xl shadow-inner border border-border-color space-y-3">
          <div className="font-black text-base text-purple-700 dark:text-purple-400">❓ {acertijos[acertijo].q}</div>
          <div className="p-3 bg-purple-500/10 rounded-xl text-xs font-bold">💡 <b>Respuesta:</b> {acertijos[acertijo].a}</div>
        </div>
      </div>
    </TopicCard>
  );
};

export const SingapurBar: React.FC = () => {
  const [total, setTotal] = useState(100); const [partA, setPartA] = useState(40);
  return (
    <TopicCard icon="📊" title="Método Singapur (Modelos de Barras)" color="#0ea5e9" desc="Visualiza problemas de suma, resta y fracciones comparando barras de longitud proporcional:">
      <div className="lab-container">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <NumberInput label="Total" value={total} setValue={setTotal} min={20} max={200} color="#0ea5e9" />
          <NumberInput label="Parte A" value={partA} setValue={(v)=>setPartA(Math.min(v,total))} min={0} max={total} color="#3b82f6" />
        </div>
        <div className="w-full h-12 bg-slate-300 dark:bg-slate-700 rounded-2xl flex overflow-hidden shadow-inner border-2 border-white/40 font-black text-sm">
          <div className="h-full bg-blue-500 text-white flex items-center justify-center transition-all duration-500" style={{width:`${(partA/total)*100}%`}}>A: {partA}</div>
          <div className="h-full bg-emerald-500 text-white flex items-center justify-center transition-all duration-500" style={{width:`${((total-partA)/total)*100}%`}}>B: {total-partA}</div>
        </div>
      </div>
    </TopicCard>
  );
};

export const CalculadoraExploracion: React.FC = () => {
  const [numA, setNumA] = useState(48); const [numB, setNumB] = useState(52);
  const exact = numA + numB;
  const roundA = Math.round(numA/10)*10; const roundB = Math.round(numB/10)*10;
  const est = roundA + roundB;
  return (
    <TopicCard icon="⚡" title="Estimación y Cálculo Mental Avanzado" color="#f59e0b" desc="Antes de usar papel o calculadora, estimar redondeando nos da un orden de magnitud infalible:">
      <div className="lab-container">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <NumberInput label="Número A" value={numA} setValue={setNumA} min={10} max={200} color="#f59e0b" />
          <NumberInput label="Número B" value={numB} setValue={setNumB} min={10} max={200} color="#d97706" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="p-5 rounded-3xl bg-surface-color border-2 border-amber-500/30 shadow text-center">
            <div className="text-xs uppercase font-black opacity-80 mb-1">Estimado</div>
            <div className="text-2xl font-black text-amber-600 dark:text-amber-400">≈ {est}</div>
          </div>
          <div className="p-5 rounded-3xl bg-surface-color border-2 border-emerald-500/30 shadow text-center">
            <div className="text-xs uppercase font-black opacity-80 mb-1">Exacto</div>
            <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400">{exact}</div>
          </div>
        </div>
      </div>
    </TopicCard>
  );
};

