import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ChevronRight, GraduationCap, School, Baby, BookOpen, Calculator, Settings, Brain, Compass, Globe, Search, X } from 'lucide-react';
import {
  Adivinanzas,
  CalculadoraExploracion,
  CalendarioCiclico,
  CapacidadVisual,
  ClasificacionAgrupacion,
  Colores,
  CombinacionInteractiva,
  Comparaciones,
  ConceptosLogicoMatematicos,
  ConjuntosNumericosInteractivo,
  ContarObjetosInteractivos,
  ConteoPreescolar,
  CriptografiaCesarInteractiva,
  CuadradosMagicos,
  CuadraticaInteractiva,
  CuerposGeometricos,
  DatosGraficos,
  DecimalesInteractivo,
  DineroJuguete,
  DivisibilidadInteractiva,
  DivisionInteractiva,
  EcuacionInteractiva,
  EscalasPlanos,
  EstadisticaInteractiva,
  FactorialInteractivo,
  FacturaIva,
  FigurasAvanzadasInteractivo,
  FinanzasCotidianas,
  Formas,
  FormulasBach,
  FraccionesComplejasInteractivo,
  FraccionSimple,
  FracOperaciones,
  GeometriaInteractiva,
  GeometriaPlanaPrimaria,
  HerramientasTech,
  HistoriaMates,
  InicioPrimariaBaja,
  JerarquiaPEMDAS,
  LogicaAnalogias,
  MasMenosIgual,
  McmMcdInteractivo,
  MedicionCuerpo,
  MedicionNoConvencional,
  MezclaColores,
  MonedasCambio,
  MultInteractiva,
  NocionesEspacialesOrientacion,
  NocionesTemporales,
  NominaCotidianas,
  NumerosNegativosInteractivo,
  NumerosPrimos,
  NutricionTablas,
  OperacionesInformales,
  Patrones,
  PerimetroSimple,
  PermutacionInteractiva,
  PitagorasInteractivo,
  PolyaMethod,
  PorcentajeInteractivo,
  PotenciasInteractiva,
  ProbabilidadInteractiva,
  ProbabilidadLaplace,
  ReglaDeTres,
  RelojAnalogo,
  RestaInteractiva,
  SeriacionOrden,
  SeriesInteractiva,
  SimetriaComposicion,
  SimetriaVistas,
  SimplificarFracciones,
  SingapurBar,
  SistemaEcuaciones,
  SistemasAntiguos,
  SucesionesSimples,
  SumaInteractiva,
  SumaLlevando,
  TablasMultiplicar,
  Temporal,
  TeoriaConjuntosInteractiva,
  TiempoCalendario,
  TiposDeAngulos,
  TiposFracciones,
  Trayectorias,
  TrigTalesInteractivo,
  UbicacionEspacial,
  ValorPosicional,
  ValorPosicionalMillones,
  VolumenCilindro,
  VolumenCono,
  VolumenCubo,
  VolumenEsfera,
  VolumenPiramide,
  VolumenPrisma,
  Cuerpos3D,
  EstadisticaPrimaria,
  ProbabilidadPrimaria,
} from './sections';

// ==========================================
// MAIN LEARN VIEW
// ==========================================

type CategoryLevel = 'preescolar' | 'primaria-baja' | 'primaria-alta' | 'secundaria' | 'bachillerato' | 'razonamiento' | 'enriquecimiento' | 'aplicadas' | 'historia' | 'herramientas';

interface SchoolConfig {
  name: string; icon: React.ReactNode; color: string; description: string;
  ageRange: string;
  tabs: { id: string; name: string; icon: string }[];
}

