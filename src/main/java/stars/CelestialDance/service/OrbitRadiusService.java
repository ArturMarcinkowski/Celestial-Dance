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

    public OrbitRadius findById(int id) {
        return orbitRadiusRepository.findById(id).get();
    }

    public void makeOrbitRadius(double r, int id) {
        OrbitRadius orbitRadius = new OrbitRadius();
        orbitRadius.setRMax(r);
        orbitRadius.setRMax(r);
        orbitRadius.setId(id);
        orbitRadiusRepository.save(orbitRadius);
    }


    public void testForRadius(int id, double r) {
        Optional<OrbitRadius> optionalOrbitRadius = orbitRadiusRepository.findById(id);
        if (optionalOrbitRadius.isPresent()) {
            OrbitRadius orbitRadius = optionalOrbitRadius.get();
            if (orbitRadius.getRMax() < r || orbitRadius.getRMax() == 0) {
                orbitRadius.setRMax(r);
            }
            if (orbitRadius.getRMin() > r || orbitRadius.getRMin() == 0) {
                orbitRadius.setRMin(r);
            }
            orbitRadiusRepository.save(orbitRadius);
        } else {
            makeOrbitRadius(r, id);
        }
    }


}
