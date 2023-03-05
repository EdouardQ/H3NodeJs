import { Router } from 'express'
import { User } from '../entity/User'
import { isAdmin } from "../security/UserManager";
import { Model, UpdateValidModelSchema} from "../entity/Model";
import validDTO from "../dto/valid";

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

router.get('/models', async (req, res) => {
    if (!isAdmin(req, res)) {
        return res.status(403).json({ error: 'Forbidden' });
    }

    const models = await Model.find();
    return res.status(200).json(models);
});

router.put('/models/:id', async (req, res) => {
    if (!isAdmin(req, res)) {
        return res.status(403).json({ error: 'Forbidden' });
    }

    const { error } = UpdateValidModelSchema.validate(req.body);
    if (error != null) {
        return res.status(400).json({ error: error.message })
    }

    const models = await Model.findById(req.params.id);
    if (models == null) {
        return res.status(400).json({ error: "invalid ID" })
    }

    let validDTO = req.body as validDTO;


    let model = await Model.updateOne({ _id: req.params.id }, { $set: { valid: validDTO.valid } })

    return res.status(200).json(await Model.findById(req.params.id));
});

export default router
