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
// 📜 HISTORIA
// ==========================================

export const HistoriaMates: React.FC = () => {
  const genios = [
    {name:'Pitágoras',bio:'Matemático griego (570 a.C.). Famoso por relacionar los catetos y la hipotenusa en triángulos rectángulos.'},
    {name:'Hipatia de Alejandría',bio:'Una de las primeras mujeres matemáticas (360 d.C.). Mejoró el astrolabio y escribió tratados algebraicos.'},
    {name:'Al-Juarismi',bio:'Matemático persa (780 d.C.). Considerado el padre del álgebra y de la palabra algoritmo.'},
    {name:'Ada Lovelace',bio:'Matemática británica (1815). Considerada la primera programadora de la historia.'},
    {name:'Srinivasa Ramanujan',bio:'Genio matemático indio (1887) autodidacta con intuición prodigiosa para series infinitas.'}
  ];
  const [pickG, setPickG] = useState(0);
  return (
    <TopicCard icon="📜" title="Historia y Grandes Genios de las Mates" color="#f43f5e" desc="Conoce las mentes brillantes que transformaron la humanidad:">
      <div className="lab-container">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-4">
          {genios.map((g,i) => (<button key={i} onClick={()=>setPickG(i)} className={`p-3 rounded-xl font-black text-xs transition-all ${pickG===i?'bg-rose-600 text-white scale-105 shadow-md':'bg-slate-200 dark:bg-slate-700'}`}>{g.name}</button>))}
        </div>
        <div className="p-6 bg-surface-color rounded-3xl shadow-inner border border-border-color text-center">
          <h3 className="font-black text-xl text-rose-600 dark:text-rose-400">✨ {genios[pickG].name}</h3>
          <p className="text-sm font-bold opacity-85 mt-2">{genios[pickG].bio}</p>
        </div>
      </div>
    </TopicCard>
  );
};

