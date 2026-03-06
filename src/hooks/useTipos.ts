import { useState, useEffect } from 'react';
import { tiposAPI, type Tipo } from '../services/api';

export function useTipos() {
  const [tipos, setTipos] = useState<Tipo[]>([]);

  useEffect(() => {
    tiposAPI.getAll().then(setTipos).catch(console.error);
  }, []);

  return { tipos };
}