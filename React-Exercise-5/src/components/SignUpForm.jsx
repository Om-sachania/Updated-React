import { useEffect, useState } from 'react';
import React from 'react';
import './SignUpForm.css';
import LoginForm from './LoginForm';
import DashBoard from './DashBoard';

export default function SignUpForm() {
    const [userData,setUserData] = useState(()=>{
        const userData = (localStorage.getItem('Users'));
        if(!userData) return [];
        return JSON.parse(userData);
    });
    const [user,setUser] = useState(
    {
        userName : '',
        email : '',
        password : '',
        confirmPassword : '',
    });
    const [isSubmitted,setIsSubmitted] = useState(false);
    const [logInPage,setLogInPage] = useState(false);

    function handleInput(event){
        const {name,value} = event.target
        setUser((prevState)=>({...prevState,[name]:value}))
    }

    function clearInputFields(){
        setUser({
            userName : '',
            email : '',
            password : '',
            confirmPassword : '',
        })
    }

    function alertMessage(message){
        alert(message);
        clearInputFields();
        return false;
    }
    function inputValidation(){
        let {userName,password,confirmPassword,email} = user

        let upperCase = /[A-Z]/g;
        let lowerCase = /[a-z]/g;
        let numbers = /[0-9]/g;

        if(!userName.trim()) return alertMessage('Enter User Name!!');
        if(!email.trim()) return alertMessage('Enter Email')
        if (password.length<8) return alertMessage('Password should have atleast 8 characters!!')
        if(!password.match(upperCase)) return alertMessage('Atleast One UpperCase Character')
        if(!password.match(lowerCase)) return alertMessage('Atleast One LowerCase Character');
        if(!password.match(numbers)) return alertMessage('Atleast One Number')
        if(!(password === confirmPassword))return alertMessage('Password and ConfirmPassword should be same');
        
        return true;
    }
    function handleFormSubmission(event){
        event.preventDefault();
        if(inputValidation()){
            setUserData((prevState)=>([...prevState,user]));
            setIsSubmitted(true)
            alert('Successful Signed In')
        }
        else{
            console.log('Enter Proper Details');
        }
    }
    function navigateToSignIn(){
        setLogInPage(true);
    }

    useEffect(()=>{
        localStorage.setItem('Users',JSON.stringify(userData));
        localStorage.setItem('Current-User',JSON.stringify(user));
    },[userData])
    return (
        <>
        {isSubmitted?(
            <DashBoard userInfo={user}/>
        ):(
            logInPage?(
            <LoginForm/>
        ):(
            <form>
            <div className="container">
                <h1>Sign Up</h1>
                <p>Please Fill details</p>

                <label htmlFor="userName">
                    <b>User Name</b>
                </label>
                <input type="text"
                value={user.userName}
                name='userName'
                onChange={handleInput}
                placeholder='User Name'
                />

                <br />
                <label htmlFor="email">
                    <b>Email</b>
                </label>
                <input type="email"
                value={user.email}
                name='email'
                onChange={handleInput}
                placeholder='Email'
                />

                <br />
                <label htmlFor="password">
                    <b>Password</b>
                </label>
                <input type="password"
                value={user.password}
                name='password'
                onChange={handleInput}
                placeholder='Password'
                />
                
                <br />
                <label htmlFor="confirmPassword">
                    <b>Confirm Password</b>
                </label>
                <input type="password"
                value={user.confirmPassword}
                name='confirmPassword'
                onChange={handleInput}
                placeholder='Confirm Password'
                />
                <button onClick={handleFormSubmission} id='submitBtn'>Sign Up</button>  
                <button onClick={navigateToSignIn} id='logInBtn'>Log In</button>
            </div>
        </form>
        )
        )}
        </>
    )
}
