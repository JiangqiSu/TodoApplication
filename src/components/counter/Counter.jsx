import React, {Component} from "react";
import PropTypes from 'prop-types';
import './Counter.css';


class Counter extends Component{

    constructor() {
        super();

        this.state = {
            counter : 0
        }

        this.increment = this.increment.bind(this);
    }

    render() {
        const myStyle = {fontSize : "50px", padding : "10px 20px"};

        return (
          <div className="counter">
            Counter
            <CounterButton by = {1} incrementMethod = {this.increment}/>
            <CounterButton by = {5} incrementMethod = {this.increment}/>
            <CounterButton by = {10} incrementMethod = {this.increment}/>
            <span className="count" style={myStyle}>{this.state.counter}</span>
          </div>
        );
    }

    increment(by) {
        this.setState(
            (prevState) => {
                return {counter: prevState.counter + by}
            }
        );
    }
}

class CounterButton extends Component{

    //define the initial state in a constructor
    //state => counter = 0

    constructor() {
        super(); //need to call it super before using it
        this.state = {
            counter : 0
        }

        //bind method
        //The bind() method allows an object to borrow a method 
        //from another object without making a copy of that method.
        this.increment = this.increment.bind(this);
    }

    // DOM in js, document, object, model, very complex and slow
    // Virtual dom from react, faster (only update what changed instead of all)
    render(){
    //render = () => { //auto bind
        return(
            <div className="Counter">
            <button onClick = {this.increment}>+{this.props.by}</button>
            </div>
            )
    }
    increment(){
    //increment = () => {
        console.log('increment called');
        //setState: merge with existing state
        this.setState(
            (prevState) => {
                return {counter : prevState.counter + this.props.by}
            }
        );

        this.props.incrementMethod(this.props.by);
    }
}

// set default value for prop
CounterButton.defaultProps = {
    by : 1
}

// check prop types
CounterButton.propTypes = {
    by : PropTypes.number
}

export default Counter;