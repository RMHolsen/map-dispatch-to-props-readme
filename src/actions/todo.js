export const addTodo = (todo) => {
    return {
        type: 'ADD_TODO', // action object
        todo: todo  // payload
    }
}

// action creator arrow function
// returns action object of 'ADD_TODO' and todo payload taken from state