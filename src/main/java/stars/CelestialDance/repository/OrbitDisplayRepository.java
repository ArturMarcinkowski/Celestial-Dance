package stars.CelestialDance.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import stars.CelestialDance.model.OrbitDisplay;

@Repository
public interface OrbitDisplayRepository extends JpaRepository<OrbitDisplay, Integer> {

}
