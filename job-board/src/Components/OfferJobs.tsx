

import { FaChartLine, FaLocationDot, FaNewspaper } from 'react-icons/fa6';
import useStore from '../State/ZustandStore.tsx';
import { BiBuilding, BiTrash } from 'react-icons/bi';
import { Button, Select } from '@mantine/core';
import Toastify from 'toastify-js';


interface JobType {
    id: number;
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

interface SavedProps {
    isGrid: boolean;
}

function Offers({ isGrid }: SavedProps) {

    const savedJobs = useStore((state: any) => state.savedJobs as JobType[]);
    const setSavedJobs = useStore((state: any) => state.setSavedJobs);

    const interviewingJobs = useStore((state: any) => state.interviewingJobs as JobType[]);
    const setInterviewingJobs = useStore((state: any) => state.setInterviewingJobs);

    const offers = useStore((state: any) => state.offers as JobType[]);
    const setOffers = useStore((state: any) => state.setOffers);


    const handleDeleteJob = (index: number) => {

        setOffers(offers.filter((_: any, i: number) => i !== index));

        Toastify({

            text: 'Job deleted from offers',
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

    const handleStatusChange = (value: string | null, job: any) => {


        if (value === '📖 Bookmarks') {

            setOffers(offers.filter(j => j.id !== job.id));
            setSavedJobs([...savedJobs, job]);
        }

        if (value === '💬 Interviewing') {
            setOffers(offers.filter(j => j.id !== job.id));
            setInterviewingJobs([...interviewingJobs, job]);

            Toastify({

                text: 'Job moved to Interviewing',
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
        if (value === '🎉 Offers') {

            Toastify({

                text: 'You already moved this job to this array',
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

    }

    return (

        <section className="Offers" >
            <div className="your-jobs-title">
                <div className="heading">
                    🎉 Offers: {offers.length}
                </div>
            </div>

            <div className={isGrid ? "appliedJobs-grid" : "appliedJobs"}>

                {offers.length === 0 ? (

                    <div className="appliedJob-skeleton">

                        No offers yet...

                    </div>
                ) : (
                    offers.map((job: JobType, index: number) => (
                        <div className={isGrid ? "appliedJob-grid" : "appiedJob"} key={index}>
                            <div className="dashboard-card">
                                <div className={isGrid ? "job-title-isGrid" : "job-title"}>

                                    <div>{job.title} </div>

                                    <Select
                                        className="Status-select"
                                        placeholder="Move to..."
                                        data={['📖 Bookmarks', '💬 Interviewing', '🎉 Offers']}
                                        onChange={(value) => handleStatusChange(value, job)}
                                    ></Select>
                                </div>
                                <div className={isGrid ? "jobs-top-details-grid" : "job-top-details"}>
                                    <div className="job-company_name">
                                        <BiBuilding /> {job.company?.display_name}
                                    </div>
                                    <div className="job-location">
                                        <FaLocationDot /> {job.location?.display_name}
                                    </div>
                                    <div className="job-company_name">
                                        <FaChartLine /> £{job.salary_max}
                                    </div>
                                </div>

                                <div className={isGrid ? "buttons-tray-grid" : "buttons-tray"}>
                                    <Button
                                        className="button"
                                        style={{ marginTop: '8px' }}
                                        color={'teal.7'}
                                    >
                                        <a href={job?.redirect_url} target="_blank" rel="noopener noreferrer">
                                            <FaNewspaper /> View Listing
                                        </a>
                                    </Button>

                                    <Button
                                        className="button"
                                        onClick={() => handleDeleteJob(index)}
                                        style={{ marginTop: '8px' }}
                                        color={'teal.7'}
                                    >
                                        <BiTrash />
                                        Delete
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))
                )}

            </div>
        </section>

    )

}
export default Offers;