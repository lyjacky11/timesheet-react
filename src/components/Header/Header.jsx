import React, { Component } from 'react';
// import style from './Header.module.css';

class Header extends Component {
    render() {
        return (
            <div className="header flexItem">
                <h2>Time Sheet Calculator v2</h2>
                <h4>Developed using the React library.</h4>
                <a href="https://lyjacky11.github.io/TimeSheetCalculator" target="_blank" rel="noreferrer">Version 1</a>
                &nbsp; -- &nbsp;
                <a href="https://github.com/lyjacky11/timesheet-react" target="_blank" rel="noreferrer">GitHub</a>
                &nbsp; -- &nbsp;
                <a href="https://JackyLy.ca/" target="_blank" rel="noreferrer">Website</a>
                <br /><br />
            </div>
        );
    }
}

export default Header;