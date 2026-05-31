CREATE TABLE `task_list` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(62) NOT NULL,
	`desk` varchar(255) NOT NULL,
	`image` varchar(255),
	`status` enum('completed','process','cancel') DEFAULT 'process',
	`deadline` date NOT NULL,
	`level` enum('priority','optional','normal') DEFAULT 'normal',
	`tasks_id` int NOT NULL,
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `task_list_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `tasks` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(52) NOT NULL,
	`desk` varchar(255) NOT NULL,
	`deadline` date NOT NULL,
	`status` enum('completed','process','cancel') DEFAULT 'process',
	`level` enum('priority','optional','normal') DEFAULT 'normal',
	`user_id` int NOT NULL,
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `tasks_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(50) NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	`created_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
ALTER TABLE `task_list` ADD CONSTRAINT `task_list_tasks_id_tasks_id_fk` FOREIGN KEY (`tasks_id`) REFERENCES `tasks`(`id`) ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `tasks` ADD CONSTRAINT `tasks_user_id_users_id_fk` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE no action ON UPDATE no action;