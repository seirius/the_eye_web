import { Component } from '@angular/core';
import { AppService } from './service/app.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.sass']
})
export class AppComponent {
    title = 'the-eye-web';

    constructor(
        private appService: AppService,
    ) {}

    public get menus(): string[] {
        return this.appService.menus;
    }

}
