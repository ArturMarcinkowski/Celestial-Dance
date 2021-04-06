const celestialMap = document.querySelector(".celestial-map")
const pauseButton = document.querySelector('#pause-button');
const myInterface = document.querySelector('.interface');
const apiBodyBox = document.querySelector("#bodies-from-api-box");
const myBodyBox = document.querySelector("#bodies-in-my-database-box");
let apiBodyList = new Array();
let celestialBodies;
let bodyCenters;

document.addEventListener('DOMContentLoaded', async () => {
    let startUpData = await returnData("http://localhost:8080/getall/");
    displayStartUpData(startUpData);

    celestialBodies = document.querySelectorAll(".celestialBody");
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


    }
}, 40);

