import { Router } from 'express'
import {
  getTaches, getTacheById, createTache,
  updateTache, updateStatut, deleteTache
} from '../controllers/tacheController.js'
import { validate } from '../middlewares/validate.js'
import { tacheSchema, statutSchema } from '../validators/tacheValidator.js'

const router = Router()

/**
 * @swagger
 * tags:
 *   name: Tâches
 *   description: Gestion des tâches Kanban
 */

/**
 * @swagger
 * /taches:
 *   get:
 *     summary: Toutes les tâches de l'utilisateur connecté
 *     tags: [Tâches]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Liste des tâches
 */
router.get('/', getTaches)

/**
 * @swagger
 * /taches:
 *   post:
 *     summary: Créer une tâche
 *     tags: [Tâches]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [titre]
 *             properties:
 *               titre:
 *                 type: string
 *                 example: Implémenter la connexion frontend
 *               description:
 *                 type: string
 *               statut:
 *                 type: string
 *                 enum: [todo, in_progress, done]
 *               priorite:
 *                 type: string
 *                 enum: [low, medium, high]
 *     responses:
 *       201:
 *         description: Tâche créée
 */
router.post('/', validate(tacheSchema), createTache)
router.get('/:id', getTacheById)
router.put('/:id', validate(tacheSchema), updateTache)

/**
 * @swagger
 * /taches/{id}/statut:
 *   patch:
 *     summary: Changer le statut d'une tâche (glisser-déposer Kanban)
 *     tags: [Tâches]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               statut:
 *                 type: string
 *                 enum: [todo, in_progress, done]
 *     responses:
 *       200:
 *         description: Statut mis à jour
 */
router.patch('/:id/statut', validate(statutSchema), updateStatut)
router.delete('/:id', deleteTache)

export default router