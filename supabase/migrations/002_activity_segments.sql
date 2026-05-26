-- Track user enter/leave segments for accurate active-time calculation
alter table "sessions"
  add column if not exists "activitySegments" jsonb not null default '[]'::jsonb;
