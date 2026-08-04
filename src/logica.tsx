import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TopicCard: React.FC<{ icon: string; title: string; desc: string; color: string; children: React.ReactNode }> = ({ icon, title, desc, color, children }) => (
  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
    className="math-card border-l-8 mb-6 shadow-lg" style={{ borderLeftColor: color }}>
    <h2 className="text-xl md:text-2xl font-black mb-2 flex items-center gap-3">
      <span className="text-3xl md:text-4xl">{icon}</span> {title}
    </h2>
    <p className="opacity-80 font-bold mb-3 leading-relaxed text-sm">{desc}</p>
    {children}
  </motion.div>
);

const NumberSlider: React.FC<{ label: string; value: number; setValue: (n: number) => void; min: number; max: number; step?: number }> = ({ label, value, setValue, min, max, step = 1 }) => (
  <div className="space-y-1">
    <label className="font-black text-xs opacity-70">{label}: {value}</label>
    <div className="flex items-center gap-3">
      <input type="range" min={min} max={max} step={step} value={value} onChange={e => setValue(Number(e.target.value))} className="flex-1" />
      <input type="number" value={value} min={min} max={max} step={step} onChange={e => setValue(Math.max(min, Math.min(max, Number(e.target.value))))} className="w-24 p-1.5 rounded-xl border-2 border-border-color bg-surface-color font-black text-center text-sm" />
    </div>
  </div>
);

const GATES = [
  { id: 'NOT',  label: 'NOT (Negación)', sym: '¬P', unary: true,  fn: (p:boolean,_q:boolean)=>!p,         color:'#ef4444', desc:'Invierte el valor de P.' },
  { id: 'AND',  label: 'AND (Y)',        sym: 'P ∧ Q', unary: false, fn: (p:boolean,q:boolean)=>p&&q,     color:'#10b981', desc:'Solo V si ambas son verdaderas.' },
  { id: 'OR',   label: 'OR (O)',         sym: 'P ∨ Q', unary: false, fn: (p:boolean,q:boolean)=>p||q,     color:'#3b82f6', desc:'V si al menos una es verdadera.' },
  { id: 'XOR',  label: 'XOR',            sym: 'P ⊕ Q', unary: false, fn: (p:boolean,q:boolean)=>p!==q,    color:'#f59e0b', desc:'V si exactamente una es verdadera.' },
  { id: 'XNOR', label: 'XNOR',           sym: 'P ⊙ Q', unary: false, fn: (p:boolean,q:boolean)=>p===q,    color:'#8b5cf6', desc:'V si ambas son iguales.' },
  { id: 'NAND', label: 'NAND',           sym: '¬(P∧Q)', unary: false, fn: (p:boolean,q:boolean)=>!(p&&q), color:'#ec4899', desc:'Negación de AND.' },
  { id: 'NOR',  label: 'NOR',            sym: '¬(P∨Q)', unary: false, fn: (p:boolean,q:boolean)=>!(p||q), color:'#06b6d4', desc:'Negación de OR.' },
  { id: 'IMP',  label: 'Implicación',    sym: 'P → Q', unary: false, fn: (p:boolean,q:boolean)=>!p||q,    color:'#0ea5e9', desc:'Solo F cuando P es V y Q es F.' },
] as const;

