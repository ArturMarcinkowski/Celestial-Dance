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
            scale -= parseInt(event.deltaY / 100);

            // let a = (celestialMap.offsetTop / 1.1) - celestialMap.offsetTop ;
            //
            // if(event.deltaY > 0){
            //     // celestialMap.style.top = (celestialMap.offsetTop - window.innerWidth / (event.clientY / Math.pow(1.1, -scale))) + "px";
            //     celestialMap.style.top = celestialMap.offsetTop + (a * ((event.clientY * 2) / window.innerHeight))+ "px";
            //     // celestialMap.style.top =  celestialMap.offsetTop + a + "px";
            //     // celestialMap.style.top = ((celestialMap.offsetTop / 1.1) + (Math.pow(1.1, -scale) * event.clientY / 20 ))+ "px";
            //
            //
            // }
            // if(event.deltaY < 0){
            //     // celestialMap.style.top = celestialMap.offsetTop - (a * ((event.clientY * 2) / window.innerHeight))+ "px";
            //     celestialMap.style.top = celestialMap.offsetTop - a + (0.1 * (event.clientY / window.innerHeight))+ "px";
            //     // celestialMap.style.top =  celestialMap.offsetTop - a + "px";
            //
            // }


            celestialMap.style.transform = "scale(" + parseFloat(Math.pow(1.1, scale)) + ")";
            bodyCenters.forEach(el => {
                el.style.transform = "scale(" + parseFloat(Math.pow(1.1, -scale)) + ")";
            })
        }
    })
}