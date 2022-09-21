import { Product } from 'src/apis/products/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ProductLocal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  local: string;

  @Column()
  meetingTime: Date;

  @JoinColumn()
  @OneToOne(() => Product)
  product: Product;
}
