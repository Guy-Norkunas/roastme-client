import React, { Component} from 'react';
import Post from '../shared/post';

export default class dashboard extends Component {

    render() {
        return (
            <div>
                <p>dashboard component</p>
                < Post />
            </div>
        )
    }
}