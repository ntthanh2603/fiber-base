import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class CommentGuard implements CanActivate {
  constructor() {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    return false;
  }
}
