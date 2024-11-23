# FoodSaver - Reduce el desperdicio alimentario

Aplicación web para gestionar alimentos y reducir el desperdicio alimentario, desarrollada con React, TypeScript, Tailwind CSS y Vite.

## 📑 Índice

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Uso](#uso)
- [Componentes](#componentes)

## ✨ Características

- Gestión de alimentos con fechas de caducidad
- Sistema de notificaciones para alimentos próximos a caducar
- Sugerencias de recetas basadas en ingredientes disponibles
- Filtros por preferencias dietéticas
- Estadísticas avanzadas con gráficos
- Consejos para reducir el desperdicio
- Modo oscuro/claro
- Interfaz responsive

## 🛠 Tecnologías

- React 18
- TypeScript
- Tailwind CSS
- Vite
- Chart.js
- Framer Motion
- Lucide Icons

## 📁 Estructura del Proyecto

```
foodsaver/
├── src/
│   ├── components/
│   │   ├── Buscador.tsx
│   │   ├── ConsejosDesperdicio.tsx
│   │   ├── Estadisticas.tsx
│   │   ├── EstadisticasAvanzadas.tsx
│   │   ├── FormularioAlimento.tsx
│   │   ├── ListaAlimentos.tsx
│   │   ├── Login.tsx
│   │   ├── Notificaciones.tsx
│   │   ├── PerfilUsuario.tsx
│   │   └── SugerenciasRecetas.tsx
│   ├── data/
│   │   └── recetas.ts
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   ├── types.ts
│   └── vite-env.d.ts
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## 🚀 Instalación

1. Clona el repositorio
```bash
git clone https://github.com/tu-usuario/foodsaver.git
cd foodsaver
```

2. Instala las dependencias
```bash
npm install
```

3. Inicia el servidor de desarrollo
```bash
npm run dev
```

## 💻 Uso

1. Inicia sesión con la cuenta demo
2. Añade alimentos manualmente o usa el botón "Añadir Todos"
3. Gestiona tus alimentos:
   - Edita o elimina alimentos
   - Visualiza fechas de caducidad
   - Recibe notificaciones
4. Explora recetas sugeridas basadas en tus ingredientes
5. Consulta estadísticas y consejos

## 🧩 Componentes

### App.tsx
- Componente principal
- Gestión de estado global
- Enrutamiento y navegación

### Buscador.tsx
- Filtrado de alimentos
- Búsqueda en tiempo real

### ConsejosDesperdicio.tsx
- Consejos dinámicos
- Recomendaciones personalizadas

### Estadisticas.tsx
- Gráficos básicos
- Resumen de alimentos
- Distribución por categorías

### EstadisticasAvanzadas.tsx
- Gráficos interactivos avanzados
- Métricas de ahorro
- Análisis detallado de desperdicios
- Visualización temporal de caducidades

### FormularioAlimento.tsx
- Añadir/editar alimentos
- Validación de datos
- Escaneo simulado
- Autocompletado de categorías

### ListaAlimentos.tsx
- Visualización de alimentos
- Ordenación y filtrado
- Acciones rápidas
- Indicadores de caducidad

### Login.tsx
- Autenticación demo
- Interfaz de inicio de sesión
- Animaciones de transición

### Notificaciones.tsx
- Sistema de alertas
- Notificaciones por caducidad
- Gestión de estados de lectura

### PerfilUsuario.tsx
- Gestión de perfil
- Preferencias de usuario
- Modo compacto/completo

### SugerenciasRecetas.tsx
- Recomendaciones de recetas
- Filtros dietéticos
- Vista detallada de recetas
- Preferencias alimentarias
