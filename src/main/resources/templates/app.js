const divs = document.querySelector(".inner");
const celestialMap = document.querySelector(".celestialMap")
const celestialBodies = document.querySelectorAll(".celestialBody");
const ul = document.querySelector("ul");


let mouseDown = 0;
let mouseOnClickPosX = 0;
let mouseOnClickPosY = 0;
let mapOnClickPosX = 0;
let mapOnClickPosY = 0;

document.onmousedown = function(event) {
    mouseOnClickPosX = event.clientX;
    mouseOnClickPosY = event.clientY;
    mapOnClickPosX = celestialMap.offsetLeft;
    mapOnClickPosY = celestialMap.offsetTop;
    mouseDown++;
}
document.onmouseup = function() {
    mouseDown--;
}


document.onmousemove = function(event) {
    if(mouseDown){
        celestialMap.style.left = (mapOnClickPosX + event.clientX - mouseOnClickPosX )+ "px";
        celestialMap.style.top = (mapOnClickPosY + event.clientY - mouseOnClickPosY )+ "px";
    }
}


// window.addEventListener('DOMContentLoaded', (event) => {
//     document.addEventListener("mousedown", function () {
//         document.addEventListener("mouseup", function () {
//             let randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
//             divs.style.backgroundColor = randomColor;
//         })
//     });
// });




setInterval(async () => {
    let bodiesData = await returnData("http://localhost:8080/getall/");
    bodiesData.forEach(el => {
        let body = document.getElementById(el.id);
        body.style.top = el.posY + "px";
        body.style.left = el.posX + "px";
    })
}, 100);


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

        let li = document.createElement("li");
        li.textContent = el.name;
        ul.appendChild(li);
    })
}

document.addEventListener('DOMContentLoaded', async () => {

    const url = "http://localhost:8080/getall/";
    let data = await returnData(url);
    show(data);
})

async function returnData(url) {
    async function load(Url) {
        const request = await fetch(Url);
        const json = request.json();
        return json;
    }

    let data = await load(url);
    return data;
}