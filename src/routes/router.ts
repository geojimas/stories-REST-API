// Libraries
import express from 'express'
import { getAllAuthors } from 'src/controllers/AuthorController'
import { index } from 'src/controllers/TestController'

export const router = express.Router()

// Public Routes
router.get('/', index)

router.get('/authors', getAllAuthors)
