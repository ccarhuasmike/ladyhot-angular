import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { ParameterService } from "../../../shared/services/anuncio/parameter.service";
import { ClientResponse } from 'src/app/Models/ClientResponseModels';
import { FormGroup, Validators, FormControl, FormArray, ValidatorFn } from '@angular/forms';
declare const cdFilter: any;
declare const cdClose: any;
@Component({
  selector: 'app-filter',
  templateUrl: "./filter.component.html",
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  fromGenerales: FormGroup;
  ListDistrito: any = [];
  ListLugarAtencion: any = [];
  ListTipoServicio: any = [];
  listParameter: any;

  //Controles Servicios
  controlsDist: any;
  controlsLugar: any;
  controlsTipServ: any;
  entidad: any = {};
  txt_nombre_fichaCtrl: FormControl;
  @Output() PasameElPueblo = new EventEmitter();

  constructor(
    private parameter: ParameterService,
  ) { }

  ngOnInit() {

    this.parameter.getParameterFilterHome().subscribe(
      (res: ClientResponse) => {

        this.listParameter = JSON.parse(res.DataJson); // aqui se obtiene los paramter de la base de datos  
        this.ListDistrito = this.listParameter.distritro;
        this.ListLugarAtencion = this.listParameter.lugaratencion;
        this.ListTipoServicio = this.listParameter.servicio_ofrece;

        this.controlsDist = this.ListDistrito.map(c => new FormControl(false));
        this.controlsLugar = this.ListLugarAtencion.map(c => new FormControl(false));
        this.controlsTipServ = this.ListTipoServicio.map(c => new FormControl(false));
        this.txt_nombre_fichaCtrl = new FormControl('');
   
        this.fromGenerales = new FormGroup({
          ListDistrito: new FormArray(this.controlsDist),
          ListLugarAtencion: new FormArray(this.controlsLugar),
          ListTipoServicio: new FormArray(this.controlsTipServ),
          txt_nombre_ficha: this.txt_nombre_fichaCtrl
        });
      }
    );
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
  onChangeDistrito(val_valor: number, isChecked: boolean) {

    let index = this.ListDistrito.findIndex(x => x.val_valor === val_valor);
    if (isChecked) {
      this.ListDistrito[index].flag = isChecked;
    } else {
      this.ListDistrito[index].flag = isChecked;
    }
  }

  onChangeLugarAtencion(val_valor: number, isChecked: boolean) {

    let index = this.ListLugarAtencion.findIndex(x => x.val_valor === val_valor);
    if (isChecked) {
      this.ListLugarAtencion[index].flag = isChecked;
    } else {
      this.ListLugarAtencion[index].flag = isChecked;
    }
  }

  onChangeTipoServicio(val_valor: number, isChecked: boolean) {

    let index = this.ListTipoServicio.findIndex(x => x.val_valor === val_valor);
    if (isChecked) {
      this.ListTipoServicio[index].flag = isChecked;
    } else {
      this.ListTipoServicio[index].flag = isChecked;
    }
  }
  getCheboxerSeleccionado(ListSeleccionado: any): string {
    let selecionado: string = "";
    for (let index = 0; index < ListSeleccionado.length; index++) {
      selecionado += ListSeleccionado[index] + ",";
    }
    selecionado = selecionado.substring(0, selecionado.length - 1);
    return selecionado;
  }

  cancelar() {
    //Implementar logica limpiar controles
  }

  save() {
    const selectedDistrito = this.fromGenerales.value.ListDistrito
      .map((v, i) => v ? this.ListDistrito[i].val_valor : null)
      .filter(v => v !== null);

    const selectedLugarAtencion = this.fromGenerales.value.ListLugarAtencion
      .map((v, i) => v ? this.ListLugarAtencion[i].val_valor : null)
      .filter(v => v !== null);
    const selectedTipoServicio = this.fromGenerales.value.ListTipoServicio
      .map((v, i) => v ? this.ListTipoServicio[i].val_valor : null)
      .filter(v => v !== null);
    this.entidad.txt_nombre_ficha = this.fromGenerales.value.txt_nombre_ficha;
    this.entidad.txt_lugar_servicio_distrito = this.getCheboxerSeleccionado(selectedDistrito);
    this.entidad.tx_lugar_atencion = this.getCheboxerSeleccionado(selectedLugarAtencion);
    this.entidad.tx_servicios_ofrece = this.getCheboxerSeleccionado(selectedTipoServicio);
    this.PasameElPueblo.emit({ entidad: this.entidad });
  }

  onFilterClick() {
    cdFilter();
  }
  onCloseClick() {
    cdClose();
  }
}

