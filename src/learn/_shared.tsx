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

export const NumberInput: React.FC<{ label: string; value: number; setValue: (v: number) => void; min?: number; max?: number; color?: string; step?: number }> = ({ label, value, setValue, min = 0, max = 99, color = 'var(--primary-color)', step = 1 }) => (
  <div className="lab-control">
    <label className="text-xs font-black uppercase opacity-80" style={{ color }}>{label}: {value}</label>
    <div className="flex items-center gap-2">
      <button onClick={() => setValue(Math.max(min, Number((value - step).toFixed(4))))}
        className="w-9 h-9 rounded-xl bg-slate-200 dark:bg-slate-700 font-black text-lg hover:scale-110 transition-all">−</button>
      <input type="range" min={min} max={max} step={step} value={Math.min(max, Math.max(min, value))}
        onChange={(e) => setValue(Number(e.target.value))} className="flex-1" />
      <button onClick={() => setValue(Math.min(max, Number((value + step).toFixed(4))))}
        className="w-9 h-9 rounded-xl bg-slate-200 dark:bg-slate-700 font-black text-lg hover:scale-110 transition-all">+</button>
      <input type="number" value={value} step={step} min={min} max={max}
        onChange={(e) => {
          const raw = e.target.value;
          if (raw === '' || raw === '-' || raw === '.' || raw === '-.') return;
          const num = Number(raw);
          if (!Number.isNaN(num)) setValue(num);
        }}
        className="w-24 p-2 rounded-xl border-2 border-border-color bg-surface-color font-black text-sm text-right" />
    </div>
  </div>
);

export const TopicCard: React.FC<{ icon: string; title: string; desc: string; color: string; children: React.ReactNode }> = ({ icon, title, desc, color, children }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
    className="math-card border-l-8 mb-6 shadow-lg" style={{ borderLeftColor: color }}>
    <h2 className="text-xl md:text-2xl font-black mb-2 flex items-center gap-3">
      <span className="text-3xl md:text-4xl">{icon}</span> {title}
    </h2>
    <p className="opacity-80 font-bold mb-3 leading-relaxed text-sm">{desc}</p>
    {children}
  </motion.div>
);

