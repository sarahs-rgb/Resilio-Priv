ALTER TABLE `research_sessions` ADD `energy_mix` text DEFAULT 'solar' NOT NULL;--> statement-breakpoint
ALTER TABLE `research_sessions` ADD `wind_share_percent` real DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE `research_sessions` ADD `wind_capacity_factor_percent` real DEFAULT 15 NOT NULL;--> statement-breakpoint
ALTER TABLE `research_sessions` ADD `wind_w` real DEFAULT 0 NOT NULL;