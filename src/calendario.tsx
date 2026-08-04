import { useState, useMemo } from "react";
import { Calendar, Trash2, CheckCircle, Plus } from "lucide-react";

interface Task {
  id: string;
  text: string;
  done: boolean;
  priority: 'alta' | 'media' | 'baja';
  category: 'estudio' | 'tarea' | 'repaso';
}

export function CalendarioView({ onWinStreak }: { onWinStreak: (pts: number) => void }) {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem("mlTasksV5");
    if (!saved) return [];
    try {
      return (JSON.parse(saved) as Array<Partial<Task>>).map((t, i) => ({
        id: t.id ?? `legacy-${i}`,
        text: t.text ?? 'Tarea',
        done: !!t.done,
        priority: t.priority ?? 'media',
        category: t.category ?? 'estudio',
      }));
    } catch {
      return [];
    }
  });
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState<Task['priority']>('media');
  const [category, setCategory] = useState<Task['category']>('estudio');

  const saveTasks = (newTasks: Task[]) => {
    setTasks(newTasks);
    localStorage.setItem("mlTasksV5", JSON.stringify(newTasks));
  };

  const addTask = () => {
    if (!input.trim()) return;
    const next = [...tasks, { id: Date.now().toString(), text: input, done: false, priority, category }];
    saveTasks(next);
    setInput("");
  };

  const toggleTask = (id: string) => {
    const next = tasks.map((t) => {
      if (t.id === id) {
        if (!t.done) onWinStreak(10); // Reward for completing a task
        return { ...t, done: !t.done };
      }
      return t;
    });
    saveTasks(next);
  };

  const deleteTask = (id: string) => {
    const next = tasks.filter((t) => t.id !== id);
    saveTasks(next);
  };

  // Calendar generation
  const daysInMonth = useMemo(() => {
    const days = [];
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth();
    const totalDays = new Date(year, month + 1, 0).getDate();
    for (let i = 1; i <= totalDays; i++) {
      days.push(i);
    }
    return days;
  }, []);

  const currentMonthName = useMemo(() => {
    const months = [
      "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
      "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    return months[new Date().getMonth()];
  }, []);

  return (
    <div className="space-y-6 max-w-4xl mx-auto pb-20 md:pb-6">
      <div className="math-card bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-xl">
        <h1 className="text-2xl md:text-4xl font-black mb-1 flex items-center gap-2">
          <Calendar size={30} /> Calendario de Estudio y Tareas
        </h1>
        <p className="opacity-95 font-bold text-sm md:text-base">
          Anota tus deberes, organiza tu plan de estudios y visualiza tu racha diaria en el calendario de {currentMonthName}.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Calendar View */}
        <div className="math-card">
          <h2 className="text-xl font-black mb-3 text-[var(--primary-color)] flex items-center gap-2">
            📅 Racha de {currentMonthName}
          </h2>
          <p className="text-xs font-bold opacity-80 mb-4" style={{ color: "var(--text2)" }}>
            Los días que has completado al menos un ejercicio se marcan con una estrella.
          </p>

          <div className="grid grid-cols-7 gap-2 text-center font-bold text-xs">
            {["D", "L", "M", "M", "J", "V", "S"].map((d, i) => (
              <span key={i} className="text-slate-400">{d}</span>
            ))}
            {daysInMonth.map((day) => {
              const isToday = day === new Date().getDate();
              return (
                <div
                  key={day}
                  className={`aspect-square flex items-center justify-center rounded-xl text-xs font-black relative border-2 ${isToday ? "border-[var(--primary-color)] font-black" : "border-transparent"} bg-slate-100 dark:bg-slate-800`}
                >
                  {day}
                  {isToday && (
                    <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-[var(--primary-color)]" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Task List */}
        <div className="math-card flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-black mb-3 text-emerald-500 flex items-center gap-2">
              📝 Deberes y Tareas
            </h2>
            <div className="grid gap-2 mb-4 md:grid-cols-[1fr_140px_140px_auto]">
              <input
                type="text"
                placeholder="Añadir una tarea o deber..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && addTask()}
                className="flex-1 rounded-2xl border-2 border-border-color bg-surface-color font-bold text-sm px-3 outline-none"
              />
              <select value={category} onChange={(e) => setCategory(e.target.value as Task['category'])} className="rounded-2xl border-2 border-border-color bg-surface-color font-bold text-xs px-3 outline-none">
                <option value="estudio">📘 Estudio</option>
                <option value="tarea">📝 Tarea</option>
                <option value="repaso">🔁 Repaso</option>
              </select>
              <select value={priority} onChange={(e) => setPriority(e.target.value as Task['priority'])} className="rounded-2xl border-2 border-border-color bg-surface-color font-bold text-xs px-3 outline-none">
                <option value="alta">🔴 Alta</option>
                <option value="media">🟡 Media</option>
                <option value="baja">🟢 Baja</option>
              </select>
              <button onClick={addTask} className="math-btn !py-2.5 !px-4 text-xs">
                <Plus size={16} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4 text-center text-xs font-black">
              <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30">Hechas: {tasks.filter(t => t.done).length}</div>
              <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/30">Pendientes: {tasks.filter(t => !t.done).length}</div>
              <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/30">Alta prioridad: {tasks.filter(t => !t.done && t.priority === 'alta').length}</div>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto">
              {tasks.length === 0 ? (
                <p className="text-xs font-bold opacity-70 italic text-center py-6" style={{ color: "var(--text2)" }}>
                  ¡No tienes tareas pendientes! Añade una arriba.
                </p>
              ) : (
                tasks.map((t) => (
                  <div
                    key={t.id}
                    className="flex justify-between items-center gap-3 bg-slate-50 dark:bg-slate-900 border p-3 rounded-2xl"
                  >
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <button
                        onClick={() => toggleTask(t.id)}
                        className={`flex-shrink-0 text-slate-400 hover:text-emerald-500 transition-all ${t.done ? "text-emerald-500" : ""}`}
                      >
                        <CheckCircle size={18} fill={t.done ? "currentColor" : "none"} />
                      </button>
                      <div className="min-w-0 flex-1">
                        <span className={`text-sm font-bold block truncate ${t.done ? "line-through opacity-50" : ""}`} style={{ color: "var(--text1)" }}>
                          {t.text}
                        </span>
                        <div className="flex gap-1 mt-1 flex-wrap">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-blue-500/10 text-blue-600">{t.category}</span>
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${t.priority === 'alta' ? 'bg-red-500/10 text-red-600' : t.priority === 'media' ? 'bg-amber-500/10 text-amber-600' : 'bg-emerald-500/10 text-emerald-600'}`}>{t.priority}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => deleteTask(t.id)}
                      className="text-red-500 hover:text-red-700 transition"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-4 text-[10px] font-black text-slate-400 text-center uppercase tracking-wider">
            ¡Completar una tarea te otorga +10 pts!
          </div>
        </div>
      </div>
    </div>
  );
}
