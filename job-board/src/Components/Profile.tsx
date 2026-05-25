
import { Button, TextInput } from '@mantine/core';
import "../Profile.css";
import { IoPersonCircle } from 'react-icons/io5';
import { CgProfile } from 'react-icons/cg';

import useStore from "../State/ZustandStore";

function Profile() {

  const appliedJobs = useStore((state: any) => state.appliedJobs);
  const savedJobs = useStore((state: any) => state.savedJobs);


  return (

    <section className="Profile-container">

      <div className="Profile">
        <div className="profile-picture">
          <IoPersonCircle />
        </div>
        <div className="profile-heading">
          Welcome, Daniel Steele
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

          <div className="details-top">

            <div className="username">
              <TextInput type="email" label="Username" />
            </div>

            <div className="email">
              <TextInput label="Email" />
            </div>

          </div>

          <div className="details-bottom">

            <Button
              value="logout"
              color="teal.7"
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