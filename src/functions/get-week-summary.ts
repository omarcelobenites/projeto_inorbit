import { and, count, eq, gte, lte, sql } from 'drizzle-orm'
import { db } from '../db'
import { goalCompletions, goals } from '../db/schema'
import dayjs from 'dayjs'

export async function getWeekSummary() {
  const firstDayOfWeek = dayjs().startOf('week').toDate()
  const lastDayOfWeek = dayjs().endOf('week').toDate()

  const goalsCratedUpToWeek = db.$with('goals_created_up_to_week').as(
    db
      .select({
        id: goals.id,
        title: goals.title,
        desiredWeeklyFrequency: goals.desiredWeeklyFrequency,
        createdAt: goals.createdAt,
      })
      .from(goals)
      .where(lte(goals.createdAt, lastDayOfWeek))
  )

  const goalsCompleteInWeek = db.$with('goal_complete_in_week').as(
    db
      .select({
        id: goalCompletions.id,
        title: goals.title,
        completedAt: goalCompletions.createdAt,
        completedAtDate: sql /*sql*/`
          DATE(${goalCompletions.createdAt})
        `.as('completedAtDate'),
      })
      .from(goalCompletions)
      .innerJoin(goals, eq(goals.id, goalCompletions.goalId))
      .where(
        and(
          gte(goalCompletions.createdAt, firstDayOfWeek),
          lte(goalCompletions.createdAt, lastDayOfWeek)
        )
      )
  )

  const goalCompletedByWeekDay = db.$with('goals_completed__by_week_day').as(
    db
      .select({
        completedAtDate: goalsCompleteInWeek.completedAtDate,
        completions: sql /*sql*/`
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'id', ${goalsCompleteInWeek.id},
            'title', ${goalsCompleteInWeek.title},
            'completedAt',  ${goalsCompleteInWeek.completedAt}
          )
        )
      `.as('completions'),
      })
      .from(goalsCompleteInWeek)
      .groupBy(goalsCompleteInWeek.completedAtDate)
  )

  const result = await db
    .with(goalsCratedUpToWeek, goalsCompleteInWeek, goalCompletedByWeekDay)
    .select({
      completed: sql /*sql*/`
      (SELECT COUNT(*) FROM ${goalsCompleteInWeek})
      `.mapWith(Number),
      total: sql /*sql*/`
      (SELECT SUM(${goalsCratedUpToWeek.desiredWeeklyFrequency}) FROM ${goalsCratedUpToWeek})
      `.mapWith(Number),
      goalsParDay: sql /*sql*/`
          JSON_OBJECT_AGG(
            ${goalCompletedByWeekDay.completedAtDate},
            ${goalCompletedByWeekDay.completions}
          )
      `,
    })
    .from(goalCompletedByWeekDay)

  return {
    summary: result,
  }
}
