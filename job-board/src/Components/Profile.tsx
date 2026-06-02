
import { Button } from '@mantine/core';
import "../Profile.css";
import { IoPersonCircle } from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';

import Toastify from 'toastify-js';
import useStore from "../State/ZustandStore";
import { useNavigate } from 'react-router-dom';

function Profile() {

  const navigate = useNavigate();
  const appliedJobs = useStore((state: any) => state.appliedJobs);
  const savedJobs = useStore((state: any) => state.savedJobs);

  const userProfile = useStore((state: any) => state.userProfile);

  const isLoggedIn = useStore((state: any) => state.isLoggedIn);
  const setLoggedin = useStore((state: any) => state.setLoggedin);

  const handleLogout = () => {

    setLoggedin(false);

    Toastify({

      text: 'Signing you out...',
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

    navigate('/Login');

  }

  return (
    <section className="Profile-container">
      <div className="Profile">
        <div className="profile-picture">
          <IoPersonCircle />
        </div>
        <div className="profile-heading">
          {isLoggedIn ? <span>Welcome, {userProfile.username}</span> : <span> </span>}
        </div>
      </div>

      <div className="profile-details-container">
        <form className="profile-details">

          <div className='stats'>
            <div className="stat">
              <div className="stat-number">
                {appliedJobs.length}
              </div>
              <span className="stat-text">
                📰 Applications sent
              </span>
            </div>
            <div className="stat">
              <div className="stat-number">
                {savedJobs.length}

              </div>
              <span className="stat-text">
                📌 Saved Jobs
              </span>
            </div>
            <div className="stat">
              <div className="stat-number">
                {savedJobs.length}
              </div>
              <span className="stat-text">
                🎉 Interviews
              </span>
            </div>
          </div>

          <div className="details-bottom">

            <Button
              value="logout"
              color="teal.7"
              onClick={handleLogout}
            >
              <CgProfile /> Log out of account
            </Button>
          </div>


        </form>
      </div>

    </section>
  )
}

export default Profile;