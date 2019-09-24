import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { PasarelaPagoService } from 'src/app/shared/services/pasarela-pago/pasarela-pago';
import { environment } from 'src/environments/environment';

declare var Stripe: any;

@Component({
    selector: 'app-modal-pasarela-pago',
    templateUrl: './pasarela-pago.component.html',
    styleUrls: ['./pasarela-pago.component.css']
})
export class ModalPasarelaPagoComponent {
    montoPagar: number;
    descripcionCargo: string;
    mostrarError: boolean;
    submitted = false;
    public formPago = null;

    //Controles Datos de Contacto
    txt_numero_tarjetaCtrl: FormControl;
    txt_expiracionCtrl: FormControl;
    txt_cvvCtrl: FormControl;
    txt_emailCtrl: FormControl;    
   //Registro de Expresiones
   RegEx_mailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";

    constructor(
        private pasaPagoService: PasarelaPagoService) { }

    ngOnInit() {
        this.txt_numero_tarjetaCtrl = new FormControl('', [Validators.required]);
        this.txt_expiracionCtrl = new FormControl('', [Validators.required]);
        this.txt_emailCtrl = new FormControl('', [Validators.required, Validators.pattern(this.RegEx_mailPattern)]);
        this.txt_cvvCtrl = new FormControl('', [Validators.required]);
        // this.txt_telefono_1Ctrl = new FormControl('', [Validators.required, Validators.pattern(this.RegEx_Telefono)]);
        // this.txt_telefono_2Ctrl = new FormControl('', [Validators.required, Validators.pattern(this.RegEx_Telefono)]);

        // this.fromContacto = new FormGroup({
        //     txt_nombre_ficha: this.txt_nombre_fichaCtrl,
        //     txt_email: this.txt_emailCtrl,
        //     txt_web: this.txt_webCtrl,
        //     txt_telefono_1: this.txt_telefono_1Ctrl,
        //     txt_telefono_2: this.txt_telefono_2Ctrl
        // });

        this.formPago = new FormGroup({
            txt_numero_tarjeta: this.txt_numero_tarjetaCtrl,
            txt_expiracion: this.txt_expiracionCtrl,            
            txt_cvv: this.txt_cvvCtrl,
            txt_email: this.txt_emailCtrl           
        });
        this.mostrarError = false;
        this.montoPagar = this["data"]["montoPagar"];
        this.descripcionCargo = this["data"]["descripcionCargo"];
        // Llave publica Stripe
        const stripe = Stripe(environment.stripeKey);
        // Crea element parte de la tarjeta que busca actualizaciones y muestra mensajes de error
        const elementos = stripe.elements();
        const tarjeta = elementos.create('cardNumber', {
            classes: {
                base: "form-control",
                invalid: "is-invalid"
            }
        });
        tarjeta.mount('#elemento-tarjeta');
        tarjeta.addEventListener('change', event => {
            const contenedorError = document.getElementById('errores-tarjeta');
            if (event.error) {
                this.mostrarError = true;
                contenedorError.textContent = event.error.message;
            } else {
                contenedorError.textContent = '';
                this.mostrarError = false;
            }
        });

        const expiracionTarjeta = elementos.create('cardExpiry', {
            classes: {
                base: "form-control",
                invalid: "is-invalid"
            }
        });
        expiracionTarjeta.mount('#expiracion-tarjeta');
        expiracionTarjeta.addEventListener('change', event => {
            const contenedorError = document.getElementById('errores-tarjeta');
            if (event.error) {
                this.mostrarError = true;
                contenedorError.textContent = event.error.message;
            } else {
                contenedorError.textContent = '';
                this.mostrarError = false;
            }
        });

        const cvcTarjeta = elementos.create('cardCvc', {
            classes: {
                base: "form-control",
                invalid: "is-invalid"
            }
        });
        cvcTarjeta.mount('#cvc-tarjeta');
        cvcTarjeta.addEventListener('change', event => {
            const contenedorError = document.getElementById('errores-tarjeta');
            if (event.error) {
                this.mostrarError = true;
                contenedorError.textContent = event.error.message;
            } else {
                contenedorError.textContent = '';
                this.mostrarError = false;
            }
        });

        // Escucha el envio y procesa el formulario con Stripe,
        const formPago = document.getElementById('form_pago');
        formPago.addEventListener('submit', event => {
            event.preventDefault();
            debugger;
            this.submitted = true;
            /*if (this.formPago.invalid) {
                return;
            }*/

            stripe.createToken(tarjeta, expiracionTarjeta, cvcTarjeta).then(result => {
                if (result.error) {
                    console.log('Error creating payment method.');
                    const contenedorError = document.getElementById('errores-tarjeta');
                    contenedorError.textContent = result.error.message;
                    this.mostrarError = true;
                } else {
                    if (this.formPago.invalid) {
                        return;
                    }

                    this.mostrarError = false;
                    // Envia el token de identificacion para adjuntar la fuente de pago al cliente
                    let infoCargo = {
                        stripeToken: result.token.id,
                        correo: formPago["correo"].value,
                        nombreCompleto: formPago["nombre_completo"].value,
                        telefonoCelular: formPago["telefono_celular"].value,
                        montoPagar: this.montoPagar,
                        descripcionCargo: this.descripcionCargo,
                        idAnuncio: 1167,//cambiar el 1 por codigo de anucio real
                        //product: this.product,

                    }
                    this.pasaPagoService.CrearCargo(infoCargo).subscribe(
                        (res) => {
                            console.log(res);
                            this.onReset();
                        }
                    );
                }
            });
        });
    }

    /*Limpiar los controles del formulario*/
    onReset() {
        this.submitted = false;
        this.formPago.reset();
    }

    /*Accede facilmente a los campos de formulario*/
    get f() { return this.formPago.controls; }

    /*
    Metodo que validar patron regular y retorna mensaje validacion
    @param:regex
    @param:mensaje
    */
    public customPatternValid(config: any): ValidatorFn {
        return (control: FormControl) => {
            let urlRegEx: RegExp = config.pattern;
            if (control.value && !control.value.match(urlRegEx)) {
                return {
                    invalidMsg: config.msg
                };
            } else {
                return null;
            }
        };
    }
}