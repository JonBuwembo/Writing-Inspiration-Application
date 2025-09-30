// src/context/AuthProvider.jsx
import { createContext, useContext, useMemo, useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import authService from "./authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  // start in loading state until we verify session
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  
  useEffect(() => {
    // get initial session
    const getSession = async () => {
      try {
        const res = await supabase.auth.getSession();
        const session = res?.data?.session ?? null;

        if (session && session.user) {
          // ensure profile exists, but don't let errors prevent loading from finishing
          try {
            await authService.ensureUserRecord(session.user);
          } catch (err) {
            console.error('ensureUserRecord failed during initial session check', err);
          }
          setUser(session.user);
          setSession(session);
        } else {
          setUser(null);
          setSession(null);
        }
       
      } catch (error) {
        console.error("Custom Error: Error fetching session: ", error);
      } finally {
        setLoading(false); // calls this no matter what
      }
      
    };

    getSession();

    // subscribe to changes (defensive about return shape)
    const subRes = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          try {
            await authService.ensureUserRecord(session.user);
            setUser(session.user);
            setSession(session);
            console.log("user is signed in");
            
          } catch (error) {
            console.error("Failed to ensure user record", error);
          }
        } else if (event === "SIGNED_OUT") {
          setUser(null);
          setSession(null); // session cleared
        }
        setLoading(false); // called on auth state change.
      }
    );

    const subscription = subRes?.data?.subscription ?? null;

    // Safety fallback: if neither session nor auth change resolves in 7s, stop loading
    const fallback = setTimeout(() => {
      if (loading) {
        console.warn('AuthProvider fallback: clearing loading after timeout');
        setLoading(false);
      }
    }, 7000);

    return () => {
      clearTimeout(fallback);
      if (subscription && typeof subscription.unsubscribe === 'function') {
        subscription.unsubscribe();
      }
    };
  }, []);

  // memoizing user, session, and loading to prevent reload every time new user added.
  const value = useMemo(() => ({user, session, loading}), [user, session, loading]);

  
  return <AuthContext.Provider value={value}> {children} </AuthContext.Provider>;
}

export default AuthProvider;

export function useAuth() {
  return useContext(AuthContext);
}