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
// 🔵 SECUNDARIA
// ==========================================

export const EcuacionInteractiva: React.FC = () => {
  const [coef, setCoef] = useState(3); const [cnst, setCnst] = useState(4); const [result, setResult] = useState(19);
  const x = (result - cnst) / coef;
  return (
    <TopicCard icon="⚖️" title="Ecuaciones Lineales" color="#a855f7" desc="Resuelve ecuaciones del tipo ax + b = c.">
      <div className="lab-container">
        <div className="grid grid-cols-3 gap-3 mb-4">
          <NumberInput label="a" value={coef} setValue={setCoef} min={1} max={10} color="#a855f7" />
          <NumberInput label="b" value={cnst} setValue={setCnst} min={0} max={50} color="#9333ea" />
          <NumberInput label="c" value={result} setValue={setResult} min={cnst} max={100} color="#7c3aed" />
        </div>
        <div className="lab-formula text-center">{coef}x + {cnst} = {result}<div className="text-2xl mt-2" style={{ color: 'var(--primary-color)' }}>x = {x % 1 === 0 ? x : x.toFixed(2)}</div></div>
        <BalanceVisual visual={{ leftCoef: coef, leftConst: cnst, rightConst: result }} />
      </div>
    </TopicCard>
  );
};

export const SistemaEcuaciones: React.FC = () => {
  const [x, setX] = useState(5); const [y, setY] = useState(3);
  return (
    <TopicCard icon="{ }" title="Sistemas de Ecuaciones 2x2" color="#7c3aed" desc="Dos ecuaciones, dos incógnitas. Resuelve por método de SUMA:">
      <div className="lab-container">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <NumberInput label="Valor real de x" value={x} setValue={setX} min={1} max={15} color="#7c3aed" />
          <NumberInput label="Valor real de y" value={y} setValue={setY} min={1} max={15} color="#6d28d9" />
        </div>
        <div className="lab-formula text-center text-lg">{`x + y = ${x + y}`}<br/>{`x − y = ${x - y}`}<div className="text-2xl mt-3" style={{ color: 'var(--primary-color)' }}>x = {x}, y = {y}</div></div>
      </div>
    </TopicCard>
  );
};

export const CuadraticaInteractiva: React.FC = () => {
  const [r1, setR1] = useState(2); const [r2, setR2] = useState(3);
  const b = -(r1 + r2); const c = r1 * r2;
  return (
    <TopicCard icon="x²" title="Ecuaciones Cuadráticas" color="#9333ea" desc="Las raíces son los valores de x.">
      <div className="lab-container">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <NumberInput label="Raíz 1" value={r1} setValue={setR1} min={-5} max={10} color="#9333ea" />
          <NumberInput label="Raíz 2" value={r2} setValue={setR2} min={-5} max={10} color="#7c3aed" />
        </div>
        <div className="lab-formula text-center">x² {b >= 0 ? '+' : '−'} {Math.abs(b)}x {c >= 0 ? '+' : '−'} {Math.abs(c)} = 0<div className="text-xl mt-3" style={{ color: 'var(--primary-color)' }}>x₁ = {r1}, x₂ = {r2}</div></div>
      </div>
    </TopicCard>
  );
};

export const PitagorasInteractivo: React.FC = () => {
  const [a, setA] = useState(3); const [b, setB] = useState(4);
  const c = Math.sqrt(a*a + b*b);
  return (
    <TopicCard icon="△" title="Teorema de Pitágoras" color="#db2777" desc="En triángulo rectángulo: a² + b² = c².">
      <div className="lab-container">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <NumberInput label="Cateto a" value={a} setValue={setA} min={1} max={20} color="#db2777" />
          <NumberInput label="Cateto b" value={b} setValue={setB} min={1} max={20} color="#be185d" />
        </div>
        <div className="lab-formula text-center">{a}² + {b}² = c²<div className="text-2xl mt-3" style={{ color: 'var(--primary-color)' }}>c ≈ {c.toFixed(2)}</div></div>
        <PitagorasVisual visual={{ a, b, c: c.toFixed(1), findHyp: true }} />
      </div>
    </TopicCard>
  );
};

