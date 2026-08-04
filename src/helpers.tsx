import React from 'react';

// ==========================================
// TYPES
// ==========================================
export type Theme = 
  | 'frutiger-aero' | 'sanrio-kawaii' | 'frutiger-metro' | 'frutiger-eco' 
  | 'techno' | 'aqua-y2k' | 'minimalismo' | 'vaporwave' | 'bubblegum' 
  | 'cyberpunk' | 'ocean' | 'autumn';

export type Difficulty = 
  | 'preescolar' | 'primaria-baja' | 'primaria-alta' | 'secundaria' | 'bachillerato'
  | 'basica' | 'media' | 'avanzada' 
  | 'fracciones' | 'fracciones-ops' | 'fracciones-complejas' | 'algebra' | 'geometria' | 'geometria-avanzada'
  | 'series' | 'factorial' | 'permutacion' | 'combinacion' | 'porcentaje'
  | 'divisibilidad' | 'mcm-mcd' | 'primos' | 'pitagoras' | 'cuadratica' 
  | 'sistema' | 'estadistica' | 'probabilidad' | 'potencias' | 'raices' | 'negativos'
  | 'conteo' | 'figuras' | 'valor-posicional'
  | 'polya' | 'logica' | 'romanos' | 'finanzas' | 'nomina' | 'temperatura' 
  | 'conjuntos' | 'criptografia' | 'historia' | 'conjuntos-numericos'
  | 'objetos' | 'ubicacion' | 'frac-tipos' | 'frac-simp'
  | 'ordinales' | 'medida' | 'decimales' | 'redondeo' | 'propiedad-distributiva' | 'equivalencia'
  | 'velocidad' | 'boleana' | 'diagrama-venn' | 'diagrama-arbol';

export type View = 'dashboard' | 'ejercicios' | 'aprender' | 'configuracion' | 'logros' | 'plugins' | 'formulario' | 'juegos' | 'calendario' | 'logica' | 'calculadoras';
export type GameMode = 'normal' | 'sprint' | 'supervivencia' | 'zen' | 'examen';
export type BgPattern = 'none' | 'dots' | 'grid' | 'diagonal' | 'bubbles' | 'stars' | 'waves';
export type SidebarPos = 'left' | 'right';
export type BtnShape = 'normal' | 'pill' | 'square';
export type Density = 'compact' | 'normal' | 'spacious';
export type ShadowLevel = 'none' | 'soft' | 'normal' | 'strong';
export type DeviceMode = 'pc' | 'mobile';

export interface StepByStep { title: string; explanation: string; }
export interface Exercise {
  id: number; type: string;
  question: string; answer: number | string;
  options: Array<number | string>; visual?: any;
  steps: StepByStep[];
}

export interface UserProgress {
  points: number; streak: number; level: number;
  exercisesCompleted: number; correctAnswers: number;
  achievements: string[]; lives: number;
  exercisesByType: Record<string, number>;
}

export interface Template {
  id: string; name: string; theme: Theme;
  primaryColor: string; secondaryColor: string; accentColor: string;
  fontSize: number; borderRadius: number; fontFamily: string;
  isDarkMode: boolean; bgPattern: BgPattern; sidebarPos: SidebarPos;
  btnShape: BtnShape; density: Density; transitionSpeed: number;
  shadowLevel: ShadowLevel; zoom: number; lineHeight: number;
}

// ==========================================
// CONFIGS
// ==========================================
export const themes: Record<Theme, { name: string; icon: string; description: string }> = {
  'frutiger-aero': { name: 'Frutiger Aero', icon: '🌊', description: 'Fresco y brillante' },
  'sanrio-kawaii': { name: 'Sanrio Kawaii', icon: '🎀', description: 'Hello Kitty pastel' },
  'frutiger-metro': { name: 'Frutiger Metro', icon: '🏙️', description: 'Limpio y urbano' },
  'frutiger-eco': { name: 'Frutiger Eco', icon: '🌿', description: 'Natural esmeralda' },
  'techno': { name: 'Techno Matrix', icon: '⚡', description: 'Neón futurista' },
  'aqua-y2k': { name: 'Aqua Y2K', icon: '💎', description: 'Retro 2000s' },
  'minimalismo': { name: 'Minimalismo', icon: '⚪', description: 'Limpio y elegante' },
  'vaporwave': { name: 'Vaporwave', icon: '🌴', description: 'Atardeceres 90s' },
  'bubblegum': { name: 'Bubblegum', icon: '🍬', description: 'Magenta vibrante' },
  'cyberpunk': { name: 'Cyberpunk', icon: '🤖', description: 'Distópico neón' },
  'ocean': { name: 'Ocean Deep', icon: '🌊', description: 'Azules marinos profundos' },
  'autumn': { name: 'Autumn Warm', icon: '🍂', description: 'Naranjas otoñales' },
};

export const fontFamilies = [
  { name: 'Segoe UI (Moderno)', val: "'Segoe UI', system-ui, sans-serif" },
  { name: 'Comic Sans (Kawaii)', val: "'Comic Sans MS', 'Quicksand', cursive" },
  { name: 'Courier New (Código)', val: "'Courier New', monospace" },
  { name: 'Georgia (Elegante)', val: "'Georgia', serif" },
  { name: 'Impact (Brutalista)', val: "'Impact', 'Arial Black', sans-serif" },
  { name: 'Trebuchet', val: "'Trebuchet MS', sans-serif" },
  { name: 'Verdana (Clásico)', val: "'Verdana', sans-serif" },
  { name: 'Palatino (Editorial)', val: "'Palatino', serif" }
];

export const difficultyConfig: Record<Difficulty, { name: string; icon: string; color: string; desc: string; level: string }> = {
  'preescolar': { name: 'Preescolar Mix 🧸', icon: '🧸', color: '#fbbf24', desc: 'Conteo, formas y colores básicos', level: 'preescolar' },
  'primaria-baja': { name: 'Primaria Baja Mix 🎒', icon: '🎒', color: '#22c55e', desc: '1° a 3° grado', level: 'primaria-baja' },
  'primaria-alta': { name: 'Primaria Alta Mix 📘', icon: '📘', color: '#0ea5e9', desc: '4° a 6° grado', level: 'primaria-alta' },
  'secundaria': { name: 'Secundaria Mix 📓', icon: '📓', color: '#a855f7', desc: 'Álgebra y geometría completa', level: 'secundaria' },
  'bachillerato': { name: 'Bachillerato Mix 🎓', icon: '🎓', color: '#ec4899', desc: 'Combinatoria y avanzado', level: 'bachillerato' },
  'conteo': { name: 'Conteo Visual', icon: '🔢', color: '#fbbf24', desc: 'Contar objetos del 1 al 20', level: 'preescolar' },
  'figuras': { name: 'Reconocer Figuras', icon: '🔷', color: '#f97316', desc: 'Círculo, cuadrado, triángulo', level: 'preescolar' },
  'basica': { name: 'Sumas y Restas', icon: '➕', color: '#22c55e', desc: 'Operaciones simples', level: 'primaria-baja' },
  'media': { name: 'Multiplicar y Dividir', icon: '✖️', color: '#16a34a', desc: 'Tablas y reparto', level: 'primaria-baja' },
  'valor-posicional': { name: 'Valor Posicional', icon: '🏛️', color: '#84cc16', desc: 'Unidades, decenas, centenas', level: 'primaria-baja' },
  'avanzada': { name: 'Aritmética Avanzada', icon: '🧮', color: '#0ea5e9', desc: 'Números grandes', level: 'primaria-alta' },
  'fracciones': { name: 'Fracciones Visuales', icon: '🍰', color: '#06b6d4', desc: 'Identificar pasteles', level: 'primaria-alta' },
  'fracciones-ops': { name: 'Operaciones Fracciones', icon: '➗', color: '#0891b2', desc: 'Suma, resta, mult, división', level: 'primaria-alta' },
  'divisibilidad': { name: 'Divisibilidad', icon: '✓', color: '#10b981', desc: 'Criterios 2,3,5,10', level: 'primaria-alta' },
  'mcm-mcd': { name: 'MCM y MCD', icon: '🔗', color: '#059669', desc: 'Mínimo común y máximo común', level: 'primaria-alta' },
  'primos': { name: 'Números Primos', icon: '🔐', color: '#0d9488', desc: 'Identificar primos', level: 'primaria-alta' },
  'porcentaje': { name: 'Porcentajes', icon: '%', color: '#16a34a', desc: 'Cálculo de %', level: 'primaria-alta' },
  'potencias': { name: 'Potencias', icon: '²', color: '#dc2626', desc: 'Exponentes', level: 'secundaria' },
  'raices': { name: 'Raíces', icon: '√', color: '#b91c1c', desc: 'Raíces cuadradas', level: 'secundaria' },
  'algebra': { name: 'Ecuaciones Lineales', icon: '⚖️', color: '#a855f7', desc: 'Despeje de x', level: 'secundaria' },
  'cuadratica': { name: 'Ec. Cuadráticas', icon: 'x²', color: '#9333ea', desc: 'ax²+bx+c=0', level: 'secundaria' },
  'sistema': { name: 'Sistemas 2x2', icon: '{ }', color: '#7c3aed', desc: 'Sistemas de ecuaciones', level: 'secundaria' },
  'geometria': { name: 'Áreas y Perímetros', icon: '📐', color: '#ec4899', desc: 'Figuras geométricas', level: 'secundaria' },
  'pitagoras': { name: 'Pitágoras', icon: '△', color: '#db2777', desc: 'Triángulos rectángulos', level: 'secundaria' },
  'series': { name: 'Sucesiones', icon: '🚂', color: '#eab308', desc: 'Patrones numéricos', level: 'secundaria' },
  'estadistica': { name: 'Media, Mediana, Moda', icon: '📊', color: '#0284c7', desc: 'Estadística básica', level: 'secundaria' },
  'probabilidad': { name: 'Probabilidad', icon: '🎲', color: '#0369a1', desc: 'Casos favorables', level: 'secundaria' },
  'factorial': { name: 'Factoriales', icon: '!', color: '#dc2626', desc: 'n!', level: 'bachillerato' },
  'permutacion': { name: 'Permutaciones', icon: '🔀', color: '#7c3aed', desc: 'P(n,r)', level: 'bachillerato' },
  'combinacion': { name: 'Combinaciones', icon: '🎲', color: '#0891b2', desc: 'C(n,r)', level: 'bachillerato' },
  'polya': { name: 'Resolución Polya', icon: '📝', color: '#3b82f6', desc: 'Método Polya (4 pasos)', level: 'primaria-alta' },
  'logica': { name: 'Lógica & Acertijos', icon: '🧠', color: '#8b5cf6', desc: 'Silogismos y deducciones', level: 'secundaria' },
  'romanos': { name: 'Números Romanos', icon: '🏛️', color: '#f59e0b', desc: 'Sistemas numéricos', level: 'primaria-alta' },
  'finanzas': { name: 'Finanzas & Interés', icon: '💰', color: '#10b981', desc: 'Ahorro, descuentos, IVA', level: 'secundaria' },
  'nomina': { name: 'Nómina & Salarios', icon: '📄', color: '#059669', desc: 'Salario neto y deducciones', level: 'bachillerato' },
  'temperatura': { name: 'Temperaturas', icon: '🌡️', color: '#ef4444', desc: 'Celsius, Fahrenheit, Kelvin', level: 'secundaria' },
  'conjuntos': { name: 'Teoría Conjuntos', icon: '⭕', color: '#6366f1', desc: 'Unión, Intersección, Venn', level: 'secundaria' },
  'criptografia': { name: 'Criptografía', icon: '🔐', color: '#14b8a6', desc: 'Cifrado César y claves', level: 'bachillerato' },
  'historia': { name: 'Historia & Pi', icon: '📜', color: '#f43f5e', desc: 'Grandes genios y curiosidades', level: 'secundaria' },
  'negativos': { name: 'Números Negativos', icon: '➖', color: '#2563eb', desc: 'Recta con enteros negativos', level: 'secundaria' },
  'fracciones-complejas': { name: 'Fracciones Complejas', icon: '🥪', color: '#0284c7', desc: 'División y niveles múltiples', level: 'bachillerato' },
  'geometria-avanzada': { name: 'Geometría Avanzada', icon: '🔷', color: '#e11d48', desc: 'Más figuras, áreas y perímetros', level: 'secundaria' },
  'conjuntos-numericos': { name: 'Conjuntos Numéricos', icon: '🌀', color: '#7c3aed', desc: 'N, Z, Q, R, C', level: 'secundaria' },
  'objetos': { name: 'Contar Frutas', icon: '🍎', color: '#fbbf24', desc: 'Contar objetos lúdicos', level: 'preescolar' },
  'ubicacion': { name: 'Ubicación Espacial', icon: '🏠', color: '#10b981', desc: 'Adentro y afuera', level: 'preescolar' },
  'frac-tipos': { name: 'Tipos de Fracciones', icon: '🍕', color: '#f97316', desc: 'Propias e impropias', level: 'primaria-baja' },
  'frac-simp': { name: 'Simplificar Fracciones', icon: '✂️', color: '#ef4444', desc: 'Reducción a mínima expresión', level: 'primaria-baja' },
  'ordinales': { name: 'Números Ordinales', icon: '1️⃣', color: '#fbbf24', desc: 'Primero, segundo, tercero...', level: 'preescolar' },
  'medida': { name: 'Medidas No Convencionales', icon: '📏', color: '#f97316', desc: 'Más largo, más corto, más pesado', level: 'preescolar' },
  'decimales': { name: 'Números Decimales', icon: '0.5', color: '#0ea5e9', desc: 'Décimos, centésimos, milésimos', level: 'primaria-alta' },
  'redondeo': { name: 'Redondeo', icon: '🔄', color: '#84cc16', desc: 'Redondear al entero más cercano', level: 'primaria-baja' },
  'propiedad-distributiva': { name: 'Propiedad Distributiva', icon: '📐', color: '#a855f7', desc: 'a(b+c) = ab + ac', level: 'primaria-alta' },
  'equivalencia': { name: 'Fracciones Equivalentes', icon: '🍕', color: '#f43f5e', desc: 'Simplificar y multiplicar', level: 'primaria-alta' },
  'velocidad': { name: 'Velocidad', icon: '🚗', color: '#dc2626', desc: 'v = d/t, calcular distancia y tiempo', level: 'secundaria' },
  'boleana': { name: 'Álgebra Booleana', icon: '0/1', color: '#8b5cf6', desc: 'AND, OR, NOT, XOR con datos', level: 'secundaria' },
  'diagrama-venn': { name: 'Diagramas de Venn', icon: '⭕', color: '#ec4899', desc: 'Intersección, unión y complemento visual', level: 'secundaria' },
  'diagrama-arbol': { name: 'Diagramas de Árbol', icon: '🌳', color: '#6366f1', desc: 'Conteo de combinaciones', level: 'bachillerato' },
};

