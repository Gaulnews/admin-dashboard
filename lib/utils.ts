import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function brl(valor: number): string {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(valor);
}

export function fmtData(iso: string): string {
  if (!iso) return '—';
  const [y, m, d] = iso.split('T')[0].split('-');
  return `${d}/${m}/${y}`;
}

export function fmtPeriodo(inicio: string, fim: string): string {
  return `${fmtData(inicio)} a ${fmtData(fim)}`;
}

const UNIDADES = ['','um','dois','três','quatro','cinco','seis','sete','oito','nove',
  'dez','onze','doze','treze','quatorze','quinze','dezesseis','dezessete','dezoito','dezenove'];
const DEZENAS  = ['','','vinte','trinta','quarenta','cinquenta','sessenta','setenta','oitenta','noventa'];
const CENTENAS = ['','cento','duzentos','trezentos','quatrocentos','quinhentos','seiscentos','setecentos','oitocentos','novecentos'];

function centenas(n: number): string {
  if (n === 100) return 'cem';
  const c = Math.floor(n / 100);
  const resto = n % 100;
  const p: string[] = [];
  if (c > 0) p.push(CENTENAS[c]);
  if (resto >= 20) { p.push(DEZENAS[Math.floor(resto / 10)]); if (resto % 10 > 0) p.push(UNIDADES[resto % 10]); }
  else if (resto > 0) p.push(UNIDADES[resto]);
  return p.join(' e ');
}

export function brlExtenso(valor: number): string {
  const cts = Math.round(valor * 100);
  const reais = Math.floor(cts / 100);
  const centavos = cts % 100;
  const p: string[] = [];
  if (reais === 0 && centavos === 0) return 'zero reais';
  if (reais > 0) {
    if (reais >= 1000) {
      const mil = Math.floor(reais / 1000);
      const resto = reais % 1000;
      p.push(mil === 1 ? 'um mil' : `${centenas(mil)} mil`);
      if (resto > 0) p.push(centenas(resto));
    } else {
      p.push(centenas(reais));
    }
    p[p.length - 1] += reais === 1 ? ' real' : ' reais';
  }
  if (centavos > 0) p.push(`${centenas(centavos)} centavo${centavos > 1 ? 's' : ''}`);
  return p.join(' e ');
}
