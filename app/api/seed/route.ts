import { db, products } from '@/lib/db';
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const database = db();
    await database.insert(products).values([
      { imageUrl: 'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/smartphone-gaPvyZW6aww0IhD3dOpaU6gBGILtcJ.webp', name: 'Smartphone X Pro', status: 'active', price: '999.00', stock: 150, availableAt: new Date() },
      { imageUrl: 'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/earbuds-3rew4JGdIK81KNlR8Edr8NBBhFTOtX.webp', name: 'Wireless Earbuds Ultra', status: 'active', price: '199.00', stock: 300, availableAt: new Date() },
      { imageUrl: 'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/tv-H4l26crxtm9EQHLWc0ddrsXZ0V0Ofw.webp', name: '4K Ultra HD Smart TV', status: 'active', price: '799.00', stock: 50, availableAt: new Date() },
      { imageUrl: 'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/laptop-9bgUhjY491hkxiMDeSgqb9R5I3lHNL.webp', name: 'Gaming Laptop Pro', status: 'active', price: '1299.00', stock: 75, availableAt: new Date() },
      { imageUrl: 'https://uwja77bygk2kgfqe.public.blob.vercel-storage.com/watch-S2VeARK6sEM9QFg4yNQNjHFaHc3sXv.webp', name: 'Smartwatch Elite', status: 'active', price: '249.00', stock: 250, availableAt: new Date() }
    ]);
    return Response.json({ message: 'Seed concluido - 5 produtos inseridos.' });
  } catch (error) {
    return Response.json({ error: 'Seed falhou.', detail: String(error) }, { status: 500 });
  }
}
