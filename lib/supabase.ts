import { createClient } from "@supabase/supabase-js";
import { Database } from "@/database.types";
import { env } from "./env/client.mjs";

export const supabase = createClient<Database>(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_KEY,
);
