import { createClient } from "@supabase/supabase-js";
import { getEnv } from "../utils/env";

const { SUPABASE_API_KEY, SUPABASE_URL } = getEnv();

export default createClient(SUPABASE_URL, SUPABASE_API_KEY);
