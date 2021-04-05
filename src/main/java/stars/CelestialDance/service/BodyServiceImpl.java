package stars.CelestialDance.service;


import org.springframework.stereotype.Service;
import stars.CelestialDance.utils.BodyDataConverter;
import stars.CelestialDance.utils.Utils;
import stars.CelestialDance.model.Body;
import stars.CelestialDance.repository.BodyRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class BodyServiceImpl implements BodyService {

    private final BodyRepository bodyRepository;
    private final OrbitRadiusService orbitRadiusService;
    private final double G = 0.1;

    public BodyServiceImpl(BodyRepository bodyRepository, OrbitRadiusService orbitRadiusService) {
        this.bodyRepository = bodyRepository;
        this.orbitRadiusService = orbitRadiusService;
    }

    @Override
    public Optional<Body> findById(int id) {
        return bodyRepository.findById(id);
    }

    @Override
    public List<Body> updatePositions() {
        List<Body> oldList = bodyRepository.findAll();
        List<Body> newList = new ArrayList<>();
        for (Body body : oldList) {
            Body updatedBody = updatePosition(body, oldList);
            newList.add(updatedBody);
            bodyRepository.save(updatedBody);
        }
        return newList;
    }

    @Override
    public Body updatePosition(Body body1, List<Body> bodies) {
        float changeX = 0, changeY = 0;

        for (Body body2 : bodies) {
            float diffX = body1.getPosX() - body2.getPosX();
            float diffY = body1.getPosY() - body2.getPosY();
            float r = Utils.calcRadius(diffX, diffY);
            if (r != 0) {
                float F = (float) G * body2.getMass() / (r * r);
                changeX += F * diffX / r;
                changeY += F * diffY / r;
            }
            if (body2.getId() == body1.getPrimaryBodyId()) {
                orbitRadiusService.testForRadius(body1.getId(), r);
            }
        }


        body1.setVelX((body1.getVelX() - changeX));
        body1.setVelY((body1.getVelY() - changeY));
        body1.setPosX(body1.getPosX() + body1.getVelX());
        body1.setPosY(body1.getPosY() + body1.getVelY());

        return body1;
    }

    @Override
    public Body processData(BodyDataConverter data){
        Body body =  new Body();
//        body.setMass(data.getMass());
//        body.setName(data.getName());
        return body;
    }

    @Override
    public void save(Body body) {
        bodyRepository.save(body);
    }

    @Override
    public int saveNewBody(Body body) {
        bodyRepository.save(body);
        return body.getId();
    }
}
