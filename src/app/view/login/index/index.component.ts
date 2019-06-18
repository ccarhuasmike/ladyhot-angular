import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { UsuarioService } from 'src/app/shared/services/usuario/usuario.service';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Component({
    selector: 'app-ingresar',
    templateUrl: "./index.component.html",
    styleUrls: ['./index.component.css']
})
export class IngresarComponent implements OnInit {
    formIngresar: FormGroup;
    isSubmitted: boolean = false;

    //Controles Datos de Contacto
    txt_emailCtrl: FormControl;
    txt_passwordCtrl: FormControl;

    constructor(
        private usuarioService: UsuarioService,
        private router: Router
    ) { }

    ngOnInit() {
        this.cargarControles();
    }

    cargarControles() {
        //Controles Datos para contactar
        this.txt_emailCtrl = new FormControl('', [Validators.required]);
        this.txt_passwordCtrl = new FormControl('', [Validators.required]);

        this.formIngresar = new FormGroup({
            txt_email: this.txt_emailCtrl,
            txt_password: this.txt_passwordCtrl
        });
    }

    /**
     * @function ingresar -> funcion que realiza el logueo
     */
    ingresar() {
        this.isSubmitted = true;
        if (!this.formIngresar.valid)
            return;
        let entidad: any = {};        
        entidad.tx_email = this.encriptar('123456$#@$^@1ERF', this.formIngresar.value.txt_email);
        entidad.tx_pass = this.encriptar('123456$#@$^@1ERF', this.formIngresar.value.txt_password);

        this.usuarioService.IniciarSession(entidad).subscribe(
            (res) => {
                console.log(res);
                if (res.result.Status == "OK") {
                    this.router.navigate(['panelcontrol/misanuncios']);                    
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
        // random salt for derivation
        var keySize = 256;
        var salt = CryptoJS.lib.WordArray.random(16);
        // well known algorithm to generate key
        var key = CryptoJS.PBKDF2(keys, salt, {
            keySize: keySize / 32,
            iterations: 100
        });
        // random IV
        var iv = CryptoJS.lib.WordArray.random(128 / 8);
        // specify everything explicitly
        var encrypted = CryptoJS.AES.encrypt(value, key, {
            iv: iv,
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC
        });
        // combine everything together in base64 string
        var result = CryptoJS.enc.Base64.stringify(salt.concat(iv).concat(encrypted.ciphertext));
        return result;
    }
}