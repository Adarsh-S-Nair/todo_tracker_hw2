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
        this.state = {
            showDeleteListModal: false,
            undoable: true,
            redoable: true
        }
    }

    componentDidUpdate = () => {
        if(this.props.currentList != null) {
            document.addEventListener ("keydown", (e) => {
                if (e.ctrlKey  && e.key === "z" && this.state.undoable) {
                    this.props.undoCallback();
                    this.setState({undoable: false});
                }
                if(e.ctrlKey && e.key === "y" && this.state.redoable) {
                    this.props.redoCallback();
                    this.setState({redoable: false});
                }
            } );
            document.addEventListener ("keyup", (e) => {
                if(e.ctrlKey && e.key == "z" && !this.state.undoable) {
                    this.setState({undoable: true});
                }
                if(e.ctrlKey && e.key == "y" && !this.state.redoable) {
                    this.setState({redoable: true});
                }
            })
        }
    }

    render() {
        console.log("Current List: " + this.props.currentList);
        let itemControlsClass = "item-col item-controls-disabled";
        let itemsDiv = <div id="todo-list-items-div"></div>;
        if(this.props.currentList != null) {
            itemControlsClass = "item-col item-controls-enabled"
            itemsDiv = <div id="todo-list-items-div">
                        {
                        this.props.currentList.items.map((toDoListItem) => (
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
                            list={this.props.currentList.items}
                        />))
                        }
                        </div>
        }
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
                    <div className="item-col">Task</div>
                    <div className="item-col">Due Date</div>
                    <div className="item-col">Status</div>
                    <div className={itemControlsClass} display="flex" flexDirection="row" flexWrap="nowrap">
                        <Undo   id="undo-button" 
                                className="list-item-control material-icons todo-button"
                                onClick={this.props.undoCallback}
                                className={undoStyle}/>
                        <Redo   id="redo-button"
                                className="list-item-control material-icons todo-button"
                                onClick={this.props.redoCallback}
                                className={redoStyle}/>
                        <AddBox id="add-item-button" 
                                className="list-item-control material-icons enabled-button"
                                onClick={this.props.addItemTransactionCallback}/>
                        <Delete id="delete-list-button"
                                className="list-item-control material-icons enabled-button"
                                onClick={this.props.deleteListCallback}/>
                        <Close id="close-list-button"
                                className="list-item-control material-icons enabled-button"
                                onClick={this.props.closeListCallback}/>
                    </div>
                </div>
                {itemsDiv}
                <br />
            </div>
        );
    }
}

export default Workspace;