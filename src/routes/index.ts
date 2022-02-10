// Libraries
import express from 'express'
// Controllers
import {
  createAuthor,
  deleteAuthor,
  getAllAuthors,
  getAuthor,
  updateAuthor,
} from 'src/controllers/AuthorController'
import {
  createStory,
  deleteStory,
  getAllStories,
  getStory,
  updateStory,
} from 'src/controllers/StoriesController'


export const router = express.Router()


// Author Routes
router.get('/authors', getAllAuthors)
router.get('/authors/:id', getAuthor)
router.post('/authors', createAuthor)
router.patch('/authors/:id', updateAuthor)
router.delete('/authors/:id', deleteAuthor)


// Stories Routers
router.get('/stories', getAllStories)
router.get('/stories/:id', getStory)
router.post('/stories', createStory)
router.patch('/stories/:id', updateStory)
router.delete('/stories/:id', deleteStory)
