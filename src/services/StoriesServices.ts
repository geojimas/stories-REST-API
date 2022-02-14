//ORM
import { Story, PrismaClient } from '@prisma/client'
// interfaces
import { IStory } from 'src/interfaces/Input'
// Validation
import { StoryInput } from 'src/validation'


const prisma = new PrismaClient()


// Get All Stories Service
export const getAllStoriesService = async (): Promise<Story[]> => {

  const stories: Story[] = await prisma.story.findMany({
    include: { Author: true },
  })

  await prisma.$disconnect()

  return stories
}

// Get One Story Service
export const getStoryService = async (storyId: number): Promise<Story | null> => {

  const story: Story | null = await prisma.story.findUnique({
    where: {
      id: storyId,
    },
    include: { Author: true }
  })

  await prisma.$disconnect()

  return story
}

export const createStoryService = async (data: IStory): Promise<Story> => {

  // Validation Author Input
  const { error } = StoryInput.validate(data)
  if (error) throw error

  const story: Story = await prisma.story.create({
    data: {
      title: data.title,
      description: data.description,
      authorId: data.authorId
    }
  })

  await prisma.$disconnect()

  return story
}

// Update a Story in DATABASE
export const updateStoryService = async (storyId: number, data: IStory): Promise<Story> => {
  let story!: Story

  // Validation Author Data
  const { error } = StoryInput.validate(data)
  if (error) throw error

  // Check if Author Exists
  const databaseStory = await prisma.story.findUnique({
    where: {
      id: storyId,
    },
  })
  if (databaseStory) {
    story = await prisma.story.update({
      where: {
        id: databaseStory.id,
      },
      data: {
        title: data.title,
        description: data.description,
        authorId: data.authorId,
        updatedAt: new Date(Date.now()),
      },
    })
  }

  await prisma.$disconnect()

  return story
}


// Delete a Story in DATABASE
export const deleteStoryService = async (storyId: number): Promise<object | null> => {

  // Check if story exists
  const story: Story | null = await prisma.story.findUnique({
    where: {
      id: storyId,
    },
  })

  if (story === null) {
    await prisma.$disconnect()
    return story
  }

  const deletedStory = await prisma.story.delete({
    where: {
      id: story.id,
    },
  })
  await prisma.$disconnect()
  return deletedStory
}