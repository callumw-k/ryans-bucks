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
      Persons: {
        Row: {
          id: number
          name: string
          team_id: number
        }
        Insert: {
          id?: number
          name: string
          team_id: number
        }
        Update: {
          id?: number
          name?: string
          team_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "Persons_team_id_fkey"
            columns: ["team_id"]
            referencedRelation: "Teams"
            referencedColumns: ["id"]
          }
        ]
      }
      Pubs: {
        Row: {
          drink: string | null
          hidden: boolean
          id: number
          name: string
        }
        Insert: {
          drink?: string | null
          hidden?: boolean
          id?: number
          name: string
        }
        Update: {
          drink?: string | null
          hidden?: boolean
          id?: number
          name?: string
        }
        Relationships: []
      }
      Scores: {
        Row: {
          id: number
          person_id: number
          pub_id: number
          score: number
          team_id: number
        }
        Insert: {
          id?: number
          person_id: number
          pub_id: number
          score: number
          team_id: number
        }
        Update: {
          id?: number
          person_id?: number
          pub_id?: number
          score?: number
          team_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "Scores_person_id_fkey"
            columns: ["person_id"]
            referencedRelation: "Persons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Scores_pub_id_fkey"
            columns: ["pub_id"]
            referencedRelation: "Pubs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "Scores_team_id_fkey"
            columns: ["team_id"]
            referencedRelation: "Teams"
            referencedColumns: ["id"]
          }
        ]
      }
      Teams: {
        Row: {
          id: number
        }
        Insert: {
          id?: number
        }
        Update: {
          id?: number
        }
        Relationships: []
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
