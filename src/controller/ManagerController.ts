import { Router } from 'express'
import {isArtist} from "../security/UserManager";
import { CreateModelSchema, Model } from "../entity/Model";


const router = Router()

router.get('/models', async (req, res) => {
    if (isArtist(req, res)) {
        return res.status(403).json({ error: 'Forbidden' });
    }

    const models = await Model.find({ valid: 0 });
    return res.status(200).json(models);
});

router.post('/rate/:id', async (req, res) => {
    if (isArtist(req, res)) {
        return res.status(403).json({ error: 'Forbidden' });
    }



    //res.status(200).json({ })
})

export default router