const GateIcon: React.FC<{ gateId: string }> = ({ gateId }) => {
  if (gateId === 'NOT') {
    return (
      <svg viewBox="0 0 120 60" className="w-32 h-16">
        <line x1="8" y1="30" x2="25" y2="30" stroke="currentColor" strokeWidth="3"/>
        <path d="M25 14 L25 46 L62 30 Z" fill="none" stroke="currentColor" strokeWidth="3"/>
        <circle cx="72" cy="30" r="6" fill="none" stroke="currentColor" strokeWidth="3"/>
        <line x1="78" y1="30" x2="110" y2="30" stroke="currentColor" strokeWidth="3"/>
      </svg>
    );
  }
  const isAnd = ['AND','NAND'].includes(gateId);
  const isOr = ['OR','NOR','XOR','XNOR'].includes(gateId);
  const hasBubble = ['NAND','NOR','XNOR'].includes(gateId);
  return (
    <svg viewBox="0 0 120 60" className="w-32 h-16">
      <line x1="8" y1="22" x2="32" y2="22" stroke="currentColor" strokeWidth="3"/>
      <line x1="8" y1="38" x2="32" y2="38" stroke="currentColor" strokeWidth="3"/>
      {isAnd && <path d="M32 12 L32 48 L62 48 Q92 48 92 30 Q92 12 62 12 Z" fill="none" stroke="currentColor" strokeWidth="3"/>}
      {isOr && <>
        {['XOR','XNOR'].includes(gateId) && <path d="M22 12 Q38 30 22 48" fill="none" stroke="currentColor" strokeWidth="3"/>}
        <path d="M30 12 Q62 12 94 30 Q62 48 30 48 Q42 36 42 30 Q42 24 30 12 Z" fill="none" stroke="currentColor" strokeWidth="3"/>
      </>}
      {gateId === 'IMP' && <path d="M32 15 H76 V10 L100 30 L76 50 V45 H32 Z" fill="none" stroke="currentColor" strokeWidth="3"/>}
      {hasBubble
        ? <><circle cx="101" cy="30" r="6" fill="none" stroke="currentColor" strokeWidth="3"/><line x1="107" y1="30" x2="114" y2="30" stroke="currentColor" strokeWidth="3"/></>
        : <line x1="94" y1="30" x2="114" y2="30" stroke="currentColor" strokeWidth="3"/>}
    </svg>
  );
};

