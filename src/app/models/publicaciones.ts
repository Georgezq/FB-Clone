import { Timestamp } from "@angular/fire/firestore";
import { Users } from "./users/users";

export interface Publication {
    id: string;
    id_user: string;
    lastComment?: string;
    lastCommentDate?: Date;
    fechaPublicacion: Date & Timestamp;
    user?: Users;
    imagen_contenido?: string;
    texto_contenido?: string;

}

export interface PublicationComments {
    text: string;
    senderId: string;
    user?: Users;
    sendtDate: Date & Timestamp;
}