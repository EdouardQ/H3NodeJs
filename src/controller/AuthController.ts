import { Router } from 'express'
import { User, removePassword } from '../entity/User'
import {validPassword} from "../sevices/PasswordHasherService";
import LoginDTO, {loginSchema} from "../dto/login";
import {generateToken} from "../security/UserAuthenticator";

const router = Router()

router.post('/login', async (req, res) => {
    const { error } = loginSchema.validate(req.body)
    if (error != null) {
        return res.status(400).json({ error: error.message })
    }
    const loginDTO = req.body as LoginDTO

    const user = await User.findOne({ email: loginDTO.email })
    if ((user == null) || !validPassword(loginDTO.password, user?.password)) {
        return res.status(400).json({ error: 'Invalid credentials' })
    }

    const token = generateToken(user.toObject())
    res.status(200).json(removePassword({...user.toObject(), token}))
})

export default router