export const TiposDeAngulos: React.FC = () => {
  const [angulo, setAngulo] = useState(45);
  let tipo = ''; let color = '';
  if (angulo < 90) { tipo = 'Agudo (< 90°)'; color = '#3b82f6'; } else if (angulo === 90) { tipo = 'Recto (90°)'; color = '#ef4444'; } else if (angulo < 180) { tipo = 'Obtuso (90°-180°)'; color = '#f59e0b'; } else if (angulo === 180) { tipo = 'Llano (180°)'; color = '#10b981'; } else if (angulo < 360) { tipo = 'Cóncavo (>180°)'; color = '#8b5cf6'; } else { tipo = 'Completo (360°)'; color = '#ec4899'; }
  const angleRad = (-angulo * Math.PI) / 180;
  const arcEnd = { x: 100 + 55 * Math.cos(angleRad), y: 100 + 55 * Math.sin(angleRad) };
  const rayEnd = { x: 100 + 82 * Math.cos(angleRad), y: 100 + 82 * Math.sin(angleRad) };
  return (
    <TopicCard icon="📐" title="Tipos de Ángulos" color="#3b82f6" desc="Un ángulo es la abertura entre dos líneas rectas.">
      <div className="lab-container space-y-4">
        <NumberInput label="Ángulo (°)" value={angulo} setValue={setAngulo} min={0} max={360} color="#3b82f6" />
        <div className="grid gap-4 md:grid-cols-[1fr_1fr] items-center">
          <div className="flex justify-center p-4 rounded-3xl bg-surface-color border-2 border-border-color shadow">
            <svg viewBox="0 0 200 200" className="w-64 h-64">
              <circle cx="100" cy="100" r="90" fill="rgba(148,163,184,.08)" stroke="rgba(148,163,184,.35)" strokeWidth="2" />
              <line x1="100" y1="100" x2="185" y2="100" stroke="#0f172a" strokeWidth="5" strokeLinecap="round" />
              <line x1="100" y1="100" x2={rayEnd.x} y2={rayEnd.y} stroke={color} strokeWidth="5" strokeLinecap="round" />
              <path d={`M 155 100 A 55 55 0 ${angulo > 180 ? 1 : 0} 0 ${arcEnd.x} ${arcEnd.y}`} fill="none" stroke={color} strokeWidth="6" strokeLinecap="round" />
              <circle cx="100" cy="100" r="7" fill={color} />
              <text x="100" y="30" textAnchor="middle" className="font-black text-lg" fill={color}>{angulo}°</text>
            </svg>
          </div>
          <div className="space-y-3">
            <div className="p-4 rounded-xl border-2 text-center shadow font-black" style={{ borderColor: color, background: color + '15', color }}>{tipo}</div>
            <div className="p-3 rounded-2xl bg-blue-500/10 border-2 border-blue-500/20 text-sm font-bold">
              Mira la abertura coloreada entre la línea negra y la línea de color. Si crece, el ángulo se abre más.
            </div>
          </div>
        </div>
      </div>
    </TopicCard>
  );
};

export const GeometriaInteractiva: React.FC = () => {
  const [shape, setShape] = useState<'rectangulo' | 'triangulo' | 'circulo'>('rectangulo');
  const [w, setW] = useState(8); const [h, setH] = useState(5);
  let area = 0, perim = 0, formula = '', perimFormula = '';
  if (shape === 'rectangulo') { area = w * h; perim = 2*(w+h); formula = `A = ${w}×${h} = ${area}`; perimFormula = `P = 2(${w}+${h}) = ${perim}`; }
  else if (shape === 'triangulo') { area = (w*h)/2; perim = w + 2*Math.sqrt((w/2)**2 + h**2); formula = `A = (${w}×${h})/2 = ${area}`; perimFormula = `P ≈ ${perim.toFixed(2)}`; }
  else { area = Math.PI*w*w; perim = 2*Math.PI*w; formula = `A = π×${w}² ≈ ${area.toFixed(2)}`; perimFormula = `P = 2πr ≈ ${perim.toFixed(2)}`; }
  return (
    <TopicCard icon="📐" title="Áreas y Perímetros" color="#ec4899" desc="Elige una figura y modifica sus dimensiones:">
      <div className="lab-container">
        <div className="flex justify-center gap-2 mb-4 flex-wrap">
          {(['rectangulo','triangulo','circulo'] as const).map(s => (<button key={s} onClick={() => setShape(s)} className={`px-5 py-2.5 rounded-xl font-black capitalize transition-all ${shape===s ? 'bg-pink-500 text-white scale-105' : 'bg-slate-200 dark:bg-slate-700 hover:scale-105'}`}>{s}</button>))}
        </div>
        <div className="grid grid-cols-2 gap-3 mb-4">
          <NumberInput label={shape==='circulo'?'Radio':'Base'} value={w} setValue={setW} min={1} max={15} color="#ec4899" />
          {shape !== 'circulo' && <NumberInput label="Altura" value={h} setValue={setH} min={1} max={15} color="#db2777" />}
        </div>
        <div className="lab-formula text-center"><div>📐 {formula}</div><div className="mt-1 opacity-80">📏 {perimFormula}</div></div>
        <ShapeVisual visual={{ type: 'shape', shape, w, h }} />
      </div>
    </TopicCard>
  );
};

