import fs from "fs";
import path from "path";
import pg from "pg";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const migrationsDir = path.join(__dirname, "..", "supabase", "migrations");
const files = fs
  .readdirSync(migrationsDir)
  .filter((f) => f.endsWith(".sql"))
  .sort();

const client = new pg.Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});
await client.connect();
await client.query(`
  CREATE TABLE IF NOT EXISTS _lingwu_schema_migrations (
    name text PRIMARY KEY,
    applied_at timestamptz NOT NULL DEFAULT now()
  );
`);
for (const file of files) {
  await client.query(
    `INSERT INTO _lingwu_schema_migrations (name) VALUES ($1) ON CONFLICT DO NOTHING`,
    [file],
  );
  console.log(`Marked: ${file}`);
}
await client.end();
console.log("Done.");
