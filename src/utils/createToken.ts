// Libraries
import jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'

dotenv.config()

// Token Max Age
export const maxAge: number = 3 * 24 * 60 * 60 // 3 days

// JWT Token creation
export const createToken = (id: number): string => {
  const jwtSecretKey: string = process.env.SECRET_KEY || ''
  return jwt.sign({ id }, jwtSecretKey, { algorithm: 'HS256', expiresIn: maxAge })
}