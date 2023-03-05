import { Router } from 'express'
import {UpdateBannedUserSchema, User} from '../entity/User'
import { isAdmin } from "../security/UserManager";
import { Model } from "../entity/Model";

const router = Router()

router.get('/users', async (req, res) => {
    if (!isAdmin(req, res)) {
        return res.status(403).json({ error: 'Forbidden' });
    }

    const users = await User.find()
    return res.status(200).json(users)
});

router.get('/users/:id', async (req, res) => {
    if (!isAdmin(req, res)) {
        return res.status(403).json({ error: 'Forbidden' });
    }

    const user = await User.findById(req.params.id)
    if (user == null) {
        return res.status(404).json({ error: 'User not found' })
    }

    return res.status(200).json(user)
})

router.put('/users/:id', async (req, res) => {
    if (!isAdmin(req, res)) {
        return res.status(403).json({ error: 'Forbidden' });
    }

    const { error } = UpdateBannedUserSchema.validate(req.body)
    if (error != null) {
        return res.status(400).json({ error: error.message })
    }

    const user = await User.findById(req.params.id)
    if (user == null) {
        return res.status(404).json({ error: 'User not found' })
    }

    await User.updateOne({ _id: req.params.id }, { $set: { banned: req.body.banned, updated_at: new Date() } });

    return res.status(200).json(await User.findById(req.params.id))
})

router.delete('/users/:id', async (req, res) => {
    if (!isAdmin(req, res)) {
        return res.status(403).json({ error: 'Forbidden' });
    }

    const user = await User.findById(req.params.id)
    if (user == null) {
        return res.status(404).json({ error: 'User not found' })
    }

    await User.deleteOne({ _id: req.params.id })

    return res.status(200).json({ message: 'User deleted' })
})

router.get('/models', async (req, res) => {
    if (!isAdmin(req, res)) {
        return res.status(403).json({ error: 'Forbidden' });
    }

    const models = await Model.find();
    return res.status(200).json(models);
});

export default router
