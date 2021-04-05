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
        let center = document.getElementById(el.id + "C");
        center.style.top = el.posY + "px";
        center.style.left = el.posX + "px";

        if (generateOrbit2) {
            let smallDiv = document.createElement("div");
            smallDiv.className = "celestialBodyCenter";
            smallDiv.style.top = el.posY + "px";
            smallDiv.style.left = el.posX + "px";
            celestialMap.appendChild(smallDiv);
        }


        let polyline = document.getElementById(el.id + "-polyline");

        // if(polyline != null){
        //     let svg = document.getElementById('svg-'+el.id);
        //     let point = svg.createSVGPoint();
        //     point.x = el.posX;
        //     point.y = el.posY;
        //     polyline.points.appendItem(point);
        // }

        if (polyline != null) {
            let svg = document.getElementById('svg-' + el.id);
            // if(svg.offsetLeft > el.posX){
            svg.style.left = el.posX + "px";
            // }
            // if(svg.offsetTop > el.posY){
            svg.style.top = el.posY + "px";
            // }
            // if(svg.offsetHeight < el.posY - svg.offsetTop){
            svg.height = (el.posY - svg.offsetTop) + "px";
            // }
            // if(svg.offsetWidth < el.posX - svg.offsetLeft){
            svg.width = (el.posX - svg.offsetLeft) + "px";
            // }


            let polylinePoints = polyline.getAttribute("points")
            polylinePoints += parseInt(el.posX) + ", " + parseInt(el.posY) + " ";
            polyline.setAttribute('points', polylinePoints);
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
        let newDiv = document.createElement("div");
        newDiv.id = el.id;
        newDiv.textContent = el.name;
        newDiv.style.top = el.posY + "px";
        newDiv.style.left = el.posX + "px";
        newDiv.style.backgroundColor = el.color
        newDiv.style.width = el.radius + "px";
        newDiv.style.height = el.radius + "px";
        newDiv.className = "celestialBody";
        celestialMap.appendChild(newDiv);

        let smallDiv = document.createElement("div");
        smallDiv.id = el.id + "C";
        smallDiv.className = "celestialBodyCenter";
        smallDiv.style.top = el.posY + "px";
        smallDiv.style.left = el.posX + "px";
        celestialMap.appendChild(smallDiv);


    })
}

