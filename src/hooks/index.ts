export interface Producto {
  id: number;
  nombre: string;
  valor: number;
  imagen: string | null;
}

export interface ItemCarrito extends Producto {
  cantidad: number;
}