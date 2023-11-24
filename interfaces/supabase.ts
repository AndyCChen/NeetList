export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          avatar_url: string | null
          id: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          id?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          id?: string
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
      shows: {
        Row: {
          anime_id: string
          category: string
          episode_progress: number
          finish_date: string | null
          id: number
          imageurl: string | null
          score: number
          start_date: string | null
          title: string | null
          user_id: string
        }
        Insert: {
          anime_id: string
          category: string
          episode_progress?: number
          finish_date?: string | null
          id?: number
          imageurl?: string | null
          score?: number
          start_date?: string | null
          title?: string | null
          user_id: string
        }
        Update: {
          anime_id?: string
          category?: string
          episode_progress?: number
          finish_date?: string | null
          id?: number
          imageurl?: string | null
          score?: number
          start_date?: string | null
          title?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "shows_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
