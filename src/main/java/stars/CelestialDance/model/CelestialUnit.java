package stars.CelestialDance.model;

import lombok.Data;

@Data
public class CelestialUnit {
    private Body body;
    private OrbitDisplay orbitDisplay;
    private OrbitRadius orbitRadius;
}
