'use client';
import { useEffect, useState } from 'react';
import { loadClientes, loadPedidos, loadFaturamentos } from '@/lib/storage';
import { brl } from '@/lib/utils';
import Link from 'next/link';

export default function DashboardPage() {
  const [stats, setStats] = useState({ clientes: 0, pedidosHoje: 0, marmitasMes: 0, aberto: 0, pago: 0 });

  useEffect(() => {
    const hoje = new Date().toISOString().split('T')[0];
    const mes  = hoje.slice(0, 7);
    const clientes     = loadClientes().filter(c => c.ativo).length;
    const pedidos      = loadPedidos();
    const pedidosHoje  = pedidos.filter(p => p.data === hoje).reduce((s, p) => s + p.quantidade, 0);
    const marmitasMes  = pedidos.filter(p => p.data.startsWith(mes)).reduce((s, p) => s + p.quantidade, 0);
    const fats = loadFaturamentos();
    const aberto = fats.filter(f => f.status === 'Aberto').reduce((s, f) => s + f.totalGeral, 0);
    const pago   = fats.filter(f => f.status === 'Pago').reduce((s, f) => s + f.totalGeral, 0);
    setStats({ clientes, pedidosHoje, marmitasMes, aberto, pago });
  }, []);

  const cards = [
    { label: 'Clientes Ativos',     valor: String(stats.clientes),          cor: 'text-violet-600', link: '/caseirinhas/clientes'     },
    { label: 'Marmitas Hoje',       valor: String(stats.pedidosHoje),        cor: 'text-blue-600',   link: '/caseirinhas/pedidos'       },
    { label: 'Marmitas no Mês',     valor: String(stats.marmitasMes),        cor: 'text-indigo-600', link: '/caseirinhas/pedidos'       },
    { label: 'A Receber',           valor: brl(stats.aberto),                cor: 'text-amber-600',  link: '/caseirinhas/faturamentos'  },
    { label: 'Total Recebido',      valor: brl(stats.pago),                  cor: 'text-emerald-600',link: '/caseirinhas/historico'     },
  ];

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-xl font-bold mb-1">Dashboard</h1>
      <p className="text-sm text-gray-500 mb-6">Bem-vinda, Tatá! 👋</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
        {cards.map(c => (
          <Link key={c.label} href={c.link} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
            <p className="text-xs text-gray-500 mb-1">{c.label}</p>
            <p className={`text-xl font-bold ${c.cor}`}>{c.valor}</p>
          </Link>
        ))}
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { href: '/caseirinhas/pedidos',      emoji: '🍱', label: 'Registrar Entrega'  },
          { href: '/caseirinhas/faturamentos', emoji: '📄', label: 'Gerar Fechamento'   },
          { href: '/caseirinhas/clientes',     emoji: '👥', label: 'Gerenciar Clientes' },
          { href: '/caseirinhas/historico',    emoji: '📊', label: 'Ver Histórico'      },
        ].map(a => (
          <Link key={a.href} href={a.href} className="bg-violet-600 hover:bg-violet-700 text-white rounded-xl p-4 text-center transition-colors">
            <div className="text-2xl mb-1">{a.emoji}</div>
            <p className="text-xs font-medium">{a.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
