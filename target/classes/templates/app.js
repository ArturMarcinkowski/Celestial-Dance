const celestialMap = document.querySelector(".celestial-map")
const pauseButton = document.querySelector('#pause-button');
const myInterface = document.querySelector('.interface');
const apiBodyBox = document.querySelector("#bodies-from-api-box");
const myBodyBox = document.querySelector("#bodies-in-my-database-box");
let apiBodyList = new Array();
let celestialBodies;
let bodyCenters;
let windows;

document.addEventListener('DOMContentLoaded', async () => {
    let startUpData = await returnData("http://localhost:8080/getall/");
    displayStartUpData(startUpData);

    celestialBodies = document.querySelectorAll(".celestialBody");
    windows = document.querySelectorAll('.window');
    bodyCenters = document.querySelectorAll(".celestialBodyCenter");

    let dataFromApi = await returnData("https://api.le-systeme-solaire.net/rest/bodies");
    displayBodiesListFromApi(dataFromApi);

    setUpMouseMovementEvents();
    setUpEventListeners();
})


setInterval(async () => {
    if (!pause) {
        let bodiesData = await returnData("http://localhost:8080/make-move/");
        displayPlanets(bodiesData);
        if (timer === 50) {
            timer = 0;
        } else {
            timer++;
        }

    }
}, 40);

