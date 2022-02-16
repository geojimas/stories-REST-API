// Input Interfaces
export interface IUser {
  name: string
  email: string
  password: string
}

export interface IAuthor {
  name: string
  age: number
}

export interface IStory {
  title: string
  description: string
  authorId: number
}
