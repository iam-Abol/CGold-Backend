import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { UserRole } from 'src/enums/user-role.enum';
import { FindOneOptions, Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}
  async findByPhone(phone: string) {
    return this.repo.findOne({ where: { phone } });
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
}
