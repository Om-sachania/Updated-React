import React from 'react'

export default function Time({hours,minutes,seconds,ampm}) {
    return (
        <>
            <div className='time'>
                <span className='hoursMins'>{hours}:{minutes}</span>
                <div className='seconds'>
                    <span>{ampm}</span>
                    <span>{seconds}</span>
                </div>
            </div>
        </>
    )
}
