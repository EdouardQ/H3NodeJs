import { Router } from 'express'
import {getIdUser, isArtist} from "../security/UserManager";
import {CreateModelSchema, Model} from "../entity/Model";
import modelDTO from "../dto/model";

const router = Router()

router.get('/model', async (req, res) => {
    if (!isArtist(req, res)) {
        return res.status(403).json({ error: 'Forbidden' });
    }

    const artistId = getIdUser(req);

    if (typeof(artistId) != "string") {
        return res.status(500).json({ error: "Internal Error" })
    }

    const models = await Model.find({ artistId: artistId });
    return res.status(200).json(models);
});

router.post('/model', async (req, res) => {
    if (!isArtist(req, res)) {
        return res.status(403).json({ error: 'Forbidden' });
    }

    const { error } = CreateModelSchema.validate(req.body);
    if (error != null) {
        return res.status(400).json({ error: error.message })
    }

    const artistId = getIdUser(req);

    if (typeof(artistId) != "string") {
        return res.status(500).json({ error: "Internal Error" })
    }

    let modelDTO = req.body as modelDTO;
    modelDTO.artistId = artistId;
    modelDTO.approval = 0;
    modelDTO.disapproval = 0;
    modelDTO.valid = true;
    modelDTO.uploaded_at = new Date();
    modelDTO.updated_at = new Date();

    let model = await Model.create(modelDTO);

    return res.status(200).json(model.toObject());
})

export default router
