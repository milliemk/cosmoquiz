export type AIResponse = Content[]

export interface Content {
  question: string
  answers: string[]
  correctIndex: number
}