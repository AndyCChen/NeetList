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
      shows: {
        Row: {
          anime_id: string
          category: string
          episode_progress: number
          finish_date: string | null
          id: number
          score: number
          start_date: string | null
          user_id: string | null
        }
        Insert: {
          anime_id: string
          category: string
          episode_progress?: number
          finish_date?: string | null
          id?: number
          score?: number
          start_date?: string | null
          user_id?: string | null
        }
        Update: {
          anime_id?: string
          category?: string
          episode_progress?: number
          finish_date?: string | null
          id?: number
          score?: number
          start_date?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "shows_user_id_fkey"
            columns: ["user_id"]
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
