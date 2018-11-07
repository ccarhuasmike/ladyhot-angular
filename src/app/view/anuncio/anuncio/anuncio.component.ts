import { Component, OnInit } from '@angular/core';
import { AnuncioService } from "../../../shared/services/anuncio/anuncio.service";
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


    constructor(private anuncioService: AnuncioService) { }
    ngOnInit() {
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




}
