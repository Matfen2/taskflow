import pool from '../config/db.js'

export const findAll = async (userId) => {
  const result = await pool.query(
    'SELECT * FROM taches WHERE user_id = $1 ORDER BY created_at DESC',
    [userId]
  )
  return result.rows
}

export const findById = async (id, userId) => {
  const result = await pool.query(
    'SELECT * FROM taches WHERE id = $1 AND user_id = $2',
    [id, userId]
  )
  return result.rows[0]
}

export const create = async ({ titre, description, statut, priorite, userId }) => {
  const result = await pool.query(
    `INSERT INTO taches (titre, description, statut, priorite, user_id)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [titre, description, statut || 'todo', priorite || 'medium', userId]
  )
  return result.rows[0]
}

export const update = async (id, userId, { titre, description, statut, priorite }) => {
  const result = await pool.query(
    `UPDATE taches SET titre=$1, description=$2, statut=$3, priorite=$4
     WHERE id=$5 AND user_id=$6 RETURNING *`,
    [titre, description, statut, priorite, id, userId]
  )
  return result.rows[0]
}

export const updateStatut = async (id, userId, statut) => {
  const result = await pool.query(
    'UPDATE taches SET statut=$1 WHERE id=$2 AND user_id=$3 RETURNING *',
    [statut, id, userId]
  )
  return result.rows[0]
}

export const remove = async (id, userId) => {
  await pool.query('DELETE FROM taches WHERE id=$1 AND user_id=$2', [id, userId])
}