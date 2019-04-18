import DomExporter from "./exporters/DomExporter"
export class MarkdownDocument {
    constructor() {
        this.items = [];
        this.level = 0;
        this.exporter = new DomExporter();
    }

    setExporter(exporter) {
        this.exporter = exporter;
    }

    export() {
        return this.exporter.export(this);
    }
}