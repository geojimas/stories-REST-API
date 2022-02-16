// Libraries
import express from 'express'
// Author Controllers
import {
  createAuthor,
  deleteAuthor,
  getAllAuthors,
  getAuthor,
  updateAuthor,
} from 'src/controllers/AuthorController'
// Story Controllers
import {
  createStory,
  deleteStory,
  getAllStories,
  getStory,
  updateStory,
} from 'src/controllers/StoriesController'
// User Controllers
import { DashBoardPage, logIn, logout, register } from 'src/controllers/UserController'
// Home Controller
import { home } from 'src/controllers/homeController'
// Authentication Middleware
import { isAuth } from 'src/middlewares/isAuth'

export const router = express.Router()

// Welcome Page
router.get('/', home)


// Public User Routes
router.post('/register', register)
router.post('/login', logIn)


// Private User Routes
router.get('/logout', isAuth, logout)
router.get('/dashboard', isAuth, DashBoardPage)


// Private Author Routes
router.get('/authors', isAuth, getAllAuthors)
router.get('/authors/:id', isAuth, getAuthor)
router.post('/authors', isAuth, createAuthor)
router.patch('/authors/:id', isAuth, updateAuthor)
router.delete('/authors/:id', isAuth, deleteAuthor)


// Private Stories Routers
router.get('/stories', isAuth, getAllStories)
router.get('/stories/:id', isAuth, getStory)
router.post('/stories', isAuth, createStory)
router.patch('/stories/:id', isAuth, updateStory)
router.delete('/stories/:id', isAuth, deleteStory)