const SCHOOLS: Record<CategoryLevel, SchoolConfig> = {
  'preescolar': {
    name: 'Preescolar', icon: <Baby size={28} />, color: '#fbbf24', ageRange: '3 a 5 años',
    description: 'Conteo, formas, colores, comparaciones y patrones simples.',
    tabs: [
      {id:'colores',name:'Colores',icon:'🎨'},{id:'combinar-colores',name:'Mezclar',icon:'🖌️'},{id:'formas',name:'Formas',icon:'🔷'},{id:'cuerpos-geometricos',name:'Cuerpos 3D',icon:'🧊'},
      {id:'simetria-composicion',name:'Simetría',icon:'🦋'},
      {id:'medicion-no-convencional',name:'Medición',icon:'📏'},
      {id:'tiempo-calendario',name:'Tiempo y calendario',icon:'🕰️'},
      {id:'dinero-juguete',name:'Dinero de juguete',icon:'🪙'},
      {id:'datos-graficos',name:'Datos y gráficos',icon:'📊'},
      {id:'conceptos-logico-matematicos',name:'Conceptos lógicos',icon:'🧠'},
      {id:'comparar',name:'Grande/Pqño',icon:'📏'},{id:'conteo',name:'Conteo 1-20',icon:'🔢'},{id:'objetos',name:'Frutas',icon:'🍎'},
      {id:'patrones',name:'Patrones',icon:'🔁'},{id:'mas-menos',name:'Más/Menos',icon:'⚖️'},{id:'ubicacion',name:'Ubicación',icon:'🏠'},
      {id:'nociones-espaciales',name:'Nociones espaciales',icon:'🌸'},
      {id:'nociones-temporales',name:'Nociones temporales',icon:'⏳'},
      {id:'clasificacion',name:'Clasificación',icon:'🔴'},
      {id:'seriacion-orden',name:'Seriación y orden',icon:'📏'},
      {id:'operaciones-informales',name:'Operaciones informales',icon:'🧮'},
      {id:'trayectorias',name:'Recorridos',icon:'🚶'},{id:'temporal',name:'Tiempo',icon:'⏰'},{id:'calendario-ciclico',name:'Días y Meses',icon:'📅'},{id:'medicion-cuerpo',name:'Medir Cuerpo',icon:'📏'},{id:'capacidad',name:'Capacidad',icon:'🥛'},{id:'adivinanzas',name:'Adivinanzas',icon:'🧠'}
    ]
  },
  'primaria-baja': {
    name: 'Primaria Baja', icon: <School size={28} />, color: '#22c55e', ageRange: '6 a 8 años',
    description: 'Sumas, restas, multiplicación, división, fracciones unitarias.',
    tabs: [
      {id:'inicio',name:'Inicio',icon:'🌎'},
      {id:'suma',name:'Suma',icon:'➕'},{id:'resta',name:'Resta',icon:'➖'},{id:'suma-llevando',name:'Llevando',icon:'📈'},
      {id:'valor',name:'Valor Posic.',icon:'🏛️'},{id:'valor-millones',name:'Números grandes',icon:'🏰'},{id:'tablas',name:'Tablas',icon:'📋'},
      {id:'mult',name:'Multiplicación',icon:'✖️'},{id:'div',name:'División',icon:'➗'},{id:'frac',name:'Fracciones',icon:'🍰'},
      {id:'frac-tipos',name:'Tipos Frac.',icon:'🍕'},{id:'frac-simp',name:'Simplificar',icon:'✂️'},{id:'sucesiones',name:'Saltos',icon:'🦘'},
      {id:'perimetro',name:'Perímetro',icon:'📏'},{id:'geo-plana',name:'Geometría',icon:'📐'},{id:'estadistica-pb',name:'Estadística',icon:'📊'},{id:'probabilidad-pb',name:'Probabilidad',icon:'🎲'},{id:'cuerpos-3d',name:'Cuerpos 3D',icon:'🧊'},{id:'reloj-analogo',name:'El Reloj',icon:'🕒'},{id:'monedas',name:'Monedas',icon:'🪙'}
    ]
  },
  'primaria-alta': {
    name: 'Primaria Alta', icon: <BookOpen size={28} />, color: '#0ea5e9', ageRange: '9 a 11 años',
    description: 'Operaciones avanzadas, primos, porcentajes, ángulos, volúmenes.',
    tabs: [
      {id:'frac-ops',name:'Frac Ops',icon:'🧮'},{id:'div-criterios',name:'Divisibilidad',icon:'✓'},{id:'primos',name:'Primos',icon:'🔐'},
      {id:'mcm',name:'MCM/MCD',icon:'🔗'},{id:'pct',name:'Porcentajes',icon:'%'},{id:'decimales',name:'Decimales',icon:'0.5'},
      {id:'angulos',name:'Ángulos',icon:'📐'},{id:'jerarquia',name:'Jerarquía',icon:'🚦'},{id:'regla-de-tres',name:'Regla 3',icon:'📊'},
      {id:'probabilidad-laplace',name:'Probabilidad',icon:'🎲'},{id:'factura',name:'Tickets/IVA',icon:'🧾'}
    ]
  },
  'secundaria': {
    name: 'Secundaria', icon: <School size={28} />, color: '#a855f7', ageRange: '12 a 15 años',
    description: 'Álgebra, sistemas, geometría, estadística, volúmenes 3D.',
    tabs: [
      {id:'ecuacion',name:'Ec. Lineales',icon:'⚖️'},{id:'sistema',name:'Sistemas',icon:'{ }'},{id:'cuadratica',name:'Cuadráticas',icon:'x²'},
      {id:'pitagoras',name:'Pitágoras',icon:'△'},{id:'geo',name:'Áreas',icon:'📐'},{id:'geo-adv',name:'+Figuras',icon:'🔷'},
      {id:'pot',name:'Potencias',icon:'²'},{id:'series',name:'Sucesiones',icon:'🚂'},{id:'negativos',name:'Negativos',icon:'➖'},
      {id:'conjuntos',name:'Conjuntos',icon:'⭕'},{id:'numsets',name:'Conj. Numéricos',icon:'🌀'},{id:'cesar',name:'Cifrado César',icon:'🔐'},
      {id:'stats',name:'Estadística',icon:'📊'},{id:'prob',name:'Probabilidad',icon:'🎲'},
      {id:'vol-cubo',name:'Vol. Cubo',icon:'📦'},{id:'vol-esfera',name:'Vol. Esfera',icon:'⚽'},{id:'vol-cilindro',name:'Vol. Cilindro',icon:'🥫'},
      {id:'vol-cono',name:'Vol. Cono',icon:'🔺'},{id:'vol-piramide',name:'Vol. Pirámide',icon:'🔺'},{id:'vol-prisma',name:'Vol. Prisma',icon:'📦'},
      {id:'trig-tales',name:'Trig. y Tales',icon:'📐'}
    ]
  },
  'bachillerato': {
    name: 'Bachillerato', icon: <GraduationCap size={28} />, color: '#ec4899', ageRange: '15 a 18 años',
    description: 'Combinatoria, factoriales, fórmulas universitarias.',
    tabs: [
      {id:'fact',name:'Factoriales',icon:'!'},{id:'perm',name:'Permutaciones',icon:'🔀'},{id:'comb',name:'Combinaciones',icon:'🎲'},{id:'fraccom',name:'Frac. Complejas',icon:'🥪'},{id:'form',name:'Formulario',icon:'📜'}
    ]
  },
  'razonamiento': {
    name: 'Razonamiento', icon: <Brain size={28} />, color: '#3b82f6', ageRange: 'Transversal',
    description: 'Polya, analogías, Singapur, cálculo mental.',
    tabs: [{id:'polya',name:'Polya',icon:'📝'},{id:'logica',name:'Acertijos',icon:'🧠'},{id:'singapur',name:'Singapur',icon:'📊'},{id:'estimacion',name:'Cálculo Mental',icon:'⚡'}]
  },
  'enriquecimiento': {
    name: 'Enriquecimiento', icon: <Compass size={28} />, color: '#10b981', ageRange: 'Profundización',
    description: 'Simetría, sistemas antiguos, cuadrados mágicos.',
    tabs: [{id:'simetria',name:'Simetría',icon:'🪞'},{id:'sistemas',name:'Romanos/Mayas',icon:'🏛️'},{id:'magicos',name:'Cuad. Mágicos',icon:'✨'}]
  },
  'aplicadas': {
    name: 'Mates Aplicadas', icon: <Calculator size={28} />, color: '#059669', ageRange: 'Vida Cotidiana',
    description: 'Finanzas, nóminas, escalas, nutrición.',
    tabs: [{id:'finanzas',name:'Ahorro',icon:'💰'},{id:'nomina',name:'Salarios',icon:'📄'},{id:'escalas',name:'Planos',icon:'🗺️'},{id:'nutricion',name:'Nutrición',icon:'🥗'}]
  },
  'historia': {
    name: 'Historia', icon: <Globe size={28} />, color: '#f43f5e', ageRange: 'Cultura General',
    description: 'Genios de las matemáticas.',
    tabs: [{id:'genios',name:'Genios',icon:'📜'}]
  },
  'herramientas': {
    name: 'Herramientas', icon: <Settings size={28} />, color: '#14b8a6', ageRange: 'Tecnología',
    description: 'GeoGebra, Scratch, Tangram.',
    tabs: [{id:'tech',name:'Software',icon:'💻'}]
  }
};

