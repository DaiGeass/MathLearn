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
// 🟡 PREESCOLAR
// ==========================================

export const Colores: React.FC = () => {
  const colors = [
    { name: 'Rojo', hex: '#dc2626', emoji: '🍎' },
    { name: 'Azul', hex: '#2563eb', emoji: '🫐' },
    { name: 'Amarillo', hex: '#eab308', emoji: '🌻' },
    { name: 'Verde', hex: '#16a34a', emoji: '🌳' },
    { name: 'Naranja', hex: '#ea580c', emoji: '🥕' },
    { name: 'Morado', hex: '#9333ea', emoji: '🍇' },
    { name: 'Rosa', hex: '#ec4899', emoji: '🌸' },
    { name: 'Negro', hex: '#000000', emoji: '⚫' }
  ];
  const [pick, setPick] = useState(0);
  return (
    <TopicCard icon="🎨" title="Aprende los Colores Básicos" color="#ec4899"
      desc="Toca cada color para conocerlo. Los colores nos ayudan a clasificar y nombrar todo lo que nos rodea.">
      <div className="lab-container">
        <div className="grid grid-cols-4 gap-3">
          {colors.map((c, i) => (
            <button key={i} onClick={() => setPick(i)}
              className={`p-4 rounded-2xl flex flex-col items-center gap-1 transition-all shadow-lg ${pick === i ? 'scale-110 ring-4 ring-white' : 'hover:scale-105'}`}
              style={{ background: c.hex, color: c.hex === '#eab308' ? '#000' : '#fff' }}>
              <span className="text-3xl">{c.emoji}</span>
              <span className="text-xs font-black">{c.name}</span>
            </button>
          ))}
        </div>
        <div className="text-center mt-4 font-black text-2xl" style={{ color: colors[pick].hex }}>
          ¡Has elegido el color {colors[pick].name}! {colors[pick].emoji}
        </div>
      </div>
    </TopicCard>
  );
};

export const SimetriaComposicion: React.FC = () => {
  type Mode = 'ejes' | 'cuerpo' | 'espejo' | 'mariposa' | 'papel' | 'pintura' | 'mosaico' | 'puzzle' | 'triangulos' | 'tangram' | 'bloques' | 'composicion';

  const [mode, setMode] = useState<Mode>('ejes');
  const [axisShape, setAxisShape] = useState<'cara' | 'casa' | 'flor' | 'cohete'>('cara');
  const [axisKind, setAxisKind] = useState<'vertical' | 'horizontal'>('vertical');
  const [bodyPair, setBodyPair] = useState<'manos' | 'pies' | 'ojos' | 'orejas'>('manos');
  const [mirrorMove, setMirrorMove] = useState<'izquierda' | 'derecha' | 'arriba' | 'abajo'>('izquierda');
  const [mirrorAnswer, setMirrorAnswer] = useState<string | null>(null);
  const [butterfly, setButterfly] = useState<number[]>([]);
  const [paperOpen, setPaperOpen] = useState(false);
  const [paintCells, setPaintCells] = useState<number[]>([]);
  const [mosaicCells, setMosaicCells] = useState<number[]>([]);
  const [puzzleMode, setPuzzleMode] = useState<2 | 4 | 6>(4);
  const [puzzlePick, setPuzzlePick] = useState<number[]>([]);
  const [squareKind, setSquareKind] = useState<'cuadrado' | 'rectangulo' | 'rombo'>('cuadrado');
  const [joinedTriangles, setJoinedTriangles] = useState(false);
  const [tangramTarget, setTangramTarget] = useState<'casa' | 'barco' | 'pez' | 'cohete'>('casa');
  const [blockPick, setBlockPick] = useState<number[]>([]);
  const [sceneParts, setSceneParts] = useState<string[]>([]);

  const modes: { id: Mode; label: string; icon: string }[] = [
    { id: 'ejes', label: 'Ejes', icon: '➗' },
    { id: 'cuerpo', label: 'Cuerpo', icon: '🧍' },
    { id: 'espejo', label: 'Espejo', icon: '🪞' },
    { id: 'mariposa', label: 'Mariposa', icon: '🦋' },
    { id: 'papel', label: 'Papel', icon: '✂️' },
    { id: 'pintura', label: 'Pintura espejo', icon: '🎨' },
    { id: 'mosaico', label: 'Mosaico', icon: '🟪' },
    { id: 'puzzle', label: 'Puzzle', icon: '🧩' },
    { id: 'triangulos', label: 'Triángulos', icon: '🔺' },
    { id: 'tangram', label: 'Tangram', icon: '🟨' },
    { id: 'bloques', label: 'Bloques', icon: '🧱' },
    { id: 'composicion', label: 'Crear', icon: '✨' },
  ];

  const reset = () => {
    setMirrorAnswer(null);
    setButterfly([]);
    setPaintCells([]);
    setMosaicCells([]);
    setPuzzlePick([]);
    setBlockPick([]);
    setJoinedTriangles(false);
  };

  const renderAxisShape = () => (
    <svg viewBox="0 0 240 220" className="mx-auto w-full max-w-md rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30">
      {axisShape === 'cara' && (
        <>
          <circle cx="120" cy="105" r="65" fill="#fde68a" stroke="white" strokeWidth="6" />
          <circle cx="95" cy="90" r="8" fill="#111827" />
          <circle cx="145" cy="90" r="8" fill="#111827" />
          <path d="M90 130 Q120 155 150 130" stroke="#111827" strokeWidth="7" fill="none" strokeLinecap="round" />
          <circle cx="72" cy="110" r="11" fill="#fca5a5" />
          <circle cx="168" cy="110" r="11" fill="#fca5a5" />
        </>
      )}
      {axisShape === 'casa' && (
        <>
          <rect x="70" y="95" width="100" height="80" rx="8" fill="#60a5fa" stroke="white" strokeWidth="6" />
          <polygon points="120,35 50,100 190,100" fill="#f59e0b" stroke="white" strokeWidth="6" />
          <rect x="105" y="135" width="30" height="40" fill="#92400e" />
          <circle cx="130" cy="155" r="3" fill="#fbbf24" />
        </>
      )}
      {axisShape === 'flor' && (
        <>
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <ellipse key={a} cx="120" cy="105" rx="24" ry="48" fill="#f9a8d4" stroke="white" strokeWidth="4" transform={`rotate(${a} 120 105)`} />
          ))}
          <circle cx="120" cy="105" r="24" fill="#facc15" stroke="white" strokeWidth="4" />
        </>
      )}
      {axisShape === 'cohete' && (
        <>
          <path d="M120 25 C155 60 155 130 120 165 C85 130 85 60 120 25 Z" fill="#e5e7eb" stroke="white" strokeWidth="6" />
          <circle cx="120" cy="78" r="18" fill="#38bdf8" stroke="white" strokeWidth="5" />
          <polygon points="90,135 60,175 100,160" fill="#ef4444" stroke="white" strokeWidth="5" />
          <polygon points="150,135 180,175 140,160" fill="#ef4444" stroke="white" strokeWidth="5" />
          <polygon points="105,165 135,165 120,205" fill="#f97316" stroke="white" strokeWidth="5" />
        </>
      )}

      {axisKind === 'vertical' ? (
        <line x1="120" y1="10" x2="120" y2="210" stroke="#111827" strokeWidth="5" strokeDasharray="10 8" opacity=".65" />
      ) : (
        <line x1="20" y1="110" x2="220" y2="110" stroke="#111827" strokeWidth="5" strokeDasharray="10 8" opacity=".65" />
      )}
    </svg>
  );

  const renderEjes = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {(['cara', 'casa', 'flor', 'cohete'] as const).map(s => (
          <button key={s} onClick={() => setAxisShape(s)} className={`p-3 rounded-2xl font-black text-xs ${axisShape === s ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color'}`}>
            {s}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2">
        {(['vertical', 'horizontal'] as const).map(a => (
          <button key={a} onClick={() => setAxisKind(a)} className={`p-3 rounded-2xl font-black ${axisKind === a ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color'}`}>
            Eje {a}
          </button>
        ))}
      </div>

      <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
        {renderAxisShape()}
        <div className="lab-formula text-center text-base mt-4">
          El eje de simetría es una línea que divide una figura en dos partes parecidas.
        </div>
      </div>
    </div>
  );

  const renderCuerpo = () => {
    const data = {
      manos: { icon: '👐', text: 'Tus manos forman una pareja: izquierda y derecha.' },
      pies: { icon: '🦶🦶', text: 'Tus pies se parecen: uno está a cada lado.' },
      ojos: { icon: '👀', text: 'Tus ojos están simétricos en la cara.' },
      orejas: { icon: '👂🙂👂', text: 'Las orejas están a los lados de la cabeza.' },
    };

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-4 gap-2">
          {(Object.keys(data) as typeof bodyPair[]).map(k => (
            <button key={k} onClick={() => setBodyPair(k)} className={`p-3 rounded-2xl font-black text-xs ${bodyPair === k ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color'}`}>
              {k}
            </button>
          ))}
        </div>

        <div className="p-6 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
          <div className="relative mx-auto max-w-md p-5 rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30">
            <div className="absolute left-1/2 top-3 bottom-3 w-1 rounded-full bg-[var(--primary-color)]/60" />
            <div className="text-7xl mb-4">{data[bodyPair].icon}</div>
            <div className="font-black text-lg">{data[bodyPair].text}</div>
          </div>
        </div>
      </div>
    );
  };

  const renderEspejo = () => {
    const opposite: Record<string, string> = { izquierda: 'derecha', derecha: 'izquierda', arriba: 'arriba', abajo: 'abajo' };
    const ok = mirrorAnswer === opposite[mirrorMove];

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-4 gap-2">
          {(['izquierda', 'derecha', 'arriba', 'abajo'] as const).map(m => (
            <button key={m} onClick={() => { setMirrorMove(m); setMirrorAnswer(null); }} className={`p-3 rounded-2xl font-black text-xs ${mirrorMove === m ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color'}`}>
              {m}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-[1fr_90px_1fr] gap-4 items-center text-center">
          <div className="p-6 rounded-3xl bg-blue-500/10 border-2 border-blue-500/30 shadow">
            <div className="font-black mb-2">Yo hago</div>
            <div className="text-7xl">{mirrorMove === 'izquierda' ? '👈' : mirrorMove === 'derecha' ? '👉' : mirrorMove === 'arriba' ? '☝️' : '👇'}</div>
            <div className="font-black mt-2">{mirrorMove}</div>
          </div>

          <div className="text-6xl">🪞</div>

          <div className="p-6 rounded-3xl bg-purple-500/10 border-2 border-purple-500/30 shadow">
            <div className="font-black mb-2">El espejo hace</div>
            <div className="grid grid-cols-2 gap-2">
              {['izquierda', 'derecha', 'arriba', 'abajo'].map(a => (
                <button key={a} onClick={() => setMirrorAnswer(a)} className={`p-3 rounded-2xl font-black ${mirrorAnswer === a ? ok ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white' : 'bg-surface-color border-2 border-border-color'}`}>
                  {a}
                </button>
              ))}
            </div>
          </div>
        </div>

        {mirrorAnswer && (
          <div className={`p-4 rounded-2xl text-center text-white font-black ${ok ? 'bg-emerald-500' : 'bg-red-500'}`}>
            {ok ? '✅ ¡Correcto! Imitaste como espejo.' : '❌ Casi. En el espejo, izquierda y derecha se invierten.'}
          </div>
        )}
      </div>
    );
  };

  const renderMariposa = () => {
    const leftPattern = [0, 2, 5, 6, 12, 17];
    const expectedRight = leftPattern.map(i => {
      const r = Math.floor(i / 4);
      const c = i % 4;
      return r * 4 + (7 - c);
    });

    const toggle = (i: number) => {
      if (butterfly.includes(i)) setButterfly(butterfly.filter(x => x !== i));
      else setButterfly([...butterfly, i]);
    };

    const ok = expectedRight.length === butterfly.length && expectedRight.every(i => butterfly.includes(i));

    return (
      <div className="space-y-4">
        <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
          <div className="font-black text-xl mb-1">Completa la mariposa</div>
          <p className="text-sm font-bold opacity-75 mb-4">Copia el lado izquierdo en el lado derecho.</p>

          <div className="relative mx-auto grid grid-cols-8 gap-1 max-w-sm p-4 rounded-3xl bg-sky-500/10 border-2 border-sky-500/30">
            <div className="absolute left-1/2 top-3 bottom-3 w-1 bg-slate-700/40 rounded-full" />
            {Array.from({ length: 32 }).map((_, i) => {
              const c = i % 8;
              const left = c < 4;
              const activeLeft = leftPattern.includes(i);
              const activeRight = butterfly.includes(i);
              return (
                <button key={i} disabled={left} onClick={() => toggle(i)} className={`h-10 rounded-xl border-2 ${activeLeft || activeRight ? 'bg-pink-500 border-pink-700' : left ? 'bg-white/40 border-white/40' : 'bg-surface-color border-border-color hover:scale-105'}`} />
              );
            })}
          </div>

          {butterfly.length > 0 && (
            <div className={`mt-4 p-4 rounded-2xl text-white font-black ${ok ? 'bg-emerald-500' : 'bg-amber-500'}`}>
              {ok ? '✅ ¡Mariposa simétrica!' : 'Sigue buscando el reflejo exacto.'}
            </div>
          )}
        </div>

        <button onClick={() => setButterfly([])} className="math-btn w-full">Borrar mitad derecha</button>
      </div>
    );
  };

  const renderPapel = () => (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-6 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
          <div className="font-black text-xl mb-2">Doblar, pintar y abrir</div>
          <div className="relative mx-auto w-72 h-72 rounded-3xl bg-white border-4 border-slate-300 overflow-hidden">
            <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-slate-400" />
            <div className="absolute left-10 top-16 w-20 h-20 rounded-full bg-purple-400" />
            <div className="absolute left-20 top-36 w-14 h-14 rounded-full bg-pink-400" />
            <div className="absolute left-14 bottom-12 w-24 h-12 bg-blue-400 rounded-full" />
            {paperOpen && (
              <>
                <div className="absolute right-10 top-16 w-20 h-20 rounded-full bg-purple-400" />
                <div className="absolute right-20 top-36 w-14 h-14 rounded-full bg-pink-400" />
                <div className="absolute right-14 bottom-12 w-24 h-12 bg-blue-400 rounded-full" />
              </>
            )}
          </div>

          <button onClick={() => setPaperOpen(!paperOpen)} className="math-btn mt-4 w-full">
            {paperOpen ? 'Doblar otra vez' : 'Abrir papel'}
          </button>
        </div>

        <div className="p-6 rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30 shadow">
          <div className="font-black text-xl mb-3">Actividad real</div>
          <div className="space-y-3 text-sm font-bold opacity-80">
            <div>1. Dobla una hoja por la mitad.</div>
            <div>2. Pinta solo un lado.</div>
            <div>3. Dobla y presiona.</div>
            <div>4. Abre la hoja y mira el efecto espejo.</div>
            <div>5. También puedes recortar para obtener una figura simétrica.</div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPintura = () => {
    const rows = 5;
    const cols = 8;
    const toggle = (idx: number) => {
      if (paintCells.includes(idx)) setPaintCells(paintCells.filter(x => x !== idx));
      else setPaintCells([...paintCells, idx]);
    };

    return (
      <div className="space-y-4">
        <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
          <div className="font-black text-xl mb-1">Pintura espejo</div>
          <p className="text-sm font-bold opacity-75 mb-4">Pinta a la izquierda y el lado derecho aparece como espejo.</p>

          <div className="relative mx-auto grid gap-1 max-w-md p-4 rounded-3xl bg-purple-500/10 border-2 border-purple-500/30" style={{ gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))` }}>
            <div className="absolute left-1/2 top-3 bottom-3 w-1 rounded-full bg-slate-800/40" />
            {Array.from({ length: rows * cols }).map((_, i) => {
              const r = Math.floor(i / cols);
              const c = i % cols;
              const leftSide = c < 4;
              const leftIndex = r * 4 + (leftSide ? c : 7 - c);
              const active = paintCells.includes(leftIndex);

              return (
                <button key={i} disabled={!leftSide} onClick={() => toggle(leftIndex)} className={`h-12 rounded-xl border-2 transition-all ${active ? 'bg-fuchsia-500 border-fuchsia-700 scale-105' : leftSide ? 'bg-surface-color border-border-color hover:scale-105' : 'bg-white/30 border-white/30'}`} />
              );
            })}
          </div>
        </div>

        <button onClick={() => setPaintCells([])} className="math-btn w-full">Borrar pintura</button>
      </div>
    );
  };

  const renderMosaico = () => {
    const toggle = (i: number) => {
      const r = Math.floor(i / 6);
      const c = i % 6;
      const mirror = r * 6 + (5 - c);
      const both = [i, mirror];
      const allActive = both.every(x => mosaicCells.includes(x));
      if (allActive) setMosaicCells(mosaicCells.filter(x => !both.includes(x)));
      else setMosaicCells([...new Set([...mosaicCells, ...both])]);
    };

    return (
      <div className="space-y-4">
        <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
          <div className="font-black text-xl mb-1">Mosaico simétrico</div>
          <p className="text-sm font-bold opacity-75 mb-4">Cada toque pinta también su casilla reflejada.</p>

          <div className="relative mx-auto grid grid-cols-6 gap-1 max-w-sm p-4 rounded-3xl bg-emerald-500/10 border-2 border-emerald-500/30">
            <div className="absolute left-1/2 top-3 bottom-3 w-1 rounded-full bg-slate-800/40" />
            {Array.from({ length: 36 }).map((_, i) => (
              <button key={i} onClick={() => toggle(i)} className={`h-12 rounded-xl border-2 transition-all ${mosaicCells.includes(i) ? 'bg-emerald-500 border-emerald-700 scale-105' : 'bg-surface-color border-border-color hover:scale-105'}`} />
            ))}
          </div>
        </div>

        <button onClick={() => setMosaicCells([])} className="math-btn w-full">Borrar mosaico</button>
      </div>
    );
  };

  const renderPuzzle = () => {
    const total = puzzleMode;
    const correct = Array.from({ length: total }, (_, i) => i + 1);
    const ok = puzzlePick.length === total && puzzlePick.every((n, i) => n === correct[i]);

    const add = (n: number) => {
      if (!puzzlePick.includes(n)) setPuzzlePick([...puzzlePick, n]);
    };

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          {[2, 4, 6].map(n => (
            <button key={n} onClick={() => { setPuzzleMode(n as 2 | 4 | 6); setPuzzlePick([]); }} className={`p-3 rounded-2xl font-black ${puzzleMode === n ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color'}`}>
              {n} piezas
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
            <div className="font-black mb-3">Piezas mezcladas</div>
            <div className="grid grid-cols-3 gap-3">
              {correct.slice().reverse().map(n => (
                <button key={n} disabled={puzzlePick.includes(n)} onClick={() => add(n)} className={`h-20 rounded-3xl border-4 font-black text-3xl ${puzzlePick.includes(n) ? 'opacity-40 bg-slate-200 dark:bg-slate-700' : 'bg-orange-400 border-orange-600 hover:scale-105'}`}>
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30 shadow text-center">
            <div className="font-black mb-3">Tu rompecabezas</div>
            <div className="grid grid-cols-3 gap-2 max-w-sm mx-auto">
              {Array.from({ length: total }).map((_, i) => (
                <div key={i} className="h-20 rounded-3xl bg-surface-color border-4 border-border-color flex items-center justify-center text-3xl font-black">
                  {puzzlePick[i] ?? ''}
                </div>
              ))}
            </div>
          </div>
        </div>

        {puzzlePick.length === total && (
          <div className={`p-4 rounded-2xl text-white text-center font-black ${ok ? 'bg-emerald-500' : 'bg-red-500'}`}>
            {ok ? '✅ ¡Armaste el rompecabezas!' : '❌ Casi. Ordena las piezas desde 1.'}
          </div>
        )}

        <button onClick={() => setPuzzlePick([])} className="math-btn w-full">Reiniciar puzzle</button>
      </div>
    );
  };

  const renderTriangulos = () => {
    const title = squareKind === 'cuadrado' ? 'cuadrado' : squareKind === 'rectangulo' ? 'rectángulo' : 'rombo';

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          {(['cuadrado', 'rectangulo', 'rombo'] as const).map(k => (
            <button key={k} onClick={() => { setSquareKind(k); setJoinedTriangles(false); }} className={`p-3 rounded-2xl font-black ${squareKind === k ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color'}`}>
              {k}
            </button>
          ))}
        </div>

        <div className="p-6 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
          <div className="font-black text-xl mb-2">Componer un {title} con 2 triángulos</div>

          <div className="relative mx-auto w-72 h-72 rounded-3xl bg-slate-100 dark:bg-slate-800 border-4 border-border-color overflow-hidden">
            {joinedTriangles ? (
              <>
                <div className={`absolute ${squareKind === 'rectangulo' ? 'left-8 right-8 top-20 bottom-20' : 'inset-10'} bg-blue-500`} style={{ clipPath: squareKind === 'rombo' ? 'polygon(50% 0, 100% 50%, 50% 50%, 0 50%)' : 'polygon(0 0, 100% 0, 0 100%)' }} />
                <div className={`absolute ${squareKind === 'rectangulo' ? 'left-8 right-8 top-20 bottom-20' : 'inset-10'} bg-amber-500`} style={{ clipPath: squareKind === 'rombo' ? 'polygon(50% 50%, 100% 50%, 50% 100%, 0 50%)' : 'polygon(100% 0, 100% 100%, 0 100%)' }} />
              </>
            ) : (
              <>
                <div className="absolute left-8 top-16 w-28 h-28 bg-blue-500" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />
                <div className="absolute right-8 bottom-16 w-28 h-28 bg-amber-500" style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }} />
              </>
            )}
          </div>

          <button onClick={() => setJoinedTriangles(!joinedTriangles)} className="math-btn mt-4 w-full">
            {joinedTriangles ? 'Separar triángulos' : 'Unir triángulos'}
          </button>
        </div>
      </div>
    );
  };

  const renderTangram = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-2">
        {(['casa', 'barco', 'pez', 'cohete'] as const).map(t => (
          <button key={t} onClick={() => setTangramTarget(t)} className={`p-3 rounded-2xl font-black ${tangramTarget === t ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color'}`}>
            {t}
          </button>
        ))}
      </div>

      <div className="p-6 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
        <div className="font-black text-xl mb-2">Tangram simple</div>
        <svg viewBox="0 0 300 230" className="mx-auto w-full max-w-lg rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30">
          {tangramTarget === 'casa' && (
            <>
              <rect x="100" y="105" width="100" height="80" rx="8" fill="#3b82f6" stroke="white" strokeWidth="5" />
              <polygon points="150,40 75,110 225,110" fill="#f59e0b" stroke="white" strokeWidth="5" />
              <rect x="138" y="140" width="24" height="45" fill="#92400e" />
            </>
          )}
          {tangramTarget === 'barco' && (
            <>
              <polygon points="60,150 240,150 205,195 95,195" fill="#0ea5e9" stroke="white" strokeWidth="5" />
              <polygon points="150,35 150,150 75,150" fill="#f97316" stroke="white" strokeWidth="5" />
              <polygon points="155,60 155,150 230,150" fill="#22c55e" stroke="white" strokeWidth="5" />
            </>
          )}
          {tangramTarget === 'pez' && (
            <>
              <polygon points="75,115 30,70 30,160" fill="#f59e0b" stroke="white" strokeWidth="5" />
              <polygon points="80,115 150,55 220,115 150,175" fill="#ec4899" stroke="white" strokeWidth="5" />
              <circle cx="190" cy="105" r="7" fill="#111827" />
            </>
          )}
          {tangramTarget === 'cohete' && (
            <>
              <polygon points="150,25 105,100 195,100" fill="#f97316" stroke="white" strokeWidth="5" />
              <rect x="115" y="100" width="70" height="75" rx="12" fill="#60a5fa" stroke="white" strokeWidth="5" />
              <polygon points="115,150 80,190 120,175" fill="#ef4444" stroke="white" strokeWidth="5" />
              <polygon points="185,150 220,190 180,175" fill="#ef4444" stroke="white" strokeWidth="5" />
            </>
          )}
        </svg>
      </div>
    </div>
  );

  const renderBloques = () => {
    const model = [1, 2, 5, 6, 9, 10, 14];
    const toggle = (i: number) => {
      if (blockPick.includes(i)) setBlockPick(blockPick.filter(x => x !== i));
      else setBlockPick([...blockPick, i]);
    };
    const ok = blockPick.length === model.length && model.every(i => blockPick.includes(i));

    return (
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
            <div className="font-black mb-3">Modelo</div>
            <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto">
              {Array.from({ length: 16 }).map((_, i) => (
                <div key={i} className={`h-14 rounded-xl border-2 ${model.includes(i) ? 'bg-blue-500 border-blue-700' : 'bg-black/5 border-border-color'}`} />
              ))}
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30 shadow text-center">
            <div className="font-black mb-3">Copia el modelo</div>
            <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto">
              {Array.from({ length: 16 }).map((_, i) => (
                <button key={i} onClick={() => toggle(i)} className={`h-14 rounded-xl border-2 transition-all ${blockPick.includes(i) ? 'bg-blue-500 border-blue-700 scale-105' : 'bg-surface-color border-border-color'}`} />
              ))}
            </div>
          </div>
        </div>

        {blockPick.length > 0 && (
          <div className={`p-4 rounded-2xl text-center text-white font-black ${ok ? 'bg-emerald-500' : 'bg-amber-500'}`}>
            {ok ? '✅ ¡Copiaste el modelo!' : 'Sigue comparando con el modelo.'}
          </div>
        )}

        <button onClick={() => setBlockPick([])} className="math-btn w-full">Borrar bloques</button>
      </div>
    );
  };

  const renderComposicion = () => {
    const palette = ['🔴', '🔵', '🟨', '🔺', '🟢', '⭐', '🧱', '🦋'];
    return (
      <div className="space-y-4">
        <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow">
          <div className="font-black text-xl mb-2">Composición libre</div>
          <p className="text-sm font-bold opacity-75 mb-4">Crea una figura usando piezas. Puedes hacer una cara, casa, robot o flor.</p>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-2 mb-4">
            {palette.map(p => (
              <button key={p} onClick={() => setSceneParts([...sceneParts, p])} className="p-3 rounded-2xl bg-surface-color border-2 border-border-color text-3xl hover:scale-105">
                {p}
              </button>
            ))}
          </div>

          <div className="min-h-80 rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30 p-4 flex gap-3 flex-wrap items-center justify-center text-5xl">
            {sceneParts.length === 0 ? <span className="text-sm font-bold opacity-70">Toca piezas para crear.</span> : sceneParts.map((p, i) => <span key={i}>{p}</span>)}
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4">
            <button onClick={() => setSceneParts(sceneParts.slice(0, -1))} className="p-3 rounded-2xl bg-slate-200 dark:bg-slate-700 font-black">Quitar última</button>
            <button onClick={() => setSceneParts([])} className="math-btn py-3">Borrar todo</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <TopicCard
      icon="🦋"
      title="Simetría y Composición de Figuras"
      color="#ec4899"
      desc="Explora ejes de simetría, cuerpo, espejo, mariposas, papel doblado, pintura espejo, mosaicos, rompecabezas, tangram, bloques y composición libre."
    >
      <div className="lab-container space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {modes.map(m => (
            <button key={m.id} onClick={() => { setMode(m.id); reset(); }} className={`p-3 rounded-2xl font-black text-xs transition-all ${mode === m.id ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color hover:scale-105'}`}>
              <span className="text-2xl block mb-1">{m.icon}</span>
              {m.label}
            </button>
          ))}
        </div>

        {mode === 'ejes' && renderEjes()}
        {mode === 'cuerpo' && renderCuerpo()}
        {mode === 'espejo' && renderEspejo()}
        {mode === 'mariposa' && renderMariposa()}
        {mode === 'papel' && renderPapel()}
        {mode === 'pintura' && renderPintura()}
        {mode === 'mosaico' && renderMosaico()}
        {mode === 'puzzle' && renderPuzzle()}
        {mode === 'triangulos' && renderTriangulos()}
        {mode === 'tangram' && renderTangram()}
        {mode === 'bloques' && renderBloques()}
        {mode === 'composicion' && renderComposicion()}
      </div>
    </TopicCard>
  );
};



export const ConceptosLogicoMatematicos: React.FC = () => {
  type Mode =
    | 'cantidades'
    | 'logica'
    | 'emparejar'
    | 'diferencias'
    | 'tamanos'
    | 'memoria'
    | 'subitizacion'
    | 'bingo'
    | 'patrones'
    | 'construccion'
    | 'tablero'
    | 'mitades'
    | 'vida';

  const [mode, setMode] = useState<Mode>('cantidades');

  const [manyA, setManyA] = useState(7);
  const [manyB, setManyB] = useState(3);

  const [logicScene, setLogicScene] = useState<'todos' | 'algunos' | 'ninguno'>('todos');
  const [logicAnswer, setLogicAnswer] = useState<string | null>(null);

  const [selectedCards, setSelectedCards] = useState<string[]>([]);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);

  const [diffFound, setDiffFound] = useState<string[]>([]);

  const [sizePick, setSizePick] = useState<string[]>([]);
  const [bigSmallAnswer, setBigSmallAnswer] = useState<string | null>(null);

  const [hiddenIndex, setHiddenIndex] = useState(2);
  const [memoryAnswer, setMemoryAnswer] = useState<string | null>(null);

  const [fingerNumber, setFingerNumber] = useState(3);
  const [drumTarget, setDrumTarget] = useState(4);
  const [drumHits, setDrumHits] = useState(0);
  const [diceA, setDiceA] = useState(3);
  const [diceB, setDiceB] = useState(5);
  const [diceAnswer, setDiceAnswer] = useState<string | null>(null);

  const [bingoRange, setBingoRange] = useState<5 | 10>(5);
  const [calledNumber, setCalledNumber] = useState(1);
  const [markedNumbers, setMarkedNumbers] = useState<number[]>([]);

  const [patternKind, setPatternKind] = useState<'AB' | 'AAB' | 'ABC' | 'codigo' | 'sonido'>('AB');
  const [patternAnswer, setPatternAnswer] = useState<string | null>(null);
  const [collar, setCollar] = useState<string[]>([]);

  const [buildShape, setBuildShape] = useState<'triangulo' | 'cuadrado' | 'casa' | 'numero'>('triangulo');
  const [clayNumber, setClayNumber] = useState(3);

  const [boardPos, setBoardPos] = useState(0);
  const [boardDice, setBoardDice] = useState(2);
  const [insideBox, setInsideBox] = useState(true);

  const [pizzaCut, setPizzaCut] = useState(false);
  const [paperFold, setPaperFold] = useState(false);

  const [people, setPeople] = useState(3);
  const [plates, setPlates] = useState(2);
  const [simonNumber, setSimonNumber] = useState(3);
  const [fillLevel, setFillLevel] = useState<'vacio' | 'mitad' | 'lleno'>('mitad');
  const [ageNumber, setAgeNumber] = useState(5);

  const modes: { id: Mode; label: string; icon: string }[] = [
    { id: 'cantidades', label: 'Muchos/pocos', icon: '🔴' },
    { id: 'logica', label: 'Todos/algunos', icon: '🧠' },
    { id: 'emparejar', label: 'Emparejar', icon: '🧦' },
    { id: 'diferencias', label: 'Diferencias', icon: '🔍' },
    { id: 'tamanos', label: 'Tamaños', icon: '🐻' },
    { id: 'memoria', label: 'Qué falta', icon: '👀' },
    { id: 'subitizacion', label: 'Dedos/dados', icon: '🎲' },
    { id: 'bingo', label: 'Bingo', icon: '🎯' },
    { id: 'patrones', label: 'Patrones', icon: '📿' },
    { id: 'construccion', label: 'Construir', icon: '🥢' },
    { id: 'tablero', label: 'Tablero', icon: '🧩' },
    { id: 'mitades', label: 'Mitades', icon: '🍕' },
    { id: 'vida', label: 'Vida diaria', icon: '🍽️' },
  ];

  const resetMode = () => {
    setLogicAnswer(null);
    setSelectedCards([]);
    setMatchedPairs([]);
    setDiffFound([]);
    setSizePick([]);
    setBigSmallAnswer(null);
    setMemoryAnswer(null);
    setDiceAnswer(null);
    setMarkedNumbers([]);
    setPatternAnswer(null);
    setCollar([]);
    setDrumHits(0);
  };

  const formatCount = (n: number, icon = '🔵') => (
    <div className="flex gap-2 flex-wrap justify-center text-3xl">
      {Array.from({ length: n }).map((_, i) => <span key={i}>{icon}</span>)}
      {n === 0 && <span className="font-black text-base opacity-70">Vacío</span>}
    </div>
  );

  const renderCantidades = () => {
    const relation =
      manyA > manyB ? 'La caja A tiene más bolitas.' :
      manyA < manyB ? 'La caja B tiene más bolitas.' :
      'Las dos cajas tienen igual cantidad.';

    return (
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-3">
          <NumberInput label="Bolitas en caja A" value={manyA} setValue={setManyA} min={0} max={12} color="#ef4444" />
          <NumberInput label="Bolitas en caja B" value={manyB} setValue={setManyB} min={0} max={12} color="#3b82f6" />
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-5 rounded-3xl bg-red-500/10 border-2 border-red-500/30 shadow text-center">
            <div className="font-black text-xl mb-3">Caja A</div>
            {formatCount(manyA, '🔴')}
            <div className="font-black mt-3">{manyA === 0 ? 'Cero bolitas' : manyA >= 6 ? 'Muchas bolitas' : 'Pocas bolitas'}</div>
          </div>

          <div className="p-5 rounded-3xl bg-blue-500/10 border-2 border-blue-500/30 shadow text-center">
            <div className="font-black text-xl mb-3">Caja B</div>
            {formatCount(manyB, '🔵')}
            <div className="font-black mt-3">{manyB === 0 ? 'Cero bolitas' : manyB >= 6 ? 'Muchas bolitas' : 'Pocas bolitas'}</div>
          </div>
        </div>

        <div className="lab-formula text-center text-lg">{relation}</div>
      </div>
    );
  };

  const renderLogica = () => {
    const scenes = {
      todos: {
        title: 'Todos son manzanas',
        items: ['🍎', '🍎', '🍎', '🍎', '🍎'],
        answer: 'todos',
      },
      algunos: {
        title: 'Algunos son manzanas',
        items: ['🍎', '🍌', '🍎', '🍇', '🍎'],
        answer: 'algunos',
      },
      ninguno: {
        title: 'Ninguno es manzana',
        items: ['🍌', '🍇', '🍓', '🍊', '🍐'],
        answer: 'ninguno',
      },
    };

    const current = scenes[logicScene];
    const ok = logicAnswer === current.answer;

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          {(['todos', 'algunos', 'ninguno'] as const).map(k => (
            <button
              key={k}
              onClick={() => {
                setLogicScene(k);
                setLogicAnswer(null);
              }}
              className={`p-3 rounded-2xl font-black ${logicScene === k ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color'}`}
            >
              {k}
            </button>
          ))}
        </div>

        <div className="p-6 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
          <div className="font-black text-xl mb-2">{current.title}</div>
          <div className="text-6xl flex gap-3 justify-center flex-wrap mb-4">
            {current.items.map((x, i) => <span key={i}>{x}</span>)}
          </div>

          <div className="font-black mb-3">¿Cuántos objetos son manzanas?</div>

          <div className="grid grid-cols-3 gap-2">
            {['todos', 'algunos', 'ninguno'].map(opt => (
              <button
                key={opt}
                onClick={() => setLogicAnswer(opt)}
                className={`p-4 rounded-2xl border-2 font-black ${
                  logicAnswer === opt
                    ? ok && opt === logicAnswer ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-red-500 text-white border-red-500'
                    : 'bg-surface-color border-border-color'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          {logicAnswer && (
            <div className={`mt-4 p-4 rounded-2xl text-white font-black ${ok ? 'bg-emerald-500' : 'bg-red-500'}`}>
              {ok ? '✅ Correcto.' : `❌ Casi. La respuesta es "${current.answer}".`}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderEmparejar = () => {
    const pairItems = [
      { id: 'sock1', pair: 'sock', icon: '🧦' },
      { id: 'tri1', pair: 'tri', icon: '🔺' },
      { id: 'car1', pair: 'car', icon: '🚗' },
      { id: 'star1', pair: 'star', icon: '⭐' },
      { id: 'sock2', pair: 'sock', icon: '🧦' },
      { id: 'tri2', pair: 'tri', icon: '🔺' },
      { id: 'car2', pair: 'car', icon: '🚗' },
      { id: 'star2', pair: 'star', icon: '⭐' },
    ];

    const pick = (id: string) => {
      const item = pairItems.find(x => x.id === id);
      if (!item || matchedPairs.includes(item.pair) || selectedCards.includes(id)) return;

      const next = [...selectedCards, id];

      if (next.length === 2) {
        const a = pairItems.find(x => x.id === next[0]);
        const b = pairItems.find(x => x.id === next[1]);

        if (a && b && a.pair === b.pair) {
          setMatchedPairs([...matchedPairs, a.pair]);
        }

        setSelectedCards([]);
      } else {
        setSelectedCards(next);
      }
    };

    return (
      <div className="space-y-4">
        <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
          <div className="font-black text-xl mb-1">Empareja objetos idénticos</div>
          <p className="text-sm font-bold opacity-75 mb-4">Toca dos objetos iguales.</p>

          <div className="grid grid-cols-4 gap-3 max-w-xl mx-auto">
            {pairItems.map(item => {
              const done = matchedPairs.includes(item.pair);
              const selected = selectedCards.includes(item.id);

              return (
                <button
                  key={item.id}
                  onClick={() => pick(item.id)}
                  className={`h-24 rounded-3xl border-2 text-5xl transition-all ${
                    done
                      ? 'bg-emerald-500/20 border-emerald-500 scale-95'
                      : selected
                        ? 'bg-[var(--primary-color)]/20 border-[var(--primary-color)] scale-105'
                        : 'bg-surface-color border-border-color hover:scale-105'
                  }`}
                >
                  {item.icon}
                </button>
              );
            })}
          </div>

          <div className="mt-4 p-3 rounded-2xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30 font-black">
            Parejas encontradas: {matchedPairs.length} / 4
          </div>
        </div>

        <button onClick={() => { setMatchedPairs([]); setSelectedCards([]); }} className="math-btn w-full">
          Reiniciar parejas
        </button>
      </div>
    );
  };

  const renderDiferencias = () => {
    const differences = [
      { id: 'sol', label: 'El sol cambió' },
      { id: 'ventana', label: 'La ventana cambió' },
      { id: 'pelota', label: 'La pelota cambió' },
      { id: 'flor', label: 'La flor cambió' },
    ];

    const toggle = (id: string) => {
      if (diffFound.includes(id)) setDiffFound(diffFound.filter(x => x !== id));
      else setDiffFound([...diffFound, id]);
    };

    const ok = diffFound.length === differences.length && differences.every(d => diffFound.includes(d.id));

    return (
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
            <div className="font-black mb-2">Dibujo A</div>
            <div className="relative mx-auto w-72 h-72 rounded-3xl bg-sky-200 border-4 border-sky-400 overflow-hidden">
              <div className="absolute top-5 left-6 text-5xl">☀️</div>
              <div className="absolute bottom-16 left-20 text-8xl">🏠</div>
              <div className="absolute bottom-8 right-10 text-4xl">⚽</div>
              <div className="absolute bottom-8 left-8 text-4xl">🌷</div>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
            <div className="font-black mb-2">Dibujo B</div>
            <div className="relative mx-auto w-72 h-72 rounded-3xl bg-sky-200 border-4 border-sky-400 overflow-hidden">
              <div className="absolute top-5 left-6 text-5xl">🌙</div>
              <div className="absolute bottom-16 left-20 text-8xl">🏚️</div>
              <div className="absolute bottom-8 right-10 text-4xl">🏀</div>
              <div className="absolute bottom-8 left-8 text-4xl">🌻</div>
            </div>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30 shadow">
          <div className="font-black text-xl mb-3">Encuentra las diferencias</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {differences.map(d => (
              <button
                key={d.id}
                onClick={() => toggle(d.id)}
                className={`p-4 rounded-2xl font-black border-2 ${diffFound.includes(d.id) ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-surface-color border-border-color'}`}
              >
                {d.label}
              </button>
            ))}
          </div>

          {diffFound.length > 0 && (
            <div className={`mt-4 p-4 rounded-2xl text-white text-center font-black ${ok ? 'bg-emerald-500' : 'bg-amber-500'}`}>
              {ok ? '✅ Encontraste todas.' : `Encontraste ${diffFound.length} de 4.`}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderTamanos = () => {
    const order = ['bebe', 'mama', 'papa'];
    const bears = [
      { id: 'papa', label: 'Papá oso', icon: '🐻', size: 'text-7xl' },
      { id: 'bebe', label: 'Bebé oso', icon: '🧸', size: 'text-4xl' },
      { id: 'mama', label: 'Mamá osa', icon: '🐻', size: 'text-6xl' },
    ];

    const ok = sizePick.join(',') === order.join(',');

    const add = (id: string) => {
      if (!sizePick.includes(id)) setSizePick([...sizePick, id]);
    };

    return (
      <div className="space-y-4">
        <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow">
          <div className="font-black text-xl mb-1">Ordenar por tamaño</div>
          <p className="text-sm font-bold opacity-75 mb-4">Toca de más pequeño a más grande.</p>

          <div className="grid grid-cols-3 gap-3">
            {bears.map(b => (
              <button
                key={b.id}
                disabled={sizePick.includes(b.id)}
                onClick={() => add(b.id)}
                className={`p-4 rounded-3xl border-2 text-center ${sizePick.includes(b.id) ? 'opacity-40 bg-slate-200 dark:bg-slate-700' : 'bg-surface-color border-border-color hover:scale-105'}`}
              >
                <div className={b.size}>{b.icon}</div>
                <div className="font-black text-sm mt-2">{b.label}</div>
              </button>
            ))}
          </div>

          <div className="mt-4 p-4 rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30 flex gap-2 flex-wrap justify-center">
            {sizePick.length === 0 ? (
              <span className="text-sm font-bold opacity-70">Tu orden aparecerá aquí.</span>
            ) : (
              sizePick.map(id => <span key={id} className="px-3 py-2 rounded-full bg-surface-color border-2 border-border-color font-black">{id}</span>)
            )}
          </div>

          {sizePick.length === 3 && (
            <div className={`mt-4 p-4 rounded-2xl text-white text-center font-black ${ok ? 'bg-emerald-500' : 'bg-red-500'}`}>
              {ok ? '✅ Orden correcto.' : '❌ Casi. Empieza por el más pequeño.'}
            </div>
          )}
        </div>

        <div className="p-5 rounded-3xl bg-yellow-400/10 border-2 border-yellow-400/30 shadow text-center">
          <div className="font-black text-xl mb-3">¿Cuál es el más grande?</div>
          <div className="grid grid-cols-3 gap-2">
            {bears.map(b => (
              <button
                key={b.id}
                onClick={() => setBigSmallAnswer(b.id)}
                className={`p-3 rounded-2xl border-2 font-black ${
                  bigSmallAnswer === b.id
                    ? b.id === 'papa' ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-red-500 text-white border-red-500'
                    : 'bg-surface-color border-border-color'
                }`}
              >
                {b.label}
              </button>
            ))}
          </div>
        </div>

        <button onClick={() => { setSizePick([]); setBigSmallAnswer(null); }} className="math-btn w-full">Reiniciar tamaños</button>
      </div>
    );
  };

  const renderMemoria = () => {
    const objects = ['🔺', '🟦', '🟢', '⭐', '🧸'];
    const hidden = objects[hiddenIndex];

    const nextHidden = () => {
      setHiddenIndex((hiddenIndex + 1) % objects.length);
      setMemoryAnswer(null);
    };

    return (
      <div className="space-y-4">
        <div className="p-6 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
          <div className="font-black text-xl mb-1">¿Qué falta?</div>
          <p className="text-sm font-bold opacity-75 mb-4">Mira la fila y encuentra el objeto que desapareció.</p>

          <div className="p-5 rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30 flex gap-4 justify-center text-6xl">
            {objects.map((x, i) => (
              <span key={i}>{i === hiddenIndex ? '❔' : x}</span>
            ))}
          </div>

          <div className="grid grid-cols-5 gap-2 mt-4">
            {objects.map(x => (
              <button
                key={x}
                onClick={() => setMemoryAnswer(x)}
                className={`p-4 rounded-2xl text-4xl border-2 ${
                  memoryAnswer === x
                    ? x === hidden ? 'bg-emerald-500/20 border-emerald-500' : 'bg-red-500/20 border-red-500'
                    : 'bg-surface-color border-border-color'
                }`}
              >
                {x}
              </button>
            ))}
          </div>

          {memoryAnswer && (
            <div className={`mt-4 p-4 rounded-2xl text-white font-black ${memoryAnswer === hidden ? 'bg-emerald-500' : 'bg-red-500'}`}>
              {memoryAnswer === hidden ? '✅ ¡Ese faltaba!' : `❌ Faltaba ${hidden}.`}
            </div>
          )}
        </div>

        <button onClick={nextHidden} className="math-btn w-full">Nuevo objeto oculto</button>
      </div>
    );
  };

  const renderSubitizacion = () => {
    const diceFace = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];
    const diceRelation =
      diceA > diceB ? 'A' :
      diceA < diceB ? 'B' :
      'igual';

    const okDice = diceAnswer === diceRelation;

    return (
      <div className="space-y-4">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
            <div className="font-black text-xl mb-2">Dedos</div>
            <NumberInput label="Número" value={fingerNumber} setValue={setFingerNumber} min={0} max={10} color="#f59e0b" />
            <div className="text-5xl mt-4">
              {Array.from({ length: fingerNumber }).map((_, i) => <span key={i}>☝️</span>)}
              {fingerNumber === 0 && <span>⭕</span>}
            </div>
            <div className="font-black mt-3">Representa {fingerNumber} con dedos.</div>
          </div>

          <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
            <div className="font-black text-xl mb-2">Tambor</div>
            <NumberInput label="Golpes meta" value={drumTarget} setValue={setDrumTarget} min={1} max={10} color="#ef4444" />
            <button onClick={() => setDrumHits(drumHits + 1)} className="math-btn w-full mt-3">🥁 Tocar tambor</button>
            <button onClick={() => setDrumHits(0)} className="p-3 rounded-2xl bg-slate-200 dark:bg-slate-700 font-black w-full mt-2">Reiniciar</button>
            <div className="text-4xl mt-3">{Array.from({ length: drumHits }).map((_, i) => <span key={i}>🥁</span>)}</div>
            <div className={`mt-3 p-3 rounded-2xl text-white font-black ${drumHits === drumTarget ? 'bg-emerald-500' : drumHits < drumTarget ? 'bg-amber-500' : 'bg-red-500'}`}>
              {drumHits === drumTarget ? '✅ Exacto.' : drumHits < drumTarget ? `Faltan ${drumTarget - drumHits}.` : `Te pasaste por ${drumHits - drumTarget}.`}
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
            <div className="font-black text-xl mb-2">Dados</div>
            <div className="grid grid-cols-2 gap-2">
              <NumberInput label="Dado A" value={diceA} setValue={setDiceA} min={1} max={6} color="#3b82f6" />
              <NumberInput label="Dado B" value={diceB} setValue={setDiceB} min={1} max={6} color="#8b5cf6" />
            </div>
            <div className="text-7xl my-3">{diceFace[diceA - 1]} {diceFace[diceB - 1]}</div>
            <div className="grid grid-cols-3 gap-2">
              {['A', 'B', 'igual'].map(opt => (
                <button
                  key={opt}
                  onClick={() => setDiceAnswer(opt)}
                  className={`p-3 rounded-2xl font-black ${
                    diceAnswer === opt
                      ? okDice ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
                      : 'bg-surface-color border-2 border-border-color'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderBingo = () => {
    const nums = Array.from({ length: bingoRange }, (_, i) => i + 1);
    const allMarked = nums.every(n => markedNumbers.includes(n));

    const callNext = () => {
      const next = calledNumber >= bingoRange ? 1 : calledNumber + 1;
      setCalledNumber(next);
    };

    const mark = (n: number) => {
      if (n === calledNumber && !markedNumbers.includes(n)) {
        setMarkedNumbers([...markedNumbers, n]);
      }
    };

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          {[5, 10].map(n => (
            <button
              key={n}
              onClick={() => {
                setBingoRange(n as 5 | 10);
                setCalledNumber(1);
                setMarkedNumbers([]);
              }}
              className={`p-3 rounded-2xl font-black ${bingoRange === n ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color'}`}
            >
              Bingo 1 al {n}
            </button>
          ))}
        </div>

        <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
          <div className="text-xs font-black uppercase opacity-70">Número llamado</div>
          <div className="text-6xl font-black text-[var(--primary-color)]">{calledNumber}</div>
          <button onClick={callNext} className="math-btn mt-3">Sacar otro número</button>

          <div className="grid grid-cols-5 gap-2 max-w-md mx-auto mt-5">
            {nums.map(n => (
              <button
                key={n}
                onClick={() => mark(n)}
                className={`h-20 rounded-3xl border-2 font-black text-3xl ${
                  markedNumbers.includes(n)
                    ? 'bg-emerald-500 text-white border-emerald-500'
                    : n === calledNumber
                      ? 'bg-yellow-400 text-slate-900 border-yellow-500 animate-pulse'
                      : 'bg-surface-color border-border-color'
                }`}
              >
                {n}
              </button>
            ))}
          </div>

          {allMarked && (
            <div className="mt-4 p-4 rounded-2xl bg-emerald-500 text-white font-black">🎉 ¡Bingo!</div>
          )}
        </div>
      </div>
    );
  };

  const renderPatrones = () => {
    const data = {
      AB: {
        label: 'Patrón AB',
        sequence: ['🔴', '🔵', '🔴', '🔵', '🔴'],
        answer: '🔵',
      },
      AAB: {
        label: 'Patrón AAB',
        sequence: ['🟡', '🟡', '🟢', '🟡', '🟡'],
        answer: '🟢',
      },
      ABC: {
        label: 'Patrón ABC',
        sequence: ['🔺', '🟦', '⭐', '🔺', '🟦'],
        answer: '⭐',
      },
      codigo: {
        label: 'Código: 1 roja, 2 azules',
        sequence: ['🔴', '🔵', '🔵', '🔴', '🔵'],
        answer: '🔵',
      },
      sonido: {
        label: 'Sonido fuerte/suave',
        sequence: ['🔊', '🔉', '🔊', '🔉', '🔊'],
        answer: '🔉',
      },
    };

    const current = data[patternKind];
    const ok = patternAnswer === current.answer;

    const addBead = (x: string) => setCollar([...collar, x]);

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {Object.keys(data).map(k => (
            <button
              key={k}
              onClick={() => {
                setPatternKind(k as keyof typeof data);
                setPatternAnswer(null);
                setCollar([]);
              }}
              className={`p-3 rounded-2xl font-black text-xs ${patternKind === k ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color'}`}
            >
              {data[k as keyof typeof data].label}
            </button>
          ))}
        </div>

        <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
          <div className="font-black text-xl mb-2">{current.label}</div>
          <div className="text-5xl flex gap-3 justify-center flex-wrap mb-4">
            {current.sequence.map((x, i) => <span key={i}>{x}</span>)}
            <span>❔</span>
          </div>

          <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
            {['🔴', '🔵', '🟢', '🟡', '🔺', '🟦', '⭐', '🔉'].map(x => (
              <button
                key={x}
                onClick={() => setPatternAnswer(x)}
                className={`p-3 rounded-2xl text-3xl border-2 ${
                  patternAnswer === x
                    ? ok && x === patternAnswer ? 'bg-emerald-500/20 border-emerald-500' : 'bg-red-500/20 border-red-500'
                    : 'bg-surface-color border-border-color'
                }`}
              >
                {x}
              </button>
            ))}
          </div>

          {patternAnswer && (
            <div className={`mt-4 p-4 rounded-2xl text-white font-black ${ok ? 'bg-emerald-500' : 'bg-red-500'}`}>
              {ok ? '✅ Continúa el patrón.' : `❌ Casi. Sigue con ${current.answer}.`}
            </div>
          )}
        </div>

        <div className="p-5 rounded-3xl bg-purple-500/10 border-2 border-purple-500/30 shadow">
          <div className="font-black text-xl mb-2">Collar de cuentas</div>
          <p className="text-sm font-bold opacity-75 mb-3">Agrega cuentas siguiendo tu propio patrón.</p>
          <div className="grid grid-cols-4 gap-2 mb-4">
            {['🔴', '🔵', '🟡', '🟢'].map(x => (
              <button key={x} onClick={() => addBead(x)} className="p-3 rounded-2xl text-3xl bg-surface-color border-2 border-border-color">{x}</button>
            ))}
          </div>
          <div className="min-h-20 p-4 rounded-3xl bg-surface-color border-2 border-border-color text-4xl flex gap-2 flex-wrap justify-center">
            {collar.length === 0 ? <span className="text-sm font-bold opacity-70">Tu collar aparecerá aquí.</span> : collar.map((x, i) => <span key={i}>{x}</span>)}
          </div>
          <button onClick={() => setCollar([])} className="math-btn w-full mt-4">Borrar collar</button>
        </div>
      </div>
    );
  };

  const renderConstruccion = () => {
    const shapeInfo = {
      triangulo: { name: 'Triángulo', sticks: 3, icon: '🔺' },
      cuadrado: { name: 'Cuadrado', sticks: 4, icon: '⬛' },
      casa: { name: 'Casa', sticks: 7, icon: '🏠' },
      numero: { name: 'Número', sticks: clayNumber, icon: '🔢' },
    };

    const current = shapeInfo[buildShape];

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-4 gap-2">
          {Object.keys(shapeInfo).map(k => (
            <button
              key={k}
              onClick={() => setBuildShape(k as keyof typeof shapeInfo)}
              className={`p-3 rounded-2xl font-black text-xs ${buildShape === k ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color'}`}
            >
              {shapeInfo[k as keyof typeof shapeInfo].icon} {shapeInfo[k as keyof typeof shapeInfo].name}
            </button>
          ))}
        </div>

        {buildShape === 'numero' && (
          <NumberInput label="Número para modelar" value={clayNumber} setValue={setClayNumber} min={0} max={9} color="#ec4899" />
        )}

        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-6 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
            <div className="font-black text-xl mb-2">Construir con palitos</div>
            <div className="text-7xl mb-3">{current.icon}</div>
            <div className="font-black text-lg">{current.name}</div>
            <div className="font-black text-3xl text-[var(--primary-color)]">{current.sticks}</div>
            <div className="text-sm font-bold opacity-75">palito(s) o tiras de plastilina</div>
            <div className="flex gap-2 flex-wrap justify-center text-4xl mt-4">
              {Array.from({ length: Math.min(current.sticks, 12) }).map((_, i) => <span key={i}>🥢</span>)}
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-pink-500/10 border-2 border-pink-500/30 shadow text-center">
            <div className="font-black text-xl mb-2">Modelar número</div>
            <div className="text-9xl font-black text-pink-500">{clayNumber}</div>
            <div className="flex gap-2 justify-center text-3xl mt-3">
              {Array.from({ length: Math.max(1, clayNumber) }).map((_, i) => <span key={i}>🟣</span>)}
            </div>
            <div className="text-sm font-bold opacity-75 mt-3">
              Imagina que sigues la línea con plastilina o con el dedo.
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderTablero = () => {
    const move = () => {
      setBoardPos(Math.min(11, boardPos + boardDice));
    };

    return (
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-3">
          <NumberInput label="Dado" value={boardDice} setValue={setBoardDice} min={1} max={6} color="#22c55e" />
          <div className="p-4 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
            <div className="font-black text-xl">Posición</div>
            <div className="text-4xl font-black text-[var(--primary-color)]">{boardPos + 1}</div>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow">
          <div className="grid grid-cols-4 gap-2 max-w-md mx-auto">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className={`h-20 rounded-3xl border-2 flex items-center justify-center font-black text-xl ${
                  i === boardPos ? 'bg-emerald-500 text-white border-emerald-500 scale-105' : 'bg-black/5 border-border-color'
                }`}
              >
                {i === boardPos ? '🧸' : i + 1}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4">
            <button onClick={move} className="math-btn py-3">Mover según dado</button>
            <button onClick={() => setBoardPos(0)} className="p-3 rounded-2xl bg-slate-200 dark:bg-slate-700 font-black">Volver al inicio</button>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-blue-500/10 border-2 border-blue-500/30 shadow text-center">
          <div className="font-black text-xl mb-2">Dentro / fuera</div>
          <button onClick={() => setInsideBox(!insideBox)} className="math-btn mb-4">Cambiar posición</button>
          <div className="relative mx-auto w-64 h-44 rounded-3xl border-4 border-blue-500 bg-surface-color">
            <div className={`absolute text-6xl transition-all ${insideBox ? 'left-24 top-14' : '-right-8 top-14'}`}>⚽</div>
          </div>
          <div className="font-black mt-3">La pelota está {insideBox ? 'dentro' : 'fuera'} de la caja.</div>
        </div>
      </div>
    );
  };

  const renderMitades = () => (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-6 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
          <div className="font-black text-xl mb-2">Pizza en mitades</div>
          <button onClick={() => setPizzaCut(!pizzaCut)} className="math-btn mb-4">{pizzaCut ? 'Unir pizza' : 'Partir a la mitad'}</button>
          <div className="relative mx-auto w-56 h-56">
            {!pizzaCut ? (
              <div className="w-56 h-56 rounded-full bg-yellow-400 border-8 border-orange-500 flex items-center justify-center text-5xl">🍕</div>
            ) : (
              <>
                <div className="absolute left-0 top-0 w-28 h-56 bg-yellow-400 border-8 border-orange-500 rounded-l-full" />
                <div className="absolute right-0 top-0 w-28 h-56 bg-yellow-400 border-8 border-orange-500 rounded-r-full" />
                <div className="absolute inset-0 flex items-center justify-center text-4xl">½ ½</div>
              </>
            )}
          </div>
          <div className="font-black mt-3">{pizzaCut ? 'Dos mitades forman una pizza completa.' : 'La pizza está completa.'}</div>
        </div>

        <div className="p-6 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
          <div className="font-black text-xl mb-2">Doblar hoja</div>
          <button onClick={() => setPaperFold(!paperFold)} className="math-btn mb-4">{paperFold ? 'Abrir hoja' : 'Doblar por la mitad'}</button>
          <div className={`mx-auto h-64 bg-white border-4 border-slate-300 rounded-3xl transition-all ${paperFold ? 'w-32' : 'w-56'}`}>
            <div className="h-full border-l-4 border-dashed border-slate-400 mx-auto" />
          </div>
          <div className="font-black mt-3">{paperFold ? 'La hoja quedó doblada a la mitad.' : 'La línea muestra dos mitades.'}</div>
        </div>
      </div>
    </div>
  );

  const renderVida = () => {
    const platesOk = plates === people;

    return (
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-3">
          <NumberInput label="Personas en la mesa" value={people} setValue={setPeople} min={1} max={8} color="#3b82f6" />
          <NumberInput label="Platos puestos" value={plates} setValue={setPlates} min={0} max={8} color="#f59e0b" />
        </div>

        <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
          <div className="font-black text-xl mb-3">Poner la mesa</div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-4 rounded-3xl bg-blue-500/10 border-2 border-blue-500/30">
              <div className="font-black mb-2">Personas</div>
              <div className="text-4xl flex gap-2 flex-wrap justify-center">{Array.from({ length: people }).map((_, i) => <span key={i}>🧒</span>)}</div>
            </div>
            <div className="p-4 rounded-3xl bg-amber-500/10 border-2 border-amber-500/30">
              <div className="font-black mb-2">Platos</div>
              <div className="text-4xl flex gap-2 flex-wrap justify-center">{Array.from({ length: plates }).map((_, i) => <span key={i}>🍽️</span>)}</div>
            </div>
          </div>
          <div className={`mt-4 p-4 rounded-2xl text-white font-black ${platesOk ? 'bg-emerald-500' : 'bg-amber-500'}`}>
            {platesOk ? '✅ Hay un plato para cada persona.' : plates < people ? `Faltan ${people - plates} plato(s).` : `Sobran ${plates - people} plato(s).`}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-5 rounded-3xl bg-purple-500/10 border-2 border-purple-500/30 shadow text-center">
            <div className="font-black text-xl mb-2">Simón dice</div>
            <NumberInput label="Saltos" value={simonNumber} setValue={setSimonNumber} min={1} max={10} color="#a855f7" />
            <div className="text-4xl mt-3">{Array.from({ length: simonNumber }).map((_, i) => <span key={i}>🦘</span>)}</div>
            <div className="font-black mt-2">Salta {simonNumber} veces.</div>
          </div>

          <div className="p-5 rounded-3xl bg-sky-500/10 border-2 border-sky-500/30 shadow text-center">
            <div className="font-black text-xl mb-2">Lleno / vacío</div>
            <div className="grid grid-cols-3 gap-2 mb-3">
              {(['vacio', 'mitad', 'lleno'] as const).map(v => (
                <button key={v} onClick={() => setFillLevel(v)} className={`p-2 rounded-xl font-black text-xs ${fillLevel === v ? 'bg-[var(--primary-color)] text-white' : 'bg-surface-color border-2 border-border-color'}`}>
                  {v}
                </button>
              ))}
            </div>
            <div className="w-28 h-48 mx-auto rounded-b-3xl rounded-t-lg border-4 border-sky-700 relative overflow-hidden bg-sky-100/20">
              <div
                className="absolute bottom-0 left-0 right-0 bg-sky-400"
                style={{ height: fillLevel === 'vacio' ? '0%' : fillLevel === 'mitad' ? '50%' : '100%' }}
              />
            </div>
            <div className="font-black mt-2">Está {fillLevel}.</div>
          </div>

          <div className="p-5 rounded-3xl bg-emerald-500/10 border-2 border-emerald-500/30 shadow text-center">
            <div className="font-black text-xl mb-2">Mi edad</div>
            <NumberInput label="Edad" value={ageNumber} setValue={setAgeNumber} min={1} max={10} color="#10b981" />
            <div className="text-7xl font-black text-emerald-500">{ageNumber}</div>
            <div className="font-black">Tengo {ageNumber} años.</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <TopicCard
      icon="🧠"
      title="Conceptos Lógico-Matemáticos Variados"
      color="#8b5cf6"
      desc="Repaso interactivo de muchos/pocos, todos/algunos/ninguno, emparejar, diferencias, tamaños, memoria, dados, bingo, patrones, construcción, tablero, mitades y situaciones de la vida diaria."
    >
      <div className="lab-container space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {modes.map(m => (
            <button
              key={m.id}
              onClick={() => {
                setMode(m.id);
                resetMode();
              }}
              className={`p-3 rounded-2xl font-black text-xs transition-all ${
                mode === m.id ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color hover:scale-105'
              }`}
            >
              <span className="text-2xl block mb-1">{m.icon}</span>
              {m.label}
            </button>
          ))}
        </div>

        {mode === 'cantidades' && renderCantidades()}
        {mode === 'logica' && renderLogica()}
        {mode === 'emparejar' && renderEmparejar()}
        {mode === 'diferencias' && renderDiferencias()}
        {mode === 'tamanos' && renderTamanos()}
        {mode === 'memoria' && renderMemoria()}
        {mode === 'subitizacion' && renderSubitizacion()}
        {mode === 'bingo' && renderBingo()}
        {mode === 'patrones' && renderPatrones()}
        {mode === 'construccion' && renderConstruccion()}
        {mode === 'tablero' && renderTablero()}
        {mode === 'mitades' && renderMitades()}
        {mode === 'vida' && renderVida()}
      </div>
    </TopicCard>
  );
};


export const DineroJuguete: React.FC = () => {
  type Mode =
    | 'guia'
    | 'reconocer'
    | 'tiendita'
    | 'calculadora'
    | 'pagar'
    | 'cambio'
    | 'equivalencias'
    | 'alcancia'
    | 'comparar'
    | 'reto';

  type MoneyKey =
    | 'c50'
    | 'm1'
    | 'm2'
    | 'm5'
    | 'm10'
    | 'b20'
    | 'b50'
    | 'b100'
    | 'b200'
    | 'b500'
    | 'b1000';

  type ProductKey =
    | 'chicle'
    | 'paleta'
    | 'lapiz'
    | 'galleta'
    | 'jugo'
    | 'libreta'
    | 'colores'
    | 'lonchera'
    | 'balon'
    | 'mochila'
    | 'patines'
    | 'bicicleta';

  const [mode, setMode] = useState<Mode>('guia');

  const [targetMoney, setTargetMoney] = useState<MoneyKey>('c50');
  const [moneyAnswer, setMoneyAnswer] = useState<MoneyKey | null>(null);

  const [shopProduct, setShopProduct] = useState<ProductKey>('galleta');
  const [shopMoney, setShopMoney] = useState<MoneyKey[]>([]);

  const [cart, setCart] = useState<ProductKey[]>([]);
  const [cartMoney, setCartMoney] = useState<MoneyKey[]>([]);

  const [payProduct, setPayProduct] = useState<ProductKey>('jugo');
  const [payMoney, setPayMoney] = useState<MoneyKey[]>([]);

  const [changeProduct, setChangeProduct] = useState<ProductKey>('mochila');
  const [changeMoney, setChangeMoney] = useState<MoneyKey[]>([]);

  const [equivTarget, setEquivTarget] = useState<MoneyKey>('b50');
  const [equivMoney, setEquivMoney] = useState<MoneyKey[]>([]);

  const [piggyMoney, setPiggyMoney] = useState<MoneyKey[]>(['m1', 'm2', 'm5', 'm10']);
  const [compareA, setCompareA] = useState<MoneyKey[]>(['b20', 'm10']);
  const [compareB, setCompareB] = useState<MoneyKey[]>(['b50']);
  const [challengeProduct, setChallengeProduct] = useState<ProductKey>('balon');
  const [challengeMoney, setChallengeMoney] = useState<MoneyKey[]>([]);

  const money: Record<MoneyKey, {
    name: string;
    short: string;
    value: number;
    kind: 'moneda' | 'billete';
    color: string;
    textColor: string;
    desc: string;
  }> = {
    c50: {
      name: 'Moneda de 50 centavos',
      short: '50¢',
      value: 0.5,
      kind: 'moneda',
      color: '#d1d5db',
      textColor: '#111827',
      desc: 'Dos monedas de 50 centavos hacen 1 peso.',
    },
    m1: {
      name: 'Moneda de 1 peso',
      short: '$1',
      value: 1,
      kind: 'moneda',
      color: '#e5e7eb',
      textColor: '#111827',
      desc: 'Vale 1 peso.',
    },
    m2: {
      name: 'Moneda de 2 pesos',
      short: '$2',
      value: 2,
      kind: 'moneda',
      color: '#facc15',
      textColor: '#78350f',
      desc: 'Vale 2 pesos.',
    },
    m5: {
      name: 'Moneda de 5 pesos',
      short: '$5',
      value: 5,
      kind: 'moneda',
      color: '#f59e0b',
      textColor: '#78350f',
      desc: 'Vale 5 pesos.',
    },
    m10: {
      name: 'Moneda de 10 pesos',
      short: '$10',
      value: 10,
      kind: 'moneda',
      color: '#92400e',
      textColor: '#fff7ed',
      desc: 'Vale 10 pesos.',
    },
    b20: {
      name: 'Billete de 20 pesos',
      short: '$20',
      value: 20,
      kind: 'billete',
      color: '#b7e66e',
      textColor: '#14532d',
      desc: 'Color verde pistache.',
    },
    b50: {
      name: 'Billete de 50 pesos',
      short: '$50',
      value: 50,
      kind: 'billete',
      color: '#f472b6',
      textColor: '#831843',
      desc: 'Color rosa.',
    },
    b100: {
      name: 'Billete de 100 pesos',
      short: '$100',
      value: 100,
      kind: 'billete',
      color: '#fb923c',
      textColor: '#7c2d12',
      desc: 'Color naranja rojizo suave.',
    },
    b200: {
      name: 'Billete de 200 pesos',
      short: '$200',
      value: 200,
      kind: 'billete',
      color: '#22c55e',
      textColor: '#052e16',
      desc: 'Color verde pasto.',
    },
    b500: {
      name: 'Billete de 500 pesos',
      short: '$500',
      value: 500,
      kind: 'billete',
      color: '#3b82f6',
      textColor: '#eff6ff',
      desc: 'Color azul.',
    },
    b1000: {
      name: 'Billete de 1000 pesos',
      short: '$1000',
      value: 1000,
      kind: 'billete',
      color: '#7c3aed',
      textColor: '#f5f3ff',
      desc: 'Color morado.',
    },
  };

  const products: Record<ProductKey, { name: string; icon: string; price: number; group: 'barato' | 'medio' | 'caro'; color: string }> = {
    chicle: { name: 'Chicle', icon: '🍬', price: 0.5, group: 'barato', color: '#06b6d4' },
    paleta: { name: 'Paleta', icon: '🍭', price: 1, group: 'barato', color: '#ec4899' },
    lapiz: { name: 'Lápiz', icon: '✏️', price: 3, group: 'barato', color: '#f59e0b' },
    galleta: { name: 'Galleta', icon: '🍪', price: 5, group: 'barato', color: '#d97706' },
    jugo: { name: 'Jugo', icon: '🧃', price: 12, group: 'medio', color: '#22c55e' },
    libreta: { name: 'Libreta', icon: '📓', price: 25, group: 'medio', color: '#3b82f6' },
    colores: { name: 'Colores', icon: '🖍️', price: 50, group: 'medio', color: '#a855f7' },
    lonchera: { name: 'Lonchera', icon: '🍱', price: 75, group: 'medio', color: '#14b8a6' },
    balon: { name: 'Balón', icon: '⚽', price: 120, group: 'caro', color: '#64748b' },
    mochila: { name: 'Mochila', icon: '🎒', price: 250, group: 'caro', color: '#ef4444' },
    patines: { name: 'Patines', icon: '🛼', price: 500, group: 'caro', color: '#0ea5e9' },
    bicicleta: { name: 'Bicicleta', icon: '🚲', price: 1000, group: 'caro', color: '#7c3aed' },
  };

  const moneyKeys: MoneyKey[] = ['c50', 'm1', 'm2', 'm5', 'm10', 'b20', 'b50', 'b100', 'b200', 'b500', 'b1000'];
  const coinKeys: MoneyKey[] = ['c50', 'm1', 'm2', 'm5', 'm10'];
  const billKeys: MoneyKey[] = ['b20', 'b50', 'b100', 'b200', 'b500', 'b1000'];
  const productKeys = Object.keys(products) as ProductKey[];

  const modes: { id: Mode; label: string; icon: string }[] = [
    { id: 'guia', label: 'Guía', icon: '👀' },
    { id: 'reconocer', label: 'Reconocer', icon: '🔎' },
    { id: 'tiendita', label: 'Tiendita', icon: '🏪' },
    { id: 'calculadora', label: 'Calculadora', icon: '🧮' },
    { id: 'pagar', label: 'Pagar justo', icon: '✅' },
    { id: 'cambio', label: 'Cambio', icon: '↩️' },
    { id: 'equivalencias', label: 'Equivalencias', icon: '🔁' },
    { id: 'alcancia', label: 'Alcancía', icon: '🐷' },
    { id: 'comparar', label: 'Comparar', icon: '⚖️' },
    { id: 'reto', label: 'Reto', icon: '🎯' },
  ];

  const roundMoney = (n: number) => Math.round(n * 100) / 100;
  const sumMoney = (arr: MoneyKey[]) => roundMoney(arr.reduce((acc, k) => acc + money[k].value, 0));
  const sumProducts = (arr: ProductKey[]) => roundMoney(arr.reduce((acc, k) => acc + products[k].price, 0));
  const formatMoney = (n: number) => Number.isInteger(n) ? `$${n}` : `$${n.toFixed(2)}`;

  const makeChange = (amount: number) => {
    const result: MoneyKey[] = [];
    let cents = Math.round(amount * 100);
    const order: MoneyKey[] = ['b1000', 'b500', 'b200', 'b100', 'b50', 'b20', 'm10', 'm5', 'm2', 'm1', 'c50'];

    for (const k of order) {
      const value = Math.round(money[k].value * 100);
      while (cents >= value) {
        result.push(k);
        cents -= value;
      }
    }

    return result;
  };

  const suggestedEquivalent = (k: MoneyKey): MoneyKey[] => {
    const map: Record<MoneyKey, MoneyKey[]> = {
      c50: ['c50'],
      m1: ['c50', 'c50'],
      m2: ['m1', 'm1'],
      m5: ['m2', 'm2', 'm1'],
      m10: ['m5', 'm5'],
      b20: ['m10', 'm10'],
      b50: ['b20', 'b20', 'm10'],
      b100: ['b50', 'b50'],
      b200: ['b100', 'b100'],
      b500: ['b200', 'b200', 'b100'],
      b1000: ['b500', 'b500'],
    };

    return map[k];
  };

  const resetMode = () => {
    setMoneyAnswer(null);
    setShopMoney([]);
    setCartMoney([]);
    setPayMoney([]);
    setChangeMoney([]);
    setEquivMoney([]);
    setChallengeMoney([]);
  };

  const MoneyPiece = ({ item, size = 'sm' }: { item: MoneyKey; size?: 'xs' | 'sm' | 'md' }) => {
    const d = money[item];

    const coinSize =
      size === 'xs' ? 'w-12 h-12 text-[11px]' :
      size === 'md' ? 'w-24 h-24 text-2xl' :
      'w-16 h-16 text-sm';

    const billSize =
      size === 'xs' ? 'w-20 h-11 text-sm' :
      size === 'md' ? 'w-36 h-20 text-2xl' :
      'w-24 h-14 text-lg';

    if (d.kind === 'billete') {
      return (
        <div
          className={`${billSize} rounded-xl border-4 border-white shadow flex flex-col items-center justify-center font-black shrink-0`}
          style={{ background: d.color, color: d.textColor }}
          title={d.name}
        >
          <div>{d.short}</div>
          <div className="text-[8px] opacity-80 tracking-widest">JUGUETE</div>
        </div>
      );
    }

    return (
      <div
        className={`${coinSize} rounded-full border-4 border-white shadow flex items-center justify-center font-black relative shrink-0`}
        style={{ background: d.color, color: d.textColor }}
        title={d.name}
      >
        <div className="absolute inset-1 rounded-full border-2 border-white/60" />
        <span>{d.short}</span>
      </div>
    );
  };

  const MoneyTray = ({ arr, empty = 'El dinero aparecerá aquí.' }: { arr: MoneyKey[]; empty?: string }) => (
    <div className="p-3 rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30 min-h-28 max-h-64 overflow-y-auto flex gap-3 flex-wrap justify-center items-center">
      {arr.length === 0 ? (
        <span className="text-sm font-bold opacity-70 text-center">{empty}</span>
      ) : (
        arr.map((k, i) => <MoneyPiece key={`${k}-${i}`} item={k} size="xs" />)
      )}
    </div>
  );

  const MoneyPicker = ({ onPick, keys = moneyKeys, compact = false }: { onPick: (k: MoneyKey) => void; keys?: MoneyKey[]; compact?: boolean }) => {
    const selectedCoins = keys.filter(k => money[k].kind === 'moneda');
    const selectedBills = keys.filter(k => money[k].kind === 'billete');

    const renderGroup = (title: string, list: MoneyKey[]) => {
      if (list.length === 0) return null;

      return (
        <div className="space-y-2">
          <div className="text-[10px] font-black uppercase opacity-60 tracking-wider">{title}</div>
          <div
            className="grid gap-2"
            style={{ gridTemplateColumns: compact ? 'repeat(auto-fit, minmax(118px, 1fr))' : 'repeat(auto-fit, minmax(132px, 1fr))' }}
          >
            {list.map(k => (
              <button
                key={k}
                onClick={() => onPick(k)}
                className="min-h-[86px] p-3 rounded-3xl bg-surface-color border-2 border-border-color hover:scale-[1.03] transition-all text-center flex flex-col items-center justify-center overflow-visible"
              >
                <MoneyPiece item={k} size="xs" />
                <div className="font-black text-[11px] mt-2 leading-tight">{money[k].short}</div>
              </button>
            ))}
          </div>
        </div>
      );
    };

    return (
      <div className="space-y-3">
        {renderGroup('Monedas', selectedCoins)}
        {renderGroup('Billetes', selectedBills)}
      </div>
    );
  };

  const ProductCard = ({ item, active, onClick, compact = false }: { item: ProductKey; active?: boolean; onClick?: () => void; compact?: boolean }) => {
    const p = products[item];

    return (
      <button
        onClick={onClick}
        className={`min-h-[122px] p-3 rounded-3xl border-2 text-center transition-all h-full flex flex-col items-center justify-center ${
          active
            ? 'bg-[var(--primary-color)]/15 border-[var(--primary-color)] scale-105 shadow'
            : 'bg-surface-color border-border-color hover:scale-105'
        }`}
      >
        <div className={compact ? 'text-3xl mb-1' : 'text-4xl mb-1'}>{p.icon}</div>
        <div className="font-black text-xs leading-tight">{p.name}</div>
        <div className="text-sm font-black" style={{ color: p.color }}>{formatMoney(p.price)}</div>
      </button>
    );
  };

  const ProductGrid = ({ active, onPick }: { active: ProductKey; onPick: (k: ProductKey) => void }) => (
    <div className="space-y-3">
      {(['barato', 'medio', 'caro'] as const).map(group => (
        <div key={group}>
          <div className="font-black text-xs uppercase opacity-70 mb-2">
            {group === 'barato' ? 'Objetos baratos' : group === 'medio' ? 'Objetos medianos' : 'Objetos caros'}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {productKeys.filter(k => products[k].group === group).map(k => (
              <ProductCard key={k} item={k} active={active === k} onClick={() => onPick(k)} compact />
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  const ResultBox = ({ total, price }: { total: number; price: number }) => {
    const diff = roundMoney(total - price);

    return (
      <div className={`p-4 rounded-2xl text-white text-center font-black ${
        diff === 0 ? 'bg-emerald-500' : diff < 0 ? 'bg-amber-500' : 'bg-blue-500'
      }`}>
        {diff === 0 ? '✅ Pago exacto.' : diff < 0 ? `Faltan ${formatMoney(Math.abs(diff))}.` : `Cambio: ${formatMoney(diff)}.`}
      </div>
    );
  };

  const ChangeHelp = ({ amount }: { amount: number }) => {
    if (amount <= 0) return null;
    const pieces = makeChange(amount);

    return (
      <div className="mt-3 p-3 rounded-3xl bg-surface-color border-2 border-border-color">
        <div className="font-black text-xs uppercase opacity-70 text-center mb-2">Cambio sugerido</div>
        <div className="flex gap-2 flex-wrap justify-center">
          {pieces.map((k, i) => <MoneyPiece key={`${k}-${i}`} item={k} size="xs" />)}
        </div>
      </div>
    );
  };


  const bestSinglePayment = (price: number): MoneyKey => {
    const candidates = moneyKeys
      .filter(k => money[k].value >= price)
      .sort((a, b) => money[a].value - money[b].value);

    return candidates[0] ?? 'b1000';
  };

  const PayShortcuts = ({ price, setArr }: { price: number; setArr: (v: MoneyKey[]) => void }) => {
    if (price <= 0) return null;

    const exact = makeChange(price);
    const quick = bestSinglePayment(price);
    const quickChange = roundMoney(money[quick].value - price);

    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3">
        <button
          onClick={() => setArr(exact)}
          className="p-3 rounded-2xl bg-emerald-500 text-white font-black text-xs hover:scale-[1.03] transition-all"
        >
          ✅ Pagar exacto
        </button>

        <button
          onClick={() => setArr([quick])}
          className="p-3 rounded-2xl bg-blue-500 text-white font-black text-xs hover:scale-[1.03] transition-all"
        >
          💵 Pagar con {money[quick].short}
          {quickChange > 0 ? ' · cambio ' + formatMoney(quickChange) : ''}
        </button>

        <button
          onClick={() => setArr([])}
          className="p-3 rounded-2xl bg-slate-200 dark:bg-slate-700 font-black text-xs hover:scale-[1.03] transition-all"
        >
          🧹 Limpiar
        </button>
      </div>
    );
  };


  const renderGuia = () => (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow">
          <div className="font-black text-xl mb-3">Monedas</div>
          <div className="grid grid-cols-5 gap-2">
            {coinKeys.map(k => (
              <div key={k} className="p-2 rounded-2xl bg-black/5 border-2 border-border-color text-center">
                <div className="flex justify-center"><MoneyPiece item={k} size="xs" /></div>
                <div className="font-black text-[10px] mt-1">{money[k].name}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow">
          <div className="font-black text-xl mb-3">Billetes</div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            {billKeys.map(k => (
              <div key={k} className="p-2 rounded-2xl bg-black/5 border-2 border-border-color text-center">
                <div className="flex justify-center"><MoneyPiece item={k} size="xs" /></div>
                <div className="font-black text-[10px] mt-1">{money[k].desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        <div className="p-4 rounded-3xl bg-emerald-500/10 border-2 border-emerald-500/30 text-center">
          <div className="text-4xl mb-2">🧮</div>
          <div className="font-black">Calculadora</div>
          <div className="text-xs font-bold opacity-75">Agrega productos y mira cuánto pagar.</div>
        </div>
        <div className="p-4 rounded-3xl bg-blue-500/10 border-2 border-blue-500/30 text-center">
          <div className="text-4xl mb-2">↩️</div>
          <div className="font-black">Cambio</div>
          <div className="text-xs font-bold opacity-75">Si pagas de más, calcula lo que deben devolver.</div>
        </div>
        <div className="p-4 rounded-3xl bg-amber-500/10 border-2 border-amber-500/30 text-center">
          <div className="text-4xl mb-2">🎯</div>
          <div className="font-black">Retos</div>
          <div className="text-xs font-bold opacity-75">Practica pagar exacto con ayuda visual.</div>
        </div>
      </div>
    </div>
  );

  const renderReconocer = () => {
    const ok = moneyAnswer === targetMoney;

    return (
      <div className="space-y-4">
        <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(122px, 1fr))' }}>
          {moneyKeys.map(k => (
            <button
              key={k}
              onClick={() => {
                setTargetMoney(k);
                setMoneyAnswer(null);
              }}
              className={`p-2 rounded-2xl font-black text-xs transition-all ${
                targetMoney === k ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color'
              }`}
            >
              {money[k].short}
            </button>
          ))}
        </div>

        <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow">
          <div className="font-black text-xl mb-1">Reconocer dinero</div>
          <p className="text-sm font-bold opacity-75 mb-4">Toca: <b>{money[targetMoney].name}</b>.</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {moneyKeys.map(k => (
              <button
                key={k}
                onClick={() => setMoneyAnswer(k)}
                className={`p-4 rounded-3xl border-2 transition-all ${
                  moneyAnswer === k
                    ? k === targetMoney
                      ? 'bg-emerald-500/20 border-emerald-500 scale-105'
                      : 'bg-red-500/20 border-red-500'
                    : 'bg-black/5 border-border-color hover:scale-105'
                }`}
              >
                <div className="flex justify-center"><MoneyPiece item={k} size="sm" /></div>
                <div className="font-black text-xs mt-2">{money[k].name}</div>
              </button>
            ))}
          </div>

          {moneyAnswer && (
            <div className={`mt-4 p-4 rounded-2xl text-white text-center font-black ${ok ? 'bg-emerald-500' : 'bg-red-500'}`}>
              {ok ? '✅ ¡Correcto!' : `❌ Casi. Busca ${money[targetMoney].name}.`}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderTiendita = () => {
    const p = products[shopProduct];
    const total = sumMoney(shopMoney);
    const diff = roundMoney(total - p.price);

    return (
      <div className="space-y-4">
        <ProductGrid active={shopProduct} onPick={k => { setShopProduct(k); setShopMoney([]); }} />

        <div className="grid lg:grid-cols-[1fr_340px] gap-4">
          <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow">
            <div className="font-black text-xl mb-3">Elige dinero</div>
            <MoneyPicker onPick={k => setShopMoney([...shopMoney, k])} compact />
            <PayShortcuts price={p.price} setArr={setShopMoney} />

            <div className="mt-4">
              <MoneyTray arr={shopMoney} />
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4">
              <button onClick={() => setShopMoney(shopMoney.slice(0, -1))} className="p-3 rounded-2xl bg-slate-200 dark:bg-slate-700 font-black">Quitar última</button>
              <button onClick={() => setShopMoney([])} className="p-3 rounded-2xl bg-red-500 text-white font-black">Borrar</button>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-yellow-400/10 border-2 border-yellow-400/30 shadow text-center">
            <div className="text-6xl mb-1">{p.icon}</div>
            <div className="font-black text-2xl">{p.name}</div>
            <div className="font-black text-3xl text-amber-600">{formatMoney(p.price)}</div>
            <div className="mt-3 p-3 rounded-2xl bg-surface-color border-2 border-border-color font-black">
              Pagas: {formatMoney(total)}
            </div>
            <div className="mt-3">
              <ResultBox total={total} price={p.price} />
            </div>
            <ChangeHelp amount={diff} />
          </div>
        </div>
      </div>
    );
  };

  const renderCalculadora = () => {
    const total = sumProducts(cart);
    const paid = sumMoney(cartMoney);
    const diff = roundMoney(paid - total);

    const counts = productKeys
      .map(k => ({ key: k, count: cart.filter(x => x === k).length }))
      .filter(x => x.count > 0);

    return (
      <div className="space-y-4">
        <div className="grid lg:grid-cols-[1fr_340px] gap-4">
          <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow">
            <div className="font-black text-xl mb-1">¿Cuánto debe pagar?</div>
            <p className="text-sm font-bold opacity-75 mb-3">Toca productos para agregarlos al carrito.</p>

            <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(122px, 1fr))' }}>
              {productKeys.map(k => (
                <button
                  key={k}
                  onClick={() => setCart([...cart, k])}
                  className="p-2 rounded-2xl bg-surface-color border-2 border-border-color hover:scale-105 transition-all text-center"
                >
                  <div className="text-3xl">{products[k].icon}</div>
                  <div className="font-black text-[10px] leading-tight">{products[k].name}</div>
                  <div className="font-black text-[10px]">{formatMoney(products[k].price)}</div>
                </button>
              ))}
            </div>

            <div className="mt-4 p-3 rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30 max-h-52 overflow-y-auto">
              <div className="font-black mb-2">Carrito</div>
              {counts.length === 0 ? (
                <div className="text-sm font-bold opacity-70">Agrega productos.</div>
              ) : (
                <div className="space-y-2">
                  {counts.map(x => (
                    <div key={x.key} className="p-2 rounded-2xl bg-surface-color border-2 border-border-color font-black text-sm flex justify-between gap-2">
                      <span>{products[x.key].icon} {products[x.key].name} × {x.count}</span>
                      <span>{formatMoney(products[x.key].price * x.count)}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 mt-4">
              <button onClick={() => setCart(cart.slice(0, -1))} className="p-3 rounded-2xl bg-slate-200 dark:bg-slate-700 font-black">Quitar producto</button>
              <button onClick={() => setCart([])} className="p-3 rounded-2xl bg-red-500 text-white font-black">Vaciar carrito</button>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-green-500/10 border-2 border-green-500/30 shadow text-center">
            <div className="text-5xl mb-1">🧮</div>
            <div className="font-black text-xl">Total a pagar</div>
            <div className="font-black text-4xl">{formatMoney(total)}</div>

            <div className="mt-4 text-left">
              <div className="font-black text-sm mb-2 text-center">Dinero entregado</div>
              <MoneyPicker onPick={k => setCartMoney([...cartMoney, k])} keys={['m1', 'm2', 'm5', 'm10', 'b20', 'b50', 'b100', 'b200', 'b500', 'b1000']} compact />
              {total > 0 && <PayShortcuts price={total} setArr={setCartMoney} />}
            </div>

            <div className="mt-4">
              <MoneyTray arr={cartMoney} empty="Agrega el dinero entregado." />
            </div>

            <div className="mt-3 p-3 rounded-2xl bg-surface-color border-2 border-border-color font-black">
              Entregó: {formatMoney(paid)}
            </div>

            <div className={`mt-3 p-4 rounded-2xl text-white font-black ${
              diff === 0 ? 'bg-emerald-500' : diff < 0 ? 'bg-amber-500' : 'bg-blue-500'
            }`}>
              {diff === 0 ? '✅ No falta nada.' : diff < 0 ? `Falta ${formatMoney(Math.abs(diff))}.` : `Cambio: ${formatMoney(diff)}.`}
            </div>

            <ChangeHelp amount={diff} />

            <div className="grid grid-cols-2 gap-2 mt-4">
              <button onClick={() => setCartMoney(cartMoney.slice(0, -1))} className="p-3 rounded-2xl bg-slate-200 dark:bg-slate-700 font-black text-xs">Quitar dinero</button>
              <button onClick={() => setCartMoney([])} className="p-3 rounded-2xl bg-red-500 text-white font-black text-xs">Borrar pago</button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderPagar = () => {
    const p = products[payProduct];
    const total = sumMoney(payMoney);

    return (
      <div className="space-y-4">
        <ProductGrid active={payProduct} onPick={k => { setPayProduct(k); setPayMoney([]); }} />

        <div className="grid lg:grid-cols-[1fr_320px] gap-4">
          <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow">
            <div className="font-black text-xl mb-3">Paga exacto</div>
            <MoneyPicker onPick={k => setPayMoney([...payMoney, k])} compact />
            <PayShortcuts price={p.price} setArr={setPayMoney} />
            <div className="mt-4"><MoneyTray arr={payMoney} /></div>
            <button onClick={() => setPayMoney([])} className="math-btn w-full mt-4">Borrar pago</button>
          </div>

          <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
            <div className="text-6xl">{p.icon}</div>
            <div className="font-black text-xl">{p.name}</div>
            <div className="font-black text-2xl">Precio: {formatMoney(p.price)}</div>
            <div className="font-black text-2xl mt-3">Pagas: {formatMoney(total)}</div>
            <div className="mt-4"><ResultBox total={total} price={p.price} /></div>
          </div>
        </div>
      </div>
    );
  };

  const renderCambio = () => {
    const p = products[changeProduct];
    const paid = sumMoney(changeMoney);
    const change = roundMoney(paid - p.price);

    return (
      <div className="space-y-4">
        <ProductGrid active={changeProduct} onPick={k => { setChangeProduct(k); setChangeMoney([]); }} />

        <div className="grid lg:grid-cols-[1fr_340px] gap-4">
          <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow">
            <div className="font-black text-xl mb-1">Calculadora de cambio</div>
            <p className="text-sm font-bold opacity-75 mb-3">Elige cuánto dinero entrega el comprador.</p>
            <MoneyPicker onPick={k => setChangeMoney([...changeMoney, k])} compact />
            <PayShortcuts price={p.price} setArr={setChangeMoney} />
            <div className="mt-4"><MoneyTray arr={changeMoney} empty="Dinero entregado." /></div>
            <button onClick={() => setChangeMoney([])} className="math-btn w-full mt-4">Borrar pago</button>
          </div>

          <div className="p-5 rounded-3xl bg-blue-500/10 border-2 border-blue-500/30 shadow text-center">
            <div className="text-6xl">{p.icon}</div>
            <div className="font-black text-xl">{p.name}</div>
            <div className="font-black text-2xl">Debe pagar: {formatMoney(p.price)}</div>
            <div className="font-black text-2xl">Entregó: {formatMoney(paid)}</div>

            <div className={`mt-4 p-4 rounded-2xl text-white font-black ${
              change === 0 ? 'bg-emerald-500' : change < 0 ? 'bg-red-500' : 'bg-blue-500'
            }`}>
              {change === 0 ? '✅ No hay cambio.' : change < 0 ? `Falta ${formatMoney(Math.abs(change))}.` : `Cambio: ${formatMoney(change)}.`}
            </div>

            <ChangeHelp amount={change} />
          </div>
        </div>
      </div>
    );
  };

  const renderEquivalencias = () => {
    const targetValue = money[equivTarget].value;
    const total = sumMoney(equivMoney);
    const diff = roundMoney(total - targetValue);

    return (
      <div className="space-y-4">
        <div className="grid gap-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(122px, 1fr))' }}>
          {moneyKeys.map(k => (
            <button
              key={k}
              onClick={() => {
                setEquivTarget(k);
                setEquivMoney([]);
              }}
              className={`p-2 rounded-2xl font-black text-xs ${equivTarget === k ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color'}`}
            >
              {money[k].short}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-[280px_1fr] gap-4">
          <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
            <div className="font-black text-xl mb-3">Forma esta cantidad</div>
            <div className="flex justify-center"><MoneyPiece item={equivTarget} size="md" /></div>
            <div className="font-black text-2xl mt-3">{formatMoney(targetValue)}</div>
            <button onClick={() => setEquivMoney(suggestedEquivalent(equivTarget))} className="math-btn w-full mt-4">Usar ayuda</button>
          </div>

          <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow">
            <div className="font-black text-xl mb-3">Elige dinero equivalente</div>
            <MoneyPicker onPick={k => setEquivMoney([...equivMoney, k])} compact />
            <div className="mt-4"><MoneyTray arr={equivMoney} /></div>
            <div className={`mt-4 p-4 rounded-2xl text-white text-center font-black ${diff === 0 ? 'bg-emerald-500' : diff < 0 ? 'bg-amber-500' : 'bg-red-500'}`}>
              {diff === 0 ? '✅ Misma cantidad.' : diff < 0 ? `Faltan ${formatMoney(Math.abs(diff))}.` : `Sobran ${formatMoney(diff)}.`}
            </div>
            <button onClick={() => setEquivMoney([])} className="math-btn w-full mt-4">Reiniciar</button>
          </div>
        </div>
      </div>
    );
  };

  const renderAlcancia = () => {
    const total = sumMoney(piggyMoney);

    return (
      <div className="space-y-4">
        <div className="p-5 rounded-3xl bg-pink-500/10 border-2 border-pink-500/30 shadow text-center">
          <div className="text-6xl mb-1">🐷</div>
          <div className="font-black text-2xl">Alcancía</div>
          <div className="font-black text-4xl text-pink-500">{formatMoney(total)}</div>
          <div className="mt-4"><MoneyTray arr={piggyMoney} /></div>
        </div>

        <MoneyPicker onPick={k => setPiggyMoney([...piggyMoney, k])} compact />

        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => setPiggyMoney(piggyMoney.slice(0, -1))} className="p-3 rounded-2xl bg-slate-200 dark:bg-slate-700 font-black">Quitar última</button>
          <button onClick={() => setPiggyMoney([])} className="math-btn py-3">Vaciar alcancía</button>
        </div>
      </div>
    );
  };

  const renderComparar = () => {
    const totalA = sumMoney(compareA);
    const totalB = sumMoney(compareB);

    const panel = (name: string, arr: MoneyKey[], setArr: (v: MoneyKey[]) => void) => (
      <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow">
        <div className="font-black text-xl text-center mb-3">{name}: {formatMoney(sumMoney(arr))}</div>
        <MoneyTray arr={arr} />
        <div className="mt-3">
          <MoneyPicker keys={moneyKeys} onPick={k => setArr([...arr, k])} compact />
        </div>
        <button onClick={() => setArr([])} className="mt-3 w-full p-3 rounded-2xl bg-red-500 text-white font-black">Borrar</button>
      </div>
    );

    return (
      <div className="space-y-4">
        <div className="grid lg:grid-cols-[1fr_100px_1fr] gap-4 items-center">
          {panel('Grupo A', compareA, setCompareA)}
          <div className="p-4 rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30 text-center shadow">
            <div className="text-5xl">⚖️</div>
            <div className="font-black text-xs mt-2">
              {totalA > totalB ? 'A tiene más' : totalA < totalB ? 'B tiene más' : 'Iguales'}
            </div>
          </div>
          {panel('Grupo B', compareB, setCompareB)}
        </div>

        <div className="lab-formula text-center text-lg">
          {totalA > totalB ? `A tiene ${formatMoney(roundMoney(totalA - totalB))} más.` : totalA < totalB ? `B tiene ${formatMoney(roundMoney(totalB - totalA))} más.` : 'Los dos grupos tienen igual cantidad.'}
        </div>
      </div>
    );
  };

  const renderReto = () => {
    const p = products[challengeProduct];
    const total = sumMoney(challengeMoney);
    const diff = roundMoney(total - p.price);

    return (
      <div className="space-y-4">
        <ProductGrid active={challengeProduct} onPick={k => { setChallengeProduct(k); setChallengeMoney([]); }} />

        <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow">
          <div className="font-black text-xl mb-1">Reto con ayuda</div>
          <p className="text-sm font-bold opacity-75 mb-4">
            Compra {p.icon} <b>{p.name}</b>. Debe pagar exactamente {formatMoney(p.price)}.
          </p>

          <MoneyPicker onPick={k => setChallengeMoney([...challengeMoney, k])} compact />
          <div className="mt-4"><MoneyTray arr={challengeMoney} /></div>

          <div className={`mt-4 p-4 rounded-2xl text-white text-center font-black ${diff === 0 ? 'bg-emerald-500' : diff < 0 ? 'bg-amber-500' : 'bg-red-500'}`}>
            {diff === 0 ? '✅ ¡Reto completo!' : diff < 0 ? `Llevas ${formatMoney(total)}. Faltan ${formatMoney(Math.abs(diff))}.` : `Llevas ${formatMoney(total)}. Te pasaste por ${formatMoney(diff)}.`}
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4">
            <button onClick={() => setChallengeMoney(makeChange(p.price))} className="p-3 rounded-2xl bg-emerald-500 text-white font-black">Mostrar una forma</button>
            <button onClick={() => setChallengeMoney([])} className="math-btn py-3">Reiniciar</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <TopicCard
      icon="🪙"
      title="Dinero de Juguete"
      color="#f59e0b"
      desc="Reconoce monedas y billetes mexicanos de juguete, compra en la tiendita, calcula cuánto pagar, cuánto falta y cuánto cambio devolver."
    >
      <div className="lab-container space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {modes.map(m => (
            <button
              key={m.id}
              onClick={() => {
                setMode(m.id);
                resetMode();
              }}
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
        {mode === 'reconocer' && renderReconocer()}
        {mode === 'tiendita' && renderTiendita()}
        {mode === 'calculadora' && renderCalculadora()}
        {mode === 'pagar' && renderPagar()}
        {mode === 'cambio' && renderCambio()}
        {mode === 'equivalencias' && renderEquivalencias()}
        {mode === 'alcancia' && renderAlcancia()}
        {mode === 'comparar' && renderComparar()}
        {mode === 'reto' && renderReto()}
      </div>
    </TopicCard>
  );
};







export const DatosGraficos: React.FC = () => {
  type Mode =
    | 'votar'
    | 'tabla'
    | 'pictograma'
    | 'preguntas'
    | 'bloques'
    | 'estampas'
    | 'clima'
    | 'animales'
    | 'crear'
    | 'reto';

  type FruitKey = 'manzana' | 'platano' | 'uva' | 'fresa';
  type AnimalKey = 'perro' | 'gato' | 'pez' | 'ave';
  type WeatherKey = 'sol' | 'lluvia' | 'nube' | 'viento';

  const [mode, setMode] = useState<Mode>('votar');

  const [fruitVotes, setFruitVotes] = useState<Record<FruitKey, number>>({
    manzana: 3,
    platano: 2,
    uva: 4,
    fresa: 1,
  });

  const [animalVotes, setAnimalVotes] = useState<Record<AnimalKey, number>>({
    perro: 4,
    gato: 3,
    pez: 1,
    ave: 2,
  });

  const [weatherVotes, setWeatherVotes] = useState<Record<WeatherKey, number>>({
    sol: 5,
    lluvia: 2,
    nube: 3,
    viento: 1,
  });

  const [stampTable, setStampTable] = useState<FruitKey[]>([]);
  const [customLabels, setCustomLabels] = useState(['Rojo', 'Azul', 'Verde']);
  const [customVotes, setCustomVotes] = useState([2, 4, 1]);
  const [questionSet, setQuestionSet] = useState<'frutas' | 'animales' | 'clima'>('frutas');
  const [questionAnswer, setQuestionAnswer] = useState<string | null>(null);

  const modes: { id: Mode; label: string; icon: string }[] = [
    { id: 'votar', label: 'Votar', icon: '🙋' },
    { id: 'tabla', label: 'Tabla', icon: '📋' },
    { id: 'pictograma', label: 'Pictograma', icon: '😀' },
    { id: 'preguntas', label: 'Más / menos', icon: '❓' },
    { id: 'bloques', label: 'Bloques', icon: '🧱' },
    { id: 'estampas', label: 'Estampas', icon: '⭐' },
    { id: 'clima', label: 'Clima', icon: '🌦️' },
    { id: 'animales', label: 'Animales', icon: '🐾' },
    { id: 'crear', label: 'Crear gráfica', icon: '🎨' },
    { id: 'reto', label: 'Reto', icon: '🎯' },
  ];

  const fruits: Record<FruitKey, { name: string; icon: string; color: string }> = {
    manzana: { name: 'Manzana', icon: '🍎', color: '#ef4444' },
    platano: { name: 'Plátano', icon: '🍌', color: '#eab308' },
    uva: { name: 'Uva', icon: '🍇', color: '#8b5cf6' },
    fresa: { name: 'Fresa', icon: '🍓', color: '#ec4899' },
  };

  const animals: Record<AnimalKey, { name: string; icon: string; color: string }> = {
    perro: { name: 'Perro', icon: '🐶', color: '#f59e0b' },
    gato: { name: 'Gato', icon: '🐱', color: '#a855f7' },
    pez: { name: 'Pez', icon: '🐟', color: '#06b6d4' },
    ave: { name: 'Ave', icon: '🐦', color: '#22c55e' },
  };

  const weather: Record<WeatherKey, { name: string; icon: string; color: string }> = {
    sol: { name: 'Sol', icon: '☀️', color: '#facc15' },
    lluvia: { name: 'Lluvia', icon: '🌧️', color: '#3b82f6' },
    nube: { name: 'Nube', icon: '☁️', color: '#94a3b8' },
    viento: { name: 'Viento', icon: '💨', color: '#14b8a6' },
  };

  const fruitKeys = Object.keys(fruits) as FruitKey[];
  const animalKeys = Object.keys(animals) as AnimalKey[];
  const weatherKeys = Object.keys(weather) as WeatherKey[];

  const maxValue = (values: number[]) => Math.max(...values);
  const minValue = (values: number[]) => Math.min(...values);

  const topKey = <T extends string>(data: Record<T, number>) => {
    const keys = Object.keys(data) as T[];
    return keys.reduce((best, k) => data[k] > data[best] ? k : best, keys[0]);
  };

  const lowKey = <T extends string>(data: Record<T, number>) => {
    const keys = Object.keys(data) as T[];
    return keys.reduce((best, k) => data[k] < data[best] ? k : best, keys[0]);
  };

  const FruitButton = ({ k }: { k: FruitKey }) => (
    <button
      onClick={() => setFruitVotes({ ...fruitVotes, [k]: fruitVotes[k] + 1 })}
      className="p-4 rounded-3xl bg-surface-color border-2 border-border-color hover:scale-105 transition-all text-center"
    >
      <div className="text-5xl mb-2">{fruits[k].icon}</div>
      <div className="font-black">{fruits[k].name}</div>
      <div className="text-sm font-bold opacity-70">{fruitVotes[k]} voto(s)</div>
    </button>
  );

  const TableRows = ({ data, meta }: { data: Record<string, number>; meta: Record<string, { name: string; icon: string; color: string }> }) => (
    <div className="space-y-2">
      {Object.keys(data).map(k => (
        <div key={k} className="p-3 rounded-2xl bg-surface-color border-2 border-border-color grid grid-cols-[80px_1fr_60px] gap-3 items-center">
          <div className="font-black text-sm">{meta[k].icon} {meta[k].name}</div>
          <div className="h-8 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
            <div className="h-full rounded-full" style={{ width: `${data[k] * 12}%`, background: meta[k].color }} />
          </div>
          <div className="font-black text-center">{data[k]}</div>
        </div>
      ))}
    </div>
  );

  const Pictogram = ({ data, meta, symbol = '😀' }: { data: Record<string, number>; meta: Record<string, { name: string; icon: string; color: string }>; symbol?: string }) => (
    <div className="space-y-3">
      {Object.keys(data).map(k => (
        <div key={k} className="p-4 rounded-3xl bg-surface-color border-2 border-border-color">
          <div className="font-black mb-2">{meta[k].icon} {meta[k].name}</div>
          <div className="flex gap-2 flex-wrap text-3xl">
            {Array.from({ length: data[k] }).map((_, i) => (
              <span key={i}>{symbol}</span>
            ))}
          </div>
          <div className="text-xs font-bold opacity-70 mt-2">Cada {symbol} representa 1 niño.</div>
        </div>
      ))}
    </div>
  );

  const BlocksChart = ({ data, meta }: { data: Record<string, number>; meta: Record<string, { name: string; icon: string; color: string }> }) => (
    <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow">
      <div className="min-h-80 flex items-end justify-center gap-4">
        {Object.keys(data).map(k => (
          <div key={k} className="flex flex-col items-center gap-1">
            {Array.from({ length: data[k] }).map((_, i) => (
              <div key={i} className="w-14 h-10 rounded-xl border-2 border-white shadow" style={{ background: meta[k].color }} />
            ))}
            <div className="text-3xl mt-2">{meta[k].icon}</div>
            <div className="font-black text-xs">{meta[k].name}</div>
            <div className="font-black text-sm">{data[k]}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderVotar = () => (
    <div className="space-y-4">
      <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow">
        <div className="font-black text-xl mb-1">Vota por tu fruta favorita</div>
        <p className="text-sm font-bold opacity-75 mb-4">Como levantar la mano: cada toque suma un voto.</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {fruitKeys.map(k => <FruitButton key={k} k={k} />)}
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4">
          <button
            onClick={() => setFruitVotes({ manzana: 0, platano: 0, uva: 0, fresa: 0 })}
            className="p-3 rounded-2xl bg-red-500 text-white font-black"
          >
            Borrar votos
          </button>
          <button
            onClick={() => setFruitVotes({ manzana: 3, platano: 2, uva: 4, fresa: 1 })}
            className="math-btn py-3"
          >
            Ejemplo
          </button>
        </div>
      </div>

      <div className="lab-formula text-center text-base">
        Votar sirve para elegir y luego contar cuántos eligieron cada opción.
      </div>
    </div>
  );

  const renderTabla = () => (
    <div className="space-y-4">
      <div className="p-5 rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30 shadow">
        <div className="font-black text-xl mb-1">Tabla de elección</div>
        <p className="text-sm font-bold opacity-75 mb-4">Cada fila muestra una fruta y sus votos.</p>
        <TableRows data={fruitVotes} meta={fruits} />
      </div>
    </div>
  );

  const renderPictograma = () => (
    <div className="space-y-4">
      <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow">
        <div className="font-black text-xl mb-1">Pictograma simple</div>
        <p className="text-sm font-bold opacity-75 mb-4">Una carita representa un niño.</p>
        <Pictogram data={fruitVotes} meta={fruits} symbol="😀" />
      </div>
    </div>
  );

  const currentQuestionData = questionSet === 'frutas'
    ? { data: fruitVotes, meta: fruits }
    : questionSet === 'animales'
      ? { data: animalVotes, meta: animals }
      : { data: weatherVotes, meta: weather };

  const renderPreguntas = () => {
    const data = currentQuestionData.data;
    const meta = currentQuestionData.meta as Record<string, { name: string; icon: string; color: string }>;
    const most = topKey(data as Record<string, number>);
    const least = lowKey(data as Record<string, number>);
    const okMost = questionAnswer === `mas:${most}`;
    const okLeast = questionAnswer === `menos:${least}`;

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          {(['frutas', 'animales', 'clima'] as const).map(k => (
            <button
              key={k}
              onClick={() => {
                setQuestionSet(k);
                setQuestionAnswer(null);
              }}
              className={`p-3 rounded-2xl font-black ${questionSet === k ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color'}`}
            >
              {k}
            </button>
          ))}
        </div>

        <TableRows data={data as Record<string, number>} meta={meta} />

        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-5 rounded-3xl bg-emerald-500/10 border-2 border-emerald-500/30 shadow">
            <div className="font-black text-xl mb-3">¿De qué hay más?</div>
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(data).map(k => (
                <button
                  key={k}
                  onClick={() => setQuestionAnswer(`mas:${k}`)}
                  className={`p-3 rounded-2xl font-black ${
                    questionAnswer === `mas:${k}`
                      ? okMost ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
                      : 'bg-surface-color border-2 border-border-color'
                  }`}
                >
                  {meta[k].icon} {meta[k].name}
                </button>
              ))}
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-amber-500/10 border-2 border-amber-500/30 shadow">
            <div className="font-black text-xl mb-3">¿De qué hay menos?</div>
            <div className="grid grid-cols-2 gap-2">
              {Object.keys(data).map(k => (
                <button
                  key={k}
                  onClick={() => setQuestionAnswer(`menos:${k}`)}
                  className={`p-3 rounded-2xl font-black ${
                    questionAnswer === `menos:${k}`
                      ? okLeast ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
                      : 'bg-surface-color border-2 border-border-color'
                  }`}
                >
                  {meta[k].icon} {meta[k].name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {questionAnswer && (
          <div className={`p-4 rounded-2xl text-white text-center font-black ${(okMost || okLeast) ? 'bg-emerald-500' : 'bg-red-500'}`}>
            {(okMost || okLeast) ? '✅ ¡Correcto!' : `❌ Revisa los números de la tabla.`}
          </div>
        )}
      </div>
    );
  };

  const renderBloques = () => (
    <div className="space-y-4">
      <div className="font-black text-xl">Gráfica con bloques</div>
      <BlocksChart data={fruitVotes} meta={fruits} />
      <div className="lab-formula text-center text-base">
        Una torre más alta significa más votos.
      </div>
    </div>
  );

  const renderEstampas = () => {
    const addStamp = (k: FruitKey) => setStampTable([...stampTable, k]);
    const counts = fruitKeys.reduce((acc, k) => ({ ...acc, [k]: stampTable.filter(x => x === k).length }), {} as Record<FruitKey, number>);

    return (
      <div className="space-y-4">
        <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow">
          <div className="font-black text-xl mb-1">Pegar estampas en una tabla</div>
          <p className="text-sm font-bold opacity-75 mb-4">Toca una fruta para pegar una estampa.</p>

          <div className="grid grid-cols-4 gap-2 mb-4">
            {fruitKeys.map(k => (
              <button key={k} onClick={() => addStamp(k)} className="p-3 rounded-2xl bg-surface-color border-2 border-border-color text-4xl hover:scale-105">
                {fruits[k].icon}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-4 gap-3">
            {fruitKeys.map(k => (
              <div key={k} className="p-4 rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30 min-h-44">
                <div className="font-black text-center mb-2">{fruits[k].icon} {fruits[k].name}</div>
                <div className="flex gap-1 flex-wrap text-2xl justify-center">
                  {stampTable.filter(x => x === k).map((_, i) => <span key={i}>⭐</span>)}
                </div>
                <div className="font-black text-center mt-2">{counts[k]}</div>
              </div>
            ))}
          </div>

          <button onClick={() => setStampTable([])} className="math-btn w-full mt-4">Borrar estampas</button>
        </div>
      </div>
    );
  };

  const renderClima = () => (
    <div className="space-y-4">
      <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow">
        <div className="font-black text-xl mb-1">Registro del clima</div>
        <p className="text-sm font-bold opacity-75 mb-4">Toca el clima para sumar un día.</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {weatherKeys.map(k => (
            <button
              key={k}
              onClick={() => setWeatherVotes({ ...weatherVotes, [k]: weatherVotes[k] + 1 })}
              className="p-4 rounded-3xl bg-surface-color border-2 border-border-color hover:scale-105 text-center"
            >
              <div className="text-5xl mb-2">{weather[k].icon}</div>
              <div className="font-black">{weather[k].name}</div>
              <div className="font-black text-sm opacity-70">{weatherVotes[k]}</div>
            </button>
          ))}
        </div>
      </div>

      <BlocksChart data={weatherVotes} meta={weather} />
    </div>
  );

  const renderAnimales = () => (
    <div className="space-y-4">
      <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow">
        <div className="font-black text-xl mb-1">Mascota favorita</div>
        <p className="text-sm font-bold opacity-75 mb-4">Vota por un animal.</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {animalKeys.map(k => (
            <button
              key={k}
              onClick={() => setAnimalVotes({ ...animalVotes, [k]: animalVotes[k] + 1 })}
              className="p-4 rounded-3xl bg-surface-color border-2 border-border-color hover:scale-105 text-center"
            >
              <div className="text-5xl mb-2">{animals[k].icon}</div>
              <div className="font-black">{animals[k].name}</div>
              <div className="font-black text-sm opacity-70">{animalVotes[k]}</div>
            </button>
          ))}
        </div>
      </div>

      <Pictogram data={animalVotes} meta={animals} symbol="🧒" />
    </div>
  );

  const renderCrear = () => {
    const update = (i: number, delta: number) => {
      const next = [...customVotes];
      next[i] = Math.max(0, Math.min(10, next[i] + delta));
      setCustomVotes(next);
    };

    const meta = customLabels.reduce((acc, label, i) => ({
      ...acc,
      [label]: {
        name: label,
        icon: i === 0 ? '🔴' : i === 1 ? '🔵' : '🟢',
        color: i === 0 ? '#ef4444' : i === 1 ? '#3b82f6' : '#22c55e',
      }
    }), {} as Record<string, { name: string; icon: string; color: string }>);

    const data = customLabels.reduce((acc, label, i) => ({ ...acc, [label]: customVotes[i] }), {} as Record<string, number>);

    return (
      <div className="space-y-4">
        <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow">
          <div className="font-black text-xl mb-1">Crear gráfica con botones</div>
          <p className="text-sm font-bold opacity-75 mb-4">Sube o baja los datos y mira cómo cambia la gráfica.</p>

          <div className="grid md:grid-cols-3 gap-3">
            {customLabels.map((label, i) => (
              <div key={label} className="p-4 rounded-3xl bg-black/5 border-2 border-border-color text-center">
                <div className="font-black text-xl">{label}</div>
                <div className="text-3xl font-black my-2">{customVotes[i]}</div>
                <div className="grid grid-cols-2 gap-2">
                  <button onClick={() => update(i, -1)} className="p-3 rounded-2xl bg-slate-200 dark:bg-slate-700 font-black">-</button>
                  <button onClick={() => update(i, 1)} className="math-btn py-3">+</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <BlocksChart data={data} meta={meta} />
      </div>
    );
  };

  const renderReto = () => {
    const most = topKey(fruitVotes);
    const least = lowKey(fruitVotes);
    const diff = fruitVotes[most] - fruitVotes[least];

    return (
      <div className="space-y-4">
        <div className="p-5 rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30 shadow">
          <div className="font-black text-xl mb-1">Reto de lectura de gráfica</div>
          <p className="text-sm font-bold opacity-75 mb-4">Observa la gráfica y contesta oralmente.</p>

          <BlocksChart data={fruitVotes} meta={fruits} />

          <div className="grid md:grid-cols-3 gap-3 mt-4 text-center">
            <div className="p-4 rounded-3xl bg-surface-color border-2 border-border-color">
              <div className="text-4xl">{fruits[most].icon}</div>
              <div className="font-black">Hay más de</div>
              <div className="font-black text-xl">{fruits[most].name}</div>
            </div>
            <div className="p-4 rounded-3xl bg-surface-color border-2 border-border-color">
              <div className="text-4xl">{fruits[least].icon}</div>
              <div className="font-black">Hay menos de</div>
              <div className="font-black text-xl">{fruits[least].name}</div>
            </div>
            <div className="p-4 rounded-3xl bg-surface-color border-2 border-border-color">
              <div className="text-4xl">🔢</div>
              <div className="font-black">Diferencia</div>
              <div className="font-black text-xl">{diff}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <TopicCard
      icon="📊"
      title="Recolección de Datos y Gráficos"
      color="#3b82f6"
      desc="Vota, cuenta, pega estampas, interpreta pictogramas, responde qué hay más o menos y construye gráficas con bloques."
    >
      <div className="lab-container space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {modes.map(m => (
            <button
              key={m.id}
              onClick={() => {
                setMode(m.id);
                setQuestionAnswer(null);
              }}
              className={`p-3 rounded-2xl font-black text-xs transition-all ${
                mode === m.id ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color hover:scale-105'
              }`}
            >
              <span className="text-2xl block mb-1">{m.icon}</span>
              {m.label}
            </button>
          ))}
        </div>

        {mode === 'votar' && renderVotar()}
        {mode === 'tabla' && renderTabla()}
        {mode === 'pictograma' && renderPictograma()}
        {mode === 'preguntas' && renderPreguntas()}
        {mode === 'bloques' && renderBloques()}
        {mode === 'estampas' && renderEstampas()}
        {mode === 'clima' && renderClima()}
        {mode === 'animales' && renderAnimales()}
        {mode === 'crear' && renderCrear()}
        {mode === 'reto' && renderReto()}
      </div>
    </TopicCard>
  );
};


export const TiempoCalendario: React.FC = () => {
  type Mode =
    | 'dia-noche'
    | 'momentos'
    | 'semana'
    | 'calendario'
    | 'evento'
    | 'mes'
    | 'meses'
    | 'estaciones'
    | 'ordenar-estaciones';

  const [mode, setMode] = useState<Mode>('dia-noche');

  const [scene, setScene] = useState<'sol' | 'luna' | 'mixto'>('sol');
  const [momentTarget, setMomentTarget] = useState<'manana' | 'tarde' | 'noche'>('manana');
  const [momentAnswer, setMomentAnswer] = useState<string | null>(null);

  const [weekdayPick, setWeekdayPick] = useState<string[]>([]);
  const [eventDay, setEventDay] = useState(15);

  const [monthPick, setMonthPick] = useState<string | null>(null);
  const [songIndex, setSongIndex] = useState(0);

  const [seasonTarget, setSeasonTarget] = useState<'primavera' | 'verano' | 'otono' | 'invierno'>('primavera');
  const [seasonAnswer, setSeasonAnswer] = useState<string | null>(null);

  const [seasonOrderPick, setSeasonOrderPick] = useState<string[]>([]);

  const today = new Date();
  const currentDay = today.getDate();

  const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
  const months = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const monthIndex = today.getMonth();
  const currentMonth = months[monthIndex];
  const currentYear = today.getFullYear();

  const firstDay = new Date(currentYear, monthIndex, 1).getDay();
  const daysInMonth = new Date(currentYear, monthIndex + 1, 0).getDate();

  const monthSong = [
    'Enero', 'Febrero', 'Marzo', 'Abril',
    'Mayo', 'Junio', 'Julio', 'Agosto',
    'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const seasonInfo = {
    primavera: {
      icon: '🌸',
      name: 'Primavera',
      climate: 'Flores, clima suave y plantas creciendo.',
      examples: ['🌷', '🐝', '🌿']
    },
    verano: {
      icon: '☀️',
      name: 'Verano',
      climate: 'Hace calor, hay sol y vacaciones.',
      examples: ['🏖️', '🍉', '😎']
    },
    otono: {
      icon: '🍂',
      name: 'Otoño',
      climate: 'Caen hojas y el clima se vuelve fresco.',
      examples: ['🍁', '🌰', '🧥']
    },
    invierno: {
      icon: '❄️',
      name: 'Invierno',
      climate: 'Hace frío y a veces cae nieve.',
      examples: ['⛄', '🧣', '☕']
    }
  } as const;

  const momentInfo = {
    manana: {
      icon: '🌅',
      name: 'Mañana',
      activity: 'Desayunar',
      extra: 'Empezamos el día.'
    },
    tarde: {
      icon: '🌞',
      name: 'Tarde',
      activity: 'Merienda',
      extra: 'Jugamos, estudiamos o descansamos.'
    },
    noche: {
      icon: '🌙',
      name: 'Noche',
      activity: 'Dormir',
      extra: 'Es momento de descansar.'
    }
  } as const;

  const modes: { id: Mode; label: string; icon: string }[] = [
    { id: 'dia-noche', label: 'Día / noche', icon: '🌞' },
    { id: 'momentos', label: 'Momentos', icon: '🕒' },
    { id: 'semana', label: 'Semana', icon: '📅' },
    { id: 'calendario', label: 'Calendario', icon: '🗓️' },
    { id: 'evento', label: 'Evento', icon: '🎉' },
    { id: 'mes', label: 'Mes actual', icon: '📆' },
    { id: 'meses', label: 'Meses', icon: '🎵' },
    { id: 'estaciones', label: 'Estaciones', icon: '🌦️' },
    { id: 'ordenar-estaciones', label: 'Ordenar', icon: '🔁' },
  ];

  const resetMode = () => {
    setMomentAnswer(null);
    setWeekdayPick([]);
    setMonthPick(null);
    setSeasonAnswer(null);
    setSeasonOrderPick([]);
  };

  const renderDiaNoche = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        {[
          { id: 'sol', label: 'Día', icon: '☀️' },
          { id: 'luna', label: 'Noche', icon: '🌙' },
          { id: 'mixto', label: 'Comparar', icon: '🌗' },
        ].map(opt => (
          <button
            key={opt.id}
            onClick={() => setScene(opt.id as 'sol' | 'luna' | 'mixto')}
            className={`p-3 rounded-2xl font-black text-xs transition-all ${
              scene === opt.id ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color'
            }`}
          >
            <span className="text-2xl block mb-1">{opt.icon}</span>
            {opt.label}
          </button>
        ))}
      </div>

      {scene !== 'mixto' ? (
        <div className="p-6 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
          <div className={`mx-auto max-w-xl rounded-3xl p-6 border-2 ${
            scene === 'sol'
              ? 'bg-yellow-400/20 border-yellow-400/40'
              : 'bg-indigo-500/20 border-indigo-500/40'
          }`}>
            <div className="text-8xl mb-4">{scene === 'sol' ? '☀️' : '🌙'}</div>
            <div className="text-4xl mb-3">{scene === 'sol' ? '🏠🚶🌳' : '🏠🛏️⭐'}</div>
            <div className="font-black text-xl">
              {scene === 'sol' ? 'Es de día' : 'Es de noche'}
            </div>
            <div className="text-sm font-bold opacity-75 mt-2">
              {scene === 'sol'
                ? 'Durante el día vemos el sol y hacemos actividades.'
                : 'Durante la noche vemos la luna y descansamos.'}
            </div>
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-6 rounded-3xl bg-yellow-400/15 border-2 border-yellow-400/40 shadow text-center">
            <div className="text-7xl mb-3">☀️</div>
            <div className="font-black text-xl">Día</div>
            <div className="text-3xl mt-3">🏫🍎⚽</div>
            <div className="text-sm font-bold opacity-75 mt-3">
              Luz, actividades, escuela y juego.
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-indigo-500/15 border-2 border-indigo-500/40 shadow text-center">
            <div className="text-7xl mb-3">🌙</div>
            <div className="font-black text-xl">Noche</div>
            <div className="text-3xl mt-3">🛏️⭐😴</div>
            <div className="text-sm font-bold opacity-75 mt-3">
              Oscuro, estrellas y descanso.
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderMomentos = () => {
    const current = momentInfo[momentTarget];
    const ok = momentAnswer === current.name;

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          {(['manana', 'tarde', 'noche'] as const).map(k => (
            <button
              key={k}
              onClick={() => {
                setMomentTarget(k);
                setMomentAnswer(null);
              }}
              className={`p-3 rounded-2xl font-black text-xs transition-all ${
                momentTarget === k ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color'
              }`}
            >
              <span className="text-2xl block mb-1">{momentInfo[k].icon}</span>
              {momentInfo[k].name}
            </button>
          ))}
        </div>

        <div className="p-6 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
          <div className="text-xs font-black uppercase opacity-70 mb-2">Relaciona actividad y momento</div>
          <div className="text-7xl mb-3">{current.icon}</div>
          <div className="font-black text-2xl mb-2">{current.activity}</div>
          <div className="text-sm font-bold opacity-75 mb-5">{current.extra}</div>

          <div className="grid grid-cols-3 gap-2">
            {['Mañana', 'Tarde', 'Noche'].map(opt => (
              <button
                key={opt}
                onClick={() => setMomentAnswer(opt)}
                className={`p-4 rounded-2xl font-black border-2 transition-all ${
                  momentAnswer === opt
                    ? opt === current.name
                      ? 'bg-emerald-500 text-white border-emerald-500 scale-105'
                      : 'bg-red-500 text-white border-red-500'
                    : 'bg-surface-color border-border-color'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          {momentAnswer && (
            <div className={`mt-4 p-4 rounded-2xl text-white font-black ${ok ? 'bg-emerald-500' : 'bg-red-500'}`}>
              {ok ? '✅ ¡Muy bien!' : `❌ Casi. "${current.activity}" va con ${current.name.toLowerCase()}.`}
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-3 gap-3">
          {Object.values(momentInfo).map(item => (
            <div key={item.name} className="p-4 rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30 text-center">
              <div className="text-4xl mb-2">{item.icon}</div>
              <div className="font-black">{item.name}</div>
              <div className="text-sm font-bold opacity-75">{item.activity}</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSemana = () => {
    const correct = days;
    const ok = weekdayPick.length === correct.length && weekdayPick.every((d, i) => d === correct[i]);

    const addDay = (day: string) => {
      if (!weekdayPick.includes(day)) setWeekdayPick([...weekdayPick, day]);
    };

    return (
      <div className="space-y-4">
        <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow">
          <div className="font-black text-xl mb-1">Días de la semana</div>
          <p className="text-sm font-bold opacity-75 mb-4">Toca los días en orden.</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {[...days].reverse().map(day => (
              <button
                key={day}
                disabled={weekdayPick.includes(day)}
                onClick={() => addDay(day)}
                className={`p-3 rounded-2xl font-black text-sm transition-all ${
                  weekdayPick.includes(day)
                    ? 'opacity-40 bg-slate-200 dark:bg-slate-700'
                    : 'bg-surface-color border-2 border-border-color hover:scale-105'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          <div className="mt-4 p-4 rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30 flex gap-2 flex-wrap justify-center">
            {weekdayPick.length === 0 ? (
              <span className="text-sm font-bold opacity-70">Tu secuencia aparecerá aquí.</span>
            ) : (
              weekdayPick.map(d => (
                <span key={d} className="px-3 py-2 rounded-full bg-surface-color border-2 border-border-color font-black text-sm">
                  {d}
                </span>
              ))
            )}
          </div>

          {weekdayPick.length === correct.length && (
            <div className={`mt-4 p-4 rounded-2xl text-white text-center font-black ${ok ? 'bg-emerald-500' : 'bg-red-500'}`}>
              {ok ? '✅ ¡Orden correcto!' : '❌ Casi. Revisa el orden de los días.'}
            </div>
          )}
        </div>

        <button onClick={() => setWeekdayPick([])} className="math-btn w-full">Reiniciar semana</button>
      </div>
    );
  };

  const renderCalendario = () => (
    <div className="space-y-4">
      <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow">
        <div className="font-black text-2xl text-center mb-1">{currentMonth} {currentYear}</div>
        <div className="text-sm font-bold opacity-75 text-center mb-4">
          Hoy es {days[today.getDay()]}, {currentDay} de {currentMonth}.
        </div>

        <div className="grid grid-cols-7 gap-2 mb-2">
          {days.map(d => (
            <div key={d} className="p-2 text-center text-xs font-black uppercase opacity-70">
              {d.slice(0, 3)}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`blank-${i}`} className="h-12 rounded-2xl bg-black/5 border border-transparent" />
          ))}

          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const isToday = day === currentDay;
            const isPast = day < currentDay;

            return (
              <div
                key={day}
                className={`h-12 rounded-2xl border-2 flex items-center justify-center font-black text-sm relative ${
                  isToday
                    ? 'bg-[var(--primary-color)] text-white border-[var(--primary-color)] scale-105'
                    : isPast
                      ? 'bg-slate-200 dark:bg-slate-700 border-border-color opacity-80'
                      : 'bg-surface-color border-border-color'
                }`}
              >
                {day}
                {isPast && !isToday && (
                  <span className="absolute inset-0 flex items-center justify-center text-red-500 text-xl pointer-events-none">
                    ✕
                  </span>
                )}
                {isToday && (
                  <span className="absolute -top-2 -right-1 text-lg">⭐</span>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        <div className="p-4 rounded-3xl bg-yellow-400/10 border-2 border-yellow-400/30 text-center">
          <div className="text-3xl mb-2">⭐</div>
          <div className="font-black">Hoy</div>
          <div className="text-sm font-bold opacity-75">Marcado con estrella</div>
        </div>
        <div className="p-4 rounded-3xl bg-red-500/10 border-2 border-red-500/30 text-center">
          <div className="text-3xl mb-2">✕</div>
          <div className="font-black">Ya pasó</div>
          <div className="text-sm font-bold opacity-75">Días anteriores tachados</div>
        </div>
        <div className="p-4 rounded-3xl bg-emerald-500/10 border-2 border-emerald-500/30 text-center">
          <div className="text-3xl mb-2">📅</div>
          <div className="font-black">Futuro</div>
          <div className="text-sm font-bold opacity-75">Días que todavía faltan</div>
        </div>
      </div>
    </div>
  );

  const renderEvento = () => {
    const diff = eventDay - currentDay;
    const eventPassed = diff < 0;
    const sameDay = diff === 0;

    return (
      <div className="space-y-4">
        <NumberInput
          label="Día del evento"
          value={eventDay}
          setValue={setEventDay}
          min={1}
          max={daysInMonth}
          color="#f59e0b"
        />

        <div className="p-6 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
          <div className="text-6xl mb-3">🎉</div>
          <div className="font-black text-xl mb-2">Evento especial</div>
          <div className="text-sm font-bold opacity-75 mb-4">
            El evento será el día {eventDay} de {currentMonth}.
          </div>

          <div className={`p-5 rounded-3xl font-black text-lg ${
            sameDay
              ? 'bg-emerald-500 text-white'
              : eventPassed
                ? 'bg-red-500 text-white'
                : 'bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30'
          }`}>
            {sameDay
              ? '🎉 ¡Es hoy!'
              : eventPassed
                ? 'Ese día ya pasó en este mes.'
                : `Faltan ${diff} día(s).`}
          </div>
        </div>
      </div>
    );
  };

  const renderMes = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
        {months.map(m => (
          <button
            key={m}
            onClick={() => setMonthPick(m)}
            className={`p-3 rounded-2xl font-black text-xs transition-all ${
              monthPick === m
                ? m === currentMonth
                  ? 'bg-emerald-500 text-white shadow scale-105'
                  : 'bg-red-500 text-white'
                : 'bg-surface-color border-2 border-border-color hover:scale-105'
            }`}
          >
            {m}
          </button>
        ))}
      </div>

      {monthPick && (
        <div className={`p-4 rounded-2xl text-center text-white font-black ${
          monthPick === currentMonth ? 'bg-emerald-500' : 'bg-red-500'
        }`}>
          {monthPick === currentMonth
            ? `✅ ¡Correcto! El mes actual es ${currentMonth}.`
            : `❌ Casi. El mes actual es ${currentMonth}.`}
        </div>
      )}

      <div className="p-5 rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30 shadow text-center">
        <div className="text-5xl mb-2">📆</div>
        <div className="font-black text-xl">Mes actual</div>
        <div className="text-2xl font-black mt-2">{currentMonth}</div>
      </div>
    </div>
  );

  const renderMeses = () => (
    <div className="space-y-4">
      <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow">
        <div className="font-black text-xl text-center mb-2">Meses del año</div>
        <p className="text-sm font-bold opacity-75 text-center mb-4">
          Toca "Siguiente mes" para avanzar como canción.
        </p>

        <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
          {monthSong.map((m, i) => (
            <div
              key={m}
              className={`p-3 rounded-2xl text-center font-black text-sm border-2 transition-all ${
                i === songIndex
                  ? 'bg-[var(--primary-color)] text-white border-[var(--primary-color)] scale-105 shadow'
                  : 'bg-surface-color border-border-color'
              }`}
            >
              {m}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-2 mt-4">
          <button
            onClick={() => setSongIndex(Math.max(0, songIndex - 1))}
            className="p-3 rounded-2xl bg-slate-200 dark:bg-slate-700 font-black"
          >
            Mes anterior
          </button>
          <button
            onClick={() => setSongIndex(Math.min(11, songIndex + 1))}
            className="math-btn py-3"
          >
            Siguiente mes
          </button>
        </div>

        <div className="mt-4 p-4 rounded-3xl bg-yellow-400/10 border-2 border-yellow-400/30 text-center">
          <div className="text-sm font-black uppercase opacity-70 mb-1">Mes destacado</div>
          <div className="text-2xl font-black">{monthSong[songIndex]}</div>
        </div>
      </div>
    </div>
  );

  const renderEstaciones = () => {
    const current = seasonInfo[seasonTarget];
    const ok = seasonAnswer === current.name;

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {(['primavera', 'verano', 'otono', 'invierno'] as const).map(k => (
            <button
              key={k}
              onClick={() => {
                setSeasonTarget(k);
                setSeasonAnswer(null);
              }}
              className={`p-3 rounded-2xl font-black text-xs transition-all ${
                seasonTarget === k ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color'
              }`}
            >
              <span className="text-2xl block mb-1">{seasonInfo[k].icon}</span>
              {seasonInfo[k].name}
            </button>
          ))}
        </div>

        <div className="p-6 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
          <div className="text-7xl mb-3">{current.icon}</div>
          <div className="font-black text-2xl mb-2">{current.climate}</div>
          <div className="text-3xl mb-4">{current.examples.join(' ')}</div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {Object.values(seasonInfo).map(item => (
              <button
                key={item.name}
                onClick={() => setSeasonAnswer(item.name)}
                className={`p-4 rounded-2xl font-black border-2 transition-all ${
                  seasonAnswer === item.name
                    ? item.name === current.name
                      ? 'bg-emerald-500 text-white border-emerald-500 scale-105'
                      : 'bg-red-500 text-white border-red-500'
                    : 'bg-surface-color border-border-color'
                }`}
              >
                <div className="text-2xl mb-1">{item.icon}</div>
                {item.name}
              </button>
            ))}
          </div>

          {seasonAnswer && (
            <div className={`mt-4 p-4 rounded-2xl text-white font-black ${ok ? 'bg-emerald-500' : 'bg-red-500'}`}>
              {ok ? '✅ ¡Correcto!' : `❌ Casi. Esa descripción corresponde a ${current.name}.`}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderOrdenarEstaciones = () => {
    const correct = ['Primavera', 'Verano', 'Otoño', 'Invierno'];
    const ok = seasonOrderPick.length === correct.length && seasonOrderPick.every((s, i) => s === correct[i]);

    const add = (name: string) => {
      if (!seasonOrderPick.includes(name)) setSeasonOrderPick([...seasonOrderPick, name]);
    };

    return (
      <div className="space-y-4">
        <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow">
          <div className="font-black text-xl mb-1">Ordena las estaciones</div>
          <p className="text-sm font-bold opacity-75 mb-4">Toca las estaciones en orden.</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {['Invierno', 'Otoño', 'Verano', 'Primavera'].map(name => {
              const icon =
                name === 'Primavera' ? '🌸' :
                name === 'Verano' ? '☀️' :
                name === 'Otoño' ? '🍂' : '❄️';

              return (
                <button
                  key={name}
                  disabled={seasonOrderPick.includes(name)}
                  onClick={() => add(name)}
                  className={`p-4 rounded-2xl font-black border-2 transition-all ${
                    seasonOrderPick.includes(name)
                      ? 'opacity-40 bg-slate-200 dark:bg-slate-700'
                      : 'bg-surface-color border-border-color hover:scale-105'
                  }`}
                >
                  <div className="text-2xl mb-1">{icon}</div>
                  {name}
                </button>
              );
            })}
          </div>

          <div className="mt-4 p-4 rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30 flex gap-2 flex-wrap justify-center">
            {seasonOrderPick.length === 0 ? (
              <span className="text-sm font-bold opacity-70">Tu orden aparecerá aquí.</span>
            ) : (
              seasonOrderPick.map(s => (
                <span key={s} className="px-3 py-2 rounded-full bg-surface-color border-2 border-border-color font-black text-sm">
                  {s}
                </span>
              ))
            )}
          </div>

          {seasonOrderPick.length === correct.length && (
            <div className={`mt-4 p-4 rounded-2xl text-white text-center font-black ${ok ? 'bg-emerald-500' : 'bg-red-500'}`}>
              {ok ? '✅ ¡Muy bien! Orden correcto.' : '❌ Casi. Revisa el orden de las estaciones.'}
            </div>
          )}
        </div>

        <button onClick={() => setSeasonOrderPick([])} className="math-btn w-full">Reiniciar orden</button>
      </div>
    );
  };

  return (
    <TopicCard
      icon="🕰️"
      title="Tiempo y Calendario"
      color="#f59e0b"
      desc="Aprende día y noche, momentos del día, días de la semana, calendario, meses y estaciones del año con actividades interactivas."
    >
      <div className="lab-container space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {modes.map(m => (
            <button
              key={m.id}
              onClick={() => {
                setMode(m.id);
                resetMode();
              }}
              className={`p-3 rounded-2xl font-black text-xs transition-all ${
                mode === m.id ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color hover:scale-105'
              }`}
            >
              <span className="text-2xl block mb-1">{m.icon}</span>
              {m.label}
            </button>
          ))}
        </div>

        {mode === 'dia-noche' && renderDiaNoche()}
        {mode === 'momentos' && renderMomentos()}
        {mode === 'semana' && renderSemana()}
        {mode === 'calendario' && renderCalendario()}
        {mode === 'evento' && renderEvento()}
        {mode === 'mes' && renderMes()}
        {mode === 'meses' && renderMeses()}
        {mode === 'estaciones' && renderEstaciones()}
        {mode === 'ordenar-estaciones' && renderOrdenarEstaciones()}
      </div>
    </TopicCard>
  );
};


export const MedicionNoConvencional: React.FC = () => {
  type Mode = 'longitud' | 'altura' | 'ordenar' | 'palmas' | 'pasos' | 'clips' | 'unidad' | 'peso' | 'balanza' | 'capacidad' | 'transvase' | 'vaso' | 'tiempo' | 'area' | 'palabras';

  const [mode, setMode] = useState<Mode>('longitud');
  const [lenA, setLenA] = useState(7);
  const [lenB, setLenB] = useState(4);
  const [heightA, setHeightA] = useState(6);
  const [heightB, setHeightB] = useState(9);
  const [orderPick, setOrderPick] = useState<string[]>([]);
  const [tableLength, setTableLength] = useState(8);
  const [palmSize, setPalmSize] = useState(2);
  const [floorLength, setFloorLength] = useState(12);
  const [stepSize, setStepSize] = useState(3);
  const [clipLength, setClipLength] = useState(9);
  const [clipSize, setClipSize] = useState(1);
  const [unitTarget, setUnitTarget] = useState<'mesa' | 'suelo' | 'lapiz' | 'cancion'>('mesa');
  const [unitAnswer, setUnitAnswer] = useState<string | null>(null);
  const [weightA, setWeightA] = useState(4);
  const [weightB, setWeightB] = useState(7);
  const [capA, setCapA] = useState(5);
  const [capB, setCapB] = useState(8);
  const [pour, setPour] = useState(3);
  const [fill, setFill] = useState(50);
  const [songTime, setSongTime] = useState(8);
  const [areaW, setAreaW] = useState(4);
  const [areaH, setAreaH] = useState(3);

  const modes: { id: Mode; label: string; icon: string }[] = [
    { id: 'longitud', label: 'Largo/corto', icon: '📏' },
    { id: 'altura', label: 'Alturas', icon: '📐' },
    { id: 'ordenar', label: 'Ordenar', icon: '↔️' },
    { id: 'palmas', label: 'Palmas', icon: '🖐️' },
    { id: 'pasos', label: 'Pasos', icon: '👣' },
    { id: 'clips', label: 'Clips/lápices', icon: '📎' },
    { id: 'unidad', label: 'Elegir unidad', icon: '🎯' },
    { id: 'peso', label: 'Peso', icon: '🙌' },
    { id: 'balanza', label: 'Balanza', icon: '⚖️' },
    { id: 'capacidad', label: 'Capacidad', icon: '🪣' },
    { id: 'transvase', label: 'Transvase', icon: '💧' },
    { id: 'vaso', label: 'Vaso', icon: '🥛' },
    { id: 'tiempo', label: 'Tiempo', icon: '👏' },
    { id: 'area', label: 'Cuadritos', icon: '🟦' },
    { id: 'palabras', label: 'Palabras', icon: '💬' },
  ];

  const Bar = ({ value, label, max = 12 }: { value: number; label: string; max?: number }) => (
    <div className="space-y-2">
      <div className="font-black text-sm">{label}: {value}</div>
      <div className="h-10 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden border-2 border-border-color">
        <div className="h-full rounded-full bg-[var(--primary-color)]" style={{ width: `${Math.min(100, (value / max) * 100)}%` }} />
      </div>
    </div>
  );

  const renderLongitud = () => (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-3">
        <NumberInput label="Objeto A" value={lenA} setValue={setLenA} min={1} max={12} color="#22c55e" />
        <NumberInput label="Objeto B" value={lenB} setValue={setLenB} min={1} max={12} color="#3b82f6" />
      </div>
      <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow">
        <Bar value={lenA} label="Cuerda A" />
        <div className="mt-5"><Bar value={lenB} label="Cuerda B" /></div>
      </div>
      <div className="lab-formula text-center text-lg">
        La cuerda A es {lenA > lenB ? 'más larga que' : lenA < lenB ? 'más corta que' : 'igual de larga que'} la cuerda B.
      </div>
    </div>
  );

  const renderAltura = () => (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-3">
        <NumberInput label="Niño A" value={heightA} setValue={setHeightA} min={1} max={12} color="#f97316" />
        <NumberInput label="Niño B" value={heightB} setValue={setHeightB} min={1} max={12} color="#8b5cf6" />
      </div>
      <div className="p-6 rounded-3xl bg-surface-color border-2 border-border-color shadow flex items-end justify-center gap-10 min-h-96">
        <div className="text-center">
          <div className="w-20 rounded-t-3xl bg-orange-400 border-4 border-orange-700 mx-auto" style={{ height: `${heightA * 22}px` }} />
          <div className="font-black mt-2">A</div>
        </div>
        <div className="text-center">
          <div className="w-20 rounded-t-3xl bg-purple-400 border-4 border-purple-700 mx-auto" style={{ height: `${heightB * 22}px` }} />
          <div className="font-black mt-2">B</div>
        </div>
      </div>
      <div className="lab-formula text-center text-lg">
        {heightA > heightB ? 'A es más alto que B.' : heightA < heightB ? 'B es más alto que A.' : 'A y B tienen la misma altura.'}
      </div>
    </div>
  );

  const renderOrdenar = () => {
    const pieces = [
      { id: 'corto', label: 'Corto', value: 3, color: '#f59e0b' },
      { id: 'mediano', label: 'Mediano', value: 6, color: '#22c55e' },
      { id: 'largo', label: 'Largo', value: 10, color: '#3b82f6' },
    ];
    const ok = orderPick.join(',') === 'corto,mediano,largo';

    const add = (id: string) => {
      if (!orderPick.includes(id)) setOrderPick([...orderPick, id]);
    };

    return (
      <div className="space-y-4">
        <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow">
          <div className="font-black text-xl mb-1">Ordenar por longitud</div>
          <p className="text-sm font-bold opacity-75 mb-4">Toca en orden: corto → mediano → largo.</p>

          <div className="grid md:grid-cols-3 gap-3">
            {pieces.slice().reverse().map(p => (
              <button key={p.id} disabled={orderPick.includes(p.id)} onClick={() => add(p.id)} className={`p-4 rounded-3xl border-2 ${orderPick.includes(p.id) ? 'opacity-40 bg-slate-200 dark:bg-slate-700' : 'bg-surface-color border-border-color hover:scale-105'}`}>
                <div className="h-8 rounded-full mx-auto" style={{ width: `${p.value * 8}%`, background: p.color }} />
                <div className="font-black mt-3">{p.label}</div>
              </button>
            ))}
          </div>

          <div className="mt-4 p-4 rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30 flex gap-2 justify-center flex-wrap">
            {orderPick.map(id => <span key={id} className="px-3 py-2 rounded-full bg-surface-color border-2 border-border-color font-black">{id}</span>)}
          </div>

          {orderPick.length === 3 && (
            <div className={`mt-4 p-4 rounded-2xl text-center text-white font-black ${ok ? 'bg-emerald-500' : 'bg-red-500'}`}>
              {ok ? '✅ Orden correcto.' : '❌ Casi. Debe ser corto, mediano, largo.'}
            </div>
          )}
        </div>
        <button onClick={() => setOrderPick([])} className="math-btn w-full">Reiniciar orden</button>
      </div>
    );
  };

  const renderPalmas = () => {
    const palmas = Math.ceil(tableLength / palmSize);
    return (
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-3">
          <NumberInput label="Mesa" value={tableLength} setValue={setTableLength} min={3} max={16} color="#06b6d4" />
          <NumberInput label="Tamaño de la palma" value={palmSize} setValue={setPalmSize} min={1} max={5} color="#0ea5e9" />
        </div>
        <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
          <div className="h-20 rounded-3xl bg-amber-700 mx-auto relative" style={{ width: `${Math.min(100, tableLength * 6)}%` }}>
            <div className="absolute inset-0 flex items-center gap-1 px-2 overflow-hidden text-3xl">
              {Array.from({ length: palmas }).map((_, i) => <span key={i}>🖐️</span>)}
            </div>
          </div>
          <div className="font-black mt-4">La mesa mide aproximadamente {palmas} palmas.</div>
        </div>
      </div>
    );
  };

  const renderPasos = () => {
    const pasos = Math.ceil(floorLength / stepSize);
    return (
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-3">
          <NumberInput label="Suelo" value={floorLength} setValue={setFloorLength} min={4} max={20} color="#84cc16" />
          <NumberInput label="Tamaño de paso" value={stepSize} setValue={setStepSize} min={1} max={5} color="#22c55e" />
        </div>
        <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow">
          <div className="min-h-32 rounded-3xl bg-green-500/10 border-2 border-green-500/30 flex gap-2 flex-wrap items-center justify-center text-4xl">
            {Array.from({ length: pasos }).map((_, i) => <span key={i}>👣</span>)}
          </div>
          <div className="font-black text-center mt-4">El suelo mide aproximadamente {pasos} pasos.</div>
        </div>
      </div>
    );
  };

  const renderClips = () => {
    const clips = Math.ceil(clipLength / clipSize);
    return (
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-3">
          <NumberInput label="Objeto" value={clipLength} setValue={setClipLength} min={2} max={16} color="#ec4899" />
          <NumberInput label="Clip/lápiz" value={clipSize} setValue={setClipSize} min={1} max={4} color="#f43f5e" />
        </div>
        <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
          <div className="h-12 rounded-full bg-pink-400 border-4 border-pink-700 mx-auto" style={{ width: `${Math.min(100, clipLength * 6)}%` }} />
          <div className="flex gap-1 flex-wrap justify-center text-3xl mt-4">
            {Array.from({ length: clips }).map((_, i) => <span key={i}>📎</span>)}
          </div>
          <div className="font-black mt-3">Mide aproximadamente {clips} clips.</div>
        </div>
      </div>
    );
  };

  const renderUnidad = () => {
    const data = {
      mesa: { icon: '🪑', text: 'medir una mesa', answer: 'palmas' },
      suelo: { icon: '🏃', text: 'medir el suelo', answer: 'pasos' },
      lapiz: { icon: '✏️', text: 'medir un lápiz', answer: 'clips' },
      cancion: { icon: '🎵', text: 'medir una canción', answer: 'palmadas' },
    };

    const current = data[unitTarget];
    const ok = unitAnswer === current.answer;

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-4 gap-2">
          {(Object.keys(data) as typeof unitTarget[]).map(k => (
            <button key={k} onClick={() => { setUnitTarget(k); setUnitAnswer(null); }} className={`p-3 rounded-2xl font-black text-xs ${unitTarget === k ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color'}`}>
              {k}
            </button>
          ))}
        </div>

        <div className="p-6 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
          <div className="text-7xl mb-3">{current.icon}</div>
          <div className="font-black text-xl mb-4">¿Qué usarías para {current.text}?</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {['palmas', 'pasos', 'clips', 'palmadas'].map(u => (
              <button key={u} onClick={() => setUnitAnswer(u)} className={`p-4 rounded-2xl font-black ${unitAnswer === u ? ok ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white' : 'bg-surface-color border-2 border-border-color'}`}>
                {u}
              </button>
            ))}
          </div>

          {unitAnswer && (
            <div className={`mt-4 p-4 rounded-2xl text-white font-black ${ok ? 'bg-emerald-500' : 'bg-red-500'}`}>
              {ok ? '✅ Buena unidad.' : `❌ Mejor usar ${current.answer}.`}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderPeso = () => (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-3">
        <NumberInput label="Objeto A" value={weightA} setValue={setWeightA} min={1} max={10} color="#f59e0b" />
        <NumberInput label="Objeto B" value={weightB} setValue={setWeightB} min={1} max={10} color="#ef4444" />
      </div>
      <div className="grid md:grid-cols-2 gap-4 text-center">
        <div className="p-6 rounded-3xl bg-amber-500/10 border-2 border-amber-500/30 shadow">
          <div className="text-7xl">🙌</div>
          <div className="font-black mt-2">A pesa {weightA}</div>
        </div>
        <div className="p-6 rounded-3xl bg-red-500/10 border-2 border-red-500/30 shadow">
          <div className="text-7xl">🙌</div>
          <div className="font-black mt-2">B pesa {weightB}</div>
        </div>
      </div>
      <div className="lab-formula text-center text-lg">
        {weightA > weightB ? 'A es más pesado que B.' : weightA < weightB ? 'B es más pesado que A.' : 'A y B pesan igual.'}
      </div>
    </div>
  );

  const renderBalanza = () => {
    const diff = weightA - weightB;
    return (
      <div className="space-y-4">
        {renderPeso()}
        <div className="p-6 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
          <div className="relative mx-auto max-w-md h-48">
            <div className="absolute left-1/2 top-8 bottom-4 w-3 bg-slate-500 rounded-full" />
            <div className="absolute left-12 right-12 top-14 h-3 bg-slate-500 rounded-full transition-transform" style={{ transform: `rotate(${Math.max(-15, Math.min(15, diff * 3))}deg)` }} />
            <div className="absolute left-8 top-24 text-5xl">🟠</div>
            <div className="absolute right-8 top-24 text-5xl">🔵</div>
          </div>
          <div className="font-black">La balanza baja hacia el lado más pesado.</div>
        </div>
      </div>
    );
  };

  const renderCapacidad = () => (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-3">
        <NumberInput label="Recipiente A" value={capA} setValue={setCapA} min={1} max={10} color="#0ea5e9" />
        <NumberInput label="Recipiente B" value={capB} setValue={setCapB} min={1} max={10} color="#06b6d4" />
      </div>
      <div className="grid md:grid-cols-2 gap-4 text-center">
        {[{ name: 'A', cap: capA }, { name: 'B', cap: capB }].map(x => (
          <div key={x.name} className="p-6 rounded-3xl bg-surface-color border-2 border-border-color shadow">
            <div className="w-28 mx-auto rounded-b-3xl rounded-t-lg border-4 border-sky-600 overflow-hidden bg-sky-100/20" style={{ height: `${x.cap * 22}px` }}>
              <div className="h-full bg-sky-400" />
            </div>
            <div className="font-black mt-2">Recipiente {x.name}: cabe {x.cap}</div>
          </div>
        ))}
      </div>
      <div className="lab-formula text-center text-lg">
        {capA > capB ? 'En A cabe más.' : capA < capB ? 'En B cabe más.' : 'En ambos cabe igual.'}
      </div>
    </div>
  );

  const renderTransvase = () => {
    const moved = Math.min(pour, capA);
    const bFill = Math.min(capB, moved);
    return (
      <div className="space-y-4">
        <div className="grid md:grid-cols-3 gap-3">
          <NumberInput label="Agua inicial" value={pour} setValue={setPour} min={1} max={10} color="#0ea5e9" />
          <NumberInput label="Capacidad A" value={capA} setValue={setCapA} min={1} max={10} color="#38bdf8" />
          <NumberInput label="Capacidad B" value={capB} setValue={setCapB} min={1} max={10} color="#06b6d4" />
        </div>

        <div className="grid md:grid-cols-[1fr_90px_1fr] gap-4 items-center text-center">
          <div className="p-6 rounded-3xl bg-surface-color border-2 border-border-color shadow">
            <div className="font-black mb-2">Recipiente A</div>
            <div className="w-28 h-56 mx-auto rounded-b-3xl rounded-t-lg border-4 border-sky-700 relative overflow-hidden">
              <div className="absolute bottom-0 left-0 right-0 bg-sky-400" style={{ height: `${Math.min(100, (moved / capA) * 100)}%` }} />
            </div>
          </div>
          <div className="text-6xl">➡️</div>
          <div className="p-6 rounded-3xl bg-surface-color border-2 border-border-color shadow">
            <div className="font-black mb-2">Recipiente B</div>
            <div className="w-28 h-56 mx-auto rounded-b-3xl rounded-t-lg border-4 border-sky-700 relative overflow-hidden">
              <div className="absolute bottom-0 left-0 right-0 bg-sky-400" style={{ height: `${Math.min(100, (bFill / capB) * 100)}%` }} />
            </div>
          </div>
        </div>

        <div className="lab-formula text-center text-base">
          Si el recipiente es pequeño, puede llenarse antes de recibir toda el agua.
        </div>
      </div>
    );
  };

  const renderVaso = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-2">
        {[50, 80, 100].map(v => (
          <button key={v} onClick={() => setFill(v)} className={`p-3 rounded-2xl font-black ${fill === v ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color'}`}>
            {v === 50 ? 'Mitad' : v === 100 ? 'Borde' : 'Casi lleno'}
          </button>
        ))}
      </div>
      <div className="p-6 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
        <div className="w-40 h-64 mx-auto rounded-b-3xl rounded-t-lg border-4 border-sky-700 relative overflow-hidden bg-sky-100/20">
          <div className="absolute bottom-0 left-0 right-0 bg-sky-400 transition-all" style={{ height: `${fill}%` }} />
          <div className="absolute left-0 right-0 top-1/2 border-t-4 border-dashed border-slate-600/50" />
        </div>
        <div className="font-black mt-4">
          {fill === 50 ? 'El vaso está hasta la mitad.' : fill === 100 ? 'El vaso está hasta el borde.' : 'El vaso está casi lleno.'}
        </div>
      </div>
    </div>
  );

  const renderTiempo = () => (
    <div className="space-y-4">
      <NumberInput label="Duración de canción en palmadas" value={songTime} setValue={setSongTime} min={3} max={20} color="#a855f7" />
      <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
        <div className="text-6xl mb-3">🎵</div>
        <div className="flex gap-2 flex-wrap justify-center text-3xl">
          {Array.from({ length: songTime }).map((_, i) => <span key={i}>👏</span>)}
        </div>
        <div className="font-black mt-4">Esta canción dura aproximadamente {songTime} palmadas.</div>
      </div>
    </div>
  );

  const renderArea = () => {
    const total = areaW * areaH;
    return (
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-3">
          <NumberInput label="Ancho en cuadritos" value={areaW} setValue={setAreaW} min={1} max={8} color="#3b82f6" />
          <NumberInput label="Alto en cuadritos" value={areaH} setValue={setAreaH} min={1} max={6} color="#06b6d4" />
        </div>

        <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
          <div className="grid gap-1 mx-auto max-w-md" style={{ gridTemplateColumns: `repeat(${areaW}, minmax(0, 1fr))` }}>
            {Array.from({ length: total }).map((_, i) => (
              <div key={i} className="h-12 rounded-xl bg-blue-400 border-2 border-blue-700" />
            ))}
          </div>
          <div className="font-black mt-4">La superficie tiene {total} cuadrito(s).</div>
        </div>
      </div>
    );
  };

  const renderPalabras = () => (
    <div className="space-y-4">
      <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow">
        <div className="font-black text-xl mb-4">Frases de medición</div>
        <div className="grid md:grid-cols-2 gap-3">
          {[
            'La cuerda roja es más larga que la azul.',
            'El lápiz pequeño es más corto que el grande.',
            'La torre morada es más alta que la naranja.',
            'La piedra es más pesada que la pluma.',
            'En la cubeta cabe más arena que en el vaso.',
            'El vaso está lleno hasta la mitad.',
            'La mesa mide varias palmas.',
            'El patio mide varios pasos.',
          ].map(t => (
            <div key={t} className="p-4 rounded-2xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30 font-black text-sm">
              {t}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <TopicCard
      icon="📏"
      title="Medición No Convencional"
      color="#10b981"
      desc="Compara longitudes, alturas, peso, capacidad, superficie y tiempo usando palmas, pasos, clips, balanza, recipientes, cuadritos y palabras de medición."
    >
      <div className="lab-container space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {modes.map(m => (
            <button key={m.id} onClick={() => setMode(m.id)} className={`p-3 rounded-2xl font-black text-xs transition-all ${mode === m.id ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color hover:scale-105'}`}>
              <span className="text-2xl block mb-1">{m.icon}</span>
              {m.label}
            </button>
          ))}
        </div>

        {mode === 'longitud' && renderLongitud()}
        {mode === 'altura' && renderAltura()}
        {mode === 'ordenar' && renderOrdenar()}
        {mode === 'palmas' && renderPalmas()}
        {mode === 'pasos' && renderPasos()}
        {mode === 'clips' && renderClips()}
        {mode === 'unidad' && renderUnidad()}
        {mode === 'peso' && renderPeso()}
        {mode === 'balanza' && renderBalanza()}
        {mode === 'capacidad' && renderCapacidad()}
        {mode === 'transvase' && renderTransvase()}
        {mode === 'vaso' && renderVaso()}
        {mode === 'tiempo' && renderTiempo()}
        {mode === 'area' && renderArea()}
        {mode === 'palabras' && renderPalabras()}
      </div>
    </TopicCard>
  );
};





export const CuerposGeometricos: React.FC = () => {
  type Mode =
    | 'catalogo'
    | 'reconocer'
    | 'atributos'
    | 'movimiento'
    | 'bases'
    | 'objetos'
    | 'construir'
    | 'plastilina'
    | 'desarrollo'
    | 'clasificar'
    | 'describir';

  type BodyKey =
    | 'esfera'
    | 'elipsoide'
    | 'semiesfera'
    | 'cubo'
    | 'prismaRectangular'
    | 'cilindro'
    | 'cono'
    | 'piramide'
    | 'prismaTriangular'
    | 'prismaPentagonal'
    | 'capsula'
    | 'toro';

  type BaseShape = 'circulo' | 'cuadrado' | 'rectangulo' | 'triangulo' | 'pentagono' | 'ninguna';
  type MoveKind = 'rueda' | 'desliza' | 'ambos';
  type RuleKey = 'ruedan' | 'planos' | 'curvos' | 'pico' | 'base-circular' | 'prismas' | 'sin-esquinas';

  const [mode, setMode] = useState<Mode>('catalogo');
  const [target, setTarget] = useState<BodyKey>('esfera');
  const [answer, setAnswer] = useState<BodyKey | null>(null);
  const [selected, setSelected] = useState<BodyKey>('cubo');
  const [moveTarget, setMoveTarget] = useState<BodyKey>('cilindro');
  const [moveAnswer, setMoveAnswer] = useState<MoveKind | null>(null);
  const [baseTarget, setBaseTarget] = useState<BodyKey>('cubo');
  const [baseAnswer, setBaseAnswer] = useState<BaseShape | null>(null);
  const [objectBody, setObjectBody] = useState<BodyKey>('esfera');
  const [towerHeight, setTowerHeight] = useState(5);
  const [pyramidLevels, setPyramidLevels] = useState(4);
  const [clayBody, setClayBody] = useState<BodyKey>('cubo');
  const [netTarget, setNetTarget] = useState<BodyKey>('cubo');
  const [netAnswer, setNetAnswer] = useState<number | null>(null);
  const [rule, setRule] = useState<RuleKey>('ruedan');
  const [classifyPick, setClassifyPick] = useState<BodyKey[]>([]);
  const [descBody, setDescBody] = useState<BodyKey>('cono');
  const [descPick, setDescPick] = useState<string[]>([]);

  const bodyKeys: BodyKey[] = [
    'esfera',
    'elipsoide',
    'semiesfera',
    'cubo',
    'prismaRectangular',
    'cilindro',
    'cono',
    'piramide',
    'prismaTriangular',
    'prismaPentagonal',
    'capsula',
    'toro',
  ];

  const modes: { id: Mode; label: string; icon: string }[] = [
    { id: 'catalogo', label: 'Catálogo', icon: '📚' },
    { id: 'reconocer', label: 'Reconocer', icon: '🔎' },
    { id: 'atributos', label: 'Atributos', icon: '🧠' },
    { id: 'movimiento', label: 'Rueda/desliza', icon: '🎳' },
    { id: 'bases', label: 'Bases', icon: '⬛' },
    { id: 'objetos', label: 'Objetos', icon: '🏠' },
    { id: 'construir', label: 'Construir', icon: '🧱' },
    { id: 'plastilina', label: 'Plastilina', icon: '🟣' },
    { id: 'desarrollo', label: 'Desarrollo', icon: '📦' },
    { id: 'clasificar', label: 'Clasificar', icon: '🧺' },
    { id: 'describir', label: 'Describir', icon: '💬' },
  ];

  const bodies: Record<BodyKey, {
    name: string;
    short: string;
    color: string;
    exampleIcon: string;
    exampleName: string;
    base: BaseShape;
    baseText: string;
    move: MoveKind;
    faces: string;
    curves: string;
    edges: string;
    vertices: string;
    desc: string;
    words: string[];
    objects: { icon: string; label: string }[];
    clay: { sticks: number; balls: number; curves: number; note: string };
  }> = {
    esfera: {
      name: 'Esfera',
      short: 'pelota',
      color: '#ef4444',
      exampleIcon: '⚽',
      exampleName: 'pelota',
      base: 'ninguna',
      baseText: 'No tiene base plana.',
      move: 'rueda',
      faces: 'No tiene caras planas',
      curves: 'Toda es curva',
      edges: '0 aristas',
      vertices: '0 vértices',
      desc: 'Es redonda por todos lados. No tiene esquinas y rueda muy fácil.',
      words: ['redondo', 'curvo', 'rueda', 'sin esquinas'],
      objects: [
        { icon: '⚽', label: 'pelota' },
        { icon: '🌍', label: 'planeta' },
        { icon: '🍊', label: 'naranja' },
        { icon: '🫧', label: 'burbuja' },
      ],
      clay: { sticks: 0, balls: 1, curves: 0, note: 'Haz una bola de plastilina. No necesita palitos.' },
    },
    elipsoide: {
      name: 'Elipsoide',
      short: 'huevo 3D',
      color: '#f97316',
      exampleIcon: '🥚',
      exampleName: 'huevo',
      base: 'ninguna',
      baseText: 'No tiene una base plana clara.',
      move: 'rueda',
      faces: 'No tiene caras planas',
      curves: 'Toda es curva y alargada',
      edges: '0 aristas',
      vertices: '0 vértices',
      desc: 'Es como una esfera estirada. Se parece a un huevo o balón ovalado.',
      words: ['curvo', 'alargado', 'rueda', 'sin esquinas'],
      objects: [
        { icon: '🥚', label: 'huevo' },
        { icon: '🏉', label: 'balón ovalado' },
        { icon: '🥭', label: 'mango' },
        { icon: '🪨', label: 'piedra lisa' },
      ],
      clay: { sticks: 0, balls: 1, curves: 0, note: 'Haz una bola y aplástala un poco para alargarla.' },
    },
    semiesfera: {
      name: 'Semiesfera',
      short: 'media esfera',
      color: '#06b6d4',
      exampleIcon: '🥣',
      exampleName: 'tazón',
      base: 'circulo',
      baseText: 'Su base es circular.',
      move: 'ambos',
      faces: '1 base plana',
      curves: '1 superficie curva',
      edges: '1 borde circular',
      vertices: '0 vértices',
      desc: 'Es como media pelota. Tiene una parte curva y una base circular.',
      words: ['curvo', 'medio redondo', 'base circular', 'sin esquinas'],
      objects: [
        { icon: '🥣', label: 'tazón' },
        { icon: '🪖', label: 'casco' },
        { icon: '🍨', label: 'bola partida' },
        { icon: '🌗', label: 'media esfera' },
      ],
      clay: { sticks: 0, balls: 1, curves: 1, note: 'Haz una bola de plastilina y córtala a la mitad.' },
    },
    cubo: {
      name: 'Cubo',
      short: 'dado',
      color: '#3b82f6',
      exampleIcon: '🎲',
      exampleName: 'dado',
      base: 'cuadrado',
      baseText: 'Su base es un cuadrado.',
      move: 'desliza',
      faces: '6 caras cuadradas',
      curves: 'No tiene superficies curvas',
      edges: '12 aristas',
      vertices: '8 vértices',
      desc: 'Tiene caras planas cuadradas. Se puede apilar muy bien.',
      words: ['cuadrado', 'plano', 'esquinas', 'se apila'],
      objects: [
        { icon: '🎲', label: 'dado' },
        { icon: '🧊', label: 'hielo' },
        { icon: '📦', label: 'caja cúbica' },
        { icon: '🧱', label: 'bloque' },
      ],
      clay: { sticks: 12, balls: 8, curves: 0, note: 'Usa 12 palitos para las aristas y 8 bolitas para las esquinas.' },
    },
    prismaRectangular: {
      name: 'Prisma rectangular',
      short: 'caja larga',
      color: '#14b8a6',
      exampleIcon: '📦',
      exampleName: 'caja',
      base: 'rectangulo',
      baseText: 'Su base puede ser un rectángulo.',
      move: 'desliza',
      faces: '6 caras rectangulares',
      curves: 'No tiene superficies curvas',
      edges: '12 aristas',
      vertices: '8 vértices',
      desc: 'Parece una caja larga. Tiene caras planas rectangulares.',
      words: ['rectángulo', 'caja', 'plano', 'se apila'],
      objects: [
        { icon: '📦', label: 'caja' },
        { icon: '🧱', label: 'ladrillo' },
        { icon: '📚', label: 'libro grueso' },
        { icon: '🧃', label: 'cartón' },
      ],
      clay: { sticks: 12, balls: 8, curves: 0, note: 'Es como un cubo estirado: 12 palitos y 8 bolitas.' },
    },
    cilindro: {
      name: 'Cilindro',
      short: 'lata',
      color: '#22c55e',
      exampleIcon: '🥫',
      exampleName: 'lata',
      base: 'circulo',
      baseText: 'Tiene bases circulares.',
      move: 'ambos',
      faces: '2 bases planas',
      curves: '1 pared curva',
      edges: '2 bordes circulares',
      vertices: '0 vértices',
      desc: 'Tiene dos círculos y una pared curva. Puede rodar y también apoyarse.',
      words: ['redondo', 'curvo', 'base circular', 'rueda'],
      objects: [
        { icon: '🥫', label: 'lata' },
        { icon: '🧻', label: 'rollo' },
        { icon: '🥤', label: 'vaso' },
        { icon: '🪵', label: 'tronco' },
      ],
      clay: { sticks: 0, balls: 0, curves: 2, note: 'Haz dos círculos de plastilina y una pared curva entre ellos.' },
    },
    cono: {
      name: 'Cono',
      short: 'gorro',
      color: '#f59e0b',
      exampleIcon: '🎉',
      exampleName: 'gorro de fiesta',
      base: 'circulo',
      baseText: 'Su base es un círculo.',
      move: 'ambos',
      faces: '1 base plana',
      curves: '1 superficie curva',
      edges: '1 borde circular',
      vertices: '1 pico',
      desc: 'Tiene una base redonda y un pico arriba.',
      words: ['pico', 'curvo', 'base circular', 'rueda raro'],
      objects: [
        { icon: '🎉', label: 'gorro' },
        { icon: '🍦', label: 'cono de helado' },
        { icon: '🚧', label: 'cono vial' },
        { icon: '🌋', label: 'volcán' },
      ],
      clay: { sticks: 1, balls: 1, curves: 1, note: 'Haz una base circular y sube la plastilina hasta formar un pico.' },
    },
    piramide: {
      name: 'Pirámide',
      short: 'pico',
      color: '#a855f7',
      exampleIcon: '🔺',
      exampleName: 'pirámide',
      base: 'cuadrado',
      baseText: 'Aquí usamos una pirámide de base cuadrada.',
      move: 'desliza',
      faces: '1 base y 4 triángulos',
      curves: 'No tiene superficies curvas',
      edges: '8 aristas',
      vertices: '5 vértices',
      desc: 'Tiene una base plana y caras triangulares que suben hasta un pico.',
      words: ['pico', 'triángulos', 'base', 'caras planas'],
      objects: [
        { icon: '🔺', label: 'pirámide' },
        { icon: '⛺', label: 'tienda' },
        { icon: '🏕️', label: 'carpa' },
        { icon: '🍙', label: 'montículo' },
      ],
      clay: { sticks: 8, balls: 5, curves: 0, note: 'Usa 4 bolitas abajo, 1 arriba y palitos hacia el pico.' },
    },
    prismaTriangular: {
      name: 'Prisma triangular',
      short: 'tienda',
      color: '#ec4899',
      exampleIcon: '⛺',
      exampleName: 'tienda',
      base: 'triangulo',
      baseText: 'Sus bases son triángulos.',
      move: 'desliza',
      faces: '2 triángulos y 3 rectángulos',
      curves: 'No tiene superficies curvas',
      edges: '9 aristas',
      vertices: '6 vértices',
      desc: 'Tiene dos caras triangulares y lados rectangulares.',
      words: ['triángulo', 'rectángulos', 'plano', 'se desliza'],
      objects: [
        { icon: '⛺', label: 'tienda' },
        { icon: '🏠', label: 'techo' },
        { icon: '📐', label: 'bloque triangular' },
        { icon: '🍫', label: 'chocolate triangular' },
      ],
      clay: { sticks: 9, balls: 6, curves: 0, note: 'Haz dos triángulos y une sus esquinas con palitos.' },
    },
    prismaPentagonal: {
      name: 'Prisma pentagonal',
      short: '5 lados',
      color: '#8b5cf6',
      exampleIcon: '⬟',
      exampleName: 'bloque pentagonal',
      base: 'pentagono',
      baseText: 'Sus bases son pentágonos.',
      move: 'desliza',
      faces: '2 pentágonos y 5 rectángulos',
      curves: 'No tiene superficies curvas',
      edges: '15 aristas',
      vertices: '10 vértices',
      desc: 'Tiene dos pentágonos unidos por caras rectangulares.',
      words: ['pentágono', 'rectángulos', 'plano', 'prisma'],
      objects: [
        { icon: '⬟', label: 'bloque' },
        { icon: '🛡️', label: 'escudo grueso' },
        { icon: '🏠', label: 'casa simple' },
        { icon: '📦', label: 'empaque especial' },
      ],
      clay: { sticks: 15, balls: 10, curves: 0, note: 'Haz dos pentágonos y únelos con palitos.' },
    },
    capsula: {
      name: 'Cápsula',
      short: 'pastilla',
      color: '#fb7185',
      exampleIcon: '💊',
      exampleName: 'cápsula',
      base: 'ninguna',
      baseText: 'No tiene base plana clara.',
      move: 'rueda',
      faces: 'No tiene caras planas visibles',
      curves: 'Tiene superficie curva',
      edges: '0 aristas',
      vertices: '0 vértices',
      desc: 'Parece un cilindro con puntas redondeadas.',
      words: ['curvo', 'alargado', 'rueda', 'sin esquinas'],
      objects: [
        { icon: '💊', label: 'pastilla' },
        { icon: '🧴', label: 'envase redondeado' },
        { icon: '🥖', label: 'pan alargado' },
        { icon: '🧸', label: 'almohada cilíndrica' },
      ],
      clay: { sticks: 0, balls: 2, curves: 1, note: 'Haz un cilindro de plastilina y redondea las dos puntas.' },
    },
    toro: {
      name: 'Toro',
      short: 'dona',
      color: '#d946ef',
      exampleIcon: '🍩',
      exampleName: 'dona',
      base: 'ninguna',
      baseText: 'No tiene base plana; tiene un agujero.',
      move: 'rueda',
      faces: 'No tiene caras planas',
      curves: 'Toda su superficie es curva',
      edges: '0 aristas',
      vertices: '0 vértices',
      desc: 'Parece una dona o aro grueso. Tiene un agujero en medio.',
      words: ['aro', 'curvo', 'agujero', 'rueda'],
      objects: [
        { icon: '🍩', label: 'dona' },
        { icon: '🛟', label: 'salvavidas' },
        { icon: '🧿', label: 'aro' },
        { icon: '🛞', label: 'llanta' },
      ],
      clay: { sticks: 0, balls: 0, curves: 1, note: 'Haz una tira gruesa de plastilina y ciérrala como aro.' },
    },
  };

  const resetMode = () => {
    setAnswer(null);
    setMoveAnswer(null);
    setBaseAnswer(null);
    setNetAnswer(null);
    setClassifyPick([]);
    setDescPick([]);
  };

  const BodySvg = ({ body, size = 'md', label = false }: { body: BodyKey; size?: 'sm' | 'md' | 'lg' | 'xl'; label?: boolean }) => {
    const data = bodies[body];

    const box =
      size === 'sm'
        ? 'w-24 h-24'
        : size === 'lg'
          ? 'w-40 h-40'
          : size === 'xl'
            ? 'w-56 h-56 md:w-64 md:h-64'
            : 'w-32 h-32';

    const id = 'geo3d-' + body;

    const shades: Record<BodyKey, { main: string; light: string; mid: string; dark: string }> = {
      esfera: { main: '#ef4444', light: '#fecaca', mid: '#f87171', dark: '#991b1b' },
      elipsoide: { main: '#f97316', light: '#fed7aa', mid: '#fb923c', dark: '#9a3412' },
      semiesfera: { main: '#06b6d4', light: '#a5f3fc', mid: '#22d3ee', dark: '#0e7490' },
      cubo: { main: '#3b82f6', light: '#93c5fd', mid: '#2563eb', dark: '#1e40af' },
      prismaRectangular: { main: '#14b8a6', light: '#99f6e4', mid: '#0d9488', dark: '#0f766e' },
      cilindro: { main: '#22c55e', light: '#bbf7d0', mid: '#16a34a', dark: '#15803d' },
      cono: { main: '#f59e0b', light: '#fde68a', mid: '#fbbf24', dark: '#b45309' },
      piramide: { main: '#a855f7', light: '#ddd6fe', mid: '#9333ea', dark: '#6d28d9' },
      prismaTriangular: { main: '#ec4899', light: '#fbcfe8', mid: '#db2777', dark: '#9d174d' },
      prismaPentagonal: { main: '#8b5cf6', light: '#ddd6fe', mid: '#7c3aed', dark: '#5b21b6' },
      capsula: { main: '#fb7185', light: '#ffe4e6', mid: '#f43f5e', dark: '#be123c' },
      toro: { main: '#d946ef', light: '#f5d0fe', mid: '#c026d3', dark: '#86198f' },
    };

    const c = shades[body];
    const stroke = 'rgba(255,255,255,.92)';
    const outline = 'rgba(15,23,42,.25)';

    const Ground = () => (
      <ellipse cx="110" cy="192" rx="70" ry="10" fill="rgba(15,23,42,.16)" />
    );

    const node = (() => {
      switch (body) {
        case 'esfera':
          return (
            <>
              <defs>
                <radialGradient id={id + '-sphere'} cx="35%" cy="25%" r="70%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                  <stop offset="28%" stopColor={c.light} />
                  <stop offset="58%" stopColor={c.main} />
                  <stop offset="100%" stopColor={c.dark} />
                </radialGradient>
              </defs>
              <Ground />
              <circle cx="110" cy="96" r="62" fill={'url(#' + id + '-sphere)'} stroke={stroke} strokeWidth="6" />
              <ellipse cx="88" cy="72" rx="18" ry="10" fill="#fff" opacity=".45" />
              <path d="M66 123 Q110 148 154 123" stroke={outline} strokeWidth="4" fill="none" opacity=".35" />
            </>
          );

        case 'elipsoide':
          return (
            <>
              <defs>
                <radialGradient id={id + '-egg'} cx="32%" cy="25%" r="76%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                  <stop offset="30%" stopColor={c.light} />
                  <stop offset="62%" stopColor={c.main} />
                  <stop offset="100%" stopColor={c.dark} />
                </radialGradient>
              </defs>
              <Ground />
              <ellipse cx="110" cy="98" rx="78" ry="48" fill={'url(#' + id + '-egg)'} stroke={stroke} strokeWidth="6" />
              <ellipse cx="82" cy="78" rx="20" ry="8" fill="#fff" opacity=".42" />
              <path d="M52 108 Q110 135 168 108" stroke={outline} strokeWidth="4" fill="none" opacity=".28" />
            </>
          );

        case 'semiesfera':
          return (
            <>
              <Ground />
              <path d="M45 126 A65 65 0 0 1 175 126 Z" fill={c.main} stroke={stroke} strokeWidth="6" />
              <path d="M60 120 A50 48 0 0 1 160 120" fill="none" stroke={c.light} strokeWidth="10" opacity=".55" />
              <ellipse cx="110" cy="126" rx="65" ry="22" fill={c.dark} stroke={stroke} strokeWidth="6" />
              <ellipse cx="110" cy="121" rx="52" ry="13" fill={c.light} opacity=".55" />
              <ellipse cx="88" cy="88" rx="18" ry="9" fill="#fff" opacity=".35" />
            </>
          );

        case 'cubo':
          return (
            <>
              <Ground />
              <polygon points="66,76 112,48 164,76 118,104" fill={c.light} stroke={stroke} strokeWidth="6" />
              <polygon points="66,76 118,104 118,160 66,132" fill={c.main} stroke={stroke} strokeWidth="6" />
              <polygon points="118,104 164,76 164,132 118,160" fill={c.dark} stroke={stroke} strokeWidth="6" />
              <line x1="66" y1="76" x2="118" y2="104" stroke="#fff" strokeOpacity=".22" strokeWidth="3" />
              <line x1="164" y1="76" x2="118" y2="104" stroke="#fff" strokeOpacity=".22" strokeWidth="3" />
            </>
          );

        case 'prismaRectangular':
          return (
            <>
              <Ground />
              <polygon points="35,82 132,52 184,82 86,112" fill={c.light} stroke={stroke} strokeWidth="6" />
              <polygon points="35,82 86,112 86,156 35,126" fill={c.main} stroke={stroke} strokeWidth="6" />
              <polygon points="86,112 184,82 184,126 86,156" fill={c.dark} stroke={stroke} strokeWidth="6" />
              <line x1="35" y1="82" x2="184" y2="126" stroke="#fff" strokeOpacity=".18" strokeWidth="3" />
            </>
          );

        case 'cilindro':
          return (
            <>
              <Ground />
              <path d="M65 62 L65 150 C65 173 155 173 155 150 L155 62 Z" fill={c.main} stroke={stroke} strokeWidth="6" />
              <ellipse cx="110" cy="62" rx="45" ry="20" fill={c.light} stroke={stroke} strokeWidth="6" />
              <ellipse cx="110" cy="150" rx="45" ry="20" fill={c.dark} stroke={stroke} strokeWidth="6" />
              <path d="M65 62 C65 88 65 124 65 150" stroke={outline} strokeWidth="4" fill="none" opacity=".35" />
              <path d="M155 62 C155 88 155 124 155 150" stroke="#fff" strokeWidth="4" fill="none" opacity=".42" />
              <ellipse cx="110" cy="62" rx="28" ry="10" fill="#fff" opacity=".25" />
            </>
          );

        case 'cono':
          return (
            <>
              <Ground />
              <path d="M110 30 L56 155 Q110 180 164 155 Z" fill={c.main} stroke={stroke} strokeWidth="6" />
              <path d="M110 30 C128 80 146 122 164 155" stroke={c.light} strokeWidth="7" fill="none" opacity=".55" />
              <ellipse cx="110" cy="155" rx="54" ry="22" fill={c.dark} stroke={stroke} strokeWidth="6" />
              <ellipse cx="110" cy="151" rx="38" ry="11" fill={c.light} opacity=".45" />
            </>
          );

        case 'piramide':
          return (
            <>
              <Ground />
              <polygon points="110,28 45,150 170,150" fill={c.main} stroke={stroke} strokeWidth="6" />
              <polygon points="110,28 170,150 118,168" fill={c.dark} stroke={stroke} strokeWidth="6" />
              <polygon points="45,150 118,168 170,150 102,138" fill={c.light} stroke={stroke} strokeWidth="6" />
              <path d="M110 28 L102 138" stroke="#fff" strokeOpacity=".45" strokeWidth="4" />
              <path d="M110 28 L118 168" stroke={outline} strokeOpacity=".3" strokeWidth="4" />
            </>
          );

        case 'prismaTriangular':
          return (
            <>
              <Ground />
              <polygon points="54,134 94,58 134,134" fill={c.light} stroke={stroke} strokeWidth="6" />
              <polygon points="94,58 150,78 190,154 134,134" fill={c.dark} stroke={stroke} strokeWidth="6" />
              <polygon points="54,134 134,134 190,154 110,154" fill={c.main} stroke={stroke} strokeWidth="6" />
              <polygon points="54,134 110,154 94,58" fill={c.mid} stroke={stroke} strokeWidth="6" opacity=".95" />
              <line x1="94" y1="58" x2="134" y2="134" stroke="#fff" strokeOpacity=".25" strokeWidth="3" />
            </>
          );

        case 'prismaPentagonal':
          return (
            <>
              <Ground />
              <polygon points="58,74 92,48 130,62 140,104 104,132 66,116" fill={c.light} stroke={stroke} strokeWidth="5" />
              <polygon points="92,48 142,66 182,90 130,62" fill={c.dark} stroke={stroke} strokeWidth="5" />
              <polygon points="130,62 182,90 192,132 140,104" fill={c.mid} stroke={stroke} strokeWidth="5" />
              <polygon points="140,104 192,132 154,164 104,132" fill={c.dark} stroke={stroke} strokeWidth="5" opacity=".95" />
              <polygon points="58,74 66,116 104,132 140,104 130,62 92,48" fill={c.main} stroke={stroke} strokeWidth="5" opacity=".96" />
              <path d="M92 48 L142 66 M130 62 L182 90 M140 104 L192 132 M104 132 L154 164" stroke="#fff" strokeOpacity=".22" strokeWidth="3" />
            </>
          );

        case 'capsula':
          return (
            <>
              <defs>
                <linearGradient id={id + '-cap'} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fff" stopOpacity=".95" />
                  <stop offset="28%" stopColor={c.light} />
                  <stop offset="58%" stopColor={c.main} />
                  <stop offset="100%" stopColor={c.dark} />
                </linearGradient>
              </defs>
              <Ground />
              <rect x="40" y="78" width="140" height="58" rx="29" fill={'url(#' + id + '-cap)'} stroke={stroke} strokeWidth="6" />
              <path d="M110 78 V136" stroke="#fff" strokeOpacity=".65" strokeWidth="6" />
              <ellipse cx="78" cy="92" rx="22" ry="8" fill="#fff" opacity=".36" />
              <path d="M54 123 Q110 145 166 123" stroke={outline} strokeWidth="4" fill="none" opacity=".25" />
            </>
          );

        case 'toro':
          return (
            <>
              <defs>
                <radialGradient id={id + '-torus'} cx="34%" cy="26%" r="82%">
                  <stop offset="0%" stopColor="#fff" stopOpacity=".95" />
                  <stop offset="34%" stopColor={c.light} />
                  <stop offset="62%" stopColor={c.main} />
                  <stop offset="100%" stopColor={c.dark} />
                </radialGradient>
              </defs>
              <Ground />
              <ellipse cx="110" cy="104" rx="78" ry="50" fill={'url(#' + id + '-torus)'} stroke={stroke} strokeWidth="6" />
              <ellipse cx="110" cy="104" rx="35" ry="22" fill="var(--surface-color)" stroke={stroke} strokeWidth="6" />
              <path d="M48 104 Q110 138 172 104" stroke="#fff" strokeOpacity=".2" strokeWidth="6" fill="none" />
              <ellipse cx="82" cy="82" rx="20" ry="8" fill="#fff" opacity=".34" />
            </>
          );

        default:
          return null;
      }
    })();

    return (
      <div className="flex flex-col items-center justify-center gap-2">
        <svg
          viewBox="0 0 220 210"
          className={`${box} drop-shadow-xl overflow-visible`}
          role="img"
          aria-label={data.name}
          preserveAspectRatio="xMidYMid meet"
        >
          {node}
        </svg>

        {label && (
          <div className="text-center">
            <div className="font-black text-xs md:text-sm">{data.name}</div>
            <div className="text-[10px] font-bold opacity-60">{data.exampleIcon} {data.exampleName}</div>
          </div>
        )}
      </div>
    );
  };




  const BaseSvg = ({ base }: { base: BaseShape }) => {
    if (base === 'ninguna') {
      return <div className="h-24 flex items-center justify-center font-black text-sm opacity-70">Sin base plana</div>;
    }

    return (
      <svg viewBox="0 0 120 120" className="w-24 h-24 mx-auto drop-shadow overflow-visible">
        {base === 'circulo' && <circle cx="60" cy="60" r="36" fill="#ef4444" stroke="white" strokeWidth="5" />}
        {base === 'cuadrado' && <rect x="24" y="24" width="72" height="72" rx="10" fill="#3b82f6" stroke="white" strokeWidth="5" />}
        {base === 'rectangulo' && <rect x="14" y="34" width="92" height="52" rx="10" fill="#22c55e" stroke="white" strokeWidth="5" />}
        {base === 'triangulo' && <polygon points="60,14 106,100 14,100" fill="#f59e0b" stroke="white" strokeWidth="5" />}
        {base === 'pentagono' && <polygon points="60,12 108,46 90,106 30,106 12,46" fill="#8b5cf6" stroke="white" strokeWidth="5" />}
      </svg>
    );
  };

  const renderCatalogo = () => (
    <div className="space-y-4">
      <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow">
        <div className="font-black text-xl mb-1">Catálogo de cuerpos geométricos 3D</div>
        <p className="text-sm font-bold opacity-75 mb-4">
          Los cuerpos geométricos tienen volumen: se pueden imaginar como objetos que se tocan, ruedan, se apilan o se construyen.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {bodyKeys.map(k => (
            <button
              key={k}
              onClick={() => {
                setSelected(k);
                setMode('atributos');
              }}
              className="p-4 rounded-3xl bg-black/5 border-2 border-border-color hover:scale-105 transition-all"
            >
              <BodySvg body={k} size="md" label />
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        <div className="p-4 rounded-3xl bg-red-500/10 border-2 border-red-500/30 text-center">
          <div className="font-black">Curvos</div>
          <p className="text-xs font-bold opacity-75 mt-1">Esfera, elipsoide, cilindro, cono, cápsula y toro.</p>
        </div>
        <div className="p-4 rounded-3xl bg-blue-500/10 border-2 border-blue-500/30 text-center">
          <div className="font-black">Con caras planas</div>
          <p className="text-xs font-bold opacity-75 mt-1">Cubo, prismas y pirámide.</p>
        </div>
        <div className="p-4 rounded-3xl bg-emerald-500/10 border-2 border-emerald-500/30 text-center">
          <div className="font-black">Con volumen</div>
          <p className="text-xs font-bold opacity-75 mt-1">No son dibujos planos: tienen altura, ancho y profundidad.</p>
        </div>
      </div>
    </div>
  );

  const renderReconocer = () => {
    const ok = answer === target;

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {bodyKeys.map(k => (
            <button
              key={k}
              onClick={() => {
                setTarget(k);
                setAnswer(null);
              }}
              className={`p-2 rounded-2xl font-black text-[11px] transition-all ${
                target === k ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color hover:scale-105'
              }`}
            >
              {bodies[k].name}
            </button>
          ))}
        </div>

        <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow">
          <div className="font-black text-xl mb-1">Reconocer cuerpos 3D</div>
          <p className="text-sm font-bold opacity-75 mb-4">
            Toca el cuerpo llamado <b>{bodies[target].name}</b>.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {bodyKeys.map(k => (
              <button
                key={k}
                onClick={() => setAnswer(k)}
                className={`p-4 rounded-3xl border-2 transition-all ${
                  answer === k
                    ? k === target
                      ? 'bg-emerald-500/20 border-emerald-500 scale-105'
                      : 'bg-red-500/20 border-red-500'
                    : 'bg-black/5 border-border-color hover:scale-105'
                }`}
              >
                <BodySvg body={k} size="sm" label />
              </button>
            ))}
          </div>

          {answer && (
            <div className={`mt-4 p-4 rounded-2xl font-black text-center text-white ${ok ? 'bg-emerald-500' : 'bg-red-500'}`}>
              {ok ? `✅ ¡Correcto! Ese cuerpo es ${bodies[target].name}.` : `❌ Casi. Busca ${bodies[target].name}.`}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderAtributos = () => {
    const data = bodies[selected];

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {bodyKeys.map(k => (
            <button
              key={k}
              onClick={() => setSelected(k)}
              className={`p-2 rounded-2xl font-black text-[11px] transition-all ${
                selected === k ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color hover:scale-105'
              }`}
            >
              {bodies[k].name}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-[340px_1fr] gap-4 items-center">
          <div className="p-6 rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30 shadow text-center">
            <BodySvg body={selected} size="xl" />
            <div className="mt-3 text-2xl font-black" style={{ color: data.color }}>{data.name}</div>
            <div className="text-sm font-bold opacity-70">{data.exampleIcon} {data.exampleName}</div>
          </div>

          <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow space-y-3">
            <div className="font-black text-xl">¿Qué es?</div>
            <p className="text-sm font-bold opacity-80">{data.desc}</p>

            <div className="grid grid-cols-2 gap-3">
              <div className="p-4 rounded-2xl bg-black/5 border-2 border-border-color text-center">
                <div className="text-xs font-black opacity-60 uppercase">Caras</div>
                <div className="font-black text-sm mt-1">{data.faces}</div>
              </div>
              <div className="p-4 rounded-2xl bg-black/5 border-2 border-border-color text-center">
                <div className="text-xs font-black opacity-60 uppercase">Curvas</div>
                <div className="font-black text-sm mt-1">{data.curves}</div>
              </div>
              <div className="p-4 rounded-2xl bg-black/5 border-2 border-border-color text-center">
                <div className="text-xs font-black opacity-60 uppercase">Aristas</div>
                <div className="font-black text-sm mt-1">{data.edges}</div>
              </div>
              <div className="p-4 rounded-2xl bg-black/5 border-2 border-border-color text-center">
                <div className="text-xs font-black opacity-60 uppercase">Picos / vértices</div>
                <div className="font-black text-sm mt-1">{data.vertices}</div>
              </div>
            </div>

            <div className="flex gap-2 flex-wrap justify-center">
              {data.words.map(w => (
                <span key={w} className="px-3 py-2 rounded-full bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30 text-xs font-black">
                  {w}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderMovimiento = () => {
    const data = bodies[moveTarget];
    const ok = moveAnswer === data.move;

    const labels: Record<MoveKind, string> = {
      rueda: 'Rueda',
      desliza: 'Se desliza / se apila',
      ambos: 'Rueda y se desliza',
    };

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {bodyKeys.map(k => (
            <button
              key={k}
              onClick={() => {
                setMoveTarget(k);
                setMoveAnswer(null);
              }}
              className={`p-2 rounded-2xl font-black text-[11px] transition-all ${
                moveTarget === k ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color hover:scale-105'
              }`}
            >
              {bodies[k].name}
            </button>
          ))}
        </div>

        <div className="p-6 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
          <div className="font-black text-xl mb-2">¿Rueda o se desliza?</div>
          <BodySvg body={moveTarget} size="xl" />
          <p className="text-sm font-bold opacity-75 mt-3">Mira si tiene superficie curva, cara plana o ambas.</p>

          <div className="grid md:grid-cols-3 gap-3 mt-5">
            {(['rueda', 'desliza', 'ambos'] as MoveKind[]).map(k => (
              <button
                key={k}
                onClick={() => setMoveAnswer(k)}
                className={`p-4 rounded-3xl border-2 font-black transition-all ${
                  moveAnswer === k
                    ? k === data.move ? 'bg-emerald-500 text-white border-emerald-500 scale-105' : 'bg-red-500 text-white border-red-500'
                    : 'bg-surface-color border-border-color hover:scale-105'
                }`}
              >
                <div className="text-4xl mb-2">{k === 'rueda' ? '🎳' : k === 'desliza' ? '🧱' : '🥫'}</div>
                {labels[k]}
              </button>
            ))}
          </div>

          {moveAnswer && (
            <div className={`mt-4 p-4 rounded-2xl font-black text-white ${ok ? 'bg-emerald-500' : 'bg-red-500'}`}>
              {ok ? '✅ ¡Correcto!' : '❌ Casi.'} {data.name}: {labels[data.move]}.
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderBases = () => {
    const data = bodies[baseTarget];
    const options: BaseShape[] = ['circulo', 'cuadrado', 'rectangulo', 'triangulo', 'pentagono', 'ninguna'];
    const ok = baseAnswer === data.base;

    const names: Record<BaseShape, string> = {
      circulo: 'círculo',
      cuadrado: 'cuadrado',
      rectangulo: 'rectángulo',
      triangulo: 'triángulo',
      pentagono: 'pentágono',
      ninguna: 'sin base plana',
    };

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {bodyKeys.map(k => (
            <button
              key={k}
              onClick={() => {
                setBaseTarget(k);
                setBaseAnswer(null);
              }}
              className={`p-2 rounded-2xl font-black text-[11px] transition-all ${
                baseTarget === k ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color hover:scale-105'
              }`}
            >
              {bodies[k].name}
            </button>
          ))}
        </div>

        <div className="p-6 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
          <div className="font-black text-xl mb-2">Reconocer la base</div>
          <BodySvg body={baseTarget} size="xl" />
          <p className="text-sm font-bold opacity-75 mt-3 mb-4">
            ¿Qué figura plana forma la base de {data.name}?
          </p>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
            {options.map(base => (
              <button
                key={base}
                onClick={() => setBaseAnswer(base)}
                className={`p-4 rounded-3xl border-2 transition-all ${
                  baseAnswer === base
                    ? base === data.base ? 'bg-emerald-500/20 border-emerald-500 scale-105' : 'bg-red-500/20 border-red-500'
                    : 'bg-surface-color border-border-color hover:scale-105'
                }`}
              >
                <BaseSvg base={base} />
                <div className="font-black text-xs mt-2">{names[base]}</div>
              </button>
            ))}
          </div>

          {baseAnswer && (
            <div className={`mt-4 p-4 rounded-2xl text-white font-black ${ok ? 'bg-emerald-500' : 'bg-red-500'}`}>
              {ok ? '✅ ¡Correcto!' : '❌ Casi.'} {data.baseText}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderObjetos = () => {
    const data = bodies[objectBody];

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {bodyKeys.map(k => (
            <button
              key={k}
              onClick={() => setObjectBody(k)}
              className={`p-2 rounded-2xl font-black text-[11px] transition-all ${
                objectBody === k ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color hover:scale-105'
              }`}
            >
              {bodies[k].name}
            </button>
          ))}
        </div>

        <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow">
          <div className="font-black text-xl mb-1">Cuerpos en objetos reales</div>
          <p className="text-sm font-bold opacity-75 mb-4">
            Busca objetos parecidos a un <b>{data.name}</b>.
          </p>

          <div className="grid md:grid-cols-[300px_1fr] gap-4 items-center">
            <div className="p-6 rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30 text-center">
              <BodySvg body={objectBody} size="xl" />
              <div className="font-black text-xl mt-3">{data.name}</div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {data.objects.map(obj => (
                <div key={obj.label} className="p-4 rounded-3xl bg-black/5 border-2 border-border-color shadow text-center">
                  <div className="text-5xl mb-2">{obj.icon}</div>
                  <div className="font-black text-xs">{obj.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderConstruir = () => (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-3">
        <NumberInput label="Altura de la torre" value={towerHeight} setValue={setTowerHeight} min={1} max={8} color="#3b82f6" />
        <NumberInput label="Niveles de pirámide" value={pyramidLevels} setValue={setPyramidLevels} min={2} max={6} color="#a855f7" />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
          <div className="font-black text-xl mb-2">Construir torres con cubos</div>
          <p className="text-sm font-bold opacity-75 mb-4">Los cubos se apilan porque tienen caras planas.</p>

          <div className="min-h-96 flex flex-col-reverse items-center justify-start gap-1">
            {Array.from({ length: towerHeight }).map((_, i) => (
              <div key={i} className="relative w-20 h-14 rounded-xl bg-blue-500 border-4 border-blue-700 shadow flex items-center justify-center text-white font-black">
                {i + 1}
                <div className="absolute -top-2 left-3 right-3 h-3 rounded-t-xl bg-blue-300 border-2 border-blue-600" />
              </div>
            ))}
          </div>

          <div className="lab-formula text-center text-base mt-4">
            La torre tiene {towerHeight} cubo(s).
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
          <div className="font-black text-xl mb-2">Armar pirámide con bloques</div>
          <p className="text-sm font-bold opacity-75 mb-4">Cada nivel tiene menos bloques que el de abajo.</p>

          <div className="min-h-96 flex flex-col-reverse items-center justify-start gap-1">
            {Array.from({ length: pyramidLevels }).map((_, level) => {
              const count = pyramidLevels - level;
              return (
                <div key={level} className="flex gap-1 justify-center">
                  {Array.from({ length: count }).map((_, i) => (
                    <div key={i} className="w-12 h-12 rounded-xl bg-purple-500 border-4 border-purple-700 shadow" />
                  ))}
                </div>
              );
            })}
          </div>

          <div className="lab-formula text-center text-base mt-4">
            La pirámide tiene {pyramidLevels} nivel(es).
          </div>
        </div>
      </div>
    </div>
  );

  const renderPlastilina = () => {
    const data = bodies[clayBody];

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {bodyKeys.map(k => (
            <button
              key={k}
              onClick={() => setClayBody(k)}
              className={`p-2 rounded-2xl font-black text-[11px] transition-all ${
                clayBody === k ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color hover:scale-105'
              }`}
            >
              {bodies[k].name}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-[320px_1fr] gap-4 items-center">
          <div className="p-6 rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30 text-center shadow">
            <BodySvg body={clayBody} size="xl" />
            <div className="font-black text-xl mt-3">{data.name}</div>
          </div>

          <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow">
            <div className="font-black text-xl mb-2">Armar con plastilina y palitos</div>
            <p className="text-sm font-bold opacity-80 mb-4">{data.clay.note}</p>

            <div className="grid grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-black/5 border-2 border-border-color text-center">
                <div className="text-4xl">🥢</div>
                <div className="text-3xl font-black">{data.clay.sticks}</div>
                <div className="text-xs font-bold opacity-70">palitos</div>
              </div>
              <div className="p-4 rounded-2xl bg-black/5 border-2 border-border-color text-center">
                <div className="text-4xl">🟣</div>
                <div className="text-3xl font-black">{data.clay.balls}</div>
                <div className="text-xs font-bold opacity-70">bolitas</div>
              </div>
              <div className="p-4 rounded-2xl bg-black/5 border-2 border-border-color text-center">
                <div className="text-4xl">➰</div>
                <div className="text-3xl font-black">{data.clay.curves}</div>
                <div className="text-xs font-bold opacity-70">curvas</div>
              </div>
            </div>

            <div className="mt-4 p-4 rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30 min-h-24 flex gap-2 flex-wrap justify-center items-center">
              {Array.from({ length: Math.min(data.clay.sticks, 18) }).map((_, i) => <span key={`s-${i}`} className="text-3xl">🥢</span>)}
              {Array.from({ length: Math.min(data.clay.balls, 12) }).map((_, i) => <span key={`b-${i}`} className="text-3xl">🟣</span>)}
              {Array.from({ length: Math.min(data.clay.curves, 8) }).map((_, i) => <span key={`c-${i}`} className="text-3xl">➰</span>)}
              {data.clay.sticks === 0 && data.clay.curves === 0 && <span className="font-black text-sm opacity-75">Solo necesitas modelar la forma.</span>}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const NetSvg = ({ body, option }: { body: BodyKey; option: number }) => {
    if (body === 'cubo') {
      const cells = option === 0
        ? [[1, 0], [0, 1], [1, 1], [2, 1], [1, 2], [1, 3]]
        : [[0, 0], [1, 0], [2, 0], [3, 0], [0, 1], [3, 1]];

      return (
        <div className="grid grid-cols-4 grid-rows-4 gap-1 w-40 h-40 mx-auto">
          {Array.from({ length: 16 }).map((_, i) => {
            const r = Math.floor(i / 4);
            const c = i % 4;
            const filled = cells.some(([cc, rr]) => cc === c && rr === r);
            return <div key={i} className={filled ? 'rounded-md bg-blue-500 border-2 border-blue-700 shadow' : 'rounded-md bg-transparent'} />;
          })}
        </div>
      );
    }

    if (body === 'cilindro') {
      return (
        <div className="w-44 h-40 mx-auto flex flex-col items-center justify-center gap-2">
          <div className="w-16 h-16 rounded-full bg-green-400 border-4 border-green-700" />
          <div className="w-36 h-14 rounded-xl bg-green-500 border-4 border-green-700" />
          <div className="w-16 h-16 rounded-full bg-green-400 border-4 border-green-700" />
        </div>
      );
    }

    if (body === 'cono') {
      return (
        <div className="w-44 h-40 mx-auto flex items-center justify-center gap-2">
          <div className="w-20 h-20 rounded-full bg-orange-300 border-4 border-orange-700" />
          <div style={{ width: 0, height: 0, borderLeft: '55px solid transparent', borderRight: '55px solid transparent', borderBottom: '105px solid #f59e0b' }} />
        </div>
      );
    }

    return (
      <div className="w-44 h-40 mx-auto flex flex-col items-center justify-center gap-1">
        <div className="w-24 h-16 bg-pink-400 border-4 border-pink-700" style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }} />
        <div className="w-32 h-10 rounded-xl bg-pink-500 border-4 border-pink-700" />
        <div className="w-32 h-10 rounded-xl bg-pink-500 border-4 border-pink-700" />
      </div>
    );
  };

  const renderDesarrollo = () => {
    const allowed: BodyKey[] = ['cubo', 'cilindro', 'cono', 'prismaTriangular'];
    const current = allowed.includes(netTarget) ? netTarget : 'cubo';
    const correct = 0;
    const ok = netAnswer === correct;

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {allowed.map(k => (
            <button
              key={k}
              onClick={() => {
                setNetTarget(k);
                setNetAnswer(null);
              }}
              className={`p-3 rounded-2xl font-black text-xs transition-all ${
                current === k ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color hover:scale-105'
              }`}
            >
              {bodies[k].name}
            </button>
          ))}
        </div>

        <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
          <div className="font-black text-xl mb-1">Desarrollo plano</div>
          <p className="text-sm font-bold opacity-75 mb-4">
            Es una figura plana que se dobla para formar un cuerpo 3D.
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            {[0, 1, 2].map(i => (
              <button
                key={i}
                onClick={() => setNetAnswer(i)}
                className={`p-4 rounded-3xl border-2 transition-all ${
                  netAnswer === i
                    ? i === correct ? 'bg-emerald-500/20 border-emerald-500 scale-105' : 'bg-red-500/20 border-red-500'
                    : 'bg-black/5 border-border-color hover:scale-105'
                }`}
              >
                {i === 0 ? <NetSvg body={current} option={0} /> : <NetSvg body="cubo" option={1} />}
                <div className="font-black mt-2">Opción {i + 1}</div>
              </button>
            ))}
          </div>

          {netAnswer !== null && (
            <div className={`mt-4 p-4 rounded-2xl text-white font-black ${ok ? 'bg-emerald-500' : 'bg-red-500'}`}>
              {ok ? '✅ Correcto: ese desarrollo puede formar el cuerpo.' : '❌ Casi. Revisa si las piezas pueden doblarse para formar el cuerpo.'}
            </div>
          )}
        </div>
      </div>
    );
  };

  const ruleMap: Record<RuleKey, { label: string; desc: string; test: (b: BodyKey) => boolean }> = {
    ruedan: {
      label: 'Ruedan',
      desc: 'Tienen superficies curvas que permiten rodar.',
      test: b => bodies[b].move === 'rueda' || bodies[b].move === 'ambos',
    },
    planos: {
      label: 'Caras planas',
      desc: 'Tienen caras planas para apoyar o apilar.',
      test: b => !bodies[b].faces.includes('No tiene'),
    },
    curvos: {
      label: 'Curvos',
      desc: 'Tienen alguna superficie curva.',
      test: b => !bodies[b].curves.includes('No tiene'),
    },
    pico: {
      label: 'Con pico',
      desc: 'Tienen un pico o vértice muy visible.',
      test: b => bodies[b].words.includes('pico'),
    },
    'base-circular': {
      label: 'Base circular',
      desc: 'Tienen base con forma de círculo.',
      test: b => bodies[b].base === 'circulo',
    },
    prismas: {
      label: 'Prismas',
      desc: 'Cuerpos con dos bases iguales y caras laterales.',
      test: b => b === 'prismaRectangular' || b === 'prismaTriangular' || b === 'prismaPentagonal',
    },
    'sin-esquinas': {
      label: 'Sin esquinas',
      desc: 'No tienen vértices ni esquinas marcadas.',
      test: b => bodies[b].vertices.includes('0'),
    },
  };

  const renderClasificar = () => {
    const info = ruleMap[rule];
    const expected = bodyKeys.filter(k => info.test(k));
    const done = classifyPick.length === expected.length;
    const ok = done && expected.every(k => classifyPick.includes(k));

    const toggle = (k: BodyKey) => {
      if (classifyPick.includes(k)) setClassifyPick(classifyPick.filter(x => x !== k));
      else setClassifyPick([...classifyPick, k]);
    };

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-7 gap-2">
          {Object.entries(ruleMap).map(([id, r]) => (
            <button
              key={id}
              onClick={() => {
                setRule(id as RuleKey);
                setClassifyPick([]);
              }}
              className={`p-3 rounded-2xl font-black text-xs transition-all ${
                rule === id ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color hover:scale-105'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow">
          <div className="font-black text-xl mb-1">Clasificar cuerpos</div>
          <p className="text-sm font-bold opacity-75 mb-4">{info.desc}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {bodyKeys.map(k => (
              <button
                key={k}
                onClick={() => toggle(k)}
                className={`p-4 rounded-3xl border-2 transition-all ${
                  classifyPick.includes(k)
                    ? 'bg-[var(--primary-color)]/15 border-[var(--primary-color)] scale-105 shadow'
                    : 'bg-black/5 border-border-color hover:scale-105'
                }`}
              >
                <BodySvg body={k} size="sm" label />
              </button>
            ))}
          </div>

          {classifyPick.length > 0 && (
            <div className={`mt-4 p-4 rounded-2xl text-center font-black text-white ${
              done ? ok ? 'bg-emerald-500' : 'bg-red-500' : 'bg-amber-500'
            }`}>
              {done
                ? ok
                  ? '✅ ¡Correcto! Clasificaste todos los cuerpos.'
                  : '❌ Casi. Hay un cuerpo que no cumple la regla.'
                : `Has elegido ${classifyPick.length}. Busca ${expected.length}.`}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderDescribir = () => {
    const data = bodies[descBody];
    const options = ['redondo', 'curvo', 'plano', 'pico', 'rueda', 'se apila', 'esquinas', 'base circular', 'cuadrado', 'caja', 'triángulo', 'rectángulos', 'aro', 'agujero', 'alargado', 'prisma'];
    const goodWords = data.words;
    const goodCount = descPick.filter(w => goodWords.includes(w)).length;

    const toggle = (w: string) => {
      if (descPick.includes(w)) setDescPick(descPick.filter(x => x !== w));
      else setDescPick([...descPick, w]);
    };

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {bodyKeys.map(k => (
            <button
              key={k}
              onClick={() => {
                setDescBody(k);
                setDescPick([]);
              }}
              className={`p-2 rounded-2xl font-black text-[11px] transition-all ${
                descBody === k ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color hover:scale-105'
              }`}
            >
              {bodies[k].name}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-[320px_1fr] gap-4 items-center">
          <div className="p-6 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
            <BodySvg body={descBody} size="xl" />
            <div className="font-black text-xl mt-3">{data.name}</div>
          </div>

          <div className="p-5 rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30 shadow">
            <div className="font-black text-xl mb-1">Describe el cuerpo</div>
            <p className="text-sm font-bold opacity-75 mb-4">
              Elige palabras que sirvan para describirlo.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {options.map(w => {
                const picked = descPick.includes(w);
                const good = goodWords.includes(w);

                return (
                  <button
                    key={w}
                    onClick={() => toggle(w)}
                    className={`p-3 rounded-2xl border-2 font-black text-xs transition-all ${
                      picked
                        ? good ? 'bg-emerald-500 text-white border-emerald-500 scale-105' : 'bg-red-500 text-white border-red-500'
                        : 'bg-surface-color border-border-color hover:scale-105'
                    }`}
                  >
                    {w}
                  </button>
                );
              })}
            </div>

            <div className="mt-4 p-3 rounded-2xl bg-surface-color border-2 border-border-color font-black text-center">
              Palabras correctas elegidas: {goodCount} / {goodWords.length}
            </div>

            <div className="mt-3 text-sm font-bold opacity-80 text-center">
              {data.desc}
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <TopicCard
      icon="🧊"
      title="Cuerpos Geométricos"
      color="#06b6d4"
      desc="Reconoce, compara, clasifica y construye cuerpos 3D con volumen: esfera, cubo, cilindro, cono, prismas, pirámide, cápsula, toro y más."
    >
      <div className="lab-container space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {modes.map(m => (
            <button
              key={m.id}
              onClick={() => {
                setMode(m.id);
                resetMode();
              }}
              className={`p-3 rounded-2xl font-black text-xs transition-all ${
                mode === m.id ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color hover:scale-105'
              }`}
            >
              <span className="text-2xl block mb-1">{m.icon}</span>
              {m.label}
            </button>
          ))}
        </div>

        {mode === 'catalogo' && renderCatalogo()}
        {mode === 'reconocer' && renderReconocer()}
        {mode === 'atributos' && renderAtributos()}
        {mode === 'movimiento' && renderMovimiento()}
        {mode === 'bases' && renderBases()}
        {mode === 'objetos' && renderObjetos()}
        {mode === 'construir' && renderConstruir()}
        {mode === 'plastilina' && renderPlastilina()}
        {mode === 'desarrollo' && renderDesarrollo()}
        {mode === 'clasificar' && renderClasificar()}
        {mode === 'describir' && renderDescribir()}
      </div>
    </TopicCard>
  );
};








export const Formas: React.FC = () => {
  type Mode =
    | 'catalogo'
    | 'reconocer'
    | 'atributos'
    | 'comparar'
    | 'dibujar'
    | 'entorno'
    | 'clasificar'
    | 'plastilina'
    | 'crear';

  type ShapeKey =
    | 'circulo'
    | 'cuadrado'
    | 'triangulo'
    | 'rectangulo'
    | 'ovalo'
    | 'rombo'
    | 'pentagono'
    | 'hexagono'
    | 'octagono'
    | 'trapecio'
    | 'paralelogramo'
    | 'semicirculo'
    | 'estrella'
    | 'corazon'
    | 'cruz';

  type RuleKey =
    | 'curvas'
    | 'rectas'
    | '3-lados'
    | '4-lados'
    | '5-o-mas'
    | 'decorativas';

  const [mode, setMode] = useState<Mode>('catalogo');
  const [targetShape, setTargetShape] = useState<ShapeKey>('circulo');
  const [shapeAnswer, setShapeAnswer] = useState<ShapeKey | null>(null);
  const [selectedShape, setSelectedShape] = useState<ShapeKey>('circulo');
  const [compareA, setCompareA] = useState<ShapeKey>('circulo');
  const [compareB, setCompareB] = useState<ShapeKey>('ovalo');
  const [drawShape, setDrawShape] = useState<ShapeKey>('triangulo');
  const [drawStep, setDrawStep] = useState(0);
  const [envShape, setEnvShape] = useState<ShapeKey>('circulo');
  const [classifyRule, setClassifyRule] = useState<RuleKey>('curvas');
  const [classifyPick, setClassifyPick] = useState<ShapeKey[]>([]);
  const [buildShape, setBuildShape] = useState<ShapeKey>('cuadrado');
  const [sceneParts, setSceneParts] = useState<ShapeKey[]>([]);

  const shapeKeys: ShapeKey[] = [
    'circulo',
    'cuadrado',
    'triangulo',
    'rectangulo',
    'ovalo',
    'rombo',
    'pentagono',
    'hexagono',
    'octagono',
    'trapecio',
    'paralelogramo',
    'semicirculo',
    'estrella',
    'corazon',
    'cruz',
  ];

  const modes: { id: Mode; label: string; icon: string }[] = [
    { id: 'catalogo', label: 'Catálogo', icon: '📚' },
    { id: 'reconocer', label: 'Reconocer', icon: '🔎' },
    { id: 'atributos', label: 'Atributos', icon: '🧠' },
    { id: 'comparar', label: 'Comparar', icon: '⚖️' },
    { id: 'dibujar', label: 'Dibujar', icon: '✏️' },
    { id: 'entorno', label: 'Entorno', icon: '🏫' },
    { id: 'clasificar', label: 'Clasificar', icon: '🧺' },
    { id: 'plastilina', label: 'Plastilina', icon: '🟣' },
    { id: 'crear', label: 'Crear', icon: '🎨' },
  ];

  const shapes: Record<ShapeKey, {
    name: string;
    short: string;
    color: string;
    sides: number | 'curvo';
    corners: number;
    lines: 'curvas' | 'rectas' | 'curvas y rectas';
    family: 'redonda' | 'poligono' | 'cuadrilatero' | 'decorativa' | 'mixta';
    desc: string;
    examples: string[];
    drawSteps: string[];
    build: {
      sticks: number;
      balls: number;
      clay: string;
      note: string;
    };
  }> = {
    circulo: {
      name: 'Círculo',
      short: 'redondo',
      color: '#ef4444',
      sides: 'curvo',
      corners: 0,
      lines: 'curvas',
      family: 'redonda',
      desc: 'Es una figura redonda. No tiene lados rectos ni esquinas.',
      examples: ['⚽ pelota', '🍪 galleta', '🛞 rueda', '🕐 reloj'],
      drawSteps: ['Empieza en un punto.', 'Haz una curva redonda.', 'Sigue girando.', 'Cierra donde empezaste.'],
      build: {
        sticks: 0,
        balls: 0,
        clay: '1 tira curva',
        note: 'Haz una tira de plastilina y ciérrala como un aro.',
      },
    },
    cuadrado: {
      name: 'Cuadrado',
      short: '4 lados iguales',
      color: '#3b82f6',
      sides: 4,
      corners: 4,
      lines: 'rectas',
      family: 'cuadrilatero',
      desc: 'Tiene 4 lados iguales y 4 esquinas.',
      examples: ['🪟 ventana', '🎲 dado', '🧊 cara de cubo', '🧱 azulejo'],
      drawSteps: ['Haz una línea recta.', 'Baja.', 'Cruza abajo.', 'Sube para cerrar.'],
      build: {
        sticks: 4,
        balls: 4,
        clay: '4 tiras iguales',
        note: 'Usa 4 palitos iguales y 4 bolitas para las esquinas.',
      },
    },
    triangulo: {
      name: 'Triángulo',
      short: '3 lados',
      color: '#f59e0b',
      sides: 3,
      corners: 3,
      lines: 'rectas',
      family: 'poligono',
      desc: 'Tiene 3 lados rectos y 3 esquinas.',
      examples: ['🍕 pizza', '⛺ tienda', '📐 escuadra', '🚩 banderín'],
      drawSteps: ['Marca un punto arriba.', 'Baja a un lado.', 'Cruza a la otra esquina.', 'Sube para cerrar.'],
      build: {
        sticks: 3,
        balls: 3,
        clay: '3 tiras',
        note: 'Usa 3 palitos o 3 tiras de plastilina.',
      },
    },
    rectangulo: {
      name: 'Rectángulo',
      short: 'más largo',
      color: '#22c55e',
      sides: 4,
      corners: 4,
      lines: 'rectas',
      family: 'cuadrilatero',
      desc: 'Tiene 4 lados y 4 esquinas. Dos lados suelen ser más largos.',
      examples: ['🚪 puerta', '📱 celular', '📚 libro', '📺 pantalla'],
      drawSteps: ['Haz una línea larga.', 'Baja una línea corta.', 'Haz otra línea larga.', 'Sube para cerrar.'],
      build: {
        sticks: 4,
        balls: 4,
        clay: '2 tiras largas y 2 cortas',
        note: 'Usa dos lados largos y dos cortos.',
      },
    },
    ovalo: {
      name: 'Óvalo',
      short: 'redondo alargado',
      color: '#a855f7',
      sides: 'curvo',
      corners: 0,
      lines: 'curvas',
      family: 'redonda',
      desc: 'Es una figura redonda pero alargada, como un huevo.',
      examples: ['🥚 huevo', '🏉 balón', '🥭 mango', '🪞 espejo'],
      drawSteps: ['Haz una curva alargada.', 'Rodea suave.', 'No hagas esquinas.', 'Cierra como un huevo.'],
      build: {
        sticks: 0,
        balls: 0,
        clay: '1 tira curva alargada',
        note: 'Haz un aro de plastilina más largo que ancho.',
      },
    },
    rombo: {
      name: 'Rombo',
      short: 'diamante',
      color: '#ec4899',
      sides: 4,
      corners: 4,
      lines: 'rectas',
      family: 'cuadrilatero',
      desc: 'Parece un cuadrado girado, como un diamante.',
      examples: ['💎 diamante', '🪁 cometa', '♦️ carta', '🔶 señal'],
      drawSteps: ['Punto arriba.', 'Punto a la derecha.', 'Punto abajo.', 'Punto a la izquierda.'],
      build: {
        sticks: 4,
        balls: 4,
        clay: '4 tiras',
        note: 'Haz un cuadrado y gíralo como diamante.',
      },
    },
    pentagono: {
      name: 'Pentágono',
      short: '5 lados',
      color: '#14b8a6',
      sides: 5,
      corners: 5,
      lines: 'rectas',
      family: 'poligono',
      desc: 'Tiene 5 lados y 5 esquinas.',
      examples: ['⬟ señal', '🏠 casita simple', '⚽ parche', '🛡️ escudo'],
      drawSteps: ['Empieza arriba.', 'Haz dos lados inclinados.', 'Haz dos lados abajo.', 'Cierra la figura.'],
      build: {
        sticks: 5,
        balls: 5,
        clay: '5 tiras',
        note: 'Usa 5 palitos o 5 tiras de plastilina.',
      },
    },
    hexagono: {
      name: 'Hexágono',
      short: '6 lados',
      color: '#0ea5e9',
      sides: 6,
      corners: 6,
      lines: 'rectas',
      family: 'poligono',
      desc: 'Tiene 6 lados. Se parece a una celda de panal.',
      examples: ['🍯 panal', '⬡ mosaico', '🔩 tuerca', '⚽ parche'],
      drawSteps: ['Haz una parte arriba.', 'Baja a un lado.', 'Sigue hasta completar 6 lados.', 'Cierra la figura.'],
      build: {
        sticks: 6,
        balls: 6,
        clay: '6 tiras',
        note: 'Se hace bien con 6 palitos iguales.',
      },
    },
    octagono: {
      name: 'Octágono',
      short: '8 lados',
      color: '#8b5cf6',
      sides: 8,
      corners: 8,
      lines: 'rectas',
      family: 'poligono',
      desc: 'Tiene 8 lados y 8 esquinas.',
      examples: ['🛑 señal', '🔷 mosaico', '🧩 figura', '🏷️ diseño'],
      drawSteps: ['Haz una parte arriba.', 'Agrega lados inclinados.', 'Sigue formando 8 lados.', 'Cierra la figura.'],
      build: {
        sticks: 8,
        balls: 8,
        clay: '8 tiras',
        note: 'Necesitas 8 lados rectos.',
      },
    },
    trapecio: {
      name: 'Trapecio',
      short: 'una base larga',
      color: '#84cc16',
      sides: 4,
      corners: 4,
      lines: 'rectas',
      family: 'cuadrilatero',
      desc: 'Tiene 4 lados. Una base puede ser más larga que la otra.',
      examples: ['👜 bolso', '🏗️ techo', '🚧 señal', '📦 frente'],
      drawSteps: ['Haz una línea corta arriba.', 'Baja inclinado.', 'Haz una línea larga abajo.', 'Sube inclinado.'],
      build: {
        sticks: 4,
        balls: 4,
        clay: '2 bases y 2 lados inclinados',
        note: 'Una base debe quedar más larga.',
      },
    },
    paralelogramo: {
      name: 'Paralelogramo',
      short: 'inclinado',
      color: '#f97316',
      sides: 4,
      corners: 4,
      lines: 'rectas',
      family: 'cuadrilatero',
      desc: 'Tiene 4 lados. Se parece a un rectángulo inclinado.',
      examples: ['🧱 ladrillo inclinado', '📐 dibujo', '🏳️ figura', '▰ mosaico'],
      drawSteps: ['Haz la línea de arriba.', 'Baja inclinado.', 'Haz la de abajo paralela.', 'Cierra inclinado.'],
      build: {
        sticks: 4,
        balls: 4,
        clay: '4 tiras',
        note: 'Haz dos lados opuestos paralelos.',
      },
    },
    semicirculo: {
      name: 'Semicírculo',
      short: 'medio círculo',
      color: '#06b6d4',
      sides: 'curvo',
      corners: 2,
      lines: 'curvas y rectas',
      family: 'mixta',
      desc: 'Es la mitad de un círculo. Tiene una parte recta y una curva.',
      examples: ['🌈 arco', '🍉 media sandía', '🌓 forma', '🚪 arco'],
      drawSteps: ['Haz una línea recta abajo.', 'Sube con curva.', 'Baja con curva.', 'Cierra en la línea.'],
      build: {
        sticks: 1,
        balls: 2,
        clay: '1 curva y 1 recta',
        note: 'Haz una curva arriba y una base recta.',
      },
    },
    estrella: {
      name: 'Estrella',
      short: 'con puntas',
      color: '#eab308',
      sides: 10,
      corners: 5,
      lines: 'rectas',
      family: 'decorativa',
      desc: 'Tiene puntas y suele usarse para decorar.',
      examples: ['⭐ estrella', '🌟 brillo', '🎖️ adorno', '✨ símbolo'],
      drawSteps: ['Haz una punta arriba.', 'Cruza hacia un lado.', 'Sigue con más puntas.', 'Cierra la figura.'],
      build: {
        sticks: 10,
        balls: 5,
        clay: 'varias tiras',
        note: 'Forma las puntas con tiras pequeñas.',
      },
    },
    corazon: {
      name: 'Corazón',
      short: 'curvas y punta',
      color: '#f43f5e',
      sides: 'curvo',
      corners: 1,
      lines: 'curvas',
      family: 'decorativa',
      desc: 'Tiene dos curvas arriba y una punta abajo.',
      examples: ['❤️ corazón', '💝 regalo', '💌 carta', '🎈 globo'],
      drawSteps: ['Haz una curva arriba.', 'Haz otra curva.', 'Baja a una punta.', 'Cierra la forma.'],
      build: {
        sticks: 0,
        balls: 0,
        clay: '2 curvas y una punta',
        note: 'Haz dos curvas con plastilina y júntalas abajo en punta.',
      },
    },
    cruz: {
      name: 'Cruz',
      short: 'forma de +',
      color: '#64748b',
      sides: 12,
      corners: 12,
      lines: 'rectas',
      family: 'decorativa',
      desc: 'Parece un signo de suma grande.',
      examples: ['➕ suma', '✚ símbolo', '🏥 señal', '🧩 figura'],
      drawSteps: ['Haz una barra vertical.', 'Cruza una barra horizontal.', 'Marca las esquinas.', 'Cierra la figura.'],
      build: {
        sticks: 4,
        balls: 4,
        clay: '2 tiras cruzadas',
        note: 'Cruza dos tiras de plastilina como un signo +.',
      },
    },
  };

  const resetMode = () => {
    setShapeAnswer(null);
    setClassifyPick([]);
    setSceneParts([]);
    setDrawStep(0);
  };

  const ShapeSvg = ({
    shape,
    size = 'md',
    label = false,
  }: {
    shape: ShapeKey;
    size?: 'sm' | 'md' | 'lg' | 'xl';
    label?: boolean;
  }) => {
    const data = shapes[shape];

    const sizeClass =
      size === 'sm'
        ? 'w-14 h-14'
        : size === 'lg'
          ? 'w-28 h-28 md:w-32 md:h-32'
          : size === 'xl'
            ? 'w-40 h-40 md:w-48 md:h-48'
            : 'w-20 h-20 md:w-24 md:h-24';

    const common = {
      fill: data.color,
      stroke: 'rgba(255,255,255,.92)',
      strokeWidth: 4,
      strokeLinejoin: 'round' as const,
      strokeLinecap: 'round' as const,
    };

    const node = (() => {
      switch (shape) {
        case 'circulo':
          return <circle cx="60" cy="60" r="38" {...common} />;
        case 'cuadrado':
          return <rect x="24" y="24" width="72" height="72" rx="10" {...common} />;
        case 'triangulo':
          return <polygon points="60,16 104,98 16,98" {...common} />;
        case 'rectangulo':
          return <rect x="14" y="32" width="92" height="56" rx="10" {...common} />;
        case 'ovalo':
          return <ellipse cx="60" cy="60" rx="44" ry="28" {...common} />;
        case 'rombo':
          return <polygon points="60,14 104,60 60,106 16,60" {...common} />;
        case 'pentagono':
          return <polygon points="60,10 105,42 88,102 32,102 15,42" {...common} />;
        case 'hexagono':
          return <polygon points="30,14 90,14 110,60 90,106 30,106 10,60" {...common} />;
        case 'octagono':
          return <polygon points="36,10 84,10 110,36 110,84 84,110 36,110 10,84 10,36" {...common} />;
        case 'trapecio':
          return <polygon points="32,24 88,24 106,96 14,96" {...common} />;
        case 'paralelogramo':
          return <polygon points="36,22 102,22 84,100 18,100" {...common} />;
        case 'semicirculo':
          return <path d="M14 84 A46 46 0 0 1 106 84 L14 84 Z" {...common} />;
        case 'estrella':
          return <polygon points="60,10 73,43 108,43 80,63 91,98 60,77 29,98 40,63 12,43 47,43" {...common} />;
        case 'corazon':
          return <path d="M60 100 C25 75 14 57 18 38 C22 22 42 18 60 38 C78 18 98 22 102 38 C106 57 95 75 60 100 Z" {...common} />;
        case 'cruz':
          return <path d="M44 14 H76 V44 H106 V76 H76 V106 H44 V76 H14 V44 H44 Z" {...common} />;
        default:
          return null;
      }
    })();

    return (
      <div className="flex flex-col items-center justify-center gap-2">
        <svg
          viewBox="0 0 120 120"
          className={`${sizeClass} drop-shadow-xl overflow-visible`}
          role="img"
          aria-label={data.name}
          preserveAspectRatio="xMidYMid meet"
        >
          {node}
        </svg>

        {label && (
          <div className="text-center">
            <div className="font-black text-xs md:text-sm">{data.name}</div>
            <div className="text-[10px] font-bold opacity-60">{data.short}</div>
          </div>
        )}
      </div>
    );
  };

  const renderCatalogo = () => (
    <div className="space-y-4">
      <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow">
        <div className="font-black text-xl mb-1">Catálogo de figuras planas</div>
        <p className="text-sm font-bold opacity-75 mb-4">
          Aquí puedes ver varias figuras geométricas y otras figuras planas decorativas.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {shapeKeys.map(k => (
            <button
              key={k}
              onClick={() => {
                setSelectedShape(k);
                setMode('atributos');
              }}
              className="p-4 rounded-3xl bg-black/5 border-2 border-border-color hover:scale-105 transition-all"
            >
              <ShapeSvg shape={k} size="lg" label />
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-3">
        <div className="p-4 rounded-3xl bg-red-500/10 border-2 border-red-500/30 text-center">
          <div className="font-black">Figuras con curvas</div>
          <p className="text-xs font-bold opacity-75 mt-1">Círculo, óvalo, semicírculo y corazón.</p>
        </div>
        <div className="p-4 rounded-3xl bg-blue-500/10 border-2 border-blue-500/30 text-center">
          <div className="font-black">Polígonos</div>
          <p className="text-xs font-bold opacity-75 mt-1">Triángulo, cuadrado, pentágono, hexágono y más.</p>
        </div>
        <div className="p-4 rounded-3xl bg-amber-500/10 border-2 border-amber-500/30 text-center">
          <div className="font-black">Decorativas</div>
          <p className="text-xs font-bold opacity-75 mt-1">Estrella, corazón y cruz también son figuras planas.</p>
        </div>
      </div>
    </div>
  );

  const renderReconocer = () => {
    const ok = shapeAnswer === targetShape;

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {shapeKeys.map(k => (
            <button
              key={k}
              onClick={() => {
                setTargetShape(k);
                setShapeAnswer(null);
              }}
              className={`p-2 rounded-2xl font-black text-[11px] transition-all ${
                targetShape === k ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color hover:scale-105'
              }`}
            >
              {shapes[k].name}
            </button>
          ))}
        </div>

        <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow">
          <div className="font-black text-xl mb-1">Reconocer figuras</div>
          <p className="text-sm font-bold opacity-75 mb-4">
            Toca la figura llamada <b>{shapes[targetShape].name}</b>.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {shapeKeys.map(k => (
              <button
                key={k}
                onClick={() => setShapeAnswer(k)}
                className={`p-4 rounded-3xl border-2 transition-all ${
                  shapeAnswer === k
                    ? k === targetShape
                      ? 'bg-emerald-500/20 border-emerald-500 scale-105'
                      : 'bg-red-500/20 border-red-500'
                    : 'bg-black/5 border-border-color hover:scale-105'
                }`}
              >
                <ShapeSvg shape={k} size="md" label />
              </button>
            ))}
          </div>

          {shapeAnswer && (
            <div className={`mt-4 p-4 rounded-2xl font-black text-center text-white ${ok ? 'bg-emerald-500' : 'bg-red-500'}`}>
              {ok ? `✅ ¡Correcto! Esa figura es ${shapes[targetShape].name}.` : `❌ Casi. Busca ${shapes[targetShape].name}.`}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderAtributos = () => {
    const data = shapes[selectedShape];

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {shapeKeys.map(k => (
            <button
              key={k}
              onClick={() => setSelectedShape(k)}
              className={`p-2 rounded-2xl font-black text-[11px] transition-all ${
                selectedShape === k ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color hover:scale-105'
              }`}
            >
              {shapes[k].name}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-[320px_1fr] gap-4 items-center">
          <div className="p-6 rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30 shadow text-center">
            <ShapeSvg shape={selectedShape} size="xl" />
            <div className="mt-3 text-2xl font-black" style={{ color: data.color }}>{data.name}</div>
            <div className="text-sm font-bold opacity-70">{data.short}</div>
          </div>

          <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow space-y-3">
            <div className="font-black text-xl">¿Qué es?</div>
            <p className="text-sm font-bold opacity-80">{data.desc}</p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-black/5 border-2 border-border-color text-center">
                <div className="text-xs font-black opacity-60 uppercase">Lados</div>
                <div className="text-3xl font-black">{data.sides}</div>
              </div>
              <div className="p-4 rounded-2xl bg-black/5 border-2 border-border-color text-center">
                <div className="text-xs font-black opacity-60 uppercase">Esquinas</div>
                <div className="text-3xl font-black">{data.corners}</div>
              </div>
              <div className="p-4 rounded-2xl bg-black/5 border-2 border-border-color text-center">
                <div className="text-xs font-black opacity-60 uppercase">Líneas</div>
                <div className="text-base font-black capitalize">{data.lines}</div>
              </div>
            </div>

            <div className="p-4 rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30">
              <div className="text-xs font-black uppercase opacity-70 mb-2">Ejemplos</div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {data.examples.map(ex => (
                  <div key={ex} className="p-3 rounded-2xl bg-surface-color border-2 border-border-color text-center">
                    <div className="text-3xl">{ex.split(' ')[0]}</div>
                    <div className="text-[10px] font-black">{ex}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderComparar = () => {
    const a = shapes[compareA];
    const b = shapes[compareB];

    return (
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-3">
          <div className="p-4 rounded-3xl bg-surface-color border-2 border-border-color shadow">
            <div className="text-xs font-black uppercase opacity-70 mb-2">Figura A</div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {shapeKeys.map(k => (
                <button
                  key={k}
                  onClick={() => setCompareA(k)}
                  className={`p-2 rounded-xl font-black text-[10px] ${
                    compareA === k ? 'bg-[var(--primary-color)] text-white' : 'bg-slate-200 dark:bg-slate-700'
                  }`}
                >
                  {shapes[k].name}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-3xl bg-surface-color border-2 border-border-color shadow">
            <div className="text-xs font-black uppercase opacity-70 mb-2">Figura B</div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {shapeKeys.map(k => (
                <button
                  key={k}
                  onClick={() => setCompareB(k)}
                  className={`p-2 rounded-xl font-black text-[10px] ${
                    compareB === k ? 'bg-[var(--primary-color)] text-white' : 'bg-slate-200 dark:bg-slate-700'
                  }`}
                >
                  {shapes[k].name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-[1fr_120px_1fr] gap-4 items-center">
          <div className="p-6 rounded-3xl bg-red-500/10 border-2 border-red-500/30 text-center shadow">
            <ShapeSvg shape={compareA} size="xl" />
            <div className="font-black text-xl mt-3">{a.name}</div>
            <div className="text-xs font-bold opacity-75 mt-1">{a.desc}</div>
          </div>

          <div className="p-4 rounded-3xl bg-surface-color border-2 border-border-color text-center shadow">
            <div className="text-5xl">⚖️</div>
            <div className="font-black text-xs mt-2">Comparar</div>
          </div>

          <div className="p-6 rounded-3xl bg-blue-500/10 border-2 border-blue-500/30 text-center shadow">
            <ShapeSvg shape={compareB} size="xl" />
            <div className="font-black text-xl mt-3">{b.name}</div>
            <div className="text-xs font-bold opacity-75 mt-1">{b.desc}</div>
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow">
          <div className="font-black text-xl mb-3">Diferencias rápidas</div>
          <div className="grid md:grid-cols-3 gap-3 text-center">
            <div className="p-4 rounded-2xl bg-black/5 border-2 border-border-color">
              <div className="font-black">Lados</div>
              <div className="text-sm font-bold opacity-75 mt-1">{a.name}: {a.sides} · {b.name}: {b.sides}</div>
            </div>
            <div className="p-4 rounded-2xl bg-black/5 border-2 border-border-color">
              <div className="font-black">Esquinas</div>
              <div className="text-sm font-bold opacity-75 mt-1">{a.name}: {a.corners} · {b.name}: {b.corners}</div>
            </div>
            <div className="p-4 rounded-2xl bg-black/5 border-2 border-border-color">
              <div className="font-black">Líneas</div>
              <div className="text-sm font-bold opacity-75 mt-1">{a.lines} / {b.lines}</div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDibujar = () => {
    const data = shapes[drawShape];
    const step = data.drawSteps[drawStep % data.drawSteps.length];

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {shapeKeys.map(k => (
            <button
              key={k}
              onClick={() => {
                setDrawShape(k);
                setDrawStep(0);
              }}
              className={`p-2 rounded-2xl font-black text-[11px] transition-all ${
                drawShape === k ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color hover:scale-105'
              }`}
            >
              {shapes[k].name}
            </button>
          ))}
        </div>

        <div className="p-6 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
          <div className="text-xs font-black uppercase opacity-70 mb-2">Traza la figura</div>

          <div className="relative mx-auto w-80 h-80 rounded-3xl bg-amber-100/40 border-4 border-amber-500/50 shadow-inner flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,#92400e_1px,transparent_1px)] bg-[length:18px_18px]" />
            <ShapeSvg shape={drawShape} size="xl" />
            <div className="absolute bottom-3 right-3 text-4xl">☝️</div>
          </div>

          <div className="mt-4 p-3 rounded-2xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30 font-black">
            {step}
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4">
            <button
              onClick={() => setDrawStep(Math.max(0, drawStep - 1))}
              className="p-3 rounded-2xl bg-slate-200 dark:bg-slate-700 font-black"
            >
              Paso anterior
            </button>
            <button
              onClick={() => setDrawStep(drawStep + 1)}
              className="math-btn py-3"
            >
              Siguiente paso
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderEntorno = () => {
    const data = shapes[envShape];

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {shapeKeys.map(k => (
            <button
              key={k}
              onClick={() => setEnvShape(k)}
              className={`p-2 rounded-2xl font-black text-[11px] transition-all ${
                envShape === k ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color hover:scale-105'
              }`}
            >
              {shapes[k].name}
            </button>
          ))}
        </div>

        <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow">
          <div className="font-black text-xl mb-1">Buscar en el entorno</div>
          <p className="text-sm font-bold opacity-75 mb-4">
            Busca objetos que se parezcan a <b>{data.name}</b>.
          </p>

          <div className="grid md:grid-cols-[260px_1fr] gap-4 items-center">
            <div className="p-6 rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30 text-center">
              <ShapeSvg shape={envShape} size="xl" />
              <div className="mt-3 font-black text-xl">{data.name}</div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {data.examples.map(ex => (
                <div key={ex} className="p-4 rounded-3xl bg-black/5 border-2 border-border-color shadow text-center">
                  <div className="text-4xl mb-2">{ex.split(' ')[0]}</div>
                  <div className="font-black text-xs">{ex}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const ruleMap: Record<RuleKey, { label: string; desc: string; test: (s: ShapeKey) => boolean }> = {
    curvas: {
      label: 'Con curvas',
      desc: 'Figuras que tienen líneas curvas.',
      test: s => shapes[s].lines === 'curvas' || shapes[s].lines === 'curvas y rectas',
    },
    rectas: {
      label: 'Con lados rectos',
      desc: 'Figuras hechas con líneas rectas.',
      test: s => shapes[s].lines === 'rectas',
    },
    '3-lados': {
      label: '3 lados',
      desc: 'Figuras con exactamente 3 lados.',
      test: s => shapes[s].sides === 3,
    },
    '4-lados': {
      label: '4 lados',
      desc: 'Figuras con exactamente 4 lados.',
      test: s => shapes[s].sides === 4,
    },
    '5-o-mas': {
      label: '5 o más lados',
      desc: 'Figuras con muchos lados rectos.',
      test: s => typeof shapes[s].sides === 'number' && shapes[s].sides >= 5,
    },
    decorativas: {
      label: 'Decorativas',
      desc: 'Estrella, corazón o cruz.',
      test: s => shapes[s].family === 'decorativa',
    },
  };

  const renderClasificar = () => {
    const rule = ruleMap[classifyRule];
    const expected = shapeKeys.filter(k => rule.test(k));
    const done = classifyPick.length === expected.length;
    const ok = done && expected.every(k => classifyPick.includes(k));

    const togglePick = (k: ShapeKey) => {
      if (classifyPick.includes(k)) {
        setClassifyPick(classifyPick.filter(x => x !== k));
      } else {
        setClassifyPick([...classifyPick, k]);
      }
    };

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
          {Object.entries(ruleMap).map(([id, r]) => (
            <button
              key={id}
              onClick={() => {
                setClassifyRule(id as RuleKey);
                setClassifyPick([]);
              }}
              className={`p-3 rounded-2xl font-black text-xs transition-all ${
                classifyRule === id ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color hover:scale-105'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow">
          <div className="font-black text-xl mb-1">Clasificar figuras</div>
          <p className="text-sm font-bold opacity-75 mb-4">{rule.desc}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {shapeKeys.map(k => (
              <button
                key={k}
                onClick={() => togglePick(k)}
                className={`p-4 rounded-3xl border-2 transition-all ${
                  classifyPick.includes(k)
                    ? 'bg-[var(--primary-color)]/15 border-[var(--primary-color)] scale-105 shadow'
                    : 'bg-black/5 border-border-color hover:scale-105'
                }`}
              >
                <ShapeSvg shape={k} size="md" label />
              </button>
            ))}
          </div>

          {classifyPick.length > 0 && (
            <div className={`mt-4 p-4 rounded-2xl text-center font-black text-white ${
              done ? ok ? 'bg-emerald-500' : 'bg-red-500' : 'bg-amber-500'
            }`}>
              {done
                ? ok
                  ? '✅ ¡Correcto! Clasificaste todas las figuras.'
                  : '❌ Casi. Hay una figura que no cumple la regla.'
                : `Has elegido ${classifyPick.length}. Busca ${expected.length}.`}
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderPlastilina = () => {
    const data = shapes[buildShape];

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {shapeKeys.map(k => (
            <button
              key={k}
              onClick={() => setBuildShape(k)}
              className={`p-2 rounded-2xl font-black text-[11px] transition-all ${
                buildShape === k ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color hover:scale-105'
              }`}
            >
              {shapes[k].name}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-[280px_1fr] gap-4 items-center">
          <div className="p-6 rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30 text-center shadow">
            <ShapeSvg shape={buildShape} size="xl" />
            <div className="mt-3 font-black text-xl">{data.name}</div>
          </div>

          <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow">
            <div className="font-black text-xl mb-2">Construir con plastilina o palitos</div>
            <p className="text-sm font-bold opacity-80 mb-4">{data.build.note}</p>

            <div className="grid grid-cols-3 gap-3">
              <div className="p-4 rounded-2xl bg-black/5 border-2 border-border-color text-center">
                <div className="text-4xl">🥢</div>
                <div className="font-black text-2xl">{data.build.sticks}</div>
                <div className="text-xs font-bold opacity-70">palitos</div>
              </div>
              <div className="p-4 rounded-2xl bg-black/5 border-2 border-border-color text-center">
                <div className="text-4xl">🟣</div>
                <div className="font-black text-2xl">{data.build.balls}</div>
                <div className="text-xs font-bold opacity-70">bolitas</div>
              </div>
              <div className="p-4 rounded-2xl bg-black/5 border-2 border-border-color text-center">
                <div className="text-4xl">🧵</div>
                <div className="font-black text-sm">{data.build.clay}</div>
                <div className="text-xs font-bold opacity-70">plastilina</div>
              </div>
            </div>

            <div className="mt-4 p-4 rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30 min-h-24 flex gap-2 flex-wrap justify-center items-center">
              {Array.from({ length: Math.min(data.build.sticks, 12) }).map((_, i) => (
                <span key={`s-${i}`} className="text-3xl">🥢</span>
              ))}
              {Array.from({ length: Math.min(data.build.balls, 12) }).map((_, i) => (
                <span key={`b-${i}`} className="text-3xl">🟣</span>
              ))}
              {data.build.sticks === 0 && (
                <span className="font-black text-sm opacity-75">Aquí manda la plastilina curva.</span>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderCrear = () => {
    const addPart = (shape: ShapeKey) => {
      if (sceneParts.length < 20) {
        setSceneParts([...sceneParts, shape]);
      }
    };

    return (
      <div className="space-y-4">
        <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow">
          <div className="font-black text-xl mb-1">Crear dibujos con figuras</div>
          <p className="text-sm font-bold opacity-75 mb-4">
            Combina figuras para crear casas, robots, flores, trenes o lo que imagines.
          </p>

          <div className="grid grid-cols-4 md:grid-cols-5 gap-2 mb-4">
            {shapeKeys.map(k => (
              <button
                key={k}
                onClick={() => addPart(k)}
                className="p-2 rounded-2xl bg-surface-color border-2 border-border-color hover:scale-105 transition-all"
              >
                <ShapeSvg shape={k} size="sm" />
                <div className="text-[9px] font-black mt-1">{shapes[k].name}</div>
              </button>
            ))}
          </div>

          <div className="min-h-96 rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30 p-4 flex flex-wrap gap-3 items-center justify-center">
            {sceneParts.length === 0 && (
              <div className="text-center font-bold opacity-70">
                Toca figuras para construir tu dibujo.
              </div>
            )}

            {sceneParts.map((shape, i) => (
              <div key={`${shape}-${i}`} className="p-1">
                <ShapeSvg shape={shape} size="sm" />
              </div>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4">
            <button
              onClick={() => setSceneParts(sceneParts.slice(0, -1))}
              className="p-3 rounded-2xl bg-slate-200 dark:bg-slate-700 font-black text-xs"
            >
              Quitar última
            </button>
            <button
              onClick={() => setSceneParts([])}
              className="math-btn text-xs py-3"
            >
              Borrar dibujo
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <TopicCard
      icon="🔷"
      title="Figuras Geométricas Planas"
      color="#6366f1"
      desc="Reconoce, nombra, compara, dibuja, clasifica y construye figuras planas con formas más limpias y entendibles."
    >
      <div className="lab-container space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {modes.map(m => (
            <button
              key={m.id}
              onClick={() => {
                setMode(m.id);
                resetMode();
              }}
              className={`p-3 rounded-2xl font-black text-xs transition-all ${
                mode === m.id ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color hover:scale-105'
              }`}
            >
              <span className="text-2xl block mb-1">{m.icon}</span>
              {m.label}
            </button>
          ))}
        </div>

        {mode === 'catalogo' && renderCatalogo()}
        {mode === 'reconocer' && renderReconocer()}
        {mode === 'atributos' && renderAtributos()}
        {mode === 'comparar' && renderComparar()}
        {mode === 'dibujar' && renderDibujar()}
        {mode === 'entorno' && renderEntorno()}
        {mode === 'clasificar' && renderClasificar()}
        {mode === 'plastilina' && renderPlastilina()}
        {mode === 'crear' && renderCrear()}
      </div>
    </TopicCard>
  );
};










export const Comparaciones: React.FC = () => {
  const [size, setSize] = useState(50);
  return (
    <TopicCard icon="📏" title="Grande, Mediano, Pequeño" color="#f97316"
      desc="Aprende a comparar tamaños. Mueve el control y observa cómo crece o decrece la pelota:">
      <div className="lab-container">
        <NumberInput label="Tamaño" value={size} setValue={setSize} min={20} max={150} color="#f97316" />
        <div className="flex items-end justify-center gap-4 my-6 h-48">
          <div className="rounded-full bg-blue-500 shadow-xl flex items-center justify-center text-white font-black text-xs" style={{ width: 40, height: 40 }}>P</div>
          <div className="rounded-full bg-green-500 shadow-xl flex items-center justify-center text-white font-black" style={{ width: size, height: size }}>{size < 50 ? '🤏' : size < 100 ? '🙌' : '🤲'}</div>
          <div className="rounded-full bg-red-500 shadow-xl flex items-center justify-center text-white font-black text-2xl" style={{ width: 150, height: 150 }}>G</div>
        </div>
        <div className="text-center font-black text-base p-3 bg-orange-500/10 rounded-xl">
          {size < 50 ? '🤏 La verde es la MÁS PEQUEÑA' : size < 100 ? '🙌 La verde es de tamaño MEDIANO' : size < 150 ? '🤲 La verde es GRANDE' : '🤲 La verde es igual a la GRANDE'}
        </div>
      </div>
    </TopicCard>
  );
};

export const ConteoPreescolar: React.FC = () => {
  type Mode =
    | 'oral'
    | 'regresivo'
    | 'salteado'
    | 'objetos'
    | 'sonidos'
    | 'numerales'
    | 'trazos'
    | 'subitizar'
    | 'dedos'
    | 'secuencia'
    | 'conjuntos'
    | 'comparar';

  const [mode, setMode] = useState<Mode>('oral');
  const [oralMax, setOralMax] = useState(10);
  const [oralCurrent, setOralCurrent] = useState(1);
  const [countdownMax, setCountdownMax] = useState(5);
  const [countdownCurrent, setCountdownCurrent] = useState(5);
  const [skipCurrent, setSkipCurrent] = useState(2);

  const [objectMode, setObjectMode] = useState<'mover' | 'senalar'>('mover');
  const [objectAmount, setObjectAmount] = useState(7);
  const [countedObjects, setCountedObjects] = useState<number[]>([]);

  const [soundAmount, setSoundAmount] = useState(4);
  const [soundAnswer, setSoundAnswer] = useState<number | null>(null);

  const [numeralMax, setNumeralMax] = useState(5);
  const [numeralTarget, setNumeralTarget] = useState(3);
  const [numeralAnswer, setNumeralAnswer] = useState<number | null>(null);

  const [traceNumber, setTraceNumber] = useState(1);
  const [traceStep, setTraceStep] = useState(0);

  const [subitizeTarget, setSubitizeTarget] = useState(3);
  const [subitizeAnswer, setSubitizeAnswer] = useState<number | null>(null);

  const [fingerNumber, setFingerNumber] = useState(5);

  const [sequenceMax, setSequenceMax] = useState(10);
  const [missingNumber, setMissingNumber] = useState(3);
  const [missingAnswer, setMissingAnswer] = useState<number | null>(null);
  const [linePick, setLinePick] = useState<number[]>([]);
  const [neighborNumber, setNeighborNumber] = useState(5);

  const [buildTarget, setBuildTarget] = useState(4);
  const [builtCount, setBuiltCount] = useState(0);

  const [compareA, setCompareA] = useState(5);
  const [compareB, setCompareB] = useState(3);

  const modes: { id: Mode; label: string; icon: string }[] = [
    { id: 'oral', label: 'Conteo oral', icon: '🗣️' },
    { id: 'regresivo', label: 'Regresivo', icon: '🚀' },
    { id: 'salteado', label: 'De 2 en 2', icon: '🦘' },
    { id: 'objetos', label: 'Objetos', icon: '🍎' },
    { id: 'sonidos', label: 'Sonidos', icon: '👏' },
    { id: 'numerales', label: 'Numerales', icon: '🔢' },
    { id: 'trazos', label: 'Trazos', icon: '✏️' },
    { id: 'subitizar', label: 'Dados', icon: '🎲' },
    { id: 'dedos', label: 'Dedos', icon: '🖐️' },
    { id: 'secuencia', label: 'Secuencia', icon: '📍' },
    { id: 'conjuntos', label: 'Conjuntos', icon: '🧱' },
    { id: 'comparar', label: 'Comparar', icon: '⚖️' },
  ];

  const objectEmojis = ['🍎', '⭐', '🧸', '🚗', '🐟', '🍌', '🎈', '🟣', '🐶', '🌸', '🧩', '⚽'];

  const resetMode = () => {
    setCountedObjects([]);
    setSoundAnswer(null);
    setNumeralAnswer(null);
    setSubitizeAnswer(null);
    setMissingAnswer(null);
    setLinePick([]);
  };

  const dots = (n: number, size = 'w-3 h-3') => (
    <div className="flex gap-1 flex-wrap justify-center max-w-24 mx-auto">
      {Array.from({ length: n }).map((_, i) => (
        <span key={i} className={`${size} rounded-full bg-[var(--primary-color)]`} />
      ))}
    </div>
  );

  const diceDots = (n: number) => {
    const positions: Record<number, string[]> = {
      1: ['place-self-center col-start-2 row-start-2'],
      2: ['col-start-1 row-start-1', 'col-start-3 row-start-3'],
      3: ['col-start-1 row-start-1', 'place-self-center col-start-2 row-start-2', 'col-start-3 row-start-3'],
      4: ['col-start-1 row-start-1', 'col-start-3 row-start-1', 'col-start-1 row-start-3', 'col-start-3 row-start-3'],
      5: ['col-start-1 row-start-1', 'col-start-3 row-start-1', 'place-self-center col-start-2 row-start-2', 'col-start-1 row-start-3', 'col-start-3 row-start-3'],
    };

    return (
      <div className="w-32 h-32 rounded-3xl bg-surface-color border-4 border-border-color shadow grid grid-cols-3 grid-rows-3 p-4 mx-auto">
        {(positions[n] ?? []).map((pos, i) => (
          <span key={i} className={`${pos} w-5 h-5 rounded-full bg-[var(--primary-color)]`} />
        ))}
      </div>
    );
  };

  const numberCard = (n: number, active = false) => (
    <div
      className={`w-16 h-20 md:w-20 md:h-24 rounded-3xl border-2 flex flex-col items-center justify-center shadow font-black transition-all ${
        active
          ? 'bg-[var(--primary-color)] text-white border-[var(--primary-color)] scale-105'
          : 'bg-surface-color border-border-color'
      }`}
    >
      <div className="text-3xl">{n}</div>
      <div className="mt-1">{dots(Math.min(n, 10), 'w-1.5 h-1.5')}</div>
    </div>
  );

  const renderOral = () => {
    const nums = Array.from({ length: oralMax }, (_, i) => i + 1);

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          {[5, 10, 20].map(max => (
            <button
              key={max}
              onClick={() => {
                setOralMax(max);
                setOralCurrent(1);
              }}
              className={`p-3 rounded-2xl font-black ${
                oralMax === max ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color'
              }`}
            >
              1 al {max}
            </button>
          ))}
        </div>

        <div className="p-6 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
          <div className="text-xs font-black uppercase opacity-70 mb-2">Di en voz alta</div>
          <div className="text-8xl font-black" style={{ color: 'var(--primary-color)' }}>{oralCurrent}</div>
          <div className="mt-3 flex justify-center">{dots(Math.min(oralCurrent, 20), 'w-3 h-3')}</div>

          <div className="grid grid-cols-2 gap-2 mt-5">
            <button
              onClick={() => setOralCurrent(Math.max(1, oralCurrent - 1))}
              className="p-3 rounded-2xl bg-slate-200 dark:bg-slate-700 font-black"
            >
              ← Anterior
            </button>
            <button
              onClick={() => setOralCurrent(oralCurrent >= oralMax ? 1 : oralCurrent + 1)}
              className="math-btn py-3"
            >
              Siguiente →
            </button>
          </div>
        </div>

        <div className="grid grid-cols-5 md:grid-cols-10 gap-2">
          {nums.map(n => (
            <button key={n} onClick={() => setOralCurrent(n)} className="flex justify-center">
              {numberCard(n, oralCurrent === n)}
            </button>
          ))}
        </div>

        <div className="lab-formula text-center text-base">
          Contar oralmente es decir los números en orden: 1, 2, 3...
        </div>
      </div>
    );
  };

  const renderRegresivo = () => {
    const nums = Array.from({ length: countdownMax + 1 }, (_, i) => countdownMax - i);

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          {[5, 10].map(max => (
            <button
              key={max}
              onClick={() => {
                setCountdownMax(max);
                setCountdownCurrent(max);
              }}
              className={`p-3 rounded-2xl font-black ${
                countdownMax === max ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color'
              }`}
            >
              Desde {max}
            </button>
          ))}
        </div>

        <div className="p-6 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center overflow-hidden relative">
          <div className="text-xs font-black uppercase opacity-70 mb-2">Cuenta regresiva</div>

          <motion.div
            key={countdownCurrent}
            initial={{ y: 20, scale: 0.7, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            className="text-8xl font-black"
            style={{ color: countdownCurrent === 0 ? '#ef4444' : 'var(--primary-color)' }}
          >
            {countdownCurrent}
          </motion.div>

          <motion.div
            animate={{ y: countdownCurrent === 0 ? -80 : 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 12 }}
            className="text-7xl my-4"
          >
            {countdownCurrent === 0 ? '🚀' : '🧑‍🚀'}
          </motion.div>

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setCountdownCurrent(Math.max(0, countdownCurrent - 1))}
              className="math-btn py-3"
            >
              Bajar 1
            </button>
            <button
              onClick={() => setCountdownCurrent(countdownMax)}
              className="p-3 rounded-2xl bg-slate-200 dark:bg-slate-700 font-black"
            >
              Reiniciar
            </button>
          </div>
        </div>

        <div className="flex gap-2 flex-wrap justify-center">
          {nums.map(n => (
            <button key={n} onClick={() => setCountdownCurrent(n)}>
              {numberCard(n, countdownCurrent === n)}
            </button>
          ))}
        </div>

        <div className="lab-formula text-center text-base">
          Contar regresivo es ir hacia atrás: {countdownMax}, {countdownMax - 1}, {countdownMax - 2}...
        </div>
      </div>
    );
  };

  const renderSalteado = () => {
    const nums = [2, 4, 6, 8, 10];

    return (
      <div className="space-y-4">
        <div className="p-6 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
          <div className="text-xs font-black uppercase opacity-70 mb-2">Conteo salteado de 2 en 2</div>
          <motion.div
            key={skipCurrent}
            initial={{ scale: 0.8, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="text-8xl mb-2"
          >
            🦘
          </motion.div>

          <div className="text-7xl font-black" style={{ color: 'var(--primary-color)' }}>{skipCurrent}</div>

          <div className="grid grid-cols-2 gap-2 mt-5">
            <button
              onClick={() => setSkipCurrent(skipCurrent >= 10 ? 2 : skipCurrent + 2)}
              className="math-btn py-3"
            >
              Saltar +2
            </button>
            <button
              onClick={() => setSkipCurrent(2)}
              className="p-3 rounded-2xl bg-slate-200 dark:bg-slate-700 font-black"
            >
              Reiniciar
            </button>
          </div>
        </div>

        <div className="flex justify-center gap-2 flex-wrap">
          {nums.map(n => (
            <button key={n} onClick={() => setSkipCurrent(n)}>
              {numberCard(n, skipCurrent === n)}
            </button>
          ))}
        </div>

        <div className="lab-formula text-center text-base">
          Saltar de 2 en 2: 2, 4, 6, 8, 10.
        </div>
      </div>
    );
  };

  const renderObjetos = () => {
    const indexes = Array.from({ length: objectAmount }, (_, i) => i);
    const counted = countedObjects.length;
    const allDone = counted === objectAmount;

    const toggle = (i: number) => {
      if (countedObjects.includes(i)) return;
      setCountedObjects([...countedObjects, i]);
    };

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={() => {
              setObjectMode('mover');
              setCountedObjects([]);
            }}
            className={`p-3 rounded-2xl font-black ${objectMode === 'mover' ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color'}`}
          >
            Mover objetos
          </button>
          <button
            onClick={() => {
              setObjectMode('senalar');
              setCountedObjects([]);
            }}
            className={`p-3 rounded-2xl font-black ${objectMode === 'senalar' ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color'}`}
          >
            Señalar objetos
          </button>
        </div>

        <NumberInput label="Cantidad de objetos" value={objectAmount} setValue={(v) => {
          setObjectAmount(v);
          setCountedObjects([]);
        }} min={1} max={12} color="#22c55e" />

        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow">
            <div className="text-xs font-black uppercase opacity-70 mb-3">Colección desordenada</div>
            <div className="relative min-h-72 rounded-3xl bg-black/5 border-2 border-border-color overflow-hidden">
              {indexes.map(i => {
                const positions = [
                  [12, 18], [62, 15], [34, 35], [78, 42], [18, 62], [50, 68],
                  [82, 76], [42, 16], [66, 62], [28, 78], [10, 42], [55, 46],
                ];
                const [x, y] = positions[i % positions.length];
                const isCounted = countedObjects.includes(i);

                return (
                  <button
                    key={i}
                    onClick={() => toggle(i)}
                    className={`absolute text-5xl transition-all ${
                      isCounted
                        ? objectMode === 'mover'
                          ? 'opacity-20 scale-75'
                          : 'ring-4 ring-emerald-500 rounded-3xl scale-110'
                        : 'hover:scale-125'
                    }`}
                    style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                  >
                    {objectEmojis[i % objectEmojis.length]}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30 shadow">
            <div className="text-xs font-black uppercase opacity-70 mb-3">Contados</div>

            {objectMode === 'mover' ? (
              <div className="min-h-40 flex gap-2 flex-wrap justify-center items-center text-5xl">
                {countedObjects.length === 0 && <div className="text-sm font-bold opacity-60">Toca objetos para moverlos aquí.</div>}
                {countedObjects.map(i => <span key={i}>{objectEmojis[i % objectEmojis.length]}</span>)}
              </div>
            ) : (
              <div className="min-h-40 flex flex-col justify-center items-center">
                <div className="text-7xl font-black" style={{ color: 'var(--primary-color)' }}>{counted}</div>
                <div className="font-black">objetos señalados</div>
              </div>
            )}

            <div className="mt-4 p-3 rounded-2xl bg-surface-color border-2 border-border-color text-center font-black">
              Hay {counted} de {objectAmount}. {allDone ? `Cardinalidad: hay ${objectAmount} en total.` : 'Sigue contando uno por uno.'}
            </div>

            <button onClick={() => setCountedObjects([])} className="math-btn w-full mt-3">
              Reiniciar conteo
            </button>
          </div>
        </div>
      </div>
    );
  };

  // 🔊 Reproduce N sonidos reales en secuencia (palmada/campana alternadas)
  const playSounds = (n: number) => {
    try {
      const Ctx = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new Ctx();
      const gap = 0.5; // segundos entre cada sonido
      for (let i = 0; i < n; i++) {
        const t0 = ctx.currentTime + i * gap;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = i % 2 === 0 ? 'triangle' : 'sine';
        osc.frequency.value = i % 2 === 0 ? 440 : 660; // 👏 grave / 🔔 agudo
        gain.gain.setValueAtTime(0.0001, t0);
        gain.gain.exponentialRampToValueAtTime(0.4, t0 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.22);
        osc.connect(gain).connect(ctx.destination);
        osc.start(t0);
        osc.stop(t0 + 0.25);
      }
      setTimeout(() => ctx.close(), (n * gap + 0.4) * 1000);
    } catch {
      /* navegador sin Web Audio: el modo sigue siendo valido al revelar los simbolos */
    }
  };

  const renderSonidos = () => {
    const options = [1, 2, 3, 4, 5, 6, 7, 8];
    const ok = soundAnswer === soundAmount;
    const revealed = soundAnswer !== null; // los simbolos se muestran SOLO tras responder

    return (
      <div className="space-y-4">
        <NumberInput label="¿Cuántos sonidos reproducir?" value={soundAmount} setValue={(v) => {
          setSoundAmount(v);
          setSoundAnswer(null);
        }} min={1} max={8} color="#a855f7" />

        <div className="p-6 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
          <div className="text-xs font-black uppercase opacity-70 mb-3">Escucha y cuenta los sonidos</div>

          <button
            onClick={() => playSounds(soundAmount)}
            className="px-6 py-3 mb-4 rounded-2xl font-black text-white shadow-lg hover:scale-105 active:scale-95 transition-all"
            style={{ background: '#a855f7' }}
          >
            ▶ Escuchar sonidos
          </button>

          {/* Mientras no responde, NO se ve la cantidad: cuenta de oido */}
          <div className="flex gap-2 flex-wrap justify-center text-5xl mb-4 min-h-[3.5rem] items-center">
            {revealed ? (
              Array.from({ length: soundAmount }).map((_, i) => (
                <motion.span
                  key={i}
                  initial={{ scale: 0.7, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: i * 0.08 }}
                >
                  {i % 2 === 0 ? '👏' : '🔔'}
                </motion.span>
              ))
            ) : (
              <span className="opacity-40">🎧</span>
            )}
          </div>

          <div className="grid grid-cols-4 gap-2">
            {options.map(n => (
              <button
                key={n}
                onClick={() => setSoundAnswer(n)}
                className={`p-3 rounded-2xl font-black text-2xl border-2 ${
                  soundAnswer === n
                    ? n === soundAmount ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-red-500 text-white border-red-500'
                    : 'bg-surface-color border-border-color hover:scale-105'
                }`}
              >
                {n}
              </button>
            ))}
          </div>

          {soundAnswer !== null && (
            <div className={`mt-4 p-4 rounded-2xl font-black text-white ${ok ? 'bg-emerald-500' : 'bg-red-500'}`}>
              {ok ? '✅ ¡Correcto! Contaste los sonidos.' : '❌ Casi. Toca ▶ y cuenta cada palmada o campanada una vez.'}
            </div>
          )}
        </div>
      </div>
    );
  };
  const renderNumerales = () => {
    const options = Array.from({ length: numeralMax }, (_, i) => i + 1);
    const ok = numeralAnswer === numeralTarget;

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          {[5, 10].map(max => (
            <button
              key={max}
              onClick={() => {
                setNumeralMax(max);
                setNumeralTarget(Math.min(numeralTarget, max));
                setNumeralAnswer(null);
              }}
              className={`p-3 rounded-2xl font-black ${
                numeralMax === max ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color'
              }`}
            >
              Numerales 1 al {max}
            </button>
          ))}
        </div>

        <div className="p-6 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
          <div className="text-xs font-black uppercase opacity-70 mb-2">Reconoce el numeral</div>
          <div className="text-9xl font-black" style={{ color: 'var(--primary-color)' }}>{numeralTarget}</div>
          <p className="text-sm font-bold opacity-75 mb-4">¿Cuál cantidad pertenece a este número?</p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {options.map(n => (
              <button
                key={n}
                onClick={() => setNumeralAnswer(n)}
                className={`p-3 rounded-2xl border-2 transition-all ${
                  numeralAnswer === n
                    ? n === numeralTarget ? 'bg-emerald-500 border-emerald-500 text-white scale-105' : 'bg-red-500 border-red-500 text-white'
                    : 'bg-surface-color border-border-color hover:scale-105'
                }`}
              >
                <div className="font-black mb-2">{n}</div>
                {dots(n, 'w-2 h-2')}
              </button>
            ))}
          </div>

          {numeralAnswer !== null && (
            <div className={`mt-4 p-4 rounded-2xl font-black text-white ${ok ? 'bg-emerald-500' : 'bg-red-500'}`}>
              {ok ? `✅ Sí, ${numeralTarget} representa ${numeralTarget} unidad(es).` : '❌ Casi. Mira la cantidad de puntos.'}
            </div>
          )}

          <button
            onClick={() => {
              setNumeralTarget(numeralTarget >= numeralMax ? 1 : numeralTarget + 1);
              setNumeralAnswer(null);
            }}
            className="math-btn w-full mt-4"
          >
            Siguiente numeral
          </button>
        </div>
      </div>
    );
  };

  const renderTrazos = () => {
    const traceHints: Record<number, string[]> = {
      1: ['Empieza arriba.', 'Baja derechito.', 'Termina abajo.'],
      2: ['Curva arriba.', 'Baja en diagonal.', 'Raya abajo.'],
      3: ['Curva arriba.', 'Curva abajo.', 'Cierra suave.'],
      4: ['Baja una línea.', 'Cruza al lado.', 'Baja derechito.'],
      5: ['Raya arriba.', 'Baja.', 'Curva abajo.'],
      6: ['Baja haciendo curva.', 'Cierra el círculo.', 'Termina redondo.'],
      7: ['Raya arriba.', 'Baja en diagonal.'],
      8: ['Haz un círculo arriba.', 'Haz un círculo abajo.'],
      9: ['Círculo arriba.', 'Baja la línea.'],
      10: ['Traza el 1.', 'Luego traza el 0.'],
    };

    const hints = traceHints[traceNumber] ?? traceHints[1];
    const currentHint = hints[traceStep % hints.length];

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-5 gap-2">
          {Array.from({ length: 10 }).map((_, i) => {
            const n = i + 1;
            return (
              <button
                key={n}
                onClick={() => {
                  setTraceNumber(n);
                  setTraceStep(0);
                }}
                className={`p-3 rounded-2xl font-black ${
                  traceNumber === n ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color'
                }`}
              >
                {n}
              </button>
            );
          })}
        </div>

        <div className="p-6 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
          <div className="text-xs font-black uppercase opacity-70 mb-2">Traza con tu dedo</div>

          <div className="relative mx-auto w-64 h-72 rounded-3xl bg-amber-100/40 border-4 border-amber-500/50 shadow-inner flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle,#92400e_1px,transparent_1px)] bg-[length:18px_18px]" />
            <motion.div
              key={`${traceNumber}-${traceStep}`}
              initial={{ scale: 0.8, opacity: 0.5 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-[12rem] leading-none font-black text-amber-700 select-none"
            >
              {traceNumber}
            </motion.div>
            <motion.div
              animate={{ x: traceStep % 2 === 0 ? -50 : 50, y: traceStep % 3 === 0 ? -70 : 70 }}
              transition={{ type: 'spring', stiffness: 100, damping: 12 }}
              className="absolute text-4xl"
            >
              ☝️
            </motion.div>
          </div>

          <div className="mt-4 p-3 rounded-2xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30 font-black">
            {currentHint}
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4">
            <button onClick={() => setTraceStep(Math.max(0, traceStep - 1))} className="p-3 rounded-2xl bg-slate-200 dark:bg-slate-700 font-black">
              Paso anterior
            </button>
            <button onClick={() => setTraceStep(traceStep + 1)} className="math-btn py-3">
              Siguiente paso
            </button>
          </div>
        </div>

        <div className="lab-formula text-center text-base">
          Puedes imaginar que trazas el número en arena, harina o papel.
        </div>
      </div>
    );
  };

  const renderSubitizar = () => {
    const options = [1, 2, 3, 4, 5];
    const ok = subitizeAnswer === subitizeTarget;

    return (
      <div className="space-y-4">
        <div className="p-6 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
          <div className="text-xs font-black uppercase opacity-70 mb-2">Subitizar</div>
          <p className="text-sm font-bold opacity-75 mb-4">Mira el dado y di cuántos hay sin contar uno por uno.</p>

          {diceDots(subitizeTarget)}

          <div className="grid grid-cols-5 gap-2 mt-5">
            {options.map(n => (
              <button
                key={n}
                onClick={() => setSubitizeAnswer(n)}
                className={`p-3 rounded-2xl font-black text-2xl border-2 ${
                  subitizeAnswer === n
                    ? n === subitizeTarget ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-red-500 text-white border-red-500'
                    : 'bg-surface-color border-border-color hover:scale-105'
                }`}
              >
                {n}
              </button>
            ))}
          </div>

          {subitizeAnswer !== null && (
            <div className={`mt-4 p-4 rounded-2xl font-black text-white ${ok ? 'bg-emerald-500' : 'bg-red-500'}`}>
              {ok ? '✅ ¡Correcto! Lo reconociste de un vistazo.' : '❌ Casi. Observa la forma de los puntos.'}
            </div>
          )}

          <button
            onClick={() => {
              setSubitizeTarget(subitizeTarget >= 5 ? 1 : subitizeTarget + 1);
              setSubitizeAnswer(null);
            }}
            className="math-btn w-full mt-4"
          >
            Otro dado
          </button>
        </div>
      </div>
    );
  };

  const renderDedos = () => {
    const left = Math.min(fingerNumber, 5);
    const right = Math.max(0, fingerNumber - 5);

    return (
      <div className="space-y-4">
        <NumberInput label="Número con dedos" value={fingerNumber} setValue={setFingerNumber} min={1} max={10} color="#f59e0b" />

        <div className="p-6 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
          <div className="text-xs font-black uppercase opacity-70 mb-3">Representar con dedos</div>
          <div className="text-8xl font-black mb-4" style={{ color: 'var(--primary-color)' }}>{fingerNumber}</div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-5 rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30">
              <div className="text-7xl mb-2">🖐️</div>
              <div className="font-black">Mano izquierda: {left}</div>
              <div className="mt-2">{dots(left, 'w-4 h-4')}</div>
            </div>
            <div className="p-5 rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30">
              <div className="text-7xl mb-2">🖐️</div>
              <div className="font-black">Mano derecha: {right}</div>
              <div className="mt-2">{right > 0 ? dots(right, 'w-4 h-4') : <span className="font-bold opacity-60">sin dedos levantados</span>}</div>
            </div>
          </div>
        </div>

        <div className="lab-formula text-center text-base">
          {fingerNumber} = {left} dedo(s) en una mano + {right} dedo(s) en la otra.
        </div>
      </div>
    );
  };

  const renderSecuencia = () => {
    const seq = Array.from({ length: sequenceMax }, (_, i) => i + 1);
    const lineDone = linePick.length === Math.min(sequenceMax, 10);
    const lineOk = lineDone && linePick.every((n, i) => n === i + 1);

    return (
      <div className="space-y-4">
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow">
            <div className="font-black text-lg mb-2">Número faltante</div>
            <div className="flex gap-2 flex-wrap justify-center text-3xl font-black mb-4">
              {[1, 2, missingNumber === 3 ? null : 3, 4, 5].map((n, i) => (
                <div key={i} className="w-14 h-14 rounded-2xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30 flex items-center justify-center">
                  {n ?? '___'}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-5 gap-2">
              {[1, 2, 3, 4, 5].map(n => (
                <button
                  key={n}
                  onClick={() => setMissingAnswer(n)}
                  className={`p-3 rounded-xl font-black ${
                    missingAnswer === n
                      ? n === missingNumber ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
                      : 'bg-slate-200 dark:bg-slate-700'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>

            {missingAnswer !== null && (
              <div className={`mt-3 p-3 rounded-2xl font-black text-center text-white ${missingAnswer === missingNumber ? 'bg-emerald-500' : 'bg-red-500'}`}>
                {missingAnswer === missingNumber ? '✅ ¡Correcto!' : '❌ Casi.'}
              </div>
            )}
          </div>

          <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow">
            <div className="font-black text-lg mb-2">Antecesor y sucesor</div>
            <NumberInput label="Número" value={neighborNumber} setValue={setNeighborNumber} min={2} max={9} color="#0ea5e9" />
            <div className="grid grid-cols-3 gap-2 mt-4 text-center">
              <div className="p-3 rounded-2xl bg-slate-200 dark:bg-slate-700">
                <div className="text-xs font-black opacity-60">Antes</div>
                <div className="text-3xl font-black">{neighborNumber - 1}</div>
              </div>
              <div className="p-3 rounded-2xl bg-[var(--primary-color)] text-white">
                <div className="text-xs font-black opacity-80">Número</div>
                <div className="text-3xl font-black">{neighborNumber}</div>
              </div>
              <div className="p-3 rounded-2xl bg-slate-200 dark:bg-slate-700">
                <div className="text-xs font-black opacity-60">Después</div>
                <div className="text-3xl font-black">{neighborNumber + 1}</div>
              </div>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow">
            <div className="font-black text-lg mb-2">Recta numérica</div>
            <div className="grid grid-cols-2 gap-2 mb-3">
              {[5, 10].map(max => (
                <button
                  key={max}
                  onClick={() => {
                    setSequenceMax(max);
                    setLinePick([]);
                  }}
                  className={`p-2 rounded-xl font-black text-xs ${sequenceMax === max ? 'bg-[var(--primary-color)] text-white' : 'bg-slate-200 dark:bg-slate-700'}`}
                >
                  1 al {max}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-5 gap-2">
              {seq.map(n => (
                <button
                  key={n}
                  onClick={() => setLinePick(linePick.includes(n) ? linePick : [...linePick, n])}
                  disabled={linePick.includes(n)}
                  className={`p-2 rounded-xl font-black ${
                    linePick.includes(n) ? 'opacity-40 bg-slate-200 dark:bg-slate-700' : 'bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30'
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>

            <div className="flex gap-1 flex-wrap justify-center mt-4">
              {linePick.map(n => (
                <div key={n} className="w-10 h-10 rounded-full bg-[var(--primary-color)] text-white flex items-center justify-center font-black">
                  {n}
                </div>
              ))}
            </div>

            {lineDone && (
              <div className={`mt-3 p-3 rounded-2xl font-black text-center text-white ${lineOk ? 'bg-emerald-500' : 'bg-red-500'}`}>
                {lineOk ? '✅ Recta ordenada.' : '❌ Revisa el orden.'}
              </div>
            )}
          </div>
        </div>

        <button onClick={() => {
          setLinePick([]);
          setMissingAnswer(null);
        }} className="math-btn w-full">
          Reiniciar secuencias
        </button>
      </div>
    );
  };

  const renderConjuntos = () => {
    const done = builtCount === buildTarget;

    return (
      <div className="space-y-4">
        <NumberInput label="Dame esta cantidad de bloques" value={buildTarget} setValue={(v) => {
          setBuildTarget(v);
          setBuiltCount(0);
        }} min={1} max={10} color="#ec4899" />

        <div className="grid md:grid-cols-[1fr_260px] gap-4">
          <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow">
            <div className="font-black text-xl mb-1">Forma un conjunto</div>
            <p className="text-sm font-bold opacity-75 mb-4">Agrega bloques hasta tener exactamente {buildTarget}.</p>

            <div className="min-h-44 flex gap-2 flex-wrap justify-center items-center">
              {Array.from({ length: builtCount }).map((_, i) => (
                <div key={i} className="w-14 h-14 rounded-2xl bg-pink-400 border-2 border-pink-600 shadow flex items-center justify-center text-white font-black">
                  {i + 1}
                </div>
              ))}
              {builtCount === 0 && <span className="font-bold opacity-60">Todavía no hay bloques.</span>}
            </div>

            <div className="grid grid-cols-3 gap-2 mt-4">
              <button onClick={() => setBuiltCount(Math.max(0, builtCount - 1))} className="p-3 rounded-2xl bg-slate-200 dark:bg-slate-700 font-black">−1</button>
              <button onClick={() => setBuiltCount(0)} className="p-3 rounded-2xl bg-slate-200 dark:bg-slate-700 font-black">0</button>
              <button onClick={() => setBuiltCount(Math.min(10, builtCount + 1))} className="math-btn py-3">+1</button>
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30 shadow text-center">
            <div className="text-xs font-black uppercase opacity-70 mb-2">Cardinalidad</div>
            <div className="text-7xl font-black" style={{ color: 'var(--primary-color)' }}>{builtCount}</div>
            <div className="font-black mt-2">
              Hay {builtCount} bloque(s).
            </div>
            <div className={`mt-4 p-3 rounded-2xl text-white font-black ${done ? 'bg-emerald-500' : 'bg-amber-500'}`}>
              {done ? `✅ Exacto: formaste ${buildTarget}.` : `Necesitas ${buildTarget}.`}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderComparar = () => {
    const relation = compareA > compareB ? 'más' : compareA < compareB ? 'menos' : 'igual';
    const symbol = compareA > compareB ? '>' : compareA < compareB ? '<' : '=';

    return (
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-3">
          <NumberInput label="Colección A" value={compareA} setValue={setCompareA} min={0} max={12} color="#ef4444" />
          <NumberInput label="Colección B" value={compareB} setValue={setCompareB} min={0} max={12} color="#3b82f6" />
        </div>

        <div className="grid md:grid-cols-[1fr_140px_1fr] gap-4 items-center">
          <div className="p-5 rounded-3xl bg-red-500/10 border-2 border-red-500/30 shadow text-center">
            <div className="font-black mb-2">Colección A</div>
            <div className="flex gap-1 flex-wrap justify-center text-4xl min-h-24">
              {Array.from({ length: compareA }).map((_, i) => <span key={i}>🍎</span>)}
            </div>
            <div className="font-black mt-2">{compareA}</div>
          </div>

          <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
            <div className="text-6xl font-black" style={{ color: 'var(--primary-color)' }}>{symbol}</div>
            <div className="text-xs font-black uppercase opacity-70">{relation}</div>
          </div>

          <div className="p-5 rounded-3xl bg-blue-500/10 border-2 border-blue-500/30 shadow text-center">
            <div className="font-black mb-2">Colección B</div>
            <div className="flex gap-1 flex-wrap justify-center text-4xl min-h-24">
              {Array.from({ length: compareB }).map((_, i) => <span key={i}>🫐</span>)}
            </div>
            <div className="font-black mt-2">{compareB}</div>
          </div>
        </div>

        <div className="lab-formula text-center text-base">
          La colección A tiene {relation === 'más' ? 'MÁS que' : relation === 'menos' ? 'MENOS que' : 'IGUAL cantidad que'} la colección B.
        </div>
      </div>
    );
  };

  return (
    <TopicCard
      icon="🔢"
      title="Conteo y Números"
      color="#22c55e"
      desc="Cuenta oralmente, hacia atrás, de 2 en 2, objetos, sonidos, dados, dedos, numerales, trazos, secuencias, conjuntos y comparaciones."
    >
      <div className="lab-container space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {modes.map(m => (
            <button
              key={m.id}
              onClick={() => {
                setMode(m.id);
                resetMode();
              }}
              className={`p-3 rounded-2xl font-black text-xs transition-all ${
                mode === m.id ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color hover:scale-105'
              }`}
            >
              <span className="text-2xl block mb-1">{m.icon}</span>
              {m.label}
            </button>
          ))}
        </div>

        {mode === 'oral' && renderOral()}
        {mode === 'regresivo' && renderRegresivo()}
        {mode === 'salteado' && renderSalteado()}
        {mode === 'objetos' && renderObjetos()}
        {mode === 'sonidos' && renderSonidos()}
        {mode === 'numerales' && renderNumerales()}
        {mode === 'trazos' && renderTrazos()}
        {mode === 'subitizar' && renderSubitizar()}
        {mode === 'dedos' && renderDedos()}
        {mode === 'secuencia' && renderSecuencia()}
        {mode === 'conjuntos' && renderConjuntos()}
        {mode === 'comparar' && renderComparar()}
      </div>
    </TopicCard>
  );
};




export const Patrones: React.FC = () => {
  type Mode = 'copiar' | 'extender' | 'crear' | 'faltante' | 'traducir' | 'movimiento' | 'sonido' | 'calendario';
  type PatternKind = 'AB' | 'AABB' | 'ABB' | 'ABC';

  const [mode, setMode] = useState<Mode>('copiar');
  const [kind, setKind] = useState<PatternKind>('AB');
  const [copyPick, setCopyPick] = useState<string[]>([]);
  const [extendAnswer, setExtendAnswer] = useState<string | null>(null);
  const [builder, setBuilder] = useState<string[]>([]);
  const [missingIdx, setMissingIdx] = useState(0);
  const [missingAnswer, setMissingAnswer] = useState<string | null>(null);
  const [translationPick, setTranslationPick] = useState<string[]>([]);
  const [bodyPattern, setBodyPattern] = useState<'palma-pie' | 'salto-giro' | 'arriba-abajo'>('palma-pie');
  const [soundPattern, setSoundPattern] = useState<'fuerte-suave' | 'rapido-lento' | 'grave-agudo'>('fuerte-suave');
  const [calendarStart, setCalendarStart] = useState(0);
  const [calendarAnswer, setCalendarAnswer] = useState<string | null>(null);

  const modes: { id: Mode; label: string; icon: string }[] = [
    { id: 'copiar', label: 'Copiar', icon: '👀' },
    { id: 'extender', label: 'Extender', icon: '➡️' },
    { id: 'crear', label: 'Crear', icon: '🧩' },
    { id: 'faltante', label: 'Faltante', icon: '❓' },
    { id: 'traducir', label: 'Traducir', icon: '🔄' },
    { id: 'movimiento', label: 'Movimiento', icon: '👏' },
    { id: 'sonido', label: 'Sonidos', icon: '🔊' },
    { id: 'calendario', label: 'Calendario', icon: '📅' },
  ];

  const shapeTokens = {
    redCircle: { label: 'círculo rojo', color: '#ef4444', shape: 'circle' },
    blueSquare: { label: 'cuadrado azul', color: '#3b82f6', shape: 'square' },
    yellowTriangle: { label: 'triángulo amarillo', color: '#facc15', shape: 'triangle' },
    greenCircle: { label: 'círculo verde', color: '#22c55e', shape: 'circle' },
    purpleDiamond: { label: 'rombo morado', color: '#a855f7', shape: 'diamond' },
    orangeStar: { label: 'estrella naranja', color: '#f97316', shape: 'star' },
    pinkSquare: { label: 'cuadrado rosa', color: '#ec4899', shape: 'square' },
    cyanTriangle: { label: 'triángulo celeste', color: '#06b6d4', shape: 'triangle' },
  } as const;

  const tokenLabels: Record<string, string> = {
    redCircle: 'círculo rojo',
    blueSquare: 'cuadrado azul',
    yellowTriangle: 'triángulo amarillo',
    greenCircle: 'círculo verde',
    purpleDiamond: 'rombo morado',
    orangeStar: 'estrella naranja',
    pinkSquare: 'cuadrado rosa',
    cyanTriangle: 'triángulo celeste',
    '🍎': 'manzana',
    '🍌': 'plátano',
    '⭐': 'estrella',
    '🚗': 'auto',
    '🧸': 'oso',
    '🐟': 'pez',
    '👏': 'palma',
    '🦶': 'pie',
    '🌀': 'giro',
    '⬆️': 'arriba',
    '⬇️': 'abajo',
    '🔊': 'fuerte',
    '🔉': 'suave',
    '⚡': 'rápido',
    '🐢': 'lento',
    '🎵': 'agudo',
    '🥁': 'grave',
  };

  const patternDefs: Record<PatternKind, { label: string; desc: string; unit: string[]; example: string[] }> = {
    AB: {
      label: 'AB',
      desc: 'Se repiten dos elementos: A, B, A, B...',
      unit: ['redCircle', 'blueSquare'],
      example: ['redCircle', 'blueSquare', 'redCircle', 'blueSquare', 'redCircle', 'blueSquare'],
    },
    AABB: {
      label: 'AABB',
      desc: 'Dos iguales, luego dos iguales: A, A, B, B...',
      unit: ['redCircle', 'redCircle', 'blueSquare', 'blueSquare'],
      example: ['redCircle', 'redCircle', 'blueSquare', 'blueSquare', 'redCircle', 'redCircle', 'blueSquare', 'blueSquare'],
    },
    ABB: {
      label: 'ABB',
      desc: 'Uno diferente y dos iguales: A, B, B...',
      unit: ['yellowTriangle', 'greenCircle', 'greenCircle'],
      example: ['yellowTriangle', 'greenCircle', 'greenCircle', 'yellowTriangle', 'greenCircle', 'greenCircle'],
    },
    ABC: {
      label: 'ABC',
      desc: 'Tres elementos se repiten: A, B, C...',
      unit: ['redCircle', 'blueSquare', 'yellowTriangle'],
      example: ['redCircle', 'blueSquare', 'yellowTriangle', 'redCircle', 'blueSquare', 'yellowTriangle'],
    },
  };

  const palette = ['redCircle', 'blueSquare', 'yellowTriangle', 'greenCircle', 'purpleDiamond', 'orangeStar', 'pinkSquare', 'cyanTriangle', '🍎', '🍌', '⭐', '🚗', '🧸', '🐟'];

  const patternStructure: Record<PatternKind, number[]> = {
    AB: [0, 1],
    AABB: [0, 0, 1, 1],
    ABB: [0, 1, 1],
    ABC: [0, 1, 2],
  };

  const builderLength: Record<PatternKind, number> = {
    AB: 6,
    AABB: 8,
    ABB: 6,
    ABC: 6,
  };

  const renderToken = (token: string, size: 'sm' | 'md' | 'lg' = 'md') => {
    if (token === '?') {
      return (
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-amber-300 border-4 border-amber-500 flex items-center justify-center font-black text-3xl animate-pulse text-slate-900">
          ?
        </div>
      );
    }

    const info = shapeTokens[token as keyof typeof shapeTokens];
    const box = size === 'lg' ? 'w-20 h-20 md:w-24 md:h-24' : size === 'sm' ? 'w-12 h-12 md:w-14 md:h-14' : 'w-16 h-16 md:w-20 md:h-20';
    const emojiSize = size === 'lg' ? 'text-6xl' : size === 'sm' ? 'text-3xl' : 'text-5xl';

    if (!info) {
      return (
        <div className={`${box} rounded-3xl bg-surface-color border-2 border-border-color shadow flex items-center justify-center`}>
          <span className={`${emojiSize} leading-none`}>{token}</span>
        </div>
      );
    }

    if (info.shape === 'circle') {
      return <div className={`${box} rounded-full shadow border-4 border-white/70`} style={{ background: info.color }} />;
    }

    if (info.shape === 'square') {
      return <div className={`${box} rounded-2xl shadow border-4 border-white/70`} style={{ background: info.color }} />;
    }

    if (info.shape === 'diamond') {
      return (
        <div className={`${box} flex items-center justify-center`}>
          <div className="w-12 h-12 md:w-16 md:h-16 rotate-45 rounded-xl shadow border-4 border-white/70" style={{ background: info.color }} />
        </div>
      );
    }

    if (info.shape === 'star') {
      return (
        <div className={`${box} flex items-center justify-center`}>
          <span className="text-6xl leading-none drop-shadow" style={{ color: info.color }}>★</span>
        </div>
      );
    }

    return (
      <div className={`${box} flex items-center justify-center`}>
        <div
          className="w-0 h-0 drop-shadow"
          style={{
            borderLeft: size === 'lg' ? '38px solid transparent' : '30px solid transparent',
            borderRight: size === 'lg' ? '38px solid transparent' : '30px solid transparent',
            borderBottom: size === 'lg' ? `72px solid ${info.color}` : `58px solid ${info.color}`,
          }}
        />
      </div>
    );
  };

  const renderPatternRow = (seq: string[], title?: string) => (
    <div className="p-4 rounded-3xl bg-surface-color border-2 border-border-color shadow">
      {title && <div className="text-xs font-black uppercase opacity-70 mb-3">{title}</div>}
      <div className="flex gap-2 flex-wrap justify-center items-center">
        {seq.map((token, i) => (
          <div key={`${token}-${i}`} className="flex flex-col items-center gap-1">
            {renderToken(token)}
            <div className="text-[10px] font-black opacity-50">#{i + 1}</div>
          </div>
        ))}
      </div>
    </div>
  );

  const resetModeData = () => {
    setCopyPick([]);
    setExtendAnswer(null);
    setBuilder([]);
    setMissingAnswer(null);
    setTranslationPick([]);
    setCalendarAnswer(null);
  };

  const isExpectedPattern = (seq: string[], k: PatternKind) => {
    const structure = patternStructure[k];
    const assigned: Record<number, string> = {};

    if (seq.length !== builderLength[k]) return false;

    for (let i = 0; i < seq.length; i++) {
      const slot = structure[i % structure.length];
      const token = seq[i];

      if (!assigned[slot]) {
        assigned[slot] = token;
      } else if (assigned[slot] !== token) {
        return false;
      }
    }

    const values = Object.values(assigned);
    return new Set(values).size === values.length;
  };

  const renderKindButtons = () => (
    <div className="grid grid-cols-4 gap-2">
      {(Object.keys(patternDefs) as PatternKind[]).map(k => (
        <button
          key={k}
          onClick={() => {
            setKind(k);
            resetModeData();
          }}
          className={`p-3 rounded-2xl font-black transition-all ${
            kind === k ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color hover:scale-105'
          }`}
        >
          {k}
        </button>
      ))}
    </div>
  );

  const renderCopiar = () => {
    const target = patternDefs[kind].example;
    const ok = copyPick.length === target.length && copyPick.every((t, i) => t === target[i]);

    return (
      <div className="space-y-4">
        {renderKindButtons()}

        <div className="lab-formula text-center text-base">
          {patternDefs[kind].label}: {patternDefs[kind].desc}
        </div>

        {renderPatternRow(target, 'Patrón modelo')}

        <div className="p-4 rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30">
          <div className="text-xs font-black uppercase opacity-70 mb-3">Copia el patrón tocando las piezas</div>
          <div className="flex gap-2 flex-wrap justify-center mb-4">
            {[...new Set(target)].map(token => (
              <button
                key={token}
                onClick={() => {
                  if (copyPick.length < target.length) setCopyPick([...copyPick, token]);
                }}
                className="p-2 rounded-2xl bg-surface-color border-2 border-border-color hover:scale-105 transition-all"
              >
                {renderToken(token, 'sm')}
              </button>
            ))}
          </div>

          <div className="flex gap-2 flex-wrap justify-center min-h-20">
            {copyPick.map((token, i) => <div key={`${token}-${i}`}>{renderToken(token, 'sm')}</div>)}
          </div>
        </div>

        {copyPick.length === target.length && (
          <div className={`p-4 rounded-2xl text-center font-black text-white ${ok ? 'bg-emerald-500' : 'bg-red-500'}`}>
            {ok ? '✅ ¡Correcto! Copiaste el patrón.' : '❌ Casi. Observa el modelo y vuelve a intentar.'}
          </div>
        )}

        <button onClick={() => setCopyPick([])} className="math-btn w-full">Reiniciar copia</button>
      </div>
    );
  };

  const renderExtender = () => {
    const target = patternDefs[kind].example;
    const next = patternDefs[kind].unit[target.length % patternDefs[kind].unit.length];
    const shown = [...target, '?'];
    const options = [...new Set([...patternDefs[kind].unit, ...palette.slice(0, 4)])];
    const ok = extendAnswer === next;

    return (
      <div className="space-y-4">
        {renderKindButtons()}
        {renderPatternRow(shown, '¿Qué pieza sigue?')}

        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {options.map(token => (
            <button
              key={token}
              onClick={() => setExtendAnswer(token)}
              className={`p-3 rounded-2xl border-2 transition-all ${
                extendAnswer === token
                  ? token === next ? 'bg-emerald-500 border-emerald-500 scale-105' : 'bg-red-500 border-red-500'
                  : 'bg-surface-color border-border-color hover:scale-105'
              }`}
            >
              {renderToken(token, 'sm')}
            </button>
          ))}
        </div>

        {extendAnswer && (
          <div className={`p-4 rounded-2xl text-center font-black text-white ${ok ? 'bg-emerald-500' : 'bg-red-500'}`}>
            {ok ? '✅ ¡Exacto! Esa pieza continúa el patrón.' : '❌ Casi. Mira qué parte se repite.'}
          </div>
        )}
      </div>
    );
  };

  const renderCrear = () => {
    const needed = builderLength[kind];
    const done = builder.length === needed;
    const ok = done && isExpectedPattern(builder, kind);

    return (
      <div className="space-y-4">
        {renderKindButtons()}

        <div className="p-4 rounded-3xl bg-surface-color border-2 border-border-color shadow">
          <div className="font-black text-xl mb-1">Crear patrón {kind}</div>
          <p className="text-sm font-bold opacity-75 mb-4">
            Usa colores, figuras u objetos. Necesitas {needed} piezas.
          </p>

          <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
            {palette.map(token => (
              <button
                key={token}
                onClick={() => {
                  if (builder.length < needed) setBuilder([...builder, token]);
                }}
                className="p-2 rounded-2xl bg-surface-color border-2 border-border-color hover:scale-105 transition-all"
              >
                {renderToken(token, 'sm')}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30">
          <div className="text-xs font-black uppercase opacity-70 mb-3">Tu patrón</div>
          <div className="flex gap-2 flex-wrap justify-center min-h-20">
            {builder.length === 0 && <div className="font-bold opacity-60">Agrega piezas para crear tu patrón.</div>}
            {builder.map((token, i) => <div key={`${token}-${i}`}>{renderToken(token, 'sm')}</div>)}
          </div>
        </div>

        {done && (
          <div className={`p-4 rounded-2xl text-center font-black text-white ${ok ? 'bg-emerald-500' : 'bg-red-500'}`}>
            {ok ? `✅ ¡Muy bien! Creaste un patrón ${kind}.` : `❌ Casi. Revisa la regla del patrón ${kind}.`}
          </div>
        )}

        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => setBuilder(builder.slice(0, -1))} className="p-3 rounded-2xl bg-slate-200 dark:bg-slate-700 font-black text-xs">Quitar última</button>
          <button onClick={() => setBuilder([])} className="math-btn text-xs py-3">Reiniciar</button>
        </div>
      </div>
    );
  };

  const missingChallenges = [
    { seq: ['redCircle', 'blueSquare', 'redCircle', 'blueSquare', '?', 'blueSquare'], answer: 'redCircle', kind: 'AB' },
    { seq: ['redCircle', 'redCircle', 'blueSquare', 'blueSquare', 'redCircle', '?', 'blueSquare', 'blueSquare'], answer: 'redCircle', kind: 'AABB' },
    { seq: ['yellowTriangle', 'greenCircle', 'greenCircle', '?', 'greenCircle', 'greenCircle'], answer: 'yellowTriangle', kind: 'ABB' },
    { seq: ['redCircle', 'blueSquare', 'yellowTriangle', 'redCircle', '?', 'yellowTriangle'], answer: 'blueSquare', kind: 'ABC' },
    { seq: ['👏', '👏', '🦶', '👏', '👏', '?'], answer: '🦶', kind: 'ABB' },
    { seq: ['🍎', '🍌', '⭐', '🍎', '🍌', '?'], answer: '⭐', kind: 'ABC' },
  ];

  const renderFaltante = () => {
    const challenge = missingChallenges[missingIdx % missingChallenges.length];
    const options = [...new Set([...challenge.seq.filter(x => x !== '?'), challenge.answer, 'greenCircle', 'orangeStar'])];
    const ok = missingAnswer === challenge.answer;

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {missingChallenges.map((c, i) => (
            <button
              key={i}
              onClick={() => {
                setMissingIdx(i);
                setMissingAnswer(null);
              }}
              className={`p-3 rounded-2xl font-black text-xs ${
                missingIdx === i ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-slate-200 dark:bg-slate-700'
              }`}
            >
              Reto {i + 1}
            </button>
          ))}
        </div>

        {renderPatternRow(challenge.seq, `Elemento faltante en patrón ${challenge.kind}`)}

        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {options.map(token => (
            <button
              key={token}
              onClick={() => setMissingAnswer(token)}
              className={`p-3 rounded-2xl border-2 transition-all ${
                missingAnswer === token
                  ? token === challenge.answer ? 'bg-emerald-500 border-emerald-500 scale-105' : 'bg-red-500 border-red-500'
                  : 'bg-surface-color border-border-color hover:scale-105'
              }`}
            >
              {renderToken(token, 'sm')}
            </button>
          ))}
        </div>

        {missingAnswer && (
          <div className={`p-4 rounded-2xl text-center font-black text-white ${ok ? 'bg-emerald-500' : 'bg-red-500'}`}>
            {ok ? '✅ ¡Correcto! Encontraste la pieza que falta.' : '❌ Casi. Repite el patrón en voz alta.'}
          </div>
        )}
      </div>
    );
  };

  const renderTraducir = () => {
    const objectPattern = ['🍎', '🍌', '🍎', '🍌', '🍎', '🍌'];
    const targetColors = ['redCircle', 'blueSquare', 'redCircle', 'blueSquare', 'redCircle', 'blueSquare'];
    const ok = translationPick.length === targetColors.length && translationPick.every((x, i) => x === targetColors[i]);

    return (
      <div className="space-y-4">
        {renderPatternRow(objectPattern, 'Patrón con objetos')}
        <div className="lab-formula text-center text-base">
          Traduce: manzana = rojo, plátano = azul.
        </div>

        <div className="flex justify-center gap-3">
          {['redCircle', 'blueSquare'].map(token => (
            <button
              key={token}
              onClick={() => {
                if (translationPick.length < targetColors.length) setTranslationPick([...translationPick, token]);
              }}
              className="p-3 rounded-2xl bg-surface-color border-2 border-border-color hover:scale-105"
            >
              {renderToken(token, 'sm')}
            </button>
          ))}
        </div>

        <div className="p-4 rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30">
          <div className="text-xs font-black uppercase opacity-70 mb-3">Tu traducción a colores</div>
          <div className="flex gap-2 flex-wrap justify-center min-h-20">
            {translationPick.map((token, i) => <div key={`${token}-${i}`}>{renderToken(token, 'sm')}</div>)}
          </div>
        </div>

        {translationPick.length === targetColors.length && (
          <div className={`p-4 rounded-2xl text-center font-black text-white ${ok ? 'bg-emerald-500' : 'bg-red-500'}`}>
            {ok ? '✅ ¡Correcto! Tradujiste objetos a colores.' : '❌ Casi. Cada objeto debe cambiar siempre al mismo color.'}
          </div>
        )}

        <button onClick={() => setTranslationPick([])} className="math-btn w-full">Reiniciar traducción</button>
      </div>
    );
  };

  const renderMovimiento = () => {
    const patterns = {
      'palma-pie': { name: 'Palma, palma, pie', seq: ['👏', '👏', '🦶', '👏', '👏', '🦶'], rule: 'ABB: palma, palma, pie se repite.' },
      'salto-giro': { name: 'Salto, giro', seq: ['⬆️', '🌀', '⬆️', '🌀', '⬆️', '🌀'], rule: 'AB: salto, giro, salto, giro.' },
      'arriba-abajo': { name: 'Arriba, abajo, abajo', seq: ['⬆️', '⬇️', '⬇️', '⬆️', '⬇️', '⬇️'], rule: 'ABB: arriba, abajo, abajo.' },
    };

    const current = patterns[bodyPattern];

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          {(Object.keys(patterns) as typeof bodyPattern[]).map(k => (
            <button
              key={k}
              onClick={() => setBodyPattern(k)}
              className={`p-3 rounded-2xl font-black text-xs ${bodyPattern === k ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-slate-200 dark:bg-slate-700'}`}
            >
              {patterns[k].name}
            </button>
          ))}
        </div>

        {renderPatternRow(current.seq, 'Patrón corporal')}

        <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
          <div className="font-black text-xl mb-2">Hazlo con tu cuerpo</div>
          <div className="text-sm font-bold opacity-80">{current.rule}</div>
          <div className="mt-4 text-xs font-bold opacity-70">Lee la serie y repítela moviéndote.</div>
        </div>
      </div>
    );
  };

  const renderSonido = () => {
    const patterns = {
      'fuerte-suave': { name: 'Fuerte / suave', seq: ['🔊', '🔉', '🔊', '🔉', '🔊', '🔉'], rule: 'AB: fuerte, suave.' },
      'rapido-lento': { name: 'Rápido / lento', seq: ['⚡', '🐢', '⚡', '🐢', '⚡', '🐢'], rule: 'AB: rápido, lento.' },
      'grave-agudo': { name: 'Grave / agudo / agudo', seq: ['🥁', '🎵', '🎵', '🥁', '🎵', '🎵'], rule: 'ABB: grave, agudo, agudo.' },
    };

    const current = patterns[soundPattern];

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          {(Object.keys(patterns) as typeof soundPattern[]).map(k => (
            <button
              key={k}
              onClick={() => setSoundPattern(k)}
              className={`p-3 rounded-2xl font-black text-xs ${soundPattern === k ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-slate-200 dark:bg-slate-700'}`}
            >
              {patterns[k].name}
            </button>
          ))}
        </div>

        {renderPatternRow(current.seq, 'Patrón sonoro')}

        <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
          <div className="font-black text-xl mb-2">Dilo o tócalo</div>
          <div className="text-sm font-bold opacity-80">{current.rule}</div>
          <div className="mt-4 grid grid-cols-3 gap-2 max-w-md mx-auto">
            {current.seq.slice(0, 3).map((token, i) => (
              <div key={i} className="p-3 rounded-2xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30 font-black">
                {tokenLabels[token] ?? token}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const renderCalendario = () => {
    const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
    const visible = Array.from({ length: 14 }).map((_, i) => days[(calendarStart + i) % 7]);
    const missingDay = days[(calendarStart + 14) % 7];
    const ok = calendarAnswer === missingDay;

    return (
      <div className="space-y-4">
        <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow">
          <div className="font-black text-xl mb-1">Patrón del calendario</div>
          <p className="text-sm font-bold opacity-75 mb-4">
            Los días de la semana se repiten una y otra vez.
          </p>

          <div className="grid grid-cols-7 gap-2">
            {visible.map((d, i) => (
              <div
                key={`${d}-${i}`}
                className={`p-2 rounded-2xl text-center font-black text-[10px] border-2 ${
                  i % 7 === 5 || i % 7 === 6 ? 'bg-amber-500/20 border-amber-500/30' : 'bg-surface-color border-border-color'
                }`}
              >
                <div className="text-lg">{i % 7 === 5 || i % 7 === 6 ? '🌙' : '☀️'}</div>
                {d}
              </div>
            ))}
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30 text-center">
          <div className="font-black mb-3">Después de estos 14 días, ¿qué día sigue?</div>
          <div className="grid grid-cols-2 md:grid-cols-7 gap-2">
            {days.map(d => (
              <button
                key={d}
                onClick={() => setCalendarAnswer(d)}
                className={`p-3 rounded-2xl font-black text-xs ${
                  calendarAnswer === d
                    ? d === missingDay ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
                    : 'bg-surface-color border-2 border-border-color'
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          {calendarAnswer && (
            <div className={`mt-4 p-3 rounded-2xl text-white font-black ${ok ? 'bg-emerald-500' : 'bg-red-500'}`}>
              {ok ? '✅ ¡Correcto!' : '❌ Casi.'} El calendario repite siempre el mismo ciclo.
            </div>
          )}
        </div>

        <button
          onClick={() => {
            setCalendarStart((calendarStart + 1) % 7);
            setCalendarAnswer(null);
          }}
          className="math-btn w-full"
        >
          Cambiar inicio del calendario
        </button>
      </div>
    );
  };

  return (
    <TopicCard
      icon="🟡"
      title="Patrones"
      color="#eab308"
      desc="Copia, extiende, crea y traduce patrones con colores, figuras, objetos, movimientos, sonidos y calendario."
    >
      <div className="lab-container space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {modes.map(m => (
            <button
              key={m.id}
              onClick={() => {
                setMode(m.id);
                resetModeData();
              }}
              className={`p-3 rounded-2xl font-black text-xs transition-all ${
                mode === m.id ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color hover:scale-105'
              }`}
            >
              <span className="text-2xl block mb-1">{m.icon}</span>
              {m.label}
            </button>
          ))}
        </div>

        {mode === 'copiar' && renderCopiar()}
        {mode === 'extender' && renderExtender()}
        {mode === 'crear' && renderCrear()}
        {mode === 'faltante' && renderFaltante()}
        {mode === 'traducir' && renderTraducir()}
        {mode === 'movimiento' && renderMovimiento()}
        {mode === 'sonido' && renderSonido()}
        {mode === 'calendario' && renderCalendario()}
      </div>
    </TopicCard>
  );
};




export const MasMenosIgual: React.FC = () => {
  const [a, setA] = useState(5);
  const [b, setB] = useState(3);
  const cmp = a > b ? '>' : a < b ? '<' : '=';
  const word = a > b ? 'mayor que' : a < b ? 'menor que' : 'igual a';
  return (
    <TopicCard icon="⚖️" title="Más, Menos o Igual" color="#22c55e"
      desc="Compara cantidades. Aprende los símbolos > (mayor que), < (menor que) y = (igual):">
      <div className="lab-container">
        <div className="grid grid-cols-2 gap-3 mb-4">
          <NumberInput label="Cantidad A" value={a} setValue={setA} min={0} max={15} color="#22c55e" />
          <NumberInput label="Cantidad B" value={b} setValue={setB} min={0} max={15} color="#16a34a" />
        </div>
        <div className="flex items-center justify-center gap-4 my-4">
          <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow flex flex-col items-center min-w-[100px]">
            <div className="flex flex-wrap gap-1 justify-center max-w-[120px]">{Array.from({ length: a }, (_, i) => <span key={i} className="text-2xl">🟢</span>)}</div>
            <div className="font-black mt-2 text-xl">{a}</div>
          </div>
          <div className="text-5xl font-black" style={{ color: 'var(--primary-color)' }}>{cmp}</div>
          <div className="p-4 bg-white dark:bg-slate-800 rounded-2xl shadow flex flex-col items-center min-w-[100px]">
            <div className="flex flex-wrap gap-1 justify-center max-w-[120px]">{Array.from({ length: b }, (_, i) => <span key={i} className="text-2xl">🔵</span>)}</div>
            <div className="font-black mt-2 text-xl">{b}</div>
          </div>
        </div>
        <div className="text-center font-black bg-green-500/10 p-3 rounded-xl">📘 {a} es {word} {b}</div>
      </div>
    </TopicCard>
  );
};

export const ContarObjetosInteractivos: React.FC = () => {
  const [n, setN] = useState(6);
  const fruits = ['🍎', '🍐', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓'];
  return (
    <TopicCard icon="🍎" title="Contar Frutas Divertidas" color="#fbbf24"
      desc="¡Toca las frutas para contarlas! Es la mejor forma de aprender cuánto valen los números.">
      <div className="lab-container">
        <NumberInput label="¿Cuántas frutas quieres?" value={n} setValue={setN} min={1} max={15} color="#fbbf24" />
        <div className="flex flex-wrap gap-4 justify-center py-8">
          {Array.from({ length: n }).map((_, i) => (
            <motion.div key={i} whileHover={{ scale: 1.2, rotate: 10 }} whileTap={{ scale: 0.8 }} className="text-5xl cursor-pointer filter drop-shadow-md select-none">
              {fruits[i % fruits.length]}
            </motion.div>
          ))}
        </div>
        <div className="text-center font-black text-2xl p-4 bg-amber-400 text-slate-900 rounded-3xl shadow-lg animate-pop">
          ¡Hay {n} {n === 1 ? 'fruta' : 'frutas'}! 🎈
        </div>
      </div>
    </TopicCard>
  );
};

export const UbicacionEspacial: React.FC = () => {
  const [pos, setPos] = useState<'adentro' | 'afuera'>('adentro');
  return (
    <TopicCard icon="🏠" title="¿Adentro o Afuera?" color="#10b981"
      desc="Aprende nociones espaciales básicas de forma gráfica:">
      <div className="lab-container flex flex-col items-center">
        <div className="flex gap-4 mb-6">
          <button onClick={() => setPos('adentro')} className={`px-6 py-3 rounded-2xl font-black ${pos === 'adentro' ? 'bg-emerald-500 text-white shadow-lg' : 'bg-slate-200 dark:bg-slate-700'}`}>ADENTRO</button>
          <button onClick={() => setPos('afuera')} className={`px-6 py-3 rounded-2xl font-black ${pos === 'afuera' ? 'bg-emerald-500 text-white shadow-lg' : 'bg-slate-200 dark:bg-slate-700'}`}>AFUERA</button>
        </div>
        <div className="relative w-64 h-64 border-8 border-emerald-600 rounded-3xl bg-emerald-500/10 flex items-center justify-center shadow-inner overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div key={pos} initial={{ y: 100, opacity: 0 }} animate={{ y: pos === 'adentro' ? 20 : -140, opacity: 1 }} exit={{ y: 100, opacity: 0 }} className="text-8xl absolute z-10">🐱</motion.div>
          </AnimatePresence>
          <div className="mt-40 font-black text-emerald-700 dark:text-emerald-400 uppercase tracking-tighter">La caja</div>
        </div>
        <p className="mt-8 font-black text-xl">El gatito está <span className="text-emerald-500 uppercase underline">{pos}</span> de la caja.</p>
      </div>
    </TopicCard>
  );
};

export const MezclaColores: React.FC = () => {
  const [c1, setC1] = useState('#dc2626');
  const [c2, setC2] = useState('#2563eb');
  const r1 = parseInt(c1.slice(1,3),16), g1 = parseInt(c1.slice(3,5),16), b1 = parseInt(c1.slice(5,7),16);
  const r2 = parseInt(c2.slice(1,3),16), g2 = parseInt(c2.slice(3,5),16), b2 = parseInt(c2.slice(5,7),16);
  const mr = Math.round((r1 + r2) / 2), mg = Math.round((g1 + g2) / 2), mb = Math.round((b1 + b2) / 2);
  const mixed = `#${mr.toString(16).padStart(2,'0')}${mg.toString(16).padStart(2,'0')}${mb.toString(16).padStart(2,'0')}`;
  return (
    <TopicCard icon="🎨" title="Combinación de Colores" color="#ec4899"
      desc="Mezcla dos colores y mira qué color resulta al promediar sus valores RGB.">
      <div className="lab-container space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <input type="color" value={c1} onChange={e => setC1(e.target.value)} className="w-20 h-20 rounded-2xl cursor-pointer border-4 border-white shadow-lg mx-auto" />
          <input type="color" value={c2} onChange={e => setC2(e.target.value)} className="w-20 h-20 rounded-2xl cursor-pointer border-4 border-white shadow-lg mx-auto" />
        </div>
        <div className="flex items-center justify-center gap-4 text-3xl font-black">
          <div className="w-12 h-12 rounded-full shadow-lg" style={{ background: c1 }} />
          <span className="opacity-70">+</span>
          <div className="w-12 h-12 rounded-full shadow-lg" style={{ background: c2 }} />
          <span className="opacity-70">=</span>
          <div className="w-16 h-16 rounded-full shadow-2xl border-4 border-white" style={{ background: mixed }} />
        </div>
      </div>
    </TopicCard>
  );
};

export const Trayectorias: React.FC = () => {
  const [dogPos, setDogPos] = useState({ x: 0, y: 0 });
  const grid = Array(4).fill(0).map(() => Array(4).fill(false));
  const house = { x: 3, y: 3 };
  const move = (dir: 'U' | 'D' | 'L' | 'R') => {
    setDogPos(p => {
      let { x, y } = p;
      if (dir === 'U') y = Math.max(0, y - 1);
      if (dir === 'D') y = Math.min(3, y + 1);
      if (dir === 'L') x = Math.max(0, x - 1);
      if (dir === 'R') x = Math.min(3, x + 1);
      return { x, y };
    });
  };
  const isWin = dogPos.x === house.x && dogPos.y === house.y;
  return (
    <TopicCard icon="🚶" title="Trayectorias y Desplazamientos" color="#fbbf24"
      desc="¡Ayuda al perrito 🐶 a llegar a su casa 🏠 dando instrucciones de dirección!">
      <div className="lab-container space-y-4">
        {isWin && <div className="p-4 bg-emerald-500 text-white font-black text-center rounded-2xl animate-pop">¡Excelente! ¡El perrito llegó sano y salvo a casa! 🐶🏠</div>}
        <div className="flex flex-col items-center gap-4">
          <div className="grid grid-cols-4 gap-1 p-2 bg-slate-800 rounded-3xl w-64 h-64 border-4 border-slate-700 shadow-inner">
            {grid.map((row, r) => row.map((_, c) => {
              const isDog = dogPos.x === c && dogPos.y === r;
              const isHouse = house.x === c && house.y === r;
              return <div key={`${r}-${c}`} className="relative rounded-2xl bg-slate-700 flex items-center justify-center text-3xl select-none">{isDog ? '🐶' : isHouse ? '🏠' : ''}</div>;
            }))}
          </div>
          <div className="grid grid-cols-3 gap-2 w-48">
            <div /><button onClick={() => move('U')} className="p-3 bg-slate-200 dark:bg-slate-700 rounded-xl font-black text-lg hover:scale-105 active:scale-95">▲</button><div />
            <button onClick={() => move('L')} className="p-3 bg-slate-200 dark:bg-slate-700 rounded-xl font-black text-lg hover:scale-105 active:scale-95">◀</button><div /><button onClick={() => move('R')} className="p-3 bg-slate-200 dark:bg-slate-700 rounded-xl font-black text-lg hover:scale-105 active:scale-95">▶</button>
            <div /><button onClick={() => move('D')} className="p-3 bg-slate-200 dark:bg-slate-700 rounded-xl font-black text-lg hover:scale-105 active:scale-95">▼</button><div />
          </div>
        </div>
      </div>
    </TopicCard>
  );
};

export const NocionesTemporales: React.FC = () => {
  type Mode = 'orden' | 'momentos' | 'calendario' | 'secuencias' | 'duracion';
  type OrdenKey = 'antes-despues' | 'ahora-tarde' | 'ayer-hoy-manana';
  type MomentoKey = 'dia-noche' | 'manana' | 'tarde' | 'noche';
  type SeasonKey = 'primavera' | 'verano' | 'otono' | 'invierno';

  const [mode, setMode] = useState<Mode>('orden');
  const [orden, setOrden] = useState<OrdenKey>('antes-despues');
  const [momento, setMomento] = useState<MomentoKey>('dia-noche');
  const [dayIdx, setDayIdx] = useState(0);
  const [monthIdx, setMonthIdx] = useState(new Date().getMonth());
  const [season, setSeason] = useState<SeasonKey>('primavera');
  const [picked, setPicked] = useState<string[]>([]);
  const [durationIdx, setDurationIdx] = useState(0);

  const modes: { id: Mode; label: string; icon: string }[] = [
    { id: 'orden', label: 'Antes y después', icon: '⏮️' },
    { id: 'momentos', label: 'Día y momentos', icon: '🌅' },
    { id: 'calendario', label: 'Calendario', icon: '📅' },
    { id: 'secuencias', label: 'Secuencias', icon: '🧩' },
    { id: 'duracion', label: 'Duración', icon: '⏳' },
  ];

  const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'];
  const months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];

  const seasons: Record<SeasonKey, { name: string; icon: string; desc: string; color: string }> = {
    primavera: { name: 'Primavera', icon: '🌸', desc: 'Nacen flores, hay más colores y el clima se siente templado.', color: '#ec4899' },
    verano: { name: 'Verano', icon: '☀️', desc: 'Hace calor, hay mucho sol y usamos ropa fresca.', color: '#f59e0b' },
    otono: { name: 'Otoño', icon: '🍂', desc: 'Caen hojas, sopla viento y los colores se vuelven cálidos.', color: '#d97706' },
    invierno: { name: 'Invierno', icon: '❄️', desc: 'Hace frío, usamos abrigo y algunas partes tienen nieve.', color: '#38bdf8' },
  };

  const routine = [
    { id: 'despertar', icon: '🛏️', label: 'Despertar' },
    { id: 'desayunar', icon: '🥣', label: 'Desayunar' },
    { id: 'escuela', icon: '🎒', label: 'Ir a la escuela' },
    { id: 'jugar', icon: '🧸', label: 'Jugar' },
    { id: 'dormir', icon: '🌙', label: 'Dormir' },
  ];

  const shuffledRoutine = [routine[2], routine[0], routine[4], routine[1], routine[3]];
  const correctOrder = routine.map(r => r.id);
  const sequenceDone = picked.length === correctOrder.length;
  const sequenceOk = sequenceDone && picked.every((id, i) => id === correctOrder[i]);

  const durationActivities = [
    { icon: '👏', label: 'Dar una palmada', level: 1, text: 'Dura muy poco tiempo.' },
    { icon: '🪥', label: 'Cepillarse los dientes', level: 3, text: 'Dura un tiempo corto.' },
    { icon: '🎵', label: 'Cantar una canción', level: 5, text: 'Dura un tiempo mediano.' },
    { icon: '🎬', label: 'Ver una película', level: 8, text: 'Dura mucho tiempo.' },
    { icon: '😴', label: 'Dormir de noche', level: 10, text: 'Dura muchísimo tiempo.' },
  ];

  const addStep = (id: string) => {
    if (picked.includes(id)) return;
    setPicked([...picked, id]);
  };

  const renderOrden = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
        {[
          { id: 'antes-despues', label: 'Antes / después', icon: '🌱' },
          { id: 'ahora-tarde', label: 'Ahora / más tarde', icon: '⏱️' },
          { id: 'ayer-hoy-manana', label: 'Ayer / hoy / mañana', icon: '📆' },
        ].map(o => (
          <button
            key={o.id}
            onClick={() => setOrden(o.id as OrdenKey)}
            className={`p-3 rounded-2xl font-black text-xs transition-all ${
              orden === o.id ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color hover:scale-105'
            }`}
          >
            <span className="text-2xl block mb-1">{o.icon}</span>
            {o.label}
          </button>
        ))}
      </div>

      {orden === 'antes-despues' && (
        <div className="grid md:grid-cols-3 gap-3">
          <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
            <div className="text-6xl mb-2">🌱</div>
            <div className="font-black text-lg">Antes</div>
            <div className="text-xs font-bold opacity-75">La planta era una semilla.</div>
          </div>
          <div className="p-5 rounded-3xl bg-[var(--primary-color)]/15 border-2 border-[var(--primary-color)] shadow text-center">
            <div className="text-6xl mb-2">➡️</div>
            <div className="font-black text-lg">Luego</div>
            <div className="text-xs font-bold opacity-75">El tiempo avanza.</div>
          </div>
          <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
            <div className="text-6xl mb-2">🌻</div>
            <div className="font-black text-lg">Después</div>
            <div className="text-xs font-bold opacity-75">La semilla se volvió flor.</div>
          </div>
        </div>
      )}

      {orden === 'ahora-tarde' && (
        <div className="grid md:grid-cols-2 gap-4">
          <div className="p-6 rounded-3xl bg-emerald-500/10 border-2 border-emerald-500/30 shadow text-center">
            <div className="text-7xl mb-2">🧒</div>
            <div className="font-black text-xl text-emerald-600">Ahora</div>
            <p className="text-sm font-bold opacity-80">Ahora estoy aprendiendo matemáticas.</p>
          </div>
          <div className="p-6 rounded-3xl bg-sky-500/10 border-2 border-sky-500/30 shadow text-center">
            <div className="text-7xl mb-2">🎮</div>
            <div className="font-black text-xl text-sky-600">Más tarde</div>
            <p className="text-sm font-bold opacity-80">Más tarde puedo jugar o descansar.</p>
          </div>
        </div>
      )}

      {orden === 'ayer-hoy-manana' && (
        <div className="grid md:grid-cols-3 gap-3">
          <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
            <div className="text-6xl mb-2">📸</div>
            <div className="font-black text-lg">Ayer</div>
            <div className="text-xs font-bold opacity-75">Ya pasó.</div>
          </div>
          <div className="p-5 rounded-3xl bg-[var(--primary-color)]/15 border-2 border-[var(--primary-color)] shadow text-center">
            <div className="text-6xl mb-2">📍</div>
            <div className="font-black text-lg">Hoy</div>
            <div className="text-xs font-bold opacity-75">Está pasando.</div>
          </div>
          <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
            <div className="text-6xl mb-2">🚀</div>
            <div className="font-black text-lg">Mañana</div>
            <div className="text-xs font-bold opacity-75">Pasará después.</div>
          </div>
        </div>
      )}

      <div className="lab-formula text-center text-base">
        El tiempo tiene orden: unas cosas pasan antes, otras pasan ahora y otras pasan después.
      </div>
    </div>
  );

  const renderMomentos = () => {
    const info: Record<MomentoKey, { icon: string; title: string; desc: string; bg: string }> = {
      'dia-noche': {
        icon: '🌞🌙',
        title: 'Día y noche',
        desc: 'De día hay luz del sol. De noche vemos la luna y descansamos.',
        bg: 'linear-gradient(90deg, rgba(251,191,36,.25), rgba(15,23,42,.25))',
      },
      manana: {
        icon: '🌅',
        title: 'Mañana',
        desc: 'Nos despertamos, desayunamos y empezamos actividades.',
        bg: 'linear-gradient(135deg, rgba(251,191,36,.35), rgba(255,255,255,.05))',
      },
      tarde: {
        icon: '☀️',
        title: 'Tarde',
        desc: 'El sol está alto o bajando. Podemos estudiar, jugar o merendar.',
        bg: 'linear-gradient(135deg, rgba(249,115,22,.30), rgba(255,255,255,.05))',
      },
      noche: {
        icon: '🌙',
        title: 'Noche',
        desc: 'Oscurece, cenamos, descansamos y dormimos.',
        bg: 'linear-gradient(135deg, rgba(59,130,246,.30), rgba(15,23,42,.20))',
      },
    };

    const current = info[momento];

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {[
            { id: 'dia-noche', label: 'Día / noche' },
            { id: 'manana', label: 'Mañana' },
            { id: 'tarde', label: 'Tarde' },
            { id: 'noche', label: 'Noche' },
          ].map(m => (
            <button
              key={m.id}
              onClick={() => setMomento(m.id as MomentoKey)}
              className={`p-3 rounded-2xl font-black text-xs transition-all ${
                momento === m.id ? 'bg-amber-500 text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color hover:scale-105'
              }`}
            >
              {m.label}
            </button>
          ))}
        </div>

        <div className="p-8 rounded-3xl border-2 border-border-color shadow text-center" style={{ background: current.bg }}>
          <div className="text-8xl mb-3">{current.icon}</div>
          <div className="text-2xl font-black mb-2">{current.title}</div>
          <p className="font-bold opacity-85 max-w-xl mx-auto">{current.desc}</p>
        </div>
      </div>
    );
  };

  const renderCalendario = () => {
    const currentSeason = seasons[season];

    return (
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-4 rounded-3xl bg-surface-color border-2 border-border-color shadow">
            <div className="text-xs font-black uppercase opacity-70 mb-2">Días de la semana</div>
            <div className="grid grid-cols-2 gap-2">
              {days.map((d, i) => (
                <button
                  key={d}
                  onClick={() => setDayIdx(i)}
                  className={`p-2 rounded-xl font-black text-xs ${
                    dayIdx === i ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-slate-200 dark:bg-slate-700'
                  }`}
                >
                  {i + 1}. {d}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-3xl bg-surface-color border-2 border-border-color shadow">
            <div className="text-xs font-black uppercase opacity-70 mb-2">Meses del año</div>
            <div className="grid grid-cols-3 gap-2">
              {months.map((m, i) => (
                <button
                  key={m}
                  onClick={() => setMonthIdx(i)}
                  className={`p-2 rounded-xl font-black text-[10px] ${
                    monthIdx === i ? 'bg-sky-500 text-white shadow scale-105' : 'bg-slate-200 dark:bg-slate-700'
                  }`}
                >
                  {i + 1}. {m}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-4 rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30 text-center font-black">
          Día elegido: {days[dayIdx]}. Mes elegido: {months[monthIdx]}.
        </div>

        <div className="p-4 rounded-3xl bg-surface-color border-2 border-border-color shadow">
          <div className="text-xs font-black uppercase opacity-70 mb-3">Estaciones del año</div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
            {(Object.keys(seasons) as SeasonKey[]).map(k => (
              <button
                key={k}
                onClick={() => setSeason(k)}
                className={`p-3 rounded-2xl font-black text-xs transition-all ${
                  season === k ? 'text-white shadow scale-105' : 'bg-slate-200 dark:bg-slate-700'
                }`}
                style={season === k ? { background: seasons[k].color } : undefined}
              >
                <span className="text-3xl block mb-1">{seasons[k].icon}</span>
                {seasons[k].name}
              </button>
            ))}
          </div>

          <div className="p-4 rounded-2xl border-2 font-bold text-center" style={{ borderColor: currentSeason.color, background: currentSeason.color + '18' }}>
            <div className="text-5xl mb-2">{currentSeason.icon}</div>
            <div className="font-black text-xl" style={{ color: currentSeason.color }}>{currentSeason.name}</div>
            <p className="text-sm opacity-85">{currentSeason.desc}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderSecuencias = () => (
    <div className="space-y-4">
      <div className="p-4 rounded-3xl bg-surface-color border-2 border-border-color shadow">
        <div className="text-xs font-black uppercase opacity-70 mb-2">Ordena la historia cotidiana</div>
        <p className="text-sm font-bold opacity-80 mb-4">
          Toca las viñetas en el orden correcto: primero, luego y al final.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-4">
          {shuffledRoutine.map(item => (
            <button
              key={item.id}
              onClick={() => addStep(item.id)}
              disabled={picked.includes(item.id)}
              className={`p-3 rounded-2xl border-2 font-black text-xs transition-all ${
                picked.includes(item.id)
                  ? 'opacity-40 bg-slate-200 dark:bg-slate-700'
                  : 'bg-surface-color border-border-color hover:scale-105'
              }`}
            >
              <div className="text-4xl mb-1">{item.icon}</div>
              {item.label}
            </button>
          ))}
        </div>

        <div className="p-4 rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30">
          <div className="text-xs font-black uppercase opacity-70 mb-2">Tu secuencia</div>
          <div className="flex gap-2 flex-wrap justify-center min-h-16">
            {picked.length === 0 && <div className="font-bold opacity-60">Todavía no has elegido viñetas.</div>}
            {picked.map((id, i) => {
              const item = routine.find(r => r.id === id)!;
              return (
                <div key={id} className="p-3 rounded-2xl bg-surface-color border-2 border-border-color shadow text-center">
                  <div className="text-[10px] font-black opacity-60">{i === 0 ? 'Primero' : i === picked.length - 1 ? 'Al final' : 'Luego'}</div>
                  <div className="text-3xl">{item.icon}</div>
                  <div className="text-[10px] font-black">{item.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {sequenceDone && (
          <div className={`mt-4 p-3 rounded-2xl text-center font-black text-white ${sequenceOk ? 'bg-emerald-500' : 'bg-red-500'}`}>
            {sequenceOk ? '✅ ¡Correcto! Ordenaste la rutina.' : '❌ Casi. Revisa qué va primero, luego y al final.'}
          </div>
        )}

        <div className="grid grid-cols-2 gap-2 mt-4">
          <button onClick={() => setPicked(picked.slice(0, -1))} className="p-3 rounded-2xl bg-slate-200 dark:bg-slate-700 font-black text-xs">
            Quitar última
          </button>
          <button onClick={() => setPicked([])} className="math-btn text-xs py-3">
            Reiniciar
          </button>
        </div>
      </div>
    </div>
  );

  const renderDuracion = () => {
    const act = durationActivities[durationIdx];
    const fill = act.level * 10;

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {durationActivities.map((a, i) => (
            <button
              key={a.label}
              onClick={() => setDurationIdx(i)}
              className={`p-3 rounded-2xl font-black text-xs transition-all ${
                durationIdx === i ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color hover:scale-105'
              }`}
            >
              <div className="text-3xl mb-1">{a.icon}</div>
              {a.label}
            </button>
          ))}
        </div>

        <div className="grid gap-4 md:grid-cols-[220px_1fr] items-center">
          <div className="p-6 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
            <div className="text-7xl mb-2">⏳</div>
            <div className="w-16 h-36 mx-auto rounded-full border-4 border-amber-600 relative overflow-hidden bg-amber-100/20">
              <div className="absolute bottom-0 left-0 right-0 bg-amber-400 transition-all duration-500" style={{ height: `${fill}%` }} />
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30 shadow">
            <div className="text-6xl mb-2">{act.icon}</div>
            <div className="text-2xl font-black mb-2">{act.label}</div>
            <p className="font-bold opacity-85">{act.text}</p>
            <div className="mt-4 p-3 rounded-2xl bg-surface-color border-2 border-border-color font-black text-center">
              {act.level <= 3 ? 'Poco tiempo' : act.level <= 6 ? 'Tiempo mediano' : 'Mucho tiempo'}
            </div>
          </div>
        </div>

        <div className="lab-formula text-center text-base">
          Algunas actividades duran poco y otras duran mucho. Podemos comparar duraciones.
        </div>
      </div>
    );
  };

  return (
    <TopicCard
      icon="⏳"
      title="Nociones Temporales"
      color="#f59e0b"
      desc="Aprende antes/después, día/noche, ayer/hoy/mañana, calendario, estaciones, secuencias y duración."
    >
      <div className="lab-container space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
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

        {mode === 'orden' && renderOrden()}
        {mode === 'momentos' && renderMomentos()}
        {mode === 'calendario' && renderCalendario()}
        {mode === 'secuencias' && renderSecuencias()}
        {mode === 'duracion' && renderDuracion()}
      </div>
    </TopicCard>
  );
};


export const Temporal: React.FC = () => {
  const [time, setTime] = useState<'manana' | 'tarde' | 'noche'>('manana');
  return (
    <TopicCard icon="⏰" title="Orientación Temporal" color="#fbbf24"
      desc="Aprende el ciclo del día: mañana, tarde y noche, y qué hacemos en cada momento.">
      <div className="lab-container space-y-4">
        <div className="flex justify-center gap-3">
          {(['manana', 'tarde', 'noche'] as const).map(t => (
            <button key={t} onClick={() => setTime(t)} className={`px-5 py-3 rounded-2xl font-black text-sm uppercase transition-all ${time === t ? 'bg-amber-500 text-white shadow-lg' : 'bg-slate-200 dark:bg-slate-700'}`}>
              {t === 'manana' ? '🌅 Mañana' : t === 'tarde' ? '☀️ Tarde' : '🌙 Noche'}
            </button>
          ))}
        </div>
        <div className="p-6 bg-surface-color border-2 border-border-color rounded-3xl shadow text-center space-y-4">
          <div className="text-6xl">{time === 'manana' ? '🌅' : time === 'tarde' ? '☀️' : '🌙'}</div>
          <h3 className="font-black text-xl capitalize text-amber-500">{time}</h3>
          <p className="text-sm font-bold opacity-80">{time === 'manana' ? 'Nos levantamos, desayunamos y sale el sol.' : time === 'tarde' ? 'Vamos a la escuela, jugamos con amigos y el sol está muy alto.' : 'Cenamos, nos cepillamos los dientes y dormimos bajo la luna.'}</p>
        </div>
      </div>
    </TopicCard>
  );
};

export const MedicionCuerpo: React.FC = () => {
  const [unit, setUnit] = useState<'pasos' | 'cuartas' | 'pies'>('pasos');
  const [length, setLength] = useState(4);
  const factor = unit === 'pasos' ? 1.5 : unit === 'cuartas' ? 0.4 : 0.8;
  return (
    <TopicCard icon="📏" title="Medidas Corporales No Convencionales" color="#fbbf24"
      desc="¡Antes de las reglas, la gente usaba su cuerpo para medir! Elige tu unidad y mide el pizarrón:">
      <div className="lab-container space-y-4">
        <div className="flex justify-center gap-3">
          {(['pasos', 'cuartas', 'pies'] as const).map(u => (
            <button key={u} onClick={() => setUnit(u)} className={`px-4 py-2.5 rounded-2xl font-black text-xs uppercase ${unit === u ? 'bg-amber-500 text-white shadow' : 'bg-slate-200 dark:bg-slate-700'}`}>{u}</button>
          ))}
        </div>
        <NumberInput label="Cantidad de unidades" value={length} setValue={setLength} min={1} max={10} color="#fbbf24" />
        <div className="flex flex-col items-center p-6 bg-surface-color rounded-3xl border-2 border-border-color shadow">
          <div className="w-full h-12 bg-slate-300 dark:bg-slate-800 rounded-2xl relative overflow-hidden flex items-center shadow-inner border border-border-color">
            <div className="h-full bg-amber-400 flex items-center justify-end pr-4 text-slate-900 font-black text-sm transition-all duration-500" style={{ width: `${Math.min(100, length * factor * 10)}%` }}>{length} {unit}</div>
          </div>
        </div>
      </div>
    </TopicCard>
  );
};

export const CalendarioCiclico: React.FC = () => {
  const [dayIdx, setDayIdx] = useState(0);
  const [monthIdx, setMonthIdx] = useState(0);
  const days = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sábado','Domingo'];
  const months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
  return (
    <TopicCard icon="📅" title="Días, Meses y Sucesión Cíclica" color="#fbbf24" desc="El tiempo se repite en ciclos: días de la semana y meses del año.">
      <div className="lab-container space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <div className="text-xs font-black uppercase opacity-70 mb-2">Días de la semana</div>
            <div className="grid grid-cols-2 gap-2">{days.map((d, i) => <button key={d} onClick={() => setDayIdx(i)} className={`p-2 rounded-xl font-black text-xs ${dayIdx===i?'bg-amber-500 text-white':'bg-slate-200 dark:bg-slate-700'}`}>{d}</button>)}</div>
          </div>
          <div>
            <div className="text-xs font-black uppercase opacity-70 mb-2">Meses del año</div>
            <div className="grid grid-cols-3 gap-2">{months.map((m, i) => <button key={m} onClick={() => setMonthIdx(i)} className={`p-2 rounded-xl font-black text-[10px] ${monthIdx===i?'bg-sky-500 text-white':'bg-slate-200 dark:bg-slate-700'}`}>{m}</button>)}</div>
          </div>
        </div>
        <div className="p-4 rounded-2xl bg-amber-500/10 border-2 border-amber-500/30 text-center font-bold">
          Hoy escogiste: <b>{days[dayIdx]}</b> del mes de <b>{months[monthIdx]}</b>.
        </div>
      </div>
    </TopicCard>
  );
};

export const CapacidadVisual: React.FC = () => {
  const [level, setLevel] = useState<'vacio' | 'medio' | 'lleno'>('medio');
  const fill = level === 'vacio' ? 0 : level === 'medio' ? 50 : 100;
  return (
    <TopicCard icon="🥛" title="Capacidad: Vacío, Medio y Lleno" color="#38bdf8" desc="Compara cuánto cabe en un recipiente y reconoce sus niveles de llenado.">
      <div className="lab-container space-y-4">
        <div className="flex justify-center gap-3">
          {(['vacio','medio','lleno'] as const).map(v => <button key={v} onClick={() => setLevel(v)} className={`px-4 py-2 rounded-xl font-black text-xs uppercase ${level===v?'bg-sky-500 text-white':'bg-slate-200 dark:bg-slate-700'}`}>{v}</button>)}
        </div>
        <div className="flex justify-center gap-8 items-end">
          <div className="w-24 h-40 rounded-b-3xl border-4 border-sky-500 relative overflow-hidden bg-white/70">
            <div className="absolute bottom-0 left-0 right-0 bg-sky-400 transition-all duration-500" style={{ height: `${fill}%` }} />
          </div>
          <div className="text-sm font-bold p-4 rounded-2xl bg-sky-500/10 border-2 border-sky-500/20">
            El vaso está <b>{level}</b>.
          </div>
        </div>
      </div>
    </TopicCard>
  );
};

export const OperacionesInformales: React.FC = () => {
  type Mode = 'juntar' | 'quitar' | 'problemas' | 'repartir' | 'grupos' | 'mitad' | 'masuno' | 'maquina';

  const [mode, setMode] = useState<Mode>('juntar');

  const [joinA, setJoinA] = useState(2);
  const [joinB, setJoinB] = useState(1);

  const [takeStart, setTakeStart] = useState(5);
  const [takeAway, setTakeAway] = useState(2);

  const [problemIdx, setProblemIdx] = useState(0);
  const [problemAnswer, setProblemAnswer] = useState<number | null>(null);

  const [shareTotal, setShareTotal] = useState(6);
  const [shareStep, setShareStep] = useState(0);

  const [groupTotal, setGroupTotal] = useState(6);
  const [groupSize, setGroupSize] = useState(2);

  const [halfTotal, setHalfTotal] = useState(6);

  const [plusOne, setPlusOne] = useState(3);
  const [machineInput, setMachineInput] = useState(4);

  const modes: { id: Mode; label: string; icon: string }[] = [
    { id: 'juntar', label: 'Juntar', icon: '➕' },
    { id: 'quitar', label: 'Quitar', icon: '➖' },
    { id: 'problemas', label: 'Historias', icon: '🗣️' },
    { id: 'repartir', label: 'Repartir', icon: '🤝' },
    { id: 'grupos', label: 'Grupos iguales', icon: '🧺' },
    { id: 'mitad', label: 'Mitad', icon: '🍪' },
    { id: 'masuno', label: '+1', icon: '🌱' },
    { id: 'maquina', label: 'Máquina +1', icon: '🤖' },
  ];

  const items = ['🍪', '🍎', '🧸', '⭐', '🟣', '🚗', '🐟', '🍌', '🎈', '🧩'];

  const clampTakeAway = (start: number, away: number) => Math.min(start, Math.max(0, away));

  const problems = [
    {
      text: 'Si tienes 2 galletas y te doy 1 más, ¿cuántas tienes?',
      icon: '🍪',
      start: 2,
      change: 1,
      type: 'juntar',
      answer: 3,
    },
    {
      text: 'Si hay 4 manzanas y te comes 1, ¿cuántas quedan?',
      icon: '🍎',
      start: 4,
      change: 1,
      type: 'quitar',
      answer: 3,
    },
    {
      text: 'Tienes 3 juguetes y llega 1 juguete más. ¿Cuántos hay ahora?',
      icon: '🧸',
      start: 3,
      change: 1,
      type: 'juntar',
      answer: 4,
    },
    {
      text: 'Hay 5 estrellas y guardas 2. ¿Cuántas quedan afuera?',
      icon: '⭐',
      start: 5,
      change: 2,
      type: 'quitar',
      answer: 3,
    },
    {
      text: 'Tienes 1 globo y te regalan 1 más. ¿Cuántos globos tienes?',
      icon: '🎈',
      start: 1,
      change: 1,
      type: 'juntar',
      answer: 2,
    },
  ];

  const currentProblem = problems[problemIdx % problems.length];

  const renderObjects = (
    count: number,
    emoji = '🍪',
    options: { fadedFrom?: number; numbered?: boolean; crossedFrom?: number } = {}
  ) => (
    <div className="flex gap-2 flex-wrap justify-center items-center">
      {Array.from({ length: count }).map((_, i) => {
        const faded = options.fadedFrom !== undefined && i >= options.fadedFrom;
        const crossed = options.crossedFrom !== undefined && i >= options.crossedFrom;

        return (
          <div
            key={i}
            className={`relative w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-surface-color border-2 border-border-color shadow flex items-center justify-center text-4xl transition-all ${
              faded ? 'opacity-30 scale-90' : ''
            }`}
          >
            {emoji}
            {options.numbered && (
              <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-[var(--primary-color)] text-white text-xs font-black flex items-center justify-center">
                {i + 1}
              </span>
            )}
            {crossed && (
              <span className="absolute inset-0 flex items-center justify-center text-red-500 text-5xl font-black">
                ×
              </span>
            )}
          </div>
        );
      })}
    </div>
  );

  const renderTenFrame = (count: number, color = 'var(--primary-color)') => (
    <div className="grid grid-cols-5 gap-2 max-w-xs mx-auto">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="w-12 h-12 rounded-2xl border-2 border-border-color bg-surface-color shadow-inner flex items-center justify-center"
        >
          {i < count && <span className="w-7 h-7 rounded-full shadow" style={{ background: color }} />}
        </div>
      ))}
    </div>
  );

  const renderJuntar = () => {
    const total = joinA + joinB;

    return (
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-3">
          <NumberInput label="Colección A" value={joinA} setValue={setJoinA} min={1} max={5} color="#22c55e" />
          <NumberInput label="Colección B" value={joinB} setValue={setJoinB} min={1} max={5} color="#3b82f6" />
        </div>

        <div className="grid md:grid-cols-[1fr_80px_1fr_80px_1fr] gap-3 items-center">
          <div className="p-5 rounded-3xl bg-green-500/10 border-2 border-green-500/30 shadow text-center">
            <div className="font-black mb-3">Primera colección</div>
            {renderObjects(joinA, '🍪', { numbered: true })}
          </div>

          <div className="text-5xl font-black text-center">+</div>

          <div className="p-5 rounded-3xl bg-blue-500/10 border-2 border-blue-500/30 shadow text-center">
            <div className="font-black mb-3">Segunda colección</div>
            {renderObjects(joinB, '🍪', { numbered: true })}
          </div>

          <div className="text-5xl font-black text-center">=</div>

          <div className="p-5 rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30 shadow text-center">
            <div className="font-black mb-3">Total junto</div>
            {renderObjects(total, '🍪', { numbered: true })}
          </div>
        </div>

        <div className="lab-formula text-center text-xl">
          {joinA} y {joinB} juntos hacen <span style={{ color: 'var(--primary-color)' }}>{total}</span>.
        </div>

        <div className="p-4 rounded-3xl bg-surface-color border-2 border-border-color shadow">
          <div className="text-xs font-black uppercase opacity-70 mb-2">Marco de 10</div>
          {renderTenFrame(total)}
        </div>
      </div>
    );
  };

  const renderQuitar = () => {
    const away = clampTakeAway(takeStart, takeAway);
    const left = takeStart - away;

    return (
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-3">
          <NumberInput label="Objetos al inicio" value={takeStart} setValue={(v) => {
            setTakeStart(v);
            setTakeAway(Math.min(takeAway, v));
          }} min={1} max={5} color="#ef4444" />
          <NumberInput label="Objetos que quitas" value={takeAway} setValue={(v) => setTakeAway(Math.min(v, takeStart))} min={0} max={takeStart} color="#f97316" />
        </div>

        <div className="grid md:grid-cols-[1fr_80px_1fr] gap-4 items-center">
          <div className="p-5 rounded-3xl bg-red-500/10 border-2 border-red-500/30 shadow text-center">
            <div className="font-black mb-3">Tenías {takeStart}</div>
            {renderObjects(takeStart, '🍎', { numbered: true })}
          </div>

          <div className="text-5xl font-black text-center">−</div>

          <div className="p-5 rounded-3xl bg-orange-500/10 border-2 border-orange-500/30 shadow text-center">
            <div className="font-black mb-3">Quitas {away}</div>
            {renderObjects(takeStart, '🍎', { crossedFrom: left })}
          </div>
        </div>

        <div className="p-5 rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30 shadow text-center">
          <div className="font-black mb-3">Quedan {left}</div>
          {renderObjects(left, '🍎', { numbered: true })}
        </div>

        <div className="lab-formula text-center text-xl">
          Si a {takeStart} le quitas {away}, quedan <span style={{ color: 'var(--primary-color)' }}>{left}</span>.
        </div>
      </div>
    );
  };

  const renderProblemas = () => {
    const options = [1, 2, 3, 4, 5, 6];
    const ok = problemAnswer === currentProblem.answer;

    return (
      <div className="space-y-4">
        <div className="p-6 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
          <div className="text-xs font-black uppercase opacity-70 mb-2">Problema oral</div>
          <div className="text-6xl mb-4">{currentProblem.icon}</div>
          <div className="text-xl font-black max-w-2xl mx-auto">{currentProblem.text}</div>

          <div className="mt-5 grid md:grid-cols-[1fr_70px_1fr] gap-3 items-center">
            <div className="p-4 rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30">
              <div className="text-xs font-black opacity-70 mb-2">Inicio</div>
              {renderObjects(currentProblem.start, currentProblem.icon)}
            </div>

            <div className="text-4xl font-black">
              {currentProblem.type === 'juntar' ? '+' : '−'}
            </div>

            <div className="p-4 rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30">
              <div className="text-xs font-black opacity-70 mb-2">
                {currentProblem.type === 'juntar' ? 'Llega más' : 'Se quitan'}
              </div>
              {renderObjects(currentProblem.change, currentProblem.icon)}
            </div>
          </div>

          <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mt-5">
            {options.map(n => (
              <button
                key={n}
                onClick={() => setProblemAnswer(n)}
                className={`p-4 rounded-2xl border-2 text-2xl font-black transition-all ${
                  problemAnswer === n
                    ? n === currentProblem.answer ? 'bg-emerald-500 text-white border-emerald-500 scale-105' : 'bg-red-500 text-white border-red-500'
                    : 'bg-surface-color border-border-color hover:scale-105'
                }`}
              >
                {n}
              </button>
            ))}
          </div>

          {problemAnswer !== null && (
            <div className={`mt-4 p-4 rounded-2xl text-white font-black ${ok ? 'bg-emerald-500' : 'bg-red-500'}`}>
              {ok ? '✅ ¡Correcto!' : '❌ Casi.'} La respuesta es {currentProblem.answer}.
            </div>
          )}

          <button
            onClick={() => {
              setProblemIdx((problemIdx + 1) % problems.length);
              setProblemAnswer(null);
            }}
            className="math-btn w-full mt-4"
          >
            Siguiente historia
          </button>
        </div>
      </div>
    );
  };

  const renderRepartir = () => {
    const total = Math.max(2, shareTotal);
    const dealt = Math.min(shareStep, total);
    const kidA = Math.ceil(dealt / 2);
    const kidB = Math.floor(dealt / 2);
    const remaining = total - dealt;
    const fair = dealt === total && kidA === kidB;

    return (
      <div className="space-y-4">
        <NumberInput label="Objetos para repartir" value={shareTotal} setValue={(v) => {
          setShareTotal(v);
          setShareStep(0);
        }} min={2} max={10} color="#8b5cf6" />

        <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
          <div className="font-black text-xl mb-2">Uno para ti, uno para mí</div>
          <p className="text-sm font-bold opacity-75 mb-4">Reparte de uno en uno entre dos niños.</p>

          <div className="grid md:grid-cols-[1fr_1fr_1fr] gap-4">
            <div className="p-4 rounded-3xl bg-amber-500/10 border-2 border-amber-500/30">
              <div className="text-5xl mb-2">🧒</div>
              <div className="font-black mb-2">Niño A: {kidA}</div>
              {renderObjects(kidA, '🟣')}
            </div>

            <div className="p-4 rounded-3xl bg-slate-500/10 border-2 border-border-color">
              <div className="font-black mb-2">Faltan repartir: {remaining}</div>
              {renderObjects(remaining, '🟣')}
            </div>

            <div className="p-4 rounded-3xl bg-sky-500/10 border-2 border-sky-500/30">
              <div className="text-5xl mb-2">🧒</div>
              <div className="font-black mb-2">Niño B: {kidB}</div>
              {renderObjects(kidB, '🟣')}
            </div>
          </div>

          <div className={`mt-4 p-3 rounded-2xl font-black text-white ${fair ? 'bg-emerald-500' : 'bg-amber-500'}`}>
            {dealt < total
              ? 'Sigue repartiendo.'
              : fair
                ? '✅ Reparto igual: los dos tienen lo mismo.'
                : '⚠️ No quedó igual. Sobró uno o falta ajustar.'}
          </div>

          <div className="grid grid-cols-2 gap-2 mt-4">
            <button onClick={() => setShareStep(0)} className="p-3 rounded-2xl bg-slate-200 dark:bg-slate-700 font-black">Reiniciar</button>
            <button onClick={() => setShareStep(Math.min(total, shareStep + 1))} className="math-btn py-3">Repartir 1</button>
          </div>
        </div>
      </div>
    );
  };

  const renderGrupos = () => {
    const safeSize = Math.max(1, groupSize);
    const fullGroups = Math.floor(groupTotal / safeSize);
    const leftover = groupTotal % safeSize;

    return (
      <div className="space-y-4">
        <div className="grid md:grid-cols-2 gap-3">
          <NumberInput label="Fichas" value={groupTotal} setValue={setGroupTotal} min={2} max={12} color="#06b6d4" />
          <NumberInput label="Tamaño del grupo" value={groupSize} setValue={setGroupSize} min={2} max={4} color="#0ea5e9" />
        </div>

        <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow">
          <div className="font-black text-xl mb-1">Formar grupos iguales</div>
          <p className="text-sm font-bold opacity-75 mb-4">
            Pon {groupTotal} fichas en grupos de {safeSize}.
          </p>

          <div className="flex gap-3 flex-wrap justify-center">
            {Array.from({ length: fullGroups }).map((_, g) => (
              <div key={g} className="p-4 rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30 shadow text-center">
                <div className="text-xs font-black opacity-70 mb-2">Grupo {g + 1}</div>
                {renderObjects(safeSize, '🔵')}
              </div>
            ))}

            {leftover > 0 && (
              <div className="p-4 rounded-3xl bg-amber-500/10 border-2 border-amber-500/30 shadow text-center">
                <div className="text-xs font-black opacity-70 mb-2">Sobrantes</div>
                {renderObjects(leftover, '🟡')}
              </div>
            )}
          </div>

          <div className="lab-formula text-center text-base mt-4">
            Se forman {fullGroups} grupo(s) de {safeSize}
            {leftover > 0 ? ` y sobran ${leftover}.` : ' sin sobrantes.'}
          </div>
        </div>
      </div>
    );
  };

  const renderMitad = () => {
    const evenValues = [2, 4, 6, 8, 10];
    const safeTotal = evenValues.includes(halfTotal) ? halfTotal : 6;
    const half = safeTotal / 2;

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-5 gap-2">
          {evenValues.map(n => (
            <button
              key={n}
              onClick={() => setHalfTotal(n)}
              className={`p-3 rounded-2xl font-black ${
                safeTotal === n ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color'
              }`}
            >
              {n}
            </button>
          ))}
        </div>

        <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
          <div className="font-black text-xl mb-1">Mitad de un conjunto</div>
          <p className="text-sm font-bold opacity-75 mb-4">La mitad divide en dos partes iguales.</p>

          <div className="grid md:grid-cols-[1fr_80px_1fr] gap-4 items-center">
            <div className="p-4 rounded-3xl bg-pink-500/10 border-2 border-pink-500/30">
              <div className="font-black mb-2">Parte 1: {half}</div>
              {renderObjects(half, '🍪')}
            </div>

            <div className="text-5xl font-black">=</div>

            <div className="p-4 rounded-3xl bg-purple-500/10 border-2 border-purple-500/30">
              <div className="font-black mb-2">Parte 2: {half}</div>
              {renderObjects(half, '🍪')}
            </div>
          </div>

          <div className="lab-formula text-center text-xl mt-4">
            La mitad de {safeTotal} es <span style={{ color: 'var(--primary-color)' }}>{half}</span>.
          </div>
        </div>
      </div>
    );
  };

  const renderMasUno = () => {
    const result = plusOne + 1;

    return (
      <div className="space-y-4">
        <NumberInput label="Número" value={plusOne} setValue={setPlusOne} min={0} max={9} color="#22c55e" />

        <div className="grid md:grid-cols-[1fr_80px_1fr] gap-4 items-center">
          <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
            <div className="font-black mb-3">Tenías {plusOne}</div>
            {renderObjects(plusOne, '🌱')}
          </div>

          <div className="text-5xl font-black text-center">+1</div>

          <div className="p-5 rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30 shadow text-center">
            <div className="font-black mb-3">Ahora tienes {result}</div>
            {renderObjects(result, '🌱')}
          </div>
        </div>

        <div className="lab-formula text-center text-xl">
          Uno más que {plusOne} es <span style={{ color: 'var(--primary-color)' }}>{result}</span>.
        </div>

        <div className="flex gap-2 justify-center flex-wrap">
          {Array.from({ length: 10 }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPlusOne(i)}
              className={`w-12 h-12 rounded-2xl font-black ${
                plusOne === i ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-slate-200 dark:bg-slate-700'
              }`}
            >
              {i}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderMaquina = () => {
    const output = machineInput + 1;

    return (
      <div className="space-y-4">
        <NumberInput label="Entra a la máquina" value={machineInput} setValue={setMachineInput} min={0} max={9} color="#f59e0b" />

        <div className="p-6 rounded-3xl bg-surface-color border-2 border-border-color shadow">
          <div className="grid md:grid-cols-[1fr_220px_1fr] gap-4 items-center text-center">
            <div className="p-5 rounded-3xl bg-amber-500/10 border-2 border-amber-500/30">
              <div className="text-xs font-black uppercase opacity-70">Entrada</div>
              <div className="text-7xl font-black">{machineInput}</div>
              {renderTenFrame(machineInput, '#f59e0b')}
            </div>

            <motion.div
              animate={{ rotate: [0, 2, -2, 0] }}
              transition={{ repeat: Infinity, duration: 1.4 }}
              className="p-5 rounded-3xl bg-[var(--primary-color)] text-white shadow-xl"
            >
              <div className="text-7xl">🤖</div>
              <div className="font-black text-xl">+1</div>
              <div className="text-xs font-bold opacity-90">agrega uno</div>
            </motion.div>

            <div className="p-5 rounded-3xl bg-emerald-500/10 border-2 border-emerald-500/30">
              <div className="text-xs font-black uppercase opacity-70">Salida</div>
              <div className="text-7xl font-black">{output}</div>
              {renderTenFrame(output, '#22c55e')}
            </div>
          </div>
        </div>

        <div className="lab-formula text-center text-xl">
          La máquina cambia {machineInput} en {output}.
        </div>
      </div>
    );
  };

  return (
    <TopicCard
      icon="🧮"
      title="Operaciones Informales"
      color="#8b5cf6"
      desc="Junta, quita, reparte, forma grupos, encuentra mitades y descubre la idea de uno más sin usar reglas complicadas."
    >
      <div className="lab-container space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
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

        {mode === 'juntar' && renderJuntar()}
        {mode === 'quitar' && renderQuitar()}
        {mode === 'problemas' && renderProblemas()}
        {mode === 'repartir' && renderRepartir()}
        {mode === 'grupos' && renderGrupos()}
        {mode === 'mitad' && renderMitad()}
        {mode === 'masuno' && renderMasUno()}
        {mode === 'maquina' && renderMaquina()}
      </div>
    </TopicCard>
  );
};


export const SeriacionOrden: React.FC = () => {
  type Mode = 'medidas' | 'peso' | 'color' | 'numeros' | 'acciones' | 'capacidad' | 'escalera';
  type MeasureKind = 'tamano' | 'altura' | 'longitud';

  type SortItem = {
    id: string;
    icon: string;
    label: string;
    value: number;
    note?: string;
  };

  const [mode, setMode] = useState<Mode>('medidas');
  const [measureKind, setMeasureKind] = useState<MeasureKind>('tamano');
  const [orderPick, setOrderPick] = useState<string[]>([]);
  const [weightPick, setWeightPick] = useState<string[]>([]);
  const [shadePick, setShadePick] = useState<string[]>([]);
  const [numberMax, setNumberMax] = useState(5);
  const [numberPick, setNumberPick] = useState<number[]>([]);
  const [actionPick, setActionPick] = useState<string[]>([]);
  const [capacityPick, setCapacityPick] = useState<string[]>([]);
  const [blockCount, setBlockCount] = useState(5);

  const modes: { id: Mode; label: string; icon: string }[] = [
    { id: 'medidas', label: 'Tamaño y longitud', icon: '📏' },
    { id: 'peso', label: 'Peso', icon: '⚖️' },
    { id: 'color', label: 'Claro a oscuro', icon: '🎨' },
    { id: 'numeros', label: 'Números', icon: '🔢' },
    { id: 'acciones', label: 'Acciones', icon: '🌅' },
    { id: 'capacidad', label: 'Capacidad', icon: '🥛' },
    { id: 'escalera', label: 'Escaleras', icon: '🧱' },
  ];

  const resetAll = () => {
    setOrderPick([]);
    setWeightPick([]);
    setShadePick([]);
    setNumberPick([]);
    setActionPick([]);
    setCapacityPick([]);
  };

  const measureData: Record<MeasureKind, { title: string; desc: string; items: SortItem[]; orderText: string }> = {
    tamano: {
      title: 'Ordenar por tamaño',
      desc: 'Toca los objetos desde el más pequeño hasta el más grande.',
      orderText: 'pequeño → mediano → grande',
      items: [
        { id: 'pequeno', icon: '🐜', label: 'Pequeño', value: 1, note: 'ocupa poco espacio' },
        { id: 'mediano', icon: '🐶', label: 'Mediano', value: 2, note: 'ni grande ni pequeño' },
        { id: 'grande', icon: '🐘', label: 'Grande', value: 3, note: 'ocupa mucho espacio' },
      ],
    },
    altura: {
      title: 'Ordenar por altura',
      desc: 'Ordena desde el más bajito hasta el más alto.',
      orderText: 'bajito → mediano → alto → altísimo',
      items: [
        { id: 'bajito', icon: '🌱', label: 'Bajito', value: 1 },
        { id: 'medio', icon: '🌷', label: 'Mediano', value: 2 },
        { id: 'alto', icon: '🌻', label: 'Alto', value: 3 },
        { id: 'altisimo', icon: '🌳', label: 'Altísimo', value: 4 },
      ],
    },
    longitud: {
      title: 'Ordenar por longitud',
      desc: 'Ordena del más corto al más largo.',
      orderText: 'corto → mediano → largo → larguísimo',
      items: [
        { id: 'corto', icon: '✏️', label: 'Corto', value: 1 },
        { id: 'medio', icon: '🖍️', label: 'Mediano', value: 2 },
        { id: 'largo', icon: '📏', label: 'Largo', value: 3 },
        { id: 'larguisimo', icon: '🪄', label: 'Larguísimo', value: 4 },
      ],
    },
  };

  const addUnique = <T,>(list: T[], value: T) => list.includes(value) ? list : [...list, value];

  const checkStringOrder = (picked: string[], items: SortItem[]) => {
    const correct = [...items].sort((a, b) => a.value - b.value).map(i => i.id);
    return picked.length === correct.length && picked.every((id, i) => id === correct[i]);
  };

  const renderPickedRow = (picked: string[], items: SortItem[]) => (
    <div className="p-4 rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30">
      <div className="text-xs font-black uppercase opacity-70 mb-2">Tu orden</div>
      <div className="flex gap-2 flex-wrap justify-center min-h-20">
        {picked.length === 0 && <div className="font-bold opacity-60">Toca tarjetas para construir la serie.</div>}
        {picked.map((id, i) => {
          const item = items.find(x => x.id === id)!;
          return (
            <div key={`${id}-${i}`} className="p-3 rounded-2xl bg-surface-color border-2 border-border-color shadow text-center">
              <div className="text-[10px] font-black opacity-60">#{i + 1}</div>
              <div className="text-4xl">{item.icon}</div>
              <div className="text-[10px] font-black">{item.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const renderMedidas = () => {
    const data = measureData[measureKind];
    const ok = checkStringOrder(orderPick, data.items);

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          {[
            { id: 'tamano', label: 'Tamaño', icon: '🐜' },
            { id: 'altura', label: 'Altura', icon: '🌳' },
            { id: 'longitud', label: 'Longitud', icon: '📏' },
          ].map(k => (
            <button
              key={k.id}
              onClick={() => {
                setMeasureKind(k.id as MeasureKind);
                setOrderPick([]);
              }}
              className={`p-3 rounded-2xl font-black text-xs transition-all ${
                measureKind === k.id ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color hover:scale-105'
              }`}
            >
              <span className="text-2xl block mb-1">{k.icon}</span>
              {k.label}
            </button>
          ))}
        </div>

        <div className="p-4 rounded-3xl bg-surface-color border-2 border-border-color shadow">
          <div className="font-black text-xl">{data.title}</div>
          <p className="text-sm font-bold opacity-75 mb-4">{data.desc}</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[...data.items].sort((a, b) => b.value - a.value).map(item => (
              <button
                key={item.id}
                onClick={() => setOrderPick(addUnique(orderPick, item.id))}
                disabled={orderPick.includes(item.id)}
                className={`p-4 rounded-3xl border-2 font-black transition-all ${
                  orderPick.includes(item.id)
                    ? 'opacity-40 bg-slate-200 dark:bg-slate-700'
                    : 'bg-surface-color border-border-color hover:scale-105'
                }`}
              >
                <div className="text-5xl mb-2">{item.icon}</div>
                <div>{item.label}</div>
                {item.note && <div className="text-[10px] opacity-70 mt-1">{item.note}</div>}
              </button>
            ))}
          </div>
        </div>

        {renderPickedRow(orderPick, data.items)}

        {orderPick.length === data.items.length && (
          <div className={`p-4 rounded-2xl text-center font-black text-white ${ok ? 'bg-emerald-500' : 'bg-red-500'}`}>
            {ok ? '✅ ¡Correcto!' : '❌ Casi.'} Orden esperado: {data.orderText}.
          </div>
        )}

        <div className="grid grid-cols-2 gap-2">
          <button onClick={() => setOrderPick(orderPick.slice(0, -1))} className="p-3 rounded-2xl bg-slate-200 dark:bg-slate-700 font-black text-xs">
            Quitar última
          </button>
          <button onClick={() => setOrderPick([])} className="math-btn text-xs py-3">
            Reiniciar
          </button>
        </div>
      </div>
    );
  };

  const renderPeso = () => {
    const items: SortItem[] = [
      { id: 'pluma', icon: '🪶', label: 'Pluma', value: 1 },
      { id: 'manzana', icon: '🍎', label: 'Manzana', value: 2 },
      { id: 'libro', icon: '📘', label: 'Libro', value: 3 },
      { id: 'mochila', icon: '🎒', label: 'Mochila', value: 4 },
      { id: 'piedra', icon: '🪨', label: 'Piedra', value: 5 },
    ];

    const ok = checkStringOrder(weightPick, items);
    const last = weightPick.length ? items.find(i => i.id === weightPick[weightPick.length - 1]) : null;

    return (
      <div className="space-y-4">
        <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow">
          <div className="font-black text-xl mb-1">Ordenar por peso</div>
          <p className="text-sm font-bold opacity-75 mb-4">Toca del más liviano al más pesado.</p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[...items].sort((a, b) => b.value - a.value).map(item => (
              <button
                key={item.id}
                onClick={() => setWeightPick(addUnique(weightPick, item.id))}
                disabled={weightPick.includes(item.id)}
                className={`p-4 rounded-3xl border-2 font-black transition-all ${
                  weightPick.includes(item.id) ? 'opacity-40 bg-slate-200 dark:bg-slate-700' : 'bg-surface-color border-border-color hover:scale-105'
                }`}
              >
                <div className="text-5xl mb-2">{item.icon}</div>
                {item.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-[240px_1fr] gap-4 items-center">
          <div className="p-5 rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30 text-center shadow">
            <div className="text-6xl mb-2">⚖️</div>
            <div className="h-4 rounded-full bg-slate-300 dark:bg-slate-700 overflow-hidden">
              <div
                className="h-full bg-[var(--primary-color)] transition-all duration-500"
                style={{ width: `${last ? last.value * 20 : 5}%` }}
              />
            </div>
            <div className="mt-2 font-black text-sm">
              {last ? `${last.label}: peso ${last.value}` : 'Elige un objeto'}
            </div>
          </div>

          {renderPickedRow(weightPick, items)}
        </div>

        {weightPick.length === items.length && (
          <div className={`p-4 rounded-2xl text-center font-black text-white ${ok ? 'bg-emerald-500' : 'bg-red-500'}`}>
            {ok ? '✅ ¡Correcto!' : '❌ Casi.'} Orden esperado: pluma, manzana, libro, mochila, piedra.
          </div>
        )}

        <button onClick={() => setWeightPick([])} className="math-btn w-full">
          Reiniciar peso
        </button>
      </div>
    );
  };

  const renderColor = () => {
    const shades = [
      { id: 'muy-claro', label: 'Muy claro', value: 1, bg: '#fee2e2' },
      { id: 'claro', label: 'Claro', value: 2, bg: '#fca5a5' },
      { id: 'medio', label: 'Medio', value: 3, bg: '#ef4444' },
      { id: 'oscuro', label: 'Oscuro', value: 4, bg: '#b91c1c' },
      { id: 'muy-oscuro', label: 'Muy oscuro', value: 5, bg: '#450a0a' },
    ];

    const correct = shades.map(s => s.id);
    const done = shadePick.length === shades.length;
    const ok = done && shadePick.every((id, i) => id === correct[i]);

    return (
      <div className="space-y-4">
        <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow">
          <div className="font-black text-xl mb-1">Ordenar de claro a oscuro</div>
          <p className="text-sm font-bold opacity-75 mb-4">Toca los colores empezando por el más claro.</p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[...shades].reverse().map(sh => (
              <button
                key={sh.id}
                onClick={() => setShadePick(addUnique(shadePick, sh.id))}
                disabled={shadePick.includes(sh.id)}
                className={`h-28 rounded-3xl border-4 font-black shadow transition-all ${
                  shadePick.includes(sh.id) ? 'opacity-40' : 'hover:scale-105'
                }`}
                style={{ background: sh.bg, color: sh.value >= 3 ? '#fff' : '#111827', borderColor: sh.bg }}
              >
                {sh.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30">
          <div className="text-xs font-black uppercase opacity-70 mb-2">Tu degradado</div>
          <div className="grid grid-cols-5 gap-2 min-h-20">
            {shadePick.map(id => {
              const sh = shades.find(s => s.id === id)!;
              return (
                <div
                  key={id}
                  className="rounded-2xl h-20 flex items-center justify-center font-black text-[10px] border-2 border-white/50"
                  style={{ background: sh.bg, color: sh.value >= 3 ? '#fff' : '#111827' }}
                >
                  {sh.label}
                </div>
              );
            })}
          </div>
        </div>

        {done && (
          <div className={`p-4 rounded-2xl text-center font-black text-white ${ok ? 'bg-emerald-500' : 'bg-red-500'}`}>
            {ok ? '✅ ¡Correcto!' : '❌ Casi.'} La serie va de claro a oscuro.
          </div>
        )}

        <button onClick={() => setShadePick([])} className="math-btn w-full">
          Reiniciar colores
        </button>
      </div>
    );
  };

  const renderNumeros = () => {
    const nums = Array.from({ length: numberMax }, (_, i) => i + 1);
    const shuffled = numberMax === 5 ? [3, 1, 5, 2, 4] : [7, 2, 10, 4, 1, 9, 5, 3, 8, 6];
    const source = shuffled.slice(0, numberMax);
    const done = numberPick.length === numberMax;
    const ok = done && numberPick.every((n, i) => n === nums[i]);

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-2">
          {[5, 10].map(n => (
            <button
              key={n}
              onClick={() => {
                setNumberMax(n);
                setNumberPick([]);
              }}
              className={`p-3 rounded-2xl font-black ${
                numberMax === n ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color'
              }`}
            >
              Números 1 al {n}
            </button>
          ))}
        </div>

        <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow">
          <div className="font-black text-xl mb-1">Ordenar tarjetas numéricas</div>
          <p className="text-sm font-bold opacity-75 mb-4">Toca las tarjetas del 1 al {numberMax}.</p>

          <div className="grid grid-cols-5 gap-2">
            {source.map(n => (
              <button
                key={n}
                onClick={() => setNumberPick(numberPick.includes(n) ? numberPick : [...numberPick, n])}
                disabled={numberPick.includes(n)}
                className={`p-4 rounded-3xl border-2 text-3xl font-black transition-all ${
                  numberPick.includes(n) ? 'opacity-40 bg-slate-200 dark:bg-slate-700' : 'bg-surface-color border-border-color hover:scale-105'
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30">
          <div className="text-xs font-black uppercase opacity-70 mb-2">Tu serie numérica</div>
          <div className="flex gap-2 flex-wrap justify-center">
            {numberPick.map(n => (
              <div key={n} className="w-14 h-14 rounded-2xl bg-surface-color border-2 border-border-color flex flex-col items-center justify-center shadow">
                <div className="font-black text-xl">{n}</div>
                <div className="flex gap-0.5">
                  {Array.from({ length: Math.min(n, 10) }).map((_, i) => <span key={i} className="w-1.5 h-1.5 rounded-full bg-[var(--primary-color)]" />)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {done && (
          <div className={`p-4 rounded-2xl text-center font-black text-white ${ok ? 'bg-emerald-500' : 'bg-red-500'}`}>
            {ok ? '✅ ¡Correcto!' : '❌ Casi.'} El orden correcto es: {nums.join(', ')}.
          </div>
        )}

        <button onClick={() => setNumberPick([])} className="math-btn w-full">
          Reiniciar números
        </button>
      </div>
    );
  };

  const renderAcciones = () => {
    const actions = [
      { id: 'despertar', icon: '🛏️', label: 'Despertar', value: 1 },
      { id: 'desayunar', icon: '🥣', label: 'Desayunar', value: 2 },
      { id: 'escuela', icon: '🎒', label: 'Ir al cole', value: 3 },
      { id: 'jugar', icon: '🧸', label: 'Jugar', value: 4 },
      { id: 'dormir', icon: '🌙', label: 'Dormir', value: 5 },
    ];

    const shuffled = [actions[2], actions[0], actions[4], actions[1], actions[3]];
    const correct = actions.map(a => a.id);
    const done = actionPick.length === actions.length;
    const ok = done && actionPick.every((id, i) => id === correct[i]);

    return (
      <div className="space-y-4">
        <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow">
          <div className="font-black text-xl mb-1">Ordenar acciones diarias</div>
          <p className="text-sm font-bold opacity-75 mb-4">Toca primero lo que pasa al inicio del día y termina con la noche.</p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
            {shuffled.map(a => (
              <button
                key={a.id}
                onClick={() => setActionPick(addUnique(actionPick, a.id))}
                disabled={actionPick.includes(a.id)}
                className={`p-4 rounded-3xl border-2 font-black transition-all ${
                  actionPick.includes(a.id) ? 'opacity-40 bg-slate-200 dark:bg-slate-700' : 'bg-surface-color border-border-color hover:scale-105'
                }`}
              >
                <div className="text-5xl mb-1">{a.icon}</div>
                <div className="text-xs">{a.label}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30">
          <div className="text-xs font-black uppercase opacity-70 mb-2">Primero, luego y al final</div>
          <div className="flex gap-2 flex-wrap justify-center">
            {actionPick.map((id, i) => {
              const a = actions.find(x => x.id === id)!;
              return (
                <div key={id} className="p-3 rounded-2xl bg-surface-color border-2 border-border-color text-center shadow">
                  <div className="text-[10px] font-black opacity-60">{i === 0 ? 'Primero' : i === actionPick.length - 1 ? 'Al final' : 'Luego'}</div>
                  <div className="text-4xl">{a.icon}</div>
                  <div className="text-[10px] font-black">{a.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {done && (
          <div className={`p-4 rounded-2xl text-center font-black text-white ${ok ? 'bg-emerald-500' : 'bg-red-500'}`}>
            {ok ? '✅ ¡Correcto!' : '❌ Casi.'} Piensa qué haces primero al despertar.
          </div>
        )}

        <button onClick={() => setActionPick([])} className="math-btn w-full">
          Reiniciar acciones
        </button>
      </div>
    );
  };

  const renderCapacidad = () => {
    const cups = [
      { id: 'vacio', label: 'Vacío', value: 0 },
      { id: 'poco', label: 'Poco', value: 25 },
      { id: 'medio', label: 'Medio', value: 50 },
      { id: 'casi', label: 'Casi lleno', value: 75 },
      { id: 'lleno', label: 'Lleno', value: 100 },
    ];

    const correct = cups.map(c => c.id);
    const done = capacityPick.length === cups.length;
    const ok = done && capacityPick.every((id, i) => id === correct[i]);

    return (
      <div className="space-y-4">
        <div className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow">
          <div className="font-black text-xl mb-1">Seriar por capacidad</div>
          <p className="text-sm font-bold opacity-75 mb-4">Ordena los recipientes desde vacío hasta lleno.</p>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {[...cups].reverse().map(cup => (
              <button
                key={cup.id}
                onClick={() => setCapacityPick(addUnique(capacityPick, cup.id))}
                disabled={capacityPick.includes(cup.id)}
                className={`p-4 rounded-3xl border-2 font-black transition-all ${
                  capacityPick.includes(cup.id) ? 'opacity-40 bg-slate-200 dark:bg-slate-700' : 'bg-surface-color border-border-color hover:scale-105'
                }`}
              >
                <div className="w-16 h-24 mx-auto rounded-b-3xl rounded-t-lg border-4 border-sky-500 relative overflow-hidden bg-sky-100/20">
                  <div className="absolute bottom-0 left-0 right-0 bg-sky-400 transition-all duration-500" style={{ height: `${cup.value}%` }} />
                </div>
                <div className="mt-2 text-xs">{cup.label}</div>
              </button>
            ))}
          </div>
        </div>

        <div className="p-4 rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30">
          <div className="text-xs font-black uppercase opacity-70 mb-2">Tu orden de capacidad</div>
          <div className="flex gap-2 flex-wrap justify-center">
            {capacityPick.map(id => {
              const cup = cups.find(c => c.id === id)!;
              return (
                <div key={id} className="p-3 rounded-2xl bg-surface-color border-2 border-border-color text-center shadow">
                  <div className="w-12 h-16 mx-auto rounded-b-2xl rounded-t-lg border-2 border-sky-500 relative overflow-hidden">
                    <div className="absolute bottom-0 left-0 right-0 bg-sky-400" style={{ height: `${cup.value}%` }} />
                  </div>
                  <div className="text-[10px] font-black mt-1">{cup.label}</div>
                </div>
              );
            })}
          </div>
        </div>

        {done && (
          <div className={`p-4 rounded-2xl text-center font-black text-white ${ok ? 'bg-emerald-500' : 'bg-red-500'}`}>
            {ok ? '✅ ¡Correcto!' : '❌ Casi.'} La serie va: vacío, poco, medio, casi lleno, lleno.
          </div>
        )}

        <button onClick={() => setCapacityPick([])} className="math-btn w-full">
          Reiniciar capacidad
        </button>
      </div>
    );
  };

  const renderEscalera = () => (
    <div className="space-y-4">
      <NumberInput label="Escalones" value={blockCount} setValue={setBlockCount} min={3} max={8} color="#f97316" />

      <div className="p-6 rounded-3xl bg-surface-color border-2 border-border-color shadow">
        <div className="font-black text-xl mb-1">Construir escaleras con bloques</div>
        <p className="text-sm font-bold opacity-75 mb-6">Cada columna tiene un bloque más que la anterior.</p>

        <div className="flex items-end justify-center gap-2 min-h-72">
          {Array.from({ length: blockCount }).map((_, col) => (
            <div key={col} className="flex flex-col-reverse gap-1 items-center">
              {Array.from({ length: col + 1 }).map((_, row) => (
                <div key={row} className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-orange-400 border-2 border-orange-600 shadow flex items-center justify-center font-black text-white">
                  {col + 1}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="lab-formula text-center text-base mt-6">
          La escalera crece: 1, 2, 3, 4... Cada paso aumenta en 1 bloque.
        </div>
      </div>
    </div>
  );

  return (
    <TopicCard
      icon="📏"
      title="Seriación y Orden"
      color="#f97316"
      desc="Ordena objetos por tamaño, altura, longitud, peso, color, número, acciones, capacidad y construye escaleras con bloques."
    >
      <div className="lab-container space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {modes.map(m => (
            <button
              key={m.id}
              onClick={() => {
                setMode(m.id);
                resetAll();
              }}
              className={`p-3 rounded-2xl font-black text-xs transition-all ${
                mode === m.id ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color hover:scale-105'
              }`}
            >
              <span className="text-2xl block mb-1">{m.icon}</span>
              {m.label}
            </button>
          ))}
        </div>

        {mode === 'medidas' && renderMedidas()}
        {mode === 'peso' && renderPeso()}
        {mode === 'color' && renderColor()}
        {mode === 'numeros' && renderNumeros()}
        {mode === 'acciones' && renderAcciones()}
        {mode === 'capacidad' && renderCapacidad()}
        {mode === 'escalera' && renderEscalera()}
      </div>
    </TopicCard>
  );
};


export const ClasificacionAgrupacion: React.FC = () => {
  type Mode = 'explorar' | 'reto' | 'doble' | 'conjuntos' | 'intruso' | 'habitat' | 'temperatura' | 'tiendita';
  type Criterion = 'color' | 'forma' | 'tamano' | 'uso' | 'textura' | 'material';

  const [mode, setMode] = useState<Mode>('explorar');
  const [criterion, setCriterion] = useState<Criterion>('color');
  const [answer, setAnswer] = useState<string | null>(null);
  const [challengeIndex, setChallengeIndex] = useState(0);
  const [challengePick, setChallengePick] = useState<string | null>(null);
  const [doubleColor, setDoubleColor] = useState('rojo');
  const [doubleShape, setDoubleShape] = useState('circulo');
  const [doubleSize, setDoubleSize] = useState('pequeno');
  const [setCount, setSetCount] = useState(4);
  const [intruderSet, setIntruderSet] = useState(0);
  const [intruderPick, setIntruderPick] = useState<number | null>(null);
  const [shopCategory, setShopCategory] = useState('juguetes');

  const modes: { id: Mode; label: string; icon: string }[] = [
    { id: 'explorar', label: 'Explorar grupos', icon: '🧺' },
    { id: 'reto', label: 'Reto rápido', icon: '🎯' },
    { id: 'doble', label: '2 criterios', icon: '🔴🔷' },
    { id: 'conjuntos', label: 'Misma cantidad', icon: '⚖️' },
    { id: 'intruso', label: 'Intruso', icon: '🕵️' },
    { id: 'habitat', label: 'Hábitat', icon: '🌍' },
    { id: 'temperatura', label: 'Temperatura', icon: '🌡️' },
    { id: 'tiendita', label: 'Tiendita', icon: '🏪' },
  ];

  const criterionInfo: Record<Criterion, {
    title: string;
    question: string;
    groups: { id: string; label: string; icon: string; items: string[]; why: string }[];
  }> = {
    color: {
      title: 'Agrupar por color',
      question: 'Toca un color para ver objetos que comparten ese color.',
      groups: [
        { id: 'rojo', label: 'Rojos', icon: '🔴', items: ['🍎', '🚒', '🌹', '🧣', '🍓', '🎈'], why: 'Todos tienen color rojo.' },
        { id: 'azul', label: 'Azules', icon: '🔵', items: ['🫐', '🐟', '💧', '🧢', '🖊️', '🦋'], why: 'Todos tienen color azul.' },
        { id: 'amarillo', label: 'Amarillos', icon: '🟡', items: ['🍌', '🌽', '🌻', '⭐', '🧀', '🍋'], why: 'Todos tienen color amarillo.' },
        { id: 'verde', label: 'Verdes', icon: '🟢', items: ['🥦', '🐸', '🌳', '🥒', '🍏', '🟩'], why: 'Todos tienen color verde.' },
        { id: 'naranja', label: 'Naranjas', icon: '🟠', items: ['🍊', '🥕', '🏀', '🦊', '🍑'], why: 'Todos tienen color naranja.' },
        { id: 'morado', label: 'Morados', icon: '🟣', items: ['🍇', '☂️', '🪻', '🟪', '💜'], why: 'Todos tienen color morado.' },
        { id: 'rosa', label: 'Rosas', icon: '🌸', items: ['🌸', '🎀', '🩰', '🦩', '💗'], why: 'Todos tienen color rosa.' },
        { id: 'negro-blanco', label: 'Negro/blanco', icon: '⚫', items: ['⚽', '🐼', '🎹', '🏁', '🦓'], why: 'Tienen blanco, negro o ambos.' },
      ],
    },
    forma: {
      title: 'Agrupar por forma',
      question: 'Los objetos también se agrupan por la forma que tienen.',
      groups: [
        { id: 'circulo', label: 'Círculos', icon: '⚪', items: ['⚽', '🍪', '🛞', '🥯', '🟠'], why: 'Tienen forma redonda.' },
        { id: 'cuadrado', label: 'Cuadrados', icon: '◼️', items: ['🧊', '🪟', '🧱', '🎲', '🟦'], why: 'Tienen cuatro lados parecidos.' },
        { id: 'triangulo', label: 'Triángulos', icon: '🔺', items: ['🍕', '🚩', '🔻', '⛺', '📐'], why: 'Tienen tres lados o parecen triángulos.' },
        { id: 'rectangulo', label: 'Rectángulos', icon: '▭', items: ['📱', '📚', '🚪', '🧾', '🪧'], why: 'Son más largos de un lado que de otro.' },
        { id: 'ovalo', label: 'Óvalos', icon: '🥚', items: ['🥚', '🏉', '🪞', '🥭'], why: 'Son redondos pero alargados.' },
        { id: 'estrella', label: 'Estrellas', icon: '⭐', items: ['⭐', '🌟', '✴️', '✳️'], why: 'Tienen puntas o forma de estrella.' },
      ],
    },
    tamano: {
      title: 'Agrupar por tamaño',
      question: 'Compara objetos grandes, medianos, pequeños y gigantes.',
      groups: [
        { id: 'gigante', label: 'Gigantes', icon: '🐋', items: ['🐋', '🏰', '🚢', '🌋'], why: 'Son muy grandes.' },
        { id: 'grande', label: 'Grandes', icon: '🐘', items: ['🐘', '🚌', '🏠', '🚜'], why: 'Ocupan mucho espacio.' },
        { id: 'mediano', label: 'Medianos', icon: '🐶', items: ['🐶', '🎒', '⚽', '🪑'], why: 'No son enormes ni muy pequeños.' },
        { id: 'pequeno', label: 'Pequeños', icon: '🐜', items: ['🐜', '🧩', '🍬', '🪙', '🫘'], why: 'Ocupan poco espacio.' },
      ],
    },
    uso: {
      title: 'Agrupar por uso',
      question: 'Agrupa los objetos según para qué sirven.',
      groups: [
        { id: 'juguetes', label: 'Juguetes', icon: '🧸', items: ['🧸', '🪁', '🎲', '🪀', '🧩', '🚂'], why: 'Sirven para jugar.' },
        { id: 'ropa', label: 'Ropa', icon: '👕', items: ['👕', '🧦', '🧢', '👟', '🧤', '🧣'], why: 'Sirven para vestirnos.' },
        { id: 'comida', label: 'Comida', icon: '🍎', items: ['🍎', '🍞', '🥕', '🍪', '🥚', '🍌'], why: 'Se puede comer.' },
        { id: 'escuela', label: 'Escuela', icon: '🎒', items: ['🎒', '✏️', '📚', '📏', '🖍️', '📓'], why: 'Se usan para estudiar.' },
        { id: 'cocina', label: 'Cocina', icon: '🍳', items: ['🍳', '🥄', '🍽️', '🥣', '🔪'], why: 'Se usan para cocinar o comer.' },
        { id: 'transporte', label: 'Transporte', icon: '🚗', items: ['🚗', '🚌', '🚲', '🚂', '✈️', '🚢'], why: 'Sirven para movernos.' },
        { id: 'higiene', label: 'Higiene', icon: '🪥', items: ['🪥', '🧼', '🧴', '🧻', '🛁'], why: 'Sirven para limpiar o cuidar el cuerpo.' },
      ],
    },
    textura: {
      title: 'Agrupar por textura',
      question: 'Imagina cómo se sienten al tocarlos: suave, áspero, liso o pegajoso.',
      groups: [
        { id: 'suave', label: 'Suave', icon: '🧸', items: ['🧸', '🧣', '🛏️', '🐰', '🧤'], why: 'Se sienten blanditos o agradables.' },
        { id: 'aspero', label: 'Áspero', icon: '🪨', items: ['🪨', '🧽', '🌵', '🧱', '🪵'], why: 'Raspan o tienen superficie irregular.' },
        { id: 'liso', label: 'Liso', icon: '🧊', items: ['🧊', '🥄', '🪞', '📱', '🥚'], why: 'Su superficie se siente pareja.' },
        { id: 'pegajoso', label: 'Pegajoso', icon: '🍯', items: ['🍯', '🍬', '🧴', '🍭'], why: 'Se puede pegar un poco a los dedos.' },
      ],
    },
    material: {
      title: 'Agrupar por material',
      question: 'También podemos clasificar por el material del que están hechos.',
      groups: [
        { id: 'madera', label: 'Madera', icon: '🪵', items: ['🪵', '🪑', '🚪', '✏️'], why: 'Vienen de madera o parecen de madera.' },
        { id: 'metal', label: 'Metal', icon: '🔩', items: ['🔩', '🥄', '🪙', '🔑'], why: 'Son duros y brillantes como el metal.' },
        { id: 'plastico', label: 'Plástico', icon: '🧴', items: ['🧴', '🧸', '🪣', '🧃'], why: 'Son ligeros y hechos de plástico.' },
        { id: 'papel', label: 'Papel', icon: '📄', items: ['📄', '📚', '📓', '🧾'], why: 'Están hechos con papel.' },
        { id: 'tela', label: 'Tela', icon: '🧵', items: ['👕', '🧦', '🧣', '🛏️'], why: 'Están hechos con tela.' },
      ],
    },
  };

  const criterionData = criterionInfo[criterion];
  const selectedGroup = criterionData.groups.find(g => g.id === answer) ?? criterionData.groups[0];

  const challengeBank = (Object.keys(criterionInfo) as Criterion[]).flatMap(c =>
    criterionInfo[c].groups.flatMap(g =>
      g.items.slice(0, 2).map(item => ({
        criterion: c,
        item,
        correct: g.id,
        groupLabel: g.label,
        why: g.why,
      }))
    )
  );

  const challenge = challengeBank[challengeIndex % challengeBank.length];
  const challengeOptions = criterionInfo[challenge.criterion].groups;
  const challengeOk = challengePick === challenge.correct;

  const doubleItems = [
    { color: 'rojo', shape: 'circulo', size: 'pequeno', icon: '🔴', label: 'círculo rojo pequeño' },
    { color: 'rojo', shape: 'circulo', size: 'grande', icon: '🔴', label: 'círculo rojo grande' },
    { color: 'azul', shape: 'circulo', size: 'pequeno', icon: '🔵', label: 'círculo azul pequeño' },
    { color: 'azul', shape: 'cuadrado', size: 'grande', icon: '🟦', label: 'cuadrado azul grande' },
    { color: 'rojo', shape: 'cuadrado', size: 'pequeno', icon: '🟥', label: 'cuadrado rojo pequeño' },
    { color: 'verde', shape: 'cuadrado', size: 'grande', icon: '🟩', label: 'cuadrado verde grande' },
    { color: 'amarillo', shape: 'triangulo', size: 'pequeno', icon: '🔻', label: 'triángulo amarillo pequeño' },
    { color: 'rojo', shape: 'triangulo', size: 'grande', icon: '🔺', label: 'triángulo rojo grande' },
    { color: 'verde', shape: 'circulo', size: 'pequeno', icon: '🟢', label: 'círculo verde pequeño' },
    { color: 'amarillo', shape: 'circulo', size: 'grande', icon: '🟡', label: 'círculo amarillo grande' },
  ];

  const filteredDouble = doubleItems.filter(i => i.color === doubleColor && i.shape === doubleShape && i.size === doubleSize);

  const intruderSets = [
    {
      title: 'Grupo de frutas',
      items: [
        { icon: '🍌', ok: false, why: 'Es fruta.' },
        { icon: '🍎', ok: false, why: 'Es fruta.' },
        { icon: '🍊', ok: false, why: 'Es fruta.' },
        { icon: '🚗', ok: true, why: 'El auto no es fruta; es un vehículo.' },
      ],
    },
    {
      title: 'Grupo de ropa',
      items: [
        { icon: '👕', ok: false, why: 'Es ropa.' },
        { icon: '🧦', ok: false, why: 'Es ropa.' },
        { icon: '👟', ok: false, why: 'Se usa para vestir.' },
        { icon: '🍪', ok: true, why: 'La galleta no es ropa; es comida.' },
      ],
    },
    {
      title: 'Grupo de animales',
      items: [
        { icon: '🐶', ok: false, why: 'Es animal.' },
        { icon: '🐱', ok: false, why: 'Es animal.' },
        { icon: '🐰', ok: false, why: 'Es animal.' },
        { icon: '🎒', ok: true, why: 'La mochila no es animal; es un objeto.' },
      ],
    },
    {
      title: 'Grupo de cosas frías',
      items: [
        { icon: '🧊', ok: false, why: 'Es frío.' },
        { icon: '🍦', ok: false, why: 'Es frío.' },
        { icon: '❄️', ok: false, why: 'Es frío.' },
        { icon: '☕', ok: true, why: 'El café no es frío; normalmente está caliente.' },
      ],
    },
    {
      title: 'Grupo de escuela',
      items: [
        { icon: '✏️', ok: false, why: 'Sirve para estudiar.' },
        { icon: '📚', ok: false, why: 'Sirve para estudiar.' },
        { icon: '📏', ok: false, why: 'Sirve para estudiar.' },
        { icon: '🦁', ok: true, why: 'El león no es material escolar; es un animal.' },
      ],
    },
  ];

  const currentIntruder = intruderSets[intruderSet];

  const habitats = [
    { id: 'agua', label: 'Agua', icon: '💧', animals: ['🐟', '🐬', '🐙', '🦀', '🐳'] },
    { id: 'tierra', label: 'Tierra', icon: '🌳', animals: ['🐶', '🐘', '🦁', '🐎', '🐢'] },
    { id: 'aire', label: 'Aire', icon: '☁️', animals: ['🐦', '🦋', '🦅', '🐝', '🦇'] },
    { id: 'granja', label: 'Granja', icon: '🚜', animals: ['🐄', '🐖', '🐓', '🐑', '🐴'] },
    { id: 'selva', label: 'Selva', icon: '🌴', animals: ['🐒', '🐯', '🦜', '🐍', '🦥'] },
  ];

  const temperature = [
    { id: 'frio', label: 'Frío', icon: '❄️', items: ['🧊', '🍦', '⛄', '🥶', '🧋'], desc: 'Se sienten fríos o se usan con frío.' },
    { id: 'caliente', label: 'Caliente', icon: '🔥', items: ['☕', '🍲', '🌋', '🥘', '☀️'], desc: 'Se sienten calientes o producen calor.' },
    { id: 'templado', label: 'Templado', icon: '🌤️', items: ['🥛', '🍞', '🍎', '🧸'], desc: 'No se sienten ni muy fríos ni muy calientes.' },
  ];

  const shopGroups = criterionInfo.uso.groups;
  const shopSelected = shopGroups.find(g => g.id === shopCategory) ?? shopGroups[0];

  const nextChallenge = () => {
    setChallengeIndex(n => (n + 1) % challengeBank.length);
    setChallengePick(null);
  };

  const renderExplorar = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
        {[
          { id: 'color', label: 'Color', icon: '🎨' },
          { id: 'forma', label: 'Forma', icon: '🔷' },
          { id: 'tamano', label: 'Tamaño', icon: '📏' },
          { id: 'uso', label: 'Uso', icon: '🧸' },
          { id: 'textura', label: 'Textura', icon: '🪨' },
          { id: 'material', label: 'Material', icon: '🧱' },
        ].map(c => (
          <button
            key={c.id}
            onClick={() => {
              setCriterion(c.id as Criterion);
              setAnswer(null);
            }}
            className={`p-3 rounded-2xl font-black text-xs transition-all ${
              criterion === c.id ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color hover:scale-105'
            }`}
          >
            <span className="text-2xl block mb-1">{c.icon}</span>
            {c.label}
          </button>
        ))}
      </div>

      <div className="p-4 rounded-3xl bg-surface-color border-2 border-border-color shadow">
        <div className="font-black text-xl mb-1">{criterionData.title}</div>
        <p className="text-sm font-bold opacity-75 mb-4">{criterionData.question}</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {criterionData.groups.map(g => (
            <button
              key={g.id}
              onClick={() => setAnswer(g.id)}
              className={`p-4 rounded-3xl border-2 font-black transition-all ${
                answer === g.id ? 'border-[var(--primary-color)] bg-[var(--primary-color)]/15 scale-105 shadow' : 'border-border-color bg-black/5 hover:scale-105'
              }`}
            >
              <div className="text-4xl mb-2">{g.icon}</div>
              <div className="text-xs">{g.label}</div>
            </button>
          ))}
        </div>

        <div className="mt-4 p-4 rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30 text-center">
          <div className="text-xs font-black uppercase opacity-70 mb-2">Grupo elegido</div>
          <div className="flex justify-center gap-2 flex-wrap text-5xl">
            {selectedGroup.items.map((it, i) => <span key={i}>{it}</span>)}
          </div>
          <div className="mt-3 font-black">{selectedGroup.label}</div>
          <div className="text-xs font-bold opacity-75 mt-1">{selectedGroup.why}</div>
        </div>
      </div>
    </div>
  );

  const renderReto = () => (
    <div className="space-y-4">
      <div className="p-6 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
        <div className="text-xs font-black uppercase opacity-70 mb-2">Reto rápido</div>
        <div className="text-sm font-bold opacity-75 mb-3">
          Clasifica este objeto por <b>{criterionInfo[challenge.criterion].title.replace('Agrupar por ', '')}</b>.
        </div>
        <div className="text-8xl my-4">{challenge.item}</div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {challengeOptions.map(opt => (
            <button
              key={opt.id}
              onClick={() => setChallengePick(opt.id)}
              className={`p-3 rounded-2xl border-2 font-black text-xs transition-all ${
                challengePick === opt.id
                  ? opt.id === challenge.correct
                    ? 'bg-emerald-500 text-white border-emerald-500 scale-105'
                    : 'bg-red-500 text-white border-red-500'
                  : 'bg-surface-color border-border-color hover:scale-105'
              }`}
            >
              <span className="text-3xl block mb-1">{opt.icon}</span>
              {opt.label}
            </button>
          ))}
        </div>

        {challengePick && (
          <div className={`mt-4 p-4 rounded-2xl text-center font-black text-white ${challengeOk ? 'bg-emerald-500' : 'bg-red-500'}`}>
            {challengeOk ? '✅ ¡Correcto!' : '❌ Casi.'} Pertenece a: {challenge.groupLabel}. {challenge.why}
          </div>
        )}

        <button onClick={nextChallenge} className="math-btn w-full mt-4">
          Nuevo objeto
        </button>
      </div>
    </div>
  );

  const renderDoble = () => {
    const colorStyles: Record<string, string> = {
      rojo: '#ef4444',
      azul: '#3b82f6',
      verde: '#22c55e',
      amarillo: '#eab308',
    };

    const colorName: Record<string, string> = {
      rojo: 'rojo',
      azul: 'azul',
      verde: 'verde',
      amarillo: 'amarillo',
    };

    const shapeName: Record<string, string> = {
      circulo: 'círculo',
      cuadrado: 'cuadrado',
      triangulo: 'triángulo',
    };

    const sizeName = doubleSize === 'pequeno' ? 'pequeño' : 'grande';
    const previewSize = doubleSize === 'pequeno'
      ? 'w-24 h-24 md:w-28 md:h-28'
      : 'w-36 h-36 md:w-44 md:h-44';

    const shapeStyle: React.CSSProperties = {
      background: colorStyles[doubleColor] ?? '#ef4444',
      clipPath: doubleShape === 'triangulo' ? 'polygon(50% 0%, 100% 100%, 0% 100%)' : undefined,
    };

    const shapeClass =
      doubleShape === 'circulo'
        ? previewSize + ' rounded-full shadow-xl border-4 border-white/70'
        : doubleShape === 'cuadrado'
          ? previewSize + ' rounded-3xl shadow-xl border-4 border-white/70'
          : previewSize + ' shadow-xl';

    return (
      <div className="space-y-4">
        <div className="grid md:grid-cols-3 gap-3">
          <div className="p-4 rounded-3xl bg-surface-color border-2 border-border-color shadow">
            <div className="text-xs font-black uppercase opacity-70 mb-2">Color</div>
            <div className="grid grid-cols-2 gap-2">
              {['rojo', 'azul', 'verde', 'amarillo'].map(c => (
                <button key={c} onClick={() => setDoubleColor(c)} className={`p-3 rounded-2xl font-black capitalize ${doubleColor === c ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-slate-200 dark:bg-slate-700'}`}>
                  {c}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-3xl bg-surface-color border-2 border-border-color shadow">
            <div className="text-xs font-black uppercase opacity-70 mb-2">Forma</div>
            <div className="grid grid-cols-3 gap-2">
              {['circulo', 'cuadrado', 'triangulo'].map(f => (
                <button key={f} onClick={() => setDoubleShape(f)} className={`p-3 rounded-2xl font-black text-xs capitalize ${doubleShape === f ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-slate-200 dark:bg-slate-700'}`}>
                  {f === 'circulo' ? 'Círculo' : f === 'cuadrado' ? 'Cuadrado' : 'Triángulo'}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-3xl bg-surface-color border-2 border-border-color shadow">
            <div className="text-xs font-black uppercase opacity-70 mb-2">Tamaño</div>
            <div className="grid grid-cols-2 gap-2">
              {['pequeno', 'grande'].map(t => (
                <button key={t} onClick={() => setDoubleSize(t)} className={`p-3 rounded-2xl font-black text-xs capitalize ${doubleSize === t ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-slate-200 dark:bg-slate-700'}`}>
                  {t === 'pequeno' ? 'Pequeño' : 'Grande'}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30 text-center shadow">
          <div className="font-black text-lg mb-3">
            Buscamos: {colorName[doubleColor]} + {shapeName[doubleShape]} + {sizeName}
          </div>

          <div className="min-h-56 flex flex-col items-center justify-center gap-4">
            <motion.div
              key={doubleColor + doubleShape + doubleSize}
              initial={{ scale: 0.7, opacity: 0, rotate: -8 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 160, damping: 12 }}
              className={shapeClass}
              style={shapeStyle}
            />

            <div className="px-4 py-2 rounded-2xl bg-surface-color border-2 border-border-color font-black text-sm shadow">
              {shapeName[doubleShape]} {colorName[doubleColor]} {sizeName}
            </div>
          </div>

          <div className="text-sm font-bold opacity-80 mt-3">
            Clasificar con varios criterios significa que el objeto debe cumplir todas las reglas al mismo tiempo.
          </div>
        </div>
      </div>
    );
  };

  const renderConjuntos = () => (
    <div className="space-y-4">
      <NumberInput label="Cantidad por conjunto" value={setCount} setValue={setSetCount} min={1} max={10} color="#ef4444" />

      <div className="grid md:grid-cols-4 gap-3">
        {[
          { label: 'Conjunto A', icon: '🍎' },
          { label: 'Conjunto B', icon: '🧸' },
          { label: 'Conjunto C', icon: '⭐' },
          { label: 'Conjunto D', icon: '🐟' },
        ].map(group => (
          <div key={group.label} className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
            <div className="text-xs font-black uppercase opacity-70 mb-2">{group.label}</div>
            <div className="flex justify-center gap-1 flex-wrap text-4xl">
              {Array.from({ length: setCount }).map((_, i) => <span key={i}>{group.icon}</span>)}
            </div>
            <div className="mt-3 font-black">{setCount} elementos</div>
          </div>
        ))}
      </div>

      <div className="lab-formula text-center text-base">
        Todos los conjuntos tienen la misma cantidad: {setCount}.
      </div>
    </div>
  );

  const renderIntruso = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
        {intruderSets.map((set, i) => (
          <button
            key={set.title}
            onClick={() => {
              setIntruderSet(i);
              setIntruderPick(null);
            }}
            className={`p-3 rounded-2xl font-black text-xs ${intruderSet === i ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-slate-200 dark:bg-slate-700'}`}
          >
            {set.title}
          </button>
        ))}
      </div>

      <div className="p-4 rounded-3xl bg-surface-color border-2 border-border-color shadow">
        <div className="font-black text-lg mb-2">{currentIntruder.title}</div>
        <p className="text-sm font-bold opacity-75 mb-4">Toca el elemento que no pertenece al grupo.</p>

        <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
          {currentIntruder.items.map((item, i) => (
            <button
              key={i}
              onClick={() => setIntruderPick(i)}
              className={`p-4 rounded-3xl border-2 text-5xl shadow transition-all ${
                intruderPick === i
                  ? item.ok ? 'bg-emerald-500 text-white border-emerald-500 scale-105' : 'bg-red-500 text-white border-red-500'
                  : 'bg-surface-color border-border-color hover:scale-110'
              }`}
            >
              {item.icon}
            </button>
          ))}
        </div>

        {intruderPick !== null && (
          <div className={`mt-4 p-4 rounded-2xl font-black text-center text-white ${currentIntruder.items[intruderPick].ok ? 'bg-emerald-500' : 'bg-red-500'}`}>
            {currentIntruder.items[intruderPick].ok ? '✅ ¡Correcto!' : '❌ Casi.'} {currentIntruder.items[intruderPick].why}
          </div>
        )}
      </div>
    </div>
  );

  const renderHabitat = () => (
    <div className="space-y-4">
      <div className="grid md:grid-cols-5 gap-3">
        {habitats.map(h => (
          <div key={h.id} className="p-5 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
            <div className="text-5xl mb-2">{h.icon}</div>
            <div className="font-black text-lg mb-3">{h.label}</div>
            <div className="flex justify-center gap-2 text-4xl flex-wrap">
              {h.animals.map(a => <span key={a}>{a}</span>)}
            </div>
          </div>
        ))}
      </div>

      <div className="lab-formula text-center text-base">
        Podemos clasificar animales según dónde viven o dónde suelen encontrarse.
      </div>
    </div>
  );

  const renderTemperatura = () => (
    <div className="grid md:grid-cols-3 gap-4">
      {temperature.map(t => (
        <div key={t.id} className="p-6 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
          <div className="text-6xl mb-2">{t.icon}</div>
          <div className="font-black text-2xl mb-3">{t.label}</div>
          <div className="flex justify-center gap-3 text-5xl flex-wrap">
            {t.items.map(item => <span key={item}>{item}</span>)}
          </div>
          <p className="text-sm font-bold opacity-75 mt-4">{t.desc}</p>
        </div>
      ))}
    </div>
  );

  const renderTiendita = () => (
    <div className="space-y-4">
      <div className="p-4 rounded-3xl bg-surface-color border-2 border-border-color shadow">
        <div className="font-black text-xl mb-1">Tiendita de clasificación</div>
        <p className="text-sm font-bold opacity-75 mb-4">
          Elige una caja de la tienda y observa qué objetos pertenecen a esa categoría.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
          {shopGroups.map(g => (
            <button
              key={g.id}
              onClick={() => setShopCategory(g.id)}
              className={`p-3 rounded-2xl font-black text-xs transition-all ${
                shopCategory === g.id ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-slate-200 dark:bg-slate-700'
              }`}
            >
              <span className="text-3xl block">{g.icon}</span>
              {g.label}
            </button>
          ))}
        </div>

        <div className="p-5 rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30 text-center">
          <div className="text-xs font-black uppercase opacity-70 mb-2">Caja: {shopSelected.label}</div>
          <div className="flex justify-center gap-3 text-6xl flex-wrap">
            {shopSelected.items.map(item => <span key={item}>{item}</span>)}
          </div>
          <div className="font-black mt-3">{shopSelected.why}</div>
        </div>
      </div>
    </div>
  );

  return (
    <TopicCard
      icon="🔴"
      title="Clasificación y Agrupación"
      color="#ef4444"
      desc="Agrupa por color, forma, tamaño, uso, textura, material, cantidad, hábitat y temperatura. También encuentra intrusos y combina criterios."
    >
      <div className="lab-container space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
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

        {mode === 'explorar' && renderExplorar()}
        {mode === 'reto' && renderReto()}
        {mode === 'doble' && renderDoble()}
        {mode === 'conjuntos' && renderConjuntos()}
        {mode === 'intruso' && renderIntruso()}
        {mode === 'habitat' && renderHabitat()}
        {mode === 'temperatura' && renderTemperatura()}
        {mode === 'tiendita' && renderTiendita()}
      </div>
    </TopicCard>
  );
};








export const Adivinanzas: React.FC = () => {
  const [intruderIdx, setIntruderIdx] = useState<number | null>(null);
  const items = [{ emoji: '🍌', intr: false }, { emoji: '🍎', intr: false }, { emoji: '🍊', intr: false }, { emoji: '🚗', intr: true }];
  return (
    <TopicCard icon="🧠" title="Encuentra al Intruso (Adivinanzas Lógicas)" color="#fbbf24"
      desc="Clasificación por uso o categoría. Toca el elemento que NO pertenece al grupo de frutas:">
      <div className="lab-container space-y-4">
        {intruderIdx !== null && (
          <div className={`p-4 rounded-2xl font-black text-center text-white ${items[intruderIdx].intr ? 'bg-emerald-500' : 'bg-red-400'}`}>
            {items[intruderIdx].intr ? '🎉 ¡Correcto! El auto es un vehículo, no una fruta.' : '❌ ¡Casi! Esa es una fruta deliciosa. Sigue intentando.'}
          </div>
        )}
        <div className="grid grid-cols-4 gap-4 max-w-sm mx-auto">
          {items.map((item, i) => (
            <button key={i} onClick={() => setIntruderIdx(i)} className="p-4 bg-surface-color border-2 border-border-color rounded-2xl text-4xl shadow hover:scale-110 transition-all flex items-center justify-center">{item.emoji}</button>
          ))}
        </div>
      </div>
    </TopicCard>
  );
};

export const NocionesEspacialesOrientacion: React.FC = () => {
  type Mode = 'posiciones' | 'instrucciones' | 'identificar' | 'croquis';
  type BasicKey =
    | 'arriba-abajo'
    | 'encima-debajo'
    | 'delante-detras'
    | 'cerca-lejos'
    | 'dentro-fuera'
    | 'lado'
    | 'entre'
    | 'izquierda-derecha'
    | 'enfrente-detras'
    | 'fila'
    | 'avanzar'
    | 'girar';

  type InstructionKey = 'arriba' | 'abajo' | 'izquierda' | 'derecha' | 'adelante' | 'atras';
  type IdentifyKey = 'dentro' | 'encima' | 'debajo' | 'entre' | 'cerca' | 'lejos' | 'lado';

  const [mode, setMode] = useState<Mode>('posiciones');
  const [basic, setBasic] = useState<BasicKey>('arriba-abajo');
  const [step, setStep] = useState(1);
  const [turn, setTurn] = useState<'izquierda' | 'derecha'>('derecha');

  const [instruction, setInstruction] = useState<InstructionKey>('arriba');
  const [instructionAnswer, setInstructionAnswer] = useState<InstructionKey | null>(null);

  const [identify, setIdentify] = useState<IdentifyKey>('dentro');
  const [identifyAnswer, setIdentifyAnswer] = useState<IdentifyKey | null>(null);

  const [bear, setBear] = useState({ r: 2, c: 1 });
  const [croquisTask, setCroquisTask] = useState(0);

  const basicOptions: { id: BasicKey; label: string; icon: string }[] = [
    { id: 'arriba-abajo', label: 'Arriba / abajo', icon: '⬆️' },
    { id: 'encima-debajo', label: 'Encima / debajo', icon: '🪑' },
    { id: 'delante-detras', label: 'Delante / detrás', icon: '🏠' },
    { id: 'cerca-lejos', label: 'Cerca / lejos', icon: '📍' },
    { id: 'dentro-fuera', label: 'Dentro / fuera', icon: '📦' },
    { id: 'lado', label: 'Al lado de', icon: '↔️' },
    { id: 'entre', label: 'Entre', icon: '🌳' },
    { id: 'izquierda-derecha', label: 'Izquierda / derecha', icon: '👈' },
    { id: 'enfrente-detras', label: 'Enfrente / detrás', icon: '🚪' },
    { id: 'fila', label: 'Primero / último', icon: '🚶' },
    { id: 'avanzar', label: 'Adelante / atrás', icon: '👣' },
    { id: 'girar', label: 'Girar derecha / izquierda', icon: '🔄' },
  ];

  const modes: { id: Mode; label: string; icon: string }[] = [
    { id: 'posiciones', label: 'Posiciones', icon: '🌸' },
    { id: 'instrucciones', label: 'Sigue la instrucción', icon: '🎯' },
    { id: 'identificar', label: '¿Dónde está?', icon: '🔎' },
    { id: 'croquis', label: 'Croquis del aula', icon: '🗺️' },
  ];

  const instructions: { id: InstructionKey; label: string; emoji: string; text: string }[] = [
    { id: 'arriba', label: 'Arriba', emoji: '🙌', text: 'Levanta las manos ARRIBA.' },
    { id: 'abajo', label: 'Abajo', emoji: '🧎', text: 'Agáchate hacia ABAJO.' },
    { id: 'izquierda', label: 'Izquierda', emoji: '👈', text: 'Toca tu lado IZQUIERDO.' },
    { id: 'derecha', label: 'Derecha', emoji: '👉', text: 'Toca tu lado DERECHO.' },
    { id: 'adelante', label: 'Adelante', emoji: '👣', text: 'Da un paso hacia ADELANTE.' },
    { id: 'atras', label: 'Atrás', emoji: '↩️', text: 'Da un paso hacia ATRÁS.' },
  ];

  const identifyScenes: Record<IdentifyKey, { question: string; answer: IdentifyKey; sentence: string; icon: string }> = {
    dentro: {
      question: '¿Dónde está el gato?',
      answer: 'dentro',
      sentence: 'El gato está dentro de la caja.',
      icon: '📦',
    },
    encima: {
      question: '¿Dónde está el gato?',
      answer: 'encima',
      sentence: 'El gato está encima de la mesa.',
      icon: '🪑',
    },
    debajo: {
      question: '¿Dónde está el perrito?',
      answer: 'debajo',
      sentence: 'El perrito está debajo de la mesa.',
      icon: '🐶',
    },
    entre: {
      question: '¿Dónde está la estrella?',
      answer: 'entre',
      sentence: 'La estrella está entre dos árboles.',
      icon: '⭐',
    },
    cerca: {
      question: '¿Dónde está el conejo?',
      answer: 'cerca',
      sentence: 'El conejo está cerca de la casa.',
      icon: '🐰',
    },
    lejos: {
      question: '¿Dónde está el auto?',
      answer: 'lejos',
      sentence: 'El auto está lejos de la casa.',
      icon: '🚗',
    },
    lado: {
      question: '¿Dónde está la manzana?',
      answer: 'lado',
      sentence: 'La manzana está al lado de la caja.',
      icon: '🍎',
    },
  };

  const posStyle = (x: number, y: number, extra: React.CSSProperties = {}): React.CSSProperties => ({
    position: 'absolute',
    left: `${x}%`,
    top: `${y}%`,
    transform: 'translate(-50%, -50%)',
    ...extra,
  });

  const Thing = ({
  emoji,
  label,
  style,
  size = "normal",
}: {
  emoji: string;
  label?: string;
  style: React.CSSProperties;
  size?: "small" | "normal" | "large";
}) => {
  const boxSize =
    size === "small" ? "w-16 h-16" : size === "large" ? "w-24 h-24" : "w-20 h-20";
  const emojiSize =
    size === "small" ? "text-3xl" : size === "large" ? "text-6xl" : "text-5xl";

  return (
    <motion.div
      initial={{ scale: 0.85, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.06 }}
      className="absolute flex flex-col items-center justify-center select-none"
      style={style}
    >
      <div
        className={`${boxSize} flex items-center justify-center rounded-3xl border-2 border-border-color bg-surface-color/80 shadow`}
      >
        <div className={`${emojiSize} leading-none`}>{emoji}</div>
      </div>

      {label && (
        <div className="mt-2 px-3 py-1 rounded-full bg-surface-color border-2 border-border-color text-[11px] font-black shadow whitespace-nowrap">
          {label}
        </div>
      )}
    </motion.div>
  );
};

  const Scene = ({ children }: { children: React.ReactNode }) => (
  <div className="relative h-[430px] md:h-[470px] rounded-3xl bg-surface-color border-2 border-border-color overflow-hidden shadow-inner px-6 py-6">
    <div
      className="absolute inset-0 opacity-10"
      style={{
        backgroundImage:
          "radial-gradient(circle, var(--primary-color) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
      }}
    />
    <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
    {children}
  </div>
  );

  const renderBasicScene = () => {
    if (basic === 'arriba-abajo') {
      return (
        <>
          <Scene>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-8">
              <Thing emoji="🎈" label="arriba" size="small" style={{ position: 'relative', left: 0, top: 0, transform: 'none' }} />

              <div className="w-28 h-28 rounded-3xl bg-surface-color border-4 border-border-color shadow flex flex-col items-center justify-center">
                <div className="text-5xl leading-none">📦</div>
                <div className="text-[10px] font-black mt-1 opacity-70">objeto</div>
              </div>

              <Thing emoji="⚽" label="abajo" size="small" style={{ position: 'relative', left: 0, top: 0, transform: 'none' }} />
            </div>
          </Scene>

          <div className="lab-formula text-center text-base">
            El globo está ARRIBA de la caja. La pelota está ABAJO de la caja.
          </div>
        </>
      );
    }

    if (basic === 'encima-debajo') {
      return (
        <>
          <Scene>
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-8">
              <Thing emoji="🐱" label="encima" size="small" style={{ position: 'relative', left: 0, top: 0, transform: 'none' }} />

              <div className="w-56 h-24 rounded-3xl bg-amber-900/20 border-4 border-amber-700 shadow flex flex-col items-center justify-center">
                <div className="text-4xl leading-none">🪑</div>
                <div className="text-[11px] font-black mt-1 opacity-80">mesa</div>
              </div>

              <Thing emoji="🐶" label="debajo" size="small" style={{ position: 'relative', left: 0, top: 0, transform: 'none' }} />
            </div>
          </Scene>

          <div className="lab-formula text-center text-base">
            El gato está ENCIMA de la mesa. El perrito está DEBAJO.
          </div>
        </>
      );
    }

    if (basic === 'delante-detras') {
      return (
        <>
          <Scene>
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              <div className="absolute left-1/2 top-12 -translate-x-1/2 text-xs font-black opacity-60 uppercase">
                Fondo / detrás
              </div>

              <div
                className="absolute left-1/2 bottom-0 -translate-x-1/2 w-[75%] h-[58%] bg-[var(--primary-color)]/10 border-t-2 border-[var(--primary-color)]/30"
                style={{ clipPath: 'polygon(42% 0, 58% 0, 100% 100%, 0 100%)' }}
              />

              <Thing
                emoji="🌳"
                label="detrás"
                size="small"
                style={posStyle(50, 24, { opacity: 0.65, transform: 'translate(-50%, -50%) scale(0.75)' })}
              />

              <Thing
                emoji="🏠"
                label="referencia"
                style={posStyle(50, 50)}
              />

              <Thing
                emoji="🐰"
                label="delante"
                size="large"
                style={posStyle(50, 72, { transform: 'translate(-50%, -50%) scale(1.05)' })}
              />

              <div className="absolute left-1/2 bottom-6 -translate-x-1/2 text-xs font-black opacity-60 uppercase">
                Cerca / delante
              </div>
            </div>
          </Scene>

          <div className="lab-formula text-center text-base">
            El árbol se ve más pequeño porque está DETRÁS. El conejo se ve más grande porque está DELANTE.
          </div>
        </>
      );
    }

    if (basic === 'cerca-lejos') {
      return (
        <>
          <Scene>
            <Thing emoji="🏠" label="casa" style={posStyle(50, 55)} />
            <Thing emoji="🐰" label="cerca" style={posStyle(35, 62)} />
            <Thing emoji="🚗" label="lejos" style={posStyle(86, 23)} />
          </Scene>
          <div className="lab-formula text-center text-base">
            El conejo está CERCA de la casa. El auto está LEJOS.
          </div>
        </>
      );
    }

    if (basic === 'dentro-fuera') {
      return (
      <>
      <Scene>
        <div
          className="absolute left-1/2 top-1/2 w-56 h-44 -translate-x-1/2 -translate-y-1/2 rounded-3xl border-[10px] border-amber-700 bg-amber-300/20 shadow-inner"
        >
          <div className="absolute inset-4 rounded-2xl bg-amber-200/20 border border-dashed border-amber-700/40" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <Thing emoji="🐱" label="dentro" style={{ position: "relative", left: 0, top: 0 }} />
          </div>
        </div>

        <Thing emoji="🐶" label="fuera" style={posStyle(82, 55)} />
      </Scene>

      <div className="lab-formula text-center text-base">
        El gato está DENTRO de la caja. El perrito está FUERA.
      </div>
    </>
  );
}

    if (basic === 'lado') {
      return (
        <>
          <Scene>
            <Thing emoji="🍎" label="al lado" style={posStyle(32, 55)} />
            <Thing emoji="📦" label="caja" style={posStyle(50, 55)} />
            <Thing emoji="🍐" label="al lado" style={posStyle(68, 55)} />
          </Scene>
          <div className="lab-formula text-center text-base">
            Las frutas están AL LADO de la caja.
          </div>
        </>
      );
    }

    if (basic === 'entre') {
      return (
        <>
          <Scene>
            <Thing emoji="🌳" label="objeto 1" style={posStyle(28, 55)} />
            <Thing emoji="⭐" label="entre" style={posStyle(50, 55)} />
            <Thing emoji="🌳" label="objeto 2" style={posStyle(72, 55)} />
          </Scene>
          <div className="lab-formula text-center text-base">
            La estrella está ENTRE los dos árboles.
          </div>
        </>
      );
    }

    if (basic === 'izquierda-derecha') {
      return (
        <>
          <Scene>
            <Thing emoji="👈" label="izquierda" style={posStyle(25, 55)} />
            <Thing emoji="🧍" label="cuerpo" style={posStyle(50, 55)} />
            <Thing emoji="👉" label="derecha" style={posStyle(75, 55)} />
          </Scene>
          <div className="lab-formula text-center text-base">
            La izquierda y la derecha se aprenden usando tu propio cuerpo.
          </div>
        </>
      );
    }

    if (basic === 'enfrente-detras') {
      return (
        <>
          <Scene>
            <Thing emoji="🎒" label="detrás" style={posStyle(50, 25, { opacity: 0.78 })} />
            <Thing emoji="🚪" label="puerta" style={posStyle(50, 50)} />
            <Thing emoji="🧒" label="enfrente" style={posStyle(50, 77)} />
          </Scene>
          <div className="lab-formula text-center text-base">
            La niña está ENFRENTE de la puerta. La mochila está DETRÁS.
          </div>
        </>
      );
    }

    if (basic === 'fila') {
      const row = ['🐶', '🐱', '🐰', '🦊', '🐼'];
      return (
        <>
          <div className="lab-container">
            <div className="flex items-end justify-center gap-3 flex-wrap py-6">
              {row.map((animal, i) => (
                <div
                  key={i}
                  className={`p-4 rounded-3xl border-2 text-center shadow ${
                    i === 0 || i === row.length - 1
                      ? 'bg-[var(--primary-color)] text-white border-[var(--primary-color)] scale-105'
                      : 'bg-surface-color border-border-color'
                  }`}
                >
                  <div className="text-5xl">{animal}</div>
                  <div className="text-xs font-black mt-2">
                    {i === 0 ? 'PRIMERO' : i === row.length - 1 ? 'ÚLTIMO' : `${i + 1}°`}
                  </div>
                </div>
              ))}
            </div>
            <div className="lab-formula text-center text-base">
              El perrito es el PRIMERO. El panda es el ÚLTIMO.
            </div>
          </div>
        </>
      );
    }

    if (basic === 'avanzar') {
      return (
        <>
          <div className="lab-container space-y-4">
            <div className="flex justify-center gap-3">
              <button onClick={() => setStep(Math.max(0, step - 1))} className="math-btn">
                ⬅️ Atrás
              </button>
              <button onClick={() => setStep(Math.min(4, step + 1))} className="math-btn">
                Adelante ➡️
              </button>
            </div>
            <div className="grid grid-cols-5 gap-2 max-w-xl mx-auto">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-24 rounded-3xl border-2 flex items-center justify-center text-5xl shadow-inner ${
                    step === i ? 'bg-[var(--primary-color)]/20 border-[var(--primary-color)]' : 'bg-surface-color border-border-color'
                  }`}
                >
                  {step === i ? '🧒' : '•'}
                </div>
              ))}
            </div>
            <div className="lab-formula text-center text-base">
              Avanzar es moverse hacia adelante. Retroceder es moverse hacia atrás.
            </div>
          </div>
        </>
      );
    }

    return (
      <>
        <div className="lab-container space-y-4">
          <div className="flex justify-center gap-3">
            <button onClick={() => setTurn('izquierda')} className={`math-btn ${turn === 'izquierda' ? 'scale-105' : ''}`}>
              ↩️ Izquierda
            </button>
            <button onClick={() => setTurn('derecha')} className={`math-btn ${turn === 'derecha' ? 'scale-105' : ''}`}>
              Derecha ↪️
            </button>
          </div>
          <div className="flex flex-col items-center justify-center p-8 bg-surface-color rounded-3xl border-2 border-border-color shadow">
            <motion.div
              animate={{ rotate: turn === 'izquierda' ? -90 : 90 }}
              transition={{ type: 'spring', stiffness: 160, damping: 12 }}
              className="text-8xl"
            >
              🧒
            </motion.div>
            <div className="mt-4 text-xl font-black" style={{ color: 'var(--primary-color)' }}>
              Giró a la {turn}
            </div>
          </div>
          <div className="lab-formula text-center text-base">
            Girar es cambiar hacia dónde mira tu cuerpo.
          </div>
        </div>
      </>
    );
  };

  const nextInstruction = () => {
    const idx = instructions.findIndex(i => i.id === instruction);
    const next = instructions[(idx + 1) % instructions.length].id;
    setInstruction(next);
    setInstructionAnswer(null);
  };

  const currentInstruction = instructions.find(i => i.id === instruction)!;

  const renderInstructions = () => {
    const ok = instructionAnswer === instruction;

    return (
      <div className="lab-container space-y-4">
        <div className="p-6 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
          <div className="text-7xl mb-3">{currentInstruction.emoji}</div>
          <div className="text-xs font-black uppercase opacity-70 mb-2">Instrucción</div>
          <div className="text-2xl font-black" style={{ color: 'var(--primary-color)' }}>
            {currentInstruction.text}
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {instructions.map(i => (
            <button
              key={i.id}
              onClick={() => setInstructionAnswer(i.id)}
              className={`p-4 rounded-3xl border-2 font-black transition-all shadow ${
                instructionAnswer === i.id
                  ? i.id === instruction
                    ? 'bg-emerald-500 text-white border-emerald-500 scale-105'
                    : 'bg-red-500 text-white border-red-500'
                  : 'bg-surface-color border-border-color hover:scale-105'
              }`}
            >
              <div className="text-4xl mb-1">{i.emoji}</div>
              {i.label}
            </button>
          ))}
        </div>

        {instructionAnswer && (
          <div className={`p-4 rounded-3xl text-center font-black ${ok ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}>
            {ok ? '🎉 ¡Correcto! Seguiste la posición.' : '❌ Casi. Observa la palabra clave e inténtalo otra vez.'}
          </div>
        )}

        <button onClick={nextInstruction} className="math-btn w-full">
          Siguiente instrucción
        </button>
      </div>
    );
  };

  const renderIdentifySceneVisual = () => {
    if (identify === 'dentro') {
  return (
    <Scene>
      <div
        className="absolute left-1/2 top-1/2 w-56 h-44 -translate-x-1/2 -translate-y-1/2 rounded-3xl border-[10px] border-amber-700 bg-amber-300/20 shadow-inner"
      >
        <div className="absolute inset-4 rounded-2xl bg-amber-200/20 border border-dashed border-amber-700/40" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <Thing emoji="🐱" style={{ position: "relative", left: 0, top: 0 }} />
        </div>
      </div>
    </Scene>
  );
}

    if (identify === 'encima') {
      return (
        <Scene>
          <Thing emoji="🐱" style={posStyle(50, 28)} />
          <Thing emoji="🪑" style={posStyle(50, 55)} />
        </Scene>
      );
    }

    if (identify === 'debajo') {
      return (
        <Scene>
          <Thing emoji="🪑" style={posStyle(50, 44)} />
          <Thing emoji="🐶" style={posStyle(50, 74)} />
        </Scene>
      );
    }

    if (identify === 'entre') {
      return (
        <Scene>
          <Thing emoji="🌳" style={posStyle(28, 55)} />
          <Thing emoji="⭐" style={posStyle(50, 55)} />
          <Thing emoji="🌳" style={posStyle(72, 55)} />
        </Scene>
      );
    }

    if (identify === 'cerca') {
      return (
        <Scene>
          <Thing emoji="🏠" style={posStyle(52, 55)} />
          <Thing emoji="🐰" style={posStyle(37, 60)} />
        </Scene>
      );
    }

    if (identify === 'lejos') {
      return (
        <Scene>
          <Thing emoji="🏠" style={posStyle(25, 60)} />
          <Thing emoji="🚗" style={posStyle(82, 25)} />
        </Scene>
      );
    }

    return (
      <Scene>
        <Thing emoji="📦" style={posStyle(50, 55)} />
        <Thing emoji="🍎" style={posStyle(70, 55)} />
      </Scene>
    );
  };

  const renderIdentify = () => {
    const data = identifyScenes[identify];
    const ok = identifyAnswer === data.answer;
    const options: IdentifyKey[] = ['dentro', 'encima', 'debajo', 'entre', 'cerca', 'lejos', 'lado'];

    return (
      <div className="lab-container space-y-4">
        <div className="grid gap-4 md:grid-cols-[1.2fr_1fr] items-center">
          {renderIdentifySceneVisual()}
          <div className="space-y-3">
            <div className="p-4 rounded-3xl bg-surface-color border-2 border-border-color shadow">
              <div className="text-xs font-black uppercase opacity-70">Pregunta</div>
              <div className="text-xl font-black mt-1">{data.question}</div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              {options.map(o => (
                <button
                  key={o}
                  onClick={() => setIdentifyAnswer(o)}
                  className={`p-3 rounded-2xl border-2 font-black text-xs capitalize transition-all ${
                    identifyAnswer === o
                      ? o === data.answer
                        ? 'bg-emerald-500 text-white border-emerald-500'
                        : 'bg-red-500 text-white border-red-500'
                      : 'bg-surface-color border-border-color hover:scale-105'
                  }`}
                >
                  {o === 'lado' ? 'al lado' : o}
                </button>
              ))}
            </div>

            {identifyAnswer && (
              <div className={`p-3 rounded-2xl font-black text-center text-sm ${ok ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'}`}>
                {ok ? `✅ ${data.sentence}` : '❌ Mira otra vez la posición del objeto.'}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 justify-center">
          {(Object.keys(identifyScenes) as IdentifyKey[]).map(k => (
            <button
              key={k}
              onClick={() => {
                setIdentify(k);
                setIdentifyAnswer(null);
              }}
              className={`px-4 py-2 rounded-2xl font-black text-xs transition-all ${
                identify === k ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-slate-200 dark:bg-slate-700'
              }`}
            >
              {identifyScenes[k].icon} {k === 'lado' ? 'al lado' : k}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const moveBear = (dr: number, dc: number) => {
    setBear(p => ({
      r: Math.min(3, Math.max(0, p.r + dr)),
      c: Math.min(3, Math.max(0, p.c + dc)),
    }));
  };

  const renderCroquis = () => {
    const objects = [
      { r: 0, c: 1, icon: "\u{2B1B}", name: "pizarrón" },
      { r: 1, c: 3, icon: "\u{1F4DA}", name: "librero" },
      { r: 2, c: 2, icon: "\u{1FA91}", name: "silla" },
      { r: 3, c: 0, icon: "\u{1F6AA}", name: "puerta" },
    ];

    const isSame = (r: number, c: number) => bear.r === r && bear.c === c;
    const distance = (r: number, c: number) => Math.abs(bear.r - r) + Math.abs(bear.c - c);
    const near = (r: number, c: number) => distance(r, c) === 1;

    const getItem = (r: number, c: number) => {
      if (isSame(r, c)) return "\u{1F9F8}";
      const obj = objects.find(o => o.r === r && o.c === c);
      return obj ? obj.icon : "";
    };

    const describe = () => {
      const colLetter = String.fromCharCode(65 + bear.c);
      const rowNumber = bear.r + 1;
      const refs: string[] = [];

      if (bear.r === 0) refs.push("arriba del aula");
      if (bear.r === 3) refs.push("abajo del aula");
      if (bear.c === 0) refs.push("a la izquierda");
      if (bear.c === 3) refs.push("a la derecha");

      objects.forEach(obj => {
        const d = distance(obj.r, obj.c);

        if (d === 0) {
          refs.push("en " + obj.name);
        } else if (d === 1) {
          refs.push("cerca de " + obj.name);
        } else if (d === 2) {
          refs.push("a dos pasos de " + obj.name);
        }
      });

      const extra = refs.length ? " Está " + refs.join(", ") + "." : "";
      return "El osito está en " + colLetter + rowNumber + "." + extra;
    };

    const targetTasks = [
      {
        text: "Lleva el osito cerca de la puerta.",
        ok: () => near(3, 0),
        hint: "La puerta está en A4. Cerca puede ser A3 o B4.",
      },
      {
        text: "Mueve el osito arriba del aula.",
        ok: () => bear.r === 0,
        hint: "Arriba es la fila 1.",
      },
      {
        text: "Coloca el osito junto al librero.",
        ok: () => near(1, 3),
        hint: "El librero está en D2. Junto significa una casilla pegada.",
      },
      {
        text: "Lleva el osito a la izquierda del aula.",
        ok: () => bear.c === 0,
        hint: "La izquierda es la columna A.",
      },
      {
        text: "Pon el osito sobre la silla.",
        ok: () => isSame(2, 2),
        hint: "La silla está en C3.",
      },
      {
        text: "Pon el osito debajo del pizarrón.",
        ok: () => isSame(1, 1),
        hint: "El pizarrón está en B1. Debajo es B2.",
      },
    ];

    const task = targetTasks[croquisTask % targetTasks.length];
    const taskDone = task.ok();

    const nextTask = () => {
      setCroquisTask((n) => (n + 1) % targetTasks.length);
    };

    return (
      <div className="lab-container space-y-4">
        <div className="grid gap-4 md:grid-cols-[1fr_280px] items-start">
          <div className="p-4 bg-surface-color border-2 border-border-color rounded-3xl shadow">
            <div className="grid grid-cols-4 gap-2">
              {Array.from({ length: 16 }).map((_, i) => {
                const r = Math.floor(i / 4);
                const c = i % 4;
                const selected = isSame(r, c);
                const cellObject = objects.find(o => o.r === r && o.c === c);

                return (
                  <button
                    key={i}
                    onClick={() => setBear({ r, c })}
                    className={
                      selected
                        ? "h-24 rounded-2xl border-4 border-[var(--primary-color)] bg-[var(--primary-color)]/15 flex flex-col items-center justify-center font-black text-xs relative shadow scale-[1.02]"
                        : "h-24 rounded-2xl border-2 border-border-color bg-black/5 flex flex-col items-center justify-center font-black text-xs relative hover:scale-[1.02] transition-all"
                    }
                    title={cellObject ? cellObject.name : "casilla vacía"}
                  >
                    <span className="absolute top-1 left-2 opacity-50 text-[10px] font-black">
                      {String.fromCharCode(65 + c)}
                      {r + 1}
                    </span>

                    <div className="text-4xl leading-none">{getItem(r, c)}</div>

                    {cellObject && !selected && (
                      <span className="absolute bottom-1 text-[9px] opacity-70 font-black">
                        {cellObject.name}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4 text-[10px] font-black opacity-80">
              <div>{"\u{2B1B}"} Pizarrón B1</div>
              <div>{"\u{1F4DA}"} Librero D2</div>
              <div>{"\u{1FA91}"} Silla C3</div>
              <div>{"\u{1F6AA}"} Puerta A4</div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center">
              <div className="text-xs font-black uppercase opacity-70">Croquis simple</div>
              <div className="text-5xl my-2">{"\u{1F9F8}"}</div>
              <div className="font-black text-sm">{describe()}</div>
            </div>

            <div
              className={
                taskDone
                  ? "p-4 rounded-3xl bg-emerald-500/15 border-2 border-emerald-500 shadow"
                  : "p-4 rounded-3xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30 shadow"
              }
            >
              <div className="text-xs font-black uppercase opacity-70 mb-1">Reto</div>
              <div className="font-black text-sm">{task.text}</div>
              <div className="text-xs font-bold opacity-70 mt-2">Pista: {task.hint}</div>

              <div className={taskDone ? "mt-3 p-2 rounded-2xl bg-emerald-500 text-white text-center font-black text-xs" : "mt-3 p-2 rounded-2xl bg-amber-500/20 text-center font-black text-xs"}>
                {taskDone ? "\u{2705} ¡Correcto! Llegaste al lugar indicado." : "\u{1F9ED} Mueve el osito hasta cumplir el reto."}
              </div>

              <button onClick={nextTask} className="math-btn w-full mt-3 text-xs py-2">
                Nuevo reto
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div />
              <button onClick={() => moveBear(-1, 0)} className="p-3 rounded-xl bg-slate-200 dark:bg-slate-700 font-black">{"\u{25B2}"}</button>
              <div />

              <button onClick={() => moveBear(0, -1)} className="p-3 rounded-xl bg-slate-200 dark:bg-slate-700 font-black">{"\u{25C0}"}</button>
              <button onClick={() => setBear({ r: 2, c: 1 })} className="p-3 rounded-xl bg-[var(--primary-color)] text-white font-black">{"\u{25CF}"}</button>
              <button onClick={() => moveBear(0, 1)} className="p-3 rounded-xl bg-slate-200 dark:bg-slate-700 font-black">{"\u{25B6}"}</button>

              <div />
              <button onClick={() => moveBear(1, 0)} className="p-3 rounded-xl bg-slate-200 dark:bg-slate-700 font-black">{"\u{25BC}"}</button>
              <div />
            </div>

            <div className="p-3 rounded-2xl bg-[var(--primary-color)]/10 border-2 border-[var(--primary-color)]/30 text-xs font-bold">
              También puedes tocar una casilla del croquis para mover el osito directamente.
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <TopicCard
      icon="🌸"
      title="Nociones Espaciales y Orientación"
      color="#f472b6"
      desc="Aprende posiciones, movimientos, lateralidad y ubicación en un croquis simple. Todo en un solo tema grande con mini-actividades."
    >
      <div className="lab-container space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {modes.map(m => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`p-3 rounded-2xl font-black text-xs transition-all ${
                mode === m.id ? 'bg-[var(--primary-color)] text-white shadow scale-105' : 'bg-slate-200 dark:bg-slate-700 hover:scale-105'
              }`}
            >
              <span className="text-xl block mb-1">{m.icon}</span>
              {m.label}
            </button>
          ))}
        </div>

        {mode === 'posiciones' && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
              {basicOptions.map(o => (
                <button
                  key={o.id}
                  onClick={() => setBasic(o.id)}
                  className={`p-3 rounded-2xl font-black text-[11px] transition-all ${
                    basic === o.id ? 'bg-pink-500 text-white shadow scale-105' : 'bg-surface-color border-2 border-border-color hover:scale-105'
                  }`}
                >
                  <span className="text-xl block">{o.icon}</span>
                  {o.label}
                </button>
              ))}
            </div>
            {renderBasicScene()}
          </>
        )}

        {mode === 'instrucciones' && renderInstructions()}
        {mode === 'identificar' && renderIdentify()}
        {mode === 'croquis' && renderCroquis()}
      </div>
    </TopicCard>
  );
};

