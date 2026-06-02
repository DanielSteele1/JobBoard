import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useStore = create(
    persist((set) => ({

        isLoggedIn: false,
        setLoggedin: (data: boolean) => set({ isLoggedIn: data }),

        userProfile: {
            id: '',
            username: '',
            password: '',
        },
        setUserProfile: (data: any) => set({ userProfile: data }),

        isLoading: false,
        setLoading: (data: boolean) => set({ isLoading: data }),

        appliedJobs: [],
        setAppliedJobs: (newApplied: any) => set({ appliedJobs: newApplied }),

        savedJobs: [],
        setSavedJobs: (newSaved: any) => set({ savedJobs: newSaved }),

        interviewingJobs: [],
        setInterviewingJobs: (newInterviewJobs: any) => set({ interviewingJobs: newInterviewJobs }),

        offers: [],
        setOffers: (newOffers: any) => set({ offers: newOffers }),

    }),

        {
            name: 'job-storage',
        }
    )
);

export default useStore;