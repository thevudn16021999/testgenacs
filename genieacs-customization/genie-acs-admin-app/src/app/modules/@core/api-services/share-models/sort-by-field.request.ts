import { SortDirections } from 'src/app/modules/@shared/enums/sort-directions.enum';

export interface SortByFieldRequest {
    fieldName: string;
    direction: SortDirections;
}
