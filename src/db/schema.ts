import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(),
  email: text('email').notNull(),
  name: text('name'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const consultations = pgTable('consultations', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  fullName: text('full_name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  serviceType: text('service_type').notNull(),
  county: text('county'),
  projectScope: text('project_scope'),
  estimatedBudget: text('estimated_budget'),
  preferredDate: text('preferred_date'),
  attachedEstimate: text('attached_estimate'),
  status: text('status').default('Pending').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const estimates = pgTable('estimates', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  projectName: text('project_name').notNull(),
  buildingType: text('building_type').notNull(),
  location: text('location').notNull(),
  totalCostKes: integer('total_cost_kes').notNull(),
  breakdownJson: text('breakdown_json'),
  createdAt: timestamp('created_at').defaultNow(),
});

export const jobApplications = pgTable('job_applications', {
  id: serial('id').primaryKey(),
  userId: integer('user_id').references(() => users.id),
  fullName: text('full_name').notNull(),
  email: text('email').notNull(),
  phone: text('phone').notNull(),
  position: text('position').notNull(),
  registrationDetails: text('registration_details'),
  experienceYears: text('experience_years'),
  county: text('county'),
  portfolioUrl: text('portfolio_url'),
  coverNote: text('cover_note'),
  mpesaTransactionCode: text('mpesa_transaction_code').notNull(),
  feeAmountKes: integer('fee_amount_kes').default(350),
  status: text('status').default('Pending Verification').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

export const usersRelations = relations(users, ({ many }) => ({
  consultations: many(consultations),
  estimates: many(estimates),
  jobApplications: many(jobApplications),
}));

export const consultationsRelations = relations(consultations, ({ one }) => ({
  user: one(users, {
    fields: [consultations.userId],
    references: [users.id],
  }),
}));

export const estimatesRelations = relations(estimates, ({ one }) => ({
  user: one(users, {
    fields: [estimates.userId],
    references: [users.id],
  }),
}));

export const jobApplicationsRelations = relations(jobApplications, ({ one }) => ({
  user: one(users, {
    fields: [jobApplications.userId],
    references: [users.id],
  }),
}));
