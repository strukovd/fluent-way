import { Entity, ManyToOne, OneToMany, Property, Unique } from '@mikro-orm/decorators/legacy';
import type { Rel } from '@mikro-orm/core';
import { User } from "../User.js";

export class BaseEntity {
	@ManyToOne(() => User, { fieldName: 'created_by', nullable: true })
	createdBy?: Rel<User>;

	@ManyToOne(() => User, { fieldName: 'updated_by', nullable: true })
	updatedBy?: Rel<User>;

	@ManyToOne(() => User, { fieldName: 'removed_by', nullable: true })
	removedBy?: Rel<User>;


	@Property({ name: 'created', type: 'timestamp', defaultRaw: 'now()' })
	created: Date;

	@Property({ name: 'updated', type: 'timestamp', nullable: true })
	updated?: Date;

	@Property({ name: 'removed', type: 'timestamp', nullable: true })
	removed?: Date;

	constructor(partial: Partial<BaseEntity>) {
		Object.assign(this, partial);
	}
}
