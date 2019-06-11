import { Component, OnInit } from '@angular/core';
import { AnuncioService } from "../../../../shared/services/anuncio/anuncio.service";
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { Tarifas, ModelCarga } from "../../../models/modelanuncio";
import { ClientResponse, ClientResponseResult } from '../../../../Models/ClientResponseModels';
@Component({
    selector: 'app-tarifas',
    templateUrl: './tarifas.component.html',
    styleUrls: ['./tarifas.component.css']
})
export class TarifasComponent implements OnInit {

    tarifas: Tarifas;
    result: any = null;
    isSubmittedTarifas: boolean = false;
    fromTarifa: FormGroup;
    //Controles Tarifa
    ListFormaPago: any = [];


    txt_30_minCtrl: FormControl;
    txt_45_minCtrl: FormControl;
    txt_1_horaCtrl: FormControl;
    txt_1_30_horaCtrl: FormControl;
    txt_2_horaCtrl: FormControl;
    txt_3_horaCtrl: FormControl;
    txt_salidaCtrl: FormControl;
    txt_toda_nocheCtrl: FormControl;
    txt_viajesCtrl: FormControl;
    txt_descripcion_tarifasCtrl: FormControl;
    controlsFormaPago: any;
    DataJsonAnuncio: any;
    constructor(
        private anuncioService: AnuncioService,
        private router: Router,
        private frmBuilder: FormBuilder

    ) { }

    ngOnInit() {
        this.DataJsonAnuncio = JSON.parse(localStorage.getItem('DataAnuncio'));
        let listaParamter = JSON.parse(localStorage.getItem('listParamter'));
        this.anuncioService.segundopaso(true);
        this.anuncioService.tercerpaso(true);
        this.anuncioService.cuartopaso(true);
        this.anuncioService.quintopaso(false);
        this.anuncioService.sextopaso(false);
        this.ListFormaPago = listaParamter.formapago;

        this.controlsFormaPago = this.ListFormaPago.map(c => new FormControl(false));
        this.controlsFormaPago[0].setValue(true);
        //Validamos el seteo del distrito

        if (this.DataJsonAnuncio.txt_forma_pago != null) {
            this.setCheboxes(this.ListFormaPago, this.DataJsonAnuncio.txt_forma_pago, this.controlsFormaPago);
        } else {
            this.controlsFormaPago[0].setValue(true);
            this.ListFormaPago[0].flag = true;
        }
        this.txt_30_minCtrl = new FormControl('', [Validators.required]);
        this.txt_45_minCtrl = new FormControl('', [Validators.required]);
        this.txt_1_horaCtrl = new FormControl('', [Validators.required]);
        this.txt_1_30_horaCtrl = new FormControl('', [Validators.required]);
        this.txt_2_horaCtrl = new FormControl('', [Validators.required]);
        this.txt_3_horaCtrl = new FormControl('', [Validators.required]);
        this.txt_salidaCtrl = new FormControl('', [Validators.required]);
        this.txt_toda_nocheCtrl = new FormControl('', [Validators.required]);
        this.txt_viajesCtrl = new FormControl('', [Validators.required]);
        this.txt_descripcion_tarifasCtrl = new FormControl('', []);

        this.fromTarifa = this.frmBuilder.group({
            ListFormaPago: new FormArray(this.controlsFormaPago, this.minSelectedCheckboxes(1)),
            dbl_costo_x_tiempo_30min: this.txt_30_minCtrl,
            dbl_costo_x_tiempo_45min: this.txt_45_minCtrl,
            dbl_costo_x_tiempo_1hora: this.txt_1_horaCtrl,
            dbl_costo_x_tiempo_1hora_media: this.txt_1_30_horaCtrl,
            dbl_costo_x_tiempo_2hora: this.txt_2_horaCtrl,
            dbl_costo_x_tiempo_3hora: this.txt_3_horaCtrl,
            dbl_costo_x_tiempo_salidas: this.txt_salidaCtrl,
            dbl_costo_x_tiempo_toda_noche: this.txt_toda_nocheCtrl,
            dbl_costo_x_viaje: this.txt_viajesCtrl,
            txt_descripcion_extra_tarifa: this.txt_descripcion_tarifasCtrl
        });
        if (this.DataJsonAnuncio !== null) {
            this.fromTarifa.patchValue({
                dbl_costo_x_tiempo_30min: this.DataJsonAnuncio.dbl_costo_x_tiempo_30min,
                dbl_costo_x_tiempo_45min: this.DataJsonAnuncio.dbl_costo_x_tiempo_45min,
                dbl_costo_x_tiempo_1hora: this.DataJsonAnuncio.dbl_costo_x_tiempo_1hora,
                dbl_costo_x_tiempo_1hora_media: this.DataJsonAnuncio.dbl_costo_x_tiempo_1hora_media,
                dbl_costo_x_tiempo_2hora: this.DataJsonAnuncio.dbl_costo_x_tiempo_2hora,
                dbl_costo_x_tiempo_3hora: this.DataJsonAnuncio.dbl_costo_x_tiempo_3hora,
                dbl_costo_x_tiempo_salidas: this.DataJsonAnuncio.dbl_costo_x_tiempo_salidas,
                dbl_costo_x_tiempo_toda_noche: this.DataJsonAnuncio.dbl_costo_x_tiempo_toda_noche,
                dbl_costo_x_viaje: this.DataJsonAnuncio.dbl_costo_x_viaje,
                txt_descripcion_extra_tarifa: this.DataJsonAnuncio.txt_descripcion_extra_tarifa
            });
        }
    }

