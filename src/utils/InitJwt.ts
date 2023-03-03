import * as crypto from "crypto";
import * as fs from 'fs'

export interface Secret {
    token: string
}

const generateSecret = (rounds: number = 12): Secret => {
    return {
        token: crypto.randomBytes(64).toString('hex')
    }
}

export const InitJwt = (): void => {
    const secret: Secret = generateSecret()
    fs.writeFile('./jwt_token.txt', secret.token, (err) => {
        if (err) {
            throw err
        }
    })
}
