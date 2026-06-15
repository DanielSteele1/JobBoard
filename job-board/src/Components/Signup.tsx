import { Button } from "@mantine/core";
import { TbBuildingSkyscraper } from "react-icons/tb";
import useStore from "../State/ZustandStore";
import { Link } from "react-router-dom";

function Signup() {

    const isLoggedIn = useStore((state: any) => state.isLoggedIn);
    const userProfile = useStore((state: any) => state.userProfile);

    return (
        <section className="Signup-container">
            <div className="signup">
                <div className='sidebar-icon-mobile'>

                    <div className="sidebar-title">
                        <span className='sidebar-logo'>
                            <TbBuildingSkyscraper />
                        </span>

                        <div className="title">
                            Jobs Tracker
                        </div>
                    </div>
                </div>

                {isLoggedIn ?

                    <div className="profile-topbar">
                            <img
                                src={userProfile.picture}
                                className="profile-pic-topbar">
                            </img>

                        <div className="username-topbar">
                            {userProfile.name}
                        </div>
                    </div>
                    :
                    <Link to="/Login">
                        <Button
                            color='teal.7'
                        >
                            Sign in
                        </Button>
                    </Link>
                }

            </div>

        </section>
    )
}

export default Signup;