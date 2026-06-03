import { Button } from "@mantine/core";
import { TbBuildingSkyscraper } from "react-icons/tb";

import useStore from "../State/ZustandStore";

import Toastify from 'toastify-js';
import { useNavigate } from "react-router-dom";

function Login() {

    const navigate = useNavigate();
    const setLoggedin = useStore((state: any) => state.setLoggedin);
    const setUserProfile = useStore((state: any) => state.setUserProfile);

    const handleGuestAccount = () => {

        setLoggedin(true);
        setUserProfile({
            id: '0',
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

                    <script src="https://accounts.google.com/gsi/client" async></script>
                    <div id="g_id_onload"
                        data-client_id="443657157960-8234ddl3ntqkijughsu06g6bepv4gj8u.apps.googleusercontent.com"
                        data-login_uri="http://localhost:5173/Profile"
                        data-auto_prompt="false">
                    </div>

                    <div className="g_id_signin"
                        data-type="standard"
                        data-size="large"
                        data-theme="outline"
                        data-text="sign_in_with"
                        data-shape="rectangular"
                        data-logo_alignment="right">
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