export interface Publication {
    id: string;
    autor: string;
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