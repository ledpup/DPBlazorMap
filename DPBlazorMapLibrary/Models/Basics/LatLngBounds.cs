namespace DPBlazorMapLibrary;

public class LatLngBounds
{
    public LatLngBounds()
    {
    }

public record LatLngPair(LatLng center, LatLngBounds bounds, int zoom);


    public LatLngBounds(LatLng southWest, LatLng northEast)
    {
        SouthWest = southWest;
        NorthEast = northEast;
    }

    public LatLng? SouthWest { get; set; }
    public LatLng? NorthEast { get; set; }

    public IEnumerable<LatLng> ToLatLng()
    {
        return [SouthWest!, NorthEast!];
    }
}
