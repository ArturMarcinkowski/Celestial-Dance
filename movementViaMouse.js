let mouseDown = 0;
let mouseOnClickPosX = 0;
let mouseOnClickPosY = 0;
let elementOnClickPosX = 0;
let elementOnClickPosY = 0;
let clickedElement;
let focusOn = 0;


function setUpMouseMovementEvents() {

    document.addEventListener('mousedown', event => {
        mouseDown++;
        mouseOnClickPosX = event.clientX;
        mouseOnClickPosY = event.clientY;
        clickedElement = null;

        if (!myInterface.contains(event.target)) {
            elementOnClickPosX = celestialMap.offsetLeft;
            elementOnClickPosY = celestialMap.offsetTop;
            clickedElement = celestialMap;
            focusTurnOff();
        } else {
            document.querySelectorAll(".window").forEach(el => {
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


    document.addEventListener("wheel", event => {
        if (!myInterface.contains(event.target)) {
            scale -= parseInt(event.deltaY / 100);
            let h = event.clientY;
            let w = event.clientX;

            if (event.deltaY > 0) {
                celestialMap.style.top = (h + (celestialMap.offsetTop - h) / 1.1) + "px";
                celestialMap.style.left = (w + (celestialMap.offsetLeft - w) / 1.1) + "px";
            }
            if (event.deltaY < 0) {
                celestialMap.style.top = 1.1 * (celestialMap.offsetTop - h) + h + "px";
                celestialMap.style.left = 1.1 * (celestialMap.offsetLeft + -w) + w + "px";
            }


            celestialMap.style.transform = "scale(" + parseFloat(Math.pow(1.1, scale)) + ")";
            bodyCenters.forEach(el => {
                el.style.transform = "scale(" + parseFloat(Math.pow(1.1, -scale)) + ")";
            })
            if (focusOn !== 0) {
                focusOnElement(document.getElementById(focusOn));
            }
        }
    })
}