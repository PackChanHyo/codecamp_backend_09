import { Field, Int, ObjectType } from '@nestjs/graphql';
import { ProductCategory } from 'src/apis/productsCategories/entities/productCategorie.entity';
import { ProductLocal } from 'src/apis/productsLocals/entities/productLocal.entity';
import { ProductsTag } from 'src/apis/productsTags/entities/productsTag.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => String)
  description: string;

  @Column()
  @Field(() => Int)
  price: number;

  @Column({ default: false })
  @Field(() => Boolean)
  sale: boolean;

  @ManyToOne(() => ProductCategory)
  @Field(() => ProductCategory)
  productsCategory: ProductCategory;

  @JoinTable()
  @ManyToMany(() => ProductsTag, (productsTags) => productsTags.products)
  productsTags: ProductsTag;

  @ManyToOne(() => User)
  user: User;

  @JoinColumn()
  @OneToOne(() => ProductLocal)
  @Field(() => ProductLocal)
  productLocal: ProductLocal;

  @DeleteDateColumn()
  deletedAt: Date;
}
