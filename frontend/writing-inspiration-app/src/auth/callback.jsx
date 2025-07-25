import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from '../config/supabaseClient';


export default function AuthCallback() {
    const navigate = useNavigate()

    useEffect(() => {
        supabase.auth.onAuthStateChange((event) => {
            if (event === 'SIGNED_IN') navigate('/dashboard')
        })
    }, [])

    return <div>Authenticating ...</div>
}