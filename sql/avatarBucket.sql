create policy "Only authenticated users can insert"
on storage.objects for insert to authenticated with check(
  bucket_id = 'avatar-images' and
  (storage.foldername(name))[1] = auth.uid()::text
);

create policy "Only authenticated users can delete"
on storage.objects for delete to authenticated using(
  bucket_id = 'avatar-images' and
  (storage.foldername(name))[1] = auth.uid()::text
);