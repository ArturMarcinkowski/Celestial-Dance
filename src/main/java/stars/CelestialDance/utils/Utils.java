package stars.CelestialDance.utils;

import stars.CelestialDance.model.Body;

import java.util.Random;

public class Utils {

    public static int getDataScale() {
        return 1000;
    }

    public static double getGravitationalConstant() {
        return 6.6743e-11;
    }

    public static float getGravConstValue() {
        return (float) 6.674;
    }

    public static int getGravConstExponent() {
        return (int) (-11 - Math.log10(getDataScale()));
    }

//    public static float calcGM(Body body){
//        return body.getMassValue() * getGravConstValue() * Math.pow(10, getGravConstExponent() + body.getMassExponent());
//    }

    public static double calcStandGravParam(Body body) {
        return body.getMassValue() * getGravConstValue() * Math.pow(10, (getGravConstExponent() + body.getMassExponent()));
    }

    public static float calcRadius(float x, float y) {
        return (float) Math.sqrt(x * x + y * y);
    }

    public static float calcRadius(Body body1, Body body2) {
        return calcRadius(body1.getPosX() - body2.getPosX(), body1.getPosY() - body2.getPosY());
    }

    public static float calcAngle(Body body1, Body body2) {
        return (float) Math.atan((body1.getPosX() - body2.getPosX()) / (body1.getPosY() - body2.getPosY()));
    }

    public static double getRanNumber(double min, double max) {
        return min + Math.random() * (max - min);
    }
}
