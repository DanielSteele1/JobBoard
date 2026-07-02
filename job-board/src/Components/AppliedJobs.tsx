

import { FaChartLine, FaLocationDot, FaNewspaper } from 'react-icons/fa6';
import useStore from '../State/ZustandStore.tsx';
import { BiBuilding, BiTrash } from 'react-icons/bi';
import { Button, Select } from '@mantine/core';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TbBlocks } from 'react-icons/tb';
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
    handleDeleteJob: (index: number) => void;

}

function Applied({ isGrid, handleDeleteJob }: SavedProps) {
    const appliedJobs = useStore((state: any) => state.appliedJobs as JobType[]);
    const savedJobs = useStore((state: any) => state.savedJobs as JobType[]);
    const interviewingJobs = useStore((state: any) => state.interviewingJobs as JobType[]);
    const offers = useStore((state: any) => state.offers as JobType[]);

    const setAppliedJobs = useStore((state: any) => (state.setAppliedJobs));
    const setSavedJobs = useStore((state: any) => state.setSavedJobs);
    const setInterviewingJobs = useStore((state: any) => state.setInterviewingJobs);
    const setOffers = useStore((state: any) => state.setOffers);

    const updateJobStatus = useStore((state: any) => state.updateJobStatus);

    const handleStatusChange = async (value: string | null, job: any) => {
        if (!value) return;

        if (value === '📖 Bookmarks') {


            setAppliedJobs(appliedJobs.filter(j => j.id !== job.id));
            setSavedJobs([...savedJobs, job]);

            updateJobStatus(job, value);


            Toastify({

                text: 'Job is already Bookmarked',
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

        if (value === '💬 Interviewing') {

            setAppliedJobs(appliedJobs.filter(j => j.id !== job.id));
            setInterviewingJobs([...interviewingJobs, job]);

            updateJobStatus(job, value);

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
            setAppliedJobs(appliedJobs.filter(j => j.id !== job.id));
            setOffers([...offers, job]);

            updateJobStatus(job, value);

            Toastify({

                text: 'Job moved to offers',
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

        <section className="Applied">
            <div className="your-jobs-title">
                <div className="heading">
                    <FaNewspaper />
                    Your Applied Jobs: {appliedJobs.length}
                </div>
                <span className="your-jobs-subtitle"> Applied Jobs are purely for your tracking and cannot be moved to other lists. </span>
            </div>

            <div className={isGrid ? "appliedJobs-grid" : "appliedJobs"}>

                {appliedJobs.length === 0 ? (

                    <div className="appliedJob-skeleton">

                        No applications yet...

                        <Link to="/">
                            <Button
                                color="teal.7">
                                <TbBlocks /> Go to Dashboard
                            </Button>
                        </Link>
                    </div>
                ) : (
                    appliedJobs.map((job: JobType, index: number) => (
                        <div className={isGrid ? "appliedJob-grid" : "appiedJob"} key={index}>
                            <motion.div
                                className="dashboard-card"
                                layout
                                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -15 }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 500,
                                    damping: 60,
                                    delay: index * 0.05,
                                    opacity: { duration: 0.15 }
                                }}
                                style={{ width: '100%' }}>

                                <div className="job-title">{job.title}


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
                            </motion.div>
                        </div>

                    ))
                )}
            </div>
        </section>

    )

}
export default Applied;