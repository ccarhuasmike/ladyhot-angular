import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { DatosContacto, DatosGenerales, Apariencia, Tarifas, Servicios, ModelCarga } from "../../../models/modelanuncio";
import { AnuncioService } from "../../../../shared/services/anuncio/anuncio.service";
@Component({
    selector: 'app-editanuncio',
    templateUrl: './editanuncio.component.html',
    styleUrls: ['./editanuncio.component.css']
})
export class EditarAnuncioComponent implements OnInit {
    fromGenerales: FormGroup;
    isSubmitted: boolean = false;

    //Controles Datos de Contacto
    usernameCtrl: FormControl;
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


    constructor(private anuncioService: AnuncioService, ) { }

    ngOnInit() {
        this.ListEdad = this.anuncioService.getListEdad();
        this.ListPais = this.anuncioService.getListPais();
        this.ListEstudios = this.anuncioService.getListEstudios();
        this.ListCabellos = this.anuncioService.getListCabellos();
        this.ListOjos = this.anuncioService.getListOjos();
        this.ListEstatura = this.anuncioService.getListEstatura();
        this.ListPeso = this.anuncioService.getListPeso();
        this.ListDistrito = this.anuncioService.getListDistrito();
        this.ListLugarAtencion = this.anuncioService.getListLugarAtencion();
        this.ListTipoServicio = this.anuncioService.getListTipoServicio();

        //Controles Datos de Contacto
        this.usernameCtrl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]);
        this.emailCtrl = new FormControl('', [Validators.required, Validators.pattern(this.RegEx_mailPattern)]);
        this.WebCtrl = new FormControl('', [Validators.pattern(this.RegEx_web)]);
        this.Telefono1Ctrl = new FormControl('', [Validators.required, Validators.pattern(this.RegEx_Telefono)]);
        this.Telefono2Ctrl = new FormControl('', [Validators.required, Validators.pattern(this.RegEx_Telefono)]);
        //Controles Datos Generales
        this.edadCtrl = new FormControl('', [Validators.required]);
        this.paisCtrl = new FormControl('', [Validators.required]);
        this.estudiosCtrl = new FormControl('', [Validators.required]);
        this.txt_descripcion_generalesCtrl = new FormControl('', [Validators.required, Validators.minLength(50), Validators.maxLength(500)]);
        //Controles Apariencia
        this.bustoCtrl = new FormControl('', [Validators.required]);
        this.cinturaCtrl = new FormControl('', [Validators.required]);
        this.caderaCtrl = new FormControl('', [Validators.required]);
        this.cabellosCtrl = new FormControl('', [Validators.required]);
        this.ojosCtrl = new FormControl('', [Validators.required]);
        this.estaturaCtrl = new FormControl('', [Validators.required]);
        this.pesoCtrl = new FormControl('', [Validators.required]);
        this.descripcionaparienciaCtrl = new FormControl('', [Validators.maxLength(450)]);


        this.ListFormaPago = this.anuncioService.getListFormaPago();

        this.controls = this.ListFormaPago.map(c => new FormControl(false));
        this.controls[0].setValue(true);

        // if (typeof this.tarifas.ListFormaPago === 'undefined' || this.tarifas.ListFormaPago === null) {
        //     this.ListFormaPago[0].flag = true;
        // } else {
        //     this.setCheboxes(this.ListFormaPago, this.tarifas.ListFormaPago, this.controls);
        // }

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


        this.controlsDist = this.ListDistrito.map(c => new FormControl(false));
        this.controlsLugar = this.ListLugarAtencion.map(c => new FormControl(false));
        this.controlsTipServ = this.ListTipoServicio.map(c => new FormControl(false));
        this.flagatiende24horasCtrl = new FormControl('', []);
        this.txtalgosobredispCtrl = new FormControl('', [Validators.maxLength(450)]);
        this.txt_descripcion_serviciosCtrl = new FormControl('', [Validators.maxLength(450)]);

        this.fromGenerales = new FormGroup({
            username: this.usernameCtrl,
            email: this.emailCtrl,
            web: this.WebCtrl,
            telefono1: this.Telefono1Ctrl,
            telefono2: this.Telefono2Ctrl,

            edad: this.edadCtrl,
            pais: this.paisCtrl,
            estudios: this.estudiosCtrl,
            descripciongenerales: this.txt_descripcion_generalesCtrl,

            busto: this.bustoCtrl,
            cintura: this.cinturaCtrl,
            cadera: this.caderaCtrl,
            cabello: this.cabellosCtrl,
            ojos: this.ojosCtrl,
            estatura: this.estaturaCtrl,
            peso: this.pesoCtrl,
            descripcionapariencia: this.descripcionaparienciaCtrl,

            ListFormaPago: new FormArray(this.controls, this.minSelectedCheckboxes(1)),
            // orders: new FormArray(controlss),
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

            ListDistrito: new FormArray(this.controlsDist, this.minSelectedCheckboxes(1)),
            ListLugarAtencion: new FormArray(this.controlsLugar, this.minSelectedCheckboxes(1)),
            ListTipoServicio: new FormArray(this.controlsTipServ, this.minSelectedCheckboxes(1)),
            flagatiende24hora: this.flagatiende24horasCtrl,
            algosobredisponibilidad: this.txtalgosobredispCtrl,
            txt_descripcion_servicios: this.txt_descripcion_serviciosCtrl
        });
        // this.fromContacto.patchValue({
        //     username: this.datoscontacto.txt_nombre,
        //     email: this.datoscontacto.txt_email,
        //     web: this.datoscontacto.txt_web,
        //     telefono1: this.datoscontacto.txt_telefono1,
        //     telefono2: this.datoscontacto.txt_telefono2
        // });

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
}
