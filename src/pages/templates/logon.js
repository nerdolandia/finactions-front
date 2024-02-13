import { locationHandler } from "../../config/routing";

debugger

window.history.replaceState({}, "", "/home")
document.getElementById("sidebar")
        .querySelectorAll("a")
        .forEach(x => x.addEventListener("click", changeRoutes))

function changeRoutes(event) {
        event.preventDefault()
        const path = token ? event.target.href : 498
        window.history.pushState({}, "", path)
        locationHandler()
}

window.route = changeRoutes
window.onpopstate = locationHandler
