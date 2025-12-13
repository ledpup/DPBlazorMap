export function initialize(divId, options) {
    const newMap = L.map(divId, options).setView(options.center, options.zoom);
    return newMap;
}

window.dpMapInterop = {
    getBounds: function (map) {
        if (!map) {
            console.log("Map is null or undefined");
            return;
        }

        var b = map.getBounds();
        return {
            southWest: { lat: b.getSouthWest().lat, lng: b.getSouthWest().lng },
            northEast: { lat: b.getNorthEast().lat, lng: b.getNorthEast().lng }
        };
    },

    registerMoveEnd: function (dotnetHelper, map) {
        if (!map) return;

        // store handler so it can be unregistered later
        map.__dotnet_moveEndHandler = function () {
            var center = map.getCenter();
            var b = map.getBounds();
            dotnetHelper.invokeMethodAsync('OnMoveEndCallback', {
                center: { lat: center.lat, lng: center.lng },
                bounds: {
                    southWest: { lat: b.getSouthWest().lat, lng: b.getSouthWest().lng },
                    northEast: { lat: b.getNorthEast().lat, lng: b.getNorthEast().lng }
                },
                zoom: map.getZoom()
            });
        };

        map.on('moveend', map.__dotnet_moveEndHandler);
    },

    unregisterMoveEnd: function (map) {
        if (!map) return;
        if (map.__dotnet_moveEndHandler) {
            map.off('moveend', map.__dotnet_moveEndHandler);
            delete map.__dotnet_moveEndHandler;
        }
    }
};