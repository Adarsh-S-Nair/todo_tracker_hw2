'use strict'

import { jsTPS_Transaction } from "../common/jsTPS.js"

export default class DeleteItem_Transaction extends jsTPS_Transaction {
    constructor(app, item) {
        super();
        this.app = app;
        this.item = item;
    }

    doTransaction() {
        this.index = this.app.deleteItem(this.item);
    }

    undoTransaction() {
        this.app.addItem(this.item, this.index);
    }
}