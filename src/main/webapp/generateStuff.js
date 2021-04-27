function generateBodyCenter(data){
    let newCenter = document.createElement("div");
    newCenter.id = "center-" + data.id;
    newCenter.className = "celestialBodyCenter";
    newCenter.style.top = data.posY + "px";
    newCenter.style.left = data.posX + "px";

    setBodyCenterClick(newCenter);
    celestialMap.appendChild(newCenter);
}


function generateBody(data){
    let newBody = document.createElement("div");
    newBody.id = data.id;
    newBody.textContent = data.name;
    newBody.style.top = data.posY + "px";
    newBody.style.left = data.posX + "px";
    newBody.style.backgroundColor = data.color
    if(data.color == null){
        newBody.style.backgroundColor = Math.floor(Math.random()*16777215).toString(16);
    }
    newBody.style.width = data.radius + "px";
    newBody.style.height = data.radius + "px";
    newBody.className = "celestialBody";

    setCelestialBodyClick(newBody);
    celestialMap.appendChild(newBody);
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

    myInterface.appendChild(newWindow);
}

function generateWindowInnerText(data) {
    return "    <b>name:</b>   " + data.name + "<br/>" +
        "    <b>mass:</b>   " + data.massValue + "e" + data.massExponent + "<br/>" +
        "    <b>radius:</b> " + data.radius + "<br/>" +
        "    <b>color:</b>  " + data.color + "<br/>" +
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
    apiBodyBox.querySelector("ul").prepend(newListElement);
}



