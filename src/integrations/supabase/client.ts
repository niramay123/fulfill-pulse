// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://mhscjwhqyeddslahtuji.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1oc2Nqd2hxeWVkZHNsYWh0dWppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExNTA1NjksImV4cCI6MjA1NjcyNjU2OX0.ykkFV4C8q1WC3Hn7BgYom65PYxBn-ZxgQKhNVg8fSVQ";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);