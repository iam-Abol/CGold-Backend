import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { UserRole } from 'src/enums/user-role.enum';
import { UserService } from './user.service';
import { SetActiveDto } from './dtos/setActive.dto';
import { CompleteProfileDto } from './dtos/completeProfile.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageStorage } from 'src/logger/common/image.config';
import type { Response } from 'express';
import { join } from 'path';

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

  @Get()
  @Roles(UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  getAll() {
    return this.userService.getAll();
  }
  @Patch('/profile')
  @UseGuards(JwtAuthGuard)
  completeProfile(@Req() req: any, @Body() body: CompleteProfileDto) {
    console.log('udpateing profile');
    return this.userService.completeProfile(req.user.id, body);
  }

  @Patch('/active')
  @Roles(UserRole.BROKER, UserRole.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  setActive(@Req() req: any, @Body() body: SetActiveDto) {
    return this.userService.setActiveStatus(req.user.id, body.isActive);
  }

  @Post('upload-image')
  // @UseInterceptors(FileInterceptor('image', { storage: imageStorage }))
  upload(@Req() req) {
    return { success: true };
    // console.log(file);
    // console.log('fjsdaklfjdsakfj; + + ++ + ++');
    // return this.userService.uploadImage(req.user.is, file);
  }

  @Get('users/:id/national-card')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  async getNationalCard(@Param('id') id: string, @Res() res: Response) {
    const user = await this.userService.findById(id);

    if (!user) {
      throw new NotFoundException('User not found');
    }
    return res.sendFile(user.nationalCardImage, {
      root: join(process.cwd(), 'uploads/national-cards'),
    });
  }
}
