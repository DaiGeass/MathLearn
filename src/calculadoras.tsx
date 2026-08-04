import React, { useState, useRef, useCallback, useEffect } from 'react';
import * as math from 'mathjs';

// ── MathQuill setup ──────────────────────────────────────────────
import $ from 'jquery';
if (typeof window !== 'undefined') {
  (window as any).jQuery = $;
  (window as any).$ = $;
}
import { addStyles, EditableMathField, StaticMathField } from 'react-mathquill';
addStyles();

// ── Nerdamer (CAS) ───────────────────────────────────────────────
// Nerdamer carga sus módulos de forma secuencial
import nerdamer from 'nerdamer';
import 'nerdamer/Algebra';
import 'nerdamer/Calculus';
import 'nerdamer/Solve';
import 'nerdamer/Extra';

// ── KaTeX ────────────────────────────────────────────────────────
import katex from 'katex';
import 'katex/dist/katex.min.css';

// ════════════════════════════════════════════════════════════════
// TIPOS
// ════════════════════════════════════════════════════════════════
type CalcMode = 'scientific' | 'standard' | 'graphing' | 'cas' | 'equations' | 'statistics';

// ════════════════════════════════════════════════════════════════
// HELPERS
// ════════════════════════════════════════════════════════════════

/** Renderiza un string LaTeX a HTML con KaTeX (fallback a texto plano) */
const renderLatex = (latex: string): string => {
  try {
    return katex.renderToString(latex, { throwOnError: false, displayMode: true });
  } catch {
    return `<span>${latex}</span>`;
  }
};

/** Componente que muestra LaTeX renderizado */
const KatexOutput: React.FC<{ latex: string; className?: string }> = ({ latex, className }) => {
  const html = renderLatex(latex);
  return (
    <div
      className={className}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
};

// Traduce LaTeX de MathQuill a expresión de texto para mathjs / nerdamer
const latexToText = (latex: string, isRad: boolean = true): string => {
  return latex
    // Fracciones y raíces
    .replace(/\\frac\{([^{}]+)\}\{([^{}]+)\}/g, '($1)/($2)')
    .replace(/\\sqrt\[([^\]]+)\]\{([^{}]+)\}/g, 'nthRoot($2,$1)')
    .replace(/\\sqrt\{([^{}]+)\}/g, 'sqrt($1)')
    // Potencias
    .replace(/\^\{([^{}]+)\}/g, '^($1)')
    // Logaritmos con base
    .replace(/\\log_\{([^{}]+)\}\\left\(([^)]+)\\right\)/g, 'log($2,$1)')
    .replace(/\\log_([0-9]+)\\left\(([^)]+)\\right\)/g, 'log($2,$1)')
    // ln y log10
    .replace(/\\ln\\left\(([^)]+)\\right\)/g, 'log($1)')
    .replace(/\\log\\left\(([^)]+)\\right\)/g, 'log10($1)')
    // Trig inversa
    .replace(/\\sin\^{-1}\\left\(([^)]+)\\right\)/g, isRad ? 'asin($1)' : 'asin($1)*180/PI')
    .replace(/\\cos\^{-1}\\left\(([^)]+)\\right\)/g, isRad ? 'acos($1)' : 'acos($1)*180/PI')
    .replace(/\\tan\^{-1}\\left\(([^)]+)\\right\)/g, isRad ? 'atan($1)' : 'atan($1)*180/PI')
    // Trig estándar
    .replace(/\\sin\\left\(([^)]+)\\right\)/g, isRad ? 'sin($1)' : 'sin($1*PI/180)')
    .replace(/\\cos\\left\(([^)]+)\\right\)/g, isRad ? 'cos($1)' : 'cos($1*PI/180)')
    .replace(/\\tan\\left\(([^)]+)\\right\)/g, isRad ? 'tan($1)' : 'tan($1*PI/180)')
    // Valor absoluto
    .replace(/\\left\|([^|]+)\\right\|/g, 'abs($1)')
    // Constantes
    .replace(/\\pi/g, 'PI')
    .replace(/\\infty/g, 'Infinity')
    // Operadores
    .replace(/\\cdot/g, '*')
    .replace(/\\times/g, '*')
    .replace(/\\div/g, '/')
    // Limpiar llaves y paréntesis de MathQuill
    .replace(/\\left\(/g, '(')
    .replace(/\\right\)/g, ')')
    .replace(/\{([^{}]+)\}/g, '($1)')
    .replace(/[{}]/g, '');
};

