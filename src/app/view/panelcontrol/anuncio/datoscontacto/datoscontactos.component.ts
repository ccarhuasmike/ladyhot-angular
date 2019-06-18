import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AnuncioService } from "../../../../shared/services/anuncio/anuncio.service";
import { DatosContacto } from "../../../models/modelanuncio";
import { ParameterService } from "../../../../shared/services/anuncio/parameter.service";
import { ClientResponse, ClientResponseResult } from '../../../../Models/ClientResponseModels';
import { PaginatedResult } from '../../../../Models/Tbl_parameter_detModels';
import { MessageService } from "../../../../throwError/message.service";

@Component({
    selector: 'app-datoscontactos',
    templateUrl: './datoscontactos.component.html',
    styleUrls: ['./datoscontactos.component.css']
})
export class DatosContactoComponent implements OnInit {

    datoscontacto: DatosContacto;
    fromContacto: FormGroup;
    isSubmitted: boolean = false;
    //Controles Datos de Contacto
    txt_nombre_fichaCtrl: FormControl;
    txt_emailCtrl: FormControl;
    txt_webCtrl: FormControl;
    txt_telefono_1Ctrl: FormControl;
    txt_telefono_2Ctrl: FormControl;
    //Registro de Expresiones
    RegEx_mailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
    RegEx_txt_web = "^(http[s]?:\\/\\/){0,1}(www\\.){0,1}[a-zA-Z0-9\\.\\-]+\\.[a-zA-Z]{2,5}[\\.]{0,1}$";
    RegEx_Telefono = "^[679]{1}[0-9]{8}$";
    _messageService: any;
    listParameter: any;
    DataJsonAnuncio: any;
    constructor(private router: Router,
        private anuncioService: AnuncioService,
        private parameter: ParameterService,
        public messageService: MessageService
    ) { }

    ngOnInit() {
        this.DataJsonAnuncio = JSON.parse(localStorage.getItem('DataAnuncio'));
        this.parameter.getParameter().subscribe(
            (res: PaginatedResult<any[]>) => {
                this.listParameter = res.result;
                localStorage.setItem('listParamter', JSON.stringify(this.listParameter));
                this._messageService = this.messageService;
                console.log(this._messageService);
            }
        );
        this.anuncioService.segundopaso(false);
        this.anuncioService.tercerpaso(false);
        this.anuncioService.cuartopaso(false);
        this.anuncioService.quintopaso(false);
        this.anuncioService.sextopaso(false);
        //Controles Datos de Contacto
        this.txt_nombre_fichaCtrl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]);
        this.txt_emailCtrl = new FormControl('', [Validators.required, Validators.pattern(this.RegEx_mailPattern)]);
        this.txt_webCtrl = new FormControl('', [Validators.pattern(this.RegEx_txt_web)]);
        this.txt_telefono_1Ctrl = new FormControl('', [Validators.required, Validators.pattern(this.RegEx_Telefono)]);
        this.txt_telefono_2Ctrl = new FormControl('', [Validators.required, Validators.pattern(this.RegEx_Telefono)]);

        this.fromContacto = new FormGroup({
            txt_nombre_ficha: this.txt_nombre_fichaCtrl,
            txt_email: this.txt_emailCtrl,
            txt_web: this.txt_webCtrl,
            txt_telefono_1: this.txt_telefono_1Ctrl,
            txt_telefono_2: this.txt_telefono_2Ctrl
        });
        if (this.DataJsonAnuncio !== null) {
            this.fromContacto.patchValue({
                txt_nombre_ficha: this.DataJsonAnuncio.txt_nombre_ficha,
                txt_email: this.DataJsonAnuncio.txt_email,
                txt_web: this.DataJsonAnuncio.txt_web,
                txt_telefono_1: this.DataJsonAnuncio.txt_telefono_1,
                txt_telefono_2: this.DataJsonAnuncio.txt_telefono_2
            });
        }
    }

    save() {

        this.isSubmitted = true;
        if (!this.fromContacto.valid)
            return;

        if (this.DataJsonAnuncio == null) {
            //Registrar Datos
            let entidad: any = {};
            entidad.id_usuario = 11;
            entidad.txt_nombre_ficha = this.fromContacto.value.txt_nombre_ficha;
            entidad.txt_telefono_1 = this.fromContacto.value.txt_telefono_1;
            entidad.txt_telefono_2 = this.fromContacto.value.txt_telefono_2;
            entidad.txt_email = this.fromContacto.value.txt_email;
            entidad.txt_web = this.fromContacto.value.txt_web;
            this.anuncioService.SavePrimerPaso(entidad).subscribe(                
                (res) => {
                    if (res.Status == "OK") {                        
                        let DataJsonAnuncio: any = res.Data;
                        localStorage.setItem('DataAnuncio', DataJsonAnuncio);                        
                        this.router.navigate(['panelcontrol/nuevoanuncio/datos-generales']);
                    } else {
                        console.log("ejecute Error");
                    }
                }
            );
        } else {
            //Actualizar Datos Registrado
            this.DataJsonAnuncio.txt_nombre_ficha = this.fromContacto.value.txt_nombre_ficha;
            this.DataJsonAnuncio.txt_telefono_1 = this.fromContacto.value.txt_telefono_1;
            this.DataJsonAnuncio.txt_telefono_2 = this.fromContacto.value.txt_telefono_2;
            this.DataJsonAnuncio.txt_email = this.fromContacto.value.txt_email;
            this.DataJsonAnuncio.txt_web = this.fromContacto.value.txt_web;
            this.anuncioService.UpdateSavePrimerPaso(this.DataJsonAnuncio).subscribe(
                (res) => {
                    if (res.Status == "OK") {
                        let DataJsonAnuncio: any = res.Data;
                        localStorage.setItem('DataAnuncio', DataJsonAnuncio);
                        //this.anuncioService.setDatosContacto(this.fromContacto.value)
                        this.router.navigate(['panelcontrol/nuevoanuncio/datos-generales']);
                    }
                }
            );
        }
    }
    reset() {
        this.isSubmitted = false;
        this.fromContacto.reset();
    }
}
