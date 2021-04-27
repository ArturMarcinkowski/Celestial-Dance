document.addEventListener('DOMContentLoaded', async () => {
    let startUpData = await returnData("http://" + myIP + ":8080/getall/");
    displayStartUpData(startUpData);

    celestialBodies = document.querySelectorAll(".celestialBody");
    bodyCenters = document.querySelectorAll(".celestialBodyCenter");

    let dataFromApi = await returnData("https://api.le-systeme-solaire.net/rest/bodies");
    displayBodiesListFromApi(dataFromApi);

    setUpMouseMovementEvents();
    setUpEventListeners();


})

let isIntervalInProgress = false;
setInterval(async () => {
    if (!pause && isIntervalInProgress === false) {
        isIntervalInProgress = true;
        let bodiesData = await returnData("http://" + myIP + ":8080/make-move/");
        displayPlanets(bodiesData);
        isIntervalInProgress = false;
    }
}, 1);

