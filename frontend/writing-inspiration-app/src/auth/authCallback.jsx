import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase  from "../config/supabaseClient.js";
import { authService } from "./authService.js"; // your ensureUserRecord logic

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    const { data: {subscription}, } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
            await authService.ensureUserRecord(session.user);
            navigate('/profile');
        }

        if (event === "SIGNED_OUT") {
            navigate("/login");
        }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);
  
  return <p>Finishing sign-in...</p>;
}