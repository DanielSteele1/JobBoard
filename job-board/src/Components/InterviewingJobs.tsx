

import { FaChartLine, FaLocationDot } from 'react-icons/fa6';
import useStore from '../State/ZustandStore.tsx';
import { BiBuilding } from 'react-icons/bi';
import { TbConfettiFilled } from 'react-icons/tb';

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

function Interviews({ isGrid, handleDeleteJob }: SavedProps) {
    const interviewingJobs = useStore((state: any) => state.interviewingJobs as JobType[]);

    return (
        <section className="Interviewing">
            <div className="your-jobs-title">
                <div className="heading">
                    💬
                    Your Interviews: {interviewingJobs.length}
                </div>
            </div>

            <div className={isGrid ? "appliedJobs-grid" : "appliedJobs"}>

                {interviewingJobs.length === 0 ? (

                    <div className="appliedJob-skeleton">
                        You haven't applied for any jobs yet.
                    </div>
                ) : (
                    interviewingJobs.map((job: JobType, index: number) => (
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

                                <button
                                    onClick={() => handleDeleteJob(index)}
                                    style={{ marginTop: '8px' }}>
                                   <TbConfettiFilled/>  Move to Offers
                                </button>
                            </div>
                        </div>
                    ))
                )}

            </div>
        </section>

    )

}
export default Interviews;