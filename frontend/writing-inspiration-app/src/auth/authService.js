import supabase from '../config/supabaseClient.js';

// Auth Services is a module I created that contains functions for user authentication.
// It includes functions for registering, logging in, and logging out users, which was implemented by supabase.
// This module uses Supabase for authentication and handles errors appropriately.
export const authService = {


    // async registerUser(email, password, username, firstName, lastName) {
    //     const { data, error } = await supabase.auth.signUp({
    //         email,
    //         password,
    //         options: {
    //             data: {
    //                 username,
    //                 first_name: firstName,
    //                 last_name: lastName,
    //             }
    //         }
    //     }); 

    //     if (error) {
    //         console.error('Registration error:', error);
    //         throw error;
    //     }

    //     const {data: userData, error: userError} = await supabase
    //         .from('Users')
    //         .insert(
    //             {
    //                 id: data.user.id, // Use the ID from the auth response
    //                 created_at: new Date().toISOString(), // Set the created_at field to the current date
    //                 updated_at: new Date().toISOString(), // Set the updated_at field to the current
    //                 first_name: firstName.toString(),
    //                 last_name: lastName.toString(),
    //                 email: email.toString(),
    //                 username: username.toString(),
    //                 // Set the updated_at field to the current date
    //             }
    //         )
    //         .select();

        
    //     if (userError) {
    //         console.error('Full insertion error:', {
    //             message: userError.message,
    //             details: userError.details,
    //             hint: userError.hint,
    //             code: userError.code
    //         });
    //         throw userError;
    //     }

    //     return userData;
    // },

    async loginWithPassword(email, password) {
        const {data: authData, error: authError} = await supabase.auth.signInWithPassword(
            {
                email,
                password
            }
        );

        if (authError) throw authError;
        return await ensureUserRecord(authData.user);
    },

    async signInWithGoogle() {
        const {data: authData, error: authError } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback` // redirect flow instead of popup (avoid cross-origin)
            }
        });
        
        if (authError) throw authError;

       
    },
    
    async ensureUserRecord(authUser) {
        const { data: user, error } = await supabase
            .from("users")
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
                .from('users')
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