import { Component, OnInit } from '@angular/core';
import { MapService } from './service/map.service';

@Component({
    selector: 'app-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.sass']
})
export class MapComponent implements OnInit {

    constructor(
        private mapService: MapService,
    ) { }

    ngOnInit(): void {
    }

    ngAfterViewInit(): void {
        this.mapService.init();
    }

}
