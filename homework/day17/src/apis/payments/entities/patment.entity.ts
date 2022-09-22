import { Product } from 'src/apis/products/entities/product.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  pay_date: Date;

  @Column()
  amount: number;

  @Column()
  pay_time: Date;

  @Column()
  Payment_status: boolean;

  @Column()
  payment_Canceled: boolean;

  @JoinColumn()
  @OneToOne(() => Product)
  product: Product;

  @ManyToOne(() => User)
  user: User;
}
