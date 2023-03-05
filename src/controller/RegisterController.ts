import { Router } from 'express'
import { User, userSerialized } from '../entity/User'
import {hashPassword} from "../sevices/PasswordHasherService";
import registerDTO, {registerSchema} from "../dto/register";

const router = Router()

router.post('/register', async (req, res) => {
    const { error } = registerSchema.validate(req.body)
    if (error != null) {
        return res.status(400).json({ error: error.message })
    }
    let registerDTO = req.body as registerDTO

    if (typeof(registerDTO.password) != "string") {
        return res.status(400).json({ error: "bas request body" })
    }

    registerDTO.password = hashPassword(registerDTO.password);

    const user = await User.create(registerDTO);
    user.role = "artist";
    user.created_at = new Date();
    user.updated_at = new Date();

    res.status(200).json({ user: userSerialized(user.toObject()) })
})

export default router
