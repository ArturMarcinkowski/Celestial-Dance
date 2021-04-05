const celestialMap = document.querySelector(".celestialMap")
const celestialBodies = document.querySelectorAll(".celestialBody");
const pauseButton = document.querySelector('#pauseButton');
const interface = document.querySelector('.interface');


document.addEventListener('DOMContentLoaded', async () => {
    let startUpData = await returnData("http://localhost:8080/getall/");
    displayStartUpData(startUpData);
})


setInterval(async () => {
    if (!pause) {
        let bodiesData = await returnData("http://localhost:8080/getall/");
        displayPlanets(bodiesData);
        if (timer === 50) {
            timer = 0;
        } else {
            timer++;
        }
        if (generateOrbit) {
            let orbitData = await returnData("http://localhost:8080/get-orbit-data?id=4");
            displayOrbits(orbitData);
        }
    }
}, 40);

