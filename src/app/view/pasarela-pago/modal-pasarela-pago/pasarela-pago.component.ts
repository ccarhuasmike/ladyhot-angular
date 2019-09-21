import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
            nombre_completo: new FormControl("", Validators.required),
            correo: new FormControl("", Validators.required),
            telefono_celular: new FormControl("", Validators.required)

        });
        this.mostrarError = false;
        this.montoPagar = this["data"]["montoPagar"];
        this.descripcionCargo = this["data"]["descripcionCargo"];
        // Llave publica Stripe
        const stripe = Stripe(environment.stripeKey);
        // Crea element parte de la tarjeta que busca actualizaciones y muestra mensajes de error
        const elementos = stripe.elements();
        const tarjeta = elementos.create('cardNumber');
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
        this.formPago.addControl('cardnumber', new FormControl('', Validators.required));
        debugger;
        const expiracionTarjeta = elementos.create('cardExpiry');
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

        const cvcTarjeta = elementos.create('cardCvc');
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
            if (this.formPago.invalid) {
                return;
            }

            stripe.createToken(tarjeta).then(result => {
                if (result.error) {
                    console.log('Error creating payment method.');
                    const contenedorError = document.getElementById('errores-tarjeta');
                    contenedorError.textContent = result.error.message;
                    this.mostrarError = true;
                } else {
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
                    console.log('Token acquired!');
                    console.log(result.token);
                    console.log(result.token.id);
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
}