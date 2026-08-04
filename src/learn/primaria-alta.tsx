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
// 🟡 PRIMARIA ALTA
// ==========================================

export const FracOperaciones: React.FC = () => {
  const [n1, setN1] = useState(1); const [d1, setD1] = useState(2);
  const [n2, setN2] = useState(1); const [d2, setD2] = useState(3);
  const [op, setOp] = useState<'+' | '−' | '×' | '÷'>('+');
  let resultN = 0, resultD = 1, explanation = '';
  const common = d1 * d2;
  if (op === '+') { resultN = n1 * d2 + n2 * d1; resultD = common; explanation = `Común denominador: ${d1}×${d2}=${common}.`; }
  else if (op === '−') { resultN = n1 * d2 - n2 * d1; resultD = common; explanation = `Común denominador: ${d1}×${d2}=${common}.`; }
  else if (op === '×') { resultN = n1 * n2; resultD = d1 * d2; explanation = `Multiplica numerador con numerador y denominador con denominador.`; }
  else { resultN = n1 * d2; resultD = d1 * n2; explanation = `Invierte la segunda y multiplica.`; }
  const reduced = reduceFraction(resultN, Math.max(1, resultD));
  return (
    <TopicCard icon="🧮" title="Operaciones con Fracciones" color="#0ea5e9" desc="Suma, resta, multiplica y divide fracciones:">
      <div className="lab-container">
        <div className="flex justify-center gap-2 mb-4 flex-wrap">
          {(['+', '−', '×', '÷'] as const).map(o => (<button key={o} onClick={() => setOp(o)} className={`w-12 h-12 rounded-xl font-black text-2xl transition-all ${op === o ? 'bg-[var(--primary-color)] text-white scale-110 shadow-lg' : 'bg-slate-200 dark:bg-slate-700 hover:scale-105'}`}>{o}</button>))}
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
          <NumberInput label="Num 1" value={n1} setValue={setN1} min={0} max={9} color="#a855f7" />
          <NumberInput label="Den 1" value={d1} setValue={setD1} min={1} max={9} color="#a855f7" />
          <NumberInput label="Num 2" value={n2} setValue={setN2} min={op === '÷' ? 1 : 0} max={9} color="#0ea5e9" />
          <NumberInput label="Den 2" value={d2} setValue={setD2} min={1} max={9} color="#0ea5e9" />
        </div>
        <div className="lab-formula text-center">{n1}/{d1} {op} {n2}/{d2} = <span style={{ color: 'var(--primary-color)' }}>{resultN}/{resultD}</span>{(reduced.n !== resultN || reduced.d !== resultD) && resultD !== 0 && (<span className="ml-3 text-sm opacity-70">= {reduced.n}/{reduced.d}</span>)}</div>
        <FractionOpsVisual visual={{ op, n1, d1, n2, d2, result: { n: resultN, d: resultD } }} />
        <div className="text-sm opacity-85 font-bold p-3 bg-blue-500/10 rounded-xl mt-2">📘 {explanation}</div>
      </div>
    </TopicCard>
  );
};

export const DivisibilidadInteractiva: React.FC = () => {
  const [num, setNum] = useState(120);
  const checks = [{ n: 2, regla: 'termina en par' }, { n: 3, regla: 'suma dígitos múltiplo de 3' }, { n: 5, regla: 'termina en 0 o 5' }, { n: 10, regla: 'termina en 0' }];
  return (
    <TopicCard icon="✓" title="Criterios de Divisibilidad" color="#10b981" desc="¿Cómo saber rápidamente si un número se divide exactamente por otro?">
      <div className="lab-container">
        <NumberInput label="Número" value={num} setValue={setNum} min={1} max={999} color="#10b981" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-4">
          {checks.map(c => { const ok = num % c.n === 0; return (
            <div key={c.n} className={`p-4 rounded-2xl border-2 transition-all ${ok ? 'border-emerald-500 bg-emerald-500/10' : 'border-red-500/30 bg-red-500/5 opacity-70'}`}>
              <div className="font-black text-2xl text-center mb-1">{ok ? '✅' : '❌'} ÷ {c.n}</div>
              <div className="text-[10px] font-bold opacity-75 text-center">{c.regla}</div>
            </div>
          );})}
        </div>
      </div>
    </TopicCard>
  );
};

