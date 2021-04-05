package stars.CelestialDance.service;

import org.springframework.stereotype.Service;
import stars.CelestialDance.utils.BodyDataConverter;
import stars.CelestialDance.model.Body;
import stars.CelestialDance.model.CelestialUnit;
import stars.CelestialDance.model.OrbitRadius;
import stars.CelestialDance.utils.Utils;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CelestialUnitService {

    private final BodyService bodyService;
    private final OrbitRadiusService radiusService;
    private final OrbitDisplayService displayService;
    private final double G = Utils.getGravitationalConstant();

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

        radius.setEccentricity(data.getEccentricity());
        radius.setRMin(data.getAphelion());
        radius.setRMax(data.getPerihelion());

        unit.setBody(body);
        unit.setOrbitRadius(radius);

        return unit;
    }

    public List<CelestialUnit> processMultipleData(List<BodyDataConverter> multipleData, String filter) {
        if (filter.equals("planets")) {
            return multipleData.stream()
                    .filter(d -> d.getIsPlanet().equals("true"))
                    .map(this::processData)
                    .collect(Collectors.toList());
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


    public double calculateVelocity(CelestialUnit unit, String maxOrMin) {

        //vmax = sqrt( (1+e) * GM / rmin )
        //vmin = sqrt( (1-e) * GM / rmax )

        float e = unit.getOrbitRadius().getEccentricity();
        long rmin = unit.getOrbitRadius().getRMin();
        long rmax = unit.getOrbitRadius().getRMax();
        double GM = Utils.calcStandGravParam(bodyService.findById(unit.getBody().getPrimaryBodyId()).get());
        double v = 0;

        if (maxOrMin.equals("max")) {
            v = Math.sqrt((1 + e) * GM / rmin);
        } else if (maxOrMin.equals("min")) {
            v = Math.sqrt((1 - e) * GM / rmax);
        }
        return v;
    }


    public CelestialUnit setUnitOnMap(CelestialUnit unit, String apOrPer) {
        Body body2 = bodyService.findById(unit.getBody().getPrimaryBodyId()).get();

        long R = 0;
        double v = 0;
        if (apOrPer.equals("ap")) {
            R = unit.getOrbitRadius().getRMax();
            v = calculateVelocity(unit, "min");
        } else if (apOrPer.equals("per")) {
            R = unit.getOrbitRadius().getRMin();
            v = calculateVelocity(unit, "max");
        }
        double angle = Utils.getRanNumber(0, 2 * Math.PI);
        unit.getBody().setPosX((float) (body2.getPosX() + Math.sin(angle) * R));
        unit.getBody().setPosY((float) (body2.getPosY() - Math.cos(angle) * R));

        unit.getBody().setVelX((float) (-v * Math.cos(angle)));
        unit.getBody().setVelY((float) (-v * Math.sin(angle)));

        return unit;
    }

    public CelestialUnit findById(int id) {
        CelestialUnit unit = new CelestialUnit();
        if (bodyService.findById(id).isPresent()) {
            unit.setBody(bodyService.findById(id).get());
        }
        if (radiusService.findById(id).isPresent()) {
            unit.setOrbitRadius(radiusService.findById(id).get());
        }
        if (displayService.findById(id).isPresent()) {
            unit.setOrbitDisplay(displayService.findById(id).get());
        }
        return unit;
    }

    public void save(CelestialUnit unit){
        bodyService.save(unit.getBody());
        int id = unit.getBody().getId();
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
