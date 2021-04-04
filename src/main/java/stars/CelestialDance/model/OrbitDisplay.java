package stars.CelestialDance.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;

@Data
@Entity
public class OrbitDisplay {

    public OrbitDisplay() {
    }

    @Id
    private int id;

    int centerPosX;
    int centerPosY;
    int semiMajorAxis;
    int semiMinorAxis;
    int angle;

}
