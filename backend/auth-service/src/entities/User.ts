import { Entity, Property } from '@mikro-orm/decorators/legacy';
import { BaseEntity } from './common/base.entity.js';


@Entity({ tableName: 'users' })
export class User extends BaseEntity {
	@Property({ type: 'integer', primary: true })
	id: number;

	@Property({ nullable: true, unique: true })
	username?: string;

	@Property({ nullable: true, comment: 'Хэш пароля' })
	password?: string;

	@Property({ nullable: true })
	displayName?: string;

	@Property({ nullable: true })
	avatar?: string;

	@Property({ default: 'ru', length: 10 })
	language: string;

	@Property({ nullable: false, default: true })
	isActive: boolean;


	constructor(partial: Partial<User>) {
		super(partial);
		Object.assign(this, partial);
	}
}
