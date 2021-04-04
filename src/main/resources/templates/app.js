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
    if (event.keyCode === 65) {

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
}, 2000);

function makeOrUpdateOrbit(data){
    let body = document.getElementById(data.id);
    let newSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    newSvg.setAttribute("width", data.semiMajorAxis);
    newSvg.setAttribute("height", data.semiMinorAxis);
    newSvg.style.left = data.centerPosX + "px";
    newSvg.style.top = data.centerPosY + "px";

    let newEllipse = document.createElementNS("http://www.w3.org/2000/svg","ellipse");
    newEllipse.style.cx= data.centerPosX + "px";
    newEllipse.style.cy = data.centerPosY + "px";
    newEllipse.style.rx = data.semiMajorAxis + "px";
    newEllipse.style.ry = data.semiMinorAxis + "px";
    // newEllipse.style.cx=  "10px";
    // newEllipse.style.cy =  "10px";
    // newEllipse.style.rx =  "100px";
    // newEllipse.style.ry = "100px";

    newEllipse.className="orbit";
    newEllipse.style.transform = "rotate(" + data.angle + "deg)";
    newSvg.appendChild(newEllipse);
    celestialMap.appendChild(newSvg);

}



//
// function makeOrbit(){
//     let newSvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
//     newSvg.setAttribute("width", "100");
//     newSvg.setAttribute("height", "100");
//
//     let newEllipse = document.createElementNS("http://www.w3.org/2000/svg","ellipse");
//     newEllipse.style.cx=  "10px";
//     newEllipse.style.cy =  "10px";
//     newEllipse.style.rx =  "100px";
//     newEllipse.style.ry = "100px";
//     newEllipse.className="orbit";
//     newEllipse.style.transform = "rotate(" + 10+ "deg)";
//     newSvg.appendChild(newEllipse);
//
//
//     celestialMap.appendChild(newSvg);
//
// }




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