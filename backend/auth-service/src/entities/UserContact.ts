import { Entity, ManyToOne, Property } from '@mikro-orm/decorators/legacy';
import { BaseEntity } from './common/base.entity.js';
import { User } from './User.js';
export enum ContactType {
	EMAIL = 'email',
	PHONE = 'phone',
	TELEGRAM = 'telegram'
}


@Entity({ tableName: 'user_contacts', comment: 'Контакты (email, phone, telegram) для рассылок|уведомлений|восстановления пароля' })
export class UserContact extends BaseEntity {
	@Property({ type: 'integer', primary: true })
	id: number;

	@ManyToOne(() => User, { deleteRule: 'cascade' })
	user: User;

	@Property({ type: 'text' }) // email или phone
	type: ContactType;

	@Property() // сам контакт
	value: string;

	@Property({ nullable: true })
	verifiedAt?: Date;

	@Property({ default: false })
	isPrimary: boolean = false; // главный контакт для уведомлений

	constructor(partial: Partial<UserContact>) {
		super(partial);
		Object.assign(this, partial);
	}
}
