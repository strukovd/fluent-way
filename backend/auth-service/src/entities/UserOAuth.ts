import { Entity, ManyToOne, Property, Unique } from '@mikro-orm/decorators/legacy';
import { BaseEntity } from './common/base.entity.js';
import { User } from './User.js';
export enum ProviderType {
	GOOGLE = 'google',
	GITHUB = 'github',
	APPLE = 'apple'
}


@Entity({
	tableName: 'user_oauth',
	comment: 'Внешние аккаунты для аутентификации (прим.: Google, GitHub, Apple)'
})
@Unique({ properties: ['provider', 'providerAccountId'] })
export class UserOAuth extends BaseEntity {
	@Property({ type: 'integer', primary: true })
	id: number;

	@Property()
	provider: ProviderType;

	@Property() // Тот самый `sub` из гугла или id из гитхаба
	providerAccountId: string;

	@Property({ type: 'json', nullable: true }) // Доп. данные от провайдера, если понадобятся
	profileData?: Record<string, any>;


	@ManyToOne(() => User, { deleteRule: 'cascade' })
	user: User;

	constructor(partial: Partial<UserOAuth>) {
		super(partial);
		Object.assign(this, partial);
	}
}
