# 📋 Task Management App (React + TypeScript)

Aplicación web modular para la gestión de proyectos y tareas con prioridades por estrellas y estados personalizados.

---

## 🛠️ Tech Stack & Herramientas

* **Core:** React 19 + TypeScript
* **Build Tool:** Vite
* **Styling & UI:** Tailwind CSS v4 + Radix UI (manual implementation) + Lucide React (íconos)
* **Routing:** React Router DOM (v6/v7)
* **HTTP Client:** Axios (con Interceptores JWT)
* **State Management:** Context API (Auth global) + Custom Hooks por feature

---

## 🏗️ Arquitectura de Carpeta (Modular Feature-Based)

El proyecto sigue una estructura modular para desacoplar completamente la lógica de negocio de la interfaz visual:

```text
src/
├── api/                   # Cliente Axios centralizado e interceptores
├── components/
│   └── ui/                # Componentes atómicos base (Button, Input, Skeleton, StarRating)
├── context/               # Proveedores globales (AuthContext)
├── features/
│   ├── auth/              # Módulo de Autenticación
│   │   ├── api/           # Servicios HTTP de Auth
│   │   ├── hooks/         # Hook useLogin
│   │   └── pages/         # Vista LoginPage
│   └── projects/          # Módulo de Proyectos y Tareas
│       ├── api/           # Servicios HTTP (projects.service, tasks.service)
│       ├── hooks/         # Hooks useProjects, useProjectDetailPage
│       └── pages/         # Vistas ProjectsPage, ProjectDetailPage
├── types/                 # Definiciones de TypeScript e interfaces (Task, TaskStatus)
├── App.tsx                # Enrutador principal y proveedores
└── main.tsx               # Punto de entrada de la aplicación

## 👤 Autor

* **Luis David Barriga Garay** - *Desarrollador Principal* - [GitHub](https://github.com/davit412v2/) | [LinkedIn](https://www.linkedin.com/in/luis-david-barriga-garay-48b67b175/)