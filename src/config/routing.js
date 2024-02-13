const routes = {
        "template": "pages/templates/template-logon",
        "/home": "/pages/home",
        "/login": "/login/pages/index",
        "/usuarios": "/pages/usuarios/index",
        404: "/pages/notfound",
        498: "/pages/sessionexpired"
}

const token = sessionStorage.getItem("token") || "implementar lmao"

async function locationHandler() {
        // if (!token) {
        //         window.location.assign("/pages/sessionexpired")
        //         return
        // }

        const locationPath = window.location.pathname
        const templateContent = document.getElementById("content")
        if (!templateContent) {
                await replaceDocument(routes["template"], "validate-replace")
                window.history.pushState({}, "", "/home")
                locationPath = window.location.pathname
        }

        if (!routes[locationPath]) {
                window.location.replace(routes[404])
        }

        const filePath = routes[locationPath]
        await replaceDocument(filePath, "content")
}

async function replaceDocument(filePath, elementId) {
        try {
                const html = await fetch(filePath)
                const htmlText = await html.text()
                document.getElementById(elementId).innerHTML = htmlText
        } catch (error) {
                alert(`Erro no carregamento de páginas: ${error}`)
        }
}

window.onpopstate = locationHandler

locationHandler()
