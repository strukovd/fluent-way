import { Migration } from '@mikro-orm/migrations';

export class Migration20261005205636_init_auth_tables extends Migration {
	name = 'Migration20261005205636_init_auth_tables';

	async up() {
		// The old Spring users table has no rows or incoming foreign keys.
		this.addSql('drop table if exists "users";');

		this.addSql(`create table "users" ("id" serial primary key, "created_by" int null, "updated_by" int null, "removed_by" int null, "created" timestamptz not null default now(), "updated" timestamptz null, "removed" timestamptz null, "username" varchar(255) null, "password" varchar(255) null, "display_name" varchar(255) null, "avatar" varchar(255) null, "language" varchar(10) not null default 'ru', "is_active" boolean not null default true);`);
		this.addSql(`comment on column "users"."password" is 'Хэш пароля';`);
		this.addSql('alter table "users" add constraint "users_username_unique" unique ("username");');

		this.addSql(`create table "user_contacts" ("id" serial primary key, "created_by" int null, "updated_by" int null, "removed_by" int null, "created" timestamptz not null default now(), "updated" timestamptz null, "removed" timestamptz null, "user_id" int not null, "type" text not null, "value" varchar(255) not null, "verified_at" timestamptz null, "is_primary" boolean not null default false);`);
		this.addSql(`comment on table "user_contacts" is 'Контакты (email, phone, telegram) для рассылок|уведомлений|восстановления пароля';`);

		this.addSql(`create table "user_oauth" ("id" serial primary key, "created_by" int null, "updated_by" int null, "removed_by" int null, "created" timestamptz not null default now(), "updated" timestamptz null, "removed" timestamptz null, "provider" varchar(255) not null, "provider_account_id" varchar(255) not null, "profile_data" jsonb null, "user_id" int not null);`);
		this.addSql(`comment on table "user_oauth" is 'Внешние аккаунты для аутентификации (прим.: Google, GitHub, Apple)';`);
		this.addSql('alter table "user_oauth" add constraint "user_oauth_provider_provider_account_id_unique" unique ("provider", "provider_account_id");');

		for (const field of ['created_by', 'updated_by', 'removed_by']) {
			this.addSql(`alter table "users" add constraint "users_${field}_foreign" foreign key ("${field}") references "users" ("id") on delete set null;`);
		}
		for (const table of ['user_contacts', 'user_oauth']) {
			for (const field of ['created_by', 'updated_by', 'removed_by']) {
				this.addSql(`alter table "${table}" add constraint "${table}_${field}_foreign" foreign key ("${field}") references "users" ("id") on delete set null;`);
			}
			this.addSql(`alter table "${table}" add constraint "${table}_user_id_foreign" foreign key ("user_id") references "users" ("id") on delete cascade;`);
		}
	}

	async down() {
		this.addSql('drop table if exists "user_oauth";');
		this.addSql('drop table if exists "user_contacts";');
		this.addSql('drop table if exists "users";');
	}
}
