function focusTurnOn(body) {
    if (parseInt(body.id) === focusOn) {
        focusTurnOff();
    } else {
        if (focusOn !== 0) {
            focusTurnOff();
        }
        focusOn = parseInt(body.id);
        focusOnElement(body);
        document.getElementById("window-" + body.id).querySelector(".window-o-btn").style.backgroundColor = "brown";
    }
}

function focusTurnOff() {
    document.getElementById("window-" + focusOn).querySelector(".window-o-btn").style.backgroundColor = "chocolate";
    focusOn = 0;
}

function focusOnElement(el) {
    celestialMap.style.left = -el.offsetLeft * (parseFloat(Math.pow(1.1, scale))) + +window.innerWidth / 2 + "px";
    celestialMap.style.top = -el.offsetTop * parseFloat(Math.pow(1.1, scale)) + +window.innerHeight / 2 + "px";
}