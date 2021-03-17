'use strict'

import { jsTPS_Transaction } from "../common/jsTPS.js"

export default class ChangeTask_Transaction extends jsTPS_Transaction {
    constructor(app, item, task) {
        super();
        this.app = app;
        this.item = item;
        this.task = task;
    }

    doTransaction() {
        this.oldTask = this.app.editTask(this.item, this.task);
    }

    undoTransaction(){
        this.app.editTask(this.item, this.oldTask);
    }
}