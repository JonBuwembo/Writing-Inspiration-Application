import { useEffect } from "react";
import supabase from "../config/supabaseClient";
import "./LoginPage.css";
import { useGoogleLogin } from "@react-oauth/google";


export default function GoogleLoginButtons() {
    const loginWithGoogle = useGoogleLogin({
        onSucess: async () => {
            
            try {
                // const userInfo = await fetch(
                //     "https://www.googleapis.com/oauth2/v3/userinfo",
                //     {
                //         headers: {Authorization: `Bearer ${tokenResponse.access_token}`}
                //     }
                // ).then((result) => result.json());

                // console.log("User Info: ", userInfo);
                
                // Send token to supabase for validation
                const {data, error} = await supabase.auth.signInWithIdToken({
                    provider: "google",
                    options: {
                        redirectTo: 'https://spxqzbreozpnsniujyyb.supabase.co/auth/v1/callback'
                    }
                });

                if (error) throw error;

                console.log("Logged in user:", data.user);
            } catch (error) {
                console.error("Login failed:", error);
            }
        },
        
        onError: (error) => console.error("Login failed", error),
        flow: 'implicit', //use popup flow
        scope: 'openid email profile' // ensures id_token is returned
    });
  
//   useEffect(() => {
//     // Load Google Identity Services script
//     const script = document.createElement("script");
//     script.src = "https://accounts.google.com/gsi/client";
//     script.async = true;
//     script.defer = true;
//     document.body.appendChild(script);

//     return () => document.body.removeChild(script);
//   }, []);

//   const handleCredentialResponse = async (response) => {
//     try {
//       const { data, error } = await supabase.auth.signInWithIdToken({
//         provider: "google",
//         id_token: response.credential, // comes from Google One Tap
//       });

//       if (error) throw error;

//       console.log("Logged in user:", data.user);
//       window.location.href = "/profile";
//     } catch (err) {
//       console.error("Google login failed", err);
//     }
//   };

//   const handleGoogleLogin = () => {
//     if (!window.google) {
//       console.error("Google API not loaded yet.");
//       return;
//     }

//     // Initialize Google Identity Services
//     window.google.accounts.id.initialize({
//       client_id: "173883313635-c3qhml5k8th9u5pflu7c1ea4lpbqen2q.apps.googleusercontent.com",
//       callback: handleCredentialResponse,
//     });

//     // Trigger the Google One Tap / popup
//     window.google.accounts.id.prompt(); 
//   };

  return (
    <button className="google-button" onClick={loginWithGoogle}>
      <img
        src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
        alt="Google Logo"
        className="google-logo"
      />
      Continue with Google
    </button>
  );
}
