import { Button } from "@mantine/core";
import { BiSearch } from "react-icons/bi";

import DashboardCard from "../Components/DashboardCard";
import { useEffect, useState } from "react";

function Dashboard() {

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResult, setSearchResult] = useState<any>('null');

  useEffect(() => {

    async function getGenericResults() {

      const params = new URLSearchParams({

        app_id: 'ab6f80a8',
        app_key: '7543aa159a775e8a3a56253ba06d729e',
        results_per_page: '10',
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
      what: searchTerm,
      results_per_page: '12',
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
            <input type="text" className="input" onChange={(e) => setSearchTerm(e.target.value)} />

            <input
              type="text"
              className="location-input"
              color='teal.7'
            />

            <select
              className="contract-input"
              color='teal.7'
            />

            <select
              className="experience-input"
              
              color='teal.7' 
            />

            <Button
              type="submit"
              className="search"
              color='teal.7'> <BiSearch />Search Jobs
            </Button>

          </form>
        </div>

        <div className="dashboard-results">
          {searchResult?.results?.map((job: any) => (
            <DashboardCard key={job.id} jobData={job} />
          ))};
        </div>

      </div>

    </section>
  )
}

export default Dashboard;
