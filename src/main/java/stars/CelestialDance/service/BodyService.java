package stars.CelestialDance.service;


import stars.CelestialDance.model.Body;
import java.util.List;
import java.util.Optional;

public interface BodyService {

    List<Body> updatePositions();

    Optional<Body> findById(int id);

    Optional<Body> findByName(String name);

    List<Body> getAll();

    Body updatePosition(Body body, List<Body> bodies);

    void save(Body body);

    int saveNewBody(Body body);


}
