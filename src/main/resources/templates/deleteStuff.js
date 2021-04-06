
function removeCelestialObject(id) {
    document.getElementById(id).remove();
    document.getElementById(String("window-" + id)).remove();
    document.getElementById(String("center-" + id)).remove();
    document.getElementById(String("my-box-list-" + id)).remove();
}