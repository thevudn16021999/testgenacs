export class EntityLookupResponse {
    constructor(
        public Id: string = '',
        public Code: string = '',
        public Name: string = '',
        public ParentId: string | undefined = ''
    ) {}

    static from(
        item?: EntityLookupResponse,
        parentId?: string
    ): EntityLookupResponse {
        if (!item) {
            return EntityLookupResponse.createEmpty();
        }
        return new EntityLookupResponse(
            item.Id,
            item.Code,
            item.Name,
            parentId
        );
    }

    static createEmpty() {
        return new EntityLookupResponse('', '', '');
    }

    static createIfNotEmpty(id?: string, code?: string, name?: string) {
        if (!id) return null;
        return new EntityLookupResponse(id, code, name);
    }

    static createOptionsWithEmpty(items: EntityLookupResponse[] = []) {
        return [EntityLookupResponse.createEmpty(), ...items];
    }
}
