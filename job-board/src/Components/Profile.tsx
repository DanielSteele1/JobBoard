
import "../Profile.css";
import { MdAlternateEmail, MdLogout } from 'react-icons/md';
import Toastify from 'toastify-js';
import useStore from "../State/ZustandStore";
import { useNavigate } from 'react-router-dom';
import { BsFillBookmarkFill, BsGoogle } from 'react-icons/bs';

import { googleLogout } from '@react-oauth/google';
import { IoPersonCircleOutline } from 'react-icons/io5';
import NotFound from './NotFound';

import { Button } from '@mantine/core';

function Profile() {

  const navigate = useNavigate();
  const appliedJobs = useStore((state: any) => state.appliedJobs || [] );
  const savedJobs = useStore((state: any) => state.savedJobs || []);
  const interviewingJobs = useStore((state: any) => state.interviewingJobs || []);
  const offers = useStore((state: any) => state.offers || []);

  const userProfile = useStore((state: any) => state.userProfile);

  const setLoggedin = useStore((state: any) => state.setLoggedin);
  const setUserProfile = useStore((state: any) => state.setUserProfile);

  const isLoggedin = useStore((state: any) => state.isLoggedIn);

  const isGuest = useStore((state: any) => state.isGuest);
  const setGuest = useStore((state: any) => state.setGuest);

  // if the user selected guest, wipe localstorage, and start fresh
  // users will be notified of this change when they logout as guest.

  const handleLogout = () => {

    setLoggedin(false);
    setGuest(false);
    googleLogout();

    setUserProfile({
      sub: '',
      name: '',
      given_name: '',
      email: '',
      signin_method: '',
      email_verified: false,
      picture: '',
    });

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

  if (!isLoggedin && !isGuest) {
    return (
      <NotFound />
    )
  }

  return (
    <section className="Profile-container">
      <div className="profile-header">
        <img
          src={userProfile.picture}
          className="profile-avatar"
          onError={(e) => {

            // if an error occurs while fetching a pfp (like error 429, get a dicebear randomly generated placehoder instead)
            e.currentTarget.src = `https://api.dicebear.com/10.x/glyphs/svg?seed`;

          }}>
        </img>
        <div className="profile-info">
          <h1 className="profile-username">
            Welcome back, {userProfile.name}
          </h1>

          <h1 className="profile-id">
            {isGuest ? <IoPersonCircleOutline /> : <BsGoogle />}
            {userProfile.signin_method}
          </h1>

          <h1 className="profile-email">
            <MdAlternateEmail /> {userProfile.email}
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