import fs from "fs";
import path from "path";
import pg from "pg";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const migrationsDir = path.join(__dirname, "..", "supabase", "migrations");

const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error("DATABASE_URL is required");
  process.exit(1);
}

const files = fs
  .readdirSync(migrationsDir)
  .filter((f) => f.endsWith(".sql"))
  .sort();

const client = new pg.Client({
  connectionString,
  ssl: { rejectUnauthorized: false },
});

async function ensureMigrationsTable() {
  await client.query(`
    CREATE TABLE IF NOT EXISTS _lingwu_schema_migrations (
      name text PRIMARY KEY,
      applied_at timestamptz NOT NULL DEFAULT now()
    );
  `);
}

async function isApplied(name) {
  const { rows } = await client.query(
    `SELECT 1 FROM _lingwu_schema_migrations WHERE name = $1`,
    [name],
  );
  return rows.length > 0;
}

async function markApplied(name) {
  await client.query(
    `INSERT INTO _lingwu_schema_migrations (name) VALUES ($1) ON CONFLICT DO NOTHING`,
    [name],
  );
}

async function main() {
  await client.connect();
  console.log("Connected to database");
  await ensureMigrationsTable();

  for (const file of files) {
    if (await isApplied(file)) {
      console.log(`Skip (already applied): ${file}`);
      continue;
    }
    const sql = fs.readFileSync(path.join(migrationsDir, file), "utf8");
    console.log(`Applying: ${file}`);
    await client.query("BEGIN");
    try {
      await client.query(sql);
      await markApplied(file);
      await client.query("COMMIT");
      console.log(`OK: ${file}`);
    } catch (err) {
      await client.query("ROLLBACK");
      console.error(`Failed: ${file}`, err.message);
      throw err;
    }
  }

  await client.end();
  console.log("All migrations applied.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
