import useStore from '../State/ZustandStore.tsx';
import { BsFillBookmarkFill } from 'react-icons/bs';
import { Button } from '@mantine/core';
import { CiGrid2H, CiGrid41 } from 'react-icons/ci';
import { useState } from 'react';

import Saved from './SavedJobs.tsx';
import Applied from './AppliedJobs.tsx';
import Offers from './OfferJobs.tsx';
import Interviews from './InterviewingJobs.tsx';

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

function YourJobs() {

  const appliedJobs = useStore((state: any) => state.appliedJobs as JobType[]);
  const savedJobs = useStore((state: any) => state.savedJobs as JobType[]);
  const setSavedJobs = useStore((state: any) => state.setSavedJobs);

  const interviewingJobs = useStore((state: any) => state.interviewingJobs as JobType[]);
  const offers = useStore((state: any) => state.offers as JobType[]);

  // tabs slection
  const [selectTabs, setSelectTabs] = useState('applied');

  const [isGrid, setisGrid] = useState(false);

  function handleDeleteJob(index: number) {

    setSavedJobs(savedJobs.filter((_: any, i: number) => i !== index));
  }

  return (
    <section className="YourJobs-container">
      <div className="YourJobsFilters">

        <div className="YourJobsButtons">
          <div className="buttons-filters">

            <Button
              className="tabs-buttons"
              value={'applied'}
              onClick={() => setSelectTabs('applied')}
            >
              📰 Applied Jobs: {appliedJobs.length}
            </Button>

            <Button
              className="tabs-buttons"
              value={'saved'}
              onClick={() => setSelectTabs('saved')}
            >
              <BsFillBookmarkFill />
              Bookmarked Jobs: {savedJobs.length}
            </Button>

            <Button
              className="tabs-buttons"
              value={'interviewing'}
              onClick={() => setSelectTabs('interviewing')}
            >
              💬 Interviewing: {interviewingJobs.length}
            </Button>

            <Button
              className="tabs-buttons"
              value={'offers'}
              onClick={() => setSelectTabs('offers')}>
              🎉 Offers: {offers.length}
            </Button>
          </div>


          <div className="buttons-filters-mobile">

            <Button
              className="tabs-buttons"
              value={'applied'}
              onClick={() => setSelectTabs('applied')}
            >
              📰 {appliedJobs.length}
            </Button>

            <Button
              className="tabs-buttons"
              value={'saved'}
              onClick={() => setSelectTabs('saved')}
            >
              <BsFillBookmarkFill />
               {savedJobs.length}
            </Button>

            <Button
              className="tabs-buttons"
              value={'interviewing'}
              onClick={() => setSelectTabs('interviewing')}
            >
              💬{interviewingJobs.length}
            </Button>

            <Button
              className="tabs-buttons"
              value={'offers'}
              onClick={() => setSelectTabs('offers')}>
              🎉{offers.length}
            </Button>
          </div>
        </div>

        <div className="buttons-layout">
          <button className="button-grid"
            onClick={() => setisGrid(!false)}>
            <CiGrid41 />
          </button>
          <button className="button-rows"
            onClick={() => setisGrid(!true)}>
            <CiGrid2H />
          </button>
        </div>
      </div>


      {
        selectTabs === 'saved' &&
        <Saved isGrid={isGrid} handleDeleteJob={handleDeleteJob} />
      }
      {
        selectTabs === 'applied' &&
        <Applied isGrid={isGrid} handleDeleteJob={handleDeleteJob} />
      }
      {
        selectTabs === 'interviewing' &&
        <Interviews isGrid={isGrid} handleDeleteJob={handleDeleteJob} />
      }
      {
        selectTabs === 'offers' &&
        <Offers isGrid={isGrid} handleDeleteJob={handleDeleteJob} />
      }

    </section >
  )
}

export default YourJobs;