const renderContent = (level: CategoryLevel, tab: string) => {
  switch (level) {
    case 'preescolar':
      switch (tab) {
        case 'colores': return <Colores />; case 'combinar-colores': return <MezclaColores />; case 'formas': return <Formas />; case 'cuerpos-geometricos': return <CuerposGeometricos />;
        case 'simetria-composicion': return <SimetriaComposicion />;
        case 'medicion-no-convencional': return <MedicionNoConvencional />;
        case 'tiempo-calendario': return <TiempoCalendario />;
        case 'dinero-juguete': return <DineroJuguete />;
        case 'datos-graficos': return <DatosGraficos />;
        case 'conceptos-logico-matematicos': return <ConceptosLogicoMatematicos />;
        case 'comparar': return <Comparaciones />; case 'conteo': return <ConteoPreescolar />; case 'objetos': return <ContarObjetosInteractivos />;
        case 'patrones': return <Patrones />; case 'mas-menos': return <MasMenosIgual />; case 'ubicacion': return <UbicacionEspacial />;
        case 'nociones-espaciales': return <NocionesEspacialesOrientacion />;
        case 'nociones-temporales': return <NocionesTemporales />;
        case 'clasificacion': return <ClasificacionAgrupacion />;
        case 'seriacion-orden': return <SeriacionOrden />;
        case 'operaciones-informales': return <OperacionesInformales />;
        case 'trayectorias': return <Trayectorias />; case 'temporal': return <Temporal />;
        case 'calendario-ciclico': return <CalendarioCiclico />;
        case 'medicion-cuerpo': return <MedicionCuerpo />; case 'capacidad': return <CapacidadVisual />;
        case 'adivinanzas': return <Adivinanzas />; default: return null;
      }
    case 'primaria-baja':
      switch (tab) {
        case 'inicio': return <InicioPrimariaBaja />; case 'suma': return <SumaInteractiva />; case 'resta': return <RestaInteractiva />; case 'suma-llevando': return <SumaLlevando />;
        case 'valor': return <ValorPosicional />; case 'valor-millones': return <ValorPosicionalMillones />; case 'tablas': return <TablasMultiplicar />;
        case 'mult': return <MultInteractiva />; case 'div': return <DivisionInteractiva />; case 'frac': return <FraccionSimple />;
        case 'frac-tipos': return <TiposFracciones />; case 'frac-simp': return <SimplificarFracciones />; case 'sucesiones': return <SucesionesSimples />;
        case 'perimetro': return <PerimetroSimple />; case 'geo-plana': return <GeometriaPlanaPrimaria />; case 'estadistica-pb': return <EstadisticaPrimaria />; case 'probabilidad-pb': return <ProbabilidadPrimaria />; case 'cuerpos-3d': return <Cuerpos3D />; case 'reloj-analogo': return <RelojAnalogo />; case 'monedas': return <MonedasCambio />;
        default: return null;
      }
    case 'primaria-alta':
      switch (tab) {
        case 'frac-ops': return <FracOperaciones />; case 'div-criterios': return <DivisibilidadInteractiva />; case 'primos': return <NumerosPrimos />;
        case 'mcm': return <McmMcdInteractivo />; case 'pct': return <PorcentajeInteractivo />; case 'decimales': return <DecimalesInteractivo />;
        case 'angulos': return <TiposDeAngulos />; case 'jerarquia': return <JerarquiaPEMDAS />; case 'regla-de-tres': return <ReglaDeTres />;
        case 'probabilidad-laplace': return <ProbabilidadLaplace />; case 'factura': return <FacturaIva />;
        default: return null;
      }
    case 'secundaria':
      switch (tab) {
        case 'ecuacion': return <EcuacionInteractiva />; case 'sistema': return <SistemaEcuaciones />; case 'cuadratica': return <CuadraticaInteractiva />;
        case 'pitagoras': return <PitagorasInteractivo />; case 'geo': return <GeometriaInteractiva />; case 'geo-adv': return <FigurasAvanzadasInteractivo />;
        case 'pot': return <PotenciasInteractiva />; case 'series': return <SeriesInteractiva />; case 'negativos': return <NumerosNegativosInteractivo />;
        case 'conjuntos': return <TeoriaConjuntosInteractiva />; case 'numsets': return <ConjuntosNumericosInteractivo />;
        case 'cesar': return <CriptografiaCesarInteractiva />; case 'stats': return <EstadisticaInteractiva />; case 'prob': return <ProbabilidadInteractiva />;
        case 'vol-cubo': return <VolumenCubo />; case 'vol-esfera': return <VolumenEsfera />; case 'vol-cilindro': return <VolumenCilindro />;
        case 'vol-cono': return <VolumenCono />; case 'vol-piramide': return <VolumenPiramide />; case 'vol-prisma': return <VolumenPrisma />;
        case 'trig-tales': return <TrigTalesInteractivo />;
        default: return null;
      }
    case 'bachillerato':
      switch (tab) {
        case 'fact': return <FactorialInteractivo />; case 'perm': return <PermutacionInteractiva />; case 'comb': return <CombinacionInteractiva />;
        case 'fraccom': return <FraccionesComplejasInteractivo />; case 'form': return <FormulasBach />;
        default: return null;
      }
    case 'razonamiento':
      switch (tab) {
        case 'polya': return <PolyaMethod />; case 'logica': return <LogicaAnalogias />; case 'singapur': return <SingapurBar />;
        case 'estimacion': return <CalculadoraExploracion />; default: return null;
      }
    case 'enriquecimiento':
      switch (tab) {
        case 'simetria': return <SimetriaVistas />; case 'sistemas': return <SistemasAntiguos />; case 'magicos': return <CuadradosMagicos />;
        default: return null;
      }
    case 'aplicadas':
      switch (tab) {
        case 'finanzas': return <FinanzasCotidianas />; case 'nomina': return <NominaCotidianas />; case 'escalas': return <EscalasPlanos />;
        case 'nutricion': return <NutricionTablas />; default: return null;
      }
    case 'historia': return <HistoriaMates />;
    case 'herramientas': return <HerramientasTech />;
    default: return null;
  }
};

