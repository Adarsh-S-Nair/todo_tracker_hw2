import React, {Component} from 'react'

export default class DeleteListModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="overlay">
                <div id="delete-confirmation">
                    <h3 id="delete-message">Are you sure you want to delete this list?</h3>
                    <div id="popup-options">
                        <button 
                            id="cancel-button" 
                            class="control-button"
                            onClick={this.props.hideDeleteListModalCallback}>Cancel</button>
                        <button 
                            id="confirm-delete"
                            class="control-button"
                            onClick={this.props.deleteListCallback}>Confirm</button>
                    </div>
                </div>
            </div>
        )
    }
}