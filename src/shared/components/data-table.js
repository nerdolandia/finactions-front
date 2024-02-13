class DataTable extends HTMLElement {
        _content = [{}]
        table = undefined

        constructor() {
                super()
                const shadow = this.attachShadow({ mode: "open" })
                shadow.innerHTML = this._content
        }

        set content(value) {
                this._content = value
                this.table = this.buildTable(value)
        }

        get content() {
                return this._content
        }

        buildTable(data) {
                const tableBody = document.createElement("tbody")
                for (const item of data) {
                        const row = document.createElement("tr")
                        for (const field of Object.values(item)) {
                                const col = document.createElement("td")
                                col.textContent = field.toString()
                                row.appendChild(col)
                        }
                        tableBody.appendChild(row)
                }

                return tableBody.innerHTML
        }
}

customElements.define("data-table", DataTable)
