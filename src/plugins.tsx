import { useState, useEffect } from "react";
import { Zap, Clock, FileText, Scale } from "lucide-react";

export function PluginsView() {
  const [activePlugins, setActivePlugins] = useState<{ pomodoro: boolean; notes: boolean; converter: boolean }>(() => {
    const saved = localStorage.getItem("mlPluginsV5");
    try { return saved ? JSON.parse(saved) : { pomodoro: true, notes: true, converter: true }; }
    catch { return { pomodoro: true, notes: true, converter: true }; }
  });

  const savePlugins = (next: typeof activePlugins) => {
    setActivePlugins(next);
    localStorage.setItem("mlPluginsV5", JSON.stringify(next));
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-20 md:pb-6">
      <div className="math-card bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-xl">
        <h1 className="text-2xl md:text-4xl font-black mb-1 flex items-center gap-2">
          <Zap size={30} /> Suite de Plugins Personalizables
        </h1>
        <p className="opacity-95 font-bold text-sm md:text-base">
          Activa o desactiva herramientas adicionales que te acompañarán durante tus sesiones de estudio y práctica matemática.
        </p>
      </div>

      {/* Switchers */}
      <div className="math-card">
        <h2 className="text-xl font-black mb-4">⚙️ Administrar Plugins</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="flex items-center justify-between p-3 border rounded-2xl bg-slate-50 dark:bg-slate-900">
            <span className="font-extrabold text-sm flex items-center gap-1.5"><Clock size={16} /> Pomodoro</span>
            <label className="switch">
              <input type="checkbox" checked={activePlugins.pomodoro} onChange={() => savePlugins({ ...activePlugins, pomodoro: !activePlugins.pomodoro })} />
              <span className="slider" />
            </label>
          </div>
          <div className="flex items-center justify-between p-3 border rounded-2xl bg-slate-50 dark:bg-slate-900">
            <span className="font-extrabold text-sm flex items-center gap-1.5"><FileText size={16} /> Block Notas</span>
            <label className="switch">
              <input type="checkbox" checked={activePlugins.notes} onChange={() => savePlugins({ ...activePlugins, notes: !activePlugins.notes })} />
              <span className="slider" />
            </label>
          </div>
          <div className="flex items-center justify-between p-3 border rounded-2xl bg-slate-50 dark:bg-slate-900">
            <span className="font-extrabold text-sm flex items-center gap-1.5"><Scale size={16} /> Conversor</span>
            <label className="switch">
              <input type="checkbox" checked={activePlugins.converter} onChange={() => savePlugins({ ...activePlugins, converter: !activePlugins.converter })} />
              <span className="slider" />
            </label>
          </div>
        </div>
      </div>

      {/* Active widgets */}
      <div className="grid gap-6 md:grid-cols-2">
        {activePlugins.pomodoro && <PomodoroWidget />}
        {activePlugins.notes && <NotesWidget />}
        {activePlugins.converter && <ConverterWidget />}
      </div>
    </div>
  );
}

function PomodoroWidget() {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      alert("🍅 ¡Tiempo de Pomodoro terminado! Toma un descanso.");
      setTimeLeft(25 * 60);
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    <div className="math-card space-y-4">
      <h3 className="font-black text-lg text-red-500 flex items-center gap-2">
        <Clock /> Temporizador Pomodoro
      </h3>
      <p className="text-xs font-bold opacity-80" style={{ color: "var(--text2)" }}>
        Mantén el enfoque durante 25 minutos con intervalos estructurados de estudio.
      </p>

      <div className="text-center font-mono text-4xl font-black py-4 bg-slate-50 dark:bg-slate-900 rounded-3xl border">
        {formatTime(timeLeft)}
      </div>

      <div className="flex gap-2 justify-center">
        <button
          onClick={() => setIsActive(!isActive)}
          className="math-btn !py-2 !px-5 text-xs"
        >
          {isActive ? "Pausar" : "Iniciar"}
        </button>
        <button
          onClick={() => {
            setIsActive(false);
            setTimeLeft(25 * 60);
          }}
          className="math-btn !py-2 !px-5 text-xs !bg-slate-500"
        >
          Reiniciar
        </button>
      </div>
    </div>
  );
}

function NotesWidget() {
  const [note, setNote] = useState(() => localStorage.getItem("mlNotePlugin") || "");

  const handleSave = (val: string) => {
    setNote(val);
    localStorage.setItem("mlNotePlugin", val);
  };

  return (
    <div className="math-card space-y-4">
      <h3 className="font-black text-lg text-amber-500 flex items-center gap-2">
        <FileText /> Block de Notas Rápido
      </h3>
      <p className="text-xs font-bold opacity-80" style={{ color: "var(--text2)" }}>
        Anota tus observaciones, fórmulas o dudas aquí. Se guardan automáticamente.
      </p>
      <textarea
        value={note}
        onChange={(e) => handleSave(e.target.value)}
        placeholder="Escribe tus notas aquí..."
        className="w-full h-32 p-3 rounded-2xl border-2 border-border-color bg-surface-color font-bold text-sm outline-none"
      />
    </div>
  );
}

function ConverterWidget() {
  const [val, setVal] = useState(1);
  const [unitFrom, setUnitFrom] = useState("m");
  const [unitTo, setUnitTo] = useState("cm");

  const convert = () => {
    let baseInMeters = val;
    if (unitFrom === "cm") baseInMeters = val / 100;
    if (unitFrom === "km") baseInMeters = val * 1000;
    if (unitFrom === "in") baseInMeters = val * 0.0254;

    let res = baseInMeters;
    if (unitTo === "cm") res = baseInMeters * 100;
    if (unitTo === "km") res = baseInMeters / 1000;
    if (unitTo === "in") res = baseInMeters / 0.0254;

    return res.toFixed(3);
  };

  return (
    <div className="math-card space-y-4">
      <h3 className="font-black text-lg text-indigo-500 flex items-center gap-2">
        <Scale /> Conversor de Unidades
      </h3>
      <p className="text-xs font-bold opacity-80" style={{ color: "var(--text2)" }}>
        Conversor rápido de longitud (Metros, Centímetros, Kilómetros, Pulgadas) para tus tareas escolares.
      </p>

      <div className="flex gap-2 items-center">
        <input
          type="number"
          value={val}
          onChange={(e) => setVal(Number(e.target.value))}
          className="w-20 text-center font-bold"
        />
        <select
          value={unitFrom}
          onChange={(e) => setUnitFrom(e.target.value)}
          className="rounded-xl border p-2 font-bold text-xs bg-surface-color text-text-primary"
        >
          <option value="m">Metros (m)</option>
          <option value="cm">Cm (cm)</option>
          <option value="km">Km (km)</option>
          <option value="in">Pulgadas (in)</option>
        </select>
        <span className="font-black">➔</span>
        <select
          value={unitTo}
          onChange={(e) => setUnitTo(e.target.value)}
          className="rounded-xl border p-2 font-bold text-xs bg-surface-color text-text-primary"
        >
          <option value="m">Metros (m)</option>
          <option value="cm">Cm (cm)</option>
          <option value="km">Km (km)</option>
          <option value="in">Pulgadas (in)</option>
        </select>
      </div>

      <div className="p-3 bg-slate-50 dark:bg-slate-900 border rounded-2xl text-center font-black text-lg text-indigo-600">
        Resultado: {convert()} {unitTo}
      </div>
    </div>
  );
}
