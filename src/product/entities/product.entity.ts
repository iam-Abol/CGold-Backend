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

  @Column({ nullable: true })
  code: string;

  @Column('decimal', { precision: 12, scale: 3, default: 0 })
  weight: number;
  @Column('decimal', { precision: 5, scale: 3, default: 0 })
  purity: number;
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

  @Column('decimal', { precision: 20, scale: 2, default: 0 })
  marketPrice: number;

  @Column('decimal', { precision: 20, scale: 2, default: 0 })
  buyPrice: number;

  @Column('decimal', { precision: 20, scale: 2, default: 0 })
  sellPrice: number;

  @ManyToMany(() => User, (user) => user.products)
  @JoinTable()
  brokers: User[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
