import { Component, OnInit } from '@angular/core';
import { AnuncioService } from "../../../../shared/services/anuncio/anuncio.service";
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { Apariencia } from "../../../models/modelanuncio";
import { ClientResponse, ClientResponseResult } from '../../../../Models/ClientResponseModels';
@Component({
    selector: 'app-apariencia',
    templateUrl: './apariencia.component.html',
    styleUrls: ['./apariencia.component.css']
})
export class AparienciaComponent implements OnInit {

    apariencia: Apariencia;
    fromApariencia: FormGroup;

    isSubmittedApariencia: boolean = false;
    result: any = null;

    ListCabellos: any = [];
    ListOjos: any = [];
    ListEstatura: any = [];
    ListPeso: any = [];

    //Controles Apariencia
    bustoCtrl: FormControl;
    cinturaCtrl: FormControl;
    caderaCtrl: FormControl;
    int_color_cabelloCtrl: FormControl;
    int_color_ojosCtrl: FormControl;
    int_estaturaCtrl: FormControl;
    int_pesoCtrl: FormControl;
    txt_descripcion_extra_aparienciaCtrl: FormControl;
    DataJsonAnuncio: any;
    constructor(
        private anuncioService: AnuncioService,
        private router: Router,
    ) { }

    ngOnInit() {
        this.DataJsonAnuncio = JSON.parse(localStorage.getItem('DataAnuncio'));
        let listaParamter = JSON.parse(localStorage.getItem('listParamter'));
        this.apariencia = this.anuncioService.getApariencia();
        this.anuncioService.segundopaso(true);
        this.anuncioService.tercerpaso(true);
        this.anuncioService.cuartopaso(false);
        this.anuncioService.quintopaso(false);
        this.anuncioService.sextopaso(false);

        this.ListCabellos = listaParamter.color_cabello;//this.anuncioService.getListCabellos();
        this.ListOjos = listaParamter.color_ojos;//this.anuncioService.getListOjos();
        this.ListEstatura = listaParamter.estatura; //this.anuncioService.getListEstatura();
        this.ListPeso = listaParamter.peso;// this.anuncioService.getListPeso();
        //Controles Apariencia
        this.bustoCtrl = new FormControl('', [Validators.required]);
        this.cinturaCtrl = new FormControl('', [Validators.required]);
        this.caderaCtrl = new FormControl('', [Validators.required]);

        this.int_color_cabelloCtrl = new FormControl('', [Validators.required]);
        this.int_color_ojosCtrl = new FormControl('', [Validators.required]);
        this.int_estaturaCtrl = new FormControl('', [Validators.required]);
        this.int_pesoCtrl = new FormControl('', [Validators.required]);
        this.txt_descripcion_extra_aparienciaCtrl = new FormControl('', [Validators.maxLength(450)]);
        this.fromApariencia = new FormGroup({
            busto: this.bustoCtrl,
            cintura: this.cinturaCtrl,
            cadera: this.caderaCtrl,
            int_color_cabello: this.int_color_cabelloCtrl,
            int_color_ojos: this.int_color_ojosCtrl,
            int_estatura: this.int_estaturaCtrl,
            int_peso: this.int_pesoCtrl,
            txt_descripcion_extra_apariencia: this.txt_descripcion_extra_aparienciaCtrl
        });
        if (this.DataJsonAnuncio !== null) {
            this.fromApariencia.patchValue({
                busto: this.DataJsonAnuncio.txt_medidas_busto_cintura_cadera == null ? "" : this.DataJsonAnuncio.txt_medidas_busto_cintura_cadera.split("-")[0],
                cintura: this.DataJsonAnuncio.txt_medidas_busto_cintura_cadera == null ? "" : this.DataJsonAnuncio.txt_medidas_busto_cintura_cadera.split("-")[1],
                cadera: this.DataJsonAnuncio.txt_medidas_busto_cintura_cadera == null ? "" : this.DataJsonAnuncio.txt_medidas_busto_cintura_cadera.split("-")[2],
                int_color_cabello: this.DataJsonAnuncio.int_color_cabello == 0 ? "" : this.DataJsonAnuncio.int_color_cabello,
                int_color_ojos: this.DataJsonAnuncio.int_color_ojos == 0 ? "" : this.DataJsonAnuncio.int_color_ojos,
                int_estatura: this.DataJsonAnuncio.int_estatura == 0 ? "" : this.DataJsonAnuncio.int_estatura,
                int_peso: this.DataJsonAnuncio.int_peso == 0 ? "" : this.DataJsonAnuncio.int_peso,
                txt_descripcion_extra_apariencia: this.DataJsonAnuncio.txt_descripcion_extra_apariencia
            });
        }
    }

    selectName() {

    }
    saveApariencia() {

        this.isSubmittedApariencia = true;
        if (!this.fromApariencia.valid)
            return;
        
        this.DataJsonAnuncio.int_color_cabello = parseInt(this.fromApariencia.value.int_color_cabello);
        this.DataJsonAnuncio.int_color_ojos = parseInt(this.fromApariencia.value.int_color_ojos);
        this.DataJsonAnuncio.int_estatura = parseInt(this.fromApariencia.value.int_estatura);
        this.DataJsonAnuncio.int_peso = parseInt(this.fromApariencia.value.int_peso);
        this.DataJsonAnuncio.txt_medidas_busto_cintura_cadera = this.fromApariencia.value.busto + "-" + this.fromApariencia.value.cintura + "-" + this.fromApariencia.value.cadera;
        this.DataJsonAnuncio.txt_descripcion_extra_apariencia = this.fromApariencia.value.txt_descripcion_extra_apariencia;
        this.anuncioService.SaveTerceroPaso(this.DataJsonAnuncio).subscribe(
            (res: ClientResponseResult<ClientResponse>) => {
                if (res.result.Status == "OK") {
                    let DataJsonAnuncio: any = res.result.Data;
                    localStorage.setItem('DataAnuncio', DataJsonAnuncio);
                    this.router.navigate(['DashboardAnuncion/nuevoanuncio/tarifa']);
                }
            }
        );
        // busto: this.bustoCtrl,
        // cintura: this.cinturaCtrl,
        // cadera: this.caderaCtrl,
        // cabello: this.int_color_cabelloCtrl,
        // ojos: this.int_color_ojosCtrl,
        // estatura: this.int_estaturaCtrl,
        // peso: this.int_pesoCtrl,
        // descripcionapariencia: this.txt_descripcion_extra_aparienciaCtrl

        // this.anuncioService.setApariencia(this.fromApariencia.value)
        // this.router.navigate(['DashboardAnuncion/nuevoanuncio/tarifa']);

        // userService.Save(this.register.value);
        // this.result = this.fromApariencia.value;
        // setTimeout(() => {
        //     this.result = null;
        //     this.resetApariencia();
        // }, 2000);
    }
    resetApariencia() {
        this.isSubmittedApariencia = false;
        this.fromApariencia.reset();

    }

    btnAtras(form: any) {
        this.router.navigate(['DashboardAnuncion/nuevoanuncio/datos-generales']);
    }



}
