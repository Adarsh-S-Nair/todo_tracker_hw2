// IMPORT ALL THE THINGS NEEDED FROM OTHER JAVASCRIPT SOURCE FILES
import React, { Component } from 'react';
import testData from './test/testData.json'
import jsTPS from './common/jsTPS'

// THESE ARE OUR REACT COMPONENTS
import Navbar from './components/Navbar'
import LeftSidebar from './components/LeftSidebar'
import Workspace from './components/Workspace'
import DeleteListModal from './components/DeleteListModal'

// THESE ARE OUR TRANSACTIONS
import ChangeTask_Transaction from './transactions/ChangeTask_Transaction'
import ChangeDueDate_Transaction from './transactions/ChangeDueDate_Transaction'
import ChangeStatus_Transaction from './transactions/ChangeStatus_Transaction'
import MoveItemUp_Transaction from './transactions/MoveItemUp_Transaction'
import MoveItemDown_Transaction from './transactions/MoveItemDown_Transaction'
import DeleteItem_Transaction from './transactions/DeleteItem_Transaction'
import AddItem_Transaction from './transactions/AddItem_Transaction'
import { TransferWithinAStationSharp } from '@material-ui/icons';

{/*import ItemsListHeaderComponent from './components/ItemsListHeaderComponent'
import ItemsListComponent from './components/ItemsListComponent'
import ListsComponent from './components/ListsComponent'
*/}
class App extends Component {
  constructor(props) {
    // ALWAYS DO THIS FIRST
    super(props);

    // DISPLAY WHERE WE ARE
    console.log("App constructor");

    // MAKE OUR TRANSACTION PROCESSING SYSTEM
    this.tps = new jsTPS();

    // CHECK TO SEE IF THERE IS DATA IN LOCAL STORAGE FOR THIS APP
    let recentLists = localStorage.getItem("toDoLists");
    console.log("recentLists: " + recentLists);
    if (!recentLists) {
      recentLists = JSON.stringify(testData.toDoLists);
      localStorage.setItem("toDoLists", recentLists);
    }
    recentLists = JSON.parse(recentLists);

    // FIND OUT WHAT THE HIGHEST ID NUMBERS ARE FOR LISTS
    let highListId = -1;
    let highListItemId = -1;
    for (let i = 0; i < recentLists.length; i++) {
      let toDoList = recentLists[i];
      if (toDoList.id > highListId) {
        highListId = toDoList.id;
      }
      for (let j = 0; j < toDoList.items.length; j++) {
        let toDoListItem = toDoList.items[j];
        if (toDoListItem.id > highListItemId)
        highListItemId = toDoListItem.id;
      }
    };

    // SETUP OUR APP STATE
    this.state = {
      toDoLists: recentLists,
      currentList: null,
      nextListId: highListId+1,
      nextListItemId: highListItemId+1,
      useVerboseFeedback: true,
      showDeleteListModal: false
    }
  }

  componentWillMount() {
    localStorage.getItem('toDoLists') && this.setState({
      toDoLists: JSON.parse(localStorage.getItem('toDoLists'))
    })
  }

  componentWillUpdate() {
    console.log("UPDATING FILE");
    localStorage.setItem('toDoLists', JSON.stringify(this.state.toDoLists));
  }

  createChangeTaskTransaction = (item, task) => {
    if(task != item.description){
      let transaction = new ChangeTask_Transaction(this, item, task);
      this.tps.addTransaction(transaction);
    }
  }

  createChangeDueDateTransaction = (item, date) => {
    if(date != item.due_date){
      let transaction = new ChangeDueDate_Transaction(this, item, date);
      this.tps.addTransaction(transaction);
    }
  }

  createChangeStatusTransaction = (item, status) => {
    if(status != item.status){
      let transaction = new ChangeStatus_Transaction(this, item, status);
      this.tps.addTransaction(transaction);
    }
  }

  createMoveUpTransaction = (item) => {
    let transaction = new MoveItemUp_Transaction(this, item);
    this.tps.addTransaction(transaction);
  }

  createMoveDownTransaction = (item) => {
    let transaction = new MoveItemDown_Transaction(this, item);
    this.tps.addTransaction(transaction);
  }

  createDeleteItemTransaction = (item) => {
    let transaction = new DeleteItem_Transaction(this, item);
    this.tps.addTransaction(transaction);
  }

  createAddItemTransaction = () => {
    let transaction = new AddItem_Transaction(this);
    this.tps.addTransaction(transaction);
  }

  editTask = (item, task) => {
    let oldTask = item.description;
    item.description = task;
    this.setState(this.state);
    return oldTask;
  }

  editDate = (item, date) => {
    let oldDate = item.due_date;
    item.due_date = date;
    this.setState(this.state);
    return oldDate;
  }

