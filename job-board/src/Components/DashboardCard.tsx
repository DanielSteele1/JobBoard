import { Button, Skeleton } from "@mantine/core";
import { BiBuilding } from "react-icons/bi";
import { BsBookmark, BsBriefcaseFill, BsFillBookmarkFill, BsFillClockFill } from "react-icons/bs";
import { FaChartLine, FaHandshake, FaLocationDot } from "react-icons/fa6";

import Toastify from 'toastify-js';
import "toastify-js/src/toastify.css";

import useStore from "../State/ZustandStore";
import { FaNewspaper } from "react-icons/fa";

interface CardProps {

  jobData: {
    title?: string;
    description?: string;
    company?: {
      display_name?: string;
    };
    location: {
      display_name?: string;
    };
    redirect_url: string;
    created: string;
    contract_type: string;
    salary_max: number;
    source: string;
  }
}

function DashboardCard({ jobData }: CardProps) {

  const isLoading = useStore((state: any) => state.isLoading);
  const appliedJobs = useStore((state: any) => state.appliedJobs);
  const savedJobs = useStore((state: any) => state.savedJobs);

  const setSavedJobs = useStore((state: any) => state.setSavedJobs);
  const setAppliedJobs = useStore((state: any) => state.setAppliedJobs);

  const isAlreadySaved = savedJobs.some((job: any) => job.redirect_url === jobData.redirect_url);

  // add a job + track applied jobs

  const AddAppliedJobs = () => {

    const newApplied = [...appliedJobs, jobData];
    setAppliedJobs(newApplied);

    Toastify({

      text: `Saved job ${jobData.title} at ${jobData.company?.display_name}.`,
      duration: 2000,
      gravity: 'bottom',
      position: 'right',
      stopOnFocus: true,
      style: {
        bacgkround: 'none !important',
        backgroundColor: "none !important",
        borderRadius: '15px',
        boxShadow: 'none !important',
        color: 'white',
        marginTop: '10px',
      },

    }).showToast();

  }


  const AddSavedJobs = () => {

    if (!isAlreadySaved) {

      const newSavedJobs = [...savedJobs, jobData];
      setSavedJobs(newSavedJobs);

      Toastify({

        text: `Saved job ${jobData.title} at ${jobData.company?.display_name}.`,
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

      return;
    }

    Toastify({

      text: `You have already saved ${jobData.title} at ${jobData.company?.display_name}.`,
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
  }

  const JobDate = new Intl.DateTimeFormat('en-GB', {

    dateStyle: 'medium',
    timeStyle: 'short',
    hour12: false

  }).format(new Date(jobData.created));

  return (
    <section>
      {isLoading ?
        <div className="Skeleton">

          <div className="dashboard-card">
            <div className="job-title">

            </div >

            <div className="job-description">
              <Skeleton className="Skeleton" />
            </div>

            <div className="buttons-tray">
              <div className="button">
                <Skeleton className="skeleton-button" />
              </div>

              <div className="button">
                <Skeleton className="skeleton-button" />
              </div>
            </div>
          </div>
        </div>
        :
        <div className="dashboard-card">
          <div className="job-title">
            <BsBriefcaseFill /> {jobData.title}
          </div>

          <div className="job-top-details">
            <div className="job-company_name">
              <BiBuilding /> {jobData.company?.display_name}
            </div>

            <div className="job-company_name">
              <FaChartLine /> £{jobData.salary_max}
            </div>

            <div className="job-company_name">
              <FaHandshake /> {jobData?.contract_type}
            </div>

            <div className="job-location">
              <FaLocationDot /> {jobData.location?.display_name}
            </div>

            <div className="job-created">
              <BsFillClockFill /> {JobDate}
            </div>

          </div>
          <div className='job-description'>
            {jobData.description}
          </div>

          <div className="buttons-tray">
            <div className="button">
              <Button
                className="apply-button"
                color="teal.7"
                value="appliedJob"
                onClick={AddAppliedJobs}>

                <a href={jobData?.redirect_url} target="_blank" rel="noopener noreferrer">
                  <FaNewspaper /> Apply
                </a>
              </Button>
            </div>

            <div className="button">
              <Button
                className="save-job-button"
                color="teal.7"
                value="savedJob"
                disabled={isAlreadySaved}
                onClick={AddSavedJobs}>
                <a>
                  {isAlreadySaved ?
                    <span>  <BsFillBookmarkFill />  Bookmarked </span>
                    :
                    <span> <BsBookmark />  Bookmark  </span>
                  }
                </a>
              </Button>
            </div>
          </div>
        </div>

      }

    </section >
  )
}
export default DashboardCard;
