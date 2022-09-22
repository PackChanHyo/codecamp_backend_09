import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  userId: string;

  @Column()
  pwd: number;

  @Column()
  phone: number;

  @Column()
  email: string;

  @Column()
  emailsign: boolean;

  @Column()
  date: Date;

  @Column()
  memberSince: number;

  @Column()
  point: number;

  @Column()
  online: string;

  @Column()
  personal: string;

  @Column()
  membership: string;
}
