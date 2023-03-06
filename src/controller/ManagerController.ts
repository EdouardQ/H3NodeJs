import { Router } from 'express'
import {isArtist} from "../security/UserManager";
import { CreateModelSchema, Model } from "../entity/Model";
import rateDTO, {rateSchema} from "../dto/rate";
import {verifUniqueRateModelService} from "../sevices/UniqueRateModelService";


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

    const { error } = rateSchema.validate(req.body)
    if (error != null) {
        return res.status(400).json({ error: error.message })
    }

    let rateDTO = req.body as rateDTO

    if (rateDTO.rate != -1 && rateDTO.rate != 1) {
        return res.status(400).json({ error: "rate out of range" })
    }

    if(!await verifUniqueRateModelService(req.params.id, rateDTO.id_manager)){
        return res.status(400).json({ error: "you already given your rating" })
    }

    



    //res.status(200).json({ })
})

export default router
