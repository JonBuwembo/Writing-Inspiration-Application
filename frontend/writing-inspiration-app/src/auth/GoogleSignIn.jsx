import supabase from '../config/supabaseClient';
import {signInWithGoogle} from './authService';

export default function GoogleSignIn() {
    const handleLogin = async () => {
        const {error} = await supabase.auth.signInWithOAuth({
            provider: 'google',
            option: {
                redirectTo: window.location.origin + '/auth/callback'
            }
        })
        if (error) console.error(error)
    }

    return (
        <button onClick={signInWithGoogle} className="google-btn">
            <img src="/google-icon.svg" alt="Google" />
            Sign in with Google
        </button>
    )
}


