import React, { useEffect, useState } from 'react'
import './DashBoard.css'
import LoginForm from './LoginForm';

export default function DashBoard({userInfo}) {
    const{userName,email,password}= userInfo;

    const [currentUser,setCurrentUser] = useState(false);
    console.log(currentUser)

    function handleLogOut(){
        localStorage.removeItem('Current-User');
        setCurrentUser(null);
    }

    useEffect(()=>{
        const loggedInUser = JSON.parse(localStorage.getItem('Current-User'));
        if(loggedInUser){
            setCurrentUser(true);
        }
    })
    return (
        <>{
            currentUser?(
                <>
                <div className='card'>
                    <h1 className='userName'>{userName}</h1>
                    <h1 className='email'>{email}</h1>
                    <h1 className='password'>{password}</h1>
                </div>  
                <button id='logOutBtn' onClick={handleLogOut}>Log Out</button>
            </>
        ):(
            <LoginForm/>
    )}
        </>
    )
}
