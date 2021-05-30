import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { ParameterService, AnuncioService } from 'src/app/shared/services/service.module';
import { ClientResponse } from 'src/app/Models/ClientResponseModels';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-modal-actualizar-anuncio',
    templateUrl: './modal-actualizar-anuncio.component.html',
    styleUrls: ['./modal-actualizar-anuncio.component.css']
})
export class ModalActualizaAnuncio implements OnInit {
    fromGenerales: FormGroup;
    isSubmitted: boolean = false;
    _baseUrl: string = '';
    //Controles Datos de Contacto
    txt_nombre_fichaCtrl: FormControl;
    txt_emailCtrl: FormControl;
    txt_webCtrl: FormControl;
    txt_telefono_1Ctrl: FormControl;
    txt_telefono_2Ctrl: FormControl;
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
    controlsFormaPago: any;
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
    RegEx_txt_web = "^(http[s]?:\\/\\/){0,1}(www\\.){0,1}[a-zA-Z0-9\\.\\-]+\\.[a-zA-Z]{2,5}[\\.]{0,1}$";
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
    id = "";
    constructor(
        public modalRef: BsModalRef,
        private anuncioService: AnuncioService,
        private parameter: ParameterService
    ) {
    }

    ngOnInit() {
        this.anuncioService.getAnuncioPorId(this.id).subscribe(
            (res: ClientResponse) => {
                this.datosAnuncio = res.DataJson;
                this.parameter.getParameter().subscribe(
                    (res: ClientResponse) => {
                        this.listParameter = JSON.parse(res.DataJson); // aqui se obtiene los paramter de la base de datos                
                        this.ListEdad = this.listParameter.edad;//this.anuncioService.getListEdad();
                        this.ListPais = this.listParameter.pais;//this.anuncioService.getListPais();
                        this.ListEstudios = this.listParameter.estudios;//this.anuncioService.getListEstudios();
                        this.ListCabellos = this.listParameter.color_cabello;
                        this.ListOjos = this.listParameter.color_ojos;
                        this.ListEstatura = this.listParameter.estatura;
                        this.ListPeso = this.listParameter.peso;
                        this.ListDistrito = this.listParameter.distritro;
                        this.ListLugarAtencion = this.listParameter.lugaratencion;
                        this.ListTipoServicio = this.listParameter.servicio_ofrece;
                        this.ListFormaPago = this.listParameter.formapago
                        this.cargarControles();
                        //Validamos el seteo de la forma de pago
                        if (this.datosAnuncio.DetailleAnuncion.txt_forma_pago != null) {
                            this.setCheboxes(this.ListFormaPago, this.datosAnuncio.DetailleAnuncion.txt_forma_pago, this.controlsFormaPago);
                        } else {
                            this.controlsFormaPago[0].setValue(true);
                            this.ListFormaPago[0].flag = true;
                        }

                        //Validamos el seteo del distrito, lugar atencion, servicios
                        if (this.datosAnuncio.DetailleAnuncion.txt_lugar_servicio_distrito != null) {
                            this.setCheboxes(this.ListDistrito, this.datosAnuncio.DetailleAnuncion.txt_lugar_servicio_distrito, this.controlsDist);
                        } else {
                            this.controlsDist[0].setValue(true);
                            this.ListDistrito[0].flag = true;
                        }
                        //Validamos el seteo el lugar de atencion
                        if (this.datosAnuncio.DetailleAnuncion.tx_lugar_atencion != null) {
                            this.setCheboxes(this.ListLugarAtencion, this.datosAnuncio.DetailleAnuncion.tx_lugar_atencion, this.controlsLugar);
                        } else {
                            this.controlsLugar[0].setValue(true);
                            this.ListLugarAtencion[0].flag = true;
                        }
                        //Validamos el seteo el tipo del servicios
                        if (this.datosAnuncio.DetailleAnuncion.tx_servicios_ofrece != null) {
                            this.setCheboxes(this.ListTipoServicio, this.datosAnuncio.DetailleAnuncion.tx_servicios_ofrece, this.controlsTipServ);
                        } else {
                            this.controlsTipServ[0].setValue(true);
                            this.ListTipoServicio[0].flag = true;
                        }
                        this.fromGenerales.patchValue({
                            //Datos de Contacto
                            txt_nombre_ficha: this.datosAnuncio.DetailleAnuncion.txt_nombre_ficha,
                            txt_telefono_1: this.datosAnuncio.DetailleAnuncion.txt_telefono_1,
                            txt_telefono_2: this.datosAnuncio.DetailleAnuncion.txt_telefono_2,
                            txt_email: this.datosAnuncio.DetailleAnuncion.txt_email,
                            txt_web: this.datosAnuncio.DetailleAnuncion.txt_web,
                            //Datos Generales
                            int_edad: this.datosAnuncio.DetailleAnuncion.int_edad == 0 ? "" : this.datosAnuncio.DetailleAnuncion.int_edad,
                            int_pais_origen: this.datosAnuncio.DetailleAnuncion.int_pais_origen == 0 ? "" : this.datosAnuncio.DetailleAnuncion.int_pais_origen,
                            int_estudios: this.datosAnuncio.DetailleAnuncion.int_estudios == 0 ? "" : this.datosAnuncio.DetailleAnuncion.int_estudios,
                            txt_presentacion: this.datosAnuncio.DetailleAnuncion.txt_presentacion,
                            //Datos Apariencia
                            int_color_cabello: this.datosAnuncio.DetailleAnuncion.int_color_cabello == 0 ? "" : this.datosAnuncio.DetailleAnuncion.int_color_cabello,
                            int_color_ojos: this.datosAnuncio.DetailleAnuncion.int_color_ojos == 0 ? "" : this.datosAnuncio.DetailleAnuncion.int_color_ojos,
                            int_estatura: this.datosAnuncio.DetailleAnuncion.int_estatura == 0 ? "" : this.datosAnuncio.DetailleAnuncion.int_estatura,
                            int_peso: this.datosAnuncio.DetailleAnuncion.int_peso == 0 ? "" : this.datosAnuncio.DetailleAnuncion.int_peso,
                            busto: this.datosAnuncio.DetailleAnuncion.txt_medidas_busto_cintura_cadera == null ? "" : this.datosAnuncio.DetailleAnuncion.txt_medidas_busto_cintura_cadera.split("-")[0],
                            cintura: this.datosAnuncio.DetailleAnuncion.txt_medidas_busto_cintura_cadera == null ? "" : this.datosAnuncio.DetailleAnuncion.txt_medidas_busto_cintura_cadera.split("-")[1],
                            cadera: this.datosAnuncio.DetailleAnuncion.txt_medidas_busto_cintura_cadera == null ? "" : this.datosAnuncio.DetailleAnuncion.txt_medidas_busto_cintura_cadera.split("-")[2],
                            txt_descripcion_extra_apariencia: this.datosAnuncio.DetailleAnuncion.txt_descripcion_extra_apariencia,
                            //Datos Tarifas
                            dbl_costo_x_tiempo_30min: this.datosAnuncio.DetailleAnuncion.dbl_costo_x_tiempo_30min,
                            dbl_costo_x_tiempo_45min: this.datosAnuncio.DetailleAnuncion.dbl_costo_x_tiempo_45min,
                            dbl_costo_x_tiempo_1hora: this.datosAnuncio.DetailleAnuncion.dbl_costo_x_tiempo_1hora,
                            dbl_costo_x_tiempo_1hora_media: this.datosAnuncio.DetailleAnuncion.dbl_costo_x_tiempo_1hora_media,
                            dbl_costo_x_tiempo_2hora: this.datosAnuncio.DetailleAnuncion.dbl_costo_x_tiempo_2hora,
                            dbl_costo_x_tiempo_3hora: this.datosAnuncio.DetailleAnuncion.dbl_costo_x_tiempo_3hora,
                            dbl_costo_x_tiempo_salidas: this.datosAnuncio.DetailleAnuncion.dbl_costo_x_tiempo_salidas,
                            dbl_costo_x_tiempo_toda_noche: this.datosAnuncio.DetailleAnuncion.dbl_costo_x_tiempo_toda_noche,
                            dbl_costo_x_viaje: this.datosAnuncio.DetailleAnuncion.dbl_costo_x_viaje,
                            txt_descripcion_extra_tarifa: this.datosAnuncio.DetailleAnuncion.txt_descripcion_extra_tarifa,
                            //Datos Servicios
                            tx_descripcion_extra_horario: this.datosAnuncio.DetailleAnuncion.tx_descripcion_extra_horario,
                            tx_descripcion_extra_servicio: this.datosAnuncio.DetailleAnuncion.tx_descripcion_extra_servicio,
                        });
                    }
                );
            });
    }
    onChangeDistrito(val_valor: number, isChecked: boolean) {

        let index = this.ListDistrito.findIndex(x => x.val_valor === val_valor);
        if (isChecked) {
            this.ListDistrito[index].flag = isChecked;
        } else {
            this.ListDistrito[index].flag = isChecked;
        }
    }
    onChangeFormaPago(val_valor: number, isChecked: boolean) {
        let index = this.ListFormaPago.findIndex(x => x.val_valor === val_valor);
        if (isChecked) {
            this.ListFormaPago[index].flag = isChecked;
        } else {
            this.ListFormaPago[index].flag = isChecked;
        }
    }

