// Libraries
import { Request, Response, NextFunction } from 'express'
// HTTP Codes
import { StatusCodes } from 'http-status-codes'

// User Controller
export const home = (_req: Request, res: Response, next: NextFunction): void => {
  try {
    res.status(StatusCodes.OK).json({
      'message': 'Rest Api running....',
      'path': 'In order to use this api you need an account',
    })
    return next()
  } catch (error) {
    return next(error)
  }
}
