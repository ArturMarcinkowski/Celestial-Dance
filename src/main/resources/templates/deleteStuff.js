
function removeCelestialObject(id) {
    document.getElementById(id).remove();
    document.getElementById(String("window-" + id)).remove();
    document.getElementById(String("center-" + id)).remove();
}

function moveLiFromMyListToApi(id){
    let li = document.getElementById(String("my-box-list-" + id));
    generateApiListElement(li.innerText)
    li.remove();
}