// ==========================================
// MATH HELPERS
// ==========================================
export const factorial = (n: number): number => { if (n <= 1) return 1; let r = 1; for (let i = 2; i <= n; i++) r *= i; return r; };
export const permutation = (n: number, r: number): number => factorial(n) / factorial(n - r);
export const combination = (n: number, r: number): number => factorial(n) / (factorial(r) * factorial(n - r));
export const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
export const lcm = (a: number, b: number): number => (a * b) / gcd(a, b);
export const isPrime = (n: number): boolean => { if (n < 2) return false; if (n === 2) return true; if (n % 2 === 0) return false; for (let i = 3; i <= Math.sqrt(n); i += 2) if (n % i === 0) return false; return true; };
export const reduceFraction = (n: number, d: number) => { const g = gcd(Math.abs(n), Math.abs(d)); return { n: n / g, d: d / g }; };

const rand = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
// Baraja una copia del arreglo (Fisher-Yates) para que las opciones no queden siempre en el mismo orden
const shuffle = <T,>(arr: T[]): T[] => {
  const r = [...arr];
  for (let i = r.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [r[i], r[j]] = [r[j], r[i]]; }
  return r;
};
const pick = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

export const generateOptions = (correct: number): number[] => {
  // Si la respuesta no es negativa, los distractores tampoco (evita ofrecer "-3" a un niño)
  const floorVal = correct >= 0 ? 0 : -Infinity;
  const options = new Set<number>([correct]);
  let attempts = 0;
  while (options.size < 4 && attempts < 100) {
    attempts++;
    const range = Math.max(5, Math.floor(Math.abs(correct) / 3) || 5);
    const val = correct + rand(-range, range);
    if (val !== correct && val >= floorVal && !options.has(val)) options.add(val);
  }
  let extra = 1;
  while (options.size < 4 && extra < 200) {
    if (!options.has(correct + extra)) options.add(correct + extra);
    else if (correct - extra >= floorVal && !options.has(correct - extra)) options.add(correct - extra);
    extra++;
  }
  return shuffle(Array.from(options)); // Fisher-Yates: la correcta cae en cualquier posición por igual
};

