package stars.CelestialDance.utils;

import stars.CelestialDance.model.Body;

public class Utils {

    public static float calcRadius(float x, float y) {
        return (float) Math.sqrt(x * x + y * y);
    }
    public static float calcRadius(Body body1, Body body2) {
        return calcRadius(body1.getPosX() - body2.getPosX(), body1.getPosY() - body2.getPosY());
    }
    public static float calcAngle(Body body1, Body body2){
        return (float) Math.atan((body1.getPosX() - body2.getPosX())/(body1.getPosY() - body2.getPosY()));
    }
}
