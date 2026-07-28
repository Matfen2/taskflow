import api from '../api/axios'
import type { Tache } from '../types'

export const getTaches = async (): Promise<Tache[]> => {
  const res = await api.get('/taches')
  return res.data
}

export const createTache = async (data: Partial<Tache>): Promise<Tache> => {
  const res = await api.post('/taches', data)
  return res.data
}

export const updateStatut = async (id: number, statut: Tache['statut']): Promise<Tache> => {
  const res = await api.patch(`/taches/${id}/statut`, { statut })
  return res.data
}

export const deleteTache = async (id: number): Promise<void> => {
  await api.delete(`/taches/${id}`)
}