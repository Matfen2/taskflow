import * as Tache from '../models/tacheModel.js'

export const getTaches = async (req, res) => {
  try { res.json(await Tache.findAll(req.user.id)) }
  catch (err) { res.status(500).json({ error: err.message }) }
}

export const getTacheById = async (req, res) => {
  try {
    const tache = await Tache.findById(req.params.id, req.user.id)
    if (!tache) return res.status(404).json({ error: 'Tâche introuvable' })
    res.json(tache)
  } catch (err) { res.status(500).json({ error: err.message }) }
}

export const createTache = async (req, res) => {
  try {
    res.status(201).json(await Tache.create({ ...req.body, userId: req.user.id }))
  } catch (err) { res.status(500).json({ error: err.message }) }
}

export const updateTache = async (req, res) => {
  try {
    const tache = await Tache.update(req.params.id, req.user.id, req.body)
    if (!tache) return res.status(404).json({ error: 'Tâche introuvable' })
    res.json(tache)
  } catch (err) { res.status(500).json({ error: err.message }) }
}

export const updateStatut = async (req, res) => {
  try {
    const tache = await Tache.updateStatut(req.params.id, req.user.id, req.body.statut)
    if (!tache) return res.status(404).json({ error: 'Tâche introuvable' })
    res.json(tache)
  } catch (err) { res.status(500).json({ error: err.message }) }
}

export const deleteTache = async (req, res) => {
  try {
    await Tache.remove(req.params.id, req.user.id)
    res.status(204).send()
  } catch (err) { res.status(500).json({ error: err.message }) }
}