import {TextItem,Text,BoldText} from "../TextItems"
import {DocumentItem, Paragraph, Section} from "../DocumentItems"
export default class DomExporter {
    constructor() {
    }

    getName() { return "DOM"; }

    export(documentItem) {
        let c = preview.childNodes;
        for(let i = c.length-1; i >= 0; i--) {
            preview.removeChild(c[i]);
        }
        this.innerExport(preview, documentItem);
    }

    innerExport(parent, documentItem) {
        for(let i=0; i < documentItem.items.length; i++) {
            let item = documentItem.items[i];
            if(item instanceof Section) {
                let level = item.level;
                let header = document.createElement("h"+level);
                let title = document.createTextNode(item.title);
                header.appendChild(title);
                parent.appendChild(header);

                let section = document.createElement("section");
                parent.appendChild(section);

                this.innerExport(section, item);
            } else if(item instanceof Paragraph) {
                let p = document.createElement("p");
                parent.appendChild(p);
                this.innerExport(p, item);
            } else if(item instanceof Text) {
                let text = document.createTextNode(item.text);
                parent.appendChild(text);
            } else if(item instanceof BoldText) {
                let strong = document.createElement("strong");
                let text = document.createTextNode(item.text);
                strong.appendChild(text);
                parent.appendChild(strong);
            }
        }
    }
}