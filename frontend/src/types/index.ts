export interface Tache {
  id: number
  titre: string
  description?: string
  statut: 'todo' | 'in_progress' | 'done'
  priorite: 'low' | 'medium' | 'high'
  user_id: number
  created_at: string
}

export interface User {
  id: number
  email: string
}

export interface AuthResponse {
  token: string
  user: User
}