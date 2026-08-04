import React, { useMemo, useState } from 'react';
import { BookMarked, Search } from 'lucide-react';

const formulaSections = [
  {
    group: 'Aritmética Básica',
    color: '#22c55e',
    items: [
      ['Suma', 'a + b', 'Combinar cantidades'],
      ['Resta', 'a − b', 'Diferencia entre cantidades'],
      ['Multiplicación', 'a × b', 'Suma repetida de a, b veces'],
      ['División', 'a ÷ b = cociente + resto/b', 'Repartir a en b partes'],
      ['Propiedad Conmutativa', 'a + b = b + a  ;  a × b = b × a', 'El orden no altera resultado'],
      ['Propiedad Asociativa', '(a+b)+c = a+(b+c)', 'Agrupar como prefieras'],
      ['Propiedad Distributiva', 'a(b+c) = ab + ac', 'Distribuir la multiplicación'],
      ['Jerarquía de operaciones', '1° Paréntesis → 2° Potencias → 3° ×÷ → 4° +−', 'Orden PEMDAS / BODMAS'],
    ]
  },
  {
    group: 'Divisibilidad y Primos',
    color: '#10b981',
    items: [
      ['Divisible por 2', 'Último dígito es 0,2,4,6,8', 'Número par'],
      ['Divisible por 3', 'Suma de dígitos es múltiplo de 3', 'Ej: 123 → 1+2+3=6 ✓'],
      ['Divisible por 4', 'Últimos 2 dígitos forman múltiplo de 4', 'Ej: 316 → 16÷4=4 ✓'],
      ['Divisible por 5', 'Termina en 0 o 5', 'Ej: 45, 100'],
      ['Divisible por 6', 'Divisible por 2 Y por 3', 'Doble criterio'],
      ['Divisible por 9', 'Suma de dígitos es múltiplo de 9', 'Ej: 729 → 7+2+9=18 ✓'],
      ['Divisible por 10', 'Termina en 0', 'Ej: 500'],
      ['Divisible por 11', '|suma dígitos impares − suma dígitos pares| múltiplo de 11', 'Ej: 121 → |1+1|−|2|=0 ✓'],
      ['Número primo', 'Solo divisible por 1 y sí mismo', '2, 3, 5, 7, 11, 13...'],
      ['MCM', 'mcm(a,b) = |a×b| / mcd(a,b)', 'Mínimo común múltiplo'],
      ['MCD (Euclides)', 'mcd(a,b) = mcd(b, a mod b)', 'Máximo común divisor'],
    ]
  },
  {
    group: 'Fracciones y Decimales',
    color: '#0ea5e9',
    items: [
      ['Suma (mismo den)', 'a/d + b/d = (a+b)/d', 'Solo sumar numeradores'],
      ['Suma (distinto den)', 'a/b + c/d = (ad + bc) / bd', 'Cruzar y sumar'],
      ['Resta', 'a/b − c/d = (ad − bc) / bd', 'Cruzar y restar'],
      ['Multiplicación', '(a/b) × (c/d) = ac / bd', 'Arriba × arriba, abajo × abajo'],
      ['División', '(a/b) ÷ (c/d) = (a/b) × (d/c)', 'Invertir la segunda y multiplicar'],
      ['Simplificar', 'Dividir num y den entre su MCD', 'Ej: 6/8 → ÷2 → 3/4'],
      ['Fracción → Decimal', 'Dividir numerador ÷ denominador', 'Ej: 3/4 = 0.75'],
      ['Decimal → Fracción', '0.75 = 75/100 = 3/4', 'Simplificar después'],
      ['Fracción → Porcentaje', '(n/d) × 100%', 'Ej: 3/4 = 75%'],
      ['Fracción mixta', 'a b/c = (ac+b)/c', 'Convertir a impropia'],
    ]
  },
  {
    group: 'Porcentajes y Proporciones',
    color: '#16a34a',
    items: [
      ['Porcentaje de N', 'p% de N = (p × N) / 100', 'Descuentos, impuestos'],
      ['Aumento %', 'N × (1 + p/100)', 'Precio con IVA'],
      ['Descuento %', 'N × (1 − p/100)', 'Precio con descuento'],
      ['Regla de tres directa', 'a/b = c/x → x = bc/a', 'Proporcionalidad directa'],
      ['Regla de tres inversa', 'a×b = c×x → x = ab/c', 'Proporcionalidad inversa'],
      ['Razón', 'a : b = a/b', 'Comparar dos cantidades'],
      ['Proporción', 'a/b = c/d', 'Igualdad de razones'],
    ]
  },
  {
    group: 'Álgebra (Ecuaciones)',
    color: '#a855f7',
    items: [
      ['Ecuación lineal', 'ax + b = c → x = (c−b)/a', 'Despeje básico de x'],
      ['Ecuación con paréntesis', 'a(x+b) = c → x = c/a − b', 'Distribuir primero'],
      ['Ecuación cuadrática', 'x = [−b ± √(b²−4ac)] / 2a', 'Fórmula general'],
      ['Discriminante', 'Δ = b² − 4ac', 'Δ>0: 2 reales, Δ=0: 1 real, Δ<0: complejas'],
      ['Completar cuadrado', 'x² + bx + (b/2)² = (x + b/2)²', 'Método algebraico'],
      ['Sistemas 2×2', 'Sustitución, igualación, reducción', 'Dos ecuaciones, dos incógnitas'],
      ['Leyes de exponentes', 'aⁿ × aᵐ = aⁿ⁺ᵐ  ;  aⁿ/aᵐ = aⁿ⁻ᵐ  ;  (aⁿ)ᵐ = aⁿᵐ', 'Producto, cociente, potencia de potencia'],
      ['Exponente negativo', 'a⁻ⁿ = 1/aⁿ', 'Invertir la base'],
      ['Exponente cero', 'a⁰ = 1 (a≠0)', 'Cualquier número a la cero es 1'],
      ['Raíz cuadrada', '√a = a^(1/2)', 'Inversa de elevar al cuadrado'],
      ['Raíz cúbica', '∛a = a^(1/3)', 'Inversa de elevar al cubo'],
    ]
  },
  {
    group: 'Productos Notables y Factorización',
    color: '#7c3aed',
    items: [
      ['Binomio al cuadrado (+)', '(a+b)² = a² + 2ab + b²', 'Trinomio cuadrado perfecto'],
      ['Binomio al cuadrado (−)', '(a−b)² = a² − 2ab + b²', 'Trinomio cuadrado perfecto'],
      ['Binomios conjugados', '(a+b)(a−b) = a² − b²', 'Diferencia de cuadrados'],
      ['Binomio con término común', '(x+a)(x+b) = x² + (a+b)x + ab', 'Factorización de trinomios'],
      ['Diferencia de cubos', 'a³ − b³ = (a−b)(a² + ab + b²)', 'Factorización cúbica'],
      ['Suma de cubos', 'a³ + b³ = (a+b)(a² − ab + b²)', 'Factorización cúbica'],
      ['Factor común', 'ab + ac = a(b+c)', 'Sacar el factor compartido'],
    ]
  },
  {
    group: 'Geometría Plana',
    color: '#ec4899',
    items: [
      ['Área rectángulo', 'A = b × h', 'Base por altura'],
      ['Perímetro rectángulo', 'P = 2(b + h)', 'Suma de todos los lados'],
      ['Área cuadrado', 'A = L²', 'Lado al cuadrado'],
      ['Perímetro cuadrado', 'P = 4L', 'Cuatro lados iguales'],
      ['Área triángulo', 'A = (b × h) / 2', 'Base por altura entre dos'],
      ['Área triángulo (Herón)', 'A = √[s(s−a)(s−b)(s−c)]  donde s=(a+b+c)/2', 'Con los 3 lados'],
      ['Área rombo', 'A = (D × d) / 2', 'Producto de diagonales entre 2'],
      ['Área trapecio', 'A = (B + b) × h / 2', 'Bases mayor y menor'],
      ['Área círculo', 'A = π r²', 'Pi por radio al cuadrado'],
      ['Circunferencia', 'C = 2πr = πd', 'Longitud del borde'],
      ['Área sector circular', 'A = (θ/360) × πr²', 'Porción del círculo'],
      ['Longitud de arco', 'L = (θ/360) × 2πr', 'Porción del perímetro'],
      ['Área polígono regular', 'A = (perímetro × apotema) / 2', 'Con apotema'],
      ['Suma ángulos interiores', 'S = (n−2) × 180°', 'n = número de lados'],
      ['Cada ángulo interior (regular)', '(n−2) × 180° / n', 'Polígono regular'],
    ]
  },
  {
    group: 'Geometría Analítica',
    color: '#db2777',
    items: [
      ['Distancia entre 2 puntos', 'd = √[(x₂−x₁)² + (y₂−y₁)²]', 'En el plano cartesiano'],
      ['Punto medio', 'M = ((x₁+x₂)/2, (y₁+y₂)/2)', 'Centro del segmento'],
      ['Pendiente de recta', 'm = (y₂−y₁) / (x₂−x₁)', 'Inclinación'],
      ['Ecuación punto-pendiente', 'y − y₁ = m(x − x₁)', 'Recta por un punto'],
      ['Ecuación pendiente-ordenada', 'y = mx + b', 'Forma explícita'],
      ['Ecuación general', 'Ax + By + C = 0', 'Forma estándar'],
      ['Rectas paralelas', 'm₁ = m₂', 'Misma pendiente'],
      ['Rectas perpendiculares', 'm₁ × m₂ = −1', 'Pendientes opuestas recíprocas'],
      ['Ecuación de la circunferencia', '(x−h)² + (y−k)² = r²', 'Centro (h,k), radio r'],
    ]
  },
  {
    group: 'Pitágoras y Trigonometría',
    color: '#f43f5e',
    items: [
      ['Teorema de Pitágoras', 'a² + b² = c²', 'Triángulo rectángulo'],
      ['Seno', 'sen θ = cateto opuesto / hipotenusa', 'SOH'],
      ['Coseno', 'cos θ = cateto adyacente / hipotenusa', 'CAH'],
      ['Tangente', 'tan θ = cateto opuesto / cateto adyacente', 'TOA'],
      ['Identidad pitagórica', 'sen²θ + cos²θ = 1', 'Fundamental'],
      ['Ley de senos', 'a/senA = b/senB = c/senC', 'Triángulo cualquiera'],
      ['Ley de cosenos', 'c² = a² + b² − 2ab·cosC', 'Triángulo cualquiera'],
      ['Ángulos notables (sen)', 'sen 30°=1/2, sen 45°=√2/2, sen 60°=√3/2', 'Valores exactos'],
      ['Ángulos notables (cos)', 'cos 30°=√3/2, cos 45°=√2/2, cos 60°=1/2', 'Valores exactos'],
      ['Radianes ↔ Grados', 'rad = grados × π/180', 'Conversión'],
    ]
  },
  {
    group: 'Volumen y Superficie',
    color: '#f97316',
    items: [
      ['Vol. cubo', 'V = L³', 'Lado al cubo'],
      ['Vol. prisma rectangular', 'V = largo × ancho × alto', 'Caja'],
      ['Vol. cilindro', 'V = πr²h', 'Área de base × altura'],
      ['Vol. cono', 'V = πr²h / 3', 'Tercio del cilindro'],
      ['Vol. esfera', 'V = (4/3)πr³', 'Bola completa'],
      ['Vol. pirámide', 'V = (1/3) × Abase × h', 'Tercio del prisma'],
      ['Sup. esfera', 'S = 4πr²', 'Área de la superficie'],
      ['Sup. cilindro', 'S = 2πr² + 2πrh', 'Tapas + lateral'],
      ['Sup. cono', 'S = πr² + πrg', 'Base + lateral (g=generatriz)'],
    ]
  },
  {
    group: 'Combinatoria y Probabilidad',
    color: '#0891b2',
    items: [
      ['Factorial', 'n! = n(n−1)(n−2)...1', 'Conteo ordenado'],
      ['Permutación', 'P(n,r) = n! / (n−r)!', 'Orden importa'],
      ['Combinación', 'C(n,r) = n! / [r!(n−r)!]', 'Orden no importa'],
      ['Principio multiplicativo', 'Si evento A tiene m formas y B tiene n → total = m×n', 'Conteo fundamental'],
      ['Principio aditivo', 'Si A ó B (excluyentes) → total = m + n', 'Conteo fundamental'],
      ['Probabilidad Laplace', 'P(A) = favorables / posibles', 'Casos equiprobables'],
      ['Complemento', "P(A') = 1 − P(A)", 'Lo contrario'],
      ['Unión (no excluyentes)', 'P(A∪B) = P(A) + P(B) − P(A∩B)', 'Evitar doble conteo'],
      ['Eventos independientes', 'P(A∩B) = P(A) × P(B)', 'No se afectan'],
      ['Probabilidad condicional', 'P(A|B) = P(A∩B) / P(B)', 'A dado que B ocurrió'],
      ['Esperanza', 'E(X) = Σ xᵢ × P(xᵢ)', 'Valor esperado'],
      ['Varianza', 'Var(X) = Σ (xᵢ−μ)² × P(xᵢ)', 'Dispersión'],
    ]
  },
  {
    group: 'Estadística',
    color: '#0284c7',
    items: [
      ['Media aritmética', 'x̄ = Σxᵢ / n', 'Promedio'],
      ['Mediana', 'Valor central al ordenar datos', 'Si n par: promedio de los 2 centrales'],
      ['Moda', 'Valor más frecuente', 'Puede haber varias o ninguna'],
      ['Rango', 'R = máximo − mínimo', 'Amplitud de los datos'],
      ['Desviación media', 'DM = Σ|xᵢ − x̄| / n', 'Dispersión promedio'],
      ['Varianza', 'σ² = Σ(xᵢ − x̄)² / n', 'Dispersión cuadrática'],
      ['Desviación estándar', 'σ = √varianza', 'Raíz de la varianza'],
      ['Cuartiles', 'Q1 (25%), Q2 (50%=mediana), Q3 (75%)', 'Dividir datos en 4 partes'],
      ['Rango intercuartílico', 'IQR = Q3 − Q1', 'Dispersión del 50% central'],
    ]
  },
  {
    group: 'Logaritmos',
    color: '#6366f1',
    items: [
      ['Definición', 'log_b(a) = c ⟺ b^c = a', 'Función inversa de exponencial'],
      ['Logaritmo de 1', 'log_b(1) = 0', 'Cualquier base'],
      ['Logaritmo de la base', 'log_b(b) = 1', 'Base = argumento'],
      ['Producto', 'log(ab) = log(a) + log(b)', 'Propiedad multiplicativa'],
      ['Cociente', 'log(a/b) = log(a) − log(b)', 'Propiedad divisoria'],
      ['Potencia', 'log(aⁿ) = n × log(a)', 'Bajar el exponente'],
      ['Cambio de base', 'log_b(a) = log_c(a) / log_c(b)', 'Convertir bases'],
      ['Logaritmo natural', 'ln(x) = log_e(x), e ≈ 2.718', 'Base e'],
    ]
  },
  {
    group: 'Funciones',
    color: '#8b5cf6',
    items: [
      ['Lineal', 'f(x) = mx + b', 'Recta, pendiente m'],
      ['Cuadrática', 'f(x) = ax² + bx + c', 'Parábola'],
      ['Vértice parábola', 'V = (−b/2a, f(−b/2a))', 'Punto mínimo o máximo'],
      ['Exponencial', 'f(x) = a × bˣ', 'Crecimiento o decaimiento'],
      ['Logarítmica', 'f(x) = log_b(x)', 'Inversa de exponencial'],
      ['Valor absoluto', 'f(x) = |x|', 'Siempre positivo, forma de V'],
      ['Raíz cuadrada', 'f(x) = √x', 'Solo x ≥ 0'],
      ['Racional', 'f(x) = p(x)/q(x)', 'Cociente de polinomios'],
      ['Dominio', 'Conjunto de valores válidos de x', 'Ej: √x → x ≥ 0'],
      ['Rango', 'Conjunto de valores de salida f(x)', 'Imagen de la función'],
    ]
  },
  {
    group: 'Cálculo (Introducción)',
    color: '#dc2626',
    items: [
      ['Límite', 'lim x→a f(x) = L', 'Valor al que se acerca f'],
      ['Derivada', "f'(x) = lim h→0 [f(x+h)−f(x)]/h", 'Tasa de cambio instantánea'],
      ['Derivada de xⁿ', 'd/dx (xⁿ) = nxⁿ⁻¹', 'Regla de la potencia'],
      ['Derivada de constante', 'd/dx (c) = 0', 'Las constantes no cambian'],
      ['Regla del producto', "(fg)' = f'g + fg'", 'Derivar productos'],
      ['Regla de la cadena', "[f(g(x))]' = f'(g(x)) × g'(x)", 'Funciones compuestas'],
      ['Integral indefinida', '∫ xⁿ dx = xⁿ⁺¹/(n+1) + C', 'Antiderivada'],
      ['Integral definida', '∫ₐᵇ f(x)dx = F(b) − F(a)', 'Área bajo la curva'],
      ['Área entre curvas', 'A = ∫ₐᵇ |f(x)−g(x)| dx', 'Entre dos funciones'],
    ]
  },
  {
    group: 'Matemáticas Aplicadas',
    color: '#059669',
    items: [
      ['Interés simple', 'I = C × r × t', 'Capital × tasa × tiempo'],
      ['Interés compuesto', 'M = C(1 + r)ᵗ', 'Crecimiento exponencial'],
      ['IVA', 'Precio final = precio × (1 + IVA/100)', 'Impuesto al valor agregado'],
      ['Descuento', 'Precio final = precio × (1 − desc/100)', 'Ahorro en compras'],
      ['Temperatura C→F', 'F = (9/5)C + 32', 'Celsius a Fahrenheit'],
      ['Temperatura C→K', 'K = C + 273.15', 'Celsius a Kelvin'],
      ['Velocidad', 'v = d / t', 'Distancia entre tiempo'],
      ['Densidad', 'ρ = m / V', 'Masa entre volumen'],
      ['Escala', 'distancia real = distancia mapa × factor', 'Mapas y planos'],
      ['Pendiente terreno', 'p = (desnivel / distancia) × 100%', 'Inclinación en porcentaje'],
    ]
  },
  {
    group: 'Constantes Universales',
    color: '#f43f5e',
    items: [
      ['Pi (π)', '3.14159265...', 'Razón circunferencia/diámetro'],
      ['Número de Euler (e)', '2.71828182...', 'Base del logaritmo natural'],
      ['Número áureo (φ)', '1.61803398...', 'Proporción áurea: (1+√5)/2'],
      ['Raíz de 2', '1.41421356...', 'Diagonal del cuadrado unitario'],
      ['Raíz de 3', '1.73205080...', 'Altura del triángulo equilátero unitario'],
    ]
  }
];

