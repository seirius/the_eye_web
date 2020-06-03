import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AppService {

    public menus: string[] = ["Map"];

    constructor() { }
}
