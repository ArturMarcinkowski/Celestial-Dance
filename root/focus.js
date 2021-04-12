function focusTurnOn(body) {
    if (parseInt(body.id) === focusOn) {
        focusTurnOff();
    } else {
        if (focusOn !== 0) {
            focusTurnOff();
        }
        focusOn = parseInt(body.id);
        focusOnElement(body);
        // document.getElementById("window-" + body.id).querySelector(".window-o-btn").style.backgroundColor = "brown";
        document.getElementById("window-" + body.id).querySelector(".window-o-btn").classList.add("window-button-clicked");
    }
}

function focusTurnOff() {
    let element = document.getElementById("window-" + focusOn);
    if(element !== null){
        // element.querySelector(".window-o-btn").style.backgroundColor = "chocolate";
        element.querySelector(".window-o-btn").classList.remove("window-button-clicked");
    }
    focusOn = 0;
}

function focusOnElement(el) {
    celestialMap.style.left = -el.offsetLeft * (parseFloat(Math.pow(1.1, scale))) + +window.innerWidth / 2 + "px";
    celestialMap.style.top = -el.offsetTop * parseFloat(Math.pow(1.1, scale)) + +window.innerHeight / 2 + "px";
}