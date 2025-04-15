import React, { useState } from 'react'
import DashBoard from './DashBoard';

export default function LoginForm() {
    const [logInUser,setLogInUser] = useState({
        email : '',
        password : '',
    });
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    const [currentUser,setCurrentUser] = useState(null);

    function clearInputFields(){
        setLogInUser({
            email : '',
            password : '',
        })
    }
    function handleSignIn(event){
        event.preventDefault();

        const {email,password} = logInUser;
        const userData = JSON.parse(localStorage.getItem('Users'));
        let currentUser = userData.find((user)=>{
            if((user.email == email)&&(user.password == password)) return user;
            return null;
        });

        if(currentUser){
            console.log(currentUser)
            setIsLoggedIn(true);
            setCurrentUser(currentUser);
            localStorage.setItem('Current-User',JSON.stringify(currentUser));
            clearInputFields();
        }
        else{
            alert("Enter valid Details!!!");
            clearInputFields();
        }
    }

    function handleInput(event){
        const {name,value} = event.target
        setLogInUser((prevState)=>({...prevState,[name]:value}))
    }
    return (
        <>{
            isLoggedIn?(
                <DashBoard userInfo={currentUser}/>
            ):(
                <form>
                    <div className="container">
                        <h1>Log In</h1>
                        <p>Please Fill details</p>
                        <label htmlFor="email">
                            <b>Email</b>
                        </label>
                        <input type="email"
                        value={logInUser.email}
                        name='email'
                        onChange={handleInput}
                        placeholder='Email'
                        />

                        <br />
                        <label htmlFor="password">
                            <b>Password</b>
                        </label>
                        <input type="password"
                        value={logInUser.password}
                        name='password'
                        onChange={handleInput}
                        placeholder='Password'
                        />
                        <button type='submit' onClick={handleSignIn} id='submitBtn'>Log In</button>  
                    </div>
                </form>
            )
        }
        </>
    )
}