  editStatus = (item, status) => {
    let oldStatus = item.status;
    item.status = status;
    this.setState(this.state);
    return oldStatus;
  }

  moveItemUp = (item) => {
    let index = this.state.currentList.items.findIndex(i => i.id === item.id);
    let temp = this.state.currentList.items[index-1];
    this.state.currentList.items[index-1] = item;
    this.state.currentList.items[index] = temp;
    this.setState(this.state);
  }

  moveItemDown = (item) => {
    let index = this.state.currentList.items.findIndex(i => i.id === item.id);
    let temp = this.state.currentList.items[index+1];
    this.state.currentList.items[index+1] = item;
    this.state.currentList.items[index] = temp;
    this.setState(this.state);
  }

  deleteItem = (item) => {
    let index = this.state.currentList.items.findIndex(i => i.id === item.id);
    this.state.currentList.items.splice(index, 1);
    this.setState(this.state);
    return index;
  }

  addItem = (item, index) => {
    if(index || index == 0) {
      this.state.currentList.items.splice(index, 0, item);
    }
    else {
      item = this.makeNewToDoListItem();
      this.state.currentList.items.splice(this.state.currentList.items.length, 0, item);
    }
    this.setState(this.state);
    return item;
  }

  changeListName = (name) => {
    this.state.currentList.name = name;
    this.setState(this.state);
  }

  closeList = () => {
    this.setState({
      currentList: null
    })
  }

  deleteList = () => {
    let index = this.state.toDoLists.findIndex(i => i.id === this.state.currentList.id);
    this.state.toDoLists.splice(index, 1);
    this.setState({
      currentList: null,
      showDeleteListModal: false
    })
  }

  showDeleteListModal = () => {
    this.setState({
      showDeleteListModal : true
    })
  }

  hideDeleteListModal = () => {
    this.setState({
      showDeleteListModal : false
    })
  }

  // WILL LOAD THE SELECTED LIST
  loadToDoList = (toDoList) => {
    this.tps.clearAllTransactions();
    console.log("loading " + toDoList);

    // MAKE SURE toDoList IS AT THE TOP OF THE STACK BY REMOVING THEN PREPENDING
    const nextLists = this.state.toDoLists.filter(testList =>
      testList.id !== toDoList.id
    );
    nextLists.unshift(toDoList);

    this.setState({
      toDoLists: nextLists,
      currentList: toDoList
    });
  }

  addNewList = () => {
    let newToDoListInList = [this.makeNewToDoList()];
    let newToDoListsList = [...newToDoListInList, ...this.state.toDoLists];
    let newToDoList = newToDoListInList[0];

    // AND SET THE STATE, WHICH SHOULD FORCE A render
    this.setState({
      toDoLists: newToDoListsList,
      currentList: newToDoList,
      nextListId: this.state.nextListId+1
    });
  }

  makeNewToDoList = () => {
    let newToDoList = {
      id: this.state.nextListId,
      name: 'Untitled',
      items: []
    };
    return newToDoList;
  }

  makeNewToDoListItem = () =>  {
    let newToDoListItem = {
      id: this.state.nextListItemId++,
      description: "No Description",
      due_date: "No Date",
      status: "incomplete"
    };
    return newToDoListItem;
  }


  undo = () => {
    if(this.tps.hasTransactionToUndo()){
      this.tps.undoTransaction();
      this.setState(this.state);
    }
  }

  redo = () => {
    if(this.tps.hasTransactionToRedo()){
      this.tps.doTransaction();
      this.setState(this.state);
    }
  }

  render() {
    return (
      <div id="root">
        {this.state.showDeleteListModal ? <DeleteListModal
                                            deleteListCallback={this.deleteList}
                                            hideDeleteListModalCallback={this.hideDeleteListModal} /> : null}
        <Navbar />
        <div id="main">
          <Workspace 
            changeTaskTransactionCallback={this.createChangeTaskTransaction}
            changeDueDateTransactionCallback={this.createChangeDueDateTransaction}
            changeStatusTransactionCallback={this.createChangeStatusTransaction}
            moveItemUpTransactionCallback={this.createMoveUpTransaction}
            moveItemDownTransactionCallback={this.createMoveDownTransaction}
            deleteItemTransactionCallback={this.createDeleteItemTransaction}
            addItemTransactionCallback={this.createAddItemTransaction}
            closeListCallback={this.closeList}
            deleteListCallback={this.showDeleteListModal}
            undoCallback={this.undo}
            redoCallback={this.redo}
            tps={this.tps}
            currentList={this.state.currentList}
          />
          <LeftSidebar 
            toDoLists={this.state.toDoLists}
            loadToDoListCallback={this.loadToDoList}
            addNewListCallback={this.addNewList}
            changeNameCallback={this.changeListName}
            currentList={this.state.currentList}
          />
        </div>
      </div>
    );
  }
}

export default App;