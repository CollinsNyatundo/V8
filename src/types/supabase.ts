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
      projects: {
        Row: {
          id: string
          title: string
          description: string
          image: string | null
          tags: string[]
          github: string | null
          category: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          image?: string | null
          tags?: string[]
          github?: string | null
          category: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          image?: string | null
          tags?: string[]
          github?: string | null
          category?: string
          created_at?: string
          updated_at?: string
        }
      }
      blog_posts: {
        Row: {
          id: string
          title: string
          content: string
          excerpt: string
          image: string | null
          slug: string
          category: string
          read_time: number
          published: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          excerpt: string
          image?: string | null
          slug: string
          category: string
          read_time: number
          published?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          excerpt?: string
          image?: string | null
          slug?: string
          category?: string
          read_time?: number
          published?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}