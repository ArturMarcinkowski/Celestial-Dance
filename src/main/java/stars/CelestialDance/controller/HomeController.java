package stars.CelestialDance.controller;

import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import stars.CelestialDance.utils.apiConverter.BodiesDataConverter;
import stars.CelestialDance.utils.apiConverter.BodyDataConverter;
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

    private final BodyService bodyService;
    private final OrbitDisplayService orbitDisplayService;
    private final CelestialUnitService unitService;

    public HomeController(BodyService bodyService, OrbitDisplayService orbitDisplayService, CelestialUnitService unitService) {
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
    public String generateData(@RequestParam(required = false) String demand, @RequestParam(required = false) String name) {
        String url;
        RestTemplate restTemplate = new RestTemplate();
        if (name != null) {
            url = "https://api.le-systeme-solaire.net/rest/bodies/" + name;
            BodyDataConverter data = restTemplate.getForObject(url, BodyDataConverter.class);
            CelestialUnit unit = unitService.processData(data);
            unitService.saveNewUnit(unit);
        } else if (demand.equals("planets")) {
            url = "https://api.le-systeme-solaire.net/rest/bodies";
            BodiesDataConverter multipleData = restTemplate.getForObject(url, BodiesDataConverter.class);
            List<BodyDataConverter> data = multipleData.getBodies();
            List<CelestialUnit> units = unitService.processMultipleData(data, "planets");
            units.forEach(unitService::saveNewUnit);
        }
        return "done";
    }

    @RequestMapping("/set-body-on-map")
    public String setBody(@RequestParam int id){
        CelestialUnit unit = unitService.findById(id);
        unitService.setUnitOnMap(unit, "ap");
        unitService.save(unit);
        return "done";
    }

}
