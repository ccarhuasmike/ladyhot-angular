import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { FormData, DatosContacto, DatosGenerales, Apariencia, Tarifas, Servicios, ModelCarga } from "../../../models/modelanuncio";
import { AnuncioService } from "../../../../shared/services/anuncio/anuncio.service";
import { Tbl_anuncio } from 'src/app/Models/Tbl_anuncioModels';
import { ClientResponseResult } from 'src/app/Models/ClientResponseModels';

import { ConfigService } from 'src/app/shared/services/Utilitarios/config.service';
import { ActivatedRoute } from '@angular/router';
import { ParameterService } from "../../../../shared/services/anuncio/parameter.service";
import { PaginatedResult } from '../../../../Models/Tbl_parameter_detModels';
@Component({
    selector: 'app-editanuncio',
    templateUrl: './editanuncio.component.html',
    styleUrls: ['./editanuncio.component.css']
})
export class EditarAnuncioComponent implements OnInit {
    FormData: FormData;
    fromGenerales: FormGroup;
    isSubmitted: boolean = false;
    _baseUrl: string = '';

    //Controles Datos de Contacto
    txt_nombre_fichaCtrl: FormControl;
    emailCtrl: FormControl;
    WebCtrl: FormControl;
    Telefono1Ctrl: FormControl;
    Telefono2Ctrl: FormControl;
    //Datos Generales
    edadCtrl: FormControl;
    paisCtrl: FormControl;
    estudiosCtrl: FormControl;
    txt_descripcion_generalesCtrl: FormControl;

    //Controles Apariencia
    bustoCtrl: FormControl;
    cinturaCtrl: FormControl;
    caderaCtrl: FormControl;
    cabellosCtrl: FormControl;
    ojosCtrl: FormControl;
    estaturaCtrl: FormControl;
    pesoCtrl: FormControl;
    descripcionaparienciaCtrl: FormControl;
    //Controles Tarifas
    txt_30_minCtrl: FormControl;
    txt_45_minCtrl: FormControl;
    txt_1_horaCtrl: FormControl;
    txt_1_30_horaCtrl: FormControl;
    txt_2_horaCtrl: FormControl;
    txt_3_horaCtrl: FormControl;
    txt_salidaCtrl: FormControl;
    txt_toda_nocheCtrl: FormControl;
    txt_viajesCtrl: FormControl;
    txt_descripcion_tarifasCtrl: FormControl;
    controls: any;
    //Controles Tarifa
    formapagoCtrl: FormArray;
    ListFormaPago: any = [];
    //Controles Servicios
    controlsDist: any;
    controlsLugar: any;
    controlsTipServ: any;
    flagatiende24horasCtrl: FormControl;
    txtalgosobredispCtrl: FormControl;
    txt_descripcion_serviciosCtrl: FormControl;

    //Registro de Expresiones
    RegEx_mailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
    RegEx_web = "^(http[s]?:\\/\\/){0,1}(www\\.){0,1}[a-zA-Z0-9\\.\\-]+\\.[a-zA-Z]{2,5}[\\.]{0,1}$";
    RegEx_Telefono = "^[679]{1}[0-9]{8}$";

    ListEdad: any = [];
    ListPais: any = [];
    ListEstudios: any = [];
    ListCabellos: any = [];
    ListOjos: any = [];
    ListEstatura: any = [];
    ListPeso: any = [];

    ListDistrito: any = [];
    ListLugarAtencion: any = [];
    ListTipoServicio: any = [];

    //objeto obtener datos del anuncio
    datosAnuncio: any;
    listParameter: any;

    constructor(
        private anuncioService: AnuncioService,
        private route: ActivatedRoute,
        private parameter: ParameterService,
        private configService: ConfigService) {
        this._baseUrl = configService.getWebApiURL();
    }

