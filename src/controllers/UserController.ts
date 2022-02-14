// Libraries
import { Request, Response, NextFunction } from 'express'
// HTTP Codes
import { StatusCodes } from 'http-status-codes'

// User Controller
export const register = (_req: Request, res: Response, next: NextFunction): void => {
  try {
    res.status(StatusCodes.OK).json({
      'message': 'User auth Controller',
    })
    next()
  } catch (error) {
    next(error)
  }
}
