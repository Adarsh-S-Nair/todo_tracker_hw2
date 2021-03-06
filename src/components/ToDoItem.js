// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react'
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import Close from '@material-ui/icons/Close';
import { FormatLineSpacingSharp, InvertColorsOff } from '@material-ui/icons';

class ToDoItem extends Component {
    constructor(props) {
        super(props);
        this.descriptionInputRef = React.createRef();
        this.dueDateInputRef = React.createRef();
        this.statusInputRef = React.createRef();

        this.state = {
            description: props.toDoListItem.description,
            due_date: props.toDoListItem.due_date,
            status: props.toDoListItem.status,
            editingDescription: false,
            editingDueDate: false,
            editingStatus: false 
        }
        
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tToDoItem " + this.props.toDoListItem.id + " constructor");
    }

    componentDidMount = () => {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tToDoItem " + this.props.toDoListItem.id + " did mount");
    }

    componentDidUpdate = () => {
        if(this.state.editingDescription){
            this.descriptionInputRef.current.focus();
            this.descriptionInputRef.current.addEventListener("keydown", (e) => {
                if(e.keyCode === 13) {
                    e.target.blur();
                }
            })
        }
        else if(this.state.editingDueDate){
            this.dueDateInputRef.current.focus();
            this.dueDateInputRef.current.addEventListener("keydown", (e) => {
                if(e.keyCode === 13) {
                    e.target.blur();
                }
            })
        }
        else if(this.state.editingStatus){
            this.statusInputRef.current.focus();
            this.statusInputRef.current.addEventListener("keydown", (e) => {
                if(e.keyCode === 13) {
                    e.target.blur();
                }
            })
        }
    }

    render() {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tToDoItem render");
        let listItem = this.props.toDoListItem;
        let statusType = "status-complete";
        if (listItem.status === "incomplete")
            statusType = "status-incomplete";
        
        let top = false;
        let bottom = false;
        let moveUpStyle = "enabled-button";
        if(this.props.list[0].id == listItem.id){
            top = true;
            moveUpStyle = "disabled-button";
        }

        let moveDownStyle = "enabled-button";
        if(this.props.list[this.props.list.length-1].id == listItem.id){
            bottom = true;
            moveDownStyle = "disabled-button";
        }

        let taskElement = <div 
                            id={"task-"+listItem.id} 
                            className='item-col task-col' 
                            onClick={() => {
                                this.setState({editingDescription: true});
                            }}>{listItem.description}</div>;
        let inputTask = <input 
                            type="text"
                            ref={this.descriptionInputRef}
                            defaultValue={listItem.description} 
                            id={"input-task-"+listItem.id} 
                            className='item-col task-col'
                            onBlur={() => {
                                let task = this.descriptionInputRef.current.value;
                                if(task == ''){
                                    task = 'No Description';
                                }
                                this.props.changeTaskTransactionCallback(listItem, task);
                                this.setState({
                                    description: task,
                                    editingDescription: false
                                })
                                this.props.workspace.setState(this.props.workspace);
                            }}/>
        let dateElement = <div 
                            id={"date-"+listItem.id} 
                            className='item-col due-date-col'
                            onClick={() => {
                                this.setState({editingDueDate: true});
                            }}>{listItem.due_date}</div>;
        let inputDueDate = <input 
                            type="date"
                            ref={this.dueDateInputRef}
                            defaultValue={listItem.due_date}
                            id={"input-date-"+listItem.id} 
                            className='item-col task-col'
                            onBlur={() => {
                                let date = this.dueDateInputRef.current.value;
                                if(date == ''){
                                    date = 'No Date';
                                }
                                this.props.changeDueDateTransactionCallback(listItem, date);
                                this.setState({
                                    due_date: date,
                                    editingDueDate: false
                                })
                                this.props.workspace.setState(this.props.workspace);
                            }}/>;

        let statusElement = <div
                            id={"status-"+listItem.id}
                            className='item-col status-col'
                            className={statusType}
                            onClick={() => {
                                this.setState({editingStatus: true});
                            }}>{listItem.status}</div>;

        let inputStatus =   <select
                            ref={this.statusInputRef}
                            defaultValue={listItem.status}
                            id={"input-status-"+listItem.id}
                            className='item-col task-col'
                            onBlur={() => {
                                let status = this.statusInputRef.current.value;
                                this.props.changeStatusTransactionCallback(listItem, status);
                                this.setState({
                                    status: status,
                                    editingStatus: false
                                })
                                this.props.workspace.setState(this.props.workspace);
                            }}>
                                <option value="complete">complete</option>
                                <option value="incomplete">incomplete</option>
                            </select>

        return (
            <div id={'todo-list-item-' + listItem.id} className='list-item-card'>
                {this.state.editingDescription ? inputTask : taskElement}
                {this.state.editingDueDate ? inputDueDate : dateElement}
                {this.state.editingStatus ? inputStatus : statusElement}
                <div className='item-col list-controls-col'>
                    <KeyboardArrowUp className='list-item-control todo-button'
                                        className={moveUpStyle}
                                        onClick={() => {
                                            if(top) return;
                                            this.props.moveItemUpTransactionCallback(listItem);
                                            this.props.workspace.forceUpdate();
                                        }}/>
                    <KeyboardArrowDown className='list-item-control todo-button'
                                        className={moveDownStyle}
                                        onClick={() => {
                                            if(bottom) return;
                                            this.props.moveItemDownTransactionCallback(listItem);
                                            this.props.workspace.forceUpdate();
                                        }}/>
                    <Close className='todo-button enabled-button'
                            onClick={() => {
                                this.props.deleteItemTransactionCallback(listItem);
                                this.props.workspace.forceUpdate();
                            }}/>
                    <div className='list-item-control'></div>
        <div className='list-item-control'></div>
                </div>
            </div>
        )
    }
}

export default ToDoItem;