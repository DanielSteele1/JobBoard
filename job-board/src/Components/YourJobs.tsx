import useStore from '../State/ZustandStore.tsx';
import { BsBookmarkFill } from 'react-icons/bs';
import { FaChartLine, FaHandshake, FaLocationDot, FaNewspaper } from 'react-icons/fa6';
import { Button } from '@mantine/core';
import { BiBuilding } from 'react-icons/bi';
import { MdDelete } from 'react-icons/md';
import { CiGrid2H, CiGrid41 } from 'react-icons/ci';
import { useState } from 'react';


interface JobType {
  title: string;
  description: string;
  company: {
    display_name: string;
  };
  location: {
    display_name: string;
  };
  redirect_url?: string;
  created: string;
  contract_type?: string;
  salary_min?: number;
  salary_max?: number;
  source?: string;
}

function YourJobs() {

  const appliedJobs = useStore((state: any) => state.appliedJobs as JobType[]);
  const savedJobs = useStore((state: any) => state.savedJobs as JobType[]);
  const setSavedJobs = useStore((state: any) => state.setSavedJobs);

  const [isGrid, setisGrid] = useState(false);
  // const [isSavedGrid, setIsSavedGrid] = useState(false);

  function handleDeleteJob(index: number) {

    setSavedJobs(savedJobs.filter((_: any, i: number) => i !== index));
  }

  function ChangeGridState() {

    setisGrid(true);
    console.log(isGrid);
  }

  // function ChangeSavedGridState() {

  //   setIsSavedGrid(true);
  //   console.log(isSavedGrid);
  // }

  return (
    <section className="YourJobs-container">

      <div className="your-jobs-title">
        <div className="heading">
          <BsBookmarkFill />
          Your Saved Jobs: {savedJobs.length}
        </div>

        <div className="YourJobsButtons">
          <button className="button-grid">
            <CiGrid41 />
          </button>
          <button className="button-rows">
            <CiGrid2H />
          </button>
        </div>
      </div>

      <div className="savedJobs">

        {savedJobs.length === 0 ? (

          <div className="appliedJob-skeleton">

            You haven't saved any jobs yet.

          </div>

        ) : (


          savedJobs.map((job: JobType, index: number) => (
            <div className="savedJob" key={index}>
              <div className="dashboard-card">
                <div className="job-title">{job.title}</div>
                <div className="job-top-details">
                  <div className="job-company_name">
                    <BiBuilding /> {job.company?.display_name}
                  </div>
                  <div className="job-company_name">
                    <FaChartLine /> £{job.salary_max}
                  </div>
                  <div className="job-company_name">
                    <FaHandshake /> {job.contract_type}
                  </div>
                  <div className="job-location">
                    <FaLocationDot /> {job.location?.display_name}
                  </div>
                </div>
                <div className="buttons-tray">
                  <div className="button">
                    <Button
                      className="apply-button"
                      color="teal.7"
                      value="appliedJob"
                    >
                      <a href={job?.redirect_url} target="_blank" rel="noopener noreferrer">
                        <FaNewspaper /> Apply
                      </a>
                    </Button>
                  </div>
                  <div className="button">
                    <Button
                      className="delete-job-button"
                      color="red.9"
                      value="DeleteJob"
                      onClick={() => handleDeleteJob(index)}>
                      <a>
                        <MdDelete /> Remove
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}

      </div>

      <div className="your-jobs-title">
        <div className="heading">
          <FaNewspaper />
          Your Applied Jobs: {appliedJobs.length}
        </div>

        <div className="YourJobsButtons">
          <button className="button-grid"
            onClick={ChangeGridState}>
            <CiGrid41 />
          </button>

          <button className="button-rows"
            onClick={ChangeGridState}>
            <CiGrid2H />
          </button>
        </div>
      </div>

      <div className="appliedJobs">

        {appliedJobs.length === 0 ? (

          <div className="appliedJob-skeleton">

            You haven't applied for any jobs yet.

          </div>
        ) : (
          appliedJobs.map((job: JobType, index: number) => (
            <div className="appliedJob" key={index}>
              <div className="dashboard-card">
                <div className="job-title">{job.title}</div>
                <div className="job-top-details">
                  <div className="job-company_name">
                    <BiBuilding /> {job.company?.display_name}
                  </div>
                  <div className="job-company_name">
                    <FaChartLine /> £{job.salary_max}
                  </div>
                  <div className="job-company_name">
                    <FaHandshake /> {job.contract_type}
                  </div>
                  <div className="job-location">
                    <FaLocationDot /> {job.location?.display_name}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}

      </div>

    </section >
  )
}

export default YourJobs;