// ==========================================
// EXERCISE GENERATION — complete switch
// ==========================================
export const generateExercise = (difficulty: Difficulty, id: number): Exercise => {
  let actualDiff: Difficulty | string = difficulty;
  if (difficulty === 'preescolar') actualDiff = pick([
    'kids-cantidades',
    'kids-pocos',
    'kids-todos-algunos',
    'kids-emparejar',
    'kids-diferencias',
    'kids-tamano',
    'kids-falta',
    'kids-cero',
    'kids-dedos',
    'kids-sonidos',
    'kids-dado',
    'kids-bingo',
    'kids-patron',
    'kids-dinero',
    'kids-datos',
    'kids-posicion',
    'kids-mitades',
    'kids-antes',
    'conteo',
    'figuras',
    'objetos',
    'ubicacion',
    'ordinales',
    'medida'
  ]);
  else if (difficulty === 'primaria-baja') actualDiff = pick(['basica','media','valor-posicional','fracciones','frac-tipos','frac-simp','redondeo'] as Difficulty[]);
  else if (difficulty === 'primaria-alta') actualDiff = pick(['avanzada','fracciones-ops','divisibilidad','primos','mcm-mcd','porcentaje','polya','romanos','decimales','propiedad-distributiva','equivalencia'] as Difficulty[]);
  else if (difficulty === 'secundaria') actualDiff = pick(['algebra','geometria','geometria-avanzada','pitagoras','cuadratica','sistema','potencias','estadistica','probabilidad','series','logica','finanzas','temperatura','conjuntos','conjuntos-numericos','historia','negativos','velocidad','boleana','diagrama-venn'] as Difficulty[]);
  else if (difficulty === 'bachillerato') actualDiff = pick(['factorial','permutacion','combinacion','cuadratica','sistema','nomina','criptografia','fracciones-complejas','diagrama-arbol'] as Difficulty[]);

  let type = actualDiff as string;
  let a = 0, b = 0, answer = 0, question = '', visual: any = null;
  let steps: StepByStep[] = [];

  switch (actualDiff) {

    case 'kids-cantidades': {
      const few = rand(2, 5);
      const many = rand(7, 10);
      const manyRight = Math.random() < 0.5;   // ¿la caja con MÁS es la B?
      const left = manyRight ? few : many;
      const right = manyRight ? many : few;
      const answer = manyRight ? 'Caja B' : 'Caja A';
      return {
        id,
        type: 'kids-cantidades',
        question: '¿En qué caja hay muchos objetos?',
        answer,
        options: ['Caja A', 'Caja B'],
        visual: { type: 'kids', kind: 'compare-counts', left, right, leftIcon: '🔴', rightIcon: '🔵' },
        steps: [
          { title: 'Observa', explanation: 'Mira las dos cajas.' },
          { title: 'Compara', explanation: 'La caja con más bolitas tiene muchos objetos.' },
          { title: 'Respuesta', explanation: 'La ' + answer.toLowerCase() + ' tiene ' + many + ' objetos: son muchos.' }
        ]
      };
    }

    case 'kids-pocos': {
      const few = rand(1, 3);
      const many = rand(6, 9);
      const fewRight = Math.random() < 0.5;    // ¿la caja con MENOS es la B?
      const left = fewRight ? many : few;
      const right = fewRight ? few : many;
      const answer = fewRight ? 'Caja B' : 'Caja A';
      return {
        id,
        type: 'kids-pocos',
        question: '¿En qué caja hay pocos objetos?',
        answer,
        options: ['Caja A', 'Caja B'],
        visual: { type: 'kids', kind: 'compare-counts', left, right, leftIcon: '🟡', rightIcon: '🟢' },
        steps: [
          { title: 'Observa', explanation: 'Mira cuántos objetos tiene cada caja.' },
          { title: 'Pocos', explanation: 'Pocos significa que hay una cantidad pequeña.' },
          { title: 'Respuesta', explanation: 'La ' + answer.toLowerCase() + ' tiene solo ' + few + ': son pocos.' }
        ]
      };
    }

    case 'kids-todos-algunos': {
      const scenes = [
        { answer: 'Todos', items: ['🍎','🍎','🍎','🍎'], question: '¿Cuántos son manzanas?' },
        { answer: 'Algunos', items: ['🍎','🍌','🍎','🍇'], question: '¿Cuántos son manzanas?' },
        { answer: 'Ninguno', items: ['🍌','🍇','🍓','🍊'], question: '¿Cuántos son manzanas?' }
      ];
      const s = pick(scenes);
      return {
        id,
        type: 'kids-todos-algunos',
        question: s.question,
        answer: s.answer,
        options: ['Todos', 'Algunos', 'Ninguno'],
        visual: { type: 'kids', kind: 'items', items: s.items },
        steps: [
          { title: 'Todos', explanation: 'Todos significa que cada objeto cumple.' },
          { title: 'Algunos', explanation: 'Algunos significa que solo una parte cumple.' },
          { title: 'Ninguno', explanation: 'Ninguno significa cero objetos de ese tipo.' }
        ]
      };
    }

    case 'kids-emparejar': {
      const models = [
        { model: '🧦', answer: '🧦 Calcetín', options: ['🧦 Calcetín', '🚗 Carro', '⭐ Estrella', '🔺 Triángulo'] },
        { model: '🔺', answer: '🔺 Triángulo', options: ['🟦 Cuadrado', '🔺 Triángulo', '⚽ Pelota', '🧸 Oso'] },
        { model: '🍎', answer: '🍎 Manzana', options: ['🍌 Plátano', '🍎 Manzana', '🍇 Uva', '🍓 Fresa'] }
      ];
      const m = pick(models);
      return {
        id,
        type: 'kids-emparejar',
        question: '¿Cuál objeto es igual al modelo?',
        answer: m.answer,
        options: shuffle(m.options),
        visual: { type: 'kids', kind: 'model-choice', model: m.model },
        steps: [
          { title: 'Mira el modelo', explanation: 'Observa la forma, color o dibujo.' },
          { title: 'Busca el igual', explanation: 'Elige el objeto que se ve igual.' }
        ]
      };
    }

    case 'kids-diferencias': {
      const CATALOGO = [
        { name: 'El sol',    from: '☀️', to: '🌙' },
        { name: 'La casa',   from: '🏠', to: '🏡' },
        { name: 'La pelota', from: '⚽', to: '🏀' },
        { name: 'La flor',   from: '🌷', to: '🌻' },
      ];
      const changed = rand(0, CATALOGO.length - 1);   // ¿cuál cambia?
      const a = CATALOGO.map(o => o.from);
      const b = CATALOGO.map((o, i) => (i === changed ? o.to : o.from));
      const answer = CATALOGO[changed].name;
      return {
        id,
        type: 'kids-diferencias',
        question: '¿Qué cambió entre los dos dibujos?',
        answer,
        options: shuffle(CATALOGO.map(o => o.name)),
        visual: { type: 'kids', kind: 'differences', a, b },
        steps: [
          { title: 'Compara', explanation: 'Mira el dibujo A y luego el dibujo B.' },
          { title: 'Encuentra el cambio', explanation: answer + ' cambió de ' + CATALOGO[changed].from + ' a ' + CATALOGO[changed].to + '.' }
        ]
      };
    }

    case 'kids-tamano': {
      const askBig = Math.random() > 0.5;
      return {
        id,
        type: 'kids-tamano',
        question: askBig ? '¿Cuál oso es el más grande?' : '¿Cuál oso es el más pequeño?',
        answer: askBig ? 'Grande' : 'Pequeño',
        options: ['Pequeño', 'Mediano', 'Grande'],
        visual: { type: 'kids', kind: 'sizes' },
        steps: [
          { title: 'Observa los tamaños', explanation: 'Compara alto y ancho.' },
          { title: 'Respuesta', explanation: askBig ? 'El oso grande es el más grande.' : 'El osito pequeño es el más pequeño.' }
        ]
      };
    }

    case 'kids-falta': {
      const seqs = [
        { sequence: ['🔴','🔵','❔','🔵'], answer: '🔴' },
        { sequence: ['⭐','🟦','⭐','❔'], answer: '🟦' },
        { sequence: ['🍎','🍌','🍎','❔'], answer: '🍌' }
      ];
      const s = pick(seqs);
      return {
        id,
        type: 'kids-falta',
        question: '¿Qué objeto falta?',
        answer: s.answer,
        options: ['🔴', '🔵', '⭐', '🟦', '🍎', '🍌'],
        visual: { type: 'kids', kind: 'missing', sequence: s.sequence },
        steps: [
          { title: 'Mira la serie', explanation: 'Busca qué objeto falta para completar el patrón.' }
        ]
      };
    }

    case 'kids-cero': {
      return {
        id,
        type: 'kids-cero',
        question: 'Si la caja está vacía, ¿cuántos juguetes hay?',
        answer: 0,
        options: [0, 1, 2, 3],
        visual: { type: 'kids', kind: 'empty-box' },
        steps: [
          { title: 'Caja vacía', explanation: 'No hay juguetes dentro.' },
          { title: 'Cero', explanation: 'Cuando no hay nada, decimos cero.' }
        ]
      };
    }

    case 'kids-dedos': {
      const n = rand(1, 5);
      return {
        id,
        type: 'kids-dedos',
        question: '¿Qué número representan los dedos?',
        answer: n,
        options: [1, 2, 3, 4, 5],
        visual: { type: 'kids', kind: 'number-icons', icon: '☝️', n },
        steps: [
          { title: 'Cuenta los dedos', explanation: 'Cuenta cada dedo levantado.' },
          { title: 'Total', explanation: 'Ese es el número representado.' }
        ]
      };
    }

    case 'kids-sonidos': {
      const n = rand(1, 6);
      return {
        id,
        type: 'kids-sonidos',
        question: '¿Cuántas veces sonó el tambor?',
        answer: n,
        options: [1, 2, 3, 4, 5, 6],
        visual: { type: 'kids', kind: 'number-icons', icon: '🥁', n },
        steps: [
          { title: 'Cuenta sonidos', explanation: 'Cada tambor representa un golpe.' }
        ]
      };
    }

    case 'kids-dado': {
      const n = rand(1, 6);
      return {
        id,
        type: 'kids-dado',
        question: '¿Qué número muestra el dado?',
        answer: n,
        options: [1, 2, 3, 4, 5, 6],
        visual: { type: 'kids', kind: 'dice', n },
        steps: [
          { title: 'Subitización', explanation: 'Intenta reconocer los puntos sin contar uno por uno.' }
        ]
      };
    }

    case 'kids-bingo': {
      const max = pick([5, 10]);
      const called = rand(1, max);
      return {
        id,
        type: 'kids-bingo',
        question: 'Bingo: ¿qué número está marcado?',
        answer: called,
        options: shuffle([called, ...shuffle(Array.from({ length: max }, (_, i) => i + 1).filter(x => x !== called)).slice(0, 3)]),
        visual: { type: 'kids', kind: 'bingo', max, called },
        steps: [
          { title: 'Mira el tablero', explanation: 'El número marcado está resaltado.' }
        ]
      };
    }

    case 'kids-patron': {
      const patterns = [
        { sequence: ['🔴','🔵','🔴','🔵'], answer: '🔴' },
        { sequence: ['🟡','🟡','🟢','🟡','🟡'], answer: '🟢' },
        { sequence: ['🔺','🟦','⭐','🔺','🟦'], answer: '⭐' }
      ];
      const p = pick(patterns);
      return {
        id,
        type: 'kids-patron',
        question: '¿Qué sigue en el patrón?',
        answer: p.answer,
        options: ['🔴', '🔵', '🟡', '🟢', '🔺', '🟦', '⭐'],
        visual: { type: 'kids', kind: 'pattern', sequence: p.sequence },
        steps: [
          { title: 'Repite el ritmo', explanation: 'Mira cómo se repiten las figuras.' }
        ]
      };
    }

    case 'kids-dinero': {
      const items = [
        { icon: '🪙', label: 'Moneda de 1 peso', answer: '$1' },
        { icon: '🪙', label: 'Moneda de 2 pesos', answer: '$2' },
        { icon: '🪙', label: 'Moneda de 5 pesos', answer: '$5' },
        { icon: '💵', label: 'Billete de 20 pesos', answer: '$20' },
        { icon: '💵', label: 'Billete de 50 pesos', answer: '$50' }
      ];
      const item = pick(items);
      return {
        id,
        type: 'kids-dinero',
        question: '¿Cuánto vale este dinero?',
        answer: item.answer,
        options: ['$1', '$2', '$5', '$10', '$20', '$50'],
        visual: { type: 'kids', kind: 'money', icon: item.icon, label: item.label },
        steps: [
          { title: 'Observa el valor', explanation: 'Mira el número escrito en la moneda o billete.' }
        ]
      };
    }

    case 'kids-datos': {
      const bars = [
        { label: 'Manzana', icon: '🍎', n: rand(2, 4), color: '#ef4444' },
        { label: 'Plátano', icon: '🍌', n: rand(5, 7), color: '#eab308' },
        { label: 'Uva', icon: '🍇', n: rand(1, 3), color: '#8b5cf6' }
      ];
      const most = bars.reduce((a, b) => b.n > a.n ? b : a);
      return {
        id,
        type: 'kids-datos',
        question: '¿De cuál fruta hay más votos?',
        answer: most.label,
        options: bars.map(b => b.label),
        visual: { type: 'kids', kind: 'bar-chart', bars },
        steps: [
          { title: 'Mira las torres', explanation: 'La torre más alta tiene más votos.' }
        ]
      };
    }

    case 'kids-posicion': {
      const inside = Math.random() > 0.5;
      return {
        id,
        type: 'kids-posicion',
        question: '¿Dónde está la pelota?',
        answer: inside ? 'Dentro' : 'Fuera',
        options: ['Dentro', 'Fuera'],
        visual: { type: 'kids', kind: 'position', inside },
        steps: [
          { title: 'Observa la caja', explanation: inside ? 'La pelota está dentro de la caja.' : 'La pelota está fuera de la caja.' }
        ]
      };
    }

    case 'kids-mitades': {
      return {
        id,
        type: 'kids-mitades',
        question: 'Si parto una pizza por la mitad, ¿cuántas mitades quedan?',
        answer: '2 mitades',
        options: ['1 mitad', '2 mitades', '3 mitades', '4 mitades'],
        visual: { type: 'kids', kind: 'pizza' },
        steps: [
          { title: 'Mitad', explanation: 'Partir a la mitad crea dos partes iguales.' }
        ]
      };
    }

    case 'kids-antes': {
      return {
        id,
        type: 'kids-antes',
        question: '¿Qué número va antes del 4?',
        answer: 3,
        options: [1, 2, 3, 5],
        visual: { type: 'kids', kind: 'missing', sequence: ['1', '2', '3', '4', '5'] },
        steps: [
          { title: 'Cuenta en orden', explanation: '1, 2, 3, 4. Antes del 4 va el 3.' }
        ]
      };
    }

    case 'conteo': { const n = rand(1,15); answer = n; question = `¿Cuántos objetos cuentas?`; visual = { type: 'counting', n }; steps = [{ title: 'Cuenta uno por uno', explanation: `Toca cada objeto y cuenta: 1, 2, 3...` },{ title: 'Total', explanation: `Hay ${answer} objetos en total.` }]; type = 'conteo'; break; }
    case 'figuras': { const shapes = ['círculo','cuadrado','triángulo','rectángulo']; const sIdx = rand(0,3); answer = sIdx; question = `¿Qué figura ves dibujada?`; visual = { type: 'shape-quiz', shape: shapes[sIdx] }; steps = [{ title: 'Observa los lados', explanation: `Cuenta los lados o curvas.` },{ title: 'Identifica', explanation: `Esta figura es un ${shapes[sIdx]}.` }]; return { id, type: 'figuras', question, answer, options: [0,1,2,3], visual, steps }; }
    case 'basica': { const isAdd = Math.random() > 0.5; if (isAdd) { a = rand(1,20); b = rand(1,15); answer = a+b; question = `${a} + ${b} = ?`; visual = { type: 'number-line', start: Math.max(0,a-2), end: answer+3, current: a, jump: b }; steps = [{ title: 'Punto de inicio', explanation: `Empezamos en ${a}.` },{ title: 'Avanzar', explanation: `Sumamos ${b}.` },{ title: 'Resultado', explanation: `Llegamos al ${answer}.` }]; type = 'suma'; } else { a = rand(10,30); b = rand(1,a-1); answer = a-b; question = `${a} - ${b} = ?`; visual = { type: 'number-line', start: Math.max(0,answer-3), end: a+3, current: a, jump: -b }; steps = [{ title: 'Paso 1', explanation: `Tenemos ${a}.` },{ title: 'Paso 2', explanation: `Quitamos ${b}.` },{ title: 'Resultado', explanation: `Quedan ${answer}.` }]; type = 'resta'; } break; }
    case 'media': { const isMul = Math.random() > 0.5; if (isMul) { a = rand(2,12); b = rand(2,10); answer = a*b; question = `${a} × ${b} = ?`; visual = { type: 'grid', rows: Math.min(a,8), cols: Math.min(b,8), total: answer }; steps = [{ title: 'Multiplicación', explanation: `${a} × ${b} es sumar ${a} un total de ${b} veces.` },{ title: 'Resultado', explanation: `El producto es ${answer}.` }]; type = 'multiplicacion'; } else { b = rand(2,9); answer = rand(2,10); a = answer*b; question = `${a} ÷ ${b} = ?`; visual = { type: 'groups', total: a, groups: b }; steps = [{ title: 'División', explanation: `Reparte ${a} en ${b} grupos iguales.` },{ title: 'Resultado', explanation: `Cada grupo tiene ${answer}.` }]; type = 'division'; } break; }
    case 'valor-posicional': { const num = rand(100,999); const placeIdx = rand(0,2); const places = ['unidades','decenas','centenas']; const digits = num.toString().split('').map(Number); answer = digits[2-placeIdx]; question = `En el número ${num}, ¿qué dígito está en las ${places[placeIdx]}?`; visual = { type: 'place-value', num }; steps = [{ title: 'Desglose', explanation: `${num} = ${digits[0]}×100 + ${digits[1]}×10 + ${digits[2]}×1` },{ title: 'Identificar', explanation: `Las ${places[placeIdx]} corresponden al dígito ${answer}.` }]; type = 'valor-posicional'; break; }
    case 'avanzada': { const op = pick(['suma','resta','multiplicacion','division']); if (op==='suma'){a=rand(100,500);b=rand(50,300);answer=a+b;question=`${a} + ${b} = ?`;} else if(op==='resta'){a=rand(200,800);b=rand(50,a-50);answer=a-b;question=`${a} - ${b} = ?`;} else if(op==='multiplicacion'){a=rand(12,30);b=rand(11,20);answer=a*b;question=`${a} × ${b} = ?`;} else{b=rand(3,12);answer=rand(15,50);a=answer*b;question=`${a} ÷ ${b} = ?`;} steps=[{title:'Identifica',explanation:`Operación: ${question.replace(' = ?','')}`},{title:'Calcula',explanation:`Hazlo mentalmente o por columnas.`},{title:'Resultado',explanation:`= ${answer}`}]; type=`avanzada-${op}`; break; }
    case 'fracciones': { const den=rand(3,8); const num=rand(1,den-1); answer=num; question=`¿Cuántas partes están coloreadas?\n( ? / ${den} )`; visual={type:'fraction',numerator:num,denominator:den}; steps=[{title:'Denominador',explanation:`El pastel tiene ${den} partes iguales.`},{title:'Numerador',explanation:`Cuenta las coloreadas: ${answer}.`}]; type='fraccion'; break; }
    case 'fracciones-ops': { const op=pick(['suma','resta','mult','div'] as const); const d1=rand(2,6),d2=rand(2,6); const n1=rand(1,d1),n2=rand(1,d2); if(op==='suma'){const common=d1*d2;answer=n1*d2+n2*d1;question=`${n1}/${d1} + ${n2}/${d2} = ? / ${common}`;steps=[{title:'Común',explanation:`${d1}×${d2}=${common}`},{title:'Equivalentes',explanation:`${n1*d2}/${common} + ${n2*d1}/${common}`},{title:'Suma',explanation:`= ${answer}/${common}`}];visual={type:'fraction-ops',op:'+',n1,d1,n2,d2,result:{n:answer,d:common}};} else if(op==='resta'){const common=d1*d2;answer=Math.abs(n1*d2-n2*d1);question=`${n1}/${d1} − ${n2}/${d2} = ? / ${common}`;steps=[{title:'Común',explanation:`${d1}×${d2}=${common}`},{title:'Restar',explanation:`${n1*d2}/${common} − ${n2*d1}/${common} = ${answer}/${common}`}];visual={type:'fraction-ops',op:'−',n1,d1,n2,d2,result:{n:answer,d:common}};} else if(op==='mult'){answer=n1*n2;question=`${n1}/${d1} × ${n2}/${d2} = ? / ${d1*d2}`;steps=[{title:'Multiplicar arriba',explanation:`${n1}×${n2}=${answer}`},{title:'Multiplicar abajo',explanation:`${d1}×${d2}=${d1*d2}`}];visual={type:'fraction-ops',op:'×',n1,d1,n2,d2,result:{n:answer,d:d1*d2}};} else{answer=n1*d2;question=`${n1}/${d1} ÷ ${n2}/${d2} = ? / ${d1*n2}`;steps=[{title:'Invierte y multiplica',explanation:`${n1}/${d1} × ${d2}/${n2}`},{title:'Multiplicar',explanation:`= ${answer}/${d1*n2}`}];visual={type:'fraction-ops',op:'÷',n1,d1,n2,d2,result:{n:answer,d:d1*n2}};} type=`frac-${op}`; break; }
    case 'divisibilidad': { const divisor=pick([2,3,5,10]); const isDiv=Math.random()>0.5; let num=rand(20,200); if(isDiv)num=Math.floor(num/divisor)*divisor; else{while(num%divisor===0)num++;} answer=num%divisor===0?1:0; question=`¿Es ${num} divisible por ${divisor}?`; visual={type:'divisibility',num,divisor}; const reglas:Record<number,string>={2:'termina en 0,2,4,6 u 8',3:'la suma de sus dígitos es múltiplo de 3',5:'termina en 0 o 5',10:'termina en 0'}; steps=[{title:`Regla del ${divisor}`,explanation:`Un número es divisible por ${divisor} si ${reglas[divisor]}.`},{title:'Comprobar',explanation:`${num} ÷ ${divisor} = ${(num/divisor).toFixed(2)}`},{title:'Conclusión',explanation:answer===1?`Sí, ${num} es divisible por ${divisor}.`:`No, ${num} NO es divisible por ${divisor}.`}]; type='divisibilidad'; return{id,type,question,answer,options:[0,1],visual,steps}; }
    case 'mcm-mcd': { const isMCM=Math.random()>0.5; a=rand(4,20);b=rand(4,20); if(isMCM){answer=lcm(a,b);question=`Calcula el MCM de ${a} y ${b}`;steps=[{title:'MCM',explanation:`El mínimo común múltiplo es el menor número que es múltiplo de ambos.`},{title:'Fórmula',explanation:`MCM(${a},${b}) = (${a}×${b}) ÷ MCD(${a},${b}) = ${a*b} ÷ ${gcd(a,b)}`},{title:'Resultado',explanation:`MCM = ${answer}`}];type='mcm';} else{answer=gcd(a,b);question=`Calcula el MCD de ${a} y ${b}`;steps=[{title:'MCD',explanation:`El máximo común divisor es el mayor número que divide a ambos.`},{title:'Algoritmo Euclides',explanation:`Divide el mayor entre el menor y repite con los restos.`},{title:'Resultado',explanation:`MCD = ${answer}`}];type='mcd';} visual={type:'mcm-mcd',a,b,isMCM}; break; }
    case 'primos': { const PRIMOS=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47]; const COMPUESTOS=[4,6,8,9,10,12,14,15,16,18,20,21,22,24,25,26,27,28,30,32,33,34,35,36,38,39,40,42,44,45,46,48,49,50]; const candidate=Math.random()<0.5?pick(PRIMOS):pick(COMPUESTOS); answer=isPrime(candidate)?1:0; question=`¿Es ${candidate} un número primo?`; visual={type:'prime',n:candidate}; const divisores:number[]=[]; for(let i=1;i<=candidate;i++)if(candidate%i===0)divisores.push(i); steps=[{title:'Definición',explanation:`Un primo solo tiene 2 divisores: 1 y él mismo.`},{title:'Divisores de '+candidate,explanation:`Son: ${divisores.join(', ')}`},{title:'Conclusión',explanation:answer===1?`Sí, ${candidate} es PRIMO.`:`No, ${candidate} tiene más de 2 divisores.`}]; return{id,type:'primos',question,answer,options:[0,1],visual,steps}; }
    case 'porcentaje': { const base=rand(2,20)*10; const pct=pick([10,20,25,50,75]); answer=Math.round((base*pct)/100); question=`¿Cuánto es el ${pct}% de ${base}?`; visual={type:'percent',total:base,pct}; steps=[{title:'Fórmula',explanation:`% de N = (% × N) ÷ 100`},{title:'Sustituir',explanation:`(${pct} × ${base}) ÷ 100`},{title:'Resultado',explanation:`= ${answer}`}]; type='porcentaje'; break; }
    case 'potencias': { const base2=rand(2,8); const exp=rand(2,5); answer=Math.pow(base2,exp); question=`Calcula: ${base2}^${exp}`; visual={type:'power',base:base2,exp}; steps=[{title:'Definición',explanation:`${base2}^${exp} = ${base2} multiplicado por sí mismo ${exp} veces`},{title:'Desarrollo',explanation:Array(exp).fill(base2).join(' × ')+` = ${answer}`}]; type='potencias'; break; }
    case 'raices': { const root=rand(2,15); answer=root; question=`Calcula: √${root*root}`; visual={type:'sqrt',n:root*root}; steps=[{title:'Pregunta',explanation:`¿Qué número multiplicado por sí mismo da ${root*root}?`},{title:'Respuesta',explanation:`${root} × ${root} = ${root*root}`},{title:'Resultado',explanation:`√${root*root} = ${answer}`}]; type='raices'; break; }
    case 'algebra': { const xVal=rand(1,12); const coef=rand(2,6); const constant=rand(1,20); const total=coef*xVal+constant; answer=xVal; question=`Encuentra 'x':\n${coef}x + ${constant} = ${total}`; visual={type:'balance',leftCoef:coef,leftConst:constant,rightConst:total}; steps=[{title:'Aislar x',explanation:`${coef}x = ${total-constant}`},{title:'Dividir',explanation:`x = ${total-constant} ÷ ${coef}`},{title:'Resultado',explanation:`x = ${answer}`}]; type='ecuacion'; break; }
    case 'cuadratica': { const r1=rand(1,6); const r2=rand(1,6); const sumR=r1+r2; const prodR=r1*r2; answer=Math.max(r1,r2); question=`Encuentra la solución mayor de:\nx² − ${sumR}x + ${prodR} = 0`; visual={type:'quadratic',a:1,b:-sumR,c:prodR}; steps=[{title:'Factorizar',explanation:`Buscamos 2 números que sumen ${sumR} y multipliquen ${prodR}`},{title:'Factores',explanation:`Son ${r1} y ${r2}: (x−${r1})(x−${r2}) = 0`},{title:'Soluciones',explanation:`x = ${r1} o x = ${r2}. La mayor es ${answer}.`}]; type='cuadratica'; break; }
    case 'sistema': { const x=rand(2,10); const y=rand(1,x-1); const s=x+y; const d=x-y; answer=x; question=`Sistema:\n x + y = ${s}\n x − y = ${d}\n\n¿Cuánto vale x?`; visual={type:'system',s,d}; steps=[{title:'Sumar ecuaciones',explanation:`(x+y) + (x−y) = ${s} + ${d}\n2x = ${s+d}`},{title:'Despejar x',explanation:`x = ${s+d} ÷ 2 = ${answer}`},{title:'Resultado',explanation:`x = ${answer}, y = ${y}`}]; type='sistema'; break; }
    case 'geometria': { const fig=pick(['rectangulo','triangulo','circulo'] as const); if(fig==='rectangulo'){const base2=rand(3,15),h=rand(2,10);answer=base2*h;question=`Área del RECTÁNGULO:\nBase=${base2}cm, Altura=${h}cm`;visual={type:'shape',shape:'rectangulo',w:base2,h};steps=[{title:'Fórmula',explanation:`A = base × altura`},{title:'Sustituir',explanation:`A = ${base2} × ${h} = ${answer} cm²`}];} else if(fig==='triangulo'){const base2=rand(4,14)*2;const h=rand(3,10);answer=(base2*h)/2;question=`Área del TRIÁNGULO:\nBase=${base2}cm, Altura=${h}cm`;visual={type:'shape',shape:'triangulo',w:base2,h};steps=[{title:'Fórmula',explanation:`A = (b × h) / 2`},{title:'Sustituir',explanation:`A = (${base2} × ${h}) / 2 = ${answer} cm²`}];} else{const r=rand(2,8);answer=Math.round(3.14*r*r);question=`Área del CÍRCULO:\nRadio=${r}cm (π≈3.14)`;visual={type:'shape',shape:'circulo',w:r,h:r};steps=[{title:'Fórmula',explanation:`A = π × r²`},{title:'Sustituir',explanation:`A ≈ 3.14 × ${r*r} ≈ ${answer} cm²`}];} type=`geo-${fig}`; break; }
    case 'pitagoras': { const triples=[[3,4,5],[6,8,10],[5,12,13],[8,15,17],[9,12,15],[7,24,25]]; const[aa,bb,cc]=pick(triples); const findHyp=Math.random()>0.5; if(findHyp){answer=cc;question=`Triángulo rectángulo:\nCatetos: a=${aa}, b=${bb}\n¿Cuánto vale la hipotenusa c?`;steps=[{title:'Teorema',explanation:`a² + b² = c²`},{title:'Sustituir',explanation:`${aa}² + ${bb}² = c² → ${aa*aa} + ${bb*bb} = c²`},{title:'Resultado',explanation:`c² = ${aa*aa+bb*bb}, c = √${aa*aa+bb*bb} = ${cc}`}];} else{answer=bb;question=`Triángulo rectángulo:\nCateto a=${aa}, hipotenusa c=${cc}\n¿Cuánto vale el cateto b?`;steps=[{title:'Teorema',explanation:`a² + b² = c² → b² = c² − a²`},{title:'Sustituir',explanation:`b² = ${cc*cc} − ${aa*aa} = ${cc*cc-aa*aa}`},{title:'Resultado',explanation:`b = √${cc*cc-aa*aa} = ${bb}`}];} visual={type:'pitagoras',a:aa,b:bb,c:cc,findHyp}; type='pitagoras'; break; }
    case 'series': { const pattern=rand(0,2); const seq:number[]=[]; if(pattern===0){const step2=rand(2,7);const start=rand(1,10);for(let i=0;i<4;i++)seq.push(start+i*step2);answer=start+4*step2;steps=[{title:'Aritmética',explanation:`Diferencia constante +${step2}`},{title:'Aplicar',explanation:`${seq[3]} + ${step2} = ${answer}`}];} else if(pattern===1){const mult=rand(2,3);const start=rand(1,4);for(let i=0;i<4;i++)seq.push(start*Math.pow(mult,i));answer=start*Math.pow(mult,4);steps=[{title:'Geométrica',explanation:`Multiplicar por ×${mult}`},{title:'Aplicar',explanation:`${seq[3]} × ${mult} = ${answer}`}];} else{seq.push(1,1,2,3);answer=5;steps=[{title:'Fibonacci',explanation:`Suma de los 2 anteriores`},{title:'Aplicar',explanation:`2 + 3 = 5`}];} question=`¿Qué número sigue?\n${seq.join(', ')}, ?`; visual={type:'train',sequence:seq}; type='serie'; break; }
    case 'estadistica': { const datos:number[]=[]; for(let i=0;i<5;i++)datos.push(rand(1,10)); const op=pick(['media','mediana','moda'] as const); if(op==='media'){answer=Math.round(datos.reduce((a2,b2)=>a2+b2,0)/datos.length);question=`Calcula la MEDIA de:\n${datos.join(', ')}`;steps=[{title:'Sumar',explanation:`${datos.join(' + ')} = ${datos.reduce((a2,b2)=>a2+b2,0)}`},{title:'Dividir',explanation:`${datos.reduce((a2,b2)=>a2+b2,0)} ÷ ${datos.length} ≈ ${answer}`}];} else if(op==='mediana'){const sorted=[...datos].sort((a2,b2)=>a2-b2);answer=sorted[Math.floor(sorted.length/2)];question=`Calcula la MEDIANA de:\n${datos.join(', ')}`;steps=[{title:'Ordenar',explanation:`${sorted.join(', ')}`},{title:'Valor central',explanation:`Es ${answer}`}];} else{const repeated=pick(datos);datos.push(repeated,repeated);const counts:Record<number,number>={};datos.forEach(n=>counts[n]=(counts[n]||0)+1);answer=Number(Object.entries(counts).sort((a2,b2)=>b2[1]-a2[1])[0][0]);question=`Calcula la MODA de:\n${datos.join(', ')}`;steps=[{title:'Moda',explanation:`Es el número que más se repite`},{title:'Resultado',explanation:`${answer} aparece más veces`}];} visual={type:'stats',data:datos}; type=`stat-${op}`; break; }
    case 'probabilidad': { const total=rand(6,12); const fav=rand(1,total-1); answer=Math.round((fav/total)*100); question=`En una bolsa hay ${total} canicas.\n${fav} son ROJAS.\n¿Cuál es la probabilidad (%) de sacar una roja?`; visual={type:'probability',total,fav}; steps=[{title:'Fórmula',explanation:`P = casos favorables / casos totales`},{title:'Sustituir',explanation:`P = ${fav}/${total} = ${(fav/total).toFixed(2)}`},{title:'A porcentaje',explanation:`${(fav/total).toFixed(2)} × 100 ≈ ${answer}%`}]; type='probabilidad'; break; }
    case 'factorial': { const n=rand(3,7); answer=factorial(n); question=`Calcula: ${n}!`; visual={type:'factorial',n}; steps=[{title:'Definición',explanation:`n! = n × (n−1) × ... × 1`},{title:'Desarrollo',explanation:`${n}! = ${Array.from({length:n},(_,i)=>n-i).join(' × ')}`},{title:'Resultado',explanation:`= ${answer}`}]; type='factorial'; break; }
    case 'permutacion': { const n=rand(3,8); const r=rand(2,Math.min(n-1,4)); answer=permutation(n,r); question=`Calcula P(${n}, ${r})`; visual={type:'permutation',n,r}; steps=[{title:'Fórmula',explanation:`P(n,r) = n! / (n−r)!`},{title:'Sustituir',explanation:`${factorial(n)} / ${factorial(n-r)}`},{title:'Resultado',explanation:`= ${answer}`}]; type='permutacion'; break; }
    case 'combinacion': { const n=rand(4,8); const r=rand(2,Math.min(n-2,4)); answer=combination(n,r); question=`Calcula C(${n}, ${r})`; visual={type:'combination',n,r}; steps=[{title:'Fórmula',explanation:`C(n,r) = n! / [r!(n−r)!]`},{title:'Sustituir',explanation:`${factorial(n)} / (${factorial(r)} × ${factorial(n-r)})`},{title:'Resultado',explanation:`= ${answer}`}]; type='combinacion'; break; }
    case 'polya': { const filas=rand(3,8),arboles=rand(4,10),manzanas=rand(2,5); answer=filas*arboles*manzanas; question=`Resolución de Problemas (Método Polya):\nEn un huerto hay ${filas} filas con ${arboles} manzanos cada una. Si recolectamos ${manzanas} manzanas por árbol, ¿cuántas manzanas tenemos en total?`; visual={type:'polya',filas,arboles,manzanas,total:answer}; steps=[{title:'1. Entender',explanation:`Datos: ${filas} filas, ${arboles} árboles/fila, ${manzanas} manzanas/árbol.`},{title:'2. Plan',explanation:`Multiplicar filas × árboles × manzanas.`},{title:'3. Ejecutar',explanation:`${filas} × ${arboles} = ${filas*arboles} árboles. ${filas*arboles} × ${manzanas} = ${answer} manzanas.`},{title:'4. Comprobar',explanation:`${answer} ÷ ${manzanas} = ${filas*arboles} árboles. Todo correcto.`}]; type='polya'; break; }
    case 'logica': { answer=4; question=`Razonamiento lógico:\n1. Todos los rectángulos tienen exactamente 4 ángulos rectos (90°).\n2. Un tablero de ajedrez cuadrado es un rectángulo especial.\n¿Cuántos ángulos rectos tiene un tablero de ajedrez?`; visual={type:'logica',text:'Deducción por silogismo'}; steps=[{title:'Premisa Mayor',explanation:`Todo rectángulo tiene 4 ángulos rectos.`},{title:'Premisa Menor',explanation:`El tablero cuadrado es un tipo de rectángulo.`},{title:'Conclusión',explanation:`El tablero tiene exactamente 4 ángulos rectos.`}]; type='logica'; break; }
    case 'romanos': { const n=pick([14,19,24,27,35,42,49,58,64,73,89,95]); const romMap:Record<number,string>={14:'XIV',19:'XIX',24:'XXIV',27:'XXVII',35:'XXXV',42:'XLII',49:'XLIX',58:'LVIII',64:'LXIV',73:'LXXIII',89:'LXXXIX',95:'XCV'}; answer=n; question=`Convierte el número romano a decimal:\n${romMap[n]} = ?`; visual={type:'romanos',rom:romMap[n],num:n}; steps=[{title:'Reglas romanas',explanation:`I=1, V=5, X=10, L=50, C=100. Si una menor está a la izquierda de una mayor, se resta.`},{title:'Conversión',explanation:`${romMap[n]} equivale exactamente al número decimal ${n}.`}]; type='romanos'; break; }
    case 'finanzas': { const precio=rand(8,25)*10; const desc=pick([15,20,25,30,40]); const ahorro=Math.round((precio*desc)/100); answer=precio-ahorro; question=`Educación Financiera:\nQuieres comprar una bicicleta de $${precio} que tiene un descuento especial del ${desc}%. ¿Cuánto pagarás en total?`; visual={type:'finanzas',precio,desc,pago:answer}; steps=[{title:'Calcular descuento',explanation:`${desc}% de $${precio} = $${ahorro}.`},{title:'Restar al precio',explanation:`$${precio} − $${ahorro} = $${answer}.`},{title:'Resultado',explanation:`Pagarás $${answer}.`}]; type='finanzas'; break; }
    case 'nomina': { const bruto=rand(15,35)*100; const imp=pick([10,15,20,25]); const deduccion=Math.round((bruto*imp)/100); answer=bruto-deduccion; question=`Salarios y Deducciones (Nómina):\nTu salario bruto mensual es de $${bruto.toLocaleString()} y el Estado deduce un ${imp}% de impuestos. ¿Cuál es tu salario neto disponible?`; visual={type:'nomina',bruto,imp,neto:answer}; steps=[{title:'Salario Bruto vs Neto',explanation:`Salario bruto es el total antes de impuestos.`},{title:'Cálculo',explanation:`${imp}% de $${bruto.toLocaleString()} = $${deduccion.toLocaleString()}.`},{title:'Salario Neto',explanation:`$${bruto.toLocaleString()} − $${deduccion.toLocaleString()} = $${answer.toLocaleString()}.`}]; type='nomina'; break; }
    case 'temperatura': { const c=pick([15,20,25,30,35,40]); answer=c+273; question=`Conversión de Escalas Termométricas:\nLa temperatura es de ${c} °C. Convierte a grados Kelvin (K = °C + 273).`; visual={type:'temperatura',c,k:answer}; steps=[{title:'Fórmula',explanation:`K = °C + 273`},{title:'Sustituir',explanation:`K = ${c} + 273 = ${answer}`},{title:'Resultado',explanation:`La temperatura absoluta es ${answer} K.`}]; type='temperatura'; break; }
    case 'conjuntos': { const soloA=rand(8,14); const soloB=rand(7,12); const inter=Math.max(2,(soloA+soloB)-rand(15,30)+rand(2,5)); const union=soloA+soloB-inter; answer=inter; question=`Teoría de Conjuntos:\nEn una reunión de ${union} personas, a ${soloA} les gusta el cine (A) y a ${soloB} les gusta el teatro (B). ¿A cuántas personas les gustan AMBAS actividades (A ∩ B)?`; visual={type:'conjuntos',a:soloA,b:soloB,inter,total:union}; steps=[{title:'Fórmula de Unión',explanation:`n(A ∪ B) = n(A) + n(B) − n(A ∩ B)`},{title:'Despejar intersección',explanation:`n(A ∩ B) = n(A) + n(B) − n(A ∪ B)`},{title:'Sustituir',explanation:`n(A ∩ B) = ${soloA} + ${soloB} − ${union} = ${soloA+soloB-union}.`},{title:'Resultado',explanation:`A ${answer} personas les gustan ambas actividades.`}]; type='conjuntos'; break; }
    case 'criptografia': { const AB='ABCDEFGHIJKLMNOPQRSTUVWXYZ'; const posC=rand(1,18); const shift2=rand(1,7); answer=posC+shift2; const letra=AB[posC-1]; const cifrada=AB[answer-1]; question=`Criptografía Básica (Cifrado César):\nSi ciframos la letra '${letra}' (${posC}) usando un desplazamiento de +${shift2}, ¿qué posición numérica obtenemos?`; visual={type:'criptografia',start:`${letra} (${posC})`,shift:shift2,end:`${cifrada} (${answer})`}; steps=[{title:'Posición original',explanation:`La letra ${letra} ocupa la posición ${posC}.`},{title:'Desplazamiento',explanation:`${posC} + ${shift2} = ${answer}.`},{title:'Letra cifrada',explanation:`La posición ${answer} corresponde a la letra ${cifrada}.`}]; type='criptografia'; break; }
    case 'negativos': { const start=(-rand(5,30)); const jump2=pick([rand(1,12),-rand(1,12)]); answer=start+jump2; question=`Números Negativos en la Recta:\nComienza en ${start} y ${jump2>=0?`avanza ${jump2}`:`retrocede ${Math.abs(jump2)}`}. ¿A qué número llegas?`; visual={type:'number-line',start:Math.min(start,answer)-3,end:Math.max(start,answer)+3,current:start,jump:jump2}; steps=[{title:'Ubicación inicial',explanation:`Empezamos en ${start}.`},{title:'Moverse',explanation:jump2>=0?`Avanzar ${jump2} unidades nos mueve a la derecha.`:`Retroceder ${Math.abs(jump2)} unidades nos mueve a la izquierda.`},{title:'Resultado',explanation:`Llegamos al número ${answer}.`}]; type='negativos'; break; }
    case 'fracciones-complejas': { const n1=rand(2,8),d1=rand(2,6),n2=rand(2,8),d2=rand(2,6); const resN=n1*d2; const resD=d1*n2; const red=reduceFraction(resN,resD); answer=red.n*1000+red.d; question=`Fracción compleja:\n(${n1}/${d1}) ÷ (${n2}/${d2})\n¿Resultado simplificado? (formato n/d)`; visual={type:'fraction-ops',op:'÷',n1,d1,n2,d2,result:{n:red.n,d:red.d}}; steps=[{title:'Invertir y multiplicar',explanation:`(${n1}/${d1}) × (${d2}/${n2})`},{title:'Multiplicar',explanation:`${resN}/${resD}`},{title:'Simplificar',explanation:`${red.n}/${red.d}`}]; return{id,type:'fracciones-complejas',question,answer,options:shuffle((()=>{const c=red.n*1000+red.d;const cand=[resN*1000+resD,(red.n+1)*1000+red.d,red.n*1000+(red.d+1),(red.n+2)*1000+red.d,red.n*1000+(red.d+2)];const o=[c];for(const v of cand){if(o.length<4&&!o.includes(v))o.push(v);}return o;})()),visual,steps}; }
    case 'geometria-avanzada': { const shape=pick(['trapecio','rombo','pentagono'] as const); if(shape==='trapecio'){const B=rand(8,18),b2=rand(4,B-1),h=rand(3,10);answer=((B+b2)*h)/2;question=`Área del Trapecio:\nBase mayor=${B}, base menor=${b2}, altura=${h}`;steps=[{title:'Fórmula',explanation:`A = (B + b) × h / 2`},{title:'Sustituir',explanation:`A = (${B}+${b2})×${h}/2 = ${answer}`}];visual={type:'shape',shape:'trapecio',w:B,h,b:b2};} else if(shape==='rombo'){const D=rand(8,20),d2=rand(4,12);answer=(D*d2)/2;question=`Área del Rombo:\nDiagonal mayor=${D}, diagonal menor=${d2}`;steps=[{title:'Fórmula',explanation:`A = (D × d) / 2`},{title:'Sustituir',explanation:`A = (${D}×${d2})/2 = ${answer}`}];visual={type:'shape',shape:'rombo',w:D,h:d2};} else{const side=rand(3,12),apothem=rand(2,8);answer=Math.round((5*side*apothem)/2);question=`Área del Pentágono Regular:\nLado=${side}, apotema=${apothem}`;steps=[{title:'Perímetro',explanation:`P = 5 × lado = ${5*side}`},{title:'Fórmula',explanation:`A = (P × apotema)/2 = (${5*side}×${apothem})/2`},{title:'Resultado',explanation:`A ≈ ${answer}`}];visual={type:'shape',shape:'pentagono',w:side,h:apothem};} type='geometria-avanzada'; break; }
    case 'conjuntos-numericos': { const CASOS=[{num:'√−1',cod:5,set:'Complejos (C)',why:'√−1 no existe entre los reales; se define i = √−1.'},{num:'−7',cod:2,set:'Enteros (Z)',why:'Es negativo y sin parte decimal: es entero, no natural.'},{num:'12',cod:1,set:'Naturales (N)',why:'Es positivo y sirve para contar: es natural.'},{num:'√2',cod:3,set:'Reales (R)',why:'Es irracional (no es fracción exacta), pero sí es real.'},{num:'0.75',cod:3,set:'Reales (R)',why:'Es un decimal exacto: racional y, por tanto, real.'},{num:'3 + 2i',cod:5,set:'Complejos (C)',why:'Tiene parte imaginaria, así que es complejo.'}]; const cs=pick(CASOS); answer=cs.cod; question=`Conjuntos Numéricos:\nSi el número es ${cs.num}, ¿a qué conjunto pertenece principalmente?\n1) Naturales  2) Enteros  3) Reales  4) Complejos`; visual={type:'number-sets',selected:cs.cod===1?'N':cs.cod===2?'Z':cs.cod===3?'R':'C'}; steps=[{title:'Observación',explanation:`Analiza el número ${cs.num}.`},{title:'Razonamiento',explanation:cs.why},{title:'Conclusión',explanation:`Pertenece a los ${cs.set}.`}]; return{id,type:'conjuntos-numericos',question,answer,options:shuffle([1,2,3,5]),visual,steps}; }
    case 'historia': { const pickH=pick([{q:`¿Qué constante matemática representa la relación entre la longitud de una circunferencia y su diámetro, celebrada mundialmente el 14 de marzo (3/14)?`,ans:3.14},{q:`¿Qué famosa proporción o número irracional (aprox 1.618) se encuentra en la espiral de conchas marinas, girasoles y en el arte renacentista?`,ans:1.61},{q:`¿Qué número irracional (aprox 2.718) es la base de los logaritmos naturales y fundamental para el cálculo del interés compuesto continuo?`,ans:2.71}]); answer=pickH.ans; question=`Historia y Curiosidades:\n${pickH.q}`; visual={type:'historia',title:'Constantes Matemáticas Universales'}; steps=[{title:'Curiosidad Matemática',explanation:`Las constantes universales como π, φ y e aparecen en la naturaleza, la geometría y la física de manera fascinante.`}]; type='historia'; return{id,type,question,answer,options:shuffle([3.14,1.61,2.71,0]),visual,steps}; }
    case 'objetos': { const n=rand(1,10); answer=n; question=`¿Cuántas frutas ves?`; visual={type:'counting',n}; steps=[{title:'Conteo',explanation:`Cuenta las frutas una por una.`}]; break; }
    case 'ubicacion': { const isInside=Math.random()>0.5; answer=isInside?1:0; question=`¿El gato está ADENTRO de la caja? (1: Sí, 0: No)`; visual={type:'shape-quiz',shape:'círculo'}; steps=[{title:'Espacial',explanation:`Observa la posición del gato.`}]; return{id,type,question,answer,options:[0,1],visual,steps}; }
    case 'frac-tipos': { const isProp=Math.random()>0.5; const n=isProp?rand(1,3):rand(5,8); const d=4; answer=isProp?1:0; question=`¿La fracción ${n}/${d} es PROPIA? (1: Sí, 0: No)`; steps=[{title:'Tipos',explanation:`Si el numerador es menor que el denominador, es propia.`}]; return{id,type,question,answer,options:[0,1],visual:{type:'fraction',numerator:n,denominator:d},steps}; }
    case 'frac-simp': { const common=rand(2,4); const rn=rand(1,3); const rd=rand(4,6); const n=rn*common; const d=rd*common; answer=rn; question=`Simplifica ${n}/${d}. ¿Cuál es el nuevo numerador?`; steps=[{title:'Simplificación',explanation:`Divide ${n} y ${d} entre su divisor común.`}]; return{id,type,question,answer,options:generateOptions(rn),visual:{type:'fraction',numerator:n,denominator:d},steps}; }
    case 'ordinales': { const n=rand(1,10); const ordinals=['','primero','segundo','tercero','cuarto','quinto','sexto','séptimo','octavo','noveno','décimo']; answer=n; question=`¿Cuál es el ordinal de la posición ${n}?`; visual={type:'counting',n}; steps=[{title:'Ordinal',explanation:`La posición ${n} se dice "${ordinals[n]}".`}]; type='ordinales'; break; }
    case 'medida': { const mtype=pick(['largo','peso','capacidad']); if(mtype==='largo'){a=rand(5,15);b=rand(3,10);answer=a>b?1:0;question=`¿Cuál es MÁS LARGO?\\nCinta A: ${a}cm \\ Cinta B: ${b}cm`;visual={type:'number-line',start:0,end:Math.max(a,b)+3,current:a,jump:b};steps=[{title:'Comparar',explanation:`A=${a}cm, B=${b}cm.`},{title:'Resultado',explanation:`La cinta ${answer===1?'A':'B'} es más larga.`}];} else if(mtype==='peso'){a=rand(1,5);b=rand(1,5);answer=a>b?1:a<b?2:0;question=`¿Cuál pesa MÁS?\\nPelota A: ${a}kg \\ Pelota B: ${b}kg`;steps=[{title:'Pesamos',explanation:`A=${a}kg, B=${b}kg.`},{title:'Resultado',explanation:`La pelota ${answer===1?'A':'B'} es más pesada.`}];} else{answer=rand(1,3);question=`¿Qué recipiente tiene MENOS agua?`;steps=[{title:'Mirar el nivel',explanation:`Comparamos el nivel de agua en cada recipiente.`}];} type='medida'; break; }
    case 'decimales': { const d1=rand(1,9); const d2=rand(0,9); const d3=rand(0,9); answer=d2; question=`En el número ${d1}.${d2}${d3}, ¿qué dígito está en los décimos?`; steps=[{title:'Posiciones',explanation:`${d1} es unidades, ${d2} es décimos, ${d3} es centésimos.`},{title:'Respuesta',explanation:`Los décimos corresponden al dígito ${d2}.`}]; type='decimales'; break; }
    case 'redondeo': { const num=rand(10,99); const unit=Math.round(num/10)*10; answer=unit; question=`Redondea ${num} al entero más cercano.`; steps=[{title:'Regla',explanation:`Si el último dígito es ≥5, redondea arriba; si <5, redondea abajo.`},{title:'Resultado',explanation:`${num} redondea a ${unit}.`}]; type='redondeo'; break; }
    case 'propiedad-distributiva': { a=rand(2,9);b=rand(2,9);const c=rand(1,5);answer=a*b+a*c;question=`Usa la propiedad distributiva:\\n${a} × (${b} + ${c}) = ?`;steps=[{title:'Distributiva',explanation:`a×(b+c) = a×b + a×c`},{title:'Sustituir',explanation:`${a}×${b} + ${a}×${c} = ${a*b} + ${a*c}`},{title:'Resultado',explanation:`= ${answer}`}]; type='propiedad-distributiva'; break; }
    case 'equivalencia': { const common=rand(2,5);const n=rand(1,3);const d=4;const newN=n*common;const newD=d*common;answer=newD;question=`¿Qué denominador tiene la fracción equivalente?\\n${n}/${d} = ${newN}/?`;steps=[{title:'Multiplicar',explanation:`Multiplicamos por ${common}/${common}`},{title:'Resultado',explanation:`${n}×${common}/${d}×${common} = ${newN}/${newD}`}]; type='equivalencia'; break; }
    case 'velocidad': { const v=rand(40,100);const t=rand(1,4);answer=v*t;question=`Un coche viaja a ${v} km/h durante ${t} horas.\\n¿Cuántos km recorrió?`;steps=[{title:'Fórmula',explanation:`distancia = velocidad × tiempo`},{title:'Sustituir',explanation:`d = ${v} × ${t}`},{title:'Resultado',explanation:`d = ${answer} km`}]; type='velocidad'; break; }
    case 'boleana': { const p=rand(0,1);const q=rand(0,1);const op=pick(['AND','OR','XOR']);let result=0;if(op==='AND')result=p&&q?1:0;else if(op==='OR')result=p||q?1:0;else result=p!==q?1:0;answer=result;question=`Álgebra Booleana:\\nP = ${p?'VERDADERO':'FALSO'}, Q = ${q?'VERDADERO':'FALSO'}\\n¿Qué vale P ${op} Q?`;visual={type:'logica',text:`Operación ${op}`};steps=[{title:'Tabla',explanation:`AND=T solo si ambos son T. OR=T si al menos uno es T. XOR=T si son diferentes.`},{title:'Resultado',explanation:`P ${op} Q = ${result?'VERDADERO':'FALSO'}`}]; type='boleana'; break; }
    case 'diagrama-venn': { const soloA=rand(5,10);const soloB=rand(3,8);const inter=rand(2,Math.min(soloA,soloB));const union=soloA+soloB-inter;answer=union;question=`Diagramas de Venn:\\nEn A: ${soloA}, en B: ${soloB}, en A∩B: ${inter}\\n¿Cuántos hay en A∪B?`;steps=[{title:'Fórmula de Unión',explanation:`n(A∪B) = n(A) + n(B) − n(A∩B)`},{title:'Sustituir',explanation:`${soloA} + ${soloB} − ${inter} = ${union}`},{title:'Respuesta',explanation:`Hay ${union} en total.`}]; type='diagrama-venn'; break; }
    case 'diagrama-arbol': { const a=rand(2,4);const b=rand(2,4);answer=a*b;question=`Diagrama de Árbol:\\nUn evento tiene ${a} resultados, y otro evento independiente tiene ${b} resultados.\\n¿Cuántos resultados posibles hay en total?`;steps=[{title:'Multiplicación',explanation:`Principio multiplicativo: total = m × n`},{title:'Sustituir',explanation:`${a} × ${b}`},{title:'Resultado',explanation:`Hay ${answer} combinaciones posibles.`}]; type='diagrama-arbol'; break; }
  }

  return { id, type, question, answer, options: generateOptions(answer), visual, steps };
};

