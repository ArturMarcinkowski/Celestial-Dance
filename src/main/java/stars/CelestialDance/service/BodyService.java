package stars.CelestialDance.service;


import stars.CelestialDance.model.Body;
import java.util.List;
import java.util.Optional;

public interface BodyService {

    List<Body> findAll();

    void deleteById(int id);

    void delete(Body body);

    void enable(int id);

    void disable(int id);

    boolean isBodyEnabled(int id);

    void setPrimaryBody(int bodyId, int primaryBodyId);

    List<Body> updatePositions();

    Optional<Body> findById(int id);

    Optional<Body> findByName(String name);

    List<Body> getAll();

    Body updatePosition(Body body, List<Body> bodies);

    void save(Body body);

    int saveNewBody(Body body);


}
