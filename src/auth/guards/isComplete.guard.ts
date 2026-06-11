import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';

@Injectable()
export class IsProfileComplete implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (!user) {
          throw new ForbiddenException('User not found');
        }

    if (!user.isProfileComplete){
        throw new ForbiddenException('complete your profile to access this section!');
    }

    return true
  }
}
