import { Button } from "@mantine/core";
import { TbBuildingSkyscraper } from "react-icons/tb";

import useStore from "../State/ZustandStore";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

import Toastify from 'toastify-js';
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();
    const setLoggedin = useStore((state: any) => state.setLoggedin);
    const setUserProfile = useStore((state: any) => state.setUserProfile);

    async function getGuestData() {

        const randomId = crypto.randomUUID();
        const url = `https://api.dicebear.com/10.x/glyphs/svg?seed=${randomId}`;

        try {
            const response = await fetch(url);

            if (!response.ok) {
                return Error;
            }

            setUserProfile({
                id: 0,
                name: 'Guest',
                signin_method: 'Guest Account',
                email: 'Guest@guest.com',
                password: null,
                email_verified: 'false',
                picture: url,
            });
        }

        catch (error) {
            console.log(error);
        }

    }
    getGuestData();


    const handleGuestAccount = () => {

        setLoggedin(true);


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
                            onSuccess={(credentialResponse: CredentialResponse) => {
                                if (credentialResponse.credential) {
                                    const decoded = jwtDecode(credentialResponse.credential);

                                    console.log(decoded);

                                    setUserProfile({
                                        ...decoded,
                                        signin_method: 'Signed in with google',
                                    });

                                } else {
                                    console.error('No credential returned');
                                }
                                setLoggedin(true);
                                navigate("/Profile");
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