'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV = [
  { href: '/caseirinhas',              label: '🏠 Dashboard'    },
  { href: '/caseirinhas/clientes',     label: '👥 Clientes'     },
  { href: '/caseirinhas/pedidos',      label: '🍱 Pedidos'      },
  { href: '/caseirinhas/faturamentos', label: '📄 Faturamentos' },
  { href: '/caseirinhas/historico',    label: '📊 Histórico'    },
];

export default function CaseirinhasLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div>
            <p className="font-bold text-sm text-gray-800">🍱 Caseirinhas da Tatá</p>
            <p className="text-xs text-gray-400">Sistema de Gestão</p>
          </div>
          <nav className="flex gap-1 flex-wrap">
            {NAV.map(n => (
              <Link key={n.href} href={n.href}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  path === n.href ? 'bg-violet-600 text-white' : 'text-gray-600 hover:bg-gray-100'
                }`}>
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="text-center py-3 text-xs text-gray-300 border-t border-gray-100">
        Caseirinhas da Tatá · CNPJ 37.527.003/0001-98 · Londrina/PR
      </footer>
    </div>
  );
}
