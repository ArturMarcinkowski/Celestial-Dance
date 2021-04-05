const celestialMap = document.querySelector(".celestialMap")
const pauseButton = document.querySelector('#pauseButton');
const interface = document.querySelector('.interface');
let celestialBodies;
let windows;

document.addEventListener('DOMContentLoaded', async () => {
    let startUpData = await returnData("http://localhost:8080/getall/");
    displayStartUpData(startUpData);

    celestialBodies = document.querySelectorAll(".celestialBody");
    windows = document.querySelectorAll('.window');
    setUpEventListeners();
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

