


document.addEventListener('DOMContentLoaded', async () => {
    let startUpData = await returnData("http://"+myIP+":8080/getall/");
    displayStartUpData(startUpData);

    celestialBodies = document.querySelectorAll(".celestialBody");
    bodyCenters = document.querySelectorAll(".celestialBodyCenter");

    let dataFromApi = await returnData("https://api.le-systeme-solaire.net/rest/bodies");
    displayBodiesListFromApi(dataFromApi);

    setUpMouseMovementEvents();
    setUpEventListeners();


    setInterval(async () => {
        if (!pause) {
            let bodiesData = await returnData("http://"+myIP+":8080/make-move/");
            displayPlanets(bodiesData);

        }
    }, 50);
})




