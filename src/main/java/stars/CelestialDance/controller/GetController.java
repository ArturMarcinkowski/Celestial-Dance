package stars.CelestialDance.controller;

import org.springframework.web.bind.annotation.*;
import stars.CelestialDance.model.Body;
import stars.CelestialDance.model.OrbitDisplay;
import stars.CelestialDance.service.BodyService;
import stars.CelestialDance.service.CelestialUnitService;
import stars.CelestialDance.service.OrbitDisplayService;

import java.util.List;
import java.util.Optional;


@RestController
public class GetController {

    private final BodyService bodyService;
    private final OrbitDisplayService orbitDisplayService;
    private final CelestialUnitService unitService;

    public GetController(BodyService bodyService, OrbitDisplayService orbitDisplayService, CelestialUnitService unitService) {
        this.bodyService = bodyService;
        this.orbitDisplayService = orbitDisplayService;
        this.unitService = unitService;
    }

    @CrossOrigin
    @RequestMapping("/getall")
    public List<Body> home2() {
        return bodyService.getAll();
    }

    @CrossOrigin
    @RequestMapping("/get-one")
    public Body getOne(@RequestParam String name) {
        return bodyService.findByName(name).get();
    }

    @CrossOrigin
    @RequestMapping("/get-orbit-data")
    public OrbitDisplay home3(@RequestParam int id) {
        Optional<Body> optionalBody = bodyService.findById(id);
        if (optionalBody.isPresent()) {
            Body body1 = optionalBody.get();
            if (body1.getPrimaryBodyId() != 0) {
                return orbitDisplayService.calculateAllData(body1, bodyService.findById(body1.getPrimaryBodyId()).get());
            }
        }
        return null;
    }

    @CrossOrigin
    @RequestMapping("/is-body-enabled")
    public boolean isBodyEnabled(@RequestParam int id) {
        return bodyService.isBodyEnabled(id);
    }
}
