export function onCallback(dotnetHelper, evented, eventType) {
    evented.on(eventType, (mouseEvent) => {
        if (eventType === 'moveend') {
            // For moveend send center, bounds and zoom
            var center = evented.getCenter();
            var b = evented.getBounds();
            dotnetHelper.invokeMethodAsync('OnMoveEndCallback', {
                center: { lat: center.lat, lng: center.lng },
                bounds: {
                    southWest: { lat: b.getSouthWest().lat, lng: b.getSouthWest().lng },
                    northEast: { lat: b.getNorthEast().lat, lng: b.getNorthEast().lng }
                },
                zoom: evented.getZoom()
            });
        } else {
            dotnetHelper.invokeMethodAsync('OnCallback', eventType, {
                type: mouseEvent.type,
                latLng: mouseEvent.latlng,
            });
        }
    });
}