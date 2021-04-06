let mouseDown = 0;
let mouseOnClickPosX = 0;
let mouseOnClickPosY = 0;
let elementOnClickPosX = 0;
let elementOnClickPosY = 0;
let clickedElement;
let pause = true;
let generateOrbit = false;
let generateOrbit2 = false;
let timer = 0;
let scale = 0;

function setUpEventListeners() {

    document.addEventListener('mousedown', event => {
        mouseDown++;
        mouseOnClickPosX = event.clientX;
        mouseOnClickPosY = event.clientY;
        clickedElement = null;

        if (!myInterface.contains(event.target)) {
            elementOnClickPosX = celestialMap.offsetLeft;
            elementOnClickPosY = celestialMap.offsetTop;
            clickedElement = celestialMap;
        } else {
            windows.forEach(el => {
                if (el.querySelector(".window-top").contains(event.target)) {
                    clickedElement = el;
                    elementOnClickPosX = clickedElement.offsetLeft;
                    elementOnClickPosY = clickedElement.offsetTop;
                }
            });
        }
    })
    document.addEventListener('mouseup', function (event) {
        mouseDown--;
        if (mouseDown < 0) mouseDown = 0;
    })
    document.addEventListener('mousemove', event => {
        if (mouseDown > 0) {
            clickedElement.style.left = (elementOnClickPosX + event.clientX - mouseOnClickPosX) + "px";
            clickedElement.style.top = (elementOnClickPosY + event.clientY - mouseOnClickPosY) + "px";
        }
    })

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

    document.addEventListener("wheel", event => {
        if (!myInterface.contains(event.target)) {
            scale -= parseInt(event.deltaX / 100);
            scale -= parseInt(event.deltaY / 100);
            // celestialMap.style.top = (celestialMap.style.top + 300 ) + "px";
            celestialMap.style.transform = "scale(" + parseFloat(Math.pow(1.1, scale)) + ")";
            bodyCenters.forEach(el => {
                el.style.transform = "scale(" + parseFloat(Math.pow(1.1, -scale)) + ")";
            })
        }
    })

}


