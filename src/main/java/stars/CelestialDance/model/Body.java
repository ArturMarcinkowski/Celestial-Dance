package stars.CelestialDance.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@Entity
public class Body {

    public Body() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;

    private float posX;
    private float posY;

    private float velX;
    private float velY;

    private int primaryBodyId;

    private float massValue;
    private int massExponent;

    private int radius;
    private String color;

    private boolean enabled;

    public boolean getEnabled(){
        return this.enabled;
    }

}
