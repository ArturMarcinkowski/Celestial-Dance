package stars.CelestialDance.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import stars.CelestialDance.utils.BodyDataConverter;
import stars.CelestialDance.model.Body;
import stars.CelestialDance.model.CelestialUnit;
import stars.CelestialDance.model.OrbitDisplay;
import stars.CelestialDance.service.BodyService;
import stars.CelestialDance.service.CelestialUnitService;
import stars.CelestialDance.service.OrbitDisplayService;

import java.util.List;
import java.util.Optional;


@RestController
public class HomeController {

    private BodyService bodyService;
    private final OrbitDisplayService orbitDisplayService;
    private final CelestialUnitService unitService;

    public HomeController(BodyService bodyService, OrbitDisplayService orbitDisplayService, CelestialUnitService unitService) {
        this.bodyService = bodyService;
        this.orbitDisplayService = orbitDisplayService;
        this.unitService = unitService;
    }


    //    @CrossOrigin
//    @RequestMapping("/")
//    public Body home() {
//        return new Body(1, "Sun");
//    }

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

    @RequestMapping("/generate-data-from-api")
    public String generateData(){
        final String uri = "https://api.le-systeme-solaire.net/rest/bodies/mars";

        RestTemplate restTemplate = new RestTemplate();
        BodyDataConverter data = restTemplate.getForObject(uri, BodyDataConverter.class);


        CelestialUnit unit = unitService.processData(data);
        unitService.saveNewUnit(unit);
        return "done";

    }
}
