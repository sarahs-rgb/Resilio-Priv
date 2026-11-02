CREATE TABLE `research_sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`participant_code` text NOT NULL,
	`study_version` text DEFAULT 'resilio-ap-v1' NOT NULL,
	`study_group` text DEFAULT 'app' NOT NULL,
	`consent_version` text NOT NULL,
	`consented_at` text NOT NULL,
	`started_at` text NOT NULL,
	`completed_at` text NOT NULL,
	`completion_seconds` integer NOT NULL,
	`confidence_before` integer NOT NULL,
	`confidence_after` integer NOT NULL,
	`device_count` integer NOT NULL,
	`daily_wh` real NOT NULL,
	`backup_days` real NOT NULL,
	`peak_sun_hours` real NOT NULL,
	`usable_capacity_assumption_percent` real NOT NULL,
	`efficiency_assumption_percent` real NOT NULL,
	`planning_margin_percent` real NOT NULL,
	`system_voltage_v` real NOT NULL,
	`battery_wh` real NOT NULL,
	`battery_charge_percent` real NOT NULL,
	`stored_energy_wh` real NOT NULL,
	`remaining_usable_wh` real NOT NULL,
	`estimated_runtime_hours` real NOT NULL,
	`solar_w` real NOT NULL,
	`battery_ah` real NOT NULL,
	`estimated_empty_to_full_peak_sun_hours` real NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE `usage_events` (
	`id` text PRIMARY KEY NOT NULL,
	`event_type` text NOT NULL,
	`app_version` text NOT NULL,
	`occurred_at` text NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
