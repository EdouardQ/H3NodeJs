import { Router } from 'express'
import { User } from '../entity/User'
import {isAdmin} from "../security/RoleManager";

const router = Router()

router.get('/users', async (req, res) => {
    isAdmin(req, res, () => {});

    const users = await User.find()
    return res.status(200).json(users)
});

router.get('/users/:id', async (req, res) => {
    isAdmin(req, res, () => {});

    const user = await User.findById(req.params.id)
    if (user == null) {
        return res.status(404).json({ error: 'User not found' })
    }

    return res.status(200).json(user)
})

export default router
