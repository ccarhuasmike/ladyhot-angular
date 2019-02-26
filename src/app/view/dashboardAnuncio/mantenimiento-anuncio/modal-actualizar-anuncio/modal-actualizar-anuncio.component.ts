import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ParameterService, AnuncioService } from 'src/app/shared/services/service.module';
import { ClientResponseResult } from 'src/app/Models/ClientResponseModels';
import { PaginatedResult } from 'src/app/Models/Tbl_parameter_detModels';

@Component({
    selector: 'app-modal-actualizar-anuncio',
    templateUrl: './modal-actualizar-anuncio.component.html',
    styleUrls: ['./modal-actualizar-anuncio.component.css']
})
export class ModalActualizaAnuncio implements OnInit {
    //objeto obtener datos del anuncio
    datosAnuncio: any;
    listParameter: any;

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

    //Controles Tarifa
    ListFormaPago: any = [];

    constructor(
        public bsModalRef: BsModalRef,
        private anuncioService: AnuncioService,
        private parameter: ParameterService
    ) { }

    ngOnInit(): void {
        debugger;
        this.anuncioService.getAnuncioPorId(this["data"]["id"]).subscribe(
            (res: ClientResponseResult<any>) => {
                this.datosAnuncio = res.result;
                this.parameter.getParameter().subscribe(
                    (res: PaginatedResult<any[]>) => {
                        this.listParameter = res.result; // aqui se obtiene los paramter de la base de datos                
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
                    }
                );
            });
    }
    cargarControles() {
        //Controles Datos de Contacto
        // this.txt_nombre_fichaCtrl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]);
        // this.txt_telefono_1Ctrl = new FormControl('', [Validators.required, Validators.pattern(this.RegEx_Telefono)]);
        // this.txt_telefono_2Ctrl = new FormControl('', [Validators.required, Validators.pattern(this.RegEx_Telefono)]);
        // this.txt_emailCtrl = new FormControl('', [Validators.required, Validators.pattern(this.RegEx_mailPattern)]);
        // this.txt_webCtrl = new FormControl('', [Validators.pattern(this.RegEx_txt_web)]);
    }
}