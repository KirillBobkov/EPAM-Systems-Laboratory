import React, { Component } from 'react';
import CategoryItem from './CategoryItem';

class CategoryList extends Component {
    render() {
        return (
            <ul>
                <li><CategoryItem /></li>
                <li><CategoryItem /></li>
                <li><CategoryItem /></li>
            </ul>
        );
    }
}

export default CategoryList;