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

    constructor(
        private pasaPagoService: PasarelaPagoService) { }

    ngOnInit() {
        this.formPago = new FormGroup({
            nombre_completo: new FormControl("", [
                Validators.required,
                this.customPatternValid({ pattern: /[a-zA-Z]/, msg: 'Ingrese solo letras' })
            ]),
            correo: new FormControl("", [
                Validators.required,
                this.customPatternValid({ pattern: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, msg: 'Formato no correcto' })
            ]),
            telefono_celular: new FormControl("", [
                Validators.required,
                this.customPatternValid({ pattern: /[0-9]{9}/, msg: 'Formato no correcto' })
            ])

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