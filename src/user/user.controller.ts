import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/enums/user-role.enum';
import { UserService } from './user.service';
import { SetActiveDto } from './dtos/setActive.dto';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

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

  @Patch('/active')
  @Roles(UserRole.BROKER, UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  setActive(@Req() req: any, @Body() body: SetActiveDto) {
    return this.userService.setActiveStatus(req.user.id, body.isActive);
  }
}
