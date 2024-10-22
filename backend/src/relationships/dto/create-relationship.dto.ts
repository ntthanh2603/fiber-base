import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { RelationshipType } from 'src/helper/helper.enum';

export class CreateRelationshipDto {
  @IsString()
  @IsNotEmpty({ message: 'ID user 1 not null' })
  user1_id: string;

  @IsNotEmpty({ message: 'ID user 2 not null' })
  @IsString()
  user2_id: string;

  @IsEnum(RelationshipType)
  @IsNotEmpty({ message: 'Relationship not null' })
  @ApiProperty({ example: RelationshipType.FRIEND })
  relationship: RelationshipType;
}
