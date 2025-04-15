import React from 'react'
import { useEffect, useState } from 'react';
import Time from './Time';

export default function Clock() {
    const [datetime,setDateTime] = useState({
        date : '',
        day : '',
        hours : '',
        minutes : '',
        seconds : '',
        ampm : '',
    });
    
    useEffect(()=>{

    let interval = setInterval(()=>{
        let currDate = new Date();
    
        let formattedDate = currDate.toLocaleDateString('en',{year: 'numeric',month:'long', day: '2-digit'});
    
        let weekDay = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        let formattedDay = weekDay[currDate.getDay()];
    
        let formattedHours = currDate.getHours();
        let ampmIndicator = formattedHours>=12 ? 'PM' : 'AM';
    
        formattedHours=formattedHours%12;
    
        let formattedMinutes = currDate.getMinutes();
        if(formattedMinutes<10) formattedMinutes ='0'+formattedMinutes
    
        let formattedSeconds = currDate.getSeconds();
        if(formattedSeconds<10) formattedSeconds = '0'+formattedSeconds
    
            setDateTime({
                date : formattedDate,
                day : formattedDay,
                hours : formattedHours,
                minutes : formattedMinutes,
                seconds : formattedSeconds,
                ampm : ampmIndicator
            })
    },1000);

    return ()=> clearInterval(interval)
    },[])

    return(
    <>
        <div className='clock'>
            <h2 className='currentDay'>{datetime.day}</h2>
            <Time hours={datetime.hours} minutes={datetime.minutes} seconds={datetime.seconds} ampm={datetime.ampm}/>
            <h2 className='currentDate'>{datetime.date}</h2>
        </div>
    </>
    )
}

