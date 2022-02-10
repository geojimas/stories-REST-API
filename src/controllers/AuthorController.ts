// Libraries
import { NextFunction, Request, Response } from 'express'
// HTTP Codes
import { StatusCodes } from 'http-status-codes'
// Interface
import { IAuthor } from 'src/interfaces/Input'
// Services
import { createAuthorService,
  deleteAuthorService,
  getAllAuthorsService,
  getAuthorService,
  updateAuthorService
} from 'src/services/AuthorServices'


export const getAllAuthors = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Get all authors from Service
    const authors = await getAllAuthorsService()

    res.status(StatusCodes.OK).json({
      'data': authors,
    })

  } catch (error) {
    next(error)
  }
}

export const getAuthor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Get an author from Service
    const author = await getAuthorService(parseInt(req.params.id))

    if (author === null) {
      res.status(StatusCodes.NOT_FOUND).json({
        'error':`Author with id ${req.params.id} doesn't exists`
      })
    }

    res.status(StatusCodes.OK).json({
      'message': `Author with id ${req.params.id} successfully founded !`,
      'data': author,
    })

  } catch (error) {
    next(error)
  }
}

export const createAuthor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Get the created Author from Service
    const data: IAuthor = req.body
    const author = await createAuthorService(data)

    res.status(StatusCodes.CREATED).json({
      'message': `Author with name ${author.name} successfully Created !`,
      'data': author,
    })

  } catch (error) {
    next(error)
  }
}

export const updateAuthor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Get the created Author from Service
    const data: IAuthor = req.body

    // Update Author from Service
    const author = await updateAuthorService(parseInt(req.params.id), data)

    res.status(StatusCodes.OK).json({
      'message': `Author with id ${req.params.id} successfully Updated !`,
      'data': author,
    })

  } catch (error) {
    next(error)
  }
}

export const deleteAuthor = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Get an author from Service
    const author = await deleteAuthorService(parseInt(req.params.id))

    if (author === null) {
      res.status(StatusCodes.NOT_FOUND).json({
        'error':`Author with id ${req.params.id} doesn't exists`
      })
    } else {
      res.status(StatusCodes.OK).json({
        'message':`Author with id ${req.params.id} deleted Successfully !`
      })
    }

  } catch (error) {
    next(error)
  }
}
