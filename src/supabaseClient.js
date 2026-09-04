import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://ghrcjetkgiaqkfbwrnzc.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_uLX7BDyzxHZl5VONdF0OyA_aSwtnsA1';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);