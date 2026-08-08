'use client';
import { useEffect, useState } from 'react';
import { Pedido, Cliente } from '@/lib/types';
import { loadPedidos, savePedidos, loadClientes, generateId } from '@/lib/storage';
import { brl, fmtData } from '@/lib/utils';

export default function PedidosPage() {
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [clienteId, setClienteId] = useState('');
  const [data, setData] = useState(new Date().toISOString().split('T')[0]);
  const [quantidade, setQuantidade] = useState(1);
  const [obs, setObs] = useState('');
  const [msg, setMsg] = useState('');

  useEffect(() => {
    setClientes(loadClientes().filter(c => c.ativo));
    setPedidos(loadPedidos());
  }, []);

  const cliente = clientes.find(c => c.id === clienteId);

  function adicionar() {
    if (!clienteId || quantidade < 1) { setMsg('Selecione o cliente e quantidade.'); return; }
    const novo: Pedido = { id: generateId(), clienteId, data, quantidade, observacoes: obs, criadoEm: new Date().toISOString() };
    const lista = [...pedidos, novo].sort((a, b) => a.data.localeCompare(b.data));
    savePedidos(lista); setPedidos(lista);
    setMsg(`✅ Pedido de ${quantidade} marmita(s) adicionado — ${fmtData(data)}`);
    setQuantidade(1); setObs('');
  }

  function remover(id: string) {
    const lista = pedidos.filter(p => p.id !== id);
    savePedidos(lista); setPedidos(lista);
  }

  const pedidosFiltrados = clienteId
    ? pedidos.filter(p => p.clienteId === clienteId).slice().reverse()
    : pedidos.slice().reverse().slice(0, 30);

  const inp = 'border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-400';
  const lbl = 'text-xs font-medium text-gray-600 mb-1 block';

  const totalDia = cliente ? quantidade * cliente.valorUnitario + cliente.taxaEntregaDiaria : 0;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-xl font-bold mb-4">🍱 Pedidos</h1>

      <div className="bg-white border border-gray-200 rounded-xl p-5 mb-6 shadow-sm">
        <h2 className="font-semibold mb-4 text-sm">Registrar Nova Entrega</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="col-span-2">
            <label className={lbl}>Cliente</label>
            <select className={inp} value={clienteId} onChange={e => setClienteId(e.target.value)}>
              <option value="">Selecione...</option>
              {clientes.map(c => <option key={c.id} value={c.id}>{c.nome}</option>)}
            </select>
          </div>
          <div>
            <label className={lbl}>Data da Entrega</label>
            <input type="date" className={inp} value={data} onChange={e => setData(e.target.value)} />
          </div>
          <div>
            <label className={lbl}>Qtd. Marmitas</label>
            <input type="number" min={1} max={99} className={inp} value={quantidade} onChange={e => setQuantidade(+e.target.value)} />
          </div>
          <div className="col-span-2">
            <label className={lbl}>Observações</label>
            <input type="text" className={inp} placeholder="Opcional..." value={obs} onChange={e => setObs(e.target.value)} />
          </div>
          {cliente && (
            <div className="col-span-2 bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm">
              <span className="text-blue-700 font-medium">Marmita {cliente.tamanhoMarmita}: </span>
              <span>{quantidade} × {brl(cliente.valorUnitario)} + {brl(cliente.taxaEntregaDiaria)} entrega = </span>
              <span className="font-bold text-blue-800">{brl(totalDia)}</span>
            </div>
          )}
        </div>
        <div className="flex gap-3 mt-4">
          <button onClick={adicionar} className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">+ Adicionar Entrega</button>
        </div>
        {msg && <p className="mt-2 text-sm text-emerald-600">{msg}</p>}
      </div>

      <div className="flex items-center justify-between mb-3">
        <h2 className="font-semibold text-sm">{clienteId ? `Pedidos de ${cliente?.nome}` : 'Últimos 30 pedidos'}</h2>
        {clienteId && (
          <p className="text-xs text-gray-500">
            Total: {pedidosFiltrados.reduce((s, p) => s + p.quantidade, 0)} marmitas
          </p>
        )}
      </div>

      <div className="space-y-2">
        {pedidosFiltrados.map(p => {
          const c = clientes.find(x => x.id === p.clienteId);
          const total = c ? p.quantidade * c.valorUnitario + c.taxaEntregaDiaria : 0;
          return (
            <div key={p.id} className="bg-white border border-gray-200 rounded-xl px-4 py-3 flex items-center justify-between">
              <div>
                <span className="font-medium text-sm">{fmtData(p.data)}</span>
                <span className="ml-3 text-gray-600 text-sm">{p.quantidade} marmita(s)</span>
                {!clienteId && <span className="ml-3 text-xs text-gray-400">{c?.nome}</span>}
                {p.observacoes && <span className="ml-3 text-xs text-gray-400 italic">{p.observacoes}</span>}
              </div>
              <div className="flex items-center gap-3">
                {c && <span className="text-sm font-medium text-gray-700">{brl(total)}</span>}
                <button onClick={() => remover(p.id)} className="text-xs text-red-500 border border-red-200 px-3 py-1 rounded-lg hover:bg-red-50">Remover</button>
              </div>
            </div>
          );
        })}
        {pedidosFiltrados.length === 0 && <p className="text-gray-400 text-sm text-center py-8">Nenhum pedido encontrado.</p>}
      </div>
    </div>
  );
}
