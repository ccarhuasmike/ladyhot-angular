import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
    selector: 'app-editanuncio',
    templateUrl: './galerianuncio.component.html',
    styleUrls: ['./galerianuncio.component.css']
})
export class GaleriaAnuncioComponent implements OnInit {
    private base64Image: string;
    constructor(
        private domSanitizer: DomSanitizer
    ) { }

    ngOnInit() {
    }

    onFileChange(event) {
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



    displayPhoto(fileInput) {
        var fileDisplayArea = document.getElementById('fileDisplayArea');
        if (fileInput.target.files && fileInput.target.files[0]) {
            const reader = new FileReader();
            debugger;
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
