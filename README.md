<div align="center">

<img src="./MathLearn.png" alt="MathLearn" width="180">

# MathLearn

**Plataforma educativa interactiva para aprender, practicar y explorar matemáticas**

[![React](https://img.shields.io/badge/React-19-20232A?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Rust](https://img.shields.io/badge/Rust-Optional_Backend-000000?logo=rust)](https://www.rust-lang.org/)
[![License: GPL v3+](https://img.shields.io/badge/License-GPLv3%2B-blue.svg)](LICENSE)

</div>

---

## Descripción

**MathLearn** es una plataforma educativa interactiva orientada al aprendizaje y práctica de matemáticas.

El proyecto reúne contenido por niveles, ejercicios, seguimiento de progreso, juegos, lógica, calculadoras y herramientas matemáticas dentro de una sola aplicación.

Está construido principalmente con React y TypeScript e incluye un backend local opcional desarrollado en Rust.

---

## Objetivos

MathLearn busca combinar tres enfoques:

1. **Aprender** conceptos matemáticos mediante contenido organizado.
2. **Practicar** mediante ejercicios y actividades interactivas.
3. **Explorar** matemáticas utilizando calculadoras y herramientas visuales.

El proyecto está pensado como una plataforma extensible y experimental, no como sustituto de un programa académico formal.

---

## Contenido educativo

El árbol de aprendizaje incluye módulos y secciones para distintos niveles y enfoques, entre ellos:

- preescolar;
- primaria baja;
- primaria alta;
- secundaria;
- bachillerato;
- matemáticas aplicadas;
- trigonometría;
- razonamiento;
- enriquecimiento;
- historia de las matemáticas;
- herramientas matemáticas.

---

## Características

### 📚 Aprendizaje

- Contenido organizado por niveles.
- Explicaciones y secciones temáticas.
- Navegación entre áreas de estudio.
- Herramientas de apoyo.
- Material de razonamiento y enriquecimiento.

### ✏️ Ejercicios

- Generación y resolución de ejercicios.
- Diferentes niveles de dificultad.
- Retroalimentación.
- Resolución paso a paso en módulos compatibles.
- Modos de práctica.
- Seguimiento de respuestas correctas.

### 🏆 Progreso

La aplicación incorpora un sistema local de progreso con elementos como:

- puntos;
- nivel;
- rachas;
- ejercicios completados;
- respuestas correctas;
- logros;
- vidas;
- estadísticas por tipo de ejercicio.

### 🎮 Juegos y lógica

Incluye secciones independientes para:

- juegos matemáticos;
- sudokus y actividades;
- desafíos de lógica;
- razonamiento.

### 🧮 Suite de calculadoras

MathLearn incluye herramientas para cálculo y exploración matemática, como:

- calculadora básica;
- calculadora científica;
- gráfica 2D;
- herramientas algebraicas/CAS;
- resolución paso a paso.

### 📅 Herramientas adicionales

La interfaz también contiene módulos para:

- calendario;
- formulario matemático;
- plugins;
- personalización;
- panel principal.

---

## Personalización y accesibilidad

La interfaz permite modificar diferentes parámetros de presentación, entre ellos:

- temas;
- modo oscuro;
- colores;
- tipografía;
- tamaño de fuente;
- radio de bordes;
- patrones de fondo;
- densidad;
- sombras;
- velocidad de transición;
- contraste;
- reducción de movimiento;
- zoom;
- altura de línea.

---

## Motor matemático

El frontend utiliza distintas bibliotecas especializadas para cálculo, representación y entrada matemática.

Entre ellas:

- Math.js
- KaTeX
- MathLive
- Nerdamer
- Cortex Compute Engine
- React MathQuill

Esto permite combinar evaluación numérica, álgebra simbólica, notación matemática y componentes interactivos.

---

## Backend opcional en Rust

El repositorio incluye:

```text
rust-backend/
```

Este componente implementa un servidor local para MathLearn mediante:

- Rust;
- Axum;
- Tokio;
- Serde;
- Tower HTTP.

Puede compilarse por separado y está pensado como infraestructura auxiliar para funciones locales.

---

## Tecnologías

### Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion

### Matemáticas

- Math.js
- KaTeX
- MathLive
- Nerdamer
- Cortex Compute Engine
- React MathQuill

### Backend opcional

- Rust
- Axum
- Tokio
- Serde

---

## Instalación

### Requisitos

Para el frontend:

- Node.js
- npm

Para compilar el backend opcional:

- Rust
- Cargo

Clona el repositorio:

```bash
git clone https://github.com/DaiGeass/MathLearn.git
cd MathLearn
```

Instala dependencias:

```bash
npm install
```

---

## Ejecutar el frontend

```bash
npm run dev
```

Para generar una compilación:

```bash
npm run build
```

Para previsualizarla:

```bash
npm run preview
```

---

## Compilar el backend Rust

Desde la raíz:

```bash
npm run rust-build
```

O directamente:

```bash
cd rust-backend
cargo build --release
```

---

## Estructura general

```text
MathLearn/
├── bin/                    # Utilidades / entrada auxiliar
├── rust-backend/           # Backend local en Rust
│   ├── src/
│   └── Cargo.toml
│
├── src/
│   ├── learn/              # Contenido educativo por niveles
│   ├── App.tsx             # Aplicación principal
│   ├── calculadoras.tsx    # Suite de calculadoras
│   ├── calendario.tsx      # Calendario
│   ├── formulario.tsx      # Formulario matemático
│   ├── juegos.tsx          # Juegos
│   ├── logica.tsx          # Lógica y razonamiento
│   ├── plugins.tsx         # Sistema de plugins
│   └── main.tsx
│
├── MathLearn.png
├── package.json
├── tsconfig.json
└── vite.config.ts
```

---

## Datos y progreso

Parte del progreso y de las preferencias de la aplicación se almacenan localmente en el navegador.

Por ello:

- borrar el almacenamiento local puede eliminar progreso;
- realiza respaldos si una futura versión incorpora exportación de datos;
- no utilices el almacenamiento local para información sensible.

---

## Estado del proyecto

MathLearn se encuentra en **desarrollo activo**.

El contenido, las herramientas educativas y la arquitectura pueden cambiar conforme evolucione el proyecto.

---

## Contribuir

1. Haz un fork del repositorio.
2. Crea una rama:

```bash
git checkout -b feature/mi-mejora
```

3. Realiza los cambios.
4. Utiliza commits claros:

```bash
git commit -m "feat(calculator): add polynomial visualization"
```

5. Haz push.
6. Abre un Pull Request.

---

## Licencia

MathLearn se distribuye bajo **GNU General Public License v3.0 or later (`GPL-3.0-or-later`)**.

Consulta [`LICENSE`](./LICENSE).

Copyright © 2025–2026 **DaiGeass**.

---

## Autor

Desarrollado por **DaiGeass**.

GitHub: [@DaiGeass](https://github.com/DaiGeass)
