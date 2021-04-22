import { Injectable } from '@angular/core';
@Injectable()
export class ConfigService {
    _webApi: string;
    constructor() {
        //this._webApi = "http://192.168.0.14/webapiladyhot/api/";
        this._webApi = "http://localhost:7044/api/";        
        //this._webApi = "http://danteccarhuas-001-site1.ftempurl.com/api/";
    }
    getWebApiURL() {
        return this._webApi;
    }
}