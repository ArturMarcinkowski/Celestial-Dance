package stars.CelestialDance.service;

import org.springframework.stereotype.Service;
import stars.CelestialDance.model.OrbitRadius;
import stars.CelestialDance.repository.OrbitRadiusRepository;

import java.util.Optional;

@Service
public class OrbitRadiusService {

    private final OrbitRadiusRepository orbitRadiusRepository;

    public OrbitRadiusService(OrbitRadiusRepository orbitRadiusRepository) {
        this.orbitRadiusRepository = orbitRadiusRepository;
    }

    public Optional<OrbitRadius> findById(int id) {
        return orbitRadiusRepository.findById(id);
    }

    public void makeOrbitRadius(double r, int id) {
        OrbitRadius orbitRadius = new OrbitRadius();
        orbitRadius.setRMax((long) r);
        orbitRadius.setRMax((long) r);
        orbitRadius.setId(id);
        orbitRadiusRepository.save(orbitRadius);
    }

    public void testForRadius(int id, double r) {
        Optional<OrbitRadius> optionalOrbitRadius = orbitRadiusRepository.findById(id);
        if (optionalOrbitRadius.isPresent()) {
            OrbitRadius orbitRadius = optionalOrbitRadius.get();
            if (orbitRadius.getRMax() < r || orbitRadius.getRMax() == 0) {
                orbitRadius.setRMax((long) r);
            }
            if (orbitRadius.getRMin() > r || orbitRadius.getRMin() == 0) {
                orbitRadius.setRMin((long) r);
            }
            orbitRadiusRepository.save(orbitRadius);
        } else {
            makeOrbitRadius(r, id);
        }
    }

    public void save(OrbitRadius radius){
        orbitRadiusRepository.save(radius);
    }


}
