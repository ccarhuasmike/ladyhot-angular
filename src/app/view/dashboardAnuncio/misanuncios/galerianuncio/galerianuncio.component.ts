import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Tbl_galeria_anuncio } from "../../../../Models/Tbl_galeria_anuncioModels";
import { ActivatedRoute, Router } from '@angular/router';
import { AnuncioService } from "../../../../shared/services/anuncio/anuncio.service";
import { LoaderService } from "../../../../shared/services/loader/loader.service";
@Component({
    selector: 'app-editanuncio',
    templateUrl: './galerianuncio.component.html',
    styleUrls: ['./galerianuncio.component.css']
})
export class GaleriaAnuncioComponent implements OnInit {
    public ListGaleria: Tbl_galeria_anuncio[] = [];
    constructor(
        private domSanitizer: DomSanitizer,
        private anuncioService: AnuncioService,
        private router: Router,
        private route: ActivatedRoute,
        // public loaderService: LoaderService
    ) {


    }
    ngOnInit() {
        let objeto: any = {};
        objeto.id_anuncio = parseInt(this.route.params["value"]["id"]);
        this.anuncioService.GetGaleriaXIdAnuncio(objeto).subscribe(
            (res) => {
                if (res.Status == "OK") {
                    this.listarGaleria(res.DataJson);
                }
            }
        );
    }
    listarGaleria(data) {
        for (let index = 0; index <= 5; index++) {
            var resultObject = JSON.parse(data)[index];
            if (resultObject != null) {
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
                    Base64ContentFicha: "",
                    Base64ContentFichaCort: "",
                    progressbar: 0
                };
                this.ListGaleria.push(tbl_galeria_anuncio);
            }
        }
    }
    ClickEliminar(id: number) {
        debugger;
        let objeto: any = {};
        objeto.id = id;
        objeto.id_anuncio = parseInt(this.route.params["value"]["id"]);
        this.anuncioService.EliminarGaleriaXId(objeto).subscribe(
            (res) => {
                if (res.Status == "OK") {
                    this.ListGaleria[this.ListGaleria.findIndex(x => x.id == id)].Base64ContentFicha = "";
                }
            }
        );
    }
    displayPhoto(fileInput, id: number) {
        if (fileInput.target.files && fileInput.target.files[0]) {
            const reader = new FileReader();
            if (fileInput.target.files && fileInput.target.files.length > 0) {
                let file = fileInput.target.files[0];
                reader.onloadend = (e) => {
                    //Actualizamos el objeto del list
                    this.ListGaleria.map((todo, i) => {
                        if (todo.id == id) {
                            let objeto: any = {};
                            objeto.tx_ruta_file = reader.result;
                            objeto.id_anuncio = parseInt(this.route.params["value"]["id"]);
                            objeto.tx_ruta_file = objeto.tx_ruta_file.replace(/data\:image\/(jpeg|jpg|png)\;base64\,/gi, '');
                            objeto.tx_extension_archivo = file.name.split(".")[1];
                            objeto.tx_filename = file.name.split(".")[0];
                            this.anuncioService.SaveGaleria(objeto).subscribe(
                                (res) => {
                                    debugger;
                                    if (res.Status == "OK") {

                                        let result = JSON.parse(res.DataJson);
                                        this.ListGaleria[i].Base64ContentFicha = result.Base64ContentFicha;
                                        this.ListGaleria[i].progressbar = result.progressbar;
                                    }
                                }
                            );
                        }
                    });
                }
                reader.readAsDataURL(file);
            }
        }
    }
}