    ngOnInit() {
        //debugger;
        this.cargarControles();

        this.anuncioService.getAnuncioPorId(this.route.params["value"]["id"]).subscribe(
            (res: ClientResponseResult<any>) => {
                this.datosAnuncio = res.result;
                this.parameter.getParameter().subscribe(
                    (res: PaginatedResult<any[]>) => {
                        debugger;
                        this.listParameter = res.result; // aqui se obtiene los paramter de la base de datos                
                        this.ListEdad = this.listParameter.edad;//this.anuncioService.getListEdad();
                        this.ListPais = this.listParameter.pais;//this.anuncioService.getListPais();
                        this.ListEstudios = this.listParameter.estudios;//this.anuncioService.getListEstudios();

                        this.fromGenerales.patchValue({
                            //     username: this.FormData.txt_nombre,
                            //     email: this.FormData.txt_email,
                            //     web: this.FormData.txt_web,
                            //     telefono1: this.FormData.txt_telefono1,
                            //     telefono2: this.FormData.txt_telefono2,
                            //     edad: this.FormData.cbo_edad,
                            //     pais: this.FormData.cbo_pais_origen,
                            //     estudios: this.FormData.cbo_estudio,
                            //     descripciongenerales: this.FormData.txt_descripcion_generales,
                            //     busto: this.FormData.txt_busto,
                            //     cintura: this.FormData.txt_cintura,
                            //     cadera: this.FormData.txt_cadera,
                            //     cabello: this.FormData.cbo_cabello,
                            //     ojos: this.FormData.cbo_ojos,
                            //     estatura: this.FormData.cbo_estatura,
                            //     peso: this.FormData.cbo_peso,
                            //     descripcionapariencia: this.FormData.txt_descripcion_apariencia,
                            //     txt_30_min: this.FormData.txt_30_min,
                            //     txt_45_min: this.FormData.txt_45_min,
                            //     txt_1_hora: this.FormData.txt_1_hora,
                            //     txt_1_30_hora: this.FormData.txt_1_30_hora,
                            //     txt_2_hora: this.FormData.txt_2_hora,
                            //     txt_3_hora: this.FormData.txt_3_hora,
                            //     txt_salida: this.FormData.txt_salida,
                            //     txt_toda_noche: this.FormData.txt_toda_noche,
                            //     txt_viajes: this.FormData.txt_viajes,
                            //     txt_descripcion_tarifas: this.FormData.txt_descripcion_tarifas,
                            //     algosobredisponibilidad: this.FormData.algosobredisponibilidad,
                            //     txt_descripcion_servicios: this.FormData.txt_descripcion_servicios,
                        });
                        // this.ListCabellos = this.anuncioService.getListCabellos();
                        // this.ListOjos = this.anuncioService.getListOjos();
                        // this.ListEstatura = this.anuncioService.getListEstatura();
                        // this.ListPeso = this.anuncioService.getListPeso();
                        // this.ListDistrito = this.anuncioService.getListDistrito();
                        // this.ListLugarAtencion = this.anuncioService.getListLugarAtencion();
                        // this.ListTipoServicio = this.anuncioService.getListTipoServicio();

                    }
                );
            });
    }
    selectName() {

    }

    onChangeDistrito(codigo: number, isChecked: boolean) {

        let index = this.ListDistrito.findIndex(x => x.codigo === codigo);
        if (isChecked) {
            this.ListDistrito[index].flag = isChecked;
        } else {
            this.ListDistrito[index].flag = isChecked;
        }
    }
    onChangeFormaPago(codigo: number, isChecked: boolean) {

        let index = this.ListFormaPago.findIndex(x => x.codigo === codigo);
        if (isChecked) {
            this.ListFormaPago[index].flag = isChecked;
        } else {
            this.ListFormaPago[index].flag = isChecked;
        }
    }

    onChangeLugarAtencion(codigo: number, isChecked: boolean) {

        let index = this.ListLugarAtencion.findIndex(x => x.codigo === codigo);
        if (isChecked) {
            this.ListLugarAtencion[index].flag = isChecked;
        } else {
            this.ListLugarAtencion[index].flag = isChecked;
        }
    }

    onChangeTipoServicio(codigo: number, isChecked: boolean) {

        let index = this.ListTipoServicio.findIndex(x => x.codigo === codigo);
        if (isChecked) {
            this.ListTipoServicio[index].flag = isChecked;
        } else {
            this.ListTipoServicio[index].flag = isChecked;
        }
    }

