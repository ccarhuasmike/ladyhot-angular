import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Tbl_galeria_anuncio } from "../../../../Models/Tbl_galeria_anuncioModels";
import { Observable } from 'rxjs';
@Component({
    selector: 'app-editanuncio',
    templateUrl: './galerianuncio.component.html',
    styleUrls: ['./galerianuncio.component.css']
})
export class GaleriaAnuncioComponent implements OnInit {
    private base64Image: string;
    public ListGaleria: Tbl_galeria_anuncio[] = [];
    constructor(
        private domSanitizer: DomSanitizer
    ) { }

    ngOnInit() {
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
        console.log(this.ListGaleria);
        //https://medium.com/@amcdnl/file-uploads-with-angular-reactive-forms-960fd0b34cb5
    }

    onFileChange(event, id: number) {
        let reader = new FileReader();
        if (event.target.files && event.target.files.length) {
            const [file] = event.target.files;
            reader.onload = () => {
                // this.formGroup.patchValue({
                //     file: reader.result
                // });

                // // need to run CD since file load runs outside of zone
                // this.cd.markForCheck();
            };
            reader.readAsDataURL(file);
        }
    }



    displayPhoto(fileInput, id: number) {
        if (fileInput.target.files && fileInput.target.files[0]) {
            debugger;
            let object = this.ListGaleria.filter(x => {
                x.id = id
            });
            console.log(object);



            const reader = new FileReader();
            if (fileInput.target.files && fileInput.target.files.length > 0) {
                let file = fileInput.target.files[0];
                reader.onloadend = (e) => {
                    this.base64Image = reader.result as string;
                }
                reader.readAsDataURL(file);
            }
        }
    }
}
