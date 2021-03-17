'use strict'

import { jsTPS_Transaction } from "../common/jsTPS.js"

export default class AddItem_Transaction extends jsTPS_Transaction {
    constructor(app) {
        super();
        this.app = app;
    }

    doTransaction() {
        this.item = this.app.addItem();
    }

    undoTransaction() {
        this.app.deleteItem(this.item);
    }
}