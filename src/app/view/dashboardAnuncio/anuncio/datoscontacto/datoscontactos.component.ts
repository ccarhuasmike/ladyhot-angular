import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { AnuncioService } from "../../../../shared/services/anuncio/anuncio.service";
import { DatosContacto } from "../../../models/modelanuncio";
import { Tbl_anuncio } from '../../../../Models/Tbl_anuncioModels';
import { ParameterService } from "../../../../shared/services/anuncio/parameter.service";
import { ClientResponse, ClientResponseResult } from '../../../../Models/ClientResponseModels';
import { PaginatedResult } from '../../../../Models/Tbl_parameter_detModels';


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

    listParameter: any;

    constructor(private router: Router,
        private anuncioService: AnuncioService,
        private parameter: ParameterService
    ) { }

    ngOnInit() {
        this.parameter.getParameter().subscribe(
            (res: PaginatedResult<any[]>) => {
                this.listParameter = res.result;
                localStorage.setItem('listParamter', JSON.stringify(this.listParameter));
            }
        );
        this.datoscontacto = this.anuncioService.getDatosContacto();
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
        this.fromContacto.patchValue({
            txt_nombre_ficha: this.datoscontacto.txt_nombre,
            //txt_email: this.datoscontacto.txt_txt_email,
            //txt_web: this.datoscontacto.txt_txt_web,
            //txt_telefono_1: this.datoscontacto.txt_txt_telefono_1,
            //txt_telefono_2: this.datoscontacto.txt_txt_telefono_2
        });
    }

    save() {
        this.isSubmitted = true;
        if (!this.fromContacto.valid)
            return;

        let entidad: any = {};
        entidad.id_usuario = 11;
        entidad.txt_nombre_ficha = this.fromContacto.value.txt_nombre_ficha;
        entidad.txt_telefono_1 = this.fromContacto.value.txt_telefono_1;
        entidad.txt_telefono_2 = this.fromContacto.value.txt_telefono_2;
        entidad.txt_txt_email = this.fromContacto.value.txt_email;
        entidad.txt_web = this.fromContacto.value.txt_web;
        this.anuncioService.SavePrimerPaso(entidad).subscribe(
            (res: ClientResponseResult<ClientResponse>) => {
                //this.listParameter = res.result;                
                if (res.result.Status == "OK") {
                    this.anuncioService.setDatosContacto(this.fromContacto.value)
                    this.router.navigate(['DashboardAnuncion/nuevoanuncio/datos-generales']);
                }
                // localStorage.setItem('listParamter', JSON.stringify(this.listParameter));
            }
        );
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
    reset() {
        this.isSubmitted = false;
        this.fromContacto.reset();

    }

}
