import React, { Component } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import ProgressBar from './components/ProgressBar';
import CategoryList from './components/CategoryList';

class App extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">
                         <TodoInput />
                         <ProgressBar />
                         <div>
                            <CategoryList />
                            <TodoList />
                        </div>
                        
                </div>
            </div>
          );
    }
}

export default App;
