const celestialMap = document.querySelector(".celestial-map")
const pauseButton = document.querySelector('#pause-button');
const myInterface = document.querySelector('.interface');
const apiBodyBox = document.querySelector("#bodies-from-api-box");
const myBodyBox = document.querySelector("#bodies-in-my-database-box");
const primaryBodyBox = document.querySelector("#primary-bodies-box");
const primaryBodyScreen = document.querySelector(".whole-window-screen")
const myWindows = document.querySelector(".all-windows");
const wholeScreenDiv = document.querySelector(".whole-window-screen");
// const myIP = "3.66.21.51";
const myIP = "localhost";
let apiBodyList = new Array();
let celestialBodies;
let bodyCenters;


document.addEventListener('DOMContentLoaded', async () => {
    let startUpData = await returnData("http://"+myIP+":8080/getall/");
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
        let bodiesData = await returnData("http://"+myIP+":8080/make-move/");
        displayPlanets(bodiesData);

    }
}, 50);

