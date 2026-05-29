import pg from "pg";

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});
await client.connect();
const { rows } = await client.query(`
  SELECT column_name FROM information_schema.columns
  WHERE table_schema = 'public' AND table_name = 'sessions'
  ORDER BY 1
`);
console.log("sessions columns:", rows.map((r) => r.column_name).join(", "));
const mig = await client.query(`SELECT name FROM _lingwu_schema_migrations ORDER BY 1`);
console.log("applied migrations:", mig.rows.map((r) => r.name).join(", ") || "(none)");
await client.end();
