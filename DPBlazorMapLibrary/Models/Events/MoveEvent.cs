namespace DPBlazorMapLibrary;

public class MoveEvent
{
    public LatLng? Center { get; set; }
    public LatLngBounds? Bounds { get; set; }
    public int Zoom { get; set; }
}
