import { Expose } from 'class-transformer';
import { UserRole } from 'src/enums/user-role.enum';

export class UserResponseDto {
  @Expose()
  id: number;

  @Expose()
  phone: string;

  @Expose()
  role: UserRole;

  @Expose()
  isActive: boolean;
}
