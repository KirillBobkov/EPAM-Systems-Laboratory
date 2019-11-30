import React, { Component } from 'react';

class TodoInput extends Component {
    render() {
        return (
            <div className="header">
               <h1>To-do list</h1>
               <form>
                   <input type="checkbox"/>
                   <input type="text" placeholder="Add new item"/>
                   <button>Add</button>
               </form>
            </div>
        );
    }
}

export default TodoInput;