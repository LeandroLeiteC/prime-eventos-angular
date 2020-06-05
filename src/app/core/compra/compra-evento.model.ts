import { Evento } from '../evento/evento.model';

export interface CompraEvento {
    evento: Evento;
    qtdIngresso: number;
    valorUnitario: number;
    subtotal: number;
}