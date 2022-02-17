//ORM
import { Author, PrismaClient } from '@prisma/client'
// Interfaces
import { IAuthor } from 'src/interfaces/Input'
// Validation
import { AuthorInput } from 'src/validation'


const prisma = new PrismaClient()

// Get All Authors from DATABASE
export const getAllAuthorsService = async (): Promise<Author[]> => {
  const authors: Author[] = await prisma.author.findMany({
    include: { stories: true },
  })

  await prisma.$disconnect()

  return authors
}

// Get One Author from DATABASE
export const getAuthorService = async (authorId: number): Promise<Author | null> => {
  const author: Author | null = await prisma.author.findUnique({
    where: {
      id: authorId,
    },
    include: { stories: true },
  })

  await prisma.$disconnect()

  return author
}

// Create an Author to DATABASE
export const createAuthorService = async (data: IAuthor): Promise<Author> => {
  // Validation Author Input
  const { error } = AuthorInput.validate(data)
  if (error) throw error

  const author: Author = await prisma.author.create({ data })

  await prisma.$disconnect()

  return author
}

// Update an Author in DATABASE
export const updateAuthorService = async (authorId: number, data: IAuthor): Promise<Author> => {
  let author!: Author

  // Validation Author Data
  const { error } = AuthorInput.validate(data)
  if (error) throw error

  // Check if Author Exists
  const databaseAuthor = await prisma.author.findUnique({
    where: {
      id: authorId,
    },
  })
  if (databaseAuthor) {
    author = await prisma.author.update({
      where: {
        id: databaseAuthor.id,
      },
      data: {
        name: data.name,
        age: data.age,
        updatedAt: new Date(Date.now()),
      },
    })
  }

  await prisma.$disconnect()

  return author
}

// Delete an Author in DATABASE
export const deleteAuthorService = async (authorId: number): Promise<object | null> => {

  // Check if author exists
  const author: Author | null = await prisma.author.findUnique({
    where: {
      id: authorId,
    },
  })

  if (author === null) {
    await prisma.$disconnect()

    return author
  }

  const deletedAuthor = await prisma.author.delete({
    where: {
      id: author.id,
    },
  })
  await prisma.$disconnect()

  return deletedAuthor
}
