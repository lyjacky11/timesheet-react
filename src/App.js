import React, { Component } from "react";
import { Header, Settings, ShiftTimes, Results, Footer } from "./components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAdjust } from '@fortawesome/free-solid-svg-icons';
import "./App.css";

class App extends Component {
	constructor (props) {
		super(props);

		this.state = {
			pay_rate   : 0,
			multiplier : 1,
			start_time : "",
			breaks     : [
				{
					start_break : "",
					end_break   : ""
				}
			],
			end_time   : ""
		};
		this.initialState = this.state;
	}

	componentDidMount = () => {
		const savedPayRate = localStorage.getItem("pay_rate");
		const payRateInput = document.getElementById("pay_rate");
		const savedMultiplier = localStorage.getItem("multiplier");
		const multiplierInput = document.getElementById("multiplier");

		if (savedPayRate !== null) {
			payRateInput.value = savedPayRate;
			this.setState({pay_rate: savedPayRate});
		}
		if (savedMultiplier !== null) {
			multiplierInput.value = savedMultiplier;
			this.setState({multiplier: savedMultiplier});
		}
	}

	clearSettings = () => {
		document.getElementById("settings").reset();
		localStorage.clear();
	}

	resetState = () => {
		this.setState(this.initialState);
		document.getElementById("shift_times").reset();
	};

	setPayRate = (event) => {
		this.setState({ pay_rate: event.target.value });
		localStorage.setItem("pay_rate", event.target.value);
	};

	setMultiplier = (event) => {
		this.setState({ multiplier: event.target.value });
		localStorage.setItem("multiplier", event.target.value);
	};

	setStartTime = (event) => {
		this.setState({ start_time: event.target.value });
	};

	setStartBreak = (event) => {
		var breaks = this.state.breaks;
		breaks[0] = {
			start_break : event.target.value,
			end_break   : breaks[0].end_break
		};
		this.setState({ breaks: breaks });
	};

	setEndBreak = (event) => {
		var breaks = this.state.breaks;
		breaks[0] = {
			start_break : breaks[0].start_break,
			end_break   : event.target.value
		};
		this.setState({ breaks: breaks });
	};

	setEndTime = (event) => {
		this.setState({ end_time: event.target.value });
	};

	toggleTheme() {
		const body = document.querySelector("body");
		const header = document.querySelector(".header");
		const settings = document.querySelector(".settings");
		const clearBtn = document.querySelector(".clearBtn");
		const shiftTimes = document.querySelector(".shiftTimes");
		const breaks = document.querySelector(".breaks");
		const resetBtn = document.querySelector(".resetBtn");
		const results = document.querySelector(".results");
		const themeBtn = document.querySelector(".themeBtn");
		const footer = document.querySelector(".footer");

		body.classList.toggle("light");
		header.classList.toggle("flexItem-light");
		settings.classList.toggle("flexItem-light");
		clearBtn.classList.toggle("button-light");
		shiftTimes.classList.toggle("flexItem-light");
		breaks.classList.toggle("flexItem-light");
		resetBtn.classList.toggle("button-light");
		results.classList.toggle("flexItem-light");
		themeBtn.classList.toggle("light");
		footer.classList.toggle("flexItem-light");
	}

	render () {
		return (
			<div className="body">
				<Header />				
				<Settings setPayRate={this.setPayRate} setMultiplier={this.setMultiplier} />				
				<button className="clearBtn" onClick={this.clearSettings}>Clear Settings</button>
				<ShiftTimes
					setStartTime={this.setStartTime}
					setStartBreak={this.setStartBreak}
					setEndBreak={this.setEndBreak}
					setEndTime={this.setEndTime}
				/>
				<button className="resetBtn" onClick={this.resetState}>Reset Times</button>
				<Results results={this.state} />
				<FontAwesomeIcon className={`themeBtn`} onClick={this.toggleTheme} icon={faAdjust} size="2x" />
				<Footer />
			</div>
		);
	}
}

export default App;
