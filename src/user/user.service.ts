import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserRole } from 'src/enums/user-role.enum';
import { FindOneOptions, In, Repository } from 'typeorm';
import { CompleteProfileDto } from './dtos/completeProfile.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}
  
  async findByPhone(phone: string) {
    return this.repo.findOne({ where: { phone } });
  }

  async findById(id: string) {
    const numericId = Number(id);
    if (isNaN(numericId)) {
      throw new Error('Invalid ID format');
    }
    const record = await this.repo.findOneBy({ id: numericId });
    return record;
  }

  async create(phone: string) {
    const user = this.repo.create({ phone });
    return this.repo.save(user);
  }

  async save(user: User) {
    return this.repo.save(user);
  }

  async findOne(options: FindOneOptions<User>) {
    return this.repo.findOne(options);
  }

  async createFirstAdmin(phone: string) {
    let user = await this.findByPhone(phone);

    if (!user) user = await this.create(phone);

    user.role = UserRole.ADMIN;

    await this.repo.save(user);
  }

  async updateRole(id: string, newRole: UserRole) {
    const user = await this.findById(id);
    if (!user) throw new NotFoundException('User not found');
    user.role = newRole;
    return this.save(user);
  }

  findByIds(ids: number[]) {
    return this.repo.findBy({ id: In(ids) });
  }

  async setActiveStatus(id: string, status: boolean) {
    const user = await this.findById(id);
    if (!user) throw new NotFoundException('User not found');

    user.isActive = status;

    return this.repo.save(user);
  }

  async completeProfile(id: string, dto: CompleteProfileDto){
    const user = await this.findById(id);
    if (!user) throw new NotFoundException('User not found');

    Object.assign(user, dto);

    user.isProfileComplete = true;

    return await this.repo.save(user);
  }
}
