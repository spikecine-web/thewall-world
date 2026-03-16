import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(
  'https://iiccldgmzgynyufjlhhw.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpY2NsZGdtemd5bnl1ZmpsaGh3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMyNjM3NzcsImV4cCI6MjA4ODgzOTc3N30.YtRXQ9MBoqCjmyUl412C5mfeqhFByNmWOKHpr_2GIkQ'
);
