import { defineSchema, defineTable } from 'convex/server';
import { v } from 'convex/values';

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    tokenIdentifier: v.string(),
    imageUrl: v.optional(v.string()),
  })
    .index('by_token', ['tokenIdentifier'])
    .index('by_email', ['email'])
    .searchIndex('search_name', { searchField: 'name' })
    .searchIndex('search_email', { searchField: 'email' }),

  expenses: defineTable({
    description: v.string(),
    amount: v.number(),
    category: v.optional(v.string()),
    date: v.number(), //timestamp
    paidByUserId: v.id('users'), // user who paid the expense referenced by user id from users table
    splitType: v.string(), // equal, percentage, exact.
    splits: v.array(
      v.object({
        userId: v.id('users'), // user who owes the money referenced by user id from users table
        amount: v.number(), // amount owed by the user
        paid: v.boolean(), // whether the user has paid or not
      })
    ),
    groupId: v.optional(v.id('groups')), // group id from groups table, undefined for one-on-one expenses
    createdBy: v.id('users'), // user who created the expense referenced by user id from users table
  })
    .index('by_group', ['groupId'])
    .index('by_user_and_group', ['paidByUserId', 'groupId'])
    .index('by_date', ['date']),

  groups: defineTable({
    name: v.string(), // name of the group
    description: v.optional(v.string()), // description of the group
    createdBy: v.id('users'), // user who created the group referenced by user id from users table
    members: v.array(
      v.object({
        userId: v.id('users'), // user who is a member of the group referenced by user id from users table
        role: v.string(), // role of the user in the group (admin, member, etc.)
        joinedAt: v.number(), // When the user joined the group
      })
    ),
  }),
  settlements: defineTable({
    amount: v.number(),
    note: v.optional(v.string()),
    date: v.number(), // timestamp
    paidByUserId: v.id('users'),
    receivedByUserId: v.id('users'),
    groupId: v.optional(v.id('groups')),
    relatedExpenseIds: v.optional(v.array(v.id('expenses'))), //which expenses this settelment covers
    createdBy: v.id('users'),
  })
    .index('by_group', ['groupId'])
    .index('by_user_and_group', ['paidByUserId','groupId'])
    .index('by_receiver_and_group',['receivedByUserId','groupId'])
    .index('by_date',['date']),
});
