import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://pbpbxsbapkwhbqmbmire.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBicGJ4c2JhcGt3aGJxbWJtaXJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEzNzE0ODMsImV4cCI6MjA1Njk0NzQ4M30.TFPn2_UHi1qnJQMEZmp90J1vgaUT7XkZncdzHXuOvzE"
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

supabase.from("clientes").select("*").then(({ data, error }) => {
    if (error) console.error("Erro na conexão com Supabase:", error.message);
    else console.log("Conexão bem-sucedida! Clientes encontrados:", data);
  });
  