import { get } from "../../services/usuario-service"
import { usuario } from "../../entities/usuarios"
const table = document.getElementById("teste")
table.content = async () => await get(usuario)