    onChangeLugarAtencion(val_valor: number, isChecked: boolean) {

        let index = this.ListLugarAtencion.findIndex(x => x.val_valor === val_valor);
        if (isChecked) {
            this.ListLugarAtencion[index].flag = isChecked;
        } else {
            this.ListLugarAtencion[index].flag = isChecked;
        }
    }

    onChangeTipoServicio(val_valor: number, isChecked: boolean) {

        let index = this.ListTipoServicio.findIndex(x => x.val_valor === val_valor);
        if (isChecked) {
            this.ListTipoServicio[index].flag = isChecked;
        } else {
            this.ListTipoServicio[index].flag = isChecked;
        }
    }

    setCheboxes(listCargados: any, listSeleccionado: string, controls: any) {
        let arraSeleccionado: any[] = listSeleccionado.split(",");
        for (let index = 0; index < arraSeleccionado.length; index++) {
            for (let index1 = 0; index1 < listCargados.length; index1++) {
                if (arraSeleccionado[index] == listCargados[index1].val_valor) {
                    listCargados[index1].flag = true;
                    controls[index1].setValue(true);
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
        this.isSubmitted = true;
        if (!this.fromGenerales.valid)
            return;

        const selectedFormapago = this.fromGenerales.value.ListFormaPago
            .map((v, i) => v ? this.ListFormaPago[i].val_valor : null)
            .filter(v => v !== null);

        const selectedDistrito = this.fromGenerales.value.ListDistrito
            .map((v, i) => v ? this.ListDistrito[i].val_valor : null)
            .filter(v => v !== null);

        const selectedLugarAtencion = this.fromGenerales.value.ListLugarAtencion
            .map((v, i) => v ? this.ListLugarAtencion[i].val_valor : null)
            .filter(v => v !== null);
        const selectedTipoServicio = this.fromGenerales.value.ListTipoServicio
            .map((v, i) => v ? this.ListTipoServicio[i].val_valor : null)
            .filter(v => v !== null);

        let entidad: any = {};
        entidad.id = parseInt(this["data"]["id"]);
        entidad.txt_nombre_ficha = this.fromGenerales.value.txt_nombre_ficha;
        entidad.txt_telefono_1 = this.fromGenerales.value.txt_telefono_1;
        entidad.txt_telefono_2 = this.fromGenerales.value.txt_telefono_2;
        entidad.txt_email = this.fromGenerales.value.txt_email;
        entidad.txt_web = this.fromGenerales.value.txt_web;
        entidad.int_edad = parseInt(this.fromGenerales.value.int_edad);
        entidad.int_pais_origen = parseInt(this.fromGenerales.value.int_pais_origen);
        entidad.int_estudios = parseInt(this.fromGenerales.value.int_estudios);
        entidad.txt_presentacion = this.fromGenerales.value.txt_presentacion;
        entidad.int_color_cabello = parseInt(this.fromGenerales.value.int_color_cabello);
        entidad.int_color_ojos = parseInt(this.fromGenerales.value.int_color_ojos);
        entidad.int_estatura = parseInt(this.fromGenerales.value.int_estatura);
        entidad.int_peso = parseInt(this.fromGenerales.value.int_peso);
        entidad.txt_medidas_busto_cintura_cadera = this.fromGenerales.value.busto + "-" + this.fromGenerales.value.cintura + "-" + this.fromGenerales.value.cadera;
        entidad.txt_descripcion_extra_apariencia = this.fromGenerales.value.txt_descripcion_extra_apariencia;
        entidad.dbl_costo_x_tiempo_30min = parseFloat(this.fromGenerales.value.dbl_costo_x_tiempo_30min);
        entidad.dbl_costo_x_tiempo_45min = parseFloat(this.fromGenerales.value.dbl_costo_x_tiempo_45min);
        entidad.dbl_costo_x_tiempo_1hora = parseFloat(this.fromGenerales.value.dbl_costo_x_tiempo_1hora);
        entidad.dbl_costo_x_tiempo_1hora_media = parseFloat(this.fromGenerales.value.dbl_costo_x_tiempo_1hora_media);
        entidad.dbl_costo_x_tiempo_2hora = parseFloat(this.fromGenerales.value.dbl_costo_x_tiempo_2hora);
        entidad.dbl_costo_x_tiempo_3hora = parseFloat(this.fromGenerales.value.dbl_costo_x_tiempo_3hora);
        entidad.dbl_costo_x_tiempo_salidas = parseFloat(this.fromGenerales.value.dbl_costo_x_tiempo_salidas);
        entidad.dbl_costo_x_tiempo_toda_noche = parseFloat(this.fromGenerales.value.dbl_costo_x_tiempo_toda_noche);
        entidad.dbl_costo_x_viaje = parseFloat(this.fromGenerales.value.txt_viajes);
        entidad.txt_forma_pago = this.getCheboxerSeleccionado(selectedFormapago);
        entidad.txt_descripcion_extra_tarifa = this.fromGenerales.value.txt_descripcion_extra_tarifa;
        entidad.txt_lugar_servicio_distrito = this.getCheboxerSeleccionado(selectedDistrito);
        //entidad.fl_atencion_24horas = this.getCheboxerSeleccionado(selectedFormapago);
        entidad.tx_descripcion_extra_horario = this.fromGenerales.value.algosobredisponibilidad;
        entidad.tx_lugar_atencion = this.getCheboxerSeleccionado(selectedLugarAtencion);
        entidad.tx_servicios_ofrece = this.getCheboxerSeleccionado(selectedTipoServicio);
        entidad.tx_descripcion_extra_servicio = this.fromGenerales.value.tx_descripcion_extra_servicio;
        this.anuncioService.Saveactualizartodo(entidad).subscribe(
            (res) => {
                console.log(res);
                if (res.Status == "OK") {
                    this.modalRef.hide();
                } else {
                    console.log("ejecute erro");
                }
            }
        );
    }

    getCheboxerSeleccionado(ListSeleccionado: any): string {
        let selecionado: string = "";
        for (let index = 0; index < ListSeleccionado.length; index++) {
            selecionado += ListSeleccionado[index] + ",";
        }
        selecionado = selecionado.substring(0, selecionado.length - 1);
        return selecionado;
    }

    closeModal() {
        this.modalRef.hide();
    }

    cargarControles() {
        //Controles Datos de Contacto
        this.txt_nombre_fichaCtrl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]);
        this.txt_telefono_1Ctrl = new FormControl('', [Validators.required, Validators.pattern(this.RegEx_Telefono)]);
        this.txt_telefono_2Ctrl = new FormControl('', [Validators.required, Validators.pattern(this.RegEx_Telefono)]);
        this.txt_emailCtrl = new FormControl('', [Validators.required, Validators.pattern(this.RegEx_mailPattern)]);
        this.txt_webCtrl = new FormControl('', [Validators.pattern(this.RegEx_txt_web)]);

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

        this.controlsFormaPago = this.ListFormaPago.map(c => new FormControl(false));
        this.controlsDist = this.ListDistrito.map(c => new FormControl(false));
        this.controlsLugar = this.ListLugarAtencion.map(c => new FormControl(false));
        this.controlsTipServ = this.ListTipoServicio.map(c => new FormControl(false));
        this.txtalgosobredispCtrl = new FormControl('', [Validators.maxLength(450)]);
        this.txt_descripcion_serviciosCtrl = new FormControl('', [Validators.maxLength(450)]);

        this.fromGenerales = new FormGroup({
            txt_nombre_ficha: this.txt_nombre_fichaCtrl,
            txt_telefono_1: this.txt_telefono_1Ctrl,
            txt_telefono_2: this.txt_telefono_2Ctrl,
            txt_email: this.txt_emailCtrl,
            txt_web: this.txt_webCtrl,
            int_edad: this.edadCtrl,
            int_pais_origen: this.paisCtrl,
            int_estudios: this.estudiosCtrl,
            txt_presentacion: this.txt_descripcion_generalesCtrl,
            int_color_cabello: this.cabellosCtrl,
            int_color_ojos: this.ojosCtrl,
            int_estatura: this.estaturaCtrl,
            int_peso: this.pesoCtrl,
            busto: this.bustoCtrl,
            cintura: this.cinturaCtrl,
            cadera: this.caderaCtrl,
            txt_descripcion_extra_apariencia: this.descripcionaparienciaCtrl,
            dbl_costo_x_tiempo_30min: this.txt_30_minCtrl,
            dbl_costo_x_tiempo_45min: this.txt_45_minCtrl,
            dbl_costo_x_tiempo_1hora: this.txt_1_horaCtrl,
            dbl_costo_x_tiempo_1hora_media: this.txt_1_30_horaCtrl,
            dbl_costo_x_tiempo_2hora: this.txt_2_horaCtrl,
            dbl_costo_x_tiempo_3hora: this.txt_3_horaCtrl,
            dbl_costo_x_tiempo_salidas: this.txt_salidaCtrl,
            dbl_costo_x_tiempo_toda_noche: this.txt_toda_nocheCtrl,
            dbl_costo_x_viaje: this.txt_viajesCtrl,
            txt_descripcion_extra_tarifa: this.txt_descripcion_tarifasCtrl,
            //txt_forma_pago: new FormArray(this.controlsFormaPago, this.minSelectedCheckboxes(1)),
            ListFormaPago: new FormArray(this.controlsFormaPago, this.minSelectedCheckboxes(1)),
            ListDistrito: new FormArray(this.controlsDist, this.minSelectedCheckboxes(1)),
            ListLugarAtencion: new FormArray(this.controlsLugar, this.minSelectedCheckboxes(1)),
            ListTipoServicio: new FormArray(this.controlsTipServ, this.minSelectedCheckboxes(1)),
            tx_descripcion_extra_horario: this.txtalgosobredispCtrl,
            tx_descripcion_extra_servicio: this.txt_descripcion_serviciosCtrl
            // tx_fl_atencion_24horas: this.flagatiende24horasCtrl,
        });
    }
}