import { Component, OnInit } from '@angular/core';
import { AnuncioService } from "../../../../../shared/services/anuncio/anuncio.service";
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { Tarifas, ModelCarga } from "../../../../models/modelanuncio";
import { forEach } from '@angular/router/src/utils/collection';
@Component({
    selector: 'app-not-found',
    templateUrl: './tarifas.component.html',
    styleUrls: ['./tarifas.component.css']
})
export class TarifasComponent implements OnInit {

    tarifas: Tarifas;
    result: any = null;

    isSubmittedTarifas: boolean = false;

    fromTarifa: FormGroup;
    //Controles Tarifa
    formapagoCtrl: FormArray;

    ListFormaPago: any = [];


    orders = [
        { id: 100, name: 'order 1' },
        { id: 200, name: 'order 2' },
        { id: 300, name: 'order 3' },
        { id: 400, name: 'order 4' }
    ];

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
    controls: any;

    constructor(
        private anuncioService: AnuncioService,
        private router: Router,
        private frmBuilder: FormBuilder

    ) { }

    ngOnInit() {
        this.tarifas = this.anuncioService.getTarifas();
        this.anuncioService.segundopaso(true);
        this.anuncioService.tercerpaso(true);
        this.anuncioService.cuartopaso(true);
        this.anuncioService.quintopaso(false);

        this.ListFormaPago = this.anuncioService.getListFormaPago();

        this.controls = this.ListFormaPago.map(c => new FormControl(false));
        this.controls[0].setValue(true);

        if (typeof this.tarifas.ListFormaPago === 'undefined' || this.tarifas.ListFormaPago === null) {
            this.ListFormaPago[0].flag = true;
        } else {
            this.setCheboxes(this.ListFormaPago, this.tarifas.ListFormaPago, this.controls);
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
            ListFormaPago: new FormArray(this.controls, this.minSelectedCheckboxes(1)),
            // orders: new FormArray(controlss),
            txt_30_min: this.txt_30_minCtrl,
            txt_45_min: this.txt_45_minCtrl,
            txt_1_hora: this.txt_1_horaCtrl,
            txt_1_30_hora: this.txt_1_30_horaCtrl,
            txt_2_hora: this.txt_2_horaCtrl,
            txt_3_hora: this.txt_3_horaCtrl,
            txt_salida: this.txt_salidaCtrl,
            txt_toda_noche: this.txt_toda_nocheCtrl,
            txt_viajes: this.txt_viajesCtrl,
            txt_descripcion_tarifas: this.txt_descripcion_tarifasCtrl
        });

        this.fromTarifa.patchValue({
            txt_30_min: this.tarifas.txt_30_min,
            txt_45_min: this.tarifas.txt_45_min,
            txt_1_hora: this.tarifas.txt_1_hora,
            txt_1_30_hora: this.tarifas.txt_1_30_hora,
            txt_2_hora: this.tarifas.txt_2_hora,
            txt_3_hora: this.tarifas.txt_3_hora,
            txt_salida: this.tarifas.txt_salida,
            txt_toda_noche: this.tarifas.txt_toda_noche,
            txt_viajes: this.tarifas.txt_viajes,
            txt_descripcion_tarifas: this.tarifas.txt_descripcion_tarifas
        });

    }

    setCheboxes(listCargados: any, listSeleccionado: ModelCarga[], controls: any) {
        for (let index = 0; index < listSeleccionado.length; index++) {
            for (let index1 = 0; index1 < listCargados.length; index1++) {
                if (listSeleccionado[index].codigo == listCargados[index1].codigo) {
                    listCargados[index1].flag = true;
                    this.controls[index1].setValue(true);
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

    onChangeFormaPago(codigo: number, isChecked: boolean) {

        let index = this.ListFormaPago.findIndex(x => x.codigo === codigo);
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

        debugger;
        const selectedFormapago = this.fromTarifa.value.ListFormaPago
            .map((v, i) => v ? this.ListFormaPago[i].codigo : null)
            .filter(v => v !== null);

        this.fromTarifa.value.ListFormaPago = this.getCheboxerSeleccionado(selectedFormapago);
        //console.log(selectedOrderIds);
        this.anuncioService.setTarifa(this.fromTarifa.value)
        this.router.navigate(['/anuncio/servicios']);
        // Code to save the data
        // const selectedOrderIds = this.fromTarifa.value.ListFormaPago
        //     .map((v, i) => v ? this.ListFormaPago[i].id : null)
        //     .filter(v => v !== null);

        // console.log(selectedOrderIds);


        // console.log(this.fromTarifa);
        // // userService.Save(this.register.value);
        // this.result = this.fromTarifa.value;
        // setTimeout(() => {
        //     this.result = null;
        //     this.resetTarifa();
        // }, 2000);
    }

    getCheboxerSeleccionado(ListSeleccionado: any): ModelCarga[] {
        const ListModelCarga = new Array<ModelCarga>();
        for (let index = 0; index < ListSeleccionado.length; index++) {
            const codigo = ListSeleccionado[index];
            ListModelCarga.push({
                codigo: codigo,
                descripcion: '',
                flag: false
            });
        }
        return ListModelCarga;
    }
    resetTarifa() {
        this.isSubmittedTarifas = false;
        this.fromTarifa.reset();
    }

    btnAtras(form: any) {
        this.router.navigate(['/anuncio/apariencia']);
    }
}
