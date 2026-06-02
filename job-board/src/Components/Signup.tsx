import { Button } from "@mantine/core";
import { TbBuildingSkyscraper } from "react-icons/tb";


function Signup() {

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

                <Button
                    color='teal.7'
                >
                    Sign up
                </Button>
            </div>

        </section>
    )
}

export default Signup;