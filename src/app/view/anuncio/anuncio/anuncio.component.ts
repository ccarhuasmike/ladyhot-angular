import { Component, OnInit } from '@angular/core';
import { AnuncioService } from "../../../shared/services/anuncio/anuncio.service";
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { HeaderService } from "../../../shared/services/header/header.services";
import { Personal } from "../../models/modelanuncio";
import { debug } from 'util';
@Component({
    selector: 'app-footer',
    templateUrl: "./anuncio.component.html",
    styleUrls: ['./anuncio.component.css']
})
export class AnuncioComponent implements OnInit {
    showDatosContactos: boolean = false;
    showDatosGenerales: boolean = false;
    showApariencia: boolean = false;
    showTarifa: boolean = false;
    showServicios: boolean = false;
    ListDistrito: any = [];
    ListLugarAtencion: any = [];
    ListTipoServicio: any = [];
    ListFormaPago: any = [];

    // ListFormaPago = [
    //     { id: 100, name: 'order 1', flag: false },
    //     { id: 200, name: 'order 2', flag: false },
    //     { id: 300, name: 'order 3', flag: false },
    //     { id: 400, name: 'order 4', flag: false }
    // ];

    ListEdad: any = [];
    ListPais: any = [];
    ListEstudios: any = [];
    ListCabellos: any = [];
    ListOjos: any = [];
    ListEstatura: any = [];
    ListPeso: any = [];

    EdadId: Number = 0;
    PaisId: Number = 0;
    EstudioId: Number = 0;
    CabelloId: Number = 0;
    OjosId: Number = 0;
    EstaturaId: Number = 0;
    PesoId: Number = 0;


    fromContacto: FormGroup;
    fromDatosGenerales: FormGroup;
    fromApariencia: FormGroup;
    fromTarifa: FormGroup;
    fromServicios: FormGroup;

    isSubmitted: boolean = false;
    isSubmittedApariencia: boolean = false;
    isSubmittedDatosGenerales: boolean = false;
    isSubmittedTarifas: boolean = false;

    result: any = null;
    RegEx_mailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
    RegEx_web = "^(http[s]?:\\/\\/){0,1}(www\\.){0,1}[a-zA-Z0-9\\.\\-]+\\.[a-zA-Z]{2,5}[\\.]{0,1}$";
    RegEx_Telefono = "^[679]{1}[0-9]{8}$";

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

    //Controles Apariencia
    bustoCtrl: FormControl;
    cinturaCtrl: FormControl;
    caderaCtrl: FormControl;
    cabellosCtrl: FormControl;
    ojosCtrl: FormControl;
    estaturaCtrl: FormControl;
    pesoCtrl: FormControl;

    //Controles Tarifa
    formapagoCtrl: FormArray;



