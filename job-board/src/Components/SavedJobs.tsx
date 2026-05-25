

import { FaChartLine, FaLocationDot, FaNewspaper } from 'react-icons/fa6';
import useStore from '../State/ZustandStore.tsx';
import { BiBuilding, BiTrash } from 'react-icons/bi';
import { RiBookmarkFill } from 'react-icons/ri';
import { Button } from '@mantine/core';

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
    handleDeleteJob: (index: number) => void;
}

function Saved({ isGrid, handleDeleteJob }: SavedProps) {
    const savedJobs = useStore((state: any) => state.savedJobs as JobType[]);

    return (

        <section className="Saved">
            <div className="your-jobs-title">
                <div className="heading">
                    <RiBookmarkFill />
                    Bookmarked Jobs: {savedJobs.length}
                </div>
            </div>

            <div className={isGrid ? "savedJobs-grid" : "savedJobs"}>

                {savedJobs.length === 0 ? (

                    <div className="appliedJob-skeleton">
                        You haven't saved any jobs yet.
                    </div>
                ) : (
                    savedJobs.map((job: JobType, index: number) => (
                        <div className={isGrid ? "appliedJob-grid" : "appiedJob"} key={index}>
                            <div className="dashboard-card">
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
                                        <FaNewspaper />
                                        View Listing
                                    </Button>

                                    <Button
                                        className="button"
                                        color={'teal.7'}
                                        onClick={() => handleDeleteJob(index)}
                                        style={{ marginTop: '8px' }}>
                                        💬  Move to Interviewing
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
export default Saved;