    setCheboxes(listCargados: any, listSeleccionado: ModelCarga[], controls: any) {
        for (let index = 0; index < listSeleccionado.length; index++) {
            for (let index1 = 0; index1 < listCargados.length; index1++) {
                if (listSeleccionado[index].codigo == listCargados[index1].codigo) {
                    listCargados[index1].flag = true;
                    this.controls[index1].setValue(true);
                }
            }
        }
    }
    minSelectedCheckboxes(min = 1) {
        const validator: ValidatorFn = (formArray: FormArray) => {
            const totalSelected = formArray.controls
                .map(control => control.value)
                .reduce((prev, next) => next ? prev + next : prev, 0);

            return totalSelected >= min ? null : { required: true };
        };
        return validator;
    }
    save() {
        // this.isSubmitted = true;
        // if (!this.fromContacto.valid)
        //     return;
        // this.anuncioService.setDatosContacto(this.fromContacto.value)
        // this.router.navigate(['DashboardAnuncion/nuevoanuncio/datos-generales']);
        //this.router.navigate(['datos-generales'])

        // this.router.navigate(['./datos-generales']);
        // Code to save the data
        // userService.Save(this.register.value);
        // this.result = this.fromContacto.value;
        // setTimeout(() => {
        //     this.result = null;
        //     this.reset();
        // }, 2000);
    }

