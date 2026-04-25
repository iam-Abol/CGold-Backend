import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MetalType } from '../enums/metalType.enum';
import { PricingType } from '../enums/pricingType.enum';
import { User } from 'src/entities/user.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: MetalType,
  })
  metalType: MetalType;

  @Column({
    type: 'enum',
    enum: PricingType,
  })
  pricingType: PricingType;

  @Column('decimal', {
    precision: 15,
    scale: 3,
  })
  price: number;

  @ManyToMany(() => User, (user) => user.products)
  @JoinTable()
  brokers: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
