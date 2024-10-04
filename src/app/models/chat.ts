import { Users } from "./users/users";

export interface Chat {
    id: string;
    lastMessage?: string;
    lastMessageDate?: Date;
    userIds: string[];
    users: Users[];


    chatPic?: string;
    chatName?: string;
}

export interface Message {
    text: string;
    senderId: string;
    senderDate: Date;
}