// validation
import Joi from 'joi'
import PasswordComplexity from 'joi-password-complexity'

// User input Validation
export const UserInput = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  email: Joi.string().email().max(200).required(),
  password: PasswordComplexity({
    min: 6,
    max: 25,
    lowerCase: 1,
    numeric: 1,
    requirementCount: 4,
  }),
})

//Author input Validation
export const AuthorInput = Joi.object({
  name: Joi.string().min(3).max(255).required(),
  age: Joi.number().required(),
})

//Story input Validation
export const StoryInput = Joi.object({
  title: Joi.string().min(3).max(255).required(),
  description: Joi.string().min(3).max(255).required(),
  authorId: Joi.number().required(),
})
