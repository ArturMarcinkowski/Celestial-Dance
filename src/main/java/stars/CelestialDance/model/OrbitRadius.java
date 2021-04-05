package stars.CelestialDance.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;

@Data
@Entity
public class OrbitRadius {


    @Id
    private int id;

    private long rMin;
    private boolean rMinConfirm;

    private long rMax;
    private boolean rMaxConfirm;

    private float eccentricity;

}
