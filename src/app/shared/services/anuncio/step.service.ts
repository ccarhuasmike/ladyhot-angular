import { Injectable } from '@angular/core';
import { activeStep } from '../../../view/models/modelanuncio';
import { debug } from 'util';
@Injectable()
export class StepService {
    porcentajeInicial = 19.33;
    porcentajeIncremental = 19.33;
    workflow = [
        { step: activeStep.step1, flag: true },
        { step: activeStep.step2, flag: false },
        { step: activeStep.step3, flag: false },
        { step: activeStep.step4, flag: false },
        { step: activeStep.step5, flag: false }
    ];
    constructor() {
    }
    countPorcent(): number {
        const list = this.workflow.filter(x => x.flag === true);
        return list.length;
    }
    activaStep1(step: boolean) {

        this.porcentajeIncremental = 0;
        this.porcentajeIncremental += this.countPorcent() * this.porcentajeInicial;
        this.workflow[0].flag = true
    }
    activaStep2(step: boolean) {

        this.workflow[1].flag = step
        this.porcentajeIncremental = 0;
        this.porcentajeIncremental += this.countPorcent() * this.porcentajeInicial;
    }
    activaStep3(step: boolean) {

        this.workflow[2].flag = step
        this.porcentajeIncremental = 0;
        this.porcentajeIncremental += this.countPorcent() * this.porcentajeInicial;

    }
    activaStep4(step: boolean) {
        this.workflow[3].flag = step
        this.porcentajeIncremental = 0;
        this.porcentajeIncremental += this.countPorcent() * this.porcentajeInicial;
    }
    activaStep5(step: boolean) {
        this.workflow[4].flag = step
        this.porcentajeIncremental = 0;
        this.porcentajeIncremental += this.countPorcent() * this.porcentajeInicial;
    }
}