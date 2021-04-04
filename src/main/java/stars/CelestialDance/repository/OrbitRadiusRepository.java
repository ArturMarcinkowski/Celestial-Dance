package stars.CelestialDance.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import stars.CelestialDance.model.OrbitRadius;

@Repository
public interface OrbitRadiusRepository extends JpaRepository<OrbitRadius, Integer> {

}
