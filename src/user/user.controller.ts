import { Controller, Get, UseGuards } from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/enums/user-role.enum';

@Controller('user')
export class UserController {
  @Get('admin')
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  adminRoute() {
    return 'Welcome Admin!';
  }

  @Get('user')
  @Roles(UserRole.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  userRoute() {
    return 'Welcome User!';
  }
}
