// Libraries
import { Request, Response, NextFunction } from 'express'
// HTTP Codes
import { StatusCodes } from 'http-status-codes'
// Interfaces
import { IUser } from 'src/interfaces/Input'
// Services
import { loginUserService, registerUserService } from 'src/services/UserServices'
// Utils
import { maxAge } from 'src/utils/createToken'

// Register new User
export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data: IUser = req.body
    const user = await registerUserService(data)

    if (user) {

      // Place the token in Header as Cookie
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


export const logIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data: IUser = req.body
    const user = await loginUserService(data)

    // Place the token in Header as Cookie
    res.cookie('access_token', user.token, { httpOnly: true, maxAge: maxAge * 1000 })

    res.status(StatusCodes.OK).json({
      message: `Welcome ${user.existingUser} !`,
      User: user.existingUser,
      Token: user.token,
    })

  } catch (error) {
    return next(error)
  }
}

// Logout the User
export const logout = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    res.clearCookie('access_token').status(StatusCodes.OK).json({
      status: res.status,
      message: 'Successfully Log Out',
    })
    return next()
  } catch (error) {
    return next(error)
  }
}

// DashBoard Page
export const DashBoardPage = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    res.status(StatusCodes.OK).json({
      message: 'You are successfully Authenticated! , Only Auth Users watch this!',
    })
    return next()
  } catch (error) {
    return next(error)
  }
}
