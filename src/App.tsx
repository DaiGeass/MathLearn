import React, { useState, useEffect, useCallback } from "react";
import {
  Settings,
  Trophy,
  BookOpen,
  Calculator,
  Home,
  Save,
  Upload,
  X,
  Check,
  RotateCcw,
  Award,
  ChevronRight,
  Flame,
  Star,
  Clock,
  RefreshCw,
  GripVertical,
  Moon,
  Sun,
  Zap,
  Shield,
  Sparkles,
  BookCheck,
  BarChart2,
  Lightbulb,
  Palette,
  Eye,
  Layout,
  Gauge,
  Binary,
  Gamepad2,
  Calendar,
  Wand2,
  Brain,
} from "lucide-react";

import type {
  Theme,
  Difficulty,
  View,
  GameMode,
  BgPattern,
  SidebarPos,
  BtnShape,
  Density,
  ShadowLevel,
  Exercise,
  UserProgress,
  Template,
} from "./helpers";
import {
  themes,
  fontFamilies,
  difficultyConfig,
  generateExercise,
  VisualComponent,
  getOptionLabel,
} from "./helpers";
import { LearnView } from "./learn";
import { PluginsView } from "./plugins";
import { FormulaHub } from "./formulario";
import { JuegosView } from "./juegos";
import { CalendarioView } from "./calendario";
import { LogicaView } from "./logica";
import { CalculatorSuite } from "./calculadoras";

interface MenuItem {
  id: string;
  icon: React.ReactNode;
  label: string;
  view: View;
}