    cargarControles() {
        //Controles Datos de Contacto
        this.txt_nombre_fichaCtrl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]);
        this.Telefono1Ctrl = new FormControl('', [Validators.required, Validators.pattern(this.RegEx_Telefono)]);
        this.Telefono2Ctrl = new FormControl('', [Validators.required, Validators.pattern(this.RegEx_Telefono)]);
        this.emailCtrl = new FormControl('', [Validators.required, Validators.pattern(this.RegEx_mailPattern)]);
        this.WebCtrl = new FormControl('', [Validators.pattern(this.RegEx_web)]);

        //Controles Datos Generales
        this.edadCtrl = new FormControl('', [Validators.required]);
        this.paisCtrl = new FormControl('', [Validators.required]);
        this.estudiosCtrl = new FormControl('', [Validators.required]);
        this.txt_descripcion_generalesCtrl = new FormControl('', [Validators.required, Validators.minLength(50), Validators.maxLength(500)]);

        // //Controles Apariencia
        this.cabellosCtrl = new FormControl('', [Validators.required]);
        this.ojosCtrl = new FormControl('', [Validators.required]);
        this.estaturaCtrl = new FormControl('', [Validators.required]);
        this.pesoCtrl = new FormControl('', [Validators.required]);
        this.bustoCtrl = new FormControl('', [Validators.required]);
        this.cinturaCtrl = new FormControl('', [Validators.required]);
        this.caderaCtrl = new FormControl('', [Validators.required]);
        this.descripcionaparienciaCtrl = new FormControl('', [Validators.maxLength(450)]);

        //Controles Tarifas
        this.txt_30_minCtrl = new FormControl('', [Validators.required]);
        this.txt_45_minCtrl = new FormControl('', [Validators.required]);
        this.txt_1_horaCtrl = new FormControl('', [Validators.required]);
        this.txt_1_30_horaCtrl = new FormControl('', [Validators.required]);
        this.txt_2_horaCtrl = new FormControl('', [Validators.required]);
        this.txt_3_horaCtrl = new FormControl('', [Validators.required]);
        this.txt_salidaCtrl = new FormControl('', [Validators.required]);
        this.txt_toda_nocheCtrl = new FormControl('', [Validators.required]);
        this.txt_viajesCtrl = new FormControl('', [Validators.required]);
        this.txt_descripcion_tarifasCtrl = new FormControl('', []);
        //this.ListFormaPago = this.anuncioService.getListFormaPago();
        this.controls = this.ListFormaPago.map(c => new FormControl(false));
        //this.controls[0].setValue(true);

        // // if (typeof this.FormData.ListFormaPago === 'undefined' || this.FormData.ListFormaPago === null || this.FormData.ListFormaPago.length === 0) {
        // //     this.ListFormaPago[0].flag = true;
        // // } else {
        // //     this.setCheboxes(this.ListFormaPago, this.FormData.ListFormaPago, this.controls);
        // // }

        this.controlsDist = this.ListDistrito.map(c => new FormControl(false));
        // // this.controlsDist[0].setValue(true);
        this.controlsLugar = this.ListLugarAtencion.map(c => new FormControl(false));
        // // this.controlsLugar[0].setValue(true);
        this.controlsTipServ = this.ListTipoServicio.map(c => new FormControl(false));
        // // this.controlsTipServ[0].setValue(true);

        // // if (typeof this.FormData.ListDistrito === 'undefined' || this.FormData.ListDistrito === null || this.FormData.ListDistrito.length === 0) {

        // //     this.ListDistrito[0].flag = true;
        // // } else {
        // //     this.setCheboxes(this.ListDistrito, this.FormData.ListDistrito, this.controlsDist);
        // // }
        // // //Validamos el seteo el lugar de atencion

        // // if (typeof this.FormData.ListLugar === 'undefined' || this.FormData.ListLugar === null || this.FormData.ListLugar.length === 0) {

        // //     this.ListLugarAtencion[0].flag = true;
        // // } else {
        // //     this.setCheboxes(this.ListLugarAtencion, this.FormData.ListLugar, this.controlsLugar);
        // // }
        // // //Validamos el seteo el tipo del servicios
        // // if (typeof this.FormData.ListServicios === 'undefined' || this.FormData.ListServicios === null || this.FormData.ListServicios.length === 0) {

        // //     this.ListTipoServicio[0].flag = true;
        // // } else {
        // //     this.setCheboxes(this.ListTipoServicio, this.FormData.ListServicios, this.controlsTipServ);
        // // }
        // this.flagatiende24horasCtrl = new FormControl('', []);
        this.txtalgosobredispCtrl = new FormControl('', [Validators.maxLength(450)]);
        this.txt_descripcion_serviciosCtrl = new FormControl('', [Validators.maxLength(450)]);

        this.fromGenerales = new FormGroup({
            txt_nombre_ficha: this.txt_nombre_fichaCtrl,
            telefono1: this.Telefono1Ctrl,
            telefono2: this.Telefono2Ctrl,
            email: this.emailCtrl,
            web: this.WebCtrl,
            edad: this.edadCtrl,
            pais: this.paisCtrl,
            estudios: this.estudiosCtrl,
            descripciongenerales: this.txt_descripcion_generalesCtrl,
            cabello: this.cabellosCtrl,
            ojos: this.ojosCtrl,
            estatura: this.estaturaCtrl,
            peso: this.pesoCtrl,
            busto: this.bustoCtrl,
            cintura: this.cinturaCtrl,
            cadera: this.caderaCtrl,
            descripcionapariencia: this.descripcionaparienciaCtrl,

            txt_30_min: this.txt_30_minCtrl,
            txt_45_min: this.txt_45_minCtrl,
            txt_1_hora: this.txt_1_horaCtrl,
            txt_1_30_hora: this.txt_1_30_horaCtrl,
            txt_2_hora: this.txt_2_horaCtrl,
            txt_3_hora: this.txt_3_horaCtrl,
            txt_salida: this.txt_salidaCtrl,
            txt_toda_noche: this.txt_toda_nocheCtrl,
            txt_viajes: this.txt_viajesCtrl,
            txt_descripcion_tarifas: this.txt_descripcion_tarifasCtrl,
            ListFormaPago: new FormArray(this.controls, this.minSelectedCheckboxes(1)),
            ListDistrito: new FormArray(this.controlsDist, this.minSelectedCheckboxes(1)),
            ListLugarAtencion: new FormArray(this.controlsLugar, this.minSelectedCheckboxes(1)),
            ListTipoServicio: new FormArray(this.controlsTipServ, this.minSelectedCheckboxes(1)),
            algosobredisponibilidad: this.txtalgosobredispCtrl,
            txt_descripcion_servicios: this.txt_descripcion_serviciosCtrl
            // flagatiende24hora: this.flagatiende24horasCtrl,
        });
    }

    loadEditarAnuncio() {

    }
}