// Índice plano de los 94 temas, para el buscador
type TopicHit = { level: CategoryLevel; id: string; name: string; icon: string; levelName: string; color: string };
const ALL_TOPICS: TopicHit[] = (Object.keys(SCHOOLS) as CategoryLevel[]).flatMap(l =>
  SCHOOLS[l].tabs.map(t => ({ level: l, id: t.id, name: t.name, icon: t.icon, levelName: SCHOOLS[l].name, color: SCHOOLS[l].color }))
);
// quita acentos y mayúsculas: "fracción" encuentra "Fracciones"
const norm = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

// Palabras extra por tema, para que la gente encuentre lo que busca aunque
// la pestaña se llame distinto (ej. "volumen" → "Vol. Cubo").
const ALIAS: Record<string, string> = {
  'vol-cubo': 'volumen cubo', 'vol-esfera': 'volumen esfera', 'vol-cilindro': 'volumen cilindro',
  'vol-cono': 'volumen cono', 'vol-piramide': 'volumen piramide', 'vol-prisma': 'volumen prisma',
  'cuerpos-3d': 'volumen area caras aristas vertices cubo esfera cono cilindro piramide prisma solidos',
  'cuerpos-geometricos': 'volumen solidos cubo esfera cono cilindro piramide',
  'mult': 'multiplicar multiplicacion producto', 'div': 'dividir division reparto',
  'tablas': 'multiplicar tablas de multiplicar', 'pct': 'porcentaje por ciento descuento',
  'frac': 'fraccion partes mitad', 'frac-tipos': 'fraccion propia impropia mixta',
  'frac-simp': 'fraccion simplificar reducir', 'frac-ops': 'fraccion sumar restar',
  'geo': 'area areas superficie', 'geo-plana': 'figuras poligonos area perimetro',
  'perimetro': 'contorno lados', 'angulos': 'grados agudo obtuso recto',
  'stats': 'estadistica media mediana moda promedio', 'prob': 'probabilidad azar dado moneda',
  'probabilidad-laplace': 'probabilidad azar', 'pitagoras': 'teorema hipotenusa cateto triangulo',
  'monedas': 'dinero cambio comprar', 'reloj-analogo': 'hora tiempo minutos',
  'ecuacion': 'algebra despejar incognita x', 'sistema': 'algebra dos ecuaciones',
  'cuadratica': 'segundo grado parabola', 'primos': 'numero primo compuesto',
  'mcm': 'minimo comun multiplo maximo divisor', 'decimales': 'punto decimal coma',
  'valor': 'valor posicional unidades decenas centenas', 'suma': 'sumar mas adicion',
  'resta': 'restar menos sustraccion', 'conteo': 'contar numeros',
  'estadistica-pb': 'estadistica grafico barras pictograma encuesta moda datos tabla conteo',
  'probabilidad-pb': 'probabilidad azar dado moneda ruleta seguro imposible probable suerte',
};