export const PotenciasInteractiva: React.FC = () => {
  const [base, setBase] = useState(2); const [exp, setExp] = useState(4);
  const result = Math.pow(base, exp);
  return (
    <TopicCard icon="²" title="Potencias y Exponentes" color="#dc2626" desc="Una potencia es multiplicar un número por sí mismo varias veces:">
      <div className="lab-container">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <NumberInput label="Base" value={base} setValue={setBase} min={1} max={10} color="#dc2626" />
          <NumberInput label="Exponente" value={exp} setValue={setExp} min={0} max={8} color="#b91c1c" />
        </div>
        <div className="lab-formula text-center text-xl">{base}<sup>{exp}</sup> = {exp === 0 ? '1' : Array(exp).fill(base).join(' × ')} = <span style={{ color: 'var(--primary-color)' }}>{result}</span></div>
      </div>
    </TopicCard>
  );
};

export const SeriesInteractiva: React.FC = () => {
  const [start, setStart] = useState(2); const [step, setStep] = useState(3);
  const seq = [start, start+step, start+2*step, start+3*step];
  const next = start + 4*step;
  return (
    <TopicCard icon="🚂" title="Sucesiones Aritméticas" color="#eab308" desc="Una sucesión aritmética añade la misma cantidad cada vez:">
      <div className="lab-container">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <NumberInput label="a₁" value={start} setValue={setStart} min={0} max={30} color="#eab308" />
          <NumberInput label="d" value={step} setValue={setStep} min={1} max={15} color="#ca8a04" />
        </div>
        <div className="lab-formula text-center">aₙ = {start} + (n−1)·{step} → Siguiente: <span style={{ color: 'var(--primary-color)' }}>{next}</span></div>
        <TrainVisual visual={{ type: 'train', sequence: seq }} />
      </div>
    </TopicCard>
  );
};

export const EstadisticaInteractiva: React.FC = () => {
  const [data, setData] = useState([3,5,7,5,9]);
  const sum = data.reduce((a,b)=>a+b,0);
  const media = (sum/data.length).toFixed(2);
  const sorted = [...data].sort((a,b)=>a-b);
  const mediana = sorted[Math.floor(sorted.length/2)];
  const counts: Record<number,number> = {};
  data.forEach(n => counts[n] = (counts[n]||0)+1);
  const moda = Number(Object.entries(counts).sort((a,b)=>b[1]-a[1])[0][0]);
  const variance = (data.reduce((acc,v)=>acc+Math.pow(v-Number(media),2),0)/data.length).toFixed(2);
  const std = Math.sqrt(Number(variance)).toFixed(2);
  return (
    <TopicCard icon="📊" title="Media, Mediana, Moda" color="#0284c7" desc="Las 3 medidas de tendencia central. Cambia los valores:">
      <div className="lab-container">
        <div className="grid grid-cols-5 gap-2 mb-4">
          {data.map((v,i) => (<NumberInput key={i} label={`Dato ${i+1}`} value={v} setValue={(nv)=>setData(data.map((x,j)=>j===i?nv:x))} min={1} max={20} color="#0284c7" />))}
        </div>
        <StatsVisual visual={{ data }} />
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-3">
          <div className="p-4 bg-blue-500/10 rounded-2xl border-2 border-blue-500 text-center"><div className="text-xs uppercase font-black opacity-75">Media</div><div className="text-2xl font-black text-blue-600">{media}</div></div>
          <div className="p-4 bg-cyan-500/10 rounded-2xl border-2 border-cyan-500 text-center"><div className="text-xs uppercase font-black opacity-75">Mediana</div><div className="text-2xl font-black text-cyan-600">{mediana}</div></div>
          <div className="p-4 bg-sky-500/10 rounded-2xl border-2 border-sky-500 text-center"><div className="text-xs uppercase font-black opacity-75">Moda</div><div className="text-2xl font-black text-sky-600">{moda}</div></div>
          <div className="p-4 bg-violet-500/10 rounded-2xl border-2 border-violet-500 text-center"><div className="text-xs uppercase font-black opacity-75">Varianza</div><div className="text-2xl font-black text-violet-600">{variance}</div></div>
          <div className="p-4 bg-rose-500/10 rounded-2xl border-2 border-rose-500 text-center"><div className="text-xs uppercase font-black opacity-75">Desv.</div><div className="text-2xl font-black text-rose-600">{std}</div></div>
        </div>
      </div>
    </TopicCard>
  );
};

