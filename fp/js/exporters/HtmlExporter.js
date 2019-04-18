import {TextItem,Text,BoldText} from "../TextItems"
import {DocumentItem, Paragraph, Section} from "../DocumentItems"
export default class HtmlExporter {
    constructor() {
    }

    getName() { return "HTML"; }

    export(documentItem) {
        let sb = [];
        for(let i=0; i < documentItem.items.length; i++) {
            let item = documentItem.items[i];
            if(item instanceof Section) {
                let level = item.level;
                sb.push("<h"+level+">"+item.title+"</h"+level+">");
                sb.push("<section>");
                sb.push(this.export(item));
                sb.push("</section>");
            } else if(item instanceof Paragraph) {
                sb.push("<p>");
                sb.push(this.export(item));
                sb.push("</p>");
            } else if(item instanceof Text) {
                sb.push(item.text);
            } else if(item instanceof BoldText) {
                sb.push("<strong>");
                sb.push(item.text);
                sb.push("</strong>");
            }
        }
        return sb.join("");
    }
}