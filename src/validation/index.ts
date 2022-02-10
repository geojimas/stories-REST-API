// validation
import Joi from 'joi'

//Author input Validation
export const AuthorInput = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  age: Joi.number().required()
})

//Story input Validation
export const StoryInput = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  description: Joi.string().min(3).max(255).required(),
  authorId: Joi.number().required()
})
