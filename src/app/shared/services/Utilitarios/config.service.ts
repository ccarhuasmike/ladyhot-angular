import { Injectable } from '@angular/core';
@Injectable()
export class ConfigService {
    _webApi: string;
    _webDomain: string;
    constructor() {
        //this._webApi = "http://192.168.0.31/webapiladyhot/api/";
        this._webApi = "http://localhost:7044/api/";        
        //this._webApi = "http://danteccarhuas-002-site2.ftempurl.com/api/";
        //this._webApi = "https://webapigologolos.gologolos.com/api/";
        this._webDomain = "https://www.gologolos.com/";
        //this._webDomain = "http://localhost:4200/";
    }
    getWebApiURL() {
        return this._webApi;
    }
    getWebDomainURL() {
        return this._webDomain;
    }
}