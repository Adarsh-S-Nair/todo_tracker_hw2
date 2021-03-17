'use strict'

import { jsTPS_Transaction } from "../common/jsTPS.js"

export default class ChangeStatus_Transaction extends jsTPS_Transaction {
    constructor(app, item, status) {
        super();
        this.app = app;
        this.item = item;
        this.status = status;
    }

    doTransaction() {
        this.oldStatus = this.app.editStatus(this.item, this.status);
    }

    undoTransaction() {
        this.app.editStatus(this.item, this.oldStatus);
    }
}