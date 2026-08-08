import { Cliente, Pedido, Faturamento } from './types';

const KEYS = {
  clientes:     'cdt_clientes_v2',
  pedidos:      'cdt_pedidos_v2',
  faturamentos: 'cdt_faturamentos_v2',
  fcCounter:    'cdt_fc_counter_v2',
  recCounter:   'cdt_rec_counter_v2',
} as const;

const SEED_MAPA: Cliente = {
  id: 'mapa-securitizadora-001',
  nome: 'MAPA SECURITIZADORA',
  contato: 'Guilherme',
  cidade: 'Londrina - PR',
  cnpjCpf: '08.769.451/0001-08',
  tipo: 'PJ',
  telefone: '',
  email: '',
  tamanhoMarmita: 'Mini',
  valorUnitario: 22.00,
  taxaEntregaDiaria: 10.00,
  diaFechamento: 6,
  plano: 'Mensal',
  ativo: true,
  criadoEm: '2026-07-01T00:00:00.000Z',
};

const SEED_PEDIDOS: Pedido[] = [
  {id:'p01',clienteId:'mapa-securitizadora-001',data:'2026-07-06',quantidade:5,observacoes:'',criadoEm:'2026-07-06T10:00:00Z'},
  {id:'p02',clienteId:'mapa-securitizadora-001',data:'2026-07-09',quantidade:6,observacoes:'',criadoEm:'2026-07-09T10:00:00Z'},
  {id:'p03',clienteId:'mapa-securitizadora-001',data:'2026-07-10',quantidade:6,observacoes:'',criadoEm:'2026-07-10T10:00:00Z'},
  {id:'p04',clienteId:'mapa-securitizadora-001',data:'2026-07-11',quantidade:6,observacoes:'',criadoEm:'2026-07-11T10:00:00Z'},
  {id:'p05',clienteId:'mapa-securitizadora-001',data:'2026-07-12',quantidade:6,observacoes:'',criadoEm:'2026-07-12T10:00:00Z'},
  {id:'p06',clienteId:'mapa-securitizadora-001',data:'2026-07-15',quantidade:6,observacoes:'',criadoEm:'2026-07-15T10:00:00Z'},
  {id:'p07',clienteId:'mapa-securitizadora-001',data:'2026-07-16',quantidade:6,observacoes:'',criadoEm:'2026-07-16T10:00:00Z'},
  {id:'p08',clienteId:'mapa-securitizadora-001',data:'2026-07-17',quantidade:6,observacoes:'',criadoEm:'2026-07-17T10:00:00Z'},
  {id:'p09',clienteId:'mapa-securitizadora-001',data:'2026-07-18',quantidade:6,observacoes:'',criadoEm:'2026-07-18T10:00:00Z'},
  {id:'p10',clienteId:'mapa-securitizadora-001',data:'2026-07-19',quantidade:5,observacoes:'',criadoEm:'2026-07-19T10:00:00Z'},
  {id:'p11',clienteId:'mapa-securitizadora-001',data:'2026-07-20',quantidade:4,observacoes:'',criadoEm:'2026-07-20T10:00:00Z'},
  {id:'p12',clienteId:'mapa-securitizadora-001',data:'2026-07-21',quantidade:5,observacoes:'',criadoEm:'2026-07-21T10:00:00Z'},
  {id:'p13',clienteId:'mapa-securitizadora-001',data:'2026-07-22',quantidade:5,observacoes:'',criadoEm:'2026-07-22T10:00:00Z'},
  {id:'p14',clienteId:'mapa-securitizadora-001',data:'2026-07-23',quantidade:5,observacoes:'',criadoEm:'2026-07-23T10:00:00Z'},
  {id:'p15',clienteId:'mapa-securitizadora-001',data:'2026-07-24',quantidade:5,observacoes:'',criadoEm:'2026-07-24T10:00:00Z'},
  {id:'p16',clienteId:'mapa-securitizadora-001',data:'2026-07-27',quantidade:5,observacoes:'',criadoEm:'2026-07-27T10:00:00Z'},
  {id:'p17',clienteId:'mapa-securitizadora-001',data:'2026-07-28',quantidade:5,observacoes:'',criadoEm:'2026-07-28T10:00:00Z'},
  {id:'p18',clienteId:'mapa-securitizadora-001',data:'2026-07-29',quantidade:5,observacoes:'',criadoEm:'2026-07-29T10:00:00Z'},
  {id:'p19',clienteId:'mapa-securitizadora-001',data:'2026-07-30',quantidade:5,observacoes:'',criadoEm:'2026-07-30T10:00:00Z'},
  {id:'p20',clienteId:'mapa-securitizadora-001',data:'2026-07-31',quantidade:5,observacoes:'',criadoEm:'2026-07-31T10:00:00Z'},
  {id:'p21',clienteId:'mapa-securitizadora-001',data:'2026-08-03',quantidade:6,observacoes:'',criadoEm:'2026-08-03T10:00:00Z'},
  {id:'p22',clienteId:'mapa-securitizadora-001',data:'2026-08-04',quantidade:6,observacoes:'',criadoEm:'2026-08-04T10:00:00Z'},
  {id:'p23',clienteId:'mapa-securitizadora-001',data:'2026-08-05',quantidade:6,observacoes:'',criadoEm:'2026-08-05T10:00:00Z'},
  {id:'p24',clienteId:'mapa-securitizadora-001',data:'2026-08-06',quantidade:6,observacoes:'',criadoEm:'2026-08-06T10:00:00Z'},
];

