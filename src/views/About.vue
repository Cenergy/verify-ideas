<template>
    <div id="map"></div>
</template>
<script>
import { MapSDK } from '@rdapp/gis-mapbox';
import mapboxgl from 'mapbox-gl';
import { mapConfig } from '../config/servers-config';
import 'mapbox-gl/dist/mapbox-gl.css';

import Sprite from '../common/sprite';

export default {
    name: 'about',
    data() {
        return {};
    },
    async mounted() {
        mapboxgl.accessToken = mapConfig.accessToken;
        const map = new mapboxgl.Map({
            container: 'map',
            style: mapConfig.style,
            center: mapConfig.center, // starting position [lng, lat]
            zoom: mapConfig.zoom, // starting zoom,
            bearing: 0,
        });
        const size = 200;

        // implementation of CustomLayerInterface to draw a pulsing dot icon on the map
        // see https://docs.mapbox.com/mapbox-gl-js/api/#customlayerinterface for more info
        const pulsingDot = {
            width: size,
            height: size,
            data: new Uint8Array(size * size * 4),

            // get rendering context for the map canvas when layer is added to the map
            onAdd() {
                const canvas = document.createElement('canvas');
                canvas.width = this.width;
                canvas.height = this.height;
                this.context = canvas.getContext('2d');
                const image = new Image();
                image.src = './green.png';
                this.image = image;
                const sprite = new Sprite({
                    canvas,
                    image,
                    numberOfFrames: 10,
                    ticksPerFrame: 0,
                    row: 7,
                    column: 7,
                    x: 0,
                    y: 0,
                });
                this.sprite = sprite;
            },

            // called once before every frame where the icon will be used
            render() {
                const context = this.context;
                // console.log(`rdapp: render -> this`, this);

                // draw outer circle
                context.clearRect(0, 0, this.width, this.height);
                this.sprite.update();
                this.sprite.render();
                this.data = context.getImageData(0, 0, this.width, this.height).data;

                // continuously repaint the map, resulting in the smooth animation of the dot
                map.triggerRepaint();

                // return `true` to let the map know that the image was updated
                return true;
            },
        };
        map.on('load', () => {
            map.addImage('pulsing-dot', pulsingDot, { pixelRatio: 2 });

            map.addSource('points', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: [
                        {
                            type: 'Feature',
                            geometry: {
                                type: 'Point',
                                coordinates: mapConfig.center,
                            },
                        },
                    ],
                },
            });
            map.addLayer({
                id: 'points',
                type: 'symbol',
                source: 'points',
                layout: {
                    'icon-image': 'pulsing-dot',
                    'icon-rotation-alignment': 'map',
                },
            });
        });
    },
};
</script>
<style lang="scss">
#map {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
}
</style>
