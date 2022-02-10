// Libraries
import express, { Application } from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import { json } from 'body-parser'
import * as dotenv from 'dotenv'

dotenv.config()

// Router
import { router } from './routes/router'

const app: Application = express()

// Middlewares
app.use(helmet())
app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5000', 'http://localhost:8080'],
  })
)
app.use(morgan('dev'))
app.use(json())
app.use(express.urlencoded({ extended: true }))
app.use(router)

if (!process.env.PORT) {
  process.exit(1)
}

// Starting the Server
app.listen(process.env.PORT || 5000, () => {
  console.log(`server start running at port ${process.env.PORT}`)
  console.log(`Server is Live here -> http://localhost:${process.env.PORT}`)
})
