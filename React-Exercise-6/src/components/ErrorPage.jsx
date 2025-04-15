import React from 'react'
import {useNavigate} from 'react-router-dom'

export default function ErrorPage() {
    const navigate  = useNavigate();

    function handleGoBack(){
        // console.log(navigate)
        navigate(-1);
    }
    return (
        <>
        <div className='errorDiv'>
            <h1>404 Error!! City Not Found!!</h1>
            <h3> The city you are searching isn't avaliable</h3>
            <div>
                <img src="https://cdn.dribbble.com/users/722246/screenshots/3066818/404-page.gif" alt="Error" />
            </div>
            {/* <Link to='/'><button>GO TO HOME</button></Link> */}
            <button onClick={handleGoBack} className='goBackBtn'>Go Back</button>
        </div>
        </>
        
    ) 
}
