'use client';
import { useEffect, useState } from 'react';
import { Cliente, TamanhoMarmita, TipoPessoa, PlanoTipo, PRECOS_PADRAO } from '@/lib/types';
import { loadClientes, saveClientes, generateId } from '@/lib/storage';
import { brl } from '@/lib/utils';

const VAZIO: Omit<Cliente, 'id' | 'criadoEm'> = {
  nome: '', contato: '', cidade: '', cnpjCpf: '', tipo: 'PJ',
  telefone: '', email: '', tamanhoMarmita: 'Mini',
  valorUnitario: 22, taxaEntregaDiaria: 10, diaFechamento: 1,
  plano: 'Mensal', ativo: true,
};

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [form, setForm] = useState<Omit<Cliente, 'id' | 'criadoEm'>>(VAZIO);
  const [editId, setEditId] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [busca, setBusca] = useState('');

  useEffect(() => { setClientes(loadClientes()); }, []);

  function salvar() {
    const lista = editId
      ? clientes.map(c => c.id === editId ? { ...c, ...form } : c)
      : [...clientes, { ...form, id: generateId(), criadoEm: new Date().toISOString() }];
    saveClientes(lista); setClientes(lista); setShowForm(false); setEditId(null); setForm(VAZIO);
  }

  function editar(c: Cliente) { setForm({ nome: c.nome, contato: c.contato, cidade: c.cidade, cnpjCpf: c.cnpjCpf, tipo: c.tipo, telefone: c.telefone, email: c.email, tamanhoMarmita: c.tamanhoMarmita, valorUnitario: c.valorUnitario, taxaEntregaDiaria: c.taxaEntregaDiaria, diaFechamento: c.diaFechamento, plano: c.plano, ativo: c.ativo }); setEditId(c.id); setShowForm(true); }

  function toggleAtivo(id: string) {
    const lista = clientes.map(c => c.id === id ? { ...c, ativo: !c.ativo } : c);
    saveClientes(lista); setClientes(lista);
  }

  const filtrados = clientes.filter(c => c.nome.toLowerCase().includes(busca.toLowerCase()) || c.contato.toLowerCase().includes(busca.toLowerCase()));

  const inp = 'border border-gray-300 rounded-lg px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-emerald-400';
  const lbl = 'text-xs font-medium text-gray-600 mb-1 block';

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-bold">👥 Clientes</h1>
        <button onClick={() => { setShowForm(true); setEditId(null); setForm(VAZIO); }}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700">
          + Novo Cliente
        </button>
      </div>

      <input className={`${inp} mb-4`} placeholder="Buscar por nome ou contato..." value={busca} onChange={e => setBusca(e.target.value)} />

      {showForm && (
        <div className="bg-white border border-gray-200 rounded-xl p-6 mb-6 shadow-sm">
          <h2 className="font-semibold mb-4">{editId ? 'Editar Cliente' : 'Novo Cliente'}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {([['nome','Nome / Razão Social','text'],['contato','A/C Responsável','text'],['cidade','Cidade - UF','text'],['cnpjCpf','CNPJ / CPF','text'],['telefone','Telefone WhatsApp','text'],['email','E-mail','email']] as const).map(([k,l,t]) => (
              <div key={k}>
                <label className={lbl}>{l}</label>
                <input type={t} className={inp} value={String(form[k as keyof typeof form])} onChange={e => setForm(f => ({ ...f, [k]: e.target.value }))} />
              </div>
            ))}
            <div><label className={lbl}>Tipo</label>
              <select className={inp} value={form.tipo} onChange={e => setForm(f => ({ ...f, tipo: e.target.value as TipoPessoa }))}>
                <option value="PJ">Pessoa Jurídica</option><option value="PF">Pessoa Física</option>
              </select>
            </div>
            <div><label className={lbl}>Tamanho Marmita</label>
              <select className={inp} value={form.tamanhoMarmita} onChange={e => { const t = e.target.value as TamanhoMarmita; setForm(f => ({ ...f, tamanhoMarmita: t, valorUnitario: PRECOS_PADRAO[t] })); }}>
                <option value="Mini">Mini — {brl(PRECOS_PADRAO.Mini)}</option>
                <option value="Media">Média — {brl(PRECOS_PADRAO.Media)}</option>
                <option value="Grande">Grande — {brl(PRECOS_PADRAO.Grande)}</option>
              </select>
            </div>
            <div><label className={lbl}>Plano</label>
              <select className={inp} value={form.plano} onChange={e => setForm(f => ({ ...f, plano: e.target.value as PlanoTipo }))}>
                <option value="Mensal">Mensal</option><option value="Quinzenal">Quinzenal</option><option value="Semanal">Semanal</option>
              </select>
            </div>
            <div><label className={lbl}>Valor Unitário (R$)</label>
              <input type="number" className={inp} value={form.valorUnitario} onChange={e => setForm(f => ({ ...f, valorUnitario: +e.target.value }))} />
            </div>
            <div><label className={lbl}>Taxa Entrega Diária (R$)</label>
              <input type="number" className={inp} value={form.taxaEntregaDiaria} onChange={e => setForm(f => ({ ...f, taxaEntregaDiaria: +e.target.value }))} />
            </div>
            <div><label className={lbl}>Dia de Fechamento</label>
              <input type="number" min={1} max={31} className={inp} value={form.diaFechamento} onChange={e => setForm(f => ({ ...f, diaFechamento: +e.target.value }))} />
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button onClick={salvar} className="bg-emerald-600 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-emerald-700">Salvar</button>
            <button onClick={() => setShowForm(false)} className="border border-gray-300 px-5 py-2 rounded-lg text-sm hover:bg-gray-50">Cancelar</button>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {filtrados.map(c => (
          <div key={c.id} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center justify-between">
            <div>
              <p className="font-semibold">{c.nome} <span className="text-xs bg-gray-100 px-2 py-0.5 rounded-full ml-1">{c.tipo}</span></p>
              <p className="text-sm text-gray-500">A/C {c.contato} · {c.cidade} · {c.plano} · Marmita {c.tamanhoMarmita} · {brl(c.valorUnitario)} + {brl(c.taxaEntregaDiaria)} entrega</p>
              {c.telefone && <p className="text-xs text-gray-400">📲 {c.telefone}</p>}
            </div>
            <div className="flex gap-2 items-center">
              <span className={`text-xs px-2 py-1 rounded-full ${c.ativo ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>{c.ativo ? 'Ativo' : 'Inativo'}</span>
              <button onClick={() => editar(c)} className="text-xs border px-3 py-1 rounded-lg hover:bg-gray-50">Editar</button>
              <button onClick={() => toggleAtivo(c.id)} className="text-xs border px-3 py-1 rounded-lg hover:bg-gray-50">{c.ativo ? 'Desativar' : 'Ativar'}</button>
            </div>
          </div>
        ))}
        {filtrados.length === 0 && <p className="text-gray-400 text-sm text-center py-8">Nenhum cliente encontrado.</p>}
      </div>
    </div>
  );
}
