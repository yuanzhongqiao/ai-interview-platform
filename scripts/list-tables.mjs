import pg from "pg";

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});
await client.connect();
const { rows } = await client.query(
  `SELECT tablename FROM pg_tables WHERE schemaname = 'public' ORDER BY 1`,
);
console.log(rows.map((r) => r.tablename).join("\n"));
await client.end();
