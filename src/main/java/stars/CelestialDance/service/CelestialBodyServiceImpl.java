package stars.CelestialDance.service;


import org.springframework.stereotype.Service;
import stars.CelestialDance.model.CelestialBody;
import stars.CelestialDance.repository.CelestialBodyRepository;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;

@Service
public class CelestialBodyServiceImpl implements CelestialBodyService {

    private CelestialBodyRepository celestialBodyRepository;
    private final double G = 0.001;

    public CelestialBodyServiceImpl(CelestialBodyRepository celestialBodyRepository) {
        this.celestialBodyRepository = celestialBodyRepository;
    }

    public List<CelestialBody> updatePositions(){
        List<CelestialBody> oldList = celestialBodyRepository.findAll();
        List<CelestialBody> newList = new ArrayList<>();
        for(CelestialBody body:oldList){
            CelestialBody updatedBody = updatePosition(body, oldList);
            newList.add(updatedBody);
            celestialBodyRepository.save(updatedBody);
        }
        return newList;
    }

    public CelestialBody updatePosition(CelestialBody body1, List<CelestialBody> bodies){
        double changeX = 0, changeY = 0;

        for(CelestialBody body2:bodies){
            double diffX = body1.getPosX() - body2.getPosX();
            double diffY = body1.getPosY() - body2.getPosY();
            double r2 = diffX * diffX + diffY * diffY;
            if(r2 != 0) {
                double F = G * body2.getMass() / r2;
                changeX += diffX * F;
                changeY += diffY * F;
            }
        }

        body1.setVelX( (body1.getVelX() - changeX));
        body1.setVelY( (body1.getVelY() - changeY));

        body1.setPosX(body1.getPosX() + body1.getVelX());
        body1.setPosY(body1.getPosY() + body1.getVelY());

        return body1;
    }

}
