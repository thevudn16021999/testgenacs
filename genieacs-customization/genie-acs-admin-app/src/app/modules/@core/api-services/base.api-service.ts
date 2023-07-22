import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

export class BaseApiService {
    protected baseUrl = environment.baseUrl;
    protected uploadBaseUrl = '';
    constructor(protected readonly http: HttpClient) {}
    protected gethHttpParamBuilder = () => new HttpParams();
    protected gethHttpHeaderBuilder = () => new HttpHeaders();
}
