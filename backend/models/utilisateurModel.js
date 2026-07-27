import pool from '../config/db.js'

export const findByEmail = async (email) => {
  const result = await pool.query(
    'SELECT * FROM utilisateurs WHERE email = $1', [email]
  )
  return result.rows[0]
}

export const create = async (email, hashedPassword) => {
  const result = await pool.query(
    'INSERT INTO utilisateurs (email, password) VALUES ($1, $2) RETURNING id, email',
    [email, hashedPassword]
  )
  return result.rows[0]
}