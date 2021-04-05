package stars.CelestialDance.service;


import stars.CelestialDance.utils.BodyDataConverter;
import stars.CelestialDance.model.Body;

import java.util.List;
import java.util.Optional;

public interface BodyService {

    List<Body> updatePositions();

    Optional<Body> findById(int id);

    Body updatePosition(Body body, List<Body> bodies);

    Body processData(BodyDataConverter data);

    void save(Body body);

    int saveNewBody(Body body);


}
