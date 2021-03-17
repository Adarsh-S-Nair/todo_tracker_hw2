// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'
import ToDoItem from './ToDoItem'
import Undo from '@material-ui/icons/Undo';
import Redo from '@material-ui/icons/Redo';
import AddBox from '@material-ui/icons/AddBox';
import Delete from '@material-ui/icons/Delete';
import Close from '@material-ui/icons/Close';

class Workspace extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let undoStyle = 'disabled-button';
        let redoStyle = 'disabled-button';
        if(this.props.tps.hasTransactionToUndo()){
            undoStyle = "enabled-button";
        }
        if(this.props.tps.hasTransactionToRedo()){
            redoStyle = "enabled-button";
        }
        return (
            <div id="workspace">
                <div id="todo-list-header-card" className="list-item-card">
                    <div id="task-col-header" className="item-col">Task</div>
                    <div id="date-col-header" className="item-col">Due Date</div>
                    <div id="status-col-header" className="item-col">Status</div>
                    <div className="item-col" display="flex" flexDirection="row" flexWrap="nowrap">
                        <Undo   id="undo-button" 
                                className="list-item-control material-icons todo-button"
                                onClick={this.props.undoCallback}
                                className={undoStyle}/>
                        <Redo   id="redo-button"
                                className="list-item-control material-icons todo-button"
                                onClick={this.props.redoCallback}
                                className={redoStyle}/>
                        <AddBox id="add-item-button" 
                                className="list-item-control material-icons todo-button"
                                onClick={this.props.addItemTransactionCallback}/>
                        <Delete id="delete-list-button" className="list-item-control material-icons todo-button" />
                        <Close id="close-list-button" className="list-item-control material-icons todo-button" />
                    </div>
                </div>
                <div id="todo-list-items-div">
                    {
                        this.props.toDoListItems.map((toDoListItem) => (
                        <ToDoItem
                            key={toDoListItem.id}
                            toDoListItem={toDoListItem}     // PASS THE ITEM TO THE CHILDREN
                            changeTaskTransactionCallback={this.props.changeTaskTransactionCallback}
                            changeDueDateTransactionCallback={this.props.changeDueDateTransactionCallback}
                            changeStatusTransactionCallback={this.props.changeStatusTransactionCallback}
                            moveItemUpTransactionCallback={this.props.moveItemUpTransactionCallback}
                            moveItemDownTransactionCallback={this.props.moveItemDownTransactionCallback}
                            deleteItemTransactionCallback={this.props.deleteItemTransactionCallback}
                            workspace={this}
                            list={this.props.toDoListItems}
                        />))
                    }
                </div>
                <br />
            </div>
        );
    }
}

export default Workspace;