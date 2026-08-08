import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.POSTGRES_URL!);

async function migrate() {
  await sql`DO $$ BEGIN CREATE TYPE status AS ENUM ('active','inactive','archived'); EXCEPTION WHEN duplicate_object THEN null; END $$`;
  await sql`CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    image_url TEXT NOT NULL,
    name TEXT NOT NULL,
    status status NOT NULL DEFAULT 'active',
    price NUMERIC(10,2) NOT NULL,
    stock INTEGER NOT NULL DEFAULT 0,
    available_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
  )`;
  console.log('Tabela products criada com sucesso!');
  process.exit(0);
}

migrate().catch(e => {
  console.error('Falhou:', e);
  process.exit(1);
});
