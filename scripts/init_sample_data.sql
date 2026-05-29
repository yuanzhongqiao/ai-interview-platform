-- 聆悟·AI面试平台 — 示例数据
-- 推荐通过脚本创建（含 Auth 用户）:
--   node scripts/seed-demo-user.mjs
--
-- 演示账号: demo@lingwu.local / Demo123456
-- 演示用户 ID（线上已创建）: 7f4214f8-3a37-4936-bd8f-697f16724134

-- 若需纯 SQL 补数据，将下方 demo_user_id 替换为 auth.users 中的 id 后执行:

/*
INSERT INTO organizations (id, name, slug, "ownerId")
VALUES
  ('a1000000-0000-4000-8000-000000000001', '聆悟演示组织', 'lingwu-demo', '7f4214f8-3a37-4936-bd8f-697f16724134')
ON CONFLICT (slug) DO NOTHING;
-- ... 其余见 seed-demo-user.mjs
*/
