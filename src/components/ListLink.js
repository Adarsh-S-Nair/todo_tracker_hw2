// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import { ThreeSixtySharp } from '@material-ui/icons';
import React, { Component } from 'react'

class ListLink extends Component {
    constructor(props) {
        super(props);
        
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink " + this.props.toDoList.key + " constructor");
    }

    componentDidMount = () => {
        // DISPLAY WHERE WE ARE
        console.log("\t\t\tListLink " + this.props.toDoList.key + " did mount");
    }

    editListName = () => {
        let lists = document.getElementById("todo-lists-list");
        let listElement = document.getElementById("list-"+this.props.toDoList.id);
        let input = document.createElement("input");
        input.id = "input-list-"+this.props.toDoList.id;
        input.value = this.props.toDoList.name;

        input.onblur = () => {
            if(input.value != this.props.toDoList.name){
                if(input.value === ''){
                    input.value = 'Untitled';
                }
                this.props.toDoList.name = input.value;
                listElement.innerText = this.props.toDoList.name;
            }
            lists.replaceChild(listElement, input);
        }
        
        lists.replaceChild(input, listElement)
        input.focus();
    }

    handleLoadList = () => {
        this.props.loadToDoListCallback(this.props.toDoList);
    }

    render() {
        // DISPLAY WHERE WE ARE

        let currentList = this.props.currentList;
        let thisList = this.props.toDoList;

        if(typeof currentList !== "undefined" && currentList.id == thisList.id){
            console.log('hi');
            return (
                <div
                    id={'list-'+thisList.id}
                    style={{backgroundColor: '#40454e', color: "#ffc819"}}
                    className='todo-list-button'
                    onDoubleClick={this.editListName}
                >
                    {this.props.toDoList.name}<br />
                </div>
            )
        }
        else{
            return (
                <div
                    id={'list-'+thisList.id}
                    className='todo-list-button'
                    onClick={this.handleLoadList}
                >
                    {this.props.toDoList.name}<br />
                </div>
            )
        }
    }
}

export default ListLink;