// Libraries
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'

dotenv.config()

export const maxAge: number = 3 * 24 * 60 * 60 // 3 days

export const createToken = (id: number): string => {
  const jwtSecretKey: string = process.env.SECRET_KEY || ''
  return jwt.sign({ id }, jwtSecretKey, { algorithm: 'HS256', expiresIn: maxAge })
}