package stars.CelestialDance.service;

import org.springframework.stereotype.Service;
import stars.CelestialDance.utils.Utils;
import stars.CelestialDance.model.Body;
import stars.CelestialDance.model.OrbitDisplay;
import stars.CelestialDance.model.OrbitRadius;
import stars.CelestialDance.repository.OrbitDisplayRepository;

import java.util.Optional;

@Service
public class OrbitDisplayService {

    private final OrbitDisplayRepository orbitDisplayRepository;
    private final OrbitRadiusService orbitRadiusService;

    public OrbitDisplayService(OrbitDisplayRepository orbitDisplayRepository, OrbitRadiusService orbitRadiusService) {
        this.orbitDisplayRepository = orbitDisplayRepository;
        this.orbitRadiusService = orbitRadiusService;
    }


    public OrbitDisplay calculateAllData(Body body1, Body body2) {
        OrbitDisplay orbitDisplay = new OrbitDisplay();
        orbitDisplay.setId(body1.getId());
        OrbitRadius orbitRadius = orbitRadiusService.findById(body1.getId()).get();
        orbitDisplay.setSemiMajorAxis((int) (orbitRadius.getRMax() + orbitRadius.getRMin()));
        orbitDisplay.setSemiMinorAxis((int) Math.sqrt(orbitRadius.getRMin() * orbitRadius.getRMax()));

        double r = Utils.calcRadius(body1, body2);
        double firstAngle = Math.asin((r - orbitRadius.getRMin()) / (orbitRadius.getRMax() - orbitRadius.getRMin()));
        double secondAngle = Utils.calcAngle(body1, body2);
        orbitDisplay.setAngle((int) (firstAngle - secondAngle));

        orbitDisplay.setCenterPosX((int) (body2.getPosX() + Math.sin(firstAngle - secondAngle) * r));
        orbitDisplay.setCenterPosX((int) (body2.getPosY() + Math.cos(firstAngle - secondAngle) * r));

        orbitDisplayRepository.save(orbitDisplay);
        return orbitDisplay;
    }

    public void save(OrbitDisplay display){
        orbitDisplayRepository.save(display);
    }

    public Optional<OrbitDisplay> findById(int id){
        return orbitDisplayRepository.findById(id);
    }

}
