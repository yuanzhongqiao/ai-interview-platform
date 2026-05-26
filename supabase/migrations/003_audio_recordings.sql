-- Store multiple audio recording segments (one per enter/leave cycle)
alter table "sessions"
  add column if not exists "audioRecordings" jsonb not null default '[]'::jsonb;
