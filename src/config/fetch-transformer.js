import { locationHandler } from "./routing"

export class FetchTransformer {
        method = ""
        body = null
        url = ""

        constructor(url,callMethod, requestBody = null) {
                this.method = callMethod
                this.body = requestBody
                this.url = url
        }

        async fetch() {
                let responseBody = JSON.stringify(this.body) || this.body

                const tokenResult = () => {
                        const token = sessionStorage.getItem("token")

                        if (!token) return null

                        return { "Authorization": `Bearer ${token}` }
                }

                try {
                        const result = await fetch(
                                this.url,
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
