import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://jawbnfxsikmfjgswcqjc.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imphd2JuZnhzaWttZmpnc3djcWpjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM0NDMyNTAsImV4cCI6MjA5OTAxOTI1MH0.RC8CcLHEUANuzwlBMxv74el8r51qe53j0SIZVFKSCdw';

export const supabase = createClient(supabaseUrl, supabaseKey);
