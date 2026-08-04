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
// 🎓 BACHILLERATO
// ==========================================

export const FactorialInteractivo: React.FC = () => {
  const [n, setN] = useState(5);
  return (
    <TopicCard icon="!" title="Factoriales" color="#dc2626" desc="n! = n × (n-1) × ... × 1:">
      <div className="lab-container">
        <NumberInput label="n" value={n} setValue={setN} min={0} max={10} color="#dc2626" />
        <div className="lab-formula text-center">{n}! = <span style={{ color: 'var(--primary-color)' }}>{factorial(n).toLocaleString()}</span></div>
        <FactorialVisual visual={{ n: Math.max(1, n) }} />
      </div>
    </TopicCard>
  );
};

export const PermutacionInteractiva: React.FC = () => {
  const [n, setN] = useState(5); const [r, setR] = useState(2);
  const result = r <= n ? permutation(n, r) : 0n;
  return (
    <TopicCard icon="🔀" title="Permutaciones (Orden Importa)" color="#7c3aed" desc="P(n,r) = n!/(n-r)!:">
      <div className="lab-container">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <NumberInput label="n" value={n} setValue={(v)=>{setN(v);if(r>v)setR(v);}} min={1} max={9} color="#7c3aed" />
          <NumberInput label="r" value={r} setValue={(v)=>setR(Math.min(v,n))} min={0} max={n} color="#6d28d9" />
        </div>
        <div className="lab-formula text-center">P({n},{r}) = <span style={{ color: 'var(--primary-color)' }}>{result.toLocaleString()}</span></div>
        <PermutationVisual visual={{ n, r }} />
      </div>
    </TopicCard>
  );
};

export const CombinacionInteractiva: React.FC = () => {
  const [n, setN] = useState(5); const [r, setR] = useState(2);
  const result = r <= n ? combination(n, r) : 0n;
  return (
    <TopicCard icon="🎲" title="Combinaciones (Orden NO Importa)" color="#0891b2" desc="C(n,r) = n!/(r!(n-r)!):">
      <div className="lab-container">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <NumberInput label="n" value={n} setValue={(v)=>{setN(v);if(r>v)setR(v);}} min={1} max={10} color="#0891b2" />
          <NumberInput label="r" value={r} setValue={(v)=>setR(Math.min(v,n))} min={0} max={n} color="#0e7490" />
        </div>
        <div className="lab-formula text-center">C({n},{r}) = <span style={{ color: 'var(--primary-color)' }}>{result.toLocaleString()}</span></div>
        <CombinationVisualComp visual={{ n, r }} />
      </div>
    </TopicCard>
  );
};

export const FormulasBach: React.FC = () => (
  <TopicCard icon="📜" title="Formulario Maestro" color="#1e293b" desc="Las fórmulas esenciales para tener siempre a mano en bachillerato y universidad:">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
      {[
        { title: 'Cuadrática', formula: 'x = (-b ± √(b²-4ac)) / 2a', desc: 'Resolver ax² + bx + c = 0' },
        { title: 'Pitágoras', formula: 'a² + b² = c²', desc: 'Triángulo rectángulo' },
        { title: 'Distancia', formula: 'd = √((x₂-x₁)² + (y₂-y₁)²)', desc: 'Entre 2 puntos' },
        { title: 'Pendiente', formula: 'm = (y₂-y₁) / (x₂-x₁)', desc: 'De una recta' },
        { title: 'Punto medio', formula: 'M = ((x₁+x₂)/2, (y₁+y₂)/2)', desc: 'Entre 2 puntos' },
        { title: 'Recta', formula: 'y = mx + b', desc: 'Ecuación lineal' },
        { title: 'Área triángulo', formula: 'A = (b × h) / 2', desc: 'Base por altura ÷ 2' },
        { title: 'Área círculo', formula: 'A = π × r²', desc: 'Pi por radio²' },
        { title: 'Vol. cilindro', formula: 'V = π × r² × h', desc: 'Área base × altura' },
        { title: 'Vol. cono', formula: 'V = π × r² × h / 3', desc: 'Tercio del cilindro' },
        { title: 'Vol. esfera', formula: 'V = (4/3) × π × r³', desc: 'Esfera completa' },
        { title: 'Logaritmo', formula: 'log_b(a) = c ⟺ b^c = a', desc: 'Función inversa exp.' },
        { title: 'Binomio²', formula: '(a+b)² = a² + 2ab + b²', desc: 'Producto notable' },
        { title: 'Diferencia²', formula: 'a² − b² = (a+b)(a−b)', desc: 'Factorización' },
        { title: 'Sen, Cos, Tan', formula: 'sen = CO/H, cos = CA/H, tan = CO/CA', desc: 'Trigonometría' },
        { title: 'Suma ang. tri.', formula: '∠A + ∠B + ∠C = 180°', desc: 'Triángulo' },
        { title: 'P. interés simple', formula: 'I = C × r × t', desc: 'Capital × tasa × tiempo' },
        { title: 'Regla de 3', formula: 'a/b = c/d → d = (b×c)/a', desc: 'Proporcionalidad' }
      ].map((f, i) => (
        <div key={i} className="p-4 rounded-xl bg-surface-color border-2 border-border-color shadow hover:scale-105 transition-all">
          <div className="font-black text-base mb-1" style={{ color: 'var(--primary-color)' }}>{f.title}</div>
          <div className="font-mono font-bold text-sm bg-[var(--background-color)] p-2 rounded-lg mb-1">{f.formula}</div>
          <div className="text-xs opacity-75 font-bold">{f.desc}</div>
        </div>
      ))}
    </div>
  </TopicCard>
);

