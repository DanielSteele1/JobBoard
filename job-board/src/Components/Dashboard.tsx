import { Button, Select } from "@mantine/core";
import { BiSearch } from "react-icons/bi";

import DashboardCard from "../Components/DashboardCard";
import { useEffect, useState } from "react";

import useStore from '../State/ZustandStore.tsx';
import { HiHome } from "react-icons/hi";

interface Job {

  id: string,
  title: string,
  location: {
    display_name: string,
    area?: string[];
  }
  description: string,
  salary_max: string,
  salary_min: string,
  contract_type: string,
  time_posted: string,

}

function Dashboard({ }: Job) {

  const setLoading = useStore((state: any) => state.setLoading);

  const [searchJobTitle, setSearchJobTitle] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [filterRemoteOnly, setFilterRemoteOnly] = useState(false);

  const [filters, setfilters] = useState({

    salary_max: '',
    salary_min: '',
    contract_type: '',
    time_posted: '',
    experience_level: '',

  })

  // api result
  const [searchResult, setSearchResult] = useState<any>(null);

  //loading state

  useEffect(() => {

    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);

  }, []);

  // get search results

  //filtered results 

  const filteredJobs = searchResult?.results?.filter((job: Job) => {

    if (filters.contract_type) {
      const isMatch = job.contract_type?.toLowerCase() === filters.contract_type.toLowerCase();
      if (!isMatch) return false;
    }

    if (filters.time_posted) {
      const isMatch = job.time_posted;
      if (!isMatch) return true;
    }

    if (filters.experience_level === 'Junior') {

      const isTitle = job.title?.toLowerCase().includes('junior') && job.title.toLowerCase().includes('trainee');
      const isDesc = job.description?.toLowerCase().includes('junior') && job.description.toLowerCase().includes('trainee');

      if (!isTitle && !isDesc) return false;

    }

    if (filters.experience_level === 'Intern') {

      const isTitle = job.title?.toLowerCase().includes('intern');
      const isDesc = job.description?.toLowerCase().includes('intern');

      if (!isTitle && !isDesc) return false;

    }

    if (filters.experience_level === 'Mid-level') {

      const isTitle = job.title?.toLowerCase().includes('mid-level');
      const isDesc = job.description?.toLowerCase().includes('mid-level');

      if (!isTitle && !isDesc) return false;

    }

    if (filters.experience_level === 'Senior') {

      const isTitle = job.title?.toLowerCase().includes('senior');
      const isDesc = job.description?.toLowerCase().includes('senior');

      if (!isTitle && !isDesc) return false;

    } 

    if (filterRemoteOnly) {

      // if description includes the word remote, show only these jobs

      const isTitle = job.title?.toLowerCase().includes('remote');
      const isDesc = job.description?.toLowerCase().includes('remote');

      if (!isDesc && !isTitle) return false;
    }





    return true;
  }

  ) || [];


  useEffect(() => {

    async function getGenericResults() {

      const params = new URLSearchParams({

        app_id: 'ab6f80a8',
        app_key: '7543aa159a775e8a3a56253ba06d729e',
        results_per_page: '50',
      });

      const GenericResponse = await fetch(`https://api.adzuna.com/v1/api/jobs/gb/search/1?${params}`, {
        method: 'GET',
      });

      const GenericResults = await GenericResponse.json();
      console.log(GenericResults);
      setSearchResult(GenericResults);

    };
    getGenericResults();

  }, []);

  async function getSearchResults() {

    const params = new URLSearchParams({

      app_id: 'ab6f80a8',
      app_key: '7543aa159a775e8a3a56253ba06d729e',
      what: searchJobTitle,
      where: searchLocation,
      results_per_page: '50',
    });

    const response = await fetch(`https://api.adzuna.com/v1/api/jobs/gb/search/1?${params}`, {
      method: 'GET',
    });

    const results = await response.json();
    setSearchResult(results);
    console.log(results);
  };

  const handleSubmit = (e: any) => {

    e.preventDefault();
    getSearchResults();

  };

  return (
    <section className="Dashboard-container">
      <div className="dashboard">
        <div className="dashboard-top">
          <div className="dashboard-info">
            <span> Search for Jobs! Use the filters below to search for the right job for you.</span>
          </div>

          <form className="search-input" onSubmit={handleSubmit}>
            <input
              type="text"
              className="input"
              onChange={(e) => setSearchJobTitle(e.target.value)}
              placeholder="Search for a Job title.."
            />

            <input
              type="text"
              className="location-input"
              color='teal.7'
              onChange={(e) => setSearchLocation(e.target.value)}
              placeholder="Search for a location.."
            />

            <Button
              type="submit"
              className="search"
              color='teal.7'> <BiSearch />Search Jobs
            </Button>

          </form>
        </div>

        <div className="search-filters-container">
          <span className="heading"> Filter Results by:</span>

          <div className="input-container">
            <Select className="contract-input"
              label="Job Type"
              placeholder="Choose Job Type"
              clearable
              color='teal.7'
              value={filters.contract_type}
              data={['permanent', 'temporary', 'contract']}
              onChange={(value) => setfilters({ ...filters, contract_type: value || '' })}

            >

            </Select>

            <Select className="experience-input"
              label="Experience"
              placeholder="Experience"
              clearable
              value={filters.experience_level}
              color='teal.7'
              data={['Intern', 'Junior', 'Mid-level', 'Senior']}
              onChange={(value) => setfilters({ ...filters, experience_level: value || '' })}

            >

            </Select>

            <Select className="contract-input"
              label="Posted Date"
              placeholder="Choose Posted Date"
              clearable
              value={filters.time_posted}
              color='teal.7'
              data={['last 24 Hours', 'In the last week', 'In the last month']}
            >

            </Select>

            <Button className="remote-only" color="teal.7" onClick={() => setFilterRemoteOnly(!filterRemoteOnly)}>
              <HiHome />
            </Button>

            <Button className="clear-filters" color="teal.7">
              Clear
            </Button>
          </div>
        </div>

        <div className="dashboard-results">
          <div className="indicators">
            <div className="results-amount">
              Showing {filteredJobs.length} Matching Jobs
            </div>

            {filterRemoteOnly &&
              <div className="results-isRemote">
                <HiHome /> Showing Remote only Jobs
              </div>

            }
          </div>

          {filteredJobs.length === 0 ?

            <div className="no-results">
              No results found. Try Broadening your search, or try again.
            </div>
            :
            filteredJobs?.map((job: any) => (
              <DashboardCard key={job.id} jobData={job} />
            ))
          }
        </div>

      </div>
    </section >

  )
}

export default Dashboard;
