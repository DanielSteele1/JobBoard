import { create } from 'zustand';

const useStore = create((set) => ({

    isLoading: false,
    setLoading: (data: boolean) => set({ isLoading: data }),

    appliedJobs: [],
    setAppliedJobs: (data: any) => set({ appliedJobs: data }),

    savedJobs: [],
    setSavedJobs: (data: any) => set({ savedJobs: data }),

}));

export default useStore;