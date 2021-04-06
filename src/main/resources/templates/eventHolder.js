let pause = true;
let generateOrbit = false;
let generateOrbit2 = false;
let timer = 0;
let scale = 0;

function setUpEventListeners() {

    document.addEventListener("keydown", event => {
        if (event.key === "p") {
            pause = !pause;
        }
        if (event.key === "a") {
            generateOrbit = !generateOrbit;
        }
        if (event.key === "b") {
            generateOrbit2 = !generateOrbit2;
        }
    })

    pauseButton.addEventListener("click", function () {
        pause = !pause;
    })

    celestialBodies.forEach(setCelestialBodyClick())

    bodyCenters.forEach(setBodyCenterClick())

    document.querySelectorAll('.window').forEach(setWindowCloseClick);


    // apiBodyBox.querySelectorAll("li").forEach(el => {
    //     el.addEventListener("click", function () {
    //
    //
    //         addBodyToDatabase(el.innerText);
    //         displayBodyFromDatabase(el.innerText);
    //     });
    // });



}


function addBodyToDatabase(name) {
    apiBodyList.forEach(function (el) {
        if (el[0] === name) {
            sendRequest("http://localhost:8080/generate-data-from-api?name=" + el[1]);
        }
    })

    apiBodyBox.querySelectorAll("li").forEach(el => {
        if (el.innerText === name) {
            apiBodyBox.firstChild.removeChild(el);
        }
    });

}

function setLiClick(li) {
    li.addEventListener("click", function () {
        document.querySelectorAll('.window').forEach(el => {
            if (el.id === "window-" + li.id.substring(12)) {
                el.style.visibility = "visible";
            }
        })
    })
}

function setCelestialBodyClick(body) {
    body.addEventListener("click", function () {
        document.querySelectorAll('.window').forEach(el => {
            if (el.id === "window-" + body.id) {
                el.style.visibility = "visible";
            }
        })
    })
}

function setBodyCenterClick(bodyCenter) {
    bodyCenter.addEventListener("click", function () {
        windows.forEach(function (el) {
            if (el.id === "window-" + bodyCenter.id.substring(7)) {
                el.style.visibility = "visible";
            }
        })
    })
}

function setWindowCloseClick(window) {
    window.querySelector(".window-x-btn").addEventListener("click", function () {
        window.style.visibility = "hidden";
    })
}

function setApiListClick(ListElement){
    ListElement.addEventListener("click", function () {
        addBodyToDatabase(ListElement.innerText);
        displayBodyFromDatabase(ListElement.innerText);
    });
}

