package stars.CelestialDance.service;

import org.springframework.stereotype.Service;
import stars.CelestialDance.repository.OrbitDisplayRepository;
import stars.CelestialDance.utils.BodyDataConverter;
import stars.CelestialDance.model.Body;
import stars.CelestialDance.model.CelestialUnit;
import stars.CelestialDance.model.OrbitRadius;
import stars.CelestialDance.repository.BodyRepository;
import stars.CelestialDance.repository.OrbitRadiusRepository;

import java.util.ArrayList;
import java.util.List;

@Service
public class CelestialUnitService {

    private final BodyService bodyService;
    private final OrbitRadiusService radiusService;
    private final OrbitDisplayService displayService;


    public CelestialUnitService(BodyService bodyService, OrbitRadiusService radiusService, OrbitDisplayService displayService) {
        this.bodyService = bodyService;
        this.radiusService = radiusService;
        this.displayService = displayService;
    }

    public CelestialUnit processData(BodyDataConverter data) {
        CelestialUnit unit = new CelestialUnit();
        Body body = new Body();
        OrbitRadius radius = new OrbitRadius();

        body.setName(data.getEnglishName());
        body.setMassValue(data.getMass().getMassValue());
        body.setMassExponent(data.getMass().getMassExponent());
        body.setRadius(data.getMeanRadius());

        radius.setRMin(data.getAphelion());
        radius.setRMax(data.getPerihelion());

        unit.setBody(body);
        unit.setOrbitRadius(radius);

        return unit;
    }

    public List<CelestialUnit> processMultipleData(BodyDataConverter[] multipleData, String filter) {
        List<CelestialUnit> units = new ArrayList<>();
        int counter = 0;
        if (filter.equals("planets")) {
            for (BodyDataConverter data : multipleData) {
                if (data.getIsPlanet().equals("true")) {
                    units.add(processData(data));
                }
            }
            return units;
        }
        return null;
    }

    public void saveNewUnit(CelestialUnit unit) {
        int id = bodyService.saveNewBody(unit.getBody());
        if (unit.getOrbitDisplay() != null) {
            unit.getOrbitDisplay().setId(id);
            displayService.save(unit.getOrbitDisplay());
        }

        if (unit.getOrbitRadius() != null) {
            unit.getOrbitRadius().setId(id);
            radiusService.save(unit.getOrbitRadius());
        }
    }

}
