export type AIResponse = Content[]

export interface Content {
  question: string
  answers: string[]
  correctIndex: number
  hint: string
}

export interface Session {
  user: User
}

export interface User {
email: string
id: string
image?: string
name: string
}