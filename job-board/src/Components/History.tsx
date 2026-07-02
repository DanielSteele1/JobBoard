


import { FaChartLine, FaClock, FaLocationDot, FaNewspaper } from 'react-icons/fa6';
import useStore from '../State/ZustandStore.tsx';
import { BiBuilding } from 'react-icons/bi';
import { Button, Tooltip } from '@mantine/core';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TbBlocks } from 'react-icons/tb';

import '../History.css';
import { IoGrid } from 'react-icons/io5';
import { useState } from 'react';

interface JobType {
    id: number,
    title: string,
    description: string,
    company: {
        display_name: string;
    },
    location: {
        display_name: string;
    },
    redirect_url?: string,
    created: string,
    contract_type?: string,
    salary_min?: number,
    salary_max?: number,
    source?: string,
}


function History() {

    const [isGrid, setIsGrid] = useState(false);

    const history = useStore((state: any) => state.history);

    return (
        <section className="history-container">
            <div className="history">
                <div className="history-title">
                    <div className="heading">
                        <FaClock /> View History: {history.length}
                    </div>

                    <div className="buttons-drawer">
                        <Tooltip label="Switch Views" position="top" color="teal.6" transitionProps={{ transition: 'fade', duration: 300 }}>
                            <Button className="button-grid"
                                color="teal.7"
                                onClick={() => setIsGrid(prev => !prev)}>
                                <IoGrid />
                            </Button>
                        </Tooltip>
                    </div>
                </div>

                <span className="history-subtitle"> This page records every job you've interacted with, regardless of if you applied or just took a quick look. Useful if you've found a job, but forgot to bookmark it for later. </span>

                <div className={isGrid ? "appliedJobs-grid" : "appliedJobs"}>

                    {history.length === 0 ? (

                        <div className="appliedJob-skeleton">
                            You haven't viewed any jobs yet.
                            <Link to="/">
                                <Button
                                    color="teal.7">
                                    <TbBlocks />
                                    Go to Dashboard
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        history.map((job: JobType, index: number) => (
                            <div className={isGrid ? "appliedJob-grid" : "appiedJob"} key={index}>
                                <motion.div
                                    className="dashboard-card"
                                    layout
                                    transition={{ type: "spring", stiffness: 300, damping: 32 }}
                                    key={job.id || index}

                                >
                                    <div className={isGrid ? "job-title-isGrid" : "job-title"}>

                                        <div>{job.title} </div>
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
                                    </div>
                                </motion.div>
                            </div>
                        ))
                    )}

                </div>
            </div>

        </section >

    )

}
export default History;