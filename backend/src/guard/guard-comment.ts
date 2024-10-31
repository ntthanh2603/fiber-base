import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class CommentGuard implements CanActivate {
  constructor() {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const body = request.body;
    const user = request.user;
    console.log('>> user', user);
    console.log('>> body', body);

    return false;
  }
}
