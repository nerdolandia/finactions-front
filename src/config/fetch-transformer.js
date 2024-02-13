import { locationHandler } from "./routing"

export class FetchTransformer {
        routeValue = ""
        method = ""
        body

        constructor(targetRoute = "", callMethod, requestBody = null) {
                this.routeValue = targetRoute
                this.method = callMethod
                this.body = requestBody
        }

        async fetch(url) {
                let responseBody = JSON.stringify(this.body) || this.body

                const tokenResult = () => {
                        const token = sessionStorage.getItem("token")

                        if (!token) return null

                        return { "Authorization": `Bearer ${token}` }
                }

                try {
                        const result = await fetch(
                                `${url}${this.routeValue}`,
                                {
                                        headers: tokenResult(),
                                        method: this.method,
                                        body: responseBody
                                }
                        )

                        if (result.ok) return result

                        if (result.status === 401) locationHandler()
                } catch (error) {
                        alert("Implement fetch error!")
                }
        }
}
