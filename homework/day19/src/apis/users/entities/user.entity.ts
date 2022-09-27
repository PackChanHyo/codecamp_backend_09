import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
  @Field(() => String)
  userId: string;

  @Column()
  @Field(() => String)
  pwd: string;

  @Column()
  @Field(() => String)
  phone: string;

  @Column()
  @Field(() => String)
  email: string;

  @Column({ default: false })
  @Field(() => Boolean)
  emailsign: boolean;

  @Column()
  @Field(() => Date)
  date: Date;

  @Column()
  @Field(() => Date)
  memberSince: Date;

  @Column()
  @Field(() => String)
  point: string;

  @Column()
  @Field(() => String)
  online: string;

  @Column()
  @Field(() => String)
  personal: string;

  @Column()
  @Field(() => String)
  membership: string;
}