function load<T>(key: string): T[] {
  if (typeof window === 'undefined') return [];
  try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; }
}
function save<T>(key: string, data: T[]): void {
  if (typeof window !== 'undefined') localStorage.setItem(key, JSON.stringify(data));
}

export function loadClientes(): Cliente[] {
  if (typeof window === 'undefined') return [SEED_MAPA];
  const raw = localStorage.getItem(KEYS.clientes);
  if (!raw) { save(KEYS.clientes, [SEED_MAPA]); return [SEED_MAPA]; }
  return JSON.parse(raw) as Cliente[];
}
export const saveClientes = (d: Cliente[]) => save(KEYS.clientes, d);

export function loadPedidos(): Pedido[] {
  if (typeof window === 'undefined') return SEED_PEDIDOS;
  const raw = localStorage.getItem(KEYS.pedidos);
  if (!raw) { save(KEYS.pedidos, SEED_PEDIDOS); return SEED_PEDIDOS; }
  return JSON.parse(raw) as Pedido[];
}
export const savePedidos = (d: Pedido[]) => save(KEYS.pedidos, d);

export function loadFaturamentos(): Faturamento[] {
  if (typeof window === 'undefined') return [];
  const raw = localStorage.getItem(KEYS.faturamentos);
  return raw ? JSON.parse(raw) as Faturamento[] : [];
}
export const saveFaturamentos = (d: Faturamento[]) => save(KEYS.faturamentos, d);

export function nextFcNumber(): string {
  if (typeof window === 'undefined') return 'FC-2026/08-01';
  const n = parseInt(localStorage.getItem(KEYS.fcCounter) || '5', 10) + 1;
  localStorage.setItem(KEYS.fcCounter, String(n));
  const d = new Date();
  return `FC-${d.getFullYear()}/${String(d.getMonth()+1).padStart(2,'0')}-${String(n).padStart(2,'0')}`;
}
export function nextRecNumber(): string {
  if (typeof window === 'undefined') return 'REC-2026/08-01';
  const n = parseInt(localStorage.getItem(KEYS.recCounter) || '4', 10) + 1;
  localStorage.setItem(KEYS.recCounter, String(n));
  const d = new Date();
  return `REC-${d.getFullYear()}/${String(d.getMonth()+1).padStart(2,'0')}-${String(n).padStart(2,'0')}`;
}
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2,9)}`;
}
