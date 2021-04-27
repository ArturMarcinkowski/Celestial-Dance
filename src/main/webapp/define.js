const celestialMap = document.querySelector(".celestial-map")
const pauseButton = document.querySelector('#pause-button');
const myInterface = document.querySelector('.interface');
const apiBodyBox = document.querySelector("#bodies-from-api-box");
const myBodyBox = document.querySelector("#bodies-in-my-database-box");
const primaryBodyBox = document.querySelector("#primary-bodies-box");
const wholeScreenDiv = document.querySelector(".whole-window-screen");
const myIP = "3.66.21.51";
// const myIP = "localhost";
let apiBodyList = new Array();
let celestialBodies;
let bodyCenters;


let mouseDown = 0;
let mouseOnClickPosX = 0;
let mouseOnClickPosY = 0;
let elementOnClickPosX = 0;
let elementOnClickPosY = 0;
let clickedElement;
let focusOn = 0;

let scale = -80;
let pause = true
let bodyPrimaryBodyId = 0;