async function returnData(url) {
    async function load(Url) {
        const request = await fetch(Url);
        const json = request.json();
        return json;
    }

    let data = await load(url);
    return data;
}

async function sendRequest (url) {
        await fetch(url);
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


function displayStartUpData(data) {
    data.forEach(addBody)
}

function addBody(data) {
    let newCenter = document.createElement("div");
    newCenter.id = "center-" + data.id;
    newCenter.className = "celestialBodyCenter";
    newCenter.style.top = data.posY + "px";
    newCenter.style.left = data.posX + "px";
    celestialMap.appendChild(newCenter);

    let newBody = document.createElement("div");
    newBody.id = data.id;
    newBody.textContent = data.name;
    newBody.style.top = data.posY + "px";
    newBody.style.left = data.posX + "px";
    newBody.style.backgroundColor = data.color
    newBody.style.width = data.radius + "px";
    newBody.style.height = data.radius + "px";
    newBody.className = "celestialBody";
    celestialMap.appendChild(newBody);


    let newWindow = document.querySelector(".window").cloneNode(true);
    newWindow.id = "window-" + data.id;
    newWindow.querySelector("h2").textContent = data.name;
    newWindow.querySelector(".window-inner-text").innerHTML = generateWindowInnerText(data);
    myInterface.appendChild(newWindow);


    let newListElement = document.createElement("li");
    newListElement.innerText = data.name;
    myBodyBox.firstChild.appendChild(newListElement);

}

function displayBodiesListFromApi(data) {
    data.bodies.forEach(el => {
        apiBodyList.push([el.englishName, el.id]);
    })
    apiBodyList.forEach(el => {
        let addThisName = true;
        celestialBodies.forEach(body => {
            if (body.textContent === el[0]) {
                addThisName = false;
            }
        })
        if (addThisName) {
            // apiBodyBox.innerHTML += el[0] + "<br/>"

            let newListElement = document.createElement("li");
            newListElement.innerText = el[0];
            apiBodyBox.firstChild.appendChild(newListElement);
        }
    })
}


function generateWindowInnerText(data) {
    return "    <b>name:</b>   " + data.name + "<br/>" +
        "    <b>mass:</b>   " + data.massValue + "e" + data.massExponent + "<br/>" +
        "    <b>radius:</b> " + data.radius + "<br/>" +
        "    <b>color:</b>  " + data.color + "<br/>" +
        "    <b>velocity:</b>   " + parseFloat(Math.sqrt(data.velX * data.velX + data.velY * data.velY)).toFixed(6) + "<br/>";
}

