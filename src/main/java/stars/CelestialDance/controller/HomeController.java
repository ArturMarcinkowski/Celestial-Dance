package stars.CelestialDance.controller;

import org.springframework.web.bind.annotation.*;
import stars.CelestialDance.model.Body;
import stars.CelestialDance.service.BodyService;
import stars.CelestialDance.service.CelestialUnitService;
import stars.CelestialDance.service.OrbitDisplayService;
import java.util.List;


@RestController
public class HomeController {

    private final BodyService bodyService;
    private final OrbitDisplayService orbitDisplayService;
    private final CelestialUnitService unitService;

    public HomeController(BodyService bodyService, OrbitDisplayService orbitDisplayService, CelestialUnitService unitService) {
        this.bodyService = bodyService;
        this.orbitDisplayService = orbitDisplayService;
        this.unitService = unitService;
    }

    @CrossOrigin
    @RequestMapping("/")
    public String hello() {
        return "Hello";
    }

    @CrossOrigin
    @RequestMapping("/make-move")
    public List<Body> update() {
        return bodyService.updatePositions();
    }

    @CrossOrigin
    @RequestMapping("/delete-by-id")
    public String delete(@RequestParam int id) {
        unitService.deleteById(id);
        return "done";
    }





}
