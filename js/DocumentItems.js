export class DocumentItem {
    constructor() {
    }
}

export class Paragraph extends DocumentItem {
    constructor() {
        super();
        this.parent = null;
        this.items = [];
    }
}

export class Section extends DocumentItem {
    constructor(title) {
        super();
        this.title = title;
        this.level = -1;
        this.items = [];
        this.parent = null;
    }
}