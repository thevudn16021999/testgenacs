interface SortByField {
    fieldName: string;
    direction: SortDirections;
}

export enum SortDirections {
    Asc = 2,
    Desc = -2,
    null = 1,
}

export const sortBuilder = (multiSortMeta: any) => {
    const rawSorts = (multiSortMeta || []) as {
        field: string;
        order: 1 | -1;
    }[];
    const sorts: SortByField[] = rawSorts.map((r) => ({
        fieldName: r.field,
        direction: r.order > 0 ? SortDirections.Asc : SortDirections.Desc,
    }));

    return sorts;
};
