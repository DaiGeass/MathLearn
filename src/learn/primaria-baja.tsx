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
// 🟢 PRIMARIA BAJA
// ==========================================

export const InicioPrimariaBaja: React.FC = () => {
  type Mode = 'mapa' | 'numero' | 'historia' | 'uno-cero' | 'familias' | 'operaciones' | 'sistemas' | 'conjuntos';

  const [mode, setMode] = useState<Mode>('mapa');
  const [selectedFamily, setSelectedFamily] = useState('naturales');
  const [op, setOp] = useState<string>('mapa');
  const [a, setA] = useState(6);
  const [b, setB] = useState(3);
  const [opC, setOpC] = useState(521);
  const [opModalOpen, setOpModalOpen] = useState(false);
  const [systemNumber, setSystemNumber] = useState(27);
  const [system, setSystem] = useState<string>('decimal');
  const [setFocus, setSetFocus] = useState('naturales');
  const [historiaSub, setHistoriaSub] = useState<string>('mapa');
  const [zeroOneNumber, setZeroOneNumber] = useState(105);
  const [numeroSub, setNumeroSub] = useState<string>('idea');
  const [numeroCountA, setNumeroCountA] = useState(5);
  const [numeroCountB, setNumeroCountB] = useState(3);
  const [numeroGroupSize, setNumeroGroupSize] = useState(4);
  const [zeroOneSub, setZeroOneSub] = useState<string>('mapa');

  const colors = {
    count: '#22c55e',
    zero: '#38bdf8',
    negative: '#ef4444',
    fraction: '#f59e0b',
    rational: '#8b5cf6',
    irrational: '#ec4899',
    real: '#06b6d4',
    imaginary: '#6366f1',
    complex: '#14b8a6',
    history: '#f97316',
    system: '#84cc16',
  };

  const modes: { id: Mode; label: string; icon: string }[] = [
    { id: 'mapa', label: 'Mapa', icon: '🧭' },
    { id: 'numero', label: '¿Número?', icon: '🔎' },
    { id: 'historia', label: 'Historia', icon: '🏺' },
    { id: 'uno-cero', label: '1 y 0', icon: '1️⃣0️⃣' },
    { id: 'familias', label: 'Familias', icon: '🌳' },
    { id: 'operaciones', label: 'Operaciones', icon: '⚙️' },
    { id: 'sistemas', label: 'Sistemas', icon: '🔣' },
    { id: 'conjuntos', label: 'Conjuntos', icon: '🫧' },
  ];

  const box = (color: string) => ({
    borderColor: color,
    background: `linear-gradient(135deg, ${color}38, ${color}10)`,
  });

  const Panel = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <div className={`p-4 rounded-3xl bg-surface-color border-2 border-border-color shadow min-w-0 max-w-full overflow-x-auto ${className}`}>
      {children}
    </div>
  );

  const BigIdea = ({ title, icon, color, children }: { title: string; icon: string; color: string; children: React.ReactNode }) => (
    <div className="rounded-3xl border-2 shadow overflow-hidden" style={box(color)}>
      <div className="grid md:grid-cols-[190px_1fr]">
        <div className="p-5 text-white flex items-center justify-center" style={{ background: color }}>
          <div className="text-center">
            <div className="text-5xl mb-2 animate-pulse">{icon}</div>
            <div className="font-black text-xl leading-tight">{title}</div>
          </div>
        </div>
        <div className="p-5 text-sm md:text-base font-bold opacity-90 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );

  const Arrow = () => (
    <div className="hidden md:flex items-center justify-center text-4xl animate-pulse">➡️</div>
  );

  const MiniBadge = ({ children, color }: { children: React.ReactNode; color: string }) => (
    <span
      className="inline-flex items-center px-3 py-1 rounded-full border-2 font-black text-xs"
      style={box(color)}
    >
      {children}
    </span>
  );

  const ComplexPlaneVisual = ({
    realValue = 3,
    imaginaryValue = 2,
    label = '3 + 2i',
    color = colors.complex,
    large = false,
  }: {
    realValue?: number;
    imaginaryValue?: number;
    label?: string;
    color?: string;
    large?: boolean;
  }) => {
    const maxAbs = Math.max(5, Math.ceil(Math.max(Math.abs(realValue), Math.abs(imaginaryValue))) + 1);
    const ticks = Array.from({ length: maxAbs * 2 + 1 }, (_, i) => i - maxAbs);

    const toX = (x: number) => ((x + maxAbs) / (maxAbs * 2)) * 100;
    const toY = (y: number) => ((maxAbs - y) / (maxAbs * 2)) * 100;

    const x0 = toX(0);
    const y0 = toY(0);
    const px = toX(realValue);
    const py = toY(imaginaryValue);

    return (
      <div className="complex-plane-shell w-full max-w-full min-w-0 overflow-x-auto overflow-y-hidden pb-2">
        <div
          className={`${large ? 'h-[430px] min-w-[520px]' : 'h-80 min-w-[360px]'} relative mx-auto max-w-full rounded-3xl border-4 bg-surface-color shadow overflow-hidden`}
          style={{
            borderColor: color,
            background:
              `radial-gradient(circle, ${color}18 1px, transparent 1px), linear-gradient(135deg, ${color}18, transparent)`,
            backgroundSize: '22px 22px, 100% 100%',
          }}
        >
          <div className="absolute inset-5 rounded-3xl bg-slate-900/10 dark:bg-black/10" />

          <div
            className="absolute top-8 bottom-8 w-1 rounded-full bg-slate-300/80 dark:bg-slate-500"
            style={{ left: `${x0}%` }}
          />
          <div
            className="absolute left-8 right-8 h-1 rounded-full bg-slate-300/80 dark:bg-slate-500"
            style={{ top: `${y0}%` }}
          />

          {ticks.map(t => (
            <React.Fragment key={`x-${t}`}>
              <div
                className="absolute w-0.5 h-3 rounded-full bg-slate-300/70 dark:bg-slate-500"
                style={{ left: `${toX(t)}%`, top: `calc(${y0}% - 6px)` }}
              />
              {t !== 0 && (
                <div
                  className="absolute text-[10px] font-black opacity-70 -translate-x-1/2"
                  style={{ left: `${toX(t)}%`, top: `calc(${y0}% + 12px)` }}
                >
                  {t}
                </div>
              )}
            </React.Fragment>
          ))}

          {ticks.map(t => (
            <React.Fragment key={`y-${t}`}>
              <div
                className="absolute h-0.5 w-3 rounded-full bg-slate-300/70 dark:bg-slate-500"
                style={{ top: `${toY(t)}%`, left: `calc(${x0}% - 6px)` }}
              />
              {t !== 0 && (
                <div
                  className="absolute text-[10px] font-black opacity-70 -translate-y-1/2"
                  style={{ top: `${toY(t)}%`, left: `calc(${x0}% + 10px)` }}
                >
                  {t}i
                </div>
              )}
            </React.Fragment>
          ))}

          <div
            className="absolute border-t-4 border-dashed opacity-70"
            style={{
              borderColor: color,
              left: `${Math.min(x0, px)}%`,
              top: `${py}%`,
              width: `${Math.abs(px - x0)}%`,
            }}
          />
          <div
            className="absolute border-l-4 border-dashed opacity-70"
            style={{
              borderColor: color,
              left: `${px}%`,
              top: `${Math.min(y0, py)}%`,
              height: `${Math.abs(py - y0)}%`,
            }}
          />

          <div
            className="absolute -translate-x-1/2 -translate-y-1/2 text-5xl animate-bounce"
            style={{ left: `${px}%`, top: `${py}%` }}
          >
            📍
          </div>

          <div
            className="absolute -translate-x-1/2 px-3 py-1 rounded-full border-2 bg-surface-color shadow font-black text-sm whitespace-nowrap"
            style={{ left: `${px}%`, top: `calc(${py}% - 48px)`, borderColor: color }}
          >
            {label}
          </div>

          <div className="absolute right-5 text-xs font-black opacity-80" style={{ top: `calc(${y0}% + 10px)` }}>
            reales →
          </div>
          <div className="absolute text-xs font-black opacity-80" style={{ left: `calc(${x0}% + 10px)`, top: '10px' }}>
            imaginarios ↑
          </div>

          <div className="absolute left-5 bottom-4 flex gap-2 flex-wrap text-xs font-black">
            <span className="px-3 py-1 rounded-full border-2 bg-surface-color/80" style={{ borderColor: colors.real }}>
              real = {realValue}
            </span>
            <span className="px-3 py-1 rounded-full border-2 bg-surface-color/80" style={{ borderColor: colors.imaginary }}>
              imaginario = {imaginaryValue}i
            </span>
          </div>
        </div>
      </div>
    );
  };


  const objectRow = (count: number, icon: string) => (
    <div className="flex gap-2 flex-wrap justify-center text-4xl">
      {Array.from({ length: count }).map((_, i) => <span key={i}>{icon}</span>)}
      {count === 0 && <span className="text-sm font-black opacity-70">vacío</span>}
    </div>
  );

  const toRoman = (n: number) => {
    if (n <= 0) return 'sin cero romano';
    if (n > 3999) return 'muy grande para este ejemplo';

    const map: [number, string][] = [
      [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
      [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
      [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I'],
    ];

    let x = n;
    let out = '';

    for (const [value, symbol] of map) {
      while (x >= value) {
        out += symbol;
        x -= value;
      }
    }

    return out;
  };

  const toEgyptian = (n: number) => {
    const symbols = [
      { value: 1000, icon: '🌸' },
      { value: 100, icon: '🌀' },
      { value: 10, icon: '∩' },
      { value: 1, icon: '|' },
    ];

    let x = Math.max(0, Math.min(9999, Math.floor(n)));
    const parts: string[] = [];

    for (const s of symbols) {
      const c = Math.floor(x / s.value);
      if (c > 0) parts.push(s.icon.repeat(Math.min(c, 12)));
      x %= s.value;
    }

    return parts.length ? parts.join(' ') : 'no usaban el cero como nosotros';
  };

  const toBabylonian = (n: number) => {
    const x = Math.max(0, Math.floor(n));
    const high = Math.floor(x / 60);
    const low = x % 60;

    if (high === 0) return `${low}`;
    return `${high} ; ${low.toString().padStart(2, '0')}  base 60`;
  };

  const toMaya = (n: number) => {
    const x = Math.max(0, Math.floor(n));
    const twenties = Math.floor(x / 20);
    const units = x % 20;

    const dots = (k: number) => '●'.repeat(k % 5);
    const bars = (k: number) => '▬'.repeat(Math.floor(k / 5));

    const layer = (k: number) => {
      if (k === 0) return '𝋠';
      return `${dots(k)} ${bars(k)}`.trim();
    };

    if (twenties === 0) return layer(units);
    return `${layer(twenties)} / ${layer(units)}`;
  };

  const systemValue = () => {
    const n = Math.max(0, Math.floor(systemNumber));

    if (system === 'decimal') return String(n);
    if (system === 'romano') return toRoman(n);
    if (system === 'egipcio') return toEgyptian(n);
    if (system === 'binario') return n.toString(2);
    if (system === 'babilonio') return toBabylonian(n);
    return toMaya(n);
  };

  const familyData: Record<string, { name: string; icon: string; color: string; short: string; example: string; visual: React.ReactNode }> = {
    naturales: {
      name: 'Números naturales',
      icon: '🌱',
      color: colors.count,
      short: 'Sirven para contar: 1, 2, 3, 4...',
      example: '“Tengo 5 canicas.”',
      visual: objectRow(5, '🟢'),
    },
    cero: {
      name: 'Cero',
      icon: '⭕',
      color: colors.zero,
      short: 'Representa ausencia y también guarda posición.',
      example: 'En 105, el 0 dice: “no hay decenas”.',
      visual: (
        <div className="grid md:grid-cols-2 gap-3">
          <div className="p-4 rounded-3xl border-2 text-center" style={box(colors.zero)}>
            <div className="text-5xl">📦</div>
            <div className="font-black">Caja vacía = 0 objetos</div>
          </div>
          <div className="p-4 rounded-3xl border-2 text-center" style={box(colors.zero)}>
            <div className="text-5xl font-black">105</div>
            <div className="font-black">El 0 guarda la columna de decenas</div>
          </div>
        </div>
      ),
    },
    negativos: {
      name: 'Números negativos',
      icon: '🥶',
      color: colors.negative,
      short: 'Viven a la izquierda del cero.',
      example: '−3 puede ser una deuda o temperatura bajo cero.',
      visual: (
        <div className="p-4 rounded-3xl border-2" style={box(colors.negative)}>
          <div className="number-line-shell w-full max-w-full min-w-0 overflow-x-auto overflow-y-hidden pb-2">
            <div className="w-full min-w-[360px] max-w-full">
              <NumberLineVisual visual={{ type: 'number-line', start: -5, end: 5, current: 0, jump: -3 }} />
            </div>
          </div>
        </div>
      ),
    },
    primos: {
      name: 'Primos',
      icon: '💎',
      color: '#14b8a6',
      short: 'Tienen exactamente dos divisores: 1 y ellos mismos.',
      example: '2, 3, 5, 7, 11...',
      visual: (
        <div className="grid md:grid-cols-4 gap-2">
          {[2, 3, 5, 7].map(n => (
            <div key={n} className="p-4 rounded-3xl border-2 text-center font-black" style={box('#14b8a6')}>
              <div className="text-5xl">{n}</div>
              <div className="text-xs opacity-80">solo 1 y {n}</div>
            </div>
          ))}
        </div>
      ),
    },
    compuestos: {
      name: 'Compuestos',
      icon: '🧱',
      color: '#64748b',
      short: 'Tienen más divisores. Se pueden armar con factores.',
      example: '12 = 3 × 4 = 2 × 6',
      visual: (
        <div className="p-4 rounded-3xl border-2" style={box('#64748b')}>
          <div className="grid grid-cols-4 gap-2 max-w-sm mx-auto">
            {Array.from({ length: 12 }).map((_, i) => <div key={i} className="h-10 rounded-xl bg-slate-400 border-2 border-white/50" />)}
          </div>
          <div className="font-black text-center mt-3">12 se puede ordenar como 3 × 4</div>
        </div>
      ),
    },
    fracciones: {
      name: 'Fracciones',
      icon: '🍕',
      color: colors.fraction,
      short: 'Representan partes de un todo.',
      example: '1/2 pizza, 3/4 de una barra.',
      visual: (
        <div className="flex justify-center">
          <div className="relative w-48 h-48 rounded-full border-8 border-orange-500 bg-yellow-300 overflow-hidden">
            <div className="absolute right-0 top-0 w-24 h-48 bg-orange-400" />
            <div className="absolute inset-0 flex items-center justify-center text-5xl font-black">1/2</div>
          </div>
        </div>
      ),
    },
    racionales: {
      name: 'Racionales',
      icon: '🔁',
      color: colors.rational,
      short: 'Se pueden escribir como fracción.',
      example: '1/2, 3/4, 0.5, 0.333...',
      visual: (
        <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-4">
          {['1/2', '3/4', '0.25'].map(x => (
            <div key={x} className="p-5 rounded-3xl border-2 text-center text-4xl font-black" style={box(colors.rational)}>{x}</div>
          ))}
        </div>
      ),
    },
    irracionales: {
      name: 'Irracionales',
      icon: '🌌',
      color: colors.irrational,
      short: 'No se pueden escribir como fracción exacta.',
      example: 'π, √2...',
      visual: (
        <div className="grid md:grid-cols-2 gap-3">
          <div className="p-5 rounded-3xl border-2 text-center" style={box(colors.irrational)}>
            <div className="text-6xl font-black">π</div>
            <div className="font-black">no termina y no repite</div>
          </div>
          <div className="p-5 rounded-3xl border-2 text-center" style={box(colors.irrational)}>
            <div className="text-6xl font-black">√2</div>
            <div className="font-black">diagonal de un cuadrado</div>
          </div>
        </div>
      ),
    },
    reales: {
      name: 'Reales',
      icon: '📏',
      color: colors.real,
      short: 'Llenan la recta numérica.',
      example: 'Incluyen racionales e irracionales.',
      visual: (
        <div className="p-4 rounded-3xl border-2" style={box(colors.real)}>
          <div className="number-line-shell w-full max-w-full min-w-0 overflow-x-auto overflow-y-hidden pb-2">
            <div className="w-full min-w-[360px] max-w-full">
              <NumberLineVisual visual={{ type: 'number-line', start: -5, end: 5, current: 0, jump: 4 }} />
            </div>
          </div>
        </div>
      ),
    },
    imaginarios: {
      name: 'Imaginarios',
      icon: '🧿',
      color: colors.imaginary,
      short: 'Usan una dirección nueva: el eje vertical.',
      example: 'i es la idea base: i² = −1.',
      visual: (
        <ComplexPlaneVisual realValue={0} imaginaryValue={1} label="i" color={colors.imaginary} />
      ),
    },
    complejos: {
      name: 'Complejos',
      icon: '🧬',
      color: colors.complex,
      short: 'Combinan parte real y parte imaginaria.',
      example: '3 + 2i',
      visual: (
        <ComplexPlaneVisual realValue={3} imaginaryValue={2} label="3 + 2i" color={colors.complex} />
      ),
    },
    algebraicos: {
      name: 'Algebraicos',
      icon: '🧮',
      color: '#a855f7',
      short: 'Aparecen como solución de ecuaciones con coeficientes enteros.',
      example: '√2 resuelve x² − 2 = 0.',
      visual: (
        <div className="p-5 rounded-3xl border-2 text-center" style={box('#a855f7')}>
          <div className="text-4xl font-black">x² − 2 = 0</div>
          <div className="text-5xl mt-3">➡️ √2</div>
        </div>
      ),
    },
    trascendentes: {
      name: 'Trascendentes',
      icon: '🚀',
      color: '#f43f5e',
      short: 'No son solución de ninguna ecuación polinómica con coeficientes enteros.',
      example: 'π y e son ejemplos famosos.',
      visual: (
        <div className="grid md:grid-cols-2 gap-3">
          <div className="p-5 rounded-3xl border-2 text-center text-6xl font-black" style={box('#f43f5e')}>π</div>
          <div className="p-5 rounded-3xl border-2 text-center text-6xl font-black" style={box('#f43f5e')}>e</div>
        </div>
      ),
    },
  };

  const renderQueEsNumero = () => {
    const sub = numeroSub;
    const setSub = setNumeroSub;

    const A = Math.max(0, Math.min(24, Math.floor(numeroCountA)));
    const B = Math.max(1, Math.min(12, Math.floor(numeroCountB)));
    const G = Math.max(1, Math.min(10, Math.floor(numeroGroupSize)));

    const subModes = [
      { id: 'idea', label: 'Idea', icon: '🧠' },
      { id: 'abstraccion', label: 'No existe', icon: '👁️' },
      { id: 'simbolo', label: 'Símbolo', icon: '🔣' },
      { id: 'historia-humanidad', label: 'Historia', icon: '🏺' },
      { id: 'simbolos-mundo', label: 'Símbolos', icon: '🌍' },
      { id: 'historia1', label: 'El 1', icon: '☝️' },
      { id: 'origen', label: 'Origen', icon: '🌱' },
      { id: 'agrupar', label: 'Agrupar', icon: '📦' },
      { id: 'operaciones', label: 'Operar', icon: '⚙️' },
      { id: 'no-mezclar', label: 'No mezclar', icon: '🐱' },
      { id: 'potencias', label: 'Potencias', icon: '⬛' },
    ];

    const CountRow = ({
      count,
      icon,
      color,
      max = 28,
    }: {
      count: number;
      icon: string;
      color: string;
      max?: number;
    }) => (
      <div
        className="p-3 rounded-3xl border-2 shadow bg-surface-color/70 min-h-20 flex items-center justify-center"
        style={{ borderColor: color, background: `${color}18` }}
      >
        <div className="flex gap-2 flex-wrap justify-center text-3xl">
          {Array.from({ length: Math.min(count, max) }).map((_, i) => (
            <span key={i}>{icon}</span>
          ))}
          {count > max && <span className="text-sm font-black opacity-70 self-center">+{count - max}</span>}
          {count === 0 && <span className="text-sm font-black opacity-70 self-center">vacío</span>}
        </div>
      </div>
    );

    const ConceptCard = ({
      icon,
      title,
      text,
      color,
    }: {
      icon: string;
      title: string;
      text: string;
      color: string;
    }) => (
      <div
        className="p-4 rounded-3xl border-2 shadow hover:scale-[1.02] transition-all"
        style={box(color)}
      >
        <div className="text-4xl mb-2">{icon}</div>
        <div className="font-black text-xl leading-tight break-words">{title}</div>
        <div className="text-sm font-bold opacity-80 leading-relaxed mt-2">{text}</div>
      </div>
    );

    const SymbolCard = ({
      system,
      symbol,
      meaning,
      color,
      note,
    }: {
      system: string;
      symbol: string;
      meaning: string;
      color: string;
      note?: string;
    }) => (
      <div
        className="p-4 rounded-3xl border-2 text-center shadow hover:scale-[1.03] transition-all min-w-0"
        style={box(color)}
      >
        <div className="text-xs font-black uppercase opacity-70">{system}</div>
        <div className="text-5xl md:text-6xl font-black my-2 break-words leading-tight">{symbol}</div>
        <div className="text-sm font-black opacity-90">{meaning}</div>
        {note && <div className="text-xs font-bold opacity-75 mt-2 leading-relaxed">{note}</div>}
      </div>
    );

    const AnimalTerm = ({
      count,
      animal,
      label,
      color,
    }: {
      count: number;
      animal: string;
      label: string;
      color: string;
    }) => (
      <div className="p-4 rounded-3xl border-2 shadow text-center" style={box(color)}>
        <div className="text-xs font-black uppercase opacity-70">{label}</div>
        <CountRow count={count} icon={animal} color={color} max={18} />
        <div className="mt-2 font-black text-xl">{count} {label}</div>
      </div>
    );

    const OperationMachine = ({
      title,
      icon,
      children,
      color,
    }: {
      title: string;
      icon: string;
      children: React.ReactNode;
      color: string;
    }) => (
      <div className="p-4 rounded-3xl border-2 shadow" style={box(color)}>
        <div className="flex items-center gap-3 mb-3">
          <div className="text-4xl">{icon}</div>
          <div>
            <div className="text-xs font-black uppercase opacity-70">Máquina matemática</div>
            <div className="font-black text-xl leading-tight break-words">{title}</div>
          </div>
        </div>
        {children}
      </div>
    );

    const TimelineStep = ({
      icon,
      title,
      text,
      color,
      index,
    }: {
      icon: string;
      title: string;
      text: string;
      color: string;
      index: number;
    }) => (
      <div className="grid md:grid-cols-[90px_40px_1fr] gap-3 items-center">
        <div className="p-4 rounded-3xl border-2 shadow text-center hover:scale-105 transition-all" style={box(color)}>
          <div className="text-4xl">{icon}</div>
          <div className="font-black text-xs mt-1">Paso {index}</div>
        </div>
        <div className="hidden md:block text-3xl text-center">➡️</div>
        <div className="p-4 rounded-3xl bg-surface-color border-2 border-border-color shadow">
          <div className="font-black text-xl leading-tight break-words">{title}</div>
          <div className="text-sm font-bold opacity-80 leading-relaxed">{text}</div>
        </div>
      </div>
    );

    const romanSmall: Record<number, string> = {
      0: '—',
      1: 'I',
      2: 'II',
      3: 'III',
      4: 'IV',
      5: 'V',
      6: 'VI',
      7: 'VII',
      8: 'VIII',
      9: 'IX',
      10: 'X',
    };

    const chineseSmall = ['零', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
    const devanagariSmall = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९', '१०'];
    const arabicIndicSmall = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩', '١٠'];
    const hebrewSmall = ['—', 'א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט', 'י'];
    const greekSmall = ['—', 'α', 'β', 'γ', 'δ', 'ε', 'ϛ', 'ζ', 'η', 'θ', 'ι'];

    const mayaSmall = (n: number) => {
      if (n === 0) return '𝋠';
      const bars = Math.floor(n / 5);
      const dots = n % 5;
      return `${'●'.repeat(dots)}${bars ? ' ' + '▬'.repeat(bars) : ''}`.trim();
    };

    const numberSymbolRows = Array.from({ length: 11 }, (_, n) => ({
      n,
      decimal: String(n),
      roman: romanSmall[n],
      chinese: chineseSmall[n],
      devanagari: devanagariSmall[n],
      arabicIndic: arabicIndicSmall[n],
      hebrew: hebrewSmall[n],
      greek: greekSmall[n],
      maya: mayaSmall(n),
      binary: n.toString(2),
    }));

    return (
      <div className="space-y-4">
        <BigIdea title="¿Qué es un número?" icon="🔎" color={colors.real}>
          Un número no es solo el dibujo que escribimos. El dibujo es un símbolo. El número es la idea que ese símbolo representa: cantidad, orden, medida, ausencia, deuda, parte, posición, patrón o relación.
        </BigIdea>

        <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(105px, 1fr))' }}>
          {subModes.map(m => (
            <button
              key={m.id}
              onClick={() => setSub(m.id)}
              className={`p-3 rounded-2xl font-black text-xs transition-all ${
                sub === m.id ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color hover:scale-105'
              }`}
            >
              <span className="text-2xl block mb-1">{m.icon}</span>
              {m.label}
            </button>
          ))}
        </div>

        {sub === 'idea' && (
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
              <ConceptCard icon="🍎" title="Cantidad" color={colors.count} text="El número puede decir cuántos objetos hay." />
              <ConceptCard icon="🥇" title="Orden" color="#f59e0b" text="También puede decir posición: primero, segundo, tercero." />
              <ConceptCard icon="📏" title="Medida" color="#0ea5e9" text="Puede medir longitud, peso, tiempo, temperatura o distancia." />
              <ConceptCard icon="📦" title="Ausencia" color={colors.zero} text="El cero representa que no hay objetos o que una columna está vacía." />
              <ConceptCard icon="🧾" title="Deuda" color={colors.negative} text="Los negativos representan ir hacia atrás, deber o estar bajo cero." />
              <ConceptCard icon="🍕" title="Parte" color={colors.fraction} text="Las fracciones representan pedazos de una unidad completa." />
              <ConceptCard icon="📍" title="Posición" color={colors.real} text="Un número puede vivir en una recta o en un plano." />
              <ConceptCard icon="🌳" title="Familia" color={colors.rational} text="Un número puede pertenecer a familias: naturales, enteros, racionales, reales o complejos." />
            </div>

            <Panel>
              <div className="grid lg:grid-cols-[1fr_80px_1fr] gap-4 items-center">
                <div className="p-5 rounded-3xl border-2 text-center" style={box(colors.count)}>
                  <div className="text-6xl font-black">5</div>
                  <CountRow count={5} icon="🍎" color={colors.count} />
                  <div className="font-black mt-2">Idea: cinco objetos</div>
                </div>

                <div className="text-5xl text-center animate-pulse">≠</div>

                <div className="p-5 rounded-3xl border-2 text-center" style={box(colors.system)}>
                  <div className="text-6xl font-black">V</div>
                  <div className="text-6xl font-black">五</div>
                  <div className="font-black mt-2">Símbolos distintos para la misma idea</div>
                </div>
              </div>
            </Panel>
          </div>
        )}

        {sub === 'abstraccion' && (
          <div className="space-y-4">
            <BigIdea title="El número no es una cosa que puedas agarrar" icon="👁️" color="#8b5cf6">
              Puedes agarrar una manzana, pero no puedes agarrar el “cinco”. El cinco es una idea que aparece cuando tu mente reconoce un patrón común entre cinco manzanas, cinco piedras, cinco sonidos o cinco pasos.
            </BigIdea>

            <div className="grid lg:grid-cols-[1fr_80px_1fr_80px_1fr] gap-4 items-center">
              <div className="p-4 rounded-3xl border-2 shadow text-center" style={box(colors.count)}>
                <CountRow count={5} icon="🍎" color={colors.count} />
                <div className="font-black mt-2">5 manzanas</div>
              </div>
              <div className="text-5xl text-center">➡️</div>
              <div className="p-4 rounded-3xl border-2 shadow text-center" style={box('#64748b')}>
                <CountRow count={5} icon="🪨" color="#64748b" />
                <div className="font-black mt-2">5 piedras</div>
              </div>
              <div className="text-5xl text-center">➡️</div>
              <div className="p-4 rounded-3xl border-2 shadow text-center" style={box('#8b5cf6')}>
                <div className="text-7xl font-black">5</div>
                <div className="font-black mt-2">la idea común</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-4">
              <ConceptCard icon="👂" title="Cinco sonidos" color="#0ea5e9" text="👏 👏 👏 👏 👏 también puede representar cinco." />
              <ConceptCard icon="👣" title="Cinco pasos" color="#f59e0b" text="El mismo número puede contar acciones, no solo objetos." />
              <ConceptCard icon="🎨" title="Cinco colores" color="#ec4899" text="El número se separa del objeto. Por eso puede usarse en muchas situaciones." />
            </div>
          </div>
        )}

        {sub === 'simbolo' && (
          <div className="space-y-4">
            <BigIdea title="Símbolo no es lo mismo que número" icon="🔣" color={colors.system}>
              El símbolo es la forma escrita. La idea es lo que significa. “5”, “V”, “五”, “●●●●●” pueden apuntar a la misma cantidad, aunque se vean diferentes.
            </BigIdea>

            <div className="grid md:grid-cols-[1fr_80px_1fr] gap-4 items-center">
              <div className="p-5 rounded-3xl border-2 shadow text-center" style={box(colors.count)}>
                <div className="text-xs font-black uppercase opacity-70">Idea</div>
                <CountRow count={5} icon="🟢" color={colors.count} />
                <div className="font-black text-xl mt-3">cinco unidades</div>
              </div>

              <div className="text-5xl text-center animate-pulse">➡️</div>

              <div className="p-5 rounded-3xl border-2 shadow text-center" style={box(colors.system)}>
                <div className="text-xs font-black uppercase opacity-70">Símbolo</div>
                <div className="text-7xl font-black">5</div>
                <div className="font-black text-xl">una forma de escribirlo</div>
              </div>
            </div>

            <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(145px, 1fr))' }}>
              <SymbolCard system="Decimal actual" symbol="5" meaning="cinco" color={colors.system} />
              <SymbolCard system="Romano" symbol="V" meaning="cinco" color="#94a3b8" />
              <SymbolCard system="Chino" symbol="五" meaning="cinco" color="#dc2626" />
              <SymbolCard system="Maya" symbol="▬" meaning="una barra vale cinco" color="#84cc16" />
              <SymbolCard system="Dedos" symbol="🖐️" meaning="cinco dedos" color={colors.count} />
              <SymbolCard system="Objetos" symbol="●●●●●" meaning="cinco marcas" color="#64748b" />
            </div>
          </div>
        )}

        {sub === 'historia-humanidad' && (
          <div className="space-y-4">
            <BigIdea title="Cómo pasamos de objetos a números" icon="🏺" color={colors.history}>
              La historia de los números no empieza con cuadernos. Empieza con necesidades: recordar, comparar, repartir, medir, comerciar, construir, observar el cielo y organizar la vida.
            </BigIdea>

            <div className="grid gap-4">
              {[
                ['👁️', 'Distinguir objetos', 'La mente separa una cosa del fondo: una fruta, una piedra, una oveja. Ahí nace la idea de unidad.', colors.count],
                ['✋', 'Contar con el cuerpo', 'Dedos, manos, pasos y partes del cuerpo ayudan a contar sin escribir.', '#0ea5e9'],
                ['🪨', 'Fichas y piedras', 'Un objeto pequeño puede representar otro objeto. Una piedra puede representar una oveja.', '#64748b'],
                ['|', 'Marcas repetidas', 'Una raya, otra raya, otra raya. Las marcas permiten recordar cantidades cuando los objetos ya no están enfrente.', '#f59e0b'],
                ['📦', 'Agrupar', 'Cuando hay muchas marcas, contar una por una se vuelve lento. Aparecen grupos de 5, 10, 20 o 60.', colors.system],
                ['🏺', 'Tablillas y registros', 'Con agricultura, comercio e impuestos, las sociedades necesitan registrar cantidades de forma estable.', colors.history],
                ['𓂀', 'Símbolos por valor', 'Algunos sistemas crean símbolos para uno, diez, cien, mil. Ya no hace falta repetir tanto.', '#eab308'],
                ['🏛️', 'Letras como números', 'En algunos sistemas, letras también representan cantidades, como en griego o hebreo.', '#a855f7'],
                ['🪷', 'Posición y cero', 'La gran revolución es que el lugar del símbolo cambia su valor, y el cero puede guardar una columna vacía.', '#ec4899'],
                ['💻', 'Máquinas y binario', 'Hoy también usamos sistemas como binario y hexadecimal para computadoras.', '#14b8a6'],
              ].map(([icon, title, text, color], i) => (
                <TimelineStep key={String(title)} icon={String(icon)} title={String(title)} text={String(text)} color={String(color)} index={i + 1} />
              ))}
            </div>
          </div>
        )}

        {sub === 'simbolos-mundo' && (
          <div className="space-y-4">
            <BigIdea title="Símbolos distintos para 0 al 10" icon="🌍" color={colors.system}>
              La misma cantidad puede escribirse con símbolos diferentes. Eso demuestra que el número es la idea, y el símbolo es una herramienta cultural para escribirla.
            </BigIdea>

            <div className="overflow-x-auto rounded-3xl border-2 border-border-color shadow">
              <table className="w-full min-w-[980px] text-center bg-surface-color">
                <thead>
                  <tr className="bg-[var(--primary-color)]/15">
                    <th className="p-3 font-black">Idea</th>
                    <th className="p-3 font-black">Decimal</th>
                    <th className="p-3 font-black">Romano</th>
                    <th className="p-3 font-black">Chino</th>
                    <th className="p-3 font-black">Devanagari</th>
                    <th className="p-3 font-black">Arábigo oriental</th>
                    <th className="p-3 font-black">Hebreo</th>
                    <th className="p-3 font-black">Griego</th>
                    <th className="p-3 font-black">Maya</th>
                    <th className="p-3 font-black">Binario</th>
                  </tr>
                </thead>
                <tbody>
                  {numberSymbolRows.map(row => (
                    <tr key={row.n} className="border-t border-border-color">
                      <td className="p-3 font-black">{row.n}</td>
                      <td className="p-3 text-2xl font-black">{row.decimal}</td>
                      <td className="p-3 text-2xl font-black">{row.roman}</td>
                      <td className="p-3 text-2xl font-black">{row.chinese}</td>
                      <td className="p-3 text-2xl font-black">{row.devanagari}</td>
                      <td className="p-3 text-2xl font-black">{row.arabicIndic}</td>
                      <td className="p-3 text-2xl font-black" dir="rtl">{row.hebrew}</td>
                      <td className="p-3 text-2xl font-black">{row.greek}</td>
                      <td className="p-3 text-2xl font-black">{row.maya}</td>
                      <td className="p-3 text-2xl font-black">{row.binary}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-4">
              <ConceptCard icon="🔟" title="Decimal" color={colors.system} text="Usa diez símbolos y posición. El lugar cambia el valor." />
              <ConceptCard icon="🏛️" title="Romano" color="#94a3b8" text="No usa cero posicional. Funciona con letras y reglas de suma/resta." />
              <ConceptCard icon="🌽" title="Maya" color="#84cc16" text="Usa puntos, barras y un símbolo de cero. Piensa por capas." />
            </div>
          </div>
        )}

        {sub === 'historia1' && (
          <div className="space-y-4">
            <BigIdea title="Historia expandida del 1" icon="☝️" color={colors.count}>
              El 1 aparece cuando una mente separa una cosa del resto del mundo: una piedra, una oveja, una marca, una persona, un paso. Antes del símbolo, ya existía la idea de unidad.
            </BigIdea>

            <div className="grid gap-4">
              {[
                ['👀', 'Reconocer una cosa', 'Primero se distingue un objeto: esta piedra, esta fruta, esta oveja.', colors.count],
                ['✋', 'El cuerpo como herramienta', 'Un dedo levantado puede representar una unidad sin escribir nada.', '#0ea5e9'],
                ['🪨', 'Piedras y fichas', 'Una piedra podía representar una oveja. Si había diez piedras, se esperaban diez ovejas.', '#64748b'],
                ['|', 'Marcas', 'Una raya en hueso, madera o arcilla podía recordar una unidad contada.', '#f59e0b'],
                ['📦', 'Agrupación', 'Cuando había muchas unidades, surgió la necesidad de agrupar: cinco, diez, veinte, sesenta.', colors.system],
                ['🔣', 'Símbolos', 'Después se inventaron signos para no tener que dibujar cada objeto.', colors.rational],
                ['🏛️', 'Sistema', 'Un símbolo aislado no basta. Se necesitan reglas para escribir cantidades grandes.', colors.real],
              ].map(([icon, title, text, color], i) => (
                <TimelineStep key={String(title)} icon={String(icon)} title={String(title)} text={String(text)} color={String(color)} index={i + 1} />
              ))}
            </div>
          </div>
        )}

        {sub === 'origen' && (
          <div className="space-y-4">
            <BigIdea title="Origen de los demás números" icon="🌱" color={colors.count}>
              Los primeros números pueden verse como repeticiones de una unidad. Después aparecen agrupaciones: dos, tres, cinco, diez, veinte. Agrupar evita contar una por una cantidades enormes.
            </BigIdea>

            <Panel>
              <div className="font-black text-xl mb-3 text-center">Construir números con unidades</div>
              <div className="grid md:grid-cols-5 gap-3">
                {[1, 2, 3, 4, 5].map(k => (
                  <div key={k} className="p-4 rounded-3xl border-2 text-center" style={box(colors.count)}>
                    <CountRow count={k} icon="🟢" color={colors.count} max={10} />
                    <div className="font-black mt-2">{Array.from({ length: k }).map(() => '1').join(' + ')} = {k}</div>
                  </div>
                ))}
              </div>
            </Panel>

            <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-4">
              <ConceptCard icon="✌️" title="2" color="#0ea5e9" text="Puede nacer como pareja: dos ojos, dos manos, dos pies." />
              <ConceptCard icon="🖐️" title="5" color="#f59e0b" text="Puede nacer del cuerpo: cinco dedos en una mano." />
              <ConceptCard icon="🙌" title="10" color="#22c55e" text="Puede nacer de dos manos completas: diez dedos." />
            </div>

            <Panel>
              <div className="font-black text-xl mb-3 text-center">Agrupar cambia la lectura</div>
              <div className="grid md:grid-cols-[1fr_70px_1fr] gap-3 items-center">
                <div>
                  <div className="font-black mb-2 text-center">20 objetos sueltos</div>
                  <CountRow count={20} icon="🟣" color={colors.rational} max={20} />
                </div>
                <div className="text-5xl text-center">➡️</div>
                <div>
                  <div className="font-black mb-2 text-center">4 grupos de 5</div>
                  <div className="grid grid-cols-2 gap-2">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <CountRow key={i} count={5} icon="🟣" color={colors.rational} max={5} />
                    ))}
                  </div>
                </div>
              </div>
            </Panel>
          </div>
        )}

        {sub === 'agrupar' && (
          <div className="space-y-4">
            <BigIdea title="Agrupar es pensar más rápido" icon="📦" color={colors.system}>
              Agrupar significa juntar unidades en paquetes. Un paquete puede valer 5, 10, 20, 60 o lo que el sistema decida. Los sistemas numéricos nacen de símbolos más reglas de agrupación.
            </BigIdea>

            <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-4">
              <NumberInput label="Cantidad" value={numeroCountA} setValue={(v) => setNumeroCountA(Math.max(0, Math.min(40, Math.floor(v))))} min={0} max={40} color="#22c55e" />
              <NumberInput label="Tamaño del grupo" value={numeroGroupSize} setValue={(v) => setNumeroGroupSize(Math.max(1, Math.min(10, Math.floor(v))))} min={1} max={10} color="#f59e0b" />
              <div className="p-4 rounded-3xl border-2 shadow text-center" style={box(colors.system)}>
                <div className="text-xs font-black uppercase opacity-70">Lectura</div>
                <div className="text-3xl font-black">{Math.floor(A / G)} grupos</div>
                <div className="font-black">sobran {A % G}</div>
              </div>
            </div>

            <Panel>
              <div className="font-black text-xl mb-3 text-center">Agrupación visual</div>
              <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))' }}>
                {Array.from({ length: Math.floor(A / G) }).map((_, i) => (
                  <div key={i} className="p-3 rounded-3xl border-2 bg-surface-color shadow" style={{ borderColor: colors.system }}>
                    <div className="text-xs font-black opacity-70 text-center mb-2">grupo {i + 1}</div>
                    <CountRow count={G} icon="🟡" color={colors.system} max={10} />
                  </div>
                ))}
                {A % G > 0 && (
                  <div className="p-3 rounded-3xl border-2 bg-surface-color shadow" style={{ borderColor: colors.fraction }}>
                    <div className="text-xs font-black opacity-70 text-center mb-2">sobran</div>
                    <CountRow count={A % G} icon="🟠" color={colors.fraction} max={10} />
                  </div>
                )}
              </div>
            </Panel>
          </div>
        )}

        {sub === 'operaciones' && (
          <div className="space-y-4">
            <BigIdea title="Operar es hacer una acción" icon="⚙️" color={colors.rational}>
              Una operación toma números, aplica una regla y produce otro número. Pero la regla tiene significado: juntar, quitar, repetir grupos, repartir, elevar o buscar una raíz.
            </BigIdea>

            <div className="grid md:grid-cols-2 gap-3">
              <NumberInput label="Cantidad A" value={numeroCountA} setValue={(v) => setNumeroCountA(Math.max(0, Math.min(24, Math.floor(v))))} min={0} max={24} color="#22c55e" />
              <NumberInput label="Cantidad B" value={numeroCountB} setValue={(v) => setNumeroCountB(Math.max(1, Math.min(12, Math.floor(v))))} min={1} max={12} color="#0ea5e9" />
            </div>

            <div className="grid lg:grid-cols-2 gap-4">
              <OperationMachine title="Suma / adición" icon="➕" color={colors.count}>
                <div className="text-sm font-bold opacity-80 mb-3">Sumar es juntar cantidades del mismo tipo.</div>
                <div className="grid md:grid-cols-[1fr_50px_1fr_50px_1fr] gap-2 items-center">
                  <CountRow count={A} icon="🍎" color={colors.count} max={12} />
                  <div className="text-3xl text-center">+</div>
                  <CountRow count={B} icon="🍎" color={colors.count} max={12} />
                  <div className="text-3xl text-center">=</div>
                  <CountRow count={A + B} icon="🍎" color={colors.count} max={24} />
                </div>
                <div className="mt-3 text-center font-black">{A} + {B} = {A + B}</div>
              </OperationMachine>

              <OperationMachine title="Resta / sustracción" icon="➖" color={colors.negative}>
                <div className="text-sm font-bold opacity-80 mb-3">Restar es quitar, comparar o retroceder.</div>
                <div className="number-line-shell w-full max-w-full min-w-0 overflow-x-auto overflow-y-hidden pb-2">
                  <div className="w-full min-w-[360px] max-w-full">
                    <NumberLineVisual visual={{ type: 'number-line', start: Math.min(0, A - B), end: Math.max(10, A + 2), current: A, jump: -B }} />
                  </div>
                </div>
                <div className="mt-3 text-center font-black">{A} − {B} = {A - B}</div>
              </OperationMachine>

              <OperationMachine title="Producto / multiplicación" icon="✖️" color="#8b5cf6">
                <div className="text-sm font-bold opacity-80 mb-3">Multiplicar es repetir grupos iguales.</div>
                <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(95px, 1fr))' }}>
                  {Array.from({ length: Math.min(A, 10) }).map((_, i) => (
                    <div key={i} className="p-2 rounded-2xl bg-surface-color border-2 border-border-color text-center">
                      <div className="text-xs font-black opacity-70">grupo {i + 1}</div>
                      <CountRow count={B} icon="🟣" color="#8b5cf6" max={8} />
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-center font-black">{A} grupos de {B} = {A * B}</div>
              </OperationMachine>

              <OperationMachine title="Cociente / división" icon="➗" color="#0ea5e9">
                <div className="text-sm font-bold opacity-80 mb-3">Dividir es repartir en grupos o preguntar cuántas veces cabe.</div>
                <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(95px, 1fr))' }}>
                  {Array.from({ length: Math.min(B, 8) }).map((_, i) => (
                    <div key={i} className="p-2 rounded-2xl bg-surface-color border-2 border-border-color text-center">
                      <div className="text-xs font-black opacity-70">caja {i + 1}</div>
                      <CountRow count={Math.floor(A / B)} icon="🟡" color="#0ea5e9" max={8} />
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-center font-black">{A} ÷ {B} = {Math.floor(A / B)} y sobran {A % B}</div>
              </OperationMachine>
            </div>
          </div>
        )}

        {sub === 'no-mezclar' && (
          <div className="space-y-4">
            <BigIdea title="No todo se puede juntar como si fuera igual" icon="🐱" color="#f97316">
              Puedes contar objetos distintos dentro de una categoría más grande, pero no debes cambiarles la etiqueta. 5 gatos + 7 perros son 12 animales, pero no son 12 gatos ni 12 perros.
            </BigIdea>

            <div className="grid md:grid-cols-[1fr_60px_1fr_60px_1fr] gap-3 items-center">
              <AnimalTerm count={5} animal="🐱" label="gatos" color="#f59e0b" />
              <div className="text-4xl text-center">+</div>
              <AnimalTerm count={7} animal="🐶" label="perros" color="#0ea5e9" />
              <div className="text-4xl text-center">=</div>
              <div className="p-4 rounded-3xl border-2 shadow text-center" style={box("#22c55e")}>
                <div className="text-xs font-black uppercase opacity-70">categoría común</div>
                <CountRow count={12} icon="🐾" color="#22c55e" max={18} />
                <div className="mt-2 font-black text-xl">12 animales</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <div className="p-5 rounded-3xl border-2 shadow" style={box("#ef4444")}>
                <div className="font-black text-xl">Incorrecto</div>
                <div className="text-3xl font-black mt-2">5 🐱 + 7 🐶 = 12 🐱</div>
                <div className="text-sm font-bold opacity-80 mt-2">No puedes convertir perros en gatos solo por sumar.</div>
              </div>

              <div className="p-5 rounded-3xl border-2 shadow" style={box("#22c55e")}>
                <div className="font-black text-xl">Correcto</div>
                <div className="text-3xl font-black mt-2">5 🐱 + 7 🐶 = 5 🐱 y 7 🐶</div>
                <div className="text-sm font-bold opacity-80 mt-2">O, si cambias la etiqueta común: 12 animales.</div>
              </div>
            </div>

            <Panel>
              <div className="font-black text-xl mb-3 text-center">Con figuras pasa igual</div>
              <div className="grid md:grid-cols-[1fr_60px_1fr_60px_1fr] gap-3 items-center">
                <AnimalTerm count={5} animal="🔴" label="círculos rojos" color="#ef4444" />
                <div className="text-4xl text-center">+</div>
                <AnimalTerm count={7} animal="🔷" label="rombos azules" color="#0ea5e9" />
                <div className="text-4xl text-center">=</div>
                <div className="p-4 rounded-3xl border-2 shadow text-center" style={box("#8b5cf6")}>
                  <div className="text-xs font-black uppercase opacity-70">figuras</div>
                  <div className="text-3xl">🔴🔴🔴🔴🔴 🔷🔷🔷🔷🔷🔷🔷</div>
                  <div className="mt-2 font-black">12 figuras en total</div>
                </div>
              </div>
            </Panel>
          </div>
        )}

        {sub === 'potencias' && (
          <div className="space-y-4">
            <BigIdea title="Potencia, exponente y raíz" icon="⬛" color="#8b5cf6">
              Una potencia repite multiplicación. Un cuadrado repite dos direcciones: lado por lado. Un cubo agrega una tercera dirección: largo, ancho y alto. La raíz hace la pregunta inversa.
            </BigIdea>

            <div className="grid md:grid-cols-2 gap-3">
              <NumberInput label="Lado / base" value={numeroCountB} setValue={(v) => setNumeroCountB(Math.max(1, Math.min(8, Math.floor(v))))} min={1} max={8} color="#8b5cf6" />
              <div className="p-4 rounded-3xl border-2 shadow text-center" style={box("#8b5cf6")}>
                <div className="text-xs font-black uppercase opacity-70">Base visual</div>
                <div className="text-5xl font-black">{B}</div>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-4">
              <OperationMachine title="Cuadrado: lado × lado" icon="⬛" color="#8b5cf6">
                <div className="text-sm font-bold opacity-80 mb-3">{B}<sup>2</sup> significa {B} × {B}.</div>
                <div className="grid gap-1 mx-auto" style={{ gridTemplateColumns: `repeat(${B}, 24px)`, width: `${B * 28}px` }}>
                  {Array.from({ length: B * B }).map((_, i) => (
                    <div key={i} className="w-6 h-6 rounded-md bg-violet-400 border border-white shadow" />
                  ))}
                </div>
                <div className="mt-3 text-center font-black text-2xl">{B}<sup>2</sup> = {B * B}</div>
              </OperationMachine>

              <OperationMachine title="Raíz cuadrada: buscar el lado" icon="√" color="#ec4899">
                <div className="text-sm font-bold opacity-80 mb-3">Si el área es {B * B}, el lado es {B}.</div>
                <div className="grid gap-1 mx-auto" style={{ gridTemplateColumns: `repeat(${B}, 24px)`, width: `${B * 28}px` }}>
                  {Array.from({ length: B * B }).map((_, i) => (
                    <div key={i} className="w-6 h-6 rounded-md bg-pink-400 border border-white shadow" />
                  ))}
                </div>
                <div className="mt-3 text-center font-black text-2xl">√{B * B} = {B}</div>
              </OperationMachine>

              <OperationMachine title="Cubo: largo × ancho × alto" icon="🧊" color="#06b6d4">
                <div className="text-sm font-bold opacity-80 mb-3">{B}<sup>3</sup> significa {B} × {B} × {B}.</div>
                <div className="flex flex-wrap justify-center gap-3">
                  {Array.from({ length: Math.min(B, 5) }).map((_, layer) => (
                    <div key={layer} className="p-2 rounded-2xl bg-surface-color border-2 border-border-color">
                      <div className="text-xs font-black opacity-70 text-center mb-1">capa {layer + 1}</div>
                      <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${Math.min(B, 5)}, 16px)` }}>
                        {Array.from({ length: Math.min(B, 5) * Math.min(B, 5) }).map((_, i) => (
                          <div key={i} className="w-4 h-4 rounded bg-cyan-400 border border-white" />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 text-center font-black text-2xl">{B}<sup>3</sup> = {B * B * B}</div>
              </OperationMachine>

              <OperationMachine title="Exponente como instrucciones" icon="🔁" color="#f59e0b">
                <div className="text-sm font-bold opacity-80 mb-3">El exponente dice cuántas veces se repite la base como factor.</div>
                <div className="p-4 rounded-3xl bg-surface-color/80 border-2 border-border-color text-center">
                  <div className="text-4xl font-black">{B}<sup>4</sup></div>
                  <div className="mt-2 font-black">{B} × {B} × {B} × {B} = {B * B * B * B}</div>
                </div>
              </OperationMachine>
            </div>
          </div>
        )}
      </div>
    );
  };





  const renderMapa = () => (
    <div className="space-y-4">
      <BigIdea title="¿Qué es un número?" icon="🔢" color={colors.real}>
        Un número no es solo una figura escrita. Es una idea que puede contar objetos, indicar orden, medir, mostrar ausencia, representar deuda, partir una unidad, ubicar un punto en una recta o vivir en un plano más grande.
      </BigIdea>

      <div className="grid md:grid-cols-2 2xl:grid-cols-4 gap-4">
        {[
          { title: 'Cantidad', icon: '🍎', text: '¿Cuántos hay?', color: colors.count },
          { title: 'Orden', icon: '🥇', text: 'primero, segundo, tercero', color: '#f59e0b' },
          { title: 'Medida', icon: '📏', text: 'largo, peso, tiempo', color: '#0ea5e9' },
          { title: 'Ausencia', icon: '📦', text: 'cero: no hay objetos', color: colors.zero },
          { title: 'Deuda', icon: '🧾', text: 'negativos: debo o bajo de cero', color: colors.negative },
          { title: 'Parte', icon: '🍕', text: 'fracciones: pedazos de un todo', color: colors.fraction },
          { title: 'Dirección', icon: '📍', text: 'recta y plano', color: colors.imaginary },
          { title: 'Familia', icon: '🌳', text: 'un número puede pertenecer a conjuntos', color: colors.rational },
        ].map(card => (
          <div key={card.title} className="p-4 rounded-3xl border-2 shadow hover:scale-[1.03] transition-all text-center" style={box(card.color)}>
            <div className="text-5xl mb-2">{card.icon}</div>
            <div className="font-black text-lg">{card.title}</div>
            <div className="text-sm font-bold opacity-80">{card.text}</div>
          </div>
        ))}
      </div>

      <Panel>
        <div className="font-black text-xl mb-3 text-center">Ruta del módulo Inicio</div>
        <div className="grid md:grid-cols-[1fr_40px_1fr_40px_1fr] gap-3 items-center">
          <div className="p-4 rounded-3xl border-2 text-center" style={box(colors.history)}>
            <div className="text-4xl">🏺</div>
            <div className="font-black">Historia</div>
            <div className="text-xs font-bold opacity-75">humanos → símbolos</div>
          </div>
          <Arrow />
          <div className="p-4 rounded-3xl border-2 text-center" style={box(colors.rational)}>
            <div className="text-4xl">🌳</div>
            <div className="font-black">Familias</div>
            <div className="text-xs font-bold opacity-75">naturales → complejos</div>
          </div>
          <Arrow />
          <div className="p-4 rounded-3xl border-2 text-center" style={box(colors.system)}>
            <div className="text-4xl">⚙️</div>
            <div className="font-black">Acciones</div>
            <div className="text-xs font-bold opacity-75">operar y escribir números</div>
          </div>
        </div>
      </Panel>
    </div>
  );

  const renderHistoria = () => {
    const sub = historiaSub;
    const setSub = setHistoriaSub;

    const tabs = [
      { id: 'mapa', label: 'Mapa', icon: '🧭' },
      { id: 'primeros', label: 'Primeros', icon: '✋' },
      { id: 'marcas', label: 'Marcas', icon: '|' },
      { id: 'nudos', label: 'Nudos', icon: '🧶' },
      { id: 'sumerios', label: 'Sumerios', icon: '🔻' },
      { id: 'babilonios', label: 'Babilonios', icon: '🏺' },
      { id: 'egipcios', label: 'Egipcios', icon: '𓂀' },
      { id: 'fenicios', label: 'Fenicios', icon: '⛵' },
      { id: 'hebreos', label: 'Hebreos', icon: '✡️' },
      { id: 'griegos', label: 'Griegos', icon: '🏛️' },
      { id: 'romanos', label: 'Romanos', icon: '🏟️' },
      { id: 'india', label: 'India', icon: '🪷' },
      { id: 'arabes', label: 'Árabes', icon: '🌙' },
      { id: 'china', label: 'China', icon: '🐉' },
      { id: 'mayas', label: 'Mayas', icon: '🌽' },
      { id: 'instrumentos', label: 'Instrumentos', icon: '🧮' },
      { id: 'comercio', label: 'Comercio', icon: '⚖️' },
      { id: 'astronomia', label: 'Calendario', icon: '🌙' },
      { id: 'cero', label: 'Viaje del 0', icon: '⭕' },
      { id: 'moderno', label: 'Moderno', icon: '🔟' },
      { id: 'computadoras', label: 'Cómputo', icon: '💻' },
      { id: 'comparar', label: 'Comparar', icon: '📊' },
    ];

    const HistCard = ({
      icon,
      title,
      text,
      color,
      children,
    }: {
      icon: string;
      title: string;
      text: string;
      color: string;
      children?: React.ReactNode;
    }) => (
      <div className="p-4 rounded-3xl border-2 shadow hover:scale-[1.01] transition-all" style={box(color)}>
        <div className="flex items-start gap-3">
          <div className="text-4xl shrink-0">{icon}</div>
          <div className="min-w-0">
            <div className="font-black text-xl leading-tight break-words">{title}</div>
            <div className="text-sm font-bold opacity-85 leading-relaxed mt-1">{text}</div>
            {children && <div className="mt-3">{children}</div>}
          </div>
        </div>
      </div>
    );

    const Step = ({
      n,
      icon,
      title,
      text,
      color,
    }: {
      n: number;
      icon: string;
      title: string;
      text: string;
      color: string;
    }) => (
      <div className="grid md:grid-cols-[90px_40px_1fr] gap-3 items-center">
        <div className="p-4 rounded-3xl border-2 shadow text-center hover:scale-105 transition-all" style={box(color)}>
          <div className="text-4xl">{icon}</div>
          <div className="font-black text-xs mt-1">Paso {n}</div>
        </div>
        <div className="hidden md:block text-3xl text-center">➡️</div>
        <div className="p-4 rounded-3xl bg-surface-color border-2 border-border-color shadow">
          <div className="font-black text-xl leading-tight break-words">{title}</div>
          <div className="text-sm font-bold opacity-80 leading-relaxed">{text}</div>
        </div>
      </div>
    );

    const SymbolStrip = ({
      title,
      color,
      items,
    }: {
      title: string;
      color: string;
      items: { symbol: string; label: string; note?: string }[];
    }) => (
      <div className="p-4 rounded-3xl border-2 shadow" style={box(color)}>
        <div className="font-black text-xl mb-3">{title}</div>
        <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(92px, 1fr))' }}>
          {items.map((item, i) => (
            <div key={i} className="p-3 rounded-2xl bg-surface-color/80 border-2 border-border-color text-center min-w-0">
              <div className="text-4xl font-black break-words leading-tight">{item.symbol}</div>
              <div className="text-xs font-black opacity-75 mt-1">{item.label}</div>
              {item.note && <div className="text-[10px] font-bold opacity-70 mt-1">{item.note}</div>}
            </div>
          ))}
        </div>
      </div>
    );

    const CompareTable = () => {
      const rows = [
        { idea: 'cero', decimal: '0', romano: '—', egipcio: '—', hebreo: '—', griego: '—', chino: '零', maya: '𝋠', binario: '0' },
        { idea: 'uno', decimal: '1', romano: 'I', egipcio: '|', hebreo: 'א', griego: 'α', chino: '一', maya: '●', binario: '1' },
        { idea: 'dos', decimal: '2', romano: 'II', egipcio: '||', hebreo: 'ב', griego: 'β', chino: '二', maya: '●●', binario: '10' },
        { idea: 'cinco', decimal: '5', romano: 'V', egipcio: '|||||', hebreo: 'ה', griego: 'ε', chino: '五', maya: '▬', binario: '101' },
        { idea: 'diez', decimal: '10', romano: 'X', egipcio: '∩', hebreo: 'י', griego: 'ι', chino: '十', maya: '▬▬', binario: '1010' },
      ];

      return (
        <div className="overflow-x-auto rounded-3xl border-2 border-border-color shadow">
          <table className="w-full min-w-[850px] text-center bg-surface-color">
            <thead>
              <tr className="bg-[var(--primary-color)]/15">
                <th className="p-3 font-black">Idea</th>
                <th className="p-3 font-black">Decimal</th>
                <th className="p-3 font-black">Romano</th>
                <th className="p-3 font-black">Egipcio</th>
                <th className="p-3 font-black">Hebreo</th>
                <th className="p-3 font-black">Griego</th>
                <th className="p-3 font-black">Chino</th>
                <th className="p-3 font-black">Maya</th>
                <th className="p-3 font-black">Binario</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(row => (
                <tr key={row.idea} className="border-t border-border-color">
                  <td className="p-3 font-black">{row.idea}</td>
                  <td className="p-3 text-2xl font-black">{row.decimal}</td>
                  <td className="p-3 text-2xl font-black">{row.romano}</td>
                  <td className="p-3 text-2xl font-black">{row.egipcio}</td>
                  <td className="p-3 text-2xl font-black" dir="rtl">{row.hebreo}</td>
                  <td className="p-3 text-2xl font-black">{row.griego}</td>
                  <td className="p-3 text-2xl font-black">{row.chino}</td>
                  <td className="p-3 text-2xl font-black">{row.maya}</td>
                  <td className="p-3 text-2xl font-black">{row.binario}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    };

    const renderMapa = () => (
      <div className="space-y-4">
        <BigIdea title="Historia de los números" icon="🏺" color={colors.history}>
          La historia de los números no es una línea recta. Es una red: muchas culturas resolvieron problemas parecidos con herramientas distintas.
        </BigIdea>

        <div className="grid gap-4">
          {[
            ['✋', 'Cuerpo', 'Dedos, manos, pasos y gestos ayudaron a contar antes de escribir.', '#22c55e'],
            ['🪨', 'Objetos', 'Piedras, fichas, huesos o nudos podían representar cantidades.', '#64748b'],
            ['|', 'Marcas', 'Una raya podía significar una cosa. Muchas marcas significaban muchas cosas.', '#f59e0b'],
            ['📦', 'Agrupación', 'Cuando había demasiadas marcas, nació la idea de agrupar: 5, 10, 20, 60.', '#84cc16'],
            ['🔣', 'Símbolos', 'Los símbolos ahorran esfuerzo: ya no dibujas cada objeto.', '#8b5cf6'],
            ['🏛️', 'Sistemas', 'Un sistema numérico combina símbolos, reglas, agrupación y a veces posición.', '#0ea5e9'],
            ['⭕', 'Cero', 'El cero como ausencia y como guardián de posición cambió profundamente la escritura de números.', '#38bdf8'],
            ['💻', 'Computación', 'Hoy usamos decimal, binario, hexadecimal y más según la necesidad.', '#14b8a6'],
          ].map(([icon, title, text, color], i) => (
            <Step key={String(title)} n={i + 1} icon={String(icon)} title={String(title)} text={String(text)} color={String(color)} />
          ))}
        </div>
      </div>
    );

    const renderPrimeros = () => (
      <div className="space-y-4">
        <BigIdea title="Primeros humanos: antes de escribir" icon="✋" color="#22c55e">
          Antes de tener numerales, la humanidad ya tenía intuiciones numéricas: más, menos, uno, dos, muchos, falta, sobra.
        </BigIdea>

        <div className="grid md:grid-cols-2 gap-4">
          <HistCard icon="👀" title="Mirar y comparar" color="#22c55e" text="Si un grupo tiene más frutos que otro, no necesitas escribir para notarlo." />
          <HistCard icon="✋" title="Dedos" color="#0ea5e9" text="Los dedos sirven como calculadora corporal: se pueden mostrar, doblar, comparar y recordar." />
          <HistCard icon="👣" title="Pasos" color="#f59e0b" text="Caminar también mide. Contar pasos permite estimar distancia." />
          <HistCard icon="🐑" title="Animales" color="#84cc16" text="La necesidad de cuidar rebaños empuja a recordar cuántos animales entran y salen." />
        </div>

        <Panel>
          <div className="font-black text-xl mb-3 text-center">La idea aparece antes del símbolo</div>
          <div className="grid md:grid-cols-[1fr_60px_1fr_60px_1fr] gap-3 items-center">
            <div className="p-4 rounded-3xl border-2 text-center" style={box('#22c55e')}>
              <div className="text-5xl">🐑🐑🐑🐑🐑</div>
              <div className="font-black mt-2">5 ovejas reales</div>
            </div>
            <div className="text-4xl text-center">➡️</div>
            <div className="p-4 rounded-3xl border-2 text-center" style={box('#64748b')}>
              <div className="text-5xl">🪨🪨🪨🪨🪨</div>
              <div className="font-black mt-2">5 piedras que las representan</div>
            </div>
            <div className="text-4xl text-center">➡️</div>
            <div className="p-4 rounded-3xl border-2 text-center" style={box('#8b5cf6')}>
              <div className="text-7xl font-black">5</div>
              <div className="font-black mt-2">un símbolo para la idea</div>
            </div>
          </div>
        </Panel>
      </div>
    );

    const renderMarcas = () => (
      <div className="space-y-4">
        <BigIdea title="Marcas: la memoria de la cantidad" icon="|" color="#f59e0b">
          Una marca es una memoria. En vez de cargar cinco objetos, puedes hacer cinco rayas. Es simple, pero muy poderoso.
        </BigIdea>

        <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-4">
          <HistCard icon="|" title="Una raya" color="#f59e0b" text="Una raya puede representar una unidad." />
          <HistCard icon="|||||" title="Cinco rayas" color="#f59e0b" text="Muchas marcas permiten registrar cantidades mayores." />
          <HistCard icon="𝍸" title="Agrupar marcas" color="#84cc16" text="Agrupar cada cinco o cada diez hace que leer sea más rápido." />
        </div>

        <Panel>
          <div className="font-black text-xl mb-3 text-center">Marcas agrupadas</div>
          <div className="grid md:grid-cols-2 2xl:grid-cols-4 gap-4">
            {[3, 5, 8, 12].map(n => (
              <div key={n} className="p-4 rounded-3xl border-2 text-center" style={box('#f59e0b')}>
                <div className="text-4xl font-black break-words">
                  {'|'.repeat(Math.min(n, 12))}
                </div>
                <div className="font-black mt-2">{n} marca(s)</div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    );

    const renderNudos = () => (
      <div className="space-y-4">
        <BigIdea title="Nudos, cuentas y cordeles" icon="🧶" color="#8b5cf6">
          No todos los registros antiguos fueron dibujos en papel. También se usaron nudos, cuentas, cuerdas, fichas, tablillas y objetos.
        </BigIdea>

        <div className="grid md:grid-cols-2 gap-3">
          <HistCard icon="🧶" title="Nudos" color="#8b5cf6" text="Un nudo puede ser una unidad de memoria. La posición del nudo también puede importar." />
          <HistCard icon="📿" title="Cuentas" color="#ec4899" text="Mover cuentas permite contar, sumar, comparar y recordar cantidades." />
          <HistCard icon="🧮" title="Ábaco" color="#0ea5e9" text="El ábaco convierte cantidades en posiciones visuales que se pueden manipular." />
          <HistCard icon="📦" title="Fichas" color="#84cc16" text="Una ficha puede representar un animal, un saco de grano o una deuda." />
        </div>
      </div>
    );

    const renderSumerios = () => (
      <div className="space-y-4">
        <BigIdea title="Sumerios: arcilla, comercio y administración" icon="🔻" color="#ea580c">
          En Mesopotamia, contar ayudaba a organizar cosechas, animales, raciones, deudas y comercio. Las tablillas de arcilla guardaban información.
        </BigIdea>

        <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-4">
          <HistCard icon="🏺" title="Arcilla" color="#ea580c" text="La arcilla conserva marcas y registros." />
          <HistCard icon="🌾" title="Grano" color="#f59e0b" text="Las cantidades de comida necesitaban control." />
          <HistCard icon="🔻" title="Cuñas" color="#64748b" text="Las marcas tipo cuña representan una escritura visual y administrativa." />
        </div>

        <SymbolStrip
          title="Idea visual tipo mesopotámica"
          color="#ea580c"
          items={[
            { symbol: '𒁹', label: 'uno' },
            { symbol: '𒐈', label: 'dos' },
            { symbol: '𒐉', label: 'tres' },
            { symbol: '𒌋', label: 'diez' },
            { symbol: '𒐕', label: 'sesenta' },
          ]}
        />
      </div>
    );

    const renderBabilonios = () => (
      <div className="space-y-4">
        <BigIdea title="Babilonios: pensar en base 60" icon="🏺" color="#f97316">
          La base 60 es una forma de agrupar. No es nuestra base diaria, pero todavía vive en el tiempo y los ángulos.
        </BigIdea>

        <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-4">
          <HistCard icon="⏱️" title="60 segundos" color="#f97316" text="Un minuto tiene 60 segundos." />
          <HistCard icon="🕐" title="60 minutos" color="#0ea5e9" text="Una hora tiene 60 minutos." />
          <HistCard icon="📐" title="360 grados" color="#84cc16" text="El círculo se divide comúnmente en 360 grados." />
        </div>

        <Panel>
          <div className="font-black text-xl mb-3 text-center">Ejemplo visual</div>
          <div className="grid md:grid-cols-2 gap-3">
            <div className="p-4 rounded-3xl border-2 text-center" style={box('#22c55e')}>
              <div className="text-xs font-black uppercase opacity-70">Decimal</div>
              <div className="text-5xl font-black">125</div>
              <div className="font-black mt-2">100 + 20 + 5</div>
            </div>
            <div className="p-4 rounded-3xl border-2 text-center" style={box('#f97316')}>
              <div className="text-xs font-black uppercase opacity-70">Base 60</div>
              <div className="text-5xl font-black">2 ; 05</div>
              <div className="font-black mt-2">2 grupos de 60 y 5 unidades</div>
            </div>
          </div>
        </Panel>
      </div>
    );

    const renderEgipcios = () => (
      <div className="space-y-4">
        <BigIdea title="Egipcios: repetir símbolos por valor" icon="𓂀" color="#eab308">
          El sistema egipcio era aditivo: si necesitas cientos, decenas y unidades, repites símbolos de cada valor.
        </BigIdea>

        <SymbolStrip
          title="Símbolos visuales simplificados"
          color="#eab308"
          items={[
            { symbol: '|', label: '1' },
            { symbol: '∩', label: '10' },
            { symbol: '🌀', label: '100' },
            { symbol: '🪷', label: '1000' },
          ]}
        />

        <Panel>
          <div className="font-black text-xl mb-3 text-center">Ejemplo: 234</div>
          <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-4">
            <HistCard icon="🌀🌀" title="200" color="#eab308" text="Dos símbolos de cien." />
            <HistCard icon="∩∩∩" title="30" color="#eab308" text="Tres símbolos de diez." />
            <HistCard icon="||||" title="4" color="#eab308" text="Cuatro unidades." />
          </div>
        </Panel>
      </div>
    );

    const renderFenicios = () => (
      <div className="space-y-4">
        <BigIdea title="Fenicios: símbolos que viajaron por el mar" icon="⛵" color="#06b6d4">
          Los fenicios fueron comerciantes y navegantes del Mediterráneo. Su importancia aquí es doble: ayudaron a mover escritura, símbolos, medidas e ideas; y también usaron signos numéricos para registrar cantidades.
        </BigIdea>

        <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-4">
          <HistCard icon="⛵" title="Rutas marítimas" color="#06b6d4" text="El comercio mueve objetos, palabras, medidas y símbolos entre pueblos." />
          <HistCard icon="🔤" title="Alfabeto fenicio" color="#8b5cf6" text="Su escritura ayudó a que muchos signos viajaran y cambiaran en otras culturas." />
          <HistCard icon="⚖️" title="Cantidades comerciales" color="#f59e0b" text="Comprar, vender y medir exige contar, registrar y comparar." />
        </div>

        <SymbolStrip
          title="Letras fenicias básicas"
          color="#06b6d4"
          items={[
            { symbol: '𐤀', label: 'alef', note: 'sonido /a/ o glotal' },
            { symbol: '𐤁', label: 'bet', note: 'casa' },
            { symbol: '𐤂', label: 'gimel', note: 'camello' },
            { symbol: '𐤃', label: 'dalet', note: 'puerta' },
            { symbol: '𐤄', label: 'he', note: 'ventana / aliento' },
            { symbol: '𐤅', label: 'waw', note: 'gancho' },
            { symbol: '𐤆', label: 'zayin', note: 'arma' },
            { symbol: '𐤇', label: 'het', note: 'cerca' },
            { symbol: '𐤈', label: 'tet', note: 'rueda / marca' },
            { symbol: '𐤉', label: 'yod', note: 'mano' },
            { symbol: '𐤊', label: 'kaf', note: 'palma' },
            { symbol: '𐤋', label: 'lamed', note: 'aguijada' },
          ]}
        />

        <SymbolStrip
          title="Numerales fenicios principales"
          color="#0ea5e9"
          items={[
            { symbol: '𐤖', label: '1', note: 'una marca' },
            { symbol: '𐤖𐤖', label: '2', note: 'dos marcas' },
            { symbol: '𐤖𐤖𐤖', label: '3', note: 'tres marcas' },
            { symbol: '𐤗', label: '10', note: 'decena' },
            { symbol: '𐤘', label: '20', note: 'veintena' },
            { symbol: '𐤙', label: '100', note: 'centena' },
            { symbol: '—', label: '0', note: 'sin cero posicional' },
          ]}
        />

        <Panel>
          <div className="font-black text-xl mb-3 text-center">Cómo se formaban cantidades</div>
          <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-4">
            <div className="p-4 rounded-3xl border-2 text-center" style={box('#06b6d4')}>
              <div className="text-xs font-black uppercase opacity-70">Ejemplo</div>
              <div className="text-5xl font-black break-words">𐤗 𐤖𐤖𐤖</div>
              <div className="font-black mt-2">10 + 3 = 13</div>
              <div className="text-xs font-bold opacity-75 mt-1">Se suman los signos.</div>
            </div>

            <div className="p-4 rounded-3xl border-2 text-center" style={box('#06b6d4')}>
              <div className="text-xs font-black uppercase opacity-70">Ejemplo</div>
              <div className="text-5xl font-black break-words">𐤘 𐤗 𐤖𐤖</div>
              <div className="font-black mt-2">20 + 10 + 2 = 32</div>
              <div className="text-xs font-bold opacity-75 mt-1">Sistema aditivo.</div>
            </div>

            <div className="p-4 rounded-3xl border-2 text-center" style={box('#06b6d4')}>
              <div className="text-xs font-black uppercase opacity-70">Ejemplo</div>
              <div className="text-5xl font-black break-words">𐤙 𐤘 𐤘 𐤖</div>
              <div className="font-black mt-2">100 + 20 + 20 + 1 = 141</div>
              <div className="text-xs font-bold opacity-75 mt-1">No depende de columnas como 141.</div>
            </div>
          </div>
        </Panel>

        <div className="grid md:grid-cols-2 gap-3">
          <HistCard
            icon="📦"
            title="Sistema aditivo"
            color="#06b6d4"
            text="Aditivo significa que el valor total se obtiene sumando los símbolos escritos. Es distinto a nuestro sistema decimal posicional."
          />
          <HistCard
            icon="⭕"
            title="Sin cero posicional"
            color="#38bdf8"
            text="No usaban un 0 como guardián de columnas. En nuestro sistema, 105 necesita el 0 para decir que no hay decenas."
          />
        </div>

        <Panel>
          <div className="font-black text-xl mb-3 text-center">Fenicio vs decimal posicional</div>
          <div className="grid md:grid-cols-[1fr_70px_1fr] gap-3 items-center">
            <div className="p-4 rounded-3xl border-2 text-center" style={box('#06b6d4')}>
              <div className="text-xs font-black uppercase opacity-70">Fenicio</div>
              <div className="text-5xl font-black break-words">𐤙 𐤘 𐤗 𐤖𐤖</div>
              <div className="font-black mt-2">100 + 20 + 10 + 2</div>
            </div>

            <div className="text-4xl text-center">➡️</div>

            <div className="p-4 rounded-3xl border-2 text-center" style={box(colors.system)}>
              <div className="text-xs font-black uppercase opacity-70">Decimal</div>
              <div className="text-6xl font-black">132</div>
              <div className="font-black mt-2">1 centena, 3 decenas, 2 unidades</div>
            </div>
          </div>
        </Panel>
      </div>
    );

    const renderHebreos = () => (
      <div className="space-y-4">
        <BigIdea title="Hebreos: letras con valor numérico" icon="✡️" color="#a855f7">
          En la tradición hebrea, letras pueden funcionar como números en contextos tradicionales: fechas, capítulos, versículos, listas y estudios.
        </BigIdea>

        <SymbolStrip
          title="Letras y valores"
          color="#a855f7"
          items={[
            { symbol: 'א', label: '1', note: 'alef' },
            { symbol: 'ב', label: '2', note: 'bet' },
            { symbol: 'ג', label: '3', note: 'guímel' },
            { symbol: 'ד', label: '4', note: 'dálet' },
            { symbol: 'ה', label: '5', note: 'he' },
            { symbol: 'י', label: '10', note: 'yod' },
            { symbol: 'ק', label: '100', note: 'qof' },
            { symbol: 'ת', label: '400', note: 'tav' },
          ]}
        />

        <HistCard icon="🧠" title="Regla mental" color="#a855f7" text="Las letras se suman por valor. No funciona igual que nuestro sistema decimal posicional." />
      </div>
    );

    const renderGriegos = () => (
      <div className="space-y-4">
        <BigIdea title="Griegos: letras, proporción y geometría" icon="🏛️" color="#7c3aed">
          Los griegos conectaron números con geometría, proporciones y demostraciones. Esta etapa ayuda a ver que el número también puede ser longitud, razón y forma.
        </BigIdea>

        <SymbolStrip
          title="Letras griegas con valor"
          color="#7c3aed"
          items={[
            { symbol: 'α', label: '1' },
            { symbol: 'β', label: '2' },
            { symbol: 'γ', label: '3' },
            { symbol: 'δ', label: '4' },
            { symbol: 'ε', label: '5' },
            { symbol: 'ι', label: '10' },
            { symbol: 'ρ', label: '100' },
            { symbol: 'ω', label: '800' },
          ]}
        />

        <div className="grid md:grid-cols-2 gap-3">
          <HistCard icon="📐" title="Número como forma" color="#7c3aed" text="Un cuadrado, un triángulo o una diagonal también pueden enseñar ideas numéricas." />
          <HistCard icon="√" title="Irracionales" color="#ec4899" text="La diagonal de un cuadrado revela que no todos los números se escriben como fracción exacta." />
        </div>
      </div>
    );

    const renderRomanos = () => (
      <div className="space-y-4">
        <BigIdea title="Romanos: letras y reglas" icon="🏟️" color="#64748b">
          Los romanos escribieron cantidades con letras. Su sistema sirve para etiquetas, siglos y nombres, pero no es tan cómodo para calcular como el decimal posicional.
        </BigIdea>

        <SymbolStrip
          title="Símbolos romanos"
          color="#64748b"
          items={[
            { symbol: 'I', label: '1' },
            { symbol: 'V', label: '5' },
            { symbol: 'X', label: '10' },
            { symbol: 'L', label: '50' },
            { symbol: 'C', label: '100' },
            { symbol: 'D', label: '500' },
            { symbol: 'M', label: '1000' },
          ]}
        />

        <div className="grid md:grid-cols-2 gap-3">
          <HistCard icon="✅" title="Útil para nombrar" color="#64748b" text="Capítulos, relojes, siglos y nombres pueden usar números romanos." />
          <HistCard icon="⚠️" title="Difícil para operar" color="#ef4444" text="Sumar o multiplicar cantidades grandes es más cómodo con valor posicional." />
        </div>
      </div>
    );

    const renderIndia = () => (
      <div className="space-y-4">
        <BigIdea title="India: posición y cero" icon="🪷" color="#ec4899">
          La notación posicional y el cero permiten escribir números enormes con pocos símbolos. Esta idea cambió la historia de la matemática.
        </BigIdea>

        <SymbolStrip
          title="Numerales devanagari"
          color="#ec4899"
          items={[
            { symbol: '०', label: '0' },
            { symbol: '१', label: '1' },
            { symbol: '२', label: '2' },
            { symbol: '३', label: '3' },
            { symbol: '४', label: '4' },
            { symbol: '५', label: '5' },
            { symbol: '६', label: '6' },
            { symbol: '७', label: '7' },
            { symbol: '८', label: '8' },
            { symbol: '९', label: '9' },
          ]}
        />

        <Panel>
          <div className="font-black text-xl mb-3 text-center">La revolución del lugar</div>
          <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-4">
            <HistCard icon="3" title="3 unidades" color="#f59e0b" text="En el lugar de unidades, 3 vale tres." />
            <HistCard icon="3" title="3 decenas" color="#0ea5e9" text="En el lugar de decenas, 3 vale treinta." />
            <HistCard icon="3" title="3 centenas" color="#84cc16" text="En el lugar de centenas, 3 vale trescientos." />
          </div>
        </Panel>
      </div>
    );

    const renderArabes = () => (
      <div className="space-y-4">
        <BigIdea title="Mundo árabe: transmisión y desarrollo" icon="🌙" color="#0ea5e9">
          El mundo árabe fue un puente de conocimiento: estudió, tradujo, usó y transmitió ideas matemáticas entre regiones.
        </BigIdea>

        <SymbolStrip
          title="Numerales arábigos orientales"
          color="#0ea5e9"
          items={[
            { symbol: '٠', label: '0' },
            { symbol: '١', label: '1' },
            { symbol: '٢', label: '2' },
            { symbol: '٣', label: '3' },
            { symbol: '٤', label: '4' },
            { symbol: '٥', label: '5' },
            { symbol: '٦', label: '6' },
            { symbol: '٧', label: '7' },
            { symbol: '٨', label: '8' },
            { symbol: '٩', label: '9' },
          ]}
        />

        <div className="grid md:grid-cols-2 gap-3">
          <HistCard icon="📚" title="Estudio" color="#0ea5e9" text="La traducción y el estudio ayudaron a preservar y mover ideas." />
          <HistCard icon="🌉" title="Puente cultural" color="#14b8a6" text="Los sistemas viajan cuando las personas comercian, estudian y enseñan." />
        </div>
      </div>
    );

    const renderChina = () => (
      <div className="space-y-4">
        <BigIdea title="China: caracteres y cálculo" icon="🐉" color="#dc2626">
          La tradición china desarrolló caracteres numéricos y herramientas de cálculo. Los números se conectan con unidades como diez, cien y mil.
        </BigIdea>

        <SymbolStrip
          title="Caracteres chinos básicos"
          color="#dc2626"
          items={[
            { symbol: '零', label: '0' },
            { symbol: '一', label: '1' },
            { symbol: '二', label: '2' },
            { symbol: '三', label: '3' },
            { symbol: '四', label: '4' },
            { symbol: '五', label: '5' },
            { symbol: '六', label: '6' },
            { symbol: '七', label: '7' },
            { symbol: '八', label: '8' },
            { symbol: '九', label: '9' },
            { symbol: '十', label: '10' },
          ]}
        />

        <div className="grid md:grid-cols-2 gap-3">
          <HistCard icon="🧮" title="Herramientas" color="#dc2626" text="Las varillas y ábacos permiten manipular cantidades visualmente." />
          <HistCard icon="十" title="Unidades de valor" color="#f59e0b" text="Diez, cien y mil ayudan a leer números por estructura." />
        </div>
      </div>
    );

    const renderMayas = () => (
      <div className="space-y-4">
        <BigIdea title="Mayas: puntos, barras y cero" icon="🌽" color="#84cc16">
          El sistema maya es muy visual: puntos para unidades, barras para cincos y un símbolo de cero. También piensa por posiciones.
        </BigIdea>

        <SymbolStrip
          title="Símbolos mayas simplificados"
          color="#84cc16"
          items={[
            { symbol: '𝋠', label: '0' },
            { symbol: '●', label: '1' },
            { symbol: '●●', label: '2' },
            { symbol: '●●●', label: '3' },
            { symbol: '●●●●', label: '4' },
            { symbol: '▬', label: '5' },
            { symbol: '● ▬', label: '6' },
            { symbol: '▬▬', label: '10' },
          ]}
        />

        <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-4">
          <HistCard icon="●" title="Punto" color="#84cc16" text="Un punto vale 1." />
          <HistCard icon="▬" title="Barra" color="#84cc16" text="Una barra vale 5." />
          <HistCard icon="𝋠" title="Cero" color="#84cc16" text="El cero puede indicar una posición vacía." />
        </div>
      </div>
    );

    const renderInstrumentos = () => (
      <div className="space-y-4">
        <BigIdea title="Instrumentos de cálculo" icon="🧮" color="#0ea5e9">
          No todo cálculo ocurre en la cabeza. La humanidad ha usado objetos para pensar: dedos, piedras, ábacos, varillas, tablas y máquinas.
        </BigIdea>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
          <HistCard icon="✋" title="Dedos" color="#22c55e" text="La primera calculadora está en el cuerpo." />
          <HistCard icon="🪨" title="Piedras" color="#64748b" text="Objetos pequeños pueden representar cantidades." />
          <HistCard icon="🧮" title="Ábaco" color="#0ea5e9" text="Mover cuentas ayuda a sumar y restar visualmente." />
          <HistCard icon="💻" title="Computadora" color="#14b8a6" text="Una máquina moderna puede calcular usando señales." />
        </div>

        <Panel>
          <div className="font-black text-xl mb-3 text-center">La idea no cambia: representar y transformar cantidades</div>
          <div className="grid md:grid-cols-[1fr_60px_1fr_60px_1fr] gap-3 items-center text-center">
            <div className="p-4 rounded-3xl border-2" style={box('#22c55e')}>
              <div className="text-5xl">✋</div>
              <div className="font-black">dedos</div>
            </div>
            <div className="text-4xl">➡️</div>
            <div className="p-4 rounded-3xl border-2" style={box('#0ea5e9')}>
              <div className="text-5xl">🧮</div>
              <div className="font-black">ábaco</div>
            </div>
            <div className="text-4xl">➡️</div>
            <div className="p-4 rounded-3xl border-2" style={box('#14b8a6')}>
              <div className="text-5xl">💻</div>
              <div className="font-black">computadora</div>
            </div>
          </div>
        </Panel>
      </div>
    );

    const renderComercio = () => (
      <div className="space-y-4">
        <BigIdea title="Comercio: contar para intercambiar" icon="⚖️" color="#f59e0b">
          Cuando las personas intercambian, necesitan contar, medir, comparar y registrar. El comercio empuja a crear símbolos más claros.
        </BigIdea>

        <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-4">
          <HistCard icon="🌾" title="Mercancía" color="#84cc16" text="Grano, aceite, animales, telas o herramientas se cuentan y se pesan." />
          <HistCard icon="⚖️" title="Medida" color="#f59e0b" text="No basta contar: también hay que medir peso, longitud o capacidad." />
          <HistCard icon="🧾" title="Registro" color="#64748b" text="Las deudas y pagos necesitan memoria escrita o simbólica." />
        </div>

        <Panel>
          <div className="font-black text-xl mb-3 text-center">Ejemplo de trueque</div>
          <div className="grid md:grid-cols-[1fr_60px_1fr_60px_1fr] gap-3 items-center">
            <HistCard icon="🌾🌾🌾" title="3 sacos" color="#84cc16" text="Cantidad entregada." />
            <div className="text-4xl text-center">↔️</div>
            <HistCard icon="🐑" title="1 oveja" color="#22c55e" text="Cantidad recibida." />
            <div className="text-4xl text-center">➡️</div>
            <HistCard icon="🧾" title="Registro" color="#64748b" text="Se necesita recordar el acuerdo." />
          </div>
        </Panel>
      </div>
    );

    const renderAstronomia = () => (
      <div className="space-y-4">
        <BigIdea title="Astronomía, calendario y ciclos" icon="🌙" color="#8b5cf6">
          Los números también nacen de mirar el cielo: días, noches, lunas, estaciones, sombras, ciclos y calendarios.
        </BigIdea>

        <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-4">
          <HistCard icon="☀️" title="Día" color="#f59e0b" text="El sol marca ciclos diarios." />
          <HistCard icon="🌙" title="Luna" color="#8b5cf6" text="Las fases lunares ayudan a pensar en meses y ciclos." />
          <HistCard icon="🌱" title="Estaciones" color="#22c55e" text="Sembrar y cosechar depende de observar patrones." />
        </div>

        <Panel>
          <div className="font-black text-xl mb-3 text-center">Contar tiempo es contar ciclos</div>
          <div className="grid md:grid-cols-2 2xl:grid-cols-4 gap-4">
            {['día', 'noche', 'día', 'noche'].map((x, i) => (
              <div key={i} className="p-4 rounded-3xl border-2 text-center" style={box(i % 2 === 0 ? '#f59e0b' : '#6366f1')}>
                <div className="text-5xl">{i % 2 === 0 ? '☀️' : '🌙'}</div>
                <div className="font-black">{x}</div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    );

    const renderCero = () => (
      <div className="space-y-4">
        <BigIdea title="El viaje del cero" icon="⭕" color={colors.zero}>
          El cero tiene varias ideas: ausencia, hueco, marcador de posición, origen y número. No todas aparecieron juntas ni en el mismo lugar.
        </BigIdea>

        <div className="grid gap-4">
          {[
            ['📦', 'Vacío', 'Primero está la necesidad de decir que no hay objetos.', colors.zero],
            ['🕳️', 'Hueco', 'En algunos sistemas, un hueco puede indicar que falta una posición.', '#64748b'],
            ['🏛️', 'Marcador de posición', 'El cero ayuda a distinguir 15, 105 y 1005.', colors.system],
            ['🔢', 'Número', 'Después puede tratarse como un número con reglas propias.', '#0ea5e9'],
            ['📍', 'Origen', 'En la recta numérica, el cero sirve como punto de referencia.', colors.real],
            ['💻', 'Estado', 'En computación, 0 puede significar apagado o falso.', '#14b8a6'],
          ].map(([icon, title, text, color], i) => (
            <Step key={String(title)} n={i + 1} icon={String(icon)} title={String(title)} text={String(text)} color={String(color)} />
          ))}
        </div>
      </div>
    );

    const renderModerno = () => (
      <div className="space-y-4">
        <BigIdea title="Sistema moderno: decimal posicional" icon="🔟" color={colors.system}>
          Nuestro sistema usa diez símbolos y posición. Con 0, 1, 2, 3, 4, 5, 6, 7, 8 y 9 podemos escribir cantidades enormes.
        </BigIdea>

        <SymbolStrip
          title="Dígitos actuales"
          color={colors.system}
          items={[
            { symbol: '0', label: 'cero' },
            { symbol: '1', label: 'uno' },
            { symbol: '2', label: 'dos' },
            { symbol: '3', label: 'tres' },
            { symbol: '4', label: 'cuatro' },
            { symbol: '5', label: 'cinco' },
            { symbol: '6', label: 'seis' },
            { symbol: '7', label: 'siete' },
            { symbol: '8', label: 'ocho' },
            { symbol: '9', label: 'nueve' },
          ]}
        />

        <Panel>
          <div className="font-black text-xl text-center mb-3">Mismo símbolo, distinto valor</div>
          <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-4">
            <HistCard icon="5" title="500" color="#84cc16" text="El 5 en centenas vale quinientos." />
            <HistCard icon="5" title="50" color="#0ea5e9" text="El 5 en decenas vale cincuenta." />
            <HistCard icon="5" title="5" color="#f59e0b" text="El 5 en unidades vale cinco." />
          </div>
        </Panel>
      </div>
    );

    const renderComputadoras = () => (
      <div className="space-y-4">
        <BigIdea title="Computadoras: binario y hexadecimal" icon="💻" color="#14b8a6">
          Las computadoras trabajan con estados. Dos símbolos, 0 y 1, bastan para representar información si se combinan con reglas.
        </BigIdea>

        <div className="grid md:grid-cols-2 gap-3">
          <HistCard icon="0️⃣" title="0" color={colors.zero} text="Puede representar apagado, falso o ausencia de señal." />
          <HistCard icon="1️⃣" title="1" color={colors.count} text="Puede representar encendido, verdadero o presencia de señal." />
        </div>

        <Panel>
          <div className="font-black text-xl mb-3 text-center">Decimal, binario y hexadecimal</div>
          <div className="grid md:grid-cols-2 2xl:grid-cols-4 gap-4">
            {[
              ['0', '0', '0'],
              ['1', '1', '1'],
              ['2', '10', '2'],
              ['3', '11', '3'],
              ['10', '1010', 'A'],
              ['15', '1111', 'F'],
              ['16', '10000', '10'],
              ['255', '11111111', 'FF'],
            ].map(([dec, bin, hex]) => (
              <div key={dec} className="p-4 rounded-3xl border-2 text-center" style={box('#14b8a6')}>
                <div className="text-xs font-black uppercase opacity-70">decimal {dec}</div>
                <div className="font-black">binario: {bin}</div>
                <div className="font-black">hex: {hex}</div>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    );

    const renderComparar = () => (
      <div className="space-y-4">
        <BigIdea title="Comparar sistemas" icon="📊" color="#8b5cf6">
          Cambian los símbolos, cambia la base, cambia la regla. La idea profunda es la misma: representar cantidades.
        </BigIdea>

        <CompareTable />

        <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-4">
          <HistCard icon="🔣" title="Símbolos" color="#8b5cf6" text="Cada cultura puede elegir símbolos distintos." />
          <HistCard icon="📦" title="Base" color="#84cc16" text="Algunos sistemas agrupan en 10, otros en 20, 60 o 2." />
          <HistCard icon="🏛️" title="Posición" color="#0ea5e9" text="En sistemas posicionales, el lugar del símbolo cambia su valor." />
        </div>
      </div>
    );

    return (
      <div className="space-y-4">
        <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(105px, 1fr))' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setSub(tab.id)}
              className={`p-3 rounded-2xl font-black text-xs transition-all ${
                sub === tab.id ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color hover:scale-105'
              }`}
            >
              <span className="text-2xl block mb-1">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {sub === 'mapa' && renderMapa()}
        {sub === 'primeros' && renderPrimeros()}
        {sub === 'marcas' && renderMarcas()}
        {sub === 'nudos' && renderNudos()}
        {sub === 'sumerios' && renderSumerios()}
        {sub === 'babilonios' && renderBabilonios()}
        {sub === 'egipcios' && renderEgipcios()}
        {sub === 'fenicios' && renderFenicios()}
        {sub === 'hebreos' && renderHebreos()}
        {sub === 'griegos' && renderGriegos()}
        {sub === 'romanos' && renderRomanos()}
        {sub === 'india' && renderIndia()}
        {sub === 'arabes' && renderArabes()}
        {sub === 'china' && renderChina()}
        {sub === 'mayas' && renderMayas()}
        {sub === 'instrumentos' && renderInstrumentos()}
        {sub === 'comercio' && renderComercio()}
        {sub === 'astronomia' && renderAstronomia()}
        {sub === 'cero' && renderCero()}
        {sub === 'moderno' && renderModerno()}
        {sub === 'computadoras' && renderComputadoras()}
        {sub === 'comparar' && renderComparar()}
      </div>
    );
  };











  const renderUnoCero = () => {
    const n = Math.max(0, Math.min(999, Math.floor(zeroOneNumber)));
    const safeN = Math.max(1, n);
    const hundreds = Math.floor(n / 100);
    const tens = Math.floor((n % 100) / 10);
    const units = n % 10;

    const sub = zeroOneSub;
    const setSub = setZeroOneSub;

    const SymbolCard = ({
      title,
      symbol,
      note,
      color,
      detail,
    }: {
      title: string;
      symbol: string;
      note: string;
      color: string;
      detail?: string;
    }) => (
      <div
        className="p-4 rounded-3xl border-2 shadow text-center hover:scale-[1.03] transition-all min-w-0"
        style={box(color)}
      >
        <div className="text-xs font-black uppercase opacity-70">{title}</div>
        <div className="text-6xl md:text-7xl font-black my-2 break-words leading-tight">{symbol}</div>
        <div className="font-black text-sm">{note}</div>
        {detail && <div className="text-xs font-bold opacity-75 mt-2 leading-relaxed">{detail}</div>}
      </div>
    );

    const IdeaStep = ({
      icon,
      title,
      text,
      color,
      index,
    }: {
      icon: string;
      title: string;
      text: string;
      color: string;
      index: number;
    }) => (
      <div className="grid md:grid-cols-[90px_40px_1fr] gap-3 items-center">
        <div className="p-4 rounded-3xl border-2 shadow text-center hover:scale-105 transition-all" style={box(color)}>
          <div className="text-4xl">{icon}</div>
          <div className="font-black text-xs mt-1">Idea {index}</div>
        </div>
        <div className="hidden md:block text-3xl text-center">➡️</div>
        <div className="p-4 rounded-3xl bg-surface-color border-2 border-border-color shadow">
          <div className="font-black text-xl leading-tight break-words">{title}</div>
          <div className="text-sm font-bold opacity-80 leading-relaxed">{text}</div>
        </div>
      </div>
    );

    const DigitBox = ({
      label,
      digit,
      value,
      color,
      note,
    }: {
      label: string;
      digit: number;
      value: number;
      color: string;
      note: string;
    }) => (
      <div
        className="p-4 rounded-3xl border-2 shadow text-center hover:scale-[1.02] transition-all"
        style={box(color)}
      >
        <div className="text-xs font-black uppercase opacity-70">{label}</div>
        <div className="text-6xl font-black">{digit}</div>
        <div className="mt-2 p-2 rounded-2xl bg-surface-color/80 border border-border-color font-black">
          {digit} × {value} = {digit * value}
        </div>
        <div className="mt-2 text-xs font-bold opacity-75">{note}</div>
      </div>
    );

    const oneSymbols = [
      { title: 'Dedo', symbol: '☝️', note: 'uno con el cuerpo', detail: 'Antes de escribir, el cuerpo ya servía para contar.', color: colors.count },
      { title: 'Marca simple', symbol: '|', note: 'una raya', detail: 'Una marca puede representar un objeto contado.', color: '#64748b' },
      { title: 'Romano', symbol: 'I', note: 'uno romano', detail: 'Parece una marca vertical: una unidad.', color: '#94a3b8' },
      { title: 'Chino', symbol: '一', note: 'uno chino', detail: 'Una línea horizontal representa una unidad.', color: '#dc2626' },
      { title: 'Indio devanagari', symbol: '१', note: 'uno devanagari', detail: 'Pertenece a una tradición importante para la notación posicional.', color: '#ec4899' },
      { title: 'Arábigo oriental', symbol: '١', note: 'uno arábigo oriental', detail: 'Otra forma histórica de escribir el mismo valor.', color: '#0ea5e9' },
      { title: 'Maya', symbol: '●', note: 'un punto', detail: 'En el sistema maya, un punto vale 1.', color: '#84cc16' },
      { title: 'Hebreo', symbol: 'א', note: 'alef vale 1', detail: 'En uso tradicional, algunas letras también tienen valor numérico.', color: '#a855f7' },
      { title: 'Griego', symbol: 'α', note: 'alfa vale 1', detail: 'En numeración griega, letras podían representar cantidades.', color: '#7c3aed' },
      { title: 'Binario', symbol: '1', note: 'encendido / sí', detail: 'En computación, 1 puede representar un estado activo.', color: '#14b8a6' },
      { title: 'Decimal actual', symbol: '1', note: 'nuestro uno', detail: 'Un símbolo pequeño para una idea enorme: una unidad.', color: colors.system },
    ];

    const zeroSymbols = [
      { title: 'Caja vacía', symbol: '📦', note: 'no hay objetos', detail: 'La idea de vacío es más antigua que muchas escrituras del cero.', color: colors.zero },
      { title: 'Decimal actual', symbol: '0', note: 'nuestro cero', detail: 'Sirve como número y como guardián de columnas.', color: colors.zero },
      { title: 'Indio devanagari', symbol: '०', note: 'cero devanagari', detail: 'La tradición india fue clave para el cero posicional.', color: '#ec4899' },
      { title: 'Arábigo oriental', symbol: '٠', note: 'cero arábigo oriental', detail: 'Otra forma de escribir el cero en sistemas usados en el mundo árabe.', color: '#0ea5e9' },
      { title: 'Maya', symbol: '𝋠', note: 'cero maya', detail: 'El sistema maya tuvo un símbolo para cero.', color: '#84cc16' },
      { title: 'Binario', symbol: '0', note: 'apagado / no', detail: 'En computación, 0 puede representar un estado inactivo.', color: '#14b8a6' },
      { title: 'Romano', symbol: '—', note: 'sin cero posicional', detail: 'Los romanos no tenían un cero como el nuestro para escribir 10, 100 o 1000.', color: '#94a3b8' },
      { title: 'Egipcio', symbol: '—', note: 'sin cero posicional', detail: 'Podían expresar cantidades, pero no usaban el cero como marcador decimal moderno.', color: '#eab308' },
    ];

    const subModes = [
      { id: 'mapa', label: 'Mapa', icon: '🧭' },
      { id: 'unidad', label: 'El 1', icon: '1️⃣' },
      { id: 'simbolos1', label: 'Símbolos 1', icon: '🔣' },
      { id: 'porque1', label: 'Por qué 1', icon: '🧠' },
      { id: 'mat1', label: '1 en mate', icon: '⚙️' },
      { id: 'cero', label: 'El 0', icon: '0️⃣' },
      { id: 'simbolos0', label: 'Símbolos 0', icon: '⭕' },
      { id: 'porque0', label: 'Por qué 0', icon: '📦' },
      { id: 'mat0', label: '0 en mate', icon: '🏛️' },
      { id: 'binario', label: '0 y 1', icon: '💻' },
      { id: 'historia', label: 'Historia', icon: '🏺' },
    ];

    return (
      <div className="space-y-4">
        <BigIdea title="El 1 y el 0" icon="🧠" color={colors.zero}>
          El 1 y el 0 parecen pequeños, pero sostienen casi todo el edificio de los números. El 1 permite formar unidades. El 0 permite decir “no hay”, marcar el origen y guardar columnas.
        </BigIdea>

        <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(105px, 1fr))' }}>
          {subModes.map(m => (
            <button
              key={m.id}
              onClick={() => setSub(m.id)}
              className={`p-3 rounded-2xl font-black text-xs transition-all ${
                sub === m.id ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color hover:scale-105'
              }`}
            >
              <span className="text-2xl block mb-1">{m.icon}</span>
              {m.label}
            </button>
          ))}
        </div>

        {sub === 'mapa' && (
          <div className="space-y-4">
            <div className="grid lg:grid-cols-[1fr_90px_1fr] gap-4 items-stretch">
              <div className="p-5 rounded-3xl border-2 shadow text-center" style={box(colors.count)}>
                <div className="text-7xl font-black">1</div>
                <div className="font-black text-2xl">Unidad</div>
                <div className="mt-3 text-sm font-bold opacity-80 leading-relaxed">
                  Sirve para empezar a contar, construir cantidades, representar un todo y conservar números al multiplicar.
                </div>
              </div>

              <div className="hidden lg:flex items-center justify-center text-5xl animate-pulse">⚡</div>

              <div className="p-5 rounded-3xl border-2 shadow text-center" style={box(colors.zero)}>
                <div className="text-7xl font-black">0</div>
                <div className="font-black text-2xl">Ausencia y posición</div>
                <div className="mt-3 text-sm font-bold opacity-80 leading-relaxed">
                  Sirve para decir “no hay”, marcar el origen y guardar columnas en números como 10, 100 y 1005.
                </div>
              </div>
            </div>

            <Panel>
              <div className="font-black text-xl mb-3 text-center">Tres lecturas distintas</div>
              <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-4">
                <div className="p-4 rounded-3xl border-2 text-center" style={box(colors.count)}>
                  <div className="text-5xl">🍎</div>
                  <div className="font-black">Cantidad</div>
                  <div className="text-sm font-bold opacity-75">1 manzana, 2 manzanas...</div>
                </div>
                <div className="p-4 rounded-3xl border-2 text-center" style={box(colors.real)}>
                  <div className="text-5xl">📍</div>
                  <div className="font-black">Origen</div>
                  <div className="text-sm font-bold opacity-75">El 0 separa negativos y positivos.</div>
                </div>
                <div className="p-4 rounded-3xl border-2 text-center" style={box(colors.system)}>
                  <div className="text-5xl">🏛️</div>
                  <div className="font-black">Posición</div>
                  <div className="text-sm font-bold opacity-75">El 0 guarda columnas.</div>
                </div>
              </div>
            </Panel>
          </div>
        )}

        {sub === 'unidad' && (
          <div className="space-y-4">
            <Panel>
              <div className="grid lg:grid-cols-[260px_minmax(0,1fr)] gap-4 items-center">
                <div className="p-5 rounded-3xl border-2 text-center" style={box(colors.count)}>
                  <div className="text-7xl font-black">1</div>
                  <div className="font-black text-xl">Una unidad</div>
                  <div className="text-sm font-bold opacity-75 mt-2">La pieza mínima para empezar a contar.</div>
                </div>

                <div className="space-y-3">
                  <div className="p-4 rounded-3xl border-2" style={box(colors.count)}>
                    <div className="font-black text-lg">Idea visual</div>
                    <div className="text-sm font-bold opacity-85">
                      Si tengo una cosa, puedo señalarla. Si agrego otra unidad, ahora tengo dos. Contar es repetir unidades.
                    </div>
                  </div>

                  <div className="flex gap-3 flex-wrap text-5xl justify-center">
                    <span>🍎</span>
                    <span className="text-3xl self-center">➡️</span>
                    <span>🍎</span>
                    <span>🍎</span>
                    <span className="text-3xl self-center">➡️</span>
                    <span>🍎</span>
                    <span>🍎</span>
                    <span>🍎</span>
                  </div>
                </div>
              </div>
            </Panel>

            <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-4">
              <div className="p-4 rounded-3xl border-2 shadow" style={box(colors.count)}>
                <div className="font-black text-lg">1 como inicio</div>
                <div className="text-sm font-bold opacity-80">Es el primer paso para contar objetos completos.</div>
              </div>
              <div className="p-4 rounded-3xl border-2 shadow" style={box(colors.rational)}>
                <div className="font-black text-lg">1 como todo</div>
                <div className="text-sm font-bold opacity-80">En fracciones, 1 puede representar una pizza completa.</div>
              </div>
              <div className="p-4 rounded-3xl border-2 shadow" style={box(colors.system)}>
                <div className="font-black text-lg">1 como identidad</div>
                <div className="text-sm font-bold opacity-80">Multiplicar por 1 deja igual: 8 × 1 = 8.</div>
              </div>
            </div>
          </div>
        )}

        {sub === 'simbolos1' && (
          <div className="space-y-4">
            <BigIdea title="Muchas formas, misma idea" icon="🔣" color={colors.count}>
              El símbolo cambia según la cultura y el sistema. La idea se mantiene: una unidad, una marca, un objeto, un punto, una posición.
            </BigIdea>

            <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
              {oneSymbols.map(item => (
                <SymbolCard
                  key={item.title}
                  title={item.title}
                  symbol={item.symbol}
                  note={item.note}
                  detail={item.detail}
                  color={item.color}
                />
              ))}
            </div>
          </div>
        )}

        {sub === 'porque1' && (
          <div className="space-y-4">
            <BigIdea title="¿Por qué existe el 1?" icon="☝️" color={colors.count}>
              El 1 aparece porque la mente necesita separar “una cosa” del mundo. Una oveja, una piedra, una marca, una persona. Después, muchas unidades juntas forman todos los demás conteos.
            </BigIdea>

            <div className="grid gap-4">
              {[
                ['👀', '1 nace al distinguir', 'Antes de contar muchos objetos, primero hay que reconocer uno: este objeto, esta marca, esta oveja.', colors.count],
                ['🤝', 'Correspondencia uno a uno', 'Una piedra podía representar una oveja. Si sobraba una piedra, faltaba una oveja. Esa comparación es una idea matemática profunda.', colors.system],
                ['|', 'La marca simple', 'Una raya es una forma directa de escribir una unidad. Muchos sistemas antiguos usaron marcas o símbolos repetidos.', '#64748b'],
                ['🧱', 'Con muchos unos construyes números', '2 es 1 + 1. 3 es 1 + 1 + 1. La unidad funciona como ladrillo básico del conteo.', '#84cc16'],
                ['🍕', '1 también puede ser un todo', 'En fracciones, 1 no significa “poquito”; significa la unidad completa: una pizza entera, una barra entera, un metro entero.', colors.fraction],
                ['⚙️', '1 conserva', 'En multiplicación, 1 es identidad: 9 × 1 = 9. No agranda ni reduce; conserva el número.', colors.rational],
              ].map(([icon, title, text, color], i) => (
                <IdeaStep key={String(title)} icon={String(icon)} title={String(title)} text={String(text)} color={String(color)} index={i + 1} />
              ))}
            </div>

            <Panel>
              <div className="font-black text-xl mb-3 text-center">Construir números con unos</div>
              <div className="grid md:grid-cols-2 2xl:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map(k => (
                  <div key={k} className="p-4 rounded-3xl border-2 text-center" style={box(colors.count)}>
                    <div className="text-4xl mb-2">{'🟢'.repeat(k)}</div>
                    <div className="font-black">{Array.from({ length: k }).map(() => '1').join(' + ')} = {k}</div>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        )}

        {sub === 'mat1' && (
          <div className="space-y-4">
            <BigIdea title="El 1 dentro de la matemática" icon="⚙️" color={colors.rational}>
              El 1 cambia de papel según el contexto: puede ser cantidad, unidad completa, identidad multiplicativa, exponente, potencia o punto de referencia.
            </BigIdea>

            <div className="grid md:grid-cols-2 gap-3">
              <div className="p-5 rounded-3xl border-2 shadow" style={box(colors.count)}>
                <div className="font-black text-xl">1 como número natural</div>
                <div className="text-sm font-bold opacity-80 mt-2">Sirve para contar: 1, 2, 3...</div>
              </div>
              <div className="p-5 rounded-3xl border-2 shadow" style={box(colors.fraction)}>
                <div className="font-black text-xl">1 como unidad completa</div>
                <div className="text-sm font-bold opacity-80 mt-2">1 pizza completa = 2/2 = 3/3 = 4/4.</div>
              </div>
              <div className="p-5 rounded-3xl border-2 shadow" style={box(colors.rational)}>
                <div className="font-black text-xl">1 como identidad</div>
                <div className="text-sm font-bold opacity-80 mt-2">Cualquier número multiplicado por 1 se queda igual.</div>
                <div className="mt-3 text-3xl font-black">{safeN} × 1 = {safeN}</div>
              </div>
              <div className="p-5 rounded-3xl border-2 shadow" style={box(colors.system)}>
                <div className="font-black text-xl">1 como potencia especial</div>
                <div className="text-sm font-bold opacity-80 mt-2">Elevar a 1 conserva la base.</div>
                <div className="mt-3 text-3xl font-black">{safeN}<sup>1</sup> = {safeN}</div>
              </div>
            </div>

            <Panel>
              <div className="font-black text-xl text-center mb-3">1 en la recta</div>
              <div className="number-line-shell w-full max-w-full min-w-0 overflow-x-auto overflow-y-hidden pb-2">
                <div className="w-full min-w-[360px] max-w-full">
                  <NumberLineVisual visual={{ type: 'number-line', start: -2, end: 5, current: 0, jump: 1 }} />
                </div>
              </div>
            </Panel>
          </div>
        )}

        {sub === 'cero' && (
          <div className="space-y-4">
            <div className="grid lg:grid-cols-[330px_minmax(0,1fr)] gap-4">
              <div className="p-5 rounded-3xl border-2 shadow text-center" style={box(colors.zero)}>
                <div className="text-7xl font-black">0</div>
                <div className="font-black text-xl">Cero</div>
                <div className="text-sm font-bold opacity-75 mt-2">Puede significar vacío, origen o posición.</div>
              </div>

              <Panel>
                <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-4">
                  <div className="p-4 rounded-3xl border-2 text-center" style={box(colors.zero)}>
                    <div className="text-6xl">📦</div>
                    <div className="font-black">Caja vacía</div>
                    <div className="text-sm font-bold opacity-75">No hay objetos.</div>
                  </div>
                  <div className="p-4 rounded-3xl border-2 text-center" style={box(colors.real)}>
                    <div className="text-6xl">📍</div>
                    <div className="font-black">Origen</div>
                    <div className="text-sm font-bold opacity-75">En la recta, separa izquierda y derecha.</div>
                  </div>
                  <div className="p-4 rounded-3xl border-2 text-center" style={box(colors.system)}>
                    <div className="text-6xl">🏛️</div>
                    <div className="font-black">Guarda lugar</div>
                    <div className="text-sm font-bold opacity-75">En 105, dice “no hay decenas”.</div>
                  </div>
                </div>
              </Panel>
            </div>

            <Panel>
              <div className="number-line-shell w-full max-w-full min-w-0 overflow-x-auto overflow-y-hidden pb-2">
                <div className="w-full min-w-[360px] max-w-full">
                  <NumberLineVisual visual={{ type: 'number-line', start: -5, end: 5, current: 0, jump: 0 }} />
                </div>
              </div>
            </Panel>
          </div>
        )}

        {sub === 'simbolos0' && (
          <div className="space-y-4">
            <BigIdea title="El cero no siempre existió como símbolo" icon="⭕" color={colors.zero}>
              Muchas culturas podían hablar de ausencia, pero no todas tenían un símbolo posicional como nuestro 0. El cero moderno es poderoso porque también guarda columnas.
            </BigIdea>

            <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
              {zeroSymbols.map(item => (
                <SymbolCard
                  key={item.title}
                  title={item.title}
                  symbol={item.symbol}
                  note={item.note}
                  detail={item.detail}
                  color={item.color}
                />
              ))}
            </div>
          </div>
        )}

        {sub === 'porque0' && (
          <div className="space-y-4">
            <BigIdea title="¿Por qué existe el 0?" icon="📦" color={colors.zero}>
              El 0 existe porque también necesitamos hablar de lo que no está: una caja vacía, una deuda saldada, ningún paso, ninguna decena, ningún objeto.
            </BigIdea>

            <div className="grid gap-4">
              {[
                ['📦', 'Vacío', 'Si una caja no tiene juguetes, necesitamos una forma de decir “hay cero juguetes”.', colors.zero],
                ['📍', 'Origen', 'En la recta, el cero es un punto de referencia: a la derecha positivos, a la izquierda negativos.', colors.real],
                ['🏛️', 'Posición', 'En 105, el cero no se ignora: avisa que no hay decenas y conserva el lugar del 1 y del 5.', colors.system],
                ['🧾', 'Balance', 'Si debía 3 y pago 3, mi deuda queda en 0. El cero puede significar equilibrio.', colors.negative],
                ['💻', 'Estado', 'En binario, 0 puede representar apagado, falso o ausencia de señal.', colors.imaginary],
              ].map(([icon, title, text, color], i) => (
                <IdeaStep key={String(title)} icon={String(icon)} title={String(title)} text={String(text)} color={String(color)} index={i + 1} />
              ))}
            </div>
          </div>
        )}

        {sub === 'mat0' && (
          <div className="space-y-4">
            <BigIdea title="El 0 dentro de la matemática" icon="🏛️" color={colors.zero}>
              El 0 tiene varias reglas. Algunas son tranquilas, como sumar cero. Otras son delicadas, como dividir entre cero.
            </BigIdea>

            <NumberInput
              label="Número de prueba"
              value={zeroOneNumber}
              setValue={(v) => setZeroOneNumber(Math.max(1, Math.min(999, Math.floor(v))))}
              min={1}
              max={999}
              color="#8b5cf6"
            />

            <div className="grid md:grid-cols-2 gap-3">
              <div className="p-5 rounded-3xl border-2 shadow text-center" style={box(colors.zero)}>
                <div className="text-5xl mb-2">➕</div>
                <div className="text-3xl font-black">{safeN} + 0 = {safeN}</div>
                <div className="text-sm font-bold opacity-75 mt-2">Sumar cero no cambia la cantidad.</div>
              </div>

              <div className="p-5 rounded-3xl border-2 shadow text-center" style={box(colors.zero)}>
                <div className="text-5xl mb-2">➖</div>
                <div className="text-3xl font-black">{safeN} − 0 = {safeN}</div>
                <div className="text-sm font-bold opacity-75 mt-2">Quitar cero no quita nada.</div>
              </div>

              <div className="p-5 rounded-3xl border-2 shadow text-center" style={box(colors.negative)}>
                <div className="text-5xl mb-2">✖️</div>
                <div className="text-3xl font-black">{safeN} × 0 = 0</div>
                <div className="text-sm font-bold opacity-75 mt-2">Cero grupos de algo producen cero.</div>
              </div>

              <div className="p-5 rounded-3xl border-2 shadow text-center" style={box('#ef4444')}>
                <div className="text-5xl mb-2">⚠️</div>
                <div className="text-3xl font-black">{safeN} ÷ 0</div>
                <div className="text-sm font-bold opacity-75 mt-2">No se define en aritmética común: no puedes repartir entre cero grupos.</div>
              </div>
            </div>

            <Panel>
              <div className="font-black text-xl mb-3 text-center">Cero como guardián de columnas</div>
              <NumberInput
                label="Número para mirar columnas"
                value={zeroOneNumber}
                setValue={(v) => setZeroOneNumber(Math.max(0, Math.min(999, Math.floor(v))))}
                min={0}
                max={999}
                color="#38bdf8"
              />

              <div className="text-center text-7xl font-black my-4">{n}</div>
              <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-4">
                <DigitBox label="Centenas" digit={hundreds} value={100} color="#84cc16" note={hundreds === 0 ? 'El 0 dice: no hay centenas.' : 'Aquí el dígito vale grupos de 100.'} />
                <DigitBox label="Decenas" digit={tens} value={10} color="#0ea5e9" note={tens === 0 ? 'El 0 dice: no hay decenas.' : 'Aquí el dígito vale grupos de 10.'} />
                <DigitBox label="Unidades" digit={units} value={1} color="#f59e0b" note={units === 0 ? 'El 0 dice: no hay unidades.' : 'Aquí el dígito vale unidades sueltas.'} />
              </div>
            </Panel>
          </div>
        )}

        {sub === 'binario' && (
          <div className="space-y-4">
            <BigIdea title="0 y 1 como interruptores" icon="💻" color="#14b8a6">
              En computación, 0 y 1 pueden verse como dos estados: apagado/encendido, no/sí, falso/verdadero. Con solo dos símbolos se puede construir muchísima información.
            </BigIdea>

            <div className="grid md:grid-cols-2 gap-3">
              <div className="p-5 rounded-3xl border-2 shadow text-center" style={box(colors.zero)}>
                <div className="text-7xl">0</div>
                <div className="font-black text-xl">apagado</div>
                <div className="text-sm font-bold opacity-75">no pasa corriente / falso / ausencia</div>
              </div>
              <div className="p-5 rounded-3xl border-2 shadow text-center" style={box(colors.count)}>
                <div className="text-7xl">1</div>
                <div className="font-black text-xl">encendido</div>
                <div className="text-sm font-bold opacity-75">pasa corriente / verdadero / presencia</div>
              </div>
            </div>

            <Panel>
              <div className="font-black text-xl mb-3 text-center">Ejemplo: contar en binario</div>
              <div className="grid md:grid-cols-2 2xl:grid-cols-4 gap-4">
                {[
                  ['0', '0'],
                  ['1', '1'],
                  ['2', '10'],
                  ['3', '11'],
                  ['4', '100'],
                  ['5', '101'],
                  ['6', '110'],
                  ['7', '111'],
                ].map(([dec, bin]) => (
                  <div key={dec} className="p-4 rounded-3xl border-2 text-center" style={box('#14b8a6')}>
                    <div className="text-xs font-black uppercase opacity-70">decimal {dec}</div>
                    <div className="text-4xl font-black">{bin}</div>
                  </div>
                ))}
              </div>
            </Panel>
          </div>
        )}

        {sub === 'historia' && (
          <div className="space-y-4">
            <div className="grid gap-4">
              {[
                ['✋', 'Primero: la unidad', 'Antes de símbolos complicados, una persona podía señalar una cosa: una piedra, una oveja, una marca.', colors.count],
                ['🪨', 'Después: fichas y marcas', 'Una piedra o una raya podía representar un objeto. Eso permitió recordar cantidades sin tener los objetos enfrente.', '#64748b'],
                ['📦', 'Luego: el vacío', 'También hacía falta decir “no hay”. Esa idea parece simple, pero matemáticamente es enorme.', colors.zero],
                ['🏛️', 'Cero posicional', 'El cero permitió escribir números grandes sin inventar símbolos infinitos. En 1005, los ceros guardan columnas.', colors.system],
                ['🌍', 'Muchos símbolos, misma idea', 'Cada cultura escribió el 1 y el 0 a su manera. Lo importante es distinguir el símbolo de la idea.', colors.rational],
                ['💻', 'Hoy: 0 y 1 también viven en computadoras', 'El binario usa solo 0 y 1. Con dos símbolos se puede representar información, imágenes, sonidos y programas.', colors.imaginary],
              ].map(([icon, title, text, color], i) => (
                <IdeaStep key={String(title)} icon={String(icon)} title={String(title)} text={String(text)} color={String(color)} index={i + 1} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };








  const renderFamilias = () => {
    const selected = familyData[selectedFamily];

    return (
      <div className="space-y-4">
        <BigIdea title="Familias de números" icon="🌳" color={colors.rational}>
          Un número puede pertenecer a una familia. Algunas familias están dentro de otras. No necesitas dominar todo hoy: primero reconoce el mapa.
        </BigIdea>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {Object.entries(familyData).map(([key, item]) => (
            <button
              key={key}
              onClick={() => setSelectedFamily(key)}
              className={`p-3 rounded-2xl border-2 font-black text-xs transition-all hover:scale-105 ${
                selectedFamily === key ? 'scale-105 shadow-lg' : 'bg-surface-color border-border-color'
              }`}
              style={selectedFamily === key ? box(item.color) : {}}
            >
              <span className="text-2xl block mb-1">{item.icon}</span>
              {item.name}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-[minmax(0,330px)_minmax(0,1fr)] gap-4">
          <div className="p-5 rounded-3xl border-2 shadow text-center" style={box(selected.color)}>
            <div className="text-6xl mb-2">{selected.icon}</div>
            <div className="font-black text-2xl">{selected.name}</div>
            <div className="mt-3 text-sm font-bold opacity-85">{selected.short}</div>
            <div className="mt-3 p-3 rounded-2xl bg-surface-color/90 border border-border-color font-black">
              {selected.example}
            </div>
          </div>
          <Panel>
            {selected.visual}
          </Panel>
        </div>
      </div>
    );
  };

  const opColor = (id: string) => {
    if (id === 'suma') return colors.count;
    if (id === 'resta') return colors.negative;
    if (id === 'llevando') return '#22c55e';
    if (id === 'sumas-avanzadas') return '#16a34a';
    if (id === 'resta-prestando') return '#ef4444';
    if (id === 'multiplicacion') return '#8b5cf6';
    if (id === 'multi-digitos') return '#7c3aed';
    if (id === 'division') return '#0ea5e9';
    if (id === 'potencia') return '#7c3aed';
    if (id === 'raiz') return '#ec4899';
    if (id === 'fracciones') return colors.fraction;
    if (id === 'negativos') return colors.negative;
    if (id === 'propiedades') return colors.system;
    if (id === 'no-mezclar') return '#f97316';
    return '#8b5cf6';
  };

  const opData: Record<string, { icon: string; label: string; short: string; action: string }> = {
    mapa: {
      icon: '🧭',
      label: 'Mapa',
      short: 'Vista general',
      action: 'Cada operación es una acción distinta sobre cantidades.',
    },
    suma: {
      icon: '➕',
      label: 'Suma',
      short: 'Juntar / avanzar',
      action: 'Juntar cantidades del mismo tipo o avanzar en la recta.',
    },
    resta: {
      icon: '➖',
      label: 'Resta',
      short: 'Quitar / retroceder',
      action: 'Quitar, comparar o retroceder en la recta.',
    },
    llevando: {
      icon: '📈',
      label: 'Llevando',
      short: '10 unidades = 1 decena',
      action: 'Cuando una columna llega a 10 o más, se reagrupa hacia la columna siguiente.',
    },
    'sumas-avanzadas': {
      icon: '🏛️',
      label: 'Sumas largas',
      short: 'Varios números',
      action: 'Sumar varios números acomodándolos por unidades, decenas, centenas y millares.',
    },
    'resta-prestando': {
      icon: '🔁',
      label: 'Prestando',
      short: 'Reagrupar al restar',
      action: 'Cuando arriba no alcanza, se cambia una columna mayor por 10 de la columna menor.',
    },
    multiplicacion: {
      icon: '✖️',
      label: 'Producto',
      short: 'Grupos iguales',
      action: 'Repetir grupos iguales de forma rápida.',
    },
    'multi-digitos': {
      icon: '🧮',
      label: 'Multi dígitos',
      short: '2x2, 1x3, 2x3',
      action: 'Multiplicar por columnas: unidades, decenas y productos parciales.',
    },
    division: {
      icon: '➗',
      label: 'Cociente',
      short: 'Repartir',
      action: 'Repartir en grupos iguales o preguntar cuántas veces cabe.',
    },
    potencia: {
      icon: '⬛',
      label: 'Potencia',
      short: 'Repetir factores',
      action: 'Repetir multiplicación usando la misma base.',
    },
    raiz: {
      icon: '√',
      label: 'Raíz',
      short: 'Buscar lado',
      action: 'Buscar qué lado forma un cuadrado con cierta cantidad.',
    },
    fracciones: {
      icon: '🍕',
      label: 'Fracción',
      short: 'Partes / reparto',
      action: 'Partir una unidad o representar una división.',
    },
    negativos: {
      icon: '↔️',
      label: 'Negativos',
      short: 'Opuesto',
      action: 'Caminar hacia la izquierda del cero o representar deuda.',
    },
    propiedades: {
      icon: '🧠',
      label: 'Propiedades',
      short: 'Reglas útiles',
      action: 'Patrones que permiten calcular más fácil.',
    },
    'no-mezclar': {
      icon: '🐱',
      label: 'No mezclar',
      short: 'Etiquetas',
      action: 'No cambiar la etiqueta de los objetos al sumar.',
    },
  };

  const clampNum = (v: number, min: number, max: number) => Math.max(min, Math.min(max, Math.floor(v)));

  const digitsOf = (num: number, width: number) =>
    String(Math.max(0, Math.floor(num))).padStart(width, '0').split('').map(Number);

  const placeNames = ['DM', 'UM', 'C', 'D', 'U'];

  const operationResult = () => {
    const safeB = Math.max(1, b);
    const c = opC ?? 521;

    if (op === 'suma') return a + b;
    if (op === 'resta') return a - b;
    if (op === 'llevando') return clampNum(a, 10, 999) + clampNum(b, 10, 999);
    if (op === 'sumas-avanzadas') return clampNum(a, 0, 9999) + clampNum(b, 0, 9999) + clampNum(c, 0, 9999);
    if (op === 'resta-prestando') return clampNum(a, 0, 9999) - clampNum(b, 0, 9999);
    if (op === 'multiplicacion') return a * b;
    if (op === 'multi-digitos') return clampNum(a, 0, 999) * clampNum(b, 0, 99);
    if (op === 'division') return Number((a / safeB).toFixed(2));
    if (op === 'potencia') return Math.pow(a, b);
    if (op === 'raiz') return Number(Math.sqrt(Math.max(0, a)).toFixed(3));
    if (op === 'fracciones') return `${Math.min(a, Math.max(1, b))}/${Math.max(1, b)}`;
    if (op === 'negativos') return -a;
    return '';
  };

  const operationText = () => {
    const safeB = Math.max(1, b);
    const c = opC ?? 521;

    if (op === 'mapa') return 'elige una máquina';
    if (op === 'suma') return `${a} + ${b} = ${operationResult()}`;
    if (op === 'resta') return `${a} − ${b} = ${operationResult()}`;
    if (op === 'llevando') return `${clampNum(a, 10, 999)} + ${clampNum(b, 10, 999)} = ${operationResult()}`;
    if (op === 'sumas-avanzadas') return `${clampNum(a, 0, 9999)} + ${clampNum(b, 0, 9999)} + ${clampNum(c, 0, 9999)} = ${operationResult()}`;
    if (op === 'resta-prestando') return `${clampNum(a, 0, 9999)} − ${clampNum(b, 0, 9999)} = ${operationResult()}`;
    if (op === 'multiplicacion') return `${a} × ${b} = ${operationResult()}`;
    if (op === 'multi-digitos') return `${clampNum(a, 0, 999)} × ${clampNum(b, 0, 99)} = ${operationResult()}`;
    if (op === 'division') return `${a} ÷ ${safeB} = ${operationResult()}`;
    if (op === 'potencia') return `${a}^${b} = ${operationResult()}`;
    if (op === 'raiz') return `√${a} ≈ ${operationResult()}`;
    if (op === 'fracciones') return `${Math.min(a, safeB)} / ${safeB}`;
    if (op === 'negativos') return `opuesto de ${a} = ${operationResult()}`;
    if (op === 'propiedades') return 'reglas que conservan la idea';
    return 'misma categoría antes de sumar';
  };

  const OpStep = ({ n, icon, title, text, color }: { n: number; icon: string; title: string; text: string; color: string }) => (
    <div className="p-4 rounded-3xl border-2 shadow hover:scale-[1.01] transition-all min-w-0 overflow-hidden" style={box(color)}>
      <div className="text-4xl mb-1">{icon}</div>
      <div className="text-xs font-black uppercase opacity-70">Paso {n}</div>
      <div className="font-black text-xl leading-tight break-words">{title}</div>
      <div className="text-sm font-bold opacity-80 leading-relaxed mt-1 break-words">{text}</div>
    </div>
  );

  const CountBox = ({ title, count, icon, color, note }: { title: string; count: number; icon: string; color: string; note?: string }) => (
    <div className="p-4 rounded-3xl border-2 shadow text-center min-w-0" style={box(color)}>
      <div className="font-black text-lg mb-2">{title}</div>
      <div className="min-h-20 flex items-center justify-center">
        {objectRow(Math.max(0, Math.min(count, 30)), icon)}
      </div>
      <div className="mt-2 font-black text-xl">{count}</div>
      {note && <div className="text-xs font-bold opacity-75 mt-1">{note}</div>}
    </div>
  );

  const TinyUnit = ({ color = '#f59e0b', small = false }: { color?: string; small?: boolean }) => (
    <div
      className={`${small ? 'w-5 h-5' : 'w-6 h-6'} rounded-full border-2 shadow-sm shrink-0`}
      style={{ borderColor: color, background: `${color}66` }}
    />
  );

  const TenBar = ({ color = '#0ea5e9' }: { color?: string }) => (
    <div
      className="w-9 h-20 rounded-2xl border-4 shadow-sm shrink-0"
      style={{ borderColor: color, background: `${color}55` }}
    />
  );

  const PlaceHeader = ({ width = 4 }: { width?: number }) => {
    const names = placeNames.slice(placeNames.length - width);
    return (
      <div className="grid gap-1 text-center text-xs font-black opacity-70" style={{ gridTemplateColumns: `repeat(${width}, minmax(42px, 1fr))` }}>
        {names.map(x => <div key={x}>{x}</div>)}
      </div>
    );
  };

  const ColumnNumber = ({ value, width, color = '#8b5cf6' }: { value: number; width: number; color?: string }) => {
    const ds = digitsOf(value, width);
    return (
      <div className="grid gap-1 text-center font-black text-2xl" style={{ gridTemplateColumns: `repeat(${width}, minmax(42px, 1fr))` }}>
        {ds.map((d, i) => (
          <div key={i} className="p-2 rounded-xl bg-surface-color/80 border-2 border-border-color" style={{ borderColor: d ? color : undefined }}>
            {d}
          </div>
        ))}
      </div>
    );
  };

  const operationVisual = () => {
    const safeB = Math.max(1, b);

    if (op === 'mapa') {
      return (
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-4">
            <OpStep n={1} icon="👀" title="Mira la acción" text="Pregunta: ¿junta, quita, repite, reparte, eleva, parte o reagrupa?" color="#8b5cf6" />
            <OpStep n={2} icon="🏷️" title="Mira la etiqueta" text="Manzanas con manzanas, gatos con gatos. Si son distintos, busca una categoría común." color="#f97316" />
            <OpStep n={3} icon="🏛️" title="Mira las columnas" text="En operaciones largas, acomoda unidades con unidades, decenas con decenas, centenas con centenas." color="#0ea5e9" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3">
            {Object.entries(opData).filter(([id]) => id !== 'mapa').map(([id, item]) => (
              <button
                key={id}
                onClick={() => setOp(id)}
                className="p-4 rounded-3xl border-2 text-left shadow hover:scale-[1.03] transition-all"
                style={box(opColor(id))}
              >
                <div className="text-4xl mb-1">{item.icon}</div>
                <div className="font-black text-xl">{item.label}</div>
                <div className="text-xs font-black opacity-70 uppercase">{item.short}</div>
                <div className="text-sm font-bold opacity-80 mt-2 leading-relaxed">{item.action}</div>
              </button>
            ))}
          </div>
        </div>
      );
    }

    if (op === 'suma') {
      return (
        <div className="space-y-4">
          <BigIdea title="Suma / adición" icon="➕" color={colors.count}>
            Sumar es juntar cantidades compatibles. También puede verse como avanzar en la recta numérica.
          </BigIdea>

          <div className="number-line-shell w-full max-w-full min-w-0 overflow-x-auto overflow-y-hidden pb-2">
            <div className="w-full min-w-[360px] max-w-full">
              <NumberLineVisual visual={{ type: 'number-line', start: 0, end: Math.max(10, a + b + 2), current: a, jump: b }} />
            </div>
          </div>

          <div className="grid md:grid-cols-[1fr_60px_1fr_60px_1fr] gap-2 items-center">
            <CountBox title="Primer grupo" count={a} icon="🍎" color={colors.count} />
            <div className="text-4xl text-center animate-pulse">+</div>
            <CountBox title="Segundo grupo" count={b} icon="🍎" color={colors.count} />
            <div className="text-4xl text-center animate-pulse">=</div>
            <CountBox title="Total" count={a + b} icon="🍎" color="#16a34a" note="misma etiqueta: manzanas" />
          </div>
        </div>
      );
    }

    if (op === 'resta') {
      return (
        <div className="space-y-4">
          <BigIdea title="Resta / sustracción" icon="➖" color={colors.negative}>
            Restar puede significar quitar, comparar o retroceder. En la recta, restar mueve hacia la izquierda.
          </BigIdea>

          <div className="number-line-shell w-full max-w-full min-w-0 overflow-x-auto overflow-y-hidden pb-2">
            <div className="w-full min-w-[360px] max-w-full">
              <NumberLineVisual visual={{ type: 'number-line', start: Math.min(0, a - b - 2), end: Math.max(10, a + 2), current: a, jump: -b }} />
            </div>
          </div>

          <div className="grid md:grid-cols-[1fr_60px_1fr_60px_1fr] gap-2 items-center">
            <CountBox title="Tenías" count={a} icon="🍪" color="#f97316" />
            <div className="text-4xl text-center animate-pulse">−</div>
            <CountBox title="Quitas" count={b} icon="🍪" color="#ef4444" />
            <div className="text-4xl text-center animate-pulse">=</div>
            <CountBox title="Quedan" count={a - b} icon="🍪" color={colors.negative} />
          </div>
        </div>
      );
    }

    if (op === 'llevando') {
      const n1 = clampNum(a, 10, 999);
      const n2 = clampNum(b, 10, 999);
      const total = n1 + n2;

      const baseWidth = Math.max(String(n1).length, String(n2).length);
      const resultWidth = Math.max(baseWidth, String(total).length);
      const labels = placeNames.slice(placeNames.length - resultWidth);

      const topDigits = digitsOf(n1, resultWidth);
      const bottomDigits = digitsOf(n2, resultWidth);
      const resultDigits = digitsOf(total, resultWidth);

      let carry = 0;
      const colSteps: {
        idx: number;
        label: string;
        top: number;
        bottom: number;
        carryIn: number;
        raw: number;
        write: number;
        carryOut: number;
      }[] = [];

      for (let i = resultWidth - 1; i >= 0; i--) {
        const top = topDigits[i];
        const bottom = bottomDigits[i];
        const carryIn = carry;
        const raw = top + bottom + carryIn;
        const write = raw % 10;
        const carryOut = Math.floor(raw / 10);

        colSteps.unshift({
          idx: i,
          label: labels[i],
          top,
          bottom,
          carryIn,
          raw,
          write,
          carryOut,
        });

        carry = carryOut;
      }

      const visibleSteps = colSteps.filter(st => st.top !== 0 || st.bottom !== 0 || st.carryIn !== 0 || st.carryOut !== 0 || st.idx === resultWidth - 1);
      const carryIntoColumn = colSteps.map(st => st.carryIn);

      const ExplainCarryStep = ({ st, order }: { st: typeof colSteps[number]; order: number }) => {
        const toLeft = st.idx > 0 ? labels[st.idx - 1] : 'una columna nueva';
        const hasCarryIn = st.carryIn > 0;
        const hasCarryOut = st.carryOut > 0;

        return (
          <div className="p-4 rounded-3xl border-2 shadow min-w-[300px]" style={box(hasCarryOut ? '#22c55e' : '#0ea5e9')}>
            <div className="flex items-center gap-3 mb-2">
              <div className="text-4xl">{hasCarryOut ? '📦' : '✍️'}</div>
              <div>
                <div className="text-xs font-black uppercase opacity-70">Paso {order}</div>
                <div className="font-black text-xl leading-tight">Columna {st.label}</div>
              </div>
            </div>

            <div className="text-sm font-bold opacity-85 leading-relaxed">
              <div>
                {st.top} + {st.bottom}{hasCarryIn ? <> + acarreo {st.carryIn}</> : null} = <b>{st.raw}</b>
              </div>

              {hasCarryOut ? (
                <div className="mt-2">
                  Como {st.raw} tiene dos cifras, escribes <b>{st.write}</b> aquí y mandas <b>{st.carryOut}</b> a <b>{toLeft}</b>.
                </div>
              ) : (
                <div className="mt-2">
                  Escribes <b>{st.write}</b> en esta columna. No hay acarreo nuevo.
                </div>
              )}
            </div>
          </div>
        );
      };

      return (
        <div className="space-y-5 min-w-0">
          <BigIdea title="Acarreo o llevada" icon="📈" color="#22c55e">
            El acarreo, también llamado llevada, aparece cuando una columna suma 10 o más. Escribes la cifra de la derecha y llevas la cifra de la izquierda a la columna vecina.
          </BigIdea>

          <div className="flex gap-2 flex-wrap">
            <button onClick={() => { setA(99); setB(1); }} className="px-4 py-2 rounded-2xl font-black bg-emerald-500 text-white shadow hover:scale-105 transition-all">
              99 + 1
            </button>
            <button onClick={() => { setA(999); setB(3); }} className="px-4 py-2 rounded-2xl font-black bg-emerald-500 text-white shadow hover:scale-105 transition-all">
              999 + 3
            </button>
            <button onClick={() => { setA(527); setB(486); }} className="px-4 py-2 rounded-2xl font-black bg-surface-color border-2 border-border-color shadow hover:scale-105 transition-all">
              527 + 486
            </button>
            <button onClick={() => { setA(345); setB(678); }} className="px-4 py-2 rounded-2xl font-black bg-surface-color border-2 border-border-color shadow hover:scale-105 transition-all">
              345 + 678
            </button>
          </div>

          <div className="grid xl:grid-cols-[minmax(620px,1fr)_minmax(520px,680px)] gap-5 items-start min-w-0">
            <div className="space-y-4 min-w-0">
              <div className="grid lg:grid-cols-3 gap-3">
                <div className="p-4 rounded-3xl border-2 shadow" style={box('#f59e0b')}>
                  <div className="text-4xl mb-2">🟡</div>
                  <div className="font-black text-xl">1. Suma una columna</div>
                  <div className="text-sm font-bold opacity-80 leading-relaxed">
                    Empieza siempre por la derecha: unidades, luego decenas, luego centenas.
                  </div>
                </div>

                <div className="p-4 rounded-3xl border-2 shadow" style={box('#22c55e')}>
                  <div className="text-4xl mb-2">📦</div>
                  <div className="font-black text-xl">2. Si sale 10 o más</div>
                  <div className="text-sm font-bold opacity-80 leading-relaxed">
                    La cifra de la derecha se queda. La cifra de la izquierda se acarrea.
                  </div>
                </div>

                <div className="p-4 rounded-3xl border-2 shadow" style={box('#0ea5e9')}>
                  <div className="text-4xl mb-2">⬅️</div>
                  <div className="font-black text-xl">3. Va a la izquierda</div>
                  <div className="text-sm font-bold opacity-80 leading-relaxed">
                    El acarreo se suma en la siguiente columna, no se pierde.
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-3xl border-2 shadow" style={box('#22c55e')}>
                <div className="font-black text-xl mb-3">Pasos del ejemplo {n1} + {n2}</div>
                <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                  {visibleSteps.map((st, i) => (
                    <ExplainCarryStep key={st.idx} st={st} order={i + 1} />
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-3xl border-2 shadow" style={box('#8b5cf6')}>
                <div className="font-black text-xl mb-2">Regla corta</div>
                <div className="text-sm font-bold opacity-85 leading-relaxed">
                  Si una columna da 12, escribes 2 y acarreas 1. Si da 10, escribes 0 y acarreas 1. Si da 18, escribes 8 y acarreas 1.
                </div>
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow overflow-x-auto max-w-full min-h-[500px]">
              <div className="min-w-[560px] font-mono space-y-3">
                <div className="text-center font-black text-xl mb-2">Suma en columnas</div>

                <div className="grid gap-2 text-center text-xs font-black opacity-70" style={{ gridTemplateColumns: 'repeat(' + resultWidth + ', minmax(72px, 1fr))' }}>
                  {labels.map(label => (
                    <div key={label}>{label}</div>
                  ))}
                </div>

                <div className="grid gap-2 text-center text-sm font-black text-emerald-400 min-h-[34px]" style={{ gridTemplateColumns: 'repeat(' + resultWidth + ', minmax(72px, 1fr))' }}>
                  {carryIntoColumn.map((c, i) => (
                    <div key={i} className={c ? 'p-1 rounded-xl bg-emerald-500/20 border border-emerald-500/40' : 'p-1'}>
                      {c ? `acarreo ${c}` : ''}
                    </div>
                  ))}
                </div>

                <div className="grid gap-2 text-center font-black text-3xl" style={{ gridTemplateColumns: 'repeat(' + resultWidth + ', minmax(72px, 1fr))' }}>
                  {topDigits.map((d, i) => (
                    <div key={i} className="p-3 rounded-2xl bg-surface-color/80 border-2 border-border-color">
                      {d}
                    </div>
                  ))}
                </div>

                <div className="grid gap-2 text-center font-black text-3xl" style={{ gridTemplateColumns: '42px repeat(' + resultWidth + ', minmax(72px, 1fr))' }}>
                  <div className="p-3">+</div>
                  {bottomDigits.map((d, i) => (
                    <div key={i} className="p-3 rounded-2xl bg-surface-color/80 border-2 border-border-color">
                      {d}
                    </div>
                  ))}
                </div>

                <hr className="border-t-4 border-slate-400 my-3" />

                <div className="grid gap-2 text-center font-black text-3xl" style={{ gridTemplateColumns: 'repeat(' + resultWidth + ', minmax(72px, 1fr))' }}>
                  {resultDigits.map((d, i) => (
                    <div key={i} className="p-3 rounded-2xl border-2 border-emerald-500 bg-emerald-500/10 text-emerald-300">
                      {d}
                    </div>
                  ))}
                </div>

                <div className="mt-4 p-4 rounded-3xl border-2 border-emerald-500/40 bg-emerald-500/10 text-center">
                  <div className="text-xs font-black uppercase opacity-70">Resultado</div>
                  <div className="text-4xl font-black">{n1} + {n2} = {total}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }




    if (op === 'sumas-avanzadas') {
      const n1 = clampNum(a, 0, 9999);
      const n2 = clampNum(b, 0, 9999);
      const n3 = clampNum(opC ?? 521, 0, 9999);
      const nums = [n1, n2, n3];
      const total = nums.reduce((acc, n) => acc + n, 0);
      const width = Math.max(4, String(total).length);
      const rows = nums.map(n => digitsOf(n, width));
      const labels = placeNames.slice(placeNames.length - width);

      let carry = 0;
      const colInfo: { label: string; sum: number; digit: number; carryOut: number }[] = [];
      for (let i = width - 1; i >= 0; i--) {
        const colSum = rows.reduce((acc, row) => acc + row[i], 0) + carry;
        const digit = colSum % 10;
        const carryOut = Math.floor(colSum / 10);
        colInfo.unshift({ label: labels[i], sum: colSum, digit, carryOut });
        carry = carryOut;
      }

      return (
        <div className="space-y-4">
          <BigIdea title="Sumas avanzadas: varios números" icon="🏛️" color="#16a34a">
            Para sumar varios números, acomoda las columnas. Unidades con unidades, decenas con decenas, centenas con centenas. Luego resuelves de derecha a izquierda.
          </BigIdea>

          <div className="flex gap-2 flex-wrap">
            <button onClick={() => { setA(1000); setB(524); setOpC(521); }} className="px-4 py-2 rounded-2xl font-black bg-emerald-500 text-white shadow hover:scale-105 transition-all">
              Ejemplo 1000 + 524 + 521
            </button>
            <button onClick={() => { setA(789); setB(456); setOpC(123); }} className="px-4 py-2 rounded-2xl font-black bg-surface-color border-2 border-border-color shadow hover:scale-105 transition-all">
              789 + 456 + 123
            </button>
            <button onClick={() => { setA(999); setB(999); setOpC(999); }} className="px-4 py-2 rounded-2xl font-black bg-surface-color border-2 border-border-color shadow hover:scale-105 transition-all">
              999 + 999 + 999
            </button>
          </div>

          <div className="grid xl:grid-cols-[minmax(620px,1fr)_minmax(520px,680px)] gap-5">
            <div className="space-y-3">
              <div className="grid md:grid-cols-2 2xl:grid-cols-4 gap-4">
                {colInfo.map((c, i) => (
                  <OpStep
                    key={c.label}
                    n={i + 1}
                    icon={c.carryOut ? '📦' : '✍️'}
                    title={`Columna ${c.label}`}
                    text={`Suma de columna: ${c.sum}. Escribes ${c.digit}${c.carryOut ? ` y llevas ${c.carryOut}` : ''}.`}
                    color={c.carryOut ? '#16a34a' : '#0ea5e9'}
                  />
                ))}
              </div>

              <div className="p-4 rounded-3xl border-2 shadow" style={box('#16a34a')}>
                <div className="font-black text-xl mb-2">Lectura del ejemplo</div>
                <div className="text-sm font-bold opacity-85 leading-relaxed">
                  No sumes “todo junto” visualmente. Primero alinea las columnas. Después resuelves de derecha a izquierda. Las llevadas suben a la siguiente columna.
                </div>
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow overflow-x-auto max-w-full min-h-[420px]">
              <div className="min-w-[520px] font-mono">
                <PlaceHeader width={width} />
                <div className="mt-2 space-y-2">
                  {nums.map((num, rowIndex) => (
                    <div key={rowIndex} className="grid gap-1 text-center font-black text-2xl" style={{ gridTemplateColumns: `36px repeat(${width}, minmax(42px, 1fr))` }}>
                      <div>{rowIndex === 0 ? '' : '+'}</div>
                      {digitsOf(num, width).map((d, i) => (
                        <div key={i} className="p-2 rounded-xl bg-surface-color/80 border-2 border-border-color">{d}</div>
                      ))}
                    </div>
                  ))}
                  <hr className="border-t-4 border-slate-400 my-2" />
                  <ColumnNumber value={total} width={Math.max(width, String(total).length)} color="#16a34a" />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (op === 'resta-prestando') {
      const top = clampNum(a, 0, 9999);
      const bottom = clampNum(b, 0, 9999);
      const canSubtract = top >= bottom;
      const big = canSubtract ? top : bottom;
      const small = canSubtract ? bottom : top;
      const width = Math.max(4, String(big).length);
      const originalTop = digitsOf(big, width);
      const subDigits = digitsOf(small, width);
      const work = [...originalTop];
      const expanded = [...originalTop];
      const notes: string[] = [];

      for (let i = width - 1; i >= 0; i--) {
        if (work[i] < subDigits[i]) {
          let j = i - 1;
          while (j >= 0 && work[j] === 0) j--;

          if (j >= 0) {
            work[j] -= 1;
            for (let k = j + 1; k < i; k++) work[k] += 9;
            work[i] += 10;
            notes.push(`En ${placeNames.slice(placeNames.length - width)[i]}, arriba no alcanza. Se pide prestado desde una columna mayor.`);
          }
        }

        expanded[i] = work[i];
        work[i] = work[i] - subDigits[i];
      }

      const result = big - small;

      return (
        <div className="space-y-4">
          <BigIdea title="Resta prestando / reagrupando" icon="🔁" color="#ef4444">
            En resta, “prestar” significa reagrupar. Si en una columna no alcanza, cambias 1 unidad de la columna izquierda por 10 unidades de la columna actual.
          </BigIdea>

          <div className="flex gap-2 flex-wrap">
            <button onClick={() => { setA(1000); setB(524); }} className="px-4 py-2 rounded-2xl font-black bg-red-500 text-white shadow hover:scale-105 transition-all">
              Ejemplo 1000 − 524
            </button>
            <button onClick={() => { setA(302); setB(187); }} className="px-4 py-2 rounded-2xl font-black bg-surface-color border-2 border-border-color shadow hover:scale-105 transition-all">
              302 − 187
            </button>
            <button onClick={() => { setA(7000); setB(4689); }} className="px-4 py-2 rounded-2xl font-black bg-surface-color border-2 border-border-color shadow hover:scale-105 transition-all">
              7000 − 4689
            </button>
          </div>

          {!canSubtract && (
            <div className="p-4 rounded-3xl border-2 border-amber-500 bg-amber-500/10 font-bold text-sm">
              Para explicar préstamo sin negativos, acomodé arriba el número mayor. Si quieres resultado negativo, se trabaja después con la recta numérica.
            </div>
          )}

          <div className="grid xl:grid-cols-[minmax(620px,1fr)_minmax(520px,680px)] gap-5">
            <div className="space-y-3">
              <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-4">
                <OpStep n={1} icon="🏛️" title="Acomoda columnas" text="Unidades debajo de unidades, decenas debajo de decenas, centenas debajo de centenas." color="#ef4444" />
                <OpStep n={2} icon="🔁" title="Reagrupa" text="Si arriba no alcanza, una columna mayor se cambia por 10 de la columna actual." color="#f97316" />
                <OpStep n={3} icon="✍️" title="Resta" text="Después de reagrupar, restas columna por columna de derecha a izquierda." color="#0ea5e9" />
              </div>

              <div className="p-4 rounded-3xl border-2 shadow" style={box('#ef4444')}>
                <div className="font-black text-xl mb-2">Qué pasó</div>
                <div className="space-y-1 text-sm font-bold opacity-85">
                  {notes.length ? notes.map((n, i) => <div key={i}>• {n}</div>) : <div>• No hizo falta pedir prestado: cada columna de arriba alcanzó.</div>}
                  <div>• Resultado: {big} − {small} = {result}</div>
                </div>
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow overflow-x-auto max-w-full min-h-[420px]">
              <div className="min-w-[520px] font-mono">
                <PlaceHeader width={width} />
                <div className="mt-2 space-y-2">
                  <div className="text-xs font-black opacity-70">Original arriba</div>
                  <ColumnNumber value={big} width={width} color="#ef4444" />

                  <div className="text-xs font-black opacity-70 mt-3">Después de prestar</div>
                  <div className="grid gap-1 text-center font-black text-2xl" style={{ gridTemplateColumns: `repeat(${width}, minmax(42px, 1fr))` }}>
                    {expanded.map((d, i) => (
                      <div key={i} className="p-2 rounded-xl bg-red-500/10 border-2 border-red-500/30">{d}</div>
                    ))}
                  </div>

                  <div className="grid gap-1 text-center font-black text-2xl mt-2" style={{ gridTemplateColumns: `36px repeat(${width}, minmax(42px, 1fr))` }}>
                    <div>−</div>
                    {digitsOf(small, width).map((d, i) => (
                      <div key={i} className="p-2 rounded-xl bg-surface-color/80 border-2 border-border-color">{d}</div>
                    ))}
                  </div>

                  <hr className="border-t-4 border-slate-400 my-2" />
                  <ColumnNumber value={result} width={width} color="#16a34a" />
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (op === 'multiplicacion') {
      const groups = Math.max(0, Math.min(a, 12));
      const perGroup = Math.max(0, Math.min(b, 10));

      return (
        <div className="space-y-4">
          <BigIdea title="Producto / multiplicación" icon="✖️" color="#8b5cf6">
            Multiplicar es repetir grupos iguales. También se puede ver como una cuadrícula: filas por columnas.
          </BigIdea>

          <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(105px, 1fr))' }}>
            {Array.from({ length: groups }).map((_, i) => (
              <div key={i} className="p-3 rounded-3xl bg-surface-color border-2 border-border-color text-center">
                <div className="font-black text-xs opacity-70 mb-1">Grupo {i + 1}</div>
                {objectRow(perGroup, '🟣')}
              </div>
            ))}
          </div>

          <div className="p-4 rounded-3xl border-2 text-center" style={box('#8b5cf6')}>
            <div className="font-black text-xl">{a} grupos de {b}</div>
            <div className="text-4xl font-black mt-2">{a} × {b} = {a * b}</div>
          </div>
        </div>
      );
    }

    if (op === 'multi-digitos') {
      const n1 = clampNum(a, 0, 999);
      const n2 = clampNum(b, 0, 99);
      const ones = n2 % 10;
      const tens = Math.floor(n2 / 10);
      const partialOnes = n1 * ones;
      const partialTens = n1 * tens * 10;
      const total = n1 * n2;
      const width = Math.max(4, String(total).length);

      return (
        <div className="space-y-4">
          <BigIdea title="Multiplicación de varios dígitos" icon="🧮" color="#7c3aed">
            En multiplicación larga también hay llevadas. Multiplicas por unidades, luego por decenas, acomodas los productos parciales y finalmente sumas.
          </BigIdea>

          <div className="flex gap-2 flex-wrap">
            <button onClick={() => { setA(23); setB(45); }} className="px-4 py-2 rounded-2xl font-black bg-violet-600 text-white shadow hover:scale-105 transition-all">
              2x2: 23 × 45
            </button>
            <button onClick={() => { setA(123); setB(7); }} className="px-4 py-2 rounded-2xl font-black bg-surface-color border-2 border-border-color shadow hover:scale-105 transition-all">
              1x3: 123 × 7
            </button>
            <button onClick={() => { setA(123); setB(45); }} className="px-4 py-2 rounded-2xl font-black bg-surface-color border-2 border-border-color shadow hover:scale-105 transition-all">
              2x3: 123 × 45
            </button>
          </div>

          <div className="grid xl:grid-cols-[minmax(620px,1fr)_minmax(520px,680px)] gap-5">
            <div className="space-y-3">
              <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-4">
                <OpStep n={1} icon="1️⃣" title="Unidades" text={`Multiplica ${n1} × ${ones} = ${partialOnes}.`} color="#8b5cf6" />
                <OpStep n={2} icon="🔟" title="Decenas" text={tens ? `Multiplica ${n1} × ${tens} decena(s) = ${partialTens}.` : 'No hay decenas en el multiplicador.'} color="#0ea5e9" />
                <OpStep n={3} icon="➕" title="Suma parciales" text={`${partialOnes} + ${partialTens} = ${total}.`} color="#16a34a" />
              </div>

              <div className="p-4 rounded-3xl border-2 shadow" style={box('#7c3aed')}>
                <div className="font-black text-xl mb-2">Llevada en multiplicación</div>
                <div className="text-sm font-bold opacity-85 leading-relaxed">
                  Cuando un producto de columna pasa de 9, escribes la unidad y llevas la decena a la siguiente multiplicación. Es la misma idea de reagrupación que en suma.
                </div>
              </div>
            </div>

            <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow overflow-x-auto max-w-full min-h-[420px]">
              <div className="min-w-[520px] font-mono space-y-2">
                <div className="grid gap-1 text-center font-black text-2xl" style={{ gridTemplateColumns: `36px repeat(${width}, minmax(42px, 1fr))` }}>
                  <div></div>
                  {digitsOf(n1, width).map((d, i) => <div key={i} className="p-2 rounded-xl bg-surface-color/80 border-2 border-border-color">{d}</div>)}
                </div>

                <div className="grid gap-1 text-center font-black text-2xl" style={{ gridTemplateColumns: `36px repeat(${width}, minmax(42px, 1fr))` }}>
                  <div>×</div>
                  {digitsOf(n2, width).map((d, i) => <div key={i} className="p-2 rounded-xl bg-surface-color/80 border-2 border-border-color">{d}</div>)}
                </div>

                <hr className="border-t-4 border-slate-400 my-2" />

                <div className="grid gap-1 text-center font-black text-2xl" style={{ gridTemplateColumns: `36px repeat(${width}, minmax(42px, 1fr))` }}>
                  <div></div>
                  {digitsOf(partialOnes, width).map((d, i) => <div key={i} className="p-2 rounded-xl bg-violet-500/10 border-2 border-violet-500/30">{d}</div>)}
                </div>

                {tens > 0 && (
                  <div className="grid gap-1 text-center font-black text-2xl" style={{ gridTemplateColumns: `36px repeat(${width}, minmax(42px, 1fr))` }}>
                    <div>+</div>
                    {digitsOf(partialTens, width).map((d, i) => <div key={i} className="p-2 rounded-xl bg-sky-500/10 border-2 border-sky-500/30">{d}</div>)}
                  </div>
                )}

                <hr className="border-t-4 border-slate-400 my-2" />
                <ColumnNumber value={total} width={width} color="#16a34a" />
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (op === 'division') {
      const each = Math.floor(a / safeB);
      const rest = a % safeB;

      return (
        <div className="space-y-4">
          <BigIdea title="Cociente / división" icon="➗" color="#0ea5e9">
            Dividir es repartir en grupos iguales. Si no todo cabe parejo, aparece un sobrante.
          </BigIdea>

          <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(115px, 1fr))' }}>
            {Array.from({ length: Math.min(safeB, 10) }).map((_, i) => (
              <div key={i} className="p-3 rounded-3xl bg-surface-color border-2 border-border-color text-center">
                <div className="font-black text-xs mb-2">Grupo {i + 1}</div>
                {objectRow(each, '🟡')}
                <div className="font-black mt-2">{each}</div>
              </div>
            ))}
          </div>

          {rest > 0 && (
            <div className="p-4 rounded-3xl bg-amber-500/10 border-2 border-amber-500/30 text-center font-black">
              Sobran: {objectRow(rest, '🟠')} ({rest})
            </div>
          )}
        </div>
      );
    }

    if (op === 'potencia') {
      const base = Math.max(1, Math.min(a, 8));
      const exp = Math.max(1, Math.min(b, 4));

      return (
        <div className="space-y-4">
          <BigIdea title="Potencia / exponente" icon="⬛" color="#7c3aed">
            El exponente dice cuántas veces se repite la base como factor.
          </BigIdea>

          <div className="grid lg:grid-cols-2 gap-4">
            <div className="p-4 rounded-3xl border-2 text-center overflow-x-auto" style={box('#7c3aed')}>
              <div className="font-black text-xl mb-2">Cuadrado: {base}²</div>
              <div className="grid gap-1 mx-auto" style={{ gridTemplateColumns: `repeat(${base}, 26px)`, width: `${base * 30}px` }}>
                {Array.from({ length: base * base }).map((_, i) => (
                  <div key={i} className="w-6 h-6 rounded-md bg-violet-400 border border-white shadow" />
                ))}
              </div>
              <div className="mt-4 text-3xl font-black">{base} × {base} = {base * base}</div>
            </div>

            <div className="p-4 rounded-3xl border-2 text-center" style={box('#8b5cf6')}>
              <div className="font-black text-xl mb-3">Potencia escrita</div>
              <div className="text-5xl font-black">{base}^{exp}</div>
              <div className="mt-3 font-black break-words">
                {Array.from({ length: exp }).map((_, i) => i === 0 ? String(base) : ` × ${base}`).join('')}
                {' = '}
                {Math.pow(base, exp)}
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (op === 'raiz') {
      const value = Math.max(0, a);
      const exact = Math.floor(Math.sqrt(value));
      const square = exact * exact;
      const nextSquare = (exact + 1) * (exact + 1);
      const showSide = Math.max(1, Math.min(exact || 1, 8));

      return (
        <div className="space-y-4">
          <BigIdea title="Raíz cuadrada" icon="√" color="#ec4899">
            La raíz cuadrada pregunta: ¿qué lado necesita un cuadrado para tener esta cantidad de cuadritos?
          </BigIdea>

          <div className="p-4 rounded-3xl border-2 text-center overflow-x-auto" style={box('#ec4899')}>
            <div className="grid gap-1 mx-auto" style={{ gridTemplateColumns: `repeat(${showSide}, 26px)`, width: `${showSide * 30}px` }}>
              {Array.from({ length: showSide * showSide }).map((_, i) => (
                <div key={i} className="w-6 h-6 rounded-md bg-pink-400 border border-white shadow" />
              ))}
            </div>

            <div className="mt-4 text-3xl font-black">√{value} ≈ {Number(Math.sqrt(value).toFixed(3))}</div>
            <div className="mt-2 text-sm font-bold opacity-80">
              {square === value
                ? `${value} es cuadrado perfecto: ${exact} × ${exact} = ${value}.`
                : `${value} está entre ${square} y ${nextSquare}; por eso la raíz es una aproximación.`}
            </div>
          </div>
        </div>
      );
    }

    if (op === 'fracciones') {
      const denominator = Math.max(1, safeB);
      const numerator = Math.max(0, Math.min(a, denominator));

      return (
        <div className="space-y-4">
          <BigIdea title="Fracción como parte y reparto" icon="🍕" color={colors.fraction}>
            Una fracción puede significar partes de un todo. También puede verse como una división.
          </BigIdea>

          <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(0,330px)] gap-4 items-center">
            <Panel>
              <div className="lab-formula text-center text-3xl mb-3">{numerator}/{denominator}</div>
              <FractionVisual visual={{ type: 'fraction', numerator, denominator }} />
            </Panel>

            <div className="space-y-3">
              <OpStep n={1} icon="⬇️" title="Denominador" text={`El todo se divide en ${denominator} parte(s) iguales.`} color={colors.fraction} />
              <OpStep n={2} icon="⬆️" title="Numerador" text={`Se toman o colorean ${numerator} parte(s).`} color="#f97316" />
              <OpStep n={3} icon="➗" title="División" text={`${numerator}/${denominator} también significa ${numerator} ÷ ${denominator}.`} color="#0ea5e9" />
            </div>
          </div>
        </div>
      );
    }

    if (op === 'negativos') {
      return (
        <div className="space-y-4">
          <BigIdea title="Negativos" icon="↔️" color={colors.negative}>
            Un negativo puede verse como una dirección opuesta: deuda, temperatura bajo cero o caminar hacia la izquierda del 0.
          </BigIdea>

          <div className="number-line-shell w-full max-w-full min-w-0 overflow-x-auto overflow-y-hidden pb-2">
            <div className="w-full min-w-[360px] max-w-full">
              <NumberLineVisual visual={{ type: 'number-line', start: -Math.max(5, a), end: Math.max(5, a), current: 0, jump: -a }} />
            </div>
          </div>

          <div className="grid md:grid-cols-2 2xl:grid-cols-3 gap-4">
            <OpStep n={1} icon="📍" title="Origen" text="Empiezas en 0." color={colors.zero} />
            <OpStep n={2} icon="⬅️" title="Opuesto" text={`Caminas ${a} paso(s) hacia la izquierda.`} color={colors.negative} />
            <OpStep n={3} icon="🏁" title="Resultado" text={`Llegas a ${-a}.`} color="#ef4444" />
          </div>
        </div>
      );
    }

    if (op === 'propiedades') {
      return (
        <div className="space-y-4">
          <BigIdea title="Propiedades de operaciones" icon="🧠" color={colors.system}>
            Las propiedades no son trucos sueltos. Son patrones que permiten cambiar el camino sin cambiar el resultado.
          </BigIdea>

          <div className="grid md:grid-cols-2 gap-3">
            <div className="p-4 rounded-3xl border-2 shadow" style={box(colors.count)}>
              <div className="font-black text-xl">Conmutativa de la suma</div>
              <div className="text-3xl font-black mt-2">{a} + {b} = {b} + {a}</div>
              <div className="text-sm font-bold opacity-80 mt-3">El orden cambia, pero el total queda igual.</div>
            </div>

            <div className="p-4 rounded-3xl border-2 shadow" style={box(colors.zero)}>
              <div className="font-black text-xl">Elemento neutro</div>
              <div className="text-3xl font-black mt-2">{a} + 0 = {a}</div>
              <div className="text-3xl font-black mt-2">{a} × 1 = {a}</div>
            </div>

            <div className="p-4 rounded-3xl border-2 shadow" style={box('#8b5cf6')}>
              <div className="font-black text-xl">Multiplicar como grupos</div>
              <div className="text-3xl font-black mt-2">{a} × {b} = {b} × {a}</div>
              <div className="text-sm font-bold opacity-80 mt-3">Cambias filas por columnas, pero la cantidad total puede ser la misma.</div>
            </div>

            <div className="p-4 rounded-3xl border-2 shadow" style={box('#f59e0b')}>
              <div className="font-black text-xl">Descomponer para calcular</div>
              <div className="text-sm font-bold opacity-80 mt-3">Puedes partir un número para llegar a 10, 100 o 1000 y calcular más cómodo.</div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        <BigIdea title="No mezclar etiquetas" icon="🐱" color="#f97316">
          Puedes sumar objetos distintos si cambias a una categoría común, pero no puedes cambiarles la identidad.
        </BigIdea>

        <div className="grid md:grid-cols-[1fr_60px_1fr_60px_1fr] gap-3 items-center">
          <CountBox title="5 gatos" count={5} icon="🐱" color="#f59e0b" />
          <div className="text-4xl text-center">+</div>
          <CountBox title="7 perros" count={7} icon="🐶" color="#0ea5e9" />
          <div className="text-4xl text-center">=</div>
          <CountBox title="12 animales" count={12} icon="🐾" color="#22c55e" />
        </div>
      </div>
    );
  };

  const renderOperaciones = () => {
    const current = opData[op] || opData.mapa;
    const c = opC ?? 521;

    const wideOps = ['llevando', 'sumas-avanzadas', 'resta-prestando', 'multi-digitos'];
    const isWideOp = wideOps.includes(op);
    const showModal = isWideOp && opModalOpen;

    const noInputOps = ['mapa', 'propiedades', 'no-mezclar'];
    const needsB = !['mapa', 'raiz', 'negativos', 'propiedades', 'no-mezclar'].includes(op);
    const needsC = op === 'sumas-avanzadas';

    const maxA =
      op === 'llevando' ? 999 :
      op === 'sumas-avanzadas' ? 9999 :
      op === 'resta-prestando' ? 9999 :
      op === 'multi-digitos' ? 999 :
      op === 'fracciones' ? 12 :
      30;

    const minA = op === 'llevando' ? 10 : op === 'multi-digitos' ? 1 : 0;

    const maxB =
      op === 'llevando' ? 999 :
      op === 'sumas-avanzadas' ? 9999 :
      op === 'resta-prestando' ? 9999 :
      op === 'multi-digitos' ? 99 :
      op === 'fracciones' ? 12 :
      12;

    const minB =
      op === 'division' || op === 'fracciones' || op === 'multi-digitos' ? 1 :
      op === 'llevando' ? 10 :
      0;

    const openOp = (id: string) => {
      setOp(id);
      setOpModalOpen(wideOps.includes(id));
    };

    const renderInputs = () => {
      if (noInputOps.includes(op)) return null;

      return (
        <div className={`grid gap-3 ${needsC ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
          <NumberInput
            label={
              op === 'sumas-avanzadas' ? 'Número 1' :
              op === 'resta-prestando' ? 'Minuendo / arriba' :
              op === 'multi-digitos' ? 'Multiplicando' :
              op === 'fracciones' ? 'Numerador / cantidad tomada' :
              op === 'raiz' || op === 'negativos' ? 'Número' :
              'Número A'
            }
            value={a}
            setValue={(v) => setA(Math.max(minA, Math.min(maxA, Math.floor(v))))}
            min={minA}
            max={maxA}
            color={opColor(op)}
          />

          {needsB && (
            <NumberInput
              label={
                op === 'sumas-avanzadas' ? 'Número 2' :
                op === 'resta-prestando' ? 'Sustraendo / abajo' :
                op === 'multi-digitos' ? 'Multiplicador' :
                op === 'fracciones' ? 'Denominador / partes' :
                'Número B'
              }
              value={b}
              setValue={(v) => setB(Math.max(minB, Math.min(maxB, Math.floor(v))))}
              min={minB}
              max={maxB}
              color="#0ea5e9"
            />
          )}

          {needsC && (
            <NumberInput
              label="Número 3"
              value={c}
              setValue={(v) => setOpC(Math.max(0, Math.min(9999, Math.floor(v))))}
              min={0}
              max={9999}
              color="#16a34a"
            />
          )}
        </div>
      );
    };

    const WorkCanvas = ({ modal = false }: { modal?: boolean }) => (
      <div className="space-y-4 min-w-0">
        {renderInputs()}

        <Panel className={modal ? "overflow-visible min-h-[640px] p-4" : "overflow-x-hidden"}>
          {operationVisual()}
        </Panel>
      </div>
    );

    return (
      <div className="space-y-4">
        <BigIdea title="Operaciones fundamentales" icon="⚙️" color="#8b5cf6">
          Una operación es una acción sobre cantidades. En operaciones largas, la clave es acomodar por columnas y entender cuándo se reagrupa: llevar en suma, prestar en resta y llevar productos parciales en multiplicación.
        </BigIdea>

        <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(105px, 1fr))' }}>
          {Object.entries(opData).map(([id, item]) => (
            <button
              key={id}
              onClick={() => openOp(id)}
              className={`p-3 rounded-2xl font-black text-xs transition-all hover:scale-105 ${
                op === id ? 'text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color'
              }`}
              style={op === id ? { background: opColor(id), borderColor: opColor(id) } : {}}
            >
              <span className="text-2xl block mb-1">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-[minmax(0,330px)_minmax(0,1fr)] gap-4 min-w-0">
          <div className="p-5 rounded-3xl border-2 shadow text-center h-fit" style={box(opColor(op))}>
            <div className="text-xs font-black uppercase opacity-70">Máquina de operación</div>
            <div className="text-6xl my-3">{current.icon}</div>
            <div className="font-black text-2xl">{current.label}</div>
            <div className="mt-2 text-sm font-bold opacity-80 leading-relaxed">{current.action}</div>
            <div className="mt-4 p-3 rounded-2xl bg-surface-color/90 border border-border-color font-black break-words">
              {operationText()}
            </div>

            {isWideOp && (
              <button
                onClick={() => setOpModalOpen(true)}
                className="mt-4 w-full px-4 py-3 rounded-2xl bg-[var(--primary-color)] text-white font-black shadow hover:scale-105 transition-all"
              >
                Abrir lienzo grande
              </button>
            )}
          </div>

          {isWideOp ? (
            <div className="p-6 rounded-3xl border-2 border-border-color bg-surface-color shadow text-center">
              <div className="text-5xl mb-3">🖼️</div>
              <div className="font-black text-2xl mb-2">Lienzo grande disponible</div>
              <div className="text-sm font-bold opacity-80 leading-relaxed mb-4">
                Esta operación necesita más espacio para columnas, acarreos, préstamos y productos parciales.
              </div>

              {renderInputs()}

              <button
                onClick={() => setOpModalOpen(true)}
                className="mt-4 px-5 py-3 rounded-2xl font-black text-white shadow hover:scale-105 transition-all"
                style={{ background: opColor(op) }}
              >
                Abrir práctica en pantalla grande
              </button>
            </div>
          ) : (
            <WorkCanvas />
          )}
        </div>

        {showModal && (
          <div className="fixed inset-0 z-[9999] bg-slate-950/80 backdrop-blur-sm overscroll-contain flex items-center justify-center p-3 md:p-6">
            <div className="w-[min(1180px,calc(100vw-2rem))] h-[min(820px,calc(100vh-2rem))] rounded-[2rem] border-2 border-border-color bg-background-color shadow-[0_30px_90px_rgba(0,0,0,0.65)] overflow-hidden flex flex-col">
              <div className="shrink-0 px-4 py-3 border-b-2 border-border-color bg-surface-color flex items-center justify-between gap-3 z-10">
                <div className="min-w-0">
                  <div className="text-xs font-black uppercase opacity-70">Lienzo grande</div>
                  <div className="font-black text-2xl truncate">
                    {current.icon} {current.label}
                  </div>
                  <div className="text-sm font-bold opacity-75 truncate">
                    {operationText()}
                  </div>
                </div>

                <button
                  onClick={() => setOpModalOpen(false)}
                  className="shrink-0 w-11 h-11 rounded-2xl bg-red-500 text-white font-black text-2xl shadow hover:scale-105 transition-all border-2 border-white/30"
                  aria-label="Cerrar"
                >
                  ×
                </button>
              </div>

              <div className="flex-1 min-h-0 overflow-hidden p-3 bg-background-color">
                <div className="h-full w-full overflow-scroll rounded-3xl border-2 border-border-color bg-background-color">
                  <div className="min-w-[1250px] min-h-[880px] p-4 md:p-5 pb-14 pr-14">
                    <WorkCanvas modal />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };





  const renderSistemas = () => {
    const rawSystemNumber = Math.max(0, Math.floor(systemNumber));
    const n = system === 'hebreo' ? Math.min(9999, rawSystemNumber) : Math.min(3999, rawSystemNumber);

    const toDevanagari = (x: number) => {
      const d = ['०','१','२','३','४','५','६','७','८','९'];
      return String(x).split('').map(ch => d[Number(ch)] ?? ch).join('');
    };

    const toArabicIndic = (x: number) => {
      const d = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
      return String(x).split('').map(ch => d[Number(ch)] ?? ch).join('');
    };

    const decomposeAlphabetic = (x: number, table: [number, string][], max = 999) => {
      let rest = Math.max(0, Math.min(max, Math.floor(x)));
      const parts: { value: number; symbol: string }[] = [];

      for (const [value, symbol] of table) {
        while (rest >= value) {
          parts.push({ value, symbol });
          rest -= value;
        }
      }

      return parts;
    };

    const hebrewTable: [number, string][] = [
      [400,'ת'],[300,'ש'],[200,'ר'],[100,'ק'],
      [90,'צ'],[80,'פ'],[70,'ע'],[60,'ס'],[50,'נ'],[40,'מ'],[30,'ל'],[20,'כ'],[10,'י'],
      [9,'ט'],[8,'ח'],[7,'ז'],[6,'ו'],[5,'ה'],[4,'ד'],[3,'ג'],[2,'ב'],[1,'א'],
    ];

    const greekTable: [number, string][] = [
      [900,'ϡ'],[800,'ω'],[700,'ψ'],[600,'χ'],[500,'φ'],[400,'υ'],[300,'τ'],[200,'σ'],[100,'ρ'],
      [90,'ϟ'],[80,'π'],[70,'ο'],[60,'ξ'],[50,'ν'],[40,'μ'],[30,'λ'],[20,'κ'],[10,'ι'],
      [9,'θ'],[8,'η'],[7,'ζ'],[6,'ϛ'],[5,'ε'],[4,'δ'],[3,'γ'],[2,'β'],[1,'α'],
    ];

    const AlphabeticVisual = ({
      title,
      value,
      table,
      color,
      direction = 'ltr',
      max = 999,
    }: {
      title: string;
      value: number;
      table: [number, string][];
      color: string;
      direction?: 'ltr' | 'rtl';
      max?: number;
    }) => {
      const parts = decomposeAlphabetic(value, table, max);
      const shown = Math.max(0, Math.min(max, value));

      return (
        <div className="space-y-3">
          <div className="p-4 rounded-3xl border-2 text-center" style={box(color)}>
            <div className="text-xs font-black uppercase opacity-70">{title}</div>
            <div className="text-6xl font-black break-words" dir={direction}>
              {parts.length ? parts.map(p => p.symbol).join('') : 'sin cero propio'}
            </div>
          </div>

          <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(88px, 1fr))' }}>
            {parts.length ? parts.map((p, i) => (
              <div key={i} className="p-3 rounded-2xl border-2 text-center shadow" style={box(color)}>
                <div className="text-3xl font-black">{p.symbol}</div>
                <div className="text-xs font-bold opacity-75">{p.value}</div>
              </div>
            )) : (
              <div className="p-3 rounded-2xl bg-surface-color border-2 border-border-color text-center font-black">0</div>
            )}
          </div>
        </div>
      );
    };

    const EgyptianVisual = ({ value }: { value: number }) => {
      const symbols = [
        { value: 1000, icon: '🪷', label: 'mil' },
        { value: 100, icon: '🌀', label: 'cien' },
        { value: 10, icon: '∩', label: 'diez' },
        { value: 1, icon: '|', label: 'uno' },
      ];

      let rest = Math.max(0, Math.min(3999, Math.floor(value)));

      return (
        <div className="space-y-3">
          <div className="grid md:grid-cols-2 2xl:grid-cols-4 gap-4">
            {symbols.map(sym => {
              const count = Math.floor(rest / sym.value);
              rest %= sym.value;

              return (
                <div key={sym.label} className="p-4 rounded-3xl border-2 text-center shadow" style={box('#eab308')}>
                  <div className="text-xs font-black uppercase opacity-70">{sym.label}</div>
                  <div className="text-4xl min-h-12 flex items-center justify-center">{sym.icon}</div>
                  <div className="font-black text-3xl">× {count}</div>
                  <div className="text-xs font-bold opacity-75">{sym.value.toLocaleString('es-MX')} cada uno</div>
                </div>
              );
            })}
          </div>
          <div className="text-center text-sm font-bold opacity-80">
            Egipcio aquí se muestra como sistema aditivo: repite símbolos según la cantidad.
          </div>
        </div>
      );
    };

    const MayaDigit = ({ value, label, multiplier }: { value: number; label: string; multiplier: number }) => {
      const v = Math.max(0, Math.min(19, Math.floor(value)));
      const bars = Math.floor(v / 5);
      const dots = v % 5;

      return (
        <div className="p-4 rounded-3xl border-2 shadow text-center" style={box('#84cc16')}>
          <div className="text-xs font-black uppercase opacity-70 mb-2">{label}</div>
          <div className="text-xs font-bold opacity-75 mb-2">× {multiplier}</div>
          {v === 0 ? (
            <div className="text-5xl">𝋠</div>
          ) : (
            <div className="space-y-2 min-h-20 flex flex-col justify-center">
              <div className="flex justify-center gap-2 text-2xl">
                {Array.from({ length: dots }).map((_, i) => <span key={i}>●</span>)}
              </div>
              <div className="space-y-1">
                {Array.from({ length: bars }).map((_, i) => (
                  <div key={i} className="mx-auto w-24 h-4 rounded-full bg-lime-500 border-2 border-lime-800" />
                ))}
              </div>
            </div>
          )}
          <div className="font-black mt-2">{v}</div>
        </div>
      );
    };

    const MayaVisual = ({ value }: { value: number }) => {
      const x = Math.max(0, Math.floor(value));
      const fourHundreds = Math.floor(x / 400);
      const twenties = Math.floor((x % 400) / 20);
      const units = x % 20;

      return (
        <div className="space-y-3">
          <div className="grid md:grid-cols-[1fr_50px_1fr_50px_1fr] gap-3 items-center">
            <MayaDigit value={fourHundreds} label="cuatrocientos" multiplier={400} />
            <div className="hidden md:block text-center text-4xl">⬇️</div>
            <MayaDigit value={twenties} label="veintenas" multiplier={20} />
            <div className="hidden md:block text-center text-4xl">⬇️</div>
            <MayaDigit value={units} label="unidades" multiplier={1} />
          </div>
        </div>
      );
    };

    const ChineseVisual = ({ value }: { value: number }) => {
      const chineseDigits = ['零','一','二','三','四','五','六','七','八','九'];
      const units = ['', '十', '百', '千'];
      const str = String(Math.max(0, Math.min(3999, value))).split('').reverse();

      return (
        <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))' }}>
          {str.map((ch, i) => (
            <div key={i} className="p-4 rounded-3xl border-2 text-center shadow" style={box('#dc2626')}>
              <div className="text-xs font-black uppercase opacity-70">{units[i] || 'unidad'}</div>
              <div className="text-5xl font-black">{chineseDigits[Number(ch)]}{units[i]}</div>
              <div className="text-xs font-bold opacity-75">{Number(ch) * Math.pow(10, i)}</div>
            </div>
          )).reverse()}
        </div>
      );
    };


    const HebrewVisual = ({ value }: { value: number }) => {
      const raw = Math.max(0, Math.min(9999, Math.floor(value)));
      const thousands = Math.floor(raw / 1000);
      const rest = raw % 1000;

      const thousandsParts = thousands > 0 ? decomposeAlphabetic(thousands, hebrewTable, 999) : [];
      const restParts = rest > 0 ? decomposeAlphabetic(rest, hebrewTable, 999) : [];

      const thousandsText = thousandsParts.map(p => p.symbol).join('');
      const restText = restParts.map(p => p.symbol).join('');
      const written = raw === 0 ? 'sin cero propio' : (thousandsText ? thousandsText + '׳' : '') + restText;

      const Card = ({ label, symbol, value }: { label: string; symbol: string; value: string | number }) => (
        <div className="p-3 rounded-2xl border-2 text-center shadow bg-surface-color/70 border-border-color">
          <div className="text-xs font-black uppercase opacity-70">{label}</div>
          <div className="text-3xl font-black" dir="rtl">{symbol}</div>
          <div className="text-xs font-bold opacity-75">{value}</div>
        </div>
      );

      return (
        <div className="space-y-4">
          <div className="grid lg:grid-cols-[minmax(0,1fr)_330px] gap-3">
            <div className="p-5 rounded-3xl border-2 text-center overflow-hidden" style={box('#a855f7')}>
              <div className="text-xs font-black uppercase opacity-70">Hebreo: letras con valor</div>
              <div className="text-6xl md:text-7xl font-black break-words leading-tight" dir="rtl">{written}</div>
              <div className="mt-3 font-black">{raw.toLocaleString('es-MX')}</div>
            </div>

            <div className="p-5 rounded-3xl border-2" style={box('#a855f7')}>
              <div className="font-black text-xl mb-2">¿Por qué se usa?</div>
              <div className="text-sm font-bold opacity-85 leading-relaxed">
                En hebreo, las letras también pueden representar cantidades. Se usa en fechas del calendario hebreo,
                numeración tradicional, capítulos, versículos, listas y estudios de palabras. No funciona igual que
                nuestro sistema decimal: aquí las letras se suman por valor.
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            <div className="p-4 rounded-3xl border-2" style={box('#a855f7')}>
              <div className="font-black text-lg mb-2">Miles</div>
              <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(86px, 1fr))' }}>
                {thousandsParts.length ? thousandsParts.map((p, i) => (
                  <Card key={i} label="mil" symbol={p.symbol + '׳'} value={p.value * 1000} />
                )) : <Card label="mil" symbol="—" value="0" />}
              </div>
            </div>

            <div className="p-4 rounded-3xl border-2" style={box('#a855f7')}>
              <div className="font-black text-lg mb-2">Centenas, decenas y unidades</div>
              <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(86px, 1fr))' }}>
                {restParts.length ? restParts.map((p, i) => (
                  <Card key={i} label="valor" symbol={p.symbol} value={p.value} />
                )) : <Card label="valor" symbol="—" value="0" />}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30 text-sm font-bold leading-relaxed">
            Lectura visual: primero mira si hay miles, luego suma las letras restantes. El signo ׳ marca el grupo de miles.
          </div>
        </div>
      );
    };

    const systemCards = [
      { id: 'decimal', name: 'Decimal actual', icon: '🔟', color: '#22c55e', note: 'base 10, posicional, usa 0' },
      { id: 'indio', name: 'Indio', icon: '🪷', color: '#ec4899', note: 'posición y cero' },
      { id: 'arabigo', name: 'Arábigo', icon: '🌙', color: '#0ea5e9', note: 'transmisión y numerales orientales' },
      { id: 'hebreo', name: 'Hebreo', icon: '✡️', color: '#a855f7', note: 'letras con valor numérico' },
      { id: 'griego', name: 'Griego', icon: '🏺', color: '#7c3aed', note: 'letras con valor numérico' },
      { id: 'chino', name: 'Chino', icon: '🐉', color: '#dc2626', note: 'caracteres y unidades' },
      { id: 'romano', name: 'Romano', icon: '🏛️', color: '#64748b', note: 'letras y suma/resta' },
      { id: 'egipcio', name: 'Egipcio', icon: '𓂀', color: '#eab308', note: 'símbolos repetidos' },
      { id: 'binario', name: 'Binario', icon: '💻', color: '#14b8a6', note: 'base 2' },
      { id: 'hexadecimal', name: 'Hexadecimal', icon: '🧊', color: '#06b6d4', note: 'base 16' },
      { id: 'sumerio', name: 'Sumerio', icon: '🔻', color: '#ea580c', note: 'marcas tipo cuña' },
      { id: 'babilonio', name: 'Babilonio', icon: '🏺', color: '#f97316', note: 'base 60' },
      { id: 'maya', name: 'Maya', icon: '🌽', color: '#84cc16', note: 'base 20, puntos, barras y cero' },
    ];

    const active = systemCards.find(card => card.id === system) || systemCards[0];

    const systemContext: Record<string, { historia: string; uso: string; regla: string }> = {
      decimal: {
        historia: 'Es el sistema cotidiano actual. Su fuerza está en combinar diez símbolos con valor posicional.',
        uso: 'Lo usamos para contar, medir, comprar, escribir edades, fechas y cantidades grandes.',
        regla: 'El lugar cambia el valor: en 305, el 3 vale 300.'
      },
      indio: {
        historia: 'La tradición india fue clave para consolidar la notación posicional y el cero como número y marcador de posición.',
        uso: 'Ayudó a escribir cantidades grandes de forma breve y calculable.',
        regla: 'Los símbolos cambian de valor según su lugar.'
      },
      arabigo: {
        historia: 'El mundo árabe estudió, tradujo y difundió saberes numéricos que conectaron India, Medio Oriente, África del Norte y Europa.',
        uso: 'Fue un puente cultural para que el sistema posicional se expandiera.',
        regla: 'Usa signos con valor posicional; aquí se muestran numerales arábigos orientales.'
      },
      hebreo: {
        historia: 'El hebreo también usa letras como números en contextos tradicionales.',
        uso: 'Se usa en fechas del calendario hebreo, capítulos, versículos, listas, estudios de palabras y numeración tradicional.',
        regla: 'Las letras se suman por valor. Para miles se puede marcar el grupo con ׳.'
      },
      griego: {
        historia: 'El sistema griego jónico asignaba valores a letras.',
        uso: 'Aparece en historia de la matemática, textos antiguos y numeración tradicional.',
        regla: 'Cada letra vale una cantidad; se suman los valores.'
      },
      chino: {
        historia: 'La escritura china usa caracteres para números y unidades como diez, cien y mil.',
        uso: 'Permite leer la estructura del número por unidades de valor.',
        regla: 'Combina dígitos con unidades: diez, cien, mil.'
      },
      romano: {
        historia: 'El sistema romano fue usado en el mundo romano y sigue apareciendo en relojes, siglos y nombres de reyes o papas.',
        uso: 'Sirve para etiquetas, capítulos, siglos y usos decorativos o históricos.',
        regla: 'Combina letras como I, V, X, L, C, D, M. No tiene cero posicional.'
      },
      egipcio: {
        historia: 'El sistema egipcio usaba símbolos repetidos para unidades, decenas, centenas y millares.',
        uso: 'Servía para registrar cantidades, medidas, impuestos, construcciones y administración.',
        regla: 'Es aditivo: repites el símbolo según cuántas veces aparece ese valor.'
      },
      binario: {
        historia: 'La idea de base 2 es fundamental en computación moderna.',
        uso: 'Las computadoras trabajan con estados como apagado/encendido, 0/1.',
        regla: 'Solo usa 0 y 1; cada lugar vale una potencia de 2.'
      },
      hexadecimal: {
        historia: 'El hexadecimal se volvió práctico para representar información binaria de forma corta.',
        uso: 'Se usa en informática, colores digitales y memoria.',
        regla: 'Base 16: usa 0–9 y A–F.'
      },
      sumerio: {
        historia: 'Las culturas mesopotámicas usaron marcas en tablillas de arcilla para registrar cantidades.',
        uso: 'Sirvió para comercio, contabilidad, medidas y administración.',
        regla: 'Se representa aquí de forma visual con marcas tipo cuña para agrupar.'
      },
      babilonio: {
        historia: 'El sistema babilonio trabajaba con base 60.',
        uso: 'Su huella sigue en 60 segundos, 60 minutos y grados de ángulo.',
        regla: 'Agrupa en sesentas, no en decenas.'
      },
      maya: {
        historia: 'El sistema maya usó puntos, barras y un símbolo para cero.',
        uso: 'Servía para calendarios, ciclos y conteos.',
        regla: 'Base 20: puntos valen 1, barras valen 5 y las posiciones suben por veintenas.'
      }
    };

    const ctx = systemContext[active.id] || systemContext.decimal;

    const SystemVisual = () => {
      if (system === 'decimal') {
        return (
          <div className="text-center">
            <div className="text-7xl font-black">{n.toLocaleString('es-MX')}</div>
            <div className="mt-3 font-black">Sistema posicional: el lugar cambia el valor.</div>
          </div>
        );
      }

      if (system === 'indio') {
        return (
          <div className="grid md:grid-cols-2 gap-3">
            <div className="p-5 rounded-3xl border-2 text-center" style={box('#ec4899')}>
              <div className="text-xs font-black uppercase opacity-70">Numerales devanagari</div>
              <div className="text-7xl font-black break-words">{toDevanagari(n)}</div>
            </div>
            <div className="p-5 rounded-3xl border-2" style={box('#ec4899')}>
              <div className="font-black text-xl mb-2">Idea clave</div>
              <div className="text-sm font-bold opacity-85">
                Esta tradición es clave para la escritura posicional y el uso del cero.
              </div>
            </div>
          </div>
        );
      }

      if (system === 'arabigo') {
        return (
          <div className="grid md:grid-cols-2 gap-3">
            <div className="p-5 rounded-3xl border-2 text-center" style={box('#0ea5e9')}>
              <div className="text-xs font-black uppercase opacity-70">Arábigo oriental</div>
              <div className="text-7xl font-black break-words">{toArabicIndic(n)}</div>
            </div>
            <div className="p-5 rounded-3xl border-2" style={box('#0ea5e9')}>
              <div className="font-black text-xl mb-2">Puente cultural</div>
              <div className="text-sm font-bold opacity-85">
                El mundo árabe estudió, usó y transmitió conocimientos numéricos hacia otras regiones.
              </div>
            </div>
          </div>
        );
      }

      if (system === 'hebreo') {
        return <HebrewVisual value={n} />;
      }

      if (system === 'griego') {
        return <AlphabeticVisual title="Griego: letras con valor" value={n} table={greekTable} color="#7c3aed" max={999} />;
      }

      if (system === 'chino') {
        return <ChineseVisual value={n} />;
      }

      if (system === 'romano') {
        return (
          <div className="text-center p-5 rounded-3xl border-2" style={box('#64748b')}>
            <div className="text-xs font-black uppercase opacity-70">Romano</div>
            <div className="text-7xl font-black break-words">{toRoman(n)}</div>
            <div className="mt-3 font-black">No tiene cero como número posicional.</div>
          </div>
        );
      }

      if (system === 'egipcio') return <EgyptianVisual value={n} />;

      if (system === 'binario') {
        return (
          <div className="text-center p-5 rounded-3xl border-2" style={box('#14b8a6')}>
            <div className="text-xs font-black uppercase opacity-70">Binario</div>
            <div className="text-5xl md:text-6xl font-black break-words">{n.toString(2)}</div>
            <div className="mt-3 font-black">Solo usa 0 y 1.</div>
          </div>
        );
      }

      if (system === 'hexadecimal') {
        return (
          <div className="text-center p-5 rounded-3xl border-2" style={box('#06b6d4')}>
            <div className="text-xs font-black uppercase opacity-70">Hexadecimal</div>
            <div className="text-6xl font-black break-words">{n.toString(16).toUpperCase()}</div>
            <div className="mt-3 font-black">Usa 16 símbolos: 0–9 y A–F.</div>
          </div>
        );
      }

      if (system === 'sumerio') {
        const tens = Math.floor(n / 10);
        const ones = n % 10;

        return (
          <div className="grid md:grid-cols-2 gap-3">
            <div className="p-5 rounded-3xl border-2 text-center" style={box('#ea580c')}>
              <div className="text-xs font-black uppercase opacity-70">cuñas de diez</div>
              <div className="text-5xl break-words">{'🔻'.repeat(Math.min(tens, 30))}</div>
              <div className="font-black mt-2">× {tens}</div>
            </div>
            <div className="p-5 rounded-3xl border-2 text-center" style={box('#ea580c')}>
              <div className="text-xs font-black uppercase opacity-70">unidades</div>
              <div className="text-5xl break-words">{'▾'.repeat(Math.min(ones, 9))}</div>
              <div className="font-black mt-2">× {ones}</div>
            </div>
          </div>
        );
      }

      if (system === 'babilonio') {
        return (
          <div className="text-center p-5 rounded-3xl border-2" style={box('#f97316')}>
            <div className="text-xs font-black uppercase opacity-70">Base 60</div>
            <div className="text-6xl font-black">{toBabylonian(n)}</div>
            <div className="mt-3 font-black">La base 60 todavía aparece en minutos y segundos.</div>
          </div>
        );
      }

      return <MayaVisual value={n} />;
    };

    return (
      <div className="space-y-4">
        <BigIdea title="Sistema numérico" icon="🔣" color={colors.system}>
          Un sistema numérico es una forma organizada de escribir cantidades. Tiene símbolos, reglas, agrupaciones y, a veces, valor por posición.
        </BigIdea>

        <NumberInput
          label="Número para traducir"
          value={systemNumber}
          setValue={(v) => setSystemNumber(Math.max(0, Math.min(system === 'hebreo' ? 9999 : 3999, Math.floor(v))))}
          min={0}
          max={system === 'hebreo' ? 9999 : 3999}
          color="#84cc16"
        />

        <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(125px, 1fr))' }}>
          {systemCards.map(card => (
            <button
              key={card.id}
              onClick={() => setSystem(card.id)}
              className={'p-3 rounded-2xl border-2 font-black text-xs transition-all hover:scale-105 ' + (system === card.id ? 'scale-105 shadow-lg' : 'bg-surface-color border-border-color')}
              style={system === card.id ? box(card.color) : {}}
            >
              <span className="text-2xl block mb-1">{card.icon}</span>
              {card.name}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-[minmax(0,320px)_minmax(0,1fr)] gap-4">
          <div className="p-5 rounded-3xl border-2 shadow text-center" style={box(active.color)}>
            <div className="text-6xl mb-2">{active.icon}</div>
            <div className="font-black text-2xl">{active.name}</div>
            <div className="mt-2 font-bold opacity-80">{active.note}</div>

            <div className="mt-4 space-y-3 text-left">
              <div className="p-3 rounded-2xl bg-surface-color/70 border-2 border-border-color">
                <div className="text-xs font-black uppercase opacity-70">Historia</div>
                <div className="text-sm font-bold opacity-85 leading-relaxed">{ctx.historia}</div>
              </div>
              <div className="p-3 rounded-2xl bg-surface-color/70 border-2 border-border-color">
                <div className="text-xs font-black uppercase opacity-70">Uso</div>
                <div className="text-sm font-bold opacity-85 leading-relaxed">{ctx.uso}</div>
              </div>
              <div className="p-3 rounded-2xl bg-surface-color/70 border-2 border-border-color">
                <div className="text-xs font-black uppercase opacity-70">Regla</div>
                <div className="text-sm font-bold opacity-85 leading-relaxed">{ctx.regla}</div>
              </div>
            </div>
          </div>
          <Panel>
            <SystemVisual />
          </Panel>
        </div>
      </div>
    );
  };






  const renderConjuntos = () => {
    const setInfo: Record<string, { name: string; color: string; text: string; examples: string[] }> = {
      naturales: {
        name: 'Naturales',
        color: colors.count,
        text: 'Sirven para contar objetos completos: 1, 2, 3, 4...',
        examples: ['1', '2', '3', '10'],
      },
      enteros: {
        name: 'Enteros',
        color: colors.negative,
        text: 'Incluyen negativos, cero y positivos sin partes.',
        examples: ['−3', '0', '5'],
      },
      racionales: {
        name: 'Racionales',
        color: colors.rational,
        text: 'Se pueden escribir como fracción. Algunos son decimales exactos o periódicos.',
        examples: ['1/2', '−4', '0.75', '0.333...'],
      },
      irracionales: {
        name: 'Irracionales',
        color: colors.irrational,
        text: 'No se pueden escribir como fracción exacta. Sus decimales no terminan ni repiten patrón.',
        examples: ['π', '√2'],
      },
      reales: {
        name: 'Reales',
        color: colors.real,
        text: 'Racionales e irracionales juntos llenan la recta numérica.',
        examples: ['−1', '0', '1/2', 'π'],
      },
      imaginarios: {
        name: 'Imaginarios',
        color: colors.imaginary,
        text: 'Usan una dirección nueva. Se representan con el eje vertical.',
        examples: ['i', '2i', '−4i'],
      },
      complejos: {
        name: 'Complejos',
        color: colors.complex,
        text: 'Combinan parte real y parte imaginaria. Viven en un plano.',
        examples: ['3 + 2i', '−1 + i'],
      },
      algebraicos: {
        name: 'Algebraicos',
        color: '#a855f7',
        text: 'Aparecen como solución de ecuaciones polinómicas.',
        examples: ['√2', 'x² − 2 = 0'],
      },
      trascendentes: {
        name: 'Trascendentes',
        color: '#f43f5e',
        text: 'No son solución de una ecuación polinómica con coeficientes enteros.',
        examples: ['π', 'e'],
      },
    };

    const current = setInfo[setFocus] || setInfo.naturales;

    const Layer = ({
      id,
      symbol,
      title,
      color,
      children,
    }: {
      id: string;
      symbol: string;
      title: string;
      color: string;
      children?: React.ReactNode;
    }) => (
      <div
        onClick={(e) => {
          e.stopPropagation();
          setSetFocus(id);
        }}
        className={`p-5 rounded-3xl border-4 shadow cursor-pointer transition-all hover:scale-[1.01] min-w-0 ${
          setFocus === id ? 'ring-4 ring-white/50 scale-[1.01]' : ''
        }`}
        style={{
          borderColor: color,
          background: `linear-gradient(135deg, ${color}30, transparent)`,
        }}
      >
        <div className="flex items-center justify-between gap-2 mb-3">
          <div>
            <div className="text-xs font-black uppercase opacity-70">{symbol}</div>
            <div className="font-black text-xl leading-tight break-words">{title}</div>
          </div>
          <div className="text-3xl">📦</div>
        </div>
        {children}
      </div>
    );

    const Mini = ({ id, label, color, examples }: { id: string; label: string; color: string; examples: string }) => (
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setSetFocus(id);
        }}
        className={`w-full text-left p-3 rounded-2xl border-2 shadow hover:scale-[1.02] transition-all min-w-0 ${
          setFocus === id ? 'ring-4 ring-white/50' : ''
        }`}
        style={{
          borderColor: color,
          background: `${color}22`,
        }}
      >
        <div className="font-black">{label}</div>
        <div className="text-xs font-bold opacity-75 break-words">{examples}</div>
      </button>
    );

    return (
      <div className="space-y-5 min-h-[980px]">
        <BigIdea title="Conjuntos de números" icon="🫧" color={colors.complex}>
          Un conjunto es una caja de números. Algunas cajas están dentro de otras. Aquí el mapa se divide en submapas para que no se amontone.
        </BigIdea>

        <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))' }}>
          {Object.entries(setInfo).map(([key, item]) => (
            <button
              key={key}
              type="button"
              onClick={() => setSetFocus(key)}
              className={`p-3 rounded-2xl border-2 font-black text-xs transition-all hover:scale-105 ${
                setFocus === key ? 'scale-105 shadow-lg' : 'bg-surface-color border-border-color'
              }`}
              style={setFocus === key ? box(item.color) : {}}
            >
              {item.name}
            </button>
          ))}
        </div>

        <div className="p-5 rounded-3xl border-2 shadow" style={box(current.color)}>
          <div className="grid lg:grid-cols-[260px_minmax(0,1fr)] gap-4 items-center">
            <div>
              <div className="text-xs font-black uppercase opacity-70">Caja seleccionada</div>
              <div className="font-black text-3xl">{current.name}</div>
            </div>
            <div>
              <div className="text-sm font-bold opacity-85 leading-relaxed">{current.text}</div>
              <div className="mt-3 flex gap-2 flex-wrap">
                {current.examples.map(x => (
                  <MiniBadge key={x} color={current.color}>{x}</MiniBadge>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-5 min-w-0">
          <details open className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow min-h-[520px]">
            <summary className="font-black text-2xl cursor-pointer">Submapa 1: reales en la recta</summary>

            <div className="mt-5 space-y-4">
              <Layer id="reales" symbol="ℝ" title="Reales: viven en la recta" color={colors.real}>
                <div className="grid xl:grid-cols-2 gap-5 mt-2">
                  <Layer id="racionales" symbol="ℚ" title="Racionales" color={colors.rational}>
                    <div className="space-y-4 mt-2">
                      <Layer id="enteros" symbol="ℤ" title="Enteros" color={colors.negative}>
                        <Layer id="naturales" symbol="ℕ" title="Naturales" color={colors.count}>
                          <div className="text-sm font-black">1, 2, 3, 4...</div>
                        </Layer>
                      </Layer>

                      <Mini
                        id="racionales"
                        label="Fracciones y decimales periódicos"
                        color={colors.rational}
                        examples="1/2, 0.75, 0.333..."
                      />
                    </div>
                  </Layer>

                  <Layer id="irracionales" symbol="no fracción" title="Irracionales" color={colors.irrational}>
                    <div className="grid md:grid-cols-2 gap-3 mt-2">
                      <Mini id="irracionales" label="π" color={colors.irrational} examples="no termina ni repite" />
                      <Mini id="irracionales" label="√2" color={colors.irrational} examples="diagonal de un cuadrado" />
                    </div>
                  </Layer>
                </div>
              </Layer>
            </div>
          </details>

          <details open className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow min-h-[560px]">
            <summary className="font-black text-2xl cursor-pointer">Submapa 2: complejos</summary>

            <div className="mt-5 grid xl:grid-cols-[minmax(0,1fr)_minmax(360px,520px)] gap-5 items-stretch">
              <Layer id="complejos" symbol="ℂ" title="Complejos: plano completo" color={colors.complex}>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <Mini id="reales" label="Parte real" color={colors.real} examples="3, −2, 1/2" />
                  <Mini id="imaginarios" label="Parte imaginaria" color={colors.imaginary} examples="i, 2i, −4i" />
                </div>

                <div className="mt-5 p-4 rounded-3xl bg-surface-color/70 border-2 border-border-color">
                  <div className="font-black text-lg">Idea visual</div>
                  <div className="text-sm font-bold opacity-80 leading-relaxed">
                    Los reales caminan izquierda/derecha. Los imaginarios agregan arriba/abajo. Juntos forman un plano.
                  </div>
                </div>
              </Layer>

              <ComplexPlaneVisual realValue={3} imaginaryValue={2} label="3 + 2i" color={colors.complex} large />
            </div>
          </details>

          <details open className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow min-h-[360px]">
            <summary className="font-black text-2xl cursor-pointer">Submapa 3: algebraicos y trascendentes</summary>

            <div className="mt-5 grid md:grid-cols-2 gap-5">
              <Layer id="algebraicos" symbol="alg." title="Algebraicos" color="#a855f7">
                <div className="font-black">√2 sale de x² − 2 = 0</div>
                <div className="text-sm font-bold opacity-75 mt-2">
                  Son números que aparecen como solución de una ecuación polinómica.
                </div>
              </Layer>

              <Layer id="trascendentes" symbol="trans." title="Trascendentes" color="#f43f5e">
                <div className="font-black">π y e son ejemplos famosos</div>
                <div className="text-sm font-bold opacity-75 mt-2">
                  No salen de una ecuación polinómica con coeficientes enteros.
                </div>
              </Layer>
            </div>
          </details>
        </div>
      </div>
    );
  };











  return (
    <TopicCard
      icon="🌎"
      title="Inicio: El Mundo de los Números"
      color="#8b5cf6"
      desc="Una puerta visual al mapa completo de los números: historia, familias, operaciones, sistemas y conjuntos."
    >
      <div className="lab-container space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
          {modes.map(m => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`p-3 rounded-2xl font-black text-xs transition-all ${
                mode === m.id ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color hover:scale-105'
              }`}
            >
              <span className="text-2xl block mb-1">{m.icon}</span>
              {m.label}
            </button>
          ))}
        </div>

        {mode === 'mapa' && renderMapa()}
        {mode === 'numero' && renderQueEsNumero()}
        {mode === 'historia' && renderHistoria()}
        {mode === 'uno-cero' && renderUnoCero()}
        {mode === 'familias' && renderFamilias()}
        {mode === 'operaciones' && renderOperaciones()}
        {mode === 'sistemas' && renderSistemas()}
        {mode === 'conjuntos' && renderConjuntos()}
      </div>
    </TopicCard>
  );
};


export const SumaInteractiva: React.FC = () => {
  const [a, setA] = useState(5);
  const [b, setB] = useState(4);
  const [c, setC] = useState(3);
  const [mode, setMode] = useState<string>('idea');

  const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, Math.floor(v)));
  const total = a + b;
  const total3 = a + b + c;

  const modeTabs = [
    { id: 'idea', label: 'Idea', icon: '🧠' },
    { id: 'objetos', label: 'Objetos', icon: '🍎' },
    { id: 'recta', label: 'Recta', icon: '📍' },
    { id: 'llegar10', label: 'Llegar a 10', icon: '🎯' },
    { id: 'columnas', label: 'Columnas', icon: '🏛️' },
    { id: 'tres', label: '3 números', icon: '➕' },
    { id: 'propiedades', label: 'Reglas', icon: '🔁' },
    { id: 'problemas', label: 'Problemas', icon: '📖' },
    { id: 'etiquetas', label: 'Etiquetas', icon: '🏷️' },
  ];

  const objectRow = (count: number, icon: string, max = 30) => (
    <div className="flex gap-2 flex-wrap justify-center items-center text-3xl">
      {Array.from({ length: Math.min(Math.max(0, count), max) }).map((_, i) => (
        <span key={i}>{icon}</span>
      ))}
      {count > max && <span className="text-sm font-black opacity-70">+{count - max}</span>}
      {count === 0 && <span className="text-sm font-black opacity-70">vacío</span>}
    </div>
  );

  const Box = ({
    title,
    children,
    color = '#22c55e',
    note,
  }: {
    title: string;
    children: React.ReactNode;
    color?: string;
    note?: string;
  }) => (
    <div
      className="p-4 rounded-3xl border-2 shadow text-center min-w-0 hover:scale-[1.01] transition-all"
      style={{ borderColor: color, background: `${color}18` }}
    >
      <div className="font-black text-lg mb-2">{title}</div>
      {children}
      {note && <div className="text-xs font-bold opacity-75 mt-2 leading-relaxed">{note}</div>}
    </div>
  );

  const Step = ({
    n,
    icon,
    title,
    text,
    color,
  }: {
    n: number;
    icon: string;
    title: string;
    text: string;
    color: string;
  }) => (
    <div className="p-4 rounded-3xl border-2 shadow" style={{ borderColor: color, background: `${color}18` }}>
      <div className="text-4xl mb-1">{icon}</div>
      <div className="text-xs font-black uppercase opacity-70">Paso {n}</div>
      <div className="font-black text-xl leading-tight">{title}</div>
      <div className="text-sm font-bold opacity-80 leading-relaxed mt-1">{text}</div>
    </div>
  );

  const digitsOf = (num: number, width: number) =>
    String(Math.max(0, Math.floor(num))).padStart(width, '0').split('').map(Number);

  const placeNames = ['UM', 'C', 'D', 'U'];

  const ColumnSum = ({ nums }: { nums: number[] }) => {
    const sum = nums.reduce((acc, n) => acc + n, 0);
    const width = Math.max(2, ...nums.map(n => String(n).length), String(sum).length);
    const labels = placeNames.slice(placeNames.length - width);
    const rows = nums.map(n => digitsOf(n, width));

    let carry = 0;
    const info: { label: string; raw: number; digit: number; carryOut: number }[] = [];

    for (let i = width - 1; i >= 0; i--) {
      const raw = rows.reduce((acc, row) => acc + row[i], 0) + carry;
      const digit = raw % 10;
      const carryOut = Math.floor(raw / 10);
      info.unshift({ label: labels[i], raw, digit, carryOut });
      carry = carryOut;
    }

    return (
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(280px,420px)] gap-4 items-start">
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-3">
          {info.map((col, i) => (
            <Step
              key={col.label}
              n={i + 1}
              icon={col.carryOut ? '📦' : '✍️'}
              title={`Columna ${col.label}`}
              text={`Suma de columna: ${col.raw}. Escribes ${col.digit}${col.carryOut ? ` y llevas ${col.carryOut}` : ''}.`}
              color={col.carryOut ? '#22c55e' : '#0ea5e9'}
            />
          ))}
        </div>

        <div className="p-4 rounded-3xl bg-surface-color border-2 border-border-color shadow overflow-x-auto">
          <div className="min-w-[260px] font-mono space-y-2">
            <div className="grid gap-1 text-center text-xs font-black opacity-70" style={{ gridTemplateColumns: `repeat(${width}, minmax(42px, 1fr))` }}>
              {labels.map(label => <div key={label}>{label}</div>)}
            </div>

            {nums.map((num, rowIndex) => (
              <div key={rowIndex} className="grid gap-1 text-center font-black text-2xl" style={{ gridTemplateColumns: `36px repeat(${width}, minmax(42px, 1fr))` }}>
                <div>{rowIndex === 0 ? '' : '+'}</div>
                {digitsOf(num, width).map((d, i) => (
                  <div key={i} className="p-2 rounded-xl bg-surface-color/80 border-2 border-border-color">{d}</div>
                ))}
              </div>
            ))}

            <hr className="border-t-4 border-slate-400 my-2" />

            <div className="grid gap-1 text-center font-black text-2xl text-emerald-500" style={{ gridTemplateColumns: `repeat(${Math.max(width, String(sum).length)}, minmax(42px, 1fr))` }}>
              {digitsOf(sum, Math.max(width, String(sum).length)).map((d, i) => (
                <div key={i} className="p-2 rounded-xl border-2 border-emerald-500 bg-emerald-500/10">{d}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderIdea = () => (
    <div className="space-y-4">
      <div className="p-5 rounded-3xl border-2 border-emerald-500/30 bg-emerald-500/10 shadow">
        <div className="font-black text-2xl mb-2">¿Qué es sumar?</div>
        <div className="text-sm font-bold opacity-85 leading-relaxed">
          Sumar es juntar cantidades compatibles. También puede significar avanzar, agregar, reunir o completar.
          La pregunta importante no es solo “¿cuánto da?”, sino “¿qué acción estoy haciendo?”.
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        <Step n={1} icon="👀" title="Mira las cantidades" text={`Tienes ${a} y luego agregas ${b}.`} color="#22c55e" />
        <Step n={2} icon="🏷️" title="Mira la etiqueta" text="Deben ser cosas compatibles: manzanas con manzanas, pesos con pesos, pasos con pasos." color="#f97316" />
        <Step n={3} icon="🏁" title="Junta y cuenta" text={`El total es ${a} + ${b} = ${total}.`} color="#0ea5e9" />
      </div>

      <div className="grid md:grid-cols-[1fr_60px_1fr_60px_1fr] gap-3 items-center">
        <Box title="Primero" color="#22c55e">{objectRow(a, '🍎')}</Box>
        <div className="text-4xl text-center font-black">+</div>
        <Box title="Después" color="#16a34a">{objectRow(b, '🍎')}</Box>
        <div className="text-4xl text-center font-black">=</div>
        <Box title="Total" color="#0ea5e9">{objectRow(total, '🍎')}<div className="font-black text-2xl mt-2">{total}</div></Box>
      </div>
    </div>
  );

  const renderObjetos = () => (
    <div className="space-y-4">
      <div className="grid md:grid-cols-[1fr_60px_1fr_60px_1fr] gap-3 items-center">
        <Box title={`${a} manzanas`} color="#22c55e">{objectRow(a, '🍎')}</Box>
        <div className="text-4xl text-center font-black">+</div>
        <Box title={`${b} manzanas`} color="#16a34a">{objectRow(b, '🍎')}</Box>
        <div className="text-4xl text-center font-black">=</div>
        <Box title={`${total} manzanas`} color="#0ea5e9">{objectRow(total, '🍎')}</Box>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <Box title="Suma como agregar" color="#f59e0b" note={`Empiezas con ${a}. Agregas ${b}. Terminas con ${total}.`}>
          <div className="text-5xl">🧺 ➕ 🍎</div>
        </Box>
        <Box title="Suma como reunir" color="#8b5cf6" note="Dos grupos separados se vuelven un solo grupo total.">
          <div className="text-5xl">🧺 + 🧺 = 🧺</div>
        </Box>
      </div>
    </div>
  );

  const renderRecta = () => (
    <div className="space-y-4">
      <div className="p-4 rounded-3xl border-2 border-emerald-500/30 bg-emerald-500/10">
        <div className="font-black text-xl mb-1">Suma en recta numérica</div>
        <div className="text-sm font-bold opacity-80">
          Empiezas en {a}. Como sumas {b}, avanzas {b} pasos hacia la derecha. Llegas a {total}.
        </div>
      </div>

      <div className="number-line-shell w-full max-w-full min-w-0 overflow-x-auto overflow-y-hidden pb-2">
        <div className="w-full min-w-[420px] max-w-full">
          <NumberLineVisual visual={{ type: 'number-line', start: 0, end: Math.max(10, a + b + 3), current: a, jump: b }} />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        <Step n={1} icon="📍" title="Punto inicial" text={`Te paras en ${a}.`} color="#22c55e" />
        <Step n={2} icon="➡️" title="Avance" text={`Caminas ${b} espacios hacia la derecha.`} color="#0ea5e9" />
        <Step n={3} icon="🏁" title="Llegada" text={`Llegas a ${total}.`} color="#16a34a" />
      </div>
    </div>
  );

  const renderLlegar10 = () => {
    const need = Math.max(0, 10 - a);
    const fromB = Math.min(need, b);
    const leftover = b - fromB;

    return (
      <div className="space-y-4">
        <div className="p-5 rounded-3xl border-2 border-amber-500/30 bg-amber-500/10 shadow">
          <div className="font-black text-2xl mb-2">Estrategia: llegar a 10</div>
          <div className="text-sm font-bold opacity-85 leading-relaxed">
            Para sumar más rápido, puedes partir el segundo número. Primero completas 10, luego sumas lo que sobra.
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-3">
          <Box title="Empiezas" color="#22c55e"><div className="text-4xl font-black">{a}</div></Box>
          <Box title="Necesitas para 10" color="#f59e0b"><div className="text-4xl font-black">{need}</div></Box>
          <Box title="Tomas de b" color="#0ea5e9"><div className="text-4xl font-black">{fromB}</div></Box>
          <Box title="Sobra de b" color="#8b5cf6"><div className="text-4xl font-black">{leftover}</div></Box>
        </div>

        <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
          <div className="text-2xl md:text-4xl font-black">
            {a} + {b} = ({a} + {fromB}) + {leftover} = {a + fromB} + {leftover} = {total}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          <Box title="Primero completa 10" color="#f59e0b">
            {objectRow(a, '🟢')}
            <div className="my-2 font-black">+</div>
            {objectRow(fromB, '🟡')}
          </Box>
          <Box title="Luego agrega lo que sobra" color="#8b5cf6">
            <div className="text-5xl font-black">10 + {leftover}</div>
            <div className="text-3xl font-black mt-2">= {total}</div>
          </Box>
        </div>
      </div>
    );
  };

  const renderColumnas = () => (
    <div className="space-y-4">
      <div className="p-5 rounded-3xl border-2 border-blue-500/30 bg-blue-500/10 shadow">
        <div className="font-black text-2xl mb-2">Suma por columnas</div>
        <div className="text-sm font-bold opacity-85 leading-relaxed">
          Acomoda unidades debajo de unidades y decenas debajo de decenas. Se suma de derecha a izquierda.
        </div>
      </div>

      <ColumnSum nums={[a, b]} />
    </div>
  );

  const renderTres = () => (
    <div className="space-y-4">
      <div className="grid md:grid-cols-3 gap-3">
        <NumberInput label="Número 1" value={a} setValue={(v) => setA(clamp(v, 0, 999))} min={0} max={999} color="#22c55e" />
        <NumberInput label="Número 2" value={b} setValue={(v) => setB(clamp(v, 0, 999))} min={0} max={999} color="#0ea5e9" />
        <NumberInput label="Número 3" value={c} setValue={(v) => setC(clamp(v, 0, 999))} min={0} max={999} color="#8b5cf6" />
      </div>

      <div className="p-5 rounded-3xl border-2 border-violet-500/30 bg-violet-500/10 shadow">
        <div className="font-black text-2xl mb-2">Sumar varios números</div>
        <div className="text-sm font-bold opacity-85 leading-relaxed">
          Puedes sumar más de dos números. La clave es mantener las columnas alineadas.
        </div>
      </div>

      <ColumnSum nums={[a, b, c]} />

      <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
        <div className="text-3xl font-black">{a} + {b} + {c} = {total3}</div>
      </div>
    </div>
  );

  const renderPropiedades = () => (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-3">
        <Box title="Conmutativa" color="#22c55e" note="Puedes cambiar el orden y el total no cambia.">
          <div className="text-3xl font-black">{a} + {b} = {b} + {a}</div>
          <div className="text-2xl font-black mt-2">{total} = {total}</div>
        </Box>

        <Box title="Elemento neutro" color="#38bdf8" note="Sumar cero no cambia la cantidad.">
          <div className="text-3xl font-black">{a} + 0 = {a}</div>
          <div className="text-5xl mt-2">⭕</div>
        </Box>

        <Box title="Asociativa" color="#8b5cf6" note="Puedes agrupar de distinta forma y el total se conserva.">
          <div className="text-xl md:text-2xl font-black">({a} + {b}) + {c} = {a} + ({b} + {c})</div>
        </Box>

        <Box title="Descomponer" color="#f59e0b" note="Partir números puede hacer una suma más fácil.">
          <div className="text-xl md:text-2xl font-black">{a} + {b} = {a} + {Math.max(0, 10 - a)} + {Math.max(0, b - Math.max(0, 10 - a))}</div>
        </Box>
      </div>
    </div>
  );

  const renderProblemas = () => (
    <div className="space-y-4">
      <div className="grid md:grid-cols-3 gap-3">
        <Box title="Problema 1" color="#22c55e" note={`Tenías ${a} canicas y te dan ${b}. Ahora tienes ${total}.`}>
          <div className="text-5xl">🟢</div>
          <div className="font-black text-2xl mt-2">{a} + {b} = {total}</div>
        </Box>

        <Box title="Problema 2" color="#0ea5e9" note={`En una caja hay ${a} lápices y en otra ${b}. Entre las dos hay ${total}.`}>
          <div className="text-5xl">✏️📦</div>
          <div className="font-black text-2xl mt-2">{a} + {b} = {total}</div>
        </Box>

        <Box title="Problema 3" color="#8b5cf6" note={`Caminas ${a} pasos y luego ${b} más. En total caminas ${total}.`}>
          <div className="text-5xl">👣</div>
          <div className="font-black text-2xl mt-2">{a} + {b} = {total}</div>
        </Box>
      </div>
    </div>
  );

  const renderEtiquetas = () => (
    <div className="space-y-4">
      <div className="p-5 rounded-3xl border-2 border-orange-500/30 bg-orange-500/10 shadow">
        <div className="font-black text-2xl mb-2">Cuidado con las etiquetas</div>
        <div className="text-sm font-bold opacity-85 leading-relaxed">
          Puedes sumar objetos distintos si usas una categoría común, pero no puedes cambiar lo que son.
        </div>
      </div>

      <div className="grid md:grid-cols-[1fr_60px_1fr_60px_1fr] gap-3 items-center">
        <Box title={`${a} gatos`} color="#f59e0b">{objectRow(a, '🐱')}</Box>
        <div className="text-4xl text-center font-black">+</div>
        <Box title={`${b} perros`} color="#0ea5e9">{objectRow(b, '🐶')}</Box>
        <div className="text-4xl text-center font-black">=</div>
        <Box title={`${total} animales`} color="#22c55e">{objectRow(total, '🐾')}</Box>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <Box title="Incorrecto" color="#ef4444" note="No puedes convertir perros en gatos.">
          <div className="text-2xl font-black">{a} 🐱 + {b} 🐶 = {total} 🐱</div>
        </Box>
        <Box title="Correcto" color="#22c55e" note="La categoría común es animales.">
          <div className="text-2xl font-black">{a} 🐱 + {b} 🐶 = {total} animales</div>
        </Box>
      </div>
    </div>
  );

  return (
    <TopicCard icon="➕" title="Suma Interactiva" color="#22c55e" desc="Aprende la suma como juntar, avanzar, completar 10, alinear columnas y resolver problemas visuales.">
      <div className="lab-container space-y-4">
        <div className="grid md:grid-cols-2 gap-3">
          <NumberInput label="Número A" value={a} setValue={(v) => setA(clamp(v, 0, mode === 'columnas' || mode === 'tres' ? 999 : 30))} min={0} max={mode === 'columnas' || mode === 'tres' ? 999 : 30} color="#22c55e" />
          <NumberInput label="Número B" value={b} setValue={(v) => setB(clamp(v, 0, mode === 'columnas' || mode === 'tres' ? 999 : 30))} min={0} max={mode === 'columnas' || mode === 'tres' ? 999 : 30} color="#16a34a" />
        </div>

        <div className="lab-formula text-center">
          {a} + {b} = <span style={{ color: 'var(--primary-color)' }}>{total}</span>
        </div>

        <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(105px, 1fr))' }}>
          {modeTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setMode(tab.id)}
              className={`p-3 rounded-2xl font-black text-xs transition-all hover:scale-105 ${
                mode === tab.id ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color'
              }`}
            >
              <span className="text-2xl block mb-1">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {mode === 'idea' && renderIdea()}
        {mode === 'objetos' && renderObjetos()}
        {mode === 'recta' && renderRecta()}
        {mode === 'llegar10' && renderLlegar10()}
        {mode === 'columnas' && renderColumnas()}
        {mode === 'tres' && renderTres()}
        {mode === 'propiedades' && renderPropiedades()}
        {mode === 'problemas' && renderProblemas()}
        {mode === 'etiquetas' && renderEtiquetas()}
      </div>
    </TopicCard>
  );
};




export const RestaInteractiva: React.FC = () => {
  const [a, setA] = useState(12);
  const [b, setB] = useState(5);
  const [mode, setMode] = useState<string>('idea');

  const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, Math.floor(v)));
  const diff = a - b;
  const absDiff = Math.abs(diff);

  const modeTabs = [
    { id: 'idea', label: 'Idea', icon: '🧠' },
    { id: 'objetos', label: 'Quitar', icon: '🍪' },
    { id: 'recta', label: 'Recta', icon: '📍' },
    { id: 'comparar', label: 'Comparar', icon: '⚖️' },
    { id: 'prestando', label: 'Prestando', icon: '🔁' },
    { id: 'cero', label: 'Cero', icon: '⭕' },
    { id: 'negativos', label: 'Negativos', icon: '↔️' },
    { id: 'problemas', label: 'Problemas', icon: '📖' },
    { id: 'errores', label: 'Cuidado', icon: '🏷️' },
  ];

  const objectRow = (count: number, icon: string, max = 32) => (
    <div className="flex gap-2 flex-wrap justify-center items-center text-3xl">
      {Array.from({ length: Math.min(Math.max(0, count), max) }).map((_, i) => (
        <span key={i}>{icon}</span>
      ))}
      {count > max && <span className="text-sm font-black opacity-70">+{count - max}</span>}
      {count === 0 && <span className="text-sm font-black opacity-70">vacío</span>}
    </div>
  );

  const Box = ({
    title,
    children,
    color = '#ef4444',
    note,
  }: {
    title: string;
    children: React.ReactNode;
    color?: string;
    note?: string;
  }) => (
    <div
      className="p-4 rounded-3xl border-2 shadow text-center min-w-0 hover:scale-[1.01] transition-all"
      style={{ borderColor: color, background: `${color}18` }}
    >
      <div className="font-black text-lg mb-2">{title}</div>
      {children}
      {note && <div className="text-xs font-bold opacity-75 mt-2 leading-relaxed">{note}</div>}
    </div>
  );

  const Step = ({
    n,
    icon,
    title,
    text,
    color,
  }: {
    n: number;
    icon: string;
    title: string;
    text: string;
    color: string;
  }) => (
    <div className="p-4 rounded-3xl border-2 shadow" style={{ borderColor: color, background: `${color}18` }}>
      <div className="text-4xl mb-1">{icon}</div>
      <div className="text-xs font-black uppercase opacity-70">Paso {n}</div>
      <div className="font-black text-xl leading-tight">{title}</div>
      <div className="text-sm font-bold opacity-80 leading-relaxed mt-1">{text}</div>
    </div>
  );

  const digitsOf = (num: number, width: number) =>
    String(Math.max(0, Math.floor(num))).padStart(width, '0').split('').map(Number);

  const placeNames = ['DM', 'UM', 'C', 'D', 'U'];

  const ColumnSubtract = ({ topValue, bottomValue }: { topValue: number; bottomValue: number }) => {
    const top = Math.max(0, Math.floor(topValue));
    const bottom = Math.max(0, Math.floor(bottomValue));
    const width = Math.max(2, String(top).length, String(bottom).length);
    const labels = placeNames.slice(placeNames.length - width);

    const topDigits = digitsOf(top, width);
    const bottomDigits = digitsOf(bottom, width);

    const borrowed = [...topDigits];
    const notes: string[] = [];

    for (let i = width - 1; i >= 0; i--) {
      if (borrowed[i] < bottomDigits[i]) {
        let j = i - 1;
        while (j >= 0 && borrowed[j] === 0) j--;

        if (j >= 0) {
          borrowed[j] -= 1;
          for (let k = j + 1; k < i; k++) borrowed[k] = 9;
          borrowed[i] += 10;
          notes.push(`En ${labels[i]}, arriba no alcanza. Se pide prestado desde una columna mayor.`);
        }
      }
    }

    const result = top - bottom;
    const resultDigits = digitsOf(result, width);

    return (
      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(300px,460px)] gap-4 items-start">
        <div className="space-y-3">
          <div className="grid md:grid-cols-3 gap-3">
            <Step n={1} icon="🏛️" title="Acomoda columnas" text="Unidades debajo de unidades, decenas debajo de decenas, centenas debajo de centenas." color="#ef4444" />
            <Step n={2} icon="🔁" title="Si no alcanza" text="Cambias 1 de la columna izquierda por 10 de la columna actual." color="#f97316" />
            <Step n={3} icon="✍️" title="Resta" text="Después de reagrupar, restas de derecha a izquierda." color="#0ea5e9" />
          </div>

          <div className="p-4 rounded-3xl border-2 shadow" style={{ borderColor: '#ef4444', background: '#ef444418' }}>
            <div className="font-black text-xl mb-2">Qué pasó</div>
            <div className="space-y-1 text-sm font-bold opacity-85 leading-relaxed">
              {notes.length ? notes.map((n, i) => <div key={i}>• {n}</div>) : <div>• No hizo falta prestar: cada columna de arriba alcanzó.</div>}
              <div>• Resultado: {top} − {bottom} = {result}</div>
            </div>
          </div>
        </div>

        <div className="p-4 rounded-3xl bg-surface-color border-2 border-border-color shadow overflow-x-auto">
          <div className="min-w-[300px] font-mono space-y-2">
            <div className="grid gap-1 text-center text-xs font-black opacity-70" style={{ gridTemplateColumns: `repeat(${width}, minmax(42px, 1fr))` }}>
              {labels.map(label => <div key={label}>{label}</div>)}
            </div>

            <div className="text-xs font-black opacity-70">Original arriba</div>
            <div className="grid gap-1 text-center font-black text-2xl" style={{ gridTemplateColumns: `repeat(${width}, minmax(42px, 1fr))` }}>
              {topDigits.map((d, i) => (
                <div key={i} className="p-2 rounded-xl bg-surface-color/80 border-2 border-border-color">{d}</div>
              ))}
            </div>

            <div className="text-xs font-black opacity-70 mt-3">Después de prestar</div>
            <div className="grid gap-1 text-center font-black text-2xl" style={{ gridTemplateColumns: `repeat(${width}, minmax(42px, 1fr))` }}>
              {borrowed.map((d, i) => (
                <div key={i} className="p-2 rounded-xl bg-red-500/10 border-2 border-red-500/30">{d}</div>
              ))}
            </div>

            <div className="grid gap-1 text-center font-black text-2xl mt-2" style={{ gridTemplateColumns: `36px repeat(${width}, minmax(42px, 1fr))` }}>
              <div>−</div>
              {bottomDigits.map((d, i) => (
                <div key={i} className="p-2 rounded-xl bg-surface-color/80 border-2 border-border-color">{d}</div>
              ))}
            </div>

            <hr className="border-t-4 border-slate-400 my-2" />

            <div className="grid gap-1 text-center font-black text-2xl text-emerald-500" style={{ gridTemplateColumns: `repeat(${width}, minmax(42px, 1fr))` }}>
              {resultDigits.map((d, i) => (
                <div key={i} className="p-2 rounded-xl border-2 border-emerald-500 bg-emerald-500/10">{d}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderIdea = () => (
    <div className="space-y-4">
      <div className="p-5 rounded-3xl border-2 border-red-500/30 bg-red-500/10 shadow">
        <div className="font-black text-2xl mb-2">¿Qué es restar?</div>
        <div className="text-sm font-bold opacity-85 leading-relaxed">
          Restar puede significar quitar, comparar, encontrar cuánto falta o retroceder. El símbolo es el mismo, pero la historia puede cambiar.
        </div>
      </div>

      <div className="grid md:grid-cols-4 gap-3">
        <Step n={1} icon="🍪" title="Quitar" text={`Tenías ${a}. Quitas ${b}.`} color="#ef4444" />
        <Step n={2} icon="⚖️" title="Comparar" text={`Compara ${a} y ${b}. La diferencia es ${absDiff}.`} color="#f59e0b" />
        <Step n={3} icon="📍" title="Retroceder" text={`Desde ${a}, retrocedes ${b} pasos.`} color="#0ea5e9" />
        <Step n={4} icon="🎯" title="Cuánto falta" text={`De ${Math.min(a, b)} a ${Math.max(a, b)} faltan ${absDiff}.`} color="#8b5cf6" />
      </div>

      <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
        <div className="text-3xl font-black">{a} − {b} = {diff}</div>
      </div>
    </div>
  );

  const renderObjetos = () => (
    <div className="space-y-4">
      <div className="grid md:grid-cols-[1fr_60px_1fr_60px_1fr] gap-3 items-center">
        <Box title={`Tenías ${a}`} color="#f97316">{objectRow(a, '🍪')}</Box>
        <div className="text-4xl text-center font-black">−</div>
        <Box title={`Quitas ${b}`} color="#ef4444">{objectRow(b, '🍪')}</Box>
        <div className="text-4xl text-center font-black">=</div>
        <Box title={diff >= 0 ? `Quedan ${diff}` : `Faltan ${Math.abs(diff)}`} color={diff >= 0 ? '#22c55e' : '#ef4444'}>
          {diff >= 0 ? objectRow(diff, '🍪') : <div className="text-5xl">⚠️</div>}
        </Box>
      </div>

      {diff < 0 && (
        <div className="p-4 rounded-3xl border-2 border-amber-500 bg-amber-500/10 text-sm font-bold leading-relaxed">
          Estás intentando quitar más de lo que tienes. Eso se puede estudiar con números negativos o como “faltan {Math.abs(diff)}”.
        </div>
      )}
    </div>
  );

  const renderRecta = () => (
    <div className="space-y-4">
      <div className="p-4 rounded-3xl border-2 border-blue-500/30 bg-blue-500/10">
        <div className="font-black text-xl mb-1">Resta en recta numérica</div>
        <div className="text-sm font-bold opacity-80">
          Empiezas en {a}. Como restas {b}, retrocedes {b} pasos hacia la izquierda. Llegas a {diff}.
        </div>
      </div>

      <div className="number-line-shell w-full max-w-full min-w-0 overflow-x-auto overflow-y-hidden pb-2">
        <div className="w-full min-w-[420px] max-w-full">
          <NumberLineVisual visual={{ type: 'number-line', start: Math.min(0, diff - 2), end: Math.max(10, a + 2), current: a, jump: -b }} />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        <Step n={1} icon="📍" title="Punto inicial" text={`Te paras en ${a}.`} color="#22c55e" />
        <Step n={2} icon="⬅️" title="Retroceso" text={`Caminas ${b} espacios hacia la izquierda.`} color="#ef4444" />
        <Step n={3} icon="🏁" title="Llegada" text={`Llegas a ${diff}.`} color="#0ea5e9" />
      </div>
    </div>
  );

  const renderComparar = () => {
    const mayor = Math.max(a, b);
    const menor = Math.min(a, b);

    return (
      <div className="space-y-4">
        <div className="p-5 rounded-3xl border-2 border-amber-500/30 bg-amber-500/10 shadow">
          <div className="font-black text-2xl mb-2">Resta como comparación</div>
          <div className="text-sm font-bold opacity-85 leading-relaxed">
            Restar también responde: ¿cuántos más tiene uno que el otro? ¿Cuánto falta para llegar?
          </div>
        </div>

        <div className="grid md:grid-cols-[1fr_80px_1fr] gap-3 items-end">
          <Box title={`Grupo A: ${a}`} color="#22c55e">{objectRow(a, '🟢')}</Box>
          <div className="text-4xl text-center font-black pb-8">vs</div>
          <Box title={`Grupo B: ${b}`} color="#0ea5e9">{objectRow(b, '🔵')}</Box>
        </div>

        <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
          <div className="text-xl font-black">Diferencia</div>
          <div className="text-4xl font-black mt-2">{mayor} − {menor} = {absDiff}</div>
          <div className="text-sm font-bold opacity-75 mt-2">Faltan {absDiff} para que el grupo menor alcance al mayor.</div>
        </div>
      </div>
    );
  };

  const renderPrestando = () => {
    const top = Math.max(a, b);
    const bottom = Math.min(a, b);

    return (
      <div className="space-y-4">
        <div className="p-5 rounded-3xl border-2 border-red-500/30 bg-red-500/10 shadow">
          <div className="font-black text-2xl mb-2">Resta prestando / reagrupando</div>
          <div className="text-sm font-bold opacity-85 leading-relaxed">
            Prestar significa cambiar 1 de una columna mayor por 10 de la columna menor. Por ejemplo: 1 centena puede convertirse en 10 decenas.
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <button onClick={() => { setA(1000); setB(524); }} className="px-4 py-2 rounded-2xl bg-red-500 text-white font-black shadow hover:scale-105 transition-all">
            1000 − 524
          </button>
          <button onClick={() => { setA(302); setB(187); }} className="px-4 py-2 rounded-2xl bg-surface-color border-2 border-border-color font-black shadow hover:scale-105 transition-all">
            302 − 187
          </button>
          <button onClick={() => { setA(7000); setB(4689); }} className="px-4 py-2 rounded-2xl bg-surface-color border-2 border-border-color font-black shadow hover:scale-105 transition-all">
            7000 − 4689
          </button>
        </div>

        {a < b && (
          <div className="p-4 rounded-3xl border-2 border-amber-500 bg-amber-500/10 text-sm font-bold leading-relaxed">
            Para practicar préstamo sin negativos, pongo arriba el número mayor: {top} − {bottom}. Después trabajamos negativos en otra pestaña.
          </div>
        )}

        <ColumnSubtract topValue={top} bottomValue={bottom} />
      </div>
    );
  };

  const renderCero = () => (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-3">
        <Box title="Restar cero" color="#38bdf8" note="Quitar nada no cambia la cantidad.">
          <div className="text-4xl font-black">{a} − 0 = {a}</div>
          <div className="text-5xl mt-2">⭕</div>
        </Box>

        <Box title="Restar el mismo número" color="#8b5cf6" note="Si quitas todo, queda cero.">
          <div className="text-4xl font-black">{a} − {a} = 0</div>
          <div className="text-5xl mt-2">📦</div>
        </Box>
      </div>
    </div>
  );

  const renderNegativos = () => (
    <div className="space-y-4">
      <div className="p-5 rounded-3xl border-2 border-red-500/30 bg-red-500/10 shadow">
        <div className="font-black text-2xl mb-2">Cuando restas más de lo que tienes</div>
        <div className="text-sm font-bold opacity-85 leading-relaxed">
          Si estás en {a} y retrocedes {b}, puedes pasar a la izquierda del cero. Eso produce un número negativo.
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        <button onClick={() => { setA(5); setB(8); }} className="px-4 py-2 rounded-2xl bg-red-500 text-white font-black shadow hover:scale-105 transition-all">
          5 − 8
        </button>
        <button onClick={() => { setA(3); setB(10); }} className="px-4 py-2 rounded-2xl bg-surface-color border-2 border-border-color font-black shadow hover:scale-105 transition-all">
          3 − 10
        </button>
      </div>

      <div className="number-line-shell w-full max-w-full min-w-0 overflow-x-auto overflow-y-hidden pb-2">
        <div className="w-full min-w-[420px] max-w-full">
          <NumberLineVisual visual={{ type: 'number-line', start: Math.min(-10, diff - 2), end: Math.max(10, a + 2), current: a, jump: -b }} />
        </div>
      </div>

      <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
        <div className="text-4xl font-black">{a} − {b} = {diff}</div>
      </div>
    </div>
  );

  const renderProblemas = () => (
    <div className="space-y-4">
      <div className="grid md:grid-cols-3 gap-3">
        <Box title="Problema 1" color="#ef4444" note={`Tenías ${a} dulces y comiste ${b}. Te quedan ${diff}.`}>
          <div className="text-5xl">🍬</div>
          <div className="font-black text-2xl mt-2">{a} − {b} = {diff}</div>
        </Box>

        <Box title="Problema 2" color="#f59e0b" note={`Una torre tiene ${Math.max(a, b)} bloques y otra ${Math.min(a, b)}. La diferencia es ${absDiff}.`}>
          <div className="text-5xl">🧱</div>
          <div className="font-black text-2xl mt-2">{Math.max(a, b)} − {Math.min(a, b)} = {absDiff}</div>
        </Box>

        <Box title="Problema 3" color="#0ea5e9" note={`Quieres llegar a ${Math.max(a, b)} y vas en ${Math.min(a, b)}. Faltan ${absDiff}.`}>
          <div className="text-5xl">🎯</div>
          <div className="font-black text-2xl mt-2">{Math.max(a, b)} − {Math.min(a, b)} = {absDiff}</div>
        </Box>
      </div>
    </div>
  );

  const renderErrores = () => (
    <div className="space-y-4">
      <div className="p-5 rounded-3xl border-2 border-orange-500/30 bg-orange-500/10 shadow">
        <div className="font-black text-2xl mb-2">Cuidado con lo que estás quitando</div>
        <div className="text-sm font-bold opacity-85 leading-relaxed">
          Restar necesita una historia clara: quitar de un grupo, comparar dos grupos o medir cuánto falta.
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <Box title="Tiene sentido" color="#22c55e" note="Quito galletas de un grupo de galletas.">
          <div className="text-2xl font-black">{a} 🍪 − {b} 🍪</div>
        </Box>

        <Box title="Necesita contexto" color="#f97316" note="No puedes quitar perros de una caja que solo tenía gatos, a menos que expliques una categoría común.">
          <div className="text-2xl font-black">{a} 🐱 − {b} 🐶</div>
        </Box>
      </div>
    </div>
  );

  const maxValue = mode === 'prestando' ? 9999 : mode === 'negativos' ? 30 : 50;

  return (
    <TopicCard icon="➖" title="Resta Interactiva" color="#ef4444" desc="Aprende la resta como quitar, comparar, retroceder, prestar y entender negativos con apoyo visual.">
      <div className="lab-container space-y-4">
        <div className="grid md:grid-cols-2 gap-3">
          <NumberInput label="Número A" value={a} setValue={(v) => setA(clamp(v, 0, maxValue))} min={0} max={maxValue} color="#ef4444" />
          <NumberInput label="Número B" value={b} setValue={(v) => setB(clamp(v, 0, maxValue))} min={0} max={maxValue} color="#f97316" />
        </div>

        <div className="lab-formula text-center">
          {a} − {b} = <span style={{ color: 'var(--primary-color)' }}>{diff}</span>
        </div>

        <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(105px, 1fr))' }}>
          {modeTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setMode(tab.id)}
              className={`p-3 rounded-2xl font-black text-xs transition-all hover:scale-105 ${
                mode === tab.id ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color'
              }`}
            >
              <span className="text-2xl block mb-1">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {mode === 'idea' && renderIdea()}
        {mode === 'objetos' && renderObjetos()}
        {mode === 'recta' && renderRecta()}
        {mode === 'comparar' && renderComparar()}
        {mode === 'prestando' && renderPrestando()}
        {mode === 'cero' && renderCero()}
        {mode === 'negativos' && renderNegativos()}
        {mode === 'problemas' && renderProblemas()}
        {mode === 'errores' && renderErrores()}
      </div>
    </TopicCard>
  );
};










export const SumaLlevando: React.FC = () => {
  const [n1, setN1] = useState(28);
  const [n2, setN2] = useState(15);
  const ones1 = n1 % 10, tens1 = Math.floor(n1 / 10);
  const ones2 = n2 % 10, tens2 = Math.floor(n2 / 10);
  const onesSum = ones1 + ones2;
  const carry = onesSum >= 10 ? 1 : 0;
  const onesFinal = onesSum % 10;
  const tensFinal = tens1 + tens2 + carry;
  const total = n1 + n2;
  return (
    <TopicCard icon="📈" title="Suma con Reagrupación (Suma Llevando)" color="#22c55e" desc="Aprende cómo sumar columnas cuando las unidades pasan de 9. Llevamos 1 a las decenas:">
      <div className="lab-container space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <NumberInput label="Número A" value={n1} setValue={setN1} min={10} max={99} color="#22c55e" />
          <NumberInput label="Número B" value={n2} setValue={setN2} min={10} max={99} color="#16a34a" />
        </div>
        <div className="flex justify-center p-6 bg-surface-color rounded-3xl border-2 border-border-color shadow max-w-xs mx-auto font-mono font-black text-2xl relative">
          <div className="absolute top-2 left-6 text-[10px] bg-amber-400 text-slate-900 px-2 py-0.5 rounded-full font-sans">Llevas: {carry}</div>
          <div className="text-right space-y-2">
            <div className="text-xs text-slate-400 font-sans tracking-wide">DEC  UNI</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;{carry > 0 ? <span className="text-amber-500 text-sm">⁽¹⁾</span> : ''}</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;{tens1}&nbsp;&nbsp;&nbsp;{ones1}</div>
            <div>+&nbsp;&nbsp;&nbsp;{tens2}&nbsp;&nbsp;&nbsp;{ones2}</div>
            <hr className="border-t-2 border-slate-400 my-1" />
            <div className="text-emerald-500">&nbsp;&nbsp;&nbsp;&nbsp;{tensFinal}&nbsp;&nbsp;&nbsp;{onesFinal}</div>
          </div>
        </div>
        <div className="text-sm font-bold opacity-80 p-3 bg-emerald-500/10 rounded-xl leading-relaxed">💡 <b>Explicación:</b> Sumamos unidades: {ones1} + {ones2} = {onesSum}. Queda el {onesFinal} y llevamos 1 a las decenas. Sumamos decenas: 1 (llevado) + {tens1} + {tens2} = {tensFinal}. Total: <b>{total}</b>.</div>
      </div>
    </TopicCard>
  );
};

export const ValorPosicional: React.FC = () => {
  type Mode =
    | 'guia'
    | 'explorar'
    | 'bloques'
    | 'descomponer'
    | 'comparar'
    | 'ordenar'
    | 'recta'
    | 'vecinos'
    | 'misterioso'
    | 'tarjetas'
    | 'redondear';

  const [mode, setMode] = useState<Mode>('guia');
  const [num, setNum] = useState(345);
  const [compareA, setCompareA] = useState(238);
  const [compareB, setCompareB] = useState(321);
  const [orderNums, setOrderNums] = useState<number[]>([142, 309, 76, 250]);
  const [orderPick, setOrderPick] = useState<number[]>([]);
  const [lineNum, setLineNum] = useState(47);
  const [mysteryH, setMysteryH] = useState(3);
  const [mysteryT, setMysteryT] = useState(4);
  const [mysteryU, setMysteryU] = useState(5);
  const [cardH, setCardH] = useState(2);
  const [cardT, setCardT] = useState(7);
  const [cardU, setCardU] = useState(8);
  const [roundNum, setRoundNum] = useState(64);

  const C = {
    h: '#84cc16',
    t: '#0ea5e9',
    u: '#f59e0b',
    main: '#8b5cf6',
  };

  const modes: { id: Mode; label: string; icon: string }[] = [
    { id: 'guia', label: 'Guía', icon: '🧭' },
    { id: 'explorar', label: 'Explorar', icon: '🔢' },
    { id: 'bloques', label: 'Bloques', icon: '🧱' },
    { id: 'descomponer', label: 'Descomponer', icon: '🧩' },
    { id: 'comparar', label: 'Comparar', icon: '⚖️' },
    { id: 'ordenar', label: 'Ordenar', icon: '🔀' },
    { id: 'recta', label: 'Recta', icon: '📍' },
    { id: 'vecinos', label: 'Vecinos', icon: '👥' },
    { id: 'misterioso', label: 'Misterio', icon: '🕵️' },
    { id: 'tarjetas', label: 'Tarjetas', icon: '🎴' },
    { id: 'redondear', label: 'Redondear', icon: '🎯' },
  ];

  const clamp999 = (v: number) => Math.max(0, Math.min(999, Math.floor(v)));

  const split3 = (n: number) => ({
    c: Math.floor(n / 100),
    d: Math.floor((n % 100) / 10),
    u: n % 10,
  });

  const buildNumber = (c: number, d: number, u: number) => c * 100 + d * 10 + u;

  const expanded = (n: number) => {
    const { c, d, u } = split3(n);
    const parts = [c * 100, d * 10, u].filter(x => x > 0);
    return parts.length ? parts.join(' + ') : '0';
  };

  const bg = (color: string) => ({
    borderColor: color,
    background: `linear-gradient(135deg, ${color}38, ${color}12)`,
  });

  const Panel = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <div className={`p-4 rounded-3xl bg-surface-color border-2 border-border-color shadow ${className}`}>
      {children}
    </div>
  );

  const Idea = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="rounded-3xl border-2 border-[var(--primary-color)]/40 bg-[var(--primary-color)]/10 shadow overflow-hidden">
      <div className="grid md:grid-cols-[190px_1fr]">
        <div className="p-4 bg-[var(--primary-color)] text-white flex items-center justify-center">
          <div className="text-center">
            <div className="text-3xl mb-1">🧠</div>
            <div className="font-black text-lg leading-tight">{title}</div>
          </div>
        </div>
        <div className="p-4 text-sm font-bold opacity-90 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );

  const Arrow = () => (
    <div className="hidden md:flex items-center justify-center text-4xl font-black animate-pulse">➡️</div>
  );

  const Shape = ({ type, color, small = false }: { type: 'block' | 'bar' | 'dot'; color: string; small?: boolean }) => {
    if (type === 'block') {
      return (
        <div
          className={`${small ? 'w-12 h-12' : 'w-20 h-20'} rounded-2xl border-4 grid grid-cols-3 gap-[2px] p-1 shadow`}
          style={{ borderColor: color, background: `${color}55` }}
        >
          {Array.from({ length: 9 }).map((_, i) => <div key={i} className="rounded-sm bg-white/70" />)}
        </div>
      );
    }

    if (type === 'bar') {
      return (
        <div
          className={`${small ? 'w-6 h-14' : 'w-10 h-24'} rounded-2xl border-4 shadow`}
          style={{ borderColor: color, background: `${color}55` }}
        />
      );
    }

    return (
      <div
        className={`${small ? 'w-10 h-10' : 'w-20 h-20'} rounded-full border-4 shadow`}
        style={{ borderColor: color, background: `${color}66` }}
      />
    );
  };

  const Route = () => (
    <div className="grid md:grid-cols-[1fr_50px_1fr_50px_1fr] gap-3 items-stretch">
      <div className="p-4 rounded-3xl border-2 shadow text-center hover:scale-[1.02] transition-all" style={bg(C.main)}>
        <div className="text-3xl mb-1">📍</div>
        <div className="text-xs font-black uppercase opacity-70">Paso 1</div>
        <div className="font-black text-xl">Columna</div>
        <div className="text-sm font-bold opacity-80">¿Dónde está?</div>
      </div>
      <Arrow />
      <div className="p-4 rounded-3xl border-2 shadow text-center hover:scale-[1.02] transition-all" style={bg(C.main)}>
        <div className="text-3xl mb-1">🔢</div>
        <div className="text-xs font-black uppercase opacity-70">Paso 2</div>
        <div className="font-black text-xl">Dígito</div>
        <div className="text-sm font-bold opacity-80">¿Qué número veo?</div>
      </div>
      <Arrow />
      <div className="p-4 rounded-3xl border-2 shadow text-center hover:scale-[1.02] transition-all" style={bg(C.main)}>
        <div className="text-3xl mb-1">💡</div>
        <div className="text-xs font-black uppercase opacity-70">Paso 3</div>
        <div className="font-black text-xl">Valor</div>
        <div className="text-sm font-bold opacity-80">¿Cuánto vale?</div>
      </div>
    </div>
  );

  const AssociationMap = () => (
    <div className="grid md:grid-cols-3 gap-3">
      <div className="p-4 rounded-3xl border-2 shadow text-center hover:scale-[1.03] transition-all" style={bg(C.h)}>
        <div className="text-3xl mb-1">🟩</div>
        <div className="font-black text-xl">Centenas</div>
        <div className="my-3 flex justify-center"><Shape type="block" color={C.h} /></div>
        <div className="font-black">Verde + bloque = ×100</div>
      </div>
      <div className="p-4 rounded-3xl border-2 shadow text-center hover:scale-[1.03] transition-all" style={bg(C.t)}>
        <div className="text-3xl mb-1">🟦</div>
        <div className="font-black text-xl">Decenas</div>
        <div className="my-3 flex justify-center"><Shape type="bar" color={C.t} /></div>
        <div className="font-black">Azul + barra = ×10</div>
      </div>
      <div className="p-4 rounded-3xl border-2 shadow text-center hover:scale-[1.03] transition-all" style={bg(C.u)}>
        <div className="text-3xl mb-1">🟠</div>
        <div className="font-black text-xl">Unidades</div>
        <div className="my-3 flex justify-center"><Shape type="dot" color={C.u} /></div>
        <div className="font-black">Ámbar + punto = ×1</div>
      </div>
    </div>
  );

  const ColumnCard = ({ label, digit, multiplier, color, shape, emoji }: {
    label: string;
    digit: number;
    multiplier: number;
    color: string;
    shape: 'block' | 'bar' | 'dot';
    emoji: string;
  }) => (
    <div className="p-4 rounded-3xl border-2 shadow text-center hover:scale-[1.02] transition-all" style={bg(color)}>
      <div className="text-3xl mb-1">{emoji}</div>
      <div className="text-xs font-black uppercase opacity-70 mb-2">{label}</div>
      <div className="flex justify-center mb-3"><Shape type={shape} color={color} /></div>
      <div className="text-xs font-black uppercase opacity-70">Dígito</div>
      <div className="text-6xl font-black text-text-color">{digit}</div>
      <div className="mt-2 p-2 rounded-2xl bg-surface-color/90 border border-border-color font-black">
        {digit} × {multiplier} = {digit * multiplier}
      </div>
    </div>
  );

  const PlaceMap = ({ value }: { value: number }) => {
    const { c, d, u } = split3(value);
    return (
      <div className="grid md:grid-cols-3 gap-3">
        <ColumnCard label="Centenas" digit={c} multiplier={100} color={C.h} shape="block" emoji="🟩" />
        <ColumnCard label="Decenas" digit={d} multiplier={10} color={C.t} shape="bar" emoji="🟦" />
        <ColumnCard label="Unidades" digit={u} multiplier={1} color={C.u} shape="dot" emoji="🟠" />
      </div>
    );
  };

  const NumberStage = ({ value }: { value: number }) => (
    <Panel>
      <div className="text-xs font-black uppercase opacity-70 text-center mb-1">Número actual</div>
      <div className="text-7xl md:text-8xl font-black text-center text-text-color">{value}</div>
      <div className="mt-3 text-center font-black">{value} = {expanded(value)}</div>
    </Panel>
  );

  const BaseTenBlocks = ({ value }: { value: number }) => {
    const { c, d, u } = split3(value);

    return (
      <div className="grid md:grid-cols-3 gap-4">
        <div className="p-4 rounded-3xl border-2 shadow text-center" style={bg(C.h)}>
          <div className="font-black text-xl mb-2">Centenas</div>
          <div className="flex gap-2 flex-wrap justify-center min-h-20 items-center">
            {Array.from({ length: c }).map((_, i) => <Shape key={i} type="block" color={C.h} small />)}
            {c === 0 && <span className="font-black opacity-60">0 centenas</span>}
          </div>
          <div className="font-black mt-3">{c} × 100 = {c * 100}</div>
        </div>

        <div className="p-4 rounded-3xl border-2 shadow text-center" style={bg(C.t)}>
          <div className="font-black text-xl mb-2">Decenas</div>
          <div className="flex gap-2 flex-wrap justify-center min-h-20 items-center">
            {Array.from({ length: d }).map((_, i) => <Shape key={i} type="bar" color={C.t} small />)}
            {d === 0 && <span className="font-black opacity-60">0 decenas</span>}
          </div>
          <div className="font-black mt-3">{d} × 10 = {d * 10}</div>
        </div>

        <div className="p-4 rounded-3xl border-2 shadow text-center" style={bg(C.u)}>
          <div className="font-black text-xl mb-2">Unidades</div>
          <div className="flex gap-2 flex-wrap justify-center min-h-20 items-center">
            {Array.from({ length: u }).map((_, i) => <Shape key={i} type="dot" color={C.u} small />)}
            {u === 0 && <span className="font-black opacity-60">0 unidades</span>}
          </div>
          <div className="font-black mt-3">{u} × 1 = {u}</div>
        </div>
      </div>
    );
  };

  const compareExplanation = () => {
    const A = split3(compareA);
    const B = split3(compareB);

    if (compareA === compareB) return 'Son iguales: todos sus dígitos coinciden.';
    if (A.c !== B.c) return 'Se decide en centenas. Mira los recuadros verdes.';
    if (A.d !== B.d) return 'Las centenas empatan. Se decide en decenas. Mira los recuadros azules.';
    return 'Centenas y decenas empatan. Se decide en unidades. Mira los recuadros ámbar.';
  };

  const renderGuia = () => (
    <div className="space-y-4">
      <Idea title="Asociación cruzada">
        El número principal queda neutral. La pista está en los recuadros: color, figura, nombre y valor siempre coinciden.
      </Idea>
      <Route />
      <AssociationMap />
      <Panel>
        <div className="font-black text-xl mb-3 text-center">Ejemplo: 345</div>
        <PlaceMap value={345} />
        <div className="mt-4 lab-formula text-center text-lg">345 = 300 + 40 + 5</div>
      </Panel>
    </div>
  );

  const renderExplorar = () => (
    <div className="space-y-4">
      <Idea title="Explorar">
        Cambia el número y sigue la ruta: columna → dígito → valor. Los recuadros mantienen la asociación visual.
      </Idea>
      <NumberInput label="Número" value={num} setValue={(v) => setNum(clamp999(v))} min={0} max={999} color={C.h} />
      <NumberStage value={num} />
      <PlaceMap value={num} />
    </div>
  );

  const renderBloques = () => (
    <div className="space-y-4">
      <Idea title="Dígitos a bloques">
        El número escrito se traduce a piezas: verde son centenas, azul son decenas, ámbar son unidades.
      </Idea>
      <NumberInput label="Número para construir" value={num} setValue={(v) => setNum(clamp999(v))} min={0} max={999} color={C.h} />
      <NumberStage value={num} />
      <BaseTenBlocks value={num} />
    </div>
  );

  const renderDescomponer = () => {
    const { c, d, u } = split3(num);

    return (
      <div className="space-y-4">
        <Idea title="Descomponer">
          Cada recuadro se convierte en una parte de la suma. Así el número grande se vuelve tres piezas pequeñas.
        </Idea>
        <NumberInput label="Número" value={num} setValue={(v) => setNum(clamp999(v))} min={0} max={999} color={C.h} />
        <PlaceMap value={num} />
        <div className="grid md:grid-cols-[1fr_40px_1fr_40px_1fr] gap-2 items-center">
          <div className="p-4 rounded-3xl border-2 text-center font-black text-3xl" style={bg(C.h)}>{c * 100}</div>
          <div className="text-center text-3xl font-black">+</div>
          <div className="p-4 rounded-3xl border-2 text-center font-black text-3xl" style={bg(C.t)}>{d * 10}</div>
          <div className="text-center text-3xl font-black">+</div>
          <div className="p-4 rounded-3xl border-2 text-center font-black text-3xl" style={bg(C.u)}>{u}</div>
        </div>
        <div className="lab-formula text-center text-lg">{num} = {expanded(num)}</div>
      </div>
    );
  };

  const renderComparar = () => {
    const sign = compareA > compareB ? '>' : compareA < compareB ? '<' : '=';

    return (
      <div className="space-y-4">
        <Idea title="Comparar por columnas">
          No compares todo de golpe. Primero verde, luego azul, luego ámbar.
        </Idea>
        <div className="grid md:grid-cols-2 gap-3">
          <NumberInput label="Número A" value={compareA} setValue={(v) => setCompareA(clamp999(v))} min={0} max={999} color="#22c55e" />
          <NumberInput label="Número B" value={compareB} setValue={(v) => setCompareB(clamp999(v))} min={0} max={999} color="#3b82f6" />
        </div>
        <div className="grid md:grid-cols-[1fr_110px_1fr] gap-4 items-center">
          <Panel>
            <div className="text-center text-6xl font-black text-text-color">{compareA}</div>
            <PlaceMap value={compareA} />
          </Panel>
          <div className="p-5 rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30 text-center shadow">
            <div className="text-7xl font-black">{sign}</div>
          </div>
          <Panel>
            <div className="text-center text-6xl font-black text-text-color">{compareB}</div>
            <PlaceMap value={compareB} />
          </Panel>
        </div>
        <div className="lab-formula text-center text-base">{compareExplanation()}</div>
      </div>
    );
  };

  const newOrderGroup = () => {
    const set = new Set<number>();
    while (set.size < 4) set.add(Math.floor(Math.random() * 900) + 10);
    setOrderNums([...set]);
    setOrderPick([]);
  };

  const renderOrdenar = () => {
    const correct = [...orderNums].sort((a, b) => a - b);
    const ok = orderPick.length === orderNums.length && orderPick.every((n, i) => n === correct[i]);

    return (
      <div className="space-y-4">
        <Idea title="Ordenar">
          Busca primero el menor. Después repite. No cargues los cuatro números al mismo tiempo.
        </Idea>
        <Panel>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {orderNums.map(n => (
              <button
                key={n}
                disabled={orderPick.includes(n)}
                onClick={() => !orderPick.includes(n) && setOrderPick([...orderPick, n])}
                className={`p-5 rounded-3xl border-2 font-black text-4xl transition-all ${
                  orderPick.includes(n) ? 'opacity-40 bg-slate-200 dark:bg-slate-700' : 'bg-surface-color border-border-color hover:scale-105 hover:shadow-xl'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
          <div className="mt-4 p-4 rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30 flex gap-2 flex-wrap justify-center">
            {orderPick.length === 0 ? (
              <span className="text-sm font-bold opacity-70">Tu orden aparecerá aquí.</span>
            ) : (
              orderPick.map(n => <span key={n} className="px-4 py-2 rounded-full bg-surface-color border-2 border-border-color font-black">{n}</span>)
            )}
          </div>
          {orderPick.length === orderNums.length && (
            <div className={`mt-4 p-4 rounded-2xl text-white text-center font-black ${ok ? 'bg-emerald-500' : 'bg-red-500'}`}>
              {ok ? '✅ Orden correcto.' : `El orden correcto es ${correct.join(', ')}.`}
            </div>
          )}
        </Panel>
        <button onClick={newOrderGroup} className="math-btn w-full">Nuevo grupo</button>
      </div>
    );
  };

  const renderRecta = () => {
    const decadeStart = Math.min(90, Math.floor(lineNum / 10) * 10);
    const decadeEnd = decadeStart + 10;
    const jump = lineNum - decadeStart;

    return (
      <div className="space-y-4">
        <Idea title="Recta numérica">
          La recta muestra posición. Empieza en la decena anterior y salta hasta el número.
        </Idea>
        <NumberInput label="Número en la recta" value={lineNum} setValue={(v) => setLineNum(Math.max(0, Math.min(100, Math.floor(v))))} min={0} max={100} color={C.t} />
        <Panel>
          <div className="lab-formula text-center mb-3">{decadeStart} + {jump} = {lineNum}</div>
          <div className="number-line-shell w-full max-w-full min-w-0 overflow-x-auto overflow-y-hidden pb-2">
            <div className="w-full min-w-[360px] max-w-full">
              <NumberLineVisual visual={{ type: 'number-line', start: decadeStart, end: decadeEnd, current: decadeStart, jump }} />
            </div>
          </div>
        </Panel>
      </div>
    );
  };

  const renderVecinos = () => (
    <div className="space-y-4">
      <Idea title="Vecinos">
        Anterior es −1. Siguiente es +1. Saltar decenas es −10 o +10.
      </Idea>
      <NumberInput label="Número" value={num} setValue={(v) => setNum(clamp999(v))} min={0} max={999} color={C.h} />
      <div className="grid md:grid-cols-5 gap-3 text-center">
        <div className="p-4 rounded-3xl border-2 shadow font-black" style={bg(C.t)}>{Math.max(0, num - 10)}<div className="text-xs opacity-70">-10</div></div>
        <div className="p-4 rounded-3xl border-2 shadow font-black" style={bg(C.u)}>{Math.max(0, num - 1)}<div className="text-xs opacity-70">antes</div></div>
        <div className="p-4 rounded-3xl border-2 shadow font-black bg-[var(--primary-color)]/10 border-[var(--primary-color)]">{num}<div className="text-xs opacity-70">número</div></div>
        <div className="p-4 rounded-3xl border-2 shadow font-black" style={bg(C.u)}>{Math.min(999, num + 1)}<div className="text-xs opacity-70">después</div></div>
        <div className="p-4 rounded-3xl border-2 shadow font-black" style={bg(C.t)}>{Math.min(999, num + 10)}<div className="text-xs opacity-70">+10</div></div>
      </div>
    </div>
  );

  const renderMisterioso = () => {
    const answer = buildNumber(mysteryH, mysteryT, mysteryU);

    return (
      <div className="space-y-4">
        <Idea title="Número misterioso">
          Construye de izquierda a derecha: primero centenas, luego decenas, luego unidades.
        </Idea>
        <div className="grid md:grid-cols-3 gap-3">
          <NumberInput label="Centenas" value={mysteryH} setValue={(v) => setMysteryH(Math.max(0, Math.min(9, Math.floor(v))))} min={0} max={9} color={C.h} />
          <NumberInput label="Decenas" value={mysteryT} setValue={(v) => setMysteryT(Math.max(0, Math.min(9, Math.floor(v))))} min={0} max={9} color={C.t} />
          <NumberInput label="Unidades" value={mysteryU} setValue={(v) => setMysteryU(Math.max(0, Math.min(9, Math.floor(v))))} min={0} max={9} color={C.u} />
        </div>
        <Panel>
          <PlaceMap value={answer} />
          <div className="text-7xl font-black text-center mt-5">{answer}</div>
          <div className="lab-formula text-center mt-2">{answer} = {expanded(answer)}</div>
        </Panel>
      </div>
    );
  };

  const renderTarjetas = () => {
    const value = buildNumber(cardH, cardT, cardU);
    const digits = Array.from({ length: 10 }, (_, i) => i);

    const digitButtons = (current: number, set: (v: number) => void, label: string, color: string) => (
      <div className="p-4 rounded-3xl border-2 shadow" style={bg(color)}>
        <div className="font-black text-center mb-2">{label}</div>
        <div className="grid grid-cols-5 gap-2">
          {digits.map(d => (
            <button
              key={d}
              onClick={() => set(d)}
              className={`h-12 rounded-2xl border-2 font-black transition-all ${
                current === d ? 'bg-surface-color border-[var(--primary-color)] scale-105 shadow' : 'bg-surface-color/70 border-border-color hover:scale-105'
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>
    );

    return (
      <div className="space-y-4">
        <Idea title="Tarjetas">
          Cada tarjeta ocupa una columna. Cambiar una tarjeta cambia solo esa parte del número.
        </Idea>
        <div className="grid md:grid-cols-3 gap-3">
          {digitButtons(cardH, setCardH, 'Centenas', C.h)}
          {digitButtons(cardT, setCardT, 'Decenas', C.t)}
          {digitButtons(cardU, setCardU, 'Unidades', C.u)}
        </div>
        <NumberStage value={value} />
        <PlaceMap value={value} />
      </div>
    );
  };

  const renderRedondear = () => {
    const rounded = Math.round(roundNum / 10) * 10;
    const lower = Math.floor(roundNum / 10) * 10;
    const upper = lower + 10;
    const unit = roundNum % 10;
    const jump = rounded - roundNum;

    return (
      <div className="space-y-4">
        <Idea title="Redondear">
          Para redondear a decenas, mira solo la unidad: 0 a 4 se queda; 5 a 9 sube.
        </Idea>
        <NumberInput label="Número" value={roundNum} setValue={(v) => setRoundNum(Math.max(0, Math.min(999, Math.floor(v))))} min={0} max={999} color={C.u} />
        <Panel>
          <div className="lab-formula text-center mb-3">{roundNum} {jump >= 0 ? '+' : '−'} {Math.abs(jump)} = {rounded}</div>
          <div className="number-line-shell w-full max-w-full min-w-0 overflow-x-auto overflow-y-hidden pb-2">
            <div className="w-full min-w-[360px] max-w-full">
              <NumberLineVisual visual={{ type: 'number-line', start: lower, end: upper, current: roundNum, jump }} />
            </div>
          </div>
        </Panel>
        <div className="grid md:grid-cols-2 gap-3">
          <div className="p-4 rounded-3xl border-2 shadow text-center" style={bg(C.u)}>
            <div className="text-xs font-black uppercase opacity-70">Unidad que decide</div>
            <div className="text-6xl font-black">{unit}</div>
          </div>
          <div className="p-4 rounded-3xl border-2 shadow text-center bg-emerald-500/10 border-emerald-500/40">
            <div className="text-xs font-black uppercase opacity-70">Resultado</div>
            <div className="text-6xl font-black">{rounded}</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <TopicCard
      icon="🔢"
      title="Números y Valor Posicional"
      color="#84cc16"
      desc="Aprende con asociación cruzada: recuadro, color, figura, columna y valor. Ruta fija: columna → dígito → valor."
    >
      <div className="lab-container space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
          {modes.map(m => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`p-3 rounded-2xl font-black text-xs transition-all ${
                mode === m.id ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color hover:scale-105'
              }`}
            >
              <span className="text-2xl block mb-1">{m.icon}</span>
              {m.label}
            </button>
          ))}
        </div>

        {mode === 'guia' && renderGuia()}
        {mode === 'explorar' && renderExplorar()}
        {mode === 'bloques' && renderBloques()}
        {mode === 'descomponer' && renderDescomponer()}
        {mode === 'comparar' && renderComparar()}
        {mode === 'ordenar' && renderOrdenar()}
        {mode === 'recta' && renderRecta()}
        {mode === 'vecinos' && renderVecinos()}
        {mode === 'misterioso' && renderMisterioso()}
        {mode === 'tarjetas' && renderTarjetas()}
        {mode === 'redondear' && renderRedondear()}
      </div>
    </TopicCard>
  );
};







export const ValorPosicionalMillones: React.FC = () => {
  type Mode = 'guia' | 'tabla' | 'periodos' | 'descomponer' | 'lectura' | 'comparar' | 'redondear';

  const [mode, setMode] = useState<Mode>('guia');
  const [num, setNum] = useState(3456789);
  const [compareA, setCompareA] = useState(1205400);
  const [compareB, setCompareB] = useState(987650);
  const [roundTo, setRoundTo] = useState(1000);

  const G = {
    millions: '#7c3aed',
    thousands: '#0ea5e9',
    units: '#22c55e',
    h: '#84cc16',
    t: '#f59e0b',
    u: '#ef4444',
  };

  const places = [
    { key: 'millones', label: 'Millones', value: 1000000, color: G.millions },
    { key: 'centenasMil', label: 'Centenas de mil', value: 100000, color: G.thousands },
    { key: 'decenasMil', label: 'Decenas de mil', value: 10000, color: G.thousands },
    { key: 'unidadesMil', label: 'Unidades de mil', value: 1000, color: G.thousands },
    { key: 'centenas', label: 'Centenas', value: 100, color: G.h },
    { key: 'decenas', label: 'Decenas', value: 10, color: G.t },
    { key: 'unidades', label: 'Unidades', value: 1, color: G.u },
  ];

  const modes: { id: Mode; label: string; icon: string }[] = [
    { id: 'guia', label: 'Guía', icon: '🧭' },
    { id: 'tabla', label: 'Tabla', icon: '🏛️' },
    { id: 'periodos', label: 'Periodos', icon: '🧱' },
    { id: 'descomponer', label: 'Descomponer', icon: '🧩' },
    { id: 'lectura', label: 'Leer', icon: '🗣️' },
    { id: 'comparar', label: 'Comparar', icon: '⚖️' },
    { id: 'redondear', label: 'Redondear', icon: '🎯' },
  ];

  const clean = (v: number) => Math.max(0, Math.min(9999999, Math.floor(v)));
  const digits = (n: number) => String(clean(n)).padStart(7, '0').split('').map(Number);

  const bg = (color: string) => ({
    borderColor: color,
    background: `linear-gradient(135deg, ${color}38, ${color}12)`,
  });

  const expanded = (n: number) => {
    const ds = digits(n);
    const parts = ds.map((d, i) => d * places[i].value).filter(x => x > 0);
    return parts.length ? parts.join(' + ') : '0';
  };

  const groups = (n: number) => {
    const value = clean(n);
    const millions = Math.floor(value / 1000000);
    const thousands = Math.floor((value % 1000000) / 1000);
    const units = value % 1000;
    return { millions, thousands, units };
  };

  const groupText = (n: number) => {
    const g = groups(n);
    const parts = [];
    if (g.millions) parts.push(g.millions + ' millón(es)');
    if (g.thousands) parts.push(g.thousands + ' mil');
    if (g.units) parts.push(String(g.units));
    return parts.length ? parts.join(', ') : 'cero';
  };

  const Panel = ({ children }: { children: React.ReactNode }) => (
    <div className="p-4 rounded-3xl bg-surface-color border-2 border-border-color shadow">{children}</div>
  );

  const Idea = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <div className="rounded-3xl border-2 border-[var(--primary-color)]/40 bg-[var(--primary-color)]/10 shadow overflow-hidden">
      <div className="grid md:grid-cols-[190px_1fr]">
        <div className="p-4 bg-[var(--primary-color)] text-white flex items-center justify-center">
          <div className="text-center">
            <div className="text-3xl mb-1">🧠</div>
            <div className="font-black text-lg leading-tight">{title}</div>
          </div>
        </div>
        <div className="p-4 text-sm font-bold opacity-90 leading-relaxed">{children}</div>
      </div>
    </div>
  );

  const GroupBlock = ({ label, value, color, emoji }: { label: string; value: number; color: string; emoji: string }) => (
    <div className="p-5 rounded-3xl border-2 shadow text-center hover:scale-[1.02] transition-all" style={bg(color)}>
      <div className="text-3xl mb-1">{emoji}</div>
      <div className="text-xs font-black uppercase opacity-70 mb-2">{label}</div>
      <div className="text-6xl font-black">{value}</div>
    </div>
  );

  const GroupMap = ({ value, compact = false }: { value: number; compact?: boolean }) => {
    const g = groups(value);

    if (compact) {
      return (
        <div className="grid grid-cols-1 gap-2">
          <GroupBlock label="Millones" value={g.millions} color={G.millions} emoji="🟪" />
          <GroupBlock label="Miles" value={g.thousands} color={G.thousands} emoji="🟦" />
          <GroupBlock label="Unidades" value={g.units} color={G.units} emoji="🟩" />
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_40px_minmax(0,1fr)_40px_minmax(0,1fr)] gap-2 items-center">
        <GroupBlock label="Millones" value={g.millions} color={G.millions} emoji="🟪" />
        <div className="hidden lg:block text-center text-3xl font-black">➡️</div>
        <GroupBlock label="Miles" value={g.thousands} color={G.thousands} emoji="🟦" />
        <div className="hidden lg:block text-center text-3xl font-black">➡️</div>
        <GroupBlock label="Unidades" value={g.units} color={G.units} emoji="🟩" />
      </div>
    );
  };


  const renderGuia = () => (
    <div className="space-y-4">
      <Idea title="Lectura por bloques">
        No leas todos los dígitos juntos. Divide en bloques de tres cifras. Cada bloque tiene color, nombre y pausa.
      </Idea>
      <div className="grid md:grid-cols-[1fr_50px_1fr_50px_1fr] gap-3 items-stretch">
        <GroupBlock label="Millones" value={3} color={G.millions} emoji="🟪" />
        <div className="hidden md:flex items-center justify-center text-4xl animate-pulse">➡️</div>
        <GroupBlock label="Miles" value={456} color={G.thousands} emoji="🟦" />
        <div className="hidden md:flex items-center justify-center text-4xl animate-pulse">➡️</div>
        <GroupBlock label="Unidades" value={789} color={G.units} emoji="🟩" />
      </div>
      <Panel>
        <div className="font-black text-xl mb-3 text-center">Ejemplo: 3,456,789</div>
        <GroupMap value={3456789} />
        <div className="mt-4 lab-formula text-center text-lg">3 millones | 456 mil | 789 unidades</div>
      </Panel>
    </div>
  );

  const renderTabla = () => {
    const ds = digits(num);

    return (
      <div className="space-y-4">
        <Idea title="Tabla de columnas">
          Cada recuadro tiene una columna. Mira un recuadro a la vez: nombre, dígito y valor.
        </Idea>
        <NumberInput label="Número grande" value={num} setValue={(v) => setNum(clean(v))} min={0} max={9999999} step={1} color="#84cc16" />
        <Panel>
          <div className="text-6xl md:text-8xl font-black text-center break-all">{num.toLocaleString('es-MX')}</div>
        </Panel>
        <div className="grid md:grid-cols-7 gap-2">
          {places.map((p, i) => (
            <div key={p.key} className="p-3 rounded-3xl border-2 text-center shadow hover:scale-[1.02] transition-all" style={bg(p.color)}>
              <div className="text-[10px] font-black uppercase opacity-70 min-h-8">{p.label}</div>
              <div className="text-5xl font-black">{ds[i]}</div>
              <div className="text-xs font-black opacity-80">{ds[i]} × {p.value.toLocaleString('es-MX')}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderPeriodos = () => (
    <div className="space-y-4">
      <Idea title="Periodos">
        Un periodo es un bloque de tres cifras. Lees un bloque, haces pausa y sigues.
      </Idea>
      <NumberInput label="Número" value={num} setValue={(v) => setNum(clean(v))} min={0} max={9999999} step={1} color="#84cc16" />
      <GroupMap value={num} />
      <div className="lab-formula text-center text-lg">{num.toLocaleString('es-MX')} = {groupText(num)}</div>
    </div>
  );

  const renderDescomponer = () => (
    <div className="space-y-4">
      <Idea title="Descomponer">
        Cada recuadro se convierte en una parte de suma. El color ayuda a recordar de dónde salió.
      </Idea>
      <NumberInput label="Número" value={num} setValue={(v) => setNum(clean(v))} min={0} max={9999999} step={1} color="#84cc16" />
      <Panel>
        <div className="font-black text-xl mb-3 text-center">Forma desarrollada</div>
        <div className="text-2xl md:text-4xl font-black text-center break-words">{expanded(num)}</div>
      </Panel>
      <div className="grid md:grid-cols-2 gap-3">
        {places.map((p, i) => {
          const d = digits(num)[i];
          if (d === 0) return null;
          return (
            <div key={p.key} className="p-4 rounded-3xl border-2 shadow" style={bg(p.color)}>
              <div className="font-black">{p.label}</div>
              <div className="font-black text-xl">{d} × {p.value.toLocaleString('es-MX')} = {(d * p.value).toLocaleString('es-MX')}</div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderLectura = () => (
    <div className="space-y-4">
      <Idea title="Leer">
        Lee por bloques. No cargues todo el número en la cabeza al mismo tiempo.
      </Idea>
      <NumberInput label="Número para leer" value={num} setValue={(v) => setNum(clean(v))} min={0} max={9999999} step={1} color="#84cc16" />
      <Panel>
        <div className="text-6xl font-black text-center break-all">{num.toLocaleString('es-MX')}</div>
        <GroupMap value={num} />
        <div className="mt-4 lab-formula text-center text-lg">{groupText(num)}</div>
      </Panel>
    </div>
  );

  const renderComparar = () => {
    const sign = compareA > compareB ? '>' : compareA < compareB ? '<' : '=';
    const text =
      compareA > compareB ? `${compareA.toLocaleString('es-MX')} es mayor.` :
      compareA < compareB ? `${compareB.toLocaleString('es-MX')} es mayor.` :
      'Los dos son iguales.';

    return (
      <div className="space-y-4">
        <Idea title="Comparar">
          Compara por bloques de izquierda a derecha. Si millones cambia, no necesitas mirar lo demás.
        </Idea>
        <div className="grid md:grid-cols-2 gap-3">
          <NumberInput label="Número A" value={compareA} setValue={(v) => setCompareA(clean(v))} min={0} max={9999999} step={1} color="#22c55e" />
          <NumberInput label="Número B" value={compareB} setValue={(v) => setCompareB(clean(v))} min={0} max={9999999} step={1} color="#3b82f6" />
        </div>
        <div className="grid xl:grid-cols-[minmax(0,1fr)_90px_minmax(0,1fr)] gap-4 items-center">
          <Panel>
            <div className="text-4xl md:text-5xl font-black text-center break-all">{compareA.toLocaleString('es-MX')}</div>
            <GroupMap value={compareA} compact />
          </Panel>
          <div className="p-4 rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30 text-center shadow max-w-[120px] mx-auto w-full">
            <div className="text-7xl font-black">{sign}</div>
          </div>
          <Panel>
            <div className="text-4xl md:text-5xl font-black text-center break-all">{compareB.toLocaleString('es-MX')}</div>
            <GroupMap value={compareB} compact />
          </Panel>
        </div>
        <div className="lab-formula text-center text-lg">{text}</div>
      </div>
    );
  };

  const renderRedondear = () => {
    const rounded = Math.round(num / roundTo) * roundTo;

    return (
      <div className="space-y-4">
        <Idea title="Redondear">
          Redondear crea una cantidad cercana más fácil de usar. El número exacto no desaparece.
        </Idea>
        <NumberInput label="Número" value={num} setValue={(v) => setNum(clean(v))} min={0} max={9999999} step={1} color="#84cc16" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { label: 'Decena', value: 10 },
            { label: 'Centena', value: 100 },
            { label: 'Millar', value: 1000 },
            { label: 'Millón', value: 1000000 },
          ].map(opt => (
            <button
              key={opt.value}
              onClick={() => setRoundTo(opt.value)}
              className={`p-3 rounded-2xl font-black transition-all ${roundTo === opt.value ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color hover:scale-105'}`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <Panel>
          <div className="font-black text-xl text-center">Redondear a {roundTo.toLocaleString('es-MX')}</div>
          <div className="text-5xl font-black text-center mt-3">{num.toLocaleString('es-MX')}</div>
          <div className="text-3xl font-black text-center my-3">≈</div>
          <div className="text-5xl font-black text-center">{rounded.toLocaleString('es-MX')}</div>
        </Panel>
      </div>
    );
  };

  return (
    <TopicCard
      icon="🏰"
      title="Valor Posicional en Números Grandes"
      color="#16a34a"
      desc="Lee números grandes con bloques de color: millones, miles y unidades. Ruta fija: separar → nombrar → leer."
    >
      <div className="lab-container space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-7 gap-2">
          {modes.map(m => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`p-3 rounded-2xl font-black text-xs transition-all ${
                mode === m.id ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color hover:scale-105'
              }`}
            >
              <span className="text-2xl block mb-1">{m.icon}</span>
              {m.label}
            </button>
          ))}
        </div>

        {mode === 'guia' && renderGuia()}
        {mode === 'tabla' && renderTabla()}
        {mode === 'periodos' && renderPeriodos()}
        {mode === 'descomponer' && renderDescomponer()}
        {mode === 'lectura' && renderLectura()}
        {mode === 'comparar' && renderComparar()}
        {mode === 'redondear' && renderRedondear()}
      </div>
    </TopicCard>
  );
};










export const TablasMultiplicar: React.FC = () => {
  const [tabla, setTabla] = useState(7);
  return (
    <TopicCard icon="✖️" title="Tablas de Multiplicar" color="#a855f7" desc="Las tablas son la base de la multiplicación. Cambia el número y mira la tabla completa:">
      <div className="lab-container">
        <NumberInput label="Tabla del" value={tabla} setValue={setTabla} min={1} max={12} color="#a855f7" />
        <div className="grid grid-cols-3 md:grid-cols-5 gap-2 mt-3">
          {Array.from({ length: 10 }, (_, i) => i + 1).map(n => (
            <div key={n} className="p-3 rounded-xl bg-white dark:bg-slate-800 shadow text-center border-2 border-purple-300">
              <div className="text-xs opacity-70 font-bold">{tabla} × {n}</div>
              <div className="text-xl font-black text-purple-600 dark:text-purple-400">{tabla * n}</div>
            </div>
          ))}
        </div>
      </div>
    </TopicCard>
  );
};

export const MultInteractiva: React.FC = () => {
  const [r, setR] = useState(23);
  const [c, setC] = useState(4);
  const ones = r % 10;
  const tens = Math.floor(r / 10);
  const onesProduct = ones * c;
  const carry = Math.floor(onesProduct / 10);
  const finalOnes = onesProduct % 10;
  const tensProduct = tens * c + carry;
  return (
    <TopicCard icon="🧮" title="Multiplicación con Grilla y Llevadas" color="#a855f7" desc="La multiplicación es una suma rápida. Ajusta los valores y mira la grilla y la multiplicación por columnas:">
      <div className="lab-container space-y-4">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <NumberInput label="Número" value={r} setValue={setR} min={10} max={99} color="#a855f7" />
          <NumberInput label="Multiplicar por" value={c} setValue={setC} min={2} max={9} color="#9333ea" />
        </div>
        <div className="grid gap-4 md:grid-cols-[1fr_1.1fr] items-center">
          <div>
            <div className="text-center text-xs font-black uppercase opacity-70 mb-2">Modelo de arreglo: {Math.min(r, 12)} × {c}</div>
            <GridVisual visual={{ type: 'grid', rows: Math.min(r, 12), cols: c, total: Math.min(r, 12) * c }} />
            {r > 12 && <div className="text-center text-xs font-bold opacity-70">Mostramos 12 filas para que la grilla no sea enorme.</div>}
          </div>
          <div className="space-y-3">
            <div className="flex justify-center p-6 bg-surface-color rounded-3xl border-2 border-border-color shadow max-w-xs mx-auto font-mono font-black text-2xl relative">
              <div className="absolute top-2 left-4 text-[10px] bg-purple-400 text-white px-2 py-0.5 rounded-full font-sans">Llevas {carry}</div>
              <div className="text-right space-y-2 pt-4">
                <div className="text-xs text-slate-400 font-sans tracking-wide">DEC&nbsp;&nbsp;UNI</div>
                <div className="text-xs text-purple-500 h-5 font-sans">{carry > 0 ? `⁽${carry}⁾` : ' '}</div>
                <div>&nbsp;&nbsp;&nbsp;&nbsp;{tens}&nbsp;&nbsp;&nbsp;{ones}</div>
                <div>×&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{c}</div>
                <hr className="border-t-2 border-slate-400 my-1" />
                <div className="text-purple-500">&nbsp;&nbsp;&nbsp;{tensProduct}&nbsp;&nbsp;&nbsp;{finalOnes}</div>
              </div>
            </div>
            <div className="lab-formula text-center">{r} × {c} = <span style={{ color: 'var(--primary-color)' }}>{r * c}</span></div>
            <div className="p-3 rounded-2xl bg-purple-500/10 border-2 border-purple-500/30 text-sm font-bold">
              Primero unidades: {ones}×{c}={onesProduct}; escribimos {finalOnes} y llevamos {carry}. Luego decenas: {tens}×{c}+{carry}={tensProduct}. Resultado: {r * c}.
            </div>
          </div>
        </div>
      </div>
    </TopicCard>
  );
};

export const DivisionInteractiva: React.FC = () => {
  const [t, setT] = useState(12);
  const [g, setG] = useState(3);
  const q = Math.floor(t / g);
  const rem = t % g;
  return (
    <TopicCard icon="➗" title="División por Reparto" color="#10b981" desc="Dividir es repartir en partes iguales:">
      <div className="lab-container space-y-4">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <NumberInput label="Total" value={t} setValue={setT} min={1} max={30} color="#10b981" />
          <NumberInput label="Grupos" value={g} setValue={setG} min={1} max={8} color="#059669" />
        </div>
        <div className="grid gap-4 md:grid-cols-[1.2fr_1fr] items-start">
          <div className="p-4 rounded-3xl bg-surface-color border-2 border-border-color shadow">
            <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${Math.min(g, 4)}, minmax(0, 1fr))` }}>
              {Array.from({ length: g }).map((_, group) => (
                <div key={group} className="rounded-2xl border-2 border-emerald-500/40 bg-emerald-500/10 p-3 text-center min-h-24">
                  <div className="text-xs font-black opacity-70 mb-2">Grupo {group + 1}</div>
                  <div className="flex flex-wrap justify-center gap-1">
                    {Array.from({ length: q }).map((_, i) => <span key={i} className="text-2xl">🍪</span>)}
                  </div>
                  <div className="mt-1 font-black text-emerald-600">{q}</div>
                </div>
              ))}
            </div>
            {rem > 0 && <div className="mt-3 text-center font-black text-amber-600">Sobran: {Array.from({ length: rem }).map((_, i) => <span key={i}>🍪</span>)} ({rem})</div>}
          </div>
          <div className="space-y-3">
            <div className="flex justify-center p-6 bg-surface-color rounded-3xl border-2 border-border-color shadow font-mono font-black text-2xl">
              <div className="text-left">
                <div>{g} ) {t}</div>
                <div className="border-b-2 border-slate-400 ml-8 text-emerald-500">{q}</div>
                <div className="text-sm font-sans mt-2 opacity-70">{g} × {q} = {g * q}</div>
                <div className="text-sm font-sans opacity-70">{t} - {g * q} = {rem}</div>
              </div>
            </div>
            <div className="lab-formula text-center">{t} ÷ {g} = <span style={{ color: 'var(--primary-color)' }}>{q}</span>{rem !== 0 && <span className="text-sm opacity-70"> resto {rem}</span>}</div>
            <div className="p-3 rounded-2xl bg-emerald-500/10 border-2 border-emerald-500/30 text-sm font-bold">
              Repartimos {t} objetos entre {g} grupos. Cada grupo recibe {q}; como {g}×{q}={g*q}, sobran {rem}.
            </div>
          </div>
        </div>
      </div>
    </TopicCard>
  );
};

export const FraccionSimple: React.FC = () => {
  const [num, setNum] = useState(3);
  const [den, setDen] = useState(4);
  const [mode, setMode] = useState<string>('idea');
  const [methodTab, setMethodTab] = useState<string>('leer');
  const [methodModal, setMethodModal] = useState<string | null>(null);

  const [totalSet, setTotalSet] = useState(12);

  const [num2, setNum2] = useState(1);
  const [den2, setDen2] = useState(4);

  const [mixWhole, setMixWhole] = useState(1);
  const [mixNum, setMixNum] = useState(1);
  const [mixDen, setMixDen] = useState(2);

  const clamp = (v: number, min: number, max: number) =>
    Math.max(min, Math.min(max, Math.floor(v)));

  const safeDen = clamp(den, 1, 24);
  const safeNum = clamp(num, 0, 96);

  const safeDen2 = clamp(den2, 1, 24);
  const safeNum2 = clamp(num2, 0, 96);

  const safeMixWhole = clamp(mixWhole, 0, 12);
  const safeMixDen = clamp(mixDen, 1, 24);
  const safeMixNum = clamp(mixNum, 0, safeMixDen - 1);
  const safeTotalSet = clamp(totalSet, 1, 72);

  const gcd = (a: number, b: number): number => {
    let x = Math.abs(a);
    let y = Math.abs(b);
    while (y) {
      const t = y;
      y = x % y;
      x = t;
    }
    return x || 1;
  };

  const lcm = (a: number, b: number) => Math.abs(a * b) / gcd(a, b);

  const toMixed = (n: number, d: number) => {
    const whole = Math.floor(n / d);
    const rem = n % d;
    return { whole, rem, den: d };
  };

  const fromMixed = (whole: number, n: number, d: number) => whole * d + n;

  const currentMixed = toMixed(safeNum, safeDen);
  const currentValue = safeNum / safeDen;
  const usesSecondFraction = ['metodos', 'comparar', 'operaciones'].includes(mode);

  const simpG = gcd(safeNum, safeDen);
  const simpNum = safeNum / simpG;
  const simpDen = safeDen / simpG;

  const typeFlags = {
    unit: safeNum === 1,
    proper: safeNum < safeDen,
    improper: safeNum > safeDen,
    apparent: safeNum >= safeDen && safeNum % safeDen === 0,
    mixedPossible: safeNum > safeDen && safeNum % safeDen !== 0,
    zero: safeNum === 0,
  };

  const modes = [
    { id: 'idea', label: 'Idea', icon: '🧠' },
    { id: 'figuras', label: 'Figuras', icon: '🔷' },
    { id: 'recta', label: 'Recta', icon: '📍' },
    { id: 'tipos', label: 'Tipos', icon: '🧩' },
    { id: 'mixtas', label: 'Mixtas', icon: '🍰' },
    { id: 'conjunto', label: 'Conjunto', icon: '🍬' },
    { id: 'equivalentes', label: 'Equivalentes', icon: '🟰' },
    { id: 'simplificar', label: 'Simplificar', icon: '✂️' },
    { id: 'comparar', label: 'Comparar', icon: '⚖️' },
    { id: 'operaciones', label: 'Operaciones', icon: '➕' },
    { id: 'metodos', label: 'Métodos', icon: '📚' },
    { id: 'palabras', label: 'Palabras', icon: '🗣️' },
  ];

  const denomWord = (d: number) => {
    if (d === 2) return 'medio';
    if (d === 3) return 'tercio';
    if (d === 4) return 'cuarto';
    if (d === 5) return 'quinto';
    if (d === 6) return 'sexto';
    if (d === 7) return 'séptimo';
    if (d === 8) return 'octavo';
    if (d === 9) return 'noveno';
    if (d === 10) return 'décimo';
    if (d === 12) return 'doceavo';
    return `${d}avo`;
  };

  const fractionText = (n: number, d: number) => {
    if (n === 0) return 'cero';
    if (n === 1) return `un ${denomWord(d)}`;
    if (d === 2) return `${n} medios`;
    if (d === 3) return `${n} tercios`;
    if (d === 4) return `${n} cuartos`;
    return `${n} ${denomWord(d)}s`;
  };

  const mixedText = (whole: number, n: number, d: number) => {
    if (n === 0) return `${whole}`;
    if (whole === 0) return `${n}/${d}`;
    return `${whole} ${n}/${d}`;
  };

  const Card = ({
    title,
    children,
    color = '#f97316',
    note,
  }: {
    title: string;
    children: React.ReactNode;
    color?: string;
    note?: string;
  }) => (
    <div
      className="p-4 rounded-3xl border-2 shadow text-center min-w-0 overflow-hidden hover:scale-[1.01] transition-all"
      style={{ borderColor: color, background: `${color}18` }}
    >
      <div className="font-black text-lg mb-2">{title}</div>
      {children}
      {note && <div className="text-xs font-bold opacity-75 mt-2 leading-relaxed">{note}</div>}
    </div>
  );

  const Step = ({
    n,
    icon,
    title,
    text,
    color,
  }: {
    n: number;
    icon: string;
    title: string;
    text: string;
    color: string;
  }) => (
    <div className="p-4 rounded-3xl border-2 shadow" style={{ borderColor: color, background: `${color}18` }}>
      <div className="text-4xl mb-1">{icon}</div>
      <div className="text-xs font-black uppercase opacity-70">Paso {n}</div>
      <div className="font-black text-xl leading-tight">{title}</div>
      <div className="text-sm font-bold opacity-80 leading-relaxed mt-1">{text}</div>
    </div>
  );

  const FractionCircle = ({ n, d, size = 170, color = '#f97316' }: { n: number; d: number; size?: number; color?: string }) => {
    const D = clamp(d, 1, 24);
    const N = clamp(n, 0, D);
    const cx = size / 2;
    const cy = size / 2;
    const r = size / 2 - 10;

    const polar = (angleDeg: number, radius = r) => {
      const angle = (angleDeg - 90) * Math.PI / 180;
      return {
        x: cx + radius * Math.cos(angle),
        y: cy + radius * Math.sin(angle),
      };
    };

    const sectorPath = (startAngle: number, endAngle: number) => {
      const start = polar(startAngle);
      const end = polar(endAngle);
      const largeArc = endAngle - startAngle > 180 ? 1 : 0;
      return [
        'M', cx, cy,
        'L', start.x, start.y,
        'A', r, r, 0, largeArc, 1, end.x, end.y,
        'Z'
      ].join(' ');
    };

    return (
      <div className="flex flex-col items-center gap-2 min-w-0">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="max-w-full">
          <circle cx={cx} cy={cy} r={r} fill="rgba(148,163,184,.14)" stroke="currentColor" strokeWidth="2" className="text-[var(--border-color)]" />

          {Array.from({ length: D }).map((_, i) => {
            const start = (360 / D) * i;
            const end = (360 / D) * (i + 1);
            const fill = i < N ? color : 'rgba(148,163,184,.18)';
            return (
              <path
                key={`slice-${i}`}
                d={sectorPath(start, end)}
                fill={fill}
                stroke="rgba(100,116,139,.45)"
                strokeWidth="1.5"
              />
            );
          })}

          {Array.from({ length: D }).map((_, i) => {
            const p = polar((360 / D) * i);
            return (
              <line
                key={`line-${i}`}
                x1={cx}
                y1={cy}
                x2={p.x}
                y2={p.y}
                stroke="rgba(51,65,85,.95)"
                strokeWidth="2"
              />
            );
          })}

          <circle cx={cx} cy={cy} r="5" fill="white" stroke="rgba(51,65,85,.95)" strokeWidth="2" />
        </svg>

        <div className="px-3 py-1 rounded-2xl bg-background-color border-2 border-border-color font-black text-sm shadow">
          {N}/{D}
        </div>
      </div>
    );
  };

  const FractionBar = ({ n, d, color = '#0ea5e9' }: { n: number; d: number; color?: string }) => {
    const D = clamp(d, 1, 24);
    const N = clamp(n, 0, D);

    return (
      <div className="w-full max-w-full overflow-x-auto pb-2">
        <div className="grid gap-1 min-w-max mx-auto" style={{ gridTemplateColumns: `repeat(${D}, minmax(34px, 48px))` }}>
          {Array.from({ length: D }).map((_, i) => (
            <div
              key={i}
              className="h-16 rounded-xl border-2 border-border-color shadow-inner flex items-center justify-center font-black"
              style={{ background: i < N ? color : 'rgba(148,163,184,.14)' }}
            >
              {i < N ? '✓' : ''}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const FractionGrid = ({ n, d, color = '#22c55e' }: { n: number; d: number; color?: string }) => {
    const D = clamp(d, 1, 24);
    const N = clamp(n, 0, D);
    const cols = D <= 4 ? D : Math.ceil(Math.sqrt(D));

    return (
      <div className="w-full max-w-full overflow-x-auto pb-2">
        <div className="grid gap-2 min-w-max mx-auto" style={{ gridTemplateColumns: `repeat(${cols}, 52px)` }}>
          {Array.from({ length: D }).map((_, i) => (
            <div
              key={i}
              className="w-12 h-12 rounded-lg border-2 border-border-color flex items-center justify-center font-black"
              style={{ background: i < N ? color : 'rgba(148,163,184,.14)' }}
            >
              {i < N ? '■' : ''}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const FractionChocolate = ({ n, d }: { n: number; d: number }) => {
    const D = clamp(d, 1, 24);
    const N = clamp(n, 0, D);
    const cols = D <= 4 ? D : Math.ceil(Math.sqrt(D));

    return (
      <div className="max-w-full overflow-x-auto pb-2">
        <div className="mx-auto w-fit min-w-max p-3 rounded-3xl border-4 border-amber-900/40 bg-amber-950/20 shadow-inner">
          <div className="grid gap-2" style={{ gridTemplateColumns: `repeat(${cols}, 54px)` }}>
            {Array.from({ length: D }).map((_, i) => (
              <div
                key={i}
                className="w-14 h-14 rounded-xl border-2 border-amber-950 shadow flex items-center justify-center font-black"
                style={{ background: i < N ? '#a16207' : 'rgba(120,53,15,.25)' }}
              >
                {i < N ? '🍫' : ''}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderImproperAsGroups = (n: number, d: number, kind: 'circle' | 'bar' = 'circle') => {
    const whole = Math.floor(n / d);
    const rem = n % d;
    const pieces: React.ReactNode[] = [];

    for (let i = 0; i < whole; i++) {
      pieces.push(
        <div key={`w-${i}`} className="flex flex-col items-center">
          {kind === 'circle' ? <FractionCircle n={d} d={d} size={130} color="#22c55e" /> : <FractionBar n={d} d={d} color="#22c55e" />}
          <div className="text-xs font-bold opacity-70 mt-1">1 entero</div>
        </div>
      );
    }

    if (rem > 0 || pieces.length === 0) {
      pieces.push(
        <div key="rem" className="flex flex-col items-center">
          {kind === 'circle' ? <FractionCircle n={rem} d={d} size={130} color="#f97316" /> : <FractionBar n={rem} d={d} color="#f97316" />}
          <div className="text-xs font-bold opacity-70 mt-1">{rem}/{d}</div>
        </div>
      );
    }

    return <div className="flex flex-wrap gap-4 justify-center items-start">{pieces}</div>;
  };

  const objectSet = (total: number, selected: number, icon = '🍬') => {
    const shown = Math.min(total, 72);
    return (
      <div className="max-h-56 overflow-y-auto overflow-x-hidden p-2">
        <div className="flex gap-2 flex-wrap justify-center text-3xl">
          {Array.from({ length: shown }).map((_, i) => (
            <span key={i} className={i < selected ? '' : 'grayscale opacity-35'}>{icon}</span>
          ))}
        </div>
      </div>
    );
  };

  const renderIdea = () => (
    <div className="space-y-4">
      <div className="p-5 rounded-3xl border-2 border-orange-500/30 bg-orange-500/10 shadow">
        <div className="font-black text-2xl mb-2">¿Qué es una fracción?</div>
        <div className="text-sm font-bold opacity-85 leading-relaxed">
          Una fracción representa partes de un entero o partes de un conjunto.
          El denominador dice en cuántas partes iguales se divide.
          El numerador dice cuántas partes tomas.
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        <Step n={1} icon="⬇️" title="Denominador" text={`El ${safeDen} de abajo divide el entero en ${safeDen} partes iguales.`} color="#0ea5e9" />
        <Step n={2} icon="⬆️" title="Numerador" text={`El ${safeNum} de arriba dice cuántas partes se toman.`} color="#f97316" />
        <Step n={3} icon="🍕" title="Lectura" text={`${safeNum}/${safeDen} se puede leer como ${fractionText(safeNum, safeDen)}.`} color="#22c55e" />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <Card title="Fracción actual" color="#f97316">
          <div className="text-6xl font-black">{safeNum}/{safeDen}</div>
          <div className="font-black text-xl mt-2">{fractionText(safeNum, safeDen)}</div>
        </Card>
        <Card title="Representación visual" color="#22c55e">
          {safeNum <= safeDen ? <FractionCircle n={safeNum} d={safeDen} /> : renderImproperAsGroups(safeNum, safeDen, 'circle')}
        </Card>
      </div>
    </div>
  );

  const renderFiguras = () => (
    <div className="space-y-4">
      <div className="p-5 rounded-3xl border-2 border-pink-500/30 bg-pink-500/10 shadow">
        <div className="font-black text-2xl mb-2">La misma fracción con distintas figuras</div>
        <div className="text-sm font-bold opacity-85 leading-relaxed">
          Una fracción no solo vive en círculos. También puede verse en barras, cuadrículas, chocolates y varios enteros cuando es impropia.
        </div>
      </div>

      <div className="grid lg:grid-cols-2 xl:grid-cols-4 gap-3">
        <Card title="Círculo" color="#f97316">
          {safeNum <= safeDen ? <FractionCircle n={safeNum} d={safeDen} /> : renderImproperAsGroups(safeNum, safeDen, 'circle')}
        </Card>

        <Card title="Barra" color="#0ea5e9">
          {safeNum <= safeDen ? <FractionBar n={safeNum} d={safeDen} color="#0ea5e9" /> : renderImproperAsGroups(safeNum, safeDen, 'bar')}
        </Card>

        <Card title="Cuadrícula" color="#22c55e">
          <FractionGrid n={Math.min(safeNum, safeDen)} d={safeDen} color="#22c55e" />
          {safeNum > safeDen && <div className="text-xs font-bold opacity-70 mt-2">La cuadrícula muestra una parte del total; arriba ves los enteros completos por separado.</div>}
        </Card>

        <Card title="Chocolate" color="#a16207">
          <FractionChocolate n={Math.min(safeNum, safeDen)} d={safeDen} />
          {safeNum > safeDen && <div className="text-xs font-bold opacity-70 mt-2">Cuando la fracción es mayor que 1, necesitamos más de un entero.</div>}
        </Card>
      </div>
    </div>
  );

  const renderRecta = () => {
    const d = safeDen;
    const n = Math.min(safeNum, d * 3);
    const lineWidth = Math.max(760, d * 72);

    return (
      <div className="space-y-4">
        <div className="p-5 rounded-3xl border-2 border-blue-500/30 bg-blue-500/10 shadow">
          <div className="font-black text-2xl mb-2">Fracciones en recta numérica</div>
          <div className="text-sm font-bold opacity-85 leading-relaxed">
            La recta muestra posiciones. Cada entero se puede dividir en {d} partes iguales.
            Si la fracción es mayor que 1, avanzas más allá del primer entero.
          </div>
        </div>

        <div className="number-line-shell w-full max-w-full min-w-0 overflow-x-auto overflow-y-hidden pb-3">
          <div className="mx-auto" style={{ width: lineWidth }}>
            <div className="relative h-40">
              <div className="absolute left-10 right-10 top-[76px] h-[6px] rounded-full bg-slate-400" />

              {Array.from({ length: d * 3 + 1 }).map((_, i) => {
                const leftPx = 40 + ((lineWidth - 80) * i / (d * 3));
                const active = i === n;
                const isWhole = i % d === 0;
                const label =
                  i === 0 ? '0'
                  : isWhole ? `${i / d}`
                  : `${i}/${d}`;

                return (
                  <div
                    key={i}
                    className="absolute top-0 -translate-x-1/2 text-center"
                    style={{ left: leftPx }}
                  >
                    <div className={`text-xs font-black mb-1 ${active ? 'text-orange-500 scale-110' : isWhole ? 'text-slate-800' : 'opacity-75'}`}>
                      {label}
                    </div>

                    <div className={`mx-auto rounded-full ${isWhole ? 'w-[4px] h-14' : 'w-[3px] h-10'} ${active ? 'bg-orange-500' : 'bg-slate-500'}`} />
                    <div className={`mx-auto mt-[-2px] rounded-full border-4 ${active ? 'w-5 h-5 bg-orange-500 border-orange-600 scale-110' : isWhole ? 'w-4 h-4 bg-white border-slate-700' : 'w-4 h-4 bg-white border-slate-500'}`} />
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-3">
          <Step n={1} icon="0️⃣" title="Comienza en 0" text="La recta arranca en cero." color="#38bdf8" />
          <Step n={2} icon="📏" title="Divide cada entero" text={`Cada entero se divide en ${d} partes iguales.`} color="#0ea5e9" />
          <Step n={3} icon="📍" title="Ubica la fracción" text={`${safeNum}/${safeDen} vale ${currentValue.toFixed(2)} aproximadamente.`} color="#f97316" />
        </div>
      </div>
    );
  };

  const renderTipos = () => (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-3">
        <Card title="Unitaria" color="#0ea5e9" note="Numerador 1.">
          <div className="text-4xl font-black">1/{safeDen}</div>
        </Card>

        <Card title="Propia" color="#22c55e" note="Numerador menor que denominador. Vale menos que 1.">
          <div className="text-4xl font-black">{Math.min(safeDen - 1, Math.max(1, safeNum < safeDen ? safeNum : 3))}/{safeDen}</div>
        </Card>

        <Card title="Impropia" color="#f97316" note="Numerador mayor que denominador. Vale más que 1.">
          <div className="text-4xl font-black">{Math.max(safeDen + 1, safeNum)}/{safeDen}</div>
        </Card>

        <Card title="Aparente" color="#8b5cf6" note="Equivale exactamente a un entero.">
          <div className="text-4xl font-black">{safeDen}/{safeDen}</div>
        </Card>

        <Card title="Mixta" color="#ec4899" note="Tiene entero y fracción.">
          <div className="text-4xl font-black">1 1/{safeDen}</div>
        </Card>
      </div>

      <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow">
        <div className="font-black text-xl mb-3">Clasificación de la fracción actual: {safeNum}/{safeDen}</div>
        <div className="grid md:grid-cols-2 gap-3 text-sm font-bold">
          <div className={`p-3 rounded-2xl border ${typeFlags.zero ? 'bg-slate-500/10 border-slate-500/30' : 'bg-surface-color border-border-color'}`}>
            Cero: {typeFlags.zero ? 'sí' : 'no'}
          </div>
          <div className={`p-3 rounded-2xl border ${typeFlags.unit ? 'bg-blue-500/10 border-blue-500/30' : 'bg-surface-color border-border-color'}`}>
            Unitaria: {typeFlags.unit ? 'sí' : 'no'}
          </div>
          <div className={`p-3 rounded-2xl border ${typeFlags.proper ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-surface-color border-border-color'}`}>
            Propia: {typeFlags.proper ? 'sí' : 'no'}
          </div>
          <div className={`p-3 rounded-2xl border ${typeFlags.improper ? 'bg-orange-500/10 border-orange-500/30' : 'bg-surface-color border-border-color'}`}>
            Impropia: {typeFlags.improper ? 'sí' : 'no'}
          </div>
          <div className={`p-3 rounded-2xl border ${typeFlags.apparent ? 'bg-violet-500/10 border-violet-500/30' : 'bg-surface-color border-border-color'}`}>
            Aparente: {typeFlags.apparent ? 'sí' : 'no'}
          </div>
          <div className={`p-3 rounded-2xl border ${typeFlags.mixedPossible ? 'bg-pink-500/10 border-pink-500/30' : 'bg-surface-color border-border-color'}`}>
            Se puede escribir como mixta: {typeFlags.mixedPossible ? 'sí' : 'no'}
          </div>
        </div>
      </div>
    </div>
  );

  const renderMixtas = () => {
    const improperFromMixed = fromMixed(safeMixWhole, safeMixNum, safeMixDen);
    const mixFromCurrent = toMixed(safeNum, safeDen);

    return (
      <div className="space-y-4">
        <div className="p-5 rounded-3xl border-2 border-pink-500/30 bg-pink-500/10 shadow">
          <div className="font-black text-2xl mb-2">Fracciones mixtas</div>
          <div className="text-sm font-bold opacity-85 leading-relaxed">
            Una fracción mixta tiene un entero y una parte fraccionaria.
            Es otra forma de escribir una fracción impropia.
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          <Card title="De impropia a mixta" color="#f97316" note="Divide el numerador entre el denominador. El cociente es el entero y el residuo queda arriba.">
            <div className="text-4xl font-black mb-3">{safeNum}/{safeDen}</div>
            <div className="text-5xl font-black text-pink-600">
              {mixedText(mixFromCurrent.whole, mixFromCurrent.rem, mixFromCurrent.den)}
            </div>
            <div className="text-sm font-bold opacity-75 mt-3">
              {safeNum} ÷ {safeDen} = {mixFromCurrent.whole} y sobra {mixFromCurrent.rem}
            </div>
          </Card>

          <Card title="De mixta a impropia" color="#ec4899" note="Multiplica el entero por el denominador y luego suma el numerador.">
            <div className="grid md:grid-cols-3 gap-3 mb-3">
              <NumberInput label="Entero" value={safeMixWhole} setValue={(v) => setMixWhole(clamp(v, 0, 12))} min={0} max={12} color="#ec4899" />
              <NumberInput label="Numerador" value={safeMixNum} setValue={(v) => setMixNum(clamp(v, 0, safeMixDen - 1))} min={0} max={Math.max(0, safeMixDen - 1)} color="#f97316" />
              <NumberInput label="Denominador" value={safeMixDen} setValue={(v) => {
                const next = clamp(v, 1, 24);
                setMixDen(next);
                setMixNum(Math.min(safeMixNum, Math.max(0, next - 1)));
              }} min={1} max={24} color="#0ea5e9" />
            </div>

            <div className="text-3xl font-black mb-2">
              {mixedText(safeMixWhole, safeMixNum, safeMixDen)} = {improperFromMixed}/{safeMixDen}
            </div>
            <div className="text-sm font-bold opacity-75">
              ({safeMixWhole} × {safeMixDen}) + {safeMixNum} = {improperFromMixed}
            </div>
          </Card>
        </div>
      </div>
    );
  };

  const renderConjunto = () => {
    const selected = Math.floor((safeNum / safeDen) * safeTotalSet);
    return (
      <div className="space-y-4">
        <NumberInput label="Objetos del conjunto" value={safeTotalSet} setValue={(v) => setTotalSet(clamp(v, 1, 72))} min={1} max={72} color="#8b5cf6" />

        <div className="grid md:grid-cols-2 gap-3">
          <Card title={`Conjunto completo: ${safeTotalSet}`} color="#8b5cf6">
            {objectSet(safeTotalSet, safeTotalSet, '🍬')}
          </Card>
          <Card title={`${safeNum}/${safeDen} del conjunto`} color="#f97316">
            {objectSet(safeTotalSet, selected, '🍬')}
            <div className="text-3xl font-black mt-3">{selected}</div>
          </Card>
        </div>

        <div className="p-4 rounded-3xl bg-amber-500/10 border-2 border-amber-500/30 text-sm font-bold">
          Para que sea exacto, conviene que el conjunto pueda repartirse en {safeDen} grupos iguales.
        </div>
      </div>
    );
  };

  const renderEquivalentes = () => {
    const ex2n = safeNum * 2;
    const ex2d = safeDen * 2;
    const ex3n = safeNum * 3;
    const ex3d = safeDen * 3;

    return (
      <div className="space-y-4">
        <div className="p-5 rounded-3xl border-2 border-emerald-500/30 bg-emerald-500/10 shadow">
          <div className="font-black text-2xl mb-2">Fracciones equivalentes</div>
          <div className="text-sm font-bold opacity-85 leading-relaxed">
            Si multiplicas o divides numerador y denominador por el mismo número, la cantidad no cambia.
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-3">
          <Card title={`${safeNum}/${safeDen}`} color="#f97316">
            <FractionBar n={Math.min(safeNum, safeDen)} d={safeDen} color="#f97316" />
          </Card>
          <Card title={`${ex2n}/${ex2d}`} color="#0ea5e9">
            <FractionBar n={Math.min(ex2n, ex2d)} d={ex2d} color="#0ea5e9" />
          </Card>
          <Card title={`${ex3n}/${ex3d}`} color="#22c55e">
            <FractionBar n={Math.min(ex3n, ex3d)} d={ex3d} color="#22c55e" />
          </Card>
        </div>

        <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
          <div className="text-xl md:text-3xl font-black">
            {safeNum}/{safeDen} = {ex2n}/{ex2d} = {ex3n}/{ex3d}
          </div>
        </div>
      </div>
    );
  };

  const renderSimplificar = () => (
    <div className="space-y-4">
      <div className="p-5 rounded-3xl border-2 border-pink-500/30 bg-pink-500/10 shadow">
        <div className="font-black text-2xl mb-2">Simplificar fracciones</div>
        <div className="text-sm font-bold opacity-85 leading-relaxed">
          Simplificar es escribir la misma fracción con números más pequeños.
        </div>
      </div>

      <div className="grid md:grid-cols-[1fr_80px_1fr] gap-3 items-center">
        <Card title="Original" color="#f97316">
          <div className="text-6xl font-black">{safeNum}/{safeDen}</div>
          <FractionBar n={Math.min(safeNum, safeDen)} d={safeDen} color="#f97316" />
        </Card>

        <div className="text-5xl text-center font-black">➡️</div>

        <Card title="Simplificada" color="#22c55e">
          <div className="text-6xl font-black">{simpNum}/{simpDen}</div>
          <FractionBar n={Math.min(simpNum, simpDen)} d={simpDen} color="#22c55e" />
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        <Step n={1} icon="🔎" title="Busca un divisor común" text={`El MCD de ${safeNum} y ${safeDen} es ${simpG}.`} color="#0ea5e9" />
        <Step n={2} icon="✂️" title="Divide ambos" text={`Divide numerador y denominador entre ${simpG}.`} color="#f97316" />
        <Step n={3} icon="✅" title="Resultado" text={`${safeNum}/${safeDen} = ${simpNum}/${simpDen}.`} color="#22c55e" />
      </div>
    </div>
  );

  const renderComparar = () => {
    const val1 = safeNum / safeDen;
    const val2 = safeNum2 / safeDen2;

    let relation = '=';
    if (val1 > val2) relation = '>';
    if (val1 < val2) relation = '<';

    const common = lcm(safeDen, safeDen2);
    const eq1n = safeNum * (common / safeDen);
    const eq2n = safeNum2 * (common / safeDen2);

    return (
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-3">
          <NumberInput label="Numerador B" value={safeNum2} setValue={(v) => setNum2(clamp(v, 0, 96))} min={0} max={96} color="#8b5cf6" />
          <NumberInput label="Denominador B" value={safeDen2} setValue={(v) => setDen2(clamp(v, 1, 24))} min={1} max={24} color="#0ea5e9" />
        </div>

        <div className="grid lg:grid-cols-3 gap-3 items-center">
          <Card title={`A = ${safeNum}/${safeDen}`} color="#f97316">
            <FractionBar n={Math.min(safeNum, safeDen)} d={safeDen} color="#f97316" />
          </Card>
          <div className="text-center text-6xl font-black">{relation}</div>
          <Card title={`B = ${safeNum2}/${safeDen2}`} color="#8b5cf6">
            <FractionBar n={Math.min(safeNum2, safeDen2)} d={safeDen2} color="#8b5cf6" />
          </Card>
        </div>

        <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow">
          <div className="font-black text-xl mb-3">Método con denominador común</div>
          <div className="text-sm font-bold opacity-85 leading-relaxed">
            MCM({safeDen}, {safeDen2}) = {common}. Entonces:
          </div>
          <div className="text-2xl font-black mt-3">
            {safeNum}/{safeDen} = {eq1n}/{common}
          </div>
          <div className="text-2xl font-black mt-2">
            {safeNum2}/{safeDen2} = {eq2n}/{common}
          </div>
        </div>
      </div>
    );
  };

  const renderOperaciones = () => {
    const sameDenSum = safeNum + safeNum2;
    const sameDenDiff = Math.max(0, safeNum - safeNum2);

    const common = lcm(safeDen, safeDen2);
    const conv1 = safeNum * (common / safeDen);
    const conv2 = safeNum2 * (common / safeDen2);
    const commonSum = conv1 + conv2;
    const commonDiff = Math.max(0, conv1 - conv2);

    return (
      <div className="space-y-4">
        <div className="p-5 rounded-3xl border-2 border-blue-500/30 bg-blue-500/10 shadow">
          <div className="font-black text-2xl mb-2">Operaciones con fracciones</div>
          <div className="text-sm font-bold opacity-85 leading-relaxed">
            Primero usamos fracciones con el mismo denominador. Después vemos cómo convertir a un denominador común cuando son distintos.
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          <NumberInput label="Numerador B" value={safeNum2} setValue={(v) => setNum2(clamp(v, 0, 96))} min={0} max={96} color="#8b5cf6" />
          <NumberInput label="Denominador B" value={safeDen2} setValue={(v) => setDen2(clamp(v, 1, 24))} min={1} max={24} color="#0ea5e9" />
        </div>

        <div className="grid lg:grid-cols-2 gap-4">
          <Card title="Mismo denominador" color="#22c55e" note="Si las piezas tienen el mismo tamaño, sumas o restas numeradores y dejas el denominador.">
            <div className="text-2xl font-black mb-3">{safeNum}/{safeDen} + {safeNum2}/{safeDen} = {sameDenSum}/{safeDen}</div>
            <div className="text-2xl font-black mb-3">{safeNum}/{safeDen} − {safeNum2}/{safeDen} = {sameDenDiff}/{safeDen}</div>
          </Card>

          <Card title="Distinto denominador" color="#0ea5e9" note="Convierte ambas a un denominador común antes de operar.">
            <div className="text-xl font-black mb-2">MCM = {common}</div>
            <div className="text-lg font-black">{safeNum}/{safeDen} = {conv1}/{common}</div>
            <div className="text-lg font-black">{safeNum2}/{safeDen2} = {conv2}/{common}</div>
            <div className="text-lg font-black mt-3">{conv1}/{common} + {conv2}/{common} = {commonSum}/{common}</div>
            <div className="text-lg font-black">{conv1}/{common} − {conv2}/{common} = {commonDiff}/{common}</div>
          </Card>
        </div>
      </div>
    );
  };

  const renderMetodos = () => {
    const methodTabs = [
      { id: 'leer', label: 'Leer', icon: '🔎', color: '#f97316' },
      { id: 'dibujar', label: 'Dibujar', icon: '🎨', color: '#22c55e' },
      { id: 'mcm', label: 'MCM', icon: '🧮', color: '#7c3aed' },
      { id: 'mariposa', label: 'Mariposa', icon: '🦋', color: '#ec4899' },
      { id: 'sumar-distinto', label: 'Sumar distinto', icon: '➕', color: '#16a34a' },
      { id: 'restar-distinto', label: 'Restar distinto', icon: '➖', color: '#ef4444' },
      { id: 'sumar-tres', label: '3 fracciones', icon: '🔢', color: '#14b8a6' },
      { id: 'multiplicar', label: 'Multiplicar', icon: '✖️', color: '#8b5cf6' },
      { id: 'dividir', label: 'Dividir', icon: '➗', color: '#0ea5e9' },
      { id: 'cruzada', label: 'Cruzada', icon: '✂️', color: '#f59e0b' },
      { id: 'impropia-mixta', label: 'Impropia → mixta', icon: '🍰', color: '#ec4899' },
      { id: 'mixta-impropia', label: 'Mixta → impropia', icon: '🔁', color: '#8b5cf6' },
      { id: 'simplificar', label: 'Simplificar', icon: '✂️', color: '#22c55e' },
      { id: 'comparar', label: 'Comparar', icon: '⚖️', color: '#0ea5e9' },
      { id: 'conjunto', label: 'Conjunto', icon: '🍬', color: '#f59e0b' },
      { id: 'recta', label: 'Recta', icon: '📍', color: '#38bdf8' },
    ];

    const method = methodTabs.find(m => m.id === methodTab) || methodTabs[0];

    const common = lcm(safeDen, safeDen2);
    const factor1 = common / safeDen;
    const factor2 = common / safeDen2;
    const eq1n = safeNum * factor1;
    const eq2n = safeNum2 * factor2;

    const butterflyLeft = safeNum * safeDen2;
    const butterflyRight = safeNum2 * safeDen;
    const butterflyDen = safeDen * safeDen2;

    const addDifferentN = butterflyLeft + butterflyRight;
    const subDifferentN = butterflyLeft - butterflyRight;

    const multN = safeNum * safeNum2;
    const multD = safeDen * safeDen2;
    const multG = gcd(multN, multD);

    const divN = safeNum * safeDen2;
    const divD = safeDen * safeNum2;
    const divG = gcd(divN, divD || 1);

    const relation =
      butterflyLeft > butterflyRight ? '>' :
      butterflyLeft < butterflyRight ? '<' :
      '=';

    // Ejemplos extra con 3 fracciones
    const exA1 = 1, exA2 = 2, exA3 = 1, exAD = 4;
    const exASumN = exA1 + exA2 + exA3;

    const exB1n = 1, exB1d = 2;
    const exB2n = 1, exB2d = 3;
    const exB3n = 1, exB3d = 6;
    const exBCommon = lcm(lcm(exB1d, exB2d), exB3d);
    const exBC1 = exB1n * (exBCommon / exB1d);
    const exBC2 = exB2n * (exBCommon / exB2d);
    const exBC3 = exB3n * (exBCommon / exB3d);
    const exBSum = exBC1 + exBC2 + exBC3;

    const MethodHeader = ({ title, icon, color, children }: { title: string; icon: string; color: string; children: React.ReactNode }) => (
      <div className="p-5 rounded-3xl border-2 shadow" style={{ borderColor: color, background: `${color}18` }}>
        <div className="flex items-start gap-3">
          <div className="text-5xl shrink-0 animate-pulse">{icon}</div>
          <div className="min-w-0">
            <div className="font-black text-2xl leading-tight">{title}</div>
            <div className="text-sm font-bold opacity-85 leading-relaxed mt-1">{children}</div>
          </div>
        </div>
      </div>
    );

    const TipBox = ({ title, color, children }: { title: string; color: string; children: React.ReactNode }) => (
      <div className="p-4 rounded-3xl border-2 shadow" style={{ borderColor: color, background: `${color}14` }}>
        <div className="font-black text-lg mb-2" style={{ color }}>{title}</div>
        <div className="text-sm font-bold opacity-85 leading-relaxed">{children}</div>
      </div>
    );

    const FracStack = ({ n, d, color = '#f97316', small = false }: { n: number | string; d: number | string; color?: string; small?: boolean }) => (
      <div
        className={`inline-flex flex-col items-center justify-center rounded-2xl border-2 bg-surface-color shadow-sm ${small ? 'px-3 py-2' : 'px-4 py-3'}`}
        style={{ borderColor: color }}
      >
        <div className={`font-black leading-none ${small ? 'text-2xl' : 'text-4xl'}`}>{n}</div>
        <div className={`${small ? 'w-12 h-0.5 my-1.5' : 'w-16 h-1 my-2'} rounded-full`} style={{ background: color }} />
        <div className={`font-black leading-none ${small ? 'text-2xl' : 'text-4xl'}`}>{d}</div>
      </div>
    );

    const OpSign = ({ children }: { children: React.ReactNode }) => (
      <div className="text-4xl md:text-5xl font-black px-1 text-center shrink-0">
        {children}
      </div>
    );

    const FracFormula = ({ children, color = '#f97316', title }: { children: React.ReactNode; color?: string; title?: string }) => (
      <div className="p-4 rounded-3xl bg-surface-color border-2 border-border-color shadow overflow-x-auto">
        {title && <div className="font-black text-lg mb-3 text-center" style={{ color }}>{title}</div>}
        <div className="min-w-max flex items-center justify-center gap-3">
          {children}
        </div>
      </div>
    );

    const MethodContent = ({ id }: { id: string }) => {
      if (id === 'leer') {
        return (
          <div className="space-y-4">
            <MethodHeader title="Cómo leer una fracción" icon="🔎" color="#f97316">
              Una fracción tiene dos trabajos: el número de abajo indica cómo se partió el entero y el número de arriba indica cuántas partes se toman.
            </MethodHeader>

            <div className="grid md:grid-cols-4 gap-3">
              <Step n={1} icon="🍕" title="Imagina un entero" text="Piensa en una pizza, barra o figura completa." color="#22c55e" />
              <Step n={2} icon="⬇️" title="Mira abajo" text={`El denominador es ${safeDen}. Eso significa ${safeDen} partes iguales.`} color="#0ea5e9" />
              <Step n={3} icon="⬆️" title="Mira arriba" text={`El numerador es ${safeNum}. Eso dice cuántas partes tomas.`} color="#f97316" />
              <Step n={4} icon="🗣️" title="Lee completo" text={`${safeNum}/${safeDen} se lee como ${fractionText(safeNum, safeDen)}.`} color="#16a34a" />
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <FracFormula color="#f97316" title="Fracción">
                <FracStack n={safeNum} d={safeDen} color="#f97316" />
              </FracFormula>

              <Card title="Visual" color="#22c55e">
                {safeNum <= safeDen ? <FractionCircle n={safeNum} d={safeDen} /> : renderImproperAsGroups(safeNum, safeDen, 'circle')}
              </Card>
            </div>
          </div>
        );
      }

      if (id === 'dibujar') {
        return (
          <div className="space-y-4">
            <MethodHeader title="Cómo dibujar una fracción" icon="🎨" color="#22c55e">
              El dibujo puede cambiar, pero la regla no: todas las partes deben tener el mismo tamaño.
            </MethodHeader>

            <div className="grid md:grid-cols-4 gap-3">
              <Step n={1} icon="⬜" title="Dibuja el entero" text="Puede ser círculo, barra, rectángulo o cuadrícula." color="#22c55e" />
              <Step n={2} icon="📏" title="Divide igual" text={`Divide en ${safeDen} partes exactamente iguales.`} color="#0ea5e9" />
              <Step n={3} icon="🎯" title="Cuenta partes" text={`Debes tomar ${Math.min(safeNum, safeDen)} parte(s).`} color="#f97316" />
              <Step n={4} icon="🖍️" title="Colorea" text="Las partes tomadas se colorean; las demás se dejan libres." color="#ec4899" />
            </div>

            <div className="grid lg:grid-cols-4 gap-3">
              <Card title="Círculo" color="#f97316"><FractionCircle n={Math.min(safeNum, safeDen)} d={safeDen} /></Card>
              <Card title="Barra" color="#0ea5e9"><FractionBar n={Math.min(safeNum, safeDen)} d={safeDen} color="#0ea5e9" /></Card>
              <Card title="Cuadrícula" color="#22c55e"><FractionGrid n={Math.min(safeNum, safeDen)} d={safeDen} color="#22c55e" /></Card>
              <Card title="Chocolate" color="#a16207"><FractionChocolate n={Math.min(safeNum, safeDen)} d={safeDen} /></Card>
            </div>
          </div>
        );
      }

      if (id === 'mcm') {
        return (
          <div className="space-y-4">
            <MethodHeader title="Igualar denominadores con MCM" icon="🧮" color="#7c3aed">
              Cuando los denominadores son distintos, primero conviene convertir las fracciones para que hablen “el mismo idioma”: el mismo tamaño de partes.
            </MethodHeader>

            <div className="grid md:grid-cols-5 gap-3">
              <Step n={1} icon="👀" title="Observa" text={`Los denominadores son ${safeDen} y ${safeDen2}.`} color="#0ea5e9" />
              <Step n={2} icon="🧮" title="Busca MCM" text={`MCM(${safeDen}, ${safeDen2}) = ${common}.`} color="#7c3aed" />
              <Step n={3} icon="🔁" title="Factor A" text={`Para pasar ${safeDen} a ${common}, multiplicas por ${factor1}.`} color="#f97316" />
              <Step n={4} icon="🔁" title="Factor B" text={`Para pasar ${safeDen2} a ${common}, multiplicas por ${factor2}.`} color="#22c55e" />
              <Step n={5} icon="✅" title="Listo" text={`Ahora ambas fracciones quedan con denominador ${common}.`} color="#16a34a" />
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <FracFormula color="#f97316" title="Fracción A convertida">
                <FracStack n={safeNum} d={safeDen} color="#f97316" />
                <OpSign>×</OpSign>
                <FracStack n={factor1} d={factor1} color="#f97316" small />
                <OpSign>=</OpSign>
                <FracStack n={eq1n} d={common} color="#f97316" />
              </FracFormula>

              <FracFormula color="#22c55e" title="Fracción B convertida">
                <FracStack n={safeNum2} d={safeDen2} color="#8b5cf6" />
                <OpSign>×</OpSign>
                <FracStack n={factor2} d={factor2} color="#22c55e" small />
                <OpSign>=</OpSign>
                <FracStack n={eq2n} d={common} color="#22c55e" />
              </FracFormula>
            </div>

            <TipBox title="Idea clave" color="#7c3aed">
              No cambias el valor de la fracción. Solo cambias la manera de escribirla para que sea más fácil sumar, restar o comparar.
            </TipBox>
          </div>
        );
      }

      if (id === 'mariposa') {
        return (
          <div className="space-y-4">
            <MethodHeader title="Método mariposa o tijeras" icon="🦋" color="#ec4899">
              Este método cruza diagonales. Es útil para sumar, restar o comparar cuando los denominadores son distintos.
            </MethodHeader>

            <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow overflow-x-auto">
              <div className="min-w-[760px] grid grid-cols-[1fr_160px_1fr] gap-4 items-center">
                <div className="text-center">
                  <FracStack n={safeNum} d={safeDen} color="#f97316" />
                </div>

                <div className="relative h-56">
                  <div className="absolute left-0 right-0 top-1/2 h-1 bg-pink-400 rotate-45 rounded-full animate-pulse" />
                  <div className="absolute left-0 right-0 top-1/2 h-1 bg-pink-600 -rotate-45 rounded-full animate-pulse" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl">🦋</div>
                  </div>
                </div>

                <div className="text-center">
                  <FracStack n={safeNum2} d={safeDen2} color="#8b5cf6" />
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-4 gap-3">
              <Step n={1} icon="↘️" title="Cruce 1" text={`${safeNum} × ${safeDen2} = ${butterflyLeft}.`} color="#f97316" />
              <Step n={2} icon="↙️" title="Cruce 2" text={`${safeNum2} × ${safeDen} = ${butterflyRight}.`} color="#8b5cf6" />
              <Step n={3} icon="⬇️" title="Abajo" text={`${safeDen} × ${safeDen2} = ${butterflyDen}.`} color="#0ea5e9" />
              <Step n={4} icon="🧩" title="Usa el resultado" text="Con esos cruces puedes sumar, restar o comparar." color="#16a34a" />
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <FracFormula color="#16a34a" title="Suma con mariposa">
                <div className="text-3xl font-black">(</div>
                <div className="text-3xl font-black">{butterflyLeft}</div>
                <OpSign>+</OpSign>
                <div className="text-3xl font-black">{butterflyRight}</div>
                <div className="text-3xl font-black">)</div>
                <OpSign>÷</OpSign>
                <div className="text-3xl font-black">{butterflyDen}</div>
                <OpSign>=</OpSign>
                <FracStack n={addDifferentN} d={butterflyDen} color="#16a34a" />
              </FracFormula>

              <FracFormula color="#ef4444" title="Resta con mariposa">
                <div className="text-3xl font-black">(</div>
                <div className="text-3xl font-black">{butterflyLeft}</div>
                <OpSign>−</OpSign>
                <div className="text-3xl font-black">{butterflyRight}</div>
                <div className="text-3xl font-black">)</div>
                <OpSign>÷</OpSign>
                <div className="text-3xl font-black">{butterflyDen}</div>
                <OpSign>=</OpSign>
                <FracStack n={subDifferentN} d={butterflyDen} color="#ef4444" />
              </FracFormula>
            </div>
          </div>
        );
      }

      if (id === 'sumar-distinto') {
        return (
          <div className="space-y-4">
            <MethodHeader title="Cómo sumar con distinto denominador" icon="➕" color="#16a34a">
              La idea es primero hacer que las piezas tengan el mismo tamaño. Después ya puedes sumar las partes.
            </MethodHeader>

            <div className="grid md:grid-cols-5 gap-3">
              <Step n={1} icon="👀" title="Revisa abajo" text={`Los denominadores son ${safeDen} y ${safeDen2}.`} color="#0ea5e9" />
              <Step n={2} icon="🧮" title="MCM" text={`Buscas el MCM: ${common}.`} color="#7c3aed" />
              <Step n={3} icon="🔁" title="Convierte A" text={`${safeNum}/${safeDen} pasa a ${eq1n}/${common}.`} color="#f97316" />
              <Step n={4} icon="🔁" title="Convierte B" text={`${safeNum2}/${safeDen2} pasa a ${eq2n}/${common}.`} color="#22c55e" />
              <Step n={5} icon="➕" title="Suma arriba" text={`${eq1n} + ${eq2n} = ${eq1n + eq2n}.`} color="#16a34a" />
            </div>

            <FracFormula color="#16a34a" title="Resultado de la suma">
              <FracStack n={safeNum} d={safeDen} color="#f97316" />
              <OpSign>+</OpSign>
              <FracStack n={safeNum2} d={safeDen2} color="#8b5cf6" />
              <OpSign>=</OpSign>
              <FracStack n={eq1n} d={common} color="#f97316" />
              <OpSign>+</OpSign>
              <FracStack n={eq2n} d={common} color="#8b5cf6" />
              <OpSign>=</OpSign>
              <FracStack n={eq1n + eq2n} d={common} color="#16a34a" />
            </FracFormula>

            <div className="grid md:grid-cols-2 gap-3">
              <Card title="Visual A" color="#f97316">
                <FractionBar n={Math.min(eq1n, common)} d={common} color="#f97316" />
              </Card>
              <Card title="Visual B" color="#8b5cf6">
                <FractionBar n={Math.min(eq2n, common)} d={common} color="#8b5cf6" />
              </Card>
            </div>
          </div>
        );
      }

      if (id === 'restar-distinto') {
        return (
          <div className="space-y-4">
            <MethodHeader title="Cómo restar con distinto denominador" icon="➖" color="#ef4444">
              La resta sigue la misma lógica que la suma: primero igualas denominadores, luego restas solo los numeradores.
            </MethodHeader>

            <div className="grid md:grid-cols-5 gap-3">
              <Step n={1} icon="👀" title="Observa" text={`Tienes ${safeDen} y ${safeDen2} abajo.`} color="#0ea5e9" />
              <Step n={2} icon="🧮" title="MCM" text={`El MCM es ${common}.`} color="#7c3aed" />
              <Step n={3} icon="🔁" title="Transforma" text={`Quedan ${eq1n}/${common} y ${eq2n}/${common}.`} color="#f97316" />
              <Step n={4} icon="➖" title="Resta arriba" text={`${eq1n} − ${eq2n} = ${eq1n - eq2n}.`} color="#ef4444" />
              <Step n={5} icon="✅" title="Conserva abajo" text={`El denominador sigue siendo ${common}.`} color="#22c55e" />
            </div>

            <FracFormula color="#ef4444" title="Resultado de la resta">
              <FracStack n={safeNum} d={safeDen} color="#f97316" />
              <OpSign>−</OpSign>
              <FracStack n={safeNum2} d={safeDen2} color="#8b5cf6" />
              <OpSign>=</OpSign>
              <FracStack n={eq1n} d={common} color="#f97316" />
              <OpSign>−</OpSign>
              <FracStack n={eq2n} d={common} color="#8b5cf6" />
              <OpSign>=</OpSign>
              <FracStack n={eq1n - eq2n} d={common} color="#ef4444" />
            </FracFormula>

            <TipBox title="Ojo" color="#ef4444">
              Si el numerador final queda negativo, significa que la segunda fracción era más grande que la primera.
            </TipBox>
          </div>
        );
      }

      if (id === 'sumar-tres') {
        return (
          <div className="space-y-4">
            <MethodHeader title="Cómo sumar 3 fracciones" icon="🔢" color="#14b8a6">
              Puedes sumar más de dos fracciones. La regla no cambia: si tienen igual denominador, sumas numeradores. Si no, primero buscas un denominador común.
            </MethodHeader>

            <div className="grid lg:grid-cols-2 gap-4">
              <Card title="Ejemplo 1: mismo denominador" color="#14b8a6">
                <div className="grid md:grid-cols-4 gap-3 mb-3">
                  <Step n={1} icon="👀" title="Observa" text="Todos tienen denominador 4." color="#0ea5e9" />
                  <Step n={2} icon="➕" title="Suma numeradores" text={`1 + 2 + 1 = ${exASumN}.`} color="#16a34a" />
                  <Step n={3} icon="⬇️" title="Conserva el 4" text="El denominador no cambia." color="#f97316" />
                  <Step n={4} icon="✅" title="Resultado" text={`${exASumN}/4.`} color="#14b8a6" />
                </div>

                <FracFormula color="#14b8a6" title="Ejemplo con 3 fracciones">
                  <FracStack n={exA1} d={exAD} color="#f97316" />
                  <OpSign>+</OpSign>
                  <FracStack n={exA2} d={exAD} color="#8b5cf6" />
                  <OpSign>+</OpSign>
                  <FracStack n={exA3} d={exAD} color="#22c55e" />
                  <OpSign>=</OpSign>
                  <FracStack n={exASumN} d={exAD} color="#14b8a6" />
                </FracFormula>
              </Card>

              <Card title="Ejemplo 2: distinto denominador" color="#7c3aed">
                <div className="grid md:grid-cols-5 gap-3 mb-3">
                  <Step n={1} icon="👀" title="Observa" text="Tienes 2, 3 y 6 abajo." color="#0ea5e9" />
                  <Step n={2} icon="🧮" title="Busca MCM" text={`El MCM es ${exBCommon}.`} color="#7c3aed" />
                  <Step n={3} icon="🔁" title="Convierte" text={`${exB1n}/${exB1d}→${exBC1}/${exBCommon}, ${exB2n}/${exB2d}→${exBC2}/${exBCommon}, ${exB3n}/${exB3d}→${exBC3}/${exBCommon}.`} color="#f97316" />
                  <Step n={4} icon="➕" title="Suma arriba" text={`${exBC1} + ${exBC2} + ${exBC3} = ${exBSum}.`} color="#16a34a" />
                  <Step n={5} icon="✅" title="Resultado" text={`${exBSum}/${exBCommon}.`} color="#14b8a6" />
                </div>

                <FracFormula color="#7c3aed" title="Tres fracciones con MCM">
                  <FracStack n={exB1n} d={exB1d} color="#f97316" />
                  <OpSign>+</OpSign>
                  <FracStack n={exB2n} d={exB2d} color="#8b5cf6" />
                  <OpSign>+</OpSign>
                  <FracStack n={exB3n} d={exB3d} color="#22c55e" />
                  <OpSign>=</OpSign>
                  <FracStack n={exBC1} d={exBCommon} color="#f97316" />
                  <OpSign>+</OpSign>
                  <FracStack n={exBC2} d={exBCommon} color="#8b5cf6" />
                  <OpSign>+</OpSign>
                  <FracStack n={exBC3} d={exBCommon} color="#22c55e" />
                  <OpSign>=</OpSign>
                  <FracStack n={exBSum} d={exBCommon} color="#14b8a6" />
                </FracFormula>
              </Card>
            </div>
          </div>
        );
      }

      if (id === 'multiplicar') {
        return (
          <div className="space-y-4">
            <MethodHeader title="Cómo multiplicar fracciones" icon="✖️" color="#8b5cf6">
              Multiplicar fracciones es más directo que sumar: arriba por arriba y abajo por abajo. Luego simplificas si se puede.
            </MethodHeader>

            <div className="grid md:grid-cols-5 gap-3">
              <Step n={1} icon="⬆️" title="Multiplica arriba" text={`${safeNum} × ${safeNum2} = ${multN}.`} color="#f97316" />
              <Step n={2} icon="⬇️" title="Multiplica abajo" text={`${safeDen} × ${safeDen2} = ${multD}.`} color="#0ea5e9" />
              <Step n={3} icon="✍️" title="Forma la fracción" text={`Obtienes ${multN}/${multD}.`} color="#8b5cf6" />
              <Step n={4} icon="🔎" title="Busca simplificar" text={`MCD(${multN}, ${multD}) = ${multG}.`} color="#22c55e" />
              <Step n={5} icon="✅" title="Resultado final" text={`${multN / multG}/${multD / multG}.`} color="#16a34a" />
            </div>

            <FracFormula color="#8b5cf6" title="Resultado de la multiplicación">
              <FracStack n={safeNum} d={safeDen} color="#f97316" />
              <OpSign>×</OpSign>
              <FracStack n={safeNum2} d={safeDen2} color="#8b5cf6" />
              <OpSign>=</OpSign>
              <FracStack n={multN} d={multD} color="#8b5cf6" />
              <OpSign>=</OpSign>
              <FracStack n={multN / multG} d={multD / multG} color="#22c55e" />
            </FracFormula>

            <div className="grid md:grid-cols-2 gap-3">
              <Card title="Fracción A como área" color="#f97316">
                <FractionGrid n={Math.min(safeNum, safeDen)} d={safeDen} color="#f97316" />
              </Card>
              <Card title="Fracción B como área" color="#8b5cf6">
                <FractionGrid n={Math.min(safeNum2, safeDen2)} d={safeDen2} color="#8b5cf6" />
              </Card>
            </div>
          </div>
        );
      }

      if (id === 'dividir') {
        return (
          <div className="space-y-4">
            <MethodHeader title="Cómo dividir fracciones" icon="➗" color="#0ea5e9">
              Dividir entre una fracción significa multiplicar por su recíproca. La recíproca se obtiene volteando numerador y denominador.
            </MethodHeader>

            <div className="grid md:grid-cols-5 gap-3">
              <Step n={1} icon="👀" title="Observa" text={`Quieres dividir ${safeNum}/${safeDen} entre ${safeNum2}/${safeDen2}.`} color="#0ea5e9" />
              <Step n={2} icon="🔄" title="Voltea la segunda" text={`${safeNum2}/${safeDen2} se vuelve ${safeDen2}/${safeNum2}.`} color="#f97316" />
              <Step n={3} icon="✖️" title="Cambia a multiplicación" text={`Ahora haces ${safeNum}/${safeDen} × ${safeDen2}/${safeNum2}.`} color="#8b5cf6" />
              <Step n={4} icon="🧮" title="Multiplica" text={`Sale ${divN}/${divD}.`} color="#ec4899" />
              <Step n={5} icon="✅" title="Simplifica" text={`Resultado final: ${divN / divG}/${divD / divG}.`} color="#22c55e" />
            </div>

            {safeNum2 === 0 ? (
              <div className="p-5 rounded-3xl border-2 border-red-500/30 bg-red-500/10 font-black text-center">
                No se puede dividir entre 0. Cambia el numerador B.
              </div>
            ) : (
              <FracFormula color="#0ea5e9" title="Resultado de la división">
                <FracStack n={safeNum} d={safeDen} color="#f97316" />
                <OpSign>÷</OpSign>
                <FracStack n={safeNum2} d={safeDen2} color="#8b5cf6" />
                <OpSign>=</OpSign>
                <FracStack n={safeNum} d={safeDen} color="#f97316" />
                <OpSign>×</OpSign>
                <FracStack n={safeDen2} d={safeNum2} color="#0ea5e9" />
                <OpSign>=</OpSign>
                <FracStack n={divN} d={divD} color="#0ea5e9" />
                <OpSign>=</OpSign>
                <FracStack n={divN / divG} d={divD / divG} color="#22c55e" />
              </FracFormula>
            )}

            <TipBox title="Recuerda" color="#0ea5e9">
              Dividir por una fracción es preguntar cuántas veces cabe esa fracción dentro de la otra.
            </TipBox>
          </div>
        );
      }

      if (id === 'cruzada') {
        const a1 = safeNum;
        const b1 = safeDen;
        const c1 = safeNum2;
        const d1 = safeDen2;

        const g1 = gcd(a1, d1);
        const g2 = gcd(c1, b1);

        const na = a1 / g1;
        const nd = d1 / g1;
        const nc = c1 / g2;
        const nb = b1 / g2;

        return (
          <div className="space-y-4">
            <MethodHeader title="Simplificación cruzada" icon="✂️" color="#f59e0b">
              Antes de multiplicar, puedes simplificar en diagonal. Eso hace más pequeños los números y evita cuentas pesadas.
            </MethodHeader>

            <div className="grid md:grid-cols-5 gap-3">
              <Step n={1} icon="↘️" title="Mira diagonal 1" text={`Compara ${a1} con ${d1}.`} color="#f59e0b" />
              <Step n={2} icon="✂️" title="Simplifica 1" text={`MCD = ${g1}. Quedan ${na} y ${nd}.`} color="#ec4899" />
              <Step n={3} icon="↙️" title="Mira diagonal 2" text={`Compara ${c1} con ${b1}.`} color="#0ea5e9" />
              <Step n={4} icon="✂️" title="Simplifica 2" text={`MCD = ${g2}. Quedan ${nc} y ${nb}.`} color="#22c55e" />
              <Step n={5} icon="✅" title="Multiplica" text={`Ahora haces ${na}×${nc} y ${nb}×${nd}.`} color="#16a34a" />
            </div>

            <FracFormula color="#f59e0b" title="Resultado con simplificación cruzada">
              <FracStack n={safeNum} d={safeDen} color="#f97316" />
              <OpSign>×</OpSign>
              <FracStack n={safeNum2} d={safeDen2} color="#8b5cf6" />
              <OpSign>→</OpSign>
              <FracStack n={na} d={nb} color="#f59e0b" />
              <OpSign>×</OpSign>
              <FracStack n={nc} d={nd} color="#ec4899" />
              <OpSign>=</OpSign>
              <FracStack n={na * nc} d={nb * nd} color="#22c55e" />
            </FracFormula>
          </div>
        );
      }

      if (id === 'impropia-mixta') {
        const m = toMixed(safeNum, safeDen);

        return (
          <div className="space-y-4">
            <MethodHeader title="De impropia a mixta" icon="🍰" color="#ec4899">
              Una fracción impropia tiene más partes de las que caben en un entero. Por eso la convertimos a enteros completos y sobrante.
            </MethodHeader>

            <div className="grid md:grid-cols-4 gap-3">
              <Step n={1} icon="➗" title="Divide" text={`${safeNum} ÷ ${safeDen}.`} color="#8b5cf6" />
              <Step n={2} icon="🧱" title="Enteros completos" text={`El cociente ${m.whole} dice cuántos enteros completos tienes.`} color="#22c55e" />
              <Step n={3} icon="🍰" title="Sobra una parte" text={`El residuo ${m.rem} queda como numerador.`} color="#f97316" />
              <Step n={4} icon="✅" title="Escribe" text={`${mixedText(m.whole, m.rem, m.den)}.`} color="#ec4899" />
            </div>

            <FracFormula color="#ec4899" title="Conversión">
              <FracStack n={safeNum} d={safeDen} color="#f97316" />
              <OpSign>=</OpSign>
              <div className="text-4xl font-black">{mixedText(m.whole, m.rem, m.den)}</div>
            </FracFormula>

            <Card title="Visual" color="#ec4899">
              {renderImproperAsGroups(safeNum, safeDen, 'circle')}
            </Card>
          </div>
        );
      }

      if (id === 'mixta-impropia') {
        const improperFromMixed = fromMixed(safeMixWhole, safeMixNum, safeMixDen);

        return (
          <div className="space-y-4">
            <MethodHeader title="De mixta a impropia" icon="🔁" color="#8b5cf6">
              Para volver a una sola fracción, conviertes primero los enteros a partes del mismo tamaño y luego sumas el sobrante.
            </MethodHeader>

            <div className="grid md:grid-cols-4 gap-3">
              <Step n={1} icon="👀" title="Observa la mixta" text={`Tienes ${mixedText(safeMixWhole, safeMixNum, safeMixDen)}.`} color="#0ea5e9" />
              <Step n={2} icon="✖️" title="Convierte enteros" text={`${safeMixWhole} × ${safeMixDen} = ${safeMixWhole * safeMixDen}.`} color="#8b5cf6" />
              <Step n={3} icon="➕" title="Suma el sobrante" text={`${safeMixWhole * safeMixDen} + ${safeMixNum} = ${improperFromMixed}.`} color="#f97316" />
              <Step n={4} icon="✅" title="Escribe" text={`${improperFromMixed}/${safeMixDen}.`} color="#22c55e" />
            </div>

            <FracFormula color="#8b5cf6" title="Conversión">
              <div className="text-4xl font-black">{mixedText(safeMixWhole, safeMixNum, safeMixDen)}</div>
              <OpSign>=</OpSign>
              <FracStack n={improperFromMixed} d={safeMixDen} color="#8b5cf6" />
            </FracFormula>
          </div>
        );
      }

      if (id === 'simplificar') {
        return (
          <div className="space-y-4">
            <MethodHeader title="Cómo simplificar una fracción" icon="✂️" color="#22c55e">
              Simplificar es escribir la misma cantidad con números más pequeños.
            </MethodHeader>

            <div className="grid md:grid-cols-4 gap-3">
              <Step n={1} icon="🔎" title="Busca divisores" text={`Mira si ${safeNum} y ${safeDen} comparten divisores.`} color="#0ea5e9" />
              <Step n={2} icon="🧮" title="Usa el MCD" text={`MCD(${safeNum}, ${safeDen}) = ${simpG}.`} color="#f97316" />
              <Step n={3} icon="✂️" title="Divide ambos" text={`${safeNum}÷${simpG}=${simpNum} y ${safeDen}÷${simpG}=${simpDen}.`} color="#ec4899" />
              <Step n={4} icon="✅" title="Resultado" text={`La fracción simplificada es ${simpNum}/${simpDen}.`} color="#22c55e" />
            </div>

            <FracFormula color="#22c55e" title="Simplificación">
              <FracStack n={safeNum} d={safeDen} color="#f97316" />
              <OpSign>=</OpSign>
              <FracStack n={simpNum} d={simpDen} color="#22c55e" />
            </FracFormula>
          </div>
        );
      }

      if (id === 'comparar') {
        return (
          <div className="space-y-4">
            <MethodHeader title="Cómo comparar fracciones" icon="⚖️" color="#0ea5e9">
              Comparar significa decidir cuál representa más cantidad. Puedes usar MCM o multiplicación cruzada.
            </MethodHeader>

            <div className="grid md:grid-cols-4 gap-3">
              <Step n={1} icon="🦋" title="Cruza" text={`${safeNum}×${safeDen2}=${butterflyLeft} y ${safeNum2}×${safeDen}=${butterflyRight}.`} color="#ec4899" />
              <Step n={2} icon="⚖️" title="Compara productos" text={`${butterflyLeft} ${relation} ${butterflyRight}.`} color="#0ea5e9" />
              <Step n={3} icon="🧠" title="Interpreta" text="El mayor producto cruzado corresponde a la fracción mayor." color="#16a34a" />
              <Step n={4} icon="✅" title="Conclusión" text={`${safeNum}/${safeDen} ${relation} ${safeNum2}/${safeDen2}.`} color="#22c55e" />
            </div>

            <FracFormula color="#0ea5e9" title="Comparación">
              <FracStack n={safeNum} d={safeDen} color="#f97316" />
              <OpSign>{relation}</OpSign>
              <FracStack n={safeNum2} d={safeDen2} color="#8b5cf6" />
            </FracFormula>
          </div>
        );
      }

      if (id === 'conjunto') {
        const selected = Math.floor((safeNum / safeDen) * safeTotalSet);

        return (
          <div className="space-y-4">
            <MethodHeader title="Fracción de un conjunto" icon="🍬" color="#f59e0b">
              Aquí la fracción no parte una figura, sino un grupo de objetos.
            </MethodHeader>

            <div className="grid md:grid-cols-4 gap-3">
              <Step n={1} icon="🍬" title="Cuenta el total" text={`Hay ${safeTotalSet} objetos en total.`} color="#8b5cf6" />
              <Step n={2} icon="📦" title="Divide en grupos" text={`Divide el total en ${safeDen} grupos iguales.`} color="#0ea5e9" />
              <Step n={3} icon="🎯" title="Toma grupos" text={`Debes tomar ${safeNum} de esos grupos.`} color="#f59e0b" />
              <Step n={4} icon="✅" title="Resultado" text={`${safeNum}/${safeDen} de ${safeTotalSet} ≈ ${selected}.`} color="#22c55e" />
            </div>

            <Card title={`${safeNum}/${safeDen} de ${safeTotalSet}`} color="#f59e0b">
              {objectSet(safeTotalSet, selected, '🍬')}
              <div className="text-3xl font-black mt-3">{selected}</div>
            </Card>
          </div>
        );
      }

      return (
        <div className="space-y-4">
          <MethodHeader title="Cómo ubicar una fracción en la recta" icon="📍" color="#38bdf8">
            La recta muestra posición. Una fracción indica cuántos pasos de cierto tamaño debes avanzar.
          </MethodHeader>

          <div className="grid md:grid-cols-4 gap-3">
            <Step n={1} icon="0️⃣" title="Empieza en 0" text="Toda recta parte desde un origen." color="#38bdf8" />
            <Step n={2} icon="📏" title="Divide el entero" text={`Cada entero se divide en ${safeDen} partes iguales.`} color="#0ea5e9" />
            <Step n={3} icon="👣" title="Cuenta pasos" text={`Debes avanzar ${safeNum} marcas.`} color="#f97316" />
            <Step n={4} icon="✅" title="Ubica la fracción" text={`Llegas a ${safeNum}/${safeDen}.`} color="#22c55e" />
          </div>

          <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow">
            {renderRecta()}
          </div>
        </div>
      );
    };

    return (
      <div className="space-y-4">
        <div className="p-5 rounded-3xl border-2 border-violet-500/30 bg-violet-500/10 shadow">
          <div className="font-black text-2xl mb-2">Métodos paso a paso</div>
          <div className="text-sm font-bold opacity-85 leading-relaxed">
            Elige un método. Aquí está explicado con más pasos, con fracciones apiladas y con ejemplos visuales.
          </div>
        </div>

        <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(125px, 1fr))' }}>
          {methodTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setMethodTab(tab.id)}
              className={`p-3 rounded-2xl font-black text-xs transition-all hover:scale-105 ${methodTab === tab.id ? 'text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color'}`}
              style={methodTab === tab.id ? { background: tab.color, borderColor: tab.color } : {}}
            >
              <span className="text-2xl block mb-1">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)] gap-4">
          <div className="p-5 rounded-3xl border-2 shadow h-fit text-center" style={{ borderColor: method.color, background: `${method.color}18` }}>
            <div className="text-5xl mb-2">{method.icon}</div>
            <div className="font-black text-xl">{method.label}</div>
            <button
              onClick={() => setMethodModal(methodTab)}
              className="mt-4 w-full px-4 py-3 rounded-2xl text-white font-black shadow hover:scale-105 transition-all"
              style={{ background: method.color }}
            >
              Abrir paso a paso
            </button>
          </div>

          <div className="min-w-0">
            <MethodContent id={methodTab} />
          </div>
        </div>

        {methodModal && (
          <div className="fixed inset-0 z-[9999] bg-slate-950/80 backdrop-blur-sm overscroll-contain flex items-center justify-center p-3 md:p-6">
            <div className="w-[min(1180px,calc(100vw-2rem))] h-[min(820px,calc(100vh-2rem))] rounded-[2rem] border-2 border-border-color bg-background-color shadow-[0_30px_90px_rgba(0,0,0,0.65)] overflow-hidden flex flex-col">
              <div className="shrink-0 px-4 py-3 border-b-2 border-border-color bg-surface-color flex items-center justify-between gap-3 z-10">
                <div className="min-w-0">
                  <div className="text-xs font-black uppercase opacity-70">Método paso a paso</div>
                  <div className="font-black text-2xl truncate">
                    {methodTabs.find(m => m.id === methodModal)?.icon} {methodTabs.find(m => m.id === methodModal)?.label}
                  </div>
                </div>

                <button
                  onClick={() => setMethodModal(null)}
                  className="shrink-0 w-11 h-11 rounded-2xl bg-red-500 text-white font-black text-2xl shadow hover:scale-105 transition-all border-2 border-white/30"
                  aria-label="Cerrar"
                >
                  ×
                </button>
              </div>

              <div className="flex-1 min-h-0 overflow-hidden p-3 bg-background-color">
                <div className="h-full w-full overflow-scroll rounded-3xl border-2 border-border-color bg-background-color">
                  <div className="min-w-[1080px] min-h-[760px] p-4 md:p-5 pb-14 pr-14">
                    <MethodContent id={methodModal} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };


  const renderPalabras = () => (
    <div className="space-y-4">
      <div className="grid md:grid-cols-4 gap-3">
        <Card title="Medio" color="#22c55e" note="Una de dos partes iguales.">
          <div className="text-5xl font-black">1/2</div>
          <FractionCircle n={1} d={2} color="#22c55e" />
        </Card>
        <Card title="Tercio" color="#0ea5e9" note="Una de tres partes iguales.">
          <div className="text-5xl font-black">1/3</div>
          <FractionCircle n={1} d={3} color="#0ea5e9" />
        </Card>
        <Card title="Cuarto" color="#f59e0b" note="Una de cuatro partes iguales.">
          <div className="text-5xl font-black">1/4</div>
          <FractionCircle n={1} d={4} color="#f59e0b" />
        </Card>
        <Card title="Quinto" color="#ec4899" note="Una de cinco partes iguales.">
          <div className="text-5xl font-black">1/5</div>
          <FractionCircle n={1} d={5} color="#ec4899" />
        </Card>
      </div>

      <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow">
        <div className="font-black text-xl mb-2">Ejemplos en contexto</div>
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-3 text-sm font-bold">
          <div className="p-3 rounded-2xl bg-green-500/10 border border-green-500/30">Comí medio sándwich.</div>
          <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/30">Tomé un tercio del chocolate.</div>
          <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30">Pinté un cuarto de la hoja.</div>
          <div className="p-3 rounded-2xl bg-pink-500/10 border border-pink-500/30">Leí dos quintos del cuento.</div>
        </div>
      </div>
    </div>
  );

  return (
    <TopicCard icon="🍕" title="Fracciones 1°–3°" color="#f97316" desc="Aprende fracciones propias, impropias, mixtas, equivalentes, simplificación, comparación y operaciones con muchos apoyos visuales.">
      <div className="lab-container space-y-4">
        <div className={`grid gap-4 ${usesSecondFraction ? 'xl:grid-cols-2' : 'grid-cols-1'}`}>
          <div className="p-4 rounded-3xl border-2 border-orange-500/30 bg-orange-500/10 shadow">
            <div className="font-black text-xl mb-3 text-center">Fracción A</div>

            <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_110px] gap-3 items-end">
              <NumberInput
                label="Numerador A"
                value={safeNum}
                setValue={(v) => setNum(clamp(v, 0, 96))}
                min={0}
                max={96}
                color="#f97316"
              />

              <NumberInput
                label="Denominador A"
                value={safeDen}
                setValue={(v) => setDen(clamp(v, 1, 24))}
                min={1}
                max={24}
                color="#0ea5e9"
              />

              <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-orange-500 bg-surface-color px-3 py-2 shadow">
                <div className="text-2xl font-black leading-none">{safeNum}</div>
                <div className="w-12 h-0.5 my-1.5 rounded-full bg-orange-500" />
                <div className="text-2xl font-black leading-none">{safeDen}</div>
              </div>
            </div>

            <div className="mt-3 text-center text-sm font-bold opacity-80">
              {typeFlags.mixedPossible ? mixedText(currentMixed.whole, currentMixed.rem, currentMixed.den) : currentValue.toFixed(3)}
            </div>
          </div>

          {usesSecondFraction && (
            <div className="p-4 rounded-3xl border-2 border-violet-500/30 bg-violet-500/10 shadow">
              <div className="font-black text-xl mb-3 text-center">Fracción B</div>

              <div className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_110px] gap-3 items-end">
                <NumberInput
                  label="Numerador B"
                  value={safeNum2}
                  setValue={(v) => setNum2(clamp(v, 0, 96))}
                  min={0}
                  max={96}
                  color="#8b5cf6"
                />

                <NumberInput
                  label="Denominador B"
                  value={safeDen2}
                  setValue={(v) => setDen2(clamp(v, 1, 24))}
                  min={1}
                  max={24}
                  color="#0ea5e9"
                />

                <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-violet-500 bg-surface-color px-3 py-2 shadow">
                  <div className="text-2xl font-black leading-none">{safeNum2}</div>
                  <div className="w-12 h-0.5 my-1.5 rounded-full bg-violet-500" />
                  <div className="text-2xl font-black leading-none">{safeDen2}</div>
                </div>
              </div>

              <div className="mt-3 text-center text-sm font-bold opacity-80">
                Se usa para comparar, sumar, restar, multiplicar, dividir y método mariposa.
              </div>
            </div>
          )}
        </div>

        <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(110px, 1fr))' }}>
          {modes.map(tab => (
            <button
              key={tab.id}
              onClick={() => setMode(tab.id)}
              className={`p-3 rounded-2xl font-black text-xs transition-all hover:scale-105 ${
                mode === tab.id ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color'
              }`}
            >
              <span className="text-2xl block mb-1">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {mode === 'idea' && renderIdea()}
        {mode === 'figuras' && renderFiguras()}
        {mode === 'recta' && renderRecta()}
        {mode === 'tipos' && renderTipos()}
        {mode === 'mixtas' && renderMixtas()}
        {mode === 'conjunto' && renderConjunto()}
        {mode === 'equivalentes' && renderEquivalentes()}
        {mode === 'simplificar' && renderSimplificar()}
        {mode === 'comparar' && renderComparar()}
        {mode === 'operaciones' && renderOperaciones()}
        {mode === 'metodos' && renderMetodos()}
        {mode === 'palabras' && renderPalabras()}
      </div>
    </TopicCard>
  );
};







export const TiposFracciones: React.FC = () => {
  const [type, setType] = useState<'propia' | 'impropia' | 'unitaria'>('propia');
  const examples = {
    propia: { n: 2, d: 5, label: 'Propia', desc: 'El numerador es menor. ¡Es menos de un pastel entero!' },
    impropia: { n: 7, d: 4, label: 'Impropia', desc: 'El numerador es mayor. ¡Es más de un pastel entero!' },
    unitaria: { n: 1, d: 1, label: 'Unitaria (Entero)', desc: 'Numerador y denominador son iguales. ¡Es el pastel completo!' }
  };
  const ex = examples[type];
  return (
    <TopicCard icon="🍕" title="Tipos de Fracciones" color="#f97316" desc="No todas las fracciones son iguales. Descubre las diferencias:">
      <div className="lab-container">
        <div className="flex gap-2 mb-6 flex-wrap">
          {(['propia', 'impropia', 'unitaria'] as const).map(t => (
            <button key={t} onClick={() => setType(t)} className={`px-4 py-2 rounded-2xl font-black ${type === t ? 'bg-orange-500 text-white shadow-lg' : 'bg-slate-200 dark:bg-slate-700'}`}>{t.toUpperCase()}</button>
          ))}
        </div>
        <div className="p-6 bg-orange-500/5 border-2 border-orange-500/20 rounded-3xl text-center">
          <div className="text-4xl font-black mb-4">{ex.n} / {ex.d}</div>
          <p className="text-lg font-bold mb-6 text-orange-600 dark:text-orange-400">{ex.desc}</p>
          <div className="flex justify-center gap-4 flex-wrap">
            {Array.from({ length: Math.ceil(ex.n / ex.d) }).map((_, i) => (
              <FractionVisual key={i} visual={{ type: 'fraction', numerator: Math.min(ex.d, ex.n - (i * ex.d)), denominator: ex.d }} />
            ))}
          </div>
        </div>
      </div>
    </TopicCard>
  );
};

export const SimplificarFracciones: React.FC = () => {
  const [n, setN] = useState(6);
  const [d, setD] = useState(12);
  const red = reduceFraction(n, d);
  return (
    <TopicCard icon="✂️" title="Simplificación de Fracciones" color="#ef4444" desc="Simplificar es escribir la misma fracción con números más pequeños:">
      <div className="lab-container">
        <div className="grid grid-cols-2 gap-4 mb-8">
          <NumberInput label="Numerador" value={n} setValue={setN} min={1} max={20} color="#ef4444" />
          <NumberInput label="Denominador" value={d} setValue={setD} min={1} max={20} color="#be123c" />
        </div>
        <div className="flex flex-col md:flex-row items-center justify-around gap-8 p-8 bg-slate-100 dark:bg-slate-800 rounded-3xl shadow-inner">
          <div className="text-center">
            <div className="text-xs font-black opacity-50 uppercase mb-2">Original</div>
            <div className="text-4xl font-black mb-4">{n} / {d}</div>
            <FractionVisual visual={{ type: 'fraction', numerator: n, denominator: d }} />
          </div>
          <div className="text-5xl opacity-30">➔</div>
          <div className="text-center">
            <div className="text-xs font-black opacity-50 uppercase mb-2">Simplificada</div>
            <div className="text-4xl font-black mb-4 text-emerald-500">{red.n} / {red.d}</div>
            <FractionVisual visual={{ type: 'fraction', numerator: red.n, denominator: red.d }} />
          </div>
        </div>
        <div className="mt-6 p-4 bg-emerald-500/10 border-2 border-emerald-500/30 rounded-2xl text-center font-bold">Para llegar a {red.n}/{red.d} dividimos ambos números entre su MCD ({gcd(n, d)}).</div>
      </div>
    </TopicCard>
  );
};

export const SucesionesSimples: React.FC = () => {
  const [start, setStart] = useState(2);
  const [step, setStep] = useState(2);
  const seq = Array.from({ length: 6 }, (_, i) => start + i * step);
  return (
    <TopicCard icon="🔢" title="Contar de 2 en 2, 5 en 5, 10 en 10" color="#0891b2" desc="Aprende a contar saltando:">
      <div className="lab-container">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <NumberInput label="Empezar en" value={start} setValue={setStart} min={0} max={20} color="#0891b2" />
          <NumberInput label="Saltar de" value={step} setValue={setStep} min={1} max={10} color="#0e7490" />
        </div>
        <div className="flex flex-wrap gap-2 justify-center my-4">
          {seq.map((n, i) => <div key={i} className="px-4 py-3 rounded-2xl bg-white dark:bg-slate-800 shadow border-2 border-cyan-400 font-black text-lg">{n}</div>)}
        </div>
      </div>
    </TopicCard>
  );
};

export const GeometriaPlanaPrimaria: React.FC = () => {
  type Mode =
    | 'figuras'
    | 'familias'
    | 'comparar'
    | 'poligonos'
    | 'abiertas'
    | 'lineas'
    | 'angulos'
    | 'composicion'
    | 'cuadricula'
    | 'simetria'
    | 'traslacion'
    | 'area-perimetro'
    | 'raras'
    | 'extras'
    | 'teselaciones'
    | 'coordenadas'
    | 'transformaciones'
    | 'arte';

  type ShapeKey =
    | 'circulo'
    | 'ovalo'
    | 'semicirculo'
    | 'cuadrado'
    | 'rectangulo'
    | 'triangulo'
    | 'pentagono'
    | 'hexagono'
    | 'octagono'
    | 'rombo'
    | 'trapecio'
    | 'paralelogramo'
    | 'cometa'
    | 'estrella'
    | 'corazon'
    | 'cruz'
    | 'flecha';

  const [mode, setMode] = useState<Mode>('figuras');
  const [shape, setShape] = useState<ShapeKey>('triangulo');
  const [shapeB, setShapeB] = useState<ShapeKey>('hexagono');
  const [group, setGroup] = useState<'todas' | 'basicas' | 'curvas' | 'poligonos' | 'cuadrilateros' | 'decorativas'>('todas');
  const [composition, setComposition] = useState<'rombo' | 'cuadrado' | 'hexagono' | 'casa' | 'barco'>('rombo');
  const [mirror, setMirror] = useState(true);
  const [mirrorShape, setMirrorShape] = useState<'mariposa' | 'casa' | 'corazon'>('mariposa');
  const [tx, setTx] = useState(2);
  const [ty, setTy] = useState(1);
  const [gridW, setGridW] = useState(5);
  const [gridH, setGridH] = useState(3);
  const [showUnits, setShowUnits] = useState(true);

  const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, Math.floor(v)));

  const tabs: { id: Mode; label: string; icon: string }[] = [
    { id: 'figuras', label: 'Figuras', icon: '🔷' },
    { id: 'familias', label: 'Agrupar', icon: '🧺' },
    { id: 'comparar', label: 'Comparar', icon: '⚖️' },
    { id: 'poligonos', label: 'Polígonos', icon: '⬡' },
    { id: 'area-perimetro', label: 'Área/Perím.', icon: '▦' },
    { id: 'abiertas', label: 'Abiertas', icon: '〰️' },
    { id: 'lineas', label: 'Líneas', icon: '📏' },
    { id: 'angulos', label: 'Ángulos', icon: '📐' },
    { id: 'composicion', label: 'Componer', icon: '🧩' },
    { id: 'cuadricula', label: 'Cuadrícula', icon: '▦' },
    { id: 'simetria', label: 'Simetría', icon: '🪞' },
    { id: 'traslacion', label: 'Trasladar', icon: '➡️' },
    { id: 'raras', label: 'Raras', icon: '✨' },
    { id: 'extras', label: 'Extras', icon: '🔶' },
    { id: 'teselaciones', label: 'Mosaicos', icon: '🧩' },
    { id: 'coordenadas', label: 'Coords.', icon: '📍' },
    { id: 'transformaciones', label: 'Transform.', icon: '🔄' },
    { id: 'arte', label: 'Diseño', icon: '🎨' },
  ];

  const shapes: Record<ShapeKey, {
    name: string;
    sides: number | 'curva' | 'mixta';
    vertices: number | 'varios';
    family: 'basicas' | 'curvas' | 'poligonos' | 'cuadrilateros' | 'decorativas';
    color: string;
    desc: string;
    clue: string;
    areaHint: string;
    perimeterHint: string;
  }> = {
    circulo: {
      name: 'Círculo',
      sides: 'curva',
      vertices: 0,
      family: 'curvas',
      color: '#ef4444',
      desc: 'Tiene un borde curvo cerrado. No tiene lados rectos ni esquinas.',
      clue: 'Moneda, plato, rueda, reloj redondo.',
      areaHint: 'Su área se estudia después con radio. Aquí solo reconocemos que encierra espacio.',
      perimeterHint: 'Su borde se llama circunferencia.',
    },
    ovalo: {
      name: 'Óvalo',
      sides: 'curva',
      vertices: 0,
      family: 'curvas',
      color: '#f97316',
      desc: 'Es parecido a un círculo estirado. Tiene borde curvo y cerrado.',
      clue: 'Huevo, cara ovalada, balón ovalado.',
      areaHint: 'Encierra espacio como el círculo, pero está alargado.',
      perimeterHint: 'Su borde es curvo.',
    },
    semicirculo: {
      name: 'Semicírculo',
      sides: 'mixta',
      vertices: 2,
      family: 'curvas',
      color: '#fb7185',
      desc: 'Es medio círculo: tiene una parte curva y una parte recta.',
      clue: 'Arco, ventana redondeada, media luna dibujada.',
      areaHint: 'Es la mitad del área de un círculo.',
      perimeterHint: 'Su borde mezcla curva y línea recta.',
    },
    cuadrado: {
      name: 'Cuadrado',
      sides: 4,
      vertices: 4,
      family: 'cuadrilateros',
      color: '#3b82f6',
      desc: 'Tiene 4 lados iguales y 4 ángulos rectos.',
      clue: 'Azulejo, ventana cuadrada, tablero.',
      areaHint: 'Área = lado × lado.',
      perimeterHint: 'Perímetro = lado + lado + lado + lado.',
    },
    rectangulo: {
      name: 'Rectángulo',
      sides: 4,
      vertices: 4,
      family: 'cuadrilateros',
      color: '#22c55e',
      desc: 'Tiene 4 lados y 4 ángulos rectos. Dos lados pueden ser más largos.',
      clue: 'Puerta, hoja, pantalla, mesa.',
      areaHint: 'Área = base × altura.',
      perimeterHint: 'Perímetro = base + altura + base + altura.',
    },
    triangulo: {
      name: 'Triángulo',
      sides: 3,
      vertices: 3,
      family: 'poligonos',
      color: '#f59e0b',
      desc: 'Tiene 3 lados rectos y 3 vértices.',
      clue: 'Techo, señal, rebanada triangular.',
      areaHint: 'Más adelante: área = base × altura ÷ 2.',
      perimeterHint: 'Perímetro = suma de sus 3 lados.',
    },
    pentagono: {
      name: 'Pentágono',
      sides: 5,
      vertices: 5,
      family: 'poligonos',
      color: '#8b5cf6',
      desc: 'Tiene 5 lados rectos y 5 vértices.',
      clue: 'Casa dibujada, escudo, mosaico.',
      areaHint: 'Puede descomponerse en triángulos.',
      perimeterHint: 'Perímetro = suma de sus 5 lados.',
    },
    hexagono: {
      name: 'Hexágono',
      sides: 6,
      vertices: 6,
      family: 'poligonos',
      color: '#14b8a6',
      desc: 'Tiene 6 lados rectos y 6 vértices.',
      clue: 'Panal de abeja, tuerca, mosaico.',
      areaHint: 'Puede partirse en triángulos o trapecios.',
      perimeterHint: 'Perímetro = suma de sus 6 lados.',
    },
    octagono: {
      name: 'Octágono',
      sides: 8,
      vertices: 8,
      family: 'poligonos',
      color: '#dc2626',
      desc: 'Tiene 8 lados rectos y 8 vértices.',
      clue: 'Señal de alto, mosaicos, diseños.',
      areaHint: 'Puede descomponerse en rectángulos y triángulos.',
      perimeterHint: 'Perímetro = suma de sus 8 lados.',
    },
    rombo: {
      name: 'Rombo',
      sides: 4,
      vertices: 4,
      family: 'cuadrilateros',
      color: '#ec4899',
      desc: 'Tiene 4 lados. Parece un cuadrado girado como diamante.',
      clue: 'Cometa, diamante, señal decorativa.',
      areaHint: 'Puede verse como dos triángulos unidos.',
      perimeterHint: 'Perímetro = suma de sus 4 lados.',
    },
    trapecio: {
      name: 'Trapecio',
      sides: 4,
      vertices: 4,
      family: 'cuadrilateros',
      color: '#a16207',
      desc: 'Tiene 4 lados. Normalmente un par de lados opuestos son paralelos.',
      clue: 'Puente, mesa vista de lado, mosaico.',
      areaHint: 'Puede descomponerse en rectángulos y triángulos.',
      perimeterHint: 'Perímetro = suma de sus 4 lados.',
    },
    paralelogramo: {
      name: 'Paralelogramo',
      sides: 4,
      vertices: 4,
      family: 'cuadrilateros',
      color: '#06b6d4',
      desc: 'Tiene dos pares de lados paralelos. Parece un rectángulo inclinado.',
      clue: 'Ladrillo inclinado, mosaico, diseño geométrico.',
      areaHint: 'Puede transformarse visualmente en un rectángulo.',
      perimeterHint: 'Perímetro = suma de sus 4 lados.',
    },
    cometa: {
      name: 'Cometa',
      sides: 4,
      vertices: 4,
      family: 'cuadrilateros',
      color: '#c084fc',
      desc: 'Tiene forma de papalote. Sus lados pueden venir en pares iguales.',
      clue: 'Papalote, diamante estirado.',
      areaHint: 'Puede dividirse en triángulos.',
      perimeterHint: 'Perímetro = suma de sus 4 lados.',
    },
    estrella: {
      name: 'Estrella',
      sides: 'mixta',
      vertices: 'varios',
      family: 'decorativas',
      color: '#eab308',
      desc: 'Es una figura decorativa con puntas. Puede tener muchos lados y vértices.',
      clue: 'Estrella, calcomanía, premio.',
      areaHint: 'Se puede descomponer en triángulos.',
      perimeterHint: 'Su perímetro recorre todas sus puntas.',
    },
    corazon: {
      name: 'Corazón',
      sides: 'curva',
      vertices: 1,
      family: 'decorativas',
      color: '#e11d48',
      desc: 'Figura decorativa con curvas y una punta.',
      clue: 'Tarjetas, dibujos, iconos.',
      areaHint: 'Encierra espacio con curvas.',
      perimeterHint: 'Su borde es curvo y termina en punta.',
    },
    cruz: {
      name: 'Cruz',
      sides: 'mixta',
      vertices: 'varios',
      family: 'decorativas',
      color: '#64748b',
      desc: 'Figura compuesta por rectángulos. Tiene varios ángulos rectos.',
      clue: 'Señales, símbolo de suma, diseños.',
      areaHint: 'Puede componerse con rectángulos.',
      perimeterHint: 'Su borde tiene muchos segmentos rectos.',
    },
    flecha: {
      name: 'Flecha',
      sides: 'mixta',
      vertices: 'varios',
      family: 'decorativas',
      color: '#10b981',
      desc: 'Figura compuesta que indica dirección.',
      clue: 'Señales, mapas, botones.',
      areaHint: 'Puede descomponerse en rectángulo y triángulo.',
      perimeterHint: 'Su borde mezcla lados largos y punta.',
    },
  };

  const shapeOrder: ShapeKey[] = [
    'circulo', 'ovalo', 'semicirculo',
    'triangulo', 'cuadrado', 'rectangulo',
    'rombo', 'trapecio', 'paralelogramo', 'cometa',
    'pentagono', 'hexagono', 'octagono',
    'estrella', 'corazon', 'cruz', 'flecha',
  ];

  const filteredShapes = shapeOrder.filter(k => {
    if (group === 'todas') return true;
    if (group === 'basicas') return ['circulo', 'cuadrado', 'triangulo', 'rectangulo'].includes(k);
    return shapes[k].family === group;
  });

  const Card = ({ title, children, color = '#22c55e', note }: { title: string; children: React.ReactNode; color?: string; note?: string }) => (
    <div className="p-4 rounded-3xl border-2 shadow text-center min-w-0 overflow-hidden" style={{ borderColor: color, background: `${color}18` }}>
      <div className="font-black text-lg mb-2">{title}</div>
      {children}
      {note && <div className="text-xs font-bold opacity-75 mt-2 leading-relaxed">{note}</div>}
    </div>
  );

  const Step = ({ n, icon, title, text, color }: { n: number; icon: string; title: string; text: string; color: string }) => (
    <div className="p-4 rounded-3xl border-2 shadow" style={{ borderColor: color, background: `${color}18` }}>
      <div className="text-4xl mb-1">{icon}</div>
      <div className="text-xs font-black uppercase opacity-70">Paso {n}</div>
      <div className="font-black text-xl leading-tight">{title}</div>
      <div className="text-sm font-bold opacity-80 leading-relaxed mt-1">{text}</div>
    </div>
  );

  const ShapeSvg = ({ k, size = 150, showPoints = false, showAxes = false }: { k: ShapeKey; size?: number; showPoints?: boolean; showAxes?: boolean }) => {
    const data = shapes[k];
    const stroke = 'rgba(15,23,42,.9)';
    const fill = data.color;

    const points: Partial<Record<ShapeKey, string>> = {
      cuadrado: '35,35 125,35 125,125 35,125',
      triangulo: '80,25 135,130 25,130',
      rectangulo: '25,45 135,45 135,115 25,115',
      pentagono: '80,22 135,62 114,132 46,132 25,62',
      hexagono: '48,32 112,32 145,80 112,128 48,128 15,80',
      octagono: '60,20 100,20 140,60 140,100 100,140 60,140 20,100 20,60',
      rombo: '80,20 140,80 80,140 20,80',
      trapecio: '48,45 112,45 140,125 20,125',
      paralelogramo: '55,40 140,40 105,125 20,125',
      cometa: '80,18 130,75 80,142 35,75',
      estrella: '80,18 97,58 140,60 106,88 118,132 80,108 42,132 54,88 20,60 63,58',
      cruz: '62,20 98,20 98,62 140,62 140,98 98,98 98,140 62,140 62,98 20,98 20,62 62,62',
      flecha: '20,62 95,62 95,35 142,80 95,125 95,98 20,98',
    };

    const vertexList = points[k]
      ? points[k]!.split(' ').map(p => {
          const [x, y] = p.split(',').map(Number);
          return { x, y };
        })
      : [];

    return (
      <svg width={size} height={size} viewBox="0 0 160 160" className="mx-auto max-w-full drop-shadow-sm">
        {showAxes && (
          <>
            <line x1="80" y1="8" x2="80" y2="152" stroke="rgba(148,163,184,.5)" strokeWidth="2" strokeDasharray="5 5" />
            <line x1="8" y1="80" x2="152" y2="80" stroke="rgba(148,163,184,.5)" strokeWidth="2" strokeDasharray="5 5" />
          </>
        )}

        {k === 'circulo' && <circle cx="80" cy="80" r="54" fill={fill} stroke={stroke} strokeWidth="5" />}
        {k === 'ovalo' && <ellipse cx="80" cy="80" rx="58" ry="38" fill={fill} stroke={stroke} strokeWidth="5" />}
        {k === 'semicirculo' && <path d="M30 110 A50 50 0 0 1 130 110 Z" fill={fill} stroke={stroke} strokeWidth="5" strokeLinejoin="round" />}
        {k === 'corazon' && (
          <path d="M80 137 C35 102 20 78 28 52 C35 28 62 25 80 47 C98 25 125 28 132 52 C140 78 125 102 80 137 Z" fill={fill} stroke={stroke} strokeWidth="5" />
        )}
        {points[k] && <polygon points={points[k]} fill={fill} stroke={stroke} strokeWidth="5" strokeLinejoin="round" />}

        {showPoints && vertexList.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="7" fill="white" stroke={stroke} strokeWidth="3" />
            <text x={p.x} y={p.y + 4} textAnchor="middle" fontSize="10" fontWeight="900" fill={stroke}>{i + 1}</text>
          </g>
        ))}
      </svg>
    );
  };

  const FamilyBadge = ({ label, color, children }: { label: string; color: string; children: React.ReactNode }) => (
    <div className="p-4 rounded-3xl border-2 shadow min-h-[180px]" style={{ borderColor: color, background: `${color}16` }}>
      <div className="font-black text-lg mb-3 text-center" style={{ color }}>{label}</div>
      <div className="flex flex-wrap gap-3 justify-center items-center">{children}</div>
    </div>
  );

  const AreaGrid = () => {
    const cell = 28;
    const w = clamp(gridW, 1, 10);
    const h = clamp(gridH, 1, 8);
    const svgW = cell * (w + 2);
    const svgH = cell * (h + 2);

    return (
      <div className="max-w-full overflow-x-auto pb-2">
        <svg width={svgW} height={svgH} viewBox={`0 0 ${svgW} ${svgH}`} className="mx-auto rounded-3xl border-2 border-border-color bg-surface-color">
          {Array.from({ length: h + 2 }).map((_, y) => (
            <line key={`h-${y}`} x1="0" y1={y * cell} x2={svgW} y2={y * cell} stroke="rgba(148,163,184,.45)" />
          ))}
          {Array.from({ length: w + 2 }).map((_, x) => (
            <line key={`v-${x}`} x1={x * cell} y1="0" x2={x * cell} y2={svgH} stroke="rgba(148,163,184,.45)" />
          ))}

          {Array.from({ length: h }).map((_, y) => (
            Array.from({ length: w }).map((_, x) => (
              <rect
                key={`${x}-${y}`}
                x={(x + 1) * cell}
                y={(y + 1) * cell}
                width={cell}
                height={cell}
                fill={showUnits ? '#22c55e55' : '#22c55e33'}
                stroke="#16a34a"
                strokeWidth="1.5"
              />
            ))
          ))}

          <rect x={cell} y={cell} width={w * cell} height={h * cell} fill="none" stroke="#1e293b" strokeWidth="5" />
        </svg>
      </div>
    );
  };

  const GridSvg = ({ translated = false, symmetric = false }: { translated?: boolean; symmetric?: boolean }) => {
    const cell = 30;
    const size = cell * 8;
    const base = [{ x: 1, y: 1 }, { x: 3, y: 1 }, { x: 3, y: 3 }, { x: 1, y: 3 }];
    const moved = base.map(p => ({ x: p.x + tx, y: p.y + ty }));

    const mirrorShapes = {
      mariposa: [{ x: 2, y: 1 }, { x: 3, y: 2 }, { x: 3, y: 5 }, { x: 2, y: 6 }, { x: 1, y: 4 }, { x: 2, y: 3 }],
      casa: [{ x: 2, y: 2 }, { x: 3, y: 1 }, { x: 3, y: 6 }, { x: 2, y: 6 }, { x: 2, y: 3 }],
      corazon: [{ x: 2, y: 2 }, { x: 3, y: 2 }, { x: 3, y: 5 }, { x: 2, y: 6 }, { x: 1, y: 4 }],
    };

    const leftHalf = mirrorShapes[mirrorShape];
    const rightHalf = leftHalf.map(p => ({ x: 8 - p.x, y: p.y }));

    const poly = (pts: { x: number; y: number }[]) => pts.map(p => `${p.x * cell},${p.y * cell}`).join(' ');

    return (
      <div className="max-w-full overflow-x-auto pb-2">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="mx-auto bg-surface-color rounded-3xl border-2 border-border-color shadow">
          {Array.from({ length: 9 }).map((_, i) => (
            <g key={i}>
              <line x1={i * cell} y1="0" x2={i * cell} y2={size} stroke="rgba(148,163,184,.45)" />
              <line x1="0" y1={i * cell} x2={size} y2={i * cell} stroke="rgba(148,163,184,.45)" />
            </g>
          ))}

          {symmetric ? (
            <>
              <line x1={4 * cell} y1="0" x2={4 * cell} y2={size} stroke="#ef4444" strokeWidth="5" strokeDasharray="8 6" />
              <polygon points={poly(leftHalf)} fill="#3b82f6" stroke="#1e293b" strokeWidth="3" />
              {leftHalf.map((p, i) => {
                const rp = rightHalf[i];
                return (
                  <line key={i} x1={p.x * cell} y1={p.y * cell} x2={rp.x * cell} y2={rp.y * cell} stroke="#f97316" strokeWidth="2" strokeDasharray="4 5" opacity=".8" />
                );
              })}
              {mirror && <polygon points={poly(rightHalf)} fill="#22c55e" stroke="#1e293b" strokeWidth="3" className="animate-pulse" />}
              {leftHalf.map((p, i) => (
                <circle key={`l-${i}`} cx={p.x * cell} cy={p.y * cell} r="5" fill="#1d4ed8" />
              ))}
              {mirror && rightHalf.map((p, i) => (
                <circle key={`r-${i}`} cx={p.x * cell} cy={p.y * cell} r="5" fill="#16a34a" />
              ))}
            </>
          ) : (
            <>
              <polygon points={poly(base)} fill="#f97316" stroke="#1e293b" strokeWidth="3" opacity={translated ? .35 : 1} />
              {translated && <polygon points={poly(moved)} fill="#22c55e" stroke="#1e293b" strokeWidth="3" />}
            </>
          )}
        </svg>
      </div>
    );
  };

  const renderFiguras = () => (
    <div className="space-y-4">
      <div className="p-5 rounded-3xl border-2 border-emerald-500/30 bg-emerald-500/10 shadow">
        <div className="font-black text-2xl mb-2">Figuras geométricas planas</div>
        <div className="text-sm font-bold opacity-85 leading-relaxed">
          Una figura plana vive en una superficie: hoja, pantalla, piso o cuadrícula. Puede tener lados rectos, bordes curvos, vértices, simetría y área.
        </div>
      </div>

      <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(118px, 1fr))' }}>
        {([
          ['todas', 'Todas', '🌈'],
          ['basicas', 'Básicas', '🔷'],
          ['curvas', 'Curvas', '〰️'],
          ['poligonos', 'Polígonos', '⬡'],
          ['cuadrilateros', '4 lados', '▰'],
          ['decorativas', 'Raras', '✨'],
        ] as const).map(([id, label, icon]) => (
          <button
            key={id}
            onClick={() => setGroup(id)}
            className={`p-3 rounded-2xl font-black text-xs border-2 transition-all hover:scale-105 ${group === id ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-border-color'}`}
          >
            <span className="text-2xl block mb-1">{icon}</span>{label}
          </button>
        ))}
      </div>

      <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(118px, 1fr))' }}>
        {filteredShapes.map(k => (
          <button
            key={k}
            onClick={() => setShape(k)}
            className={`p-3 rounded-3xl border-2 font-black text-xs transition-all hover:scale-105 min-h-[145px] ${shape === k ? 'text-white shadow scale-105' : 'bg-surface-color border-border-color'}`}
            style={shape === k ? { background: shapes[k].color, borderColor: shapes[k].color } : {}}
          >
            <ShapeSvg k={k} size={82} />
            {shapes[k].name}
          </button>
        ))}
      </div>

      <div className="grid 2xl:grid-cols-[minmax(280px,360px)_minmax(0,1fr)] gap-4 items-start">
        <Card title={shapes[shape].name} color={shapes[shape].color}>
          <ShapeSvg k={shape} size={220} showPoints showAxes />
        </Card>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-3">
          <Step n={1} icon="👀" title="Observa" text={shapes[shape].desc} color={shapes[shape].color} />
          <Step n={2} icon="📏" title="Lados" text={shapes[shape].sides === 'curva' ? 'Tiene borde curvo.' : shapes[shape].sides === 'mixta' ? 'Tiene partes combinadas.' : `Tiene ${shapes[shape].sides} lados.`} color="#0ea5e9" />
          <Step n={3} icon="📍" title="Vértices" text={typeof shapes[shape].vertices === 'number' ? `Tiene ${shapes[shape].vertices} vértice(s).` : 'Tiene varios vértices o puntas.'} color="#f97316" />
          <Step n={4} icon="🏠" title="Ejemplos" text={shapes[shape].clue} color="#8b5cf6" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-3">
        <Card title="Área" color="#22c55e" note={shapes[shape].areaHint}>
          <div className="text-4xl">▦</div>
        </Card>
        <Card title="Perímetro" color="#f97316" note={shapes[shape].perimeterHint}>
          <div className="text-4xl">📏</div>
        </Card>
      </div>
    </div>
  );

  const renderFamilias = () => (
    <div className="space-y-4">
      <div className="p-5 rounded-3xl border-2 border-violet-500/30 bg-violet-500/10 shadow">
        <div className="font-black text-2xl mb-2">Agrupar figuras</div>
        <div className="text-sm font-bold opacity-85 leading-relaxed">
          Agrupar ayuda a pensar mejor: puedes clasificar por curvas, lados rectos, número de lados, ángulos rectos o figuras decorativas.
        </div>
      </div>

      <div className="grid xl:grid-cols-3 gap-4">
        <FamilyBadge label="Básicas" color="#22c55e">
          {(['circulo', 'cuadrado', 'triangulo', 'rectangulo'] as ShapeKey[]).map(k => <ShapeSvg key={k} k={k} size={88} />)}
        </FamilyBadge>

        <FamilyBadge label="Con curvas" color="#ec4899">
          {(['circulo', 'ovalo', 'semicirculo', 'corazon'] as ShapeKey[]).map(k => <ShapeSvg key={k} k={k} size={88} />)}
        </FamilyBadge>

        <FamilyBadge label="Polígonos" color="#0ea5e9">
          {(['triangulo', 'pentagono', 'hexagono', 'octagono'] as ShapeKey[]).map(k => <ShapeSvg key={k} k={k} size={88} />)}
        </FamilyBadge>

        <FamilyBadge label="Cuadriláteros" color="#f97316">
          {(['cuadrado', 'rectangulo', 'rombo', 'trapecio', 'paralelogramo', 'cometa'] as ShapeKey[]).map(k => <ShapeSvg key={k} k={k} size={88} />)}
        </FamilyBadge>

        <FamilyBadge label="Decorativas o compuestas" color="#8b5cf6">
          {(['estrella', 'cruz', 'flecha', 'corazon'] as ShapeKey[]).map(k => <ShapeSvg key={k} k={k} size={88} />)}
        </FamilyBadge>

        <FamilyBadge label="Con ángulos rectos" color="#14b8a6">
          {(['cuadrado', 'rectangulo', 'cruz'] as ShapeKey[]).map(k => <ShapeSvg key={k} k={k} size={88} />)}
        </FamilyBadge>
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        <Step n={1} icon="👀" title="Elige una propiedad" text="Por ejemplo: tiene curvas, tiene 4 lados, tiene puntas." color="#0ea5e9" />
        <Step n={2} icon="🧺" title="Agrupa" text="Pon juntas las figuras que cumplen esa propiedad." color="#8b5cf6" />
        <Step n={3} icon="🧠" title="Explica" text="Di por qué pertenece a ese grupo." color="#22c55e" />
      </div>
    </div>
  );

  const renderComparar = () => (
    <div className="space-y-4">
      <div className="p-5 rounded-3xl border-2 border-blue-500/30 bg-blue-500/10 shadow">
        <div className="font-black text-2xl mb-2">Comparar figuras</div>
        <div className="text-sm font-bold opacity-85 leading-relaxed">
          Puedes comparar por número de lados, vértices, curvas, ángulos rectos, simetría, área aproximada y perímetro.
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_80px_1fr] gap-3 items-center">
        <Card title="Figura A" color={shapes[shape].color}>
          <select className="w-full p-3 rounded-2xl bg-surface-color border-2 border-border-color font-black mb-3" value={shape} onChange={e => setShape(e.target.value as ShapeKey)}>
            {shapeOrder.map(k => <option key={k} value={k}>{shapes[k].name}</option>)}
          </select>
          <ShapeSvg k={shape} size={190} showPoints />
          <div className="font-black mt-2">{shapes[shape].name}</div>
        </Card>

        <div className="text-5xl font-black text-center">vs</div>

        <Card title="Figura B" color={shapes[shapeB].color}>
          <select className="w-full p-3 rounded-2xl bg-surface-color border-2 border-border-color font-black mb-3" value={shapeB} onChange={e => setShapeB(e.target.value as ShapeKey)}>
            {shapeOrder.map(k => <option key={k} value={k}>{shapes[k].name}</option>)}
          </select>
          <ShapeSvg k={shapeB} size={190} showPoints />
          <div className="font-black mt-2">{shapes[shapeB].name}</div>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-3">
        <Card title="Lados" color="#0ea5e9" note={`${shapes[shape].name}: ${shapes[shape].sides} | ${shapes[shapeB].name}: ${shapes[shapeB].sides}`}>
          <div className="text-4xl">📏</div>
        </Card>
        <Card title="Vértices" color="#f97316" note={`${shapes[shape].name}: ${shapes[shape].vertices} | ${shapes[shapeB].name}: ${shapes[shapeB].vertices}`}>
          <div className="text-4xl">📍</div>
        </Card>
        <Card title="Familia" color="#8b5cf6" note={`${shapes[shape].family} vs ${shapes[shapeB].family}`}>
          <div className="text-4xl">🧺</div>
        </Card>
        <Card title="Borde" color="#22c55e" note={shapes[shape].sides === 'curva' || shapes[shapeB].sides === 'curva' ? 'Al menos una tiene borde curvo.' : 'Ambas usan lados rectos o combinados.'}>
          <div className="text-4xl">〰️</div>
        </Card>
      </div>
    </div>
  );

  const renderPoligonos = () => {
    const polyKeys: ShapeKey[] = ['triangulo', 'cuadrado', 'rectangulo', 'rombo', 'trapecio', 'paralelogramo', 'cometa', 'pentagono', 'hexagono', 'octagono'];
    return (
      <div className="space-y-4">
        <div className="p-5 rounded-3xl border-2 border-blue-500/30 bg-blue-500/10 shadow">
          <div className="font-black text-2xl mb-2">Polígonos: lados y vértices</div>
          <div className="text-sm font-bold opacity-85 leading-relaxed">
            Un polígono es una figura cerrada formada solo por líneas rectas.
          </div>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-3">
          {polyKeys.map(k => (
            <Card key={k} title={shapes[k].name} color={shapes[k].color} note={`${shapes[k].sides} lados y ${shapes[k].vertices} vértices`}>
              <ShapeSvg k={k} showPoints />
            </Card>
          ))}
        </div>
      </div>
    );
  };

  const renderAreaPerimetro = () => {
    const area = gridW * gridH;
    const perimeter = 2 * (gridW + gridH);

    return (
      <div className="space-y-4">
        <div className="p-5 rounded-3xl border-2 border-emerald-500/30 bg-emerald-500/10 shadow">
          <div className="font-black text-2xl mb-2">Área y perímetro</div>
          <div className="text-sm font-bold opacity-85 leading-relaxed">
            Área es el espacio de adentro. Perímetro es el camino alrededor del borde.
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-3">
          <NumberInput label="Base en cuadritos" value={gridW} setValue={(v) => setGridW(clamp(v, 1, 10))} min={1} max={10} color="#22c55e" />
          <NumberInput label="Altura en cuadritos" value={gridH} setValue={(v) => setGridH(clamp(v, 1, 8))} min={1} max={8} color="#0ea5e9" />
          <button onClick={() => setShowUnits(v => !v)} className="p-3 rounded-2xl bg-surface-color border-2 border-border-color font-black shadow">
            {showUnits ? 'Ocultar unidades' : 'Mostrar unidades'}
          </button>
        </div>

        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(280px,380px)] gap-4">
          <Card title={`${gridW} × ${gridH}`} color="#22c55e">
            <AreaGrid />
          </Card>

          <div className="grid gap-3">
            <Card title="Área" color="#22c55e" note="Cuenta todos los cuadritos de adentro.">
              <div className="text-5xl font-black">{area}</div>
              <div className="text-sm font-bold mt-2">{gridW} × {gridH} = {area}</div>
            </Card>
            <Card title="Perímetro" color="#f97316" note="Cuenta el borde que rodea la figura.">
              <div className="text-5xl font-black">{perimeter}</div>
              <div className="text-sm font-bold mt-2">2 × ({gridW} + {gridH}) = {perimeter}</div>
            </Card>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-3">
          <Step n={1} icon="▦" title="Área" text="Cuenta los cuadritos de adentro." color="#22c55e" />
          <Step n={2} icon="📏" title="Perímetro" text="Cuenta el camino del borde." color="#f97316" />
          <Step n={3} icon="⚖️" title="Comparación" text="Dos figuras pueden tener la misma área y diferente perímetro." color="#8b5cf6" />
        </div>
      </div>
    );
  };

  const renderAbiertas = () => (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-3">
        <Card title="Figura cerrada" color="#22c55e" note="El camino termina donde empezó. Encierra una región.">
          <svg width="260" height="170" viewBox="0 0 260 170" className="mx-auto max-w-full">
            <polygon points="70,30 195,35 225,125 40,125" fill="#22c55e" stroke="#1e293b" strokeWidth="6" strokeLinejoin="round" />
          </svg>
        </Card>

        <Card title="Figura abierta" color="#ef4444" note="El camino no cierra. No encierra una región completa.">
          <svg width="260" height="170" viewBox="0 0 260 170" className="mx-auto max-w-full">
            <polyline points="45,125 80,40 155,40 215,115" fill="none" stroke="#ef4444" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="45" cy="125" r="8" fill="#ef4444" />
            <circle cx="215" cy="115" r="8" fill="#ef4444" />
          </svg>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        <Step n={1} icon="👣" title="Sigue el borde" text="Imagina que caminas por la línea." color="#0ea5e9" />
        <Step n={2} icon="🔒" title="¿Regresa al inicio?" text="Si vuelve al inicio, es cerrada." color="#22c55e" />
        <Step n={3} icon="🚪" title="¿Queda abierto?" text="Si quedan puntas separadas, es abierta." color="#ef4444" />
      </div>
    </div>
  );

  const renderLineas = () => (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-3">
        <Card title="Línea recta" color="#0ea5e9" note="No se curva. Va derecha.">
          <svg width="220" height="120" viewBox="0 0 220 120" className="mx-auto">
            <line x1="25" y1="80" x2="195" y2="35" stroke="#0ea5e9" strokeWidth="10" strokeLinecap="round" />
          </svg>
        </Card>

        <Card title="Línea curva" color="#ec4899" note="Cambia de dirección suavemente.">
          <svg width="220" height="120" viewBox="0 0 220 120" className="mx-auto">
            <path d="M25 80 C70 10, 135 120, 195 35" fill="none" stroke="#ec4899" strokeWidth="10" strokeLinecap="round" />
          </svg>
        </Card>

        <Card title="Paralelas" color="#22c55e" note="Van en la misma dirección y no se cruzan.">
          <svg width="220" height="120" viewBox="0 0 220 120" className="mx-auto">
            <line x1="25" y1="40" x2="195" y2="40" stroke="#22c55e" strokeWidth="8" strokeLinecap="round" />
            <line x1="25" y1="80" x2="195" y2="80" stroke="#22c55e" strokeWidth="8" strokeLinecap="round" />
          </svg>
        </Card>

        <Card title="Perpendiculares" color="#f97316" note="Se cruzan formando un ángulo recto.">
          <svg width="220" height="120" viewBox="0 0 220 120" className="mx-auto">
            <line x1="110" y1="20" x2="110" y2="100" stroke="#f97316" strokeWidth="8" strokeLinecap="round" />
            <line x1="55" y1="60" x2="165" y2="60" stroke="#f97316" strokeWidth="8" strokeLinecap="round" />
            <rect x="110" y="60" width="22" height="22" fill="none" stroke="#1e293b" strokeWidth="4" />
          </svg>
        </Card>
      </div>
    </div>
  );

  const renderAngulos = () => (
    <div className="space-y-4">
      <div className="p-5 rounded-3xl border-2 border-orange-500/30 bg-orange-500/10 shadow">
        <div className="font-black text-2xl mb-2">Ángulo recto</div>
        <div className="text-sm font-bold opacity-85 leading-relaxed">
          Un ángulo recto es una esquina perfecta como la esquina de una hoja. Mide 90 grados.
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        <Card title="Esquina de hoja" color="#f97316">
          <svg width="180" height="160" viewBox="0 0 180 160" className="mx-auto">
            <rect x="45" y="30" width="100" height="100" fill="#f8fafc" stroke="#1e293b" strokeWidth="5" />
            <rect x="45" y="30" width="32" height="32" fill="none" stroke="#f97316" strokeWidth="5" />
          </svg>
        </Card>

        <Card title="Cuadrado" color="#3b82f6" note="Tiene 4 ángulos rectos.">
          <ShapeSvg k="cuadrado" showPoints />
        </Card>

        <Card title="Rectángulo y cruz" color="#22c55e" note="La cruz tiene muchos ángulos rectos.">
          <div className="flex justify-center gap-4 flex-wrap">
            <ShapeSvg k="rectangulo" size={130} showPoints />
            <ShapeSvg k="cruz" size={130} showPoints />
          </div>
        </Card>
      </div>
    </div>
  );

  const renderComposicion = () => (
    <div className="space-y-4">
      <div className="flex gap-2 flex-wrap">
        {(['rombo', 'cuadrado', 'hexagono', 'casa', 'barco'] as const).map(k => (
          <button key={k} onClick={() => setComposition(k)} className={`px-4 py-2 rounded-2xl font-black border-2 ${composition === k ? 'bg-[var(--primary-color)] text-white' : 'bg-surface-color border-border-color'}`}>
            {k === 'rombo' ? '2 triángulos → rombo' : k === 'cuadrado' ? '2 triángulos → cuadrado' : k === 'hexagono' ? 'Hexágono → partes' : k === 'casa' ? 'Casa con figuras' : 'Barco con figuras'}
          </button>
        ))}
      </div>

      <Card title="Composición y descomposición" color="#8b5cf6" note="Una figura grande puede construirse con figuras pequeñas. También puede partirse en figuras conocidas.">
        <svg width="420" height="280" viewBox="0 0 420 280" className="mx-auto max-w-full">
          {composition === 'rombo' && (
            <>
              <polygon points="210,35 335,140 210,140" fill="#3b82f6" stroke="#1e293b" strokeWidth="4" />
              <polygon points="210,140 335,140 210,245" fill="#f59e0b" stroke="#1e293b" strokeWidth="4" />
              <polygon points="210,35 335,140 210,245 85,140" fill="none" stroke="#1e293b" strokeWidth="5" />
            </>
          )}

          {composition === 'cuadrado' && (
            <>
              <polygon points="105,40 315,40 105,250" fill="#3b82f6" stroke="#1e293b" strokeWidth="4" />
              <polygon points="315,40 315,250 105,250" fill="#f59e0b" stroke="#1e293b" strokeWidth="4" />
              <rect x="105" y="40" width="210" height="210" fill="none" stroke="#1e293b" strokeWidth="5" />
            </>
          )}

          {composition === 'hexagono' && (
            <>
              <polygon points="145,45 275,45 350,140 275,235 145,235 70,140" fill="#14b8a6" stroke="#1e293b" strokeWidth="5" />
              <line x1="210" y1="45" x2="210" y2="235" stroke="white" strokeWidth="5" />
              <line x1="70" y1="140" x2="350" y2="140" stroke="white" strokeWidth="5" />
              <line x1="145" y1="45" x2="275" y2="235" stroke="white" strokeWidth="5" />
            </>
          )}

          {composition === 'casa' && (
            <>
              <rect x="125" y="125" width="170" height="115" fill="#22c55e" stroke="#1e293b" strokeWidth="5" />
              <polygon points="105,125 210,40 315,125" fill="#f97316" stroke="#1e293b" strokeWidth="5" />
              <rect x="185" y="170" width="50" height="70" fill="#a16207" stroke="#1e293b" strokeWidth="4" />
              <circle cx="230" cy="205" r="5" fill="#facc15" />
            </>
          )}

          {composition === 'barco' && (
            <>
              <polygon points="95,160 325,160 280,230 140,230" fill="#8b5cf6" stroke="#1e293b" strokeWidth="5" />
              <rect x="205" y="65" width="10" height="95" fill="#1e293b" />
              <polygon points="215,70 300,140 215,140" fill="#22c55e" stroke="#1e293b" strokeWidth="4" />
              <polygon points="205,80 120,145 205,145" fill="#f97316" stroke="#1e293b" strokeWidth="4" />
            </>
          )}
        </svg>
      </Card>
    </div>
  );

  const renderCuadricula = () => (
    <div className="space-y-4">
      <div className="p-5 rounded-3xl border-2 border-blue-500/30 bg-blue-500/10 shadow">
        <div className="font-black text-2xl mb-2">Trazar figuras en cuadrícula</div>
        <div className="text-sm font-bold opacity-85 leading-relaxed">
          La cuadrícula ayuda a dibujar con orden: cuenta cuadros, marca puntos y une con líneas rectas.
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        <Step n={1} icon="▦" title="Cuenta cuadros" text="Usa las líneas como guía." color="#0ea5e9" />
        <Step n={2} icon="📍" title="Marca vértices" text="Pon puntos en las esquinas." color="#f97316" />
        <Step n={3} icon="📏" title="Une puntos" text="Conecta los puntos para cerrar la figura." color="#22c55e" />
      </div>

      <Card title="Figura en cuadrícula" color="#0ea5e9">
        <GridSvg />
      </Card>
    </div>
  );

  const renderSimetria = () => (
    <div className="space-y-4">
      <div className="p-5 rounded-3xl border-2 border-pink-500/30 bg-pink-500/10 shadow">
        <div className="font-black text-2xl mb-2">Simetría y efecto espejo</div>
        <div className="text-sm font-bold opacity-85 leading-relaxed">
          Una figura es simétrica si un lado puede reflejarse como espejo en el otro. El eje de simetría es la línea que divide ambas partes.
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {(['mariposa', 'casa', 'corazon'] as const).map(k => (
          <button key={k} onClick={() => setMirrorShape(k)} className={`px-4 py-2 rounded-2xl font-black border-2 ${mirrorShape === k ? 'bg-pink-500 text-white' : 'bg-surface-color border-border-color'}`}>
            {k === 'mariposa' ? 'Mariposa' : k === 'casa' ? 'Casa' : 'Corazón'}
          </button>
        ))}
        <button onClick={() => setMirror(v => !v)} className="px-5 py-2 rounded-2xl bg-pink-500 text-white font-black shadow hover:scale-105 transition-all">
          {mirror ? 'Ocultar espejo' : 'Completar espejo'}
        </button>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(260px,420px)] gap-4">
        <Card title="Completa la mitad" color="#ec4899">
          <GridSvg symmetric />
        </Card>

        <div className="grid gap-3">
          <Step n={1} icon="🪞" title="Mira el eje" text="La línea roja es el espejo." color="#ec4899" />
          <Step n={2} icon="📏" title="Misma distancia" text="Cada punto del otro lado queda a la misma distancia del eje." color="#0ea5e9" />
          <Step n={3} icon="✨" title="Refleja" text="Las líneas naranjas ayudan a ver qué punto copia a cuál." color="#f97316" />
          <Step n={4} icon="✅" title="Completa" text="La mitad verde completa la figura." color="#22c55e" />
        </div>
      </div>
    </div>
  );

  const renderTraslacion = () => (
    <div className="space-y-4">
      <div className="p-5 rounded-3xl border-2 border-emerald-500/30 bg-emerald-500/10 shadow">
        <div className="font-black text-2xl mb-2">Trasladar una figura</div>
        <div className="text-sm font-bold opacity-85 leading-relaxed">
          Trasladar es mover una figura sin girarla y sin cambiar su tamaño. Todos sus puntos se mueven igual.
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        <button onClick={() => setTx(Math.max(0, tx - 1))} className="px-4 py-2 rounded-2xl bg-surface-color border-2 border-border-color font-black">← menos X</button>
        <button onClick={() => setTx(Math.min(4, tx + 1))} className="px-4 py-2 rounded-2xl bg-surface-color border-2 border-border-color font-black">más X →</button>
        <button onClick={() => setTy(Math.max(0, ty - 1))} className="px-4 py-2 rounded-2xl bg-surface-color border-2 border-border-color font-black">↑ menos Y</button>
        <button onClick={() => setTy(Math.min(4, ty + 1))} className="px-4 py-2 rounded-2xl bg-surface-color border-2 border-border-color font-black">más Y ↓</button>
      </div>

      <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(260px,380px)] gap-4">
        <Card title={`Traslación: ${tx} a la derecha, ${ty} hacia abajo`} color="#22c55e">
          <GridSvg translated />
        </Card>

        <div className="grid gap-3">
          <Step n={1} icon="📦" title="Figura original" text="La figura naranja es la original." color="#f97316" />
          <Step n={2} icon="➡️" title="Movimiento" text={`Cada punto se mueve ${tx} cuadros a la derecha y ${ty} hacia abajo.`} color="#0ea5e9" />
          <Step n={3} icon="✅" title="Resultado" text="La figura verde conserva forma y tamaño." color="#22c55e" />
        </div>
      </div>
    </div>
  );

  const renderRaras = () => (
    <div className="space-y-4">
      <div className="p-5 rounded-3xl border-2 border-amber-500/30 bg-amber-500/10 shadow">
        <div className="font-black text-2xl mb-2">Figuras raras, compuestas y decorativas</div>
        <div className="text-sm font-bold opacity-85 leading-relaxed">
          No todas las figuras son “básicas”. Algunas se forman combinando figuras conocidas o mezclando lados rectos y curvas.
        </div>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-3">
        {(['estrella', 'corazon', 'cruz', 'flecha', 'cometa', 'paralelogramo', 'semicirculo', 'ovalo'] as ShapeKey[]).map(k => (
          <Card key={k} title={shapes[k].name} color={shapes[k].color} note={shapes[k].desc}>
            <ShapeSvg k={k} size={170} showPoints />
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        <Step n={1} icon="🧩" title="Descompón" text="Pregunta: ¿de qué figuras pequeñas se puede formar?" color="#8b5cf6" />
        <Step n={2} icon="📏" title="Mira bordes" text="¿Tiene líneas rectas, curvas o ambas?" color="#0ea5e9" />
        <Step n={3} icon="🧠" title="Clasifica" text="Puede pertenecer a más de una familia." color="#22c55e" />
      </div>
    </div>
  );


  type ExtraShape = 'heptagono' | 'eneagono' | 'decagono' | 'dodecagono' | 'luna' | 'gota' | 'rayo' | 'anillo' | 'escalon' | 'nube';

  const extraShapes: Record<ExtraShape, { name: string; color: string; family: string; desc: string; compare: string }> = {
    heptagono: { name: 'Heptágono', color: '#6366f1', family: 'polígono regular', desc: 'Tiene 7 lados. Es menos común que el pentágono y el hexágono.', compare: 'Más lados que un hexágono y menos que un octágono.' },
    eneagono: { name: 'Eneágono', color: '#8b5cf6', family: 'polígono regular', desc: 'Tiene 9 lados. También puede llamarse nonágono.', compare: 'Tiene un lado más que el octágono.' },
    decagono: { name: 'Decágono', color: '#06b6d4', family: 'polígono regular', desc: 'Tiene 10 lados. Su nombre recuerda a “diez”.', compare: 'Tiene el doble de lados que un pentágono.' },
    dodecagono: { name: 'Dodecágono', color: '#14b8a6', family: 'polígono regular', desc: 'Tiene 12 lados. Se parece cada vez más a un círculo.', compare: 'Tiene muchos lados pequeños.' },
    luna: { name: 'Luna', color: '#64748b', family: 'curva compuesta', desc: 'Se forma con curvas. Parece una parte de círculo quitada.', compare: 'No es polígono porque usa curvas.' },
    gota: { name: 'Gota', color: '#0ea5e9', family: 'curva con punta', desc: 'Tiene curvas y una punta. Es útil para hablar de bordes mixtos.', compare: 'Se parece a un círculo deformado con un vértice.' },
    rayo: { name: 'Rayo', color: '#eab308', family: 'polígono irregular', desc: 'Tiene puntas y lados rectos de diferentes longitudes.', compare: 'No todos sus lados son iguales.' },
    anillo: { name: 'Anillo', color: '#f97316', family: 'figura con hueco', desc: 'Tiene borde exterior y borde interior. No es una región simple.', compare: 'Se parece a un círculo con otro círculo dentro.' },
    escalon: { name: 'Escalón', color: '#22c55e', family: 'polígono ortogonal', desc: 'Está hecho con líneas horizontales y verticales.', compare: 'Tiene muchos ángulos rectos.' },
    nube: { name: 'Nube', color: '#38bdf8', family: 'curva decorativa', desc: 'Está hecha con varias curvas unidas.', compare: 'No tiene lados rectos claros.' },
  };

  const regularPoints = (count: number, cx = 80, cy = 80, r = 55, startDeg = -90) =>
    Array.from({ length: count }).map((_, i) => {
      const a = (startDeg + (360 / count) * i) * Math.PI / 180;
      const x = Math.round(cx + r * Math.cos(a));
      const y = Math.round(cy + r * Math.sin(a));
      return x + ',' + y;
    }).join(' ');

  const ExtraShapeSvg = ({ k, size = 150, showPoints = false }: { k: ExtraShape; size?: number; showPoints?: boolean }) => {
    const data = extraShapes[k];
    const stroke = 'rgba(15,23,42,.9)';

    const polyMap: Partial<Record<ExtraShape, string>> = {
      heptagono: regularPoints(7),
      eneagono: regularPoints(9),
      decagono: regularPoints(10),
      dodecagono: regularPoints(12),
      rayo: '92,12 45,88 78,88 60,148 118,70 86,70',
      escalon: '30,35 90,35 90,65 120,65 120,95 145,95 145,125 30,125',
    };

    const vertices = polyMap[k]
      ? polyMap[k]!.split(' ').map(p => {
          const [x, y] = p.split(',').map(Number);
          return { x, y };
        })
      : [];

    return (
      <svg width={size} height={size} viewBox="0 0 160 160" className="mx-auto max-w-full drop-shadow-sm">
        {polyMap[k] && <polygon points={polyMap[k]} fill={data.color} stroke={stroke} strokeWidth="5" strokeLinejoin="round" />}

        {k === 'luna' && (
          <>
            <circle cx="80" cy="80" r="55" fill={data.color} stroke={stroke} strokeWidth="5" />
            <circle cx="105" cy="70" r="55" fill="var(--background-color)" stroke="var(--background-color)" strokeWidth="2" />
          </>
        )}

        {k === 'gota' && (
          <path d="M80 18 C112 55 132 82 122 112 C113 139 92 150 80 150 C68 150 47 139 38 112 C28 82 48 55 80 18 Z" fill={data.color} stroke={stroke} strokeWidth="5" />
        )}

        {k === 'anillo' && (
          <>
            <circle cx="80" cy="80" r="56" fill={data.color} stroke={stroke} strokeWidth="5" />
            <circle cx="80" cy="80" r="27" fill="var(--background-color)" stroke={stroke} strokeWidth="4" />
          </>
        )}

        {k === 'nube' && (
          <path d="M45 112 C26 112 18 98 24 84 C28 72 38 67 50 69 C55 48 75 38 94 48 C104 37 126 43 132 62 C149 64 155 78 151 94 C147 108 134 116 118 112 Z" fill={data.color} stroke={stroke} strokeWidth="5" strokeLinejoin="round" />
        )}

        {showPoints && vertices.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r="6" fill="white" stroke={stroke} strokeWidth="3" />
            <text x={p.x} y={p.y + 4} textAnchor="middle" fontSize="9" fontWeight="900" fill={stroke}>{i + 1}</text>
          </g>
        ))}
      </svg>
    );
  };

  const renderExtras = () => (
    <div className="space-y-4">
      <div className="p-5 rounded-3xl border-2 border-indigo-500/30 bg-indigo-500/10 shadow">
        <div className="font-black text-2xl mb-2">Más figuras y figuras especiales</div>
        <div className="text-sm font-bold opacity-85 leading-relaxed">
          Algunas figuras aparecen menos en los primeros grados, pero ayudan a pensar mejor: polígonos con muchos lados, figuras con huecos, curvas compuestas y figuras irregulares.
        </div>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-3">
        {(Object.keys(extraShapes) as ExtraShape[]).map(k => (
          <Card key={k} title={extraShapes[k].name} color={extraShapes[k].color} note={extraShapes[k].desc}>
            <ExtraShapeSvg k={k} size={150} showPoints />
            <div className="mt-2 text-xs font-black opacity-75">{extraShapes[k].family}</div>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        <Step n={1} icon="👀" title="Observa el borde" text="Pregunta si el borde es recto, curvo o mixto." color="#0ea5e9" />
        <Step n={2} icon="📍" title="Cuenta puntas" text="En polígonos raros, cuenta vértices para entender la figura." color="#f97316" />
        <Step n={3} icon="🧠" title="Clasifica" text="Una figura puede ser decorativa y también tener propiedades geométricas." color="#22c55e" />
      </div>
    </div>
  );

  const renderTeselaciones = () => {
    const hexes = [
      [60, 45], [125, 45], [190, 45], [255, 45],
      [92, 100], [157, 100], [222, 100], [287, 100],
      [60, 155], [125, 155], [190, 155], [255, 155],
    ];

    const tris = [
      [50, 40, false], [110, 40, true], [170, 40, false], [230, 40, true], [290, 40, false],
      [50, 105, true], [110, 105, false], [170, 105, true], [230, 105, false], [290, 105, true],
      [50, 170, false], [110, 170, true], [170, 170, false], [230, 170, true], [290, 170, false],
    ];

    return (
      <div className="space-y-4">
        <div className="p-5 rounded-3xl border-2 border-teal-500/30 bg-teal-500/10 shadow">
          <div className="font-black text-2xl mb-2">Teselaciones y mosaicos</div>
          <div className="text-sm font-bold opacity-85 leading-relaxed">
            Teselar significa cubrir una superficie con figuras sin dejar huecos y sin encimarlas. Los cuadrados, triángulos y hexágonos son muy buenos para hacer mosaicos.
          </div>
        </div>

        <div className="grid xl:grid-cols-3 gap-3">
          <Card title="Mosaico de cuadrados" color="#3b82f6" note="Los cuadrados cubren el plano porque sus ángulos encajan perfecto.">
            <div className="max-w-full overflow-x-auto pb-2">
              <svg width="320" height="230" viewBox="0 0 320 230" className="mx-auto rounded-3xl border-2 border-border-color bg-surface-color">
                {Array.from({ length: 6 }).map((_, y) => (
                  Array.from({ length: 8 }).map((_, x) => (
                    <rect key={x + '-' + y} x={20 + x * 35} y={15 + y * 35} width="35" height="35" fill={(x + y) % 2 ? '#3b82f6' : '#93c5fd'} stroke="#1e293b" strokeWidth="2" />
                  ))
                ))}
              </svg>
            </div>
          </Card>

          <Card title="Mosaico de triángulos" color="#f59e0b" note="Dos triángulos pueden formar rombos, cuadrados o patrones.">
            <div className="max-w-full overflow-x-auto pb-2">
              <svg width="340" height="230" viewBox="0 0 340 230" className="mx-auto rounded-3xl border-2 border-border-color bg-surface-color">
                {tris.map(([x, y, flip], i) => (
                  <polygon
                    key={i}
                    points={flip ? (x + ',10 ' + (x + 55) + ',105 ' + (x - 55) + ',105') : (x + ',105 ' + (x + 55) + ',10 ' + (x - 55) + ',10')}
                    transform={'translate(0 ' + (y - 40) + ')'}
                    fill={i % 2 ? '#f59e0b' : '#fcd34d'}
                    stroke="#1e293b"
                    strokeWidth="2"
                  />
                ))}
              </svg>
            </div>
          </Card>

          <Card title="Mosaico de hexágonos" color="#14b8a6" note="El panal de abejas usa hexágonos porque encajan muy bien.">
            <div className="max-w-full overflow-x-auto pb-2">
              <svg width="360" height="230" viewBox="0 0 360 230" className="mx-auto rounded-3xl border-2 border-border-color bg-surface-color">
                {hexes.map(([x, y], i) => (
                  <polygon
                    key={i}
                    points="0,-32 28,-16 28,16 0,32 -28,16 -28,-16"
                    transform={'translate(' + x + ' ' + y + ')'}
                    fill={i % 2 ? '#14b8a6' : '#99f6e4'}
                    stroke="#1e293b"
                    strokeWidth="2"
                  />
                ))}
              </svg>
            </div>
          </Card>
        </div>

        <div className="grid md:grid-cols-3 gap-3">
          <Step n={1} icon="🧩" title="Elige una pieza" text="Puede ser cuadrado, triángulo o hexágono." color="#0ea5e9" />
          <Step n={2} icon="🔁" title="Repite" text="Copia la pieza una y otra vez." color="#f97316" />
          <Step n={3} icon="✅" title="Sin huecos" text="Una teselación no deja espacios vacíos." color="#22c55e" />
        </div>
      </div>
    );
  };

  const renderCoordenadas = () => {
    const px = clamp(tx + 1, 1, 6);
    const py = clamp(ty + 1, 1, 6);
    const cell = 36;
    const size = cell * 7;

    return (
      <div className="space-y-4">
        <div className="p-5 rounded-3xl border-2 border-sky-500/30 bg-sky-500/10 shadow">
          <div className="font-black text-2xl mb-2">Coordenadas en cuadrícula</div>
          <div className="text-sm font-bold opacity-85 leading-relaxed">
            Una coordenada dice dónde está un punto. Primero lees la posición horizontal X y luego la vertical Y.
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <button onClick={() => setTx(Math.max(0, tx - 1))} className="px-4 py-2 rounded-2xl bg-surface-color border-2 border-border-color font-black">X −</button>
          <button onClick={() => setTx(Math.min(5, tx + 1))} className="px-4 py-2 rounded-2xl bg-surface-color border-2 border-border-color font-black">X +</button>
          <button onClick={() => setTy(Math.max(0, ty - 1))} className="px-4 py-2 rounded-2xl bg-surface-color border-2 border-border-color font-black">Y −</button>
          <button onClick={() => setTy(Math.min(5, ty + 1))} className="px-4 py-2 rounded-2xl bg-surface-color border-2 border-border-color font-black">Y +</button>
        </div>

        <div className="grid lg:grid-cols-[minmax(0,1fr)_minmax(260px,380px)] gap-4">
          <Card title={'Punto P = (' + px + ', ' + py + ')'} color="#0ea5e9">
            <div className="max-w-full overflow-x-auto pb-2">
              <svg width={size} height={size} viewBox={'0 0 ' + size + ' ' + size} className="mx-auto rounded-3xl border-2 border-border-color bg-surface-color">
                {Array.from({ length: 7 }).map((_, i) => (
                  <g key={i}>
                    <line x1={cell} y1={i * cell} x2={size - cell} y2={i * cell} stroke="rgba(148,163,184,.45)" />
                    <line x1={i * cell} y1={cell} x2={i * cell} y2={size - cell} stroke="rgba(148,163,184,.45)" />
                    {i > 0 && <text x={i * cell} y={size - 12} textAnchor="middle" fontSize="12" fontWeight="900" fill="currentColor">{i}</text>}
                    {i > 0 && <text x={14} y={(size - i * cell) + 4} fontSize="12" fontWeight="900" fill="currentColor">{i}</text>}
                  </g>
                ))}

                <line x1={cell} y1={size - cell} x2={size - cell} y2={size - cell} stroke="#1e293b" strokeWidth="4" />
                <line x1={cell} y1={size - cell} x2={cell} y2={cell} stroke="#1e293b" strokeWidth="4" />

                <line x1={cell} y1={size - py * cell} x2={px * cell} y2={size - py * cell} stroke="#f97316" strokeWidth="4" strokeDasharray="6 5" />
                <line x1={px * cell} y1={size - cell} x2={px * cell} y2={size - py * cell} stroke="#8b5cf6" strokeWidth="4" strokeDasharray="6 5" />
                <circle cx={px * cell} cy={size - py * cell} r="11" fill="#0ea5e9" stroke="#1e293b" strokeWidth="4" />
                <text x={px * cell + 16} y={size - py * cell - 12} fontSize="16" fontWeight="900" fill="#0ea5e9">P</text>
              </svg>
            </div>
          </Card>

          <div className="grid gap-3">
            <Step n={1} icon="➡️" title="Lee X" text={'Primero avanzas ' + px + ' en horizontal.'} color="#f97316" />
            <Step n={2} icon="⬆️" title="Lee Y" text={'Después subes ' + py + ' en vertical.'} color="#8b5cf6" />
            <Step n={3} icon="📍" title="Marca el punto" text={'El punto queda en (' + px + ', ' + py + ').'} color="#0ea5e9" />
          </div>
        </div>
      </div>
    );
  };

  const renderTransformaciones = () => (
    <div className="space-y-4">
      <div className="p-5 rounded-3xl border-2 border-purple-500/30 bg-purple-500/10 shadow">
        <div className="font-black text-2xl mb-2">Transformaciones geométricas</div>
        <div className="text-sm font-bold opacity-85 leading-relaxed">
          Una figura puede moverse, reflejarse, girarse o cambiar de tamaño. Algunas transformaciones conservan la forma y el tamaño; otras no.
        </div>
      </div>

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-3">
        <Card title="Traslación" color="#22c55e" note="Mover sin girar.">
          <svg width="210" height="150" viewBox="0 0 210 150" className="mx-auto">
            <polygon points="35,35 95,35 65,90" fill="#f97316" stroke="#1e293b" strokeWidth="4" opacity=".45" />
            <path d="M100 64 L135 64" stroke="#1e293b" strokeWidth="5" markerEnd="url(#arrowT)" />
            <polygon points="120,55 180,55 150,110" fill="#22c55e" stroke="#1e293b" strokeWidth="4" />
            <defs>
              <marker id="arrowT" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto">
                <path d="M0,0 L0,6 L9,3 z" fill="#1e293b" />
              </marker>
            </defs>
          </svg>
        </Card>

        <Card title="Reflexión" color="#ec4899" note="Efecto espejo.">
          <svg width="210" height="150" viewBox="0 0 210 150" className="mx-auto">
            <line x1="105" y1="15" x2="105" y2="135" stroke="#ef4444" strokeWidth="4" strokeDasharray="8 6" />
            <polygon points="45,35 90,75 45,115" fill="#3b82f6" stroke="#1e293b" strokeWidth="4" />
            <polygon points="165,35 120,75 165,115" fill="#22c55e" stroke="#1e293b" strokeWidth="4" />
          </svg>
        </Card>

        <Card title="Rotación" color="#8b5cf6" note="Girar alrededor de un punto.">
          <svg width="210" height="150" viewBox="0 0 210 150" className="mx-auto">
            <circle cx="105" cy="75" r="7" fill="#1e293b" />
            <polygon points="105,30 145,95 65,95" fill="#8b5cf6" stroke="#1e293b" strokeWidth="4" opacity=".45" />
            <polygon points="150,75 85,115 85,35" fill="#a78bfa" stroke="#1e293b" strokeWidth="4" />
            <path d="M75 40 C45 70 50 110 90 125" fill="none" stroke="#1e293b" strokeWidth="4" strokeDasharray="6 5" />
          </svg>
        </Card>

        <Card title="Escala" color="#f59e0b" note="Cambiar tamaño.">
          <svg width="210" height="150" viewBox="0 0 210 150" className="mx-auto">
            <rect x="35" y="55" width="40" height="40" fill="#f59e0b" stroke="#1e293b" strokeWidth="4" />
            <path d="M90 75 L120 75" stroke="#1e293b" strokeWidth="5" />
            <rect x="130" y="35" width="70" height="70" fill="#fbbf24" stroke="#1e293b" strokeWidth="4" />
          </svg>
        </Card>
      </div>

      <div className="grid md:grid-cols-4 gap-3">
        <Step n={1} icon="➡️" title="Trasladar" text="La figura se mueve completa." color="#22c55e" />
        <Step n={2} icon="🪞" title="Reflejar" text="Aparece como en un espejo." color="#ec4899" />
        <Step n={3} icon="🔄" title="Rotar" text="La figura gira." color="#8b5cf6" />
        <Step n={4} icon="🔍" title="Escalar" text="La figura cambia de tamaño." color="#f59e0b" />
      </div>
    </div>
  );

  const renderArte = () => (
    <div className="space-y-4">
      <div className="p-5 rounded-3xl border-2 border-amber-500/30 bg-amber-500/10 shadow">
        <div className="font-black text-2xl mb-2">Laboratorio de diseño geométrico</div>
        <div className="text-sm font-bold opacity-85 leading-relaxed">
          Las figuras pueden combinarse para crear diseños, personajes, señales, mosaicos y objetos. Aquí usamos repetición, color, tamaño y posición.
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        <Card title="Robot" color="#64748b">
          <svg width="220" height="210" viewBox="0 0 220 210" className="mx-auto">
            <rect x="70" y="55" width="80" height="70" rx="10" fill="#94a3b8" stroke="#1e293b" strokeWidth="4" />
            <rect x="55" y="125" width="110" height="60" rx="12" fill="#64748b" stroke="#1e293b" strokeWidth="4" />
            <circle cx="92" cy="85" r="9" fill="#22c55e" />
            <circle cx="128" cy="85" r="9" fill="#22c55e" />
            <rect x="92" y="105" width="36" height="8" fill="#1e293b" />
            <line x1="110" y1="55" x2="110" y2="25" stroke="#1e293b" strokeWidth="5" />
            <circle cx="110" cy="20" r="8" fill="#ef4444" />
          </svg>
        </Card>

        <Card title="Cohete" color="#0ea5e9">
          <svg width="220" height="210" viewBox="0 0 220 210" className="mx-auto">
            <polygon points="110,20 150,95 70,95" fill="#ef4444" stroke="#1e293b" strokeWidth="4" />
            <rect x="78" y="95" width="64" height="75" fill="#0ea5e9" stroke="#1e293b" strokeWidth="4" />
            <circle cx="110" cy="125" r="17" fill="#bfdbfe" stroke="#1e293b" strokeWidth="4" />
            <polygon points="78,150 45,190 78,175" fill="#f59e0b" stroke="#1e293b" strokeWidth="4" />
            <polygon points="142,150 175,190 142,175" fill="#f59e0b" stroke="#1e293b" strokeWidth="4" />
          </svg>
        </Card>

        <Card title="Flor" color="#ec4899">
          <svg width="220" height="210" viewBox="0 0 220 210" className="mx-auto">
            <circle cx="110" cy="70" r="32" fill="#f9a8d4" stroke="#1e293b" strokeWidth="3" />
            <circle cx="70" cy="110" r="32" fill="#f9a8d4" stroke="#1e293b" strokeWidth="3" />
            <circle cx="150" cy="110" r="32" fill="#f9a8d4" stroke="#1e293b" strokeWidth="3" />
            <circle cx="110" cy="150" r="32" fill="#f9a8d4" stroke="#1e293b" strokeWidth="3" />
            <circle cx="110" cy="110" r="27" fill="#facc15" stroke="#1e293b" strokeWidth="4" />
          </svg>
        </Card>
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        <Step n={1} icon="🔷" title="Elige figuras" text="Rectángulos, círculos, triángulos, óvalos o figuras raras." color="#0ea5e9" />
        <Step n={2} icon="🎨" title="Cambia color y tamaño" text="El color ayuda a separar partes importantes." color="#ec4899" />
        <Step n={3} icon="🧩" title="Compón" text="Une figuras pequeñas para formar una figura grande." color="#22c55e" />
      </div>
    </div>
  );

  return (
    <TopicCard icon="📐" title="Geometría plana 1°–3°" color="#22c55e" desc="Reconoce, agrupa, compara, compone y transforma figuras planas usando lados, vértices, área, perímetro, líneas, simetría y cuadrícula.">
      <div className="lab-container space-y-4 overflow-hidden">
        <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(112px, 1fr))' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setMode(tab.id)}
              className={`p-3 rounded-2xl font-black text-xs transition-all hover:scale-105 ${
                mode === tab.id ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color'
              }`}
            >
              <span className="text-2xl block mb-1">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {mode === 'figuras' && renderFiguras()}
        {mode === 'familias' && renderFamilias()}
        {mode === 'comparar' && renderComparar()}
        {mode === 'poligonos' && renderPoligonos()}
        {mode === 'area-perimetro' && renderAreaPerimetro()}
        {mode === 'abiertas' && renderAbiertas()}
        {mode === 'lineas' && renderLineas()}
        {mode === 'angulos' && renderAngulos()}
        {mode === 'composicion' && renderComposicion()}
        {mode === 'cuadricula' && renderCuadricula()}
        {mode === 'simetria' && renderSimetria()}
        {mode === 'traslacion' && renderTraslacion()}
        {mode === 'raras' && renderRaras()}
        {mode === 'extras' && renderExtras()}
        {mode === 'teselaciones' && renderTeselaciones()}
        {mode === 'coordenadas' && renderCoordenadas()}
        {mode === 'transformaciones' && renderTransformaciones()}
        {mode === 'arte' && renderArte()}
      </div>
    </TopicCard>
  );
};





export const PerimetroSimple: React.FC = () => {
  const [w, setW] = useState(5);
  const [h, setH] = useState(3);
  return (
    <TopicCard icon="📏" title="Perímetro de Rectángulo" color="#06b6d4" desc="El perímetro es la suma de TODOS los lados:">
      <div className="lab-container">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <NumberInput label="Lado largo" value={w} setValue={setW} min={1} max={15} color="#06b6d4" />
          <NumberInput label="Lado corto" value={h} setValue={setH} min={1} max={10} color="#0891b2" />
        </div>
        <div className="lab-formula text-center">P = 2({w} + {h}) = <span style={{ color: 'var(--primary-color)' }}>{2 * (w + h)} cm</span></div>
      </div>
    </TopicCard>
  );
};

export const RelojAnalogo: React.FC = () => {
  const [hour, setHour] = useState(3);
  const [minute, setMinute] = useState(15);
  const hourAngle = ((hour % 12) + minute / 60) * 30 - 90;
  const minuteAngle = minute * 6 - 90;
  const point = (angle: number, length: number) => ({
    x: 100 + Math.cos((angle * Math.PI) / 180) * length,
    y: 100 + Math.sin((angle * Math.PI) / 180) * length,
  });
  const hourEnd = point(hourAngle, 44);
  const minuteEnd = point(minuteAngle, 68);
  return (
    <TopicCard icon="🕒" title="Lectura del Reloj Analógico" color="#22c55e" desc="Aprende a leer la hora en un reloj clásico de manecillas:">
      <div className="lab-container space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <NumberInput label="Hora" value={hour} setValue={setHour} min={1} max={12} color="#22c55e" />
          <NumberInput label="Minutos" value={minute} setValue={setMinute} min={0} max={59} step={5} color="#16a34a" />
        </div>
        <div className="grid gap-4 md:grid-cols-[1fr_1fr] items-center">
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 200 200" className="w-64 h-64 drop-shadow-xl">
              <circle cx="100" cy="100" r="92" fill="white" stroke="#16a34a" strokeWidth="8" />
              <circle cx="100" cy="100" r="78" fill="rgba(34,197,94,.06)" />
              {Array.from({ length: 60 }).map((_, i) => {
                const a = i * 6 - 90;
                const outer = point(a, 86);
                const inner = point(a, i % 5 === 0 ? 76 : 82);
                return <line key={i} x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y} stroke={i % 5 === 0 ? '#0f172a' : '#94a3b8'} strokeWidth={i % 5 === 0 ? 3 : 1} />;
              })}
              {Array.from({ length: 12 }).map((_, i) => {
                const n = i === 0 ? 12 : i;
                const pos = point(i * 30 - 90, 63);
                return <text key={i} x={pos.x} y={pos.y + 5} textAnchor="middle" className="font-black fill-slate-800 text-sm">{n}</text>;
              })}
              <line x1="100" y1="100" x2={hourEnd.x} y2={hourEnd.y} stroke="#0f172a" strokeWidth="8" strokeLinecap="round" />
              <line x1="100" y1="100" x2={minuteEnd.x} y2={minuteEnd.y} stroke="#22c55e" strokeWidth="5" strokeLinecap="round" />
              <circle cx="100" cy="100" r="7" fill="#ef4444" />
              <text x="100" y="185" textAnchor="middle" className="font-black fill-emerald-700 text-xs">corta = hora · larga = minutos</text>
            </svg>
            <div className="mt-2 p-4 bg-slate-900 text-emerald-400 font-mono font-black text-2xl rounded-3xl border-2 border-slate-700 shadow-inner">
              {hour.toString().padStart(2,'0')}:{minute.toString().padStart(2,'0')}
            </div>
          </div>
          <div className="space-y-3 text-sm font-bold">
            <div className="p-4 rounded-2xl bg-emerald-500/10 border-2 border-emerald-500/30">
              <b>1.</b> La manecilla corta apunta a la hora: <span className="font-black text-emerald-600">{hour}</span>.
            </div>
            <div className="p-4 rounded-2xl bg-sky-500/10 border-2 border-sky-500/30">
              <b>2.</b> La manecilla larga marca minutos. Cada número grande vale 5 minutos: {minute} min.
            </div>
            <div className="p-4 rounded-2xl bg-amber-500/10 border-2 border-amber-500/30">
              <b>3.</b> Se lee: <span className="font-black">{hour}:{minute.toString().padStart(2, '0')}</span>.
            </div>
          </div>
        </div>
      </div>
    </TopicCard>
  );
};

export const MonedasCambio: React.FC = () => {
  const [cost, setCost] = useState(12);
  const [payment, setPayment] = useState(20);
  const change = Math.max(0, payment - cost);
  const denominations = [50, 20, 10, 5, 2, 1];
  let remaining = change;
  const changePieces = denominations.flatMap((d) => {
    const count = Math.floor(remaining / d);
    remaining -= count * d;
    return Array.from({ length: count }, () => d);
  });
  return (
    <TopicCard icon="🪙" title="Monedas, Billetes y Vueltos" color="#22c55e" desc="¡Vamos a la tienda! Compras un juguete y pagas con un billete. ¿Cuánto cambio debes recibir?">
      <div className="lab-container space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <NumberInput label="Precio del juguete ($)" value={cost} setValue={setCost} min={1} max={50} color="#22c55e" />
          <NumberInput label="Pagas con ($)" value={payment} setValue={(v) => setPayment(Math.max(v, cost))} min={cost} max={100} color="#16a34a" />
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="p-5 rounded-3xl bg-surface-color border-2 border-red-400 shadow text-center">
            <span className="text-5xl">🧸</span>
            <div className="text-xs font-bold opacity-60 mt-1">Costo</div>
            <div className="font-black text-red-500 text-2xl">${cost}</div>
          </div>
          <div className="p-5 rounded-3xl bg-surface-color border-2 border-blue-400 shadow text-center">
            <span className="text-5xl">💵</span>
            <div className="text-xs font-bold opacity-60 mt-1">Pagas</div>
            <div className="font-black text-blue-500 text-2xl">${payment}</div>
          </div>
          <div className="p-5 rounded-3xl bg-surface-color border-2 border-emerald-500 shadow text-center">
            <span className="text-5xl">🪙</span>
            <div className="text-xs font-bold opacity-60 mt-1">Vuelto</div>
            <div className="font-black text-emerald-500 text-2xl">${change}</div>
          </div>
        </div>
        <div className="p-4 rounded-3xl bg-emerald-500/10 border-2 border-emerald-500/30">
          <div className="text-center font-black mb-3">Representación del cambio</div>
          <div className="flex flex-wrap justify-center gap-2">
            {changePieces.length === 0 ? <span className="font-bold opacity-70">No hay cambio</span> : changePieces.map((d, i) => (
              <div key={i} className={`${d >= 20 ? 'w-20 h-10 rounded-lg bg-green-500' : 'w-12 h-12 rounded-full bg-amber-400'} flex items-center justify-center font-black text-slate-900 shadow border-2 border-white`}>
                ${d}
              </div>
            ))}
          </div>
        </div>
        <div className="text-center font-black text-base p-3 bg-emerald-500/10 rounded-2xl">Pagas ${payment} − costo ${cost} = cambio de <b>${change}</b></div>
      </div>
    </TopicCard>
  );
};



// >>> CUERPOS3D_V2_START
// ============================================================
// 🧊 CUERPOS GEOMÉTRICOS 3D (Primaria Baja) — v2
// Conocer · Contar · Cubitos (volumen) · Desarmar · Fórmulas · Adivina
// ============================================================
export const Cuerpos3D: React.FC = () => {
  type SolidKey = 'cubo' | 'prisma' | 'prisma-tri' | 'cilindro' | 'cono' | 'esfera' | 'piramide';
  type Mode = 'conocer' | 'contar' | 'cubitos' | 'desarrollo' | 'formulas' | 'adivina';

  const SOLIDS: Record<SolidKey, {
    name: string; short: string; emoji: string; color: string; objeto: string;
    caras: string; aristas: string; vertices: string; superficie: string; poliedro: boolean;
    cNum: number; aNum: number; vNum: number;
    formulaV: string; formulaA: string;
    volumen: (a: number, h: number) => number; area: (a: number, h: number) => number;
    inputs: 'a' | 'a-h'; radioLabel: string;
  }> = {
    cubo: { name: 'Cubo', short: 'Cubo', emoji: '🎲', color: '#22c55e', objeto: 'un dado',
      caras: '6 cuadrados', aristas: '12', vertices: '8', superficie: 'plana', poliedro: true,
      cNum: 6, aNum: 12, vNum: 8, formulaV: 'V = a × a × a = a³', formulaA: 'A = 6 × a²',
      volumen: (a) => a ** 3, area: (a) => 6 * a * a, inputs: 'a', radioLabel: 'Arista a' },
    prisma: { name: 'Prisma rectangular', short: 'Prisma', emoji: '📦', color: '#0ea5e9', objeto: 'una caja de cereal',
      caras: '6 rectángulos', aristas: '12', vertices: '8', superficie: 'plana', poliedro: true,
      cNum: 6, aNum: 12, vNum: 8, formulaV: 'V = base × base × altura = a² × h', formulaA: 'A = 2·a² + 4·a·h',
      volumen: (a, h) => a * a * h, area: (a, h) => 2 * a * a + 4 * a * h, inputs: 'a-h', radioLabel: 'Lado a' },
    'prisma-tri': { name: 'Prisma triangular', short: 'P. triang.', emoji: '⛺', color: '#14b8a6', objeto: 'una tienda de campaña',
      caras: '5 (2 triángulos + 3 rectángulos)', aristas: '9', vertices: '6', superficie: 'plana', poliedro: true,
      cNum: 5, aNum: 9, vNum: 6, formulaV: 'V = (área del triángulo) × largo', formulaA: 'A = 2·triángulo + 3·rectángulo',
      volumen: (a, h) => (Math.sqrt(3) / 4 * a * a) * h, area: (a, h) => 2 * (Math.sqrt(3) / 4 * a * a) + 3 * a * h, inputs: 'a-h', radioLabel: 'Lado a' },
    cilindro: { name: 'Cilindro', short: 'Cilindro', emoji: '🥫', color: '#f59e0b', objeto: 'una lata',
      caras: '2 círculos planos', aristas: '2 bordes curvos', vertices: '0', superficie: 'mixta (1 curva)', poliedro: false,
      cNum: 2, aNum: 2, vNum: 0, formulaV: 'V = π × r² × h', formulaA: 'A = 2·π·r² + 2·π·r·h',
      volumen: (a, h) => Math.PI * a * a * h, area: (a, h) => 2 * Math.PI * a * a + 2 * Math.PI * a * h, inputs: 'a-h', radioLabel: 'Radio r' },
    cono: { name: 'Cono', short: 'Cono', emoji: '🍦', color: '#ec4899', objeto: 'un cucurucho de helado',
      caras: '1 círculo plano', aristas: '1 borde curvo', vertices: '1', superficie: 'mixta (1 curva)', poliedro: false,
      cNum: 1, aNum: 1, vNum: 1, formulaV: 'V = (1/3) × π × r² × h', formulaA: 'A = π·r² + π·r·g',
      volumen: (a, h) => (1 / 3) * Math.PI * a * a * h, area: (a, h) => Math.PI * a * a + Math.PI * a * Math.sqrt(a * a + h * h), inputs: 'a-h', radioLabel: 'Radio r' },
    esfera: { name: 'Esfera', short: 'Esfera', emoji: '⚽', color: '#a855f7', objeto: 'una pelota',
      caras: '0 (toda curva)', aristas: '0', vertices: '0', superficie: 'curva', poliedro: false,
      cNum: 0, aNum: 0, vNum: 0, formulaV: 'V = (4/3) × π × r³', formulaA: 'A = 4 × π × r²',
      volumen: (a) => (4 / 3) * Math.PI * a ** 3, area: (a) => 4 * Math.PI * a * a, inputs: 'a', radioLabel: 'Radio r' },
    piramide: { name: 'Pirámide (base cuadrada)', short: 'Pirámide', emoji: '🏔️', color: '#ef4444', objeto: 'una pirámide de Egipto',
      caras: '5 (1 base + 4 triángulos)', aristas: '8', vertices: '5', superficie: 'plana', poliedro: true,
      cNum: 5, aNum: 8, vNum: 5, formulaV: 'V = (1/3) × base² × altura', formulaA: 'A = base² + 4 triángulos',
      volumen: (a, h) => (1 / 3) * a * a * h, area: (a, h) => a * a + 2 * a * Math.sqrt((a / 2) ** 2 + h * h), inputs: 'a-h', radioLabel: 'Lado a' },
  };
  const KEYS = Object.keys(SOLIDS) as SolidKey[];

  const [solid, setSolid] = useState<SolidKey>('cubo');
  const [mode, setMode] = useState<Mode>('conocer');
  const [a, setA] = useState(3);
  const [h, setH] = useState(4);
  const [revealed, setRevealed] = useState(false);
  const [spin, setSpin] = useState(false);
  // cubitos
  const [cw, setCw] = useState(3);
  const [cd, setCd] = useState(3);
  const [ch, setCh] = useState(2);
  // comparar
  const [solidB, setSolidB] = useState<SolidKey>('cilindro');
  // adivina
  const [quizAns, setQuizAns] = useState<SolidKey>('cubo');
  const [quizScore, setQuizScore] = useState(0);
  const [quizMsg, setQuizMsg] = useState<{ text: string; ok: boolean } | null>(null);

  const s = SOLIDS[solid];
  const round = (n: number) => Math.round(n * 100) / 100;

  // ---- dibujos SVG (con sombreado de 3 tonos para dar volumen) ----
  const draw = (key: SolidKey, color: string, size = 'w-40 h-36') => {
    const base = { stroke: color, strokeWidth: 3, fill: color } as const;
    const wrap = (children: React.ReactNode) => (
      <svg viewBox="0 0 160 140" className={size}>
        <g style={spin ? { transformOrigin: '80px 70px', animation: 'spin 6s linear infinite' } as React.CSSProperties : undefined}>{children}</g>
      </svg>
    );
    switch (key) {
      case 'cubo':
      case 'prisma': {
        const w = key === 'prisma' ? 90 : 70;
        return wrap(<>
          <polygon points={`30,40 ${30 + w},40 ${30 + w},110 30,110`} {...base} fillOpacity={0.18} />
          <polygon points={`30,40 60,15 ${60 + w},15 ${30 + w},40`} {...base} fillOpacity={0.4} />
          <polygon points={`${30 + w},40 ${60 + w},15 ${60 + w},85 ${30 + w},110`} {...base} fillOpacity={0.28} />
        </>);
      }
      case 'prisma-tri':
        return wrap(<>
          <polygon points="35,105 95,105 65,45" {...base} fillOpacity={0.3} />
          <polygon points="95,105 125,85 95,30 65,45" {...base} fillOpacity={0.22} />
          <polygon points="65,45 95,30" stroke={color} strokeWidth={3} fill="none" />
          <polygon points="35,105 65,90 125,90 95,105" {...base} fillOpacity={0.16} />
        </>);
      case 'cilindro':
        return wrap(<>
          <rect x="45" y="30" width="70" height="80" {...base} fillOpacity={0.2} />
          <ellipse cx="80" cy="110" rx="35" ry="12" {...base} fillOpacity={0.28} />
          <ellipse cx="80" cy="30" rx="35" ry="12" {...base} fillOpacity={0.4} />
        </>);
      case 'cono':
        return wrap(<>
          <polygon points="80,20 45,110 115,110" {...base} fillOpacity={0.28} />
          <ellipse cx="80" cy="110" rx="35" ry="12" {...base} fillOpacity={0.4} />
        </>);
      case 'esfera':
        return wrap(<>
          <circle cx="80" cy="70" r="48" {...base} fillOpacity={0.24} />
          <ellipse cx="80" cy="70" rx="48" ry="16" stroke={color} strokeWidth={2} fill="none" strokeDasharray="4 4" />
          <circle cx="64" cy="54" r="12" fill="white" fillOpacity={0.35} stroke="none" />
        </>);
      case 'piramide':
        return wrap(<>
          <polygon points="80,18 30,105 130,105" {...base} fillOpacity={0.3} />
          <polygon points="80,18 130,105 95,118 80,60" {...base} fillOpacity={0.18} />
          <line x1="80" y1="18" x2="95" y2="118" stroke={color} strokeWidth={2} strokeDasharray="3 3" />
        </>);
    }
  };

  const SolidPicker = ({ value, onPick }: { value: SolidKey; onPick: (k: SolidKey) => void }) => (
    <div className="grid grid-cols-4 gap-2 mb-4">
      {KEYS.map(k => (
        <button key={k} onClick={() => onPick(k)}
          className="p-2 rounded-2xl font-black text-[10px] border-2 transition-all flex flex-col items-center gap-1"
          style={{ background: value === k ? SOLIDS[k].color : 'transparent', color: value === k ? 'white' : undefined, borderColor: value === k ? SOLIDS[k].color : 'var(--border-color)' }}>
          <span className="text-xl">{SOLIDS[k].emoji}</span>{SOLIDS[k].short}
        </button>
      ))}
    </div>
  );

  // ---- volumen con cubitos: capas de cuadritos ----
  const renderCubitos = () => {
    const porCapa = cw * cd;
    const total = porCapa * ch;
    const cell = 16;
    return (
      <div className="space-y-3">
        <div className="p-2 rounded-xl bg-sky-500/15 text-sky-700 dark:text-sky-300 text-[11px] font-bold text-center">
          📦 El volumen es <b>cuántos cubitos caben</b>. ¡Apila capas iguales!
        </div>
        <NumberInput label="Largo (cubitos)" value={cw} setValue={(v) => setCw(v)} min={1} max={5} color="#0ea5e9" />
        <NumberInput label="Ancho (cubitos)" value={cd} setValue={(v) => setCd(v)} min={1} max={5} color="#0ea5e9" />
        <NumberInput label="Alto (capas)" value={ch} setValue={(v) => setCh(v)} min={1} max={5} color="#0ea5e9" />
        <div className="flex justify-center">
          <svg viewBox={`0 0 ${cw * cell + ch * 8 + 30} ${cd * cell + ch * 14 + 20}`} className="max-h-52 w-auto">
            {Array.from({ length: ch }).map((_, k) => {
              const offX = (ch - 1 - k) * 8 + 10;
              const offY = k * 14 + 8;
              return (
                <g key={k}>
                  {Array.from({ length: cd }).map((_, r) =>
                    Array.from({ length: cw }).map((_, c) => (
                      <rect key={`${k}-${r}-${c}`} x={offX + c * cell} y={offY + r * cell} width={cell - 1} height={cell - 1}
                        rx="2" fill="#0ea5e9" fillOpacity={0.25 + k * 0.12} stroke="#0ea5e9" strokeWidth="1.2" />
                    ))
                  )}
                </g>
              );
            })}
          </svg>
        </div>
        <div className="p-4 rounded-2xl bg-surface-color border-2 border-border-color shadow text-center">
          <div className="font-bold text-sm opacity-80">Una capa: {cw} × {cd} = <b>{porCapa}</b> cubitos</div>
          <div className="font-bold text-sm opacity-80">Hay {ch} capas iguales</div>
          <div className="text-2xl font-black mt-1" style={{ color: '#0ea5e9' }}>Volumen = {cw} × {cd} × {ch} = {total} cubitos</div>
        </div>
      </div>
    );
  };

  // ---- comparar dos cuerpos ----
  const renderComparar = () => {
    const sB = SOLIDS[solidB];
    const vA = round(s.volumen(a, h)), vB = round(sB.volumen(a, h));
    const max = Math.max(vA, vB, 1);
    return (
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-2 text-center text-xs font-black">
          <div>A: <span style={{ color: s.color }}>{s.name}</span></div>
          <div>B: <span style={{ color: sB.color }}>{sB.name}</span></div>
        </div>
        <div className="text-[11px] font-black opacity-60 text-center">Elige el cuerpo B:</div>
        <SolidPicker value={solidB} onPick={setSolidB} />
        <NumberInput label={s.radioLabel + ' / ' + sB.radioLabel} value={a} setValue={setA} min={1} max={12} color="#64748b" />
        <NumberInput label="Altura h (si aplica)" value={h} setValue={setH} min={1} max={12} color="#64748b" />
        {[[s, vA, 'A'], [sB, vB, 'B']].map(([sol, v, lbl]: any) => (
          <div key={lbl}>
            <div className="flex justify-between text-xs font-black mb-1"><span>{sol.emoji} {sol.name}</span><span style={{ color: sol.color }}>{v}</span></div>
            <div className="h-5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
              <div className="h-full rounded-full" style={{ width: `${(v / max) * 100}%`, background: sol.color }} />
            </div>
          </div>
        ))}
        <div className="p-3 rounded-2xl bg-surface-color border-2 border-border-color text-center font-black text-sm">
          {vA === vB ? '¡Tienen el mismo volumen!' : `${vA > vB ? s.name : sB.name} tiene más volumen 🏆`}
        </div>
      </div>
    );
  };

  // ---- adivina (juego) ----
  const nuevaPregunta = () => { setQuizAns(KEYS[Math.floor(Math.random() * KEYS.length)]); setQuizMsg(null); };
  const responder = (k: SolidKey) => {
    if (quizMsg) return;
    if (k === quizAns) { setQuizScore(p => p + 1); setQuizMsg({ text: `✅ ¡Sí! Es ${SOLIDS[quizAns].name}.`, ok: true }); }
    else { setQuizMsg({ text: `❌ Era ${SOLIDS[quizAns].name} (${SOLIDS[quizAns].emoji}).`, ok: false }); }
  };
  const qa = SOLIDS[quizAns];
  const renderAdivina = () => (
    <div className="space-y-3 text-center">
      <div className="flex justify-between items-center px-1">
        <span className="text-xs font-black opacity-70">Puntos: <b style={{ color: '#22c55e' }}>{quizScore}</b></span>
        <button onClick={nuevaPregunta} className="math-btn !py-1.5 !px-3 text-xs">🎲 Nueva pista</button>
      </div>
      <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow space-y-1">
        <div className="text-xs font-black uppercase opacity-60">¿Qué cuerpo soy?</div>
        <p className="font-bold">Tengo <b>{qa.caras}</b>,</p>
        <p className="font-bold"><b>{qa.vertices}</b> vértices y mi superficie es <b>{qa.superficie}</b>.</p>
        <p className="font-bold opacity-70 text-sm">Me parezco a {qa.objeto}.</p>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {KEYS.map(k => (
          <button key={k} onClick={() => responder(k)} disabled={!!quizMsg}
            className="p-2 rounded-2xl text-2xl border-2 border-border-color bg-surface-color hover:scale-105 transition-all disabled:opacity-40">
            {SOLIDS[k].emoji}
          </button>
        ))}
      </div>
      {quizMsg && <div className={`p-3 rounded-2xl font-black text-white ${quizMsg.ok ? 'bg-emerald-500' : 'bg-red-500'}`}>{quizMsg.text}</div>}
    </div>
  );

  const tabs: { id: Mode; label: string; icon: string }[] = [
    { id: 'conocer', label: 'Conocer', icon: '👀' },
    { id: 'contar', label: 'Contar', icon: '🔢' },
    { id: 'cubitos', label: 'Cubitos', icon: '📦' },
    { id: 'desarrollo', label: 'Desarmar', icon: '✂️' },
    { id: 'formulas', label: 'Fórmulas', icon: '🧮' },
    { id: 'adivina', label: 'Adivina', icon: '🎯' },
  ];
  const showPicker = mode === 'conocer' || mode === 'contar' || mode === 'desarrollo' || mode === 'formulas';
  const showFigure = mode === 'conocer' || mode === 'contar' || mode === 'desarrollo';

  return (
    <TopicCard icon="🧊" title="Cuerpos geométricos 3D" color="#22c55e"
      desc="Conoce los cuerpos en 3D, cuéntalos, mide su volumen con cubitos, ábrelos en su desarrollo, usa sus fórmulas y juega a adivinar.">
      <div className="flex gap-2 flex-wrap mb-4">
        {tabs.map(t => (
          <button key={t.id} onClick={() => { setMode(t.id); setRevealed(false); if (t.id === 'adivina') nuevaPregunta(); }}
            className={`px-3 py-2 rounded-xl font-black text-xs transition-all ${mode === t.id ? 'bg-[var(--primary-color)] text-white shadow' : 'bg-slate-200 dark:bg-slate-700'}`}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {showPicker && <SolidPicker value={solid} onPick={(k) => { setSolid(k); setRevealed(false); }} />}

      {showFigure && (
        <div className="flex flex-col items-center mb-4">
          {draw(solid, s.color)}
          <button onClick={() => setSpin(v => !v)} className="text-[11px] font-black opacity-70 mt-1 hover:opacity-100">
            {spin ? '⏸️ Detener giro' : '🔄 Girar'}
          </button>
        </div>
      )}

      {mode === 'conocer' && (
        <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow space-y-2 text-center">
          <div className="text-2xl font-black" style={{ color: s.color }}>{s.emoji} {s.name}</div>
          <p className="font-bold opacity-80">Se parece a <b>{s.objeto}</b>.</p>
          <p className="text-sm font-bold">Superficie: <b className="capitalize">{s.superficie}</b></p>
        </div>
      )}

      {mode === 'contar' && (
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2 text-center">
            {[['Caras', s.caras, '🟦'], ['Aristas', s.aristas, '📏'], ['Vértices', s.vertices, '📍']].map(([t, v, ic]) => (
              <div key={t} className="p-3 rounded-2xl bg-surface-color border-2 border-border-color shadow">
                <div className="text-2xl">{ic}</div>
                <div className="text-xs font-black uppercase opacity-60">{t}</div>
                <div className="font-black text-base" style={{ color: s.color }}>{revealed ? v : '❓'}</div>
              </div>
            ))}
          </div>
          <button onClick={() => setRevealed(r => !r)} className="math-btn w-full">{revealed ? 'Ocultar' : '👀 Revelar respuestas'}</button>
          {revealed && s.poliedro && (
            <div className="p-3 rounded-2xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 text-xs font-bold text-center">
              🔎 Caras + Vértices − Aristas = {s.cNum} + {s.vNum} − {s.aNum} = {s.cNum + s.vNum - s.aNum}. ¡En los cuerpos de caras planas siempre da 2! (fórmula de Euler)
            </div>
          )}
        </div>
      )}

      {mode === 'cubitos' && renderCubitos()}

      {mode === 'desarrollo' && (
        <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center space-y-3">
          <p className="font-bold opacity-80 text-sm">Si <b>abres</b> el cuerpo y lo aplastas, obtienes su <b>desarrollo plano</b>:</p>
          <div className="flex justify-center">
            {solid === 'cubo' && (
              <svg viewBox="0 0 200 150" className="w-48 h-36">
                {[[80, 10], [80, 45], [80, 80], [80, 115], [45, 45], [115, 45]].map(([x, y], i) => (
                  <rect key={i} x={x} y={y} width="35" height="35" stroke={s.color} strokeWidth="2" fill={s.color} fillOpacity="0.2" />
                ))}
              </svg>
            )}
            {(solid === 'prisma' || solid === 'prisma-tri') && (
              <svg viewBox="0 0 220 150" className="w-52 h-36">
                {[[70, 35, 45, 60], [115, 35, 45, 60], [160, 35, 25, 60], [25, 35, 45, 60], [70, 10, 45, 25], [70, 95, 45, 25]].map(([x, y, w, hh], i) => (
                  <rect key={i} x={x} y={y} width={w} height={hh} stroke={s.color} strokeWidth="2" fill={s.color} fillOpacity="0.2" />
                ))}
              </svg>
            )}
            {solid === 'cilindro' && (
              <svg viewBox="0 0 220 150" className="w-52 h-36">
                <circle cx="40" cy="40" r="22" stroke={s.color} strokeWidth="2" fill={s.color} fillOpacity="0.2" />
                <rect x="75" y="18" width="110" height="44" stroke={s.color} strokeWidth="2" fill={s.color} fillOpacity="0.2" />
                <circle cx="40" cy="110" r="22" stroke={s.color} strokeWidth="2" fill={s.color} fillOpacity="0.2" />
              </svg>
            )}
            {solid === 'cono' && (
              <svg viewBox="0 0 200 150" className="w-48 h-36">
                <path d="M100 75 L60 30 A55 55 0 0 1 140 30 Z" stroke={s.color} strokeWidth="2" fill={s.color} fillOpacity="0.2" />
                <circle cx="100" cy="115" r="20" stroke={s.color} strokeWidth="2" fill={s.color} fillOpacity="0.2" />
              </svg>
            )}
            {solid === 'piramide' && (
              <svg viewBox="0 0 200 160" className="w-48 h-40">
                <rect x="80" y="60" width="40" height="40" stroke={s.color} strokeWidth="2" fill={s.color} fillOpacity="0.2" />
                {[[80, 60, 100, 20, 120, 60], [80, 60, 40, 80, 80, 100], [120, 60, 160, 80, 120, 100], [80, 100, 100, 140, 120, 100]].map((p, i) => (
                  <polygon key={i} points={`${p[0]},${p[1]} ${p[2]},${p[3]} ${p[4]},${p[5]}`} stroke={s.color} strokeWidth="2" fill={s.color} fillOpacity="0.14" />
                ))}
              </svg>
            )}
            {solid === 'esfera' && (
              <p className="text-sm font-bold opacity-70">🌐 La esfera es especial: ¡no se puede aplanar sin arrugarla! Por eso los mapas de la Tierra siempre se deforman un poco.</p>
            )}
          </div>
        </div>
      )}

      {mode === 'formulas' && (
        <div className="space-y-3">
          <div className="p-2 rounded-xl bg-amber-500/15 text-amber-700 dark:text-amber-300 text-[11px] font-bold text-center">
            ✨ Estas fórmulas son un adelanto para cuando seas más grande. ¡Pruébalas con la calculadora!
          </div>
          <div className="p-4 rounded-2xl bg-surface-color border-2 border-border-color shadow text-center space-y-1">
            <div className="font-mono font-black text-base" style={{ color: s.color }}>{s.formulaV}</div>
            <div className="font-mono font-black text-sm opacity-80">{s.formulaA}</div>
          </div>
          <NumberInput label={s.radioLabel} value={a} setValue={setA} min={1} max={12} color={s.color} />
          {s.inputs === 'a-h' && <NumberInput label="Altura h" value={h} setValue={setH} min={1} max={12} color={s.color} />}
          <div className="grid grid-cols-2 gap-2 text-center">
            <div className="p-3 rounded-2xl bg-surface-color border-2 border-border-color shadow">
              <div className="text-xs font-black uppercase opacity-60">Volumen</div>
              <div className="font-black text-lg" style={{ color: s.color }}>{round(s.volumen(a, h))}</div>
              <div className="text-[10px] opacity-60 font-bold">unidades³</div>
            </div>
            <div className="p-3 rounded-2xl bg-surface-color border-2 border-border-color shadow">
              <div className="text-xs font-black uppercase opacity-60">Área total</div>
              <div className="font-black text-lg" style={{ color: s.color }}>{round(s.area(a, h))}</div>
              <div className="text-[10px] opacity-60 font-bold">unidades²</div>
            </div>
          </div>
          <div className="pt-2 border-t-2 border-border-color">
            <div className="text-[11px] font-black opacity-60 text-center mb-2">⚖️ ¿Quieres comparar dos cuerpos?</div>
            {renderComparar()}
          </div>
        </div>
      )}

      {mode === 'adivina' && renderAdivina()}
    </TopicCard>
  );
};
// <<< CUERPOS3D_V2_END

// ============================================================
// 📊 ESTADÍSTICA (Primaria Baja) — encuesta, tabla de conteo,
// barras con escala, pictograma y preguntas de interpretación.
// ============================================================
export const EstadisticaPrimaria: React.FC = () => {
  type Mode = 'tabla' | 'barras' | 'pictograma' | 'preguntas';
  const CATS = [
    { id: 'manzana', name: 'Manzana', emoji: '🍎', color: '#ef4444' },
    { id: 'platano', name: 'Plátano', emoji: '🍌', color: '#f59e0b' },
    { id: 'uva',     name: 'Uva',     emoji: '🍇', color: '#a855f7' },
    { id: 'fresa',   name: 'Fresa',   emoji: '🍓', color: '#ec4899' },
  ];
  const [mode, setMode] = useState<Mode>('tabla');
  const [counts, setCounts] = useState<Record<string, number>>({ manzana: 7, platano: 4, uva: 9, fresa: 3 });
  const [escala, setEscala] = useState<number>(1);
  const [porFigura, setPorFigura] = useState<number>(2);
  const [catA, setCatA] = useState('uva');
  const [catB, setCatB] = useState('fresa');

  const set = (id: string, v: number) => setCounts(c => ({ ...c, [id]: Math.max(0, Math.min(20, v)) }));
  const total = CATS.reduce((s, c) => s + counts[c.id], 0);
  const maxCount = Math.max(...CATS.map(c => counts[c.id]), 1);
  const moda = CATS.reduce((a, b) => (counts[a.id] >= counts[b.id] ? a : b));
  const menor = CATS.reduce((a, b) => (counts[a.id] <= counts[b.id] ? a : b));

  // Marcas de conteo: cada grupo de 5 = cuatro palitos tachados
  const tally = (n: number) => {
    const grupos = Math.floor(n / 5), resto = n % 5;
    return (
      <span className="font-mono text-lg tracking-widest">
        {Array.from({ length: grupos }).map((_, i) => (
          <span key={i} className="line-through mr-2">||||</span>
        ))}
        {resto > 0 && <span>{'|'.repeat(resto)}</span>}
        {n === 0 && <span className="opacity-40">—</span>}
      </span>
    );
  };

  const tabs: { id: Mode; label: string; icon: string }[] = [
    { id: 'tabla', label: 'Tabla de conteo', icon: '✏️' },
    { id: 'barras', label: 'Gráfico de barras', icon: '📊' },
    { id: 'pictograma', label: 'Pictograma', icon: '🖼️' },
    { id: 'preguntas', label: 'Preguntas', icon: '❓' },
  ];

  return (
    <TopicCard icon="📊" title="Estadística: encuestas y gráficos" color="#0ea5e9"
      desc="Haz una encuesta a tu clase, anota los datos con marcas de conteo y muéstralos en un gráfico de barras o en un pictograma. Después responde preguntas sobre lo que ves.">
      <div className="flex gap-2 flex-wrap mb-4">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setMode(t.id)} aria-pressed={mode === t.id}
            className={`px-4 py-2 rounded-xl font-black text-xs transition-all ${mode === t.id ? 'bg-[var(--primary-color)] text-white shadow' : 'bg-slate-200 dark:bg-slate-700'}`}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      <div className="p-3 rounded-2xl bg-sky-500/10 text-sky-700 dark:text-sky-300 text-[11px] font-bold text-center mb-4">
        🍎 Pregunta de la encuesta: <b>¿Cuál es tu fruta favorita?</b> — Cambia los votos y mira cómo cambia todo.
      </div>

      {/* Controles de votos (siempre visibles) */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        {CATS.map(c => (
          <div key={c.id} className="p-2 rounded-2xl bg-surface-color border-2 border-border-color flex items-center gap-2">
            <span className="text-2xl" aria-hidden="true">{c.emoji}</span>
            <span className="font-black text-xs flex-1">{c.name}</span>
            <button onClick={() => set(c.id, counts[c.id] - 1)} aria-label={`Quitar un voto a ${c.name}`}
              className="w-7 h-7 rounded-lg font-black bg-slate-200 dark:bg-slate-700 hover:scale-110">−</button>
            <span className="w-6 text-center font-black" style={{ color: c.color }}>{counts[c.id]}</span>
            <button onClick={() => set(c.id, counts[c.id] + 1)} aria-label={`Añadir un voto a ${c.name}`}
              className="w-7 h-7 rounded-lg font-black bg-slate-200 dark:bg-slate-700 hover:scale-110">+</button>
          </div>
        ))}
      </div>

      {mode === 'tabla' && (
        <div className="p-4 rounded-3xl bg-surface-color border-2 border-border-color shadow">
          <div className="text-xs font-black uppercase opacity-60 mb-3 text-center">Tabla de conteo (marcas de 5 en 5)</div>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-border-color">
                <th className="text-left py-2 font-black">Fruta</th>
                <th className="text-left py-2 font-black">Marcas</th>
                <th className="text-right py-2 font-black">Total</th>
              </tr>
            </thead>
            <tbody>
              {CATS.map(c => (
                <tr key={c.id} className="border-b border-border-color">
                  <td className="py-2 font-bold">{c.emoji} {c.name}</td>
                  <td className="py-2">{tally(counts[c.id])}</td>
                  <td className="py-2 text-right font-black" style={{ color: c.color }}>{counts[c.id]}</td>
                </tr>
              ))}
              <tr>
                <td className="py-2 font-black">TOTAL</td>
                <td></td>
                <td className="py-2 text-right font-black text-lg">{total}</td>
              </tr>
            </tbody>
          </table>
          <p className="text-[11px] font-bold opacity-70 mt-3 text-center">
            💡 Cada grupo de <b>||||</b> tachado vale 5. Así se cuenta rápido sin perderse.
          </p>
        </div>
      )}

      {mode === 'barras' && (
        <div className="space-y-3">
          <div className="flex gap-2 justify-center">
            <span className="text-xs font-black opacity-70 self-center">Escala del eje:</span>
            {[1, 2, 5].map(e => (
              <button key={e} onClick={() => setEscala(e)} aria-pressed={escala === e}
                className={`px-3 py-1 rounded-xl font-black text-xs ${escala === e ? 'bg-[var(--primary-color)] text-white' : 'bg-slate-200 dark:bg-slate-700'}`}>
                de {e} en {e}
              </button>
            ))}
          </div>
          <div className="p-4 rounded-3xl bg-surface-color border-2 border-border-color shadow">
            <div className="flex gap-2">
              {/* eje Y */}
              <div className="flex flex-col-reverse justify-between text-[10px] font-black opacity-60 h-48 pr-1">
                {Array.from({ length: Math.floor(maxCount / escala) + 1 }).map((_, i) => (
                  <span key={i}>{i * escala}</span>
                ))}
              </div>
              <div className="flex-1 flex items-end justify-around h-48 border-l-2 border-b-2 border-border-color pl-2">
                {CATS.map(c => (
                  <div key={c.id} className="flex flex-col items-center gap-1 flex-1">
                    <span className="text-[11px] font-black" style={{ color: c.color }}>{counts[c.id]}</span>
                    <motion.div
                      animate={{ height: `${(counts[c.id] / maxCount) * 160}px` }}
                      transition={{ type: 'spring', stiffness: 120 }}
                      className="w-8 md:w-12 rounded-t-lg"
                      style={{ background: c.color }}
                      role="img" aria-label={`${c.name}: ${counts[c.id]} votos`} />
                    <span className="text-xl" aria-hidden="true">{c.emoji}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="text-[11px] font-bold opacity-70 text-center">
            👀 Fíjate: la barra más alta es <b>{moda.name}</b>. Cambiar la escala no cambia los datos, solo cómo se ven.
          </p>
        </div>
      )}

      {mode === 'pictograma' && (
        <div className="space-y-3">
          <div className="flex gap-2 justify-center items-center">
            <span className="text-xs font-black opacity-70">Cada 🟠 vale:</span>
            {[1, 2].map(k => (
              <button key={k} onClick={() => setPorFigura(k)} aria-pressed={porFigura === k}
                className={`px-3 py-1 rounded-xl font-black text-xs ${porFigura === k ? 'bg-[var(--primary-color)] text-white' : 'bg-slate-200 dark:bg-slate-700'}`}>
                {k} voto{k > 1 ? 's' : ''}
              </button>
            ))}
          </div>
          <div className="p-4 rounded-3xl bg-surface-color border-2 border-border-color shadow space-y-2">
            <div className="text-[11px] font-black opacity-60 text-center mb-1">Leyenda: 🟠 = {porFigura} voto{porFigura > 1 ? 's' : ''}</div>
            {CATS.map(c => {
              const enteras = Math.floor(counts[c.id] / porFigura);
              const media = counts[c.id] % porFigura !== 0;
              return (
                <div key={c.id} className="flex items-center gap-2 border-b border-border-color pb-2">
                  <span className="text-xl w-8" aria-hidden="true">{c.emoji}</span>
                  <span className="font-black text-[11px] w-16">{c.name}</span>
                  <div className="flex gap-1 flex-wrap flex-1" role="img" aria-label={`${c.name}: ${counts[c.id]} votos`}>
                    {Array.from({ length: enteras }).map((_, i) => <span key={i} className="text-lg">🟠</span>)}
                    {media && <span className="text-lg opacity-50">🟠</span>}
                    {counts[c.id] === 0 && <span className="text-xs opacity-40 font-bold">sin votos</span>}
                  </div>
                  <span className="font-black text-xs" style={{ color: c.color }}>{counts[c.id]}</span>
                </div>
              );
            })}
          </div>
          {porFigura === 2 && (
            <p className="text-[11px] font-bold opacity-70 text-center">
              💡 Cuando cada 🟠 vale 2, un número impar necesita <b>media figura</b> (la más clarita).
            </p>
          )}
        </div>
      )}

      {mode === 'preguntas' && (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 rounded-2xl bg-surface-color border-2 border-border-color text-center">
              <div className="text-[10px] font-black uppercase opacity-60">La moda (más votada)</div>
              <div className="text-lg font-black" style={{ color: moda.color }}>{moda.emoji} {moda.name}</div>
            </div>
            <div className="p-3 rounded-2xl bg-surface-color border-2 border-border-color text-center">
              <div className="text-[10px] font-black uppercase opacity-60">La menos votada</div>
              <div className="text-lg font-black" style={{ color: menor.color }}>{menor.emoji} {menor.name}</div>
            </div>
          </div>

          <div className="p-4 rounded-3xl bg-surface-color border-2 border-border-color shadow space-y-3">
            <div className="text-xs font-black uppercase opacity-60 text-center">¿Cuántos más?</div>
            <div className="flex gap-2 items-center justify-center flex-wrap">
              <select value={catA} onChange={e => setCatA(e.target.value)} aria-label="Primera fruta a comparar"
                className="px-2 py-1 rounded-xl border-2 border-border-color bg-surface-color font-black text-xs">
                {CATS.map(c => <option key={c.id} value={c.id}>{c.emoji} {c.name}</option>)}
              </select>
              <span className="font-black text-xs">frente a</span>
              <select value={catB} onChange={e => setCatB(e.target.value)} aria-label="Segunda fruta a comparar"
                className="px-2 py-1 rounded-xl border-2 border-border-color bg-surface-color font-black text-xs">
                {CATS.map(c => <option key={c.id} value={c.id}>{c.emoji} {c.name}</option>)}
              </select>
            </div>
            <div className="text-center font-black">
              {counts[catA] === counts[catB]
                ? <span>¡Empate! Las dos tienen {counts[catA]}.</span>
                : <span>
                    {CATS.find(c => c.id === (counts[catA] > counts[catB] ? catA : catB))!.name} tiene{' '}
                    <span className="text-2xl" style={{ color: '#0ea5e9' }}>{Math.abs(counts[catA] - counts[catB])}</span>{' '}
                    más ({Math.max(counts[catA], counts[catB])} − {Math.min(counts[catA], counts[catB])})
                  </span>}
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 text-xs font-bold text-center">
            🗳️ Votaron <b>{total}</b> niños en total. La moda es el dato que <b>más se repite</b>.
          </div>
        </div>
      )}
    </TopicCard>
  );
};

// ============================================================
// 🎲 PROBABILIDAD (Primaria Baja) — clasificar sucesos, moneda,
// dado y ruleta. Se registra lo que pasa y se compara.
// ============================================================
export const ProbabilidadPrimaria: React.FC = () => {
  type Mode = 'clasificar' | 'moneda' | 'dado' | 'ruleta';
  const [mode, setMode] = useState<Mode>('clasificar');

  // --- clasificar sucesos ---
  const SUCESOS = [
    { txt: 'Mañana saldrá el sol.', ok: 'seguro' },
    { txt: 'Sacar un 7 con un dado de 6 caras.', ok: 'imposible' },
    { txt: 'Al lanzar una moneda, sale cara.', ok: 'probable' },
    { txt: 'Un gato ladrará como perro.', ok: 'imposible' },
    { txt: 'Sacar un número menor que 7 con un dado.', ok: 'seguro' },
    { txt: 'Que llueva justo hoy en tu ciudad.', ok: 'poco probable' },
    { txt: 'Sacar un 6 con un dado, al primer intento.', ok: 'poco probable' },
    { txt: 'Después del lunes viene el martes.', ok: 'seguro' },
  ];
  const OPCIONES = [
    { id: 'seguro', label: 'Seguro', emoji: '✅', color: '#22c55e' },
    { id: 'probable', label: 'Probable', emoji: '🙂', color: '#0ea5e9' },
    { id: 'poco probable', label: 'Poco probable', emoji: '😕', color: '#f59e0b' },
    { id: 'imposible', label: 'Imposible', emoji: '🚫', color: '#ef4444' },
  ];
  const [idx, setIdx] = useState(0);
  const [resp, setResp] = useState<string | null>(null);
  const [aciertos, setAciertos] = useState(0);
  const suceso = SUCESOS[idx];
  const responder = (id: string) => {
    if (resp) return;
    setResp(id);
    if (id === suceso.ok) setAciertos(a => a + 1);
  };
  const siguiente = () => { setIdx(i => (i + 1) % SUCESOS.length); setResp(null); };

  // --- moneda ---
  const [caras, setCaras] = useState(0);
  const [cruces, setCruces] = useState(0);
  const [ultima, setUltima] = useState<string | null>(null);
  const lanzarMoneda = (veces: number) => {
    let c = 0, x = 0, last = '';
    for (let i = 0; i < veces; i++) { if (Math.random() < 0.5) { c++; last = '🪙 Cara'; } else { x++; last = '⭕ Cruz'; } }
    setCaras(v => v + c); setCruces(v => v + x); setUltima(last);
  };
  const totalM = caras + cruces;

  // --- dado ---
  const [dado, setDado] = useState<number[]>([0, 0, 0, 0, 0, 0]);
  const [ultimoDado, setUltimoDado] = useState<number | null>(null);
  const CARAS_DADO = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
  const lanzarDado = (veces: number) => {
    const d = [...dado]; let last = 1;
    for (let i = 0; i < veces; i++) { last = Math.floor(Math.random() * 6) + 1; d[last - 1]++; }
    setDado(d); setUltimoDado(last);
  };
  const totalD = dado.reduce((a, b) => a + b, 0);
  const maxD = Math.max(...dado, 1);

  // --- ruleta ---
  const SECTORES = [
    { name: 'Rojo', color: '#ef4444', partes: 3 },
    { name: 'Azul', color: '#0ea5e9', partes: 2 },
    { name: 'Verde', color: '#22c55e', partes: 1 },
  ];
  const totalPartes = SECTORES.reduce((s, x) => s + x.partes, 0);
  const [giros, setGiros] = useState<Record<string, number>>({ Rojo: 0, Azul: 0, Verde: 0 });
  const [angulo, setAngulo] = useState(0);
  const [gan, setGan] = useState<string | null>(null);
  const girar = () => {
    const r = Math.random() * totalPartes;
    let acc = 0, elegido = SECTORES[0];
    for (const s of SECTORES) { acc += s.partes; if (r < acc) { elegido = s; break; } }
    setGiros(g => ({ ...g, [elegido.name]: g[elegido.name] + 1 }));
    setAngulo(a => a + 720 + Math.random() * 360);
    setGan(elegido.name);
  };
  const totalG = Object.values(giros).reduce((a, b) => a + b, 0);

  const tabs: { id: Mode; label: string; icon: string }[] = [
    { id: 'clasificar', label: '¿Qué tan probable?', icon: '🤔' },
    { id: 'moneda', label: 'Moneda', icon: '🪙' },
    { id: 'dado', label: 'Dado', icon: '🎲' },
    { id: 'ruleta', label: 'Ruleta', icon: '🎯' },
  ];

  return (
    <TopicCard icon="🎲" title="Probabilidad: ¿qué tan posible es?" color="#a855f7"
      desc="Aprende a decir si algo es seguro, probable, poco probable o imposible. Después lanza una moneda, un dado y una ruleta, anota lo que sale y compáralo con lo que esperabas.">
      <div className="flex gap-2 flex-wrap mb-4">
        {tabs.map(t => (
          <button key={t.id} onClick={() => setMode(t.id)} aria-pressed={mode === t.id}
            className={`px-4 py-2 rounded-xl font-black text-xs transition-all ${mode === t.id ? 'bg-[var(--primary-color)] text-white shadow' : 'bg-slate-200 dark:bg-slate-700'}`}>
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {mode === 'clasificar' && (
        <div className="space-y-3">
          <div className="flex justify-between text-xs font-black opacity-70 px-1">
            <span>Suceso {idx + 1} de {SUCESOS.length}</span>
            <span>Aciertos: <b style={{ color: '#22c55e' }}>{aciertos}</b></span>
          </div>
          <div className="p-6 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
            <p className="font-black text-base">“{suceso.txt}”</p>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {OPCIONES.map(o => {
              const elegida = resp === o.id;
              const esCorrecta = resp && o.id === suceso.ok;
              return (
                <button key={o.id} onClick={() => responder(o.id)} disabled={!!resp}
                  aria-label={o.label}
                  className={`p-3 rounded-2xl font-black text-xs border-2 transition-all ${esCorrecta ? 'bg-emerald-500 text-white border-emerald-500' : elegida ? 'bg-red-500 text-white border-red-500' : 'bg-surface-color border-border-color hover:scale-105'}`}>
                  <span className="text-xl block" aria-hidden="true">{o.emoji}</span>{o.label}
                </button>
              );
            })}
          </div>
          {resp && (
            <>
              <div className={`p-3 rounded-2xl font-black text-white text-center ${resp === suceso.ok ? 'bg-emerald-500' : 'bg-red-500'}`}>
                {resp === suceso.ok ? '✅ ¡Muy bien!' : `❌ Era: ${suceso.ok}.`}
              </div>
              <button onClick={siguiente} className="math-btn w-full">Siguiente suceso ▶</button>
            </>
          )}
          <div className="p-3 rounded-2xl bg-purple-500/10 text-purple-700 dark:text-purple-300 text-[11px] font-bold">
            📏 Recuerda: <b>seguro</b> = pasa siempre · <b>probable</b> = pasa muchas veces · <b>poco probable</b> = pasa pocas veces · <b>imposible</b> = no puede pasar nunca.
          </div>
        </div>
      )}

      {mode === 'moneda' && (
        <div className="space-y-3">
          <div className="p-3 rounded-2xl bg-sky-500/10 text-sky-700 dark:text-sky-300 text-[11px] font-bold text-center">
            Una moneda tiene <b>2 resultados posibles</b>: cara o cruz. Los dos son igual de probables.
          </div>
          <div className="text-center text-5xl h-16 flex items-center justify-center">{ultima ? ultima.split(' ')[0] : '🪙'}</div>
          <div className="flex gap-2 justify-center">
            <button onClick={() => lanzarMoneda(1)} className="math-btn">Lanzar 1 vez</button>
            <button onClick={() => lanzarMoneda(10)} className="math-btn">Lanzar 10 veces</button>
            <button onClick={() => { setCaras(0); setCruces(0); setUltima(null); }} aria-label="Reiniciar el conteo"
              className="px-3 py-2 rounded-xl font-black text-xs border-2 border-border-color">↺</button>
          </div>
          {totalM > 0 && (
            <div className="p-4 rounded-3xl bg-surface-color border-2 border-border-color shadow space-y-2">
              {[['🪙 Cara', caras, '#f59e0b'], ['⭕ Cruz', cruces, '#64748b']].map(([l, v, col]: any) => (
                <div key={l}>
                  <div className="flex justify-between text-xs font-black mb-1"><span>{l}</span><span>{v} ({totalM ? Math.round(v / totalM * 100) : 0}%)</span></div>
                  <div className="h-4 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${totalM ? (v / totalM) * 100 : 0}%`, background: col }} />
                  </div>
                </div>
              ))}
              <p className="text-[11px] font-bold opacity-70 text-center pt-1">
                Lanzamientos: <b>{totalM}</b>. Cuantas más veces lances, más se acercan a <b>50% y 50%</b>.
              </p>
            </div>
          )}
        </div>
      )}

      {mode === 'dado' && (
        <div className="space-y-3">
          <div className="p-3 rounded-2xl bg-sky-500/10 text-sky-700 dark:text-sky-300 text-[11px] font-bold text-center">
            Resultados posibles de un dado: <b>1, 2, 3, 4, 5 y 6</b>. Son <b>6</b> y todos igual de probables.
          </div>
          <div className="text-center text-6xl h-20 flex items-center justify-center" aria-live="polite">
            {ultimoDado ? CARAS_DADO[ultimoDado - 1] : '🎲'}
          </div>
          <div className="flex gap-2 justify-center">
            <button onClick={() => lanzarDado(1)} className="math-btn">Lanzar 1</button>
            <button onClick={() => lanzarDado(20)} className="math-btn">Lanzar 20</button>
            <button onClick={() => { setDado([0, 0, 0, 0, 0, 0]); setUltimoDado(null); }} aria-label="Reiniciar el conteo"
              className="px-3 py-2 rounded-xl font-black text-xs border-2 border-border-color">↺</button>
          </div>
          {totalD > 0 && (
            <div className="p-4 rounded-3xl bg-surface-color border-2 border-border-color shadow">
              <div className="flex items-end justify-around h-40 border-l-2 border-b-2 border-border-color">
                {dado.map((v, i) => (
                  <div key={i} className="flex flex-col items-center gap-1 flex-1">
                    <span className="text-[11px] font-black">{v}</span>
                    <div className="w-6 md:w-9 rounded-t-lg transition-all" style={{ height: `${(v / maxD) * 120}px`, background: '#a855f7' }}
                      role="img" aria-label={`Cara ${i + 1}: ${v} veces`} />
                    <span className="text-lg" aria-hidden="true">{CARAS_DADO[i]}</span>
                  </div>
                ))}
              </div>
              <p className="text-[11px] font-bold opacity-70 text-center mt-2">
                {totalD} lanzamientos. Si el dado es justo, con muchos tiros las barras se parecen (≈ {Math.round(totalD / 6)} cada una).
              </p>
            </div>
          )}
        </div>
      )}

      {mode === 'ruleta' && (
        <div className="space-y-3">
          <div className="p-3 rounded-2xl bg-amber-500/15 text-amber-700 dark:text-amber-300 text-[11px] font-bold text-center">
            ⚖️ Esta ruleta <b>NO es justa</b>: el rojo ocupa más espacio, así que sale más veces. Compruébalo.
          </div>
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute left-1/2 -translate-x-1/2 -top-2 text-2xl z-10" aria-hidden="true">🔻</div>
              <motion.svg viewBox="0 0 200 200" className="w-44 h-44" animate={{ rotate: angulo }} transition={{ duration: 1.2, ease: 'easeOut' }}>
                {(() => {
                  let start = 0;
                  return SECTORES.map(s => {
                    const ang = (s.partes / totalPartes) * 360;
                    const end = start + ang;
                    const r = 95, cx = 100, cy = 100;
                    const x1 = cx + r * Math.cos((start - 90) * Math.PI / 180);
                    const y1 = cy + r * Math.sin((start - 90) * Math.PI / 180);
                    const x2 = cx + r * Math.cos((end - 90) * Math.PI / 180);
                    const y2 = cy + r * Math.sin((end - 90) * Math.PI / 180);
                    const large = ang > 180 ? 1 : 0;
                    const d = `M${cx},${cy} L${x1},${y1} A${r},${r} 0 ${large} 1 ${x2},${y2} Z`;
                    start = end;
                    return <path key={s.name} d={d} fill={s.color} stroke="white" strokeWidth="2" />;
                  });
                })()}
              </motion.svg>
            </div>
          </div>
          <div className="flex gap-2 justify-center">
            <button onClick={girar} className="math-btn">🎯 Girar</button>
            <button onClick={() => { setGiros({ Rojo: 0, Azul: 0, Verde: 0 }); setGan(null); }} aria-label="Reiniciar el conteo"
              className="px-3 py-2 rounded-xl font-black text-xs border-2 border-border-color">↺</button>
          </div>
          {gan && <div className="text-center font-black" aria-live="polite">Salió: <span style={{ color: SECTORES.find(s => s.name === gan)!.color }}>{gan}</span></div>}
          {totalG > 0 && (
            <div className="p-4 rounded-3xl bg-surface-color border-2 border-border-color shadow space-y-2">
              {SECTORES.map(s => (
                <div key={s.name}>
                  <div className="flex justify-between text-xs font-black mb-1">
                    <span>{s.name} <span className="opacity-60">({s.partes} de {totalPartes} partes)</span></span>
                    <span>{giros[s.name]}</span>
                  </div>
                  <div className="h-4 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                    <div className="h-full rounded-full transition-all" style={{ width: `${(giros[s.name] / totalG) * 100}%`, background: s.color }} />
                  </div>
                </div>
              ))}
              <p className="text-[11px] font-bold opacity-70 text-center pt-1">
                {totalG} giros. Lo esperado sería Rojo la mitad, Azul un tercio y Verde un sexto.
              </p>
            </div>
          )}
        </div>
      )}
    </TopicCard>
  );
};
