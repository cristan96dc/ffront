export interface Producto {
  id: number;
  nombre: string;
  valor: number;
  imagen: string | null;
}

export interface ItemCarrito extends Producto {
  cantidad: number;
}

const API_URL = 'http://127.0.0.1:8000';

export const productosAPI = {
  getAll: async (): Promise<Producto[]> => {
    const response = await fetch(`${API_URL}/api/productos/`);
    if (!response.ok) throw new Error('Error');
    return response.json();
  }
};

export { API_URL };