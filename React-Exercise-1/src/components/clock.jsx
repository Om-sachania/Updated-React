import React from 'react'

class Clock extends React.Component {
    constructor(){
        super();
        this.state = {
            date : new Date(),
        }
    }

    componentDidMount(){
        setInterval(()=>{
            this.setState({date : new Date()});
        },1000)
    }

    render() {
        let hours = this.state.date.getHours();
        let minutes =this.state.date.getMinutes();
        let seconds = this.state.date.getSeconds();
        
        if(hours<10) hours='0'+hours
        if(minutes<10) minutes='0'+minutes
        if(seconds<10)seconds='0'+seconds;

        let ampm = hours>=12 ? 'PM' : 'AM';
        hours = hours%12;

        let weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        let day = weekday[this.state.date.getDay()];

        let formattedDate = this.state.date.toLocaleString("en", {year: 'numeric',month:'long', day: '2-digit'})
        return (
            <div id='clock'>
                <div className='displayDay'>{day}</div>
                <div className="displayTime">
                    <span className='hours'>{hours}</span>:<span className='minutes'>{minutes}</span>
                    <div className='timeSectionTwo'>
                        <span>{ampm}</span>
                        <span>{seconds}</span>
                    </div>
                </div>
                
                <div className='displayDate'>{formattedDate}</div>
            </div>
        )
    }
}

export default Clock
