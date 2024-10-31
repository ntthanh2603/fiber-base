import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { GroupUsersService } from 'src/groupusers/groupusers.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostGuard implements CanActivate {
  constructor(
    private usersService: UsersService,
    private groupusersService: GroupUsersService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const body = request.body;
    const user = request.user;
    console.log('>> user', user);
    console.log('>> body', body);

    return false;
  }
}