export const NumerosPrimos: React.FC = () => {
  const [n, setN] = useState(7);
  const divisores: number[] = [];
  for (let i = 1; i <= n; i++) if (n % i === 0) divisores.push(i);
  const esPrimo = isPrime(n);
  return (
    <TopicCard icon="🔐" title="Números Primos" color="#0d9488" desc="Un número PRIMO solo tiene 2 divisores: el 1 y él mismo.">
      <div className="lab-container">
        <NumberInput label="Número" value={n} setValue={setN} min={2} max={50} color="#0d9488" />
        <PrimeVisual visual={{ type: 'prime', n }} />
        <div className={`p-4 rounded-2xl font-black text-center text-lg ${esPrimo ? 'bg-emerald-500/20 text-emerald-700 dark:text-emerald-400' : 'bg-red-500/20 text-red-700 dark:text-red-400'}`}>{esPrimo ? `✅ ${n} ES PRIMO` : `❌ ${n} NO es primo (tiene ${divisores.length} divisores)`}</div>
      </div>
    </TopicCard>
  );
};

export const McmMcdInteractivo: React.FC = () => {
  const [a, setA] = useState(12); const [b, setB] = useState(18);
  const mcd = gcd(a, b); const mcm = lcm(a, b);
  const divisoresA = Array.from({ length: a }, (_, i) => i + 1).filter(n => a % n === 0);
  const divisoresB = Array.from({ length: b }, (_, i) => i + 1).filter(n => b % n === 0);
  const comunesDiv = divisoresA.filter(n => divisoresB.includes(n));
  const mulsA = Array.from({ length: 10 }, (_, i) => a * (i + 1));
  const mulsB = Array.from({ length: 10 }, (_, i) => b * (i + 1));
  const comunesMul = mulsA.filter(n => mulsB.includes(n));
  return (
    <TopicCard icon="🔗" title="MCM y MCD" color="#059669" desc="MCD: mayor que divide a ambos. MCM: menor múltiplo común.">
      <div className="lab-container space-y-4">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <NumberInput label="Número A" value={a} setValue={setA} min={2} max={30} color="#059669" />
          <NumberInput label="Número B" value={b} setValue={setB} min={2} max={30} color="#047857" />
        </div>
        <div className="grid grid-cols-2 gap-3 my-3">
          <div className="p-4 bg-emerald-500/10 rounded-2xl border-2 border-emerald-500 text-center"><div className="text-xs uppercase font-black opacity-75">MCD</div><div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">{mcd}</div></div>
          <div className="p-4 bg-cyan-500/10 rounded-2xl border-2 border-cyan-500 text-center"><div className="text-xs uppercase font-black opacity-75">MCM</div><div className="text-3xl font-black text-cyan-600 dark:text-cyan-400">{mcm}</div></div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-4 rounded-3xl bg-surface-color border-2 border-emerald-500/30 shadow">
            <div className="font-black text-sm mb-2 text-emerald-600">Divisores (para MCD)</div>
            <div className="text-xs font-bold opacity-70 mb-1">Divisores de {a}</div>
            <div className="flex flex-wrap gap-1 mb-3">{divisoresA.map(n => <span key={n} className={`px-2 py-1 rounded-lg text-xs font-black ${comunesDiv.includes(n) ? 'bg-emerald-500 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}>{n}</span>)}</div>
            <div className="text-xs font-bold opacity-70 mb-1">Divisores de {b}</div>
            <div className="flex flex-wrap gap-1">{divisoresB.map(n => <span key={n} className={`px-2 py-1 rounded-lg text-xs font-black ${comunesDiv.includes(n) ? 'bg-emerald-500 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}>{n}</span>)}</div>
            <div className="mt-3 text-xs font-bold">Los comunes son {comunesDiv.join(', ')}. El mayor es <b>{mcd}</b>.</div>
          </div>
          <div className="p-4 rounded-3xl bg-surface-color border-2 border-cyan-500/30 shadow">
            <div className="font-black text-sm mb-2 text-cyan-600">Múltiplos (para MCM)</div>
            <div className="text-xs font-bold opacity-70 mb-1">Múltiplos de {a}</div>
            <div className="flex flex-wrap gap-1 mb-3">{mulsA.map(n => <span key={n} className={`px-2 py-1 rounded-lg text-xs font-black ${mulsB.includes(n) ? 'bg-cyan-500 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}>{n}</span>)}</div>
            <div className="text-xs font-bold opacity-70 mb-1">Múltiplos de {b}</div>
            <div className="flex flex-wrap gap-1">{mulsB.map(n => <span key={n} className={`px-2 py-1 rounded-lg text-xs font-black ${mulsA.includes(n) ? 'bg-cyan-500 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}>{n}</span>)}</div>
            <div className="mt-3 text-xs font-bold">Primer múltiplo común: <b>{comunesMul[0] ?? mcm}</b>.</div>
          </div>
        </div>
      </div>
    </TopicCard>
  );
};

export const PorcentajeInteractivo: React.FC = () => {
  const [total, setTotal] = useState(200); const [pct, setPct] = useState(25);
  const result = (total * pct) / 100;
  return (
    <TopicCard icon="%" title="Porcentajes" color="#16a34a" desc="Un porcentaje es una parte de 100:">
      <div className="lab-container">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <NumberInput label="Total" value={total} setValue={setTotal} min={1} max={1000} color="#16a34a" />
          <NumberInput label="%" value={pct} setValue={setPct} min={0} max={100} color="#15803d" />
        </div>
        <div className="lab-formula text-center">{pct}% de {total} = <span style={{ color: 'var(--primary-color)' }}>{result}</span></div>
        <PercentVisual visual={{ type: 'percent', total, pct }} />
      </div>
    </TopicCard>
  );
};

export const DecimalesInteractivo: React.FC = () => {
  const [num, setNum] = useState(7); const [den, setDen] = useState(8);
  return (
    <TopicCard icon="0.5" title="Fracciones a Decimales" color="#0891b2" desc="Convierte cualquier fracción a número decimal:">
      <div className="lab-container">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <NumberInput label="Numerador" value={num} setValue={setNum} min={-20} max={20} color="#0891b2" />
          <NumberInput label="Denominador" value={den} setValue={setDen} min={-20} max={20} color="#0e7490" />
        </div>
        <div className="lab-formula text-center">{num}/{den} = <span style={{ color: 'var(--primary-color)' }}>{(den !== 0 ? (num/den).toFixed(4) : '∞')}</span></div>
      </div>
    </TopicCard>
  );
};

export const FraccionesComplejasInteractivo: React.FC = () => {
  const [n1, setN1] = useState(3); const [d1, setD1] = useState(4);
  const [n2, setN2] = useState(5); const [d2, setD2] = useState(6);
  const rawN = n1 * d2; const rawD = d1 * n2;
  const reduced = reduceFraction(rawN, rawD || 1);
  return (
    <TopicCard icon="🥪" title="Fracciones Complejas" color="#0284c7" desc="Una fracción compleja es una fracción dividida entre otra:">
      <div className="lab-container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
          <NumberInput label="Num A" value={n1} setValue={setN1} min={-20} max={20} color="#0284c7" />
          <NumberInput label="Den A" value={d1} setValue={setD1} min={-20} max={20} color="#0369a1" />
          <NumberInput label="Num B" value={n2} setValue={setN2} min={-20} max={20} color="#0ea5e9" />
          <NumberInput label="Den B" value={d2} setValue={setD2} min={-20} max={20} color="#38bdf8" />
        </div>
        <div className="lab-formula text-center">({n1}/{d1}) ÷ ({n2}/{d2}) = {rawN}/{rawD || 1} = <span style={{ color: 'var(--primary-color)' }}>{reduced.n}/{reduced.d}</span></div>
      </div>
    </TopicCard>
  );
};

export const NumerosNegativosInteractivo: React.FC = () => {
  const [start, setStart] = useState(-5); const [jump, setJump] = useState(7);
  const result = Number((start + jump).toFixed(2));
  return (
    <TopicCard icon="➖" title="Números Negativos y Recta Entera" color="#2563eb" desc="Números negativos en la recta numérica:">
      <div className="lab-container">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <NumberInput label="Inicio" value={start} setValue={setStart} min={-100} max={100} step={0.5} color="#2563eb" />
          <NumberInput label="Salto" value={jump} setValue={setJump} min={-50} max={50} step={0.5} color="#1d4ed8" />
        </div>
        <div className="lab-formula text-center">{start} {jump >= 0 ? '+' : '−'} {Math.abs(jump)} = <span style={{ color: 'var(--primary-color)' }}>{result}</span></div>
        <div className="number-line-shell w-full max-w-full min-w-0 overflow-x-auto overflow-y-hidden pb-2">
            <div className="w-full min-w-[360px] max-w-full">
              <NumberLineVisual visual={{ type: 'number-line', start: Math.min(start, result) - 2, end: Math.max(start, result) + 2, current: start, jump }} />
            </div>
          </div>
      </div>
    </TopicCard>
  );
};

export const TeoriaConjuntosInteractiva: React.FC = () => {
  const [a, setA] = useState(9); const [b, setB] = useState(7); const [unionRaw, setUnionRaw] = useState(12);
  const minUnion = Math.max(a, b); const maxUnion = a + b;
  const union = Math.min(Math.max(unionRaw, minUnion), maxUnion);
  const inter = a + b - union;
  return (
    <TopicCard icon="⭕" title="Teoría de Conjuntos y Diagramas de Venn" color="#6366f1" desc="Conjuntos: Unión e Intersección:">
      <div className="lab-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
          <NumberInput label="n(A)" value={a} setValue={setA} min={0} max={30} color="#2563eb" />
          <NumberInput label="n(B)" value={b} setValue={setB} min={0} max={30} color="#ec4899" />
          <NumberInput label="n(A∪B)" value={unionRaw} setValue={setUnionRaw} min={0} max={60} color="#8b5cf6" />
        </div>
        <div className="lab-formula text-center">n(A ∩ B) = {a} + {b} − {union} = <span style={{ color: 'var(--primary-color)' }}>{inter}</span></div>
        <ConjuntosVisual visual={{ a, b, inter }} />
      </div>
    </TopicCard>
  );
};

export const ConjuntosNumericosInteractivo: React.FC = () => {
  const [numText, setNumText] = useState('45');
  const classify = (s: string) => {
    const t = s.trim().toLowerCase();
    if (t === 'pi' || t === 'π' || t.includes('√') || t.includes('sqrt') || t.includes('e') && !t.includes('i')) return 'R';
    if (t.includes('i')) return 'C';
    if (t.includes('/') && !t.includes('.')) return 'Q';
    if (/^-?\d*\.\d+$/.test(t) || /^-?\d+\.\d*$/.test(t)) return 'Q';
    if (/^-?\d+$/.test(t)) {
      const n = parseInt(t, 10);
      if (n < 0) return 'Z';
      return 'N';
    }
    return 'R';
  };
  const selected = classify(numText);
  const getExplanation = (sel: string) => {
    switch (sel) {
      case 'N':
        return 'Es un número Natural (ℕ). Por la relación de inclusión de conjuntos, también forma parte de los Enteros (ℤ), Racionales (ℚ), Reales (ℝ) y Complejos (ℂ).';
      case 'Z':
        return 'Es un número Entero (ℤ) negativo. Por inclusión, también pertenece a los Racionales (ℚ), Reales (ℝ) y Complejos (ℂ) (pero NO es Natural).';
      case 'Q':
        return 'Es un número Racional (ℚ) (fracción o decimal finito). Por inclusión, también pertenece a los Reales (ℝ) y Complejos (ℂ).';
      case 'R':
        return 'Es un número Real (ℝ) irracional (como π o raíces no exactas). Por inclusión, también pertenece a los Complejos (ℂ).';
      case 'C':
        return 'Es un número Complejo (ℂ) con parte imaginaria (i). Solo pertenece a este conjunto universal.';
      default:
        return '';
    }
  };
  const selectedName = selected === 'N' ? 'Naturales (ℕ)' : selected === 'Z' ? 'Enteros (ℤ)' : selected === 'Q' ? 'Racionales (ℚ)' : selected === 'R' ? 'Reales (ℝ)' : 'Complejos (ℂ)';
  return (
    <TopicCard icon="🌀" title="Conjuntos Numéricos y su Inclusión" color="#7c3aed" desc="Explora cómo se incluyen los conjuntos numéricos. Escribe un número para ver su clasificación y su cadena de pertenencia:">
      <div className="lab-container space-y-4">
        <input value={numText} onChange={e => setNumText(e.target.value)} className="w-full p-3 rounded-2xl border-2 border-border-color bg-surface-color font-black text-lg" placeholder="Ejemplo: 45, -5, 3/4, 2.7, 4+2i, π, √2, sqrt(3)" />
        <div className="p-4 rounded-2xl bg-purple-500/10 border-2 border-purple-500/30 space-y-2">
          <div className="text-center font-black text-lg">
            El número <span style={{ color: 'var(--primary-color)' }}>{numText}</span> es principalmente: <span className="underline">{selectedName}</span>
          </div>
          <p className="text-xs font-bold opacity-80 text-center">{getExplanation(selected)}</p>
        </div>
        <NumberSetsVisual visual={{ selected }} />
      </div>
    </TopicCard>
  );
};

export const CriptografiaCesarInteractiva: React.FC = () => {
  const [shift, setShift] = useState(3); const [text, setText] = useState('MATE');
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const encrypt = (s: string) => s.toUpperCase().split('').map(ch => { const idx = alphabet.indexOf(ch); if (idx === -1) return ch; return alphabet[(idx + shift + 26) % 26]; }).join('');
  return (
    <TopicCard icon="🔐" title="Criptografía César" color="#14b8a6" desc="El cifrado César desplaza cada letra un número fijo de posiciones:">
      <div className="lab-container">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_220px] gap-3 mb-4">
          <input value={text} onChange={e => setText(e.target.value.toUpperCase())} className="w-full p-3 rounded-2xl border-2 border-border-color bg-surface-color font-black text-lg" placeholder="Escribe una palabra" />
          <NumberInput label="Desplazamiento" value={shift} setValue={setShift} min={-13} max={13} color="#14b8a6" />
        </div>
        <div className="lab-formula text-center">Texto cifrado: <span style={{ color: 'var(--primary-color)' }}>{encrypt(text)}</span></div>
        <CriptografiaVisual visual={{ start: text || 'A', shift, end: encrypt(text || 'A') }} />
      </div>
    </TopicCard>
  );
};

export const FigurasAvanzadasInteractivo: React.FC = () => {
  const [shape, setShape] = useState<'trapecio' | 'rombo' | 'pentagono' | 'hexagono' | 'octagono' | 'elipse' | 'sector'>('trapecio');
  const [w, setW] = useState(12); const [h, setH] = useState(6); const [bSmall, setBSmall] = useState(8);
  let formula = ''; let area = 0;
  if (shape === 'trapecio') { area = ((w + bSmall) * h) / 2; formula = `A = (${w} + ${bSmall}) × ${h} / 2 = ${area}`; }
  else if (shape === 'rombo') { area = (w * h) / 2; formula = `A = (${w} × ${h}) / 2 = ${area}`; }
  else if (shape === 'pentagono') { area = Math.round((5 * w * h) / 2); formula = `A = (P × a)/2 = (${5*w} × ${h})/2 ≈ ${area}`; }
  else if (shape === 'hexagono') { area = Math.round((6 * w * h) / 2); formula = `A = (P × a)/2 = (${6*w} × ${h})/2 ≈ ${area}`; }
  else if (shape === 'octagono') { area = Math.round((8 * w * h) / 2); formula = `A = (P × a)/2 = (${8*w} × ${h})/2 ≈ ${area}`; }
  else if (shape === 'elipse') { area = Math.round(Math.PI * w * h); formula = `A = π × a × b ≈ ${area}`; }
  else if (shape === 'sector') { const ang = h; area = Math.round((ang / 360) * Math.PI * w * w); formula = `A = (${ang}/360) × π × ${w}² ≈ ${area}`; }
  return (
    <TopicCard icon="🔷" title="Figuras Geométricas Avanzadas" color="#e11d48" desc="Explora trapecio, rombo, pentágono, hexágono, elipse y sector:">
      <div className="lab-container">
        <div className="flex gap-2 flex-wrap mb-4">
          {(['trapecio','rombo','pentagono','hexagono','octagono','elipse','sector'] as const).map(s => (
            <button key={s} onClick={() => setShape(s)} className={`px-4 py-2 rounded-xl font-black capitalize text-xs ${shape === s ? 'bg-rose-600 text-white shadow' : 'bg-slate-200 dark:bg-slate-700'}`}>{s}</button>
          ))}
        </div>
        <div className={`grid gap-3 mb-4 ${shape === 'trapecio' ? 'grid-cols-3' : 'grid-cols-2'}`}>
          <NumberInput label={shape === 'elipse'?'Semi-eje a':shape==='sector'?'Radio':shape==='rombo'?'Dg mayor':'Base mayor'} value={w} setValue={setW} min={1} max={20} color="#e11d48" />
          <NumberInput label={shape === 'elipse'?'Semi-eje b':shape==='sector'?'Ángulo(°)':shape==='rombo'?'Dg menor':'Altura'} value={h} setValue={setH} min={1} max={20} color="#be123c" />
          {shape === 'trapecio' && <NumberInput label="Base menor" value={bSmall} setValue={setBSmall} min={1} max={20} color="#fb7185" />}
        </div>
        <div className="lab-formula text-center">{formula}</div>
        <ShapeVisual visual={{ type: 'shape', shape, w, h, b: bSmall }} />
      </div>
    </TopicCard>
  );
};

export const JerarquiaPEMDAS: React.FC = () => {
  const [mode, setMode] = useState<'A' | 'B'>('A');
  return (
    <TopicCard icon="🚦" title="Jerarquía de Operaciones (Orden)" color="#0ea5e9" desc="El orden en que resuelves las operaciones cambia el resultado:">
      <div className="lab-container space-y-4">
        <div className="flex justify-center gap-3">
          <button onClick={() => setMode('A')} className={`px-5 py-3 rounded-2xl font-black text-sm transition-all ${mode === 'A' ? 'bg-sky-500 text-white shadow-lg' : 'bg-slate-200 dark:bg-slate-700'}`}>Sin Paréntesis</button>
          <button onClick={() => setMode('B')} className={`px-5 py-3 rounded-2xl font-black text-sm transition-all ${mode === 'B' ? 'bg-sky-500 text-white shadow-lg' : 'bg-slate-200 dark:bg-slate-700'}`}>Con Paréntesis</button>
        </div>
        <div className="p-6 bg-surface-color border-2 border-border-color rounded-3xl shadow text-center space-y-4">
          <div className="text-3xl font-mono font-black">{mode === 'A' ? '2 + 3 × 5' : '(2 + 3) × 5'}</div>
          <div className="text-sm font-bold opacity-80 max-w-md mx-auto leading-relaxed">
            {mode === 'A' ? (
              <div><div>Paso 1: Multiplicación → 3×5=15</div><div>Paso 2: Suma → 2+15=17</div><div className="text-xl font-black text-sky-500 mt-2">Resultado = 17</div></div>
            ) : (
              <div><div>Paso 1: Paréntesis → 2+3=5</div><div>Paso 2: Multiplicación → 5×5=25</div><div className="text-xl font-black text-sky-500 mt-2">Resultado = 25</div></div>
            )}
          </div>
        </div>
      </div>
    </TopicCard>
  );
};

export const ReglaDeTres: React.FC = () => {
  const [a, setA] = useState(3); const [costA, setCostA] = useState(6); const [b, setB] = useState(5);
  const result = (b * costA) / a;
  return (
    <TopicCard icon="📊" title="Regla de Tres Simple Directa" color="#0ea5e9" desc="La regla de tres resuelve proporciones directas:">
      <div className="lab-container space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <NumberInput label="Cantidad A" value={a} setValue={setA} min={1} max={50} color="#0ea5e9" />
          <NumberInput label="Costo A ($)" value={costA} setValue={setCostA} min={1} max={100} color="#0284c7" />
          <NumberInput label="Cantidad B" value={b} setValue={setB} min={1} max={50} color="#0369a1" />
        </div>
        <div className="lab-formula text-center">x = ({b} × ${costA}) ÷ {a} = <span style={{ color: 'var(--primary-color)' }}>${result.toFixed(2)}</span></div>
      </div>
    </TopicCard>
  );
};

export const ProbabilidadLaplace: React.FC = () => {
  const [total, setTotal] = useState(10); const [fav, setFav] = useState(3);
  const pct = ((fav / total) * 100).toFixed(1);
  return (
    <TopicCard icon="🎲" title="Probabilidad de Laplace" color="#0ea5e9" desc="P = casos favorables / casos posibles:">
      <div className="lab-container space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <NumberInput label="Canicas Totales" value={total} setValue={setTotal} min={1} max={20} color="#0ea5e9" />
          <NumberInput label="Canicas Rojas" value={fav} setValue={(v) => setFav(Math.min(v, total))} min={0} max={total} color="#0284c7" />
        </div>
        <ProbabilityVisual visual={{ total, fav }} />
        <div className="lab-formula text-center">P(roja) = {fav}/{total} = <span style={{ color: 'var(--primary-color)' }}>{pct}%</span></div>
      </div>
    </TopicCard>
  );
};

export const FacturaIva: React.FC = () => {
  const [milk, setMilk] = useState(2); const [bread, setBread] = useState(3);
  const costMilk = 15; const costBread = 10;
  const subtotal = milk * costMilk + bread * costBread;
  const iva = Math.round(subtotal * 0.16);
  const total = subtotal + iva;
  return (
    <TopicCard icon="🧾" title="Tickets de Compra e Impuesto (IVA)" color="#0ea5e9" desc="Aprende cómo se desglosa una factura con el 16% de IVA:">
      <div className="lab-container space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <NumberInput label="Leches ($15 c/u)" value={milk} setValue={setMilk} min={0} max={10} color="#0ea5e9" />
          <NumberInput label="Panes ($10 c/u)" value={bread} setValue={setBread} min={0} max={10} color="#0284c7" />
        </div>
        <div className="lab-formula text-center">Subtotal: ${subtotal} | IVA: ${iva} | Total: <span style={{ color: 'var(--primary-color)' }}>${total}</span></div>
      </div>
    </TopicCard>
  );
};