// ════════════════════════════════════════════════════════════════
// 1. SCIENTIFIC VPAM — Casio ClassWiz style con anotación 2D real
// ════════════════════════════════════════════════════════════════
const ScientificVPAM: React.FC = () => {
  const [latex, setLatex] = useState('');
  const [result, setResult] = useState('');
  const [isShift, setIsShift] = useState(false);
  const [isAlpha, setIsAlpha] = useState(false);
  const [isRad, setIsRad] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [history, setHistory] = useState<{ expr: string; result: string }[]>([]);
  const mathFieldRef = useRef<any>(null);

  const insert = (v: string) => {
    mathFieldRef.current?.write(v);
    mathFieldRef.current?.focus();
    setIsShift(false);
    setIsAlpha(false);
  };

  const insertCmd = (v: string) => {
    mathFieldRef.current?.cmd(v);
    mathFieldRef.current?.focus();
    setIsShift(false);
    setIsAlpha(false);
  };

  const insertWrap = (v: string, backSteps = 1) => {
    mathFieldRef.current?.write(v);
    for (let i = 0; i < backSteps; i++) mathFieldRef.current?.keystroke('Left');
    mathFieldRef.current?.focus();
    setIsShift(false);
    setIsAlpha(false);
  };

  const clearAll = () => { setLatex(''); setResult(''); setErrorMsg(''); };

  const evaluate = () => {
    if (!latex.trim()) return;
    try {
      const expr = latexToText(latex, isRad);
      const scope: Record<string, number> = {
        PI: Math.PI,
        E: Math.E,
      };
      const r = math.evaluate(expr, scope);
      const formatted = math.format(r, { precision: 12 });
      setResult(formatted);
      setErrorMsg('');
      setHistory(h => [{ expr: latex, result: formatted }, ...h].slice(0, 20));
    } catch (e: any) {
      setResult('');
      setErrorMsg('Syntax Error');
    }
  };

  // Atajos de teclado: Enter = evaluate
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter') evaluate();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [latex, isRad]);

  const Btn: React.FC<{
    label: React.ReactNode;
    shiftLabel?: React.ReactNode;
    alphaLabel?: React.ReactNode;
    onClick: () => void;
    shiftAction?: () => void;
    alphaAction?: () => void;
    color?: string;
    wide?: boolean;
  }> = ({ label, shiftLabel, alphaLabel, onClick, shiftAction, alphaAction, color = 'default', wide }) => {
    const handleClick = () => {
      if (isShift && shiftAction) { shiftAction(); return; }
      if (isAlpha && alphaAction) { alphaAction(); return; }
      onClick();
    };
    const base = 'relative rounded-xl font-bold text-sm transition-all active:scale-95 select-none flex flex-col items-center justify-center gap-0.5 p-1 min-h-[48px]';
    const colors: Record<string, string> = {
      default: 'bg-slate-800 border border-slate-700 text-slate-200 hover:bg-slate-700',
      number: 'bg-slate-200 text-slate-900 hover:bg-white border border-slate-300',
      operator: 'bg-slate-700 text-white hover:bg-slate-600 border border-slate-600',
      exe: 'bg-gradient-to-b from-emerald-400 to-emerald-600 text-white shadow-lg hover:from-emerald-300 border border-emerald-400',
      del: 'bg-rose-700 text-white hover:bg-rose-600 border border-rose-600',
      ac: 'bg-rose-900 text-rose-200 hover:bg-rose-800 border border-rose-700',
      shift: `${isShift ? 'bg-amber-500 text-slate-900 border-amber-400' : 'bg-slate-700 text-amber-300 border-slate-600 hover:bg-slate-600'} border`,
      alpha: `${isAlpha ? 'bg-violet-500 text-white border-violet-400' : 'bg-slate-700 text-violet-300 border-slate-600 hover:bg-slate-600'} border`,
      mode: 'bg-sky-900 text-sky-300 hover:bg-sky-800 border border-sky-800',
    };
    return (
      <button
        onClick={handleClick}
        className={`${base} ${colors[color]} ${wide ? 'col-span-2' : ''}`}
      >
        {(isShift && shiftLabel) && <span className="text-[9px] text-amber-400 font-black absolute top-1 left-1">{shiftLabel}</span>}
        {(isAlpha && alphaLabel) && <span className="text-[9px] text-violet-400 font-black absolute top-1 right-1">{alphaLabel}</span>}
        <span className="text-sm leading-tight">{label}</span>
      </button>
    );
  };

  return (
    <div className="space-y-3 max-w-xl mx-auto select-none">
      {/* PANTALLA */}
      <div className="rounded-2xl bg-[#0a1628] border-4 border-slate-700 shadow-2xl overflow-hidden">
        {/* Status bar */}
        <div className="flex justify-between items-center px-3 py-1.5 bg-slate-900 border-b border-slate-800">
          <div className="flex gap-3 text-[10px] font-black tracking-widest uppercase">
            <span className={isShift ? 'text-amber-400' : 'text-slate-600'}>SHIFT</span>
            <span className={isAlpha ? 'text-violet-400' : 'text-slate-600'}>ALPHA</span>
            <span className={!isRad ? 'text-emerald-400' : 'text-slate-600'}>D</span>
            <span className={isRad ? 'text-emerald-400' : 'text-slate-600'}>R</span>
          </div>
          <span className="text-[10px] text-slate-500 font-mono">MATH 2D</span>
        </div>

        {/* Historial (últimas 2 entradas) */}
        {history.slice(0, 2).map((h, i) => (
          <div key={i} className="flex justify-between items-center px-3 py-0.5 opacity-40 hover:opacity-70 cursor-pointer" onClick={() => setLatex(h.expr)}>
            <StaticMathField style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{h.expr}</StaticMathField>
            <span className="font-mono text-xs text-slate-400">{h.result}</span>
          </div>
        ))}

        {/* Campo de entrada 2D — crece con el contenido */}
        <div className="min-h-[60px] px-4 py-2 flex items-center justify-end overflow-x-auto">
          <EditableMathField
            latex={latex}
            onChange={(mf) => { setLatex(mf.latex()); mathFieldRef.current = mf; }}
            style={{
              border: 'none',
              background: 'transparent',
              color: '#f8fafc',
              fontSize: '1.6rem',
              minWidth: '40px',
              maxWidth: '100%',
              outline: 'none',
            }}
            mathquillDidMount={(mf) => { mathFieldRef.current = mf; mf.focus(); }}
          />
        </div>

        {/* Resultado */}
        <div className="flex justify-between items-end px-4 pb-3 border-t border-slate-800 pt-2">
          <span className="text-red-400 text-xs font-bold">{errorMsg}</span>
          {result && (
            <div className="text-right">
              <span className="text-3xl font-black font-mono text-emerald-400 drop-shadow-md">
                {result}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* TECLADO */}
      <div className="bg-slate-900 p-2 rounded-2xl border border-slate-800">
        {/* Fila control */}
        <div className="grid grid-cols-5 gap-1 mb-1">
          <Btn label="SHIFT" color="shift" onClick={() => setIsShift(s => !s)} />
          <Btn label="ALPHA" color="alpha" onClick={() => setIsAlpha(a => !a)} />
          <Btn label={isRad ? 'RAD' : 'DEG'} color="mode" onClick={() => setIsRad(r => !r)} />
          <Btn label="◀" color="operator" onClick={() => mathFieldRef.current?.keystroke('Left')} />
          <Btn label="▶" color="operator" onClick={() => mathFieldRef.current?.keystroke('Right')} />
        </div>

        <div className="grid grid-cols-2 gap-1">
          {/* PANEL CIENTÍFICO */}
          <div className="grid grid-cols-4 gap-1">
            {/* Fila 1 */}
            <Btn label="□/□" shiftLabel="a+bi" onClick={() => insertCmd('\\frac')} />
            <Btn label="√□" shiftLabel="∛□" onClick={() => insert('\\sqrt{ }')} shiftAction={() => insertWrap('\\sqrt[3]{ }', 1)} />
            <Btn label="xʸ" shiftLabel="ʸ√x" onClick={() => insert('^')} shiftAction={() => insertWrap('\\sqrt[ ]{ }', 2)} />
            <Btn label="( )" onClick={() => insertWrap('\\left(\\right)', 1)} />

            {/* Fila 2 */}
            <Btn label="x²" shiftLabel="x³" onClick={() => insert('^2')} shiftAction={() => insert('^3')} />
            <Btn label="x⁻¹" onClick={() => insert('^{-1}')} />
            <Btn label="|x|" onClick={() => insertWrap('\\left|\\right|', 1)} />
            <Btn label="x!" onClick={() => insert('!')} />

            {/* Fila 3: log */}
            <Btn
              label="log"
              shiftLabel="10ˣ"
              onClick={() => insertWrap('\\log_{10}\\left(\\right)', 1)}
              shiftAction={() => insert('10^')}
            />
            <Btn
              label="ln"
              shiftLabel="eˣ"
              onClick={() => insertWrap('\\ln\\left(\\right)', 1)}
              shiftAction={() => insert('e^')}
            />
            <Btn
              label={<span>log<sub>b</sub></span>}
              shiftLabel="logₙ"
              onClick={() => insertWrap('\\log_{ }\\left(\\right)', 2)}
            />
            <Btn label="e" shiftLabel="ENG" onClick={() => insert('e')} />

            {/* Fila 4: trig */}
            <Btn
              label="sin"
              shiftLabel="sin⁻¹"
              onClick={() => insertWrap('\\sin\\left(\\right)', 1)}
              shiftAction={() => insertWrap('\\sin^{-1}\\left(\\right)', 1)}
            />
            <Btn
              label="cos"
              shiftLabel="cos⁻¹"
              onClick={() => insertWrap('\\cos\\left(\\right)', 1)}
              shiftAction={() => insertWrap('\\cos^{-1}\\left(\\right)', 1)}
            />
            <Btn
              label="tan"
              shiftLabel="tan⁻¹"
              onClick={() => insertWrap('\\tan\\left(\\right)', 1)}
              shiftAction={() => insertWrap('\\tan^{-1}\\left(\\right)', 1)}
            />
            <Btn label="π" shiftLabel="θ" onClick={() => insert('\\pi')} alphaAction={() => insert('\\theta')} />

            {/* Fila 5: trig hiperbólica */}
            <Btn label="sinh" shiftLabel="sinh⁻¹" onClick={() => insertWrap('\\sinh\\left(\\right)', 1)} />
            <Btn label="cosh" shiftLabel="cosh⁻¹" onClick={() => insertWrap('\\cosh\\left(\\right)', 1)} />
            <Btn label="tanh" shiftLabel="tanh⁻¹" onClick={() => insertWrap('\\tanh\\left(\\right)', 1)} />
            <Btn label="%" onClick={() => insert('%')} />
          </div>

          {/* PANEL NUMÉRICO */}
          <div className="grid grid-cols-4 gap-1">
            <Btn label="7" color="number" onClick={() => insert('7')} />
            <Btn label="8" color="number" onClick={() => insert('8')} />
            <Btn label="9" color="number" onClick={() => insert('9')} />
            <Btn label="DEL" color="del" onClick={() => mathFieldRef.current?.keystroke('Backspace')} />

            <Btn label="4" color="number" onClick={() => insert('4')} />
            <Btn label="5" color="number" onClick={() => insert('5')} />
            <Btn label="6" color="number" onClick={() => insert('6')} />
            <Btn label="AC" color="ac" onClick={clearAll} />

            <Btn label="1" color="number" onClick={() => insert('1')} />
            <Btn label="2" color="number" onClick={() => insert('2')} />
            <Btn label="3" color="number" onClick={() => insert('3')} />
            <Btn label="×" color="operator" onClick={() => insert('\\times')} />

            <Btn label="0" color="number" onClick={() => insert('0')} />
            <Btn label="." color="number" onClick={() => insert('.')} />
            <Btn label="+" color="operator" onClick={() => insert('+')} />
            <Btn label="−" color="operator" onClick={() => insert('-')} />

            <Btn label="±" color="operator" onClick={() => insert('-')} />
            <Btn label="÷" color="operator" onClick={() => insert('\\div')} />
            <Btn label="ANS" color="operator" onClick={() => insert(result || '0')} wide />

            <Btn label="EXE" color="exe" onClick={evaluate} wide />
          </div>
        </div>
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════
// 2. STANDARD CALCULATOR
// ════════════════════════════════════════════════════════════════
const StandardCalc: React.FC = () => {
  const [expr, setExpr] = useState('');
  const [result, setResult] = useState('0');
  const [justEval, setJustEval] = useState(false);

  const append = (v: string) => {
    if (justEval && /[0-9(]/.test(v)) { setExpr(v); setJustEval(false); return; }
    if (justEval) setJustEval(false);
    setExpr(p => p + v);
  };
  const clear = () => { setExpr(''); setResult('0'); setJustEval(false); };
  const del = () => setExpr(p => p.slice(0, -1));
  const evaluate = () => {
    try {
      const r = math.format(math.evaluate(expr || '0'), { precision: 12 });
      setResult(r);
      setExpr(r);
      setJustEval(true);
    } catch { setResult('Error'); }
  };

  const keys = [
    { label: 'C', action: clear, color: 'bg-rose-800 text-white' },
    { label: '⌫', action: del, color: 'bg-rose-700 text-white' },
    { label: '%', action: () => append('%'), color: 'bg-slate-700 text-white' },
    { label: '÷', action: () => append('/'), color: 'bg-amber-600 text-white' },
    { label: '7', action: () => append('7'), color: 'bg-slate-700 text-white' },
    { label: '8', action: () => append('8'), color: 'bg-slate-700 text-white' },
    { label: '9', action: () => append('9'), color: 'bg-slate-700 text-white' },
    { label: '×', action: () => append('*'), color: 'bg-amber-600 text-white' },
    { label: '4', action: () => append('4'), color: 'bg-slate-700 text-white' },
    { label: '5', action: () => append('5'), color: 'bg-slate-700 text-white' },
    { label: '6', action: () => append('6'), color: 'bg-slate-700 text-white' },
    { label: '−', action: () => append('-'), color: 'bg-amber-600 text-white' },
    { label: '1', action: () => append('1'), color: 'bg-slate-700 text-white' },
    { label: '2', action: () => append('2'), color: 'bg-slate-700 text-white' },
    { label: '3', action: () => append('3'), color: 'bg-slate-700 text-white' },
    { label: '+', action: () => append('+'), color: 'bg-amber-600 text-white' },
    { label: '±', action: () => setExpr(e => e.startsWith('-') ? e.slice(1) : '-' + e), color: 'bg-slate-700 text-white' },
    { label: '0', action: () => append('0'), color: 'bg-slate-700 text-white' },
    { label: '.', action: () => append('.'), color: 'bg-slate-700 text-white' },
    { label: '=', action: evaluate, color: 'bg-emerald-500 text-white' },
  ];

  return (
    <div className="max-w-xs mx-auto space-y-3">
      <div className="bg-slate-900 rounded-2xl p-5 border-2 border-slate-700 text-right shadow-2xl">
        <div className="text-slate-500 font-mono text-sm truncate min-h-[1.5rem]">{expr || '0'}</div>
        <div className="text-white text-4xl font-black font-mono mt-1 overflow-x-auto">{result}</div>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {keys.map((k, i) => (
          <button key={i} onClick={k.action}
            className={`p-4 rounded-2xl font-black text-xl shadow-md border border-slate-700 active:scale-95 transition-transform ${k.color}`}>
            {k.label}
          </button>
        ))}
      </div>
    </div>
  );
};

// ════════════════════════════════════════════════════════════════
// 3. GRAPHING CALCULATOR — multi-función, zoom, pan, trace
// ════════════════════════════════════════════════════════════════
const GraphingCalc: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [functions, setFunctions] = useState([
    { expr: 'sin(x)', color: '#38bdf8', visible: true },
    { expr: '', color: '#f472b6', visible: true },
  ]);
  const [view, setView] = useState({ xMin: -10, xMax: 10, yMin: -6, yMax: 6 });
  const [trace, setTrace] = useState<{ x: number; y: number } | null>(null);
  const COLORS = ['#38bdf8', '#f472b6', '#34d399', '#fb923c', '#a78bfa'];

  const draw = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    if (!ctx) return;
    const W = c.width, H = c.height;
    const { xMin, xMax, yMin, yMax } = view;
    const sx = (x: number) => ((x - xMin) / (xMax - xMin)) * W;
    const sy = (y: number) => H - ((y - yMin) / (yMax - yMin)) * H;

    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = '#0a1628';
    ctx.fillRect(0, 0, W, H);

    // Grid minor
    ctx.strokeStyle = '#1e293b';
    ctx.lineWidth = 0.5;
    const step = Math.pow(10, Math.floor(Math.log10((xMax - xMin) / 10)));
    for (let x = Math.ceil(xMin / step) * step; x <= xMax; x += step) {
      ctx.beginPath(); ctx.moveTo(sx(x), 0); ctx.lineTo(sx(x), H); ctx.stroke();
    }
    for (let y = Math.ceil(yMin / step) * step; y <= yMax; y += step) {
      ctx.beginPath(); ctx.moveTo(0, sy(y)); ctx.lineTo(W, sy(y)); ctx.stroke();
    }

    // Grid major (cada 1)
    ctx.strokeStyle = '#1e3a5f';
    ctx.lineWidth = 1;
    for (let x = Math.ceil(xMin); x <= xMax; x++) {
      ctx.beginPath(); ctx.moveTo(sx(x), 0); ctx.lineTo(sx(x), H); ctx.stroke();
    }
    for (let y = Math.ceil(yMin); y <= yMax; y++) {
      ctx.beginPath(); ctx.moveTo(0, sy(y)); ctx.lineTo(W, sy(y)); ctx.stroke();
    }

    // Ejes
    ctx.strokeStyle = '#64748b';
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(0, sy(0)); ctx.lineTo(W, sy(0)); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(sx(0), 0); ctx.lineTo(sx(0), H); ctx.stroke();

    // Números en ejes
    ctx.fillStyle = '#64748b';
    ctx.font = '11px monospace';
    ctx.textAlign = 'center';
    for (let x = Math.ceil(xMin); x <= xMax; x++) {
      if (x !== 0) ctx.fillText(String(x), sx(x), sy(0) + 14);
    }
    ctx.textAlign = 'right';
    for (let y = Math.ceil(yMin); y <= yMax; y++) {
      if (y !== 0) ctx.fillText(String(y), sx(0) - 4, sy(y) + 4);
    }

    // Funciones
    functions.forEach(fn => {
      if (!fn.expr.trim() || !fn.visible) return;
      ctx.strokeStyle = fn.color;
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      let started = false;
      let prevY = 0;
      for (let px = 0; px < W; px++) {
        const x = xMin + (px / W) * (xMax - xMin);
        try {
          const y = math.evaluate(fn.expr, { x, pi: Math.PI, e: Math.E });
          if (typeof y !== 'number' || !isFinite(y)) { started = false; continue; }
          const py = sy(y);
          // Detectar discontinuidad (asíntota)
          if (started && Math.abs(y - prevY) > (yMax - yMin) * 2) {
            ctx.stroke();
            ctx.beginPath();
            started = false;
          }
          if (!started) { ctx.moveTo(px, py); started = true; }
          else ctx.lineTo(px, py);
          prevY = y;
        } catch { started = false; }
      }
      ctx.stroke();
    });

    // Trace point
    if (trace) {
      ctx.fillStyle = '#facc15';
      ctx.beginPath();
      ctx.arc(sx(trace.x), sy(trace.y), 5, 0, Math.PI * 2);
      ctx.fill();
    }
  }, [functions, view, trace]);

  useEffect(() => { draw(); }, [draw]);

  const zoom = (factor: number) => {
    setView(v => {
      const cx = (v.xMin + v.xMax) / 2;
      const cy = (v.yMin + v.yMax) / 2;
      const rX = (v.xMax - v.xMin) / 2 * factor;
      const rY = (v.yMax - v.yMin) / 2 * factor;
      return { xMin: cx - rX, xMax: cx + rX, yMin: cy - rY, yMax: cy + rY };
    });
  };

  const addFunction = () => {
    setFunctions(f => [...f, { expr: '', color: COLORS[f.length % COLORS.length], visible: true }]);
  };

  return (
    <div className="space-y-3">
      {/* Lista de funciones */}
      <div className="space-y-2">
        {functions.map((fn, i) => (
          <div key={i} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: fn.color }} />
            <span className="text-slate-400 font-mono text-sm">y{i + 1} =</span>
            <input
              value={fn.expr}
              onChange={e => setFunctions(f => f.map((x, j) => j === i ? { ...x, expr: e.target.value } : x))}
              placeholder="ej. sin(x), x^2, tan(x)..."
              className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sky-300 font-mono text-sm outline-none focus:border-sky-500"
            />
            <button
              onClick={() => setFunctions(f => f.map((x, j) => j === i ? { ...x, visible: !x.visible } : x))}
              className={`text-xs px-2 py-1 rounded-lg border ${fn.visible ? 'bg-slate-700 text-white border-slate-600' : 'bg-slate-900 text-slate-500 border-slate-800'}`}
            >
              {fn.visible ? '●' : '○'}
            </button>
            {functions.length > 1 && (
              <button onClick={() => setFunctions(f => f.filter((_, j) => j !== i))} className="text-rose-500 hover:text-rose-400 text-sm">✕</button>
            )}
          </div>
        ))}
        <button onClick={addFunction} className="text-xs text-emerald-400 hover:text-emerald-300 border border-dashed border-emerald-800 rounded-xl px-3 py-1.5 w-full">
          + Agregar función
        </button>
      </div>

      {/* Controles de vista */}
      <div className="flex flex-wrap gap-2">
        <button onClick={() => zoom(1.3)} className="px-3 py-1.5 bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-700 border border-slate-700">Zoom −</button>
        <button onClick={() => zoom(0.7)} className="px-3 py-1.5 bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-700 border border-slate-700">Zoom +</button>
        <button onClick={() => setView({ xMin: -10, xMax: 10, yMin: -6, yMax: 6 })} className="px-3 py-1.5 bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-700 border border-slate-700">Reset</button>
        <button onClick={() => setView(v => ({ ...v, xMin: v.xMin - 1, xMax: v.xMax - 1 }))} className="px-2 py-1.5 bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-700 border border-slate-700">◀</button>
        <button onClick={() => setView(v => ({ ...v, xMin: v.xMin + 1, xMax: v.xMax + 1 }))} className="px-2 py-1.5 bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-700 border border-slate-700">▶</button>
        <button onClick={() => setView(v => ({ ...v, yMin: v.yMin + 1, yMax: v.yMax + 1 }))} className="px-2 py-1.5 bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-700 border border-slate-700">▲</button>
        <button onClick={() => setView(v => ({ ...v, yMin: v.yMin - 1, yMax: v.yMax - 1 }))} className="px-2 py-1.5 bg-slate-800 text-white rounded-xl text-xs font-bold hover:bg-slate-700 border border-slate-700">▼</button>
      </div>

      <canvas
        ref={canvasRef}
        width={600}
        height={380}
        className="w-full rounded-2xl border-4 border-slate-700 shadow-2xl cursor-crosshair"
        onMouseMove={e => {
          const rect = e.currentTarget.getBoundingClientRect();
          const px = e.clientX - rect.left;
          const x = view.xMin + (px / rect.width) * (view.xMax - view.xMin);
          try {
            const fn = functions.find(f => f.expr.trim() && f.visible);
            if (fn) {
              const y = math.evaluate(fn.expr, { x, pi: Math.PI, e: Math.E });
              if (typeof y === 'number' && isFinite(y)) setTrace({ x, y });
            }
          } catch { }
        }}
        onMouseLeave={() => setTrace(null)}
      />
      {trace && (
        <div className="text-xs font-mono text-slate-400 text-center">
          x = {trace.x.toFixed(4)} &nbsp;|&nbsp; y = {trace.y.toFixed(4)}
        </div>
      )}
    </div>
  );
};

