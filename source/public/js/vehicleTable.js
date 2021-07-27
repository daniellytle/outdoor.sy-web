/*
* VehicleTable Component
* - Renders and manages the Vehicle Table UI
*/
class VehicleTable {
    static get ROOT_ELEMENT_SELECTOR() { return "#vehicleTable" }
    static get TABLE_BODY_ELEMENT_ID() { return "vehicleTableTableBody" }
    static get FILTER_INPUT_ELEMENT_ID() { return "vehicleTableFilterInput" }
    static get SORT_KEY_ATTRIBUTE() { return "sortkey" }
    static get SORT_ORDER_ATTRIBUTE() { return "sortorder" }

    static get TABLE_SCHEMA() {
        return [
            {
                DISPLAY_NAME: "First Name",
                KEY : "firstName"
            },
            {
                DISPLAY_NAME : "Last Name",
                KEY : "lastName"
            },
            {
                DISPLAY_NAME : "Email",
                KEY : "email"
            },
            {
                DISPLAY_NAME : "Type",
                KEY : "type"
            },
            {
                DISPLAY_NAME : "Name",
                KEY : "name"
            },
            {
                DISPLAY_NAME : "Length",
                KEY : "length"
            }
        ];
    }

    static get TABLE_HEADER_HTML() {
        let tableHeadersHTML = "";
        for (const header of VehicleTable.TABLE_SCHEMA) {
            tableHeadersHTML += `
            <th>
            <a ${VehicleTable.SORT_KEY_ATTRIBUTE}="${header.KEY}" ${VehicleTable.SORT_ORDER_ATTRIBUTE}="desc" href="">${header.DISPLAY_NAME}</a>
            </th>
            `
        }
        return tableHeadersHTML;
    }

    static get ELEMENT_HTML() {
        return `
        <h5>Fuzzy search</h5>
        <input id="${VehicleTable.FILTER_INPUT_ELEMENT_ID}" type="text" prompt="Fuzzy search" />
        <br>
        <h3>Vehicles</h3>
        <table class="table">
        <thead>
        <tr>
        ${VehicleTable.TABLE_HEADER_HTML}
        </tr>
        </thead>
        <tbody id="${VehicleTable.TABLE_BODY_ELEMENT_ID}">
        </tbody>
        </table>
        `;
    }

    static get EMPTY_TABLE_ROW() {
        return `
        <tr><td colspan="6">No vehicles</td></tr>
        `;
    }

    constructor($) {
        this.$ = $;
        this.filteredVehicles = this.vehicles = [];
        this.init();
    }

    async init() {
        this.rootElement = this.$(VehicleTable.ROOT_ELEMENT_SELECTOR);
        this.rootElement.append(VehicleTable.ELEMENT_HTML);
        this.tableBodyElement = this.$(`#${VehicleTable.TABLE_BODY_ELEMENT_ID}`);
        this.registerListeners();
        this.filteredVehicles = this.vehicles = await VehicleTable.getVehicleData();
        this.render(this.filteredVehicles, {sort: {key: "length", direction: "desc"}});
    }

    registerListeners() {
        this.rootElement.find("a").click(this.handleHeaderClick.bind(this));
        this.rootElement.find(`#${VehicleTable.FILTER_INPUT_ELEMENT_ID}`).on("input", this.handleFilterInputChange.bind(this));
    }

    handleHeaderClick(event) {
        const key = event.currentTarget.attributes[VehicleTable.SORT_KEY_ATTRIBUTE].value;
        const order = event.currentTarget.attributes[VehicleTable.SORT_ORDER_ATTRIBUTE].value;
        event.currentTarget.attributes[VehicleTable.SORT_ORDER_ATTRIBUTE].value = (order === "desc" ? "asc" : "desc");
        this.render(this.filteredVehicles, {sort: {key, order}});
        event.preventDefault();
    }

    handleFilterInputChange(event) {
        const query = event.currentTarget.value;
        this.filteredVehicles = VehicleTable.filterVehicles(this.vehicles, query);
        this.render(this.filteredVehicles, this.options);
    }

    static filterVehicles(vehicles, query) {
        return vehicles.filter((vehicle) => {
            let vehicleTextblob;
            for (const key in vehicle) {
                vehicleTextblob += String(vehicle[key]);
            }
            return vehicleTextblob.includes(query);
        })
    }

    render(vehicles, options) {
        if (options) {
            const { sort } = options;
            if (sort && sort.key && sort.order) {
                vehicles = VehicleTable.sort(vehicles, options.sort.key, options.sort.order);
                this.options = options; // Save options state
            }
        }
        this.tableBodyElement.empty();
        if (vehicles.length) {
            const renderedTableBody = VehicleTable.getTableBodyRows(vehicles);
            this.tableBodyElement.append(renderedTableBody);
        } else {
            this.tableBodyElement.append(VehicleTable.EMPTY_TABLE_ROW);
        }
    }

    static getTableBodyRows(vehicles) {
        let tableBodyRowsHTML = "";
        for (const vehicle of vehicles) {
            let tableBodyRowHTML = "";
            for (const key in vehicle) {
                tableBodyRowHTML += `
                <td>${vehicle[key]}</td>
                `;
            }
            tableBodyRowsHTML += `<tr>${tableBodyRowHTML}</tr>`;
        }
        return tableBodyRowsHTML;
    }

    static async getVehicleData() {
        const apiResponse = await fetch("/vehicles");
        return await apiResponse.json();
    }

    static sort(array, key, order) {
        const orderSwitch = order === "desc" ? 1 : -1;
        const pos = 1 * orderSwitch;
        const neg = -1 * orderSwitch;
        array.sort((a, b) => {
            let aVal = a[key];
            let bVal = b[key];
            if (typeof aVal === "string" && typeof bVal === "string") {
                aVal = aVal.toLowerCase(); bVal = bVal.toLowerCase();
            }
            return (aVal > bVal ? pos : neg);
        });
        return array;
    }
}

const vehicleTable = new VehicleTable($);
