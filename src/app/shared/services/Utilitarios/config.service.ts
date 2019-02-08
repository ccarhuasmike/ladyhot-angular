import { Injectable } from '@angular/core';
@Injectable()
export class ConfigService {
    _webApi: string;
    constructor() {
        this._webApi="http://10.226.41.250/lady/api/";        
        // this._webApi = "http://localhost:7044/api/";
    }
    getWebApiURL() {
        return this._webApi;
    }
}