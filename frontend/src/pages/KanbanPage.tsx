import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Tache } from '../types'
import { getTaches, createTache, updateStatut } from '../services/tacheService'
import { logout } from '../services/authService'
import Column from '../components/Column'

const COLUMNS: { titre: string; statut: Tache['statut'] }[] = [
  { titre: '📋 À faire', statut: 'todo' },
  { titre: '🔄 En cours', statut: 'in_progress' },
  { titre: '✅ Terminé', statut: 'done' },
]

export default function KanbanPage() {
  const [taches, setTaches] = useState<Tache[]>([])
  const [titre, setTitre] = useState('')
  const [description, setDescription] = useState('')
  const [priorite, setPriorite] = useState<Tache['priorite']>('medium')
  const [showForm, setShowForm] = useState(false)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const user = JSON.parse(localStorage.getItem('user') || '{}')

  useEffect(() => {
    getTaches().then(data => {
      setTaches(data)
      setLoading(false)
    })
  }, [])

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    const tache = await createTache({ titre, description, priorite, statut: 'todo' })
    setTaches(prev => [tache, ...prev])
    setTitre(''); setDescription(''); setPriorite('medium')
    setShowForm(false)
  }

  const handleDelete = (id: number) => {
    setTaches(prev => prev.filter(t => t.id !== id))
  }

  const handleMove = async (id: number, statut: Tache['statut']) => {
    const updated = await updateStatut(id, statut)
    setTaches(prev => prev.map(t => t.id === id ? updated : t))
  }

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <div className="kanban-page">
      <header className="kanban-header">
        <div className="header-left">
          <h1>✅ TaskFlow</h1>
          <span className="user-email">{user.email}</span>
        </div>
        <div className="header-right">
          <button className="btn-primary" onClick={() => setShowForm(v => !v)}>
            {showForm ? '✕ Annuler' : '+ Nouvelle tâche'}
          </button>
          <button className="btn-logout" onClick={handleLogout}>Déconnexion</button>
        </div>
      </header>

      {showForm && (
        <div className="task-form-wrapper">
          <form className="task-form" onSubmit={handleCreate}>
            <input
              placeholder="Titre de la tâche *"
              value={titre}
              onChange={e => setTitre(e.target.value)}
              required
            />
            <textarea
              placeholder="Description (optionnelle)"
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={2}
            />
            <select value={priorite} onChange={e => setPriorite(e.target.value as Tache['priorite'])}>
              <option value="low">🟢 Priorité basse</option>
              <option value="medium">🟡 Priorité moyenne</option>
              <option value="high">🔴 Priorité haute</option>
            </select>
            <button type="submit" className="btn-primary">Créer la tâche</button>
          </form>
        </div>
      )}

      {loading ? (
        <p className="loading">Chargement des tâches...</p>
      ) : (
        <div className="kanban-board">
          {COLUMNS.map(col => (
            <Column
              key={col.statut}
              titre={col.titre}
              statut={col.statut}
              taches={taches.filter(t => t.statut === col.statut)}
              onDelete={handleDelete}
              onMove={handleMove}
            />
          ))}
        </div>
      )}
    </div>
  )
}