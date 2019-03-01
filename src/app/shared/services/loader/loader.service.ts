import { BehaviorSubject } from 'rxjs';
import { Injectable, EventEmitter } from '@angular/core';
@Injectable()
export class LoaderService {
    public updateProgressBar$: EventEmitter<any>;
    public requestsRunning = 0;
    // A BehaviourSubject is an Observable with a default value
    public isLoading = new BehaviorSubject<boolean>(false);

    constructor() {

        this.updateProgressBar$ = new EventEmitter();
    }
    public increase(): void {
        this.requestsRunning++;
        if (this.requestsRunning === 1) {
            debugger;
            this.updateProgressBar$.emit('query');
        }
    }
    public decrease(): void {
        if (this.requestsRunning > 0) {
            this.requestsRunning--;
            if (this.requestsRunning === 0) {
                debugger;
                this.updateProgressBar$.emit('none');
            }
        }
    }
}