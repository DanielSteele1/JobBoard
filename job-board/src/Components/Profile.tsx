
import { Button } from '@mantine/core';
import "../Profile.css";
import { IoPersonCircle } from 'react-icons/io5';
import { MdLogout } from 'react-icons/md';
import Toastify from 'toastify-js';
import useStore from "../State/ZustandStore";
import { useNavigate } from 'react-router-dom';
import { BsFillBookmarkFill } from 'react-icons/bs';

 import {googleLogout} from '@react-oauth/google';

function Profile() {

  const navigate = useNavigate();
  const appliedJobs = useStore((state: any) => state.appliedJobs);
  const savedJobs = useStore((state: any) => state.savedJobs);
  const interviewingJobs = useStore((state: any) => state.interviewingJobs);
  const offers = useStore((state: any) => state.offers);

  const userProfile = useStore((state: any) => state.userProfile);

  const setLoggedin = useStore((state: any) => state.setLoggedin);
  const setUserProfile = useStore((state: any) => state.setUserProfile);

  const handleLogout = () => {

    setLoggedin(false);
    googleLogout();
    setUserProfile({ id: '', username: '', password: null });

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
      <div className="profile-header">
        <div className="profile-avatar">
          <IoPersonCircle />
        </div>
        <div className="profile-info">
          <h1 className="profile-username">
            {userProfile.username}
          </h1>
        </div>

        <div className="profile-actions">
          <Button
            className="logout-button"
            onClick={handleLogout}
            leftSection={<MdLogout />}
          >
            Sign Out
          </Button>
        </div>
      </div>

      <div className="profile-stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📰</div>
          <div className="stat-content">
            <div className="stat-number">{appliedJobs.length}</div>
            <div className="stat-label">Applications</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon"> <BsFillBookmarkFill /> </div>
          <div className="stat-content">
            <div className="stat-number">{savedJobs.length}</div>
            <div className="stat-label">Saved Jobs</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">💬</div>
          <div className="stat-content">
            <div className="stat-number">{interviewingJobs.length}</div>
            <div className="stat-label">Interviewing</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🎉</div>
          <div className="stat-content">
            <div className="stat-number">{offers.length}</div>
            <div className="stat-label">Offers</div>
          </div>
        </div>
      </div>

    </section>
  )
}

export default Profile;