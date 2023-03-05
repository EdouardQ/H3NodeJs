import { Router } from 'express'
import { hashPassword } from '../sevices/PasswordHasherService'
import { User, CreateUserSchema, UpdateUserSchema, userSerialized } from '../entity/User'

const router = Router()
const routeAdmin = "/admin/"
const routeManager = "/manager/"
const routeArtist = "/artist/"

// TO DO : condition sur le droit lorsque que le TOKEN sera disponible

/**
 * Admin section
 */

// Recherche d'un utilisateur
router.get(routeAdmin +'/search-user/:id', async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user == null) {
        return res.status(404).json({ error: 'User not found' })
    }
    return res.status(200).json(user)
})

/**
 * Manager section
 */

// Affiche les maquettes en cours d'évaluation OU les maquette évalué
router.get(routeManager +'/modals/:valid', async (req, res) => {


})

// Affiche la maquette en fonction de son id
router.get(routeManager +'/modal/:id', async (req, res) => {


})

// Affiche la maquette en fonction de son id
router.get(routeManager +'/modal/:id', async (req, res) => {


})

/**
 * Artist section
 */
// Affiche les maquettes appartenant à l'utilisateur
router.get(routeArtist +'/modals/', async (req, res) => {


})

// Création d'une maquette
router.post(routeArtist +'/modal/', async (req, res) => {


})

export default router