export const ProbabilidadInteractiva: React.FC = () => {
  const [total, setTotal] = useState(10); const [fav, setFav] = useState(3);
  const pct = ((fav/total)*100).toFixed(1);
  return (
    <TopicCard icon="🎲" title="Probabilidad Básica" color="#0369a1" desc="P = casos favorables / casos posibles.">
      <div className="lab-container">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <NumberInput label="Total canicas" value={total} setValue={setTotal} min={1} max={20} color="#0369a1" />
          <NumberInput label="Canicas rojas" value={fav} setValue={(v)=>setFav(Math.min(v,total))} min={0} max={total} color="#075985" />
        </div>
        <ProbabilityVisual visual={{ total, fav }} />
        <div className="lab-formula text-center">P(roja) = {fav}/{total} = <span style={{ color: 'var(--primary-color)' }}>{pct}%</span></div>
      </div>
    </TopicCard>
  );
};

// Volume components
export const VolumenCubo: React.FC = () => {
  const [l, setL] = useState(5);
  const v = l*l*l; const sup = 6*l*l;
  return (
    <TopicCard icon="📦" title="Volumen del Cubo" color="#f97316" desc="V = lado × lado × lado = l³:">
      <div className="lab-container space-y-4">
        <NumberInput label="Lado (cm)" value={l} setValue={setL} min={1} max={15} color="#f97316" />
        <div className="lab-formula text-center">V = {l}³ = {v} cm³ · S = {sup} cm²</div>
        <div className="grid gap-4 md:grid-cols-[1fr_1fr] items-center">
          <div className="flex justify-center p-6 bg-surface-color rounded-3xl border-2 border-border-color shadow">
            <svg viewBox="0 0 180 160" className="w-64 h-56 drop-shadow-xl">
              <polygon points="45,45 120,20 150,50 75,75" fill="rgba(249,115,22,.25)" stroke="#f97316" strokeWidth="3" />
              <polygon points="75,75 150,50 150,125 75,150" fill="rgba(249,115,22,.16)" stroke="#f97316" strokeWidth="3" />
              <polygon points="45,45 75,75 75,150 45,120" fill="rgba(249,115,22,.32)" stroke="#f97316" strokeWidth="3" />
              <text x="95" y="17" textAnchor="middle" className="font-black text-xs fill-orange-600">lado = {l} cm</text>
              <text x="95" y="92" textAnchor="middle" className="font-black text-sm fill-orange-700">{v} cm³</text>
            </svg>
          </div>
          <div className="p-4 rounded-2xl bg-orange-500/10 border-2 border-orange-500/30 text-sm font-bold">
            Imagina llenar la caja con cubitos de 1 cm³. Hay {l} cubitos de largo, {l} de ancho y {l} de alto: {l}×{l}×{l} = {v} cubitos.
          </div>
        </div>
      </div>
    </TopicCard>
  );
};

