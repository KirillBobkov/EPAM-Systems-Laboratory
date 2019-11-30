import React, { Component } from 'react';
import TodoItem from './TodoItem';

class TodoList extends Component {
    render() {
        return (
            <div>
                <TodoItem />
            </div>
        );
    }
}

export default TodoList;