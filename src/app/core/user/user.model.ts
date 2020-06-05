export interface User {
    nome: string;
    email: string;
    roles: string[];
    isAdmin?: boolean;
}