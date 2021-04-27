

function setUpEventListeners() {

    document.addEventListener("keydown", event => {
        if (event.key === "p") {
            pause = !pause;
        }

        // filterSearchLists();
    })

    pauseButton.addEventListener("click", function () {
        pause = !pause;
    })

    // document.querySelectorAll(".scroll-box-search").forEach(setSearchTextChange);
    // celestialBodies.forEach(setCelestialBodyClick())
    // bodyCenters.forEach(setBodyCenterClick())
    // document.querySelectorAll('.window').forEach(setWindowCloseButton);


}


function addBodyToDatabase(name) {
    let id = 0;
    apiBodyList.forEach(async function (el) {
        if (el[0] === name) {
            id = await sendRequest("http://"+myIP+":8080/generate-data-from-api?name=" + el[1]);

            displayBodyFromDatabase(name).then(function () {
                document.getElementById(String("window-" + id)).style.visibility = "visible"; /////////not working?????
            });

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
        document.getElementById("window-" + li.id.substring(12)).style.visibility = "visible";
    })
}

function setPrimaryBodyListClick(li) {
    li.addEventListener("click", function () {
        wholeScreenDiv.style.visibility="hidden";
        sendRequest("http://"+myIP+":8080/set-primary-body?bodyId=" + bodyPrimaryBodyId +"&primaryBodyId=" + li.id.substring(17));
        bodyPrimaryBodyId = 0;
    })
}


function setCelestialBodyClick(body) {
    body.addEventListener("click", function () {
        document.getElementById("window-" + body.id).style.visibility = "visible";
    })
}

function setBodyCenterClick(bodyCenter) {
    bodyCenter.addEventListener("click", function () {
        document.getElementById("window-" + bodyCenter.id.substring(7)).style.visibility = "visible";
    })
}

function setWindowDeleteButton(myWindow) {
    myWindow.querySelector(".window-d-btn").addEventListener("click", function () {
        sendRequest("http://"+myIP+":8080/delete-by-id?id=" + myWindow.id.substring(7))
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

function setWindowEnableButton(myWindow, isEnabled) {
    let myButton = myWindow.querySelector(".window-enable-btn");

    if (isEnabled) {
        myButton.classList.add("window-enable-btn-on");
    } else {
        myButton.classList.add("window-enable-btn-off");
    }

    myButton.addEventListener("click", function () {
        if (myButton.classList.contains("window-enable-btn-off")) {
            sendRequest("http://"+myIP+":8080/enable?id=" + myWindow.id.substring(7));
            myButton.classList.add("window-enable-btn-on");
            myButton.classList.remove("window-enable-btn-off");
        } else if (myButton.classList.contains("window-enable-btn-on")) {
            sendRequest("http://"+myIP+":8080/disable?id=" + myWindow.id.substring(7));
            myButton.classList.add("window-enable-btn-off");
            myButton.classList.remove("window-enable-btn-on");
        }
    })
}

function setWindowSetOnMapButton(myWindow){
    myWindow.querySelector(".window-set-place-btn").addEventListener("click", function (){
        sendRequest("http://"+myIP+":8080/set-body-on-map?id=" + myWindow.id.substring(7));
    })
}


function setWindowPrimaryBodyButton(myWindow) {
    myWindow.querySelector(".window-primary-body-btn").addEventListener("click", function () {
        bodyPrimaryBodyId = myWindow.id.substring(7);
        wholeScreenDiv.style.visibility = "visible";
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


function filterSearchLists() {
    document.querySelectorAll(".scroll-box-frame").forEach(frame => {
        let searchText = frame.querySelector(".scroll-box-search").value;
        frame.querySelectorAll("li").forEach(li => {
            if (li.textContent.includes(searchText)) {
                li.style.visibility = "visible";
            } else {
                li.style.visibility = "hidden";
            }
        })
    });
}

