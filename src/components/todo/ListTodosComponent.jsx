import React, {Component} from 'react'
import TodoDataService from '../../api/todo/TodoDataService'
import AuthenticationService from './AuthenticationService.js'
import moment from 'moment'

class ListTodosComponent extends Component {
    //react lifecycle:
    //1st constructor
    //2nd render using initial state
    //3rd componentDidMount
    //4th render again
    //5th componentWillUnmount
    //shouldComponentUpdate if return false, render will happen at all
    constructor(props){
        super(props)
        this.state = {
            todos : 
            [
                //moved to componentDidMount() so we don't have to wait for api to load
                //{id: 1, description : 'Learn React', done: false, targetDate: new Date()},
                //{id: 2, description : 'Become an expert at React', done: false, targetDate: new Date()},
                //{id: 3, description : 'Do more React', done: false, targetDate: new Date()}
            ],
            message : null
        }
        this.deleteTodoClicked = this.deleteTodoClicked.bind(this)
        this.updateTodoClicked = this.updateTodoClicked.bind(this)
        this.addTodoClicked = this.addTodoClicked.bind(this)
        this.refreshTodos = this.refreshTodos.bind(this)
    }

    

    // wait for api
    componentDidMount() {
        this.refreshTodos();
    }

    refreshTodos() {
        let username = AuthenticationService.getLoggedInUserName()
        TodoDataService.retrieveAllTodos(username)
        .then(
            response => {
                //console.log(response)
                this.setState({todos : response.data})
            }
        )
    }

    deleteTodoClicked(id) {
        let username = AuthenticationService.getLoggedInUserName()
        TodoDataService.deleteTodo(username, id)
            .then(
                response => {
                    this.setState({message : `Delete of todo ${id} successful`});
                    this.refreshTodos()
                }
            )
    }    

    addTodoClicked() {
        this.props.navigate(`/todos/-1`)
    }
    
    updateTodoClicked(id) {
        this.props.navigate(`/todos/${id}`)
    }

    render () {
        return (
            <div>
                <h1>List Todos</h1>
                {this.state.message && <div className='alert alert-success'>{this.state.message}</div>}
                <div className='container'>
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>Description</th>
                                <th>Target Date</th>
                                <th>Is Completed</th>
                                <th>Update</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.todos.map (
                                    todo => 
                                        <tr key={todo.id}>
                                            <td>{todo.description}</td>
                                            <td>{moment(todo.targetDate).format('YYYY-MM-DD')}</td>
                                            <td>{todo.done.toString()}</td>
                                            <td><button className="btn btn-success" onClick={() => this.updateTodoClicked(todo.id)}>Update</button></td>
                                            <td><button className="btn btn-warning" onClick={() => this.deleteTodoClicked(todo.id)}>Delete</button></td>
                                        </tr>
                                )
                            }
                        </tbody>
                    </table>
                    <div className="row">
                        <button className="btn btn-success" onClick={this.addTodoClicked}>Add</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default ListTodosComponent