// ════════════════════════════════════════════════════════════════
// 4. CAS — Motor simbólico con nerdamer
//    • Simplificar • Expandir • Derivar (orden n)
//    • Integrar (indefinida / definida) • Límites
//    • Factorizar • log base-x • solución de ecuaciones
// ════════════════════════════════════════════════════════════════

type CASOperation =
  | 'simplify'
  | 'expand'
  | 'factor'
  | 'diff'
  | 'integral'
  | 'definite'
  | 'limit';

interface CASResult {
  input: string;
  operation: string;
  result: string;
  latexResult: string;
  steps?: string[];
}

const CasCalc: React.FC = () => {
  const [expr, setExpr] = useState('');
  const [exprLatex, setExprLatex] = useState('');
  const [operation, setOperation] = useState<CASOperation>('simplify');
  const [variable, setVariable] = useState('x');
  const [diffOrder, setDiffOrder] = useState('1');
  const [lowerBound, setLowerBound] = useState('0');
  const [upperBound, setUpperBound] = useState('1');
  const [limitPoint, setLimitPoint] = useState('0');
  const [limitDir, setLimitDir] = useState<'+-' | '+' | '-'>('+-');
  const [result, setResult] = useState<CASResult | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const mathFieldRef = useRef<any>(null);

  const opLabels: Record<CASOperation, string> = {
    simplify: 'Simplificar',
    expand: 'Expandir',
    factor: 'Factorizar',
    diff: 'Derivar',
    integral: 'Integral ∫dx',
    definite: 'Integral Definida',
    limit: 'Límite',
  };

  // Convierte resultado nerdamer a LaTeX legible
  const nerdToLatex = (nerdResult: any): string => {
    try {
      return nerdResult.toTeX ? nerdResult.toTeX() : String(nerdResult);
    } catch {
      return String(nerdResult);
    }
  };

  const compute = () => {
    if (!expr.trim()) { setError('Ingresa una expresión'); return; }
    setLoading(true);
    setError('');
    setResult(null);

    // Pequeño timeout para que el UI se actualice
    setTimeout(() => {
      try {
        let res: any;
        let latexRes = '';
        const steps: string[] = [];

        switch (operation) {
          case 'simplify':
            res = nerdamer(`simplify(${expr})`);
            latexRes = nerdToLatex(res);
            steps.push(`Expresión original: ${expr}`);
            steps.push(`Simplificada: ${res.toString()}`);
            break;

          case 'expand':
            res = nerdamer(`expand(${expr})`);
            latexRes = nerdToLatex(res);
            steps.push(`Expresión original: ${expr}`);
            steps.push(`Expandida: ${res.toString()}`);
            break;

          case 'factor':
            res = nerdamer(`factor(${expr})`);
            latexRes = nerdToLatex(res);
            steps.push(`Expresión original: ${expr}`);
            steps.push(`Factorizada: ${res.toString()}`);
            break;

          case 'diff': {
            const order = parseInt(diffOrder) || 1;
            steps.push(`f(${variable}) = ${expr}`);
            let current = expr;
            for (let i = 0; i < order; i++) {
              res = nerdamer(`diff(${current}, ${variable})`);
              current = res.toString();
              steps.push(`d${i > 0 ? `^${i + 1}` : ''}/d${variable}${i > 0 ? `^${i + 1}` : ''} = ${current}`);
            }
            latexRes = nerdToLatex(res);
            break;
          }

          case 'integral':
            res = nerdamer(`integrate(${expr}, ${variable})`);
            latexRes = `${nerdToLatex(res)} + C`;
            steps.push(`∫ ${expr} d${variable}`);
            steps.push(`= ${res.toString()} + C`);
            break;

          case 'definite': {
            // Integral definida: usar nerdamer con defint
            res = nerdamer(`defint(${expr}, ${variable}, ${lowerBound}, ${upperBound})`);
            latexRes = nerdToLatex(res);
            steps.push(`∫[${lowerBound}, ${upperBound}] ${expr} d${variable}`);
            // Evaluación numérica también
            try {
              const numerical = nerdamer.evaluate(res.toString());
              steps.push(`= ${res.toString()}`);
              steps.push(`≈ ${numerical.toString()}`);
            } catch {
              steps.push(`= ${res.toString()}`);
            }
            break;
          }

          case 'limit': {
            // nerdamer no soporta límites nativamente en v1.x, usamos mathjs como fallback
            const pointNum = parseFloat(limitPoint);
            if (isNaN(pointNum)) throw new Error('Punto de límite inválido');
            const epsilon = 1e-7;
            const vals = [pointNum - epsilon, pointNum + epsilon];
            const ys = vals.map(x => {
              try { return math.evaluate(expr, { x }); } catch { return NaN; }
            });
            const avg = (ys[0] + ys[1]) / 2;
            const formatted = math.format(avg, { precision: 10 });
            res = { toString: () => formatted };
            latexRes = formatted;
            steps.push(`lim_{${variable}→${limitPoint}} ${expr}`);
            steps.push(`f(${limitPoint}⁻) ≈ ${math.format(ys[0], { precision: 8 })}`);
            steps.push(`f(${limitPoint}⁺) ≈ ${math.format(ys[1], { precision: 8 })}`);
            steps.push(`Límite ≈ ${formatted}`);
            break;
          }
        }

        setResult({
          input: expr,
          operation: opLabels[operation],
          result: res?.toString() || '',
          latexResult: latexRes,
          steps,
        });
        setError('');
      } catch (e: any) {
        setError(`Error: ${e.message || 'Expresión inválida'}`);
      } finally {
        setLoading(false);
      }
    }, 50);
  };

  const exampleExprs: Record<CASOperation, string> = {
    simplify: 'sin(x)^2 + cos(x)^2',
    expand: '(x+1)^4',
    factor: 'x^3 - 6*x^2 + 11*x - 6',
    diff: 'x^3*sin(x)',
    integral: 'x^2*e^x',
    definite: 'sin(x)',
    limit: 'sin(x)/x',
  };

  return (
    <div className="space-y-4 max-w-2xl mx-auto">
      {/* Selector de operación */}
      <div className="grid grid-cols-4 md:grid-cols-7 gap-1">
        {(Object.keys(opLabels) as CASOperation[]).map(op => (
          <button
            key={op}
            onClick={() => setOperation(op)}
            className={`p-2 rounded-xl text-[11px] font-black text-center transition-all ${
              operation === op
                ? 'bg-gradient-to-b from-violet-500 to-violet-700 text-white shadow-lg border border-violet-400'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 border border-slate-700'
            }`}
          >
            {opLabels[op]}
          </button>
        ))}
      </div>

      {/* Campo de expresión */}
      <div className="bg-slate-900 rounded-2xl border border-slate-700 p-3">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Expresión</span>
          <button
            onClick={() => setExpr(exampleExprs[operation])}
            className="text-xs text-violet-400 hover:text-violet-300"
          >
            Ejemplo: {exampleExprs[operation]}
          </button>
        </div>
        <input
          value={expr}
          onChange={e => setExpr(e.target.value)}
          placeholder="ej. x^2*sin(x), (x+1)^3, log(x,10)..."
          className="w-full bg-transparent text-violet-300 font-mono text-lg outline-none placeholder-slate-700"
          onKeyDown={e => e.key === 'Enter' && compute()}
        />
        <div className="text-xs text-slate-600 mt-1">
          Sintaxis: x^2, sin(x), cos(x), log(x,base), sqrt(x), exp(x), abs(x), pi, e
        </div>
      </div>

      {/* Opciones por operación */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2">
          <label className="text-xs text-slate-400 font-bold">Variable:</label>
          <select
            value={variable}
            onChange={e => setVariable(e.target.value)}
            className="bg-slate-800 text-white text-sm rounded-xl px-2 py-1 border border-slate-700 outline-none"
          >
            {['x', 'y', 'z', 't', 'n'].map(v => <option key={v} value={v}>{v}</option>)}
          </select>
        </div>

        {operation === 'diff' && (
          <div className="flex items-center gap-2">
            <label className="text-xs text-slate-400 font-bold">Orden:</label>
            <select
              value={diffOrder}
              onChange={e => setDiffOrder(e.target.value)}
              className="bg-slate-800 text-white text-sm rounded-xl px-2 py-1 border border-slate-700 outline-none"
            >
              {['1', '2', '3', '4', '5'].map(n => <option key={n} value={n}>{n}</option>)}
            </select>
          </div>
        )}

        {operation === 'definite' && (
          <>
            <div className="flex items-center gap-2">
              <label className="text-xs text-slate-400 font-bold">De:</label>
              <input value={lowerBound} onChange={e => setLowerBound(e.target.value)}
                className="w-16 bg-slate-800 text-white text-sm rounded-xl px-2 py-1 border border-slate-700 outline-none" />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-xs text-slate-400 font-bold">A:</label>
              <input value={upperBound} onChange={e => setUpperBound(e.target.value)}
                className="w-16 bg-slate-800 text-white text-sm rounded-xl px-2 py-1 border border-slate-700 outline-none" />
            </div>
          </>
        )}

        {operation === 'limit' && (
          <>
            <div className="flex items-center gap-2">
              <label className="text-xs text-slate-400 font-bold">{variable} →</label>
              <input value={limitPoint} onChange={e => setLimitPoint(e.target.value)}
                className="w-16 bg-slate-800 text-white text-sm rounded-xl px-2 py-1 border border-slate-700 outline-none" />
            </div>
          </>
        )}
      </div>

      <button
        onClick={compute}
        disabled={loading}
        className="w-full py-3 rounded-2xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-black text-lg hover:from-violet-500 hover:to-indigo-500 disabled:opacity-50 transition-all shadow-lg"
      >
        {loading ? '⟳ Calculando...' : `▶ ${opLabels[operation]}`}
      </button>

      {error && (
        <div className="bg-rose-950 border border-rose-700 rounded-2xl p-3 text-rose-300 font-mono text-sm">
          {error}
        </div>
      )}

      {result && (
        <div className="bg-slate-900 border border-violet-800 rounded-2xl overflow-hidden">
          {/* Resultado principal en LaTeX */}
          <div className="p-4 bg-slate-950 border-b border-slate-800">
            <div className="text-xs text-violet-400 font-bold mb-2 uppercase tracking-wider">Resultado</div>
            <KatexOutput latex={result.latexResult} className="text-white overflow-x-auto" />
          </div>

          {/* Pasos */}
          {result.steps && result.steps.length > 0 && (
            <div className="p-4">
              <div className="text-xs text-slate-500 font-bold mb-2 uppercase tracking-wider">Pasos</div>
              <div className="space-y-1">
                {result.steps.map((step, i) => (
                  <div key={i} className="flex gap-2 items-start">
                    <span className="text-violet-600 font-black text-xs mt-0.5 flex-shrink-0">{i + 1}.</span>
                    <span className="font-mono text-sm text-slate-300">{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// ════════════════════════════════════════════════════════════════
// 5. EQUATION SOLVER — Sistemas lineales, cuadráticas, polinomiales
// ════════════════════════════════════════════════════════════════
const EquationSolver: React.FC = () => {
  type EqType = 'single' | 'system2' | 'system3' | 'poly';
  const [eqType, setEqType] = useState<EqType>('single');
  const [eq1, setEq1] = useState('x^2 - 5*x + 6');
  const [eq2, setEq2] = useState('');
  const [eq3, setEq3] = useState('');
  const [variable, setVariable] = useState('x');
  const [results, setResults] = useState<string[]>([]);
  const [error, setError] = useState('');

  const solve = () => {
    setError('');
    setResults([]);
    try {
      if (eqType === 'single' || eqType === 'poly') {
        // nerdamer solve
        const sols = nerdamer.solve(eq1, variable);
        const arr: string[] = [];
        // sols puede ser un string con corchetes tipo "[val1, val2]"
        const raw = sols.toString().replace(/^\[|\]$/g, '');
        raw.split(',').forEach(s => {
          const trimmed = s.trim();
          if (trimmed) arr.push(trimmed);
        });
        if (arr.length === 0) {
          // Intentar evaluar numericamente
          const numSols = nerdamer(`solve(${eq1}, ${variable})`).evaluate();
          const raw2 = numSols.toString().replace(/^\[|\]$/g, '');
          raw2.split(',').forEach(s => { const t = s.trim(); if (t) arr.push(t); });
        }
        setResults(arr.length > 0 ? arr : ['Sin solución real']);

      } else if (eqType === 'system2') {
        // Sistema 2x2 con nerdamer
        const sol = nerdamer.solveEquations([eq1 + '=0', eq2 + '=0'], ['x', 'y']);
        const entries = Object.entries(sol as Record<string, any>);
        setResults(entries.map(([k, v]) => `${k} = ${v}`));

      } else if (eqType === 'system3') {
        const sol = nerdamer.solveEquations([eq1 + '=0', eq2 + '=0', eq3 + '=0'], ['x', 'y', 'z']);
        const entries = Object.entries(sol as Record<string, any>);
        setResults(entries.map(([k, v]) => `${k} = ${v}`));
      }
    } catch (e: any) {
      setError(`Error: ${e.message || 'No se pudo resolver'}`);
    }
  };

  const types: { id: EqType; label: string }[] = [
    { id: 'single', label: 'f(x) = 0' },
    { id: 'poly', label: 'Polinomio' },
    { id: 'system2', label: 'Sistema 2×2' },
    { id: 'system3', label: 'Sistema 3×3' },
  ];

  return (
    <div className="space-y-4 max-w-lg mx-auto">
      <div className="grid grid-cols-4 gap-2">
        {types.map(t => (
          <button key={t.id} onClick={() => setEqType(t.id)}
            className={`py-2 rounded-xl text-xs font-black transition-all ${eqType === t.id ? 'bg-sky-600 text-white border border-sky-400' : 'bg-slate-800 text-slate-400 hover:bg-slate-700 border border-slate-700'}`}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="space-y-2">
        {(eqType === 'single' || eqType === 'poly') && (
          <div className="space-y-1">
            <label className="text-xs text-slate-400 font-bold">f({variable}) =</label>
            <input value={eq1} onChange={e => setEq1(e.target.value)}
              placeholder="ej. x^2 - 5*x + 6"
              className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sky-300 font-mono outline-none focus:border-sky-500" />
            <div className="flex items-center gap-2 pt-1">
              <label className="text-xs text-slate-500">Variable:</label>
              <select value={variable} onChange={e => setVariable(e.target.value)}
                className="bg-slate-800 text-white text-sm rounded-lg px-2 py-1 border border-slate-700 outline-none">
                {['x', 'y', 'z', 't'].map(v => <option key={v}>{v}</option>)}
              </select>
            </div>
          </div>
        )}

        {(eqType === 'system2' || eqType === 'system3') && (
          <>
            {[
              { label: 'Ec. 1 (en x, y' + (eqType === 'system3' ? ', z' : '') + '):', val: eq1, set: setEq1, placeholder: 'ej. 2*x + y - 3' },
              { label: 'Ec. 2:', val: eq2, set: setEq2, placeholder: 'ej. x - y + 1' },
              ...(eqType === 'system3' ? [{ label: 'Ec. 3:', val: eq3, set: setEq3, placeholder: 'ej. x + y + z - 6' }] : []),
            ].map((field, i) => (
              <div key={i} className="space-y-1">
                <label className="text-xs text-slate-400 font-bold">{field.label} = 0</label>
                <input value={field.val} onChange={e => field.set(e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sky-300 font-mono outline-none focus:border-sky-500" />
              </div>
            ))}
          </>
        )}
      </div>

      <button onClick={solve}
        className="w-full py-3 rounded-2xl bg-gradient-to-r from-sky-600 to-cyan-600 text-white font-black text-lg hover:from-sky-500 hover:to-cyan-500 transition-all shadow-lg">
        ▶ Resolver
      </button>

      {error && <div className="bg-rose-950 border border-rose-700 rounded-xl p-3 text-rose-300 font-mono text-sm">{error}</div>}

      {results.length > 0 && (
        <div className="bg-slate-900 border border-sky-800 rounded-2xl p-4">
          <div className="text-xs text-sky-400 font-bold mb-3 uppercase tracking-wider">Soluciones</div>
          <div className="space-y-2">
            {results.map((r, i) => (
              <div key={i} className="flex items-center gap-3 bg-slate-800 rounded-xl p-3">
                <span className="text-sky-600 font-black text-sm">{eqType === 'system2' || eqType === 'system3' ? '' : `${variable}${results.length > 1 ? `₍${i + 1}₎` : ''} =`}</span>
                <span className="font-mono text-emerald-400 text-lg font-black">{r}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ════════════════════════════════════════════════════════════════
// 6. STATISTICS — Media, moda, mediana, desviación, regresión lineal
// ════════════════════════════════════════════════════════════════
const StatisticsCalc: React.FC = () => {
  const [rawData, setRawData] = useState('2, 4, 4, 4, 5, 5, 7, 9');
  const [result, setResult] = useState<Record<string, string> | null>(null);
  const [error, setError] = useState('');

  const compute = () => {
    setError('');
    try {
      const data = rawData.split(/[,\s]+/).map(v => parseFloat(v.trim())).filter(v => !isNaN(v));
      if (data.length === 0) throw new Error('Sin datos válidos');

      const n = data.length;
      const sorted = [...data].sort((a, b) => a - b);
      const mean = data.reduce((s, v) => s + v, 0) / n;
      const variance = data.reduce((s, v) => s + (v - mean) ** 2, 0) / n;
      const std = Math.sqrt(variance);
      const min = sorted[0];
      const max = sorted[n - 1];
      const median = n % 2 === 0 ? (sorted[n / 2 - 1] + sorted[n / 2]) / 2 : sorted[Math.floor(n / 2)];
      const q1 = sorted[Math.floor(n / 4)];
      const q3 = sorted[Math.floor(3 * n / 4)];

      // Moda
      const freq: Record<number, number> = {};
      data.forEach(v => { freq[v] = (freq[v] || 0) + 1; });
      const maxFreq = Math.max(...Object.values(freq));
      const modes = Object.entries(freq).filter(([, f]) => f === maxFreq).map(([v]) => v);

      setResult({
        'n': String(n),
        'Media (μ)': mean.toFixed(6),
        'Mediana': median.toFixed(6),
        'Moda': modes.join(', '),
        'Varianza (σ²)': variance.toFixed(6),
        'Desv. Est. (σ)': std.toFixed(6),
        'Mínimo': String(min),
        'Máximo': String(max),
        'Q₁': String(q1),
        'Q₃': String(q3),
        'IQR': String(q3 - q1),
        'Rango': String(max - min),
        'Suma': String(data.reduce((s, v) => s + v, 0)),
      });
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div className="space-y-4 max-w-lg mx-auto">
      <div className="space-y-2">
        <label className="text-xs text-slate-400 font-bold uppercase tracking-wider">Datos (separados por comas o espacios)</label>
        <textarea
          value={rawData}
          onChange={e => setRawData(e.target.value)}
          rows={3}
          className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-emerald-300 font-mono text-sm outline-none focus:border-emerald-500 resize-none"
        />
      </div>

      <button onClick={compute}
        className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-black text-lg hover:from-emerald-500 hover:to-teal-500 transition-all shadow-lg">
        ▶ Calcular Estadísticas
      </button>

      {error && <div className="bg-rose-950 border border-rose-700 rounded-xl p-3 text-rose-300 text-sm">{error}</div>}

      {result && (
        <div className="bg-slate-900 border border-emerald-800 rounded-2xl overflow-hidden">
          <div className="px-4 py-2 bg-slate-950 border-b border-slate-800">
            <span className="text-xs text-emerald-400 font-black uppercase tracking-wider">Resultados</span>
          </div>
          <div className="grid grid-cols-2 gap-px bg-slate-800">
            {Object.entries(result).map(([k, v]) => (
              <div key={k} className="bg-slate-900 px-4 py-3">
                <div className="text-xs text-slate-500 font-bold mb-0.5">{k}</div>
                <div className="font-mono text-emerald-400 font-black text-sm">{v}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ════════════════════════════════════════════════════════════════
// CONTENEDOR PRINCIPAL
// ════════════════════════════════════════════════════════════════
export const CalculatorSuite: React.FC = () => {
  const [mode, setMode] = useState<CalcMode>('scientific');

  const modes: { id: CalcMode; label: string; icon: string }[] = [
    { id: 'scientific', label: 'Científica', icon: '📐' },
    { id: 'standard', label: 'Básica', icon: '🔢' },
    { id: 'graphing', label: 'Gráfica', icon: '📈' },
    { id: 'cas', label: 'CAS', icon: '∑' },
    { id: 'equations', label: 'Ecuaciones', icon: '🔍' },
    { id: 'statistics', label: 'Estadística', icon: '📊' },
  ];

  return (
    <div className="space-y-4 bg-slate-950 p-4 md:p-6 rounded-[2rem] max-w-4xl mx-auto shadow-2xl min-h-screen">
      {/* Header */}
      <div className="bg-slate-900 p-4 rounded-[1.5rem] border border-slate-800">
        <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-sky-400 to-violet-400">
          SuperCalc Studio
        </h1>
        <p className="text-slate-500 text-[11px] font-bold uppercase tracking-widest mt-0.5">
          MathJS · Nerdamer CAS · React-MathQuill · KaTeX
        </p>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
        {modes.map(m => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`p-2 rounded-2xl text-center font-black text-xs transition-all duration-200 ${
              mode === m.id
                ? 'bg-gradient-to-b from-emerald-500 to-emerald-700 text-white shadow-[0_6px_20px_rgba(16,185,129,0.35)] scale-[1.03] border border-emerald-400'
                : 'bg-slate-900 text-slate-400 hover:bg-slate-800 border border-slate-800 hover:scale-[1.01]'
            }`}
          >
            <span className="text-xl block mb-1">{m.icon}</span>
            <span className="leading-tight">{m.label}</span>
          </button>
        ))}
      </div>

      {/* Panel */}
      <div className="p-4 md:p-5 bg-slate-900 rounded-[2rem] border border-slate-800 min-h-[500px]">
        {mode === 'scientific' && <ScientificVPAM />}
        {mode === 'standard' && <StandardCalc />}
        {mode === 'graphing' && <GraphingCalc />}
        {mode === 'cas' && <CasCalc />}
        {mode === 'equations' && <EquationSolver />}
        {mode === 'statistics' && <StatisticsCalc />}
      </div>
    </div>
  );
};

export default CalculatorSuite;
