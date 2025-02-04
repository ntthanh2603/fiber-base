import { Module } from '@nestjs/common';
import { LocalStrategy } from './passpost/local.strategy';
import { JwtStrategy } from './passpost/jwt.strategy';

@Module({
  imports: [],
  controllers: [],
  providers: [LocalStrategy, JwtStrategy],
  exports: [],
})
export class AuthModule {}
