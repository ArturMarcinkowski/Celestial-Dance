package stars.CelestialDance.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import stars.CelestialDance.model.CelestialUnit;
import stars.CelestialDance.service.BodyService;
import stars.CelestialDance.service.CelestialUnitService;
import stars.CelestialDance.service.OrbitDisplayService;
import stars.CelestialDance.utils.apiConverter.BodiesDataConverter;
import stars.CelestialDance.utils.apiConverter.BodyDataConverter;

import java.util.List;

@RestController
public class SetterController {


    private final BodyService bodyService;
    private final OrbitDisplayService orbitDisplayService;
    private final CelestialUnitService unitService;

    public SetterController(BodyService bodyService, OrbitDisplayService orbitDisplayService, CelestialUnitService unitService) {
        this.bodyService = bodyService;
        this.orbitDisplayService = orbitDisplayService;
        this.unitService = unitService;
    }

    @CrossOrigin
    @RequestMapping("/set-primary-body")
    public String setPrimaryBody(@RequestParam int bodyId, int primaryBodyId) {
        bodyService.setPrimaryBody(bodyId, primaryBodyId);
        return "done";
    }

    @CrossOrigin
    @RequestMapping("/set-all-primary-bodies-from-api")
    public String setAll() {
        String url = "https://api.le-systeme-solaire.net/rest/bodies";
        RestTemplate restTemplate = new RestTemplate();
        BodiesDataConverter multipleData = restTemplate.getForObject(url, BodiesDataConverter.class);
        List<BodyDataConverter> data = multipleData.getBodies();
        unitService.setAllPrimaryBodies(data);
        return "done";
    }

    @CrossOrigin
    @RequestMapping("/set-primary-body-from-api")
    public String setAll(@RequestParam String name) {
        String url = "https://api.le-systeme-solaire.net/rest/bodies";
        RestTemplate restTemplate = new RestTemplate();
        BodiesDataConverter multipleData = restTemplate.getForObject(url, BodiesDataConverter.class);
        List<BodyDataConverter> data = multipleData.getBodies();
        unitService.setOnePrimaryBody(data, name);
        return "done";
    }

    @CrossOrigin
    @RequestMapping("/set-body-on-map")
    public String setBody(@RequestParam int id) {
        CelestialUnit unit = unitService.findById(id);
        unitService.setUnitOnMap(unit, "ap");
        unitService.save(unit);
        return "done";
    }

    @CrossOrigin
    @RequestMapping("/enable")
    public String enable(@RequestParam int id) {
        bodyService.enable(id);
        return "done";
    }

    @CrossOrigin
    @RequestMapping("/disable")
    public String disable(@RequestParam int id) {
        bodyService.disable(id);
        return "done";
    }


}
