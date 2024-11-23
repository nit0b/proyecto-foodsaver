export interface Alimento {
  id: number;
  nombre: string;
  fechaCaducidad: string;
  cantidad: number;
  categoria: string;
}

export interface Receta {
  id: number;
  nombre: string;
  ingredientes: string[];
  instrucciones: string;
  tiempoPreparacion: number;
  dificultad: 'Fácil' | 'Media' | 'Difícil';
  vegetariano: boolean;
  vegano: boolean;
  sinGluten: boolean;
  sinLactosa: boolean;
}

export interface Usuario {
  nombre: string;
  email: string;
}