package stars.CelestialDance.utils.apiConverter;

import org.springframework.web.client.RestTemplate;
import stars.CelestialDance.model.CelestialUnit;

public class MoonConverter {
    String rel;

    public String getMoonName() {
        RestTemplate restTemplate = new RestTemplate();
        BodyDataConverter data = restTemplate.getForObject(this.rel, BodyDataConverter.class);
        return data.getEnglishName();
    }
}
