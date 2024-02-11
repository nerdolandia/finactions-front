const routes = {
        "/": "/home/pages/home/index.html",
        "/login": "/login/pages/index.html",
        404: "/routing/notfound.html"
}

function changeRoutes(event) {
        event.preventDefault()
        const path = event.target.href
        window.history.pushState({}, "", path)
        locationHandler()
}

async function locationHandler() {
        const locationPath = window.location.pathname
        const filePath = routes[locationPath] || routes[404]
        try {
                const html = await fetch(filePath)
                const htmlText = await html.text()
                console.log(htmlText)
                document.getElementById("content").innerHTML = htmlText
        } catch (error) {
                alert(`Erro no carregamento de páginas: ${error}`)
        }
}

window.onpopstate = locationHandler
window.route = changeRoutes

locationHandler()
