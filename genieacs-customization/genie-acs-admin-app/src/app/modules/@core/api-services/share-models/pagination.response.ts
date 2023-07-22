export interface PaginationResponse<T> {
    Count: number;
    Offset: number;
    Limit: number;
    Total: number;
    Items: T[];
}

export const PaginationResponseBuilder = (
    options: Partial<PaginationResponse<any>>
) => {
    return Object.assign(
        {},
        {
            Count: 0,
            Offset: 0,
            Limit: 0,
            Total: 0,
            Items: [],
        },
        options
    ) as PaginationResponse<any>;
};
