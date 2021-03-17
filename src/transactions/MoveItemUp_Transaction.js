'use strict'

import { jsTPS_Transaction } from "../common/jsTPS.js"

export default class MoveItemUp_Transaction extends jsTPS_Transaction {
    constructor(app, item) {
        super();
        this.app = app;
        this.item = item;
    }

    doTransaction() {
        this.app.moveItemUp(this.item);
    }

    undoTransaction() {
        this.app.moveItemDown(this.item);
    }
}