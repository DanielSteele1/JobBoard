import useStore from '../State/ZustandStore.tsx';
import { BsFillBookmarkFill } from 'react-icons/bs';
import { useState } from 'react';

import Saved from './SavedJobs.tsx';
import Applied from './AppliedJobs.tsx';
import Offers from './OfferJobs.tsx';
import Interviews from './InterviewingJobs.tsx';
import Toastify from 'toastify-js';
import { IoGrid } from 'react-icons/io5';

import { useDisclosure } from '@mantine/hooks';
import { Dialog, Button, Select, } from '@mantine/core';
import { BiPlus } from 'react-icons/bi';
import { TbBuildingSkyscraper } from 'react-icons/tb';

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

function YourJobs() {

  const appliedJobs = useStore((state: any) => state.appliedJobs as JobType[]);
  const savedJobs = useStore((state: any) => state.savedJobs as JobType[]);
  const setSavedJobs = useStore((state: any) => state.setSavedJobs);

  const interviewingJobs = useStore((state: any) => state.interviewingJobs as JobType[]);
  const setInterviewingJobs = useStore((state: any) => state.setInterviewingJobs);

  const setOffers = useStore((state: any) => state.setOffers);
  const offers = useStore((state: any) => state.offers as JobType[]);

  // tabs slection
  const [selectTabs, setSelectTabs] = useState('applied');
  const [isGrid, setisGrid] = useState(false);

  const [opened, { toggle, close }] = useDisclosure(false);

  const [customJob, setCustomJob] = useState({

    title: '',
    description: '',
    company: '',
    status: ''

  })

  function AddCustomJob(e: React.FormEvent) {
    e.preventDefault();

    if (!customJob.title.trim()) return;

    const formattedJob: JobType = {
      id: Date.now(),
      title: customJob.title,
      description: customJob.description,
      company: {
        display_name: customJob.company,
      },
      location: {
        display_name: 'Added by User',
      },
      created: new Date().toISOString(),
      redirect_url: 'Added by User',
      contract_type: 'Added by User',
      salary_min: 0,
      salary_max: 0,
      source: 'Added by User',
    };

    switch (customJob.status) {

      case '📖 Bookmarks':
        setSavedJobs([...savedJobs, formattedJob]);
        break;

      case '💬 Interviewing':
        setInterviewingJobs([...interviewingJobs, formattedJob]);
        break;

      case '🎉 Offers':
        setOffers([...offers, formattedJob]);
        break;
    }

    Toastify({


      text: 'Custom Job Added!',
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


    setCustomJob({ title: '', description: '', company: '', status: '📖 Bookmarks' });
    close();
  }

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

      <div className="input-a-job">

        <span> Want to track a job not found from this app? </span>

        <Button color="teal.7" onClick={toggle}> <BiPlus /> Add a custom job </Button>

      </div>

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
          <button className="button-grid"
            onClick={() => setisGrid(prev => !prev)}>
            <IoGrid />
          </button>
        </div>
      </div>

      <Dialog
        className='Dialog'
        opened={opened}
        onClose={close}
        withCloseButton
        size="lg"
      >

        <form className="add-job-dialog" onSubmit={AddCustomJob}>
          <span className="add-job-title"> <TbBuildingSkyscraper /> Add a Custom Job </span>

          <span className="add-job-description"> This feature allows you to add a custom job to the tracker,
            so you don't just have to rely on the main search feature.
          </span>

          <div className="job-inputs">

            <span>Title</span>
            <input value={customJob.title}
              onChange={(e) => setCustomJob({ ...customJob, title: e.target.value })} />

            <span>Description</span>
            <input value={customJob.description}
              onChange={(e) => setCustomJob({ ...customJob, description: e.target.value })} />

            <span>Company Name</span>
            <input value={customJob.company}
              onChange={(e) => setCustomJob({ ...customJob, company: e.target.value })} />

            <span> Choose which list to add this job into:</span>
            <Select className="select-array"
              data={['📖 Bookmarks', '💬 Interviewing', '🎉 Offers']}
              value={customJob.status}
              onChange={(value) => setCustomJob({ ...customJob, status: value || '' })} />
          </div>

          <Button
            color="teal.7"
            type="submit"
            onSubmit={() => setCustomJob(customJob)}
          >
            <BiPlus />
            Add job
          </Button>
        </form>

      </Dialog>

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