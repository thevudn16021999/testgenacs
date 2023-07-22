export interface BaseEntityResponse {
    Id: string;
    IsDeleted: boolean;
    CreatedDate: Date;
    CreatedBy: string;
    UpdatedDate?: Date;
    UpdatedBy: string;
}