// ==========================================
// SHARED VISUALIZATIONS
// ==========================================
export const NumberLineVisual: React.FC<{ visual: any }> = ({ visual }) => {
  const { start, end, current, jump } = visual;
  const min = Math.min(start, end, current, current + jump);
  const max = Math.max(start, end, current, current + jump);
  const rawRange = max - min || 1;
  const isDecimal = !Number.isInteger(start) || !Number.isInteger(end) || !Number.isInteger(current) || !Number.isInteger(jump);
  const approxTicks = 10;
  let step = rawRange / approxTicks;
  if (!isDecimal) { step = Math.max(1, Math.ceil(step)); } else { const magnitude = Math.pow(10, Math.floor(Math.log10(Math.abs(step || 1)))); step = Math.ceil(step / magnitude) * magnitude; }
  const paddedMin = min - step;
  const paddedMax = max + step;
  const ticks: number[] = [];
  for (let v = paddedMin; v <= paddedMax + 0.0001; v += step) { ticks.push(Number(v.toFixed(isDecimal ? 2 : 0))); if (ticks.length > 30) break; }
  const toPercent = (n: number) => ((n - paddedMin) / (paddedMax - paddedMin)) * 100;
  return (
    <div className="p-4 md:p-6 bg-black/5 rounded-2xl mb-4 overflow-x-auto w-full">
      <div className="text-xs font-bold opacity-75 mb-3 text-center">Recta numérica</div>
      <div className="min-w-[520px] py-8 relative px-4">
        <div className="absolute left-4 right-4 top-10 h-1.5 bg-slate-400 dark:bg-slate-600 rounded-full" />
        {ticks.map((num) => {
          const isCurrent = Math.abs(num - current) < 0.0001;
          const isTarget = Math.abs(num - (current + jump)) < 0.0001;
          const isBetween = (jump > 0 && num >= current && num <= current + jump) || (jump < 0 && num <= current && num >= current + jump);
          return (
            <div key={num} className="absolute top-6 flex flex-col items-center" style={{ left: `calc(${toPercent(num)}% - 8px)` }}>
              <div className={`w-4 h-4 rounded-full border-2 transition-all ${isCurrent ? 'ring-4 scale-125' : isTarget ? 'bg-emerald-500 ring-4 ring-emerald-500/30 scale-125 animate-bounce' : isBetween ? 'bg-amber-400 scale-110' : 'bg-slate-300 dark:bg-slate-700'}`} style={isCurrent ? { background: 'var(--primary-color)', boxShadow: '0 0 0 4px color-mix(in srgb, var(--primary-color) 30%, transparent)' } : {}} />
              <span className={`mt-2 font-black text-[10px] ${isCurrent || isTarget ? 'scale-110' : 'opacity-70'}`} style={isCurrent || isTarget ? { color: 'var(--primary-color)' } : {}}>{isDecimal ? num.toFixed(2).replace(/\.00$/, '') : num}</span>
            </div>
          );
        })}
      </div>
      <div className="text-center text-xs font-black opacity-80 mt-4">{jump > 0 ? `🟢 Avanza +${jump}` : `🔴 Retrocede ${jump}`}</div>
    </div>
  );
};

