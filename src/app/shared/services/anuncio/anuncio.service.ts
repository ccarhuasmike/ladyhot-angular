import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { StepService } from "./step.service";
import { FormData, DatosContacto, DatosGenerales, Apariencia, Tarifas } from '../../../view/models/modelanuncio';
@Injectable() // The Injectable decorator is required for dependency injection to work
export class AnuncioService {
    private formData: FormData = new FormData();
    constructor(private http: Http, private stepService: StepService) {
    }
    // fetchAll() {
    //     return this.http.get('https://api.github.com/repositories').map(res => res.json());
    // }
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

    getDatosGenerales(): DatosGenerales {
        // Return the Personal data
        var datosgenerales: DatosGenerales = {
            cbo_edad: this.formData.cbo_edad,
            cbo_pais_origen: this.formData.cbo_pais_origen,
            cbo_estudio: this.formData.cbo_estudio,
            txt_descripcion_generales: this.formData.txt_descripcion_generales,
        };
        return datosgenerales;
    }

    setDatosGenerales(data: any) {

        // edad: this.datosgenerales.cbo_edad,
        // pais: this.datosgenerales.cbo_pais_origen,
        // estudios: this.datosgenerales.cbo_estudio

        this.formData.cbo_edad = data.edad;
        this.formData.cbo_pais_origen = data.pais;
        this.formData.cbo_estudio = data.estudios;
        this.formData.txt_descripcion_generales = '';
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
        this.formData.txt_descripcion_apariencia = "";
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
            txt_descripcion_tarifas: this.formData.txt_descripcion_apariencia,
            ListFormaPago: this.formData.ListFormaPago

        };
        return tarifas;
    }

    setTarifa(data: any) {
        debugger;

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



}