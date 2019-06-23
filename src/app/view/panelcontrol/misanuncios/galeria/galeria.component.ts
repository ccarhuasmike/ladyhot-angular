import { Component, OnInit } from '@angular/core';
import { Tbl_galeria_anuncio } from "../../../../Models/Tbl_galeria_anuncioModels";
import { ActivatedRoute } from '@angular/router';
import { AnuncioService } from "../../../../shared/services/anuncio/anuncio.service";
import { Location } from '@angular/common';
@Component({
    selector: 'app-editanuncio',
    templateUrl: './galeria.component.html',
    styleUrls: ['./galeria.component.css']
})
export class GaleriaComponent implements OnInit {
    public ListGaleria: Tbl_galeria_anuncio[] = [];
    public ListGaleriaPortada: Tbl_galeria_anuncio[] = [];
    constructor(
        private anuncioService: AnuncioService,
        private route: ActivatedRoute,
        private _location: Location
    ) {
    }
    ngOnInit() {
        let objeto: any = {};
        objeto.id_anuncio = parseInt(this.route.params["value"]["id"]);
        this.anuncioService.GetGaleriaXIdAnuncio(objeto).subscribe(
            (res) => {
                if (res.Status == "OK") {
                    var listGaleria = JSON.parse(res.DataJson)
                    this.listarGaleria(listGaleria);
                }
            }
        );
    }
    listarGaleria(data) {
        this.ListGaleria = [];
        this.ListGaleriaPortada = [];

        var dataGaleriaPortada = data.filter(function (el) {
            return el.IdTipoPresentacion == 1
        });

        var dataGaleria = data.filter(function (el) {
            return el.IdTipoPresentacion == 2
        });

        for (let index = 0; index < 1; index++) {
            var resultObject = dataGaleriaPortada[index];
            if (resultObject != null) {
                console.log(resultObject.txt_ruta_virtuales_cortada);
                this.ListGaleriaPortada.push(resultObject);
            } else {
                const tbl_galeria_anuncio: Tbl_galeria_anuncio = {
                    id: index,
                    tx_filename: "",
                    tx_ruta_file: "",
                    tx_ruta_file_cort: "",
                    size_file: 0,
                    id_tipo_archivo: 0,
                    dt_fe_crea: new Date(),
                    id_anuncio: 0,
                    txt_ruta_virtuales: "",
                    txt_ruta_virtuales_cortada: "",
                    progressbar: 0
                };
                this.ListGaleriaPortada.push(tbl_galeria_anuncio);
            }
        }

        for (let index = 0; index <= 5; index++) {
            var resultObject = dataGaleria[index];
            if (resultObject != null) {
                console.log(resultObject.txt_ruta_virtuales_cortada);
                this.ListGaleria.push(resultObject);
            } else {
                const tbl_galeria_anuncio: Tbl_galeria_anuncio = {
                    id: index,
                    tx_filename: "",
                    tx_ruta_file: "",
                    tx_ruta_file_cort: "",
                    size_file: 0,
                    id_tipo_archivo: 0,
                    dt_fe_crea: new Date(),
                    id_anuncio: 0,
                    txt_ruta_virtuales: "",
                    txt_ruta_virtuales_cortada: "",
                    progressbar: 0
                };
                this.ListGaleria.push(tbl_galeria_anuncio);
            }
        }
    }
    ClickEliminar(id: number, IdTipoPresentacion: number) {
        let objeto: any = {};
        objeto.id = id;
        objeto.id_anuncio = parseInt(this.route.params["value"]["id"]);
        this.anuncioService.EliminarGaleriaXId(objeto).subscribe(
            (res) => {
                if (res.Status == "OK") {
                    if (IdTipoPresentacion == 1) {
                        this.ListGaleriaPortada[this.ListGaleriaPortada.findIndex(x => x.id == id)].txt_ruta_virtuales_cortada = "";
                    } else {
                        this.ListGaleria[this.ListGaleria.findIndex(x => x.id == id)].txt_ruta_virtuales_cortada = "";
                    }
                }
            }
        );
    }
    cancelar() {
        this._location.back();
    }
    displayPhoto(fileInput, id: number, IdTipoPresentacion: number) {
        if (fileInput.target.files && fileInput.target.files[0]) {
            const reader = new FileReader();
            if (fileInput.target.files && fileInput.target.files.length > 0) {
                let file = fileInput.target.files[0];
                reader.onloadend = (e) => {
                    //Actualizamos el objeto del list

                    if (IdTipoPresentacion = 1) {
                        this.ListGaleriaPortada.map((todo, i) => {
                            debugger;
                            if (todo.id == id) {

                                let objeto: any = {};
                                objeto.tx_ruta_file = reader.result;
                                objeto.IdTipoPresentacion = IdTipoPresentacion;
                                objeto.id_anuncio = parseInt(this.route.params["value"]["id"]);
                                objeto.tx_ruta_file = objeto.tx_ruta_file.replace(/data\:image\/(jpeg|jpg|png)\;base64\,/gi, '');
                                objeto.tx_extension_archivo = file.name.split(".")[1];
                                objeto.tx_filename = file.name.split(".")[0];
                                this.anuncioService.SaveGaleria(objeto).subscribe(
                                    (res) => {
                                        if (res.Status == "OK") {
                                            debugger;
                                            var listGaleria = JSON.parse(res.DataJson)
                                            this.listarGaleria(listGaleria);
                                        }
                                    }
                                );
                            }
                        });
                    } else {
                        this.ListGaleria.map((todo, i) => {
                            debugger;
                            if (todo.id == id) {
                                let objeto: any = {};
                                objeto.tx_ruta_file = reader.result;
                                objeto.IdTipoPresentacion = IdTipoPresentacion;
                                objeto.id_anuncio = parseInt(this.route.params["value"]["id"]);
                                objeto.tx_ruta_file = objeto.tx_ruta_file.replace(/data\:image\/(jpeg|jpg|png)\;base64\,/gi, '');
                                objeto.tx_extension_archivo = file.name.split(".")[1];
                                objeto.tx_filename = file.name.split(".")[0];
                                this.anuncioService.SaveGaleria(objeto).subscribe(
                                    (res) => {
                                        if (res.Status == "OK") {
                                            debugger;
                                            var listGaleria = JSON.parse(res.DataJson)
                                            this.listarGaleria(listGaleria);
                                        }
                                    }
                                );
                            }
                        });
                    }

                }
                reader.readAsDataURL(file);
            }
        }
    }
}
