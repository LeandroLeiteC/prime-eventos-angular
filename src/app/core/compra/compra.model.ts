import { CompraEvento } from './compra-evento.model';

export interface Compra {
    id: string;
    total: number;
    hora: string;
    statusCompra: string;
    compraEventos?: CompraEvento[];
}