import { Receta } from '../types';

export const recetas: Receta[] = [
  // Vegetariano
  {
    id: 1,
    nombre: 'Risotto de setas silvestres',
    ingredientes: ['Arroz arborio', 'Setas variadas', 'Cebolla', 'Ajo', 'Vino blanco', 'Queso parmesano', 'Mantequilla'],
    instrucciones: '1. Sofreír cebolla y ajo. 2. Añadir setas. 3. Incorporar arroz y vino. 4. Añadir caldo poco a poco. 5. Finalizar con mantequilla y parmesano.',
    tiempoPreparacion: 45,
    dificultad: 'Media',
    vegetariano: true,
    vegano: false,
    sinGluten: true,
    sinLactosa: false
  },
  {
    id: 2,
    nombre: 'Lasaña de verduras',
    ingredientes: ['Láminas de pasta', 'Berenjena', 'Calabacín', 'Espinacas', 'Ricotta', 'Mozzarella', 'Salsa de tomate'],
    instrucciones: '1. Asar verduras. 2. Alternar capas de pasta, verduras y quesos. 3. Cubrir con salsa. 4. Hornear hasta gratinar.',
    tiempoPreparacion: 60,
    dificultad: 'Media',
    vegetariano: true,
    vegano: false,
    sinGluten: false,
    sinLactosa: false
  },
  {
    id: 3,
    nombre: 'Curry de garbanzos y espinacas',
    ingredientes: ['Garbanzos', 'Espinacas', 'Leche de coco', 'Cebolla', 'Tomate', 'Especias curry', 'Yogur'],
    instrucciones: '1. Sofreír cebolla. 2. Añadir especias y tomate. 3. Incorporar garbanzos y leche de coco. 4. Finalizar con espinacas.',
    tiempoPreparacion: 30,
    dificultad: 'Fácil',
    vegetariano: true,
    vegano: false,
    sinGluten: true,
    sinLactosa: false
  },

  // Vegano
  {
    id: 4,
    nombre: 'Bowl de quinoa y tempeh',
    ingredientes: ['Quinoa', 'Tempeh', 'Brócoli', 'Zanahoria', 'Aguacate', 'Salsa de soja', 'Sésamo'],
    instrucciones: '1. Cocer quinoa. 2. Marinar y saltear tempeh. 3. Cocinar verduras al vapor. 4. Montar el bowl con todos los ingredientes.',
    tiempoPreparacion: 35,
    dificultad: 'Fácil',
    vegetariano: true,
    vegano: true,
    sinGluten: true,
    sinLactosa: true
  },
  {
    id: 5,
    nombre: 'Curry rojo tailandés',
    ingredientes: ['Tofu', 'Leche de coco', 'Pasta de curry rojo', 'Pimiento', 'Bambú', 'Arroz jazmín', 'Albahaca thai'],
    instrucciones: '1. Saltear tofu. 2. Cocinar curry con leche de coco. 3. Añadir verduras. 4. Servir con arroz.',
    tiempoPreparacion: 40,
    dificultad: 'Media',
    vegetariano: true,
    vegano: true,
    sinGluten: true,
    sinLactosa: true
  },
  {
    id: 6,
    nombre: 'Pasta de lentejas con pesto',
    ingredientes: ['Pasta de lentejas', 'Albahaca', 'Piñones', 'Ajo', 'Levadura nutricional', 'Aceite de oliva', 'Tomates cherry'],
    instrucciones: '1. Cocer pasta. 2. Preparar pesto con albahaca y piñones. 3. Mezclar pasta con pesto. 4. Decorar con tomates.',
    tiempoPreparacion: 25,
    dificultad: 'Fácil',
    vegetariano: true,
    vegano: true,
    sinGluten: true,
    sinLactosa: true
  },

  // Sin Gluten
  {
    id: 7,
    nombre: 'Pollo al limón con arroz',
    ingredientes: ['Pechuga de pollo', 'Arroz basmati', 'Limón', 'Ajo', 'Romero', 'Aceite de oliva', 'Caldo de pollo'],
    instrucciones: '1. Marinar pollo. 2. Cocinar arroz. 3. Saltear pollo con ajo y limón. 4. Servir con arroz y hierbas.',
    tiempoPreparacion: 35,
    dificultad: 'Fácil',
    vegetariano: false,
    vegano: false,
    sinGluten: true,
    sinLactosa: true
  },
  {
    id: 8,
    nombre: 'Salmón con puré de coliflor',
    ingredientes: ['Salmón', 'Coliflor', 'Leche de almendras', 'Eneldo', 'Limón', 'Aceite de oliva', 'Pimienta'],
    instrucciones: '1. Cocer coliflor. 2. Hacer puré con leche de almendras. 3. Hornear salmón. 4. Servir con eneldo fresco.',
    tiempoPreparacion: 40,
    dificultad: 'Media',
    vegetariano: false,
    vegano: false,
    sinGluten: true,
    sinLactosa: true
  },
  {
    id: 9,
    nombre: 'Tortilla española con patatas',
    ingredientes: ['Huevos', 'Patatas', 'Cebolla', 'Aceite de oliva', 'Sal', 'Pimienta'],
    instrucciones: '1. Freír patatas y cebolla. 2. Batir huevos. 3. Mezclar todo. 4. Cuajar la tortilla.',
    tiempoPreparacion: 45,
    dificultad: 'Media',
    vegetariano: true,
    vegano: false,
    sinGluten: true,
    sinLactosa: true
  },

  // Sin Lactosa
  {
    id: 10,
    nombre: 'Pad Thai',
    ingredientes: ['Fideos de arroz', 'Pollo', 'Brotes de soja', 'Cacahuetes', 'Huevo', 'Salsa de pescado', 'Lima'],
    instrucciones: '1. Cocer fideos. 2. Saltear pollo. 3. Añadir verduras y huevo. 4. Mezclar con salsa y cacahuetes.',
    tiempoPreparacion: 30,
    dificultad: 'Media',
    vegetariano: false,
    vegano: false,
    sinGluten: true,
    sinLactosa: true
  },
  {
    id: 11,
    nombre: 'Ramen de miso',
    ingredientes: ['Fideos ramen', 'Tofu', 'Pak choi', 'Setas shiitake', 'Pasta de miso', 'Jengibre', 'Cebolla verde'],
    instrucciones: '1. Preparar caldo con miso. 2. Cocer fideos. 3. Saltear verduras. 4. Montar el ramen con todos los ingredientes.',
    tiempoPreparacion: 40,
    dificultad: 'Media',
    vegetariano: true,
    vegano: true,
    sinGluten: false,
    sinLactosa: true
  },
  {
    id: 12,
    nombre: 'Pollo al curry con leche de coco',
    ingredientes: ['Pollo', 'Leche de coco', 'Curry en polvo', 'Cebolla', 'Pimiento', 'Arroz basmati', 'Cilantro'],
    instrucciones: '1. Sofreír pollo con curry. 2. Añadir verduras. 3. Incorporar leche de coco. 4. Servir con arroz.',
    tiempoPreparacion: 35,
    dificultad: 'Fácil',
    vegetariano: false,
    vegano: false,
    sinGluten: true,
    sinLactosa: true
  },

  // Generales
  {
    id: 13,
    nombre: 'Espaguetis a la carbonara',
    ingredientes: ['Espaguetis', 'Panceta', 'Huevos', 'Queso pecorino', 'Queso parmesano', 'Pimienta negra', 'Ajo'],
    instrucciones: '1. Cocer pasta. 2. Dorar panceta. 3. Mezclar huevos y quesos. 4. Combinar todo y añadir pimienta.',
    tiempoPreparacion: 25,
    dificultad: 'Media',
    vegetariano: false,
    vegano: false,
    sinGluten: false,
    sinLactosa: false
  },
  {
    id: 14,
    nombre: 'Pizza casera',
    ingredientes: ['Harina', 'Levadura', 'Mozzarella', 'Salsa de tomate', 'Jamón', 'Champiñones', 'Aceitunas'],
    instrucciones: '1. Preparar masa. 2. Extender y añadir salsa. 3. Cubrir con ingredientes. 4. Hornear hasta dorar.',
    tiempoPreparacion: 90,
    dificultad: 'Media',
    vegetariano: false,
    vegano: false,
    sinGluten: false,
    sinLactosa: false
  },
  {
    id: 15,
    nombre: 'Hamburguesa clásica',
    ingredientes: ['Carne picada', 'Pan de hamburguesa', 'Queso cheddar', 'Lechuga', 'Tomate', 'Cebolla', 'Mayonesa'],
    instrucciones: '1. Formar hamburguesa. 2. Cocinar al punto. 3. Fundir queso. 4. Montar con vegetales y salsas.',
    tiempoPreparacion: 20,
    dificultad: 'Fácil',
    vegetariano: false,
    vegano: false,
    sinGluten: false,
    sinLactosa: false
  },
  {
    id: 16,
    nombre: 'Macarrones con queso',
    ingredientes: ['Macarrones', 'Queso cheddar', 'Leche', 'Mantequilla', 'Harina', 'Nuez moscada', 'Pan rallado'],
    instrucciones: '1. Cocer pasta. 2. Preparar bechamel. 3. Añadir quesos. 4. Gratinar al horno.',
    tiempoPreparacion: 35,
    dificultad: 'Fácil',
    vegetariano: false,
    vegano: false,
    sinGluten: false,
    sinLactosa: false
  },
  {
    id: 17,
    nombre: 'Albóndigas en salsa',
    ingredientes: ['Carne picada mixta', 'Pan rallado', 'Huevo', 'Cebolla', 'Ajo', 'Tomate triturado', 'Vino blanco'],
    instrucciones: '1. Formar albóndigas. 2. Freír. 3. Preparar salsa. 4. Cocinar todo junto.',
    tiempoPreparacion: 50,
    dificultad: 'Media',
    vegetariano: false,
    vegano: false,
    sinGluten: false,
    sinLactosa: false
  }
];