import { Injectable } from '@nestjs/common';
import { UserRole } from 'src/enums/user-role.enum';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AdminService {
  constructor(private usersService: UserService) {}

  async updateUserRole(userId: string, role: UserRole) {
    // console.log('herearefasd');
    return this.usersService.updateRole(userId, role);
  }
}
