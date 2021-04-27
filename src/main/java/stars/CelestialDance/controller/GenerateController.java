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
public class GenerateController {

    private final CelestialUnitService unitService;

    public GenerateController(CelestialUnitService unitService) {
        this.unitService = unitService;
    }

    @CrossOrigin
    @RequestMapping("/generate-data-from-api")
    public String generateData(@RequestParam(required = false) String demand, @RequestParam(required = false) String name) {
        String url;
        RestTemplate restTemplate = new RestTemplate();
        if (name != null) {
            url = "https://api.le-systeme-solaire.net/rest/bodies/" + name;
            BodyDataConverter data = restTemplate.getForObject(url, BodyDataConverter.class);
            CelestialUnit unit = data.convertToCelestialUnit();
            unitService.saveNewUnit(unit);
            return String.valueOf(unit.getBody().getId());
        } else if (demand.equals("planets")) {
            url = "https://api.le-systeme-solaire.net/rest/bodies";
            BodiesDataConverter multipleData = restTemplate.getForObject(url, BodiesDataConverter.class);
            List<BodyDataConverter> data = multipleData.getBodies();
            List<CelestialUnit> units = unitService.processMultipleData(data, "planets");
            units.forEach(unitService::saveNewUnit);
        } else if (demand.equals("all")) {
            url = "https://api.le-systeme-solaire.net/rest/bodies";
            BodiesDataConverter multipleData = restTemplate.getForObject(url, BodiesDataConverter.class);
            List<BodyDataConverter> data = multipleData.getBodies();
            List<CelestialUnit> units = unitService.processMultipleData(data, "none");
            units.forEach(unitService::saveNewUnit);
        }
        return "done";
    }
}
