import { CasaDeShow } from '../casa-de-show/casa-de-show.model';

export interface Evento {
    id: string;
    nome: string;
    descricao: string;
    pequenaDescricao: string;
    casaDeShow: CasaDeShow;
    data: string;
    preco: string;
    nomeImagemCard: string;
    nomeImagemBanner: string;
    status: string;
    ingressosDisponiveis: number;
    ingressosVendidos: number;
    limiteCliente: number;
}