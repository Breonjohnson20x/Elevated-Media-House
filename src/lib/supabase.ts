import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          avatar_url: string | null;
          role: string;
          created_at: string;
          last_signed_in: string;
        };
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['users']['Insert']>;
      };
      releases: {
        Row: {
          id: string;
          user_id: string;
          track_title: string;
          artist_name: string;
          cover_art_url: string | null;
          release_date: string;
          streams: number;
          revenue: number;
          platforms: Record<string, string>;
          status: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['releases']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['releases']['Insert']>;
      };
      artist_submissions: {
        Row: {
          id: string;
          user_id: string;
          artist_name: string;
          track_title: string;
          genre: string | null;
          release_date: string | null;
          package_type: string | null;
          status: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['artist_submissions']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['artist_submissions']['Insert']>;
      };
      service_packages: {
        Row: {
          id: string;
          name: string;
          price_min: number;
          price_max: number;
          features: string[];
          popular: boolean;
        };
        Insert: Omit<Database['public']['Tables']['service_packages']['Row'], 'id'>;
        Update: Partial<Database['public']['Tables']['service_packages']['Insert']>;
      };
    };
  };
};
