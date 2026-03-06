const API_URL = 'http://127.0.0.1:8000';

export interface Producto {
  id: number;
  nombre: string;
  valor: number;
  imagen: string | null;
  tipo: number | null;
}

export interface ItemCarrito extends Producto {
  cantidad: number;
}

export interface Tipo {
  id: number;
  nombre: string;
}

export const productosAPI = {
  getAll: async (): Promise<Producto[]> => {
    const response = await fetch(`${API_URL}/api/productos/`);
    if (!response.ok) throw new Error('Error');
    return response.json();
  }
};

export const tiposAPI = {
  getAll: async (): Promise<Tipo[]> => {
    const response = await fetch(`${API_URL}/api/tipos/`);
    if (!response.ok) throw new Error('Error');
    return response.json();
  }
};

export { API_URL };