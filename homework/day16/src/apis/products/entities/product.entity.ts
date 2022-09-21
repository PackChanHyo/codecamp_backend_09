import { ProductCategory } from 'src/apis/productsCategories/entities/productCategorie.entity';
import { ProductLocal } from 'src/apis/productsLocals/entities/productLocal.entity';
import { ProductsTag } from 'src/apis/productsTags/entities/productsTag.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  sale: string;

  @ManyToOne(() => ProductCategory)
  productsCategory = ProductCategory;

  @JoinTable()
  @ManyToMany(() => ProductsTag, (productsTags) => productsTags.products)
  productsTags: ProductsTag;

  @ManyToOne(() => User)
  user: User;
}