export const LearnView: React.FC = () => {
  const [level, setLevel] = useState<CategoryLevel>('primaria-baja');
  const [tab, setTab] = useState<string>('suma');
  const [query, setQuery] = useState('');
  const [showAllTabs, setShowAllTabs] = useState(false);
  const cfg = SCHOOLS[level];

  const q = norm(query.trim());
  const searchable = (t: TopicHit) => norm(`${t.name} ${t.levelName} ${t.id} ${ALIAS[t.id] || ''}`);
  const hits = q.length < 2 ? [] : ALL_TOPICS.filter(t => searchable(t).includes(q)).slice(0, 12);

  const goTo = (t: TopicHit) => { setLevel(t.level); setTab(t.id); setQuery(''); };

  const TAB_LIMIT = 12;
  const visibleTabs = showAllTabs ? cfg.tabs : cfg.tabs.slice(0, TAB_LIMIT);
  const hiddenCount = cfg.tabs.length - visibleTabs.length;

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-20 md:pb-6">
      <div className="math-card text-white relative overflow-hidden shadow-xl"
        style={{ background: `linear-gradient(135deg, ${cfg.color}, var(--secondary-color))` }}>
        <div className="absolute right-2 top-2 opacity-15 text-9xl pointer-events-none">📚</div>
        <h1 className="text-2xl md:text-4xl font-black mb-3 flex items-center gap-3 relative z-10">
          {cfg.icon} Guías Interactivas y Aplicadas
        </h1>
        <p className="opacity-95 font-bold text-sm md:text-base relative z-10">
          Explora desde preescolar hasta universidad y matemáticas de la vida cotidiana. ✨
        </p>
      </div>

      {/* 🔎 Buscador de temas */}
      <div className="math-card">
        <label htmlFor="buscador-temas" className="text-base md:text-lg font-black mb-3 flex items-center gap-2">
          <Search size={20} style={{ color: 'var(--primary-color)' }} />
          Busca un tema entre {ALL_TOPICS.length}
        </label>
        <div className="relative">
          <input
            id="buscador-temas"
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => { if (e.key === 'Escape') setQuery(''); }}
            placeholder="Ej. fracciones, reloj, primos, volumen…"
            aria-label="Buscar un tema de matemáticas"
            className="w-full px-4 py-3 pr-10 rounded-2xl border-2 border-border-color bg-surface-color font-bold text-sm outline-none focus:border-[var(--primary-color)] transition-all"
          />
          {query && (
            <button onClick={() => setQuery('')} aria-label="Borrar búsqueda"
              className="absolute right-3 top-1/2 -translate-y-1/2 opacity-60 hover:opacity-100">
              <X size={18} />
            </button>
          )}
        </div>

        {q.length >= 2 && (
          <div className="mt-3">
            {hits.length === 0 ? (
              <p className="text-xs font-bold opacity-70 py-2">Sin resultados para “{query}”. Prueba con otra palabra.</p>
            ) : (
              <>
                <p className="text-[11px] font-black uppercase opacity-60 mb-2">{hits.length} resultado{hits.length > 1 ? 's' : ''}</p>
                <div className="flex flex-wrap gap-2">
                  {hits.map(t => (
                    <button key={`${t.level}-${t.id}`} onClick={() => goTo(t)}
                      aria-label={`Ir a ${t.name}, en ${t.levelName}`}
                      className="px-3 py-2 rounded-2xl border-2 font-black text-xs flex items-center gap-2 hover:scale-105 transition-all bg-surface-color"
                      style={{ borderColor: t.color }}>
                      <span className="text-lg" aria-hidden="true">{t.icon}</span>
                      <span>{t.name}</span>
                      <span className="text-[10px] opacity-60 font-bold">· {t.levelName}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      <div className="math-card">
        <h2 className="text-base md:text-lg font-black mb-4 flex items-center gap-2">
          <Sparkles size={20} className="text-yellow-500" />
          1. Elige tu Sección de Estudio:
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {(Object.keys(SCHOOLS) as CategoryLevel[]).map(l => (
            <button key={l} onClick={() => { setLevel(l); setTab(SCHOOLS[l].tabs[0].id); setShowAllTabs(false); }}
              aria-pressed={level === l}
              aria-label={`Sección ${SCHOOLS[l].name}, ${SCHOOLS[l].ageRange}`}
              className={`p-3 rounded-3xl border-2 text-left transition-all ${level === l ? 'border-[var(--primary-color)] bg-[var(--primary-color)]/15 ring-4 ring-[var(--primary-color)]/30 scale-105 shadow-xl font-black' : 'border-border-color hover:border-[var(--primary-color)]/50'}`}>
              <div className="p-2 rounded-xl text-white shadow mb-2 w-fit" style={{ background: SCHOOLS[l].color }}>{SCHOOLS[l].icon}</div>
              <div className="font-black text-sm">{SCHOOLS[l].name}</div>
              <div className="text-[10px] opacity-80 font-bold mt-1">{SCHOOLS[l].ageRange}</div>
            </button>
          ))}
        </div>
        <p className="text-xs opacity-80 mt-3 font-bold leading-relaxed">{cfg.description}</p>
      </div>

      <div className="math-card">
        <h2 className="text-base md:text-lg font-black mb-4 flex items-center gap-2">
          <ChevronRight size={20} style={{ color: 'var(--primary-color)' }} />
          2. Elige un Tema de {cfg.name}:
          <span className="ml-auto text-[11px] font-bold opacity-60">{cfg.tabs.length} temas</span>
        </h2>
        <div className="flex gap-2 flex-wrap">
          {visibleTabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              aria-pressed={tab === t.id}
              aria-label={`Tema ${t.name}`}
              className={`px-5 py-3 rounded-2xl font-black text-xs md:text-sm transition-all flex items-center gap-2 ${tab === t.id ? 'bg-[var(--primary-color)] text-white scale-105 shadow-xl ring-4 ring-[var(--primary-color)]/30' : 'bg-slate-200/50 dark:bg-slate-700/50 hover:scale-105'}`}>
              <span className="text-xl" aria-hidden="true">{t.icon}</span> {t.name}
            </button>
          ))}
          {hiddenCount > 0 && (
            <button onClick={() => setShowAllTabs(true)}
              aria-label={`Mostrar los otros ${hiddenCount} temas`}
              className="px-5 py-3 rounded-2xl font-black text-xs border-2 border-dashed border-border-color hover:scale-105 transition-all">
              + {hiddenCount} más
            </button>
          )}
          {showAllTabs && cfg.tabs.length > TAB_LIMIT && (
            <button onClick={() => setShowAllTabs(false)}
              aria-label="Mostrar menos temas"
              className="px-5 py-3 rounded-2xl font-black text-xs border-2 border-dashed border-border-color hover:scale-105 transition-all">
              − Ver menos
            </button>
          )}
        </div>
      </div>

      <motion.div key={`${level}-${tab}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
        {renderContent(level, tab)}
      </motion.div>
    </div>
  );
};
