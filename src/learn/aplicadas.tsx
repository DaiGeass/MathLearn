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
// 💰 MATES APLICADAS
// ==========================================

export const FinanzasCotidianas: React.FC = () => {
  const [cap, setCap] = useState(1000); const [tasa, setTasa] = useState(5); const [anios, setAnios] = useState(3);
  const simple = cap*(tasa/100)*anios;
  const comp = cap*Math.pow(1+tasa/100,anios)-cap;
  return (
    <TopicCard icon="💰" title="Educación Financiera (Ahorro e Interés)" color="#10b981" desc="El dinero crece en el tiempo si se invierte. Compara el interés simple vs compuesto:">
      <div className="lab-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          <NumberInput label="Capital ($)" value={cap} setValue={setCap} min={100} max={5000} step={100} color="#10b981" />
          <NumberInput label="Tasa (%)" value={tasa} setValue={setTasa} min={1} max={20} color="#059669" />
          <NumberInput label="Años" value={anios} setValue={setAnios} min={1} max={10} color="#047857" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4">
          <div className="p-5 rounded-3xl bg-surface-color border-2 border-emerald-500 shadow-md text-center">
            <div className="text-xs uppercase font-black text-emerald-600 mb-1">Simple</div>
            <div className="text-3xl font-black text-emerald-600">+${Math.round(simple)}</div>
          </div>
          <div className="p-5 rounded-3xl bg-surface-color border-2 border-purple-500 shadow-md text-center">
            <div className="text-xs uppercase font-black text-purple-600 mb-1">Compuesto</div>
            <div className="text-3xl font-black text-purple-600">+${Math.round(comp)}</div>
          </div>
        </div>
      </div>
    </TopicCard>
  );
};

export const NominaCotidianas: React.FC = () => {
  const [salario, setSalario] = useState(1500); const [imp, setImp] = useState(16);
  const desc = Math.round((salario*imp)/100);
  const neto = salario - desc;
  return (
    <TopicCard icon="📄" title="Nómina, Salarios e Impuestos" color="#059669" desc="En todo trabajo asalariado existen deducciones legales:">
      <div className="lab-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          <NumberInput label="Salario Bruto ($)" value={salario} setValue={setSalario} min={500} max={5000} step={100} color="#059669" />
          <NumberInput label="Impuestos (%)" value={imp} setValue={setImp} min={5} max={35} color="#047857" />
        </div>
        <div className="lab-formula text-center">Bruto: ${salario} - {imp}% (${desc}) = <span style={{color:'var(--primary-color)'}}>Neto: ${neto}</span></div>
      </div>
    </TopicCard>
  );
};

export const EscalasPlanos: React.FC = () => {
  const [mapCm, setMapCm] = useState(5); const [escala, setEscala] = useState(100);
  const realMeters = (mapCm*escala)/100;
  return (
    <TopicCard icon="🗺️" title="Escalas en Planos, Mapas y Maquetas" color="#0284c7" desc="Una escala 1:100 indica que 1cm en el plano equivale a 1m en la realidad:">
      <div className="lab-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
          <NumberInput label="Distancia en Plano (cm)" value={mapCm} setValue={setMapCm} min={1} max={50} color="#0284c7" />
          <NumberInput label="Escala (1:X)" value={escala} setValue={setEscala} min={50} max={1000} step={50} color="#0369a1" />
        </div>
        <div className="p-5 rounded-3xl bg-surface-color shadow-md text-center border-2 border-sky-500 font-black text-2xl text-sky-600">Distancia Real: {realMeters} metros</div>
      </div>
    </TopicCard>
  );
};

export const NutricionTablas: React.FC = () => {
  const [azucarG, setAzucarG] = useState(10);
  const ingestaDiaria = 50;
  const pct = Math.round((azucarG/ingestaDiaria)*100);
  return (
    <TopicCard icon="🥗" title="Tablas Nutricionales y Proporciones" color="#eab308" desc="Lee e interpreta críticamente las etiquetas de los alimentos:">
      <div className="lab-container">
        <NumberInput label="Azúcar en el producto (g)" value={azucarG} setValue={setAzucarG} min={0} max={60} color="#eab308" />
        <div className="w-full h-8 bg-slate-300 dark:bg-slate-700 rounded-full overflow-hidden shadow-inner relative">
          <div className={`h-full transition-all duration-500 flex items-center justify-end pr-3 text-white font-black text-xs ${pct>100?'bg-red-600':pct>50?'bg-amber-500':'bg-emerald-500'}`} style={{width:`${Math.min(pct,100)}%`}}>{pct}% del diario</div>
        </div>
      </div>
    </TopicCard>
  );
};

