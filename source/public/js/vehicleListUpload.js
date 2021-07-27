/*
* VehicleListUpload Component
* - Renders and manages vehicle file upload UI and logic
*/
class VehicleListUpload {
    static get ROOT_ELEMENT_SELECTOR() { return "#vehicleListUpload" }
    static get UPLOAD_ELEMENT_ID() { return "upload" }

    static get ELEMENT_HTML() {
        return `
        <h3>Upload Vehicle File</h3>
        <form id="uploadForm">
        <input type="file" id="upload" />
        </form>
        `;
    }

    constructor($, window) {
        this.$ = $;
        this.window = window;
        this.init();
    }

    async init() {
        this.rootElement = this.$(VehicleListUpload.ROOT_ELEMENT_SELECTOR);
        this.rootElement.append(VehicleListUpload.ELEMENT_HTML);
        this.registerListeners();
    }

    registerListeners() {
        this.$(`#${VehicleListUpload.UPLOAD_ELEMENT_ID}`).change(this.handleFileUploadEvent.bind(this));
    }

    async handleFileUploadEvent(event) {
        const file = event.currentTarget.files[0];
        const reader = new FileReader();
        reader.readAsText(file, "UTF-8");
        const fileLoadPromise = await new Promise((resolve, reject) => {
            reader.onload = resolve;
            reader.onerror = reject;
        });
        const text = fileLoadPromise.target.result;
        const response = await fetch("/vehicles", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ data: text })
        });
        if (response.ok) {
            this.window.location.reload();
        } else {
            console.error(response);
            this.window.alert(response.statusText);
        }
    }
}

const vehicleListUpload = new VehicleListUpload($, window);
