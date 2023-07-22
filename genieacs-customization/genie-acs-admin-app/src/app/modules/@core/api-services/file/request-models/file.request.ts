export interface FileRequest {
    fileName: string;
    fileType: string;
    oui: string;
    productClass: string;
    version: string;
    file: FormData;
}
