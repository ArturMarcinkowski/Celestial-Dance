package stars.CelestialDance.utils;

import lombok.Data;

@Data
public class BodyDataConverter {
//    String id;
    String englishName;
    BodyMassDataConverter mass;
    float density;
    int meanRadius;
    long semimajorAxis;
    long perihelion;
    long aphelion;
    String isPlanet;

}
