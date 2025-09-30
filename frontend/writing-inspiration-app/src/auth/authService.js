import supabase from '../config/supabaseClient.js';


// Auth Services is a module I created that contains functions for user authentication.
// It includes functions for registering, logging in, and logging out users, which was implemented by supabase.
// This module uses Supabase for authentication and handles errors appropriately.
export const authService = {


    async loginWithPassword(email, password) {
        console.log("Got into the loginWithPassword function");
        console.log("Attempting signInWithPassword for:", email);
        console.log("Right before supabase sign in ");

        const {data, error} = await supabase.auth.signInWithPassword({
            email: email,
            password: password,
        })

        console.log("After supabase sign in");

        if (error) {
            console.error('Supabase / proxy returned error during signInWithPassword:', error);
            throw error;
        }

        if (!data || !data.user) {
            console.error('signInWithPassword did not return a user object', { data });
            throw new Error('No user returned from signInWithPassword');
        }

        console.log('User from sign-in:', data.user);
        return await authService.ensureUserRecord(data.user);
        
    },

    async signInWithGoogle() {
        const {data: authData, error: authError } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/profile` // redirect flow instead of popup (avoid cross-origin)
            }
        });
        
        if (authError) throw authError;
        return await authService.ensureUserRecord(authData.user);

       
    },
    
    async ensureUserRecord(authUser) {
        const { data: user, error } = await supabase
            .from("app_users")
            .select("*")
            .eq("id", authUser.id)
            .single();
        
        if (user) return user;

        // If no profile exists...
        // check if the user manually tried to login. In this case they need to register.
        if (authUser.app_metadata.provider === "email") {
            throw new Error("No user profile found. Please register first.")
        }

        // if it was through google, automatically create user data for them.
        if (authUser.app_metadata.provider === "google") {
            const {data: newUser, error: insertError} = await supabase
                .from('app_users')
                .insert([{
                    id: authUser.id,
                    email: authUser.email,
                    first_name: authUser.user_metadata?.full_name?.split(" ")[0] || "",
                    last_name: authUser.user_metadata?.full_name?.split(" ")[1] || ""
                }])
                .single();
            
            if (insertError) throw insertError;
            return newUser;
        }
    },

    async logoutUser() {
        const { error } = await supabase.auth.signOut();

        if (error) {
            console.error('Logout error:', error);
            throw error;
        }

        return true;
    }
}

export default authService;