    controls: any;
    controlsDist: any;
    controlsLugar: any;
    controlsTipServ: any;
    //personal: Personal;
    constructor(
        private anuncioService: AnuncioService,
        private frmBuilder: FormBuilder
    ) { }
    ngOnInit() {

        debugger;
        this.ListDistrito = this.anuncioService.getListDistrito();
        this.ListLugarAtencion = this.anuncioService.getListLugarAtencion();
        this.ListTipoServicio = this.anuncioService.getListTipoServicio();
        this.ListFormaPago = this.anuncioService.getListFormaPago();
        this.ListEdad = this.anuncioService.getListEdad();
        this.ListPais = this.anuncioService.getListPais();
        this.ListEstudios = this.anuncioService.getListEstudios();
        this.ListCabellos = this.anuncioService.getListCabellos();
        this.ListOjos = this.anuncioService.getListOjos();
        this.ListEstatura = this.anuncioService.getListEstatura();
        this.ListPeso = this.anuncioService.getListPeso();

        //Controles Datos de Contacto
        this.usernameCtrl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]);
        this.emailCtrl = new FormControl('', [Validators.required, Validators.pattern(this.RegEx_mailPattern)]);
        this.WebCtrl = new FormControl('', [Validators.required, Validators.pattern(this.RegEx_web)]);
        this.Telefono1Ctrl = new FormControl('', [Validators.required, Validators.pattern(this.RegEx_Telefono)]);
        this.Telefono2Ctrl = new FormControl('', [Validators.required, Validators.pattern(this.RegEx_Telefono)]);

        this.fromContacto = new FormGroup({
            username: this.usernameCtrl,
            email: this.emailCtrl,
            web: this.WebCtrl,
            telefono1: this.Telefono1Ctrl,
            telefono2: this.Telefono2Ctrl
        });

        //Controles Datos Generales
        this.edadCtrl = new FormControl('', [Validators.required]);
        this.paisCtrl = new FormControl('', [Validators.required]);
        this.estudiosCtrl = new FormControl('', [Validators.required]);
        this.fromDatosGenerales = new FormGroup({
            edad: this.edadCtrl,
            pais: this.paisCtrl,
            estudios: this.estudiosCtrl
        });
        //Controles Apariencia
        this.bustoCtrl = new FormControl('', [Validators.required]);
        this.cinturaCtrl = new FormControl('', [Validators.required]);
        this.caderaCtrl = new FormControl('', [Validators.required]);
        this.cabellosCtrl = new FormControl('', [Validators.required]);
        this.ojosCtrl = new FormControl('', [Validators.required]);
        this.estaturaCtrl = new FormControl('', [Validators.required]);
        this.pesoCtrl = new FormControl('', [Validators.required]);

        this.fromApariencia = new FormGroup({
            busto: this.bustoCtrl,
            cintura: this.cinturaCtrl,
            cadera: this.caderaCtrl,
            cabello: this.cabellosCtrl,
            ojos: this.ojosCtrl,
            estatura: this.estaturaCtrl,
            peso: this.pesoCtrl

        });

        this.controls = this.ListFormaPago.map(c => new FormControl(false));
        this.controls[0].setValue(true);
        this.ListFormaPago[0].flag = true;

        this.fromTarifa = this.frmBuilder.group({
            ListFormaPago: new FormArray(this.controls, this.minSelectedCheckboxes(1))
        });

        this.controlsDist = this.ListDistrito.map(c => new FormControl(false));
        this.controlsDist[0].setValue(true);
        this.ListDistrito[0].flag = true;

        this.controlsLugar = this.ListLugarAtencion.map(c => new FormControl(false));
        this.controlsLugar[0].setValue(true);
        this.ListLugarAtencion[0].flag = true;

        this.controlsTipServ = this.ListTipoServicio.map(c => new FormControl(false));
        this.controlsTipServ[0].setValue(true);
        this.ListTipoServicio[0].flag = true;

        this.fromServicios = this.frmBuilder.group({
            ListDistrito: new FormArray(this.controlsDist, this.minSelectedCheckboxes(1)),
            ListLugarAtencion: new FormArray(this.controlsLugar, this.minSelectedCheckboxes(1)),
            ListTipoServicio: new FormArray(this.controlsTipServ, this.minSelectedCheckboxes(1))
        });



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
    selectName() {

        // alert(this.EdadId);
    }
    toggleCollapseContactos() {
        this.showDatosContactos = !this.showDatosContactos;
    }
    toggleCollapseGenerales() {
        this.showDatosGenerales = !this.showDatosGenerales;
    }
    toggleCollapseApariencia() {
        this.showApariencia = !this.showApariencia;
    }
    toggleCollapseTarifa() {
        this.showTarifa = !this.showTarifa;
    }
    toggleCollapseServicios() {
        this.showServicios = !this.showServicios;
    }
    onChangeDistrito(codigo: number, isChecked: boolean) {
        debugger;
        let index = this.ListDistrito.findIndex(x => x.codigo === codigo);
        if (isChecked) {
            this.ListDistrito[index].flag = isChecked;
        } else {
            this.ListDistrito[index].flag = isChecked;
        }
    }

    onChangeLugarAtencion(codigo: number, isChecked: boolean) {
        debugger;
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
    onChangeFormaPago(codigo: number, isChecked: boolean) {

        let index = this.ListFormaPago.findIndex(x => x.codigo === codigo);
        if (isChecked) {
            this.ListFormaPago[index].flag = isChecked;
        } else {
            this.ListFormaPago[index].flag = isChecked;
        }
    }

    save() {
        this.isSubmitted = true;
        if (!this.fromContacto.valid)
            return;
        // Code to save the data
        // userService.Save(this.register.value);
        this.result = this.fromContacto.value;
        setTimeout(() => {
            this.result = null;
            this.reset();
        }, 2000);
    }
    reset() {
        this.isSubmitted = false;
        this.fromContacto.reset();

    }

    saveApariencia() {
        this.isSubmittedApariencia = true;
        if (!this.fromApariencia.valid)
            return;
        // Code to save the data
        console.log(this.fromApariencia);
        // userService.Save(this.register.value);
        this.result = this.fromApariencia.value;
        setTimeout(() => {
            this.result = null;
            this.resetApariencia();
        }, 2000);
    }
    resetApariencia() {
        this.isSubmittedApariencia = false;
        this.fromApariencia.reset();

    }


    saveDatosGenerales() {
        this.isSubmittedDatosGenerales = true;
        if (!this.fromDatosGenerales.valid)
            return;
        // Code to save the data
        debugger;
        console.log(this.fromDatosGenerales);
        // userService.Save(this.register.value);
        this.result = this.fromDatosGenerales.value;
        setTimeout(() => {
            this.result = null;
            this.resetDatosGenerales();
        }, 2000);
    }
    resetDatosGenerales() {
        this.isSubmittedDatosGenerales = false;
        /*Reseteamos el select value por default en vacio */
        this.fromDatosGenerales.reset({
            edad: '',
            pais: '',
            estudios: ''
        });
    }


    saveTarifa() {
        debugger;
        this.isSubmittedTarifas = true;
        if (!this.fromTarifa.valid)
            return;
        // Code to save the data
        const selectedOrderIds = this.fromTarifa.value.ListFormaPago
            .map((v, i) => v ? this.ListFormaPago[i].id : null)
            .filter(v => v !== null);

        console.log(selectedOrderIds);


        console.log(this.fromTarifa);
        // userService.Save(this.register.value);
        this.result = this.fromTarifa.value;
        setTimeout(() => {
            this.result = null;
            this.resetTarifa();
        }, 2000);
    }
    resetTarifa() {
        this.isSubmittedTarifas = false;
        this.fromTarifa.reset();
    }

    saveServicios() {
        debugger;
        this.isSubmittedTarifas = true;
        if (!this.fromServicios.valid)
            return;
        // Code to save the data
        const selectedOrderIds = this.fromServicios.value.ListFormaPago
            .map((v, i) => v ? this.ListFormaPago[i].id : null)
            .filter(v => v !== null);

        console.log(selectedOrderIds);
        console.log(this.fromServicios);
        // userService.Save(this.register.value);
        this.result = this.fromServicios.value;
        setTimeout(() => {
            this.result = null;
            this.resetServicios();
        }, 2000);
    }
    resetServicios() {
        this.isSubmittedTarifas = false;
        this.fromServicios.reset();
    }


}
