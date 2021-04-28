package stars.CelestialDance.controller;

import org.springframework.web.bind.annotation.*;
import stars.CelestialDance.model.Body;
import stars.CelestialDance.service.BodyService;
import stars.CelestialDance.service.CelestialUnitService;

import java.util.List;


@RestController
public class HomeController {

    private final BodyService bodyService;
    private final CelestialUnitService unitService;

    public HomeController(BodyService bodyService, CelestialUnitService unitService) {
        this.bodyService = bodyService;
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

    @CrossOrigin
    @RequestMapping("/delete-all")
    public String deleteAll() {
        unitService.deleteAll();
        return "done";
    }





}
