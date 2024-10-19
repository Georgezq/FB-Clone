import { Timestamp } from "@angular/fire/firestore";
import { Users } from "./users/users";

export interface Publication {
    id: string;
    id_user: string;
    fechaPublicacion: Date & Timestamp;
    user?: Users;
    contenido: {
        imagen_contenido: string;
        texto_contenido: string;
      };
    comentarios?: PublicationComments[];

}

export interface PublicationComments {
    text: string;
    senderId: string;
    senderDate: Date;
}