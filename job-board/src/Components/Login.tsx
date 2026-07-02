import { Button } from "@mantine/core";
import { TbBuildingSkyscraper } from "react-icons/tb";

import useStore from "../State/ZustandStore";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

import Toastify from 'toastify-js';
import { useNavigate } from "react-router-dom";
import { supabase } from "./Supabase.ts";

function Login() {

    const navigate = useNavigate();
    const setLoggedin = useStore((state: any) => state.setLoggedin);
    const setUserProfile = useStore((state: any) => state.setUserProfile);

    const setGuest = useStore((state: any) => state.setGuest);

    const handleGuestAccount = () => {

        async function getGuestData() {

            const guestId = typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
                ? crypto.randomUUID()
                : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
            const url = `https://api.dicebear.com/10.x/glyphs/svg?seed=${guestId}`;

            try {
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error('Failed to load guest avatar');
                }

                setUserProfile({
                    id: guestId,
                    name: 'Guest',
                    signin_method: 'Guest Account',
                    email: 'Guest@guest.com',
                    password: null,
                    email_verified: false,
                    picture: url,
                });

            }

            catch (error) {
                console.log(error);
            }

        }

        getGuestData();
       
        setGuest(true);

        Toastify({

            text: 'Sucsessfully Logged in as guest.',
            duration: 2000,
            gravity: 'bottom',
            position: 'right',
            stopOnFocus: true,
            style: {
                display: 'flex',
                bacgkround: 'none !important',
                backgroundColor: "none !important",
                borderRadius: '15px',
                boxShadow: 'none !important',
                color: 'white',
                marginTop: '10px',
            },

        }).showToast();

        navigate('/Profile');
    }

    return (
        <section className="Login">

            <div className="login-backing">

                <div className="login-title">
                    <TbBuildingSkyscraper /> Jobs Tracker
                </div>

                <span className="login-top">
                    Login to access the abillity to save and track your applications.
                </span>

                <form className="login-form">

                    <div className="Google-button">
                        <GoogleLogin
                            onSuccess={async (credentialResponse: CredentialResponse) => {
                                if (credentialResponse.credential) {
                                    const idToken = (credentialResponse.credential);
                                    const decoded = jwtDecode(idToken) as any;

                                    try {

                                        const { data, error } = await supabase.auth.signInWithIdToken({
                                            provider: 'google',
                                            token: idToken,
                                        });

                                        if (error) {
                                            throw new Error;
                                        }

                                        setUserProfile({
                                            ...decoded,
                                            id: data.user.id,
                                            picture: decoded.picture,
                                            supabase_uid: data.user?.id,
                                            signin_method: 'Signed in with google',
                                        });

                                        console.log("User signed up with google.");
                                        console.log("Supabase Connection Sucsessfull");

                                        setLoggedin(true);
                                        navigate("/Profile");

                                    } catch {

                                        console.error('Supabase auth connection faliled', Error);
                                    }

                                } else {
                                    console.error('No credentials returned');
                                }

                            }}

                            onError={() => console.log('Login failed')}
                            useOneTap
                            theme={"outline"}
                            type={'standard'}
                            shape={'pill'}
                            size={'large'}
                            width="300"
                            logo_alignment={'center'}
                        />
                    </div>

                    <span className="divider">
                        or
                    </span>

                    <Button
                        className="guest-button"
                        color="teal.7"
                        onClick={handleGuestAccount}>
                        Create a guest account
                    </Button>
                </form>

            </div>
        </section>
    )
}

export default Login;