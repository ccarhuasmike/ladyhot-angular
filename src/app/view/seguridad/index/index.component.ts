import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { UsuarioService } from 'src/app/shared/services/usuario/usuario.service';
import { SeguridadService } from 'src/app/shared/services/seguridad/seguridad.service';
import { Router } from '@angular/router';
// import * as CryptoJS from 'crypto-js';

@Component({
    selector: 'app-ingresar',
    templateUrl: "./index.component.html",
    styleUrls: ['./index.component.css']
})
export class IngresarComponent implements OnInit {
    formLogin: FormGroup;
    formGenerarPassword: FormGroup;
    isSubmitted: boolean = false;
    //Controles Datos de Contacto
    txt_emailCtrl: FormControl;
    txt_passwordCtrl: FormControl;

    txt_emailGenerarPasswordCtrl: FormControl;

    constructor(
        private usuarioService: UsuarioService,
        private router: Router,
        private seguridadService: SeguridadService
    ) { }

    ngOnInit() {
        this.cargarControles();
    }

    cargarControles() {
        //Controles Datos para contactar
        this.txt_emailCtrl = new FormControl('', [Validators.required]);
        this.txt_passwordCtrl = new FormControl('', [Validators.required]);

        this.txt_emailGenerarPasswordCtrl = new FormControl('ccarhuas.mike@gmail.com', [Validators.required]);        

        this.formLogin = new FormGroup({
            txt_email: this.txt_emailCtrl,
            txt_password: this.txt_passwordCtrl
        });
        this.formGenerarPassword = new FormGroup({
            txt_emailGenerarPassword: this.txt_emailGenerarPasswordCtrl            
        });
    }

    /**
     * @function ingresar -> funcion que realiza el logueo
     */
    login() {
        this.isSubmitted = true;
        if (!this.formLogin.valid)
            return;
        let entidad: any = {};
        entidad.tx_email = this.formLogin.value.txt_email;
        entidad.tx_pass = this.formLogin.value.txt_password;
        // entidad.tx_email = this.encriptar('123456$#@$^@1ERF', this.formIngresar.value.txt_email);
        // entidad.tx_pass = this.encriptar('123456$#@$^@1ERF', this.formIngresar.value.txt_password);
        this.usuarioService.IniciarSession(entidad).subscribe(
            (res) => {
                if (res.Status == "OK") {
                    if (res.Data != null) {
                        localStorage.setItem('DataUsuarioLogeado', JSON.stringify(res.Data));
                        this.router.navigate(['panelcontrol/misanuncios']);
                    } else {
                        console.log("usuario y/o contraseña incorrecto");
                    }
                } else {
                    console.log("ejecute Error");
                }
            }
        );
    }

    GenerarPassword() {
        this.isSubmitted = true;
        if (!this.formGenerarPassword.valid)
            return;
        let entidad: any = {};
        debugger;
        entidad.tx_email = this.formGenerarPassword.value.txt_emailGenerarPassword;        
        // entidad.tx_email = this.encriptar('123456$#@$^@1ERF', this.formIngresar.value.txt_email);
        // entidad.tx_pass = this.encriptar('123456$#@$^@1ERF', this.formIngresar.value.txt_password);
        this.seguridadService.EnvioEmailGenerarContrasenia(entidad).subscribe(
            (res) => {
                if (res.Status == "OK") {
                    // let DataJsonAnuncio: any = res.Data;
                    // localStorage.setItem('DataAnuncio', DataJsonAnuncio);
                    // this.router.navigate(['panelcontrol/nuevoanuncio/datos-generales']);
                } else {
                    console.log("ejecute Error");
                }
            }
        );      
    }

    
    /**
     * @function encriptar -> funcion que encripta
     * @param keys -> llave del valor encriptado
     * @param value -> valor encriptado
     */
    encriptar(keys, value) {
        // // random salt for derivation
        // var keySize = 256;
        // var salt = CryptoJS.lib.WordArray.random(16);
        // // well known algorithm to generate key
        // var key = CryptoJS.PBKDF2(keys, salt, {
        //     keySize: keySize / 32,
        //     iterations: 100
        // });
        // // random IV
        // var iv = CryptoJS.lib.WordArray.random(128 / 8);
        // // specify everything explicitly
        // var encrypted = CryptoJS.AES.encrypt(value, key, {
        //     iv: iv,
        //     padding: CryptoJS.pad.Pkcs7,
        //     mode: CryptoJS.mode.CBC
        // });
        // combine everything together in base64 string
        var result = "";//CryptoJS.enc.Base64.stringify(salt.concat(iv).concat(encrypted.ciphertext));
        return result;
    }
}