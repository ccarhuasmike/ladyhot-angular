import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { AnuncioService } from "../../../../shared/services/anuncio/anuncio.service";
import { DatosContacto } from "../../../models/modelanuncio";

@Component({
    selector: 'app-datoscontactos',
    templateUrl: '/datoscontactos.component.html',
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

    constructor(private router: Router,
        private anuncioService: AnuncioService
    ) { }

    ngOnInit() {
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