export const VolumenEsfera: React.FC = () => {
  const [r, setR] = useState(4);
  const v = (4/3*Math.PI*r*r*r).toFixed(1); const sup = (4*Math.PI*r*r).toFixed(1);
  return (
    <TopicCard icon="⚽" title="Volumen y Superficie de la Esfera" color="#db2777" desc="V = (4/3)πr³, S = 4πr²:">
      <div className="lab-container space-y-4">
        <NumberInput label="Radio (cm)" value={r} setValue={setR} min={1} max={12} color="#db2777" />
        <div className="lab-formula text-center">V ≈ {v} cm³ · S ≈ {sup} cm²</div>
        <div className="flex justify-center p-6 bg-surface-color rounded-3xl border-2 border-border-color shadow">
          <svg viewBox="0 0 180 160" className="w-64 h-56 drop-shadow-xl">
            <defs><radialGradient id="sphereGrad"><stop offset="0%" stopColor="#fbcfe8"/><stop offset="70%" stopColor="#db2777"/><stop offset="100%" stopColor="#831843"/></radialGradient></defs>
            <circle cx="90" cy="80" r="58" fill="url(#sphereGrad)" stroke="#db2777" strokeWidth="3" />
            <ellipse cx="90" cy="80" rx="58" ry="18" fill="none" stroke="white" strokeWidth="2" strokeDasharray="6 4" opacity=".8" />
            <line x1="90" y1="80" x2="145" y2="55" stroke="white" strokeWidth="3" />
            <text x="126" y="53" className="font-black text-xs fill-white">r={r}</text>
            <text x="90" y="148" textAnchor="middle" className="font-black text-sm fill-pink-700">V≈{v} cm³</text>
          </svg>
        </div>
      </div>
    </TopicCard>
  );
};

export const VolumenCilindro: React.FC = () => {
  const [r, setR] = useState(3); const [h, setH] = useState(8);
  const v = (Math.PI*r*r*h).toFixed(1); const sup = (2*Math.PI*r*h + 2*Math.PI*r*r).toFixed(1);
  return (
    <TopicCard icon="🥫" title="Volumen del Cilindro" color="#0891b2" desc="V = πr²h, S = 2πrh + 2πr²:">
      <div className="lab-container space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <NumberInput label="Radio (cm)" value={r} setValue={setR} min={1} max={10} color="#0891b2" />
          <NumberInput label="Altura (cm)" value={h} setValue={setH} min={2} max={20} color="#0e7490" />
        </div>
        <div className="lab-formula text-center">V ≈ {v} cm³ · S ≈ {sup} cm²</div>
        <div className="flex justify-center p-6 bg-surface-color rounded-3xl border-2 border-border-color shadow">
          <svg viewBox="0 0 180 180" className="w-64 h-64 drop-shadow-xl">
            <ellipse cx="90" cy="35" rx="55" ry="18" fill="rgba(8,145,178,.25)" stroke="#0891b2" strokeWidth="3" />
            <path d="M35 35 V130 C35 154 145 154 145 130 V35" fill="rgba(8,145,178,.14)" stroke="#0891b2" strokeWidth="3" />
            <ellipse cx="90" cy="130" rx="55" ry="18" fill="rgba(8,145,178,.2)" stroke="#0891b2" strokeWidth="3" />
            <line x1="90" y1="35" x2="140" y2="43" stroke="#0891b2" strokeWidth="2" />
            <text x="118" y="33" className="font-black text-xs fill-cyan-700">r={r}</text>
            <text x="148" y="86" className="font-black text-xs fill-cyan-700">h={h}</text>
          </svg>
        </div>
      </div>
    </TopicCard>
  );
};

export const VolumenCono: React.FC = () => {
  const [r, setR] = useState(4); const [h, setH] = useState(9);
  const v = (Math.PI*r*r*h/3).toFixed(1);
  return (
    <TopicCard icon="🔺" title="Volumen del Cono" color="#dc2626" desc="V = (πr²h)/3:">
      <div className="lab-container space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <NumberInput label="Radio (cm)" value={r} setValue={setR} min={1} max={10} color="#dc2626" />
          <NumberInput label="Altura (cm)" value={h} setValue={setH} min={1} max={20} color="#b91c1c" />
        </div>
        <div className="lab-formula text-center">V ≈ {v} cm³</div>
        <div className="grid gap-4 md:grid-cols-[1fr_1fr] items-center">
          <div className="flex justify-center p-6 bg-surface-color rounded-3xl border-2 border-border-color shadow">
            <svg viewBox="0 0 180 180" className="w-64 h-64 drop-shadow-xl">
              <path d="M90 20 L35 145 Q90 168 145 145 Z" fill="rgba(220,38,38,.16)" stroke="#dc2626" strokeWidth="3" />
              <ellipse cx="90" cy="145" rx="55" ry="16" fill="rgba(220,38,38,.22)" stroke="#dc2626" strokeWidth="3" />
              <line x1="90" y1="20" x2="90" y2="145" stroke="#dc2626" strokeDasharray="6 4" strokeWidth="2" />
              <text x="96" y="85" className="font-black text-xs fill-red-700">h={h}</text>
              <text x="112" y="163" className="font-black text-xs fill-red-700">r={r}</text>
            </svg>
          </div>
          <div className="p-4 rounded-2xl bg-red-500/10 border-2 border-red-500/30 text-sm font-bold">Un cono ocupa un tercio del volumen de un cilindro con el mismo radio y altura.</div>
        </div>
      </div>
    </TopicCard>
  );
};

