'use client';
import { useEffect, useState } from 'react';
import { loadFaturamentos, loadClientes, loadPedidos } from '@/lib/storage';
import { brl, fmtData, fmtPeriodo } from '@/lib/utils';
import { Faturamento, Cliente } from '@/lib/types';

export default function HistoricoPage() {
  const [faturamentos, setFaturamentos] = useState<Faturamento[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [filtroCliente, setFiltroCliente] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('');

  useEffect(() => {
    setFaturamentos(loadFaturamentos());
    setClientes(loadClientes());
  }, []);

  const lista = faturamentos
    .filter(f => (!filtroCliente || f.clienteId === filtroCliente))
    .filter(f => (!filtroStatus || f.status === filtroStatus));

  const totalAberto = lista.filter(f => f.status === 'Aberto').reduce((s, f) => s + f.totalGeral, 0);
  const totalPago   = lista.filter(f => f.status === 'Pago').reduce((s, f) => s + f.totalGeral, 0);
  const pedidos = loadPedidos();
  const totalMarmitas = pedidos.filter(p => !filtroCliente || p.clienteId === filtroCliente).reduce((s, p) => s + p.quantidade, 0);

  const inp = 'border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400';

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-xl font-bold mb-4">📊 Histórico</h1>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {[
          { label: 'Total em Aberto', valor: brl(totalAberto), cor: 'text-amber-600' },
          { label: 'Total Recebido',  valor: brl(totalPago),   cor: 'text-emerald-600' },
          { label: 'Marmitas Totais', valor: String(totalMarmitas) + ' un.', cor: 'text-indigo-600' },
        ].map(k => (
          <div key={k.label} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <p className="text-xs text-gray-500 mb-1">{k.label}</p>
            <p className={`text-xl font-bold ${k.cor}`}>{k.valor}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-3 mb-4">
        <select className={inp} value={filtroCliente} onChange={e => setFiltroCliente(e.target.value)}>
          <option value="">Todos os clientes</option>
          {clientes.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
        </select>
        <select className={inp} value={filtroStatus} onChange={e => setFiltroStatus(e.target.value)}>
          <option value="">Todos os status</option>
          <option value="Aberto">Aberto</option>
          <option value="Pago">Pago</option>
        </select>
      </div>

      <div className="space-y-2">
        {lista.map(f => {
          const c = clientes.find(x => x.id === f.clienteId);
          return (
            <div key={f.id} className="bg-white border border-gray-200 rounded-xl px-4 py-3 flex items-center justify-between">
              <div>
                <p className="font-medium text-sm">{f.numeroFechamento} <span className="text-gray-400">·</span> {c?.nome}</p>
                <p className="text-xs text-gray-500 mt-0.5">{fmtPeriodo(f.periodoInicio, f.periodoFim)} · {f.totalMarmitas} marmitas · Emissão: {fmtData(f.dataEmissao)}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-sm">{brl(f.totalGeral)}</span>
                <span className={`text-xs px-2 py-1 rounded-full ${f.status === 'Pago' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{f.status}</span>
              </div>
            </div>
          );
        })}
        {lista.length === 0 && <p className="text-gray-400 text-sm text-center py-8">Nenhum registro encontrado.</p>}
      </div>
    </div>
  );
}