    setCheboxes(listCargados: any, listSeleccionado: string, controls: any) {
        let arraSeleccionado: any[] = listSeleccionado.split(",");
        for (let index = 0; index < arraSeleccionado.length; index++) {
            for (let index1 = 0; index1 < listCargados.length; index1++) {
                if (arraSeleccionado[index] == listCargados[index1].val_valor) {
                    listCargados[index1].flag = true;
                    controls[index1].setValue(true);
                }
            }
        }
    }
    minSelectedCheckboxes(min = 1) {
        const validator: ValidatorFn = (formArray: FormArray) => {
            const totalSelected = formArray.controls
                .map(control => control.value)
                .reduce((prev, next) => next ? prev + next : prev, 0);

            return totalSelected >= min ? null : { required: true };
        };
        return validator;
    }

    onChangeFormaPago(val_valor: number, isChecked: boolean) {

        let index = this.ListFormaPago.findIndex(x => x.val_valor === val_valor);
        if (isChecked) {
            this.ListFormaPago[index].flag = isChecked;
        } else {
            this.ListFormaPago[index].flag = isChecked;
        }
    }

    saveTarifa() {

        this.isSubmittedTarifas = true;
        if (!this.fromTarifa.valid)
            return;
        const selectedFormapago = this.fromTarifa.value.ListFormaPago
            .map((v, i) => v ? this.ListFormaPago[i].val_valor : null)
            .filter(v => v !== null);

        this.DataJsonAnuncio.dbl_costo_x_tiempo_30min = parseFloat(this.fromTarifa.value.dbl_costo_x_tiempo_30min);
        this.DataJsonAnuncio.dbl_costo_x_tiempo_45min = parseFloat(this.fromTarifa.value.dbl_costo_x_tiempo_45min);
        this.DataJsonAnuncio.dbl_costo_x_tiempo_1hora = parseFloat(this.fromTarifa.value.dbl_costo_x_tiempo_1hora);
        this.DataJsonAnuncio.dbl_costo_x_tiempo_1hora_media = parseFloat(this.fromTarifa.value.dbl_costo_x_tiempo_1hora_media);
        this.DataJsonAnuncio.dbl_costo_x_tiempo_2hora = parseFloat(this.fromTarifa.value.dbl_costo_x_tiempo_2hora);
        this.DataJsonAnuncio.dbl_costo_x_tiempo_3hora = parseFloat(this.fromTarifa.value.dbl_costo_x_tiempo_3hora);
        this.DataJsonAnuncio.dbl_costo_x_tiempo_salidas = parseFloat(this.fromTarifa.value.dbl_costo_x_tiempo_salidas);
        this.DataJsonAnuncio.dbl_costo_x_tiempo_toda_noche = parseFloat(this.fromTarifa.value.dbl_costo_x_tiempo_toda_noche);
        this.DataJsonAnuncio.dbl_costo_x_viaje = parseFloat(this.fromTarifa.value.dbl_costo_x_viaje);
        this.DataJsonAnuncio.txt_forma_pago = this.getCheboxerSeleccionado(selectedFormapago);
        this.DataJsonAnuncio.txt_descripcion_extra_tarifa = this.fromTarifa.value.txt_descripcion_extra_tarifa;

        this.anuncioService.SaveCuartoPaso(this.DataJsonAnuncio).subscribe(
            (res) => {
                if (res.Status == "OK") {
                    let DataJsonAnuncio: any = res.Data;
                    localStorage.setItem('DataAnuncio', DataJsonAnuncio);
                    this.router.navigate(['DashboardAnuncion/nuevoanuncio/servicios']);
                }
            }
        );

        // console.log(this.fromTarifa);
        // // userService.Save(this.register.value);
        // this.result = this.fromTarifa.value;
        // setTimeout(() => {
        //     this.result = null;
        //     this.resetTarifa();
        // }, 2000);
    }

    getCheboxerSeleccionado(ListSeleccionado: any): string {

        let selecionado: string = "";
        for (let index = 0; index < ListSeleccionado.length; index++) {
            selecionado += ListSeleccionado[index] + ",";
        }
        selecionado = selecionado.substring(0, selecionado.length - 1);
        return selecionado;
    }
    resetTarifa() {
        this.isSubmittedTarifas = false;
        this.fromTarifa.reset();
    }

    btnAtras(form: any) {
        this.router.navigate(['DashboardAnuncion/nuevoanuncio/apariencia']);
    }
}
