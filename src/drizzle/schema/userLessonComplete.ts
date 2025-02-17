import { pgTable, primaryKey, text, uuid } from "drizzle-orm/pg-core";
import { ProductTable } from "./product";
import { createdAt, updatedAt } from "../schemaHelpers";
import { relations } from "drizzle-orm";
import { UserTable } from "./user";
import { LessonTable } from "./lesson";

export const UserLessonCompleteTable = pgTable("user_lesson_complete", {

    userId: uuid().notNull().references(() => UserTable.id, { onDelete: "cascade" }),
    lessonId: uuid().notNull().references(() => LessonTable.id, { onDelete: "cascade" }),
    stripeSessionId: text().notNull().unique(),
    createdAt,
    updatedAt
},
    t => [primaryKey({ columns: [t.userId, t.lessonId] })]
)

export const UserLessonCompleteRelationship = relations(UserLessonCompleteTable, ({ one }) => ({
    user: one(UserTable, {
        fields: [UserLessonCompleteTable.userId],
        references: [UserTable.id]
    }),
    course: one(LessonTable, {
        fields: [UserLessonCompleteTable.lessonId],
        references: [LessonTable.id]
    })
}))