import { RoleType } from 'src/helper/helper.enum';
export declare class UpdateHistoryDto {
    target_id: string;
    updatedBy: string;
    updatedAt: Date;
    role: RoleType;
}
