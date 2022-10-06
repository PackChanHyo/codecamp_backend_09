import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  // @Field(() => String)
  pwd: string;

  @Column()
  @Field(() => String)
  phone: string;

  @Column({ nullable: true })
  @Field(() => String)
  email: string;

  @Column({ default: false })
  @Field(() => Boolean)
  emailsign: boolean;

  @Column({ nullable: true })
  @Field(() => Date, { nullable: true })
  date: Date;

  @Column({ nullable: true })
  @Field(() => Date, { nullable: true })
  memberSince: Date;

  @Column({ nullable: true })
  @Field(() => Number, { nullable: true })
  point: number;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  online: string;

  @Column({ nullable: true })
  @Field(() => String)
  personal: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  membership: string;

  @DeleteDateColumn()
  @Field(() => Date, { nullable: true })
  deletedAt: Date;
}
