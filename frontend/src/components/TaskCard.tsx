import type { Tache } from '../types'
import { deleteTache } from '../services/tacheService'

interface Props {
  tache: Tache
  onDelete: (id: number) => void
  onMove: (id: number, statut: Tache['statut']) => void
}

const PRIORITE_COLORS = {
  high: '#ef4444',
  medium: '#f59e0b',
  low: '#22c55e',
}

const STATUTS: Tache['statut'][] = ['todo', 'in_progress', 'done']

export default function TaskCard({ tache, onDelete, onMove }: Props) {
  const handleDelete = async () => {
    if (!confirm('Supprimer cette tâche ?')) return
    await deleteTache(tache.id)
    onDelete(tache.id)
  }

  const currentIndex = STATUTS.indexOf(tache.statut)

  return (
    <div className="task-card">
      <div className="task-header">
        <span
          className="priorite-badge"
          style={{ background: PRIORITE_COLORS[tache.priorite] }}
        >
          {tache.priorite}
        </span>
        <button className="delete-btn" onClick={handleDelete}>✕</button>
      </div>
      <h4 className="task-title">{tache.titre}</h4>
      {tache.description && <p className="task-desc">{tache.description}</p>}
      <div className="task-actions">
        {currentIndex > 0 && (
          <button className="move-btn" onClick={() => onMove(tache.id, STATUTS[currentIndex - 1])}>
            ← Reculer
          </button>
        )}
        {currentIndex < 2 && (
          <button className="move-btn primary" onClick={() => onMove(tache.id, STATUTS[currentIndex + 1])}>
            Avancer →
          </button>
        )}
      </div>
    </div>
  )
}