import { createClient } from '@supabase/supabase-js';

const DEFAULT_SUPABASE_URL = 'https://auyjzzanjxpgsdhdrunb.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF1eWp6emFuanhwZ3NkaGRydW5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ5NTMwMTIsImV4cCI6MjEwMDUyOTAxMn0.CHqLVA3fnDoIkk9FJm4oWJz7jaDLvUeEtjMoZmQ2oOU';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://your-project.supabase.co' 
  ? process.env.NEXT_PUBLIC_SUPABASE_URL 
  : DEFAULT_SUPABASE_URL;

const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY !== 'your-anon-key-here' 
  ? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY 
  : DEFAULT_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const isSupabaseConfigured = () => {
  return true;
};
