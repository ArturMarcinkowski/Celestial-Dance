package stars.CelestialDance.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import stars.CelestialDance.model.CelestialBody;

import java.util.List;

@Repository
public interface CelestialBodyRepository extends JpaRepository<CelestialBody, Integer> {
    List<CelestialBody> findAll();

}