import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { UserRole } from '../enums/user-role.enum';
import { Product } from 'src/product/entities/product.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  phone: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column({ nullable: true })
  refreshTokenHash: string;

  @ManyToMany(() => Product, (product) => product.brokers)
  products: Product[];

  @Column({ default: true })
  isActive: boolean;

  @Column({ default: false })
  isProfileComplete: boolean;
}
