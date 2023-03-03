import { Router } from 'express'
import { hashPassword } from '../sevices/PasswordHasherService'
import { User, CreateUserSchema, UpdateUserSchema, removePassword } from '../entity/User'

const router = Router()
const routeAdmin = "/admin/"
const routeManager = "/manager/"
const routeArtist = "/artist/"

/**
 * Admin section
 */
router.get(routeAdmin + '/remove-passwd', async (req, res) => {
    const users = await User.find()
    console.log((req as any).auth)
    return res
        .status(200)
        .json(removePassword(users.map((user) => removePassword(user.toObject()))))
})

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


/**
 * Artist section
 */


export default router
