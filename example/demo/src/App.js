import React, { Component } from 'react';
import './App.css';
import Calendar from 'react-tiny-calendar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
        value: '',
    }  
  }
  handleSelect(value){
    this.setState({
      value: value
    })
  }
  render() {
    return (
      <div className="App">
        <input value={this.state.value}  />
        <Calendar onSelect={this.handleSelect.bind(this)} />
      </div>
    );
  }
}

export default App;
