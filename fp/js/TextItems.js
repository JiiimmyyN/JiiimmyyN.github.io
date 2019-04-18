export class TextItem {
    constructor(text) {
        this.text = text;
    }
}

export class BoldText extends TextItem {
    constructor(text) {
        super(text);
    }
}

export class Text extends TextItem {
    constructor(text) {
        super(text);
    }
}