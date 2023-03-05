import { Router } from 'express'
import { User } from '../entity/User'
import { isArtist } from "../security/RoleManager";

const router = Router()

router.get('/model', async (req, res) => {
    if (!isArtist(req, res)) {
        return res.status(403).json({ error: 'Forbidden' });
    }

    const users = await User.find()
    return res.status(200).json(users)
});

router.post('/model', async (req, res) => {

})

// miss other routes

export default router
