const apiUrl = import.meta.env.VITE_API_URL
import { usuario } from "../entities/usuarios.js";
import { FetchTransformer } from "../config/fetch-transformer.js";

export async function get(params = usuario.get, routeValue = "") {
        const url = new URL(apiUrl + "/usuario" + "/" + routeValue)
        if (params.size > 0) {
                for (const [k, v] of Object.entries(usuario)) {
                        url.searchParams.set(k, v)
                }
        }
        const apiFetch = new FetchTransformer(url, "GET")
        try {
                const response = await apiFetch.fetch()
                const result = await response.json()
                return result
        } catch (error) {
                alert("Erro:" + error)
        }
}
