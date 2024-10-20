import { RoleType } from 'src/helper/helper.enum';
export declare class History {
    history_id: string;
    target_id: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
    createdBy: string;
    updatedBy: string;
    deletedBy: string;
    role: RoleType;
}
