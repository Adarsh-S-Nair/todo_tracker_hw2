'use strict'

import { jsTPS_Transaction } from "../common/jsTPS.js"

export default class MoveItemDown_Transaction extends jsTPS_Transaction {
    constructor(app, item) {
        super();
        this.app = app;
        this.item = item;
    }

    doTransaction() {
        this.app.moveItemDown(this.item);
    }

    undoTransaction() {
        this.app.moveItemUp(this.item);
    }
}