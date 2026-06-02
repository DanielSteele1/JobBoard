import { BiBookmark } from "react-icons/bi";
import { MdAccountCircle } from "react-icons/md";
import { TbBlocks } from "react-icons/tb";
import { Link } from "react-router-dom";
import useStore from "../State/ZustandStore";
import { BsFillBookmarkFill } from "react-icons/bs";

function mobileNav() {

  const isLoggedIn = useStore((state: any) => state.isLoggedin);

  return (

    <section className="mobileNav">

      <div className="nav-mobile-link">
        {isLoggedIn ? <Link to="/Profile">
          <span>
            <MdAccountCircle />
          </span>
        </Link>
          :
          <Link to="/Login">
            <span>
              <MdAccountCircle />
            </span>
          </Link>
        }
      </div>

      <div className="nav-mobile-link">
        <Link to="/">
          <span>
            <TbBlocks />
          </span>
        </Link>

      </div>

      <div className="nav-mobile-link">
        {isLoggedIn ? <Link to="/Profile">
          <span>
            <BiBookmark />
          </span>
        </Link>
          :
          <Link to="/Login">
            <span>
              <BsFillBookmarkFill />
            </span>
          </Link>
        }
      </div>

    </section>
  )
}

export default mobileNav;
