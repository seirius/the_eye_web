import { NgModule } from '@angular/core';
import { MapService } from './service/map.service';
import { MapComponent } from './map.component';

@NgModule({
    providers: [
        MapService
    ],
    declarations: [
        MapComponent
    ],
    exports: []
})
export class MapModule {}