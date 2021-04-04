package stars.CelestialDance;

import stars.CelestialDance.model.Body;

public class Utils {

    public static double calcRadius(double x, double y) {
        return Math.sqrt(x * x + y * y);
    }
    public static double calcRadius(Body body1, Body body2) {
        return calcRadius(body1.getPosX() - body2.getPosX(), body1.getPosY() - body2.getPosY());
    }
    public static double calcAngle(Body body1, Body body2){
        return Math.atan((body1.getPosX() - body2.getPosX())/(body1.getPosY() - body2.getPosY()));
    }
}
