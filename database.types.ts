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
      Drinks: {
        Row: {
          id: number
          name: string
          par: number
          pub_id: number
        }
        Insert: {
          id?: number
          name: string
          par: number
          pub_id: number
        }
        Update: {
          id?: number
          name?: string
          par?: number
          pub_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "Drinks_pub_id_fkey"
            columns: ["pub_id"]
            referencedRelation: "Pubs"
            referencedColumns: ["id"]
          }
        ]
      }
      Persons: {
        Row: {
          id: number
          name: string
          team_id: number
          username: string | null
        }
        Insert: {
          id?: number
          name: string
          team_id: number
          username?: string | null
        }
        Update: {
          id?: number
          name?: string
          team_id?: number
          username?: string | null
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
          hidden: boolean
          id: number
          name: string
        }
        Insert: {
          hidden?: boolean
          id?: number
          name: string
        }
        Update: {
          hidden?: boolean
          id?: number
          name?: string
        }
        Relationships: []
      }
      Scores: {
        Row: {
          drink_id: number | null
          id: number
          person_id: number
          pub_id: number
          score: number
          team_id: number
        }
        Insert: {
          drink_id?: number | null
          id?: number
          person_id: number
          pub_id: number
          score: number
          team_id: number
        }
        Update: {
          drink_id?: number | null
          id?: number
          person_id?: number
          pub_id?: number
          score?: number
          team_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "Scores_drink_id_fkey"
            columns: ["drink_id"]
            referencedRelation: "Drinks"
            referencedColumns: ["id"]
          },
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
          team_name: string
        }
        Insert: {
          id?: number
          team_name: string
        }
        Update: {
          id?: number
          team_name?: string
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
