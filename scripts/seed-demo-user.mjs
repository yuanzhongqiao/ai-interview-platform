/**
 * 创建演示账号 demo@lingwu.local / Demo123456 并写入示例业务数据
 * 需要 .env.local 中的 SUPABASE_URL 与 SUPABASE_SERVICE_ROLE_KEY
 */
import { readFileSync } from "fs";
import { resolve } from "path";
import pg from "pg";

const DEMO_EMAIL = "demo@lingwu.local";
const DEMO_PASSWORD = "Demo123456";

function loadEnvLocal() {
  try {
    const raw = readFileSync(resolve(process.cwd(), ".env.local"), "utf8");
    for (const line of raw.split("\n")) {
      const t = line.trim();
      if (!t || t.startsWith("#")) continue;
      const i = t.indexOf("=");
      if (i === -1) continue;
      const key = t.slice(0, i).trim();
      const val = t.slice(i + 1).trim();
      if (!process.env[key]) process.env[key] = val;
    }
  } catch {
    /* use existing env */
  }
}

loadEnvLocal();

const supabaseUrl = process.env.SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const databaseUrl = process.env.DATABASE_URL;

if (!supabaseUrl || !serviceKey) {
  console.error("缺少 SUPABASE_URL 或 SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

async function findExistingUser() {
  const res = await fetch(
    `${supabaseUrl}/auth/v1/admin/users?email=${encodeURIComponent(DEMO_EMAIL)}`,
    {
      headers: {
        Authorization: `Bearer ${serviceKey}`,
        apikey: serviceKey,
      },
    },
  );
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`查询用户失败 ${res.status}: ${text}`);
  }
  const data = await res.json();
  const users = data.users ?? data;
  if (Array.isArray(users) && users.length > 0) return users[0];
  return null;
}

async function createAuthUser() {
  const existing = await findExistingUser();
  if (existing) {
    console.log(`用户已存在: ${existing.id}`);
    return existing;
  }

  const res = await fetch(`${supabaseUrl}/auth/v1/admin/users`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${serviceKey}`,
      apikey: serviceKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: DEMO_EMAIL,
      password: DEMO_PASSWORD,
      email_confirm: true,
      user_metadata: { full_name: "演示用户", name: "演示用户" },
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`创建用户失败 ${res.status}: ${text}`);
  }

  const user = await res.json();
  console.log(`已创建用户: ${user.id}`);
  return user;
}

async function updatePassword(userId) {
  const res = await fetch(`${supabaseUrl}/auth/v1/admin/users/${userId}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${serviceKey}`,
      apikey: serviceKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      password: DEMO_PASSWORD,
      email_confirm: true,
    }),
  });
  if (!res.ok) {
    const text = await res.text();
    console.warn(`更新密码跳过: ${res.status} ${text}`);
  } else {
    console.log("已同步密码为 Demo123456");
  }
}

async function seedBusinessData(userId) {
  if (!databaseUrl) {
    console.warn("无 DATABASE_URL，跳过示例业务数据");
    return;
  }

  const client = new pg.Client({
    connectionString: databaseUrl,
    ssl: { rejectUnauthorized: false },
  });
  await client.connect();

  const orgId = "a1000000-0000-4000-8000-000000000001";
  const projId = "b1000000-0000-4000-8000-000000000001";

  await client.query("BEGIN");
  try {
    await client.query(
      `INSERT INTO profiles (id, email, name, role)
       VALUES ($1, $2, '演示用户', 'USER')
       ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email, name = EXCLUDED.name`,
      [userId, DEMO_EMAIL],
    );

    await client.query(
      `INSERT INTO organizations (id, name, slug, "ownerId")
       VALUES ($1, '聆悟演示', 'lingwu-demo', $2)
       ON CONFLICT (slug) DO UPDATE SET name = EXCLUDED.name`,
      [orgId, userId],
    );

    await client.query(
      `INSERT INTO organization_members ("workspaceId", "userId", role)
       VALUES ($1, $2, 'OWNER')
       ON CONFLICT ("workspaceId", "userId") DO NOTHING`,
      [orgId, userId],
    );

    await client.query(
      `INSERT INTO projects (id, "organizationId", name, description, "createdBy")
       VALUES ($1, $2, '默认项目', '工作流示例数据', $3)
       ON CONFLICT (id) DO NOTHING`,
      [projId, orgId, userId],
    );

    await client.query(
      `INSERT INTO project_members ("projectId", "userId", role)
       VALUES ($1, $2, 'OWNER')
       ON CONFLICT ("projectId", "userId") DO NOTHING`,
      [projId, userId],
    );

    await client.query(
      `INSERT INTO interviews (id, title, description, mode, "userId", "projectId", "aiName", language, "publicSlug")
       VALUES
         ('c1000000-0000-4000-8000-000000000001', '前端工程师模拟面试', 'React 与 TypeScript 基础能力评估', 'CHAT', $1, $2, '聆悟', 'zh', 'demo-fe-interview'),
         ('c1000000-0000-4000-8000-000000000002', '产品经理行为面试', '沟通与项目推动力', 'VOICE', $1, $2, '聆悟', 'zh', 'demo-pm-interview')
       ON CONFLICT (id) DO NOTHING`,
      [userId, projId],
    );

    await client.query("COMMIT");
    console.log("已写入演示组织 / 项目 / 面试数据");
  } catch (err) {
    await client.query("ROLLBACK");
    throw err;
  } finally {
    await client.end();
  }
}

async function verifyLogin() {
  const res = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
    method: "POST",
    headers: {
      apikey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? serviceKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email: DEMO_EMAIL, password: DEMO_PASSWORD }),
  });
  if (res.ok) {
    console.log("登录验证: 成功");
  } else {
    const text = await res.text();
    console.error(`登录验证失败 ${res.status}: ${text}`);
  }
}

const user = await createAuthUser();
await updatePassword(user.id);
await seedBusinessData(user.id);
await verifyLogin();

console.log("\n演示账号已就绪:");
console.log(`  邮箱: ${DEMO_EMAIL}`);
console.log(`  密码: ${DEMO_PASSWORD}`);
console.log(`  用户 ID: ${user.id}`);
