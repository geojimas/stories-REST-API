// Libraries
import jwt, { JwtPayload } from 'jsonwebtoken'
import { Response, NextFunction } from 'express'
import * as dotenv from 'dotenv'


dotenv.config()

// Check the user if is Authenticated
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isAuth = (req: any, _res: Response, next: NextFunction): void => {

  // take the jwt cookie from headers
  const authHeader: string | undefined = req.headers['cookie']

  // if token exists then split
  const token = authHeader ? authHeader && authHeader.split('=')[1] : ''
  if (!token) throw new Error('Access denied. Not authorized...')

  try {
    const jwtSecretKey = process.env.SECRET_KEY ? process.env.SECRET_KEY : ''
    const decoded: JwtPayload | string = jwt.verify(token, jwtSecretKey)
    req.user = decoded

    return next()

  } catch (error) {
    if (error) {
      throw new Error('Invalid token...')
    }
  }
}
