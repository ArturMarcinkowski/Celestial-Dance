package stars.CelestialDance.controller;

import org.springframework.web.bind.annotation.*;
import stars.CelestialDance.model.CelestialBody;
import stars.CelestialDance.repository.CelestialBodyRepository;
import stars.CelestialDance.service.CelestialBodyService;

import java.util.ArrayList;
import java.util.List;


@RestController
public class HomeController {

    private CelestialBodyService celestialBodyService;
    private CelestialBodyRepository celestialBodyRepository;

    public HomeController(CelestialBodyService celestialBodyService, CelestialBodyRepository celestialBodyRepository) {
        this.celestialBodyService = celestialBodyService;
        this.celestialBodyRepository = celestialBodyRepository;
    }

    @CrossOrigin
    @RequestMapping("/")
    public CelestialBody home(){
        return new CelestialBody(1, "Sun");
    }

    @CrossOrigin
    @RequestMapping("/getall")
    public List<CelestialBody> home3(){
        List<CelestialBody> list = celestialBodyService.updatePositions();
        return list;
    }

    @CrossOrigin
    @RequestMapping("/getallold")
    public List<CelestialBody> home4(){
        List<CelestialBody> list = new ArrayList<>();
        list.add(new CelestialBody(1, "Sun"));
        list.add(new CelestialBody(2, "Earth"));
        return list;
    }



//    @PostMapping("/")
//    public CelestialBody homea(){
//        return new CelestialBody(1, "Sun");
//    }
//    @PutMapping("/")
//    public CelestialBody homes(){
//        return new CelestialBody(1, "Sun");
//    }
//    @DeleteMapping("/")
//    public CelestialBody homed(){
//        return new CelestialBody(1, "Sun");
//    }
//
//    @CrossOrigin
//    @RequestMapping("/get")
//    public CelestialBody home2(){
//        return new CelestialBody(2, "Sun");
//    }
//
//    @RequestMapping("/get2")
//    public String home2s(){
//        return "{\n" +
//                "    \"glossary\": {\n" +
//                "        \"title\": \"example glossary\",\n" +
//                "\t\t\"GlossDiv\": {\n" +
//                "            \"title\": \"S\",\n" +
//                "\t\t\t\"GlossList\": {\n" +
//                "                \"GlossEntry\": {\n" +
//                "                    \"ID\": \"SGML\",\n" +
//                "\t\t\t\t\t\"SortAs\": \"SGML\",\n" +
//                "\t\t\t\t\t\"GlossTerm\": \"Standard Generalized Markup Language\",\n" +
//                "\t\t\t\t\t\"Acronym\": \"SGML\",\n" +
//                "\t\t\t\t\t\"Abbrev\": \"ISO 8879:1986\",\n" +
//                "\t\t\t\t\t\"GlossDef\": {\n" +
//                "                        \"para\": \"A meta-markup language, used to create markup languages such as DocBook.\",\n" +
//                "\t\t\t\t\t\t\"GlossSeeAlso\": [\"GML\", \"XML\"]\n" +
//                "                    },\n" +
//                "\t\t\t\t\t\"GlossSee\": \"markup\"\n" +
//                "                }\n" +
//                "            }\n" +
//                "        }\n" +
//                "    }\n" +
//                "}";
//    }
//
//    @RequestMapping("/string")
//    public String home3(){
//        return "dssaa";
//    }
//
//    @GetMapping("/map")
//    public Map<String, String> sayHello() {
//        HashMap<String, String> map = new HashMap<>();
//        map.put("key", "value");
//        map.put("foo", "bar");
//        map.put("aa", "bb");
//        return map;
//    }
}
