import { BiMoon } from "react-icons/bi";
import { BsPerson } from "react-icons/bs";
import { TbBlocks, TbSun } from "react-icons/tb";

interface NavProps {

    toggleLight: React.MouseEventHandler<HTMLDivElement>;
    isLightOn: Boolean;
}

function Navigation({isLightOn, toggleLight}: NavProps) {

    return (

        <section className="Navigation">

            <div className="nav-icon">
                Dan's Job Board
            </div>

            <div className="nav-sections">

                <div className="nav-link">
                    <TbBlocks/> Dashboard
                </div>
                <div className="nav-link">
                    <BsPerson/> Login
                </div>  
                <div className="nav-link" onClick={toggleLight}>
                
                   {isLightOn ? <TbSun /> : <BiMoon/>}

                </div>
            </div>


        </section>
    )
}

export default Navigation;
