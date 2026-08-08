export type PlanoTipo = 'Mensal' | 'Quinzenal' | 'Semanal';
export type TamanhoMarmita = 'Mini' | 'Media' | 'Grande';
export type StatusFaturamento = 'Aberto' | 'Pago';
export type TipoPessoa = 'PJ' | 'PF';

export const EMPRESA = {
  razaoSocial: 'Caseirinhas da Tatá Restaurante',
  cnpj: '37.527.003/0001-98',
  endereco: 'Rua Maria Sinopoli Francovig, 1142 – Londrina / PR',
  telefone: '(43) 99955-8837',
  whatsapp: '5543999558837',
  email: 'contato@caseirinhasdatata.shop',
  site: 'caseirinhasdatata.shop',
  socios: [
    { nome: 'Gaudencio Bento Samuyenga', qualificacao: 'Sócio Proprietário', cpf: '066.075.549-11', rg: '27.837.138-3' },
    { nome: 'Thayrine Cristina', qualificacao: 'Sócia Proprietária e Resp. Técnica', cpf: '110.450.469-30', rg: '13.552.229-29' },
  ],
  pixChave: '37.527.003/0001-98',
  pixTitular: 'Gaudencio Bento Samuyenga',
  pixFormaPagamento: 'Transferência Instantânea via PIX',
} as const;

export const PRECOS_PADRAO: Record<TamanhoMarmita, number> = {
  Mini: 22.00,
  Media: 27.00,
  Grande: 32.00,
};

export interface Cliente {
  id: string;
  nome: string;
  contato: string;
  cidade: string;
  cnpjCpf: string;
  tipo: TipoPessoa;
  telefone: string;
  email: string;
  tamanhoMarmita: TamanhoMarmita;
  valorUnitario: number;
  taxaEntregaDiaria: number;
  diaFechamento: number;
  plano: PlanoTipo;
  ativo: boolean;
  criadoEm: string;
}

export interface Pedido {
  id: string;
  clienteId: string;
  data: string;
  quantidade: number;
  observacoes: string;
  criadoEm: string;
}

export interface ItemFechamento {
  posicao: number;
  data: string;
  descricao: string;
  quantidade: number;
  valorUnitario: number;
  taxaEntrega: number;
  totalDia: number;
}

export interface Faturamento {
  id: string;
  clienteId: string;
  numeroFechamento: string;
  numeroRecibo: string;
  periodoInicio: string;
  periodoFim: string;
  dataEmissao: string;
  itens: ItemFechamento[];
  totalMarmitas: number;
  totalDiariasEntrega: number;
  subtotalMarmitas: number;
  subtotalEntregas: number;
  totalGeral: number;
  status: StatusFaturamento;
  criadoEm: string;
}
