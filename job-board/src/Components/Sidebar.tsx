import { Button } from "@mantine/core";
import { useState } from "react";
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";
import { BsBookmark, BsMoonFill, BsPerson } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";
import { PiSunFill } from "react-icons/pi";
import { TbBlocks } from "react-icons/tb";
import { Link } from "react-router-dom";

import { Tooltip } from "@mantine/core";

interface SidebarProps {

    toggleLight: React.MouseEventHandler<HTMLButtonElement>;
    isLightOn: Boolean;
}

function Sidebar({ isLightOn, toggleLight }: SidebarProps) {

    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const CollapseSidebar = () => {

        setSidebarCollapsed(prevState => !prevState);
        console.log(sidebarCollapsed);
    }

    return (

        <section className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>

            <div className="sidebar-icon">
                {sidebarCollapsed ? <></> : <span> <span id="highlight"> Stride </span> <span> Jobs </span> </span>}
            </div>

            <div className="profile-sidebar">
                <div className="profile-pic">
                    <BsPerson />
                </div>
            </div>

            <div className="sidebar-links">
                <span className={sidebarCollapsed ? "display-none" : "sidebar-heading"}>  Sections  </span>

                <Tooltip label="Profile" position="right" color="teal.7" transitionProps={{ transition: 'fade-right', duration: 300 }}>
                    <Link to="/Profile" className="sidebar-link">

                        <MdAccountCircle />
                        <span className={sidebarCollapsed ? "display-none" : ""}>Profile</span>

                    </Link>
                </Tooltip>

                <Tooltip label="Dashboard" position="right" color="teal.7" transitionProps={{ transition: 'fade-right', duration: 300 }}>

                    <Link to="/" className="sidebar-link">
                        <TbBlocks />
                        <span className={sidebarCollapsed ? "display-none" : ""}> Dashboard  </span>

                    </Link>
                </Tooltip>

                <Tooltip label="Your Jobs" position="right" color="teal.7" transitionProps={{ transition: 'fade-right', duration: 300 }}>

                    <Link to="YourJobs" className="sidebar-link">
                        <BsBookmark />
                        <span className={sidebarCollapsed ? "display-none" : ""}> Your Jobs </span>

                    </Link>
                </Tooltip>
            </div>

            <div className="sidebar-buttons">

                <Button onClick={CollapseSidebar} className="collapse-button" color="teal.7">
                    {sidebarCollapsed ? <BiArrowToRight /> : <BiArrowToLeft />}
                </Button>

                {sidebarCollapsed ?
                    <div className="display-none"></div>
                    : <Button className="theme-button" color="teal.7" onClick={toggleLight}>
                        {isLightOn ? <PiSunFill /> : <BsMoonFill />}
                    </Button>}
            </div>

        </section >

    )


}
export default Sidebar;