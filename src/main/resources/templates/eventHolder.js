let generateOrbit = false;
let generateOrbit2 = false;
let timer = 0;
let scale = 0;
let pause = true

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
        filterSearchLists();
    })

    pauseButton.addEventListener("click", function () {
        pause = !pause;
    })

    // document.querySelectorAll(".scroll-box-search").forEach(setSearchTextChange);

    celestialBodies.forEach(setCelestialBodyClick())


    bodyCenters.forEach(setBodyCenterClick())

    document.querySelectorAll('.window').forEach(setWindowCloseButton);


}


function addBodyToDatabase(name) {
    apiBodyList.forEach(async function (el) {
        if (el[0] === name) {
            await sendRequest("http://localhost:8080/generate-data-from-api?name=" + el[1]);
            displayBodyFromDatabase(name);
        }
    })
    apiBodyBox.querySelectorAll("li").forEach(el => {
        if (el.innerText === name) {
            apiBodyBox.querySelector("ul").removeChild(el);
        }
    });
}

function setMyListClick(li) {
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
        document.querySelectorAll(".window").forEach(function (el) {
            if (el.id === "window-" + bodyCenter.id.substring(7)) {
                el.style.visibility = "visible";
            }
        })
        document.getElementById()
    })
}

function setWindowDeleteButton(myWindow) {
    myWindow.querySelector(".window-d-btn").addEventListener("click", function () {
        sendRequest("http://localhost:8080/delete-by-id?id=" + myWindow.id.substring(7))
        moveLiFromMyListToApi(myWindow.id.substring(7));
        removeCelestialObject(myWindow.id.substring(7));
    })
}

function setWindowCloseButton(myWindow) {
    myWindow.querySelector(".window-x-btn").addEventListener("click", function () {
        myWindow.style.visibility = "hidden";
    })
}

function setWindowFocusButton(myWindow) {
    myWindow.querySelector(".window-o-btn").addEventListener("click", function () {
        document.querySelectorAll(".celestialBody").forEach(el => {
            if (el.id === myWindow.id.substring(7)) {
                focusTurnOn(el);
            }
        })
    })
}


function setApiListClick(listElement) {
    listElement.addEventListener("click", function () {
        addBodyToDatabase(listElement.innerText);
    });
}

// function setSearchTextChange(input) {
//     input.addEventListener("change", function () {
//         pause = !pause;
//     });
//
// }


function filterSearchLists(){
    document.querySelectorAll(".scroll-box-frame").forEach(frame => {
        let searchText = frame.querySelector(".scroll-box-search").value;
        frame.querySelectorAll("li").forEach(li =>{
            if(li.textContent.includes(searchText)){
                li.style.visibility = "visible";
            }else {
                li.style.visibility = "hidden";
            }
        })
    });
}

