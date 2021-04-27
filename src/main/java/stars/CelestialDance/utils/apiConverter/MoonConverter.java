package stars.CelestialDance.utils.apiConverter;

import lombok.Data;
import org.springframework.web.client.RestTemplate;

@Data
public class MoonConverter {
    String rel;
    String moon;

    public String getMoonName() {
        RestTemplate restTemplate = new RestTemplate();
        BodyDataConverter data = restTemplate.getForObject(this.rel, BodyDataConverter.class);
        return data.getEnglishName();
    }
}
