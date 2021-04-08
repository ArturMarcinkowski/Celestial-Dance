package stars.CelestialDance.utils.apiConverter;

import lombok.Data;
import stars.CelestialDance.model.Body;
import stars.CelestialDance.model.CelestialUnit;
import stars.CelestialDance.model.OrbitRadius;
import stars.CelestialDance.utils.Utils;

import java.util.ArrayList;
import java.util.List;

@Data
public class BodyDataConverter {
    private String englishName;
    private BodyMassDataConverter mass;
    private AroundPlanetConverter aroundPlanet;
    private List<MoonConverter> moons;
    private float density;
    private int meanRadius;
    private int equaRadius;
    private int polarRadius;
    private long semimajorAxis;
    private long perihelion;
    private long aphelion;
    private String isPlanet;
    private float eccentricity;


    public CelestialUnit convertToCelestialUnit() {
        CelestialUnit unit = new CelestialUnit();
        Body body = new Body();
        OrbitRadius radius = new OrbitRadius();

        body.setName(this.getEnglishName());
        if (this.getMass() != null) {
            body.setMassValue(this.getMass().getMassValue());
            body.setMassExponent(this.getMass().getMassExponent() - (int) Math.log10(Utils.getDataScale()));
        } else {
            body.setMassValue(1);
            body.setMassExponent(1);
        }
        body.setRadius(Math.max(this.getMeanRadius(), Math.max(this.getEquaRadius(), this.getPolarRadius())) / Utils.getDataScale());
        body.setEnabled(false);

        radius.setEccentricity(this.getEccentricity());
        radius.setRMin(this.getAphelion() / Utils.getDataScale());
        radius.setRMax(this.getPerihelion() / Utils.getDataScale());

        unit.setBody(body);
        unit.setOrbitRadius(radius);

        return unit;
    }

    public List<String> getMoonNames() {
        List<String> names = new ArrayList<>();
        for (MoonConverter oneMoon : moons) {
            if (!oneMoon.getRel().equals("https://api.le-systeme-solaire.net/rest/bodies/s2011j1") &&
                    !oneMoon.getRel().contains("https://api.le-systeme-solaire.net/rest/bodies/s2004s")) { //this two not working, probably corrupted
                    names.add(oneMoon.getMoonName());
                }
        }
        return names;
    }

}
