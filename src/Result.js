import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import './Result.css';

class Result extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        const { favourite, title, favourited } = this.props;

        favourite(title, favourited);
    }

    render() {
        const { title, description, favourited } = this.props;

        return (
            <li>
                <div className='result'>
                    <span className='titles'><i onClick={this.handleClick} className={`fas fa-star ${favourited ? 'green' : 'gray'}`}></i>{title}</span>
                    {ReactHtmlParser(description)}
                </div>
            </li>
        );
    }
}

export default Result;