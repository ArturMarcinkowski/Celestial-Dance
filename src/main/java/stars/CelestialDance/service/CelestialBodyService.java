package stars.CelestialDance.service;


import stars.CelestialDance.model.CelestialBody;

import java.util.List;

public interface CelestialBodyService {

    List<CelestialBody> updatePositions();

    CelestialBody updatePosition(CelestialBody body, List<CelestialBody> bodies);


}
