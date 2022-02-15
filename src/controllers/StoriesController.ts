// Libraries
import { Request, Response, NextFunction } from 'express'
// HTTP Codes
import { StatusCodes } from 'http-status-codes'
// Interface
import { IStory } from 'src/interfaces/Input'
//Services
import { createStoryService, deleteStoryService, getAllStoriesService, getStoryService, updateStoryService } from 'src/services/StoriesServices'


// Get All Stories
export const getAllStories = async (_req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const stories = await getAllStoriesService()
    res.status(StatusCodes.OK).json(stories)

    return next()
  } catch (error) {
    return next(error)
  }
}

// Get a single story
export const getStory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const story = await getStoryService(parseInt(req.params.id))

    if (story === null) {
      res.status(StatusCodes.NOT_FOUND).json({
        'error': `Story with id ${req.params.id} didn't found !`
      })
    } else {
      res.status(StatusCodes.OK).json({
        'message': `Story with id ${req.params.id} founded !`,
        'data': story
      })
    }
    return next()
  } catch (error) {
    return next(error)
  }
}

// Create a Story
export const createStory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data: IStory = req.body
    const story = await createStoryService(data)

    res.status(StatusCodes.CREATED).json({
      'message': `Story with name ${story.title} successfully Created !`,
      'data': story,
    })
    return next()
  } catch (error) {
    return next(error)
  }
}

// Update a Story
export const updateStory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const data: IStory = req.body
    const story = await updateStoryService(parseInt(req.params.id), data)

    res.status(StatusCodes.OK).json({
      'message': `Story with name ${story.title} successfully Created !`,
      'data': story,
    })
    return next()
  } catch (error) {
    return next(error)
  }
}

// Delete a Story
export const deleteStory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Get an author from Service
    const story = await deleteStoryService(parseInt(req.params.id))

    if (story === null) {
      res.status(StatusCodes.OK).json({
        'error':`Story with id ${req.params.id} doesn't exists`
      })
    } else {
      res.status(StatusCodes.OK).json({
        'message':`Story with id ${req.params.id} deleted Successfully !`
      })
    }
    return next()
  } catch (error) {
    return next(error)
  }
}