export const VolumenPiramide: React.FC = () => {
  const [b, setB] = useState(6); const [h, setH] = useState(10);
  const v = ((b*b*h)/3).toFixed(1);
  return (
    <TopicCard icon="🔺" title="Volumen de la Pirámide" color="#6366f1" desc="V = (b² × h)/3:">
      <div className="lab-container space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <NumberInput label="Lado base (cm)" value={b} setValue={setB} min={1} max={15} color="#6366f1" />
          <NumberInput label="Altura (cm)" value={h} setValue={setH} min={1} max={20} color="#4f46e5" />
        </div>
        <div className="lab-formula text-center">V ≈ {v} cm³</div>
        <div className="flex justify-center p-6 bg-surface-color rounded-3xl border-2 border-border-color shadow">
          <svg viewBox="0 0 180 180" className="w-64 h-64 drop-shadow-xl">
            <polygon points="90,18 35,145 145,145" fill="rgba(99,102,241,.18)" stroke="#6366f1" strokeWidth="3" />
            <polygon points="35,145 90,118 145,145 90,166" fill="rgba(99,102,241,.12)" stroke="#6366f1" strokeWidth="2" />
            <line x1="90" y1="18" x2="90" y2="145" stroke="#6366f1" strokeDasharray="6 4" strokeWidth="2" />
            <text x="95" y="82" className="font-black text-xs fill-indigo-700">h={h}</text>
            <text x="90" y="174" textAnchor="middle" className="font-black text-xs fill-indigo-700">base={b}×{b}</text>
          </svg>
        </div>
      </div>
    </TopicCard>
  );
};

export const VolumenPrisma: React.FC = () => {
  const [l, setL] = useState(5); const [w, setW] = useState(3); const [h, setH] = useState(8);
  const v = l*w*h; const sup = 2*(l*w + l*h + w*h);
  return (
    <TopicCard icon="📦" title="Volumen del Prisma Rectangular" color="#f59e0b" desc="V = largo × ancho × altura:">
      <div className="lab-container space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <NumberInput label="Largo" value={l} setValue={setL} min={1} max={15} color="#f59e0b" />
          <NumberInput label="Ancho" value={w} setValue={setW} min={1} max={15} color="#d97706" />
          <NumberInput label="Alto" value={h} setValue={setH} min={1} max={20} color="#b45309" />
        </div>
        <div className="lab-formula text-center">V = {l}×{w}×{h} = {v} cm³ · S = {sup} cm²</div>
        <div className="flex justify-center p-6 bg-surface-color rounded-3xl border-2 border-border-color shadow">
          <svg viewBox="0 0 200 170" className="w-72 h-60 drop-shadow-xl">
            <rect x="35" y="55" width="105" height="80" fill="rgba(245,158,11,.2)" stroke="#f59e0b" strokeWidth="3" />
            <polygon points="35,55 70,25 175,25 140,55" fill="rgba(245,158,11,.13)" stroke="#f59e0b" strokeWidth="3" />
            <polygon points="140,55 175,25 175,105 140,135" fill="rgba(245,158,11,.1)" stroke="#f59e0b" strokeWidth="3" />
            <text x="86" y="150" textAnchor="middle" className="font-black text-xs fill-amber-700">largo={l}</text>
            <text x="165" y="124" className="font-black text-xs fill-amber-700">alto={h}</text>
            <text x="128" y="23" className="font-black text-xs fill-amber-700">ancho={w}</text>
          </svg>
        </div>
      </div>
    </TopicCard>
  );
};

