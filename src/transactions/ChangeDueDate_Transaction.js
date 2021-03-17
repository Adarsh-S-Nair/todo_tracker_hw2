'use strict'

import { jsTPS_Transaction } from "../common/jsTPS.js"

export default class ChangeDueDate_Transaction extends jsTPS_Transaction {
    constructor(app, item, date) {
        super();
        this.app = app;
        this.item = item;
        this.date = date;
    }

    doTransaction() {
        this.oldDate = this.app.editDate(this.item, this.date);
    }

    undoTransaction() {
        this.app.editDate(this.item, this.oldDate);
    }
}