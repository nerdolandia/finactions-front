export class FetchBuilder {
        token = ""
        routeValue = ""
        method = ""
        body

        constructor(sessionToken, targetRoute = "", callMethod, requestBody = {}) {
                this.token = sessionToken
                this.routeValue = targetRoute
                this.method = callMethod
                this.body = requestBody
        }

        async fetch(url) {
                try {
                        return await fetch(
                                `${url}${this.routeValue}`,
                                {
                                        headers: { "Authorization": `Bearer ${this.token}` },
                                        method: this.method,
                                        body: JSON.stringify(this.body)
                                }
                        )
                } catch (error) {
                        alert("Oops no fetch!")
                }
        }
}
