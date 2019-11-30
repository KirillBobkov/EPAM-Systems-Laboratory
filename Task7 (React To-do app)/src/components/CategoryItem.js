import React, { Component } from 'react';

class CategoryItem extends Component {
    render() {
        return (
            <div>
                <div>
                    <span>Category1</span>
                    <i class="fas fa-edit"></i>
                </div>
                <div>
                     <i class="fas fa-trash-alt"></i>
                </div>
            </div>
        );
    }
}

export default CategoryItem;