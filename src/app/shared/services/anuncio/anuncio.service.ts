import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { StepService } from "./step.service";
import { Tbl_anuncio } from '../../../Models/Tbl_anuncioModels';
import { ClientResponse, ClientResponseResult } from '../../../Models/ClientResponseModels';
import { map } from 'rxjs/operators';
import { FormData, DatosContacto, DatosGenerales, Apariencia, Tarifas, Servicios } from '../../../view/models/modelanuncio';
import { ConfigService } from "../Utilitarios/config.service";
import { Observable } from 'rxjs';
@Injectable() // The Injectable decorator is required for dependency injection to work
export class AnuncioService {
    private formData: FormData = new FormData();
    _baseUrl: string = '';
    constructor(
        private http: Http,
        private stepService: StepService,
        private configService: ConfigService,
    ) {
        this._baseUrl = configService.getWebApiURL();
    }
    // fetchAll() {
    //     return this.http.get('https://api.github.com/repositories').map(res => res.json());
    // }

    // login(username: string, password: string): Observable<boolean> {
    //     return this.http.post('https://localhost/login', JSON.stringify({ username, password }), {
    //         headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded'),
    //     }).map((response: Response) => {
    //         // login successful if there's a jwt token in the response
    //         const token = response.json() && response.json().token;
    //         if (token) {
    //             // set token property
    //             this.token = token;

    //             // store username and jwt token in local storage to keep user logged in between page refreshes
    //             localStorage.setItem('currentUser', JSON.stringify({ username, token }));

    //             // return true to indicate successful login
    //             return true;
    //         } else {
    //             // return false to indicate failed login
    //             return false;
    //         }
    //     });
    // }

    SavePrimerPaso(anuncio: Tbl_anuncio): Observable<ClientResponseResult<ClientResponse>> {
        //Observable<PaginatedResult<any[]>>
        //var peginatedResult: any = {};
        //var peginatedResult: ClientResponse = new Observable<ClientResponse>();

        var peginatedResult: ClientResponseResult<ClientResponse> = new ClientResponseResult<ClientResponse>();
        var headers = new Headers({
            "Content-Type": "application/json"
        });
        let options = new RequestOptions({ headers: headers });
        var a = JSON.stringify(anuncio);
        console.log(a);
        return this.http.post(this._baseUrl + 'anuncio/Primeropaso', JSON.stringify(anuncio), options).pipe(
            map(res => {
                //peginatedResult.result = JSON.parse(res.json().DataJson);
                peginatedResult = res.json();
                return peginatedResult;
            })
        );

        // this.http.post(this._baseUrl + 'parameter/sel_parameter', JSON.stringify(anuncio), options).subscribe(
        //     data => {
        //         console.log(data.json());
        //     },
        //     error => {
        //         console.log(error);
        //     }

        // );;

        // return peginatedResult;
        // return this.http.get(this._baseUrl + 'parameter/sel_parameter').pipe(
        //     map(res => {
        //         peginatedResult.result = JSON.parse(res.json().DataJson);
        //         return peginatedResult;
        //     })
        // );


        // let httpOptions = {
        //     headers: new Headers({
        //         'Content-Type': 'application/json'
        //     })
        // };
        // var peginatedResult: PaginatedResult<IComprobante[]> = new PaginatedResult<IComprobante[]>();        
        let myHeaders = new Headers();
        // myHeaders.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
        // myHeaders.append("Content-Type", 'application/json');
        //myHeaders.append("Access-Control-Allow-Origin", 'http://localhost:4200');        
        // let options = new RequestOptions({ headers: myHeaders });
        // var data = [];
        // data[0] = pagina.CurrentPage;
        // data[1] = pagina.ItemsPerPage;
        // data[2] = reporte.Serie;
        // data[3] = reporte.Numerodoc;
        // data[4] = reporte.Fecha_Ini;
        // data[5] = reporte.Fecha_Fin;
        //return this.http.post(this._baseUrl + 'listarReporte',JSON.stringify({  reportes: reporte,      paginacion: pagina }),options)
        // return this.http.post(this._baseUrl + 'ConsultarCabecera', data, options)
        //     .map(res => {
        //         //this.list = res.json();
        //         //peginatedResult.result = JSON.parse(res.json().Resultado[0]);
        //         peginatedResult.result = res.json().Resultado[0];
        //         var paginationHeader: Pagination = res.json().Resultado[1];
        //         peginatedResult.pagination = paginationHeader;
        //         return peginatedResult;
        //     })
        //     .catch(this.handleError);
    }


