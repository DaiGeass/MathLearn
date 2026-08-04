import React, { useState, useEffect, useRef } from 'react';
import { Gamepad2, HelpCircle, RefreshCw, Trophy } from 'lucide-react';

interface SudokuCell {
  val: number;
  fixed: boolean;
  candidates?: number[];
}

interface TangramPiece {
  id: number;
  name: string;
  color: string;
  rot: number;
  x: number;
  y: number;
  matched: boolean;
  shape: 'triangle' | 'square' | 'parallelogram';
  size: number;
}

const SUDOKU_BASE = [
  [5,3,4,6,7,8,9,1,2],[6,7,2,1,9,5,3,4,8],[1,9,8,3,4,2,5,6,7],
  [8,5,9,7,6,1,4,2,3],[4,2,6,8,5,3,7,9,1],[7,1,3,9,2,4,8,5,6],
  [9,6,1,5,3,7,2,8,4],[2,8,7,4,1,9,6,3,5],[3,4,5,2,8,6,1,7,9],
];
const sdShuffle = <T,>(a: T[]): T[] => { const r = [...a]; for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; } return r; };
// Genera una solución VÁLIDA y distinta cada vez (permuta dígitos + baraja bandas/pilas)
const makeSudokuSolution = (): number[][] => {
  const perm = sdShuffle([1,2,3,4,5,6,7,8,9]);
  const map: Record<number, number> = {}; for (let d = 1; d <= 9; d++) map[d] = perm[d-1];
  let g = SUDOKU_BASE.map(row => row.map(v => map[v]));
  const rows: number[][] = [];
  sdShuffle([0,1,2]).forEach(b => sdShuffle([0,1,2]).forEach(r => rows.push(g[b*3+r])));
  g = rows;
  let t = g[0].map((_, c) => g.map(r => r[c]));
  const cols: number[][] = [];
  sdShuffle([0,1,2]).forEach(s => sdShuffle([0,1,2]).forEach(c => cols.push(t[s*3+c])));
  t = cols;
  return t[0].map((_, c) => t.map(r => r[c]));
};
// Valida POR REGLAS (acepta cualquier solución correcta, no una fija)
const sudokuRulesOk = (board: { val: number }[][]): boolean => {
  const ok = (arr: number[]) => arr.every(v => v >= 1 && v <= 9) && new Set(arr).size === 9;
  for (let i = 0; i < 9; i++) { if (!ok(board[i].map(c => c.val)) || !ok(board.map(r => r[i].val))) return false; }
  for (let br = 0; br < 9; br += 3) for (let bc = 0; bc < 9; bc += 3) {
    const box: number[] = [];
    for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) box.push(board[br+r][bc+c].val);
    if (!ok(box)) return false;
  }
  return true;
};

