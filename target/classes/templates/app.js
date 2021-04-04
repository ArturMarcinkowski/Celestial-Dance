const divs = document.querySelector(".inner");
const celestialMap = document.querySelector(".celestialMap")
const celestialBodies = document.querySelectorAll(".celestialBody");


let mouseDown = 0;
let mouseOnClickPosX = 0;
let mouseOnClickPosY = 0;
let mapOnClickPosX = 0;
let mapOnClickPosY = 0;
let pause = true;
let timer = 0;


document.onmousedown = function (event) {
    mouseOnClickPosX = event.clientX;
    mouseOnClickPosY = event.clientY;
    mapOnClickPosX = celestialMap.offsetLeft;
    mapOnClickPosY = celestialMap.offsetTop;
    mouseDown++;
}
document.onmouseup = function () {
    mouseDown--;
}

document.onmousemove = function (event) {
    if (mouseDown) {
        celestialMap.style.left = (mapOnClickPosX + event.clientX - mouseOnClickPosX) + "px";
        celestialMap.style.top = (mapOnClickPosY + event.clientY - mouseOnClickPosY) + "px";
    }
}

document.addEventListener("keydown", function (event) {
    if (event.keyCode === 80) {
        pause = !pause;
    }
    if (event.keyCode === 80) {

    }
})




setInterval(async () => {
    if (!pause) {
        let bodiesData = await returnData("http://localhost:8080/getall/");
        bodiesData.forEach(el => {
            let body = document.getElementById(el.id);
            body.style.top = el.posY + "px";
            body.style.left = el.posX + "px";
        })
        if (timer === 50) {
            timer = 0;
            let orbitData = await returnData("http://localhost:8080/get-orbit-data?id=2");
            makeOrUpdateOrbit(orbitData);
        } else {
            timer++;
        }
    }

    let orbitData = await returnData("http://localhost:8080/get-orbit-data?id=2");
    makeOrUpdateOrbit(orbitData);
}, 1000);

function makeOrUpdateOrbit(data){
    let body = document.getElementById(data.id);
    let newSvg = document.createElement("svg");
    // newSvg.style.height =
}



document.addEventListener('DOMContentLoaded', async () => {

    const url = "http://localhost:8080/getall/";
    let data = await returnData(url);
    show(data);
})

function show(data) {
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
    })
}

async function returnData(url) {
    async function load(Url) {
        const request = await fetch(Url);
        const json = request.json();
        return json;
    }

    let data = await load(url);
    return data;
}