import { RoleType } from 'src/helper/helper.enum';
export declare class DeleteHistoryDto {
    target_id: string;
    deletedBy: string;
    deletedAt: Date;
    role: RoleType;
}
