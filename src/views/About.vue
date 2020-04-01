<template>
    <div id="map"></div>
</template>
<script>
import { MapSDK } from '@rdapp/gis-mapbox';
import mapboxgl from 'mapbox-gl';
import { mapConfig } from '../config/servers-config';
import 'mapbox-gl/dist/mapbox-gl.css';

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
        console.log(`rdapp: mounted -> map`, map);

        const mapSdk = new MapSDK();
        window.mapSdk = mapSdk;

        // const fundation = {
        //     mapSdk,
        //     window,
        //     center: mapConfig.center,
        // };
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
