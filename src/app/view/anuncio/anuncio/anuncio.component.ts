import { Component, OnInit } from '@angular/core';
import { AnuncioService } from "../../../shared/services/anuncio/anuncio.service";
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { HeaderService } from "../../../shared/services/header/header.services";
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
    fromApariencia: FormGroup;
    isSubmitted: boolean = false;
    isSubmittedApariencia: boolean = false;

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
    //Controles Apariencia
    bustoCtrl: FormControl;
    cinturaCtrl: FormControl;
    caderaCtrl: FormControl;

    constructor(
        private anuncioService: AnuncioService,
        private frmBuilder: FormBuilder,
        private headerService: HeaderService
    ) { }
    ngOnInit() {
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
            telefono2: this.Telefono2Ctrl,
        });

        //Controles Apariencia
        this.bustoCtrl = new FormControl('', [Validators.required]);
        this.cinturaCtrl = new FormControl('', [Validators.required]);
        this.caderaCtrl = new FormControl('', [Validators.required]);


        this.fromApariencia = new FormGroup({
            busto: this.bustoCtrl,
            cintura: this.cinturaCtrl,
            cadera: this.caderaCtrl,

        });

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
    }

    selectName() {
        debugger;
        alert(this.EdadId);
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

}
