// ORM
import { PrismaClient, User } from '@prisma/client'
// Libraries
import bcrypt from 'bcrypt'
// Interfaces
import { IUser } from 'src/interfaces/Input'
// Utils
import { createToken } from 'src/utils/createToken'
// Validation
import { UserInput } from 'src/validation'

const prisma = new PrismaClient()

export const registerUserService = async (user: IUser): Promise<{newUser: User, token: string }> => {
  // Validate the User Input
  const { error } = UserInput.validate(user)
  if (error) throw error

  // Check if user already exists
  const oldUser: User | null = await prisma.user.findUnique({
    where: {
      email: user.email,
    },
  })

  if (oldUser) {
    throw new Error('This Email already exists...')
  } else {

    // encrypt the password
    const salt: string = await bcrypt.genSalt(10)
    const encryptedPassword: string = await bcrypt.hash(user.password, salt)

    // Create the User
    const newUser: User = await prisma.user.create({
      data: {
        name: user.name,
        email: user.email.toLowerCase(),
        password: encryptedPassword
      }
    })

    // Create the Token
    const token: string = createToken(newUser.id)

    return {
      newUser,
      token
    }
  }
}
