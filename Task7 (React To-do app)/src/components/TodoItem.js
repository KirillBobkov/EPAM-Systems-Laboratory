import React, { Component } from 'react';

class TodoItem extends Component {
    render() {
        return (
            <div>
                <input type="checkbox"/>
                <span>first item</span>
                <i class="fas fa-edit"></i>
            </div>
        );
    }
}

export default TodoItem;