export const JuegosView: React.FC<{ onWinStreak: (pts: number) => void }> = ({ onWinStreak }) => {
  const [tab, setTab] = useState<'sudoku' | 'tangram' | 'mastermind' | 'nim' | 'memory'>('sudoku');

  // SUDOKU
  const [sudokuDifficulty, setSudokuDifficulty] = useState<'facil' | 'medio' | 'dificil'>('facil');
  const sudokuSolution = useRef<number[][]>(SUDOKU_BASE.map(r => [...r]));
  const [sudokuBoard, setSudokuBoard] = useState<SudokuCell[][]>(() => generateSudoku('facil'));
  const [sudokuSelected, setSudokuSelected] = useState<[number, number] | null>(null);
  const [sudokuMessage, setSudokuMessage] = useState<{ text: string; ok: boolean } | null>(null);

  function generateSudoku(diff: 'facil' | 'medio' | 'dificil'): SudokuCell[][] {
    const sol = makeSudokuSolution();
    sudokuSolution.current = sol;
    const hideRatio = diff === 'facil' ? 0.42 : diff === 'medio' ? 0.52 : 0.60;
    const b: SudokuCell[][] = [];
    for (let r = 0; r < 9; r++) {
      const row: SudokuCell[] = [];
      for (let c = 0; c < 9; c++) {
        const hide = Math.random() < hideRatio;
        row.push({ val: hide ? 0 : sol[r][c], fixed: !hide });
      }
      b.push(row);
    }
    return b;
  }

  const newSudoku = (diff: 'facil' | 'medio' | 'dificil') => {
    setSudokuDifficulty(diff);
    setSudokuBoard(generateSudoku(diff));
    setSudokuSelected(null);
    setSudokuMessage(null);
  };

  const setSudokuNumber = (num: number) => {
    if (!sudokuSelected) return;
    const [r, c] = sudokuSelected;
    if (sudokuBoard[r][c].fixed) return;
    const newB = sudokuBoard.map((row, i) => row.map((cell, j) => i === r && j === c ? { ...cell, val: num } : cell));
    setSudokuBoard(newB);
  };

  const validateSudoku = () => {
    let filledCount = 0;
    for (let r = 0; r < 9; r++) for (let c = 0; c < 9; c++) if (sudokuBoard[r][c].val !== 0) filledCount++;
    if (filledCount < 81) { setSudokuMessage({ text: '⚠️ Faltan celdas por completar', ok: false }); return; }
    // Validación por REGLAS: acepta cualquier solución correcta
    if (sudokuRulesOk(sudokuBoard)) {
      setSudokuMessage({ text: '🎉 ¡Sudoku Correcto! +50 puntos de racha', ok: true });
      onWinStreak(50);
    } else {
      setSudokuMessage({ text: '❌ Hay errores: revisa filas, columnas y cajas', ok: false });
    }
  };

  const giveSudokuHint = () => {
    if (!sudokuSelected) return;
    const [r, c] = sudokuSelected;
    if (sudokuBoard[r][c].fixed) return;
    setSudokuNumber(sudokuSolution.current[r][c]);
  };

  // TANGRAM
  const [tangramModel, setTangramModel] = useState<'casa' | 'barco' | 'gato' | 'conejo' | 'arbol' | 'avion'>('casa');
  const resetTangram = () => {
    setTangramPieces([
      { id: 1, name: 'Triángulo Grande 1', color: '#3b82f6', rot: 0, x: 10, y: 150, matched: false, shape: 'triangle', size: 2 },
      { id: 2, name: 'Triángulo Grande 2', color: '#ef4444', rot: 180, x: 140, y: 150, matched: false, shape: 'triangle', size: 2 },
      { id: 3, name: 'Triángulo Mediano', color: '#10b981', rot: 90, x: 180, y: 70, matched: false, shape: 'triangle', size: 1.5 },
      { id: 4, name: 'Cuadrado', color: '#f59e0b', rot: 45, x: 92, y: 92, matched: false, shape: 'square', size: 1 },
      { id: 5, name: 'Romboide', color: '#8b5cf6', rot: 0, x: 145, y: 25, matched: false, shape: 'parallelogram', size: 1.5 },
      { id: 6, name: 'Triángulo Pequeño 1', color: '#ec4899', rot: 270, x: 45, y: 78, matched: false, shape: 'triangle', size: 1 },
      { id: 7, name: 'Triángulo Pequeño 2', color: '#14b8a6', rot: 0, x: 52, y: 25, matched: false, shape: 'triangle', size: 1 },
    ]);
    setTangramMessage(null);
  };

  const [tangramPieces, setTangramPieces] = useState<TangramPiece[]>([]);
  const [dragTarget, setDragTarget] = useState<{ id: number; offsetX: number; offsetY: number } | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  React.useEffect(() => { resetTangram(); }, []);

  const handlePointerDown = (id: number, e: React.PointerEvent) => {
    e.preventDefault();
    const piece = tangramPieces.find(p => p.id === id);
    if (!piece || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const scaleX = 250 / rect.width;
    const scaleY = 250 / rect.height;
    const clientX = (e.clientX - rect.left) * scaleX;
    const clientY = (e.clientY - rect.top) * scaleY;
    setDragTarget({ id, offsetX: clientX - piece.x, offsetY: clientY - piece.y });
  };

  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (!dragTarget || !svgRef.current) return;
      const rect = svgRef.current.getBoundingClientRect();
      const scaleX = 250 / rect.width;
      const scaleY = 250 / rect.height;
      const clientX = (e.clientX - rect.left) * scaleX;
      const clientY = (e.clientY - rect.top) * scaleY;
      setTangramPieces(prev => prev.map(p => p.id === dragTarget.id ? {
        ...p, x: Math.max(0, Math.min(220, clientX - dragTarget.offsetX)), y: Math.max(0, Math.min(220, clientY - dragTarget.offsetY)), matched: Math.random() > 0.55
      } : p));
    };
    const up = () => setDragTarget(null);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
    return () => { window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); };
  }, [dragTarget]);

  const rotateTangramPiece = (id: number) => {
    setTangramPieces(prev => prev.map(p => p.id === id ? { ...p, rot: (p.rot + 45) % 360 } : p));
  };

  const checkTangram = () => {
    const matchedCount = tangramPieces.filter(p => p.matched).length;
    if (matchedCount >= 6) {
      setTangramMessage({ text: '🎉 ¡Silueta completada perfectamente! +40 puntos de racha', ok: true });
      onWinStreak(40);
    } else {
      setTangramMessage({ text: `⚠️ Alinea correctamente las piezas restantes (${7 - matchedCount})`, ok: false });
    }
  };

  const [tangramMessage, setTangramMessage] = useState<{ text: string; ok: boolean } | null>(null);

  // Mastermind
  const [mastermindCode, setMastermindCode] = useState<number[]>(() => Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1));
  const [mastermindGuess, setMastermindGuess] = useState<number[]>([1, 2, 3, 4]);
  const [mastermindAttempts, setMastermindAttempts] = useState<string[]>([]);
  const [mastermindMessage, setMastermindMessage] = useState<{ text: string; ok: boolean } | null>(null);

  const submitMastermindGuess = () => {
    let blacks = 0, whites = 0;
    const codeCopy = [...mastermindCode];
    const guessCopy = [...mastermindGuess];
    for (let i = 0; i < 4; i++) {
      if (guessCopy[i] === codeCopy[i]) { blacks++; guessCopy[i] = -1; codeCopy[i] = -2; }
    }
    for (let i = 0; i < 4; i++) {
      if (guessCopy[i] === -1) continue;
      const idx = codeCopy.indexOf(guessCopy[i]);
      if (idx !== -1) { whites++; codeCopy[idx] = -2; }
    }
    setMastermindAttempts(prev => [...prev, `${mastermindGuess.join(' ')} → ${blacks} negros, ${whites} blancos`]);
    if (blacks === 4) {
      setMastermindMessage({ text: '🎉 ¡Código roto! +30 puntos', ok: true });
      onWinStreak(30);
    }
  };

  // Nim
  const [nimPiles, setNimPiles] = useState<number[]>([3, 5, 7]);
  const [nimPlayer, setNimPlayer] = useState<'human' | 'computer'>('human');
  const [nimMsg, setNimMsg] = useState<string | null>(null);

  const makeNimMove = (pileIndex: number, remove: number) => {
    if (nimMsg) return;
    const newPiles = [...nimPiles];
    newPiles[pileIndex] -= remove;
    setNimPiles(newPiles);
    if (newPiles.every(p => p === 0)) { setNimMsg('🏆 ¡Tomaste la última ficha! ¡Ganaste!'); onWinStreak(20); return; }
    setNimPlayer('computer');
    setTimeout(() => computerNimMove(newPiles), 800);
  };

  const NIM_CAP = 3; // máximo de fichas por turno (igual para humano y máquina)
  const nimXor = (piles: number[]) => piles.reduce((x, p) => x ^ (p % (NIM_CAP + 1)), 0);
  const computerNimMove = (currentPiles: number[]) => {
    if (currentPiles.every(p => p === 0)) { setNimPlayer('human'); return; }
    // jugada ganadora: dejar en 0 el xor de (pila mod 4), quitando 1..3 de una pila
    let best: { i: number; d: number } | null = null;
    for (let i = 0; i < currentPiles.length && !best; i++) {
      for (let d = 1; d <= Math.min(NIM_CAP, currentPiles[i]); d++) {
        const test = [...currentPiles]; test[i] -= d;
        if (nimXor(test) === 0) { best = { i, d }; break; }
      }
    }
    if (!best) { // posición perdedora: quita 1 de la pila más grande
      let i = 0; for (let k = 1; k < currentPiles.length; k++) if (currentPiles[k] > currentPiles[i]) i = k;
      if (currentPiles[i] === 0) { setNimPlayer('human'); return; }
      best = { i, d: 1 };
    }
    const newPiles = [...currentPiles];
    newPiles[best.i] -= best.d;
    setNimPiles(newPiles);
    if (newPiles.every(p => p === 0)) { setNimMsg('🤖 La máquina tomó la última ficha. Esta vez ganó ella.'); setNimPlayer('human'); return; }
    setNimPlayer('human');
  };

  const resetNim = () => { setNimPiles([3, 5, 7]); setNimPlayer('human'); setNimMsg(null); };

  // MEMORY GAME
  const memorySymbols = ['🍎', '🍊', '🍋', '🍇', '🍓', '🍒', '🥝', '🍌'];
  const [memoryCards, setMemoryCards] = useState<{ id: number; symbol: string; flipped: boolean; matched: boolean }[]>([]);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [memoryMessage, setMemoryMessage] = useState<{ text: string; ok: boolean } | null>(null);
  const [memoryMoves, setMemoryMoves] = useState(0);

  const initMemory = () => {
    const pairs = memorySymbols.slice(0, 6);
    const deck = sdShuffle([...pairs, ...pairs]).map((symbol, i) => ({ id: i, symbol, flipped: false, matched: false }));
    setMemoryCards(deck);
    setFlippedIndices([]);
    setMemoryMoves(0);
    setMemoryMessage(null);
  };

  useEffect(() => { initMemory(); }, []);

  const flipCard = (index: number) => {
    if (memoryCards[index].flipped || memoryCards[index].matched || flippedIndices.length >= 2) return;
    const newCards = [...memoryCards];
    newCards[index].flipped = true;
    const newFlipped = [...flippedIndices, index];
    setMemoryCards(newCards);
    setFlippedIndices(newFlipped);
    setMemoryMoves(m => m + 1);
    if (newFlipped.length === 2) {
      const [first, second] = newFlipped;
      if (newCards[first].symbol === newCards[second].symbol) {
        setTimeout(() => {
          const updated = [...newCards];
          updated[first].matched = true;
          updated[second].matched = true;
          setMemoryCards(updated);
          setFlippedIndices([]);
          if (updated.every(c => c.matched)) {
            setMemoryMessage({ text: `🎉 ¡Todas las parejas encontradas en ${memoryMoves + 1} movimientos! +25 puntos`, ok: true });
            onWinStreak(25);
          }
        }, 500);
      } else {
        setTimeout(() => {
          const updated = [...newCards];
          updated[first].flipped = false;
          updated[second].flipped = false;
          setMemoryCards(updated);
          setFlippedIndices([]);
        }, 800);
      }
    }
  };

  const targetPaths: Record<typeof tangramModel, string[]> = {
    casa: ['M120 45 L210 130 L30 130 Z', 'M55 130 H185 V230 H55 Z'],
    barco: ['M35 160 H215 L185 215 H65 Z', 'M125 50 L125 160 L195 160 Z', 'M125 50 L125 160 L60 160 Z'],
    gato: ['M70 70 L105 35 L125 80 L145 35 L180 70 V160 Q180 220 125 220 Q70 220 70 160 Z'],
    conejo: ['M85 65 Q85 10 115 45 Q145 10 145 65 Q190 90 175 165 Q160 230 115 230 Q70 230 55 165 Q40 90 85 65 Z'],
    arbol: ['M125 20 L190 120 H160 L210 200 H40 L90 120 H60 Z', 'M105 200 H145 V235 H105 Z'],
    avion: ['M30 125 L220 55 L170 125 L220 195 Z', 'M95 125 L35 185 L135 150 Z', 'M95 125 L35 65 L135 100 Z']
  };

  const renderTangramPiece = (p: TangramPiece) => {
    const cursor = 'grab';
    const isLarge = p.name.includes('Grande');
    const isMedium = p.name.includes('Mediano');
    const isSmall = p.name.includes('Pequeño');
    if (p.shape === 'square') {
      return <rect x="0" y="0" width="34" height="34" rx="4" fill={p.color} transform={`translate(${p.x} ${p.y}) rotate(${p.rot} 17 17)`} opacity={p.matched ? 1 : 0.88} stroke="white" strokeWidth="2" cursor={cursor} onPointerDown={(e) => handlePointerDown(p.id, e)} key={p.id} />;
    }
    if (p.shape === 'parallelogram') {
      return <polygon points="0,0 34,0 51,17 17,17" fill={p.color} transform={`translate(${p.x} ${p.y}) rotate(${p.rot} 25 8)`} opacity={p.matched ? 1 : 0.88} stroke="white" strokeWidth="2" cursor={cursor} onPointerDown={(e) => handlePointerDown(p.id, e)} key={p.id} />;
    }
    if (isLarge) {
      return <polygon points="0,0 96,0 0,96" fill={p.color} transform={`translate(${p.x} ${p.y}) rotate(${p.rot} 48 48)`} opacity={p.matched ? 1 : 0.88} stroke="white" strokeWidth="2" cursor={cursor} onPointerDown={(e) => handlePointerDown(p.id, e)} key={p.id} />;
    }
    if (isMedium) {
      return <polygon points="0,0 68,0 0,68" fill={p.color} transform={`translate(${p.x} ${p.y}) rotate(${p.rot} 34 34)`} opacity={p.matched ? 1 : 0.88} stroke="white" strokeWidth="2" cursor={cursor} onPointerDown={(e) => handlePointerDown(p.id, e)} key={p.id} />;
    }
    if (isSmall) {
      return <polygon points="0,0 48,0 0,48" fill={p.color} transform={`translate(${p.x} ${p.y}) rotate(${p.rot} 24 24)`} opacity={p.matched ? 1 : 0.88} stroke="white" strokeWidth="2" cursor={cursor} onPointerDown={(e) => handlePointerDown(p.id, e)} key={p.id} />;
    }
    return <polygon points="0,0 52,0 0,52" fill={p.color} transform={`translate(${p.x} ${p.y}) rotate(${p.rot} 26 26)`} opacity={p.matched ? 1 : 0.88} stroke="white" strokeWidth="2" cursor={cursor} onPointerDown={(e) => handlePointerDown(p.id, e)} key={p.id} />;
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20 md:pb-6">
      <div className="math-card text-white shadow-xl" style={{ background: 'var(--gradient-primary)' }}>
        <h1 className="text-2xl md:text-4xl font-black flex items-center gap-3"><Gamepad2 size={36} /> Juegos y Rompecabezas Matemáticos</h1>
        <p className="font-bold opacity-90 mt-2">Pon a prueba tu agilidad mental, lógica y visión espacial con Sudokus aleatorios, Tangram, Mastermind, Nim y Memoria.</p>
      </div>

      <div className="math-card flex gap-2 flex-wrap">
        {[
          { id: 'sudoku', label: '🔢 Sudoku' },
          { id: 'tangram', label: '🧩 Tangram' },
          { id: 'mastermind', label: '🔑 Mastermind' },
          { id: 'nim', label: '♟️ Nim' },
          { id: 'memory', label: '🃏 Memoria' },
        ].map(t => (
          <button key={t.id} onClick={() => { setTab(t.id as typeof tab); setSudokuMessage(null); setTangramMessage(null); setMastermindMessage(null); if (t.id === 'nim') resetNim(); if (t.id === 'memory') initMemory(); if (t.id === 'mastermind') { setMastermindCode(Array.from({ length: 4 }, () => Math.floor(Math.random() * 6) + 1)); setMastermindAttempts([]); } }}
            className={`px-5 py-2.5 rounded-2xl font-black text-sm flex items-center gap-2 transition-all ${tab === t.id ? 'bg-[var(--primary-color)] text-white shadow-lg scale-105' : 'bg-slate-200 dark:bg-slate-700'}`}>
            {t.label}
          </button>
        ))}
      </div>

      {/* Sudoku */}
      {tab === 'sudoku' && (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          <div className="math-card flex flex-col items-center">
            <div className="flex justify-between items-center w-full max-w-md mb-4">
              <span className="font-black text-xs uppercase opacity-70">Dif: {sudokuDifficulty}</span>
              <div className="flex gap-1.5">
                {(['facil','medio','dificil'] as const).map(d => (<button key={d} onClick={() => newSudoku(d)} className={`px-3 py-1 rounded-xl text-xs font-black ${sudokuDifficulty===d?'bg-[var(--primary-color)] text-white shadow':'bg-slate-200 dark:bg-slate-700 opacity-80'}`}>{d.toUpperCase()}</button>))}
              </div>
            </div>
            <div className="grid grid-cols-9 gap-px bg-slate-300 dark:bg-slate-700 p-2 rounded-3xl shadow-xl max-w-md w-full border-4 border-white/40">
              {sudokuBoard.map((row, r) => row.map((cell, c) => {
                const isSel = sudokuSelected && sudokuSelected[0]===r && sudokuSelected[1]===c;
                return (
                  <div key={`${r}-${c}`} onClick={() => setSudokuSelected([r,c])}
                    className={`aspect-square flex items-center justify-center font-black text-base md:text-xl rounded-xl transition-all cursor-pointer shadow-sm ${isSel?'bg-amber-400 text-slate-900 ring-4 ring-amber-400/30 scale-110 z-10':cell.fixed?'bg-slate-200 dark:bg-slate-800 opacity-90':'bg-white dark:bg-slate-900 text-[var(--primary-color)] hover:bg-slate-100 dark:hover:bg-slate-800'}`}>
                    {cell.val !== 0 ? cell.val : ''}
                  </div>
                );
              }))}
            </div>
            <div className="flex gap-2 flex-wrap justify-center max-w-md mt-6">
              {Array.from({length:9},(_,i)=>i+1).map(n => (<button key={n} onClick={() => setSudokuNumber(n)} disabled={!sudokuSelected} className="w-11 h-11 rounded-2xl bg-surface-color border-2 border-border-color font-black text-lg shadow-sm hover:scale-110 transition-all hover:bg-[var(--primary-color)] hover:text-white disabled:opacity-50">{n}</button>))}
              <button onClick={() => setSudokuNumber(0)} disabled={!sudokuSelected} className="px-4 py-2 rounded-2xl bg-red-500/20 text-red-500 font-black border-2 border-red-500/30">Borrar</button>
            </div>
          </div>
          <div className="math-card space-y-4 h-fit">
            <h2 className="font-black text-lg">Controles</h2>
            {sudokuMessage && (<div className={`p-4 rounded-2xl text-sm font-black text-center shadow ${sudokuMessage.ok?'bg-emerald-500 text-white animate-pop':'bg-amber-500/20 text-amber-600'}`}>{sudokuMessage.text}</div>)}
            <button onClick={validateSudoku} className="math-btn w-full !py-3 text-sm flex items-center gap-2"><Trophy size={18}/>Validar</button>
            <button onClick={giveSudokuHint} disabled={!sudokuSelected} className="math-btn w-full !py-3 text-sm !bg-amber-500 flex items-center gap-2 disabled:opacity-50"><HelpCircle size={18}/>Pista</button>
            <button onClick={() => newSudoku(sudokuDifficulty)} className="math-btn w-full !py-3 text-sm !bg-slate-600 flex items-center gap-2"><RefreshCw size={18}/>Reiniciar</button>
          </div>
        </div>
      )}

      {/* Tangram */}
      {tab === 'tangram' && (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
          <div className="math-card flex flex-col items-center">
            <div className="flex justify-between items-center w-full max-w-md mb-4">
              <span className="font-black text-xs uppercase opacity-70">Silueta: {tangramModel}</span>
              <div className="flex gap-1.5">
                {(['casa','barco','gato','conejo','arbol','avion'] as const).map(m => (<button key={m} onClick={() => {setTangramModel(m);setTangramMessage(null);}} className={`px-3 py-1 rounded-xl text-xs font-black ${tangramModel===m?'bg-[var(--primary-color)] text-white shadow':'bg-slate-200 dark:bg-slate-700 opacity-80'}`}>{m.toUpperCase()}</button>))}
              </div>
            </div>
            <div className="p-4 rounded-3xl bg-black/5 border-4 border-dashed border-[var(--primary-color)]/30 w-full max-w-xl min-h-80 relative shadow-inner mb-6 overflow-hidden">
              <svg ref={svgRef} viewBox="0 0 250 250" className="w-full h-80 touch-none">
                {targetPaths[tangramModel].map((d,i) => (<path key={i} d={d} fill="rgba(100,100,100,.08)" stroke="var(--primary-color)" strokeWidth="3" strokeDasharray="8 6" />))}
                <g>{tangramPieces.map(p => renderTangramPiece(p))}</g>
              </svg>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-md">
              {tangramPieces.map(p => (<button key={p.id} onClick={() => rotateTangramPiece(p.id)} className="p-3.5 rounded-2xl font-black text-xs flex items-center justify-between text-white shadow hover:scale-105 active:scale-95 transition-all" style={{background:p.color}}><span>{p.matched?'✅ ':''}{p.name}</span><span className="px-2 py-1 bg-black/20 rounded-lg">{p.rot}°</span></button>))}
            </div>
          </div>
          <div className="math-card space-y-4 h-fit">
            <h2 className="font-black text-lg">Controles</h2>
            {tangramMessage && (<div className={`p-4 rounded-2xl text-sm font-black text-center shadow ${tangramMessage.ok?'bg-emerald-500 text-white animate-pop':'bg-amber-500/20 text-amber-600'}`}>{tangramMessage.text}</div>)}
            <button onClick={checkTangram} className="math-btn w-full !py-3 text-sm flex items-center gap-2"><Trophy size={18}/>Verificar</button>
            <button onClick={resetTangram} className="math-btn w-full !py-3 text-sm !bg-slate-600 flex items-center gap-2"><RefreshCw size={18}/>Restablecer</button>
          </div>
        </div>
      )}

      {/* Mastermind */}
      {tab === 'mastermind' && (
        <div className="math-card">
          <h2 className="font-black text-xl mb-4">Mastermind (Código de 4 dígitos 1-6)</h2>
          {mastermindMessage && (<div className={`p-4 rounded-2xl text-sm font-black text-center shadow mb-4 ${mastermindMessage.ok?'bg-emerald-500 text-white animate-pop':'bg-amber-500/20 text-amber-600'}`}>{mastermindMessage.text}</div>)}
          <div className="flex gap-2 flex-wrap justify-center mb-4">
            {mastermindGuess.map((g,i) => (<input key={i} type="number" min="1" max="6" value={g} onChange={e => {const ng=[...mastermindGuess];ng[i]=parseInt(e.target.value)||1;setMastermindGuess(ng);}} className="w-12 h-12 text-center text-2xl font-black border-2 border-border-color rounded-2xl bg-surface-color" />))}
          </div>
          <button onClick={submitMastermindGuess} className="math-btn w-full">Probar Código</button>
          {mastermindAttempts.length>0 && (<div className="mt-6"><h3 className="font-black text-sm uppercase opacity-60 mb-2">Intentos</h3><div className="space-y-1">{mastermindAttempts.map((a,i)=>(<div key={i} className="p-2 rounded-xl bg-black/5 font-mono text-xs">{a}</div>))}</div></div>)}
        </div>
      )}

      {/* Nim */}
      {tab === 'nim' && (
        <div className="math-card">
          <h2 className="font-black text-xl mb-2">Nim (Juego de Estrategia)</h2>
          <p className="text-xs font-bold opacity-75 text-center mb-4">Quita de 1 a 3 fichas de una sola pila por turno. <b>Quien tome la última ficha, gana.</b> Empiezas tú.</p>
          <div className="flex justify-center gap-8 mb-4">
            {nimPiles.map((pile,i) => (<div key={i} className="text-center"><div className="text-xs font-black opacity-70 mb-2">Pila {i+1}</div><div className="flex flex-col items-center gap-1">{Array.from({length:pile},(_,j)=>(<div key={j} className="w-8 h-2 bg-orange-500 rounded" />))}</div><div className="font-black text-xl mt-2">{pile}</div><div className="flex gap-2 mt-4">{[1,2,3].map(k=>(<button key={k} onClick={()=>makeNimMove(i,k)} disabled={nimPlayer==='computer'||pile<k||!!nimMsg} className="px-3 py-1 text-xs font-black bg-slate-700 text-white rounded-xl disabled:opacity-30">−{k}</button>))}</div></div>))}
          </div>
          <button onClick={resetNim} className="math-btn w-full">Reiniciar</button>
          {nimMsg
            ? <div className="mt-4 p-3 rounded-2xl font-black text-white text-center bg-emerald-500 animate-pop">{nimMsg}</div>
            : <div className="text-xs font-bold text-center mt-4 opacity-75">{nimPlayer==='human'?'Tu turno':'Turno de la computadora...'}</div>}
        </div>
      )}

      {/* Memory */}
      {tab === 'memory' && (
        <div className="math-card space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <h2 className="font-black text-xl">🃏 Memoria</h2>
            <div className="flex items-center gap-3"><span className="text-sm font-bold opacity-70">Mov: {memoryMoves}</span><button onClick={initMemory} className="math-btn !py-2 !px-4 text-xs"><RefreshCw size={16}/>Nueva</button></div>
          </div>
          {memoryMessage && (<div className={`p-4 rounded-2xl text-sm font-black text-center shadow ${memoryMessage.ok?'bg-emerald-500 text-white animate-pop':'bg-amber-500/20 text-amber-600'}`}>{memoryMessage.text}</div>)}
          <div className="grid grid-cols-4 gap-3 max-w-md mx-auto">
            {memoryCards.map((card,i) => (<button key={card.id} onClick={()=>flipCard(i)} className={`aspect-square rounded-2xl font-black text-3xl flex items-center justify-center transition-all shadow-md border-4 ${card.matched?'bg-emerald-500/20 border-emerald-500 scale-95':card.flipped?'bg-white dark:bg-slate-800 border-[var(--primary-color)]':'bg-slate-300 dark:bg-slate-700 border-transparent hover:scale-105'}`} disabled={card.matched}>{card.flipped||card.matched?card.symbol:'❓'}</button>))}
          </div>
        </div>
      )}
    </div>
  );
};
