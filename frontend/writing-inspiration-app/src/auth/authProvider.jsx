// src/context/AuthProvider.jsx
import { createContext, useContext, useEffect, useState } from "react";
import supabase from "../config/supabaseClient";
import authService from "./authService";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // get initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        await authService.ensureUserRecord(session.user);
        setUser(session.user);
      }
      setLoading(false);
    });

    // subscribe to changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN" && session?.user) {
          await authService.ensureUserRecord(session.user);
          setUser(session.user);
        }
        if (event === "SIGNED_OUT") {
          setUser(null);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
