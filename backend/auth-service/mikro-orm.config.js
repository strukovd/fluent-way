import 'reflect-metadata';
import { existsSync } from 'node:fs';
import { ReflectMetadataProvider } from '@mikro-orm/decorators/legacy';
import { JSMigrationGenerator, Migrator } from '@mikro-orm/migrations';
import { defineConfig } from '@mikro-orm/postgresql';

class ESMigrationGenerator extends JSMigrationGenerator {
	generateMigrationFile(className, diff) {
		let source = `import { Migration } from '@mikro-orm/migrations';\n\n`;
		source += `export class ${className} extends Migration {\n`;
		source += `  name = '${className}';\n\n`;
		source += `  async up() {\n`;
		for (const sql of diff.up) source += this.createStatement(sql, 4);
		source += `  }\n`;
		if (diff.down.length) {
			source += `\n  async down() {\n`;
			for (const sql of diff.down) source += this.createStatement(sql, 4);
			source += `  }\n`;
		}
		return source + `}\n`;
	}
}

if (existsSync('.env.local')) {
	process.loadEnvFile('.env.local');
}

export default defineConfig({
	host: process.env.PG_HOST ?? '127.0.0.1',
	port: Number(process.env.PG_PORT ?? 5432),
	dbName: process.env.PG_DATABASE,
	user: process.env.PG_USERNAME,
	password: process.env.PG_PASSWORD,
	metadataProvider: ReflectMetadataProvider,
	entities: ['./dist/entities/*.js'],
	extensions: [Migrator],
	migrations: {
		path: './migrations',
		emit: 'js',
		generator: ESMigrationGenerator,
		dropTables: false,
		safe: true,
	},
});
