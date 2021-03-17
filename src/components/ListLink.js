// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { ThreeSixtySharp } from '@material-ui/icons';
import React, { Component } from 'react'

class ListLink extends Component {
    constructor(props) {
        super(props);

        this.listNameInputRef = React.createRef();

        this.state = {
            listName: props.toDoList.name,
            editingName: false
        }
        
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink " + this.props.toDoList.key + " constructor");
    }

    componentDidMount = () => {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink " + this.props.toDoList.key + " did mount");
    }

    componentDidUpdate = () => {
        if(this.state.editingName) {
            this.listNameInputRef.current.focus();
            this.listNameInputRef.current.addEventListener("keydown", (e) => {
                if(e.keyCode === 13){
                    e.target.blur();
                }
            })
        }
    }

    render() {
        let isCurrentList = false;
        if(this.props.currentList.id == this.props.toDoList.id){
            isCurrentList = true;
        }
        // DISPLAY WHERE WE ARE
        let listElement =    <div
                                id={"list-"+this.props.toDoList.id}
                                className={isCurrentList ? "current-list" : "todo-list-button"}
                                onClick={() => {
                                    if(isCurrentList) { return; }
                                    this.props.loadToDoListCallback(this.props.toDoList);
                                }}
                                onDoubleClick={() => {
                                    if(!isCurrentList) { return; }
                                    this.setState({editingName: true})
                                }}>{this.props.toDoList.name}</div>        
                                
        let inputName = <input
                        type="text"
                        ref={this.listNameInputRef}
                        id={"input-list-"+this.props.toDoList.id}
                        className={"current-list"}
                        defaultValue={this.props.toDoList.name}
                        onBlur={() => {
                            let name = this.listNameInputRef.current.value;
                            if(name == '') name = 'Untitled';
                            this.props.changeNameCallback(name);
                            this.setState({
                                listName: name,
                                editingName: false
                            })
                        }}/>
        return (<div>
                    {this.state.editingName ? inputName : listElement}
                </div>
        )
    }
}

export default ListLink;