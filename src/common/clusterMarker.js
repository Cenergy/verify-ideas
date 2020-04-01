import Supercluster from 'supercluster';
import mapboxgl from 'mapbox-gl';

export default class ClusterMarkerLayer {
    constructor(options) {
        const { map, radius = 120, maxZoom = 19 } = options;
        this.clusterMarkerLayer = new Supercluster({ radius, maxZoom });
        this._map = map;
        this.clusters = {};
        this.markers = [];
        this.clusterGeojson = {};
        this.maxZoom = maxZoom;
    }

    init(points) {
        this.clusterMarkerLayer.load(points.features);
        this.size = points.features.length;
        return this.updateClusters();
    }

    updateClusters() {
        const bounds = this._map.getBounds();
        const zoom = this._map.getZoom();
        this.clusterGeojson = this.clusterMarkerLayer.getClusters(
            [bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()],
            Math.floor(zoom)
        );
        // if (Object.keys(this.clusters).length > 0) {
        //   Object.keys(this.clusters).map(key => this.clusters[key].remove());
        // }

        // return this.displayFeatures();
        return { clusters: this.clusterGeojson, size: this.size };
    }

    displayFeatures() {
        const features = this.clusterGeojson;

        // eslint-disable-next-line array-callback-return
        const divFeature = features.map(feature => {
            const isCluster = !!feature.properties.cluster;
            const el = document.createElement('div');
            let marker = null;
            if (isCluster) {
                const count = feature.properties.point_count;
                let className = '';
                if (count > 50) {
                    className = 'extraLarge';
                } else if (count > 25) {
                    className = 'large';
                } else if (count > 15) {
                    className = 'medium';
                } else if (count > 10) {
                    className = 'small';
                } else {
                    className = 'extraSmall';
                }
                const html = `<div class='cluster ${className}' tabindex = '0' coordinate=${feature.geometry.coordinates}>${feature.properties.point_count_abbreviated}</div>`;
                el.innerHTML = html;
                marker = new mapboxgl.Marker(el);

                el.addEventListener('click', () => {
                    const coordinateStr = el
                        .getElementsByClassName('cluster')[0]
                        .getAttribute('coordinate');
                    const mapCenter = coordinateStr.split(',');
                    const currentZoom = this._map.getZoom();
                    const nextZoom = currentZoom + 1;
                    this._map.easeTo({ center: mapCenter, zoom: nextZoom });
                });
                this.clusters[feature.properties.cluster_id] = marker;
                marker.setLngLat(feature.geometry.coordinates).addTo(this._map);
                return null;
            }
            // el.innerHTML = `<div class='marker' tabindex='0'></div>`;
            // const el2 = document.createElement('span');
            // el2.style.display = 'none';
            // marker = new mapboxgl.Marker();
            // marker.properties = feature.properties;
            // marker.setLngLat(feature.geometry.coordinates).addTo(this._map);
            return feature;
        });
        return divFeature;
    }
}
