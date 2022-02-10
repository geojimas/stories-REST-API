// Libraries
import { Response, Request, NextFunction } from 'express'

// HTTP Codes
import { StatusCodes } from 'http-status-codes'

export const index = (_req: Request, res: Response, _next: NextFunction) => {
  return res.status(StatusCodes.OK).json({
    message: 'API running...',
  })
}
