import React, { Component } from 'react';

let divStyles = {
    borderTop: '1px solid #eee',
    overflowX: 'hidden'
};
// TODO: move this state up into Page 
// so that the input form can be used to change other components
export class FormBasic extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInput: 'Chris Rules'
        };

        this._handleChange = this._handleChange.bind(this);
    }

	_handleChange (e) {
	  this.setState({
	    userInput: e.target.value
	  });
	}

	render () {
	  return (
        <div style={divStyles}>
            <p className="ms-font-xl">(Extremely) Basic Form</p>
            <p>
                <input 
                    className="ms-font-m"
                    type="text"
                    onChange={this._handleChange} 
                    value={this.state.userInput} 
                    maxLength="140" />
            </p>
            <p className="ms-font-su">{this.state.userInput}</p>
        </div>
	  );
	}
}