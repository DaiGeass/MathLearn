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
// 💻 HERRAMIENTAS
// ==========================================

export const HerramientasTech: React.FC = () => (
  <TopicCard icon="💻" title="Herramientas Tecnológicas y Geoplanos" color="#14b8a6" desc="Las matemáticas modernas se exploran con herramientas digitales:">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-3">
      {[
        {title:'GeoGebra',icon:'📐',desc:'Software gratuito de geometría dinámica para graficar funciones y construir polígonos interactivos.'},
        {title:'Scratch',icon:'🐱',desc:'Programación por bloques para crear secuencias, espirales y patrones algorítmicos visuales.'},
        {title:'Tangram & Regletas',icon:'🧩',desc:'Piezas manipulativas para comprender quebrados y conservación del área.'}
      ].map((h,i)=>(
        <div key={i} className="p-5 rounded-3xl bg-surface-color shadow-md border-2 border-teal-500/30 text-center space-y-2 hover:scale-105 transition-all">
          <span className="text-4xl">{h.icon}</span>
          <h3 className="font-black text-lg text-teal-600">{h.title}</h3>
          <p className="text-xs font-bold opacity-80">{h.desc}</p>
        </div>
      ))}
    </div>
  </TopicCard>
);

