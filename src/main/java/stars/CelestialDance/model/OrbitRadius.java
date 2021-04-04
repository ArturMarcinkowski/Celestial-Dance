package stars.CelestialDance.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.Id;

@Data
@Entity
public class OrbitRadius {


    @Id
    private int id;

    private double rMin;
    private boolean rMinConfirm;

    private double rMax;
    private boolean rMaxConfirm;

}
