// Libraries
import { Request, Response, NextFunction } from 'express'
// HTTP Codes
import { StatusCodes } from 'http-status-codes'
// Interfaces
import { IUser } from 'src/interfaces/Input'
// Services
import { registerUserService } from 'src/services/RegisterService'
import { maxAge } from 'src/utils/createToken'

// User Controller
export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data: IUser = req.body
    const user = await registerUserService(data)

    if (user) {
      res.cookie('access_token', user.token, { httpOnly: true, maxAge: maxAge * 1000 })
      res.status(StatusCodes.CREATED).json({
        message: `User with Name '${user.newUser.name}' Created Successfully !`,
        user: user.newUser,
        token: user.token,
      })
    }
    return next()
  } catch (error) {
    return next(error)
  }
}
