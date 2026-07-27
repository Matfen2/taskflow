import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import * as Utilisateur from '../models/utilisateurModel.js'

export const register = async (req, res) => {
  try {
    const { email, password } = req.body
    if (await Utilisateur.findByEmail(email))
      return res.status(409).json({ error: 'Email déjà utilisé' })
    const hash = await bcrypt.hash(password, 10)
    res.status(201).json(await Utilisateur.create(email, hash))
  } catch (err) { res.status(500).json({ error: err.message }) }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await Utilisateur.findByEmail(email)
    if (!user || !await bcrypt.compare(password, user.password))
      return res.status(401).json(
        { error: 'Identifiants invalides' }
      )
    const token = jwt.sign(
        { id: user.id, email: user.email }, 
        process.env.JWT_SECRET, 
        { expiresIn: '24h' })
    res.json(
        { token, user: { id: user.id, email: user.email } }
    )
  } catch (err) { 
    res.status(500).json(
        { error: err.message }
    ) }
}