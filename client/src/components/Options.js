import React, { Component } from "react";
// import images of the pokeballs here to display
import { Link } from 'react-router-dom'


const renderImg = (value) => {
    switch(value) {
        case 'short_term':
            return;
        case 'medium_term':
            return;
        case 'long_term':
            return;
        default:
            return null
    }
}

export default class SelectOptions extends Component {
    constructor() {
        super()
        this.handleClick = this.handleClick.bind(this);
    }
    
    
    handleClick() {
        const { value, clickHandler } = this.props;
        clickHandler(value);
    }
    
    
    render() {
        const { value, children }= this.props;
        return (
            // Render the images of each button
            // use value to determine the image to render
            // Display the 3 buttons for timeframe
            <div>
                <img src={renderImg(value)} alt={value}/>
                <Link
                    to={`?time-range=${value}`}
                    onClick={this.handleClick}
                >
                    {children}
                </Link>
                
            </div>

        );
    }
}
