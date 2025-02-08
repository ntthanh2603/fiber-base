import { Injectable } from '@nestjs/common';
import { RelationShip } from './entities/relation-ship.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RelationShipDto } from './dto/relation-ship.dto';
import { IUser } from 'src/users/users.interface';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class RelationShipsService {
  constructor(
    @InjectRepository(RelationShip)
    private relationShipRepository: Repository<RelationShip>,
    private redisService: RedisService,
  ) {}
  async follow(user: IUser, dto: RelationShipDto) {
    try {
      const user_id: string = user.id;
      const user_id_other: string = dto.user_id_other;

      // const list_followed_user = await this.redisService.get(
      //   `list_followed:${user_id}`,
      // );

      const newRelationShip = {
        user_id1: user_id,
        user_id2: user_id_other,
      };
      await this.relationShipRepository.insert(newRelationShip);
    } catch (error) {
      console.error('Error when follow: ', error);
    }
  }

  async unfollow(dto: RelationShipDto) {}

  async listFollower(id: string) {
    try {
      const list_follower_cache = await this.redisService.get(
        `list_follower:${id}`,
      );
      if (list_follower_cache) {
        return list_follower_cache;
      }

      const temp = await this.relationShipRepository.find({
        where: { user_id2: id },
      });

      const list_follower_db = temp.map((relation) => relation.user_id1);

      await this.redisService.set(`list_follower:${id}`, list_follower_db, 600);
      return list_follower_db;
    } catch (error) {
      console.error('Error in function listFollower', error);
    }
  }
}
