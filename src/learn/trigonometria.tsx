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
// 📐 TRIGONOMETRÍA Y TALES
// ==========================================

export const TrigTalesInteractivo: React.FC = () => {
  const [subMode, setSubMode] = useState<'trig' | 'tales'>('trig');

  // Trigonometry states
  const [angle, setAngle] = useState(30);
  const hyp = 120;
  const angleRad = (angle * Math.PI) / 180;
  const opp = Math.round(hyp * Math.sin(angleRad));
  const adj = Math.round(hyp * Math.cos(angleRad));

  // Thales' theorem states
  const [scale, setScale] = useState(0.6);
  const thalesTotalA = 150;
  const thalesTotalB = 120;
  const thalesCutA = Math.round(thalesTotalA * scale);
  const thalesCutB = Math.round(thalesTotalB * scale);

  return (
    <TopicCard icon="📐" title="Trigonometría y Teorema de Tales" color="#a855f7" desc="Estudia la relación de los ángulos de un triángulo y la proporcionalidad de segmentos paralelos:">
      <div className="lab-container space-y-5">
        <div className="flex gap-2">
          <button onClick={() => setSubMode('trig')} className={`flex-1 py-2 rounded-xl font-black text-xs transition-all ${subMode === 'trig' ? 'bg-[var(--primary-color)] text-white shadow-md' : 'bg-slate-200 dark:bg-slate-700'}`}>Razones Trigonométricas</button>
          <button onClick={() => setSubMode('tales')} className={`flex-1 py-2 rounded-xl font-black text-xs transition-all ${subMode === 'tales' ? 'bg-[var(--primary-color)] text-white shadow-md' : 'bg-slate-200 dark:bg-slate-700'}`}>Teorema de Tales</button>
        </div>

        {subMode === 'trig' ? (
          <div className="space-y-4">
            <NumberInput label="Ángulo θ (°)" value={angle} setValue={setAngle} min={15} max={75} color="#a855f7" />
            
            <div className="grid gap-4 md:grid-cols-[1.1fr_1fr] items-center">
              <div className="flex justify-center p-4 bg-surface-color rounded-3xl border-2 border-border-color shadow">
                <svg viewBox="0 0 200 160" className="w-64 h-52">
                  <circle cx="30" cy="130" r={hyp} fill="none" stroke="rgba(148,163,184,.15)" strokeWidth="2" strokeDasharray="4 4" />
                  <polygon points={`30,130 ${30 + adj},130 30,${130 - opp}`} fill="rgba(168,85,247,.2)" stroke="#a855f7" strokeWidth="3" />
                  <rect x="30" y="122" width="8" height="8" fill="none" stroke="#a855f7" strokeWidth="1.5" />
                  
                  <text x={30 + adj / 2} y="146" textAnchor="middle" className="font-black text-xs fill-slate-800">CA: {adj}</text>
                  <text x="18" y={130 - opp / 2} textAnchor="middle" className="font-black text-xs fill-slate-800" transform={`rotate(-90, 18, ${130 - opp / 2})`}>CO: {opp}</text>
                  <text x={30 + adj / 2 - 10} y={130 - opp / 2 - 10} textAnchor="middle" className="font-black text-xs fill-slate-800" transform={`rotate(${-angle}, ${30 + adj / 2 - 10}, ${130 - opp / 2 - 10})`}>H: {hyp}</text>
                  
                  <path d={`M ${30 + 20} 130 A 20 20 0 0 0 ${30 + Math.cos(angleRad) * 20} ${130 - Math.sin(angleRad) * 20}`} fill="none" stroke="#f43f5e" strokeWidth="2" />
                  <text x="58" y="125" className="font-black text-[10px] fill-red-500">θ={angle}°</text>
                </svg>
              </div>
              <div className="space-y-2 text-sm font-bold">
                <div className="p-3 bg-purple-500/10 border-2 border-purple-500/20 rounded-2xl">
                  <div className="font-black">Seno (sen θ) = CO / H</div>
                  <p className="font-mono text-xs opacity-80">{opp} / {hyp} ≈ {Math.sin(angleRad).toFixed(4)}</p>
                </div>
                <div className="p-3 bg-sky-500/10 border-2 border-sky-500/20 rounded-2xl">
                  <div className="font-black">Coseno (cos θ) = CA / H</div>
                  <p className="font-mono text-xs opacity-80">{adj} / {hyp} ≈ {Math.cos(angleRad).toFixed(4)}</p>
                </div>
                <div className="p-3 bg-emerald-500/10 border-2 border-emerald-500/20 rounded-2xl">
                  <div className="font-black">Tangente (tan θ) = CO / CA</div>
                  <p className="font-mono text-xs opacity-80">{opp} / {adj} ≈ {Math.tan(angleRad).toFixed(4)}</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <NumberInput label="Posición del corte (Proporción)" value={scale} setValue={setScale} min={0.3} max={0.8} step={0.05} color="#a855f7" />
            
            <div className="grid gap-4 md:grid-cols-[1.1fr_1fr] items-center">
              <div className="flex justify-center p-4 bg-surface-color rounded-3xl border-2 border-border-color shadow">
                <svg viewBox="0 0 200 180" className="w-64 h-56">
                  <polygon points="30,150 170,150 30,30" fill="none" stroke="#94a3b8" strokeWidth="2" strokeDasharray="3 3" />
                  <polygon points={`30,150 ${30 + (170 - 30) * scale},150 30,${150 - (150 - 30) * scale}`} fill="rgba(168,85,247,.2)" stroke="#a855f7" strokeWidth="3" />
                  
                  <line x1={30 + (170 - 30) * scale} y1={150} x2={30} y2={150 - (150 - 30) * scale} stroke="#ef4444" strokeWidth="2.5" />
                  <line x1="170" y1="150" x2="30" y2="30" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="4 2" />
                  
                  <text x="20" y="90" textAnchor="middle" className="font-black text-xs fill-slate-800">A = {thalesTotalA}</text>
                  <text x="100" y="165" textAnchor="middle" className="font-black text-xs fill-slate-800">B = {thalesTotalB}</text>
                  <text x="42" y={150 - (150 - 30) * scale / 2} textAnchor="middle" className="font-black text-[10px] fill-purple-600">a' = {thalesCutA}</text>
                  <text x={30 + (170 - 30) * scale / 2} y="142" textAnchor="middle" className="font-black text-[10px] fill-purple-600">b' = {thalesCutB}</text>
                </svg>
              </div>
              <div className="space-y-3 text-xs font-bold leading-relaxed">
                <div className="p-4 rounded-2xl bg-purple-500/10 border-2 border-purple-500/30">
                  <span className="font-black text-sm">Proporciones en los lados:</span>
                  <p className="mt-1">Lado A completo = {thalesTotalA} | Segmento cortado a' = {thalesCutA}</p>
                  <p>Lado B completo = {thalesTotalB} | Segmento cortado b' = {thalesCutB}</p>
                </div>
                <div className="p-4 rounded-2xl bg-emerald-500/10 border-2 border-emerald-500/30 font-mono">
                  <div className="font-black text-sm text-emerald-700">Razón de Semejanza:</div>
                  <div className="mt-1">A / a' = {thalesTotalA} / {thalesCutA} ≈ {(thalesTotalA / thalesCutA).toFixed(4)}</div>
                  <div>B / b' = {thalesTotalB} / {thalesCutB} ≈ {(thalesTotalB / thalesCutB).toFixed(4)}</div>
                  <div className="mt-2 font-sans font-black text-emerald-600">¡Las razones de los lados proporcionales son idénticas!</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </TopicCard>
  );
};

