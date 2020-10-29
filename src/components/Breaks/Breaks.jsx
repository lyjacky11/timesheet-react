import React, { Component } from 'react';
// import style from './Breaks.module.css';

class Breaks extends Component {
    render() {
        const { setStartBreak, setEndBreak } = this.props;

        return (
            <div className="breaks">          
                <div>Start Break: &nbsp; <input type="time" onChange={setStartBreak} id="start_break" list="times_list" /></div>
                <br />
                <div>End Break: &nbsp; <input type="time" onChange={setEndBreak} id="end_break" list="times_list" /></div> 
            </div>
        );
    }
}

export default Breaks;