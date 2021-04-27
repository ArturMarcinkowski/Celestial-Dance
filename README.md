# CelestialDance
An app that simulates movement of stars and planets  
Back-end made in Spring boot, frond-end in JavaScript.  
# Details  
This app is using Solar system OpenData API (https://api.le-systeme-solaire.net/) to gain data about celestial bodies in our solar system.  
My REST API sets bodies on two-dimensional map, and simulates their movement acording to Kepler's laws of planetary motion, and Newton's law of universal gravitation.  
# Deployment  
You can test app on surge: http://celestial-dance.surge.sh/  
You can also connect directly to my REST API, deployed on AWS with ip: 3.66.21.51 (for ex. http://3.66.21.51:8080/get-one?name=Sun)
# How to use  
To generate body and add it to the simulation pick the name from upper list [1.]. It shoud move to bottom list [2.] and a body shoud appear on the map. If you don't see any body just click on name on list [2.] and choose "Focus at body" on window that just pop up.   
![Bez tytułu44](https://user-images.githubusercontent.com/61290919/116313506-24e3f780-a7ae-11eb-955c-5f04723c611c.png)
![Bez tytułu45](https://user-images.githubusercontent.com/61290919/116315888-75108900-a7b1-11eb-891b-a6ad17b77f57.png)

In order to simulate movement, you need at least two bodies with enabled simulation (green ☈ window button). To set movement consistent with our solar system you need a secondary and a gravitational primary body (Sun for planet simulation, or planet for moon simulation). When you generate right objects pop up window of secondary body and click on 🔆 button, to set primary body, ☉ button to set object in right position and velocity on map, and ☈ button to enable it for simulation.  
![Animation](https://user-images.githubusercontent.com/61290919/116314980-244c6080-a7b0-11eb-9974-913aea9844b0.gif)  
If you ever feel lost, just click the reset button, refresh site, click play and be delight by marvelous celestial dance.


