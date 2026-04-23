import {
  Body,
  Controller,
  Param,
  ParseIntPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/enums/user-role.enum';
import { UpdateUserRoleDto } from 'src/user/dtos/updateUserRole.dto';
import { AdminService } from './admin.service';

@Controller('admin')
@Roles(UserRole.ADMIN)
@UseGuards(JwtAuthGuard, RolesGuard)
export class AdminController {
  constructor(private adminService: AdminService) {}

  @Patch('users/:id/role')
  updateUserRole(@Param('id') id: string, @Body() { role }: UpdateUserRoleDto) {
    return this.adminService.updateUserRole(id, role);
  }
}
