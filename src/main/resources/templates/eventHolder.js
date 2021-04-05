let mouseDown = 0;
let mouseOnClickPosX = 0;
let mouseOnClickPosY = 0;
let mapOnClickPosX = 0;
let mapOnClickPosY = 0;
let pause = true;
let generateOrbit = false;
let generateOrbit2 = false;
let timer = 0;
let scale = 0;

window.addEventListener('DOMContentLoaded', () => {

    document.addEventListener('mousedown', function (event) {
        mouseOnClickPosX = event.clientX;
        mouseOnClickPosY = event.clientY;
        mapOnClickPosX = celestialMap.offsetLeft;
        mapOnClickPosY = celestialMap.offsetTop;
        mouseDown++;
    })

    document.onmouseup = function () {
        mouseDown--;
    }

    document.addEventListener('mousemove', function (event) {
        if (mouseDown) {
            celestialMap.style.left = (mapOnClickPosX + event.clientX - mouseOnClickPosX) + "px";
            celestialMap.style.top = (mapOnClickPosY + event.clientY - mouseOnClickPosY) + "px";
        }
    })

    document.addEventListener("keydown", function (event) {
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

    document.addEventListener("wheel", function (event) {
        scale -= parseInt(event.deltaX / 100);
        scale -= parseInt(event.deltaY / 100);
        celestialMap.style.transform = "scale(" + parseFloat(Math.pow(1.1, scale)) + ")";
    })

});

