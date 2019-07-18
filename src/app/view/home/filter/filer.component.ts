import { Component, OnInit } from '@angular/core';
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
  constructor(
    private parameter: ParameterService,
  ) { }

  ngOnInit() {

    this.parameter.getParameterFilterHome().subscribe(
      (res: ClientResponse) => {
        debugger;
        this.listParameter = JSON.parse(res.DataJson); // aqui se obtiene los paramter de la base de datos  
        this.ListDistrito = this.listParameter.distritro;
        this.ListLugarAtencion = this.listParameter.lugaratencion;
        this.ListTipoServicio = this.listParameter.servicio_ofrece;

        this.controlsDist = this.ListDistrito.map(c => new FormControl(false));
        this.controlsLugar = this.ListLugarAtencion.map(c => new FormControl(false));
        this.controlsTipServ = this.ListTipoServicio.map(c => new FormControl(false));
        this.controlsDist[0].setValue(true);
        this.ListDistrito[0].flag = true;
        this.controlsLugar[0].setValue(true);
        this.ListLugarAtencion[0].flag = true;
        this.controlsTipServ[0].setValue(true);
        this.ListTipoServicio[0].flag = true;
        debugger;
        this.fromGenerales = new FormGroup({
          ListDistrito: new FormArray(this.controlsDist),
          ListLugarAtencion: new FormArray(this.controlsLugar),
          ListTipoServicio: new FormArray(this.controlsTipServ)
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

  onFilterClick() {
    cdFilter();
  }
  onCloseClick() {
    cdClose();
  }
}

