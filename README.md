# FoodSaver - Documentación

## Índice
1. [Descripción General](#descripción-general)
2. [Estructura del Proyecto](#estructura-del-proyecto)
3. [Manual de Usuario](#manual-de-usuario)
4. [Guía de Mantenimiento](#guía-de-mantenimiento)
5. [Características Técnicas](#características-técnicas)

## Descripción General
FoodSaver es una aplicación web diseñada para ayudar a reducir el desperdicio alimentario mediante la gestión inteligente de alimentos y sus fechas de caducidad. La aplicación permite a los usuarios realizar un seguimiento de sus alimentos, recibir notificaciones sobre productos próximos a caducar y obtener sugerencias de recetas basadas en los ingredientes disponibles.

## Estructura del Proyecto

### Árbol de Directorios
```
foodsaver/
├── src/
│   ├── components/
│   │   ├── Buscador.tsx           # Componente de búsqueda
│   │   ├── ConsejosDesperdicio.tsx    # Consejos para reducir desperdicio
│   │   ├── EstadisticasAvanzadas.tsx  # Visualización de estadísticas
│   │   ├── FormularioAlimento.tsx     # Formulario CRUD de alimentos
│   │   ├── ListaAlimentos.tsx         # Lista principal de alimentos
│   │   ├── Login.tsx                  # Autenticación de usuario
│   │   ├── Notificaciones.tsx         # Sistema de notificaciones
│   │   ├── PerfilUsuario.tsx          # Gestión de perfil
│   │   └── SugerenciasRecetas.tsx     # Recomendador de recetas
│   ├── data/
│   │   └── recetas.ts            # Base de datos de recetas
│   ├── types.ts                  # Definiciones de TypeScript
│   ├── App.tsx                   # Componente principal
│   ├── main.tsx                  # Punto de entrada
│   └── index.css                 # Estilos globales
├── package.json                  # Dependencias y scripts
├── tsconfig.json                 # Configuración de TypeScript
├── vite.config.ts               # Configuración de Vite
└── tailwind.config.js           # Configuración de Tailwind
```

### Dependencias Principales
```json
{
  "dependencies": {
    "react": "^18.3.1",
    "chart.js": "^4.3.0",
    "framer-motion": "^10.12.16",
    "lucide-react": "^0.344.0"
  }
}
```

## Manual de Usuario

### 1. Inicio de Sesión
1. Acceder a la aplicación
2. Pulsar "Iniciar sesión con cuenta demo"
3. El sistema cargará datos de ejemplo

### 2. Gestión de Alimentos

#### Añadir Alimento
1. Pulsar botón "Añadir Alimento"
2. Rellenar el formulario:
   - Nombre del alimento
   - Fecha de caducidad
   - Cantidad
   - Categoría (autodetectada)
3. Opcional: Usar botón de escaneo para demo

#### Editar Alimento
1. Localizar el alimento en la lista
2. Pulsar el icono de edición
3. Modificar los campos necesarios
4. Guardar cambios

#### Eliminar Alimento
1. Localizar el alimento
2. Pulsar el icono de papelera
3. Confirmar eliminación

### 3. Notificaciones
- Icono de campana en la cabecera
- Punto rojo indica notificaciones nuevas
- Filtrar por tipo: caducados/próximos

### 4. Recetas Sugeridas
1. Acceder a sección "Sugerencias de Recetas"
2. Configurar preferencias dietéticas
3. Explorar recetas recomendadas
4. Ver detalles pulsando "Ver receta"

### 5. Estadísticas
- Cambiar entre gráfico circular/barras
- Consultar métricas de ahorro
- Ver distribución por categorías

## Guía de Mantenimiento

### Actualización de Dependencias
1. Revisar `package.json`
2. Ejecutar `npm update`
3. Verificar compatibilidad
4. Actualizar tipos si necesario

### Gestión de Estado
- Estado global en App.tsx
- Estados locales en componentes
- Persistencia en localStorage

### Base de Datos de Recetas
1. Editar `src/data/recetas.ts`
2. Seguir estructura TypeScript
3. Mantener categorías consistentes

### Mantenimiento de Componentes
1. Verificar props y tipos
2. Mantener lógica separada
3. Actualizar estilos Tailwind

### Monitorización
- Revisar consola de errores
- Verificar rendimiento
- Comprobar accesibilidad

### Backups y Versionado
1. Mantener copias de seguridad
2. Documentar cambios
3. Seguir semver

## Características Técnicas

### Tecnologías Utilizadas
- React 18.3.1
- TypeScript
- Tailwind CSS
- Framer Motion
- Chart.js
- Lucide Icons

### Rendimiento
- Lazy loading de componentes
- Optimización de imágenes
- Caché de datos locales

### Accesibilidad
- ARIA labels
- Contraste de colores
- Navegación por teclado

### Responsive Design
- Mobile-first
- Breakpoints flexibles
- Layouts adaptativos

### Seguridad
- Validación de inputs
- Sanitización de datos
- Protección XSS

### Modo Oscuro
- Tema persistente
- Colores adaptados
- Transiciones suaves
