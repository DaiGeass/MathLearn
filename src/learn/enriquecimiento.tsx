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
// 🟠 ENRIQUECIMIENTO
// ==========================================

export const SimetriaVistas: React.FC = () => {
  const [mode, setMode] = useState<'simetria' | 'vistas'>('simetria');
  return (
    <TopicCard icon="🪞" title="Simetría Corporal y Vistas 3D" color="#10b981" desc="Explora transformaciones en el plano y representación de cuerpos tridimensionales:">
      <div className="lab-container">
        <div className="flex justify-center gap-3 mb-4 flex-wrap">
          <button onClick={()=>setMode('simetria')} className={`px-5 py-2.5 rounded-2xl font-black text-xs md:text-sm transition-all ${mode==='simetria'?'bg-emerald-600 text-white scale-105 shadow-md':'bg-slate-200 dark:bg-slate-700'}`}>Simetría Axial</button>
          <button onClick={()=>setMode('vistas')} className={`px-5 py-2.5 rounded-2xl font-black text-xs md:text-sm transition-all ${mode==='vistas'?'bg-emerald-600 text-white scale-105 shadow-md':'bg-slate-200 dark:bg-slate-700'}`}>Vistas 3D</button>
        </div>
        <div className="p-6 bg-surface-color rounded-3xl shadow-inner border border-border-color text-center">
          {mode==='simetria'?(<div><div className="flex items-center justify-center gap-6 text-5xl"><span className="scale-x-[-1] inline-block">🦋</span><div className="w-1.5 h-16 bg-emerald-500 rounded-full shadow" /><span>🦋</span></div><p className="text-sm font-bold opacity-85 mt-4">Cada punto a la izquierda tiene su gemelo exacto a la derecha.</p></div>)
          :(<div><div className="grid grid-cols-3 gap-3 max-w-md mx-auto"><div className="p-4 bg-blue-500/10 rounded-2xl border border-blue-500">Planta (Arriba)</div><div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500">Alzado (Frente)</div><div className="p-4 bg-purple-500/10 rounded-2xl border border-purple-500">Perfil (Costado)</div></div></div>)}
        </div>
      </div>
    </TopicCard>
  );
};

export const SistemasAntiguos: React.FC = () => {
  const [num, setNum] = useState(27);
  const [mode, setMode] = useState<'romano' | 'maya' | 'binario' | 'hex' | 'octal'>('romano');
  const toRoman = (n: number) => {
    const map:[string,number][]=[['M',1000],['CM',900],['D',500],['CD',400],['C',100],['XC',90],['L',50],['XL',40],['X',10],['IX',9],['V',5],['IV',4],['I',1]];
    let res='';for(const[s,v]of map){while(n>=v){res+=s;n-=v;}}return res||'0';
  };
  return (
    <TopicCard icon="🏛️" title="Sistemas Numéricos Antiguos y Modernos" color="#f59e0b" desc="Explora romanos, mayas, binario, hexadecimal y octal:">
      <div className="lab-container">
        <NumberInput label="Número Decimal" value={num} setValue={setNum} min={0} max={3999} color="#f59e0b" />
        <div className="flex gap-2 flex-wrap my-3">
          {(['romano','maya','binario','hex','octal'] as const).map(m => (<button key={m} onClick={()=>setMode(m)} className={`px-4 py-2 rounded-xl font-black text-xs capitalize transition-all ${mode===m?'bg-[var(--primary-color)] text-white shadow':'bg-slate-200 dark:bg-slate-700'}`}>{m}</button>))}
        </div>
        <div className="p-6 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
          {mode==='romano'&&<div className="text-4xl font-serif font-black tracking-widest">{toRoman(num)}</div>}
          {mode==='maya'&&<div className="text-xl font-black">Maya de {num}: {num>0?'Representación vigesimal':'0 (óvalo)'}</div>}
          {mode==='binario'&&<div className="text-4xl font-mono font-black">{num.toString(2)}</div>}
          {mode==='hex'&&<div className="text-4xl font-mono font-black">{num.toString(16).toUpperCase()}</div>}
          {mode==='octal'&&<div className="text-4xl font-mono font-black">{num.toString(8)}</div>}
        </div>
      </div>
    </TopicCard>
  );
};

export const CuadradosMagicos: React.FC = () => (
  <TopicCard icon="✨" title="Cuadrados Mágicos (3×3)" color="#8b5cf6" desc="En un cuadrado mágico perfecto de 3×3, la suma de filas, columnas y diagonales da 15:">
    <div className="lab-container flex flex-col items-center">
      <div className="grid grid-cols-3 gap-3 p-4 bg-surface-color rounded-3xl shadow-xl border-2 border-purple-500 text-center font-black text-3xl max-w-xs w-full my-3">
        {['8','1','6','3','5','7','4','9','2'].map((n,i)=>(<div key={i} className="p-4 bg-purple-500/10 rounded-2xl border border-purple-300 text-purple-700 shadow-inner">{n}</div>))}
      </div>
    </div>
  </TopicCard>
);