const TablaVerdad: React.FC = () => {
  const [p, setP] = useState(true);
  const [q, setQ] = useState(false);
  const [selectedGate, setSelectedGate] = useState('AND');
  const gate = GATES.find(g => g.id === selectedGate)!;
  const rows: [boolean,boolean][] = [[false,false],[false,true],[true,false],[true,true]];
  const V = (v: boolean) => (<span className={`px-2 py-0.5 rounded font-black text-xs ${v ? 'bg-emerald-500 text-white' : 'bg-red-500/20 text-red-600 dark:text-red-400'}`}>{v ? 'V (1)' : 'F (0)'}</span>);

  return (
    <TopicCard icon="📊" title="Tablas de Verdad y Compuertas Lógicas" color="#3b82f6"
      desc="Elige la operación lógica. La fila activa corresponde a los valores actuales de P y Q.">
      <div className="lab-container space-y-5">
        <div className="flex flex-wrap gap-2">
          {GATES.map(g => (
            <button key={g.id} onClick={() => setSelectedGate(g.id)}
              className={`px-3 py-1.5 rounded-xl font-black text-xs transition-all border-2 ${selectedGate === g.id ? 'text-white scale-105 shadow-md' : 'bg-surface-color border-border-color opacity-75 hover:opacity-100'}`}
              style={selectedGate === g.id ? { background: g.color, borderColor: g.color } : {}}>
              {g.sym}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={gate.id} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
            className="p-4 rounded-2xl flex items-center justify-between gap-4 flex-wrap"
            style={{ background: gate.color + '20', border: `2px solid ${gate.color}` }}>
            <div>
              <div className="font-black text-lg" style={{ color: gate.color }}>{gate.label}</div>
              <div className="text-sm font-bold opacity-80">{gate.desc}</div>
              <div className="font-mono font-black text-xl mt-1">{gate.sym}</div>
            </div>
            <div className="p-3 rounded-2xl bg-white/70 dark:bg-slate-900/60 shadow-inner" style={{ color: gate.color }}>
              <GateIcon gateId={gate.id} />
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="flex justify-center gap-6">
          <button onClick={() => setP(!p)} className={`px-6 py-3 rounded-2xl font-black text-lg shadow-lg transition-all ${p ? 'bg-emerald-500 text-white ring-4 ring-emerald-500/30 scale-105' : 'bg-slate-300 dark:bg-slate-700'}`}>P = {p?1:0}</button>
          {!gate.unary && <button onClick={() => setQ(!q)} className={`px-6 py-3 rounded-2xl font-black text-lg shadow-lg transition-all ${q ? 'bg-emerald-500 text-white ring-4 ring-emerald-500/30 scale-105' : 'bg-slate-300 dark:bg-slate-700'}`}>Q = {q?1:0}</button>}
        </div>

        <div className="text-center py-4 rounded-2xl border-2" style={{ borderColor: gate.color, background: gate.color + '15' }}>
          <div className="text-sm font-black opacity-70 uppercase mb-1">Resultado de {gate.sym}</div>
          <div className="text-4xl font-black" style={{ color: gate.color }}>{gate.fn(p,q) ? '1 (VERDADERO)' : '0 (FALSO)'}</div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm font-mono font-black text-center border-collapse">
            <thead>
              <tr style={{ background: gate.color + '30', borderBottom: `2px solid ${gate.color}` }}>
                <th className="p-3">P</th>
                {!gate.unary && <th className="p-3">Q</th>}
                <th className="p-3">{gate.sym}</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([ra, rb], i) => {
                if (gate.unary && i >= 2) return null;
                const isCurrent = gate.unary ? (ra === p) : (ra === p && rb === q);
                const out = gate.fn(ra, rb);
                return (
                  <motion.tr key={i} animate={{ scale: isCurrent ? 1.02 : 1 }} className={`border-b border-border-color ${isCurrent ? 'bg-emerald-500/10' : ''}`}>
                    <td className="p-3">{V(ra)}</td>
                    {!gate.unary && <td className="p-3">{V(rb)}</td>}
                    <td className="p-3">{V(out)}</td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </TopicCard>
  );
};

const VennDiagram: React.FC = () => {
  const [onlyA, setOnlyA] = useState(8);
  const [onlyB, setOnlyB] = useState(5);
  const [inter, setInter] = useState(3);
  const union = onlyA + onlyB + inter;
  const setA = onlyA + inter;
  const setB = onlyB + inter;

  return (
    <TopicCard icon="⭕" title="Teoría de Conjuntos, Venn y Euler" color="#ec4899"
      desc="Los diagramas de Venn y Euler permiten representar conjuntos, sus uniones, intersecciones, diferencias y complementos de forma visual.">
      <div className="lab-container space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <NumberSlider label="Solo A (A\\B)" value={onlyA} setValue={setOnlyA} min={0} max={20} />
          <NumberSlider label="Intersección (A∩B)" value={inter} setValue={setInter} min={0} max={20} />
          <NumberSlider label="Solo B (B\\A)" value={onlyB} setValue={setOnlyB} min={0} max={20} />
        </div>

        <div className="grid gap-4 md:grid-cols-[1.2fr_1fr] items-center">
          <div className="flex justify-center p-4 rounded-3xl bg-slate-950 border-2 border-slate-700 shadow-inner">
            <svg width="340" height="240" className="drop-shadow-lg">
              <rect width="340" height="240" rx="20" fill="#0f172a" />
              <rect x="12" y="12" width="316" height="216" rx="16" fill="none" stroke="white" strokeWidth="2" strokeDasharray="6 4" />
              <text x="18" y="30" fill="white" fontSize="11" fontWeight="bold" opacity="0.7">U = {union}</text>
              <circle cx="130" cy="120" r="72" fill="rgba(59,130,246,0.25)" stroke="#3b82f6" strokeWidth="3" />
              <circle cx="210" cy="120" r="72" fill="rgba(236,72,153,0.25)" stroke="#ec4899" strokeWidth="3" />
              <text x="85" y="60" fill="#60a5fa" fontSize="14" fontWeight="bold">A</text>
              <text x="245" y="60" fill="#f472b6" fontSize="14" fontWeight="bold">B</text>
              <text x="100" y="122" fill="#60a5fa" fontSize="22" fontWeight="bold" textAnchor="middle">{onlyA}</text>
              <text x="170" y="122" fill="#c084fc" fontSize="22" fontWeight="bold" textAnchor="middle">{inter}</text>
              <text x="240" y="122" fill="#f472b6" fontSize="22" fontWeight="bold" textAnchor="middle">{onlyB}</text>
              <text x="100" y="148" fill="#60a5fa" fontSize="11" textAnchor="middle">A\\B</text>
              <text x="170" y="148" fill="#c084fc" fontSize="11" textAnchor="middle">A∩B</text>
              <text x="240" y="148" fill="#f472b6" fontSize="11" textAnchor="middle">B\\A</text>
            </svg>
          </div>
          <div className="space-y-3">
            <div className="p-3 rounded-2xl bg-blue-500/10 border-2 border-blue-500/30">
              <div className="font-black text-blue-700 dark:text-blue-300">Cardinalidades</div>
              <div className="text-sm font-bold mt-1">n(A) = {setA}</div>
              <div className="text-sm font-bold">n(B) = {setB}</div>
              <div className="text-sm font-bold">n(A∩B) = {inter}</div>
              <div className="text-sm font-bold">n(A∪B) = {union}</div>
            </div>
            <div className="p-3 rounded-2xl bg-pink-500/10 border-2 border-pink-500/30 text-sm font-mono font-bold">
              n(A∪B) = n(A) + n(B) − n(A∩B)
              <div className="mt-1">= {setA} + {setB} − {inter}</div>
              <div className="mt-1 text-[var(--primary-color)] font-black">= {union}</div>
            </div>
            <div className="p-3 rounded-2xl bg-purple-500/10 border-2 border-purple-500/30">
              <div className="font-black text-purple-700 dark:text-purple-300 mb-2">Símbolos importantes</div>
              <ul className="text-sm font-bold space-y-1">
                <li>∈ : pertenece a</li>
                <li>⊂ : subconjunto</li>
                <li>∪ : unión</li>
                <li>∩ : intersección</li>
                <li>A\\B : diferencia</li>
                <li>A' o Aᶜ : complemento</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </TopicCard>
  );
};

const AlgebraBooleana: React.FC = () => {
  const [p, setP] = useState(true);
  const [q, setQ] = useState(false);
  const values = useMemo(() => ({
    not: !p,
    and: p && q,
    or: p || q,
    xor: p !== q,
    nand: !(p && q),
    nor: !(p || q),
    xnor: p === q,
    imp: !p || q,
  }), [p, q]);

  return (
    <TopicCard icon="0/1" title="Álgebra Booleana" color="#8b5cf6"
      desc="La álgebra booleana trabaja con valores binarios: verdadero/falso, 1/0. Es la base de la electrónica digital, la programación y las compuertas lógicas.">
      <div className="lab-container space-y-5">
        <div className="flex justify-center gap-6">
          <button onClick={() => setP(!p)} className={`px-6 py-3 rounded-2xl font-black text-lg shadow-lg transition-all ${p ? 'bg-emerald-500 text-white ring-4 ring-emerald-500/30 scale-105' : 'bg-slate-300 dark:bg-slate-700'}`}>P = {p ? '1' : '0'}</button>
          <button onClick={() => setQ(!q)} className={`px-6 py-3 rounded-2xl font-black text-lg shadow-lg transition-all ${q ? 'bg-emerald-500 text-white ring-4 ring-emerald-500/30 scale-105' : 'bg-slate-300 dark:bg-slate-700'}`}>Q = {q ? '1' : '0'}</button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            ['¬P', values.not, '#ef4444'],
            ['P ∧ Q', values.and, '#10b981'],
            ['P ∨ Q', values.or, '#3b82f6'],
            ['P ⊕ Q', values.xor, '#f59e0b'],
            ['¬(P ∧ Q)', values.nand, '#ec4899'],
            ['¬(P ∨ Q)', values.nor, '#06b6d4'],
            ['P ⊙ Q', values.xnor, '#8b5cf6'],
            ['P → Q', values.imp, '#0ea5e9'],
          ].map(([label, val, color]) => (
            <div key={label as string} className="p-3 rounded-2xl border-2 text-center" style={{ borderColor: color as string, background: `${color}20` }}>
              <div className="font-black text-sm" style={{ color: color as string }}>{label}</div>
              <div className="text-2xl font-black mt-1" style={{ color: color as string }}>{val ? '1' : '0'}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-purple-500/10 border-2 border-purple-500/30">
            <div className="font-black mb-2 text-purple-700 dark:text-purple-300">¿Qué es?</div>
            <ul className="text-sm font-bold opacity-85 space-y-1 list-disc pl-5">
              <li>Trabaja solo con dos valores: <b>0 y 1</b>.</li>
              <li>Se usa en computadoras, circuitos y condicionales lógicos.</li>
              <li>Relaciona proposiciones y decisiones.</li>
            </ul>
          </div>
          <div className="p-4 rounded-2xl bg-sky-500/10 border-2 border-sky-500/30">
            <div className="font-black mb-2 text-sky-700 dark:text-sky-300">Leyes importantes</div>
            <ul className="text-sm font-mono font-bold opacity-85 space-y-1">
              <li>P ∧ P = P</li>
              <li>P ∨ P = P</li>
              <li>P ∨ ¬P = 1</li>
              <li>P ∧ ¬P = 0</li>
              <li>¬(P ∧ Q) = ¬P ∨ ¬Q</li>
              <li>¬(P ∨ Q) = ¬P ∧ ¬Q</li>
            </ul>
          </div>
        </div>
      </div>
    </TopicCard>
  );
};

const SistemaMaya: React.FC = () => {
  const [num, setNum] = useState(199);
  const v400 = Math.floor(num / 400);
  const rem400 = num % 400;
  const v20 = Math.floor(rem400 / 20);
  const v1 = rem400 % 20;

  const MayaSymbol: React.FC<{ value: number; label?: string }> = ({ value, label }) => {
    const fives = Math.floor(value / 5);
    const ones = value % 5;
    return (
      <div className="flex flex-col items-center gap-1">
        {label && <div className="text-[9px] font-black opacity-60 uppercase">{label}</div>}
        <div className="p-3 rounded-xl border-2 border-emerald-500 bg-emerald-500/10 min-w-[64px] flex flex-col items-center gap-1.5">
          {value === 0 ? (
            <div className="w-10 h-6 rounded-full border-4 border-emerald-600 bg-emerald-200 dark:bg-emerald-900 flex items-center justify-center"><div className="w-3 h-3 rounded-full bg-emerald-500 opacity-60" /></div>
          ) : (
            <>
              {Array.from({ length: fives }).map((_, i) => (<div key={i} className="w-10 h-2 bg-emerald-600 rounded-sm" />))}
              {ones > 0 && <div className="flex gap-1.5 justify-center">{Array.from({ length: ones }).map((_, i) => (<div key={i} className="w-3.5 h-3.5 rounded-full bg-emerald-600" />))}</div>}
            </>
          )}
        </div>
        <div className="text-sm font-black opacity-80">{value}</div>
      </div>
    );
  };

  return (
    <TopicCard icon="🏛️" title="Sistema Numérico Maya (Base 20)" color="#10b981"
      desc="El sistema maya usa base 20 (vigesimal). El cero es un caracol, las unidades son puntos y las rayas valen 5.">
      <div className="lab-container space-y-5">
        <NumberSlider label="Número decimal" value={num} setValue={setNum} min={0} max={399} />
        <div className="p-4 rounded-2xl bg-surface-color border-2 border-border-color shadow">
          <div className="text-xs font-black uppercase opacity-60 mb-3 text-center">Representación Maya de {num}</div>
          <div className="flex items-end justify-center gap-6 flex-wrap">
            {v400 > 0 && <div className="flex flex-col items-center"><MayaSymbol value={v400} label="× 400" /><div className="text-[10px] font-black opacity-60 mt-1">{v400} × 400 = {v400 * 400}</div></div>}
            <div className="flex flex-col items-center"><MayaSymbol value={v20} label="× 20" /><div className="text-[10px] font-black opacity-60 mt-1">{v20} × 20 = {v20 * 20}</div></div>
            <div className="flex flex-col items-center"><MayaSymbol value={v1} label="× 1" /><div className="text-[10px] font-black opacity-60 mt-1">{v1} × 1 = {v1}</div></div>
          </div>
          <div className="text-center mt-3 font-black text-lg" style={{ color: 'var(--primary-color)' }}>{v400 > 0 ? `${v400}×400 + ` : ''}{v20}×20 + {v1} = {num}</div>
        </div>
      </div>
    </TopicCard>
  );
};

const ConversionGuide: React.FC = () => {
  const [from, setFrom] = useState<'dec'|'bin'|'oct'|'hex'>('dec');
  const [to, setTo] = useState<'dec'|'bin'|'oct'|'hex'>('bin');
  const [input, setInput] = useState('42');
  type BaseStr = 'dec'|'bin'|'oct'|'hex';
  const baseNum: Record<BaseStr,number> = { dec:10, bin:2, oct:8, hex:16 };
  const baseLabel: Record<BaseStr,string> = { dec:'Decimal (10)', bin:'Binario (2)', oct:'Octal (8)', hex:'Hexadecimal (16)' };
  const safeVal = (): number => { try { const n = parseInt(input, baseNum[from]); return isNaN(n) ? 0 : n; } catch { return 0; } };
  const steps = (): string[] => {
    const n = safeVal(); const f = from, t = to;
    if (f === t) return [`${input} ya está en ${baseLabel[t]}.`];
    if (f==='dec'&&t==='bin'){const ss=[`Convertir ${n} a binario con divisiones sucesivas por 2:`];let cur=n;let i=1;while(cur>0){ss.push(`Paso ${i++}: ${cur} ÷ 2 = ${Math.floor(cur/2)}, resto: ${cur%2}`);cur=Math.floor(cur/2);}ss.push(`Restos de ABAJO → ARRIBA: ${n.toString(2)}`);return ss;}
    if (f==='bin'&&t==='dec'){const bits=input.split('');const ss=[`Multiplicamos cada bit por 2 elevado a su posición:`];bits.reverse().forEach((bit,pos)=>{ss.push(`Bit ${pos}: ${bit} × 2^${pos} = ${parseInt(bit)*Math.pow(2,pos)}`);});ss.push(`SUMA = ${parseInt(input,2)}`);return ss;}
    if (f==='oct'&&t==='bin'){const ss=[`Cada dígito octal se convierte a 3 bits:`];input.split('').forEach(d=>{ss.push(`${d} → ${parseInt(d).toString(2).padStart(3,'0')}`);});ss.push(`Resultado: ${parseInt(input,8).toString(2)}`);return ss;}
    if (f==='hex'&&t==='bin'){const ss=[`Cada dígito hex se convierte a 4 bits:`];input.toUpperCase().split('').forEach(d=>{ss.push(`${d} → ${parseInt(d,16).toString(2).padStart(4,'0')}`);});ss.push(`Resultado: ${parseInt(input,16).toString(2)}`);return ss;}
    return [`Convirtiendo ${input} → ${parseInt(input,baseNum[f]).toString(baseNum[t]).toUpperCase()}`];
  };
  const convSteps = steps();
  const result = (() => { try { return parseInt(input, baseNum[from]).toString(baseNum[to]).toUpperCase(); } catch { return 'Error'; } })();
  const bases: BaseStr[] = ['dec','bin','oct','hex'];
  const bgMap: Record<BaseStr,string> = { dec:'#f59e0b', bin:'#10b981', oct:'#0891b2', hex:'#ec4899' };
  return (
    <TopicCard icon="🔄" title="Conversión de Bases" color="#0891b2"
      desc="Selecciona la base de origen y destino. Se genera una explicación del método usado.">
      <div className="lab-container space-y-5">
        <div className="grid grid-cols-3 gap-4 items-center">
          <div><div className="text-xs font-black uppercase opacity-60 mb-2">De:</div><div className="grid grid-cols-2 gap-1">{bases.map(b => (<button key={b} onClick={() => {setFrom(b);setInput('0');}} className="p-2 rounded-xl font-black text-xs transition-all border-2" style={{background:from===b?bgMap[b]:'transparent',color:from===b?'white':undefined,borderColor:from===b?bgMap[b]:'var(--border-color)'}}>{b.toUpperCase()}</button>))}</div></div>
          <div className="flex flex-col items-center gap-2"><div className="text-3xl">→</div><div className="p-3 rounded-2xl text-center border-2 border-border-color bg-surface-color shadow-sm"><div className="text-xs opacity-60 font-bold">Entrada</div><input value={input} onChange={e => setInput(e.target.value)} className="w-full text-center font-mono font-black text-lg bg-transparent outline-none" /></div><div className="text-center"><div className="font-black text-2xl" style={{color:'var(--primary-color)'}}>{result}</div><div className="text-[10px] opacity-60 font-bold">{baseLabel[to]}</div></div></div>
          <div><div className="text-xs font-black uppercase opacity-60 mb-2">A:</div><div className="grid grid-cols-2 gap-1">{bases.map(b => (<button key={b} onClick={() => setTo(b)} className="p-2 rounded-xl font-black text-xs transition-all border-2" style={{background:to===b?bgMap[b]:'transparent',color:to===b?'white':undefined,borderColor:to===b?bgMap[b]:'var(--border-color)'}}>{b.toUpperCase()}</button>))}</div></div>
        </div>
        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">{convSteps.map((step, i) => (<motion.div key={i} initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:i*0.08}} className={`p-3 rounded-xl border-2 font-bold text-sm ${i===0?'border-blue-500 bg-blue-500/10':i===convSteps.length-1?'border-emerald-500 bg-emerald-500/10':'border-border-color bg-surface-color'}`}>{i===0?'📌 ':i===convSteps.length-1?'✅ ':`${i}. `}{step}</motion.div>))}</div>
      </div>
    </TopicCard>
  );
};

const SistemasAntiguosInteractive: React.FC = () => {
  const [num, setNum] = useState(2024);
  const [mode, setMode] = useState<'romano'|'binario'|'hex'|'octal'>('romano');
  const toRoman = (n: number) => { const map:[string,number][]=[['M',1000],['CM',900],['D',500],['CD',400],['C',100],['XC',90],['L',50],['XL',40],['X',10],['IX',9],['V',5],['IV',4],['I',1]]; let res='',rem=n; for(const[s,v]of map){while(rem>=v){res+=s;rem-=v;}} return res||'0'; };
  return (
    <TopicCard icon="🔢" title="Sistemas Numéricos Históricos y Modernos" color="#d97706" desc="Explora distintas representaciones del mismo número.">
      <div className="lab-container space-y-4">
        <NumberSlider label="Número" value={num} setValue={setNum} min={0} max={3999} />
        <div className="flex gap-2 flex-wrap">{(['romano','binario','hex','octal'] as const).map(m => (<button key={m} onClick={() => setMode(m)} className={`px-4 py-2 rounded-xl font-black text-xs capitalize transition-all ${mode===m?'bg-[var(--primary-color)] text-white shadow':'bg-slate-200 dark:bg-slate-700'}`}>{m}</button>))}</div>
        <div className="p-6 rounded-3xl bg-surface-color border-2 border-border-color shadow text-center min-h-[100px] flex items-center justify-center">{mode==='romano'&&<div className="text-5xl font-serif font-black tracking-widest">{toRoman(num)}</div>}{mode==='binario'&&<div className="font-mono text-3xl font-black">{num.toString(2)}</div>}{mode==='hex'&&<div className="font-mono text-5xl font-black">{num.toString(16).toUpperCase()}</div>}{mode==='octal'&&<div className="font-mono text-5xl font-black">{num.toString(8)}</div>}</div>
      </div>
    </TopicCard>
  );
};

const RazonamientoLogico: React.FC = () => {
  const [step, setStep] = useState(0);
  const items = [
    { name:'Deductivo', icon:'⬇️', desc:'De lo general a lo específico.', example:['Todos los triángulos tienen 3 lados.','ABC es un triángulo.','Por tanto: ABC tiene 3 lados. ✅'] },
    { name:'Inductivo', icon:'⬆️', desc:'De lo específico a lo general.', example:['2, 4, 6, 8... son pares.','Los pares terminan en 0,2,4,6,8 ✅'] },
    { name:'Analógico', icon:'↔️', desc:'Por semejanza de casos.', example:['A:B :: C:?','2:4 :: 3:6 (× 2 en ambos casos)'] },
    { name:'Abductivo', icon:'💡', desc:'La causa más probable de un efecto.', example:['El suelo está mojado.','Conclusión más probable: llovió.'] },
  ];
  return (
    <TopicCard icon="🧠" title="Tipos de Razonamiento Matemático" color="#8b5cf6" desc="El razonamiento matemático se clasifica en cuatro tipos principales según cómo se construye la conclusión.">
      <div className="lab-container space-y-4">
        <div className="flex flex-wrap gap-2">{items.map((m, i) => (<button key={m.name} onClick={() => setStep(i)} className={`px-4 py-2 rounded-xl font-black text-sm transition-all flex items-center gap-2 ${step===i?'bg-purple-600 text-white shadow-md scale-105':'bg-slate-200 dark:bg-slate-700'}`}><span>{m.icon}</span> {m.name}</button>))}</div>
        <AnimatePresence mode="wait"><motion.div key={step} initial={{opacity:0,y:-10}} animate={{opacity:1,y:0}} exit={{opacity:0,y:10}} className="p-5 rounded-2xl bg-purple-500/10 border-2 border-purple-500/30 space-y-3"><h3 className="font-black text-lg text-purple-700 dark:text-purple-300">{items[step].icon} {items[step].name}</h3><p className="text-sm font-bold opacity-85">{items[step].desc}</p><div className="p-4 bg-white dark:bg-slate-800 rounded-xl font-mono text-sm space-y-1">{items[step].example.map((line, i) => (<div key={i} className={i===items[step].example.length-1?'font-black text-emerald-600 dark:text-emerald-400':'opacity-80'}>{line}</div>))}</div></motion.div></AnimatePresence>
      </div>
    </TopicCard>
  );
};

type LogicTab = 'verdad' | 'boleana' | 'venn' | 'maya' | 'conversiones' | 'antiguos' | 'razonamiento';

export const LogicaView: React.FC = () => {
  const [tab, setTab] = useState<LogicTab>('verdad');
  const tabs = [
    { id: 'verdad' as LogicTab, label: '📊 Compuertas Lógicas' },
    { id: 'boleana' as LogicTab, label: '0/1 Álgebra Booleana' },
    { id: 'venn' as LogicTab, label: '⭕ Venn & Conjuntos' },
    { id: 'maya' as LogicTab, label: '🏛️ Sistema Maya' },
    { id: 'conversiones' as LogicTab, label: '🔄 Conversión Bases' },
    { id: 'antiguos' as LogicTab, label: '🔢 Sistemas Numéricos' },
    { id: 'razonamiento' as LogicTab, label: '🧠 Razonamiento' },
  ];
  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20 md:pb-6">
      <div className="math-card text-white shadow-xl" style={{ background: 'var(--gradient-primary)' }}>
        <h1 className="text-2xl md:text-4xl font-black">🧠 Lógica, Sistemas Numéricos y Razonamiento</h1>
        <p className="font-bold opacity-90 mt-2 text-sm">Compuertas · Álgebra booleana · Venn/Euler · Mayas · Bases · Razonamiento.</p>
      </div>
      <div className="math-card flex gap-2 flex-wrap">{tabs.map(t => (<button key={t.id} onClick={() => setTab(t.id)} className={`px-4 py-2.5 rounded-2xl font-black text-xs md:text-sm transition-all ${tab===t.id?'bg-[var(--primary-color)] text-white shadow-lg scale-105':'bg-slate-200 dark:bg-slate-700'}`}>{t.label}</button>))}</div>
      {tab === 'verdad' && <TablaVerdad />}
      {tab === 'boleana' && <AlgebraBooleana />}
      {tab === 'venn' && <VennDiagram />}
      {tab === 'maya' && <SistemaMaya />}
      {tab === 'conversiones' && <ConversionGuide />}
      {tab === 'antiguos' && <SistemasAntiguosInteractive />}
      {tab === 'razonamiento' && <RazonamientoLogico />}
    </div>
  );
};