async function returnData(url) {
    async function load(Url) {
        const request = await fetch(Url);
        const json = request.json();
        return json;
    }

    let data = await load(url);
    return data;
}

function displayPlanets(data) {
    data.forEach(el => {
        let body = document.getElementById(el.id);
        body.style.top = el.posY + "px";
        body.style.left = el.posX + "px";
        let center = document.getElementById("center-" + el.id);
        center.style.top = el.posY + "px";
        center.style.left = el.posX + "px";

        let bodyWindow = document.getElementById("window-" + el.id);
        bodyWindow.querySelector(".window-inner-text").innerHTML = generateWindowInnerText(el);


        if (generateOrbit2) {
            let bodyCenter = document.createElement("div");
            bodyCenter.className = "celestialBodyCenter";
            bodyCenter.style.top = el.posY + "px";
            bodyCenter.style.left = el.posX + "px";
            celestialMap.appendChild(bodyCenter);
        }
    })
}

function displayOrbits(data) {
    let newSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    newSvg.setAttribute("width", data.semiMajorAxis);
    newSvg.setAttribute("height", data.semiMinorAxis);
    newSvg.style.left = data.centerPosX + "px";
    newSvg.style.top = data.centerPosY + "px";

    let newEllipse = document.createElementNS("http://www.w3.org/2000/svg", "ellipse");
    newEllipse.style.cx = data.centerPosX + "px";
    newEllipse.style.cy = data.centerPosY + "px";
    newEllipse.style.rx = data.semiMajorAxis + "px";
    newEllipse.style.ry = data.semiMinorAxis + "px";
    // newEllipse.style.cx=  "10px";
    // newEllipse.style.cy =  "10px";
    // newEllipse.style.rx =  "100px";
    // newEllipse.style.ry = "100px";

    newEllipse.className = "orbit";
    newEllipse.style.transform = "rotate(" + data.angle + "deg)";
    newSvg.appendChild(newEllipse);
    celestialMap.appendChild(newSvg);

}


function displayStartUpData(data) {
    data.forEach(el => {
        let newBody = document.createElement("div");
        newBody.id = el.id;
        newBody.textContent = el.name;
        newBody.style.top = el.posY + "px";
        newBody.style.left = el.posX + "px";
        newBody.style.backgroundColor = el.color
        newBody.style.width = el.radius + "px";
        newBody.style.height = el.radius + "px";
        newBody.className = "celestialBody";
        celestialMap.appendChild(newBody);


        let newCenter = document.createElement("div");
        newCenter.id = "center-" + el.id;
        newCenter.className = "celestialBodyCenter";
        newCenter.style.top = el.posY + "px";
        newCenter.style.left = el.posX + "px";
        celestialMap.appendChild(newCenter);


        let newWindow = document.querySelector(".window").cloneNode(true);
        newWindow.id = "window-" + el.id;
        newWindow.querySelector("h2").textContent = el.name;
        newWindow.querySelector(".window-inner-text").innerHTML = generateWindowInnerText(el);
        interface.appendChild(newWindow);
    })
}

function generateWindowInnerText(data) {
    return "    <b>name:</b>   " + data.name + "<br/>" +
        "    <b>mass:</b>   " + data.mass + "<br/>" +
        "    <b>radius:</b> " + data.radius + "<br/>" +
        "    <b>color:</b>  " + data.color + "<br/>" +
        "    <b>velocity:</b>   " + parseFloat(data.velX).toFixed(6) + "<br/>";
}

