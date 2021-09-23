import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addTodo } from './actions/todo';
import './App.css';

class App extends Component {

  state = {
    todo: ''
  }

  handleOnChange = event => {
    this.setState({
      todo: event.target.value
    }); // updates the state 'todo' value as data is entered into the input field, hence 'on change'
  }

  handleOnSubmit = event => {
    event.preventDefault();
    console.log("Todo being added: ", this.state.todo);
    this.props.addTodo(this.state.todo); // because of mapDispatchToProps we no longer need to add this.props.dispatch(functionCall)
    this.setState({ todo: '' });
  } // adds the 'todo' item and resets the state.todo to an empty string

  render() {
    const renderTodos = () => this.props.todos.map(todo => <li key={todo}>{todo}</li>);
    // arrow function that renders the list of existing to-dos(array)
    return (
      <div className="App">
      <form onSubmit={(event) => this.handleOnSubmit(event)}>
        {/* Basic form with an event handler that calls the handleOnSubmit function that thereby adds the to-do item onto the list */}
        <input
          type="text"
          onChange={(event) => this.handleOnChange(event)}
          id="todos"
          placeholder="add todo" 
          value={this.state.todo}/>
        <input type="submit" />
      </form>
      <h2>Todos:</h2>
        <ol>{renderTodos()}</ol>
        {/* calling the todo list via the renderTodos function at the top of the render ... thingie. method! */}
      </div>
    );

  }
};

const mapStateToProps = (state) => {
  return {
    todos: state.todos
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTodo: (todo) => {
      dispatch(addTodo(todo))
    } // what the unholy crap is this recursive shit
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
// and now our state appears in our props yay
// this is by the way the LEAST helpful that our state has a key/value of [todo: ''] and our mapStateToProps has a return key/value of todos: state.todos 
// and it makes it REALLY hard to separate which one is the one that fills the entry box and which one is the master list.
// I'm just saying. This is annoying as hell.

// export default connect(state => ({ todos: state.todos }), { addTodo })(App);
// this is also valid because our structure is so simple but I'm not sure I wanna 
// but it's a direct 1:1 correlation to the above so there