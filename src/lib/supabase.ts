import { createClient } from '@supabase/supabase-js';
import type { Database } from '../types/supabase';

const supabaseUrl = 'https://gthmyaaznoggluosgtah.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd0aG15YWF6bm9nZ2x1b3NndGFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQzMzgxOTQsImV4cCI6MjA0OTkxNDE5NH0.tycUIGJrqOTN4jO4vlyB3Gu0YgodhmeybedDrqGIAmc';

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);