export const GridVisual: React.FC<{ visual: any }> = ({ visual }) => {
  const { rows, cols, total } = visual;
  return (
    <div className="flex flex-col items-center p-4 md:p-6 bg-black/5 rounded-2xl mb-4">
      <div className="text-xs font-bold opacity-75 mb-3">🧮 {rows} × {cols}</div>
      <div className="grid gap-1.5 p-3 bg-white/50 dark:bg-slate-800/60 rounded-xl shadow-inner max-w-full overflow-auto" style={{ gridTemplateColumns: `repeat(${cols}, minmax(28px, 1fr))` }}>
        {Array.from({ length: rows * cols }, (_, i) => (<div key={i} className="h-8 flex items-center justify-center font-black text-white text-xs rounded-lg shadow-sm transition-all hover:scale-110" style={{ background: 'var(--gradient-primary)' }}>{i + 1}</div>))}
      </div>
      <div className="mt-3 font-extrabold">Total: {total}</div>
    </div>
  );
};

export const FractionVisual: React.FC<{ visual: any }> = ({ visual }) => {
  const { numerator, denominator } = visual;
  const segmentAngle = 360 / denominator;
  return (
    <div className="flex flex-col items-center p-4 bg-black/5 rounded-2xl mb-4">
      <div className="text-xs font-bold opacity-75 mb-3">🍰 Fracción</div>
      <svg width="160" height="160" className="mb-3 drop-shadow-md">
        {Array.from({ length: denominator }, (_, i) => {
          const sA = (i * segmentAngle - 90) * (Math.PI / 180);
          const eA = ((i + 1) * segmentAngle - 90) * (Math.PI / 180);
          const isFilled = i < numerator;
          const x1 = 80 + 70 * Math.cos(sA), y1 = 80 + 70 * Math.sin(sA);
          const x2 = 80 + 70 * Math.cos(eA), y2 = 80 + 70 * Math.sin(eA);
          const largeArc = segmentAngle > 180 ? 1 : 0;
          return (<path key={i} d={`M 80 80 L ${x1} ${y1} A 70 70 0 ${largeArc} 1 ${x2} ${y2} Z`} fill={isFilled ? 'var(--primary-color)' : 'rgba(200,200,200,0.25)'} stroke="var(--surface-color)" strokeWidth="3" />);
        })}
      </svg>
      <div className="font-black text-lg">{numerator}/{denominator}</div>
    </div>
  );
};

