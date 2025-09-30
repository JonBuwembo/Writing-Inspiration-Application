// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import supabase from '../config/supabaseClient.js';


// export default function AuthCallback() {
//     const navigate = useNavigate()

//     useEffect(() => {
//         supabase.auth.onAuthStateChange( async (event, session) => {
//             console.log("We get to the AuthCallback")

//             if (event === 'SIGNED_IN') {
//               navigate('/profile'); // redirect after login
//             }

//             if (event === 'SIGNED_UP') {
//                 const user = session.user;

//                 // Check if already in your `users` table
//                 const { data, error } = await supabase
//                 .from('app_users')
//                 .select('id')
//                 .eq('id', user.id)
//                 .single();

//                 if (!data && !error) {
//                     // Insert new user profile
//                     await supabase.from('app_users').insert([
//                         {
//                           id: user.id,
//                           email: user.email,
//                           username: user.user_metadata.username, 
//                           first_name: user.user_metadata.firstName,
//                           last_name: user.user_metadata.lastName,
//                           created_at: new Date().toISOString(),
//                           updated_at: new Date().toISOString(),
//                         },
//                     ]);
//                 }

//             }
//         })
//     }, [])

//     return <div>Authenticating ...</div>
// }