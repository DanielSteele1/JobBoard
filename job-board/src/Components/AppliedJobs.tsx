

import { FaChartLine, FaLocationDot, FaNewspaper } from 'react-icons/fa6';
import useStore from '../State/ZustandStore.tsx';
import { BiBuilding } from 'react-icons/bi';
import { Button } from '@mantine/core';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { TbBlocks } from 'react-icons/tb';

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

interface SavedProps {
    isGrid: boolean;
}

function Applied({ isGrid }: SavedProps) {
    const appliedJobs = useStore((state: any) => state.appliedJobs as JobType[]);

    return (

        <section className="Applied">
            <div className="your-jobs-title">
                <div className="heading">
                    <FaNewspaper />
                    Your Applied Jobs: {appliedJobs.length}
                </div>
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
        </section>

    )

}
export default Applied;