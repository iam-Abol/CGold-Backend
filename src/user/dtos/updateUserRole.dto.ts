import { IsEnum, IsString } from 'class-validator';
import { UserRole } from 'src/enums/user-role.enum';

export class UpdateUserRoleDto {
  @IsEnum(UserRole)
  role: UserRole;

  @IsString()
  id: string;
}
