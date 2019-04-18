import DomExporter from "./js/exporters/DomExporter" 
import HtmlExporter from "./js/exporters/HtmlExporter"
import MediawikiExporter from "./js/exporters/MediawikiExporter"
import {TextItem,Text,BoldText} from "./js/TextItems"
import {DocumentItem, Paragraph, Section} from "./js/DocumentItems"
import {MarkdownDocument} from "./js/MarkdownDocument"
import MediaWikiExporter from "./js/exporters/MediawikiExporter";

let exportSelect = document.getElementById("exportSelect");
let exportBtn = document.getElementById("export");
let editorTextField = document.getElementById("editor");
let preview = document.getElementById("preview");
let doc = new MarkdownDocument();
let exporters = [
    new HtmlExporter(),
    new MediaWikiExporter()
]

//Add options to the select
for(let index = 0; index < exporters.length; index++) {
    let option = document.createElement("option");
    option.text = exporters[index].getName();
    option.value = 0;
    exportSelect.add(option);
}

//Export & download the markdown in the correct format
exportBtn.onclick = function () {
    download("md-as-"+ exporters[exportSelect.selectedIndex].getName() +".html", exporters[0].export(doc));
};

function download(filename, content) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();
    document.body.removeChild(element);
}


function getSectionLevel(sectionString) {
    return sectionString.length;
}

//Creates a new paragraph even if there already is an active paragraph
function newParagraph(documentItem) {
    let newParagraph = new Paragraph();
    if(documentItem instanceof Paragraph) {
        newParagraph.parent = documentItem.parent;
    } else {
        newParagraph.parent = documentItem;
    }
    documentItem.items.push(newParagraph);
    return newParagraph;
}

//Creates a new paragraph if documentItem isn't already a Paragraph, if Paragraph return the parameter
function ensureParagraph(documentItem) {
    if(documentItem instanceof Paragraph) {
        return documentItem;
    }
    let newParagraph = new Paragraph();
    newParagraph.parent = documentItem;
    documentItem.items.push(newParagraph);
    return newParagraph;
}

//Build up the MarkdownDocument & export as with DOM exporter
editorTextField.oninput = function () {
    doc = new MarkdownDocument();
    let currentDocumentItem = doc;
    
    let lines = editorTextField.value.split("\n");
    for(let i=0; i < lines.length; i++) {

        let sectionRegex = /^([#]+)\s(.+)/gi;
        let matchSection = sectionRegex.exec(lines[i]);

        let boldRegex = /([\*]{2})(.*?)([\*]{2})/gi;
        let matchBold = boldRegex.exec(lines[i]);

        if(matchSection !== null) {
            let section = new Section(matchSection[2]);
            while(!(currentDocumentItem instanceof MarkdownDocument) && !(currentDocumentItem instanceof Section)) {
                currentDocumentItem = currentDocumentItem.parent;
            }
            section.parent = currentDocumentItem;
            section.level = getSectionLevel(matchSection[1]);

            if(section.level > currentDocumentItem.level ) {
                currentDocumentItem.items.push(section);
            } else if(section.level === currentDocumentItem.level) {
                currentDocumentItem.parent.push(section);
            } else if(section.level < currentDocumentItem.level) {
                while(section.level <= currentDocumentItem.level) {
                    currentDocumentItem = currentDocumentItem.parent;
                }
                currentDocumentItem.items.push(section);
            }
            currentDocumentItem = section;

        } else if(matchBold !== null) {

            currentDocumentItem = ensureParagraph(currentDocumentItem);
            if(matchBold.index !== 0) {
                currentDocumentItem.items.push(new Text(lines[i].slice(0, matchBold.index)));
            }
            currentDocumentItem.items.push(new BoldText(matchBold[2]));
            let previousLastIndex = boldRegex.lastIndex;

            while((matchBold = boldRegex.exec(lines[i])) !== null) {
                if(previousLastIndex !== matchBold.index) {
                    currentDocumentItem.items.push(new Text(lines[i].slice(previousLastIndex, matchBold.index)));
                }
                previousLastIndex = boldRegex.lastIndex;
                currentDocumentItem.items.push(new BoldText(matchBold[2]));
            }
            if(previousLastIndex !== lines[i].length) {
                currentDocumentItem.items.push(new Text(lines[i].slice(previousLastIndex)));
            }
        } else {
            let emptyLine = /^\n/gi
            if(emptyLine.exec(lines[i]) !== null || lines[i] === "") {
                currentDocumentItem = newParagraph(currentDocumentItem);
            } 
            currentDocumentItem = ensureParagraph(currentDocumentItem);
            currentDocumentItem.items.push(new Text(lines[i]));
        }
    }

    doc.export();
}