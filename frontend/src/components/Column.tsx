import type { Tache } from '../types'
import TaskCard from './TaskCard'

interface Props {
  titre: string
  statut: Tache['statut']
  taches: Tache[]
  onDelete: (id: number) => void
  onMove: (id: number, statut: Tache['statut']) => void
}

const COLUMN_COLORS = {
  todo: '#6b7280',
  in_progress: '#3b82f6',
  done: '#22c55e',
}

export default function Column({ titre, statut, taches, onDelete, onMove }: Props) {
  return (
    <div className="column">
      <div className="column-header" style={{ borderColor: COLUMN_COLORS[statut] }}>
        <h3>{titre}</h3>
        <span className="task-count">{taches.length}</span>
      </div>
      <div className="column-body">
        {taches.length === 0
          ? <p className="empty-col">Aucune tâche</p>
          : taches.map(t => (
              <TaskCard key={t.id} tache={t} onDelete={onDelete} onMove={onMove} />
            ))
        }
      </div>
    </div>
  )
}