import { Router } from 'express'
import { hashPassword } from '../services/hashService'
import { User, CreateUserSchema, UpdateUserSchema, removePassword } from './User'

const router = Router()

router.get('/user/remove_passwd', async (req, res) => {
    const users = await User.find()
    console.log((req as any).auth)
    return res
        .status(200)
        .json(removePassword(users.map((user) => removePassword(user.toObject()))))
})

router.get('/user/:id', async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user == null) {
        return res.status(404).json({ error: 'User not found' })
    }
    return res.status(200).json(user)
})

export default router
