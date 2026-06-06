import useStore from '../State/ZustandStore.tsx';
import { BsFillBookmarkFill } from 'react-icons/bs';
import { Button } from '@mantine/core';
import { useState } from 'react';

import Saved from './SavedJobs.tsx';
import Applied from './AppliedJobs.tsx';
import Offers from './OfferJobs.tsx';
import Interviews from './InterviewingJobs.tsx';
import Toastify from 'toastify-js';
import { IoGrid } from 'react-icons/io5';

interface JobType {
  id: string;
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

    Toastify({

      text: 'Job deleted from Bookmarks',
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
              📰 Applications {appliedJobs.length}
            </Button>

            <Button
              className="tabs-buttons"
              value={'saved'}
              onClick={() => setSelectTabs('saved')}
            >
              <BsFillBookmarkFill />
              Bookmarks {savedJobs.length}
            </Button>

            <Button
              className="tabs-buttons"
              value={'interviewing'}
              onClick={() => setSelectTabs('interviewing')}
            >
              💬 Interviews {interviewingJobs.length}
            </Button>

            <Button
              className="tabs-buttons"
              value={'offers'}
              onClick={() => setSelectTabs('offers')}>
              🎉 Offers {offers.length}
            </Button>
          </div>
        </div>

        <div className="buttons-layout">
          <button className="button-grid "
            onClick={() => setisGrid(prev => !prev)}>
            <IoGrid />
          </button>
        </div>
      </div>
      {
        selectTabs === 'saved' &&
        <Saved isGrid={isGrid} handleDeleteJob={handleDeleteJob} />
      }
      {
        selectTabs === 'applied' &&
        <Applied isGrid={isGrid} />
      }
      {
        selectTabs === 'interviewing' &&
        <Interviews isGrid={isGrid} />
      }
      {
        selectTabs === 'offers' &&
        <Offers isGrid={isGrid} />
      }

    </section>
  )
}

export default YourJobs;