export const FractionOpsVisual: React.FC<{ visual: any }> = ({ visual }) => {
  const { op, n1, d1, n2, d2, result } = visual;
  const Frac: React.FC<{ n: number; d: number; color: string }> = ({ n, d, color }) => (
    <div className="flex flex-col items-center bg-white/80 dark:bg-slate-800/80 p-3 rounded-2xl shadow border-2 font-black text-xl" style={{ borderColor: color, color }}>
      <span>{n}</span><div className="w-10 h-1 my-1" style={{ background: color }} /><span>{d}</span>
    </div>
  );
  return (
    <div className="flex flex-col items-center p-4 bg-black/5 rounded-2xl mb-4 overflow-x-auto">
      <div className="flex items-center gap-3 flex-wrap justify-center">
        <Frac n={n1} d={d1} color="#a855f7" /><span className="text-2xl font-black opacity-70">{op}</span><Frac n={n2} d={d2} color="#0ea5e9" /><span className="text-2xl font-black opacity-70">=</span><Frac n={result.n} d={result.d} color="#10b981" />
      </div>
    </div>
  );
};

export const BalanceVisual: React.FC<{ visual: any }> = ({ visual }) => {
  const { leftCoef, leftConst, rightConst } = visual;
  return (
    <div className="flex flex-col items-center p-4 md:p-6 bg-black/5 rounded-2xl mb-4">
      <div className="text-xs font-bold opacity-75 mb-3">⚖️ Balanza</div>
      <div className="flex items-center justify-center gap-4 md:gap-8 w-full max-w-md">
        <div className="flex flex-col items-center bg-white/80 dark:bg-slate-800/80 p-3 md:p-4 rounded-2xl shadow border-2 border-purple-500 min-w-[120px]">
          <div className="flex gap-1 flex-wrap justify-center mb-1">{Array.from({ length: leftCoef }).map((_, i) => (<span key={i} className="px-2 py-1 bg-purple-500 text-white font-black rounded-lg text-xs">x</span>))}</div>
          <span className="text-base font-black">+ {leftConst}</span>
        </div>
        <div className="text-3xl font-black text-purple-600 animate-pulse">=</div>
        <div className="flex flex-col items-center bg-white/80 dark:bg-slate-800/80 p-3 md:p-4 rounded-2xl shadow border-2 border-emerald-500 min-w-[120px]"><div className="text-2xl font-black text-emerald-600">{rightConst}</div></div>
      </div>
      <div className="w-48 h-2 bg-slate-400 rounded-full mt-3" /><div className="w-5 h-5 bg-slate-600 rotate-45 -mt-2" />
    </div>
  );
};

export const ShapeVisual: React.FC<{ visual: any }> = ({ visual }) => {
  const { shape, w, h, b } = visual;
  const getPolyPoints = (sides: number, r = 60, cx = 100, cy = 100) => {
    const pts = [];
    for (let i = 0; i < sides; i++) {
      const angle = (i * 2 * Math.PI) / sides - Math.PI / 2;
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;
      pts.push(`${x},${y}`);
    }
    return pts.join(' ');
  };

  return (
    <div className="flex flex-col items-center p-4 md:p-6 bg-black/5 rounded-2xl mb-4">
      <div className="text-xs font-bold opacity-75 mb-3">📐 {shape?.toUpperCase()}</div>
      <div className="relative flex items-center justify-center p-6 min-h-[180px]">
        {shape === 'rectangulo' && <div className="border-4 border-pink-500 bg-pink-500/20 rounded-xl flex items-center justify-center shadow" style={{ width: Math.min(w * 12, 240), height: Math.min(h * 12, 140) }}><span className="font-extrabold text-sm">Á = ?</span></div>}
        {shape === 'triangulo' && <svg viewBox="0 0 100 100" className="w-44 h-32 drop-shadow"><polygon points="50,10 10,90 90,90" fill="rgba(236,72,153,0.2)" stroke="#ec4899" strokeWidth="4" /><text x="50" y="60" textAnchor="middle" className="font-black" fontSize="12">Á=?</text></svg>}
        {shape === 'circulo' && <div className="rounded-full border-4 border-pink-500 bg-pink-500/20 flex items-center justify-center shadow" style={{ width: Math.min(w * 18, 160), height: Math.min(w * 18, 160) }}><span className="font-extrabold text-sm">Á = ?</span></div>}
        {shape === 'trapecio' && <svg viewBox="0 0 200 150" className="w-56 h-40 drop-shadow"><polygon points="40,110 160,110 130,40 70,40" fill="rgba(236,72,153,0.2)" stroke="#ec4899" strokeWidth="4" /><text x="100" y="80" textAnchor="middle" className="font-black" fontSize="14">Á=?</text></svg>}
        {shape === 'rombo' && <svg viewBox="0 0 200 200" className="w-44 h-44 drop-shadow"><polygon points="100,20 170,100 100,180 30,100" fill="rgba(236,72,153,0.2)" stroke="#ec4899" strokeWidth="4" /><text x="100" y="105" textAnchor="middle" className="font-black" fontSize="14">Á=?</text></svg>}
        {shape === 'pentagono' && <svg viewBox="0 0 200 200" className="w-44 h-44 drop-shadow"><polygon points={getPolyPoints(5)} fill="rgba(236,72,153,0.2)" stroke="#ec4899" strokeWidth="4" /><text x="100" y="108" textAnchor="middle" className="font-black" fontSize="14">Á=?</text></svg>}
        {shape === 'hexagono' && <svg viewBox="0 0 200 200" className="w-44 h-44 drop-shadow"><polygon points={getPolyPoints(6)} fill="rgba(236,72,153,0.2)" stroke="#ec4899" strokeWidth="4" /><text x="100" y="108" textAnchor="middle" className="font-black" fontSize="14">Á=?</text></svg>}
        {shape === 'octagono' && <svg viewBox="0 0 200 200" className="w-44 h-44 drop-shadow"><polygon points={getPolyPoints(8)} fill="rgba(236,72,153,0.2)" stroke="#ec4899" strokeWidth="4" /><text x="100" y="108" textAnchor="middle" className="font-black" fontSize="14">Á=?</text></svg>}
        {shape === 'elipse' && <svg viewBox="0 0 200 150" className="w-56 h-40 drop-shadow"><ellipse cx="100" cy="75" rx="75" ry="45" fill="rgba(236,72,153,0.2)" stroke="#ec4899" strokeWidth="4" /><text x="100" y="80" textAnchor="middle" className="font-black" fontSize="14">Á=?</text></svg>}
        {shape === 'sector' && (
          <svg viewBox="0 0 200 200" className="w-44 h-44 drop-shadow">
            {(() => {
              const angle = Number(h || 90);
              const angleRad = (-angle * Math.PI) / 180;
              const x = 100 + Math.cos(angleRad) * 75;
              const y = 100 + Math.sin(angleRad) * 75;
              const largeArc = angle > 180 ? 1 : 0;
              return (
                <path d={`M 100 100 L 175 100 A 75 75 0 ${largeArc} 0 ${x} ${y} Z`} fill="rgba(236,72,153,0.2)" stroke="#ec4899" strokeWidth="4" />
              );
            })()}
            <text x="100" y="130" textAnchor="middle" className="font-black" fontSize="14">Á=?</text>
          </svg>
        )}
      </div>
      <div className="flex gap-3 mt-2 text-xs font-black flex-wrap justify-center">
        {shape === 'circulo' && <span className="px-3 py-1 bg-pink-500/20 text-pink-600 dark:text-pink-400 rounded-full">Radio: {w}</span>}
        {(shape === 'rectangulo' || shape === 'triangulo') && <><span className="px-3 py-1 bg-pink-500/20 text-pink-600 dark:text-pink-400 rounded-full">Base: {w}</span><span className="px-3 py-1 bg-pink-500/20 text-pink-600 dark:text-pink-400 rounded-full">Altura: {h}</span></>}
        {shape === 'trapecio' && <><span className="px-3 py-1 bg-pink-500/20 text-pink-600 rounded-full">B mayor: {w}</span><span className="px-3 py-1 bg-pink-500/20 text-pink-600 rounded-full">B menor: {b}</span><span className="px-3 py-1 bg-pink-500/20 text-pink-600 rounded-full">Altura: {h}</span></>}
        {shape === 'rombo' && <><span className="px-3 py-1 bg-pink-500/20 text-pink-600 rounded-full">D mayor: {w}</span><span className="px-3 py-1 bg-pink-500/20 text-pink-600 rounded-full">D menor: {h}</span></>}
        {(shape === 'pentagono' || shape === 'hexagono' || shape === 'octagono') && <><span className="px-3 py-1 bg-pink-500/20 text-pink-600 rounded-full">Lado: {w}</span><span className="px-3 py-1 bg-pink-500/20 text-pink-600 rounded-full">Apotema: {h}</span></>}
        {shape === 'elipse' && <><span className="px-3 py-1 bg-pink-500/20 text-pink-600 rounded-full">Semi-eje a: {w}</span><span className="px-3 py-1 bg-pink-500/20 text-pink-600 rounded-full">Semi-eje b: {h}</span></>}
        {shape === 'sector' && <><span className="px-3 py-1 bg-pink-500/20 text-pink-600 rounded-full">Radio: {w}</span><span className="px-3 py-1 bg-pink-500/20 text-pink-600 rounded-full">Ángulo: {h}°</span></>}
      </div>
    </div>
  );
};

