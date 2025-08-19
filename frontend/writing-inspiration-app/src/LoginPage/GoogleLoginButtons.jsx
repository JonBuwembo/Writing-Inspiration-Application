import { useEffect, useRef } from "react";
import './LoginPage.css'
export default function GoogleLoginButtons({onLogin}) {

    const divRef = useRef(null);

    // React won't run script tags directly in JSX files.
    // So we need useEffect to load Google scripts in dynamically.
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);

        script.onload = () => {
            window.google.accounts.id.initialize({
                client_id: "173883313635-c3qhml5k8th9u5pflu7c1ea4lpbqen2q.apps.googleusercontent.com",
                callback: handleCredentialResponse,
            });

            window.google.accounts.id.renderButton(divRef.current,
                {
                    theme: "filled_blue", 
                    size: "large", 
                    text: "continue_with", 
                    shape: "pill", 
                    logo_alignment: "left",
                   
                }

            );




        };

        return () => {
            document.body.removeChild(script);
        }
    },[]);

    const handleCredentialResponse = async (response) => {
        console.log("Encoded JWT ID token: " + response.credential);
        try {
            const { data, error } = await supabase.auth.signInWithIdToken({
            provider: 'google',
            idToken: response.credential,
            });
            if (error) throw error;
            console.log('Logged in user:', data.user);
            // Redirect to profile page
            window.location.href = '/profile';
        } catch (err) {
            console.error('Google login failed', err);
        }
        
        if (onLogin) onLogin(response.credential);
    };

    

    return (
        <div>
            
            <div ref={divRef} className="google-login-btn"></div>
        </div>
    )
}
