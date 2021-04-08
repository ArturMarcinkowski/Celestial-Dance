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
    myInterface.appendChild(newWindow);
}


function generateMyListElement(data){
    let newListElement = document.createElement("li");
    newListElement.innerText = data.name;
    newListElement.id = "my-box-list-" + data.id;

    setMyListClick(newListElement);
    myBodyBox.querySelector("ul").appendChild(newListElement);
}




function generateApiListElement(name){
    let newListElement = document.createElement("li");
    newListElement.innerText = name;

    setApiListClick(newListElement);
    apiBodyBox.querySelector("ul").prepend(newListElement);
}

