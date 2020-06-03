import { Injectable } from '@angular/core';
import * as L from "leaflet";
import Axios from "axios";

@Injectable()
export class MapService {

    public host = "http://localhost:9000";
    public maxZoom = 12;

    private map: L.Map;

    private markers: {
        [key: string]: L.Marker,
    } = {};

    private mutliplayer: number;

    constructor() {
    }

    public init(): void {
        const tValue = 1;
        const extend = (L as any).extend({}, L.CRS.Simple, {
            transformation: new L.Transformation(tValue, 0, tValue, 0),
        });

        this.map = L.map('map', {
            zoomControl: true,
            minZoom: 8,
            maxZoom: 12,
            zoom: this.maxZoom,
            center: [0, 0],
            crs: extend,
        });

        L.tileLayer(`${this.host}/api/map/{z}/{x}/{y}.png`, {
            attribution: '&copy; Made by SeiRiuS',
            tileSize: 160,
            noWrap: true,
        }).addTo(this.map);

        L.marker([0, 0], {
            title: "Center",
        }).addTo(this.map);

        this.calculateMultiplayer();
        this.pollPlayerPositions();
    }

    public normalizedZoom(): number {
        return this.maxZoom - this.map.getZoom() + 1;
    }

    public getPlayers(): Promise<{
        data: {
            name: string;
            position: {
                x: number;
                y: number;
                z: number;
            },
            avatar: string;
        }[],
    }> {
        return Axios.get(`${this.host}/api/players`);
    }

    public pollPlayerPositions(): void {
        setInterval(() => {
            this.calculatePlayersPosition();
        }, 3000);
    }

    public async calculatePlayersPosition(): Promise<void> {
        const { data } = await this.getPlayers();
        data.forEach(({ name, position: { x, z }, avatar}) => {
            let playerMarker = this.markers[name];
            x = x * this.mutliplayer;
            z = z * this.mutliplayer;

            const latLng = this.map.unproject(L.point(x, z), undefined);
            if (!playerMarker) {
                playerMarker = L.marker(latLng, {
                    title: name,
                    icon: L.icon({
                        iconUrl: avatar,
                        iconSize: [32, 32],
                        iconAnchor: [8, 8],
                    }),
                }).addTo(this.map);
                this.markers[name] = playerMarker;
            } else {
                playerMarker.setLatLng(latLng);
            }
        });
    }

    private calculateMultiplayer(): void {
        this.mutliplayer = 10 / this.normalizedZoom();
    }
}
