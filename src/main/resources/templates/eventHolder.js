
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

    celestialBodies.forEach(function (celestialBody) {
        celestialBody.addEventListener("click", function () {
            windows.forEach(el => {
                if (el.id == "window-" + celestialBody.id) {
                    el.style.visibility = "visible";
                }
            })
        })
    })

    bodyCenters.forEach(function (bodyCenter) {
        bodyCenter.addEventListener("click", function () {
            windows.forEach(function (el) {
                if (el.id == "window-" + bodyCenter.id.substring(7)) {
                    el.style.visibility = "visible";
                }
            })
        })
    })

    apiBodyBox.querySelectorAll("li").forEach(el => {
        el.addEventListener("click", function () {
            addBodyToDatabase(el.innerText)
        })
    })

    function addBodyToDatabase(name) {
        let newListElement = document.createElement("li");
        newListElement.innerText = name;
        myBodyBox.firstChild.appendChild(newListElement);

        apiBodyList.forEach(el => {
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

    windows.forEach(el => {
        el.querySelector(".window-x-btn").addEventListener("click", function () {
            el.style.visibility = "hidden";
        })
    })
}


