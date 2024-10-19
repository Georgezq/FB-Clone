import { Timestamp } from "@angular/fire/firestore";
import { Users } from "./users/users";

export interface Historias{
  id_historia?: number,
  contenido: {
    imagen_contenido: string;
    texto_contenido: string;
  };
  id_user: string;
  fechaPublicacion: Date & Timestamp;
  user?: Users;
}
