import React, { Component } from 'react';
import './Results.css';

class Results extends Component {

    componentDidUpdate = () => {
        this.updateCalButton(this.props.results);
    }

    updateCalButton(results) {
        // Query calendar button elements
        var calButton = document.querySelector(".addeventatc");
        var eventTitle = calButton.querySelector(".title");
        var description = calButton.querySelector(".description");
        var startTime = calButton.querySelector(".start");
        var endTime = calButton.querySelector(".end");
        var timeZone = calButton.querySelector(".timezone");
        var reminder = calButton.querySelector(".alarm_reminder");
        
        // Initialize variables
        var start_shift = results.start_time;
        var end_shift = results.end_time;
        var breaks = [];
        var breaksString = "";
        var total_breaks = "";
        var start_break = document.querySelector("#start_break").value;
        var end_break = document.querySelector("#end_break").value;

        // Breaks
        if (start_break !== "" && end_break !== "") {
            total_breaks = "\n<b>" + document.querySelector("#total_breaks").innerHTML + "</b>";
            breaks[0] = "<em>On Break: " + start_break + "</em>\n";
            breaks[1] = "<em>Off Break: " + end_break + "</em>\n";
            breaksString += breaks[0];
            breaksString += breaks[1];
        }
        
        // Set strings
        var hours_worked = "<b>" + document.querySelector("#hours_worked").innerHTML + "</b>";
        var time_in = "<em>Time In: " + start_shift + "</em>";
        var time_out = "<em>Time Out: " + end_shift + "</em>";
        
        // Set event information
        eventTitle.innerText = "Event Name";
        description.innerText = hours_worked + total_breaks + "<br>Shift Paid? N/A<br/><br/>" + time_in + "<br/>" + breaksString + time_out;
        startTime.innerText = start_shift;
        endTime.innerText = end_shift;
        timeZone.innerText = "America/Toronto";
        reminder.innerText = "0";
    }
    
    calculateHours(results) {
        // Initialize variables
        var hoursWorked = 0;
        var minutesWorked = 0;
        var hoursOnBreak = 0;
        var minutesOnBreak = 0;
        var totalWorkHours = 0;
        var totalBreakHours = 0;
        var totalShiftHours = 0;
        var totalAmount = 0;
        
        // Fetch data from props
        const payRate = results.pay_rate;
        const multiplier = results.multiplier;
        const startTime = results.start_time;
        const endTime = results.end_time;
        const startBreak = results.breaks[0].start_break;
        const endBreak = results.breaks[0].end_break;

        if (startTime !== "" && endTime !== "")
        {
            // Start Time
            const startTimeHour = startTime.split(":")[0];
            const startTimeMin = startTime.split(":")[1];
            const startTimeInHours = Number(startTimeHour) + startTimeMin / 60;

            // End Time
            const endTimeHour = endTime.split(":")[0];
            const endTimeMin = endTime.split(":")[1];
            const endTimeInHours = Number(endTimeHour) + endTimeMin / 60;
            
            if (startBreak !== "" && endTime !== "")
            {
                // Start Break
                const startBreakHour = startBreak.split(":")[0];
                const startBreakMin = startBreak.split(":")[1];
                const startBreakInHours = Number(startBreakHour) + startBreakMin / 60;

                // End Break
                const endBreakHour = endBreak.split(":")[0];
                const endBreakMin = endBreak.split(":")[1];
                const endBreakInHours = Number(endBreakHour) + endBreakMin / 60;

                totalBreakHours = endBreakInHours - startBreakInHours;
            }
            // Total Hours
            totalShiftHours = endTimeInHours - startTimeInHours;
            totalWorkHours = totalShiftHours - totalBreakHours;
            totalAmount = payRate * multiplier * totalWorkHours;

            // Rounded Values
            hoursWorked = Math.floor(totalWorkHours);
            minutesWorked = Math.round((totalShiftHours % 1) * 60);
            hoursOnBreak = Math.floor(totalBreakHours);
            minutesOnBreak = Math.round((totalBreakHours % 1) * 60);
            
            // Fixed Decimal Places
            totalWorkHours = totalWorkHours.toFixed(2);
            totalBreakHours = totalBreakHours.toFixed(2);
            totalAmount = totalAmount.toFixed(2);
        }
        return {
            hoursWorked: hoursWorked,
            minutesWorked: minutesWorked,
            hoursOnBreak: hoursOnBreak,
            minutesOnBreak: minutesOnBreak,
            totalWorkHours: totalWorkHours,
            totalBreakHours: totalBreakHours,
            totalAmount: totalAmount
        };
    }
    
    render() {
        const { results } = this.props;
        const data = this.calculateHours(results);

        return (
            <div className="results flexItem">
                <h3>Results</h3>
                <p id="hours_worked">Hours Worked: {data.hoursWorked}h {data.minutesWorked}m | {data.totalWorkHours} hours</p>
                <p id="total_breaks">Total Breaks: {data.hoursOnBreak}h {data.minutesOnBreak}m | {data.totalBreakHours} hours</p>
                <p id="gross_pay">Gross Pay: ${data.totalAmount}</p>
                
                <div title="Add To Calendar" className="addeventatc" data-google-api="true">
                    Add To Calendar
                    <span className="title"></span>
                    <span className="description"></span>
                    <span className="start"></span>
                    <span className="end"></span>
                    <span className="timezone"></span>
                    <span className="alarm_reminder"></span>
                </div>
                <br /><br />
            </div>
        );
    }
}

export default Results;