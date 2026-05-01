import { Button } from "@mantine/core";
import { BiBuilding, BiPlus } from "react-icons/bi";
import { BsFillClockFill } from "react-icons/bs";
import { FaChartLine, FaHandshake, FaLocationDot } from "react-icons/fa6";
import { PiNewspaper } from "react-icons/pi";
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
  return (
    <section className="dashboard-card">
      < div className="job-title">
        {jobData.title}
      </div>

      <div className="job-top-details">
        <div className="job-company_name">
          <BiBuilding /> {jobData.company?.display_name}
        </div>

        <div className="job-company_name">
          <FaChartLine /> £{jobData.salary_max}
        </div>

        <div className="job-company_name">
          <FaHandshake /> {jobData.contract_type}
        </div>

        <div className="job-location">
          <FaLocationDot /> {jobData.location?.display_name}
        </div>

        <div className="job-created">
          <BsFillClockFill /> {jobData.created}
        </div>

      </div>
      <div className="job-description">
        {jobData.description}
      </div>

      <div className="buttons-tray">
        <div className="button">
          <Button className="apply-button" color="teal.7">
            <a href={jobData?.redirect_url}>
              <PiNewspaper /> Apply
            </a>
          </Button>
        </div>

        <div className="button">
          <Button className="save-job-button" color="teal.7">
            <a>
              <BiPlus /> Save job
            </a>
          </Button>
        </div>
      </div>

    </section>

  )
}

export default DashboardCard;
