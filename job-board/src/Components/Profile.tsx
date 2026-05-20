
import { Button, Input, PasswordInput } from '@mantine/core';
import "../Profile.css";
import { IoAt, IoPersonCircle } from 'react-icons/io5';


function Profile() {


  return (

    <section className="Profile-container">

      <div className="Profile">
        <div className="profile-heading">
          Name
        </div>

        <div className="profile-pic">
          <IoPersonCircle />
        </div>

      </div>

      <div className="profile-details-container">
        <form className="profile-details">

          <div className="details-top">

            <Input
              type="email"
              leftSection={<IoAt size="16" />}
              placeholder="Input an Email Address"
            
            >
            </Input>

            <PasswordInput>
            </PasswordInput>

          </div>

          <div className="details-bottom">

            <Button
              value="logout"
              color="teal.7">
              Log out
            </Button>
          </div>


        </form>
      </div>

    </section>
  )
}

export default Profile;