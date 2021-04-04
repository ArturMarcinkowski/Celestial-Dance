package stars.CelestialDance.model;

import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Data
@Entity
public class Body {

    public Body(int id, String name) {
        this.id = id;
        this.name = name;
    }
    public Body() {
    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;

    private double posX;
    private double posY;

    private double velX;
    private double velY;

    private int primaryBodyId;

    private int mass;
    private int radius;
    private String color;



}
