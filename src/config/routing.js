const routes = {
        "/home": "/pages/home",
        "/login": "/login/pages/index",
        "/usuarios/": "/pages/usuarios/index",
        404: "/pages/notfound",
        498: "/pages/sessionexpired"
}

const token = sessionStorage.getItem("token")

export async function locationHandler() {
        // if (!token) {
        //         window.location.assign("/pages/sessionexpired")
        //         return
        // }

        const locationPath = window.location.pathname
        console.log(locationPath)
        if (locationPath === "/") {
                debugger
                window.location.pathname = "/pages/templates/template-logon"
        }

        console.log(locationPath)
        if (!routes[locationPath]) {
                window.location.assign(routes[404])
                return
        }

        const filePath = token && routes[locationPath]
        try {
                const html = await fetch(filePath)
                const htmlText = await html.text()
                document.getElementById("content").innerHTML = htmlText
        } catch (error) {
                alert(`Erro no carregamento de páginas: ${error}`)
        }
}

window.onpopstate = locationHandler

locationHandler()
