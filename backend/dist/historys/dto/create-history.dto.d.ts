import { RoleType } from 'src/helper/helper.enum';
export declare class CreateHistoryDto {
    target_id: string;
    createdBy: string;
    createdAt: Date;
    role: RoleType;
}
