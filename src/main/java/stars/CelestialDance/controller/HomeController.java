package stars.CelestialDance.controller;

import org.springframework.web.bind.annotation.*;
import stars.CelestialDance.model.Body;
import stars.CelestialDance.model.OrbitDisplay;
import stars.CelestialDance.service.BodyService;
import stars.CelestialDance.service.OrbitDisplayService;

import java.util.List;
import java.util.Optional;


@RestController
public class HomeController {

    private BodyService bodyService;
    private final OrbitDisplayService orbitDisplayService;

    public HomeController(BodyService bodyService, OrbitDisplayService orbitDisplayService) {
        this.bodyService = bodyService;
        this.orbitDisplayService = orbitDisplayService;
    }

    @CrossOrigin
    @RequestMapping("/")
    public Body home() {
        return new Body(1, "Sun");
    }

    @CrossOrigin
    @RequestMapping("/getall")
    public List<Body> home2() {
        return bodyService.updatePositions();
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
}
