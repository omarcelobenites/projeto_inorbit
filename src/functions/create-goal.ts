import { db } from '../db'
import { goals } from '../db/schema'

interface CreatedGoalRequest {
  title: string
  desiredWeeklyFrequency: number
}
export async function createdGoal({
  title,
  desiredWeeklyFrequency,
}: CreatedGoalRequest) {
  const result = await db
    .insert(goals)
    .values({
      title,
      desiredWeeklyFrequency,
    })
    .returning()

  const goal = result[0]

  return {
    goal,
  }
}
