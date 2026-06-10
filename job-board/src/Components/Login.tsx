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

    const handleGuestAccount = () => {

        setLoggedin(true);
        setUserProfile({
            id: 0,
            username: 'Guest',
            password: null,
        });

        Toastify({

            text: 'Sucsessfully Logged in as guest - reloading...',
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