import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from 'src/decorator/customize';

/*
  - Bảo vệ các route yêu cầu xác thực JWT, cho phép bỏ qua các route được đánh dấu là public.
*/
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  /*************  ✨ Codeium Command ⭐  *************/
  /**
   * CanActivate method to check if the current route is public or not.
   * If the route is public, it will bypass the authentication process.
   * If the route is not public, it will check if the user is authenticated.
   * @param context The execution context of the request.
   * @returns true if the user is authenticated and allowed to access the route.
   *          false if the user is not authenticated or the route is not public.
   */
  /******  3108b462-82ee-4b00-bcf0-e26c4709ab3c  *******/
  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }

  /*************  ✨ Codeium Command ⭐  *************/
  /**
   * This method is called when the authentication process completes.
   * If an error occurred or the user is not authenticated, it will throw an exception.
   * If the user is authenticated, it will return the user object.
   * @param err The error that occurred during the authentication process.
   * @param user The authenticated user.
   * @param info Additional information provided by the authentication strategy.
   * @returns The authenticated user if the authentication process was successful.
   *          Otherwise, it will throw an exception.
   */
  /******  0c9ce90c-335a-4c7e-99be-072d02e22adc  *******/
  handleRequest(err, user, info) {
    if (err || !user) {
      throw err || new UnauthorizedException('Token invalid');
    }
    return user;
  }
}
