import {
  Injectable,
  CanActivate,
  ExecutionContext,
  Body,
} from '@nestjs/common';
import { RelationshipType } from 'src/helper/helper.enum';
import { RelationshipsService } from 'src/relationships/relationships.service';

@Injectable()
export class FriendRelationshipGuard implements CanActivate {
  constructor(private relationshipsService: RelationshipsService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const user = request.user;
    const body = request.body;

    const relationship = await this.relationshipsService.findRelationship(
      user.user_id,
      body.user_id,
    );

    if (!relationship) return false;

    return relationship.relationship == RelationshipType.FRIEND ? true : false;
  }
}
