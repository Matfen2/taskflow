import { z } from 'zod'

export const tacheSchema = z.object({
  titre: z.string().min(1, 'Le titre est obligatoire'),
  description: z.string().optional(),
  statut: z.enum(['todo', 'in_progress', 'done']).optional(),
  priorite: z.enum(['low', 'medium', 'high']).optional(),
})

export const statutSchema = z.object({
  statut: z.enum(['todo', 'in_progress', 'done']),
})