import { sql } from 'drizzle-orm';
import { date, datetime, foreignKey, int, mysqlEnum, mysqlTable, serial, varchar } from 'drizzle-orm/mysql-core';


export const users = mysqlTable('users', {
    id: int().primaryKey().autoincrement(),
    name: varchar({ length: 50 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar({ length: 255 }).notNull(),
    created_at: datetime().default(sql`CURRENT_TIMESTAMP`).notNull(),
    updated_at: datetime().default(sql`CURRENT_TIMESTAMP`).notNull(),
});


export const tasks = mysqlTable('tasks', {
    id: int().primaryKey().autoincrement(),
    name: varchar({ length: 52 }).notNull(),
    desk: varchar({ length: 255 }).notNull(),
    deadline: date().notNull(),
    status: mysqlEnum('status', ['completed', 'process', 'cancel']).default('process'),
    level: mysqlEnum('level', ['priority', 'optional', 'normal']).default('normal'),    
    user_id: int().notNull(),
    created_at: datetime().default(sql`CURRENT_TIMESTAMP`).notNull(),
    updated_at: datetime().default(sql`CURRENT_TIMESTAMP`).notNull(),
},
    (table) => ({
        user_fk: foreignKey({
            columns: [table.user_id],   
            foreignColumns: [users.id],
        }),
    })
);


export const task_list = mysqlTable('task_list', {
    id: int().primaryKey().autoincrement(),
    name: varchar({ length: 62 }).notNull(),
    desk: varchar({ length: 255 }).notNull(),
    image: varchar({ length: 255 }),
    status: mysqlEnum('status', ['completed', 'process', 'cancel']).default('process'),
    deadline: date().notNull(),
    level: mysqlEnum('level', ['priority', 'optional', 'normal']).default('normal'),
    tasks_id: int().notNull(),
    created_at: datetime().default(sql`CURRENT_TIMESTAMP`).notNull(),
    updated_at: datetime().default(sql`CURRENT_TIMESTAMP`).notNull(),
},
    (table) => ({
        tl_fk: foreignKey({
            columns: [table.tasks_id],
            foreignColumns: [tasks.id],
        })
    })
);
