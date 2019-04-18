import {TextItem,Text,BoldText} from "../TextItems"
import {DocumentItem, Paragraph, Section} from "../DocumentItems"
export default class MediaWikiExporter {
    constructor() {
    }

    getName() { return "Mediawiki"; }

    export(documentItem) {
        let sb = [];
        for(let i=0; i < documentItem.items.length; i++) {
            let item = documentItem.items[i];
            if(item instanceof Section) {
                let level = item.level;
                let section = "=";
                sb.push("\n" + section.repeat(level) + item.title + section.repeat(level) + "\n");
                sb.push(this.export(item));
            } else if(item instanceof Paragraph) {
                sb.push("<br />");
                sb.push(this.export(item));
            } else if(item instanceof Text) {
                sb.push(item.text);
            } else if(item instanceof BoldText) {
                sb.push("'''");
                sb.push(item.text);
                sb.push("'''");
            }
        }

        return sb.join("");
    }
}