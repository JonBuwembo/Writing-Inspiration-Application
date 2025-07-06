import supabase from '../config/supabaseClient.js';

// Auth Services is a module I created that contains functions for user authentication.
// It includes functions for registering, logging in, and logging out users, which was implemented by supabase.
// This module uses Supabase for authentication and handles errors appropriately.
export const authService = {
    async registerUser(email, password, username, firstName, lastName) {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    username,
                    first_name: firstName,
                    last_name: lastName,
                }
            }
        }); 

        if (error) {
            console.error('Registration error:', error);
            throw error;
        }

        const {data: userData, error: userError} = await supabase
            .from('Users')
            .insert(
                {
                    id: data.user.id, // Use the ID from the auth response
                    created_at: new Date().toISOString(), // Set the created_at field to the current date
                    updated_at: new Date().toISOString(), // Set the updated_at field to the current
                    first_name: firstName.toString(),
                    last_name: lastName.toString(),
                    email: email.toString(),
                    username: username.toString(),
                    // Set the updated_at field to the current date
                }
            )
            .select();

        
        if (userError) {
            console.error('Full insertion error:', {
                message: userError.message,
                details: userError.details,
                hint: userError.hint,
                code: userError.code
            });
            throw userError;
        }

        return userData;
    },


    async loginUser(email, password) {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password
        });

        if (error) {
            console.error('Login error:', error);
            throw error;
        }

        return data;
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