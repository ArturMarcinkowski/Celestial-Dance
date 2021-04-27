function generateBodyCenter(data){
    let newCenter = document.createElement("div");
    newCenter.id = "center-" + data.id;
    newCenter.className = "celestialBodyCenter";
    newCenter.style.top = data.posY + "px";
    newCenter.style.left = data.posX + "px";
    newCenter.style.backgroundColor = data.color

    setBodyCenterClick(newCenter);
    celestialMap.appendChild(newCenter);
    newCenter.style.transform = "scale(" + parseFloat(Math.pow(1.1, -scale)) + ")";
}


function generateBody(data){
    let newBody = document.createElement("div");
    newBody.id = data.id;
    newBody.textContent = data.name;
    newBody.style.top = data.posY + "px";
    newBody.style.left = data.posX + "px";
    newBody.style.backgroundColor = data.color
    // if(data.color == null){
    //     newBody.style.backgroundColor =
    // }
    newBody.style.width = data.radius + "px";
    newBody.style.height = data.radius + "px";
    newBody.style.border = toString(data.radius / 200) + "px solid black";
    newBody.className = "celestialBody";

    setCelestialBodyClick(newBody);
    celestialMap.appendChild(newBody);
    focusOnElement(newBody);
}


function generateWindow(data){
    let newWindow = document.querySelector(".window").cloneNode(true);
    newWindow.id = "window-" + data.id;
    newWindow.querySelector("h2").textContent = data.name;
    newWindow.querySelector(".window-inner-text").innerHTML = generateWindowInnerText(data);

    setWindowDeleteButton(newWindow);
    setWindowFocusButton(newWindow);
    setWindowCloseButton(newWindow);
    setWindowEnableButton(newWindow, data.enabled);
    setWindowSetOnMapButton(newWindow);
    setWindowPrimaryBodyButton(newWindow);
    setWindowAutoPrimaryBodyButton(newWindow);

    myInterface.appendChild(newWindow);
}

function generateWindowInnerText(data) {
    return "    <b>name:</b>   " + data.name + "<br/>" +
        "    <b>mass:</b>   " + data.massValue + "e" + data.massExponent + "<br/>" +
        "    <b>radius:</b> " + data.radius + "<br/>" +
        "    <b>color:</b>  " + data.color + "<br/>" +
        "    <b>primaryBodyId:</b>  " + data.primaryBodyId + "<br/>" +
        "    <b>velocity:</b>   " + parseFloat(Math.sqrt(data.velX * data.velX + data.velY * data.velY)).toFixed(6) + "<br/>" +
        "    <b>posX:</b>  " + data.posX + "<br/>" +
        "    <b>posY:</b>  " + data.posY + "<br/>";
}

function generateMyListElement(data){
    let newListElement = document.createElement("li");
    newListElement.innerText = data.name;
    newListElement.id = "my-box-list-" + data.id;

    setMyListClick(newListElement);
    myBodyBox.querySelector("ul").appendChild(newListElement);
}

function generatePrimaryBodiesListElement(data){
    let newListElement = document.createElement("li");
    newListElement.innerText = data.name;
    newListElement.id = "primary-box-list-" + data.id;
    setPrimaryBodyListClick(newListElement);
    primaryBodyBox.querySelector("ul").appendChild(newListElement);
}


function generateApiListElement(name){
    let newListElement = document.createElement("li");
    newListElement.innerText = name;

    setApiListClick(newListElement);
    let ul = apiBodyBox.querySelector("ul");
    ul.insertBefore(newListElement, ul.children[2]);
}



