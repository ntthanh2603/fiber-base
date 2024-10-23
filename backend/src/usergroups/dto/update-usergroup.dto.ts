import { PartialType } from '@nestjs/swagger';
import { CreateUsergroupDto } from './create-usergroup.dto';

export class UpdateUsergroupDto extends PartialType(CreateUsergroupDto) {}
