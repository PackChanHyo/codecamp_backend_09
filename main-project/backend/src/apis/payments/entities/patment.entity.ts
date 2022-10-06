import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Product } from 'src/apis/products/entities/product.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export enum POINT_TRANSACTION_STATUS_ENUM {
  PAYMENT = 'PAYMENT',
  CANCEL = 'CANCEL',
}

registerEnumType(POINT_TRANSACTION_STATUS_ENUM, {
  name: 'POINT_TRANSACTION_STATUS_ENUM',
});

@Entity()
@ObjectType()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  paymentName: string;

  @Column({ nullable: true })
  @Field(() => Date, { nullable: true })
  paymentDate: Date;

  @Column()
  @Field(() => String)
  impUid: string;

  // @Column()
  // @Field(() => String)
  // merchant_uid: string;

  @Column()
  @Field(() => Int)
  amount: number;

  @Column({ nullable: true })
  @Field(() => Date, { nullable: true })
  pay_time: Date;

  @Column({ type: 'enum', enum: POINT_TRANSACTION_STATUS_ENUM })
  @Field(() => POINT_TRANSACTION_STATUS_ENUM)
  status: string;

  @Column({ default: false })
  @Field(() => Boolean, { nullable: true })
  payment_Canceled: boolean;

  @JoinColumn()
  @OneToOne(() => Product)
  product: Product;

  @ManyToOne(() => User)
  @Field(() => User, { nullable: true })
  user: User;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;
}
