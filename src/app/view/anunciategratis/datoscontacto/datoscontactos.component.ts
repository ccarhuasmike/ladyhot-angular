import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AnuncioService } from "../../../shared/services/anuncio/anuncio.service";
import { DatosContacto } from "../../../models/modelanuncio";
import { ParameterService } from "../../../shared/services/anuncio/parameter.service";
import { ClientResponse } from '../../../Models/ClientResponseModels';
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
    selector: 'app-datoscontactos-gratis',
    templateUrl: './datoscontactos.component.html',
    //styleUrls: ['./datoscontactos.component.css']
    // styleUrls: ['../css/global.component.css'],
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
    RegEx_txt_web =  /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;//"^(http[s]?:\\/\\/){0,1}(www\\.){0,1}[a-zA-Z0-9\\.\\-]+\\.[a-zA-Z]{2,5}[\\.]{0,1}$";
    RegEx_Telefono = "^[679]{1}[0-9]{8}$";
    _messageService: any;
    listParameter: any;
    DataJsonAnuncio: any;
    constructor(private router: Router,
        private anuncioService: AnuncioService,
        private parameter: ParameterService,
        private spinner: NgxSpinnerService
    ) { }

    ngOnInit() {
        this.DataJsonAnuncio = JSON.parse(localStorage.getItem('DataAnuncio'));
        this.parameter.getParameter().subscribe(
            (res: ClientResponse) => {
                this.listParameter = JSON.parse(res.DataJson);
                localStorage.setItem('listParamter', JSON.stringify(this.listParameter));
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
        debugger;
        if (this.DataJsonAnuncio !== null) {
            this.fromContacto.patchValue({
                txt_nombre_ficha: this.DataJsonAnuncio.txt_nombre_ficha,
                txt_email: this.DataJsonAnuncio.txt_email,
                txt_web: this.DataJsonAnuncio.txt_web,
                txt_telefono_1: this.DataJsonAnuncio.txt_telefono_1,
                txt_telefono_2: this.DataJsonAnuncio.txt_telefono_2
            });
        } else
            this.fromContacto.reset();
    }

    save() {
        this.isSubmitted = true;
        if (!this.fromContacto.valid)
            return;

        this.spinner.show();

        if (this.DataJsonAnuncio == null) {
            //Registrar Datos
            let entidad: any = {};
            debugger;
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
                        this.router.navigate(['anunciategratis/datos-generales']);
                    } else {
                        console.log("ejecute Error");
                    }
                    setTimeout(() => {
                        this.spinner.hide();
                      }, 2000);
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
                        this.router.navigate(['anunciategratis/datos-generales']);
                    }
                    setTimeout(() => {
                        this.spinner.hide();
                      }, 2000);
                }
            );
        }
    }
    reset() {
        this.isSubmitted = false;
        this.fromContacto.reset();
    }
}