export const GroupsVisual: React.FC<{ visual: any }> = ({ visual }) => {
  const { total, groups } = visual;
  return (<div className="flex flex-col items-center p-4 bg-black/5 rounded-2xl mb-4"><div className="text-xs font-bold opacity-75 mb-3">📦 Reparto en {groups}</div><div className="flex flex-wrap justify-center gap-3 w-full">{Array.from({ length: groups }, (_, i) => (<div key={i} className="flex-1 min-w-[80px] p-3 rounded-xl bg-white/80 dark:bg-slate-800/80 border-2 shadow flex flex-col items-center" style={{ borderColor: 'color-mix(in srgb, var(--primary-color) 40%, transparent)' }}><div className="text-xl mb-1">📥</div><div className="font-black text-xs opacity-75">Grupo {i+1}</div></div>))}</div><div className="mt-3 font-bold opacity-80 text-sm">Total: {total}</div></div>);
};

export const TrainVisual: React.FC<{ visual: any }> = ({ visual }) => {
  const { sequence } = visual;
  return (<div className="flex flex-col items-center p-4 bg-black/5 rounded-2xl mb-4 overflow-x-auto"><div className="text-xs font-bold opacity-75 mb-3">🚂 Tren Numérico</div><div className="flex items-center gap-2 py-2 px-2 min-w-[300px]">{sequence.map((num: number, idx: number) => (<div key={idx} className="flex items-center gap-2"><div className="flex flex-col items-center text-white font-black p-3 rounded-2xl shadow min-w-[52px] border-2 border-white/40" style={{ background: 'var(--primary-color)' }}><span className="text-lg">{num}</span><span className="text-[9px] opacity-75 uppercase">#{idx+1}</span></div><div className="w-3 h-1.5 bg-slate-400 rounded-full" /></div>))}<div className="flex flex-col items-center bg-amber-400 text-slate-900 font-black p-3 rounded-2xl shadow min-w-[52px] border-2 border-white animate-bounce"><span className="text-lg">?</span></div></div></div>);
};

export const FactorialVisual: React.FC<{ visual: any }> = ({ visual }) => {
  const { n } = visual;
  return (<div className="flex flex-col items-center p-4 bg-black/5 rounded-2xl mb-4"><div className="flex items-center gap-2 flex-wrap justify-center">{Array.from({ length: n }, (_, i) => n - i).map((num, idx) => (<React.Fragment key={idx}><div className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg text-white shadow" style={{ background: `linear-gradient(135deg, hsl(${(idx * 60) % 360}, 70%, 55%), hsl(${(idx * 60 + 30) % 360}, 70%, 45%))` }}>{num}</div>{idx < n - 1 && <span className="font-black text-xl opacity-70">×</span>}</React.Fragment>))}</div></div>);
};

export const PermutationVisual: React.FC<{ visual: any }> = ({ visual }) => {
  const { n, r } = visual;
  return (<div className="flex flex-col items-center p-4 bg-black/5 rounded-2xl mb-4"><div className="flex gap-1.5 flex-wrap justify-center">{Array.from({ length: n }, (_, i) => (<div key={i} className={`w-9 h-9 rounded-xl flex items-center justify-center font-black text-sm shadow border-2 ${i < r ? 'bg-violet-500 text-white border-violet-300' : 'bg-slate-200 dark:bg-slate-700 text-slate-500 opacity-60'}`}>{String.fromCharCode(65 + i)}</div>))}</div><div className="text-xs font-bold mt-2 opacity-80">Elegir {r} de {n}, orden SÍ importa</div></div>);
};

export const CombinationVisual: React.FC<{ visual: any }> = ({ visual }) => {
  const { n, r } = visual;
  return (<div className="flex flex-col items-center p-4 bg-black/5 rounded-2xl mb-4"><div className="flex gap-1.5 flex-wrap justify-center">{Array.from({ length: n }, (_, i) => (<div key={i} className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-sm shadow border-2 ${i < r ? 'bg-cyan-500 text-white border-cyan-300' : 'bg-slate-200 dark:bg-slate-700 text-slate-500 opacity-60'}`}>{String.fromCharCode(65 + i)}</div>))}</div><div className="text-xs font-bold mt-2 opacity-80">Elegir {r} de {n}, orden NO importa</div></div>);
};

export const PercentVisual: React.FC<{ visual: any }> = ({ visual }) => {
  const { total, pct } = visual;
  return (<div className="flex flex-col items-center p-4 bg-black/5 rounded-2xl mb-4"><div className="w-full max-w-xs h-10 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden shadow-inner relative"><div className="h-full transition-all duration-700 flex items-center justify-end pr-3 text-white font-black text-sm" style={{ width: `${pct}%`, background: 'var(--gradient-primary)' }}>{pct}%</div></div><div className="mt-3 text-sm font-bold opacity-80">de {total}</div></div>);
};

export const CountingVisual: React.FC<{ visual: any }> = ({ visual }) => {
  const { n } = visual;
  const items = ['🍎', '🐶', '⭐', '🎈', '🌸', '🦋'];
  const emoji = items[Math.floor(Math.random() * items.length)];
  return (<div className="flex flex-col items-center p-4 bg-black/5 rounded-2xl mb-4"><div className="text-xs font-bold opacity-75 mb-3">🔢 Cuenta los objetos</div><div className="flex flex-wrap gap-2 justify-center max-w-md">{Array.from({ length: n }, (_, i) => (<span key={i} className="text-4xl animate-pop" style={{ animationDelay: `${i*0.05}s` }}>{emoji}</span>))}</div></div>);
};

export const ShapeQuizVisual: React.FC<{ visual: any }> = ({ visual }) => {
  const { shape } = visual;
  const shapeMap: Record<string, React.ReactNode> = {
    'círculo': <div className="w-32 h-32 rounded-full bg-pink-500 shadow-lg" />,
    'cuadrado': <div className="w-32 h-32 bg-blue-500 rounded shadow-lg" />,
    'triángulo': <div className="w-0 h-0 border-l-[64px] border-l-transparent border-r-[64px] border-r-transparent border-b-[110px] border-b-yellow-500 drop-shadow-lg" />,
    'rectángulo': <div className="w-44 h-24 bg-green-500 rounded shadow-lg" />
  };
  return (<div className="flex flex-col items-center p-6 bg-black/5 rounded-2xl mb-4">{shapeMap[shape]}</div>);
};

export const PlaceValueVisual: React.FC<{ visual: any }> = ({ visual }) => {
  const { num } = visual;
  const safeNum = Math.max(0, Math.floor(Math.abs(num)));
  const digits: string[] = safeNum.toString().padStart(7, '0').split('');
  const places = ['MILLONES', 'CIENMIL', 'DIEZMIL', 'MILES', 'CENTENAS', 'DECENAS', 'UNIDADES'];
  const colors = ['#7c3aed', '#9333ea', '#2563eb', '#0ea5e9', '#dc2626', '#22c55e', '#f59e0b'];
  return (
    <div className="flex flex-col items-center p-4 bg-black/5 rounded-2xl mb-4 overflow-x-auto w-full">
      <div className="flex gap-2 items-end min-w-max">{digits.map((d: string, i: number) => (<div key={i} className="flex flex-col items-center"><div className="text-[9px] font-black uppercase opacity-70 mb-1 text-center leading-tight" style={{ color: colors[i] }}>{places[i]}</div><div className="w-14 h-18 rounded-2xl flex items-center justify-center text-2xl font-black text-white shadow-lg" style={{ background: colors[i], minHeight: '72px' }}>{d}</div></div>))}</div>
      <div className="mt-3 text-xs font-black opacity-80 text-center">Número completo: {safeNum.toLocaleString('es-MX')}</div>
    </div>
  );
};

export const PrimeVisual: React.FC<{ visual: any }> = ({ visual }) => {
  const { n } = visual;
  const divisores: number[] = [];
  for (let i = 1; i <= n; i++) if (n % i === 0) divisores.push(i);
  return (<div className="flex flex-col items-center p-4 bg-black/5 rounded-2xl mb-4"><div className="text-4xl font-black mb-3" style={{ color: 'var(--primary-color)' }}>{n}</div><div className="text-xs font-bold opacity-80 mb-2">Sus divisores:</div><div className="flex gap-1.5 flex-wrap justify-center">{divisores.map((d, i) => (<span key={i} className="px-2.5 py-1 bg-teal-500 text-white font-black rounded-lg text-xs shadow">{d}</span>))}</div></div>);
};

export const PitagorasVisual: React.FC<{ visual: any }> = ({ visual }) => {
  const { a, b, c, findHyp } = visual;
  return (<div className="flex flex-col items-center p-4 bg-black/5 rounded-2xl mb-4"><svg viewBox="0 0 120 120" className="w-48 h-48 drop-shadow"><polygon points="20,100 100,100 20,30" fill="rgba(236,72,153,0.2)" stroke="#ec4899" strokeWidth="3" /><rect x="20" y="92" width="8" height="8" fill="none" stroke="#ec4899" strokeWidth="1.5" /><text x="55" y="115" textAnchor="middle" className="font-black" fontSize="11" fill="#ec4899">a = {a}</text><text x="10" y="70" textAnchor="middle" className="font-black" fontSize="11" fill="#ec4899" transform="rotate(-90, 10, 70)">b = {findHyp ? b : '?'}</text><text x="70" y="55" textAnchor="middle" className="font-black" fontSize="11" fill="#ec4899" transform="rotate(-40, 70, 55)">c = {findHyp ? '?' : c}</text></svg></div>);
};

export const StatsVisual: React.FC<{ visual: any }> = ({ visual }) => {
  const { data } = visual;
  const max = Math.max(...data);
  return (<div className="flex flex-col items-center p-4 bg-black/5 rounded-2xl mb-4"><div className="flex items-end gap-2 h-32">{data.map((v: number, i: number) => (<div key={i} className="flex flex-col items-center gap-1"><div className="text-xs font-black">{v}</div><div className="w-8 rounded-t-lg transition-all" style={{ height: `${(v/max)*100}%`, background: 'var(--gradient-primary)', minHeight: '8px' }} /></div>))}</div></div>);
};

export const ProbabilityVisual: React.FC<{ visual: any }> = ({ visual }) => {
  const { total, fav } = visual;
  return (<div className="flex flex-col items-center p-4 bg-black/5 rounded-2xl mb-4"><div className="flex flex-wrap justify-center gap-2 max-w-xs">{Array.from({ length: total }, (_, i) => (<div key={i} className={`w-8 h-8 rounded-full shadow ${i < fav ? 'bg-red-500' : 'bg-slate-300 dark:bg-slate-600'}`} />))}</div><div className="mt-3 text-sm font-bold opacity-80">{fav} rojas de {total} totales</div></div>);
};

export const ConjuntosVisual: React.FC<{ visual: any }> = ({ visual }) => {
  const { inter } = visual;
  return (<div className="flex flex-col items-center p-4 bg-black/5 rounded-2xl mb-4"><div className="flex items-center justify-center gap-2 font-black text-lg"><span className="p-3 bg-blue-500/20 rounded-full text-blue-600 border border-blue-500">A</span><span className="p-3 bg-purple-500/30 rounded-full text-purple-600 border-2 border-purple-500">A∩B={inter}</span><span className="p-3 bg-pink-500/20 rounded-full text-pink-600 border border-pink-500">B</span></div></div>);
};

export const NumberSetsVisual: React.FC<{ visual: any }> = ({ visual }) => {
  const { selected } = visual;
  const items = [{key:'N',label:'Naturales',color:'#22c55e'},{key:'Z',label:'Enteros',color:'#0ea5e9'},{key:'Q',label:'Racionales',color:'#a855f7'},{key:'R',label:'Reales',color:'#f97316'},{key:'C',label:'Complejos',color:'#ec4899'}];
  const isHighlighted = (key: string) => {
    const order = ['N', 'Z', 'Q', 'R', 'C'];
    const selIdx = order.indexOf(selected);
    const keyIdx = order.indexOf(key);
    if (selIdx === -1 || keyIdx === -1) return false;
    return keyIdx >= selIdx;
  };
  return (
    <div className="flex flex-col items-center p-4 bg-black/5 rounded-2xl mb-4 w-full">
      <div className="relative w-80 h-80 flex items-center justify-center">
        {/* Complex C */}
        <div className={`absolute inset-2 rounded-full border-4 flex items-center justify-center font-black text-lg transition-all duration-300 ${
          isHighlighted('C') ? 'border-pink-500 bg-pink-500/10 scale-100 shadow-[0_0_20px_rgba(236,72,153,0.3)]' : 'border-slate-300 dark:border-slate-700 bg-transparent text-slate-400'
        }`}>
          <span className="absolute top-4 font-black">C</span>
          
          {/* Real R */}
          <div className={`absolute inset-8 rounded-full border-4 flex items-center justify-center font-black text-lg transition-all duration-300 ${
            isHighlighted('R') ? 'border-orange-500 bg-orange-500/10 shadow-[0_0_15px_rgba(249,115,22,0.3)]' : 'border-slate-300 dark:border-slate-700 bg-transparent text-slate-400'
          }`}>
            <span className="absolute top-4 font-black">R</span>
            
            {/* Rational Q */}
            <div className={`absolute inset-8 rounded-full border-4 flex items-center justify-center font-black text-lg transition-all duration-300 ${
              isHighlighted('Q') ? 'border-purple-500 bg-purple-500/10 shadow-[0_0_12px_rgba(168,85,247,0.3)]' : 'border-slate-300 dark:border-slate-700 bg-transparent text-slate-400'
            }`}>
              <span className="absolute top-4 font-black">Q</span>
              
              {/* Integer Z */}
              <div className={`absolute inset-8 rounded-full border-4 flex items-center justify-center font-black text-lg transition-all duration-300 ${
                isHighlighted('Z') ? 'border-sky-500 bg-sky-500/10 shadow-[0_0_10px_rgba(14,165,233,0.3)]' : 'border-slate-300 dark:border-slate-700 bg-transparent text-slate-400'
              }`}>
                <span className="absolute top-4 font-black">Z</span>
                
                {/* Natural N */}
                <div className={`absolute inset-8 rounded-full border-4 flex items-center justify-center font-black text-lg transition-all duration-300 ${
                  isHighlighted('N') ? 'border-emerald-500 bg-emerald-500/15 shadow-[0_0_10px_rgba(16,185,129,0.4)] animate-pulse' : 'border-slate-300 dark:border-slate-700 bg-transparent text-slate-400'
                }`}>
                  <span className="font-black">N</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-2 flex-wrap justify-center mt-4">
        {items.map(item => (
          <span key={item.key} className={`px-3 py-1 rounded-full text-xs font-black border-2 transition-all ${isHighlighted(item.key) ? 'scale-105 shadow-md font-bold' : 'opacity-40'}`} style={{ color: item.color, borderColor: item.color, background: `${item.color}22` }}>
            {item.key}: {item.label}
          </span>
        ))}
      </div>
    </div>
  );
};

export const CriptografiaVisual: React.FC<{ visual: any }> = ({ visual }) => {
  const { start, shift, end } = visual;
  return (<div className="flex flex-col items-center p-4 bg-black/5 rounded-2xl mb-4"><div className="flex items-center gap-3 font-black text-2xl"><span className="p-3 bg-slate-200 dark:bg-slate-800 rounded-xl">{start}</span><span className="text-teal-500 text-lg">+{shift} ➔</span><span className="p-3 bg-teal-500/20 text-teal-600 dark:text-teal-400 rounded-xl border-2 border-teal-500">{end}</span></div></div>);
};


export const KidsVisual: React.FC<{ visual: any }> = ({ visual }) => {
  if (!visual) return null;

  const repeat = (icon: string, n: number) => (
    <div className="flex gap-2 flex-wrap justify-center text-4xl">
      {Array.from({ length: n }).map((_, i) => <span key={i}>{icon}</span>)}
      {n === 0 && <span className="text-sm font-black opacity-70">Vacío</span>}
    </div>
  );

  if (visual.kind === 'compare-counts') {
    return (
      <div className="grid grid-cols-2 gap-3 p-4 rounded-3xl bg-black/5 border-2 border-border-color">
        <div className="p-4 rounded-3xl bg-red-500/10 border-2 border-red-500/30 text-center">
          <div className="font-black mb-2">Caja A</div>
          {repeat(visual.leftIcon || '🔴', visual.left)}
        </div>
        <div className="p-4 rounded-3xl bg-blue-500/10 border-2 border-blue-500/30 text-center">
          <div className="font-black mb-2">Caja B</div>
          {repeat(visual.rightIcon || '🔵', visual.right)}
        </div>
      </div>
    );
  }

  if (visual.kind === 'items') {
    return (
      <div className="p-5 rounded-3xl bg-black/5 border-2 border-border-color text-center">
        <div className="text-5xl flex gap-3 flex-wrap justify-center">
          {visual.items.map((x: string, i: number) => <span key={i}>{x}</span>)}
        </div>
      </div>
    );
  }

  if (visual.kind === 'model-choice') {
    return (
      <div className="p-5 rounded-3xl bg-black/5 border-2 border-border-color text-center">
        <div className="text-xs font-black uppercase opacity-70 mb-2">Modelo</div>
        <div className="text-7xl">{visual.model}</div>
      </div>
    );
  }

  if (visual.kind === 'differences') {
    const a: string[] = visual.a || ['☀️', '🏠', '⚽', '🌷'];
    const b: string[] = visual.b || ['☀️', '🏠', '🏀', '🌷'];
    const panel = (items: string[], label: string) => (
      <div className="p-4 rounded-3xl bg-sky-200 border-4 border-sky-400 text-center">
        <div className="text-xs font-black uppercase opacity-60 mb-1">Dibujo {label}</div>
        <div className="text-5xl flex gap-3 flex-wrap justify-center">
          {items.map((x, i) => <span key={i} role="img" aria-label={x}>{x}</span>)}
        </div>
      </div>
    );
    return (
      <div className="grid md:grid-cols-2 gap-3">
        {panel(a, 'A')}
        {panel(b, 'B')}
      </div>
    );
  }

  if (visual.kind === 'sizes') {
    return (
      <div className="p-5 rounded-3xl bg-black/5 border-2 border-border-color text-center">
        <div className="flex items-end justify-center gap-6">
          <div><div className="text-4xl">🧸</div><div className="font-black text-xs">pequeño</div></div>
          <div><div className="text-6xl">🐻</div><div className="font-black text-xs">mediano</div></div>
          <div><div className="text-8xl">🐻</div><div className="font-black text-xs">grande</div></div>
        </div>
      </div>
    );
  }

  if (visual.kind === 'missing') {
    return (
      <div className="p-5 rounded-3xl bg-black/5 border-2 border-border-color text-center">
        <div className="text-5xl flex gap-3 justify-center flex-wrap">
          {visual.sequence.map((x: string, i: number) => <span key={i}>{x}</span>)}
        </div>
      </div>
    );
  }

  if (visual.kind === 'empty-box') {
    return (
      <div className="p-5 rounded-3xl bg-black/5 border-2 border-border-color text-center">
        <div className="mx-auto w-48 h-32 rounded-3xl border-4 border-dashed border-slate-400 flex items-center justify-center">
          <span className="font-black opacity-60">Caja vacía</span>
        </div>
      </div>
    );
  }

  if (visual.kind === 'number-icons') {
    return (
      <div className="p-5 rounded-3xl bg-black/5 border-2 border-border-color text-center">
        {repeat(visual.icon || '☝️', visual.n)}
      </div>
    );
  }

  if (visual.kind === 'dice') {
    const faces = ['⚀','⚁','⚂','⚃','⚄','⚅'];
    return (
      <div className="p-5 rounded-3xl bg-black/5 border-2 border-border-color text-center text-8xl">
        {faces[(visual.n || 1) - 1]}
      </div>
    );
  }

  if (visual.kind === 'pattern') {
    return (
      <div className="p-5 rounded-3xl bg-black/5 border-2 border-border-color text-center">
        <div className="text-5xl flex gap-3 justify-center flex-wrap">
          {visual.sequence.map((x: string, i: number) => <span key={i}>{x}</span>)}
          <span>❔</span>
        </div>
      </div>
    );
  }

  if (visual.kind === 'money') {
    return (
      <div className="p-5 rounded-3xl bg-yellow-400/10 border-2 border-yellow-400/30 text-center">
        <div className="text-7xl mb-2">{visual.icon}</div>
        <div className="font-black text-xl">{visual.label}</div>
      </div>
    );
  }

  if (visual.kind === 'bar-chart') {
    return (
      <div className="p-5 rounded-3xl bg-black/5 border-2 border-border-color">
        <div className="flex items-end justify-center gap-5 min-h-56">
          {visual.bars.map((b: any, i: number) => (
            <div key={i} className="flex flex-col items-center gap-1">
              {Array.from({ length: b.n }).map((_: any, j: number) => (
                <div key={j} className="w-12 h-9 rounded-xl border-2 border-white shadow" style={{ background: b.color }} />
              ))}
              <div className="text-3xl">{b.icon}</div>
              <div className="font-black text-xs">{b.label}</div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (visual.kind === 'position') {
    return (
      <div className="p-5 rounded-3xl bg-blue-500/10 border-2 border-blue-500/30 text-center">
        <div className="relative mx-auto w-56 h-36 rounded-3xl border-4 border-blue-500 bg-surface-color">
          <div className={'absolute text-5xl ' + (visual.inside ? 'left-20 top-10' : '-right-8 top-10')}>⚽</div>
        </div>
      </div>
    );
  }

  if (visual.kind === 'pizza') {
    return (
      <div className="p-5 rounded-3xl bg-orange-500/10 border-2 border-orange-500/30 text-center">
        <div className="text-8xl">🍕</div>
        <div className="font-black mt-2">Una pizza partida a la mitad forma 2 partes iguales.</div>
      </div>
    );
  }

  if (visual.kind === 'bingo') {
    return (
      <div className="grid grid-cols-5 gap-2 max-w-sm mx-auto p-4 rounded-3xl bg-black/5 border-2 border-border-color">
        {Array.from({ length: visual.max }).map((_, i) => (
          <div key={i} className={'h-14 rounded-2xl border-2 flex items-center justify-center font-black text-xl ' + (i + 1 === visual.called ? 'bg-yellow-400 text-slate-900 border-yellow-500' : 'bg-surface-color border-border-color')}>
            {i + 1}
          </div>
        ))}
      </div>
    );
  }

  return null;
};

// Dispatcher
export const VisualComponent: React.FC<{ visual: any }> = ({ visual }) => {
  if (!visual) return null;
  switch (visual.type) {
    case 'kids': return <KidsVisual visual={visual} />;
    case 'number-line': return <NumberLineVisual visual={visual} />;
    case 'grid': return <GridVisual visual={visual} />;
    case 'fraction': return <FractionVisual visual={visual} />;
    case 'fraction-ops': return <FractionOpsVisual visual={visual} />;
    case 'balance': return <BalanceVisual visual={visual} />;
    case 'shape': return <ShapeVisual visual={visual} />;
    case 'groups': return <GroupsVisual visual={visual} />;
    case 'train': return <TrainVisual visual={visual} />;
    case 'factorial': return <FactorialVisual visual={visual} />;
    case 'permutation': return <PermutationVisual visual={visual} />;
    case 'combination': return <CombinationVisual visual={visual} />;
    case 'percent': return <PercentVisual visual={visual} />;
    case 'counting': return <CountingVisual visual={visual} />;
    case 'shape-quiz': return <ShapeQuizVisual visual={visual} />;
    case 'place-value': return <PlaceValueVisual visual={visual} />;
    case 'prime': return <PrimeVisual visual={visual} />;
    case 'pitagoras': return <PitagorasVisual visual={visual} />;
    case 'stats': return <StatsVisual visual={visual} />;
    case 'probability': return <ProbabilityVisual visual={visual} />;
    case 'conjuntos': return <ConjuntosVisual visual={visual} />;
    case 'number-sets': return <NumberSetsVisual visual={visual} />;
    case 'criptografia': return <CriptografiaVisual visual={visual} />;
    default: return null;
  }
};

// Option labels
export const getOptionLabel = (type: string, option: number | string): string => {
  if (typeof option === 'string') return option;
  if (type === 'figuras') return ['🔵 Círculo', '🟦 Cuadrado', '🔺 Triángulo', '🟩 Rectángulo'][option] || String(option);
  if (type === 'divisibilidad' || type === 'primos') return option === 1 ? '✅ SÍ' : '❌ NO';
  if (type === 'historia') { const map: Record<number, string> = { 3.14: 'π (Pi)', 1.61: 'φ (Áureo)', 2.71: 'e (Euler)', 0: 'Cero' }; return map[option] ?? option.toString(); }
  if (type === 'fracciones-complejas') { const n = Math.floor(option / 1000); const d = option % 1000; return `${n}/${d}`; }
  if (type === 'conjuntos-numericos') { const map: Record<number, string> = { 1: 'Naturales (N)', 2: 'Enteros (Z)', 3: 'Reales (R)', 5: 'Complejos (C)' }; return map[option] ?? option.toString(); }
  return option.toString();
};
