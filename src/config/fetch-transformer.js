class FetchTransformer {
        token = ""
        routeValue = ""
        method = ""
        body

        constructor(sessionToken, targetRoute = "", callMethod, requestBody = null) {
                this.token = sessionToken
                this.routeValue = targetRoute
                this.method = callMethod
                this.body = requestBody
        }

        async fetch(url) {
                try {
                        if (!sessionStorage.getItem("token"))
                                alert("Implementar redirecionamento.")

                        let responseBody = JSON.stringify(this.body) || this.body

                        return await fetch(
                                `${url}${this.routeValue}`,
                                {
                                        headers: { "Authorization": `Bearer ${this.token}` },
                                        method: this.method,
                                        body: responseBody
                                }
                        )
                } catch (error) {
                        alert("Implement fetch error!")
                }
        }
}
