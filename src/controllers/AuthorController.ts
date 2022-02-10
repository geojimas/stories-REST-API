// Libraries
import { Response, Request } from 'express'
// HTTP Codes
import { StatusCodes } from 'http-status-codes'
// ORM
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getAllAuthors = async (_req: Request, res: Response) => {
  const users = await prisma.author.findMany()

  res.status(StatusCodes.NOT_MODIFIED).json({
    data: users,
  })
}
