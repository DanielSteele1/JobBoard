import {create} from 'zustand';

const useStore = create((set) => ({

    isLoading: false,
    setLoading: (data: boolean) => set({ isLoading: data }),

    savedJobsIds: String,

}));

export default useStore;