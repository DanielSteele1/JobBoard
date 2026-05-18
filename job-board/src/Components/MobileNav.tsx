import { BiBookmark } from "react-icons/bi";
import { MdAccountCircle } from "react-icons/md";
import { TbBlocks } from "react-icons/tb";
import { Link } from "react-router-dom";

function mobileNav() {

  return (

    <section className="mobileNav">

      <div className="nav-mobile-link">
        <Link to="/Profile">
          <span>
            <MdAccountCircle />
            Profile
          </span>
        </Link>
      </div>

      <div className="nav-mobile-link">
        <Link to="/">
          <span>
            <TbBlocks />
            Dashboard
          </span>

        </Link>

      </div>

      <div className="nav-mobile-link">
        <Link to="/YourJobs">
          <span>
            <BiBookmark />
            Your Jobs
          </span>

        </Link>
      </div>


    </section>
  )
}

export default mobileNav;
