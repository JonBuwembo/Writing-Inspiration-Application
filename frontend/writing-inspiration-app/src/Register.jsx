import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
//import './App.css'
import './Register.jsx'
import './Register.css'
import './LoginPage.jsx'


function Register() {
    //All fields here are required to be entered.
    const [firstName, setFirstName] = useState({ value: "", isTouched: false });
    const [lastName, setLastName] = useState({ value: "", isTouched: false });
    const [password, setPassword] = useState({ value: "", isTouched: false });
    const [username, setUsername] = useState({ value: "", isTouched: false });
    const [email, setEmail] = useState({ value: "", isTouched: false });

    const [isValidEmail, setIsValidEmail] = useState(false);
    const [isValidPassword, setIsValidPassword] = useState(false);
    const [isValidUsername, setIsValidUsername] = useState(false);

    const validatePassword = (password) => {
        const minimumLength = 10;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasNumbers = /[0-9]/.test(password);
        const hasSymbols = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);

        // Check if all conditions are true
        const isValid = password.length >= minimumLength && hasUpperCase && hasLowerCase && hasNumbers && hasSymbols;

        setIsValidPassword(isValid);

    }

    const validateEmail = (email) => {
        
        const isValid = String(email)
                .toLowerCase()
                .match(
                    // check if email matches regular expression
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                )
        
        // updates the state variable for email validation
        setIsValidEmail(!!isValid);
        return !!isValid;
    }

    const validateUsername = (username) => {
        // a username can contain number, symbols, and letters.
        // it just needs to have a minimum length of 3 characters and contain letters.

        const minimumLength = 3;
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);

        const isValid = username.length >= minimumLength && (hasUpperCase || hasLowerCase);

        setIsValidUsername(isValid);
        return isValid;
    }

    const validateRegistration = () => {
        return (firstName.value.trim() && lastName.value.trim() && validateEmail(email) && validatePassword(password) && validateUsername(username))
    }

    const clearForm = () => {
        setFirstName({ value: "", isTouched: false });
        setLastName({ value: "", isTouched: false });
        setPassword({ value: "", isTouched: false });
        setUsername({ value: "", isTouched: false });
        setEmail({ value: "", isTouched: false });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateRegistration()) {
            alert("Account has been created!")
            clearForm();
        } else {
            alert("Please complete all required fields correctly!")
        }
    }

    return (
        
        <div className='registration'>
            <form onSubmit={handleSubmit}>
                <fieldset>
                    <h1> IdeaFind </h1>
                    <h2> Sign up to see the latest uploads of what creators have been working on!</h2>

                    <div className="field" style={{position: 'relative', height:'80px'}}>
                        
                        <input id="firstName" value={firstName.value} 
                        onChange={(e) => setFirstName({...firstName, value: e.target.value})}
                        onBlur={(e) => setFirstName({...firstName, isTouched: true})}
                        placeholder="Firstname" />
                        {firstName.isTouched && firstName.value === "" && (<p className="error-style">Please enter first name. </p>)}
                    </div>

                    <div className= "field" style={{position: 'relative', height:'80px'}}>
                        
                        <input id="lastName" value={lastName.value} 
                        onChange={(e)=> setLastName({...lastName, value: e.target.value})} 
                        onBlur={(e) => setLastName({...lastName, isTouched: true})} 
                        placeholder='Lastname' />
                        {lastName.isTouched && lastName.value === "" && (<p className= "error-style">Please enter last name. </p>)}
                    </div>

                    <div className="field" style={{position: 'relative', height:'80px'}}>
                        
                        <input id="username" value={username.value} 
                        onChange={(e)=> setUsername({...username, value: e.target.value})} 
                        onBlur={(e) => setUsername({...username, isTouched: true})} 
                        placeholder='Username' />
                        {username.isTouched && !isValidUsername && (<p className="error-style"> Please enter at least 3 letters in your username. You can include numbers and symbols. </p>)}
                    </div>

                    <div className="field" style={{position: 'relative', height:'80px'}}>
                   
                        <input id="password" value={password.value} 
                        onChange={(e)=> setPassword({...password, value: e.target.value})} 
                        onBlur={(e) => setPassword({...password, isTouched: true})} 
                        placeholder='Password' />

                        {password.isTouched && !isValidPassword && (
                            <p className='error-style'>
                            
                                Please enter password of at least: 8 letters, a Capital, a lowercase, a number, a symbol. 
                            </p>
                        )}

                    </div>

                    <div className='field'  style={{position: 'relative', height:'80px'}}>
                      
                        <input id="email" value={email.value} 
                        onChange={(e)=> setEmail({...email, value: e.target.value})} 
                        onBlur={(e) => setEmail({...email, isTouched: true})} 
                        placeholder='Email' /> 
                        {email.isTouched && !isValidEmail && (<p className='error-style'>Please enter a valid email address.</p>)}
                    </div>

                   
                </fieldset>
                <button type="submit"> Register</button>
                
                
                

            </form>


        </div>
        
    )
}

export default Register