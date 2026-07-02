import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { supabase } from '../Components/Supabase';

interface GoogleUserProfile {

    sub: string,
    name: string,
    given_name: string,
    email: string,
    email_verified: boolean,
    picture: string,
}


const useStore = create(
    persist((set, get: any) => ({

        isLoggedIn: false,
        setLoggedin: (data: boolean) => set({ isLoggedIn: data }),

        isGuest: false,
        setGuest: (data: boolean) => set({ isGuest: data }),

        userProfile: {
            id: '',
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

        history: [],
        setHistory: (newHistory: any) => set({ history: newHistory }),

        appliedJobs: [],
        setAppliedJobs: (newApplied: any) => set({ appliedJobs: newApplied }),

        savedJobs: [],
        setSavedJobs: (newSaved: any) => set({ savedJobs: newSaved }),

        interviewingJobs: [],
        setInterviewingJobs: (newInterviewJobs: any) => set({ interviewingJobs: newInterviewJobs }),

        offers: [],
        setOffers: (newOffers: any) => set({ offers: newOffers }),

        // this code will update the status of each job, moving it to its respective array.

        updateJobStatus: async (job: any, value: string) => {

            const state = get();

            const applied = state.appliedJobs.filter((j: any) => j.id !== job.id);
            const saved = state.savedJobs.filter((j: any) => j.id !== job.id);
            const interviewing = state.interviewingJobs.filter((j: any) => j.id !== job.id);
            const offers = state.offers.filter((j: any) => j.id !== job.id);

            if (value === '📰 Applied') applied.push(job);
            if (value === '📖 Bookmarks') saved.push(job);
            if (value === '💬 Interviewing') interviewing.push(job);
            if (value === '🎉 Offers') offers.push(job);

            set({
                appliedJobs: applied,
                savedJobs: saved,
                interviewingJobs: interviewing,
                offers: offers,
            })

            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            if (user) {

                const { error } = await supabase
                    .from("Users")
                    .update({
                        saved_jobs: saved,
                        applied_jobs: applied,
                        interviewing_jobs: interviewing,
                        offer_jobs: offers
                    })
                    .eq('id', user.id)
                    .select();
                if (error) {
                    console.log("syncing error", error);
                }
            }
        }
    }),

        {
            name: 'job-storage',
        }
    )
);

export default useStore;