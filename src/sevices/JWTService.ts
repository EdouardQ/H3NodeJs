import crypto from 'crypto'
import * as fs from 'fs'

export interface Secret {
    secret: string
}

const generateSecret = (rounds: number = 12): Secret => {
    return {
        secret: crypto.randomBytes(Math.ceil(rounds / 2))
            .toString('hex')
            .slice(0, rounds)
    }
}

export const initJwt = (): void => {
    const secret = generateSecret()
    fs.writeFile('jwt_token.json', JSON.stringify(secret), (err) => {
        if (err) {
            throw err
        }
    })
}
