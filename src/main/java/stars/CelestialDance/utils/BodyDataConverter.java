package stars.CelestialDance.utils;

import lombok.Data;

@Data
public class BodyDataConverter {
//    String id;
    String englishName;
    BodyMassDataConverter mass;
    float density;
    int meanRadius;
    int semimajorAxis;
    int perihelion;
    int aphelion;
    boolean isPlanet;

}
