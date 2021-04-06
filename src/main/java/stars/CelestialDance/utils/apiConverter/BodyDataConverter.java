package stars.CelestialDance.utils.apiConverter;

import lombok.Data;

@Data
public class BodyDataConverter {
    private String englishName;
    private BodyMassDataConverter mass;
    private float density;
    private int meanRadius;
    private int equaRadius;
    private int polarRadius;
    private long semimajorAxis;
    private long perihelion;
    private long aphelion;
    private String isPlanet;
    private float eccentricity;
}
