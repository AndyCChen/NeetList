drop table shows;

create table shows (
  instance id serial primary key,
  id uuid references auth.users on delete cascade not null,
  anime_id text not null,
  category text not null,
  score smallint not null default 0,
  start_date date default null,
  finish_date date default null,
  episode_progress integer not null default 0,
  imageURL text,
  title text,
  unique(id, anime_id)
);

alter table shows
  enable row level security;

create policy "Shows are public for reading" on shows
  for select using (true);

create policy "Users can insert their own shows" on shows
  for insert with check(auth.uid() = id);

create policy  "Users can update their own shows" on shows
  for update using(auth.uid() = id);

create policy "Users can only delete their own shows" on shows
  for delete using(auth.uid() = id);