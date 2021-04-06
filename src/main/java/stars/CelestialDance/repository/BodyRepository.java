package stars.CelestialDance.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import stars.CelestialDance.model.Body;

import java.util.List;
import java.util.Optional;

@Repository
public interface BodyRepository extends JpaRepository<Body, Integer> {
    List<Body> findAll();

    Optional<Body> findByName(String Name);

    List<Body> findAllByEnabled(boolean enabled);


}