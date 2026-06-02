import { Button } from "@mantine/core";
import { useState } from "react";
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";
import { BsBookmark, BsMoonFill, BsPerson } from "react-icons/bs";
import { MdAccountCircle } from "react-icons/md";
import { PiSunFill } from "react-icons/pi";
import { TbBlocks, TbBuildingSkyscraper } from "react-icons/tb";
import { NavLink } from "react-router-dom";

import { Tooltip } from "@mantine/core";
import useStore from "../State/ZustandStore";

interface SidebarProps {

    toggleLight: React.MouseEventHandler<HTMLButtonElement>;
    isLightOn: Boolean;
}

function Sidebar({ isLightOn, toggleLight }: SidebarProps) {

    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

    const isLoggedin = useStore((state: any) => state.isLoggedIn);
    const userProfile = useStore((state: any) => state.userProfile);

    const CollapseSidebar = () => {

        setSidebarCollapsed(prevState => !prevState);
        console.log(sidebarCollapsed);
    }

    return (
        <section className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
            <div className={sidebarCollapsed ? 'sidebar-icon-collapsed' : 'sidebar-icon'}>
                {sidebarCollapsed ?
                    <div className='sidebar-logo-collapsed'>
                        <TbBuildingSkyscraper />
                    </div>
                    :
                    <div className="sidebar-title">
                        <span className='sidebar-logo'>
                            <TbBuildingSkyscraper />
                        </span>
                        <div className="title">
                            Jobs Tracker
                        </div>
                    </div>
                }
            </div>

            <div className="profile-sidebar">
                <div className="profile-pic">
                    <BsPerson />
                </div>
                {isLoggedin ? <span className="username">
                    {sidebarCollapsed ? <> </> : <>{userProfile.username}</>}
                </span>
                    :
                    <>
                    </>
                }
            </div>

            <div className="sidebar-links">

                {isLoggedin ?

                    <Tooltip label="Profile" position="right" color="teal.7" transitionProps={{ transition: 'fade-right', duration: 300 }}>
                        <NavLink to="/Profile" className="sidebar-link">

                            <MdAccountCircle />
                            <span className={sidebarCollapsed ? "display-none" : ""}>Profile</span>

                        </NavLink>
                    </Tooltip>
                    :
                    <Tooltip label="Profile" position="right" color="teal.7" transitionProps={{ transition: 'fade-right', duration: 300 }}>
                        <NavLink to="/Login" className="sidebar-link">

                            <MdAccountCircle />
                            <span className={sidebarCollapsed ? "display-none" : ""}>Sign in</span>
                        </NavLink>
                    </Tooltip>
                }

                <Tooltip label="Dashboard" position="right" color="teal.7" transitionProps={{ transition: 'fade-right', duration: 300 }}>

                    <NavLink to="/" className="sidebar-link">
                        <TbBlocks />
                        <span className={sidebarCollapsed ? "display-none" : ""}> Dashboard  </span>

                    </NavLink>
                </Tooltip>


                {isLoggedin ?
                    <Tooltip label="Your Jobs" position="right" color="teal.7" transitionProps={{ transition: 'fade-right', duration: 300 }}>

                        <NavLink to="YourJobs" className="sidebar-link">
                            <BsBookmark />
                            <span className={sidebarCollapsed ? "display-none" : ""}> Your Jobs </span>
                        </NavLink>
                    </Tooltip>
                    :
                    <>
                        <Tooltip label="Your Jobs" position="right" color="teal.7" transitionProps={{ transition: 'fade-right', duration: 300 }}>

                            <NavLink to="/Login" className="sidebar-link">
                                <BsBookmark />
                                <span className={sidebarCollapsed ? "display-none" : ""}> Your Jobs </span>
                            </NavLink>
                        </Tooltip>
                    </>
                }
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