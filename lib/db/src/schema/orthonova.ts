import { pgTable, text, timestamp, real, integer } from "drizzle-orm/pg-core";

export const patients = pgTable("orthonova_patients", {
  id: text("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  dateOfBirth: text("date_of_birth").notNull(),
  school: text("school").notNull(),
  className: text("class_name").notNull(),
  guardian: text("guardian"),
  notes: text("notes"),
  status: text("status").notNull().default("active"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const assessmentSessions = pgTable("orthonova_assessments", {
  id: text("id").primaryKey(),
  patientId: text("patient_id").notNull(),
  patientName: text("patient_name").notNull(),
  assessmentName: text("assessment_name").notNull(),
  status: text("status").notNull().default("in_progress"),
  startedAt: timestamp("started_at").defaultNow().notNull(),
  completedAt: timestamp("completed_at"),
  progress: integer("progress").notNull().default(0),
  totalScore: real("total_score"),
  interpretation: text("interpretation"),
  vpScore: real("vp_score"),
  ranScore: real("ran_score"),
  paScore: real("pa_score"),
});

export type Patient = typeof patients.$inferSelect;
export type AssessmentSession = typeof assessmentSessions.$inferSelect;