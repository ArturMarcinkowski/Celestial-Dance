let mouseDown = 0;
let mouseOnClickPosX = 0;
let mouseOnClickPosY = 0;
let elementOnClickPosX = 0;
let elementOnClickPosY = 0;
let clickedElement;


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