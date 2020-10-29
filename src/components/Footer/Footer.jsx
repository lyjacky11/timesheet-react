import React, { Component } from 'react';
// import style from './Footer.module.css';

class Footer extends Component {    
    render() {
        const currentYear = new Date().getFullYear();

        return (
            <div className="footer flexItem">
                <h5>© Copyright 2019-{currentYear}, Jacky Ly.</h5>
            </div>
        );
    }
}

export default Footer;