export const FormulaHub: React.FC = () => {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState('Aritmética Básica');

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return formulaSections;
    return formulaSections
      .map(section => ({ ...section, items: section.items.filter(([name, formula, desc]) => `${name} ${formula} ${desc}`.toLowerCase().includes(q)) }))
      .filter(section => section.items.length > 0);
  }, [query]);

  return (
    <div className="max-w-6xl mx-auto space-y-5 pb-20 md:pb-6">
      <div className="math-card text-white" style={{ background: 'var(--gradient-primary)' }}>
        <h1 className="text-2xl md:text-4xl font-black flex items-center gap-3"><BookMarked size={36} /> Formulario Matemático Completo</h1>
        <p className="font-bold opacity-90 mt-2">Más de 180 fórmulas organizadas: aritmética, álgebra, trigonometría, cálculo, estadística, combinatoria y aplicadas.</p>
      </div>
      <div className="math-card flex items-center gap-3">
        <Search size={22} style={{ color: 'var(--primary-color)' }} />
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Buscar: Pitágoras, derivada, interés, fracciones..." className="flex-1 bg-transparent outline-none font-bold" style={{ color: 'var(--text-primary)' }} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-5">
        <div className="math-card h-fit space-y-1.5 overflow-y-auto max-h-[80vh] sticky top-4">
          <div className="text-xs font-black uppercase opacity-60 mb-2">Categorías ({formulaSections.length})</div>
          {formulaSections.map(section => (
            <button key={section.group} onClick={() => { setOpen(section.group); setQuery(''); }}
              className={`w-full text-left p-2.5 rounded-xl font-black text-xs transition-all ${open === section.group && !query ? 'text-white shadow-lg' : 'hover:opacity-80'}`}
              style={open === section.group && !query ? { background: section.color } : { background: 'var(--surface-color)' }}>
              {section.group}
              <span className="ml-1 opacity-60">({section.items.length})</span>
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {(query ? filtered : formulaSections.filter(s => s.group === open)).map(section => (
            <div key={section.group} className="math-card">
              <h2 className="font-black text-xl mb-4 flex items-center gap-3" style={{ color: section.color }}>
                {section.group}
                <span className="text-xs opacity-60 font-bold">({section.items.length} fórmulas)</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {section.items.map(([name, formula, desc]) => (
                  <div key={name} className="p-4 rounded-2xl border-2 border-[var(--border-color)] shadow-sm hover:shadow-md hover:scale-[1.01] transition-all"
                    style={{ background: 'var(--surface-color)' }}>
                    <div className="font-black text-sm mb-1" style={{ color: section.color }}>{name}</div>
                    <div className="font-mono text-sm font-bold p-2.5 rounded-xl mb-2 overflow-x-auto"
                      style={{ background: 'var(--background-color)', color: 'var(--text-primary)' }}>{formula}</div>
                    <div className="text-xs font-bold opacity-70" style={{ color: 'var(--text-secondary)' }}>{desc}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
          {query && filtered.length === 0 && (
            <div className="math-card text-center py-12">
              <div className="text-5xl mb-4">🔍</div>
              <p className="font-black text-xl opacity-60">No se encontraron fórmulas para "{query}"</p>
              <p className="text-sm font-bold opacity-50 mt-2">Intenta con otro término como "área", "derivada" o "probabilidad".</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
