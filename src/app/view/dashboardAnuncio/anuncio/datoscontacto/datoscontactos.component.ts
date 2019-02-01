import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { AnuncioService } from "../../../../shared/services/anuncio/anuncio.service";
import { DatosContacto } from "../../../models/modelanuncio";
import { Tbl_anuncio } from '../../../../Models/Tbl_anuncioModels';
import { ParameterService } from "../../../../shared/services/anuncio/parameter.service";
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
    usernameCtrl: FormControl;
    emailCtrl: FormControl;
    WebCtrl: FormControl;
    Telefono1Ctrl: FormControl;
    Telefono2Ctrl: FormControl;

    RegEx_mailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
    RegEx_web = "^(http[s]?:\\/\\/){0,1}(www\\.){0,1}[a-zA-Z0-9\\.\\-]+\\.[a-zA-Z]{2,5}[\\.]{0,1}$";
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
        this.usernameCtrl = new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(15)]);
        this.emailCtrl = new FormControl('', [Validators.required, Validators.pattern(this.RegEx_mailPattern)]);
        this.WebCtrl = new FormControl('', [Validators.pattern(this.RegEx_web)]);
        this.Telefono1Ctrl = new FormControl('', [Validators.required, Validators.pattern(this.RegEx_Telefono)]);
        this.Telefono2Ctrl = new FormControl('', [Validators.required, Validators.pattern(this.RegEx_Telefono)]);


        this.fromContacto = new FormGroup({
            username: this.usernameCtrl,
            email: this.emailCtrl,
            web: this.WebCtrl,
            telefono1: this.Telefono1Ctrl,
            telefono2: this.Telefono2Ctrl
        });
        this.fromContacto.patchValue({
            username: this.datoscontacto.txt_nombre,
            email: this.datoscontacto.txt_email,
            web: this.datoscontacto.txt_web,
            telefono1: this.datoscontacto.txt_telefono1,
            telefono2: this.datoscontacto.txt_telefono2
        });
    }

    save() {
        this.isSubmitted = true;
        if (!this.fromContacto.valid)
            return;

        debugger;
        let entidad: any = {};
        entidad.txt_nombre_ficha = this.fromContacto.value.username;
        entidad.txt_telefono_1 = this.fromContacto.value.telefono1;
        entidad.txt_telefono_2 = this.fromContacto.value.telefono2;
        entidad.txt_email = this.fromContacto.value.email;
        entidad.txt_web = "";
        this.anuncioService.SavePrimerPaso(entidad).subscribe(
            (res: PaginatedResult<any[]>) => {
                //this.listParameter = res.result;
                console.log(res.result);
                // localStorage.setItem('listParamter', JSON.stringify(this.listParameter));
            }
        );

        // var datoscontacto: Tbl_anuncio = {
        //     cod_anuncio_encryptado
        //     // txt_nombre: this.formData.txt_nombre,
        //     // txt_telefono1: this.formData.txt_telefono1,
        //     // txt_telefono2: this.formData.txt_telefono2,
        //     // txt_web: this.formData.txt_web,
        //     // txt_email: this.formData.txt_email,
        //     // txt_descripcion_contacto: this.formData.txt_descripcion_contacto
        // };
        this.anuncioService.setDatosContacto(this.fromContacto.value)
        this.router.navigate(['DashboardAnuncion/nuevoanuncio/datos-generales']);
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
