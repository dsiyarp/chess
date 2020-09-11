export interface IUsuario {
  id?: string;
  usuario: string;
  activo: boolean;
  clave: string;
  nombre?: string;
  apellido?: string;
  email: string;
  direccion?: string;
  telefono?: string;
  imagen64?: string;
}
