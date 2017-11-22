const google = {
    maps: {
        LatLng: function(lat, lng) {
            return {
                latitude: parseFloat(lat),
                longitude: parseFloat(lng),

                lat: function() {
                    return this.latitude;
                },
                lng: function() {
                    return this.longitude;
                }
            };
        },
        LatLngBounds: function(ne, sw) {
            return {
                getSouthWest: function() {
                    return sw;
                },
                getNorthEast: function() {
                    return ne;
                }
            };
        },
        OverlayView: function() {
            return {};
        },
        InfoWindow: function() {
            return {};
        },
        Marker: function() {
            return {addListener: function() {}};
        },
        MarkerImage: function() {
            return {};
        },
        Map: function() {
            return {addListener: function() {}, trigger: function() {}};
        },
        Point: function() {
            return {};
        },
        Size: function() {
            return {};
        },
        event: {
            trigger: function() {}
        }
    }
};

export default {
    setGlobal() {
        global.google = google;
    }
};