const App: React.FC = () => {
  // PERSONALIZATION
  const [theme, setTheme] = useState<Theme>("frutiger-aero");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(
    () => localStorage.getItem("mlDark") === "true"
  );
  const [fontFamily, setFontFamily] = useState<string>(fontFamilies[1].val);
  const [fontSize, setFontSize] = useState<number>(16);
  const [borderRadius, setBorderRadius] = useState<number>(20);
  const [customColors, setCustomColors] = useState({
    primary: "#ff8bad",
    secondary: "#8be0ff",
    accent: "#ffe066",
  });
  const [bgPattern, setBgPattern] = useState<BgPattern>("bubbles");
  const [sidebarPos, setSidebarPos] = useState<SidebarPos>("left");
  const [btnShape, setBtnShape] = useState<BtnShape>(
    () => (localStorage.getItem("mlBtnShape") as BtnShape) || "normal"
  );
  const [density, setDensity] = useState<Density>(
    () => (localStorage.getItem("mlDensity") as Density) || "normal"
  );
  const [shadowLevel, setShadowLevel] = useState<ShadowLevel>(
    () => (localStorage.getItem("mlShadow") as ShadowLevel) || "normal"
  );
  const [transitionSpeed, setTransitionSpeed] = useState<number>(
    () => Number(localStorage.getItem("mlSpeed")) || 0.3
  );
  const [reduceMotion, setReduceMotion] = useState<boolean>(
    () => localStorage.getItem("mlReduceMotion") === "true"
  );
  const [highContrast, setHighContrast] = useState<boolean>(
    () => localStorage.getItem("mlHighContrast") === "true"
  );
  const [zoom, setZoom] = useState<number>(
    () => Number(localStorage.getItem("mlZoom")) || 1
  );
  const [lineHeight, setLineHeight] = useState<number>(
    () => Number(localStorage.getItem("mlLineHeight")) || 1.5
  );

  // GAME STATE
  const [view, setView] = useState<View>("dashboard");
  const [difficulty, setDifficulty] = useState<Difficulty>("primaria-baja");
  const [gameMode, setGameMode] = useState<GameMode>("normal");
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | string | null>(null);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [showStepByStep, setShowStepByStep] = useState<boolean>(false);
  const [dashFilter, setDashFilter] = useState<string>("todos");
  const [whiteboard, setWhiteboard] = useState<string>("");

  // TIMERS
  const [timer, setTimer] = useState<number>(0);
  const [isTimerRunning, setIsTimerRunning] = useState<boolean>(false);
  const [sprintTimeLeft, setSprintTimeLeft] = useState<number>(60);
  const [sprintScore, setSprintScore] = useState<number>(0);
  const [celebrationStreak, setCelebrationStreak] = useState<number | null>(null);

  // MENU
  const [draggedItemIndex, setDraggedItemIndex] = useState<number | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    { id: "1", icon: <Home size={18} />, label: "Inicio", view: "dashboard" },
    { id: "2", icon: <BookOpen size={18} />, label: "Aprender", view: "aprender" },
    { id: "3", icon: <Calculator size={18} />, label: "Ejercicios", view: "ejercicios" },
    { id: "4", icon: <Trophy size={18} />, label: "Logros", view: "logros" },
    { id: "5", icon: <BookCheck size={18} />, label: "Formulario", view: "formulario" },
    { id: "juegos", icon: <Gamepad2 size={18} />, label: "Juegos", view: "juegos" },
    { id: "logica", icon: <Brain size={18} />, label: "Lógica", view: "logica" },
    { id: "calendario", icon: <Calendar size={18} />, label: "Calendario", view: "calendario" },
    { id: "calculadoras", icon: <Binary size={18} />, label: "Calculadoras", view: "calculadoras" },
    { id: "6", icon: <Zap size={18} />, label: "Plugins", view: "plugins" },
    { id: "7", icon: <Settings size={18} />, label: "Personalizar", view: "configuracion" },
  ]);

  // PROGRESS
  const [userProgress, setUserProgress] = useState<UserProgress>(() => {
    const fallback = {
      points: 0,
      streak: 0,
      level: 1,
      exercisesCompleted: 0,
      correctAnswers: 0,
      achievements: [],
      lives: 3,
      exercisesByType: {},
    };
    const saved = localStorage.getItem("mlProgressV5");
    try { return saved ? JSON.parse(saved) : fallback; } catch { return fallback; }
  });

  const [templates, setTemplates] = useState<Template[]>(() => {
    const saved = localStorage.getItem("mlTemplatesV5");
    try { return saved ? JSON.parse(saved) : []; } catch { return []; }
  });

  // APPLY CSS - all on :root (html) for bulletproof selector matching
  useEffect(() => {
    const r = document.documentElement;
    const b = document.body;

    // Theme attribute on html (CSS uses :root[data-theme="..."])
    r.setAttribute("data-theme", theme);

    // Dark mode class on html (CSS uses :root.dark-mode)
    r.classList.toggle("dark-mode", isDarkMode);

    // Custom color overrides (applied AFTER theme so they override theme defaults)
    r.style.setProperty("--primary-color", customColors.primary);
    r.style.setProperty("--secondary-color", customColors.secondary);
    r.style.setProperty("--accent-color", customColors.accent);
    r.style.setProperty("--fs", `${fontSize}px`);
    r.style.setProperty("--radius", `${borderRadius}px`);
    r.style.setProperty("--font", fontFamily);
    r.style.setProperty("--speed", `${transitionSpeed}s`);
    r.style.setProperty("--zoom", zoom.toString());
    r.style.setProperty("--lh", lineHeight.toString());

    // Body classes for patterns, density, shapes, shadows, mobile
    b.classList.toggle("high-contrast", highContrast);
    b.classList.toggle("reduce-motion", reduceMotion);

    [
      "bg-dots",
      "bg-grid",
      "bg-diagonal",
      "bg-bubbles",
      "bg-stars",
      "bg-waves",
    ].forEach((c) => b.classList.remove(c));
    if (bgPattern !== "none") b.classList.add(`bg-${bgPattern}`);

    ["density-compact", "density-spacious"].forEach((c) => b.classList.remove(c));
    if (density === "compact") b.classList.add("density-compact");
    if (density === "spacious") b.classList.add("density-spacious");

    ["shape-pill", "shape-square"].forEach((c) => b.classList.remove(c));
    if (btnShape !== "normal") b.classList.add(`shape-${btnShape}`);

    ["shadow-none", "shadow-soft", "shadow-strong"].forEach((c) =>
      b.classList.remove(c)
    );
    if (shadowLevel !== "normal") b.classList.add(`shadow-${shadowLevel}`);

    localStorage.setItem("mlDark", isDarkMode.toString());
    localStorage.setItem("mlBtnShape", btnShape);
    localStorage.setItem("mlDensity", density);
    localStorage.setItem("mlShadow", shadowLevel);
    localStorage.setItem("mlSpeed", transitionSpeed.toString());
    localStorage.setItem("mlReduceMotion", reduceMotion.toString());
    localStorage.setItem("mlHighContrast", highContrast.toString());
    localStorage.setItem("mlZoom", zoom.toString());
    localStorage.setItem("mlLineHeight", lineHeight.toString());
  }, [
    theme,
    isDarkMode,
    customColors,
    fontSize,
    borderRadius,
    fontFamily,
    bgPattern,
    density,
    btnShape,
    transitionSpeed,
    reduceMotion,
    highContrast,
    shadowLevel,
    zoom,
    lineHeight,
  ]);

  useEffect(() => {
    localStorage.setItem("mlProgressV5", JSON.stringify(userProgress));
  }, [userProgress]);
  useEffect(() => {
    localStorage.setItem("mlTemplatesV5", JSON.stringify(templates));
  }, [templates]);

  // TIMERS
  useEffect(() => {
    let interval: any;
    if (isTimerRunning && (gameMode === "normal" || gameMode === "examen")) {
      interval = setInterval(() => setTimer((t) => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, gameMode]);

  useEffect(() => {
    let interval: any;
    if (isTimerRunning && gameMode === "sprint" && sprintTimeLeft > 0) {
      interval = setInterval(() => {
        setSprintTimeLeft((t) => {
          if (t <= 1) {
            setIsTimerRunning(false);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, gameMode, sprintTimeLeft]);

  const startNewExercise = useCallback(() => {
    const newEx = generateExercise(difficulty, Date.now());
    setExercise(newEx);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setShowStepByStep(false);
    setTimer(0);
    setIsTimerRunning(true);
  }, [difficulty]);

  const addStreakPoints = (pts: number) => {
    setUserProgress((prev) => ({
      ...prev,
      points: prev.points + pts,
      streak: prev.streak + 1,
    }));
  };

  const handleStartGameMode = (mode: GameMode, diff: Difficulty) => {
    setGameMode(mode);
    setDifficulty(diff);
    setView("ejercicios");
    if (mode === "sprint") {
      setSprintTimeLeft(60);
      setSprintScore(0);
    } else if (mode === "supervivencia") {
      setUserProgress((prev) => ({ ...prev, lives: 3 }));
    }
    startNewExercise();
  };

  useEffect(() => {
    if (view === "ejercicios") startNewExercise();
  }, [view, difficulty, startNewExercise]);

  const handleCheckAnswer = (answer: number | string) => {
    if (!exercise || showFeedback) return;
    setIsTimerRunning(false);
    setSelectedAnswer(answer);
    setShowFeedback(true);
    const isOk = answer === exercise.answer;
    setIsCorrect(isOk);

    if (isOk) {
      let pts = 15;
      if (gameMode === "sprint") {
        setSprintScore((s) => s + 1);
        pts = 20;
      } else if (gameMode === "normal") {
        pts += Math.max(0, 25 - timer) * 2;
      } else if (gameMode === "examen") {
        pts = 30;
      }

      const newStreak = userProgress.streak + 1;
      if (newStreak >= 15) {
        pts = Math.round(pts * 2);
      } else if (newStreak >= 5) {
        pts = Math.round(pts * 1.5);
      }

      if ([5, 10, 15, 25, 50].includes(newStreak)) {
        setCelebrationStreak(newStreak);
        setTimeout(() => setCelebrationStreak(null), 4000);
      }

      setUserProgress((prev) => ({
        ...prev,
        points: prev.points + pts,
        exercisesCompleted: prev.exercisesCompleted + 1,
        correctAnswers: prev.correctAnswers + 1,
        streak: newStreak,
        level: Math.floor((prev.correctAnswers + 1) / 8) + 1,
        exercisesByType: {
          ...prev.exercisesByType,
          [exercise.type]: (prev.exercisesByType[exercise.type] || 0) + 1,
        },
      }));
    } else {
      if (gameMode === "supervivencia") {
        setUserProgress((prev) => ({
          ...prev,
          lives: Math.max(0, prev.lives - 1),
          streak: 0,
        }));
      } else {
        setUserProgress((prev) => ({ ...prev, streak: 0 }));
      }
    }
  };

  const handleDragStart = (i: number) => setDraggedItemIndex(i);
  const handleDragOver = (e: React.DragEvent, i: number) => {
    e.preventDefault();
    if (draggedItemIndex === null || draggedItemIndex === i) return;
    const newOrder = [...menuItems];
    const item = newOrder[draggedItemIndex];
    newOrder.splice(draggedItemIndex, 1);
    newOrder.splice(i, 0, item);
    setMenuItems(newOrder);
    setDraggedItemIndex(i);
  };
  const handleDragEnd = () => setDraggedItemIndex(null);

  const handleSaveTemplate = () => {
    const t: Template = {
      id: Date.now().toString(),
      name: `Plantilla ${templates.length + 1} (${themes[theme].name})`,
      theme,
      primaryColor: customColors.primary,
      secondaryColor: customColors.secondary,
      accentColor: customColors.accent,
      fontSize,
      borderRadius,
      fontFamily,
      isDarkMode,
      bgPattern,
      sidebarPos,
      btnShape,
      density,
      transitionSpeed,
      shadowLevel,
      zoom,
      lineHeight,
    };
    setTemplates([...templates, t]);
  };

  const handleLoadTemplate = (t: Template) => {
    setTheme(t.theme);
    setCustomColors({
      primary: t.primaryColor,
      secondary: t.secondaryColor,
      accent: t.accentColor || "#ff6b6b",
    });
    setFontSize(t.fontSize);
    setBorderRadius(t.borderRadius);
    setFontFamily(t.fontFamily || fontFamilies[0].val);
    setIsDarkMode(t.isDarkMode || false);
    setBgPattern(t.bgPattern || "none");
    setSidebarPos(t.sidebarPos || "left");
    setBtnShape(t.btnShape || "normal");
    setDensity(t.density || "normal");
    setTransitionSpeed(t.transitionSpeed || 0.3);
    setShadowLevel(t.shadowLevel || "normal");
    setZoom(t.zoom || 1);
    setLineHeight(t.lineHeight || 1.5);
  };

  const handleDeleteTemplate = (id: string) =>
    setTemplates(templates.filter((t) => t.id !== id));

  // ==========================================
  // DASHBOARD
  // ==========================================
  const renderDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 pb-20 md:pb-6">
      <div
        className="math-card md:col-span-2 lg:col-span-3 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative"
        style={{ background: "var(--gradient-primary)", color: "white" }}
      >
        <div className="absolute -right-10 -bottom-10 opacity-10 text-9xl">🧮</div>
        <div className="relative z-10">
          <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-3 inline-block">
            MathLearn Pro v10 — Preescolar a Bachillerato
          </span>
          <h1 className="text-2xl md:text-4xl font-black mb-3 tracking-tight">
            ¡Domina las Mates desde los 3 años! 🚀
          </h1>
          <p className="opacity-95 max-w-2xl text-sm md:text-base font-bold leading-relaxed">
            Más de 35 temas interactivos por edad. Preescolar, Primaria, Secundaria y
            Bachillerato. Personaliza absolutamente todo.
          </p>
        </div>
        <div className="flex items-center gap-4 bg-white/10 p-5 rounded-3xl border border-white/20 backdrop-blur-md relative z-10 shadow-lg">
          <Award size={48} className="text-yellow-300 animate-bounce" />
          <div>
            <div className="text-xs uppercase font-black tracking-wider">Tu Nivel</div>
            <div className="text-3xl md:text-4xl font-black">{userProgress.level}</div>
            <div className="text-xs font-bold opacity-80">
              {8 - (userProgress.correctAnswers % 8)} para subir
            </div>
          </div>
        </div>
      </div>

      <div className="math-card flex items-center justify-between">
        <div>
          <div className="text-xs uppercase opacity-80 font-black mb-1">Puntos</div>
          <div
            className="text-3xl font-black flex items-center gap-2"
            style={{ color: "var(--primary-color)" }}
          >
            <Star size={32} className="text-yellow-400 fill-yellow-400" />{" "}
            {userProgress.points}
          </div>
        </div>
        <div className="p-3 rounded-2xl bg-[var(--primary-color)]/10">
          <Zap size={28} style={{ color: "var(--primary-color)" }} />
        </div>
      </div>

      <div className="math-card flex items-center justify-between relative overflow-hidden">
        {userProgress.streak >= 5 && (
          <div className="absolute top-0 right-0 bg-yellow-400 text-slate-900 font-black text-[9px] px-2 py-0.5 rounded-bl-xl">
            BONUS {userProgress.streak >= 15 ? "x2" : "x1.5"}
          </div>
        )}
        <div>
          <div className="text-xs uppercase opacity-80 font-black mb-1">Racha</div>
          <div className="text-3xl font-black text-orange-500 flex items-center gap-2">
            <Flame size={32} className="fill-orange-500 animate-pulse" />{" "}
            {userProgress.streak}
          </div>
        </div>
        <div className="p-3 rounded-2xl bg-orange-500/10 text-orange-500">
          <Sparkles size={28} />
        </div>
      </div>

      <div className="math-card flex items-center justify-between">
        <div>
          <div className="text-xs uppercase opacity-80 font-black mb-1">Precisión</div>
          <div className="text-3xl font-black text-emerald-500 flex items-center gap-2">
            <BarChart2 size={32} />
            {userProgress.exercisesCompleted > 0
              ? Math.round(
                  (userProgress.correctAnswers / userProgress.exercisesCompleted) * 100
                )
              : 0}
            %
          </div>
        </div>
        <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-500">
          <BookCheck size={28} />
        </div>
      </div>

      <div className="math-card md:col-span-2 lg:col-span-3">
        <h2 className="text-xl font-black mb-5 flex items-center gap-3">
          <Zap size={24} className="text-yellow-500" /> Modos de Juego
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              mode: "normal" as GameMode,
              icon: "🎯",
              name: "Práctica Libre",
              color: "var(--primary-color)",
              desc: "Sin presión, con tutor paso a paso.",
            },
            {
              mode: "zen" as GameMode,
              icon: "🧘",
              name: "Modo Zen",
              color: "#14b8a6",
              desc: "Sin temporizador, ideal para pensar lento y bien.",
            },
            {
              mode: "examen" as GameMode,
              icon: "📝",
              name: "Examen",
              color: "#0ea5e9",
              desc: "Más puntos por acierto, sin pistas hasta responder.",
            },
            {
              mode: "sprint" as GameMode,
              icon: "⏱️",
              name: "Sprint 60s",
              color: "#f97316",
              desc: "¿Cuántos resuelves en 1 minuto?",
            },
            {
              mode: "supervivencia" as GameMode,
              icon: "❤️",
              name: "Supervivencia",
              color: "#a855f7",
              desc: "Solo 3 vidas. Sin errores.",
            },
          ].map((m) => (
            <div
              key={m.mode}
              className="border-2 p-5 rounded-3xl flex flex-col justify-between shadow-sm"
              style={{
                borderColor: `color-mix(in srgb, ${m.color} 40%, transparent)`,
              }}
            >
              <div>
                <div
                  className="font-black text-lg mb-2 flex items-center gap-2"
                  style={{ color: m.color }}
                >
                  <span>{m.icon}</span> {m.name}
                </div>
                <p className="text-sm opacity-85 mb-4 font-bold">{m.desc}</p>
              </div>
              <button
                onClick={() => handleStartGameMode(m.mode, difficulty)}
                className="math-btn w-full !py-3 text-sm"
                style={{ background: m.color }}
              >
                Iniciar
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="math-card md:col-span-2 lg:col-span-3">
        <h2 className="text-xl font-black mb-5 flex items-center gap-3">
          <Wand2 size={24} className="text-purple-500" /> Herramientas y Juegos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div
            onClick={() => setView("calculadoras")}
            className="p-5 rounded-3xl border-2 border-border-color bg-surface-color shadow hover:scale-[1.02] cursor-pointer transition-all space-y-2"
          >
            <span className="text-3xl md:text-4xl block">🧮</span>
            <h3 className="font-black text-lg" style={{ color: "var(--primary-color)" }}>
              Suite Calculadoras
            </h3>
            <p className="text-xs font-bold opacity-80">
              Básica, Científica, Gráfica 2D, CAS algebraico y resolución paso a paso.
            </p>
          </div>
          <div
            onClick={() => setView("juegos")}
            className="p-5 rounded-3xl border-2 border-border-color bg-surface-color shadow hover:scale-[1.02] cursor-pointer transition-all space-y-2"
          >
            <span className="text-3xl md:text-4xl block">🎮</span>
            <h3 className="font-black text-lg text-orange-500">Sudokus y Juegos</h3>
            <p className="text-xs font-bold opacity-80">
              Entrena tu mente con Sudokus aleatorios, Nim contra la IA y Mastermind.
            </p>
          </div>
          <div
            onClick={() => setView("calendario")}
            className="p-5 rounded-3xl border-2 border-border-color bg-surface-color shadow hover:scale-[1.02] cursor-pointer transition-all space-y-2"
          >
            <span className="text-3xl md:text-4xl block">📅</span>
            <h3 className="font-black text-lg text-emerald-500">Calendario y Tareas</h3>
            <p className="text-xs font-bold opacity-80">
              Organiza tus metas diarias, anota tus deberes y construye tu racha de estudio.
            </p>
          </div>
          <div
            onClick={() => setView("logica")}
            className="p-5 rounded-3xl border-2 border-border-color bg-surface-color shadow hover:scale-[1.02] cursor-pointer transition-all space-y-2"
          >
            <span className="text-3xl md:text-4xl block">🧠</span>
            <h3 className="font-black text-lg text-blue-500">Lógica y Sistemas</h3>
            <p className="text-xs font-bold opacity-80">
              Tablas de verdad, conversión de bases, números romanos y mayas, razonamiento.
            </p>
          </div>
        </div>
      </div>

      <div className="math-card md:col-span-2 lg:col-span-3">
        <h2 className="text-xl font-black mb-5 flex items-center gap-3">
          <BookCheck size={24} style={{ color: "var(--primary-color)" }} /> Elige tu Materia
        </h2>
        <div className="flex gap-2 flex-wrap mb-4">
          {[
            "todos",
            "preescolar",
            "primaria-baja",
            "primaria-alta",
            "secundaria",
            "bachillerato",
          ].map((level) => (
            <button
              key={level}
              onClick={() => setDashFilter(level)}
              className={`px-3 py-1.5 rounded-full font-black text-[11px] uppercase transition-all ${dashFilter === level ? "bg-[var(--primary-color)] text-white shadow" : "bg-slate-200/70 dark:bg-slate-700/70"}`}
            >
              {level}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {(Object.keys(difficultyConfig) as Difficulty[])
            .filter(
              (diff) =>
                dashFilter === "todos" || difficultyConfig[diff].level === dashFilter
            )
            .map((diff) => (
              <div
                key={diff}
                onClick={() => handleStartGameMode(gameMode, diff)}
                className={`p-4 rounded-2xl border-2 cursor-pointer transition-all flex items-start gap-3 shadow-sm ${difficulty === diff ? "border-[var(--primary-color)] bg-[var(--primary-color)]/15 shadow-md ring-4 ring-[var(--primary-color)]/20" : "border-border-color hover:border-[var(--primary-color)]/50"}`}
              >
                <span className="text-2xl p-2.5 rounded-xl bg-white dark:bg-slate-800 shadow-sm border border-border-color">
                  {difficultyConfig[diff].icon}
                </span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-extrabold text-sm">
                    {difficultyConfig[diff].name}
                  </h3>
                  <p className="text-[11px] opacity-75 mt-0.5 font-bold leading-tight">
                    {difficultyConfig[diff].desc}
                  </p>
                  <span
                    className="inline-block mt-1.5 px-2 py-0.5 rounded-full text-[9px] uppercase font-black"
                    style={{
                      background: `${difficultyConfig[diff].color}33`,
                      color: difficultyConfig[diff].color,
                    }}
                  >
                    {difficultyConfig[diff].level}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );

  // ==========================================
  // EXERCISE VIEW
  // ==========================================
  const renderExerciseView = () => {
    if (!exercise) return null;
    const levelGroup = difficultyConfig[difficulty]?.level;
    const isEarlyLevel = ["preescolar", "primaria-baja", "primaria-alta"].includes(
      levelGroup
    );
    const wrongOptionBg = isEarlyLevel ? "#a855f7" : "#ef4444";
    const wrongCardClass = isEarlyLevel ? "bg-purple-500" : "bg-red-400";
    const wrongMsg = isEarlyLevel
      ? "💜 Casi, inténtanlo otra vez"
      : "❌ Inténtalo nuevamente";

    return (
      <div className="max-w-4xl mx-auto pb-20 md:pb-6">
        {celebrationStreak && (
          <div className="p-5 rounded-3xl bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-500 text-slate-900 font-black shadow-2xl text-center mb-6 border-4 border-white animate-pop flex items-center justify-center gap-3 flex-wrap">
            <span className="text-3xl md:text-4xl animate-bounce">🎉</span>
            <div>
              <h2 className="text-xl md:text-2xl font-black">
                ¡RACHA DE {celebrationStreak}! 🔥
              </h2>
              <p className="text-xs font-bold opacity-90">
                Bonus: {celebrationStreak >= 15 ? "x2" : "x1.5"}
              </p>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mb-6 flex-wrap gap-3 bg-surface-color p-3 md:p-4 rounded-3xl border border-border-color shadow-sm">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setView("dashboard")}
              className="p-2.5 rounded-2xl bg-slate-200 dark:bg-slate-700 hover:scale-105 transition-all"
            >
              <ChevronRight className="rotate-180" size={20} />
            </button>
            <div>
              <span className="text-[10px] uppercase font-black opacity-80">
                Modo: {gameMode.toUpperCase()}
              </span>
              <h2 className="text-base md:text-lg font-black flex items-center gap-2">
                <span>{difficultyConfig[difficulty].icon}</span>{" "}
                {difficultyConfig[difficulty].name}
              </h2>
            </div>
          </div>
          <div className="flex items-center gap-2 font-extrabold flex-wrap">
            {gameMode === "supervivencia" && (
              <div className="flex items-center gap-1.5 bg-purple-500/20 text-purple-600 dark:text-purple-400 px-3 py-2 rounded-full font-black text-xs">
                <Shield size={14} />{" "}
                {Array.from({ length: userProgress.lives })
                  .map(() => "❤️")
                  .join(" ")}
              </div>
            )}
            {gameMode === "sprint" && (
              <div
                className={`flex items-center gap-2 font-black px-4 py-2 rounded-full text-xs shadow ${sprintTimeLeft < 10 ? "bg-red-500 text-white animate-bounce" : "bg-orange-500 text-white"}`}
              >
                <Clock size={16} /> {sprintTimeLeft}s | {sprintScore}
              </div>
            )}
            {(gameMode === "normal" || gameMode === "examen") && (
              <div className="flex items-center gap-1.5 px-3 py-2 bg-slate-100 dark:bg-slate-800 rounded-full font-mono font-black text-xs">
                ⏱️ {timer}s
              </div>
            )}
            {gameMode === "zen" && (
              <div className="flex items-center gap-1.5 px-3 py-2 bg-teal-500/20 text-teal-600 dark:text-teal-300 rounded-full font-black text-xs">
                🧘 Sin reloj
              </div>
            )}
          </div>
        </div>

        {gameMode === "supervivencia" && userProgress.lives <= 0 && (
          <div className="math-card text-center p-8 bg-red-500/10 border-red-500 shadow-xl">
            <h2 className="text-3xl font-black text-red-500 mb-3">¡Fin del Juego! 💥</h2>
            <button
              onClick={() => handleStartGameMode("supervivencia", difficulty)}
              className="math-btn !bg-red-500 !py-3"
            >
              Reintentar
            </button>
          </div>
        )}
        {gameMode === "sprint" && sprintTimeLeft <= 0 && (
          <div className="math-card text-center p-8 bg-orange-500/10 border-orange-500 shadow-xl">
            <h2 className="text-3xl font-black text-orange-500 mb-3">¡Tiempo! ⏱️</h2>
            <p className="mb-4 font-bold text-lg">Lograste {sprintScore} aciertos en 60s</p>
            <button
              onClick={() => handleStartGameMode("sprint", difficulty)}
              className="math-btn !bg-orange-500 !py-3"
            >
              Otro Sprint
            </button>
          </div>
        )}

        {((gameMode === "supervivencia" && userProgress.lives > 0) ||
          (gameMode === "sprint" && sprintTimeLeft > 0) ||
          gameMode === "normal" ||
          gameMode === "zen" ||
          gameMode === "examen") && (
          <>
            <aside className="math-card mb-6 border-2 border-dashed border-[var(--primary-color)]/50 bg-[var(--primary-color)]/5">
              <div className="flex items-center justify-between gap-3 mb-3 flex-wrap">
                <h3 className="font-black text-lg">🧑‍🏫 Pizarrón de trabajo</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setWhiteboard(`${whiteboard}\n${exercise.question}\nPaso 1: `)}
                    className="px-3 py-1.5 rounded-xl bg-[var(--primary-color)] text-white font-black text-xs"
                  >
                    Copiar problema
                  </button>
                  <button
                    onClick={() => setWhiteboard("")}
                    className="px-3 py-1.5 rounded-xl bg-red-500 text-white font-black text-xs"
                  >
                    Limpiar
                  </button>
                </div>
              </div>
              <textarea
                value={whiteboard}
                onChange={(e) => setWhiteboard(e.target.value)}
                placeholder="Escribe aquí tus operaciones, dibujos en texto, pasos, fórmulas o comprobaciones..."
                className="w-full min-h-28 p-3 rounded-2xl border-2 border-border-color bg-surface-color font-mono text-sm outline-none"
              />
            </aside>

            <div className="math-card mb-6 text-center relative overflow-hidden shadow-lg border-2">
              <div
                className="absolute top-0 left-0 right-0 h-3"
                style={{ background: "var(--gradient-primary)" }}
              />
              <div className="text-xl md:text-3xl font-black py-6 md:py-8 tracking-tight whitespace-pre-line leading-relaxed px-2">
                {exercise.question}
              </div>
              {exercise.visual && (
                <div className="my-4">
                  <VisualComponent visual={exercise.visual} />
                </div>
              )}
            </div>

            <div
              className={`grid gap-4 mb-6 ${exercise.options.length === 2 ? "grid-cols-2" : exercise.options.length === 4 ? "grid-cols-2" : "grid-cols-1 md:grid-cols-2"}`}
            >
              {exercise.options.map((option, idx) => (
                <button
                  key={idx}
                  onClick={() => handleCheckAnswer(option)}
                  disabled={showFeedback}
                  className={`exercise-option ${showFeedback && option === exercise.answer ? "ring-8 ring-emerald-500/30" : ""} transition active:scale-95`}
                  style={{
                    background: showFeedback
                      ? option === exercise.answer
                        ? "#10b981"
                        : option === selectedAnswer
                          ? wrongOptionBg
                          : "var(--surface-color)"
                      : "var(--surface-color)",
                    color:
                      showFeedback && (option === exercise.answer || option === selectedAnswer)
                        ? "white"
                        : "var(--text-primary)",
                    borderColor:
                      showFeedback && option === exercise.answer
                        ? "#10b981"
                        : showFeedback && option === selectedAnswer
                          ? wrongOptionBg
                          : "var(--border-color)",
                  }}
                >
                  <span className="text-xl md:text-2xl font-black">
                    {getOptionLabel(exercise.type, option)}
                  </span>
                </button>
              ))}
            </div>

            {!showStepByStep && (gameMode === "normal" || gameMode === "zen") && (
              <div className="text-center mb-6">
                <button
                  onClick={() => setShowStepByStep(true)}
                  className="px-5 py-3 rounded-3xl border-2 border-[var(--primary-color)]/40 bg-[var(--primary-color)]/10 font-black hover:bg-[var(--primary-color)] hover:text-white transition-all inline-flex items-center gap-2 text-sm shadow-md"
                >
                  <Lightbulb size={20} className="text-yellow-500" /> Ver Paso a Paso
                </button>
              </div>
            )}

            {showStepByStep && (
              <div className="math-card mb-6 border-l-8 border-l-yellow-500 bg-yellow-500/5 shadow-lg overflow-hidden">
                <h3 className="font-black text-lg mb-3 flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
                  <Lightbulb size={22} /> Guía Paso a Paso
                </h3>
                <div className="space-y-3">
                  {exercise.steps.map((st, i) => (
                    <div
                      key={i}
                      className="p-4 rounded-2xl bg-white dark:bg-slate-800 shadow-sm border border-border-color"
                    >
                      <div className="font-black text-xs uppercase tracking-wider text-[var(--primary-color)] mb-1">
                        {st.title}
                      </div>
                      <p className="text-sm font-bold opacity-90 leading-relaxed whitespace-pre-line">
                        {st.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {showFeedback && (
              <div
                className={`p-5 md:p-6 rounded-3xl shadow-2xl text-center font-bold text-white mb-6 flex flex-col items-center gap-3 border-4 border-white/40 ${isCorrect ? "bg-emerald-500" : wrongCardClass}`}
              >
                <div className="text-xl md:text-3xl font-black">
                  {isCorrect ? "✨ ¡Correcto! 🎉" : wrongMsg}
                </div>
                <p className="text-base opacity-95 font-extrabold">
                  Respuesta:{" "}
                  <span className="underline text-xl">
                    {getOptionLabel(exercise.type, exercise.answer)}
                  </span>
                </p>
                <button
                  onClick={startNewExercise}
                  className="px-6 py-2.5 rounded-2xl bg-white text-slate-900 font-black hover:scale-105 transition-all text-base shadow-xl flex items-center gap-2"
                >
                  <RotateCcw size={20} /> Siguiente
                </button>
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  const renderAchievements = () => {
    const list = [
      {
        id: "first",
        name: "Primer Acierto",
        icon: "🎯",
        desc: "Tu primer ejercicio correcto.",
        unlocked: userProgress.correctAnswers > 0,
      },
      {
        id: "streak5",
        name: "Enrachado",
        icon: "🔥",
        desc: "5 aciertos seguidos.",
        unlocked: userProgress.streak >= 5,
      },
      {
        id: "streak10",
        name: "Racha de Fuego",
        icon: "🔥",
        desc: "10 aciertos seguidos.",
        unlocked: userProgress.streak >= 10,
      },
      {
        id: "streak25",
        name: "Imparable",
        icon: "⚡",
        desc: "25 aciertos seguidos.",
        unlocked: userProgress.streak >= 25,
      },
      {
        id: "points500",
        name: "Coleccionista",
        icon: "⭐",
        desc: "500 puntos totales.",
        unlocked: userProgress.points >= 500,
      },
      {
        id: "points2k",
        name: "Master",
        icon: "💎",
        desc: "2,000 puntos.",
        unlocked: userProgress.points >= 2000,
      },
      {
        id: "points5k",
        name: "Leyenda",
        icon: "🌟",
        desc: "5,000 puntos.",
        unlocked: userProgress.points >= 5000,
      },
      {
        id: "level5",
        name: "Mente Brillante",
        icon: "🎓",
        desc: "Nivel 5.",
        unlocked: userProgress.level >= 5,
      },
      {
        id: "level10",
        name: "Maestro",
        icon: "👑",
        desc: "Nivel 10.",
        unlocked: userProgress.level >= 10,
      },
      {
        id: "mixer",
        name: "Multidisciplinar",
        icon: "🌈",
        desc: "5+ tipos resueltos.",
        unlocked: Object.keys(userProgress.exercisesByType).length >= 5,
      },
      {
        id: "polyglot",
        name: "Explorador Temático",
        icon: "🧭",
        desc: "12 tipos distintos resueltos.",
        unlocked: Object.keys(userProgress.exercisesByType).length >= 12,
      },
      {
        id: "bachillerato",
        name: "Universitario",
        icon: "🎓",
        desc: "Ejercicio de bachillerato.",
        unlocked: !!(
          userProgress.exercisesByType["factorial"] ||
          userProgress.exercisesByType["permutacion"] ||
          userProgress.exercisesByType["combinacion"]
        ),
      },
      {
        id: "logic",
        name: "Lógico",
        icon: "🧠",
        desc: "Resolver lógica o conjuntos.",
        unlocked: !!(
          userProgress.exercisesByType["logica"] ||
          userProgress.exercisesByType["conjuntos"]
        ),
      },
      {
        id: "finance",
        name: "Financista",
        icon: "💰",
        desc: "Resolver ejercicios aplicados de finanzas o nómina.",
        unlocked: !!(
          userProgress.exercisesByType["finanzas"] ||
          userProgress.exercisesByType["nomina"]
        ),
      },
      {
        id: "geometry",
        name: "Arquitecto",
        icon: "📐",
        desc: "Resolver geometría y Pitágoras.",
        unlocked: !!(
          userProgress.exercisesByType["geometria"] ||
          userProgress.exercisesByType["pitagoras"] ||
          userProgress.exercisesByType["geometria-avanzada"]
        ),
      },
      {
        id: "crypto",
        name: "Criptógrafo",
        icon: "🔐",
        desc: "Resolver criptografía César.",
        unlocked: !!userProgress.exercisesByType["criptografia"],
      },
      {
        id: "stats",
        name: "Estadístico",
        icon: "📊",
        desc: "Resolver estadística o probabilidad.",
        unlocked: !!(
          userProgress.exercisesByType["estadistica"] ||
          userProgress.exercisesByType["probabilidad"]
        ),
      },
      {
        id: "negative",
        name: "Bajo Cero",
        icon: "❄️",
        desc: "Resolver números negativos.",
        unlocked: !!userProgress.exercisesByType["negativos"],
      },
      {
        id: "fraction-master",
        name: "FracMaster",
        icon: "🍰",
        desc: "Resolver fracciones simples, operaciones y complejas.",
        unlocked:
          !!(
            userProgress.exercisesByType["fracciones"] &&
            userProgress.exercisesByType["frac-suma"]
          ) || !!userProgress.exercisesByType["fracciones-complejas"],
      },
    ];
    return (
      <div className="max-w-4xl mx-auto space-y-6 pb-20 md:pb-6">
        <div className="math-card bg-gradient-to-r from-yellow-400 to-amber-600 text-white shadow-xl relative overflow-hidden">
          <div className="absolute right-0 top-0 opacity-15 text-8xl">🏆</div>
          <div className="relative z-10">
            <h1 className="text-2xl md:text-4xl font-black mb-2">🏆 Salón de Logros</h1>
            <p className="opacity-95 font-bold text-sm md:text-base">
              Desbloquea medallas demostrando tu progreso.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((ac) => (
            <div
              key={ac.id}
              className={`math-card flex flex-col items-center text-center p-5 border-2 shadow-md ${ac.unlocked ? "border-yellow-400 bg-yellow-400/10 ring-4 ring-yellow-400/20" : "opacity-60 border-slate-300"}`}
            >
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center text-3xl shadow-lg mb-3 ${ac.unlocked ? "bg-gradient-to-tr from-yellow-400 to-amber-500 text-white animate-pop" : "bg-slate-200 dark:bg-slate-700 text-slate-400"}`}
              >
                {ac.icon}
              </div>
              <h3 className="font-extrabold text-lg mb-1">{ac.name}</h3>
              <p className="text-xs font-bold opacity-80 mb-3 leading-relaxed">
                {ac.desc}
              </p>
              <span
                className={`px-3 py-1 font-black text-xs rounded-full flex items-center gap-1.5 ${ac.unlocked ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400" : "bg-slate-500/20 text-slate-500"}`}
              >
                {ac.unlocked ? (
                  <>
                    <Check size={14} /> Desbloqueado
                  </>
                ) : (
                  "🔒 Bloqueado"
                )}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderSettings = () => (
    <div className="max-w-5xl mx-auto space-y-5 pb-20 md:pb-6">
      <div className="math-card bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-xl">
        <h1 className="text-2xl md:text-3xl font-black mb-1 flex items-center gap-2">
          <Palette size={28} /> Personalización Total
        </h1>
        <p className="opacity-95 font-bold text-sm">Todo se aplica al instante.</p>
      </div>

      {/* Quick toggles */}
      <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`math-card !p-3 flex flex-col items-center gap-1 transition-all ${isDarkMode ? "ring-4 ring-[var(--primary-color)]/50" : ""}`}
        >
          {isDarkMode ? <Moon size={24} /> : <Sun size={24} />}
          <span className="text-[10px] font-black">{isDarkMode ? "Oscuro" : "Claro"}</span>
        </button>
        <button
          onClick={() => setHighContrast(!highContrast)}
          className={`math-card !p-3 flex flex-col items-center gap-1 transition-all ${highContrast ? "ring-4 ring-[var(--primary-color)]/50" : ""}`}
        >
          <Eye size={24} />
          <span className="text-[10px] font-black">Contraste</span>
        </button>
        <button
          onClick={() => setReduceMotion(!reduceMotion)}
          className={`math-card !p-3 flex flex-col items-center gap-1 transition-all ${reduceMotion ? "ring-4 ring-[var(--primary-color)]/50" : ""}`}
        >
          <Gauge size={24} />
          <span className="text-[10px] font-black">Sin Animar</span>
        </button>
        <button
          onClick={() => setSidebarPos(sidebarPos === "left" ? "right" : "left")}
          className="math-card !p-3 flex flex-col items-center gap-1"
        >
          <Layout size={24} />
          <span className="text-[10px] font-black">
            Menú {sidebarPos === "left" ? "Izq" : "Der"}
          </span>
        </button>
        <button
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
          className="math-card !p-3 flex flex-col items-center gap-1 hover:bg-red-500/10 transition-all"
        >
          <RefreshCw size={24} className="text-red-500" />
          <span className="text-[10px] font-black text-red-500">Reset</span>
        </button>
      </div>

      {/* Themes */}
      <div className="math-card">
        <h3 className="text-lg font-black mb-3 flex items-center gap-2">
          <span>🎨</span> Temas Visuales
        </h3>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {(Object.keys(themes) as Theme[]).map((t) => (
            <div
              key={t}
              onClick={() => setTheme(t)}
              className={`p-3 rounded-2xl border-2 cursor-pointer transition-all flex flex-col items-center text-center ${theme === t ? "border-[var(--primary-color)] bg-[var(--primary-color)]/15 ring-4 ring-[var(--primary-color)]/30 scale-105" : "border-border-color hover:border-[var(--primary-color)]/50"}`}
            >
              <span className="text-2xl mb-1">{themes[t].icon}</span>
              <span className="font-black text-[11px]">{themes[t].name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Colors */}
      <div className="math-card space-y-4">
        <h3 className="text-lg font-black flex items-center gap-2">
          <span>🌈</span> Paleta
        </h3>
        {[
          {
            label: "Primario",
            key: "primary" as const,
            colors: [
              "#00a8e8",
              "#ff8bad",
              "#ffd803",
              "#6366f1",
              "#3b82f6",
              "#268bd2",
              "#bd93f9",
              "#10b981",
              "#f97316",
              "#ec4899",
              "#dc2626",
              "#0ea5e9",
            ],
          },
          {
            label: "Secundario",
            key: "secondary" as const,
            colors: [
              "#7ed957",
              "#8be0ff",
              "#e3f6f5",
              "#a855f7",
              "#10b981",
              "#2aa198",
              "#50fa7b",
              "#ec4899",
              "#eab308",
              "#0891b2",
              "#84cc16",
              "#06b6d4",
            ],
          },
          {
            label: "Acento",
            key: "accent" as const,
            colors: [
              "#ff6b6b",
              "#ffe066",
              "#22d3ee",
              "#fb7185",
              "#fbbf24",
              "#a78bfa",
              "#34d399",
              "#f472b6",
              "#facc15",
              "#f97316",
              "#06b6d4",
              "#fb923c",
            ],
          },
        ].map((g) => (
          <div key={g.key}>
            <label className="block text-sm font-black mb-2">{g.label}</label>
            <div className="flex gap-2 flex-wrap">
              {g.colors.map((c) => (
                <div
                  key={c}
                  onClick={() => setCustomColors((prev) => ({ ...prev, [g.key]: c }))}
                  className={`w-10 h-10 rounded-full cursor-pointer transition-all border-4 shadow ${customColors[g.key] === c ? "border-white scale-125 ring-4 ring-[var(--primary-color)]/40" : "border-transparent hover:scale-110"}`}
                  style={{ background: c }}
                />
              ))}
              <input
                type="color"
                value={customColors[g.key]}
                onChange={(e) =>
                  setCustomColors((prev) => ({ ...prev, [g.key]: e.target.value }))
                }
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-border-color"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="math-card space-y-3">
        <h3 className="text-lg font-black flex items-center gap-2">
          <span>🖍️</span> Paletas rápidas
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
          {[
            {
              name: "Kawaii",
              colors: { primary: "#ff8bad", secondary: "#8be0ff", accent: "#ffe066" },
            },
            {
              name: "Neón",
              colors: { primary: "#00ff88", secondary: "#00d4ff", accent: "#ff00ff" },
            },
            {
              name: "Pizarra",
              colors: { primary: "#22c55e", secondary: "#84cc16", accent: "#facc15" },
            },
            {
              name: "Atardecer",
              colors: { primary: "#f97316", secondary: "#ec4899", accent: "#facc15" },
            },
            {
              name: "Océano Niño",
              colors: { primary: "#3b82f6", secondary: "#06b6d4", accent: "#22d3ee" },
            },
          ].map((p) => (
            <button
              key={p.name}
              onClick={() => setCustomColors(p.colors)}
              className="p-3 rounded-2xl border-2 border-border-color font-black text-xs hover:scale-105 transition-all text-left"
            >
              <div className="flex gap-1 mb-2">
                {Object.values(p.colors).map((c) => (
                  <span
                    key={c}
                    className="w-5 h-5 rounded-full border border-white/40"
                    style={{ background: c }}
                  />
                ))}
              </div>
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Background Patterns */}
      <div className="math-card">
        <h3 className="text-lg font-black mb-3 flex items-center gap-2">
          <span>🌌</span> Fondo
        </h3>
        <div className="grid grid-cols-3 md:grid-cols-7 gap-2">
          {(
            ["none", "dots", "grid", "diagonal", "bubbles", "stars", "waves"] as BgPattern[]
          ).map((p) => (
            <button
              key={p}
              onClick={() => setBgPattern(p)}
              className={`p-3 rounded-xl border-2 font-black text-xs capitalize transition-all ${bgPattern === p ? "border-[var(--primary-color)] bg-[var(--primary-color)]/15 scale-105" : "border-border-color hover:scale-105"}`}
            >
              {p === "none"
                ? "✖️"
                : p === "dots"
                  ? "⚫"
                  : p === "grid"
                    ? "🔲"
                    : p === "diagonal"
                      ? "↗️"
                      : p === "bubbles"
                        ? "🫧"
                        : p === "stars"
                          ? "⭐"
                          : "〰〰"}{" "}
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Density, button shape, shadow */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="math-card">
          <h3 className="text-sm font-black mb-2">
            <span>📏</span> Densidad
          </h3>
          <div className="grid grid-cols-3 gap-1">
            {(["compact", "normal", "spacious"] as Density[]).map((d) => (
              <button
                key={d}
                onClick={() => setDensity(d)}
                className={`p-2 rounded-xl border-2 font-black text-[10px] capitalize transition-all ${density === d ? "border-[var(--primary-color)] bg-[var(--primary-color)]/15" : "border-border-color"}`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
        <div className="math-card">
          <h3 className="text-sm font-black mb-2">
            <span>🔘</span> Botones
          </h3>
          <div className="grid grid-cols-3 gap-1">
            {(["normal", "pill", "square"] as BtnShape[]).map((s) => (
              <button
                key={s}
                onClick={() => setBtnShape(s)}
                className={`p-2 rounded-xl border-2 font-black text-[10px] capitalize transition-all ${btnShape === s ? "border-[var(--primary-color)] bg-[var(--primary-color)]/15" : "border-border-color"}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
        <div className="math-card">
          <h3 className="text-sm font-black mb-2">
            <span>💫</span> Sombras
          </h3>
          <div className="grid grid-cols-4 gap-1">
            {(["none", "soft", "normal", "strong"] as ShadowLevel[]).map((s) => (
              <button
                key={s}
                onClick={() => setShadowLevel(s)}
                className={`p-2 rounded-xl border-2 font-black text-[10px] capitalize transition-all ${shadowLevel === s ? "border-[var(--primary-color)] bg-[var(--primary-color)]/15" : "border-border-color"}`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Fonts */}
      <div className="math-card space-y-3">
        <h3 className="text-lg font-black flex items-center gap-2">
          <span>✍️</span> Tipografía
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {fontFamilies.map((ff) => (
            <div
              key={ff.name}
              onClick={() => setFontFamily(ff.val)}
              className={`p-3 rounded-xl border-2 cursor-pointer font-black text-center text-xs transition-all ${fontFamily === ff.val ? "border-[var(--primary-color)] bg-[var(--primary-color)]/15 scale-105" : "border-border-color"}`}
              style={{ fontFamily: ff.val }}
            >
              {ff.name}
            </div>
          ))}
        </div>
      </div>

      {/* Sliders */}
      <div className="math-card space-y-3">
        <h3 className="text-lg font-black flex items-center gap-2">
          <span>⚙️</span> Dimensiones Avanzadas
        </h3>
        {[
          {
            label: "Tamaño de Fuente",
            value: fontSize,
            set: setFontSize,
            min: 13,
            max: 22,
            unit: "px",
            step: 1,
          },
          {
            label: "Radio de Bordes",
            value: borderRadius,
            set: setBorderRadius,
            min: 0,
            max: 40,
            unit: "px",
            step: 1,
          },
          {
            label: "Velocidad Animaciones",
            value: transitionSpeed,
            set: setTransitionSpeed,
            min: 0,
            max: 1,
            unit: "s",
            step: 0.05,
          },
          {
            label: "Zoom Global",
            value: zoom,
            set: setZoom,
            min: 0.8,
            max: 1.4,
            unit: "x",
            step: 0.05,
          },
          {
            label: "Espacio entre líneas",
            value: lineHeight,
            set: setLineHeight,
            min: 1.1,
            max: 2.2,
            unit: "",
            step: 0.1,
          },
        ].map((s, i) => (
          <div key={i}>
            <div className="flex justify-between text-sm font-black mb-1">
              <span>{s.label}:</span>
              <span style={{ color: "var(--primary-color)" }}>
                {typeof s.value === "number"
                  ? s.value.toFixed(s.step < 1 ? 2 : 0)
                  : s.value}
                {s.unit}
              </span>
            </div>
            <input
              type="range"
              min={s.min}
              max={s.max}
              step={s.step}
              value={s.value}
              onChange={(e) => s.set(Number(e.target.value))}
            />
          </div>
        ))}
      </div>

      {/* Templates */}
      <div className="math-card space-y-3">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <h3 className="text-lg font-black flex items-center gap-2">
            <span>💾</span> Plantillas
          </h3>
          <button onClick={handleSaveTemplate} className="math-btn !py-2 !px-4 text-xs">
            <Save size={16} /> Guardar Actual
          </button>
        </div>
        {templates.length === 0 ? (
          <p className="text-sm opacity-80 font-bold italic text-center py-4">
            No tienes plantillas guardadas.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {templates.map((tpl) => (
              <div
                key={tpl.id}
                className="p-3 rounded-2xl border-2 border-border-color bg-surface-color shadow flex items-center justify-between gap-3"
              >
                <div className="min-w-0 flex-1">
                  <div className="font-black text-sm truncate">{tpl.name}</div>
                  <div className="text-xs opacity-75 font-bold flex items-center gap-1 mt-0.5 flex-wrap">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ background: tpl.primaryColor }}
                    />
                    {tpl.fontSize}px · {tpl.isDarkMode ? "🌙" : "☀️"}
                  </div>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleLoadTemplate(tpl)}
                    className="p-2 rounded-xl bg-[var(--primary-color)]/20 text-[var(--primary-color)] hover:bg-[var(--primary-color)] hover:text-white transition-all"
                  >
                    <Upload size={16} />
                  </button>
                  <button
                    onClick={() => handleDeleteTemplate(tpl.id)}
                    className="p-2 rounded-xl bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-white transition-all"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Menu order */}
      <div className="math-card space-y-3">
        <h3 className="text-lg font-black flex items-center gap-2">
          <span>📋</span> Orden del Menú
        </h3>
        <div className="space-y-2 max-w-md">
          {menuItems.map((it, idx) => (
            <div
              key={it.id}
              draggable
              onDragStart={() => handleDragStart(idx)}
              onDragOver={(e) => handleDragOver(e, idx)}
              onDragEnd={handleDragEnd}
              className={`flex items-center gap-3 p-3 rounded-xl border-2 bg-surface-color cursor-grab font-black ${draggedItemIndex === idx ? "border-[var(--primary-color)] border-dashed shadow-xl opacity-60" : "border-border-color hover:border-slate-400"}`}
            >
              <GripVertical size={18} className="text-slate-400" />
              {it.icon}
              <span className="text-sm">{it.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="mathlearn-app flex flex-col min-h-screen relative">
      {/* Top navigation bar - always visible */}
      <nav className="math-card !p-2 md:!p-3 sticky top-0 z-50 shadow-lg">
        <div className="flex items-center gap-2 md:gap-4 overflow-x-auto">
          <div className="flex items-center gap-2 mr-2 flex-shrink-0">
            <div
              className="w-9 h-9 rounded-2xl flex items-center justify-center text-white text-lg font-black shadow"
              style={{ background: "var(--gradient-primary)" }}
            >
              🧮
            </div>
            <span
              className="font-black text-base hidden md:block"
              style={{ color: "var(--primary-color)" }}
            >
              MathLearn
            </span>
          </div>
          {menuItems.map((it) => (
            <button
              key={it.id}
              onClick={() => setView(it.view)}
              className={`px-3 py-2 md:px-4 md:py-2.5 rounded-xl font-black text-xs md:text-sm whitespace-nowrap transition-all flex items-center gap-2 flex-shrink-0 ${view === it.view ? "text-white shadow-lg scale-105" : "opacity-75 hover:opacity-100"}`}
              style={view === it.view ? { background: "var(--gradient-primary)" } : {}}
            >
              {it.icon} <span className="hidden sm:inline">{it.label}</span>
            </button>
          ))}
          <div className="flex items-center gap-2 ml-auto flex-shrink-0">
            <div
              className="px-3 py-1.5 rounded-full font-black text-xs border-2"
              style={{
                background: "color-mix(in srgb, var(--primary-color) 20%, transparent)",
                color: "var(--primary-color)",
                borderColor:
                  "color-mix(in srgb, var(--primary-color) 30%, transparent)",
              }}
            >
              <Star size={14} className="inline fill-current text-yellow-500 mr-1" />
              {userProgress.points}
            </div>
            <div className="px-3 py-1.5 rounded-full font-black text-xs bg-orange-500/20 text-orange-500 border-2 border-orange-500/30">
              <Flame size={14} className="inline fill-current mr-1" />
              {userProgress.streak}
            </div>
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="p-2 rounded-xl bg-surface-color border-2 border-border-color shadow hover:scale-110 transition-all"
              style={{ color: "var(--primary-color)" }}
            >
              {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>
      </nav>

      <main className="flex-1 p-3 md:p-6 lg:p-10 overflow-x-hidden">
        {view === "dashboard" && renderDashboard()}
        {view === "ejercicios" && renderExerciseView()}
        {view === "aprender" && <LearnView />}
        {view === "logros" && renderAchievements()}
        {view === "formulario" && <FormulaHub />}
        {view === "plugins" && <PluginsView />}
        {view === "juegos" && <JuegosView onWinStreak={addStreakPoints} />}
        {view === "calendario" && <CalendarioView onWinStreak={addStreakPoints} />}
        {view === "logica" && <LogicaView />}
        {view === "calculadoras" && <CalculatorSuite />}
        {view === "configuracion" && renderSettings()}
      </main>
    </div>
  );
};

export default App;
