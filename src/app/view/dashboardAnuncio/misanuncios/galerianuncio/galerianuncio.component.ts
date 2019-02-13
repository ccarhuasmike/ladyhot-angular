import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Tbl_galeria_anuncio } from "../../../../Models/Tbl_galeria_anuncioModels";
import { Observable } from 'rxjs';
import { AnuncioService } from "../../../../shared/services/anuncio/anuncio.service";
import { ClientResponse, ClientResponseResult } from '../../../../Models/ClientResponseModels';
@Component({
    selector: 'app-editanuncio',
    templateUrl: './galerianuncio.component.html',
    styleUrls: ['./galerianuncio.component.css']
})
export class GaleriaAnuncioComponent implements OnInit {
    private base64Image: string;

    public ListGaleria: Tbl_galeria_anuncio[] = [];
    constructor(
        private domSanitizer: DomSanitizer,
        private anuncioService: AnuncioService,
    ) { }

    ngOnInit() {
        this.base64Image = ""
        for (let index = 0; index <= 5; index++) {
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
                txt_ruta_virtuales_cortada: ""
            };
            this.ListGaleria.push(tbl_galeria_anuncio);
        }
    }
    displayPhoto(fileInput, id: number) {
        if (fileInput.target.files && fileInput.target.files[0]) {
            const reader = new FileReader();
            if (fileInput.target.files && fileInput.target.files.length > 0) {
                let file = fileInput.target.files[0];
                reader.onloadend = (e) => {
                    //Actualizamos el objeto del listng
                    this.ListGaleria.map((todo, i) => {
                        if (todo.id == id) {
                            var result = reader.result as string;
                            console.log(result);
                            //this.ListGaleria[i].tx_ruta_file = reader.result as string;
                            let objeto: any = {};
                            //let b64Data = b64Data.replace(/data\:image\/(jpeg|jpg|png)\;base64\,/gi, '');
                            objeto.tx_ruta_file = reader.result;
                            objeto.id_anuncio = 2193;
                            objeto.tx_ruta_file = objeto.tx_ruta_file.replace(/data\:image\/(jpeg|jpg|png)\;base64\,/gi, '');
                            objeto.tx_extension_archivo = file.name.split(".")[1];
                            objeto.tx_filename = file.name.split(".")[0];
                            this.anuncioService.SaveGaleria(objeto).subscribe(
                                (res) => {
                                    if (res.Status == "OK") {
                                        let result = JSON.parse(res.DataJson);
                                        //this.ListGaleria[i].tx_ruta_file = "data:image/png;base64, " + result.tx_ruta_file;
                                        this.ListGaleria[i].tx_ruta_file = result.tx_ruta_file;
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