    SaveSegundoPaso(anuncio: Tbl_anuncio): any {
        var peginatedResult: any;
        var headers = new Headers({
            "Content-Type": "application/json"
        });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this._baseUrl + 'anuncio/Segundopaso', JSON.stringify(anuncio), options).pipe(
            map(res => {
                peginatedResult.result = JSON.parse(res.json().DataJson);
                return peginatedResult;
            })
        );
    }

    SaveTerceroPaso(anuncio: Tbl_anuncio): any {
        var peginatedResult: any;
        var headers = new Headers({
            "Content-Type": "application/json"
        });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this._baseUrl + 'anuncio/Tercerpaso', JSON.stringify(anuncio), options).pipe(
            map(res => {
                peginatedResult.result = JSON.parse(res.json().DataJson);
                return peginatedResult;
            })
        );
    }


    SaveCuartoPaso(anuncio: Tbl_anuncio): any {
        var peginatedResult: any;
        var headers = new Headers({
            "Content-Type": "application/json"
        });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this._baseUrl + 'anuncio/Cuartopaso', JSON.stringify(anuncio), options).pipe(
            map(res => {
                peginatedResult.result = JSON.parse(res.json().DataJson);
                return peginatedResult;
            })
        );
    }
    getListTipoServicio() {
        //return this.http.get('https://api.github.com/repositories').map(res => res.json());
        return [{
            codigo: 1,
            descripcion: "Los Olivos",
            flag: false
        },
        {
            codigo: 2,
            descripcion: "SMP",
            flag: false
        },
        {
            codigo: 3,
            descripcion: "Lince",
            flag: false
        },
        {
            codigo: 4,
            descripcion: 'Lima',
            flag: false
        },
        {
            codigo: 5,
            descripcion: 'La Molina',
            flag: false
        },
        {
            codigo: 6,
            descripcion: 'Callao',
            flag: false
        },
        {
            codigo: 7,
            descripcion: 'San Borja',
            flag: false
        },
        {
            codigo: 8,
            descripcion: 'Chorrillos',
            flag: false
        },
        {
            codigo: 9,
            descripcion: 'Comas',
            flag: false
        },
        {
            codigo: 10,
            descripcion: 'Pachacamac',
            flag: false
        },
        {
            codigo: 11,
            descripcion: 'SJL',
            flag: false
        },
        {
            codigo: 12,
            descripcion: 'Miraflores',
            flag: false
        }
        ];
    }

    getListFormaPago() {
        //return this.http.get('https://api.github.com/repositories').map(res => res.json());
        return [{
            codigo: 1,
            descripcion: "Efectivo",
            flag: false
        },
        {
            codigo: 2,
            descripcion: "Tarjeta Cred.",
            flag: false
        },
        {
            codigo: 3,
            descripcion: "Tranf. Banc",
            flag: false
        },

        ];
    }

    getListLugarAtencion() {
        //return this.http.get('https://api.github.com/repositories').map(res => res.json());
        return [{
            codigo: 1,
            descripcion: "Los Olivos",
            flag: false
        },
        {
            codigo: 2,
            descripcion: "SMP",
            flag: false
        },
        {
            codigo: 3,
            descripcion: "Lince",
            flag: false
        },
        {
            codigo: 4,
            descripcion: 'Lima',
            flag: false
        },
        {
            codigo: 5,
            descripcion: 'La Molina',
            flag: false
        },
        {
            codigo: 6,
            descripcion: 'Callao',
            flag: false
        },
        {
            codigo: 7,
            descripcion: 'San Borja',
            flag: false
        },
        {
            codigo: 8,
            descripcion: 'Chorrillos',
            flag: false
        },
        {
            codigo: 9,
            descripcion: 'Comas',
            flag: false
        },
        {
            codigo: 10,
            descripcion: 'Pachacamac',
            flag: false
        },
        {
            codigo: 11,
            descripcion: 'SJL',
            flag: false
        },
        {
            codigo: 12,
            descripcion: 'Miraflores',
            flag: false
        }
        ];
    }

    getListDistrito() {

        //return this.http.get('https://api.github.com/repositories').map(res => res.json());
        return [{
            codigo: 1,
            descripcion: "Los Olivos",
            flag: false
        },
        {
            codigo: 2,
            descripcion: "SMP",
            flag: false
        },
        {
            codigo: 3,
            descripcion: "Lince",
            flag: false
        },
        {
            codigo: 4,
            descripcion: 'Lima',
            flag: false
        },
        {
            codigo: 5,
            descripcion: 'La Molina',
            flag: false
        },
        {
            codigo: 6,
            descripcion: 'Callao',
            flag: false
        },
        {
            codigo: 7,
            descripcion: 'San Borja',
            flag: false
        },
        {
            codigo: 8,
            descripcion: 'Chorrillos',
            flag: false
        },
        {
            codigo: 9,
            descripcion: 'Comas',
            flag: false
        },
        {
            codigo: 10,
            descripcion: 'Pachacamac',
            flag: false
        },
        {
            codigo: 11,
            descripcion: 'SJL',
            flag: false
        },
        {
            codigo: 12,
            descripcion: 'Miraflores',
            flag: false
        }
        ];
    }
    getListEdad() {
        //return this.http.get('https://api.github.com/repositories').map(res => res.json());
        return [{
            codigo: 1,
            descripcion: "18 Años",
        },
        {
            codigo: 2,
            descripcion: "22 Años",
        },
        {
            codigo: 3,
            descripcion: "24 Años",
        },
        {
            codigo: 4,
            descripcion: '20 Años',
        }
        ];
    }
    getListPais() {
        //return this.http.get('https://api.github.com/repositories').map(res => res.json());
        return [{
            codigo: 1,
            descripcion: "Peru",
        },
        {
            codigo: 2,
            descripcion: "Venezuala",
        },
        {
            codigo: 3,
            descripcion: "Argentica",
        },
        {
            codigo: 4,
            descripcion: 'Cuba',
        }
        ];
    }
    getListEstudios() {
        //return this.http.get('https://api.github.com/repositories').map(res => res.json());
        return [{
            codigo: 1,
            descripcion: "Universitarias",
        },
        {
            codigo: 2,
            descripcion: "Enfermera",
        }
        ];
    }
    getListCabellos() {
        //return this.http.get('https://api.github.com/repositories').map(res => res.json());
        return [{
            codigo: 1,
            descripcion: "Negro",
        },
        {
            codigo: 2,
            descripcion: "Rojo",
        }
        ];
    }
    getListOjos() {
        //return this.http.get('https://api.github.com/repositories').map(res => res.json());
        return [{
            codigo: 1,
            descripcion: "Verdes Claro",
        },
        {
            codigo: 2,
            descripcion: "Gatos",
        }
        ];
    }
    getListEstatura() {
        //return this.http.get('https://api.github.com/repositories').map(res => res.json());
        return [{
            codigo: 1,
            descripcion: "150",
        },
        {
            codigo: 2,
            descripcion: "180",
        }
        ];
    }
    getListPeso() {
        //return this.http.get('https://api.github.com/repositories').map(res => res.json());
        return [{
            codigo: 1,
            descripcion: "90",
        },
        {
            codigo: 2,
            descripcion: "70",
        }
        ];
    }


    getDatosContacto(): DatosContacto {
        var datoscontacto: DatosContacto = {
            txt_nombre: this.formData.txt_nombre,
            txt_telefono1: this.formData.txt_telefono1,
            txt_telefono2: this.formData.txt_telefono2,
            txt_web: this.formData.txt_web,
            txt_email: this.formData.txt_email,
            txt_descripcion_contacto: this.formData.txt_descripcion_contacto
        };
        return datoscontacto;
    }

    setDatosContacto(data: any) {

        this.formData.txt_nombre = data.username;
        this.formData.txt_email = data.email;
        this.formData.txt_telefono1 = data.telefono1;
        this.formData.txt_telefono2 = data.telefono2;
        this.formData.txt_web = data.web;
    }

    getFormData(): FormData {
        var formData: FormData = {
            //Datos Contacto
            txt_nombre: 'Segundo Mike ',
            txt_telefono1: '997233662',
            txt_telefono2: '997233662',
            txt_email: 'ccarhuas@gmail.com',
            txt_web: 'www.hotmail.com',
            txt_descripcion_contacto: '',

            //Datos Generales
            cbo_edad: '1',
            cbo_pais_origen: '1',
            cbo_estudio: '1',
            txt_descripcion_generales: 'Explica un poco más sobre ti. Aquí puedes presentarte a los futuros clientes, descríbete un poco mejor, explica cómo eres, que te gusta, tus aficiones y habilidades. ¿Porqué deben llamarte? Cualquier otra cosa que creas es importante, esta es tu oportunidad!',

            //Apariencia
            cbo_cabello: '1',
            cbo_ojos: '1',
            cbo_estatura: '1',
            cbo_peso: '1',
            txt_busto: '12',
            txt_cintura: '12',
            txt_cadera: '12',
            txt_descripcion_apariencia: 'bueno bueno bueno bueno',

            //Tarifa 
            txt_30_min: 0,
            txt_45_min: 0,
            txt_1_hora: 0,
            txt_1_30_hora: 0,
            txt_2_hora: 0,
            txt_3_hora: 0,
            txt_salida: 0,
            txt_toda_noche: 0,
            txt_viajes: 0,
            txt_descripcion_tarifas: 'bueno bueno bueno bueno',
            ListFormaPago: [],

            ListDistrito: [],
            ListLugar: [],
            ListServicios: [],
            algosobredisponibilidad: 'bueno bueno bueno ',
            txt_descripcion_servicios: 'bueno bueno bueno',
            flagatiende24horas: true,
        }
        return formData;
    }

    getDatosGenerales(): DatosGenerales {
        var datosgenerales: DatosGenerales = {
            cbo_edad: this.formData.cbo_edad,
            cbo_pais_origen: this.formData.cbo_pais_origen,
            cbo_estudio: this.formData.cbo_estudio,
            txt_descripcion_generales: this.formData.txt_descripcion_generales,
        };
        return datosgenerales;
    }

    setDatosGenerales(data: any) {
        this.formData.cbo_edad = data.edad;
        this.formData.cbo_pais_origen = data.pais;
        this.formData.cbo_estudio = data.estudios;
        this.formData.txt_descripcion_generales = data.descripciongenerales;
    }


    getApariencia(): Apariencia {

        var apariencia: Apariencia = {
            cbo_cabello: this.formData.cbo_cabello,
            cbo_ojos: this.formData.cbo_ojos,
            cbo_estatura: this.formData.cbo_estatura,
            cbo_peso: this.formData.cbo_peso,
            txt_busto: this.formData.txt_busto,
            txt_cintura: this.formData.txt_cintura,
            txt_cadera: this.formData.txt_cadera,
            txt_descripcion_apariencia: this.formData.txt_descripcion_apariencia
        };
        return apariencia;
    }

    setApariencia(data: any) {
        this.formData.cbo_cabello = data.cabello;
        this.formData.cbo_ojos = data.ojos;
        this.formData.cbo_estatura = data.estatura;
        this.formData.cbo_peso = data.peso;
        this.formData.txt_cintura = data.cintura;
        this.formData.txt_cadera = data.cadera;
        this.formData.txt_busto = data.busto;
        this.formData.txt_descripcion_apariencia = data.descripcionapariencia;
    }


    getTarifas(): Tarifas {
        var tarifas: Tarifas = {
            txt_30_min: this.formData.txt_30_min,
            txt_45_min: this.formData.txt_45_min,
            txt_1_hora: this.formData.txt_1_hora,
            txt_1_30_hora: this.formData.txt_1_30_hora,
            txt_2_hora: this.formData.txt_2_hora,
            txt_3_hora: this.formData.txt_3_hora,
            txt_salida: this.formData.txt_salida,
            txt_toda_noche: this.formData.txt_toda_noche,
            txt_viajes: this.formData.txt_viajes,
            txt_descripcion_tarifas: this.formData.txt_descripcion_tarifas,
            ListFormaPago: this.formData.ListFormaPago
        };
        return tarifas;
    }

    setTarifa(data: any) {
        this.formData.txt_30_min = data.txt_30_min;
        this.formData.txt_45_min = data.txt_45_min;
        this.formData.txt_1_hora = data.txt_1_hora;
        this.formData.txt_1_30_hora = data.txt_1_30_hora;
        this.formData.txt_2_hora = data.txt_2_hora;
        this.formData.txt_3_hora = data.txt_3_hora;
        this.formData.txt_salida = data.txt_salida;
        this.formData.txt_toda_noche = data.txt_toda_noche;
        this.formData.txt_viajes = data.txt_viajes;
        this.formData.txt_descripcion_tarifas = data.txt_descripcion_tarifas;
        this.formData.ListFormaPago = data.ListFormaPago;
    }


    getServicios(): Servicios {
        var servicios: Servicios = {
            ListDistrito: this.formData.ListDistrito,
            ListLugar: this.formData.ListLugar,
            ListServicios: this.formData.ListServicios,
            algosobredisponibilidad: this.formData.algosobredisponibilidad,
            txt_descripcion_servicios: this.formData.txt_descripcion_servicios,
            flagatiende24horas: this.formData.flagatiende24horas
        };
        return servicios;
    }

    setServicios(data: any) {
        this.formData.ListDistrito = data.ListDistrito;
        this.formData.ListLugar = data.ListLugar;
        this.formData.ListServicios = data.ListServicios;
        this.formData.algosobredisponibilidad = data.algosobredisponibilidad;
        this.formData.txt_descripcion_servicios = data.txt_descripcion_servicios;
        this.formData.flagatiende24horas = data.flagatiende24hora;
    }


    segundopaso(flag: boolean) {
        this.stepService.activaStep2(flag);
    }
    tercerpaso(flag: boolean) {
        this.stepService.activaStep3(flag);
    }
    cuartopaso(flag: boolean) {
        this.stepService.activaStep4(flag);
    }
    quintopaso(flag: boolean) {
        this.stepService.activaStep5(flag);
    }
    sextopaso(flag: boolean) {
        this.stepService.activaStep6(flag);
    }



}