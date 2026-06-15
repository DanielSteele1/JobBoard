import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GoogleUserProfile {

    sub: string,
    name: string,
    given_name: string,
    email: string,
    email_verified: boolean,
    picture: string,
}

const useStore = create(
    persist((set) => ({

        isLoggedIn: false,
        setLoggedin: (data: boolean) => set({ isLoggedIn: data }),

        isGuest: false,
        setGuest: (data: boolean) => set({ isGuest: data }),

        userProfile: {
            id: crypto.randomUUID(),
            sub: '',
            name: '',
            signin_method: '',
            given_name: '',
            email: '',
            email_verified: false,
            picture: '',
        },

        setUserProfile: (data: GoogleUserProfile | null) => set({ userProfile: data }),

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