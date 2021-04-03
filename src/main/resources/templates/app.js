window.addEventListener('DOMContentLoaded', (event) => {
    const divs = document.querySelectorAll(".inner");
    console.log(divs);

    divs.forEach(el => {
        el.addEventListener("mouseover", function () {
            let randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
            el.style.backgroundColor = randomColor;
            el.innerHTML = "fsd";
        })
        el.addEventListener("mouseout", function () {
            el.innerHTML = "";
        })
    })
});


const divs = document.querySelectorAll(".inner");
const celestialMap = document.querySelector(".celestialMap")
const celestialBodies = document.querySelectorAll(".celestialBody");
console.log(divs);


setInterval(async () => {
    let bodiesData = await returnData("http://localhost:8080/getall/");
    bodiesData.forEach(el => {
        let body = document.getElementById(el.id);
        body.style.top = el.posY + "px";
        body.style.left = el.posX + "px";
    })
}, 100);


const ul = document.querySelector("ul");

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